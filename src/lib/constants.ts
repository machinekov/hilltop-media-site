// Hilltop Media — Content & Constants

export const COLORS = {
  bg: '#0A0A0A',
  text: '#FAFAFA',
  textSecondary: '#888888',
  accent: '#FEC81E',
  accentMuted: 'rgba(254, 200, 30, 0.1)',
  svgPathFaint: '#2A2A2A',
  svgPathBold: '#FEC81E',
} as const;

export const NAV_LINKS = [
  { label: 'Our Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/thehilltopmedia' },
  { label: 'Behance', href: 'https://behance.net/hilltopmedia' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/hilltopmedia' },
] as const;

export const HERO = {
  preTitle: "Vancouver's",
  tagline: 'Creative that converts.',
} as const;

export const REVEAL_1 = {
  text: 'Every brand we build, every campaign we run, every pixel we push is measured by one thing: did it make you money.',
} as const;

export const REVEAL_2 = {
  location: 'Vancouver, BC — Canada',
  text: "We don't just make things look good. We make creative that drives revenue. Every brand, website, and campaign we produce starts with your business goals and works backward to the creative.",
  body: "Most agencies deliver assets. We deliver outcomes. That's why our clients stay. From logo to launch, from listing to ad spend, we're the only partner you need. Branding, web, video, packaging, paid ads, all under one roof.",
  images: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
  ],
} as const;

export const REVEAL_3 = {
  text: 'Meet the team that builds brands worth remembering.',
} as const;

export const SERVICES = [
  {
    badge: 'triangle' as const,
    title: 'Foundation',
    subtitle: 'Brand Strategy & Consultation',
    description:
      'Where every great brand begins. Research, insights, and a roadmap built around your revenue goals.',
    link: 'Learn more',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
  },
  {
    badge: 'square' as const,
    title: 'Pillars',
    subtitle: 'Design & Development',
    description:
      'Logos, websites, packaging, brand guidelines. Everything your brand needs to look and feel premium.',
    link: 'Learn more',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    badge: 'circle' as const,
    title: 'Growth',
    subtitle: 'Advertising & Performance',
    description:
      'Paid ads, social content, video, and campaigns designed to convert. We manage the spend, you count the revenue.',
    link: 'Learn more',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
] as const;

export const PORTFOLIO = [
  {
    title: 'VUE Glazing',
    category: 'Rebrand',
    image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&q=80',
  },
  {
    title: 'Diamond Student (FBA)',
    category: 'Branding + Listing',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
  },
  {
    title: 'Shape Properties',
    category: 'Social Growth',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
  },
] as const;

export const FOOTER = {
  newsletter: 'Get insights that actually make you money',
  bookingCta: 'Book a free consultation',
  bookingUrl: 'https://calendly.com/thehilltopmedia/15min',
  email: 'boris@thehilltopmedia.com',
  columns: {
    services: ['Brand Strategy', 'Design', 'Web Development', 'Advertising'],
    company: ['About', 'Work', 'Contact', 'Blog'],
    connect: [
      { label: 'Instagram', href: 'https://instagram.com/thehilltopmedia' },
      { label: 'Behance', href: 'https://behance.net/hilltopmedia' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/hilltopmedia' },
      { label: 'Email', href: 'mailto:boris@thehilltopmedia.com' },
    ],
  },
  copyright: '\u00A92025 Hilltop Media. All rights reserved. Vancouver, BC',
} as const;
