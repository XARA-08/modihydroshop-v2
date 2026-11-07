'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MorphHeadline } from '../wamambo/MorphHeadline'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Step { number: string; title: string; body: string }
interface Props { steps?: Step[]; heading?: string; subheading?: string }

const defaultSteps: Step[] = [
  { number: '01', title: 'Understand', body: 'We start by listening.' },
  { number: '02', title: 'Analyse', body: 'We pull your data into our tools.' },
  { number: '03', title: 'Advise', body: 'You receive a clear action plan.' },
  { number: '04', title: 'Support', body: 'We stay alongside you.' },
];

export function ProcessPath({ steps = defaultSteps, heading = 'How We Work', subheading = 'A methodology built on data, not guesswork.' }: Props) {
  const pathRef = useRef<SVGPathElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    // Reduced-motion: leave the decorative path fully visible (no draw animation).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    function update() {
      const current = pathRef.current
      if (!current) return
      const rect = current.getBoundingClientRect()
      const top = rect.top + window.scrollY
      const progress = Math.max(0, Math.min(1,
        (window.scrollY - top + window.innerHeight * 0.6) / (rect.height * 0.85)
      ))
      current.style.strokeDashoffset = `${length * (1 - progress)}`
    }

    const onScroll = () => update()
    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = cardsRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = el.querySelectorAll('[data-process-card]')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 24 },
        {
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
    }
  }, [])

  // Variable fonts (Syne/Satoshi) shift layout on swap — refresh triggers
  // once fonts are ready so reveal start positions are computed correctly.
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-paper overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <p className="font-satoshi text-label text-navy-700 tracking-[0.14em] uppercase mb-6">
            {heading}
          </p>
          <MorphHeadline
            as="h2"
            id="process-heading"
            className="font-syne text-ink"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontVariationSettings: "'wght' 700", lineHeight: 1.1 }}
          >
            {subheading}
          </MorphHeadline>
        </div>

        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            aria-hidden
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 80 80 C 300 80, 200 240, 420 240 C 640 240, 540 400, 760 400 C 980 400, 880 560, 1100 560"
              fill="none"
              stroke="#2D7DD2"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
              className="process-path"
            />
          </svg>

          <div ref={cardsRef} className="grid lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.number}
                data-process-card
                className={`${i % 2 === 1 ? 'lg:mt-32' : ''}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 border border-seal-500/40 flex items-center justify-center">
                    <span
                      className="font-syne text-seal-500 text-sm"
                      style={{ fontVariationSettings: "'wght' 600" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-navy-900/10" />
                </div>

                <h3
                  className="font-syne text-ink mb-4"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontVariationSettings: "'wght' 700", lineHeight: 1.1 }}
                >
                  {step.title}
                </h3>
                <p className="font-satoshi text-body-base text-ink/60 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessPath