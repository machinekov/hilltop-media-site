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
  text: 'Every brand we build, every campaign we run, every pixel we push is measured by one thing: did it make you money.',
} as const;

export const REVEAL_2 = {
  location: 'Vancouver, BC',
  text: "We don't just make things look good. We make creative that drives revenue. Every brand, website, and campaign we produce starts with your business goals and works backward to the creative.",
  body: "Most agencies deliver assets. We deliver outcomes. That is why our clients stay. From logo to launch, from listing to ad spend, we are the only partner you need. Branding, web, video, packaging, paid ads, all under one roof.",
  images: [
    '/portfolio/prodigy-cover.jpg',
    '/portfolio/nlps-cover.jpg',
    '/portfolio/molibu-cover.jpg',
  ],
} as const;

export const REVEAL_3 = {
  text: 'Branding. Design. Advertising. One agency, zero fluff.',
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
  { name: 'Branding & Logos', description: 'Your brand becomes instantly recognizable and builds trust as your business grows.' },
  { name: 'Packaging & Inserts', description: 'Eye grabbing packaging visuals and inserts that enrich the unboxing journey.' },
  { name: 'Listing Images', description: 'Visually striking images that impress and educate the customer to make a purchase.' },
  { name: 'Listing Copywriting', description: 'Careful keyword planning and beautiful copy that tells the story of your product.' },
  { name: 'Photos & Videos', description: 'Product photography and video that brings the best out of your products.' },
  { name: 'A+ & EBC Content', description: 'Extra imagery and text modules that take your listing to the next level.' },
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
      'Some may call us a full service creative agency, some may call us designers, but all our clients call us partners. Whether your company is launching a new logo, campaign, or website, as long as the outcome is something you can see, hear or feel, we can help.',
    link: 'Learn more',
    image: '/portfolio/prodigy-cover.jpg',
    items: SERVICES_FOUNDATION_ITEMS,
  },
  {
    badge: 'square' as const,
    title: 'Pillars',
    subtitle: 'Design & Development',
    description:
      'Logos, websites, packaging, brand guidelines. Everything your brand needs to look and feel premium.',
    link: 'Learn more',
    image: '/portfolio/clipjuice-cover.jpg',
    items: SERVICES_PILLARS_ITEMS,
  },
  {
    badge: 'circle' as const,
    title: 'Growth',
    subtitle: 'Advertising & Performance',
    description:
      'Paid ads, social content, video, and campaigns designed to convert. We manage the spend, you count the revenue.',
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
    description: 'A comprehensive brand guidelines system for Prodigy Intelligence. Ultra clean, corporate tech minimalism with precise typography and futuristic spacing.',
    behanceUrl: 'https://www.behance.net/gallery/242670675/Prodigy',
  },
  {
    title: 'VUE Glazing',
    category: 'Rebrand',
    image: '/portfolio/nlps-cover.jpg',
    description: 'Siber Special Projects, a luxury glazing firm, approached us seeking a comprehensive rebranding strategy. Together we created VUE, capturing excellence in architectural engineering, aesthetic prowess, and precision.',
    behanceUrl: 'https://www.behance.net/gallery/242631959/NLPS',
  },
  {
    title: 'Clipjuice',
    category: 'Branding',
    image: '/portfolio/clipjuice-cover.jpg',
    description: 'Brand identity and creative direction for Clipjuice, from initial sketches to final mark. A process driven approach that uncovered the brand essence through dozens of explorations.',
    behanceUrl: 'https://www.behance.net/gallery/242632833/Clipjuice',
  },
  {
    title: 'Molibu',
    category: 'Brand Identity + Web',
    image: '/portfolio/molibu-cover.jpg',
    description: 'Premium brand identity and website for Molibu, a luxury real estate developer and builder. Modern architectural aesthetics meet clean digital experiences.',
    behanceUrl: 'https://www.behance.net/gallery/242632479/Molibu',
  },
  {
    title: 'Ona',
    category: 'Visual Identity',
    image: '/portfolio/ona-cover.jpg',
    description: 'Visual identity system for Ona. Clean, commercial product branding with a fresh, approachable aesthetic that stands out on shelf and screen.',
    behanceUrl: 'https://www.behance.net/gallery/242630927/Ona',
  },
  {
    title: 'Fuzzo',
    category: 'Visual Identity',
    image: '/portfolio/fuzzo-cover.jpg',
    description: 'Playful, character driven brand identity for Fuzzo. Custom typography, a memorable mascot, and a punchy color palette that brings instant personality.',
    behanceUrl: 'https://www.behance.net/gallery/242629965/Fuzzo',
  },
  {
    title: 'Clipjuice Highlight',
    category: 'Social Content',
    image: '/portfolio/clipjuice-highlight-cover.jpg',
    description: 'Social media content portfolio showcase for Clipjuice. Dynamic phone mockups displaying short form video content across TikTok and Instagram.',
    behanceUrl: 'https://www.behance.net/gallery/242670713/Clipjuice-Highlight',
  },
] as const;

export const FOOTER = {
  newsletter: 'Get insights that actually make you money',
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
