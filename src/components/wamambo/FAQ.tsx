import { MorphHeadline } from '../wamambo/MorphHeadline'

interface FAQItem { q: string; a: string }
interface Props { items?: FAQItem[]; heading?: string; subheading?: string }

const defaultItems: FAQItem[] = [
  { q: 'What areas do you serve?', a: 'We serve Modimolle, Polokwane, Bela-Bela, Mokopane, Thabazimbi, Vaalwater, Lephalale, and Mookgophong in Limpopo province.' },
  { q: 'Do you offer free delivery?', a: 'Yes, free delivery within our 8-town service area for qualifying orders.' },
  { q: 'What purification process do you use?', a: 'We use a multi-stage Reverse Osmosis process including sediment filtration, carbon filtration, RO membrane, UV disinfection, and ozone treatment.' },
  { q: 'Are your products certified?', a: 'We hold B-BBEE Level 1 contributor status and are registered with CIPC. Additional certifications are pending verification.' },
  { q: 'How do I request a quote?', a: 'Contact us via phone, email, or our contact form. We will provide a detailed quote based on your specific requirements.' },
  { q: 'Do you offer catering services?', a: 'Yes, we offer prepared meals and catering services alongside our beverage products.' },
]

export function FAQ({ items = defaultItems, heading = "Frequently asked questions.", subheading = "Questions? We have answers." }: Props) {
  return (
    <section className="py-24 bg-paper border-y border-ink/[0.06]" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="font-satoshi text-label text-seal-500 tracking-[0.14em] uppercase mb-4">
            {subheading}
          </p>
          <MorphHeadline
            id="faq-heading"
            as="h2"
            className="text-display-md text-ink"
            style={{ fontVariationSettings: "'wght' 650" }}
          >
            {heading}
          </MorphHeadline>
        </div>

        <div className="space-y-4">
          {items.map((faq, i) => (
            <details
              key={i}
              className="surface group overflow-hidden transition-all duration-200"
            >
              <summary className="flex items-center justify-between px-6 py-5 font-satoshi text-body-lg text-ink cursor-pointer transition-colors group-open:bg-seal-100/20 group-hover:text-seal-500">
                <span className="pr-4">{faq.q}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 text-ink/30 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="px-6 pb-5 pt-2 border-t border-ink/[0.06]">
                <p className="font-satoshi text-body-base text-ink/70 leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ;
