'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { LanguageGlobe } from '@/components/ui/LanguageGlobe'
import { ArrowDown, ArrowUpRight, FileText, X } from 'lucide-react'

const ParticleField = dynamic(
  () => import('@/components/three/ParticleField').then(m => m.ParticleField),
  { ssr: false }
)

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

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
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

export function MobileLayout() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [cvOpen, setCvOpen] = useState(false)
  const ref = useRef(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [projectDirection, setProjectDirection] = useState(1)
  const touchStartX = useRef<number | null>(null)

  const projects = [
    {
      id: 'jiraffic',
      year: '2026',
      type: 'Full Stack App',
      title: 'Jiraffic',
      descKey: 'jiraffic_desc',
      stack: ['Next.js 15', 'TypeScript', 'Supabase', 'Gemini AI'],
      demo: 'https://jiraffic.vercel.app',
      github: 'https://github.com/edoardogenovese/jiraffic',
      accent: '#7c3aed',
    },
    {
      id: 'portfolio',
      year: '2026',
      type: 'Portfolio',
      title: 'Portfolio',
      descKey: 'portfolio_desc',
      stack: ['Three.js', 'Framer Motion', 'Next.js 15'],
      github: 'https://github.com/edoardogenovese/personal-portfolio',
      accent: '#f59e0b',
    },
    {
      id: 'wip',
      year: '???',
      type: 'TBD',
      title: 'Next Project',
      descKey: 'wip_desc',
      stack: [],
      accent: 'rgba(255,255,255,0.1)',
      wip: true,
    },
  ]

  function goNextProject() {
    setProjectDirection(1)
    setCurrentProject(c => (c + 1) % projects.length)
  }

  function goPrevProject() {
    setProjectDirection(-1)
    setCurrentProject(c => (c - 1 + projects.length) % projects.length)
  }

  const projectVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

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
  ]

  const stats = [
    { value: 3, suffix: '+', label: t.about.stat_years, onClick: undefined },
    { value: 10, suffix: '+', label: t.about.stat_stack, onClick: undefined },
    { value: null, suffix: '', label: 'CV', onClick: () => setCvOpen(true) },
  ]

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
        <span className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase">EG</span>
        <LanguageGlobe />
      </nav>

      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
          <ParticleField />
        </div>
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.9) 100%)',
          }}
        />

        <div className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs font-semibold tracking-[0.4em] text-white/30 uppercase mb-6"
          >
            {t.hero.role}
          </motion.div>

          <h1 className="text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {'Edoardo\nGenovese'.split('\n').map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.5 + li * 0.15,
                    duration: 0.7,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-white/25 text-xs tracking-[0.2em] uppercase mb-10"
          >
            {t.hero.stack}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col gap-3"
          >
            <a
              href="#projects-mobile"
              className="px-8 py-3 bg-white text-black rounded-full text-sm font-semibold"
            >
              {t.hero.cta_work}
            </a>
            <a
              href="#contact-mobile"
              className="px-8 py-3 border border-white/20 rounded-full text-sm text-white/60"
            >
              {t.hero.cta_contact}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      <section className="px-6 py-20 border-t border-white/5">
        <FadeIn>
          <div className="text-xs font-semibold tracking-[0.4em] text-white/20 uppercase mb-8 flex items-center gap-3">
            <span>01</span>
            <div className="w-8 h-px bg-white/20" />
            <span>{t.nav.about}</span>
          </div>
        </FadeIn>
        <div>
          {[t.about.bio1, t.about.bio2, t.about.bio3, t.about.bio4].map((bio, i) => (
            <FadeIn key={i}>
              <motion.p
                className={`text-white/40 text-base leading-relaxed ${i < 3 ? 'mb-5' : ''}`}
              >
                {bio}
              </motion.p>
            </FadeIn>
          ))}
        </div>
        {cvOpen && <CVDialog onClose={() => setCvOpen(false)} />}
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mb-10">
            {stats.map((stat, i) => (
              <div
                key={i}
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
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="text-xs text-white/20 tracking-widest uppercase mb-4">Stack</div>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1.5 border border-white/10 rounded-full text-xs text-white/40"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeIn>
      </section>

      <section id="projects-mobile" className="px-6 py-20 border-t border-white/5">
        <FadeIn>
          <div className="text-xs font-semibold tracking-[0.4em] text-white/20 uppercase mb-8 flex items-center gap-3">
            <span>02</span>
            <div className="w-8 h-px bg-white/20" />
            <span>{t.nav.work}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            style={{ perspective: '600px' }}
            onTouchStart={e => {
              touchStartX.current = e.touches[0].clientX
            }}
            onTouchEnd={e => {
              if (touchStartX.current === null) return
              const diff = touchStartX.current - e.changedTouches[0].clientX
              if (Math.abs(diff) < 40) return
              if (diff > 0) goNextProject()
              else goPrevProject()
              touchStartX.current = null
            }}
          >
            <AnimatePresence mode="wait" custom={projectDirection}>
              <motion.div
                key={currentProject}
                custom={projectDirection}
                variants={projectVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.6,
                  ease: [0.645, 0.045, 0.355, 1],
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`relative border rounded-2xl overflow-hidden ${
                  projects[currentProject].wip ? 'border-dashed border-white/5' : 'border-white/5'
                }`}
              >
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${projects[currentProject].accent}, transparent 70%)`,
                  }}
                />

                <div className="relative p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {projects[currentProject].wip ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-1.5 h-1.5 rounded-full bg-white/30"
                        />
                        <span className="text-xs text-white/20 tracking-widest uppercase">
                          Work in progress
                        </span>
                      </div>
                    ) : (
                      <>
                        <span className="text-xs text-white/20">
                          {projects[currentProject].year}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-xs text-white/20 uppercase tracking-widest">
                          {projects[currentProject].type}
                        </span>
                      </>
                    )}
                  </div>

                  <h3
                    className="text-2xl font-bold tracking-tight mb-3"
                    style={{
                      color: projects[currentProject].wip ? 'rgba(255,255,255,0.15)' : '#fff',
                    }}
                  >
                    {projects[currentProject].title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{
                      color: projects[currentProject].wip
                        ? 'rgba(255,255,255,0.1)'
                        : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {(t.projects as any)[projects[currentProject].descKey]}
                  </p>

                  {!projects[currentProject].wip && projects[currentProject].stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {projects[currentProject].stack.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 border border-white/10 rounded-full text-xs text-white/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {!projects[currentProject].wip && (
                    <div className="flex gap-3">
                      {projects[currentProject].demo && (
                        <a
                          href={projects[currentProject].demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-5 py-2 bg-white text-black rounded-full text-xs font-semibold flex-1 justify-center"
                        >
                          {t.projects.live_demo}
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                      {projects[currentProject].github && (
                        <a
                          href={projects[currentProject].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-5 py-2 border border-white/20 text-white/60 rounded-full text-xs font-semibold flex-1 justify-center"
                        >
                          GitHub
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: projects[currentProject].accent }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {' '}
          <div className="flex items-center justify-center gap-2 mt-5 h-4">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setProjectDirection(i > currentProject ? 1 : -1)
                  setCurrentProject(i)
                }}
                animate={{
                  width: i === currentProject ? 16 : 4,
                  opacity: i === currentProject ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className="h-1 rounded-full bg-white shrink-0"
                style={{ minWidth: '4px' }}
              />
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-white/15 tracking-widest mt-3"
          >
            swipe to navigate
          </motion.p>
        </FadeIn>
      </section>

      <section id="contact-mobile" className="px-6 py-20 border-t border-white/5">
        <FadeIn>
          <div className="text-xs font-semibold tracking-[0.4em] text-white/20 uppercase mb-8 flex items-center gap-3">
            <span>03</span>
            <div className="w-8 h-px bg-white/20" />
            <span>{t.nav.contact}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4 leading-tight">
            {t.contact.title}
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-white/40 text-sm leading-relaxed mb-8">{t.contact.subtitle}</p>
        </FadeIn>

        <div className="flex flex-col gap-3 mb-12">
          {[
            { label: 'GitHub', href: 'https://github.com/edoardogenovese' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/edoardogenovese' },
            { label: 'Email', href: 'mailto:genovese.edo4rdo@gmail.com' },
          ].map((link, i) => (
            <FadeIn key={link.label} delay={0.3 + i * 0.1}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 border border-white/5 rounded-xl text-sm text-white/50"
              >
                {link.label}
                <span>
                  <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                </span>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          {status === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: 2, duration: 0.4 }}
                className="text-4xl"
              >
                ✉️
              </motion.div>
              <h3 className="text-xl font-bold text-white">{t.contact.sent_title}</h3>
              <p className="text-white/40 text-sm">{t.contact.sent_subtitle}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
              {[
                { key: 'name', type: 'text', label: t.contact.field_name },
                { key: 'email', type: 'email', label: t.contact.field_email },
              ].map(field => (
                <div key={field.key} className="flex flex-col gap-2">
                  <label className="text-xs text-white/30 tracking-widest uppercase">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/30 tracking-widest uppercase">
                  {t.contact.field_message}
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.97 }}
                className="mt-2 px-8 py-4 bg-white text-black rounded-full text-sm font-semibold disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    {t.contact.sending}
                  </motion.span>
                ) : (
                  t.contact.send
                )}
              </motion.button>
              {status === 'error' && (
                <p className="text-xs text-red-400 text-center mt-2">
                  Something went wrong. Try emailing me directly.
                </p>
              )}
            </form>
          )}
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="pt-8 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-white/20">© 2026 Edoardo Genovese</span>
            <span className="text-xs text-white/20">Next.js + Three.js</span>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
