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
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  // A winding SVG path that spans the full page height
  const d = `
    M 100 0
    C 100 200, 300 300, 200 500
    S 50 700, 150 900
    S 350 1100, 200 1300
    S 50 1500, 150 1700
    S 300 1900, 200 2100
    S 50 2300, 150 2500
    S 350 2700, 200 2900
    S 50 3100, 150 3300
    S 300 3500, 200 3700
    S 50 3900, 150 4100
    S 350 4300, 200 4500
    S 50 4700, 150 4900
    S 300 5100, 200 5300
    S 50 5500, 150 5700
    S 350 5900, 200 6100
    S 50 6300, 150 6500
    S 300 6700, 200 6900
    S 50 7100, 150 7300
    S 350 7500, 200 7700
    S 50 7900, 150 8100
    S 300 8300, 200 8500
    S 50 8700, 150 8900
    S 350 9100, 200 9300
    S 50 9500, 150 9700
    S 300 9900, 200 10000
  `;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ height: '100vh' }}
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
        {/* Bold animated path */}
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
