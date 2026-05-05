'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { LanguageGlobe } from '@/components/ui/LanguageGlobe'
import { useFullPage } from '@/lib/FullPageContext'

const sectionMap = {
  work: 2,
  about: 1,
  contact: 3,
}

export function Navbar() {
  const { t } = useLanguage()
  const { goTo } = useFullPage()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
    >
      <button
        onClick={() => goTo(0)}
        className="text-xs font-semibold tracking-[0.3em] text-white/30 uppercase cursor-none hover:text-white transition-colors"
      >
        EG
      </button>

      <div className="flex items-center gap-8">
        {(['about', 'work', 'contact'] as const).map(key => (
          <button
            key={key}
            onClick={() => goTo(sectionMap[key])}
            className="text-xs text-white/30 hover:text-white tracking-widest uppercase transition-colors duration-300 cursor-none"
          >
            {t.nav[key]}
          </button>
        ))}
        <LanguageGlobe />
      </div>
    </motion.nav>
  )
}
