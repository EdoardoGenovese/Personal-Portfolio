'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useFullPage } from '@/lib/FullPageContext'

interface FullPageScrollProps {
  sections: React.ReactNode[]
}

export function FullPageScroll({ sections }: FullPageScrollProps) {
  const { current, goTo } = useFullPage()
  const touchStart = useRef<number | null>(null)
  const lastScroll = useRef(0)
  const currentRef = useRef(current)
  const directionRef = useRef(0)

  useEffect(() => {
    currentRef.current = current
  }, [current])

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const now = Date.now()
      if (now - lastScroll.current < 800) return
      lastScroll.current = now
      if (e.deltaY > 0) {
        directionRef.current = 1
        goTo(currentRef.current + 1)
      } else {
        directionRef.current = -1
        goTo(currentRef.current - 1)
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        directionRef.current = 1
        goTo(currentRef.current + 1)
      }
      if (e.key === 'ArrowUp') {
        directionRef.current = -1
        goTo(currentRef.current - 1)
      }
    }

    function onTouchStart(e: TouchEvent) {
      touchStart.current = e.touches[0].clientY
    }

    function onTouchEnd(e: TouchEvent) {
      if (touchStart.current === null) return
      const diff = touchStart.current - e.changedTouches[0].clientY
      if (Math.abs(diff) < 50) return
      if (diff > 0) {
        directionRef.current = 1
        goTo(currentRef.current + 1)
      } else {
        directionRef.current = -1
        goTo(currentRef.current - 1)
      }
      touchStart.current = null
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [goTo])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence custom={directionRef.current} mode="wait">
        <motion.div
          key={current}
          custom={directionRef.current}
          initial={{
            opacity: 0,
            rotateX: directionRef.current > 0 ? 15 : -15,
            scale: 0.95,
            z: -200,
          }}
          animate={{
            opacity: 1,
            rotateX: 0,
            scale: 1,
            z: 0,
          }}
          exit={{
            opacity: 0,
            rotateX: directionRef.current > 0 ? -15 : 15,
            scale: 0.95,
            z: -200,
          }}
          transition={{
            duration: 0.7,
            ease: [0.645, 0.045, 0.355, 1.0],
          }}
          style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
          className="absolute inset-0 overflow-y-auto"
        >
          {sections[current]}
        </motion.div>
      </AnimatePresence>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              directionRef.current = i > current ? 1 : -1
              goTo(i)
            }}
            className="cursor-none flex items-center justify-end gap-2"
          >
            <motion.div
              animate={{ width: current === i ? 20 : 4, opacity: current === i ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="h-px bg-white rounded-full"
            />
            <motion.div
              animate={{ scale: current === i ? 1 : 0.6, opacity: current === i ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="w-1.5 h-1.5 rounded-full bg-white shrink-0"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
