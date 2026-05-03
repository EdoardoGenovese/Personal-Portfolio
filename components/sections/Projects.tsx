'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { globalMousePos } from '@/components/ui/CustomCursor'

interface Project {
  id: string
  year: string
  type: string
  title: string
  descKey: string
  stack: string[]
  demo?: string
  github?: string
  accent: string
  wip?: boolean
}

const projects: Project[] = [
  {
    id: 'jiraffic',
    year: '2026',
    type: 'Full Stack App',
    title: 'Jiraffic',
    descKey: 'jiraffic_desc',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Clerk', 'Gemini AI'],
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
    stack: ['Three.js', 'Framer Motion', 'Next.js 15', 'TypeScript'],
    github: 'https://github.com/edoardogenovese/portfolio',
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

export function Projects() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isInView || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const { x, y } = globalMousePos
    setIsHovered(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
  }, [isInView])

  function goNext() {
    setDirection(1)
    setCurrent(c => (c + 1) % projects.length)
  }

  function goPrev() {
    setDirection(-1)
    setCurrent(c => (c - 1 + projects.length) % projects.length)
  }

  const project = projects[current]

  const variants = {
    enter: (dir: number) => ({
      rotateX: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.92,
      z: -100,
    }),
    center: {
      rotateX: 0,
      opacity: 1,
      scale: 1,
      z: 0,
    },
    exit: (dir: number) => ({
      rotateX: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.92,
      z: -100,
    }),
  }

  return (
    <section
      id="work"
      ref={ref}
      className="relative min-h-screen bg-black px-6 py-32 overflow-hidden"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        animate={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)` }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.4em] text-white/20 uppercase">03</span>
          <div className="w-12 h-px bg-white/20" />
          <span className="text-xs font-semibold tracking-[0.4em] text-white/20 uppercase">
            {t.nav.work}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ perspective: '1200px' }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              ref={cardRef}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.6,
                ease: [0.645, 0.045, 0.355, 1],
              }}
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`relative border rounded-2xl overflow-hidden cursor-none ${
                project.wip ? 'border-dashed border-white/5' : 'border-white/5'
              }`}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: isHovered && !project.wip ? 1 : 0,
                  background: `radial-gradient(ellipse at 20% 50%, ${project.accent}20, transparent 60%)`,
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    {project.wip ? (
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
                        <span className="text-xs text-white/20 tracking-widest">
                          {project.year}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-xs text-white/20 tracking-widest uppercase">
                          {project.type}
                        </span>
                      </>
                    )}
                  </div>

                  <h3
                    className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
                    style={{ color: project.wip ? 'rgba(255,255,255,0.15)' : '#fff' }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="text-base leading-relaxed mb-6 max-w-lg"
                    style={{
                      color: project.wip ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {(t.projects as any)[project.descKey]}
                  </p>

                  {!project.wip && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.map(tech => (
                        <span
                          key={tech}
                          className="px-3 py-1 border border-white/10 rounded-full text-xs text-white/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {!project.wip && (
                    <div className="flex items-center gap-3">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full text-xs font-semibold hover:bg-white/90 transition-all cursor-none"
                        >
                          {t.projects.live_demo}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white/60 rounded-full text-xs font-semibold hover:text-white hover:border-white/40 transition-all cursor-none"
                        >
                          GitHub
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {!project.wip && (t.projects as any)[project.id + '_features'] && (
                  <div className="sm:w-56 flex flex-col gap-2.5 justify-center">
                    {((t.projects as any)[project.id + '_features'] as string[]).map(
                      (feature, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            opacity: isHovered ? 1 : 0.3,
                            x: isHovered ? 0 : 8,
                          }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          className="flex items-center gap-3 text-xs text-white/50"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                          {feature}
                        </motion.div>
                      )
                    )}
                  </div>
                )}
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-px"
                style={{ background: project.accent }}
                animate={{ width: isHovered && !project.wip ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <button
            onClick={goPrev}
            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all cursor-none"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2 items-center">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1)
                  setCurrent(i)
                }}
                animate={{
                  width: i === current ? 16 : 4,
                  opacity: i === current ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className="h-1 rounded-full bg-white cursor-none"
                style={{ minWidth: '4px' }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all cursor-none"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
