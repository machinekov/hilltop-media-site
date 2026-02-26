'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';

/*
 * Full-screen flowing aurora shader.
 * Technique: layered FBM noise in fragment shader creates flowing gradient bands.
 * Palette: dark base with warm champagne-gold and cool steel aurora ribbons.
 * Inspired by: Stripe gradient mesh, Linear aurora, Lusion fluid art.
 */
function AuroraScene({ progress }: { progress: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const init = useCallback(() => {
    if (!mountRef.current || rendererRef.current) return;
    const w = window.innerWidth, h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
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

        // Simplex-like noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m * m;
          m = m * m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        // FBM (Fractional Brownian Motion)
        float fbm(vec2 p) {
          float f = 0.0;
          float w = 0.5;
          for (int i = 0; i < 6; i++) {
            f += w * snoise(p);
            p *= 2.0;
            w *= 0.5;
          }
          return f;
        }

        // Domain warping — creates the flowing aurora effect
        float warpedFBM(vec2 p, float t) {
          vec2 q = vec2(
            fbm(p + vec2(1.7, 9.2) + t * 0.15),
            fbm(p + vec2(8.3, 2.8) + t * 0.12)
          );
          vec2 r = vec2(
            fbm(p + 4.0 * q + vec2(1.2, 3.4) + t * 0.1),
            fbm(p + 4.0 * q + vec2(4.7, 9.1) + t * 0.08)
          );
          return fbm(p + 3.5 * r);
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / uResolution.y;
          vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

          // Mouse influence — shifts the flow field
          vec2 mouseOffset = (uMouse - 0.5) * 0.3;
          p += mouseOffset;

          float t = uTime;
          float prog = uProgress;

          // Two warped FBM layers for depth
          float f1 = warpedFBM(p * 1.2, t);
          float f2 = warpedFBM(p * 0.8 + vec2(5.0), t * 0.7);

          // Combine layers
          float f = mix(f1, f2, 0.5);

          // Palette — VIVID, luminous aurora bands
          vec3 bgDark = vec3(0.015, 0.015, 0.025);
          vec3 warmGold = vec3(0.82, 0.62, 0.22);       // champagne gold
          vec3 deepAmber = vec3(0.55, 0.28, 0.08);       // deep amber
          vec3 coolSteel = vec3(0.3, 0.38, 0.55);        // steel blue
          vec3 highlight = vec3(1.0, 0.88, 0.55);        // bright gold highlight
          vec3 deepViolet = vec3(0.15, 0.05, 0.25);      // deep purple

          // Remap noise to create visible luminous bands
          float band1 = smoothstep(-0.3, 0.2, f);
          float band2 = smoothstep(-0.1, 0.4, f);
          float band3 = smoothstep(0.1, 0.5, f);
          float peak = smoothstep(0.35, 0.55, f);
          float hotSpot = smoothstep(0.45, 0.6, f);

          // Build up from dark base — each band adds luminous color
          vec3 col = bgDark;
          col = mix(col, deepViolet * 1.5, band1 * 0.6);
          col = mix(col, coolSteel * 0.8, band1 * 0.4);
          col = mix(col, deepAmber * 1.2, band2 * 0.5);
          col = mix(col, warmGold, band3 * 0.6);
          col += highlight * peak * 0.3;
          col += highlight * hotSpot * 0.25;

          // Glow: bright streaks where noise peaks
          float streak = smoothstep(0.4, 0.55, f);
          col += warmGold * streak * 0.3;

          // Progress intensifies everything
          float intensity = 0.5 + prog * 0.5;
          col = mix(bgDark * 1.5, col, intensity);

          // Subtle noise grain for texture
          float grain = (snoise(uv * 300.0 + t) * 0.5 + 0.5) * 0.015;
          col += grain;

          // Vignette
          float vig = 1.0 - smoothstep(0.3, 1.0, length((uv - 0.5) * 1.8));
          col *= 0.6 + vig * 0.4;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const mouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / w;
      mouse.y = 1.0 - e.clientY / h;
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
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.03;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.03;

      mat.uniforms.uTime.value = t;
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
  return <div ref={mountRef} className="absolute inset-0" />;
}

/* ── Preloader ── */
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    if (numberRef.current) {
      gsap.fromTo(numberRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 });
    }
    gsap.to(obj, {
      val: 100, duration: 3.5, ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(obj.val));
        if (barRef.current) barRef.current.style.width = `${obj.val}%`;
      },
      onComplete: () => {
        const tl = gsap.timeline({ onComplete: () => { setVisible(false); onComplete(); } });
        if (numberRef.current) tl.to(numberRef.current, { scale: 2, opacity: 0, filter: 'blur(30px)', duration: 0.8, ease: 'power2.in' }, 0);
        if (containerRef.current) tl.to(containerRef.current, { opacity: 0, duration: 0.7, ease: 'power2.in' }, 0.4);
      },
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#0A0A0A] overflow-hidden">
      <AuroraScene progress={count} />

      <div ref={numberRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
        <div className="text-center">
          <span className="font-heading font-bold tabular-nums italic block leading-none" style={{
            fontSize: 'clamp(80px, 22vw, 280px)',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(180deg, #F0EDE8 0%, #C9A96E 50%, #F0EDE8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 80px rgba(201, 169, 110, 0.15))',
          }}>
            {String(count).padStart(3, '0')}
          </span>
          <div className="mt-6 flex flex-col items-center gap-5">
            <div className="h-[1px] w-40 overflow-hidden bg-[rgba(255,255,255,0.04)] md:w-56">
              <div ref={barRef} className="h-full w-0" style={{
                background: 'linear-gradient(90deg, #6B7B8D, #C9A96E)',
              }} />
            </div>
            <span className="text-[12px] uppercase tracking-[0.4em] font-medium" style={{ color: '#8A9BAE' }}>
              Hilltop Media
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
