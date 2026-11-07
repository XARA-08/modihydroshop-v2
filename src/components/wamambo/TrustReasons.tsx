'use client'

import { useRef } from 'react'
import { MorphHeadline } from '../wamambo/MorphHeadline'
import { useGsapReveal } from '../lib/useGsapReveal'

const pillars = [
  {
    title: '100% black-owned',
    body: 'For tender and procurement work, that status carries weight. We know how to put it on paper so it counts where it should.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 19.3 7.2 21.7l.9-5.4L4.2 13.5l5.4-.8z" />
      </svg>
    ),
  },
  {
    title: 'We read the numbers first',
    body: 'Most advice opens with an opinion. Ours opens with your records, your filings, your real cash position. The picture has to be true before we act.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20V4" />
        <path d="M4 20h16" />
        <path d="M8 16l3.5-4 3 2.5L20 8" />
      </svg>
    ),
  },
  {
    title: 'Compliance from month one',
    body: 'SARS, CIPC, BBBEE verification, and the sector licences that let you trade. We build these in early so they never become a scramble or a penalty you could have avoided.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'We tell you what the numbers say',
    body: 'Even the parts that are hard to hear. A plan you can run beats a plan you wish were true.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z" />
      </svg>
    ),
  },
]

export function TrustReasons() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsapReveal(sectionRef, {
    y: 18,
    duration: 0.9,
    start: 'top 84%',
  })

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-paper border-y border-ink/[0.06]"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <p className="font-satoshi text-label text-seal-500 tracking-[0.14em] uppercase mb-4">
            Why founders trust us
          </p>
          <MorphHeadline
            id="trust-heading"
            as="h2"
            className="text-display-md text-ink"
            style={{ fontVariationSettings: "'wght' 650" }}
          >
            The things we never compromise on.
          </MorphHeadline>
          <p className="font-satoshi text-body-lg text-ink/70 mt-4">
            We run a highly technical team that reaches for first principles over
            generic playbooks. The person who scopes your work is the person who
            builds it. These are the things you can count on.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="surface p-8">
              <div className="mb-6 text-seal-500 [&>svg]:h-7 [&>svg]:w-7">
                {pillar.icon}
              </div>
                <h3
                  className="font-syne text-body-lg text-ink mb-3"
                  style={{ fontVariationSettings: "'wght' 600" }}
                >
                  {pillar.title}
                </h3>
                <p className="font-satoshi text-body-sm text-ink/70 leading-relaxed">
                  {pillar.body}
                </p>
              </article>
            ))}
        </div>
      </div>
    </section>
  )
}

export default TrustReasons
