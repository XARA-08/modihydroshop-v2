'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphHeadline } from '../wamambo/MorphHeadline';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stat { value: string; label: string }
interface Props { stats?: Stat[]; heading?: string; subheading?: string }

const defaultStats: Stat[] = [
  { value: 'Pure Water', label: 'Multi-stage RO filtration, lab-tested for quality.' },
  { value: 'Free Delivery', label: 'No charge within our 8-town service area.' },
  { value: 'Local Support', label: 'Real people, fast response, based in Modimolle.' },
];

export function TrustStrip({ stats = defaultStats, heading = 'Why choose Modi Water', subheading = 'If any of these matter to you, we should talk.' }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemsRef.current;
    if (!el) return;

    // Respect reduced-motion: skip animation, keep content visible.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const items = el.querySelectorAll('[data-trust-item]');
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 18, scale: 0.97 },
        {
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 border-y border-white/[0.06] bg-navy-950"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p id="trust-heading" className="font-satoshi text-label text-seal-500 tracking-[0.14em] uppercase text-center mb-4">
          {heading}
        </p>
        <p className="font-satoshi text-body-lg text-mist/80 text-center max-w-2xl mx-auto mb-12">
          {subheading}
        </p>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              data-trust-item
              className="text-center group relative"
            >
              <div className="relative z-10">
                <h3 className="font-syne font-bold text-paper mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', lineHeight: 1.15 }}
                >
                  {stat.value}
                </h3>
                <p className="font-satoshi text-body-lg text-mist/90 leading-relaxed max-w-xs mx-auto">
                  {stat.label}
                </p>
              </div>

              {/* Decorative line */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-px bg-seal-500/30 group-hover:w-3/4 transition-all duration-700 ease-expo"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;