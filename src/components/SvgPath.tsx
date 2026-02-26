'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

export default function SvgPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current || st.trigger === document.documentElement) st.kill();
      });
    };
  }, []);

  // A flowing, decorative winding path
  const d = `
    M 80 0
    C 80 150, 320 200, 250 400
    S 30 550, 120 750
    S 350 900, 230 1100
    S 20 1250, 150 1450
    S 380 1600, 250 1800
    S 30 1950, 120 2150
    S 350 2300, 230 2500
    S 20 2650, 150 2850
    S 380 3000, 250 3200
    S 30 3350, 120 3550
    S 350 3700, 230 3900
    S 20 4050, 150 4250
    S 380 4400, 250 4600
    S 30 4750, 120 4950
    S 350 5100, 230 5300
    S 20 5450, 150 5650
    S 380 5800, 250 6000
    S 30 6150, 120 6350
    S 350 6500, 230 6700
    S 20 6850, 150 7050
    S 380 7200, 250 7400
    S 30 7550, 120 7750
    S 350 7900, 230 8100
    S 20 8250, 150 8450
    S 380 8600, 250 8800
    S 30 8950, 120 9150
    S 350 9300, 230 9500
    S 20 9650, 150 9850
    S 300 10000, 200 10000
  `;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    >
      <svg
        className="absolute left-0 top-0 h-full w-full"
        viewBox="0 0 400 10000"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Faint background path */}
        <path
          d={d}
          stroke="#2A2A2A"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Gold animated path drawn on scroll */}
        <path
          ref={pathRef}
          d={d}
          stroke="#FEC81E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
