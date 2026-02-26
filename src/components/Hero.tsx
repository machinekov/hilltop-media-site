'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { HERO } from '@/lib/constants';
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

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Cinematic fade out on scroll
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

    // Floating portfolio cards animation
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll('.hero-card');

      // Initial state: scattered, transparent, rotated
      cards.forEach((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2;
        const radius = 280 + Math.random() * 80;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.5;
        const rotation = -15 + Math.random() * 30;
        const rotY = -20 + Math.random() * 40;

        gsap.set(card, {
          x,
          y,
          rotation,
          rotateY: rotY,
          scale: 0.6 + Math.random() * 0.3,
          opacity: 0,
        });

        // Entrance animation
        gsap.to(card, {
          opacity: 0.15 + Math.random() * 0.15,
          duration: 1.5,
          delay: 0.8 + i * 0.15,
          ease: 'power2.out',
        });

        // Continuous floating
        gsap.to(card, {
          y: `+=${20 + Math.random() * 30}`,
          x: `+=${-10 + Math.random() * 20}`,
          rotation: `+=${-5 + Math.random() * 10}`,
          duration: 4 + Math.random() * 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.3,
        });
      });

      // Cards fade out on scroll with parallax
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

    // Subtle particle canvas
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

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: -0.2 + Math.random() * 0.4,
        vy: -0.3 + Math.random() * 0.1,
        size: 1 + Math.random() * 1.5,
        alpha: 0.05 + Math.random() * 0.15,
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
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[200vh] items-start justify-center"
    >
      <div
        ref={contentRef}
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
        />

        {/* Floating portfolio cards behind text */}
        <div
          ref={cardsContainerRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
          style={{ perspective: '800px' }}
        >
          {HERO_IMAGES.map((src, i) => (
            <div
              key={i}
              className="hero-card absolute rounded-lg overflow-hidden shadow-2xl"
              style={{
                width: `${120 + i * 10}px`,
                height: `${160 + i * 12}px`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Main text content */}
        <div className="relative z-[2] text-center">
          {/* Pre-title */}
          <span className="mb-6 block text-sm uppercase tracking-[0.3em] text-[#666666] md:text-base font-medium">
            {HERO.preTitle}
          </span>

          {/* Tagline — BIG, the hero text */}
          <h1 className="font-heading text-[clamp(48px,10vw,140px)] font-bold leading-[0.95] italic text-[#FAFAFA] mb-6">
            Creative
            <br />
            <span className="text-[#E8E8E8]">that converts.</span>
          </h1>

          {/* Small logo */}
          <div className="mx-auto w-[180px] md:w-[220px] opacity-60 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/hilltop-logo.png"
              alt="Hilltop Media"
              className="w-full h-auto"
            />
          </div>

          {/* Scroll indicator */}
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
