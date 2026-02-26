'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { AMAZON_FBA_ITEMS, AMAZON_FBA_PRICING } from '@/lib/constants';

export default function AmazonFBA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const animEls = contentRef.current.querySelectorAll('.fba-animate');

    gsap.fromTo(
      animEls,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 md:px-16 lg:px-24">
      <div ref={contentRef} className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="fba-animate text-center mb-16">
          <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-[#E8E8E8] font-medium">
            Amazon Sellers
          </span>
          <h3 className="font-heading mb-6 text-4xl font-bold text-[#FAFAFA] md:text-5xl italic">
            Amazon FBA Creative
          </h3>
          <p className="mx-auto max-w-lg text-base text-[#666666] leading-relaxed">
            360 degree Amazon FBA partner agency. Brand creation, graphic design, and listing optimization for hundreds of businesses.
          </p>
        </div>

        {/* Service Grid — 2 columns on mobile, 3 on desktop */}
        <div className="fba-animate grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {AMAZON_FBA_ITEMS.map((item) => (
            <div
              key={item.name}
              className="glass-card rounded-lg p-5"
            >
              <h4 className="text-sm font-semibold text-[#FAFAFA] mb-1.5">{item.name}</h4>
              <p className="text-xs text-[#666666] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="fba-animate grid grid-cols-3 gap-4 max-w-md mx-auto">
          {AMAZON_FBA_PRICING.map((tier) => (
            <div
              key={tier.tier}
              className="glass-card rounded-lg py-5 px-3 text-center"
            >
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#999] mb-2">
                {tier.tier}
              </span>
              <span className="font-heading text-xl font-bold text-[#FAFAFA] italic md:text-2xl">
                {tier.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
