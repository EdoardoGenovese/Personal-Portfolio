'use client'

import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import { FullPageScroll } from '@/components/ui/FullPageScroll'
import { FullPageProvider } from '@/lib/FullPageContext'
import { MobileLayout } from '@/components/mobile/MobileLayout'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

export function PageWrapper() {
  const isMobile = useIsMobile()

  const sections = [
    <Hero key="hero" />,
    <About key="about" />,
    <Projects key="projects" />,
    <Contact key="contact" />,
  ]

  if (isMobile) {
    return <MobileLayout />
  }

  return (
    <FullPageProvider sectionsCount={sections.length}>
      <CustomCursor />
      <Navbar />
      <FullPageScroll sections={sections} />
    </FullPageProvider>
  )
}
