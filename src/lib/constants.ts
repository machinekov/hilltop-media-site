// Hilltop Media — Content & Constants

export const COLORS = {
  bg: '#0A0A0A',
  text: '#FAFAFA',
  textSecondary: '#666666',
  accent: '#E8E8E8',
  accentHover: '#FFFFFF',
  subtle: 'rgba(255, 255, 255, 0.08)',
} as const;

export const NAV_LINKS = [
  { label: 'Our Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/thehilltopmedia' },
  { label: 'Behance', href: 'https://www.behance.net/hilltopmedia3' },
  { label: 'Twitter', href: 'https://twitter.com/thehilltopmedia' },
  { label: 'Threads', href: 'https://threads.net/@thehilltopmedia' },
] as const;

export const HERO = {
  preTitle: "Vancouver's",
  tagline: 'Creative that converts.',
} as const;

export const REVEAL_1 = {
  text: 'Every brand we build, every campaign we launch, every asset we deliver answers one question: did it move the needle.',
} as const;

export const REVEAL_2 = {
  location: 'Vancouver, BC',
  text: "Good looking work is the bare minimum. We build creative that earns its keep. Every brand, website, and campaign starts with your business goals and works backward to the design.",
  body: "Most agencies hand over files and call it done. We deliver results you can measure. From brand identity to ad spend, product launch to performance creative, one team handles it all. No handoffs. No excuses.",
  images: [
    '/portfolio/prodigy-cover.jpg',
    '/portfolio/nlps-cover.jpg',
    '/portfolio/molibu-cover.jpg',
  ],
} as const;

export const REVEAL_3 = {
  text: 'Strategy first. Design second. Revenue always.',
} as const;

export const SERVICES_FOUNDATION_ITEMS = [
  'Brand Consultation',
  'Research & Insights',
  'Brand Strategy',
  'Customer Planning',
  'Content Strategy',
  'Campaign Strategy',
  'Design Strategy',
  'Brand Architecture',
] as const;

export const SERVICES_PILLARS_ITEMS = [
  'Logos & Naming',
  'Brand Guidelines',
  'Identity',
  'Web Design',
  'Web Development',
  'Packaging',
  'Graphic Design',
  'Sonic Design',
] as const;

export const SERVICES_GROWTH_ITEMS = [
  'Ad Creation',
  'Paid Performance',
  'Brand Launches',
  'Internal Media',
  'Communications Plan',
  'Video & Animation',
  'Social Media Content',
  'Experiential Marketing',
] as const;

export const AMAZON_FBA_ITEMS = [
  { name: 'Branding & Logos', description: 'A mark that builds recognition from day one and earns trust as you scale.' },
  { name: 'Packaging & Inserts', description: 'Packaging that stops the scroll before purchase and elevates the unboxing after.' },
  { name: 'Listing Images', description: 'Hero images and infographics engineered to convert browsers into buyers.' },
  { name: 'Listing Copywriting', description: 'Keyword driven copy that ranks in search and tells a story worth reading.' },
  { name: 'Photos & Videos', description: 'Studio quality photography and video that make your product impossible to ignore.' },
  { name: 'A+ & EBC Content', description: 'Premium brand content modules that boost conversion and build credibility below the fold.' },
] as const;

export const AMAZON_FBA_PRICING = [
  { tier: 'Core', price: '$1,350' },
  { tier: 'Pro', price: '$1,995' },
  { tier: 'Pro Plus', price: '$3,495' },
] as const;

export const SERVICES = [
  {
    badge: 'triangle' as const,
    title: 'Foundation',
    subtitle: 'Brand Strategy & Consultation',
    description:
      'We start where most agencies skip: the strategy. Before a single pixel gets placed, we dig into your market, your customer, and your competition. The creative that follows is built on insight, not guesswork.',
    link: 'Learn more',
    image: '/portfolio/prodigy-cover.jpg',
    items: SERVICES_FOUNDATION_ITEMS,
  },
  {
    badge: 'square' as const,
    title: 'Pillars',
    subtitle: 'Design & Development',
    description:
      'Identity systems that hold up everywhere. From your logo to your landing page to the box it ships in, every touchpoint looks and feels like it belongs to the same brand.',
    link: 'Learn more',
    image: '/portfolio/clipjuice-cover.jpg',
    items: SERVICES_PILLARS_ITEMS,
  },
  {
    badge: 'circle' as const,
    title: 'Growth',
    subtitle: 'Advertising & Performance',
    description:
      'Campaigns built to perform, not just impress. We create the ads, manage the spend, and optimize until the numbers work. You see the revenue.',
    link: 'Learn more',
    image: '/portfolio/ona-cover.jpg',
    items: SERVICES_GROWTH_ITEMS,
  },
] as const;

export const PORTFOLIO = [
  {
    title: 'Prodigy Intelligence',
    category: 'Brand Identity',
    image: '/portfolio/prodigy-cover.jpg',
    description: 'Full brand guidelines system for an AI intelligence firm. Corporate tech minimalism with surgical precision in every typographic and spatial detail.',
    behanceUrl: 'https://www.behance.net/gallery/242670675/Prodigy',
  },
  {
    title: 'VUE Glazing',
    category: 'Rebrand',
    image: '/portfolio/nlps-cover.jpg',
    description: 'A luxury architectural glazing firm needed a name and identity that matched the caliber of their work. VUE was born: engineered elegance, captured in a brand.',
    behanceUrl: 'https://www.behance.net/gallery/242631959/NLPS',
  },
  {
    title: 'Clipjuice',
    category: 'Branding',
    image: '/portfolio/clipjuice-cover.jpg',
    description: 'Brand identity and creative direction from first sketch to final mark. Dozens of explorations distilled into one system that captures the energy of short form content.',
    behanceUrl: 'https://www.behance.net/gallery/242632833/Clipjuice',
  },
  {
    title: 'Molibu',
    category: 'Brand Identity + Web',
    image: '/portfolio/molibu-cover.jpg',
    description: 'Brand and website for a Vancouver development and construction firm. Architectural precision translated into a digital experience as considered as the buildings themselves.',
    behanceUrl: 'https://www.behance.net/gallery/242632479/Molibu',
  },
  {
    title: 'Ona',
    category: 'Visual Identity',
    image: '/portfolio/ona-cover.jpg',
    description: 'Complete visual identity for an ecommerce brand selling direct to consumer. Clean, commercial, and built to stand out on a shelf and convert on a screen.',
    behanceUrl: 'https://www.behance.net/gallery/242630927/Ona',
  },
  {
    title: 'Fuzzo',
    category: 'Visual Identity',
    image: '/portfolio/fuzzo-cover.jpg',
    description: 'Character driven brand identity with custom typography, a mascot that actually works, and a color palette with enough personality to carry an entire product line.',
    behanceUrl: 'https://www.behance.net/gallery/242629965/Fuzzo',
  },
  {
    title: 'Clipjuice Highlight',
    category: 'Social Content',
    image: '/portfolio/clipjuice-highlight-cover.jpg',
    description: 'Performance content designed for TikTok and Instagram. Scroll stopping visuals built around short form video formats that actually drive engagement.',
    behanceUrl: 'https://www.behance.net/gallery/242670713/Clipjuice-Highlight',
  },
] as const;

export const FOOTER = {
  newsletter: 'Insights that move the needle. No fluff.',
  bookingCta: 'Book a free consultation',
  bookingUrl: 'https://calendly.com/thehilltopmedia/15min',
  email: 'info@thehilltopmedia.com',
  consultationNote: 'By the end of this call, you will have the best course of action with or without our services.',
  columns: {
    services: ['Brand Strategy', 'Design', 'Web Development', 'Advertising'],
    company: ['About', 'Work', 'Contact'],
    connect: [
      { label: 'Instagram', href: 'https://instagram.com/thehilltopmedia' },
      { label: 'Behance', href: 'https://www.behance.net/hilltopmedia3' },
      { label: 'Twitter', href: 'https://twitter.com/thehilltopmedia' },
      { label: 'Email', href: 'mailto:info@thehilltopmedia.com' },
    ],
  },
  copyright: '\u00A92026 Hilltop Media. All rights reserved. Vancouver, BC',
} as const;

// Section background colors for cinematic gradient shifts
export const SECTION_BG_COLORS = {
  hero: '#0A0A0A',
  reveal: '#0C0A08',
  services: '#08090C',
  portfolio: '#0A0A0A',
  footer: '#111111',
} as const;
