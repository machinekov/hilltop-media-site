'use client';

import { useState, useCallback } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import SvgPath from '@/components/SvgPath';
import Hero from '@/components/Hero';
import CharacterReveal from '@/components/CharacterReveal';
import ServicesCollection from '@/components/ServicesCollection';
import PortfolioSection from '@/components/PortfolioSection';
import Footer from '@/components/Footer';
import { REVEAL_1, REVEAL_2, REVEAL_3 } from '@/lib/constants';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />

      {loaded && (
        <div className="relative">
          {/* Background SVG path */}
          <SvgPath />

          {/* Navigation */}
          <Navigation />

          {/* Main content */}
          <main className="relative z-10">
            {/* Hero */}
            <Hero />

            {/* Character Reveal 1 */}
            <CharacterReveal
              id="about"
              text={REVEAL_1.text}
              bottomNote="Beyond the noise, behind the screen, there is a team obsessed with results."
            />

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
            <ServicesCollection />

            {/* Portfolio Section */}
            <PortfolioSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
