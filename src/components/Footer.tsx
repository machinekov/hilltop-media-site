'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { FOOTER } from '@/lib/constants';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const elements = footerRef.current.querySelectorAll('.footer-animate');
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === footerRef.current) st.kill();
      });
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative z-10 px-6 py-24 md:px-16 lg:px-24"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="mx-auto max-w-6xl">
        {/* CTA Block */}
        <div className="footer-animate mb-24 text-center">
          <h3 className="font-heading text-[clamp(28px,5vw,56px)] font-bold text-[#FAFAFA] italic leading-tight mb-4">
            Let&apos;s build something
            <br />
            worth remembering.
          </h3>
          <p className="mx-auto mb-8 max-w-md text-base text-[#666666] leading-relaxed">
            {FOOTER.consultationNote}
          </p>
          <a
            href={FOOTER.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-[#E8E8E8] px-10 py-4 text-sm uppercase tracking-[0.2em] text-[#E8E8E8] transition-all duration-300 hover:bg-[#E8E8E8] hover:text-[#0A0A0A]"
          >
            {FOOTER.bookingCta}
          </a>
        </div>

        {/* Divider */}
        <div className="footer-animate mb-16 h-px bg-[rgba(255,255,255,0.06)]" />

        {/* Grid: Newsletter + Columns */}
        <div className="footer-animate mb-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Newsletter */}
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.2em] text-[#FAFAFA] font-medium">
              Stay in the loop
            </p>
            <p className="mb-6 text-[#666666] text-sm leading-relaxed max-w-sm">
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
                className="flex items-center justify-center bg-[#E8E8E8] px-5 text-[#0A0A0A] transition-colors hover:bg-[#FFFFFF]"
                aria-label="Subscribe"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Right: Link Columns */}
          <div className="grid grid-cols-3 gap-8">
            {/* Services */}
            <div>
              <h5 className="mb-5 text-xs uppercase tracking-[0.25em] text-[#FAFAFA] font-medium">
                Services
              </h5>
              <ul className="flex flex-col gap-2.5">
                {FOOTER.columns.services.map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-sm text-[#666666] transition-colors hover:text-[#FAFAFA]"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="mb-5 text-xs uppercase tracking-[0.25em] text-[#FAFAFA] font-medium">
                Company
              </h5>
              <ul className="flex flex-col gap-2.5">
                {FOOTER.columns.company.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-[#666666] transition-colors hover:text-[#FAFAFA]"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h5 className="mb-5 text-xs uppercase tracking-[0.25em] text-[#FAFAFA] font-medium">
                Connect
              </h5>
              <ul className="flex flex-col gap-2.5">
                {FOOTER.columns.connect.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#666666] transition-colors hover:text-[#FAFAFA]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-animate flex flex-col items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.06)] pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/hilltop-logo.png"
              alt="Hilltop Media"
              className="h-auto w-[100px] opacity-50"
            />
          </div>
          <p className="text-xs text-[#555]">{FOOTER.copyright}</p>
          <a
            href={`mailto:${FOOTER.email}`}
            className="text-xs text-[#666666] transition-colors hover:text-[#FAFAFA]"
          >
            {FOOTER.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
