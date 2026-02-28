'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const SERVICE_GROUPS = [
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

const TOTAL_ITEMS = SERVICE_GROUPS.reduce((sum, g) => sum + g.items.length, 0);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const rows = sectionRef.current.querySelectorAll('.service-row');
    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-pad page-margin">
      {/* Section header */}
      <div className="hairline mb-4" />
      <div className="flex items-baseline justify-between mb-16">
        <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--text-secondary)' }}>
          Services
        </p>
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          ({TOTAL_ITEMS})
        </span>
      </div>

      {/* Service groups */}
      <div className="space-y-16">
        {SERVICE_GROUPS.map((group, gi) => (
          <div key={gi} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Label */}
            <div className="md:col-span-3">
              <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--text-secondary)' }}>
                {group.label}
              </p>
            </div>

            {/* Items */}
            <div className="md:col-span-9">
              {group.items.map((item, ii) => (
                <div key={ii} className="service-row">
                  <div className="hairline" />
                  <p className="py-3 text-sm">{item}</p>
                </div>
              ))}
              <div className="hairline" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
