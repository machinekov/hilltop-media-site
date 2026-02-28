'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      // Simple fade-up entrance for content elements
      gsap.fromTo(
        '.hero-enter',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: 'power3.out', delay: 0.15 }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col justify-between"
      style={{ backgroundColor: '#000000', minHeight: '42vh', paddingTop: '80px' }}
    >
      {/* Content — bottom-left aligned */}
      <div ref={contentRef} className="flex flex-col justify-end flex-1 px-[40px] pb-[48px] pt-[32px]">
        {/* Service tags */}
        <div className="flex gap-2 mb-6 hero-enter">
          <span className="tag-box">BRD</span>
          <span className="tag-box">WEB</span>
          <span className="tag-box">VID</span>
        </div>

        {/* Main headline */}
        <h1
          className="font-heading font-bold text-white leading-[0.92] hero-enter"
          style={{ fontSize: 'clamp(52px, 7vw, 92px)', maxWidth: '700px' }}
        >
          Hilltop Media
        </h1>

        {/* Tagline */}
        <p
          className="font-heading text-white hero-enter mt-3"
          style={{ fontSize: 'clamp(22px, 3vw, 40px)', opacity: 0.82, fontStyle: 'italic', fontWeight: 400 }}
        >
          Performance Creative Agency✻
        </p>
      </div>

      {/* Copyright — bottom right */}
      <div
        className="absolute bottom-[48px] right-[40px] text-[11px] font-medium tracking-[0.06em] hero-enter"
        style={{
          color: 'rgba(255,255,255,0.35)',
          fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
        }}
      >
        ©2019-2026
      </div>
    </section>
  );
}
