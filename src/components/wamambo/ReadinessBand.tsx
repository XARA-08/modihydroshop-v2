import { MorphHeadline } from '../wamambo/MorphHeadline'

interface Signal { stat: string; label: string }
interface Props { signals?: Signal[]; heading?: string; subheading?: string; ctaText?: string; ctaHref?: string }

const defaultSignals: Signal[] = [
  { stat: 'B-BBEE', label: 'Level 1 contributor. Your engagement with us counts toward your own procurement scorecard.' },
  { stat: 'CIPC', label: 'Registered company with full compliance documentation available.' },
  { stat: 'Quality', label: 'Rigorous purification and testing on every batch we produce.' },
]

export function ReadinessBand({ signals = defaultSignals, heading = 'Built for the next step', subheading = 'Funding readiness is not a lucky break. It is groundwork.', ctaText = 'Request a quote', ctaHref = '/contact' }: Props) {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden bg-navy-900"
      aria-labelledby="readiness-heading"
    >
      {/* subtle gold hairline top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-seal-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="font-satoshi text-label text-seal-500 tracking-[0.14em] uppercase mb-6">
            {heading}
          </p>
          <MorphHeadline
            as="h2"
            id="readiness-heading"
            className="font-syne text-paper"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontVariationSettings: "'wght' 700", lineHeight: 1.1 }}
          >
            {heading}
          </MorphHeadline>
          <p className="font-satoshi text-body-lg text-mist/80 mt-6 leading-relaxed max-w-[52ch]">
            {subheading}
          </p>
        </div>

        <div className="grid gap-px bg-white/[0.06] sm:grid-cols-3">
          {signals.map((s) => (
            <div key={s.stat} className="bg-navy-900 p-8 group">
              <p className="font-syne text-2xl text-seal-500 mb-4" style={{ fontVariationSettings: "'wght' 700" }}>
                {s.stat}
              </p>
              <p className="font-satoshi text-body-base text-mist/75 leading-relaxed">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a href={ctaHref} className="btn-31" aria-label={ctaText}>
                      <span className="text-container">
                        <span className="text">{ctaText}</span>
                      </span>
                    </a>
        </div>
      </div>
    </section>
  )
}

export default ReadinessBand;
