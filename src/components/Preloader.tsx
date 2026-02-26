'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(obj.val));
        if (barRef.current) {
          barRef.current.style.width = `${obj.val}%`;
        }
      },
      onComplete: () => {
        setTimeout(() => {
          // Split exit: flash, then top/bottom halves slide away
          const tl = gsap.timeline({
            onComplete: () => {
              setVisible(false);
              onComplete();
            },
          });

          // Brief flash at the split point
          if (flashRef.current) {
            tl.to(flashRef.current, { opacity: 1, duration: 0.1 }, 0);
            tl.to(flashRef.current, { opacity: 0, duration: 0.3 }, 0.1);
          }

          // Top half slides up
          if (topHalfRef.current) {
            tl.to(topHalfRef.current, {
              y: '-100%',
              duration: 0.6,
              ease: 'power3.inOut',
            }, 0.05);
          }

          // Bottom half slides down
          if (bottomHalfRef.current) {
            tl.to(bottomHalfRef.current, {
              y: '100%',
              duration: 0.6,
              ease: 'power3.inOut',
            }, 0.05);
          }
        }, 300);
      },
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999]">
      {/* Top half */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#0A0A0A] flex items-end justify-center overflow-hidden"
      >
        <div className="flex flex-col items-center gap-8 pb-4">
          <span className="font-heading text-7xl font-bold text-[#E8E8E8] tabular-nums md:text-9xl">
            {String(count).padStart(3, '0')}
          </span>
          <div className="h-[2px] w-48 overflow-hidden bg-[rgba(255,255,255,0.08)] md:w-64">
            <div
              ref={barRef}
              className="h-full w-0 bg-[#E8E8E8]"
            />
          </div>
        </div>
      </div>

      {/* Bottom half */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A] flex items-start justify-center overflow-hidden"
      >
        <div className="pt-6">
          <span className="text-sm uppercase tracking-[0.3em] text-[#666666] font-medium">
            Hilltop Media
          </span>
        </div>
      </div>

      {/* Flash at split line */}
      <div
        ref={flashRef}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] opacity-0"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(232,232,232,0.8), transparent)' }}
      />
    </div>
  );
}
