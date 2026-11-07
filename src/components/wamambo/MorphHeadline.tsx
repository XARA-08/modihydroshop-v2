'use client'

import { useEffect, useRef, CSSProperties, ReactNode, createElement } from 'react'

interface MorphHeadlineProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'span'
  className?: string
  id?: string
  style?: CSSProperties
  delay?: number
}

export function MorphHeadline({
  children,
  as: Tag = 'h2',
  className = '',
  id,
  style,
  delay = 0,
}: MorphHeadlineProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('is-visible'), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return createElement(
    Tag,
    { ref, id, style, className: `morph-headline ${className}` },
    children
  )
}

export default MorphHeadline
