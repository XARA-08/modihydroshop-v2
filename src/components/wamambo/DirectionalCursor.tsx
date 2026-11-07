'use client'

// Ported from the Framer "Directional Cursor" component by Soyeb
// (https://framer.com/m/Directional-Cursor-ufOg.js@jfi1nJplSt5DyWgJsqgw).
// The original imported Framer's builder runtime (`framer`) which does not
// exist in a plain Next.js app, so that has been stripped: `RenderTarget`
// is replaced with a constant false, and `addPropertyControls` is dropped.
// Animation uses framer-motion (already installed). The cursor tracks
// mousemove and rotates an arrow in the direction of travel.

import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

const isCanvasMode = false

type ControlMode = 'beginner' | 'advanced'

interface DirectionalCursorProps {
  hideOnMobile?: boolean
  hideOnTablet?: boolean
  keepBrowserCursor?: boolean
  controlMode?: ControlMode
  followSpeed?: number
  cursorSize?: number
  damping?: number
  stiffness?: number
  mass?: number
  restDelta?: number
  customSvg?: string
  useCustomSvg?: boolean
  keepTextCursor?: boolean
  keepPointerCursor?: boolean
  style?: React.CSSProperties
}

const defaultSpringConfig = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 }

const DefaultCursorSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={28}
    viewBox="0 0 50 54"
    fill="none"
  >
    <path
      d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
      fill="#2D7DD2"
      stroke="#0B0F1A"
      strokeWidth={2.25825}
      strokeLinejoin="round"
    />
  </svg>
)

const CustomSvgRenderer = ({ svgCode }: { svgCode: string }) => (
  <div dangerouslySetInnerHTML={{ __html: svgCode }} />
)

const getDeviceType = (): 'desktop' | 'tablet' | 'mobile' => {
  if (typeof window === 'undefined') return 'desktop'
  const ua = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
  if (isMobile) {
    const isTablet =
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        ua,
      )
    return isTablet ? 'tablet' : 'mobile'
  }
  return 'desktop'
}

export default function DirectionalCursor({
  hideOnMobile = false,
  hideOnTablet = false,
  keepBrowserCursor = false,
  controlMode = 'beginner',
  followSpeed = 50,
  cursorSize = 0.8,
  damping = 45,
  stiffness = 400,
  mass = 1,
  restDelta = 0.001,
  customSvg = '',
  useCustomSvg = false,
  keepTextCursor = true,
  style,
}: DirectionalCursorProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  useEffect(() => {
    const dt = getDeviceType()
    setDeviceType(dt)
  }, [])

  const shouldHideCursor = useMemo(() => {
    if (deviceType === 'mobile' && hideOnMobile) return true
    if (deviceType === 'tablet' && hideOnTablet) return true
    // Robust touch guard: only hide when there is NO fine pointer at all
    // (pure touch device). `any-pointer` considers every input, so a laptop
    // with both touch and a mouse still keeps the custom cursor.
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (!window.matchMedia('(any-pointer: fine)').matches) return true
    }
    return false
  }, [deviceType, hideOnMobile, hideOnTablet])

  const lastMousePos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)

  const springConfig = useMemo(
    () => ({ damping, stiffness, mass, restDelta }),
    [damping, stiffness, mass, restDelta],
  )

  const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin

  const positionSpringConfig = useMemo(() => {
    if (controlMode === 'beginner' && keepBrowserCursor) {
      let calculatedStiffness: number
      let calculatedDamping: number
      if (followSpeed <= 50) {
        calculatedStiffness = mapRange(followSpeed, 0, 50, 50, 400)
        calculatedDamping = mapRange(followSpeed, 0, 50, 15, 45)
      } else {
        calculatedStiffness = mapRange(followSpeed, 50, 100, 400, 8000)
        calculatedDamping = mapRange(followSpeed, 50, 100, 45, 200)
      }
      return {
        stiffness: calculatedStiffness,
        damping: calculatedDamping,
        mass: springConfig.mass,
        restDelta: springConfig.restDelta,
      }
    }
    return springConfig
  }, [followSpeed, springConfig, controlMode, keepBrowserCursor])

  const cursorX = useSpring(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    positionSpringConfig,
  )
  const cursorY = useSpring(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    positionSpringConfig,
  )
  const translateX = useSpring('-50%', positionSpringConfig)
  const translateY = useSpring('0%', positionSpringConfig)
  const rotation = useSpring(0, { ...positionSpringConfig, damping: 60, stiffness: 300 })
  const baseScale = useSpring(1, { ...positionSpringConfig, stiffness: 500, damping: 35 })
  const combinedScale = useTransform(baseScale, (value) => value * (cursorSize || 1))

  const cursorElement =
    useCustomSvg && customSvg ? (
      <CustomSvgRenderer svgCode={customSvg} />
    ) : (
      <DefaultCursorSVG />
    )

  // Hide the native cursor everywhere — EXCEPT over an embed (iframe) such as
  // the Google Calendar. A cross-origin iframe is a security boundary: the
  // parent page gets no mouse events from inside it, so our custom arrow can't
  // follow the pointer there. Over the embed we therefore (a) restore the
  // native cursor so the user can actually interact, and (b) hide our arrow.
  // CalEmbed toggles `iframe-cursor-active` on <body> via NATIVE mouse
  // listeners (React's synthetic onMouseEnter won't fire across the boundary).
  useEffect(() => {
    if (isCanvasMode || shouldHideCursor) return
    const cssId = 'smooth-cursor-css'
    let existingStyle = document.getElementById(cssId) as HTMLStyleElement | null
    if (!existingStyle) {
      existingStyle = document.createElement('style')
      existingStyle.id = cssId
      document.head.appendChild(existingStyle)
    }
    let css = `* { cursor: none !important; }`
    css += `
      body.iframe-cursor-active,
      body.iframe-cursor-active * {
        cursor: auto !important;
      }
    `
    if (keepTextCursor) {
      css += `
        input,
        textarea,
        select,
        [contenteditable="true"] {
          cursor: text !important;
        }
      `
    }
    existingStyle.innerHTML = css
    return () => {
      const styleElement = document.getElementById(cssId)
      if (styleElement) styleElement.remove()
    }
  }, [keepBrowserCursor, keepTextCursor, shouldHideCursor])

  // Track whether the pointer is over an iframe embed (Google Calendar etc.).
  // CalEmbed toggles `iframe-cursor-active` on <body>; we mirror it into state
  // so the custom arrow can be hidden while the native cursor is restored.
  const [iframeActive, setIframeActive] = useState(false)
  useEffect(() => {
    if (typeof document === 'undefined') return
    const sync = () => setIframeActive(document.body.classList.contains('iframe-cursor-active'))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Track + animate the cursor
  useEffect(() => {
    if (isCanvasMode || shouldHideCursor) return

    const updateVelocity = (currentPos: { x: number; y: number }) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current
      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }
      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)
      const speed = Math.sqrt(
        velocity.current.x * velocity.current.x + velocity.current.y * velocity.current.y,
      )
      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)
      if (speed > 0.1) {
        const currentAngle =
          (Math.atan2(velocity.current.y, velocity.current.x) * 180) / Math.PI + 90
        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle

        const normalizedAngle = (((currentAngle % 360) + 360) % 360)
        if (normalizedAngle >= 315 || normalizedAngle < 45) {
          translateX.set('-50%')
          translateY.set('0%')
        } else if (normalizedAngle >= 45 && normalizedAngle < 135) {
          translateX.set('-100%')
          translateY.set('-50%')
        } else if (normalizedAngle >= 135 && normalizedAngle < 225) {
          translateX.set('-50%')
          translateY.set('-100%')
        } else {
          translateX.set('0%')
          translateY.set('-50%')
        }
        baseScale.set(0.95)
        const timeout = setTimeout(() => {
          baseScale.set(1)
        }, 150)
        return () => clearTimeout(timeout)
      }
    }

    let rafId = 0
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e)
        rafId = 0
      })
    }
    window.addEventListener('mousemove', throttledMouseMove)
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [cursorX, cursorY, rotation, baseScale, translateX, translateY, isCanvasMode, shouldHideCursor])

  if (isCanvasMode) return null
  if (shouldHideCursor) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: cursorX,
        top: cursorY,
        translateX,
        translateY,
        rotate: rotation,
        scale: combinedScale,
        zIndex: 2147483647,
        pointerEvents: 'none',
        willChange: 'transform',
        opacity: iframeActive ? 0 : 1,
        ...style,
      }}
    >
      {cursorElement}
    </motion.div>
  )
}
