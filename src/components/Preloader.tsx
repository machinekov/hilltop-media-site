'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';

/*
 * Ray-marched metaball field — organic liquid forms that merge, split, and flow.
 * Inspired by: Lusion.co, ink-in-water, liquid mercury.
 * No mesh geometry — pure fragment shader SDF ray marching on a fullscreen quad.
 * Multiple blobs orbit and breathe, merging when close via smooth union.
 * Material: dark obsidian with luminous champagne-gold rim glow and subsurface scatter.
 */
function LiquidScene({ progress }: { progress: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const init = useCallback(() => {
    if (!mountRef.current || rendererRef.current) return;
    const w = window.innerWidth, h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(w, h) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform float uProgress;
        uniform vec2 uMouse;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // ── SDF primitives ──
        float sdSphere(vec3 p, float r) {
          return length(p) - r;
        }

        // Smooth union — the magic that makes blobs merge organically
        float opSmoothUnion(float d1, float d2, float k) {
          float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
          return mix(d2, d1, h) - k * h * (1.0 - h);
        }

        // Simplex-style noise for organic motion
        vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314*r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        // ── Scene SDF: 5 orbiting blobs ──
        float sceneSDF(vec3 p) {
          float t = uTime * 0.35;
          float prog = uProgress;

          // Smooth union factor — tighter = more merged, looser = more separated
          float k = 0.8 + (1.0 - prog) * 0.4;

          // Blob positions — orbit around center, never cross the middle
          // Use polar coordinates to keep them in a ring formation
          float a1 = t * 0.4;
          float a2 = t * 0.35 + 2.094;    // 120 degrees offset
          float a3 = t * 0.3 + 4.189;     // 240 degrees offset
          float a4 = t * 0.25 + 1.047;    // 60 degrees offset
          float a5 = t * 0.45 + 3.142;    // 180 degrees offset

          float ringR = 1.5 + sin(t * 0.2) * 0.15;  // wider ring, text stays clear

          vec3 b1 = vec3(
            cos(a1) * ringR + snoise(vec3(t * 0.15, 0.0, 0.0)) * 0.2,
            sin(a1) * ringR * 0.7 + snoise(vec3(0.0, t * 0.12, 0.0)) * 0.15,
            sin(t * 0.3) * 0.4
          );
          vec3 b2 = vec3(
            cos(a2) * ringR * 0.9,
            sin(a2) * ringR * 0.65 + snoise(vec3(t * 0.13, 5.0, 0.0)) * 0.2,
            cos(t * 0.25) * 0.3
          );
          vec3 b3 = vec3(
            cos(a3) * ringR * 0.85,
            sin(a3) * ringR * 0.6,
            sin(t * 0.35 + 1.0) * 0.35
          );
          vec3 b4 = vec3(
            cos(a4) * ringR * 1.1,
            sin(a4) * ringR * 0.55,
            cos(t * 0.2) * 0.25
          );
          vec3 b5 = vec3(
            cos(a5) * ringR * 0.75,
            sin(a5) * ringR * 0.5,
            sin(t * 0.3 + 2.0) * 0.3
          );

          // Mouse influence pushes the field
          b1.xy += uMouse * 0.25;
          b2.xy += uMouse * 0.18;
          b3.xy += uMouse * 0.12;

          // Blob sizes — breathe gently, smaller to avoid center overlap
          float s1 = 0.42 + sin(t * 1.2) * 0.06;
          float s2 = 0.38 + cos(t * 0.9) * 0.05;
          float s3 = 0.32 + sin(t * 1.5 + 1.0) * 0.04;
          float s4 = 0.35 + cos(t * 1.1 + 2.0) * 0.05;
          float s5 = 0.28 + sin(t * 0.8 + 3.0) * 0.03;

          // Surface noise displacement for organic feel
          float disp = snoise(p * 2.5 + t * 0.3) * 0.08;

          float d = sdSphere(p - b1, s1) + disp;
          d = opSmoothUnion(d, sdSphere(p - b2, s2) + disp, k);
          d = opSmoothUnion(d, sdSphere(p - b3, s3) + disp, k);
          d = opSmoothUnion(d, sdSphere(p - b4, s4) + disp, k);
          d = opSmoothUnion(d, sdSphere(p - b5, s5) + disp, k);

          return d;
        }

        // ── Normal estimation ──
        vec3 calcNormal(vec3 p) {
          vec2 e = vec2(0.002, 0.0);
          return normalize(vec3(
            sceneSDF(p + e.xyy) - sceneSDF(p - e.xyy),
            sceneSDF(p + e.yxy) - sceneSDF(p - e.yxy),
            sceneSDF(p + e.yyx) - sceneSDF(p - e.yyx)
          ));
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

          // Camera
          vec3 ro = vec3(0.0, 0.0, 4.5);  // ray origin
          vec3 rd = normalize(vec3(uv, -1.5));  // ray direction (wider FOV)

          // ── Ray march ──
          float t = 0.0;
          float d;
          vec3 p;
          bool hit = false;

          for (int i = 0; i < 80; i++) {
            p = ro + rd * t;
            d = sceneSDF(p);
            if (d < 0.001) { hit = true; break; }
            if (t > 12.0) break;
            t += d * 0.8;  // slight understep for safety
          }

          // ── Background: deep dark with warm center glow ──
          vec3 bg = vec3(0.008, 0.008, 0.015);
          // Warm radial glow in center — simulates ambient light from the blobs
          float centerDist = length(uv);
          bg += vec3(0.06, 0.04, 0.015) * exp(-centerDist * 1.5) * (0.4 + uProgress * 0.6);
          bg += vec3(0.015, 0.012, 0.008) * (1.0 - centerDist * 0.4);

          if (!hit) {
            // Atmospheric glow near the surface (volumetric fake)
            float glow = 0.0;
            float gt = 0.0;
            for (int i = 0; i < 40; i++) {
              vec3 gp = ro + rd * gt;
              float gd = sceneSDF(gp);
              glow += exp(-gd * 2.5) * 0.025;  // stronger glow accumulation
              gt += max(gd * 0.4, 0.08);
              if (gt > 10.0) break;
            }
            vec3 glowCol = mix(vec3(0.5, 0.35, 0.12), vec3(1.0, 0.80, 0.35), 0.6) * glow;
            bg += glowCol * (0.7 + uProgress * 0.8);

            gl_FragColor = vec4(bg, 1.0);
            return;
          }

          // ── Shading ──
          vec3 n = calcNormal(p);
          vec3 viewDir = normalize(ro - p);

          // Fresnel — STRONG gold rim glow (mercury-like)
          float fresnel = pow(1.0 - max(dot(viewDir, n), 0.0), 3.0);

          // Colors — brighter, more contrast
          vec3 dark = vec3(0.015, 0.015, 0.025);
          vec3 gold = vec3(0.90, 0.72, 0.30);           // vivid champagne
          vec3 brightGold = vec3(1.0, 0.85, 0.45);      // hot gold for rim
          vec3 warmHL = vec3(1.0, 0.92, 0.65);          // bright warm specular
          vec3 coolSteel = vec3(0.35, 0.40, 0.55);

          // Environment reflection (richer — gradient sky dome)
          vec3 reflDir = reflect(-viewDir, n);
          float envTop = smoothstep(-0.2, 0.8, reflDir.y);
          float envSide = smoothstep(0.0, 0.6, abs(reflDir.x));
          float envBot = smoothstep(0.2, -0.3, reflDir.y);
          vec3 envCol = mix(dark * 3.0, coolSteel * 0.6, envTop * 0.6 + envSide * 0.3);
          envCol += gold * 0.1 * envBot;  // warm reflected light from below

          // Primary key light — bright, warm
          vec3 lightDir = normalize(vec3(1.5, 2.0, 2.5));
          float diff = max(dot(n, lightDir), 0.0);
          vec3 halfDir = normalize(viewDir + lightDir);
          float spec = pow(max(dot(n, halfDir), 0.0), 200.0);  // tight mercury spec

          // Secondary cool fill
          vec3 light2 = normalize(vec3(-2.0, -0.5, 1.0));
          float diff2 = max(dot(n, light2), 0.0) * 0.25;

          // Tertiary warm backlight (creates gold edge from behind)
          vec3 light3 = normalize(vec3(0.0, -1.0, -1.5));
          float backLight = pow(max(dot(viewDir, reflect(light3, n)), 0.0), 4.0);

          // Subsurface scatter
          float sss = pow(max(dot(viewDir, -lightDir + n * 0.5), 0.0), 3.0) * 0.2;

          // Compose — much brighter overall
          vec3 col = dark * 2.0;
          col += envCol * 0.7;                                    // environment
          col += coolSteel * diff * 0.2;                         // diffuse
          col += coolSteel * diff2;                               // fill
          col += warmHL * spec * 1.8;                            // VERY bright mercury specular
          col += gold * sss;                                      // subsurface
          col += brightGold * backLight * 0.3;                   // warm back edge
          col += mix(coolSteel * 0.3, brightGold, 0.5 + uProgress * 0.4) * fresnel * 3.5;  // LUMINOUS gold rim
          col += brightGold * pow(fresnel, 1.5) * 0.8;  // extra bloom-like gold edge bleed

          // ── Topographic contour lines (the Hilltop brand signature) ──
          // "Hilltop" = elevation = geography = contour maps
          // Bold gold contour lines that SCAN the surface like a topographic survey

          // ═══════════════════════════════════════════════════
          // TOPOGRAPHIC CONTOUR LINES — THE HERO ELEMENT
          // These must be UNMISSABLE. Bold, glowing, scanning.
          // ═══════════════════════════════════════════════════

          // Animated scan — contours sweep up/down like a surveyor's laser
          float scanOffset = sin(uTime * 0.3) * 0.4;

          // Organic wobble — breaks mechanical perfection
          float wobble = snoise(p * 4.0 + uTime * 0.08) * 0.03;

          float contourFreq = 8.0;  // fewer lines = each one bolder
          float contourY = (p.y + scanOffset + wobble) * contourFreq;

          // ── Primary contour lines — THICK, BOLD ──
          float contourDist = abs(fract(contourY) - 0.5) * 2.0;
          float contourLine = 1.0 - smoothstep(0.0, 0.22, contourDist);  // VERY thick

          // ── Index contours — every 3rd line, MASSIVE and BRIGHT ──
          float indexY = (p.y + scanOffset + wobble) * (contourFreq / 3.0);
          float indexDist = abs(fract(indexY) - 0.5) * 2.0;
          float indexLine = 1.0 - smoothstep(0.0, 0.45, indexDist);  // VERY wide

          // Keep visible at ALL angles (only slight fade at extreme grazing)
          float contourFade = 0.5 + max(abs(n.y), 0.0) * 0.5;
          contourLine *= contourFade;
          indexLine *= contourFade;

          // ── EMISSIVE GOLD GLOW — contours are light sources ──
          vec3 contourGold = vec3(1.0, 0.82, 0.35);
          float intensity = 0.5 + uProgress * 0.5;

          // Primary contours: bright emissive gold
          col += contourGold * contourLine * intensity * 0.6;

          // Index contours: BLAZING bright, white-gold at core
          vec3 indexColor = mix(contourGold, vec3(1.0, 0.97, 0.82), 0.6);
          col += indexColor * indexLine * intensity * 1.2;

          // Bloom halo around every contour — soft glow bleed into surface
          float bloom1 = 1.0 - smoothstep(0.0, 0.40, contourDist);
          col += contourGold * 0.12 * bloom1 * intensity;
          float bloom2 = 1.0 - smoothstep(0.0, 0.55, indexDist);
          col += contourGold * 0.08 * bloom2 * intensity;

          // ── Secondary fine contours (cool steel, subtle) ──
          float fine = abs(fract((p.y + scanOffset + wobble) * contourFreq * 2.0) - 0.5) * 2.0;
          float fineLine = 1.0 - smoothstep(0.0, 0.08, fine);
          fineLine *= contourFade * 0.25;
          col += coolSteel * 0.8 * fineLine * intensity * 0.5;

          // Atmospheric depth
          float depth = smoothstep(3.0, 8.0, t);
          col = mix(col, bg, depth * 0.3);

          // Vignette
          float vig = 1.0 - smoothstep(0.3, 1.2, length(uv * 1.5));
          col *= 0.7 + vig * 0.3;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / w - 0.5) * 2;
      mouse.y = -(e.clientY / h - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      renderer.setSize(nw, nh);
      mat.uniforms.uResolution.value.set(nw, nh);
    };
    window.addEventListener('resize', onResize);

    let animId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.04;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.04;

      mat.uniforms.uTime.value = elapsed;
      mat.uniforms.uProgress.value = progressRef.current / 100;
      mat.uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose(); geo.dispose(); mat.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
    };
  }, []);

  useEffect(() => { const c = init(); return c; }, [init]);
  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}

/* ── Preloader Shell ── */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'exit'>('loading');
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    // Text fades in via CSS transition, not GSAP (avoids React re-render conflicts)
    gsap.to(obj, {
      val: 100, duration: 4, ease: 'power1.inOut',
      onUpdate: () => {
        setCount(Math.round(obj.val));
        if (barRef.current) barRef.current.style.width = `${obj.val}%`;
      },
      onComplete: () => {
        // Phase 2: Brand reveal — counter fades, "HILLTOP" appears
        setPhase('reveal');
        const tl = gsap.timeline();

        // Fade counter out
        if (contentRef.current) {
          tl.to(contentRef.current, { opacity: 0, y: -15, duration: 0.5, ease: 'power2.in' }, 0);
        }

        // Fade brand in
        tl.call(() => setPhase('reveal'), [], 0.4);
        if (brandRef.current) {
          tl.fromTo(brandRef.current,
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            0.5
          );
        }

        // Hold for a beat, then exit
        tl.to({}, { duration: 0.8 });
        if (brandRef.current) {
          tl.to(brandRef.current, { scale: 1.3, opacity: 0, filter: 'blur(20px)', duration: 0.7, ease: 'power2.in' });
        }
        if (containerRef.current) {
          tl.to(containerRef.current, { opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.3');
        }
        tl.call(() => { setVisible(false); onComplete(); });
      },
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#030308] overflow-hidden">
      <LiquidScene progress={count} />

      {/* Dark safe zone behind text */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 35% at center, rgba(3,3,8,0.7) 0%, transparent 100%)',
      }} />

      {/* Counter phase */}
      <div ref={contentRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
        <div className="text-center">
          <span className="font-heading font-bold tabular-nums block leading-none" style={{
            fontSize: 'clamp(72px, 20vw, 260px)',
            letterSpacing: '-0.04em',
            color: '#E8D5A3',
            textShadow: '0 0 40px rgba(201,169,110,0.35), 0 0 80px rgba(201,169,110,0.15), 0 2px 60px rgba(0,0,0,0.8)',
          }}>
            {String(count).padStart(3, '0')}
          </span>

          <div className="mt-5 flex flex-col items-center gap-4">
            <div className="h-px w-32 overflow-hidden md:w-48" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div ref={barRef} className="h-full w-0" style={{
                background: 'linear-gradient(90deg, #6B7B8D, #C9A96E)',
              }} />
            </div>
            <span className="text-[13px] uppercase tracking-[0.45em] font-medium" style={{ color: '#B0BFCF' }}>
              Hilltop Media
            </span>
          </div>
        </div>
      </div>

      {/* Brand reveal phase */}
      <div ref={brandRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0 }}>
        <div className="text-center">
          <span className="font-heading font-bold uppercase block leading-none" style={{
            fontSize: 'clamp(36px, 8vw, 100px)',
            letterSpacing: '0.15em',
            color: '#E8D5A3',
            textShadow: '0 0 40px rgba(201,169,110,0.35), 0 0 80px rgba(201,169,110,0.15)',
          }}>
            Hilltop Media
          </span>
          <div className="mt-4">
            <span className="text-[12px] uppercase tracking-[0.5em] font-light" style={{ color: '#7A8A9D' }}>
              Creative that converts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
