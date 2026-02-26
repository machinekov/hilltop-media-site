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
    <section ref={sectionRef} className="relative w-full py-32">
      <div ref={contentRef} className="mx-auto w-full max-w-4xl px-6 md:px-12">
        {/* Header */}
        <div className="fba-animate mb-20 text-center">
          <span className="mb-5 block text-sm uppercase tracking-[0.3em] text-[#888888] font-medium">
            Amazon Sellers
          </span>
          <h3 className="font-heading mb-8 text-4xl font-bold text-[#FAFAFA] md:text-5xl italic">
            Amazon FBA Creative
          </h3>
          <p className="mx-auto max-w-md text-base text-[#888888] leading-relaxed">
            360 degree Amazon FBA partner agency. Brand creation, graphic design, and listing optimization for hundreds of businesses.
          </p>
        </div>

        {/* Service Grid */}
        <div className="fba-animate mb-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AMAZON_FBA_ITEMS.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6"
            >
              <h4 className="text-sm font-semibold text-[#FAFAFA] mb-3">{item.name}</h4>
              <p className="text-[13px] text-[#888888] leading-[1.6]">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="fba-animate mx-auto grid max-w-lg grid-cols-3 gap-5">
          {AMAZON_FBA_PRICING.map((tier) => (
            <div
              key={tier.tier}
              className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] py-6 px-4 text-center"
            >
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#888888] mb-3">
                {tier.tier}
              </span>
              <span className="font-heading text-2xl font-bold text-[#FAFAFA] italic">
                {tier.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
