# Hilltop Media Site — UPDATE BRIEF

## CHANGES REQUIRED

### 1. Use Real Hilltop Logo
- Logo file: `/public/logo/hilltop-logo.png` (1050x365, white on transparent)
- Also available: `/public/logo/image04.png` (508x57, text version, white on transparent)
- Replace the text-based "HILLTOP / MEDIA" in the Hero with the actual logo PNG (`/logo/hilltop-logo.png`)
- Use the logo in the Navigation header (top-left) and Footer as well
- Use `<Image>` from next/image with proper dimensions

### 2. Hero Section
- Remove the text "HILLTOP" and "MEDIA" h1 elements
- Show the logo image instead (full width, max ~800px)
- Keep "Vancouver's" pre-title above
- Tagline: "Creative that converts." (keep as-is)
- Keep scroll indicator

### 3. Real Site Info / Services Content
Update `src/lib/constants.ts` with real content from thehilltopmedia.com:

**Services — Foundation:**
- Brand Consultation
- Research & Insights
- Brand Strategy
- Customer Planning
- Content Strategy
- Campaign Strategy
- Design Strategy
- Brand Architecture

**Services — Pillars:**
- Logos & Naming
- Brand Guidelines
- Identity
- Web Design
- Web Development
- Packaging
- Graphic Design
- Sonic Design

**Services — Growth:**
- Ad Creation
- Paid Performance
- Brand Launches
- Internal Media
- Communications Plan
- Video & Animation
- Social Media Content
- Experiential Marketing

Update the services descriptions to match the real site:
- Foundation: "Some may call us a full service creative agency, some may call us designers, but all our clients call us partners. Whether your company is launching a new logo, campaign, or website, as long as the outcome is something you can see, hear or feel, we can help."
- Pillars: "Logos, websites, packaging, brand guidelines. Everything your brand needs to look and feel premium."
- Growth: "Paid ads, social content, video, and campaigns designed to convert. We manage the spend, you count the revenue."

### 4. Portfolio Images — Use Real Portfolio
Replace Unsplash placeholder URLs with the local portfolio images:
- Portfolio 1: `/portfolio/portfolio-1.jpg`
- Portfolio 2: `/portfolio/portfolio-2.jpg`
- Portfolio 3: `/portfolio/portfolio-3.jpg`
- Portfolio 4 (backup): `/portfolio/portfolio-4.jpg`
- Portfolio 5 (backup): `/portfolio/portfolio-5.jpg`

Also update the REVEAL_2 card images to use portfolio images instead of Unsplash.

### 5. Transition Animations — CRITICAL (make them match Iron Hill)
The current animations are basic. Need to implement the full Iron Hill experience:

**A. Preloader (Preloader.tsx)**
- Show a counting animation from 000 to 100
- Dark background (#0A0A0A) with the number in large gold text (#FEC81E)
- Progress bar that fills horizontally
- When complete, the entire preloader slides UP to reveal the site beneath
- Use GSAP timeline for smooth orchestration
- Preloader should take ~2-3 seconds

**B. Word-by-word Character Reveal (CharacterReveal.tsx)**
- Must work EXACTLY like Iron Hill: text starts fully visible but dimmed (opacity 0.15)
- As user scrolls, each word transitions from dimmed to bright (opacity 1, color white)
- The reveal follows scroll position precisely (ScrollTrigger scrub)
- Each word should be wrapped in a span with its own opacity/color animation
- The section should be sticky (pin the content while scrolling through the reveal)
- Use `position: sticky` or GSAP ScrollTrigger `pin: true`
- The scroll distance should be proportional to text length (longer text = more scroll to reveal)

**C. 3D Card Fly-in Animations**
- Cards in ServicesCollection and PortfolioSection should fly in from the sides
- Use perspective transforms: `perspective(1200px) rotateY(±25deg) translateX(±300px) translateZ(-200px)`
- Cards start off-screen and rotated, animate to center position on scroll
- Stagger the entrance (first card, then second, then third)
- Use GSAP ScrollTrigger with scrub for scroll-linked animation

**D. SVG Path Scroll Drawing (SvgPath.tsx)**
- A tall winding path that runs down the page
- Two layers: faint background path (#2A2A2A) always visible, gold path (#FEC81E) that draws on scroll
- Use stroke-dasharray and stroke-dashoffset animated via GSAP ScrollTrigger
- Path should be decorative (flowing curves, not straight lines)
- Position it as a fixed/absolute background element

**E. Sticky Section Behavior**
- Hero, Character Reveals, Services, and Portfolio should each be "sticky sections"
- Content pins to viewport while internal animations play out (word reveals, card entrances)
- After animations complete, section unpins and user scrolls to next section
- Use GSAP ScrollTrigger `pin: true` for each section

**F. Section Transitions**
- Between major sections, add a smooth opacity/transform transition
- Content of previous section fades out and shifts up as new section comes in
- Smooth, cinematic feel

**G. Footer Animation**
- Elements stagger in from bottom with slight delay between each
- Newsletter input, columns, social links each animate in sequence

### 6. VUE Case Study Content
Add real VUE case study text from the site to the portfolio section or a detail area:
"Siber Special Projects, a luxury glazing firm, approached us seeking a comprehensive rebranding strategy to align its visual identity with its long term vision. Together, we embarked on a creative process that led to the creation of their new name, VUE. Capturing the essence of their excellence in architectural engineering, aesthetic prowess, and precision."

### 7. Contact Section / CTA
- Keep "Book a free consultation" CTA linking to: https://calendly.com/thehilltopmedia/15min
- Contact email: info@thehilltopmedia.com
- Social links: Instagram (@thehilltopmedia), Twitter, Threads

### 8. NO HYPHENS
- Double check all copy — no em dashes, no en dashes, no hyphens used as punctuation
- Rewrite sentences to avoid them

### 9. Amazon/FBA Services
Add a section or incorporate into services that Hilltop also does Amazon FBA creative:
- Branding & Logos
- Packaging & Inserts
- Listing Images
- Listing Copywriting
- Photos & Videos
- A+ & EBC Content

This can be a sub-section under "Growth" or a separate section. Keep it brief and premium feeling.

## TECHNICAL NOTES
- Run `npm run build` after all changes to verify no errors
- Commit with message: "feat: real branding, content, and Iron Hill-style animations"
- Push to main branch
- Make sure all GSAP ScrollTrigger animations use `'use client'` directive
- Test that sticky/pin behavior doesn't break layout
- Ensure logo images use next/image with proper width/height attributes
