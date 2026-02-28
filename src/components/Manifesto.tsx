'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate manifesto text words
    const words = sectionRef.current.querySelectorAll('.manifesto-word');
    words.forEach((word, i) => {
      gsap.fromTo(
        word,
        { opacity: 0.15 },
        {
          opacity: 1,
          duration: 0.3,
          scrollTrigger: {
            trigger: word,
            start: 'top 80%',
            once: true,
          },
          delay: i * 0.02,
        }
      );
    });

    // Animate right column
    gsap.fromTo(
      sectionRef.current.querySelector('.right-col'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current.querySelector('.right-col'),
          start: 'top 80%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const manifestoText =
    'Strategy and creativity are only as good as the results they drive. What sets us apart is how we think. We\u2019re a focused team of creatives who build brands that perform and campaigns that convert.';

  const words = manifestoText.split(' ');

  return (
    <section id="agency" ref={sectionRef} className="section-pad page-margin">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        {/* Left — Manifesto */}
        <div className="md:col-span-7">
          <p
            className="font-heading leading-[1.25] tracking-tight"
            style={{ fontSize: 'clamp(24px, 3vw, 42px)' }}
          >
            {words.map((word, i) => (
              <span key={i} className="manifesto-word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
            <span className="manifesto-word inline-block" style={{ color: 'var(--accent)' }}>
              ✻°
            </span>
          </p>
        </div>

        {/* Right — Description + Links */}
        <div className="right-col md:col-span-5 flex flex-col justify-between">
          <div>
            <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              From brand strategy to performance creative and media production, we handle the full
              stack. Over the past 6 years, Hilltop Media has become the go-to for ROI-driven
              branding, web design, and creative campaigns in Vancouver and beyond.
            </p>

            <div className="hairline mb-4" />
            <a href="#services" className="flex items-center justify-between py-3 animated-link text-sm group">
              <span>Services</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <div className="hairline" />
            <a href="#contact" className="flex items-center justify-between py-3 animated-link text-sm group">
              <span>Contact</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <div className="hairline" />
          </div>

          <p className="text-xs mt-12" style={{ color: 'var(--text-secondary)' }}>
            Always looking for bold brands to work with
          </p>
        </div>
      </div>
    </section>
  );
}
