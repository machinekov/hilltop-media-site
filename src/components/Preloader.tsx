'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

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
          setVisible(false);
          setTimeout(onComplete, 600);
        }, 300);
      },
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
        >
          <div className="flex flex-col items-center gap-8">
            <span className="font-heading text-7xl font-bold text-[#E8E8E8] tabular-nums md:text-9xl">
              {String(count).padStart(3, '0')}
            </span>
            <div className="h-[2px] w-48 overflow-hidden bg-[rgba(255,255,255,0.08)] md:w-64">
              <div
                ref={barRef}
                className="h-full w-0 bg-[#E8E8E8]"
              />
            </div>
            <span className="text-sm uppercase tracking-[0.3em] text-[#666666] font-medium">
              Hilltop Media
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
