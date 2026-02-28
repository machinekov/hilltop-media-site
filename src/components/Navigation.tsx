'use client';

import { useEffect, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-scrolled' : ''
      }`}
    >
      <div className="page-margin flex items-center justify-between py-5">
        {/* Logo */}
        <a href="#" className="font-heading text-base tracking-wide" style={{ color: scrolled ? '#000' : '#fff' }}>
          Hilltop Media<span className="text-[var(--accent)]">®</span>
        </a>

        {/* Center Nav — comma separated */}
        <nav className="hidden md:block">
          <span className="text-xs tracking-wide" style={{ color: scrolled ? '#000' : '#fff' }}>
            <a href="#work" className="animated-link hover:opacity-70 transition-opacity">Work</a>
            <span className="opacity-40">, </span>
            <a href="#services" className="animated-link hover:opacity-70 transition-opacity">Services</a>
            <span className="opacity-40">, </span>
            <a href="#agency" className="animated-link hover:opacity-70 transition-opacity">Agency</a>
            <span className="opacity-40">, </span>
            <a href="#contact" className="animated-link hover:opacity-70 transition-opacity">Contact</a>
          </span>
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="text-xs tracking-wide animated-link"
          style={{ color: 'var(--accent)' }}
        >
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}
