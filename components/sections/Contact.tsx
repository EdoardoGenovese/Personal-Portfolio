'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ArrowUpRight } from 'lucide-react'

export function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  let currentDate = new Date();
let year = currentDate.getFullYear();

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

  const links = [
    { label: 'GitHub', href: 'https://github.com/edoardogenovese'},
    { label: 'LinkedIn', href: 'https://linkedin.com/in/edoardogenovese'},
    { label: 'Email', href: 'mailto:genovese.edo4rdo@gmail.com'},
  ]

  return (
    <section id="contact" ref={ref} className="relative min-h-screen bg-black px-6 py-32 overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10"
        style={{ background: 'radial-gradient(ellipse at center bottom, #4f46e5, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.4em] text-white/20 uppercase">04</span>
          <div className="w-12 h-px bg-white/20" />
          <span className="text-xs font-semibold tracking-[0.4em] text-white/20 uppercase">
            {t.nav.contact}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
              {t.contact.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/40 text-base leading-relaxed mb-12"
            >
              {t.contact.subtitle}
            </motion.p>

            <div className="flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="group flex items-center justify-between px-6 py-4 border border-white/5 rounded-xl hover:border-white/20 transition-all duration-300 cursor-none"
                >
                  <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                  <motion.span
                    className="text-white/20 group-hover:text-white transition-colors"
                    whileHover={{ x: 4, y: -4 }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-4 py-20"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: 2, duration: 0.4 }}
                  className="text-5xl"
                >
                  ✉️
                </motion.div>
                <h3 className="text-2xl font-bold text-white">{t.contact.sent_title}</h3>
                <p className="text-white/40 text-sm">{t.contact.sent_subtitle}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { key: 'name', type: 'text', label: t.contact.field_name },
                  { key: 'email', type: 'email', label: t.contact.field_email },
                ].map((field) => (
                  <div key={field.key} className="flex flex-col gap-2">
                    <label className="text-xs text-white/30 tracking-widest uppercase">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors cursor-none"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/30 tracking-widest uppercase">
                    {t.contact.field_message}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none cursor-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 px-8 py-4 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-all duration-300 cursor-none disabled:opacity-50"
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
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        className="relative max-w-6xl mx-auto mt-32 pt-8 border-t border-white/5 flex items-center justify-between"
      >
        <span className="text-xs text-white/20 tracking-widest">
          © {year} Edoardo Genovese
        </span>
        <span className="text-xs text-white/20 tracking-widest">
          Built with Next.js + Three.js
        </span>
      </motion.div>
    </section>
  )
}