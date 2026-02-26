# Hilltop Media Site — UPDATE 2

## ISSUES TO FIX

### 1. Logo Not Showing
The logo at `/public/logo/hilltop-logo.png` (1050x365, white on transparent, gray+alpha PNG) isn't rendering. This is likely a next/image issue.
- Try using a regular `<img>` tag instead of next/image as a fallback
- Or ensure the width/height props are correct: width={1050} height={365}
- The logo is white on transparent — it WILL be invisible on a white background but should show on the dark #0A0A0A bg
- Verify the `src` path is `/logo/hilltop-logo.png` (files in /public are served from root)
- Also check next.config.ts isn't blocking local images somehow

### 2. Kill the Yellow/Gold — New Color Palette
Boris doesn't like the #FEC81E gold. Replace the entire accent color scheme:

New palette:
- Background: #0A0A0A (keep dark)
- Primary text: #FAFAFA (keep white)
- Secondary text: #666666
- **Accent: #E8E8E8** (clean silver/light gray — premium, minimal)
- **Accent hover/active: #FFFFFF** (pure white on hover)
- **Subtle accent: rgba(255, 255, 255, 0.08)** (for cards, borders, subtle backgrounds)

Remove ALL instances of #FEC81E, gold, yellow from the entire codebase. Replace with the silver/white accent. This includes:
- SVG path drawing color
- Preloader text/progress
- "MEDIA" text color in hero (if still text)
- Service badges
- Any hover states
- Footer elements
- Progress indicators

The vibe should be monochromatic — black, white, silver. Clean and premium like a luxury brand.

### 3. Better Typography — More Stylistic
Replace the current fonts with more premium, editorial choices:

**Heading font:** Use **"Playfair Display"** (Google Font) — elegant serif, editorial, high-fashion feel. Or **"Cormorant Garamond"** for ultra-premium.
**Body font:** Use **"Plus Jakarta Sans"** (Google Font) — modern geometric sans, cleaner than Inter.

Update layout.tsx to import these from Google Fonts.

Typography rules:
- Hero title: Playfair Display, 120-180px on desktop, italic for emphasis
- Character reveal text: Playfair Display, 48-72px
- Body text: Plus Jakarta Sans, 18px, weight 300-400
- Labels/nav: Plus Jakarta Sans, uppercase, tracking 0.2em, weight 500
- Service titles: Playfair Display, 36-48px

### 4. REMOVE the SVG Path Scribble
Delete `SvgPath.tsx` completely. Remove it from page.tsx. Boris doesn't want the squiggly line background.

### 5. NEW Background Animation — Iron Hill Style Transitions
Instead of the SVG scribble, implement smooth **section transition effects** like Iron Hill:

**A. Particle/Grain Background**
- Subtle animated film grain texture overlay on the entire page
- Very faint (opacity 0.03-0.05), gives the dark background texture and life
- Use CSS animation with a noise texture, or a small canvas element

**B. Section Curtain Transitions**
- When scrolling between major sections, implement a smooth wipe/curtain effect
- As one section exits, it fades with a slight scale-down (0.95) and blur
- The new section enters from slight opacity 0 with upward movement
- Think: cinematic scene transitions, not hard cuts

**C. Parallax Depth**
- Background elements (if any images) move at different speeds than foreground text
- Text content moves at 1x scroll speed
- Any decorative elements move at 0.5x speed (slight parallax)
- Creates depth without the scribble

**D. Smooth Gradient Shifts**
- The background color subtly shifts between sections:
  - Hero: pure #0A0A0A
  - First reveal: slight warm shift (#0C0A08)
  - Services: slight cool shift (#08090C)  
  - Portfolio: back to #0A0A0A
  - Footer: slightly lighter (#111111)
- Use GSAP ScrollTrigger to interpolate background colors between sections
- Very subtle — viewer shouldn't consciously notice it, just feel the mood shift

**E. Text Entrance Animations**
- All text (not just character reveals) should animate in smoothly
- Headings: slide up from 30px below + fade in
- Body text: fade in with slight delay after heading
- Use IntersectionObserver or GSAP ScrollTrigger
- Stagger multiple lines (first line, then second, etc.)

### 6. Service Cards Visual Upgrade
- Cards should have a subtle glass/frosted effect: `backdrop-filter: blur(10px)`, semi-transparent bg `rgba(255,255,255,0.03)`
- Thin border: `1px solid rgba(255,255,255,0.06)`
- On hover: border brightens to `rgba(255,255,255,0.15)`, slight scale(1.02)
- Keep the 3D fly-in animation on scroll

### 7. Portfolio Cards
- Large, full-width cards (not small grid)
- Image takes up most of the card
- Title and category overlay on bottom with gradient fade
- On hover: image zooms slightly (scale 1.05), overlay text slides up

### 8. Overall Polish
- Ensure smooth 60fps scroll throughout
- No janky animations — if something doesn't perform well, simplify it
- Minimum 100vh spacing between major sections
- The site should feel like a slow, intentional scroll experience

## AFTER CHANGES
1. `npm run build` — fix ALL errors
2. Commit: "feat: monochrome palette, premium typography, cinematic transitions"
3. Push to main
