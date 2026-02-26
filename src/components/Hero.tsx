'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import ScrollIndicator from './ScrollIndicator';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
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

    // Background image: slow Ken Burns zoom
    if (bgImageRef.current) {
      gsap.fromTo(bgImageRef.current,
        { scale: 1.05 },
        { scale: 1.2, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true }
        }
      );
    }

    // Background fades away on scroll (Iron Hill dissolve)
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: '40% top', end: '80% top', scrub: 0.5 },
      });
    }

    // Overlay intensifies as you scroll (darkens before dissolve)
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        scrollTrigger: { trigger: sectionRef.current, start: '30% top', end: '70% top', scrub: 0.5 },
      });
    }

    // Text content fades out
    gsap.to(contentRef.current, {
      opacity: 0, y: -80, scale: 0.95, filter: 'blur(8px)',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '60% top', scrub: 0.5 },
    });

    // Mouse parallax on background
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgImageRef.current) return;
      const mx = (e.clientX / window.innerWidth - 0.5) * 15;
      const my = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to(bgImageRef.current, { x: mx, y: my, duration: 1.2, ease: 'power2.out' });
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
    const handleCtaLeave = () => { gsap.to(cta, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' }); };
    if (cta) { cta.addEventListener('mousemove', handleCtaMove); cta.addEventListener('mouseleave', handleCtaLeave); }

    // Particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: -0.1 + Math.random() * 0.2, vy: -0.2 + Math.random() * 0.08,
        size: 1 + Math.random() * 1.2, alpha: 0.03 + Math.random() * 0.06,
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 232, 232, ${p.alpha})`; ctx.fill();
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
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-bleed background image — the "majestic" layer */}
        <div
          ref={bgImageRef}
          className="absolute inset-[-10%] z-0"
        >
          {/* Composite: multiple portfolio images blended into one moody background */}
          <div className="relative w-full h-full">
            {/* Primary: Molibu architecture — dramatic, majestic */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portfolio/molibu-cover.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.3) saturate(0.4) contrast(1.1)' }}
            />
            {/* Secondary overlay images for texture/depth */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portfolio/nlps-cover.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-soft-light opacity-40"
              style={{ filter: 'brightness(0.5)' }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portfolio/prodigy-cover.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
            />
          </div>
        </div>

        {/* Gradient overlays for mood */}
        <div className="absolute inset-0 z-[1]" style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.5) 100%)',
        }} />
        <div className="absolute inset-0 z-[1]" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.7) 100%)',
        }} />

        {/* Dark overlay that intensifies on scroll (before dissolve) */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[2] bg-[#0A0A0A] opacity-0"
        />

        {/* Particles */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[3]" />

        {/* Subtle warm glow at center */}
        <div className="absolute inset-0 z-[3] pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(254,200,30,0.02) 0%, transparent 50%)',
        }} />

        {/* Text content */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-[4] flex flex-col items-center justify-center px-6"
        >
          <div className="text-center" style={{ perspective: '600px' }}>
            <h1 className="font-heading text-[clamp(56px,12vw,160px)] font-bold leading-[0.92] italic text-[#FAFAFA] mb-8 overflow-hidden">
              <span className="hero-line inline-block">Creative</span><br />
              <span className="hero-line inline-block text-[#E8E8E8]">that converts.</span>
            </h1>

            <div className="hero-cta">
              <a
                ref={ctaRef}
                href="#portfolio"
                className="inline-block rounded-full border border-[rgba(255,255,255,0.2)] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#BBB] transition-all duration-300 hover:border-[#FEC81E] hover:text-[#FEC81E] mb-12 backdrop-blur-sm"
              >
                View our work
              </a>

              <ScrollIndicator />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
