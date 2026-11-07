'use client'

import { useRef } from 'react'
import { MorphHeadline } from '../wamambo/MorphHeadline'
import { CalPopup } from '../wamambo/CalForm'
import { useGsapReveal } from '../lib/useGsapReveal'

export function ContactCTA() {
  const contentRef = useRef<HTMLDivElement>(null)

  useGsapReveal(contentRef, {
    y: 22,
    duration: 0.95,
    start: 'top 82%',
  })

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden bg-navy-950"
      aria-labelledby="cta-heading"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="max-w-3xl">
          <p className="font-satoshi text-label text-seal-500 tracking-[0.14em] uppercase mb-6">Ready to grow?</p>
          <MorphHeadline
            as="h2"
            id="cta-heading"
            className="font-syne text-paper mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontVariationSettings: "'wght' 700",
              lineHeight: 1.06,
            }}
          >
            Let&apos;s build your business&apos;s next chapter.
          </MorphHeadline>
          <p className="font-satoshi text-body-lg text-paper/70 max-w-[50ch] mb-10">
            Book a free 30-minute strategy call. We&apos;ll map your compliance position, funding eligibility, and the data levers that drive growth.
          </p>

          <CalPopup specular />

          <p className="mt-5 font-satoshi text-sm text-paper/50 leading-relaxed">
            Free, no-obligation, and built around where you want to go. No prep needed.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA