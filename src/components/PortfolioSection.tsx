'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { splitIntoWords } from '@/lib/animations';
import { PORTFOLIO } from '@/lib/constants';
import Image from 'next/image';

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const words = splitIntoWords('Brands built, revenue driven.');

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !cardsContainerRef.current) return;

    const wordEls = headingRef.current.querySelectorAll('.portfolio-word');
    const cards = cardsContainerRef.current.querySelectorAll('.portfolio-card');

    gsap.set(wordEls, { opacity: 0.15, color: '#555555' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=350%',
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * 3),
            2
          );
          setActiveIndex(idx);
        },
      },
    });

    // Reveal words
    wordEls.forEach((word, i) => {
      tl.to(word, { opacity: 1, color: '#FAFAFA', duration: 0.5 }, i * 0.2);
    });

    // Full-width card slide-up entrances
    cards.forEach((card, i) => {
      tl.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
        0.8 + i * 0.4
      );
    });

    if (detailRef.current) {
      tl.fromTo(
        detailRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
        2.5
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen"
    >
      <div className="flex h-screen flex-col items-center justify-center px-6 md:px-16">
        {/* Section header */}
        <span className="mb-6 text-sm uppercase tracking-[0.3em] text-[#E8E8E8] font-medium">
          Our Work
        </span>

        {/* Large text reveal */}
        <div ref={headingRef} className="mb-12 text-center">
          <p className="font-heading text-[clamp(32px,6vw,72px)] font-bold leading-[1.1] italic">
            {words.map((word, i) => (
              <span
                key={i}
                className="portfolio-word inline-block mr-[0.3em] text-[#FAFAFA]"
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Full-width portfolio cards */}
        <div
          ref={cardsContainerRef}
          className="flex w-full max-w-6xl flex-col gap-6"
        >
          {PORTFOLIO.map((item) => (
            <div
              key={item.title}
              className="portfolio-card group relative w-full cursor-pointer overflow-hidden rounded-xl h-48 md:h-64"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Text overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-transform duration-500 group-hover:-translate-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-[#E8E8E8] mb-2">
                  {item.category}
                </p>
                <h4 className="font-heading text-2xl font-bold text-[#FAFAFA] md:text-4xl italic">
                  {item.title}
                </h4>
              </div>
              {/* Hover explore indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full border border-[#E8E8E8] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-6 py-2 text-sm font-medium text-[#FAFAFA]">
                  Explore
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* VUE Case Study Detail */}
        {PORTFOLIO[0].description && (
          <div ref={detailRef} className="mt-10 max-w-2xl text-center">
            <p className="text-sm leading-relaxed text-[#666666]">
              {PORTFOLIO[0].description}
            </p>
          </div>
        )}

        {/* Progress dots */}
        <div className="mt-8 flex gap-3">
          {PORTFOLIO.map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: i === activeIndex ? '#E8E8E8' : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
