'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import PortfolioSection from '@/components/PortfolioSection';
import Manifesto from '@/components/Manifesto';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <div style={{ backgroundColor: '#FFFFFF' }}>
        <Navigation />

        <main>
          <Hero />
          <PortfolioSection />
          <Manifesto />
          <Services />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
