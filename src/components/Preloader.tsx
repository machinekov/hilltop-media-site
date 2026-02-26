'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };

    // Scan lines pulse
    if (linesRef.current) {
      gsap.to(linesRef.current, {
        backgroundPositionY: '100%',
        duration: 3,
        ease: 'none',
        repeat: -1,
      });
    }

    // Number scale pulse (subtle breathing)
    if (numberRef.current) {
      gsap.fromTo(numberRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
    }

    // Glow intensifies with progress
    gsap.to(obj, {
      val: 100,
      duration: 2.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(obj.val);
        setCount(v);
        if (barRef.current) barRef.current.style.width = `${obj.val}%`;
        if (glowRef.current) glowRef.current.style.opacity = `${obj.val / 300}`;
      },
      onComplete: () => {
        // Dramatic exit: number scales up + fades, container wipes
        const tl = gsap.timeline({
          onComplete: () => { setVisible(false); onComplete(); },
        });

        // Number blows up
        if (numberRef.current) {
          tl.to(numberRef.current, {
            scale: 3, opacity: 0, filter: 'blur(20px)',
            duration: 0.5, ease: 'power2.in',
          }, 0);
        }

        // Flash
        if (glowRef.current) {
          tl.to(glowRef.current, { opacity: 0.8, duration: 0.1 }, 0.3);
          tl.to(glowRef.current, { opacity: 0, duration: 0.3 }, 0.4);
        }

        // Container fades
        if (containerRef.current) {
          tl.to(containerRef.current, {
            opacity: 0, duration: 0.4, ease: 'power2.in',
          }, 0.4);
        }
      },
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
    >
      {/* Scan lines overlay */}
      <div
        ref={linesRef}
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          backgroundSize: '100% 200%',
        }}
      />

      {/* Center glow that builds with progress */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-0 z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(254,200,30,0.15) 0%, transparent 50%)',
        }}
      />

      {/* Massive counter — the visual centerpiece */}
      <div ref={numberRef} className="relative z-20 select-none text-center">
        <span
          className="font-heading font-bold text-[#E8E8E8] tabular-nums italic block leading-none"
          style={{ fontSize: 'clamp(120px, 30vw, 350px)', letterSpacing: '-0.03em' }}
        >
          {String(count).padStart(3, '0')}
        </span>

        {/* Subtle brand name under the counter */}
        <div className="mt-4 flex flex-col items-center gap-4">
          <div className="h-[1px] w-32 overflow-hidden bg-[rgba(255,255,255,0.06)] md:w-48">
            <div
              ref={barRef}
              className="h-full w-0"
              style={{ background: 'linear-gradient(90deg, rgba(232,232,232,0.5), #FEC81E)' }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#444] font-medium">
            Hilltop Media
          </span>
        </div>
      </div>

      {/* Horizontal glitch lines that appear briefly at random intervals */}
      <GlitchLines />
    </div>
  );
}

/* Random horizontal displacement lines — brief flickers for that techy/cinematic feel */
function GlitchLines() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const lines = ref.current.querySelectorAll('.glitch-line');

    const flicker = () => {
      const line = lines[Math.floor(Math.random() * lines.length)] as HTMLElement;
      if (!line) return;

      const y = Math.random() * 100;
      const w = 20 + Math.random() * 60;
      const x = Math.random() * (100 - w);

      gsap.set(line, { top: `${y}%`, left: `${x}%`, width: `${w}%`, opacity: 0 });
      gsap.to(line, {
        opacity: 0.06 + Math.random() * 0.06,
        duration: 0.05,
        onComplete: () => {
          gsap.to(line, { opacity: 0, duration: 0.05, delay: 0.02 + Math.random() * 0.08 });
        },
      });
    };

    const interval = setInterval(flicker, 150 + Math.random() * 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-[15] overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="glitch-line absolute h-[1px] bg-[#E8E8E8] opacity-0"
        />
      ))}
    </div>
  );
}
