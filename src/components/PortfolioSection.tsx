'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { PORTFOLIO } from '@/lib/constants';
import Image from 'next/image';

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.portfolio-card');

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.4,
          },
        }
      );
    });

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === sectionRef.current ||
          (cardsRef.current && cardsRef.current.contains(st.trigger as Node))
        ) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-32 px-6 md:px-16 lg:px-24"
    >
      {/* Section header */}
      <div ref={headingRef} className="mx-auto max-w-7xl mb-20 text-center">
        <span className="mb-6 block text-sm uppercase tracking-[0.3em] text-[#E8E8E8] font-medium">
          Our Work
        </span>
        <h2 className="font-heading text-[clamp(32px,6vw,72px)] font-bold leading-[1.1] italic text-[#FAFAFA]">
          Brands built, revenue driven.
        </h2>
      </div>

      {/* Portfolio cards */}
      <div ref={cardsRef} className="mx-auto flex max-w-7xl flex-col gap-12">
        {PORTFOLIO.map((item) => (
          <a
            key={item.title}
            href={item.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-card portfolio-card-hover group relative block w-full overflow-hidden rounded-2xl"
            style={{ height: 'clamp(350px, 65vh, 700px)' }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="portfolio-image object-cover"
              sizes="100vw"
            />
            {/* Gradient overlay */}
            <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 transition-opacity duration-700" />
            {/* Text overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transition-transform duration-500 group-hover:-translate-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#E8E8E8] mb-3">
                {item.category}
              </p>
              <h3 className="font-heading text-3xl font-bold text-[#FAFAFA] md:text-5xl italic mb-4">
                {item.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-[#999999] md:text-base">
                {item.description}
              </p>
              <span className="mt-4 inline-block text-sm uppercase tracking-[0.15em] text-[#E8E8E8] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                View on Behance &rarr;
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
