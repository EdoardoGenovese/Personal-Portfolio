'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const globalMousePos = { x: 0, y: 0 }

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailX = useMotionValue(-100)
  const trailY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const trailSpringConfig = { damping: 35, stiffness: 150 }

  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)
  const trailSpringX = useSpring(trailX, trailSpringConfig)
  const trailSpringY = useSpring(trailY, trailSpringConfig)

  const isHovering = useRef(false)

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      globalMousePos.x = e.clientX
      globalMousePos.y = e.clientY

      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)
    }

    function onMouseEnter() {
      isHovering.current = true
    }
    function onMouseLeave() {
      isHovering.current = false
    }

    window.addEventListener('mousemove', onMouseMove)

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [cursorX, cursorY, trailX, trailY])

  return (
    <>
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <motion.div
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none z-[9998] mix-blend-difference"
      />
    </>
  )
}
