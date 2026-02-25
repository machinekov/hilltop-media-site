'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs uppercase tracking-[0.3em] text-[#888888]">
        Scroll
      </span>
      <motion.div
        className="h-12 w-[1px] bg-[#FEC81E]"
        animate={{ scaleY: [0, 1, 0], originY: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
