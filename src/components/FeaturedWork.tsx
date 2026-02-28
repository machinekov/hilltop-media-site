'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

const PROJECTS = [
  { name: 'Shape Properties', category: 'Brand Strategy, Social' },
  { name: 'Ona Naturals', category: 'Packaging, Amazon' },
  { name: 'Diamond Student', category: 'Branding, Packaging' },
  { name: 'Refugee to Luxury', category: 'Web Design, Brand' },
];

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll('.work-item');
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
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
    <section id="work" ref={sectionRef} className="section-pad page-margin">
      {/* Section header */}
      <div className="hairline mb-4" />
      <p className="text-xs tracking-wider uppercase mb-16" style={{ color: 'var(--text-secondary)' }}>
        Featured work
      </p>

      {/* Project list */}
      <div>
        {PROJECTS.map((project, i) => (
          <a
            key={i}
            href="#"
            className="work-item featured-item block group"
          >
            <div className="hairline" />
            <div className="flex items-center justify-between py-8 md:py-12">
              <h2
                className="font-heading leading-[1] tracking-tight"
                style={{ fontSize: 'clamp(36px, 5.5vw, 80px)' }}
              >
                {project.name}
              </h2>
              <span
                className="hidden md:block text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.category}
              </span>
            </div>
          </a>
        ))}

        {/* View all */}
        <div className="hairline" />
        <a
          href="#"
          className="featured-item block py-8 md:py-12 text-center"
        >
          <span
            className="font-heading tracking-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}
          >
            All Work <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </span>
        </a>
        <div className="hairline" />
      </div>
    </section>
  );
}
