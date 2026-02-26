'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import ScrollIndicator from './ScrollIndicator';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Text entrance ──
      gsap.fromTo('.hero-word',
        { y: 100, opacity: 0, rotateX: 20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.3, stagger: 0.12, ease: 'power4.out', delay: 0.3 }
      );
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.9 }
        );
      }

      // ── Scroll timeline: zoom-through ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Background: Ken Burns zoom + parallax
      if (bgRef.current) {
        tl.to(bgRef.current, { scale: 1.35, y: '-15%', duration: 1, ease: 'none' }, 0);
      }

      // CTA fades first
      if (ctaRef.current) {
        tl.to(ctaRef.current, { opacity: 0, y: -50, duration: 0.15 }, 0);
      }

      // Headline: zoom through + blur + fade
      if (headlineRef.current) {
        tl.to(headlineRef.current, {
          scale: 5,
          y: '-25vh',
          opacity: 0,
          filter: 'blur(20px)',
          duration: 0.6,
          ease: 'power2.in',
        }, 0.05);
      }

      // Overlay darkens (cinematic fade to black before next section)
      if (overlayRef.current) {
        tl.to(overlayRef.current, { opacity: 1, duration: 0.35 }, 0.5);
      }

    }, sectionRef);

    // ── Mouse parallax ──
    const handleMouse = (e: MouseEvent) => {
      if (!bgRef.current || !headlineRef.current) return;
      const mx = (e.clientX / window.innerWidth - 0.5);
      const my = (e.clientY / window.innerHeight - 0.5);
      gsap.to(bgRef.current, { x: mx * -12, y: my * -8, duration: 1.5, ease: 'power2.out' });
      gsap.to(headlineRef.current, { x: mx * 6, y: my * 4, duration: 1.2, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouse);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Background image: dramatic skyscrapers ── */}
        <div ref={bgRef} className="absolute inset-[-8%] z-0 will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(0.35) saturate(0.7) contrast(1.15)',
            }}
          />
          {/* Warm color grade overlay — pulls gold from the window lights */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, rgba(10,8,5,0.3) 0%, rgba(10,8,5,0) 40%, rgba(10,8,5,0.5) 100%)',
            mixBlendMode: 'multiply',
          }} />
        </div>

        {/* Gradient overlays for cinematic depth */}
        <div className="absolute inset-0 z-[1]" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 45%, transparent 20%, rgba(6,6,8,0.6) 100%),
            linear-gradient(180deg, rgba(6,6,8,0.2) 0%, transparent 30%, rgba(6,6,8,0.7) 100%)
          `,
        }} />

        {/* Gold accent glow where the building lights are */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{
          background: 'radial-gradient(ellipse 40% 50% at 50% 55%, rgba(201,169,110,0.04) 0%, transparent 100%)',
        }} />

        {/* Scroll fade-to-black overlay */}
        <div ref={overlayRef} className="absolute inset-0 z-[2] bg-[#0A0A0A] opacity-0" />

        {/* Film grain */}
        <div className="absolute inset-0 z-[3] opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px',
          }}
        />

        {/* ── Content ── */}
        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6">

          <div ref={headlineRef} className="text-center will-change-transform" style={{ perspective: '800px' }}>
            <h1 className="font-heading font-bold leading-[0.92] text-white"
              style={{
                fontSize: 'clamp(52px, 12vw, 170px)',
                textShadow: '0 4px 60px rgba(0,0,0,0.5)',
              }}>
              <span className="overflow-hidden inline-block">
                <span className="hero-word inline-block italic">Creative</span>
              </span>
              <br />
              <span className="overflow-hidden inline-block">
                <span className="hero-word inline-block italic" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  that converts.
                </span>
              </span>
            </h1>

            <p className="hero-word mt-6 text-sm md:text-base text-[rgba(255,255,255,0.4)] tracking-wide max-w-md mx-auto"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              Branding. Design. Advertising. One agency, zero fluff.
            </p>
          </div>

          <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-6">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.15)] px-9 py-4 text-xs uppercase tracking-[0.3em] text-[rgba(255,255,255,0.6)] transition-all duration-500 hover:border-[rgba(201,169,110,0.4)] hover:text-[#C9A96E] hover:shadow-[0_0_30px_rgba(201,169,110,0.08)] backdrop-blur-sm"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            >
              <span>View our work</span>
              <svg className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 6h10M7 2l4 4-4 4" />
              </svg>
            </a>
            <ScrollIndicator />
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-10 h-[1.5px] bg-[rgba(255,255,255,0.08)] z-[4]" />
        <div className="absolute top-8 left-8 w-[1.5px] h-10 bg-[rgba(255,255,255,0.08)] z-[4]" />
        <div className="absolute top-8 right-8 w-10 h-[1.5px] bg-[rgba(255,255,255,0.08)] z-[4]" />
        <div className="absolute top-8 right-8 w-[1.5px] h-10 bg-[rgba(255,255,255,0.08)] z-[4]" />
        <div className="absolute bottom-8 left-8 w-10 h-[1.5px] bg-[rgba(255,255,255,0.08)] z-[4]" />
        <div className="absolute bottom-8 left-8 w-[1.5px] h-10 bg-[rgba(255,255,255,0.08)] z-[4]" />
        <div className="absolute bottom-8 right-8 w-10 h-[1.5px] bg-[rgba(255,255,255,0.08)] z-[4]" />
        <div className="absolute bottom-8 right-8 w-[1.5px] h-10 bg-[rgba(255,255,255,0.08)] z-[4]" />
      </div>
    </section>
  );
}
