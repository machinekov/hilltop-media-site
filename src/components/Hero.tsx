'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import ScrollIndicator from './ScrollIndicator';

/*
 * Background layers — portfolio images used as depth layers.
 * Each layer moves at a different rate on mouse movement (parallax).
 * Further layers move less (depth illusion).
 */
const BG_LAYERS = [
  // Back layer (moves least) — large, very dark
  { src: '/portfolio/prodigy-cover.jpg', depth: 0.02, scale: 1.15, opacity: 0.12, x: '-10%', y: '-5%' },
  { src: '/portfolio/nlps-cover.jpg', depth: 0.02, scale: 1.15, opacity: 0.1, x: '55%', y: '10%' },
  // Mid layer
  { src: '/portfolio/molibu-cover.jpg', depth: 0.04, scale: 1.0, opacity: 0.15, x: '-5%', y: '25%' },
  { src: '/portfolio/clipjuice-cover.jpg', depth: 0.04, scale: 0.9, opacity: 0.13, x: '60%', y: '30%' },
  // Front layer (moves most) — smaller, slightly brighter
  { src: '/portfolio/fuzzo-cover.jpg', depth: 0.07, scale: 0.7, opacity: 0.2, x: '10%', y: '55%' },
  { src: '/portfolio/ona-cover.jpg', depth: 0.07, scale: 0.65, opacity: 0.18, x: '70%', y: '50%' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Text entrance
    gsap.fromTo('.hero-line',
      { y: 80, opacity: 0, rotateX: 15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
    );

    gsap.fromTo('.hero-cta',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
    );

    // Background layers entrance — fade in with slight scale
    const layers = bgRef.current?.querySelectorAll('.bg-layer');
    if (layers) {
      layers.forEach((layer, i) => {
        gsap.fromTo(layer,
          { opacity: 0, scale: 1.3 },
          { opacity: parseFloat((layer as HTMLElement).dataset.opacity || '0.15'), scale: 1, duration: 2, delay: 0.2 + i * 0.1, ease: 'power2.out' }
        );
      });
    }

    // Scroll: everything fades out
    gsap.to(contentRef.current, {
      opacity: 0, y: -80, scale: 0.95, filter: 'blur(8px)',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '60% top', scrub: 0.5 },
    });

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: -150, opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '50% top', scrub: 0.5 },
      });
    }

    // Mouse parallax — each layer shifts based on its depth factor
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const mx = (e.clientX / window.innerWidth - 0.5);
      const my = (e.clientY / window.innerHeight - 0.5);

      const layerEls = bgRef.current.querySelectorAll('.bg-layer');
      layerEls.forEach((el) => {
        const depth = parseFloat((el as HTMLElement).dataset.depth || '0');
        const shiftX = mx * depth * 800;
        const shiftY = my * depth * 400;
        gsap.to(el, { x: shiftX, y: shiftY, duration: 1.2, ease: 'power2.out' });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Magnetic CTA
    const cta = ctaRef.current;
    const handleCtaMove = (e: MouseEvent) => {
      if (!cta) return;
      const rect = cta.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
      gsap.to(cta, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    };
    const handleCtaLeave = () => {
      gsap.to(cta, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
    };
    if (cta) {
      cta.addEventListener('mousemove', handleCtaMove);
      cta.addEventListener('mouseleave', handleCtaLeave);
    }

    // Particle canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: -0.12 + Math.random() * 0.24, vy: -0.2 + Math.random() * 0.08,
        size: 1 + Math.random() * 1.2, alpha: 0.03 + Math.random() * 0.07,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 232, 232, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (cta) { cta.removeEventListener('mousemove', handleCtaMove); cta.removeEventListener('mouseleave', handleCtaLeave); }
      ScrollTrigger.getAll().forEach((st) => { if (st.trigger === sectionRef.current) st.kill(); });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[160vh] items-start justify-center"
    >
      <div
        ref={contentRef}
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Layered parallax background — portfolio images as depth layers */}
        <div ref={bgRef} className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          {BG_LAYERS.map((layer, i) => (
            <div
              key={i}
              className="bg-layer absolute rounded-xl overflow-hidden"
              data-depth={layer.depth}
              data-opacity={layer.opacity}
              style={{
                left: layer.x,
                top: layer.y,
                width: `${layer.scale * 45}%`,
                aspectRatio: '4/3',
                opacity: 0,
                filter: `blur(${i < 2 ? 3 : i < 4 ? 1.5 : 0}px)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={layer.src}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.4) saturate(0.6)' }}
              />
            </div>
          ))}

          {/* Dark vignette on top of background layers */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 20%, rgba(10,10,10,0.85) 70%, rgba(10,10,10,0.95) 100%)',
            }}
          />
        </div>

        {/* Subtle center glow */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(254,200,30,0.015) 0%, transparent 50%)',
          }}
        />

        {/* Text content */}
        <div className="relative z-[3] text-center" style={{ perspective: '600px' }}>
          <h1 className="font-heading text-[clamp(56px,12vw,160px)] font-bold leading-[0.92] italic text-[#FAFAFA] mb-8 overflow-hidden">
            <span className="hero-line inline-block">Creative</span><br />
            <span className="hero-line inline-block text-[#E8E8E8]">that converts.</span>
          </h1>

          <div className="hero-cta">
            <a
              ref={ctaRef}
              href="#portfolio"
              className="inline-block rounded-full border border-[rgba(255,255,255,0.15)] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#999] transition-all duration-300 hover:border-[#FEC81E] hover:text-[#FEC81E] mb-12"
            >
              View our work
            </a>

            <ScrollIndicator />
          </div>
        </div>
      </div>
    </section>
  );
}
