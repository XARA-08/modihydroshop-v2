'use client'

import { useEffect, useRef, useState } from 'react'
import { useIntroStore } from '../lib/intro-store'

const LOGO_URL = '/brand/wamambo-logo.svg'
const STROKE_COLOR = '#2D7DD2'
const STROKE_DURATION = 1400 // trace the real glyph outline in one continuous stroke
const FILL_DURATION = 550
const DOT_DELAY = 180 // after the main glyph fill completes
const DOT_POP_DURATION = 420
const WORDMARK_DELAY = 260 // the dot's pop is what triggers the name
const HOLD_DURATION = 700
const FADE_OUT_DURATION = 600

export function IntroAnimation() {
  const { completeIntro } = useIntroStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null)
  const [visible, setVisible] = useState(true)
  const [overlayFading, setOverlayFading] = useState(false)
  const [wordmarkVisible, setWordmarkVisible] = useState(false)

  // The navy curtain renders from first paint (visible starts true) so the
  // page never flashes underneath. For reduced-motion, fade it out quickly
  // without the draw sequence.
  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      const t = setTimeout(() => setOverlayFading(true), 60)
      const t2 = setTimeout(() => {
        setVisible(false)
        completeIntro()
      }, 60 + FADE_OUT_DURATION)
      return () => {
        clearTimeout(t)
        clearTimeout(t2)
      }
    }
  }, [completeIntro])

  // Load the real logo markup, then draw it.
  useEffect(() => {
    if (!visible) return
    let cancelled = false
    fetch(LOGO_URL)
      .then((res) => res.text())
      .then((text) => {
        if (!cancelled) setSvgMarkup(text)
      })
      .catch(() => {
        if (!cancelled) {
          setVisible(false)
          completeIntro()
        }
      })
    return () => {
      cancelled = true
    }
  }, [visible, completeIntro])

  useEffect(() => {
    if (!svgMarkup || !containerRef.current) return

    const svgEl = containerRef.current.querySelector('svg')
    if (svgEl) {
      svgEl.setAttribute('width', '100%')
      svgEl.setAttribute('height', '100%')
      svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')
      svgEl.style.display = 'block'
      svgEl.style.overflow = 'visible'
    }

    const mainGroup = containerRef.current.querySelector('#logo-main')
    const mainPaths = mainGroup
      ? (Array.from(mainGroup.querySelectorAll('path')) as SVGPathElement[])
      : []
    const dotGroup = containerRef.current.querySelector('#logo-dot') as SVGGraphicsElement | null
    const timers: ReturnType<typeof setTimeout>[] = []

    if (mainPaths.length === 0) {
      // No drawable glyph: just resolve the name and move on.
      setWordmarkVisible(true)
      timers.push(
        setTimeout(() => setOverlayFading(true), HOLD_DURATION),
        setTimeout(() => {
          setVisible(false)
          completeIntro()
        }, HOLD_DURATION + FADE_OUT_DURATION)
      )
      return () => timers.forEach(clearTimeout)
    }

    // Keep the dot hidden until its own reveal moment — scale from its own
    // centre (transform-box: fill-box), not the SVG's top-left origin.
    if (dotGroup) {
      dotGroup.style.transformBox = 'fill-box'
      dotGroup.style.transformOrigin = 'center'
      dotGroup.style.transform = 'scale(0)'
      dotGroup.style.opacity = '0'
      dotGroup.style.transition = 'none'
    }

    // Trace each glyph in its OWN fill colour (not the generic stroke gold),
    // so when the solid fill cross-fades in there is no hue jump. Start the
    // fill slightly BEFORE the stroke finishes (overlap) so the W eases
    // seamlessly from drawn line into solid logo — no "pop" at the end.
    mainPaths.forEach((p) => {
      const fill = p.getAttribute('fill') || STROKE_COLOR
      const len = p.getTotalLength()
      p.dataset.fill = fill
      p.style.fill = 'none'
      p.style.stroke = fill
      p.style.strokeWidth = '3'
      p.style.strokeLinecap = 'round'
      p.style.strokeLinejoin = 'round'
      p.style.strokeDasharray = `${len}`
      p.style.strokeDashoffset = `${len}`
      p.style.strokeOpacity = '1'
      p.style.transition = 'none'
    })
    void containerRef.current.getBoundingClientRect() // force reflow before animating
    mainPaths.forEach((p) => {
      p.style.transition = `stroke-dashoffset ${STROKE_DURATION}ms cubic-bezier(0.65,0,0.35,1)`
      p.style.strokeDashoffset = '0'
    })

    // Cross-fade the solid fill in just before the stroke ends; the W resolves
    // smoothly rather than snapping to a filled shape.
    const FILL_START = STROKE_DURATION - 220
    timers.push(
      setTimeout(() => {
        mainPaths.forEach((p) => {
          p.style.transition = `fill ${FILL_DURATION + 220}ms ease-out, stroke-opacity ${FILL_DURATION}ms ease-out`
          p.style.fill = p.dataset.fill || STROKE_COLOR
          p.style.strokeOpacity = '0'
        })
      }, FILL_START)
    )

    // Fill resolves → the real dot from the artwork pops in.
    const dotAt = STROKE_DURATION + FILL_DURATION + DOT_DELAY
    timers.push(
      setTimeout(() => {
        if (dotGroup) {
          dotGroup.style.transition = `transform ${DOT_POP_DURATION}ms cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease-out`
          dotGroup.style.transform = 'scale(1)'
          dotGroup.style.opacity = '1'
        }
      }, dotAt)
    )

    // The dot's pop is the trigger for the wordmark reveal.
    const wordmarkAt = dotAt + WORDMARK_DELAY
    timers.push(setTimeout(() => setWordmarkVisible(true), wordmarkAt))

    const fadeAt = wordmarkAt + 550 + HOLD_DURATION
    timers.push(setTimeout(() => setOverlayFading(true), fadeAt))
    timers.push(
      setTimeout(() => {
        setVisible(false)
        completeIntro()
      }, fadeAt + FADE_OUT_DURATION)
    )

    return () => timers.forEach(clearTimeout)
  }, [svgMarkup])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-950"
      style={{
        opacity: overlayFading ? 0 : 1,
        transition: `opacity ${FADE_OUT_DURATION}ms ease-out`,
        // Purely decorative: never trap the page beneath it. Keep the site
        // fully interactive (hover, scroll, click) while the intro plays.
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center justify-center">
        {/* Container matches the logo's real artwork bounds (viewBox 243 184 612
            269, see wamambo-logo.svg) so the entire glyph shows, never cropped. */}
        <div
          ref={containerRef}
          className="relative w-[min(72vw,460px)] aspect-[612/269]"
          dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : { __html: '' }}
        />

        <div
          className="mt-8 flex flex-col items-center gap-2"
          style={{
            opacity: wordmarkVisible ? 1 : 0,
            filter: wordmarkVisible ? 'blur(0px)' : 'blur(6px)',
            transition: 'opacity 0.55s ease-out, filter 0.55s ease-out',
          }}
        >
          <span className="font-syne text-3xl font-bold uppercase tracking-[0.34em] text-paper">
            WAMAMBO
          </span>
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 bg-seal-500/45" />
            <span className="font-syne text-sm uppercase tracking-[0.3em] text-seal-500">
              CONSULTANCY
            </span>
            <span className="block h-px w-8 bg-seal-500/45" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroAnimation
