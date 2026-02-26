'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { HERO } from '@/lib/constants';
import ScrollIndicator from './ScrollIndicator';
import Image from 'next/image';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Fade out hero content as user scrolls
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
        <span className="mb-6 text-sm uppercase tracking-[0.3em] text-[#888888] md:text-base">
          {HERO.preTitle}
        </span>

        {/* Logo image */}
        <div className="relative w-full max-w-[800px]">
          <Image
            src="/logo/hilltop-logo.png"
            alt="Hilltop Media"
            width={1050}
            height={365}
            className="w-full h-auto"
            priority
          />
        </div>

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
