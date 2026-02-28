'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const PROJECTS = [
  { name: 'Shape Properties', category: 'Brand Identity' },
  { name: 'Ona Naturals', category: 'Visual Identity' },
  { name: 'Diamond Student', category: 'Branding' },
  { name: 'Refugee to Luxury', category: 'Brand + Web' },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
          }
        );
      }

      const rows = sectionRef.current!.querySelectorAll('.p-row');
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
            delay: i * 0.05,
          }
        );
      });

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
      id="portfolio"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '96px 40px',
      }}
    >
      {/* Section label */}
      <div ref={labelRef} className="mb-12">
        <div className="hairline-animate mb-4" />
        <span
          className="text-[11px] font-medium uppercase tracking-[0.14em]"
          style={{
            color: '#666666',
            fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
          }}
        >
          Featured work
        </span>
      </div>

      {/* Project list */}
      <div>
        {PROJECTS.map((project) => (
          <div key={project.name} className="p-row portfolio-row group py-[30px] md:py-[40px]">
            <span
              className="hidden md:block text-[11px] uppercase tracking-[0.1em] shrink-0 w-[180px]"
              style={{
                color: '#999999',
                fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
              }}
            >
              {project.category}
            </span>

            <h3
              className="font-heading font-bold leading-none flex-1 text-center md:text-left"
              style={{ fontSize: 'clamp(38px, 5.5vw, 76px)', letterSpacing: '-0.01em' }}
            >
              {project.name}
            </h3>

            <span
              className="hidden md:block text-[13px] shrink-0 ml-4 transition-transform duration-300 group-hover:translate-x-1"
              style={{ fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)' }}
            >
              →
            </span>
          </div>
        ))}

        {/* All Work row */}
        <div className="p-row portfolio-row group py-[30px] md:py-[38px]">
          <span className="hidden md:block w-[180px] shrink-0" />
          <span
            className="font-heading font-bold flex-1 text-center md:text-left"
            style={{ fontSize: 'clamp(22px, 3vw, 40px)', color: '#666666', letterSpacing: '-0.01em' }}
          >
            All Work →
          </span>
        </div>
      </div>
    </section>
  );
}
