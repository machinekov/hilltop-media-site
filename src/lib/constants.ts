// Hilltop Media — site constants

export const SITE = {
  name: 'Hilltop Media',
  tagline: 'Performance Creative Agency',
  email: 'boris@thehilltopmedia.com',
  location: 'Vancouver, BC, Canada',
  yearFounded: 2019,
  url: 'https://thehilltopmedia.com',
} as const;

export const PROJECTS = [
  { name: 'Shape Properties', category: 'Brand Strategy, Social', slug: 'shape-properties' },
  { name: 'Ona Naturals', category: 'Packaging, Amazon', slug: 'ona-naturals' },
  { name: 'Diamond Student', category: 'Branding, Packaging', slug: 'diamond-student' },
  { name: 'Refugee to Luxury', category: 'Web Design, Brand', slug: 'refugee-to-luxury' },
] as const;

export const SERVICE_GROUPS = [
  {
    label: 'Branding',
    items: [
      'Brand Strategy & Positioning',
      'Visual Identity & Logo Design',
      'Brand Guidelines',
      'Packaging Design',
    ],
  },
  {
    label: 'Digital',
    items: [
      'Web Design & Development',
      'UI/UX Design',
      'SEO & Performance',
      'Amazon Listing Optimization',
    ],
  },
  {
    label: 'Production',
    items: [
      'Video Production & Direction',
      'Photography',
      'Motion Graphics',
      'Drone & Aerial',
      'Social Media Content',
    ],
  },
] as const;
