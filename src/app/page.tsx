'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CharacterReveal from '@/components/CharacterReveal';
import ServicesCollection from '@/components/ServicesCollection';
import PortfolioSection from '@/components/PortfolioSection';
import AmazonFBA from '@/components/AmazonFBA';
import Footer from '@/components/Footer';
import { REVEAL_1, REVEAL_2, REVEAL_3, SECTION_BG_COLORS } from '@/lib/constants';
import { gsap, ScrollTrigger } from '@/lib/animations';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        onEnter: () => gsap.to(wrapperRef.current, { backgroundColor: bg, duration: 1.2, ease: 'power2.inOut' }),
        onEnterBack: () => gsap.to(wrapperRef.current, { backgroundColor: bg, duration: 1.2, ease: 'power2.inOut' }),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loaded]);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      {loaded && (
        <div ref={wrapperRef} className="relative" style={{ backgroundColor: SECTION_BG_COLORS.hero }}>
          {/* Film grain texture overlay */}
          <div className="film-grain" />

          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <main className="relative z-10">
            {/* Hero */}
            <Hero />

            {/* Character Reveal 1 */}
            <div data-bg={SECTION_BG_COLORS.reveal}>
              <CharacterReveal
                id="about"
                text={REVEAL_1.text}
                bottomNote="Beyond the noise, behind the screen, there is a team obsessed with results."
              />
            </div>

            {/* Character Reveal 2 with cards */}
            <CharacterReveal
              text={REVEAL_2.text}
              location={REVEAL_2.location}
              body={REVEAL_2.body}
              images={REVEAL_2.images}
            />

            {/* Character Reveal 3 */}
            <CharacterReveal text={REVEAL_3.text} />

            {/* Services Collection */}
            <div data-bg={SECTION_BG_COLORS.services}>
              <ServicesCollection />
            </div>

            {/* Amazon FBA Creative */}
            <AmazonFBA />

            {/* Portfolio Section */}
            <div data-bg={SECTION_BG_COLORS.portfolio}>
              <PortfolioSection />
            </div>
          </main>

          {/* Footer */}
          <div data-bg={SECTION_BG_COLORS.footer}>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
