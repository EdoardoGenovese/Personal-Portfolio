'use client'

import { useTexture } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const { positions, colors } = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      const t = Math.random()
      if (t < 0.4) {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      } else if (t < 0.7) {
        colors[i * 3] = 0.47
        colors[i * 3 + 1] = 0.71
        colors[i * 3 + 2] = 1
      } else {
        colors[i * 3] = 0.78
        colors[i * 3 + 1] = 0.55
        colors[i * 3 + 2] = 1
      }
    }
    return { positions, colors }
  }, [])

  useFrame(state => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.03 + mouse.current.x * 0.1
    meshRef.current.rotation.x = t * 0.015 + mouse.current.y * 0.05
    const posArray = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < posArray.length; i += 3) {
      posArray[i + 1] += Math.sin(t * 0.5 + posArray[i] * 0.3) * 0.001
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

interface LogoProps {
  texturePath: string
  color: string
  orbitRadius: number
  orbitSpeed: number
  orbitOffset: number
  verticalOffset: number
  size: number
}

function TechLogo({
  texturePath,
  color,
  orbitRadius,
  orbitSpeed,
  orbitOffset,
  verticalOffset,
  size,
}: LogoProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  const texture = useTexture(texturePath)

  useFrame(state => {
    const t = state.clock.getElapsedTime()
    if (!groupRef.current || !meshRef.current) return

    groupRef.current.position.x = Math.sin(t * orbitSpeed + orbitOffset) * orbitRadius
    groupRef.current.position.z = Math.cos(t * orbitSpeed + orbitOffset) * orbitRadius * 0.5
    groupRef.current.position.y = verticalOffset + Math.sin(t * 0.4 + orbitOffset) * 0.4

    meshRef.current.rotation.y += 0.01
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.01}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

const logos: LogoProps[] = [
  {
    texturePath: '/logos/react.png',
    color: '#61dafb',
    orbitRadius: 3.5,
    orbitSpeed: 0.2,
    orbitOffset: 0,
    verticalOffset: 1.2,
    size: 0.7,
  },
  {
    texturePath: '/logos/nextjs.png',
    color: '#ffffff',
    orbitRadius: 4,
    orbitSpeed: 0.15,
    orbitOffset: Math.PI / 2,
    verticalOffset: -0.8,
    size: 0.65,
  },
  {
    texturePath: '/logos/nodejs.png',
    color: '#539e43',
    orbitRadius: 3.2,
    orbitSpeed: 0.25,
    orbitOffset: Math.PI,
    verticalOffset: 0.3,
    size: 0.65,
  },
  {
    texturePath: '/logos/angular.png',
    color: '#dd1b16',
    orbitRadius: 3.8,
    orbitSpeed: 0.18,
    orbitOffset: Math.PI * 1.5,
    verticalOffset: -1.5,
    size: 0.6,
  },
  {
    texturePath: '/logos/typescript.png',
    color: '#3178c6',
    orbitRadius: 4.2,
    orbitSpeed: 0.22,
    orbitOffset: Math.PI * 0.75,
    verticalOffset: 1.8,
    size: 0.6,
  },
]

export function ParticleField() {
  return (
    <Suspense fallback="Loading">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
        {logos.map(logo => (
          <TechLogo key={logo.texturePath} {...logo} />
        ))}
      </Canvas>
    </Suspense>
  )
}
