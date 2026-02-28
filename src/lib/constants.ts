// Hilltop Media — Content & Constants (Locomotive-style redesign)

export const COLORS = {
  bg: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  accent: '#E63329',
  divider: '#E0E0E0',
  heroBg: '#000000',
  heroText: '#FFFFFF',
} as const;

export const NAV_LINKS = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Agency', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/thehilltopmedia' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/hilltopmedia' },
  { label: 'Vimeo', href: 'https://vimeo.com/hilltopmedia' },
] as const;

export const PORTFOLIO_PROJECTS = [
  { name: 'Shape Properties', category: 'Brand Identity' },
  { name: 'Ona Naturals', category: 'Visual Identity' },
  { name: 'Diamond Student', category: 'Branding' },
  { name: 'Refugee to Luxury', category: 'Brand + Web' },
] as const;

export const MANIFESTO = {
  quote:
    "Strategy and creativity are only as good as the results they drive. What sets us apart is how we think. We're a focused team of creatives who build brands that perform and campaigns that convert.",
  body:
    'From brand strategy to performance creative and media production, we handle the full stack. Over the past 6 years, Hilltop Media has become the go-to for ROI-driven branding, web design, and creative campaigns in Vancouver and beyond.',
  note: 'Always looking for bold brands to work with',
} as const;

export const FOOTER = {
  email: 'boris@thehilltopmedia.com',
  copyright: '©2026 Hilltop Media. Vancouver, BC.',
} as const;
