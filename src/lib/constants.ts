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
  body: "Most agencies deliver assets. We deliver outcomes. That's why our clients stay. From logo to launch, from listing to ad spend, we are the only partner you need. Branding, web, video, packaging, paid ads, all under one roof.",
  images: [
    '/portfolio/portfolio-1.jpg',
    '/portfolio/portfolio-2.jpg',
    '/portfolio/portfolio-3.jpg',
  ],
} as const;

export const REVEAL_3 = {
  text: 'Meet the team that builds brands worth remembering.',
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
  'Branding & Logos',
  'Packaging & Inserts',
  'Listing Images',
  'Listing Copywriting',
  'Photos & Videos',
  'A+ & EBC Content',
] as const;

export const SERVICES = [
  {
    badge: 'triangle' as const,
    title: 'Foundation',
    subtitle: 'Brand Strategy & Consultation',
    description:
      'Some may call us a full service creative agency, some may call us designers, but all our clients call us partners. Whether your company is launching a new logo, campaign, or website, as long as the outcome is something you can see, hear or feel, we can help.',
    link: 'Learn more',
    image: '/portfolio/portfolio-1.jpg',
    items: SERVICES_FOUNDATION_ITEMS,
  },
  {
    badge: 'square' as const,
    title: 'Pillars',
    subtitle: 'Design & Development',
    description:
      'Logos, websites, packaging, brand guidelines. Everything your brand needs to look and feel premium.',
    link: 'Learn more',
    image: '/portfolio/portfolio-2.jpg',
    items: SERVICES_PILLARS_ITEMS,
  },
  {
    badge: 'circle' as const,
    title: 'Growth',
    subtitle: 'Advertising & Performance',
    description:
      'Paid ads, social content, video, and campaigns designed to convert. We manage the spend, you count the revenue.',
    link: 'Learn more',
    image: '/portfolio/portfolio-3.jpg',
    items: SERVICES_GROWTH_ITEMS,
  },
] as const;

export const PORTFOLIO = [
  {
    title: 'VUE Glazing',
    category: 'Rebrand',
    image: '/portfolio/portfolio-1.jpg',
    description:
      'Siber Special Projects, a luxury glazing firm, approached us seeking a comprehensive rebranding strategy to align its visual identity with its long term vision. Together, we embarked on a creative process that led to the creation of their new name, VUE. Capturing the essence of their excellence in architectural engineering, aesthetic prowess, and precision.',
  },
  {
    title: 'Diamond Student (FBA)',
    category: 'Branding + Listing',
    image: '/portfolio/portfolio-2.jpg',
    description: '',
  },
  {
    title: 'Shape Properties',
    category: 'Social Growth',
    image: '/portfolio/portfolio-3.jpg',
    description: '',
  },
] as const;

export const FOOTER = {
  newsletter: 'Get insights that actually make you money',
  bookingCta: 'Book a free consultation',
  bookingUrl: 'https://calendly.com/thehilltopmedia/15min',
  email: 'info@thehilltopmedia.com',
  columns: {
    services: ['Brand Strategy', 'Design', 'Web Development', 'Advertising'],
    company: ['About', 'Work', 'Contact'],
    connect: [
      { label: 'Instagram', href: 'https://instagram.com/thehilltopmedia' },
      { label: 'Twitter', href: 'https://twitter.com/thehilltopmedia' },
      { label: 'Threads', href: 'https://threads.net/@thehilltopmedia' },
      { label: 'Email', href: 'mailto:info@thehilltopmedia.com' },
    ],
  },
  copyright: '\u00A92025 Hilltop Media. All rights reserved. Vancouver, BC',
} as const;
