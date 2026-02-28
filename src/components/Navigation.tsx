'use client';

import { useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Agency', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Switch from transparent to white once past ~40vh
      const threshold = window.innerHeight * 0.38;
      setPastHero(window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-colors duration-300"
        style={{
          padding: '20px 40px',
          backgroundColor: pastHero ? '#FFFFFF' : 'transparent',
          borderBottom: pastHero ? '1px solid #E0E0E0' : 'none',
        }}
      >
        {/* Logo — Playfair Display, small */}
        <a
          href="#"
          className="font-heading text-[16px] font-semibold tracking-tight"
          style={{ color: pastHero ? '#000000' : '#FFFFFF' }}
        >
          Hilltop Media
        </a>

        {/* Desktop center nav — comma-separated */}
        <nav className="hidden md:flex items-center gap-0">
          {NAV_ITEMS.map((item, i) => (
            <span key={item.label} className="flex items-center">
              <a
                href={item.href}
                className="text-[12px] font-medium transition-colors duration-200"
                style={{
                  color: pastHero ? '#000000' : 'rgba(255,255,255,0.75)',
                  fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = pastHero ? '#E63329' : '#FFFFFF')}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = pastHero ? '#000000' : 'rgba(255,255,255,0.75)')}
              >
                {item.label}
              </a>
              {i < NAV_ITEMS.length - 1 && (
                <span
                  className="mx-1 text-[12px] select-none"
                  style={{ color: pastHero ? '#CCCCCC' : 'rgba(255,255,255,0.3)' }}
                >
                  ,
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Right — Let's talk in red */}
        <a
          href="#contact"
          className="hidden md:inline-block text-[12px] font-medium"
          style={{
            color: '#E63329',
            fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
            letterSpacing: '0.01em',
          }}
        >
          Let&apos;s talk
        </a>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              backgroundColor: pastHero ? '#000000' : '#FFFFFF',
              transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              backgroundColor: pastHero ? '#000000' : '#FFFFFF',
              transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] bg-white flex flex-col justify-center px-10">
          <nav className="flex flex-col gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-heading text-5xl font-bold text-black hover:text-[#E63329] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-12 text-sm font-medium"
            style={{ color: '#E63329' }}
          >
            Let&apos;s talk →
          </a>
        </div>
      )}
    </>
  );
}
