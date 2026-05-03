'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ArrowDown, FileText, X } from 'lucide-react'

function CVDialog({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Curriculum Vitae</h3>
                <p className="text-xs text-white/30 mt-0.5">{t.about.cv_choose}</p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-all cursor-none"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-3 flex flex-col gap-2">
            {[
              { lang: 'IT', label: 'Italiano', href: '/cv-edoardo-genovese-it.pdf', delay: 0.05 },
              { lang: 'EN', label: 'English', href: '/cv-edoardo-genovese-en.pdf', delay: 0.1 },
            ].map(cv => (
              <motion.a
                key={cv.lang}
                href={cv.href}
                download
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: cv.delay }}
                onClick={onClose}
                className="group flex items-center justify-between px-4 py-4 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 cursor-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-xs font-bold text-white/40 group-hover:text-white group-hover:border-white/30 transition-all">
                    {cv.lang}
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                    {cv.label}
                  </span>
                </div>
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: cv.delay }}
                  className="text-white/20 group-hover:text-white transition-colors"
                >
                  <ArrowDown className="w-5 h-5 text-white/40" />
                </motion.span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}>
      <motion.span
        initial={{ innerText: 0 } as any}
        animate={isInView ? ({ innerText: value } as any) : {}}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        onUpdate={(latest: any) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest.innerText) + suffix
          }
        }}
      >
        0{suffix}
      </motion.span>
    </motion.span>
  )
}

export function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [cvOpen, setCvOpen] = useState(false)

  const skills = [
    'React',
    'TypeScript',
    'Next.js',
    'Zustand',
    'TanStack Query',
    'Angular',
    'Node.js',
    'GraphQL',
    'Tailwind CSS',
    'Storybook',
    'Cypress',
    'Playwright',
  ]

  const stats = [
    { value: 3, suffix: '+', label: t.about.stat_years, onClick: undefined },
    { value: 10, suffix: '+', label: t.about.stat_stack, onClick: undefined },
    { value: null, suffix: '', label: 'CV', onClick: () => setCvOpen(true) },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen bg-black px-6 py-32 overflow-hidden"
    >
      {cvOpen && <CVDialog onClose={() => setCvOpen(false)} />}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.4em] text-white/20 uppercase">02</span>
          <div className="w-12 h-px bg-white/20" />
          <span className="text-xs font-semibold tracking-[0.4em] text-white/20 uppercase">
            {t.nav.about}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            {[t.about.bio1, t.about.bio2, t.about.bio3, t.about.bio4].map((bio, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
                className={`text-white/40 text-base leading-relaxed ${i < 3 ? 'mb-5' : ''}`}
              >
                {bio}
              </motion.p>
            ))}
          </div>

          <div className="flex flex-col gap-12">
            <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  onClick={stat.onClick}
                  className={`bg-black px-6 py-8 text-center flex flex-col items-center justify-center gap-2 ${stat.onClick ? 'cursor-none hover:bg-white/[0.03] transition-colors group' : ''}`}
                >
                  {stat.value !== null ? (
                    <div className="text-4xl font-bold text-white">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </div>
                  ) : (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="text-3xl text-white/40 group-hover:text-white transition-colors duration-300"
                    >
                      <FileText className="w-7 h-7 text-white/40 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  )}
                  <div className="text-xs text-white/30 tracking-widest uppercase group-hover:text-white/60 transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <div className="text-xs text-white/20 tracking-widest uppercase mb-4">Stack</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.04 }}
                    className="px-3 py-1.5 border border-white/10 rounded-full text-xs text-white/50 hover:text-white hover:border-white/30 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
