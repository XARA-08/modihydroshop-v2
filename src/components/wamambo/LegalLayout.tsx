import type { ReactNode } from 'react'

export function LegalLayout({
  title,
  intro,
  effectiveDate = '24 July 2026',
  children,
}: {
  title: string
  intro: string
  effectiveDate?: string
  children: ReactNode
}) {
  return (
    <>
      <section className="relative bg-navy-950 px-5 pb-16 pt-40 md:px-8 md:pt-48">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-satoshi text-xs uppercase tracking-[0.14em] text-seal-500">
            Legal
          </p>
          <h1
            className="font-syne text-paper"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontVariationSettings: "'wght' 700",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-satoshi text-base text-mist/80 md:text-lg">
            {intro}
          </p>
          <p className="mt-6 font-satoshi text-xs uppercase tracking-[0.14em] text-mist/60">
            Effective {effectiveDate}
          </p>
        </div>
      </section>

      <section className="bg-paper px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">{children}</div>
      </section>
    </>
  )
}

export function Clause({
  n,
  title,
  children,
}: {
  n: string | number
  title: string
  children: ReactNode
}) {
  return (
    <div className="mb-10">
      <h2
        className="mb-3 font-syne text-2xl font-semibold text-ink"
        style={{ fontVariationSettings: "'wght' 650" }}
      >
        {n}. {title}
      </h2>
      <div className="space-y-3 font-satoshi text-base leading-relaxed text-ink/75">
        {children}
      </div>
    </div>
  )
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 font-satoshi text-base leading-relaxed text-ink/75">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  )
}
export default LegalLayout;
