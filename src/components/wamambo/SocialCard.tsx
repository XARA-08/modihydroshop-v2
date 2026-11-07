'use client'

import React from 'react'
import './SocialCard.css'

// Real social glyphs (no external icon dep). Brand-neutral, currentColor.
const ICON_PATHS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
    />
  ),
  Facebook: (
    <path
      fill="currentColor"
      d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07Z"
    />
  ),
}

interface SocialLink { label: string; href: string }
interface Props { links?: SocialLink[]; logoSrc?: string; logoAlt?: string }

const defaultLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/modihydroshop' },
  { label: 'Facebook', href: 'https://www.facebook.com/modihydroshop' },
]

export default function SocialCard({ links = defaultLinks, logoSrc = '/logo.svg', logoAlt = 'Modi Hydroshop' }: Props) {
  return (
    <div className="social-card" aria-label="Wamambo Consultancy social links">
      <div className="social-card__bg" />
      <div className="social-card__logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={logoAlt} />
      </div>

      {links.map((s, i) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          className={`social-card__box social-card__box${i + 1}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="social-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">{ICON_PATHS[s.label]}</svg>
          </span>
        </a>
      ))}
    </div>
  )
}
