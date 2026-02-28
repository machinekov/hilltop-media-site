'use client';

export default function Footer() {
  return (
    <footer id="contact" className="page-margin pt-24 pb-12">
      {/* Upper footer — link columns */}
      <div className="hairline mb-12" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        {/* Menu */}
        <div>
          <p className="text-xs tracking-wider uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>
            Menu
          </p>
          <ul className="space-y-2">
            {['Work', 'Services', 'Agency', 'Contact', 'Privacy'].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="text-sm animated-link hover:opacity-70 transition-opacity">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="text-xs tracking-wider uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>
            Social
          </p>
          <ul className="space-y-2">
            {[
              { name: 'Instagram', url: '#' },
              { name: 'LinkedIn', url: '#' },
              { name: 'Vimeo', url: '#' },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm animated-link hover:opacity-70 transition-opacity"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <p className="text-xs tracking-wider uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>
            Connect
          </p>
          <ul className="space-y-2">
            <li>
              <a href="mailto:boris@thehilltopmedia.com" className="text-sm animated-link hover:opacity-70 transition-opacity">
                Email us
              </a>
            </li>
            <li>
              <a href="#contact" className="text-sm animated-link" style={{ color: 'var(--accent)' }}>
                Let&apos;s talk →
              </a>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs tracking-wider uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>
            Info
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Vancouver, BC<br />
            Canada
          </p>
        </div>
      </div>

      {/* Lower footer — stylized contact block */}
      <div className="hairline mb-8" />

      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div
          className="font-heading leading-[1.15] tracking-tight"
          style={{ fontSize: 'clamp(24px, 3.5vw, 44px)' }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>◇ </span>
          Hilltop<span style={{ color: 'var(--accent)' }}>→</span> 49.2827°N
          <span style={{ color: 'var(--accent)' }}>✻</span> Media
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.6em' }}>™</span>
          <br />
          <span className="block mt-1">
            Vancouver<span style={{ color: 'var(--accent)' }}>❋</span>, Canada
          </span>
          <span
            className="block mt-2 text-sm"
            style={{
              fontFamily: 'var(--font-jakarta)',
              color: 'var(--text-secondary)',
              fontSize: '13px',
            }}
          >
            boris@thehilltopmedia.com
          </span>
        </div>

        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          ©2026 Hilltop Media
        </span>
      </div>

      <div className="h-8" />
    </footer>
  );
}
