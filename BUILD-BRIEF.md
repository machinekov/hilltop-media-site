# Hilltop Media Site — V4 Overhaul Brief

## WHAT THIS IS
You are updating an existing Next.js site at `/tmp/hilltop-check/`. The site is deployed on Vercel (auto-deploys from `main` branch). It already has components, GSAP animations, Framer Motion, and Tailwind CSS v4 working. Your job is to update the content, add real portfolio images, fix issues, and polish the animations.

## CRITICAL RULES
- **NO hyphens or em dashes** in ANY visible copy. Rewrite sentences to avoid them.
- **DO NOT change the tech stack.** Keep Next.js App Router, Tailwind CSS v4, GSAP, Framer Motion.
- **DO NOT install new packages** unless absolutely necessary.
- **All images are already downloaded** in `public/portfolio/`. Use them.
- **Test with `npm run build`** before committing. Fix ALL TypeScript and build errors.
- **Commit and push to `main`** when done.
- **No `next/image` for the logo** — use `<img>` tag (it's already set up this way, don't change it).

## FILE STRUCTURE
```
src/
  app/
    page.tsx          — Main page (assembles all sections)
    layout.tsx        — Root layout (fonts, metadata)
    globals.css       — Global styles
  components/
    Hero.tsx          — Hero section with logo + tagline
    Navigation.tsx    — Fixed nav + hamburger menu
    Preloader.tsx     — Loading animation
    ScrollIndicator.tsx — Scroll down indicator
    CharacterReveal.tsx — Word-by-word text reveal sections
    ServicesCollection.tsx — Foundation/Pillars/Growth sticky scroll
    PortfolioSection.tsx — Portfolio cards
    AmazonFBA.tsx     — Amazon FBA services section
    Footer.tsx        — Footer with newsletter, links, CTA
  lib/
    constants.ts      — All content/data constants
    animations.ts     — GSAP utilities
public/
  logo/hilltop-logo.png — Hilltop Media logo (white on transparent, 1050x365)
  portfolio/            — All portfolio images (see below)
```

## AVAILABLE PORTFOLIO IMAGES
These are REAL images downloaded from behance.net/hilltopmedia3:

| Project | Cover | Extra Images |
|---------|-------|-------------|
| Clipjuice Highlight | clipjuice-highlight-cover.jpg | clipjuice-highlight-2.jpg, -3.jpg, -4.jpg |
| Prodigy | prodigy-cover.jpg | prodigy-2.jpg, -3.jpg, -4.jpg |
| Clipjuice | clipjuice-cover.jpg | clipjuice-2.jpg, -3.jpg, -4.jpg |
| Molibu | molibu-cover.jpg | molibu-2.jpg, -3.jpg, -4.jpg |
| NLPS | nlps-cover.jpg | nlps-2.jpg, -3.jpg, -4.jpg |
| Ona | ona-cover.jpg | ona-2.jpg, -3.jpg, -4.jpg |
| Fuzzo | fuzzo-cover.jpg | fuzzo-2.jpg, -3.jpg, -4.jpg |

Old placeholder images (portfolio-1.jpg through portfolio-5.jpg) should NOT be referenced anymore.

## CHANGES REQUIRED

### 1. constants.ts — PORTFOLIO array
Replace the current 3 placeholder entries with ALL 7 real Behance projects:

```typescript
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
    image: '/portfolio/nlps-cover.jpg',  // NLPS is the gold monogram on green marble — this is the VUE project
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
```

### 2. constants.ts — Update REVEAL_2 images
Replace the placeholder portfolio images in REVEAL_2 with real ones:
```typescript
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
```

### 3. constants.ts — Update SOCIAL_LINKS
Add Behance, update existing:
```typescript
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/thehilltopmedia' },
  { label: 'Behance', href: 'https://www.behance.net/hilltopmedia3' },
  { label: 'Twitter', href: 'https://twitter.com/thehilltopmedia' },
  { label: 'Threads', href: 'https://threads.net/@thehilltopmedia' },
] as const;
```

### 4. constants.ts — Update FOOTER
- Add Behance to connect links
- Update copyright to 2026
```typescript
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
      { label: 'Behance', href: 'https://www.behance.net/hilltopmedia3' },
      { label: 'Twitter', href: 'https://twitter.com/thehilltopmedia' },
      { label: 'Email', href: 'mailto:info@thehilltopmedia.com' },
    ],
  },
  copyright: '\u00A92026 Hilltop Media. All rights reserved. Vancouver, BC',
} as const;
```

### 5. PortfolioSection.tsx — Major Update
The portfolio section currently only handles 3 items and uses a scroll-pinned view. With 7 projects, it needs to be redesigned:

**New design:** A fullscreen scroll gallery with large portfolio cards. Each card should be:
- Full width (max-w-7xl), 60-70vh tall
- Cover image with gradient overlay
- Project title, category, and "View on Behance" link
- GSAP scroll-triggered entrance (fade up + slight scale)
- Hover: image zooms slightly, overlay lightens
- Cards stack vertically with generous spacing

Remove the old pinned scroll approach (it doesn't scale to 7 items well). Replace with a smooth vertical scroll with staggered GSAP entrances.

Each card should link to its Behance URL (open in new tab).

### 6. CharacterReveal.tsx — Image Cards
The existing component already supports images prop. Just make sure the 3 images passed from REVEAL_2 render correctly with the new paths. No component changes needed if the constant update is correct.

### 7. AmazonFBA.tsx — Enhance Content
Update the Amazon FBA section with richer content from the real site. The current section is minimal. Add:
- Subtitle: "Your Creative Partner for Amazon"
- Short description: "We are a 360 degree Amazon FBA partner agency with expertise in brand creation, graphic design, and listing optimization. We have helped hundreds of businesses discover their brand name, logo, guide, and positioning."
- Keep the existing 6 service items but add brief descriptions:
  - Branding & Logos: "Your brand becomes instantly recognizable and builds trust as your business grows."
  - Packaging & Inserts: "Eye grabbing packaging visuals and inserts that enrich the unboxing journey."
  - Listing Images: "Visually striking images that impress and educate the customer to make a purchase."
  - Listing Copywriting: "Careful keyword planning and beautiful copy that tells the story of your product."
  - Photos & Videos: "Product photography and video that brings the best out of your products."
  - A+ & EBC Content: "Extra imagery and text modules that take your listing to the next level."
- Add 3 pricing tiers (optional, below the service items):
  - Core: $1,350
  - Pro: $1,995
  - Pro Plus: $3,495

### 8. Footer.tsx — Minor Updates
- Behance link in connect section (handled by constants update)
- Add a "Schedule a Consultation" section with brief text: "By the end of this call, you will have the best course of action with or without our services."

### 9. page.tsx — No Structural Changes
The page structure is fine. Just make sure after the constants update, everything still compiles.

### 10. layout.tsx — Update Metadata
```typescript
export const metadata: Metadata = {
  title: 'Hilltop Media | Creative That Converts | Vancouver Creative Agency',
  description: 'Vancouver performance creative agency. Branding, web design, video production, packaging, and paid advertising. We deliver outcomes, not just assets.',
  keywords: ['creative agency Vancouver', 'branding agency Vancouver', 'web design Vancouver', 'performance creative agency', 'Hilltop Media', 'creative that converts'],
};
```

### 11. globals.css — Add Portfolio Card Styles
Add these styles:
```css
/* Portfolio card hover effect */
.portfolio-card-hover:hover .portfolio-image {
  transform: scale(1.05);
}

.portfolio-card-hover:hover .portfolio-overlay {
  opacity: 0.6;
}

/* Smooth image zoom */
.portfolio-image {
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
```

## ANIMATION QUALITY CHECK
After making all changes, verify these animations work:
1. **Preloader:** Counter 000→100 with progress bar, slides up to reveal site
2. **Hero:** Logo + tagline visible, fades/blurs on scroll
3. **Character Reveal 1:** Words light up one by one as you scroll
4. **Character Reveal 2:** Words light up + 3D cards fly in from sides + body text fades in
5. **Character Reveal 3:** Words light up one by one
6. **Services:** Sticky scroll with 3 service slides (Foundation/Pillars/Growth) — curtain transitions between them
7. **Amazon FBA:** Fade-in entrance on scroll
8. **Portfolio:** All 7 project cards with scroll-triggered entrances
9. **Footer:** Staggered fade-in of elements

## FINAL CHECKLIST
- [ ] `npm run build` passes with ZERO errors
- [ ] All 7 portfolio images load (check paths match filenames exactly)
- [ ] No placeholder images referenced (portfolio-1.jpg through portfolio-5.jpg)
- [ ] No hyphens or em dashes in visible text
- [ ] Behance links open in new tab
- [ ] Copyright says 2026
- [ ] Social links include Behance
- [ ] Git commit and push to main

## GIT
```bash
git add -A
git commit -m "feat: real portfolio from Behance, enhanced content, polished animations"
git push origin main
```
