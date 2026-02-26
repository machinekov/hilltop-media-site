'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';

/*
 * HILLTOP particle text preloader.
 * 1. Counter 0→100 while particles drift randomly
 * 2. At ~70%: particles assemble into "HILLTOP"
 * 3. At 100%: text formed, brief hold
 * 4. Expansion: text scales up slowly
 * 5. EXPLOSION: particles scatter outward with physics
 * 6. Container fades, revealing homepage
 */

function ParticleText({ progress, phase }: { progress: number; phase: 'loading' | 'hold' | 'expand' | 'explode' | 'done' }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const progressRef = useRef(progress);
  const phaseRef = useRef(phase);
  progressRef.current = progress;
  phaseRef.current = phase;

  const init = useCallback(() => {
    if (!mountRef.current || rendererRef.current) return;
    const w = window.innerWidth, h = window.innerHeight;

    // ── Sample text pixels to get particle positions ──
    const canvas2d = document.createElement('canvas');
    const textScale = Math.min(w, 1600);
    canvas2d.width = textScale;
    canvas2d.height = textScale * 0.3;
    const ctx2d = canvas2d.getContext('2d')!;
    const fontSize = Math.floor(textScale * 0.18);
    ctx2d.fillStyle = '#fff';
    ctx2d.font = `900 ${fontSize}px "Space Grotesk", sans-serif`;
    ctx2d.textAlign = 'center';
    ctx2d.textBaseline = 'middle';
    ctx2d.fillText('HILLTOP', canvas2d.width / 2, canvas2d.height / 2);

    const imgData = ctx2d.getImageData(0, 0, canvas2d.width, canvas2d.height);
    const textPositions: { x: number; y: number }[] = [];
    const step = 3; // sample every 3rd pixel for density
    for (let y = 0; y < canvas2d.height; y += step) {
      for (let x = 0; x < canvas2d.width; x += step) {
        const i = (y * canvas2d.width + x) * 4;
        if (imgData.data[i + 3] > 128) {
          textPositions.push({
            x: (x / canvas2d.width - 0.5) * 6,
            y: -(y / canvas2d.height - 0.5) * 1.8,
          });
        }
      }
    }

    const count = Math.min(textPositions.length, 12000);

    // ── Three.js setup ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 5;

    // ── Particle buffers ──
    const positions = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);
    const randomPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const tp = textPositions[i % textPositions.length];

      // Target: text position
      targetPositions[i3] = tp.x;
      targetPositions[i3 + 1] = tp.y;
      targetPositions[i3 + 2] = (Math.random() - 0.5) * 0.3;

      // Random: scattered positions
      randomPositions[i3] = (Math.random() - 0.5) * 10;
      randomPositions[i3 + 1] = (Math.random() - 0.5) * 6;
      randomPositions[i3 + 2] = (Math.random() - 0.5) * 4;

      // Start at random
      positions[i3] = randomPositions[i3];
      positions[i3 + 1] = randomPositions[i3 + 1];
      positions[i3 + 2] = randomPositions[i3 + 2];

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      sizes[i] = 1.5 + Math.random() * 2.5;
      alphas[i] = 0.6 + Math.random() * 0.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uGlobalAlpha: { value: 1.0 },
        uColor: { value: new THREE.Color('#E8D5A3') },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aAlpha;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vAlpha = aAlpha;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio * (2.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uGlobalAlpha;
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.1, d) * vAlpha * uGlobalAlpha;
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ── Mouse ──
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / w - 0.5) * 2;
      mouse.y = -(e.clientY / h - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);
    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // ── State for explosion ──
    let exploded = false;
    let expandScale = 1;
    let globalAlpha = 1;

    // ── Render loop ──
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const phase = phaseRef.current;
      const prog = progressRef.current / 100;
      const posAttr = geo.attributes.position as THREE.BufferAttribute;

      if (phase === 'loading') {
        // Morph from random to text based on progress
        // Assembly starts at 50% progress, fully formed at 100%
        const assemblyProgress = Math.max(0, (prog - 0.4) / 0.6);
        const t = assemblyProgress * assemblyProgress; // ease in

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          // Stagger: each particle starts assembling at slightly different times
          const stagger = (i / count) * 0.3;
          const localT = Math.max(0, Math.min(1, (t - stagger) / (1 - stagger)));

          positions[i3] = randomPositions[i3] + (targetPositions[i3] - randomPositions[i3]) * localT;
          positions[i3 + 1] = randomPositions[i3 + 1] + (targetPositions[i3 + 1] - randomPositions[i3 + 1]) * localT;
          positions[i3 + 2] = randomPositions[i3 + 2] + (targetPositions[i3 + 2] - randomPositions[i3 + 2]) * localT;

          // Add gentle drift when not assembled
          if (localT < 0.9) {
            const drift = Math.sin(clock.elapsedTime * 0.5 + i * 0.1) * 0.002;
            positions[i3] += drift;
            positions[i3 + 1] += Math.cos(clock.elapsedTime * 0.3 + i * 0.15) * 0.002;
          }
        }
      } else if (phase === 'hold') {
        // Particles at text positions, subtle shimmer
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          positions[i3] = targetPositions[i3] + Math.sin(clock.elapsedTime * 2 + i * 0.05) * 0.003;
          positions[i3 + 1] = targetPositions[i3 + 1] + Math.cos(clock.elapsedTime * 1.5 + i * 0.07) * 0.003;
          positions[i3 + 2] = targetPositions[i3 + 2];
        }
      } else if (phase === 'expand') {
        // Text slowly expands
        expandScale += dt * 0.3;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          positions[i3] = targetPositions[i3] * expandScale;
          positions[i3 + 1] = targetPositions[i3 + 1] * expandScale;
          positions[i3 + 2] = targetPositions[i3 + 2];
        }
      } else if (phase === 'explode') {
        // Initialize explosion velocities once
        if (!exploded) {
          exploded = true;
          for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Velocity: outward from center + random spread
            const px = positions[i3];
            const py = positions[i3 + 1];
            const dist = Math.sqrt(px * px + py * py) + 0.1;
            const speed = 3 + Math.random() * 8;
            velocities[i3] = (px / dist) * speed + (Math.random() - 0.5) * 4;
            velocities[i3 + 1] = (py / dist) * speed + (Math.random() - 0.5) * 4 + Math.random() * 2;
            velocities[i3 + 2] = (Math.random() - 0.5) * 6;
          }
        }

        // Physics update
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          velocities[i3 + 1] -= dt * 2; // gravity
          velocities[i3] *= 0.98; // drag
          velocities[i3 + 1] *= 0.98;
          velocities[i3 + 2] *= 0.98;
          positions[i3] += velocities[i3] * dt;
          positions[i3 + 1] += velocities[i3 + 1] * dt;
          positions[i3 + 2] += velocities[i3 + 2] * dt;
        }

        // Fade out
        globalAlpha = Math.max(0, globalAlpha - dt * 1.2);
        mat.uniforms.uGlobalAlpha.value = globalAlpha;
      }

      posAttr.needsUpdate = true;

      // Camera subtle movement
      camera.position.x = mouse.x * 0.15;
      camera.position.y = mouse.y * 0.1;
      camera.lookAt(0, 0, 0);

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
  const [phase, setPhase] = useState<'loading' | 'hold' | 'expand' | 'explode' | 'done'>('loading');
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };

    // Phase 1: Count 0→100
    gsap.to(obj, {
      val: 100, duration: 3.5, ease: 'power1.inOut',
      onUpdate: () => {
        const v = Math.round(obj.val);
        setCount(v);
        if (barRef.current) barRef.current.style.width = `${obj.val}%`;
      },
      onComplete: () => {
        // Phase 2: Hold — text fully formed
        setPhase('hold');

        // Fade counter out
        if (counterRef.current) {
          gsap.to(counterRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' });
        }

        // Phase 3: Expand after brief pause
        gsap.delayedCall(0.6, () => setPhase('expand'));

        // Phase 4: EXPLODE
        gsap.delayedCall(1.4, () => setPhase('explode'));

        // Phase 5: Fade container + done
        gsap.delayedCall(2.2, () => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.in',
              onComplete: () => { setVisible(false); onComplete(); },
            });
          }
        });
      },
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#060608] overflow-hidden">
      <ParticleText progress={count} phase={phase} />

      {/* Counter overlay */}
      <div ref={counterRef} className="absolute inset-0 z-20 flex items-center justify-end px-12 pb-12 pointer-events-none select-none"
        style={{ alignItems: 'flex-end' }}>
        <div className="text-right">
          <span className="font-heading font-bold tabular-nums block leading-none" style={{
            fontSize: 'clamp(48px, 10vw, 120px)',
            color: 'rgba(232, 213, 163, 0.7)',
            letterSpacing: '-0.03em',
          }}>
            {String(count).padStart(3, '0')}
          </span>
          <div className="mt-3 flex flex-col items-end gap-3">
            <div className="h-px w-24 overflow-hidden md:w-32" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div ref={barRef} className="h-full w-0" style={{
                background: 'linear-gradient(90deg, rgba(100,100,120,0.3), rgba(201,169,110,0.6))',
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
