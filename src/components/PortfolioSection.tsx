'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { splitIntoWords } from '@/lib/animations';
import { PORTFOLIO } from '@/lib/constants';
import Image from 'next/image';

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const words = splitIntoWords('Brands built, revenue driven.');

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !cardsRef.current) return;

    // 1. Word-by-word heading reveal (Iron Hill style)
    const wordEls = headingRef.current.querySelectorAll('.portfolio-word');
    gsap.set(wordEls, { opacity: 0.15, color: '#555555' });

    const headingTl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 70%',
        end: 'top 30%',
        scrub: 0.3,
      },
    });

    wordEls.forEach((word, i) => {
      headingTl.to(
        word,
        { opacity: 1, color: '#FAFAFA', duration: 1, ease: 'power1.out' },
        i * 0.3
      );
    });

    // 2. Portfolio cards — Iron Hill style 3D fly-in from alternating sides
    const cards = cardsRef.current.querySelectorAll('.portfolio-card');

    cards.forEach((card, i) => {
      const fromLeft = i % 2 === 0;

      gsap.fromTo(
        card,
        {
          x: fromLeft ? -120 : 120,
          rotateY: fromLeft ? 8 : -8,
          z: -100,
          opacity: 0,
          scale: 0.92,
        },
        {
          x: 0,
          rotateY: 0,
          z: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Parallax effect on image inside the card
      const img = card.querySelector('.portfolio-img-wrapper');
      if (img) {
        gsap.fromTo(
          img,
          { y: 30 },
          {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        const trigger = st.trigger;
        if (
          trigger === sectionRef.current ||
          trigger === headingRef.current ||
          (cardsRef.current && cardsRef.current.contains(trigger as Node))
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
      {/* Section label */}
      <div className="mx-auto max-w-7xl mb-6 text-center">
        <span className="text-sm uppercase tracking-[0.3em] text-[#E8E8E8] font-medium">
          Our Work
        </span>
      </div>

      {/* Word-by-word heading reveal (Iron Hill style) */}
      <div ref={headingRef} className="mx-auto max-w-7xl mb-20 text-center">
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

      {/* Portfolio cards with 3D fly-in animations */}
      <div
        ref={cardsRef}
        className="mx-auto flex max-w-7xl flex-col gap-16"
        style={{ perspective: '1200px' }}
      >
        {PORTFOLIO.map((item, i) => (
          <a
            key={item.title}
            href={item.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-card portfolio-card-hover group relative block w-full overflow-hidden rounded-2xl"
            style={{
              height: 'clamp(350px, 65vh, 700px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Image with parallax wrapper */}
            <div className="portfolio-img-wrapper absolute inset-[-30px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="portfolio-image object-cover"
                sizes="100vw"
              />
            </div>

            {/* Gradient overlay */}
            <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 transition-opacity duration-700" />

            {/* Category badge — top left */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <span className="inline-block rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.3)] backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#E8E8E8]">
                {item.category}
              </span>
            </div>

            {/* Number badge — top right (Iron Hill style) */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <span className="font-heading text-5xl font-bold text-[rgba(255,255,255,0.08)] md:text-7xl italic">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Text overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="font-heading text-3xl font-bold text-[#FAFAFA] md:text-5xl italic mb-4">
                {item.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-[#999999] md:text-base opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                {item.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-[#E8E8E8] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                View on Behance
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
