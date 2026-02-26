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
  const bottomNoteRef = useRef<HTMLParagraphElement>(null);
  const words = splitIntoWords(text);

  useEffect(() => {
    if (!sectionRef.current || !wordsContainerRef.current) return;

    const wordEls = wordsContainerRef.current.querySelectorAll('.reveal-word');

    // Muted + blurred inactive state
    gsap.set(wordEls, { opacity: 0.2, color: '#555555', filter: 'blur(2px)' });

    const wordCount = wordEls.length;
    const totalScroll = 100 + wordCount * 3 + (images ? 60 : 0) + (body ? 30 : 0);

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

    wordEls.forEach((word, i) => {
      tl.to(
        word,
        {
          opacity: 1,
          color: '#FAFAFA',
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power1.out',
        },
        i * 0.4
      );
    });

    const revealEnd = wordEls.length * 0.4;

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.reveal-card');
      // Iron Hill style: each card rises up ONE AT A TIME with heavy stagger
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          {
            y: 200,
            rotation: -6 + i * 5,
            opacity: 0,
            scale: 0.85,
            filter: 'blur(3px)',
          },
          {
            y: 0,
            rotation: -4 + i * 4,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 5,
            ease: 'power3.out',
          },
          revealEnd * 0.4 + i * 3  // heavy stagger — each card waits for the previous
        );
      });
    }

    if (bodyRef.current) {
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 3, ease: 'power2.out' },
        revealEnd * 0.7
      );
    }

    if (bottomNoteRef.current) {
      tl.fromTo(
        bottomNoteRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 2, ease: 'power2.out' },
        revealEnd * 0.85
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, [words.length, images, body, bottomNote]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen"
    >
      <div className="flex min-h-screen flex-col items-center justify-center px-6 md:px-16 lg:px-24">
        {location && (
          <span className="mb-10 text-xs uppercase tracking-[0.3em] text-[#888888] font-medium">
            {location}
          </span>
        )}

        <div
          ref={wordsContainerRef}
          className="max-w-5xl text-center"
        >
          <p className="font-heading text-[clamp(32px,6vw,72px)] font-bold leading-[1.15] italic">
            {words.map((word, i) => (
              <span key={i} className="reveal-word inline text-[#FAFAFA]">
                {word}{' '}
              </span>
            ))}
          </p>
        </div>

        {images && images.length > 0 && (
          <div
            ref={cardsRef}
            className="mt-14 relative w-full max-w-4xl"
            style={{ perspective: '1200px', height: '380px' }}
          >
            {images.map((img, i) => {
              // Scattered organic positions (like Iron Hill's film slides)
              const positions = [
                { left: '2%', top: '10%', width: 240, height: 300, rotate: -4 },
                { left: '35%', top: '0%', width: 260, height: 340, rotate: 2 },
                { left: '62%', top: '20%', width: 220, height: 280, rotate: -2 },
              ];
              const pos = positions[i] || positions[0];

              return (
                <div
                  key={i}
                  className="reveal-card absolute overflow-hidden rounded-lg shadow-2xl"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    width: `${pos.width}px`,
                    height: `${pos.height}px`,
                    transformStyle: 'preserve-3d',
                    transform: `rotate(${pos.rotate}deg)`,
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              );
            })}
          </div>
        )}

        {body && (
          <div ref={bodyRef} className="mt-14 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-[#888888] md:text-lg">{body}</p>
          </div>
        )}

        {bottomNote && (
          <p ref={bottomNoteRef} className="mt-10 max-w-lg text-center text-sm leading-relaxed text-[#888888]">
            {bottomNote}
          </p>
        )}
      </div>
    </section>
  );
}
