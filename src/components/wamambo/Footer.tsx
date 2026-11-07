'use client'

import React from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'motion/react'
import SocialCard from '../wamambo/SocialCard'

const FOOTER_COLUMNS: { title: string; breakAll?: boolean; links: readonly { label: string; href: string }[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Why Us', href: '/why-us' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Data & Insight', href: '/services#data-administration' },
      { label: 'Strategy', href: '/services#strategic-advice' },
      { label: 'Compliance', href: '/services#compliance' },
      { label: 'Bookkeeping', href: '/services#administration-bookkeeping' },
      { label: 'Marketing', href: '/services#marketing-crm' },
    ],
  },
  {
    title: 'Get in Touch',
    breakAll: true,
    links: [
      { label: '+27 84 601 5533', href: 'tel:+27846015533' },
      { label: 'info@wamamboconsultancy.co.za', href: 'mailto:info@wamamboconsultancy.co.za' },
      { label: 'WhatsApp Us', href: 'https://wa.me/27846015533' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'PAIA Manual', href: '/paia-manual' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Footer() {
  return (
    <footer className="px-4 py-12">
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="flex h-full flex-col gap-4 md:flex-row">
          {/* Brand card (navy field) */}
          <motion.div
            className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl bg-navy-950 p-6 sm:p-8 md:w-1/3 md:min-h-0 md:p-10"
            variants={itemVariants}
          >
            {/* Noise texture overlay */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full mix-blend-overlay opacity-40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="footerNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#footerNoise)" />
            </svg>

            {/* Company logo + name */}
            <div className="relative z-10 flex items-center gap-3">
              <img
                src="/brand/wamambo-logo.svg"
                alt="Wamambo Consultancy"
                className="h-10 w-auto"
              />
              <span className="font-syne text-xl font-bold leading-none text-paper">
                Wamambo{' '}
                <span className="text-seal-500">Consultancy</span>
              </span>
            </div>

            {/* Lower block */}
            <div className="relative z-10 space-y-6">
              <h3 className="max-w-[20ch] font-syne text-lg font-bold text-paper">
                Clarity for founders, built on real data.
              </h3>
              <SocialCard />

              <p className="text-xs text-mist/70">
                © {new Date().getFullYear()} Wamambo Consultancy. All rights reserved.
              </p>
            </div>
          </motion.div>

          {/* Links + newsletter card */}
          <motion.div
            className="flex min-h-[400px] flex-col justify-between rounded-2xl border border-navy-950/10 bg-paper p-6 sm:p-8 md:w-2/3 md:min-h-0 md:p-12 md:dark:bg-navy-900"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title} className="flex flex-col space-y-5">
                  <h4 className="font-satoshi text-sm font-bold uppercase tracking-[0.14em] text-ink md:dark:text-paper">
                    {col.title}
                  </h4>
              <ul className={`flex flex-col space-y-3 font-satoshi text-sm font-medium text-mist${col.breakAll ? ' break-all' : ''}`}>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-block break-words transition-colors hover:text-seal-500"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}
