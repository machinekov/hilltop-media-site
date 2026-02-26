# ANIMATION & STIMULATION OVERHAUL

The site needs to feel alive, premium, and immersive — like ironhill.au. Right now it's static and flat. This brief covers every animation enhancement needed.

## CRITICAL RULES
- NO hyphens or em dashes in visible copy
- `npm run build` must pass before committing
- Commit and push to `main`
- Do NOT remove existing functionality — enhance it

## WHAT TO DO

### 1. SMOOTH SCROLL — New file: `src/components/SmoothScroll.tsx`
Install already done: `lenis` package is available. Create a provider component:

```tsx
'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

Wrap the main content in `page.tsx` with `<SmoothScroll>`.

### 2. HERO ENHANCEMENTS — `src/components/Hero.tsx`
Make the hero much more dynamic:

a) **Magnetic cursor effect on the CTA button**: Track mouse position and shift the button slightly toward the cursor. Use `onMouseMove` on a wrapper div.

b) **Text entrance animation**: The h1 should animate in — each line slides up from below with stagger (on load, after preloader):
```tsx
// After preloader completes, animate in:
gsap.fromTo('.hero-line', 
  { y: 80, opacity: 0, rotateX: 15 },
  { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
);
```
Wrap "Creative" in one `.hero-line` span and "that converts." in another.

c) **Floating cards should have a slight glow/shadow**: Add `box-shadow: 0 20px 60px rgba(0,0,0,0.5)` and a subtle border `border: 1px solid rgba(255,255,255,0.05)`.

d) **Parallax on mouse move**: Shift the floating cards container slightly based on mouse position for depth:
```tsx
const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  gsap.to(cardsContainerRef.current, { x, y, duration: 0.8, ease: 'power2.out' });
};
```

### 3. SECTION TRANSITIONS — Global
Add horizontal line dividers between major sections that draw themselves in on scroll:

Create `src/components/SectionDivider.tsx`:
```tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

export default function SectionDivider() {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!lineRef.current) return;
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power2.inOut',
        scrollTrigger: { trigger: lineRef.current, start: 'top 85%' }
      }
    );
  }, []);
  return (
    <div className="py-8 px-6 md:px-24">
      <div ref={lineRef} className="mx-auto h-px max-w-6xl bg-[rgba(255,255,255,0.06)] origin-left" />
    </div>
  );
}
```

Add `<SectionDivider />` between major sections in page.tsx (between character reveals, before services, before portfolio, before footer).

### 4. CHARACTER REVEAL ENHANCEMENTS — `src/components/CharacterReveal.tsx`
a) Words should have a subtle **blur-to-sharp** transition alongside opacity:
Change the word animation from just opacity+color to also include blur:
```tsx
gsap.set(wordEls, { opacity: 0.2, color: '#555555', filter: 'blur(2px)' });
// In the timeline:
tl.to(word, {
  opacity: 1, color: '#FAFAFA', filter: 'blur(0px)',
  duration: 1, ease: 'power1.out',
}, i * 0.4);
```

b) **3D card fly-ins** should be more dramatic:
- Increase initial x offset: -300/300 → -400/400
- Add scale: start at 0.7, end at 1
- Add blur: start at blur(4px), end at blur(0px)

### 5. SERVICES COLLECTION — `src/components/ServicesCollection.tsx`
a) **Image should have a Ken Burns effect** (slow zoom while pinned):
```tsx
// Inside the timeline, for each slide's image:
const img = slide.querySelector('.service-card img');
if (img) {
  tl.fromTo(img, { scale: 1 }, { scale: 1.08, duration: 2, ease: 'none' }, i === 0 ? 0 : i - 0.3);
}
```

b) **Text elements should stagger in**: Title, subtitle, description, items should each fade in with slight stagger after the card flies in.

### 6. PORTFOLIO SECTION — `src/components/PortfolioSection.tsx`
a) Cards should have a **reveal mask effect** — image clips in from bottom:
Instead of just fading in, use clipPath animation:
```tsx
gsap.fromTo(card,
  { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.2, ease: 'power3.inOut',
    scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 40%', scrub: 0.5 }
  }
);
```

b) Keep the 3D rotation but make it subtler (rotateY: 5 not 8).

c) Add a **counter** that appears as you scroll through: "01 / 07", "02 / 07", etc.

### 7. FOOTER — `src/components/Footer.tsx`
a) The CTA heading "Let's build something worth remembering." should have **word-by-word color reveal** on scroll (same as character reveal pattern but lighter).

b) Link columns should stagger fade in from bottom.

### 8. PRELOADER — `src/components/Preloader.tsx`
Make the exit more dramatic:
- Instead of just sliding up, add a **split reveal**: the preloader splits into top/bottom halves that slide away in opposite directions
- Add a brief flash/glow at the split point

### 9. CURSOR (Optional but impactful) — New: `src/components/CustomCursor.tsx`
Add a custom cursor that:
- Is a small circle (8px) with a larger outer ring (32px)
- The outer ring follows the inner with slight lag (lerp)
- On hover over links/buttons, outer ring scales up
- Only shows on desktop (hidden on touch devices)

### 10. BACKGROUND SHIFTS — `src/app/page.tsx`
Make the background color transitions more dramatic. Currently uses `duration: 1.2`. Change to:
- Faster transitions: `duration: 0.8`
- Add slight brightness pulse during transition
- Use more varied colors between sections:
  - Hero: #0A0A0A
  - Reveal 1: #0C0C0E (slightly blue)
  - Reveal 2: #0A0C0A (slightly green)
  - Services: #0E0C0A (warm)
  - FBA: #0A0A0A
  - Portfolio: #0C0A0E (slightly purple)
  - Footer: #080808

### 11. GLOBAL CSS ADDITIONS — `src/app/globals.css`
```css
/* Smooth cursor for custom cursor component */
html.has-custom-cursor { cursor: none; }
html.has-custom-cursor a, html.has-custom-cursor button { cursor: none; }

/* Link hover underline animation */
a.animated-link {
  position: relative;
}
a.animated-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: #E8E8E8;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
a.animated-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

## PRIORITY ORDER
Do these in order — if you run out of context, stop after the highest priority items:
1. Smooth Scroll (Lenis) — biggest single impact
2. Hero enhancements (text entrance, mouse parallax, card glow)
3. Character Reveal blur transitions
4. Portfolio clipPath reveal
5. Section Dividers
6. Services Ken Burns + text stagger
7. Background color variety
8. Preloader split exit
9. Footer word reveal
10. Custom cursor
11. CSS additions

## BUILD & PUSH
```bash
npm run build
git add -A
git commit -m "feat: animation overhaul — Lenis smooth scroll, entrance animations, blur reveals, parallax, clipPath transitions"
git push origin main
```
