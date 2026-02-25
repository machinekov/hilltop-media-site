// GSAP animation helper utilities
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Word-by-word reveal: returns an array of span-wrapped words */
export function splitIntoWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

/** Animate words revealing on scroll */
export function createWordReveal(
  container: HTMLElement,
  words: HTMLElement[],
  options?: { start?: string; end?: string }
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: options?.start ?? 'top top',
      end: options?.end ?? 'bottom top',
      scrub: 0.5,
      pin: true,
    },
  });

  words.forEach((word, i) => {
    tl.to(
      word,
      {
        opacity: 1,
        duration: 1,
      },
      i * 0.5
    );
  });

  return tl;
}

/** 3D card fly-in animation */
export function createCardFlyIn(
  cards: HTMLElement[],
  trigger: HTMLElement,
  options?: { start?: string; end?: string }
) {
  cards.forEach((card, i) => {
    const fromLeft = i % 2 === 0;
    gsap.fromTo(
      card,
      {
        x: fromLeft ? -200 : 200,
        rotateY: fromLeft ? 25 : -25,
        opacity: 0,
      },
      {
        x: 0,
        rotateY: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger,
          start: options?.start ?? 'top 60%',
          end: options?.end ?? 'top 20%',
          scrub: 0.8,
        },
      }
    );
  });
}
