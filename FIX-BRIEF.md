# COMPREHENSIVE SITE FIX — One Pass

You are fixing a Next.js site at `/tmp/hilltop-check/`. The site is deployed on Vercel.

## CRITICAL RULES
- NO hyphens or em dashes in visible copy
- Test with `npm run build` before committing
- Commit and push to `main` when done

## PROBLEMS TO FIX (all of them)

### 1. HERO — src/components/Hero.tsx
**Problem:** Huge dead space, floating cards invisible (opacity 0.15), logo dominates, tagline too small.
**Fix:**
- Make "Creative that converts." absolutely massive: `text-[clamp(56px,12vw,160px)]`
- REMOVE the logo from the hero entirely. The nav already shows the logo.
- Make floating portfolio cards MORE visible: opacity 0.3-0.5 (not 0.15)
- Make cards bigger: 180-240px wide instead of 120-170px
- Add a subtle radial gradient behind the text for depth: `radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)`
- Reduce the hero height from `h-[200vh]` to `h-[160vh]` to reduce empty scroll
- Add a proper CTA button below the tagline: "View Our Work" linking to #portfolio, styled as a ghost button

### 2. CHARACTER REVEAL SECTIONS — src/components/CharacterReveal.tsx
**Problem:** Text nearly invisible (dark gray on black), huge dead space, words too small.
**Fix:**
- Change the INACTIVE word color from `#555555` to `#333333` (still muted but the ACTIVE color `#FAFAFA` creates strong contrast)
- Actually, the bigger problem is the BASE opacity. Change `gsap.set(wordEls, { opacity: 0.15, color: '#555555' })` to `gsap.set(wordEls, { opacity: 0.2, color: '#444444' })` — the background words should be visible but muted
- Increase font size: change `text-[clamp(28px,5vw,64px)]` to `text-[clamp(32px,6vw,72px)]`
- Reduce pinned scroll duration: change `totalScroll` calculation to be shorter. Replace the formula with:
  ```
  const totalScroll = 100 + wordCount * 3 + (images ? 60 : 0) + (body ? 30 : 0);
  ```
  This makes shorter texts scroll faster and longer texts don't overstay.

### 3. PAGE STRUCTURE — src/app/page.tsx
**Problem:** "Meet the team that builds brands worth remembering" promises team content but shows nothing.
**Fix:** Change REVEAL_3 text in `src/lib/constants.ts` from "Meet the team that builds brands worth remembering." to "Branding. Design. Advertising. One agency, zero fluff."
This flows better into the Services section that follows.

### 4. SERVICES COLLECTION — src/components/ServicesCollection.tsx
**Problem:** Empty square/triangle badge icons look broken.
**Fix:** Replace the Badge SVG component. Add numbered badges instead (like Iron Hill has "01", "02", "03"):
```tsx
function Badge({ index }: { index: number }) {
  return (
    <span className="font-heading text-6xl font-bold text-[rgba(255,255,255,0.08)] italic">
      {String(index + 1).padStart(2, '0')}
    </span>
  );
}
```
Update the usage: replace `<Badge type={service.badge} />` with `<Badge index={i} />` where `i` is the map index. You'll need to change the map to include the index: `SERVICES.map((service, i) => (`.

### 5. FOOTER — src/components/Footer.tsx
**Problem:** Left-edge content clipping, email input cut off, asymmetric layout.
**Fix:** The footer has `px-6 md:px-16 lg:px-24` but the inner content needs proper containment. Add `overflow-hidden` to the footer element. Also ensure the newsletter section on the left has `pl-0` or proper containment. Actually, the real fix:
- Wrap the entire footer content in a centered container: `mx-auto max-w-6xl` (already there)
- Check that the grid `lg:grid-cols-2` is working. The left column (newsletter) and right column (link columns) should split 50/50
- Add `min-w-0` to both grid children to prevent overflow
- Change the email form max-w from `max-w-sm` to `max-w-md` so it has room

### 6. SVG PATH LINE — Check if there's an SVG path component
**Problem:** There's a thin colored line at the top of the viewport that looks like a bug.
**Fix:** Check `src/components/SvgPath.tsx` or similar. If it exists and is just a decorative line, either:
a) Style it properly (make it more visible and intentional like Iron Hill's winding path), OR
b) Remove it entirely from the page if it's not working properly.

Check page.tsx — if there's no SvgPath component imported, the line might be from the ScrollIndicator or the Navigation. Find it and fix or remove it.

### 7. PORTFOLIO SECTION — src/components/PortfolioSection.tsx
**Problem:** Cards have left-alignment issues at certain viewports.
**Fix:** Ensure the card container has proper centering. The `mx-auto max-w-7xl` should center it. Add `items-center` to the flex container. Also reduce gap from `gap-16` to `gap-10` to tighten the section.

### 8. GLOBAL STYLES — src/app/globals.css
**Problem:** The `glass-card` hover scale effect (scale 1.02) makes cards jump and look broken on the services section.
**Fix:** Change `.glass-card:hover { transform: scale(1.02); }` to `.glass-card:hover { transform: none; }` — the card in the services section is too large for a scale hover. Only apply scale hover on small cards (the Amazon FBA section):
```css
.glass-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
}

.glass-card-sm:hover {
  border-color: rgba(255, 255, 255, 0.15);
  transform: scale(1.02);
}
```
Then in AmazonFBA.tsx, add `glass-card-sm` class to the small service items.

### 9. AMAZON FBA — src/components/AmazonFBA.tsx
Add `glass-card-sm` alongside `glass-card` on the service item divs.

### 10. NAVIGATION — src/components/Navigation.tsx
**Problem:** No visible nav links, only hamburger.
**Fix:** Show the nav links inline on desktop (md+). The hamburger stays for mobile only. Add the nav links next to the logo:
```tsx
{/* Desktop nav links — hidden on mobile */}
<div className="hidden md:flex items-center gap-8">
  {NAV_LINKS.map((link) => (
    <a key={link.label} href={link.href} className="text-xs uppercase tracking-[0.2em] text-[#666666] hover:text-[#FAFAFA] transition-colors">
      {link.label}
    </a>
  ))}
</div>
```
Import NAV_LINKS from constants.

## FINAL CHECKLIST
- [ ] `npm run build` passes
- [ ] No hyphens in visible copy
- [ ] Hero has massive tagline, visible floating cards, no logo, CTA button
- [ ] Character reveals have proper contrast (bright active, muted inactive)
- [ ] "Meet the team" text replaced with services intro
- [ ] Services have numbered badges, not empty shapes
- [ ] Footer properly contained, no edge clipping
- [ ] Nav shows links on desktop
- [ ] SVG path line either fixed or removed
- [ ] git commit and push to main

## GIT
```bash
git add -A
git commit -m "fix: comprehensive site overhaul — contrast, spacing, layout, navigation"
git push origin main
```
