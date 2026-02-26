'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { AMAZON_FBA_ITEMS, AMAZON_FBA_PRICING } from '@/lib/constants';

export default function AmazonFBA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const items = contentRef.current.querySelectorAll('.fba-item');
    const heading = contentRef.current.querySelector('.fba-heading');
    const subtitle = contentRef.current.querySelector('.fba-subtitle');
    const desc = contentRef.current.querySelector('.fba-desc');
    const pricingCards = contentRef.current.querySelectorAll('.fba-pricing');

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
    if (desc) {
      tl.fromTo(desc, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.3);
    }
    items.forEach((item, i) => {
      tl.fromTo(
        item,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4 + i * 0.15
      );
    });
    pricingCards.forEach((card, i) => {
      tl.fromTo(
        card,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.4 + i * 0.15
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
      <div ref={contentRef} className="mx-auto max-w-5xl text-center">
        <span className="fba-subtitle mb-4 block text-sm uppercase tracking-[0.3em] text-[#E8E8E8] font-medium">
          Your Creative Partner for Amazon
        </span>
        <h3 className="fba-heading font-heading mb-6 text-4xl font-bold text-[#FAFAFA] md:text-6xl italic">
          Amazon FBA Creative
        </h3>
        <p className="fba-desc mx-auto mb-16 max-w-2xl text-lg text-[#666666] leading-relaxed">
          We are a 360 degree Amazon FBA partner agency with expertise in brand creation, graphic design, and listing optimization. We have helped hundreds of businesses discover their brand name, logo, guide, and positioning.
        </p>

        {/* Service items */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {AMAZON_FBA_ITEMS.map((item) => (
            <div
              key={item.name}
              className="fba-item glass-card rounded-lg px-6 py-8 text-left"
            >
              <h4 className="text-base font-semibold text-[#FAFAFA] mb-2">{item.name}</h4>
              <p className="text-sm text-[#666666] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing tiers */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {AMAZON_FBA_PRICING.map((tier) => (
            <div
              key={tier.tier}
              className="fba-pricing glass-card rounded-lg px-6 py-8 text-center"
            >
              <span className="block text-xs uppercase tracking-[0.2em] text-[#E8E8E8] mb-3">
                {tier.tier}
              </span>
              <span className="font-heading text-3xl font-bold text-[#FAFAFA] italic">
                {tier.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
