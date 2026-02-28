'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const SERVICE_CATEGORIES = [
  {
    label: 'Branding',
    items: [
      'Brand Strategy & Positioning',
      'Visual Identity & Logo Design',
      'Brand Guidelines',
      'Packaging Design',
    ],
  },
  {
    label: 'Digital',
    items: [
      'Web Design & Development',
      'UI/UX Design',
      'SEO & Performance',
      'Amazon Listing Optimization',
    ],
  },
  {
    label: 'Production',
    items: [
      'Video Production & Direction',
      'Photography',
      'Motion Graphics',
      'Drone & Aerial',
      'Social Media Content',
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header row
      const header = sectionRef.current!.querySelector('.services-header');
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: header, start: 'top 85%' },
          }
        );
      }

      // Category blocks
      const blocks = sectionRef.current!.querySelectorAll('.service-block');
      blocks.forEach((block, i) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 85%' },
            delay: i * 0.08,
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
      id="services"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E0E0E0',
        padding: '96px 40px',
      }}
    >
      {/* Section header */}
      <div
        className="services-header flex items-baseline justify-between mb-16"
        style={{ maxWidth: '1280px', margin: '0 auto 64px' }}
      >
        <h2
          className="font-heading font-bold leading-none"
          style={{ fontSize: 'clamp(36px, 5vw, 68px)', letterSpacing: '-0.01em' }}
        >
          Services
        </h2>
        <span
          className="text-[13px]"
          style={{
            color: '#999999',
            fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
          }}
        >
          (6)
        </span>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {SERVICE_CATEGORIES.map((cat, catIdx) => (
          <div key={cat.label} className="service-block">
            {catIdx === 0 && <div className="hairline-animate mb-0" />}

            <div
              className="grid py-10"
              style={{ gridTemplateColumns: '200px 1fr', gap: '40px', alignItems: 'start' }}
            >
              {/* Label */}
              <span
                className="text-[11px] font-medium uppercase tracking-[0.12em] pt-1"
                style={{
                  color: '#999999',
                  fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
                }}
              >
                {cat.label}
              </span>

              {/* Items */}
              <ul className="flex flex-col">
                {cat.items.map((item, itemIdx) => (
                  <li key={item}>
                    <div
                      className="flex items-center justify-between py-3 group cursor-default"
                      style={{
                        borderTop: itemIdx === 0 ? 'none' : '1px solid #E0E0E0',
                      }}
                    >
                      <span
                        className="text-[13px] transition-colors duration-200 group-hover:text-[#E63329]"
                        style={{
                          color: '#000000',
                          fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ height: '1px', backgroundColor: '#E0E0E0' }} />
          </div>
        ))}
      </div>
    </section>
  );
}
