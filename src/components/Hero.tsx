'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';
import ScrollIndicator from './ScrollIndicator';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current) return;

    const ctx = gsap.context(() => {
      // ── Text entrance ──
      gsap.fromTo('.hero-word',
        { y: 120, opacity: 0, rotateX: 25 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1.4, stagger: 0.1, ease: 'power4.out', delay: 0.2,
        }
      );
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.9 }
      );

      // ── Scroll: zoom-through effect with single timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
          pin: false,
        },
      });

      // CTA and subtext fade first (0-20% of scroll)
      if (ctaRef.current) {
        tl.to(ctaRef.current, { opacity: 0, y: -40, duration: 0.2, ease: 'power1.in' }, 0);
      }

      // Headline zooms through (10-80% of scroll)
      if (headlineRef.current) {
        tl.to(headlineRef.current, {
          scale: 8, y: '-20vh', opacity: 0, filter: 'blur(25px)',
          duration: 0.7, ease: 'power2.in',
        }, 0.1);
      }

      // Gradient warms up during transition (20-60%)
      if (gradientRef.current) {
        tl.to(gradientRef.current, { opacity: 1, duration: 0.4 }, 0.2);
      }

      // Gold flash at peak (50-70%)
      if (flashRef.current) {
        tl.to(flashRef.current, { opacity: 1, duration: 0.15 }, 0.5);
        tl.to(flashRef.current, { opacity: 0, duration: 0.15 }, 0.65);
      }

    }, sectionRef);

    // ── Animated gradient lighting (ambient) ──
    let animId: number;
    const grads = document.querySelectorAll('.hero-ambient-grad');
    let t = 0;
    const animateGrad = () => {
      t += 0.002;
      grads.forEach((el, i) => {
        const offset = i * 2.1;
        const x = 50 + Math.sin(t + offset) * 25;
        const y = 50 + Math.cos(t * 0.7 + offset) * 20;
        (el as HTMLElement).style.background =
          `radial-gradient(ellipse 70% 60% at ${x}% ${y}%, var(--grad-color-${i}) 0%, transparent 70%)`;
      });
      animId = requestAnimationFrame(animateGrad);
    };
    animateGrad();

    // ── Mouse parallax on headline ──
    const handleMouse = (e: MouseEvent) => {
      if (!headlineRef.current) return;
      const mx = (e.clientX / window.innerWidth - 0.5) * 8;
      const my = (e.clientY / window.innerHeight - 0.5) * 5;
      gsap.to(headlineRef.current, { x: mx, y: my, duration: 1.2, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouse);

    return () => {
      ctx.revert();
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh]"
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Base background with baked-in gradient atmosphere */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 90% 80% at 15% 75%, rgba(180, 140, 50, 0.15) 0%, transparent 100%),
            radial-gradient(ellipse 80% 90% at 85% 25%, rgba(40, 35, 100, 0.14) 0%, transparent 100%),
            radial-gradient(ellipse 70% 60% at 50% 15%, rgba(90, 35, 55, 0.08) 0%, transparent 100%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201, 169, 110, 0.04) 0%, transparent 100%),
            #060608
          `,
        }} />

        {/* Animated ambient gradients — VISIBLE color blobs that drift */}
        <div
          className="hero-ambient-grad absolute inset-[-40%] pointer-events-none"
          style={{
            '--grad-color-0': 'rgba(180, 140, 60, 0.22)',
            background: 'radial-gradient(ellipse 70% 60% at 30% 40%, rgba(180, 140, 60, 0.22) 0%, transparent 70%)',
          } as React.CSSProperties}
        />
        <div
          className="hero-ambient-grad absolute inset-[-40%] pointer-events-none"
          style={{
            '--grad-color-1': 'rgba(50, 55, 100, 0.20)',
            background: 'radial-gradient(ellipse 65% 55% at 75% 55%, rgba(50, 55, 100, 0.20) 0%, transparent 70%)',
          } as React.CSSProperties}
        />
        <div
          className="hero-ambient-grad absolute inset-[-40%] pointer-events-none"
          style={{
            '--grad-color-2': 'rgba(100, 40, 60, 0.12)',
            background: 'radial-gradient(ellipse 60% 50% at 55% 25%, rgba(100, 40, 60, 0.12) 0%, transparent 65%)',
          } as React.CSSProperties}
        />

        {/* Noise texture / film grain */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px',
          }}
        />

        {/* Scroll gradient shift: cool-dark → warm-gold */}
        <div
          ref={gradientRef}
          className="absolute inset-0 opacity-0 pointer-events-none z-[2]"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(201, 169, 110, 0.15) 0%, transparent 55%)',
          }}
        />

        {/* Gold flash at transition point */}
        <div
          ref={flashRef}
          className="absolute inset-0 opacity-0 pointer-events-none z-[2]"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201, 169, 110, 0.2) 0%, transparent 50%)',
          }}
        />

        {/* Horizontal rule accent */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.06)] to-transparent z-[3] pointer-events-none" />

        {/* Main content */}
        <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-6">
          <div ref={headlineRef} className="text-center" style={{ perspective: '800px' }}>
            <h1 className="font-heading font-bold leading-[0.95] text-[#FAFAFA]"
              style={{ fontSize: 'clamp(56px, 13vw, 180px)' }}>
              <span className="overflow-hidden inline-block">
                <span ref={line1Ref} className="hero-word inline-block italic">Creative</span>
              </span>
              <br />
              <span className="overflow-hidden inline-block">
                <span ref={line2Ref} className="hero-word inline-block italic text-[#D0D0D0]">that converts.</span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-word mt-6 text-sm md:text-base text-[#666] tracking-wide max-w-md mx-auto">
              Branding. Design. Advertising. One agency, zero fluff.
            </p>
          </div>

          <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-6">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.18)] px-9 py-4 text-xs uppercase tracking-[0.3em] text-[#AAA] transition-all duration-500 hover:border-[rgba(201,169,110,0.5)] hover:text-[#C9A96E] hover:shadow-[0_0_30px_rgba(201,169,110,0.08)] backdrop-blur-sm"
            >
              <span>View our work</span>
              <svg className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 6h10M7 2l4 4-4 4" />
              </svg>
            </a>

            <ScrollIndicator />
          </div>
        </div>

        {/* Corner accents — visible L-brackets */}
        <div className="absolute top-8 left-8 w-10 h-[1.5px] bg-[rgba(201,169,110,0.25)] z-[4]" />
        <div className="absolute top-8 left-8 w-[1.5px] h-10 bg-[rgba(201,169,110,0.25)] z-[4]" />
        <div className="absolute top-8 right-8 w-10 h-[1.5px] bg-[rgba(201,169,110,0.25)] z-[4]" />
        <div className="absolute top-8 right-8 w-[1.5px] h-10 bg-[rgba(201,169,110,0.25)] z-[4]" />
        <div className="absolute bottom-8 left-8 w-10 h-[1.5px] bg-[rgba(201,169,110,0.25)] z-[4]" />
        <div className="absolute bottom-8 left-8 w-[1.5px] h-10 bg-[rgba(201,169,110,0.25)] z-[4]" />
        <div className="absolute bottom-8 right-8 w-10 h-[1.5px] bg-[rgba(201,169,110,0.25)] z-[4]" />
        <div className="absolute bottom-8 right-8 w-[1.5px] h-10 bg-[rgba(201,169,110,0.25)] z-[4]" />
      </div>
    </section>
  );
}
