'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left column text reveals
      const leftEl = sectionRef.current!.querySelector('.manifesto-left');
      if (leftEl) {
        gsap.fromTo(
          leftEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: leftEl, start: 'top 80%' },
          }
        );
      }

      // Right column staggered
      const rightItems = sectionRef.current!.querySelectorAll('.manifesto-right-item');
      rightItems.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
            delay: i * 0.07,
          }
        );
      });

      // Hairlines
      const hairlines = sectionRef.current!.querySelectorAll('.hairline-animate');
      hairlines.forEach((line) => {
        ScrollTrigger.create({
          trigger: line,
          start: 'top 90%',
          onEnter: () => (line as HTMLElement).classList.add('is-visible'),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E0E0E0',
        padding: '100px 40px',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: '1280px', display: 'grid', gridTemplateColumns: '55% 45%', gap: '60px', alignItems: 'start' }}
      >
        {/* Left — large manifesto quote */}
        <div className="manifesto-left">
          <p
            className="font-heading font-semibold leading-[1.15]"
            style={{ fontSize: 'clamp(26px, 3.2vw, 44px)', color: '#000000' }}
          >
            Strategy and creativity are only as good as the results they drive. What sets us apart is how we think. We&apos;re a focused team of creatives who build brands that perform and campaigns that convert.
          </p>
        </div>

        {/* Right — body text + links */}
        <div className="flex flex-col">
          <p
            className="manifesto-right-item text-[13px] leading-relaxed mb-8"
            style={{
              color: '#444444',
              fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
              maxWidth: '420px',
            }}
          >
            From brand strategy to performance creative and media production, we handle the full stack. Over the past 6 years, Hilltop Media has become the go-to for ROI-driven branding, web design, and creative campaigns in Vancouver and beyond.
          </p>

          {/* Links with hairlines */}
          <div className="manifesto-right-item">
            <div className="hairline-animate mb-4" />
            <div className="flex items-center justify-between py-3">
              <a
                href="#services"
                className="text-[12px] font-medium underline-link"
                style={{ fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)' }}
              >
                Services →
              </a>
            </div>
            <div style={{ height: '1px', backgroundColor: '#E0E0E0' }} />
            <div className="flex items-center justify-between py-3">
              <a
                href="#contact"
                className="text-[12px] font-medium underline-link"
                style={{ fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)' }}
              >
                Contact →
              </a>
            </div>
            <div style={{ height: '1px', backgroundColor: '#E0E0E0' }} />
          </div>

          <p
            className="manifesto-right-item mt-8 text-[11px] uppercase tracking-[0.1em]"
            style={{
              color: '#999999',
              fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
            }}
          >
            Always looking for bold brands to work with
          </p>
        </div>
      </div>
    </section>
  );
}
