'use client';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import Manifesto from '@/components/Manifesto';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative" style={{ backgroundColor: '#FFFFFF' }}>
        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main>
          {/* Hero — black bg, type-only */}
          <Hero />

          {/* Featured Work — massive type list */}
          <FeaturedWork />

          {/* Manifesto — two-column about */}
          <Manifesto />

          {/* Services — categorized list */}
          <Services />
        </main>

        {/* Footer — columns + stylized contact */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
