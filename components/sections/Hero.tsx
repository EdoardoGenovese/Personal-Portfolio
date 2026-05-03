'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useFullPage } from '@/lib/FullPageContext'
import { ArrowDown } from 'lucide-react'

const ParticleField = dynamic(
  () => import('@/components/three/ParticleField').then(m => m.ParticleField),
  { ssr: false }
)

const letters = 'Edoardo Genovese'.split('')

export function Hero() {
  const { goTo } = useFullPage()
  const { t } = useLanguage()

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xs font-semibold tracking-[0.4em] text-white/40 uppercase mb-8"
        >
          {t.hero.role}
        </motion.div>

        <h1 className="text-6xl sm:text-8xl font-bold tracking-tight mb-6 overflow-hidden">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + i * 0.04,
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
              style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-white/30 text-sm tracking-[0.2em] uppercase mb-12"
        >
          {t.hero.stack}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex items-center gap-6"
        >
          <button
            onClick={() => goTo(2)}
            className="px-8 py-3 border border-white/20 rounded-full text-sm text-white/70 hover:text-white hover:border-white/60 transition-all duration-300 cursor-none"
          >
            {t.hero.cta_work}
          </button>
          <button
            onClick={() => goTo(3)}
            className="px-8 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-all duration-300 cursor-none"
          >
            {t.hero.cta_contact}
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/20 tracking-widest uppercase">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  )
}
