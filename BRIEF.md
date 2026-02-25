# Hilltop Media Site — Build Brief

## GOAL
Recreate the visual experience and interaction design of https://ironhill.au/ but for **Hilltop Media**, a performance creative agency in Vancouver, BC.

Keep the same level of quality, animations, and visual polish. Replace all Iron Hill content, branding, and products with Hilltop Media services, portfolio, and info.

## REFERENCE SITE BREAKDOWN (ironhill.au)

The Iron Hill site has these sections in order:

### 1. Loading Preloader
- Counting animation (000 → 100) with progress bar
- Animated GIF/canvas during load
- Slides up to reveal content

### 2. Background SVG Path
- A tall winding SVG path (~10000px tall) that draws on scroll
- Two copies: one faint (#CFD0C0), one bold (#344128) that draws as you scroll
- Creates a sense of journey/progression through the page

### 3. Three.js 3D Canvas
- Full-viewport canvas behind content
- Subtle atmospheric 3D scene (fog/particles/environment)
- Stays fixed while content scrolls over it

### 4. Logo (top-left)
- Custom SVG wordmark "IRONHILL"
- Animated in/out on scroll

### 5. Navigation
- Hamburger menu button (circle with 2 lines)
- Opens full-screen overlay with animated card images
- Menu links to product pages and sections
- Social links (Instagram, LinkedIn) at bottom

### 6. Hero Section (sticky/full-viewport)
- Small text "Step Onto The"
- Massive SVG wordmark "Ironhill" (fills width)
- Tagline "Known to some, found by few."
- Scroll indicator with animated line

### 7. Character Reveal Section 1 (sticky)
- Large text revealed word-by-word on scroll
- Text: "There's a place not far from here the maps won't show, known to some as the Ironhill."
- Background (dimmed) and foreground (bright) text layers
- Bottom note fades in: "Beyond the noise, behind the veil..."

### 8. Character Reveal Section 2 (sticky, with cards)
- Coordinates label "25.3444° S — 131.0369° E"
- Word-by-word reveal: longer narrative text
- Three card images animate in from sides (3D transforms with perspective)
- Body copy section below the reveal text
- More detailed narrative paragraphs

### 9. Character Reveal Section 3 (sticky)
- "Meet the keepers of our crafts, the ones from whom our goods are born."
- Same word-by-word scroll reveal effect

### 10. Product Collection (sticky carousel)
- 3 product sections that transition between each other
- Each has: badge icon (triangle/square/circle), product image, title, description, "Explore" link
- 3D card animations (cards fly in from sides with perspective transforms)
- Progress indicator dots at bottom
- Products:
  1. "Warden of the Wild" (whisky) — triangle badge
  2. "Skunk Ape" (beer) — square badge
  3. "Mermaids' Tears" (water) — circle badge

### 11. Produce Section (sticky)
- Header "Ironhill Produce"
- Large character-by-character text: "Simple wares, born from honest work."
- 3 product cards that swing in from sides (3D perspective)
- Cards contain images overlaid with looping videos
- Progress dots
- Hover cursor that says "Explore"

### 12. Footer
- Massive SVG logo spanning full width
- Decorative illustration elements
- Newsletter signup (email input + arrow button)
- 3 columns: Our Beverages, Our Produce, Beyond Ironhill
- Legal links
- "Site by Uncommon" credit + copyright

## DESIGN LANGUAGE TO MAINTAIN

- **Earthy dark palette** — adapt for Hilltop but keep the moody, premium feel
- **Sticky/locked full-viewport sections** — content fills the screen, scrolls through phases
- **Word-by-word / character-by-character text reveals** on scroll (GSAP ScrollTrigger)
- **3D card transforms** with perspective (cards flying in from sides)
- **SVG path drawing on scroll** — the winding vertical line
- **Massive typography** — oversized headings, serif for impact
- **Generous whitespace and spacing**
- **Smooth, cinematic scroll experience**

## HILLTOP MEDIA CONTENT ADAPTATION

### Color Palette
- Background: #0A0A0A (dark, same concept)
- Primary text: #FAFAFA (off-white)
- Secondary text: #888888
- Accent: #FEC81E (keep the gold — it works for premium feel)
- Muted accent: rgba(254, 200, 30, 0.1)

### Typography
- Use **Space Grotesk** (Google Font) for headings — bold, modern, geometric
- Use **Inter** for body text
- H1: 80-120px, tight leading
- Character reveal text: 48-64px
- Body: 18-20px, line-height 1.6+

### Section Mapping (Iron Hill → Hilltop)

**1. Preloader** → Keep the counting preloader, change color to gold/dark theme

**2. SVG Path** → Keep the winding path concept. Change colors to match palette.

**3. 3D Canvas** → Simplified version: subtle particle field or gradient animation. Don't need full Three.js scene — use a CSS/canvas gradient animation for performance. If too complex, skip 3D canvas and use a subtle CSS gradient background.

**4. Logo** → "HILLTOP" in a custom SVG wordmark (clean, bold geometric)

**5. Navigation** → Hamburger opens overlay menu:
- Our Work (→ portfolio section)
- Services (→ services section)  
- About (→ about section)
- Contact (→ contact section)
- Social: Instagram (thehilltopmedia), Behance, LinkedIn

**6. Hero** → 
- Small text: "Vancouver's"
- Massive text: "HILLTOP" (or "HILLTOP MEDIA") as SVG wordmark
- Tagline: "Creative that converts."
- Scroll indicator

**7. Character Reveal 1** →
"Every brand we build, every campaign we run, every pixel we push is measured by one thing: did it make you money."

**8. Character Reveal 2 (with cards)** →
- Location: "Vancouver, BC — Canada"
- Main text: "We don't just make things look good. We make creative that drives revenue. Every brand, website, and campaign we produce starts with your business goals and works backward to the creative."
- Body copy: "Most agencies deliver assets. We deliver outcomes. That's why our clients stay. From logo to launch, from listing to ad spend, we're the only partner you need. Branding, web, video, packaging, paid ads — all under one roof."
- Card images: Use high-quality Unsplash placeholder images (architecture, studio, design)

**9. Character Reveal 3** →
"Meet the team that builds brands worth remembering."

**10. Services Collection (replaces Products)** →
Instead of 3 products, show 3 service pillars:
1. **Foundation** — badge: triangle
   - "Brand Strategy & Consultation"
   - "Where every great brand begins. Research, insights, and a roadmap built around your revenue goals."
   - Link: "Learn more"
   
2. **Pillars** — badge: square
   - "Design & Development" 
   - "Logos, websites, packaging, brand guidelines. Everything your brand needs to look and feel premium."
   - Link: "Learn more"

3. **Growth** — badge: circle
   - "Advertising & Performance"
   - "Paid ads, social content, video, and campaigns designed to convert. We manage the spend, you count the revenue."
   - Link: "Learn more"

Use placeholder images for each service (keep same 3D card animation style).

**11. Portfolio Section (replaces Produce)** →
- Header: "Our Work"
- Large text: "Brands built, revenue driven."
- 3 portfolio cards (placeholder images with overlay text):
  1. VUE Glazing — "Rebrand"
  2. Diamond Student (FBA) — "Branding + Listing"
  3. Shape Properties — "Social Growth"
- Same 3D card swing-in animation

**12. Footer** →
- Massive "HILLTOP" SVG wordmark
- Newsletter: "Get insights that actually make you money"
- Columns:
  - Services: Brand Strategy, Design, Web Development, Advertising
  - Company: About, Work, Contact, Blog
  - Connect: Instagram, Behance, LinkedIn, Email (boris@thehilltopmedia.com)
- Booking CTA: "Book a free consultation" → calendly.com/thehilltopmedia/15min
- "©2025 Hilltop Media. All rights reserved. Vancouver, BC"

## TECHNICAL REQUIREMENTS

- **Framework:** Next.js (App Router, already set up)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP (ScrollTrigger for scroll animations, basic transforms)
- **Motion:** Framer Motion for page transitions, hover states
- **TypeScript** throughout
- **Responsive:** Mobile-first, breakpoints at md (768), lg (1024), xl (1280)
- **Performance:** Lazy load images, optimize for Core Web Vitals
- **No Three.js** — too heavy for this scope. Use CSS gradients or a subtle canvas particle effect if needed for background atmosphere.
- **SVG path drawing** — implement with GSAP ScrollTrigger (stroke-dasharray/dashoffset)
- **Sticky sections** — use CSS position:sticky with GSAP ScrollTrigger for phased animations within each section

## KEY ANIMATIONS TO IMPLEMENT

1. **Preloader** — count from 0-100, progress bar fills, slides up to reveal
2. **SVG path draw** — winding vertical line draws as user scrolls
3. **Word-by-word reveal** — text appears word by word tied to scroll position. Background layer (dimmed) shows full text, foreground reveals progressively.
4. **3D card animations** — cards fly in from sides with perspective transforms (rotateY, translateZ)
5. **Sticky section phases** — sections lock to viewport, internal content animates through phases, then releases to scroll
6. **Footer elements** — staggered fade-in on scroll
7. **Menu overlay** — full-screen with animated card images
8. **Scroll indicator** — bouncing/pulsing line in hero

## PLACEHOLDER IMAGES

Use these Unsplash images (or similar high-quality editorial photos):
- Hero/cards: architecture, studio interiors, design work
- Services: modern office, creative tools, data dashboards  
- Portfolio: branded products, websites, social media content
- Use `https://images.unsplash.com/photo-[ID]?w=800&q=80` format

For SVG logos ("HILLTOP"), create clean geometric wordmarks similar to Iron Hill's style but with Space Grotesk letterforms.

## FILE STRUCTURE

```
src/
  app/
    layout.tsx          — root layout with fonts, metadata
    page.tsx            — homepage (all sections)
    globals.css         — global styles, Tailwind imports
  components/
    Preloader.tsx       — loading animation
    Navigation.tsx      — hamburger menu + overlay
    Hero.tsx            — hero section
    CharacterReveal.tsx — reusable word-by-word reveal
    ServicesCollection.tsx — 3 service pillars with 3D cards
    PortfolioSection.tsx — portfolio showcase
    Footer.tsx          — footer with newsletter
    SvgPath.tsx         — scroll-drawing SVG path
    ScrollIndicator.tsx — hero scroll prompt
  lib/
    animations.ts       — GSAP animation helpers
    constants.ts        — content strings, colors
public/
    (placeholder images)
```

## CRITICAL NOTES

- Copy means copy. Match the Iron Hill experience as closely as possible.
- Every section should feel premium, cinematic, intentional.
- The scroll experience is the product. Make it butter-smooth.
- No stock photography vibes. Placeholders should feel editorial.
- NO hyphens in any copy. Rewrite to avoid em dashes and en dashes.
- Test that GSAP ScrollTrigger works correctly with Next.js (client components, useEffect).
- Make sure `npm run dev` works and the site is viewable.

## AFTER BUILDING
1. Run `npm run dev` to verify it works
2. Fix any build errors  
3. Commit all changes
4. Push to main branch
