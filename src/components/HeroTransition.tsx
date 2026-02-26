'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

/*
 * Iron Hill-style dissolve transition.
 * Dark hero dissolves into a contrasting light section via an organic edge.
 * On scroll: the dark overlay scales up and fades, revealing the light bg beneath.
 */
export default function HeroTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !darkRef.current) return;

    // The dark overlay dissolves on scroll (scale up + fade)
    gsap.to(darkRef.current, {
      scale: 1.15,
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'top -10%',
        scrub: 0.5,
      },
    });

    // Text fades in as the dark dissolves
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'top 0%',
            scrub: 0.5,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-[60vh] overflow-hidden"
      style={{ background: '#F0EDE8' }}
    >
      {/* Dark overlay with organic dissolve edge at bottom */}
      <div
        ref={darkRef}
        className="absolute inset-0 z-[2]"
        style={{
          background: '#0A0A0A',
          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 400' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L1440,0 L1440,280 C1400,290 1380,340 1350,310 C1320,280 1300,350 1270,320 C1240,290 1210,360 1180,310 C1150,260 1120,340 1090,300 C1060,260 1030,330 1000,290 C970,250 940,340 910,300 C880,260 850,350 820,290 C790,230 760,320 730,280 C700,240 670,330 640,290 C610,250 580,350 550,300 C520,250 490,340 460,280 C430,220 400,320 370,270 C340,220 310,330 280,280 C250,230 220,340 190,290 C160,240 130,350 100,300 C70,250 40,330 0,280 Z' fill='white'/%3E%3C/svg%3E")`,
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 400' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L1440,0 L1440,280 C1400,290 1380,340 1350,310 C1320,280 1300,350 1270,320 C1240,290 1210,360 1180,310 C1150,260 1120,340 1090,300 C1060,260 1030,330 1000,290 C970,250 940,340 910,300 C880,260 850,350 820,290 C790,230 760,320 730,280 C700,240 670,330 640,290 C610,250 580,350 550,300 C520,250 490,340 460,280 C430,220 400,320 370,270 C340,220 310,330 280,280 C250,230 220,340 190,290 C160,240 130,350 100,300 C70,250 40,330 0,280 Z' fill='white'/%3E%3C/svg%3E")`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />

      {/* Scattered organic shapes on the light background (like Iron Hill's debris) */}
      <div className="absolute inset-0 z-[1] overflow-hidden opacity-20">
        <svg className="absolute w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none" fill="none">
          {/* Organic blob shapes scattered across */}
          <ellipse cx="120" cy="340" rx="40" ry="15" fill="#C4B89A" transform="rotate(-12 120 340)" />
          <ellipse cx="380" cy="360" rx="25" ry="10" fill="#B8A888" transform="rotate(8 380 360)" />
          <ellipse cx="650" cy="350" rx="50" ry="18" fill="#C4B89A" transform="rotate(-5 650 350)" />
          <ellipse cx="900" cy="370" rx="30" ry="12" fill="#B8A888" transform="rotate(15 900 370)" />
          <ellipse cx="1150" cy="345" rx="45" ry="14" fill="#C4B89A" transform="rotate(-8 1150 345)" />
          <ellipse cx="1350" cy="365" rx="35" ry="11" fill="#B8A888" transform="rotate(10 1350 365)" />
          {/* Smaller dots */}
          <circle cx="200" cy="380" r="5" fill="#D4C8AA" />
          <circle cx="500" cy="375" r="3" fill="#C4B89A" />
          <circle cx="800" cy="385" r="6" fill="#D4C8AA" />
          <circle cx="1050" cy="378" r="4" fill="#C4B89A" />
          <circle cx="1300" cy="382" r="5" fill="#D4C8AA" />
        </svg>
      </div>

      {/* Contrast text on light background */}
      <div
        ref={textRef}
        className="absolute inset-0 z-[3] flex items-end justify-center pb-16 px-6"
      >
        <p className="font-heading text-center text-[clamp(20px,3.5vw,40px)] font-bold leading-[1.3] italic text-[#1A1A1A] max-w-3xl">
          There is a place where creativity meets commerce.
          <br />
          <span className="text-[#888888]">Welcome to the Hilltop.</span>
        </p>
      </div>
    </div>
  );
}
