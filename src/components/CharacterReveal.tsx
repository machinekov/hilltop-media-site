'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { splitIntoWords } from '@/lib/animations';
import Image from 'next/image';

interface CharacterRevealProps {
  text: string;
  id?: string;
  location?: string;
  body?: string;
  images?: readonly string[];
  bottomNote?: string;
}

export default function CharacterReveal({
  text,
  id,
  location,
  body,
  images,
  bottomNote,
}: CharacterRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const words = splitIntoWords(text);

  useEffect(() => {
    if (!sectionRef.current || !wordsContainerRef.current) return;

    const wordEls = wordsContainerRef.current.querySelectorAll('.reveal-word');

    // Set initial state: all words dimmed
    gsap.set(wordEls, { opacity: 0.15, color: '#555555' });

    // Calculate scroll distance proportional to word count
    const wordCount = wordEls.length;
    const baseScroll = 150; // vh
    const extraScroll = Math.max(0, (wordCount - 10) * 8);
    const totalScroll = baseScroll + extraScroll + (images ? 100 : 0) + (body ? 50 : 0);

    // Word-by-word reveal timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalScroll}vh`,
        scrub: 0.3,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    // Each word reveals from dimmed to bright white
    wordEls.forEach((word, i) => {
      tl.to(
        word,
        {
          opacity: 1,
          color: '#FAFAFA',
          duration: 1,
          ease: 'power1.out',
        },
        i * 0.4
      );
    });

    const revealEnd = wordEls.length * 0.4;

    // Card fly-in animations with 3D perspective
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.reveal-card');
      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0;
        tl.fromTo(
          card,
          {
            x: fromLeft ? -300 : 300,
            rotateY: fromLeft ? 25 : -25,
            z: -200,
            opacity: 0,
          },
          {
            x: 0,
            rotateY: 0,
            z: 0,
            opacity: 1,
            duration: 4,
            ease: 'power3.out',
          },
          revealEnd * 0.5 + i * 1.5
        );
      });
    }

    // Body text fade in
    if (bodyRef.current) {
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 3, ease: 'power2.out' },
        revealEnd * 0.7
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, [words.length, images, body]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen"
    >
      <div className="flex min-h-screen flex-col items-center justify-center px-6 md:px-16 lg:px-24">
        {/* Location label */}
        {location && (
          <span className="mb-12 text-xs uppercase tracking-[0.3em] text-[#888888]">
            {location}
          </span>
        )}

        {/* Word-by-word reveal text */}
        <div
          ref={wordsContainerRef}
          className="max-w-5xl text-center"
        >
          <p className="font-heading text-[clamp(28px,5vw,64px)] font-bold leading-[1.15]">
            {words.map((word, i) => (
              <span key={i} className="reveal-word inline-block mr-[0.3em] text-[#FAFAFA]">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* 3D Cards with perspective */}
        {images && images.length > 0 && (
          <div
            ref={cardsRef}
            className="mt-16 flex flex-col gap-6 md:flex-row md:gap-8"
            style={{ perspective: '1200px' }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="reveal-card relative h-64 w-full overflow-hidden rounded-lg md:h-80 md:w-72"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            ))}
          </div>
        )}

        {/* Body copy */}
        {body && (
          <div ref={bodyRef} className="mt-16 max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-[#888888]">{body}</p>
          </div>
        )}

        {/* Bottom note */}
        {bottomNote && (
          <p className="mt-12 max-w-lg text-center text-sm leading-relaxed text-[#888888]">
            {bottomNote}
          </p>
        )}
      </div>
    </section>
  );
}
