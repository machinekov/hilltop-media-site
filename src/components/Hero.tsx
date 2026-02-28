'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleRef.current.querySelectorAll('.hero-line'),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
    );

    tl.fromTo(
      titleRef.current.querySelectorAll('.hero-meta'),
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full flex items-end"
      style={{
        backgroundColor: 'var(--hero-bg)',
        minHeight: '45vh',
        paddingBottom: 'clamp(40px, 5vh, 60px)',
      }}
    >
      <div ref={titleRef} className="page-margin w-full">
        {/* Service tags */}
        <div className="hero-line flex items-center gap-2 mb-4">
          {['BRD', 'WEB', 'VID', 'PKG'].map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.15em] uppercase px-2 py-1 border border-white/30"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Main title */}
        <div className="flex items-end justify-between w-full">
          <div>
            <h1
              className="hero-line font-heading leading-[0.9] tracking-tight"
              style={{
                color: 'var(--hero-text)',
                fontSize: 'clamp(48px, 7vw, 90px)',
              }}
            >
              Hilltop Media
            </h1>
            <p
              className="hero-line font-heading leading-[1.1] mt-1"
              style={{
                color: 'var(--hero-text)',
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 400,
              }}
            >
              Performance Creative Agency<span style={{ color: 'var(--accent)' }}>✻</span>
            </p>
          </div>

          <span
            className="hero-meta hidden md:block text-[10px] tracking-wider pb-2"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            ©2019–2026
          </span>
        </div>
      </div>
    </section>
  );
}
