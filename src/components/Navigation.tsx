'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Logo */}
      <div className="fixed left-6 top-6 z-[100] md:left-10 md:top-10">
        <a href="#" className="block">
          <svg
            width="140"
            height="28"
            viewBox="0 0 140 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="0"
              y="22"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="700"
              fontSize="24"
              fill="#FAFAFA"
              letterSpacing="0.1em"
            >
              HILLTOP
            </text>
          </svg>
        </a>
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-6 top-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-[#333] bg-[#0A0A0A]/80 backdrop-blur-sm transition-colors hover:border-[#FEC81E] md:right-10 md:top-10"
        aria-label="Menu"
      >
        <div className="flex flex-col items-center gap-[6px]">
          <motion.span
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-5 bg-[#FAFAFA]"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className="block h-[1.5px] w-5 bg-[#FAFAFA]"
          />
        </div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#0A0A0A]/95 backdrop-blur-md"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="font-heading text-4xl font-bold text-[#FAFAFA] transition-colors hover:text-[#FEC81E] md:text-6xl"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-16 flex gap-8"
            >
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-[0.2em] text-[#888888] transition-colors hover:text-[#FEC81E]"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
