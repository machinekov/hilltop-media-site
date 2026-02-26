'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { splitIntoWords } from '@/lib/animations';
import { FOOTER } from '@/lib/constants';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const ctaWords = splitIntoWords('Let us build something worth remembering.');

  useEffect(() => {
    if (!footerRef.current) return;

    // Staggered fade-in for all footer elements
    const elements = footerRef.current.querySelectorAll('.footer-animate');
    gsap.fromTo(elements,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 75%' },
      }
    );

    // Word-by-word CTA reveal
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.footer-word');
      gsap.set(words, { opacity: 0.15, color: '#333333' });
      gsap.to(words, {
        opacity: 1, color: '#FAFAFA',
        stagger: 0.08, duration: 0.5, ease: 'power1.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 70%', end: 'top 30%', scrub: 0.3 },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === footerRef.current || (headingRef.current && st.trigger === headingRef.current)) st.kill();
      });
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative z-10 min-h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Giant brand text — fills the width */}
      <div className="footer-animate relative flex-shrink-0 pt-20 md:pt-28 overflow-hidden">
        {/* Massive HILLTOP MEDIA text */}
        <div className="relative px-4">
          <h2
            className="font-heading text-center font-bold italic leading-[0.85] text-[#FAFAFA] select-none"
            style={{ fontSize: 'clamp(60px, 15vw, 240px)', opacity: 0.06 }}
          >
            HILLTOP
            <br />
            MEDIA
          </h2>

          {/* Brand element: pencil SVG — positioned like Iron Hill's bigfoot on the text */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none"
            width="120"
            height="120"
            viewBox="0 0 40 40"
            fill="none"
          >
            <rect x="16" y="4" width="8" height="24" rx="1" fill="#E8E8E8" />
            <polygon points="16,28 24,28 20,36" fill="#FEC81E" />
            <rect x="16" y="2" width="8" height="4" rx="1" fill="#888888" />
            <rect x="15.5" y="6" width="9" height="1.5" fill="#666666" />
            <rect x="15.5" y="9" width="9" height="1.5" fill="#666666" />
            <polygon points="16,24 24,24 22,28 18,28" fill="#C4A87A" />
          </svg>

          {/* Geometric shapes — scattered like Iron Hill's tree/mermaid/clouds */}
          <svg className="absolute left-[5%] bottom-[10%] opacity-[0.08] pointer-events-none" width="80" height="100" viewBox="0 0 80 100" fill="none">
            <polygon points="40,5 75,95 5,95" stroke="#E8E8E8" strokeWidth="1" />
          </svg>
          <svg className="absolute right-[8%] top-[15%] opacity-[0.08] pointer-events-none" width="70" height="70" viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="35" r="30" stroke="#E8E8E8" strokeWidth="1" />
          </svg>
          <svg className="absolute right-[20%] bottom-[5%] opacity-[0.06] pointer-events-none" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <rect x="5" y="5" width="40" height="40" stroke="#E8E8E8" strokeWidth="1" transform="rotate(15 25 25)" />
          </svg>
        </div>
      </div>

      {/* CTA section */}
      <div className="flex-shrink-0 py-16 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          {/* Word-by-word CTA heading */}
          <div ref={headingRef} className="footer-animate text-center mb-6">
            <p className="font-heading text-[clamp(24px,4vw,48px)] font-bold italic leading-tight">
              {ctaWords.map((word, i) => (
                <span key={i} className="footer-word inline text-[#FAFAFA]">
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>

          <div className="footer-animate text-center mb-10">
            <p className="mx-auto max-w-md text-sm text-[#666666] leading-relaxed mb-8">
              {FOOTER.consultationNote}
            </p>
            <a
              href={FOOTER.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-[rgba(255,255,255,0.15)] px-10 py-4 text-xs uppercase tracking-[0.25em] text-[#999] transition-all duration-300 hover:border-[#FEC81E] hover:text-[#FEC81E]"
            >
              {FOOTER.bookingCta}
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-animate mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="h-px bg-[rgba(255,255,255,0.06)]" />
      </div>

      {/* Bottom section: newsletter + columns */}
      <div className="flex-1 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left: Newsletter */}
          <div className="footer-animate">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#FAFAFA] font-medium">
              Stay in the loop
            </p>
            <p className="mb-5 text-sm text-[#666666] leading-relaxed max-w-sm">
              {FOOTER.newsletter}. No spam, just signal.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex max-w-sm overflow-hidden rounded-full border border-[rgba(255,255,255,0.1)]"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-5 py-3 text-sm text-[#FAFAFA] placeholder-[#555] outline-none"
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-[#E8E8E8] px-5 text-[#0A0A0A] transition-colors hover:bg-[#FEC81E]"
                aria-label="Subscribe"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>

          {/* Right: Link Columns */}
          <div className="footer-animate grid grid-cols-3 gap-8">
            <div>
              <h5 className="mb-5 text-xs uppercase tracking-[0.25em] text-[#FAFAFA] font-medium">Services</h5>
              <ul className="flex flex-col gap-2.5">
                {FOOTER.columns.services.map((item) => (
                  <li key={item}><a href="#services" className="text-sm text-[#666666] transition-colors hover:text-[#FAFAFA]">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="mb-5 text-xs uppercase tracking-[0.25em] text-[#FAFAFA] font-medium">Company</h5>
              <ul className="flex flex-col gap-2.5">
                {FOOTER.columns.company.map((item) => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="text-sm text-[#666666] transition-colors hover:text-[#FAFAFA]">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="mb-5 text-xs uppercase tracking-[0.25em] text-[#FAFAFA] font-medium">Connect</h5>
              <ul className="flex flex-col gap-2.5">
                {FOOTER.columns.connect.map((item) => (
                  <li key={item.label}><a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#666666] transition-colors hover:text-[#FAFAFA]">{item.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="footer-animate border-t border-[rgba(255,255,255,0.06)] px-6 py-6 md:px-12">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-3 md:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/hilltop-logo.png" alt="Hilltop Media" className="h-auto w-[90px] opacity-40" />
          <p className="text-xs text-[#555]">{FOOTER.copyright}</p>
          <a href={`mailto:${FOOTER.email}`} className="text-xs text-[#666666] transition-colors hover:text-[#FAFAFA]">{FOOTER.email}</a>
        </div>
      </div>
    </footer>
  );
}
