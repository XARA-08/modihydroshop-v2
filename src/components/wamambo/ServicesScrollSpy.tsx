'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import type { Service } from '../lib/services';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Megaphone,
} from 'lucide-react';
import { Wand2 } from '../wamambo/icons';
import BorderGlow from '../wamambo/BorderGlow';
import SpecularButton from '../wamambo/SpecularButton';

const iconMap: Record<string, typeof BarChart3> = {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Megaphone,
  Wand2,
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const N = 6; // services list length; kept as a literal so the progress math is clear

function ServiceCard({
  service,
  active,
  onClick,
  concise,
}: {
  service: Service;
  active?: boolean;
  onClick?: () => void;
  concise?: boolean;
}) {
  const Icon = iconMap[service.icon];
  return (
    <div
      key={service.id}
      id={service.id}
      onClick={onClick}
      className={`scroll-mt-32 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <BorderGlow
        className={`h-full p-7 transition-all duration-300 lg:p-8 ${
          active ? 'ring-1 ring-navy-600/50' : 'opacity-70 hover:opacity-100'
        }`}
        style={{ boxShadow: '0 1px 3px rgba(11,27,58,0.05)' }}
        borderRadius={20}
        glowColor="220 80 55"
        backgroundColor="#F4F2EC"
        colors={['#1E3A8A', '#163560', '#0B1B3A']}
        glowBlend="normal"
        fillBlend="multiply"
        animated={false}
      >
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-seal-500/10 ring-1 ring-seal-500/20">
          {Icon && <Icon size={28} className="text-seal-500" aria-hidden="true" />}
        </div>

        <h3
          className="mb-4 font-syne text-ink transition-colors duration-300"
          style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.7rem)', fontVariationSettings: "'wght' 600", lineHeight: 1.12 }}
        >
          {service.title}
        </h3>

        {!concise && (
          <p
            className="mb-5 font-satoshi text-ink/60"
            style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', lineHeight: 1.5 }}
          >
            {service.description}
          </p>
        )}

        <div className="mb-5 h-px w-full bg-gradient-to-r from-seal-500/30 via-seal-500/10 to-transparent" />

        <ul className="space-y-2.5">
          {[service.description].map((b) => (
            <li
              key={b}
              className="flex gap-2.5 font-satoshi text-ink/70"
              style={{ fontSize: 'clamp(0.92rem, 1.05vw, 1.02rem)', lineHeight: 1.45 }}
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-seal-500/70" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </BorderGlow>
    </div>
  );
}

export function ServicesScrollSpy({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  // Pinned scroll-spy only on desktop + no reduced-motion. Otherwise a clean
  // stacked layout (mobile, or users who opted out of motion).
  const [enablePin, setEnablePin] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (desktop && !reduce) setEnablePin(true);
  }, []);

  useEffect(() => {
    if (!enablePin) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const pin = pinRef.current;
    const section = sectionRef.current;
    if (!track || !viewport || !pin || !section) return;

    const ctx = gsap.context(() => {
      const getAmount = () => Math.max(0, track.scrollHeight - viewport.clientHeight);

      const tween = gsap.to(track, { y: () => -getAmount(), ease: 'none' });

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getAmount()}`,
        pin,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(N - 1, Math.max(0, Math.round(self.progress * (N - 1))));
          setActive(idx);
        },
      });
      triggerRef.current = st;
    }, section);

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      ctx.revert();
      triggerRef.current = null;
    };
  }, [enablePin]);

  const scrollToCard = (idx: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const target = st.start + (idx / (N - 1 || 1)) * (st.end - st.start);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const activeService = services[active];

  // ── Stacked fallback (mobile / reduced-motion) ─────────────────────────────
  if (!enablePin) {
    return (
      <section className="bg-paper py-24 lg:py-32" aria-labelledby="services-scroll-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl">
            <p className="mb-6 font-satoshi text-label uppercase tracking-[0.14em] text-seal-500">
              What we do
            </p>
            <h2
              id="services-scroll-heading"
              className="mb-4 font-syne text-ink"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontVariationSettings: "'wght' 700", lineHeight: 1.08 }}
            >
              Every service your business needs.
            </h2>
            <p className="max-w-[52ch] font-satoshi text-body-lg text-ink/70">
              From day-to-day administration to long-term strategy, we provide
              integrated support so you can focus on running your business.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} concise={false} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <SpecularButton href="/contact" size="md" textColor="#0B0F1A">
              Talk to us
            </SpecularButton>
          </div>
        </div>
      </section>
    );
  }

  // ── Pinned scroll-spy (desktop, motion allowed) ────────────────────────────
  return (
    <section ref={sectionRef} className="relative bg-paper" aria-labelledby="services-scroll-heading">
      <div ref={pinRef} className="relative flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          {/* LEFT — cards translate upward while the section is pinned */}
          <div className="lg:col-span-7">
            <div ref={viewportRef} className="h-[68vh] overflow-hidden py-[6vh]">
              <div ref={trackRef} className="flex flex-col gap-6 will-change-transform">
                {services.map((service, idx) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    active={idx === active}
                    onClick={() => scrollToCard(idx)}
                    concise
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — heading + active detail stay fixed for the whole pin */}
          <div className="hidden lg:col-span-5 lg:flex lg:items-center">
            <div className="w-full">
              <p className="mb-6 font-satoshi text-label uppercase tracking-[0.14em] text-seal-500">
                What we do
              </p>
              <h2
                id="services-scroll-heading"
                className="mb-4 font-syne text-ink"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontVariationSettings: "'wght' 700", lineHeight: 1.08 }}
              >
                Every service your business needs.
              </h2>
              <p className="mb-10 max-w-[46ch] font-satoshi text-body-lg text-ink/70">
                From day-to-day administration to long-term strategy, we provide
                integrated support so you can focus on running your business.
              </p>

              {/* Active service — text only (re-mounts on change for cross-fade) */}
              <div key={activeService.id} className="max-w-[44ch]">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-seal-500">
                  {(() => {
                    const Icon = iconMap[activeService.icon];
                    return Icon ? <Icon size={26} aria-hidden="true" /> : null;
                  })()}
                </div>

                <p className="mb-3 font-satoshi text-xs uppercase tracking-[0.14em] text-seal-500">
                  {activeService.number} / 0{N}
                </p>

                <h3
                  className="mb-4 font-syne text-ink"
                  style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.25rem)', fontVariationSettings: "'wght' 700", lineHeight: 1.1 }}
                >
                  {activeService.title}
                </h3>

                <p className="mb-6 font-satoshi text-body-lg text-ink/80">
                  {activeService.description}
                </p>

                <p className="mb-8 font-satoshi text-sm leading-relaxed text-ink/60">
                  {activeService.detail}
                </p>

                <a
                  href={`/contact`}
                  className="inline-flex items-center gap-1.5 font-satoshi text-sm font-medium text-seal-500 transition-colors duration-300 hover:text-seal-400"
                >
                  Talk to us
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>

              {/* Progress rail */}
              <div className="mt-8 flex items-center gap-3">
                {services.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToCard(i)}
                    aria-label={`Go to ${s.title}`}
                    className="group flex items-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? 'w-8 bg-seal-500' : 'w-3 bg-ink/15 group-hover:bg-ink/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesScrollSpy;
