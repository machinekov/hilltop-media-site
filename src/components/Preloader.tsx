'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/*
 * Single continuous line face — draws itself as loading progresses.
 * Artsy minimalist style (Picasso one-line drawing aesthetic).
 */
function LineDrawing({ progress }: { progress: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const lengthRef = useRef(0);

  useEffect(() => {
    if (!pathRef.current) return;
    lengthRef.current = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${lengthRef.current}`;
    pathRef.current.style.strokeDashoffset = `${lengthRef.current}`;
  }, []);

  useEffect(() => {
    if (!pathRef.current || !lengthRef.current) return;
    const offset = lengthRef.current * (1 - progress / 100);
    pathRef.current.style.strokeDashoffset = `${offset}`;
  }, [progress]);

  return (
    <svg
      width="200"
      height="240"
      viewBox="0 0 200 240"
      fill="none"
      className="opacity-90"
    >
      <path
        ref={pathRef}
        d={`
          M 60 180
          C 55 170, 48 155, 50 140
          C 52 125, 58 115, 55 105
          C 52 95, 45 90, 48 80
          C 51 70, 60 65, 65 55
          C 70 45, 72 35, 80 30
          C 88 25, 95 28, 100 25
          C 105 22, 108 18, 115 20
          C 122 22, 128 30, 132 38
          C 136 46, 138 55, 140 65
          C 142 75, 145 82, 143 92
          C 141 102, 135 108, 138 115
          C 141 122, 150 125, 148 135
          C 146 145, 138 148, 140 155
          C 142 162, 148 165, 145 175
          C 142 185, 135 188, 130 192
          C 125 196, 118 194, 112 198
          C 106 202, 102 208, 95 210
          C 88 212, 82 208, 78 205
          C 74 202, 70 195, 68 190
          C 66 185, 62 182, 60 180
          M 75 95
          C 78 90, 85 88, 88 92
          C 91 96, 86 100, 82 98
          C 78 96, 76 98, 75 95
          M 115 90
          C 118 86, 125 84, 128 88
          C 131 92, 126 96, 122 94
          C 118 92, 116 94, 115 90
          M 88 125
          C 92 122, 96 120, 100 122
          C 104 124, 108 122, 112 125
          M 90 145
          C 95 150, 100 152, 105 150
          C 110 148, 112 145, 115 148
        `}
        stroke="#E8E8E8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'stroke-dashoffset 0.05s linear' }}
      />
    </svg>
  );
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };

    gsap.to(obj, {
      val: 100,
      duration: 2.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(obj.val));
        if (barRef.current) {
          barRef.current.style.width = `${obj.val}%`;
        }
      },
      onComplete: () => {
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setVisible(false);
              onComplete();
            },
          });

          if (flashRef.current) {
            tl.to(flashRef.current, { opacity: 1, duration: 0.1 }, 0);
            tl.to(flashRef.current, { opacity: 0, duration: 0.3 }, 0.1);
          }

          if (topHalfRef.current) {
            tl.to(topHalfRef.current, { y: '-100%', duration: 0.7, ease: 'power3.inOut' }, 0.05);
          }
          if (bottomHalfRef.current) {
            tl.to(bottomHalfRef.current, { y: '100%', duration: 0.7, ease: 'power3.inOut' }, 0.05);
          }
        }, 400);
      },
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Top half */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#0A0A0A] flex items-end justify-center overflow-hidden"
      >
        <div className="flex flex-col items-center pb-4">
          {/* Line drawing that traces itself */}
          <LineDrawing progress={count} />
        </div>
      </div>

      {/* Bottom half */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A] flex items-start justify-center overflow-hidden"
      >
        <div className="flex flex-col items-center pt-6 gap-6">
          {/* Counter */}
          <span className="font-heading text-5xl font-bold text-[#E8E8E8] tabular-nums md:text-7xl italic">
            {String(count).padStart(3, '0')}
          </span>
          {/* Progress bar */}
          <div className="h-[1px] w-48 overflow-hidden bg-[rgba(255,255,255,0.06)] md:w-56">
            <div
              ref={barRef}
              className="h-full w-0"
              style={{ background: 'linear-gradient(90deg, #E8E8E8, #FEC81E)' }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#555555] font-medium">
            Hilltop Media
          </span>
        </div>
      </div>

      {/* Flash at split */}
      <div
        ref={flashRef}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] opacity-0 z-20"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(254,200,30,0.9), transparent)' }}
      />
    </div>
  );
}
