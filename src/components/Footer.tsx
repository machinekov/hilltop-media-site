'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';

const MENU_LINKS = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Agency', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy', href: '#' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/thehilltopmedia' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/hilltopmedia' },
  { label: 'Vimeo', href: 'https://vimeo.com/hilltopmedia' },
];

const CONNECT_LINKS = [
  { label: "Let's talk", href: '#contact' },
  { label: 'boris@thehilltopmedia.com', href: 'mailto:boris@thehilltopmedia.com' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      const items = footerRef.current!.querySelectorAll('.footer-animate');
      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06,
          scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const colLabel = (text: string) => (
    <span
      className="block text-[10px] uppercase tracking-[0.14em] mb-5 font-medium"
      style={{
        color: '#999999',
        fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
      }}
    >
      {text}
    </span>
  );

  const linkStyle = {
    color: '#000000',
    fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
    fontSize: '12px',
    display: 'block',
    marginBottom: '10px',
    transition: 'color 0.2s ease',
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E0E0E0',
      }}
    >
      {/* Upper footer — four-column grid */}
      <div
        className="footer-animate"
        style={{
          padding: '64px 40px 48px',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '48px',
        }}
      >
        {/* Menu column */}
        <div>
          {colLabel('Menu')}
          {MENU_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={linkStyle}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#E63329')}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#000000')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social column */}
        <div>
          {colLabel('Social')}
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#E63329')}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#000000')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Connect column */}
        <div>
          {colLabel('Connect')}
          {CONNECT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={linkStyle}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#E63329')}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#000000')}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Hairline divider */}
      <div style={{ height: '1px', backgroundColor: '#E0E0E0', margin: '0 40px' }} />

      {/* Lower footer — stylized contact block */}
      <div
        className="footer-animate"
        style={{ padding: '48px 40px 56px', maxWidth: '1280px', margin: '0 auto' }}
      >
        <div
          className="font-heading font-bold leading-[1.1] select-none"
          style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', color: '#000000', letterSpacing: '-0.01em' }}
        >
          <span style={{ color: '#999999' }}>◇ </span>
          Hilltop
          <span style={{ color: '#E63329' }}>→</span>
          {' '}
          <span className="font-normal" style={{ fontSize: '0.55em', verticalAlign: 'middle', color: '#666666' }}>
            49.2827°N
          </span>
          <span style={{ color: '#E63329' }}>✻</span>
          {' '}Media
          <span style={{ fontSize: '0.45em', verticalAlign: 'super', color: '#999999' }}>™</span>
          <br />
          Vancouver
          <span style={{ color: '#E63329' }}>❋</span>
          , Canada
          <br />
          <a
            href="mailto:boris@thehilltopmedia.com"
            className="transition-opacity hover:opacity-60"
            style={{ fontSize: '0.55em', color: '#666666', fontStyle: 'normal', fontWeight: 400, letterSpacing: '-0.005em' }}
          >
            boris@thehilltopmedia.com
          </a>
          <span
            className="float-right text-[13px] font-normal self-end"
            style={{
              color: '#999999',
              fontFamily: 'var(--font-jakarta, "Plus Jakarta Sans", sans-serif)',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.02em',
              paddingTop: '8px',
            }}
          >
            ©2026
          </span>
        </div>
      </div>
    </footer>
  );
}
