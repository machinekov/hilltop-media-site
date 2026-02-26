'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { SERVICES } from '@/lib/constants';
import Image from 'next/image';

function Badge({ index }: { index: number }) {
  return (
    <span className="font-heading text-6xl font-bold text-[rgba(255,255,255,0.06)] italic">
      {String(index + 1).padStart(2, '0')}
    </span>
  );
}

export default function ServicesCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const slides = sectionRef.current.querySelectorAll('.service-slide');
    const totalSlides = slides.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalSlides * 120}%`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * totalSlides),
            totalSlides - 1
          );
          setActiveIndex(idx);
        },
      },
    });

    slides.forEach((slide, i) => {
      if (i === 0) {
        gsap.set(slide, { opacity: 1, y: 0 });
      } else {
        gsap.set(slide, { opacity: 0, y: 60 });
      }

      if (i > 0) {
        tl.to(slides[i - 1], { opacity: 0, y: -60, scale: 0.95, filter: 'blur(4px)', duration: 0.4 }, i - 0.5);
        tl.to(slide, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.4 }, i - 0.3);
      }

      const card = slide.querySelector('.service-card');
      if (card) {
        const fromLeft = i % 2 === 0;
        tl.fromTo(
          card,
          {
            x: fromLeft ? -300 : 300,
            rotateY: fromLeft ? 25 : -25,
            z: -200,
            opacity: 0,
          },
          {
            x: 0,
            rotateY: 0,
            z: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
          },
          i === 0 ? 0 : i - 0.1
        );

        // Ken Burns effect on image
        const img = card.querySelector('.service-card-img');
        if (img) {
          tl.fromTo(img, { scale: 1 }, { scale: 1.08, duration: 2, ease: 'none' }, i === 0 ? 0 : i - 0.3);
        }
      }

      // Text stagger
      const textEls = slide.querySelectorAll('.service-text-stagger');
      if (textEls.length > 0) {
        tl.fromTo(
          textEls,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' },
          i === 0 ? 0.2 : i - 0.05
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen"
    >
      <div className="relative flex h-screen items-center justify-center overflow-hidden px-6 md:px-16">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className="service-slide absolute inset-0 flex items-center justify-center"
          >
            <div className="flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:gap-16">
              {/* Image card */}
              <div
                className="service-card glass-card relative h-72 w-full overflow-hidden rounded-xl md:h-[500px] md:w-1/2"
                style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="service-card-img object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-6 md:w-1/2">
                <div className="service-text-stagger">
                  <Badge index={i} />
                </div>
                <h3 className="service-text-stagger font-heading text-5xl font-bold text-[#FAFAFA] md:text-7xl italic">
                  {service.title}
                </h3>
                <p className="service-text-stagger text-lg text-[#E8E8E8]">{service.subtitle}</p>
                <p className="service-text-stagger text-base leading-relaxed text-[#666666]">
                  {service.description}
                </p>

                <div className="service-text-stagger mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
                  {service.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-[#999999]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="service-text-stagger group mt-4 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#FAFAFA] transition-colors hover:text-[#FFFFFF]"
                >
                  {service.link}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Progress dots */}
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-3">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: i === activeIndex ? '#E8E8E8' : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
