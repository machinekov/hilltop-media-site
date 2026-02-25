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

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -80,
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
        <span className="mb-4 text-sm uppercase tracking-[0.3em] text-[#888888] md:text-base">
          {HERO.preTitle}
        </span>

        {/* Massive wordmark */}
        <h1 className="font-heading text-center text-[clamp(60px,15vw,180px)] font-bold leading-[0.9] text-[#FAFAFA]">
          HILLTOP
        </h1>
        <h1 className="font-heading text-center text-[clamp(30px,7vw,80px)] font-bold leading-[0.9] text-[#FEC81E]">
          MEDIA
        </h1>

        {/* Tagline */}
        <p className="mt-8 text-lg text-[#888888] md:text-xl">
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
