'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { HERO } from '@/lib/constants';
import ScrollIndicator from './ScrollIndicator';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Cinematic fade out: scale-down + blur as user scrolls away
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

    return () => {
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
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6"
      >
        {/* Pre-title */}
        <span className="mb-6 text-sm uppercase tracking-[0.3em] text-[#666666] md:text-base font-medium">
          {HERO.preTitle}
        </span>

        {/* Logo image — using <img> for reliable rendering */}
        <div className="relative w-full max-w-[800px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/hilltop-logo.png"
            alt="Hilltop Media"
            className="w-full h-auto"
          />
        </div>

        {/* Tagline */}
        <p className="mt-8 font-heading text-xl italic text-[#666666] md:text-2xl">
          {HERO.tagline}
        </p>

        {/* Scroll indicator */}
        <div className="mt-16">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
