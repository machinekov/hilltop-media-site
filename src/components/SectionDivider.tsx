'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

export default function SectionDivider() {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power2.inOut',
        scrollTrigger: { trigger: lineRef.current, start: 'top 85%' }
      }
    );
  }, []);
  return (
    <div className="py-8 px-6 md:px-24">
      <div ref={lineRef} className="mx-auto h-px max-w-6xl bg-[rgba(255,255,255,0.06)] origin-left" />
    </div>
  );
}
