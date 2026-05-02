'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ArrowUpRight } from 'lucide-react'
import { globalMousePos } from '../ui/CustomCursor'

const projects = [
  {
    id: 'jiraffic',
    year: '2026',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Clerk', 'Gemini AI'],
    demo: 'https://jiraffic.vercel.app',
    github: 'https://github.com/edoardogenovese/jiraffic',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    accent: '#7c3aed',
  },
]

function ProjectCard({ project, isInView }: { project: typeof projects[0]; isInView: boolean }) {
  const { t } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
  if (!isInView || !cardRef.current) return
  const rect = cardRef.current.getBoundingClientRect()
  const { x, y } = globalMousePos
  const hovering = x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
  setIsHovered(hovering)
}, [isInView])

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="relative border border-white/5 rounded-2xl overflow-hidden cursor-none"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative p-8 sm:p-12">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-white/20 tracking-widest">{project.year}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-xs text-white/20 tracking-widest uppercase">
                {t.projects.type}
              </span>
            </div>

            <h3 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Jiraffic
            </h3>

            <p className="text-white/40 text-base leading-relaxed max-w-xl mb-6">
              {t.projects.jiraffic_desc}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 border border-white/10 rounded-full text-xs text-white/40"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full text-xs font-semibold hover:bg-white/90 transition-all duration-300 cursor-none"
              >
                {t.projects.live_demo}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white/60 rounded-full text-xs font-semibold hover:text-white hover:border-white/40 transition-all duration-300 cursor-none"
              >
                GitHub
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Feature list */}
          <div className="sm:w-64 flex flex-col gap-3">
            {(t.projects.jiraffic_features as string[]).map((feature, i) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{ background: project.accent }}
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

export function Projects() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="work" ref={ref} className="relative min-h-screen bg-black px-6 py-32 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
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

        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}