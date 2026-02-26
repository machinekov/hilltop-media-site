'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

/*
 * Iron Hill style scroll-driven SVG path draw.
 * A winding organic line traces itself as you scroll through the page.
 * Positioned absolutely, runs through the content sections.
 */
export default function ScrollPath() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!svgRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Start fully hidden (dashoffset = full length)
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Draw the path as user scrolls through the page
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.trigger === 'main') st.kill();
      });
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-full w-full"
      viewBox="0 0 1440 6000"
      preserveAspectRatio="none"
      fill="none"
      style={{ opacity: 0.12 }}
    >
      <path
        ref={pathRef}
        d={`
          M 720 0
          C 720 80, 680 150, 710 200
          S 750 300, 700 400
          C 650 500, 730 550, 690 650
          S 660 750, 720 850
          C 780 950, 680 1050, 730 1150
          S 700 1250, 660 1350
          C 620 1450, 750 1500, 710 1600
          S 680 1700, 740 1800
          C 800 1900, 670 2000, 720 2100
          S 690 2200, 650 2300
          C 610 2400, 740 2500, 700 2600
          S 730 2700, 760 2800
          C 790 2900, 680 3000, 720 3100
          S 670 3200, 710 3300
          C 750 3400, 660 3500, 700 3600
          S 730 3700, 680 3800
          C 640 3900, 750 4000, 710 4100
          S 690 4200, 730 4300
          C 770 4400, 670 4500, 720 4600
          S 700 4700, 660 4800
          C 620 4900, 740 5000, 710 5100
          S 730 5200, 700 5300
          C 680 5400, 750 5500, 720 5600
          S 710 5700, 720 6000
        `}
        stroke="#E8E8E8"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
