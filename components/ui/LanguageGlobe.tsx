'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'

function Globe({ isSpinning }: { isSpinning: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const rotationRef = useRef(0)

  useFrame(() => {
    if (!groupRef.current) return
    if (isSpinning) {
      rotationRef.current += 0.12
    } else {
      rotationRef.current += 0.005
    }
    groupRef.current.rotation.y = rotationRef.current
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.88, 32, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.01, 8, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

export function LanguageGlobe() {
  const { locale, setLocale } = useLanguage()
  const [isSpinning, setIsSpinning] = useState(false)

  function handleToggle() {
    if (isSpinning) return
    setIsSpinning(true)
    setTimeout(() => {
      setLocale(locale === 'en' ? 'it' : 'en')
      setIsSpinning(false)
    }, 600)
  }

  return (
    <button onClick={handleToggle} className="relative w-12 h-12 cursor-none">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Globe isSpinning={isSpinning} />
      </Canvas>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={locale}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="text-white text-xs font-bold tracking-widest"
          >
            {locale.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </div>
    </button>
  )
}
