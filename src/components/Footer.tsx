'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { FOOTER } from '@/lib/constants';
import Image from 'next/image';

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
        stagger: 0.15,
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
      className="relative z-10 border-t border-[#1A1A1A] bg-[#0A0A0A] px-6 py-20 md:px-16 lg:px-24"
    >
      {/* Logo watermark */}
      <div className="footer-animate mb-20 flex justify-center overflow-hidden opacity-10">
        <Image
          src="/logo/hilltop-logo.png"
          alt="Hilltop Media"
          width={1050}
          height={365}
          className="w-full max-w-[600px] h-auto"
        />
      </div>

      {/* Newsletter */}
      <div className="footer-animate mx-auto mb-20 max-w-xl text-center">
        <p className="mb-6 text-lg text-[#888888]">{FOOTER.newsletter}</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex overflow-hidden rounded-full border border-[#333]"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-transparent px-6 py-4 text-[#FAFAFA] placeholder-[#555] outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-[#FEC81E] px-6 text-[#0A0A0A] transition-colors hover:bg-[#e6b41b]"
            aria-label="Subscribe"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10h12m0 0l-4-4m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Booking CTA */}
      <div className="footer-animate mx-auto mb-20 text-center">
        <a
          href={FOOTER.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border border-[#FEC81E] px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#FEC81E] transition-colors hover:bg-[#FEC81E] hover:text-[#0A0A0A]"
        >
          {FOOTER.bookingCta}
        </a>
        <p className="mt-4 text-sm text-[#888888]">{FOOTER.email}</p>
      </div>

      {/* Columns */}
      <div className="footer-animate mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
        {/* Services */}
        <div>
          <h5 className="mb-6 text-xs uppercase tracking-[0.3em] text-[#FAFAFA]">
            Services
          </h5>
          <ul className="flex flex-col gap-3">
            {FOOTER.columns.services.map((item) => (
              <li key={item}>
                <a
                  href="#services"
                  className="text-[#888888] transition-colors hover:text-[#FAFAFA]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="mb-6 text-xs uppercase tracking-[0.3em] text-[#FAFAFA]">
            Company
          </h5>
          <ul className="flex flex-col gap-3">
            {FOOTER.columns.company.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-[#888888] transition-colors hover:text-[#FAFAFA]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h5 className="mb-6 text-xs uppercase tracking-[0.3em] text-[#FAFAFA]">
            Connect
          </h5>
          <ul className="flex flex-col gap-3">
            {FOOTER.columns.connect.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888888] transition-colors hover:text-[#FAFAFA]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-animate mt-20 border-t border-[#1A1A1A] pt-8 text-center">
        <p className="text-sm text-[#555]">{FOOTER.copyright}</p>
      </div>
    </footer>
  );
}
