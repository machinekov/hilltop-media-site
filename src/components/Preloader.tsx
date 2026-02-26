'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* SVG pencil icon — tilted as if drawing to the right */
function PencilSVG({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'rotate(-45deg)' }}
    >
      {/* Pencil body */}
      <rect x="16" y="4" width="8" height="24" rx="1" fill="#E8E8E8" />
      {/* Pencil tip */}
      <polygon points="16,28 24,28 20,36" fill="#FEC81E" />
      {/* Pencil eraser */}
      <rect x="16" y="2" width="8" height="4" rx="1" fill="#888888" />
      {/* Pencil band */}
      <rect x="15.5" y="6" width="9" height="1.5" fill="#666666" />
      <rect x="15.5" y="9" width="9" height="1.5" fill="#666666" />
      {/* Pencil wood taper */}
      <polygon points="16,24 24,24 22,28 18,28" fill="#C4A87A" />
    </svg>
  );
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obj = { val: 0 };

    // Pencil bobbing animation (continuous)
    if (pencilRef.current) {
      gsap.to(pencilRef.current, {
        y: -4,
        rotation: 2,
        duration: 0.3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }

    gsap.to(obj, {
      val: 100,
      duration: 2.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(obj.val);
        setCount(v);
        if (barRef.current) {
          barRef.current.style.width = `${obj.val}%`;
        }
        // Move pencil along with the progress bar
        if (pencilRef.current) {
          pencilRef.current.style.left = `${obj.val}%`;
        }
        // Trail (drawn line) follows
        if (trailRef.current) {
          trailRef.current.style.width = `${obj.val}%`;
        }
      },
      onComplete: () => {
        // Pencil exit: flick upward
        if (pencilRef.current) {
          gsap.to(pencilRef.current, {
            y: -80,
            opacity: 0,
            rotation: 15,
            duration: 0.4,
            ease: 'power2.in',
          });
        }

        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setVisible(false);
              onComplete();
            },
          });

          // Flash at split
          if (flashRef.current) {
            tl.to(flashRef.current, { opacity: 1, duration: 0.1 }, 0);
            tl.to(flashRef.current, { opacity: 0, duration: 0.3 }, 0.1);
          }

          // Split halves
          if (topHalfRef.current) {
            tl.to(topHalfRef.current, {
              y: '-100%',
              duration: 0.7,
              ease: 'power3.inOut',
            }, 0.05);
          }
          if (bottomHalfRef.current) {
            tl.to(bottomHalfRef.current, {
              y: '100%',
              duration: 0.7,
              ease: 'power3.inOut',
            }, 0.05);
          }
        }, 400);
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
        <div className="flex flex-col items-center gap-6 pb-4">
          <span className="font-heading text-7xl font-bold text-[#E8E8E8] tabular-nums md:text-9xl italic">
            {String(count).padStart(3, '0')}
          </span>
        </div>
      </div>

      {/* Bottom half */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A] flex items-start justify-center overflow-hidden"
      >
        <div className="pt-8">
          <span className="text-xs uppercase tracking-[0.4em] text-[#555555] font-medium">
            Hilltop Media
          </span>
        </div>
      </div>

      {/* Progress bar area — centered at the split line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 md:w-72 z-10">
        {/* Track */}
        <div className="relative h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-visible">
          {/* Drawn trail (gold accent) */}
          <div
            ref={trailRef}
            className="absolute top-0 left-0 h-full w-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #E8E8E8 0%, #FEC81E 100%)',
            }}
          />
          {/* Pencil character */}
          <div
            ref={pencilRef}
            className="absolute -top-10 left-0 -translate-x-1/2"
            style={{ transition: 'none' }}
          >
            <PencilSVG />
          </div>
        </div>
      </div>

      {/* Flash at split line */}
      <div
        ref={flashRef}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] opacity-0 z-20"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(254,200,30,0.9), transparent)' }}
      />
    </div>
  );
}
