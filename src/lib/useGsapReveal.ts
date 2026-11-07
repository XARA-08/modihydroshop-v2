'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export type RevealOptions = {
  y?: number
  duration?: number
  ease?: string
  start?: string
  once?: boolean
}

/**
 * Progressive-enhancement reveal: content is ALWAYS visible by default
 * (no opacity:0 that can get stuck if JS/scroll fails). We only do a subtle
 * translate-up on scroll, and skip entirely under prefers-reduced-motion.
 */
export function useGsapReveal(
  ref: React.RefObject<HTMLElement | null>,
  options: RevealOptions = {}
) {
  const {
    y = 32,
    duration = 0.9,
    ease = 'expo.out',
    start = 'top 85%',
    once = true,
  } = options

  useEffect(() => {
    if (!ref.current) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y },
        {
          y: 0,
          duration,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            once,
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
    }
  }, [ref.current, duration, ease, once, start, y])

  // Variable fonts shift layout on swap — recompute trigger positions after.
  useEffect(() => {
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }
  }, [])
}
