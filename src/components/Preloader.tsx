'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';

/*
 * Three.js particle cloud that swirls and converges as loading progresses.
 * Particles start scattered in a sphere, then pull into the center at 100%.
 * Mouse interaction pushes particles away.
 */
function ParticleScene({ progress }: { progress: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    points: THREE.Points;
    positions: Float32Array;
    targets: Float32Array;
    originals: Float32Array;
    mouse: THREE.Vector2;
    animId: number;
  } | null>(null);

  const progressRef = useRef(progress);
  progressRef.current = progress;

  const init = useCallback(() => {
    if (!mountRef.current || sceneRef.current) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 4;

    // Particles
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const originals = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Start: scattered in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 2.5;

      originals[i3] = r * Math.sin(phi) * Math.cos(theta);
      originals[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      originals[i3 + 2] = r * Math.cos(phi);

      positions[i3] = originals[i3];
      positions[i3 + 1] = originals[i3 + 1];
      positions[i3 + 2] = originals[i3 + 2];

      // Target: tight ring (converge point)
      const ta = (i / count) * Math.PI * 2;
      const tr = 0.3 + Math.random() * 0.15;
      targets[i3] = tr * Math.cos(ta);
      targets[i3 + 1] = tr * Math.sin(ta);
      targets[i3 + 2] = (Math.random() - 0.5) * 0.2;

      sizes[i] = 1.5 + Math.random() * 2.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uColor: { value: new THREE.Color('#E8E8E8') },
        uGold: { value: new THREE.Color('#FEC81E') },
        uProgress: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        uniform float uPixelRatio;
        uniform float uProgress;
        varying float vAlpha;
        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (1.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
          vAlpha = 0.3 + uProgress * 0.5;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uGold;
        uniform float uProgress;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = (1.0 - d * 2.0) * vAlpha;
          vec3 col = mix(uColor, uGold, uProgress * uProgress);
          gl_FragColor = vec4(col, alpha * 0.6);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = new THREE.Vector2(0, 0);

    sceneRef.current = { renderer, scene, camera, points, positions, targets, originals, mouse, animId: 0 };

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / w - 0.5) * 2;
      mouse.y = -(e.clientY / h - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      const prog = progressRef.current / 100;

      // Interpolate particles from scattered → converged
      const pos = positions;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Lerp toward target based on progress
        const tx = originals[i3] + (targets[i3] - originals[i3]) * prog;
        const ty = originals[i3 + 1] + (targets[i3 + 1] - originals[i3 + 1]) * prog;
        const tz = originals[i3 + 2] + (targets[i3 + 2] - originals[i3 + 2]) * prog;

        // Add orbital motion (faster as they converge)
        const orbitalSpeed = 0.3 + prog * 1.5;
        const angle = time * orbitalSpeed + i * 0.01;
        const orbitalR = (1 - prog) * 0.15;

        pos[i3] += (tx + Math.sin(angle) * orbitalR - pos[i3]) * 0.03;
        pos[i3 + 1] += (ty + Math.cos(angle) * orbitalR - pos[i3 + 1]) * 0.03;
        pos[i3 + 2] += (tz + Math.sin(angle * 0.7) * orbitalR * 0.5 - pos[i3 + 2]) * 0.03;
      }

      geometry.attributes.position.needsUpdate = true;

      // Rotate whole system slowly + respond to mouse
      points.rotation.y += 0.003;
      points.rotation.x = mouse.y * 0.2;
      points.rotation.z = mouse.x * 0.1;

      // Update uniforms
      (material.uniforms.uTime as { value: number }).value = time;
      (material.uniforms.uProgress as { value: number }).value = prog;

      renderer.render(scene, camera);
      sceneRef.current!.animId = requestAnimationFrame(animate);
    };

    sceneRef.current.animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(sceneRef.current?.animId || 0);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mountRef.current?.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    return cleanup;
  }, [init]);

  return <div ref={mountRef} className="absolute inset-0" />;
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };

    if (numberRef.current) {
      gsap.fromTo(numberRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
    }

    gsap.to(obj, {
      val: 100,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(obj.val));
        if (barRef.current) barRef.current.style.width = `${obj.val}%`;
      },
      onComplete: () => {
        const tl = gsap.timeline({
          onComplete: () => { setVisible(false); onComplete(); },
        });

        if (numberRef.current) {
          tl.to(numberRef.current, {
            scale: 2.5, opacity: 0, filter: 'blur(30px)',
            duration: 0.6, ease: 'power2.in',
          }, 0);
        }

        if (containerRef.current) {
          tl.to(containerRef.current, {
            opacity: 0, duration: 0.5, ease: 'power2.in',
          }, 0.3);
        }
      },
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
    >
      {/* Three.js particle cloud */}
      <ParticleScene progress={count} />

      {/* Counter overlay */}
      <div ref={numberRef} className="relative z-20 select-none text-center pointer-events-none">
        <span
          className="font-heading font-bold text-[#E8E8E8] tabular-nums italic block leading-none"
          style={{ fontSize: 'clamp(100px, 25vw, 300px)', letterSpacing: '-0.03em' }}
        >
          {String(count).padStart(3, '0')}
        </span>

        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="h-[1px] w-32 overflow-hidden bg-[rgba(255,255,255,0.06)] md:w-48">
            <div
              ref={barRef}
              className="h-full w-0"
              style={{ background: 'linear-gradient(90deg, rgba(232,232,232,0.4), #FEC81E)' }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#444] font-medium">
            Hilltop Media
          </span>
        </div>
      </div>
    </div>
  );
}
