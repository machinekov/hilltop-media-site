'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { AMAZON_FBA_ITEMS } from '@/lib/constants';

export default function AmazonFBA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const items = contentRef.current.querySelectorAll('.fba-item');
    const heading = contentRef.current.querySelector('.fba-heading');
    const subtitle = contentRef.current.querySelector('.fba-subtitle');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 20%',
        scrub: 0.5,
      },
    });

    if (heading) {
      tl.fromTo(heading, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0);
    }
    if (subtitle) {
      tl.fromTo(subtitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.2);
    }
    items.forEach((item, i) => {
      tl.fromTo(
        item,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4 + i * 0.15
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 md:px-16 lg:px-24">
      <div ref={contentRef} className="mx-auto max-w-4xl text-center">
        <span className="fba-subtitle mb-4 block text-sm uppercase tracking-[0.3em] text-[#E8E8E8] font-medium">
          Amazon Sellers
        </span>
        <h3 className="fba-heading font-heading mb-6 text-4xl font-bold text-[#FAFAFA] md:text-6xl italic">
          Amazon FBA Creative
        </h3>
        <p className="fba-subtitle mx-auto mb-12 max-w-xl text-lg text-[#666666]">
          Everything your Amazon brand needs to stand out, convert, and scale.
        </p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {AMAZON_FBA_ITEMS.map((item) => (
            <div
              key={item}
              className="fba-item glass-card rounded-lg px-6 py-5 text-center"
            >
              <span className="text-sm font-medium text-[#999999]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
