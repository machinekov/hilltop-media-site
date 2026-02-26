'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import ScrollIndicator from './ScrollIndicator';

const HERO_IMAGES = [
  '/portfolio/prodigy-cover.jpg',
  '/portfolio/nlps-cover.jpg',
  '/portfolio/molibu-cover.jpg',
  '/portfolio/clipjuice-cover.jpg',
  '/portfolio/fuzzo-cover.jpg',
  '/portfolio/ona-cover.jpg',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Text entrance animation
    gsap.fromTo('.hero-line',
      { y: 80, opacity: 0, rotateX: 15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
    );

    // CTA fade in after text
    gsap.fromTo('.hero-cta',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
    );

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -80,
      scale: 0.95,
      filter: 'blur(8px)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '60% top',
        scrub: 0.5,
      },
    });

    // Mouse parallax on cards container
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardsContainerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(cardsContainerRef.current, { x, y, duration: 0.8, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Magnetic cursor effect on CTA button
    const cta = ctaRef.current;
    const handleCtaMouseMove = (e: MouseEvent) => {
      if (!cta) return;
      const rect = cta.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.15;
      const dy = (e.clientY - cy) * 0.15;
      gsap.to(cta, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
    };
    const handleCtaMouseLeave = () => {
      if (!cta) return;
      gsap.to(cta, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
    };
    if (cta) {
      cta.addEventListener('mousemove', handleCtaMouseMove);
      cta.addEventListener('mouseleave', handleCtaMouseLeave);
    }

    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.hero-card');

      cards.forEach((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2;
        const radius = 320 + Math.random() * 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.45;
        const rotation = -12 + Math.random() * 24;
        const rotY = -15 + Math.random() * 30;

        gsap.set(card, {
          x,
          y,
          rotation,
          rotateY: rotY,
          scale: 0.7 + Math.random() * 0.25,
          opacity: 0,
        });

        gsap.to(card, {
          opacity: 0.35 + Math.random() * 0.2,
          duration: 1.5,
          delay: 0.6 + i * 0.12,
          ease: 'power2.out',
        });

        gsap.to(card, {
          y: `+=${15 + Math.random() * 25}`,
          x: `+=${-8 + Math.random() * 16}`,
          rotation: `+=${-4 + Math.random() * 8}`,
          duration: 5 + Math.random() * 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        });
      });

      gsap.to(cardsContainerRef.current, {
        y: -200,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 0.5,
        },
      });
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: -0.15 + Math.random() * 0.3,
        vy: -0.25 + Math.random() * 0.1,
        size: 1 + Math.random() * 1.5,
        alpha: 0.04 + Math.random() * 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
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
      if (cta) {
        cta.removeEventListener('mousemove', handleCtaMouseMove);
        cta.removeEventListener('mouseleave', handleCtaMouseLeave);
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
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
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
        />

        {/* Subtle radial glow behind text */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 65%)',
          }}
        />

        {/* Floating portfolio cards */}
        <div
          ref={cardsContainerRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
          style={{ perspective: '800px' }}
        >
          {HERO_IMAGES.map((src, i) => (
            <div
              key={i}
              className="hero-card absolute rounded-lg overflow-hidden"
              style={{
                width: `${180 + i * 12}px`,
                height: `${220 + i * 15}px`,
                transformStyle: 'preserve-3d',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Main text */}
        <div className="relative z-[2] text-center" style={{ perspective: '600px' }}>
          <h1 className="font-heading text-[clamp(56px,12vw,160px)] font-bold leading-[0.92] italic text-[#FAFAFA] mb-8 overflow-hidden">
            <span className="hero-line inline-block">Creative</span><br />
            <span className="hero-line inline-block text-[#E8E8E8]">that converts.</span>
          </h1>

          <div className="hero-cta">
            <a
              ref={ctaRef}
              href="#portfolio"
              className="inline-block rounded-full border border-[rgba(255,255,255,0.15)] px-8 py-3 text-xs uppercase tracking-[0.25em] text-[#999] transition-all duration-300 hover:border-[#E8E8E8] hover:text-[#FAFAFA] mb-12"
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
