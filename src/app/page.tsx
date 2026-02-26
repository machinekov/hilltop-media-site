'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
// HeroTransition removed — SVG mask looked cheap without real illustrated artwork
import CharacterReveal from '@/components/CharacterReveal';
import ServicesCollection from '@/components/ServicesCollection';
import PortfolioSection from '@/components/PortfolioSection';
import AmazonFBA from '@/components/AmazonFBA';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import SectionDivider from '@/components/SectionDivider';
import CustomCursor from '@/components/CustomCursor';
// ScrollPath removed — didn't match modern aesthetic
import { REVEAL_1, REVEAL_2, REVEAL_3 } from '@/lib/constants';
import { gsap, ScrollTrigger } from '@/lib/animations';

const BG_COLORS = {
  hero: '#0A0A0A',
  reveal1: '#0C0C0E',
  reveal2: '#0A0C0A',
  reveal3: '#0A0A0A',
  services: '#0E0C0A',
  fba: '#0A0A0A',
  portfolio: '#0C0A0E',
  footer: '#080808',
} as const;

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [skipPreloader, setSkipPreloader] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('skip-preloader')) {
      setSkipPreloader(true);
      setLoaded(true);
    }
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Cinematic background gradient shifts between sections
  useEffect(() => {
    if (!loaded || !wrapperRef.current) return;

    const sections = wrapperRef.current.querySelectorAll('[data-bg]');
    sections.forEach((section) => {
      const bg = section.getAttribute('data-bg');
      if (!bg) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => gsap.to(wrapperRef.current, { backgroundColor: bg, duration: 0.8, ease: 'power2.inOut' }),
        onEnterBack: () => gsap.to(wrapperRef.current, { backgroundColor: bg, duration: 0.8, ease: 'power2.inOut' }),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loaded]);

  return (
    <>
      {!skipPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {loaded && (
        <SmoothScroll>
          <div ref={wrapperRef} className="relative" style={{ backgroundColor: BG_COLORS.hero }}>
            {/* Film grain texture overlay */}
            <div className="film-grain" />

            {/* Custom cursor (desktop only) */}
            <CustomCursor />

            {/* ScrollPath removed — squiggly line didn't fit the premium aesthetic */}

            {/* Navigation */}
            <Navigation />

            {/* Main content */}
            <main className="relative z-10">
              {/* Hero */}
              <Hero />

              {/* Character Reveal 1 */}
              <div data-bg={BG_COLORS.reveal1}>
                <CharacterReveal
                  id="about"
                  text={REVEAL_1.text}
                  bottomNote="Small team. Big standards. Every project gets the founders in the room."
                />
              </div>

              <SectionDivider />

              {/* Character Reveal 2 with cards */}
              <div data-bg={BG_COLORS.reveal2}>
                <CharacterReveal
                  text={REVEAL_2.text}
                  location={REVEAL_2.location}
                  body={REVEAL_2.body}
                  images={REVEAL_2.images}
                />
              </div>

              <SectionDivider />

              {/* Character Reveal 3 */}
              <div data-bg={BG_COLORS.reveal3}>
                <CharacterReveal text={REVEAL_3.text} />
              </div>

              <SectionDivider />

              {/* Services Collection */}
              <div data-bg={BG_COLORS.services}>
                <ServicesCollection />
              </div>

              <SectionDivider />

              {/* Amazon FBA Creative */}
              <div data-bg={BG_COLORS.fba}>
                <AmazonFBA />
              </div>

              <SectionDivider />

              {/* Portfolio Section */}
              <div data-bg={BG_COLORS.portfolio}>
                <PortfolioSection />
              </div>
            </main>

            {/* Footer */}
            <div data-bg={BG_COLORS.footer}>
              <Footer />
            </div>
          </div>
        </SmoothScroll>
      )}
    </>
  );
}
