import { MorphHeadline } from '../wamambo/MorphHeadline'

interface PropItem { num: string; title: string; body: string }
interface Props { items?: PropItem[]; heading?: string; subheading?: string }

const defaultItems: PropItem[] = [
  { num: '01', title: 'Integrity', body: 'Honest, transparent dealings with every client and partner.' },
  { num: '02', title: 'Quality', body: 'Rigorous purification and testing on every batch we produce.' },
  { num: '03', title: 'Safety', body: 'Food-grade processes that meet the highest hygiene standards.' },
  { num: '04', title: 'Respect', body: 'We value our people, our clients, and our community.' },
]

export function ValueProps({ items = defaultItems, heading = 'Why Modi Water', subheading = 'What sets us apart.' }: Props) {
  return (
    <section
      className="py-32 lg:py-40 bg-navy-950"
      aria-labelledby="whyus-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-20">
          <p className="font-satoshi text-label text-seal-500 tracking-[0.14em] uppercase mb-6">
            {heading}
          </p>
          <MorphHeadline
            as="h2"
            id="whyus-heading"
            className="font-syne text-paper"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontVariationSettings: "'wght' 650", lineHeight: 1.1 }}
          >
            {subheading}
          </MorphHeadline>
          <p className="font-satoshi text-body-lg text-mist/80 max-w-[52ch] mt-6 leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
          {items.map((p) => (
            <div
              key={p.num}
              className="bg-navy-900 p-8 group hover:bg-navy-800 transition-colors duration-300"
            >
              <span className="font-satoshi text-label text-seal-500/80 tracking-widest mb-6 block">
                {p.num}
              </span>
              <h3
                className="font-syne text-paper mb-4 group-hover:text-seal-400 transition-colors duration-300"
                style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', fontVariationSettings: "'wght' 600", lineHeight: 1.15 }}
              >
                {p.title}
              </h3>
              <p className="font-satoshi text-body-sm text-mist/70 leading-relaxed">
                {p.body}
              </p>
              {/* Bottom accent */}
              <div className="mt-8 h-px w-0 bg-seal-500 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
export default ValueProps;
