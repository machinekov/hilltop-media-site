'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar: logo left, nav links center (desktop), hamburger right */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-5 md:px-12 md:py-6">
        {/* Logo */}
        <a href="#" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/hilltop-logo.png"
            alt="Hilltop Media"
            className="h-auto w-[110px] md:w-[130px]"
          />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] text-[#666666] transition-colors hover:text-[#FAFAFA]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Hamburger (mobile + desktop fallback) */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[#0A0A0A]/80 backdrop-blur-sm transition-colors hover:border-[#E8E8E8] md:hidden"
          aria-label="Menu"
        >
          <div className="flex flex-col items-center gap-[5px]">
            <motion.span
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-4 bg-[#FAFAFA]"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-4 bg-[#FAFAFA]"
            />
          </div>
        </button>
      </header>

      {/* Mobile overlay */}
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
                  className="font-heading text-4xl font-bold text-[#FAFAFA] transition-colors hover:text-[#E8E8E8] md:text-5xl"
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
                  className="text-sm uppercase tracking-[0.2em] text-[#666666] transition-colors hover:text-[#FFFFFF]"
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
