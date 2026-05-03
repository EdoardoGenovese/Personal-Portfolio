'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface FullPageContextType {
  current: number
  goTo: (index: number) => void
  setCurrent: (index: number) => void
  setDirection: (direction: number) => void
}

export const FullPageContext = createContext<FullPageContextType>({
  current: 0,
  goTo: () => {},
  setCurrent: () => {},
  setDirection: () => {},
})

export function useFullPage() {
  return useContext(FullPageContext)
}

export function FullPageProvider({
  children,
  sectionsCount,
}: {
  children: React.ReactNode
  sectionsCount: number
}) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index < 0 || index >= sectionsCount) return
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 900)
    },
    [isAnimating, current, sectionsCount]
  )

  return (
    <FullPageContext.Provider value={{ current, goTo, setCurrent, setDirection }}>
      {children}
    </FullPageContext.Provider>
  )
}
