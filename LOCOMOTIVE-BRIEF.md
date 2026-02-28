# LOCOMOTIVE-STYLE REBUILD — Hilltop Media

## OBJECTIVE
Completely rebuild the Hilltop Media site to match the design language of locomotive.ca. This is NOT a tweak — it's a ground-up redesign using the same Next.js + Tailwind + GSAP stack, but adopting Locomotive's visual system.

## REFERENCE
- Ripped HTML: /tmp/locomotive-ripped.html (272KB, full DOM with inlined styles)
- Ripped CSS: /tmp/locomotive-styles.css (243KB, all computed stylesheets)
- Structure JSON: /tmp/locomotive-structure.json (section breakdown, fonts, colors)
- Screenshots: /home/openclaw/.openclaw/workspace/locomotive-viewport.png, locomotive-full.png

## DESIGN SYSTEM TO REPLICATE

### Color Palette
| Role | Color |
|------|-------|
| Primary Background | #FFFFFF (white) |
| Primary Text | #000000 (black) |
| Accent / CTA | #E63329 (bright red/coral) |
| Hero Background | #000000 (black) |
| Hero Text | #FFFFFF (white) |
| Dividers / Rules | #E0E0E0 (light gray hairlines) |
| Secondary Text | #666666 |

CRITICAL: The current site is dark-on-dark (#0A0A0A background). The new site is WHITE background with BLACK text. This is a complete palette inversion. The only color accent is red for CTAs.

### Typography
- **Display / Headlines:** Playfair Display (already installed). Use at VERY large sizes (60-100px+) for project names and hero text. High-contrast serif, similar to Locomotive's display face.
- **Body / UI / Nav:** Plus Jakarta Sans (already installed). Use at small sizes (11-14px) for navigation, descriptions, labels, links.
- **Scale contrast must be DRAMATIC** — the ratio between headline and body text should be at least 5:1 or greater.

### Spacing Philosophy
- Extremely generous vertical spacing between sections (80-120px padding)
- Section dividers: 1px hairlines in #E0E0E0
- Content hugs edges with 30-50px horizontal margins
- The scroll rhythm should feel slow and contemplative

### Key Design Principles
1. Black and white dominance — only red accent breaks the monochrome
2. Extreme typographic hierarchy — massive headlines, tiny body text
3. Comma-separated nav links (unconventional, distinctive)
4. Full-width hairline dividers between content items
5. No cards, no glass effects, no gradients — just type, space, and rules
6. No film grain, no custom cursor — clean and minimal
7. Editorial/magazine aesthetic, not tech/startup

## SITE STRUCTURE (map Locomotive sections to Hilltop content)

### 1. HEADER / NAV (fixed)
- **Left:** "Hilltop Media" in Playfair Display, small size (~16px)
- **Center:** "Work, Services, Agency, Contact" — comma-separated, Plus Jakarta Sans, small (~12-13px), black
- **Right:** "Let's talk" in red (#E63329), same small size
- Transparent over hero, white background when scrolled past hero
- Clean, minimal, no hamburger on desktop

### 2. HERO SECTION
- Full-width black background, ~40vh height
- Bottom-left aligned content:
  - Small tags/labels: "BRD | WEB / VID" in tiny outlined boxes (services shorthand: Branding, Web, Video)
  - "Hilltop Media" in large display Playfair (~60-80px), white
  - "Performance Creative Agency✻" as tagline, white, same large serif
- Bottom-right: "©2019-2026" small, white
- NO hero image for now — just bold typography on black (like Locomotive's hero)

### 3. FEATURED WORK / PORTFOLIO
- Section label: "Featured work" small, left-aligned, with horizontal rule above
- Vertically stacked list of project names, each spanning FULL WIDTH
- Each name in MASSIVE Playfair Display (~60-80px or 5-7vw), centered
- Separated by 1px hairline dividers in light gray
- Project names (use these):
  1. "Shape Properties"
  2. "Ona Naturals"
  3. "Diamond Student"
  4. "Refugee to Luxury"
- Final item: "All Work →" styled as a view-all link
- Hover state: project name could shift color to red, or reveal a subtle image
- Each item should be a clickable row with generous vertical padding (30-50px)

### 4. ABOUT / MANIFESTO SECTION
- Two-column asymmetric layout (55% left, 45% right)
- **Left column:** Large manifesto text in Playfair Display (~32-42px):
  > "Strategy and creativity are only as good as the results they drive. What sets us apart is how we think. We're a focused team of creatives who build brands that perform and campaigns that convert."
- **Right column:**
  - Description in small body text (~12-13px):
    > "From brand strategy to performance creative and media production, we handle the full stack. Over the past 6 years, Hilltop Media has become the go-to for ROI-driven branding, web design, and creative campaigns in Vancouver and beyond."
  - Links: "Services →" and "Contact →" with hairline dividers
  - Small note: "Always looking for bold brands to work with"

### 5. SERVICES SECTION (replaces Locomotive's "Extras")
- Section title: "Services" large, left-aligned, with "(6)" count right-aligned
- Sub-sections in two-column layout (label left, list right):

**Branding**
- Brand Strategy & Positioning
- Visual Identity & Logo Design
- Brand Guidelines
- Packaging Design

**Digital**
- Web Design & Development
- UI/UX Design
- SEO & Performance
- Amazon Listing Optimization

**Production**
- Video Production & Direction
- Photography
- Motion Graphics
- Drone & Aerial
- Social Media Content

Each item separated by hairline dividers, small sans-serif text.

### 6. FOOTER
- **Upper footer:** Four-column grid
  - Menu: Work, Services, Agency, Contact, Privacy
  - Social: Instagram, LinkedIn, Vimeo
  - Connect: Let's talk, boris@thehilltopmedia.com
  
- **Lower footer:** Large stylized contact block (inspired by Locomotive's cryptographic footer):
  - Address info in large display type with decorative symbols:
    "◇ Hilltop→ 49.2827°N✻ Media™
     Vancouver❋, Canada
     boris@thehilltopmedia.com                    ©2026"

## WHAT TO REMOVE
- Film grain overlay
- Custom cursor
- Dark background (entire dark theme)
- Glass card effects
- SectionDivider component (replace with simple 1px hairlines)
- ScrollPath component
- HeroTransition component
- CharacterReveal component (replace with the manifesto section)
- AmazonFBA component (fold into services)
- Background color transitions between sections
- All the BG_COLORS logic

## WHAT TO KEEP
- Next.js + Tailwind + GSAP stack
- Lenis smooth scroll
- Playfair Display + Plus Jakarta Sans fonts
- Basic GSAP scroll-triggered animations (but simpler — text reveals, fade-ins)
- The build system, package.json, tsconfig, etc.

## ANIMATIONS (subtle, not flashy)
- Text elements fade/slide up on scroll enter
- Project names in portfolio could have a subtle letter-spacing animation on hover
- Nav transition: transparent → white background when scrolling past hero
- Page load: simple fade-in, no elaborate preloader
- Hairline dividers could animate width from 0 to 100% on scroll

## FILE CHANGES NEEDED
1. `src/app/globals.css` — Complete rewrite for white theme, new typography scales, hairline styles
2. `src/app/page.tsx` — Complete restructure to new section layout
3. `src/app/layout.tsx` — Keep fonts, update metadata
4. `src/components/Navigation.tsx` — Rebuild: logo left, comma-sep links center, CTA right
5. `src/components/Hero.tsx` — Rebuild: black bg, typography-only, bottom-left aligned
6. `src/components/PortfolioSection.tsx` — Rebuild: full-width stacked text list
7. `src/components/Footer.tsx` — Rebuild: column grid + stylized contact block
8. NEW: `src/components/Manifesto.tsx` — Two-column about section
9. NEW: `src/components/Services.tsx` — Categorized services list
10. DELETE: Preloader.tsx, CustomCursor.tsx, SectionDivider.tsx, ScrollPath.tsx, CharacterReveal.tsx, AmazonFBA.tsx, ServicesCollection.tsx, HeroTransition.tsx, ScrollIndicator.tsx
11. `src/lib/constants.ts` — Update with new content
12. `src/lib/animations.ts` — Simplify, remove dark-theme specific stuff

## CRITICAL CONSTRAINTS
- Must build and deploy cleanly with `next build`
- Must look good at 1440px wide (primary) and be responsive down to 375px
- No external images needed — this is a typography-first design
- Commit message: "feat: complete Locomotive-style redesign — white, editorial, type-driven"
- Push to main when done (Vercel auto-deploys)

## QUALITY BAR
Look at the Locomotive screenshots. The site should feel:
- Clean, spacious, editorial
- Like a high-end design magazine, not a tech startup
- Confident and restrained — every pixel is intentional
- Typography does ALL the heavy lifting
