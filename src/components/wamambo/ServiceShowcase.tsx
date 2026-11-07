'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Megaphone,
  ArrowRight,
} from 'lucide-react'
import BorderGlow from '../wamambo/BorderGlow'
import SpecularButton from '../wamambo/SpecularButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SERVICES = [
  {
    slug: 'data-administration',
    Icon: BarChart3,
    title: 'Data Administration & Insight',
    tagline: "You shouldn't need a data team to know what's true.",
    body: 'We use SQL, SAS, R, Python and Excel to surface the patterns inside your numbers, and Power BI and Tableau to turn those patterns into dashboards your whole team can read at a glance. Data-driven decisions stop being a corporate luxury and become your everyday advantage.',
    bullets: [
      'Turn the numbers you already have into decisions you trust.',
      'Dashboards in Power BI and Tableau your team can read at a glance.',
    ],
  },
  {
    slug: 'strategic-advice',
    Icon: TrendingUp,
    title: 'Strategic & Operational Advice',
    tagline: 'Plans that survive contact with reality.',
    body: 'Every recommendation we make is drawn from your actual data and your specific market context. We model revenue scenarios, map operational gaps, and translate the numbers into a plan you can execute. Strategy that fits your stage, your sector, and your ambitions.',
    bullets: [
      'Plans built from your actual data and market context.',
      'Revenue scenarios and operational gaps, mapped and prioritised.',
    ],
  },
  {
    slug: 'compliance',
    Icon: ShieldCheck,
    title: 'Compliance',
    tagline: 'Stay eligible without the dread.',
    body: 'We manage CIPC company registrations, SARS submissions, and the full compliance calendar your business needs to stay in good standing, and to ensure funding eligibility when the right opportunity arrives. Compliance is continuous. We treat it as a standing foundation.',
    bullets: [
      'SARS, CIPC and BBBEE held so nothing slips.',
      'Sector duties covered too, from food and beauty to funding.',
    ],
  },
  {
    slug: 'administration-bookkeeping',
    Icon: BookOpen,
    title: 'Administration & Bookkeeping',
    tagline: 'The operational weight, lifted.',
    body: 'We automate and manage accounting books using Excel and purpose-built tools, keeping your financial records current, audit-ready, and useful for decision-making. Administration support extends to daily operational tasks, so you can focus on growth while we hold the foundation steady.',
    bullets: [
      'Clean, audit-ready books, managed and automated.',
      'Daily admin off your plate so you can run the business.',
    ],
  },
  {
    slug: 'marketing-crm',
    Icon: Megaphone,
    title: 'Marketing & Customer Relations',
    tagline: 'Know who actually buys, and why.',
    body: 'We design targeted marketing approaches grounded in your actual customer data, who they are, how they find you, and what converts them. Alongside that, we help you build and manage CRM processes that keep your client relationships growing rather than leaking.',
    bullets: [
      'Targeted marketing grounded in who actually buys.',
      'CRM processes that keep client relationships growing.',
    ],
  },
] as const

const N = SERVICES.length

function ServiceCard({
  service,
  active,
  onClick,
  concise,
}: {
  service: (typeof SERVICES)[number]
  active?: boolean
  onClick?: () => void
  concise?: boolean
}) {
  const { Icon, title, body, bullets, slug } = service
  return (
    <div
      key={slug}
      onClick={onClick}
      className={`scroll-mt-32 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <BorderGlow
        className={`h-full p-7 transition-all duration-300 lg:p-8 ${
          active
            ? 'ring-1 ring-navy-600/50'
            : 'opacity-70 hover:opacity-100'
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
          <Icon size={28} className="text-seal-500" aria-hidden="true" />
        </div>

        <h3
          className="mb-4 font-syne text-ink transition-colors duration-300"
          style={{ fontSize: 'clamp(1.35rem, 2.2vw, 1.7rem)', fontVariationSettings: "'wght' 600", lineHeight: 1.12 }}
        >
          {title}
        </h3>

        {!concise && (
          <p
            className="mb-5 font-satoshi text-ink/60"
            style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', lineHeight: 1.5 }}
          >
            {body}
          </p>
        )}

        <div className="mb-5 h-px w-full bg-gradient-to-r from-seal-500/30 via-seal-500/10 to-transparent" />

        <ul className="space-y-2.5">
          {bullets.map((b) => (
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
  )
}

export function ServiceShowcase() {
  const [active, setActive] = useState(0)
  // Pinned scroll-spy only on desktop + no reduced-motion. Otherwise a clean
  // stacked layout (mobile, or users who opted out of motion).
  const [enablePin, setEnablePin] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  // Decide layout once on mount (desktop + motion allowed → pin).
  useEffect(() => {
    if (typeof window === 'undefined') return
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (desktop && !reduce) setEnablePin(true)
  }, [])

  // Set up the pinned scroll-spy after the pinned layout has rendered.
  useEffect(() => {
    if (!enablePin) return
    const track = trackRef.current
    const viewport = viewportRef.current
    const pin = pinRef.current
    const section = sectionRef.current
    if (!track || !viewport || !pin || !section) return

    const ctx = gsap.context(() => {
      const getAmount = () => Math.max(0, track.scrollHeight - viewport.clientHeight)

      const tween = gsap.to(track, { y: () => -getAmount(), ease: 'none' })

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getAmount()}`,
        pin,
        scrub: 1,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(N - 1, Math.max(0, Math.round(self.progress * (N - 1))))
          setActive(idx)
        },
      })
      triggerRef.current = st
    }, section)

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }

    return () => {
      ctx.revert()
      triggerRef.current = null
    }
  }, [enablePin])

  const scrollToCard = (idx: number) => {
    const st = triggerRef.current
    if (!st) return
    const target = st.start + (idx / (N - 1 || 1)) * (st.end - st.start)
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const activeService = SERVICES[active]

  // ── Stacked fallback (mobile / reduced-motion) ─────────────────────────────
  if (!enablePin) {
    return (
      <section className="bg-paper py-24 lg:py-32" aria-labelledby="services-showcase-heading">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl">
            <p className="mb-6 font-satoshi text-label uppercase tracking-[0.14em] text-seal-500">
              Our Services
            </p>
            <h2
              id="services-showcase-heading"
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
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} concise={false} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <SpecularButton href="/services" size="md" textColor="#0B0F1A">
              View All Services
            </SpecularButton>
          </div>
        </div>
      </section>
    )
  }

  // ── Pinned scroll-spy (desktop, motion allowed) ────────────────────────────
  return (
    <section ref={sectionRef} className="relative bg-paper" aria-labelledby="services-showcase-heading">
      <div ref={pinRef} className="relative flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          {/* LEFT — cards translate upward while the section is pinned */}
          <div className="lg:col-span-7">
            <div ref={viewportRef} className="h-[68vh] overflow-hidden py-[6vh]">
              <div ref={trackRef} className="flex flex-col gap-6 will-change-transform">
                {SERVICES.map((service, idx) => (
                  <ServiceCard
                    key={service.slug}
                    service={service}
                    active={idx === active}
                    onClick={() => scrollToCard(idx)}
                    concise
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — heading + active detail stay fixed for the whole pin (text only, no card) */}
          <div className="hidden lg:col-span-5 lg:flex lg:items-center">
            <div className="w-full">
              <p className="mb-6 font-satoshi text-label uppercase tracking-[0.14em] text-seal-500">
                Our Services
              </p>
              <h2
                id="services-showcase-heading"
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
              <div
                key={activeService.slug}
                className="max-w-[44ch]"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-seal-500">
                  <activeService.Icon size={26} aria-hidden="true" />
                </div>

                <p className="mb-3 font-satoshi text-xs uppercase tracking-[0.14em] text-seal-500">
                  {`0${active + 1}`} / 0{N}
                </p>

                <h3
                  className="mb-4 font-syne text-ink"
                  style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.25rem)', fontVariationSettings: "'wght' 700", lineHeight: 1.1 }}
                >
                  {activeService.title}
                </h3>

                <p className="mb-6 font-satoshi text-body-lg text-ink/80">
                  {activeService.tagline}
                </p>

                <p className="mb-8 font-satoshi text-sm leading-relaxed text-ink/60">
                  {activeService.body}
                </p>

                <a
                  href={`/services#${activeService.slug}`}
                  className="inline-flex items-center gap-1.5 font-satoshi text-sm font-medium text-seal-500 transition-colors duration-300 hover:text-seal-400"
                >
                  Learn more
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </div>

              {/* Progress rail */}
              <div className="mt-8 flex items-center gap-3">
                {SERVICES.map((s, i) => (
                  <button
                    key={s.slug}
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
  )
}

export default ServiceShowcase
