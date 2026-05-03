'use client'

import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
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

interface PlanetProps {
  position: [number, number, number]
  color: string
  label: string
  size: number
  orbitSpeed: number
  rotationSpeed: number
  orbitRadius: number
  orbitOffset: number
}

import { useTexture } from '@react-three/drei'

function Planet({
  position,
  color,
  label,
  size,
  orbitSpeed,
  rotationSpeed,
  orbitRadius,
  orbitOffset,
}: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null)
  const planetRef = useRef<THREE.Mesh>(null)

  const textureUrls: Record<string, string> = {
    React: '/textures/2k_earth_daymap.jpg',
    TypeScript: '/textures/2k_moon.jpg',
    'Next.js': '/textures/2k_mars.jpg',
    Angular: '/textures/2k_jupiter.jpg',
  }

  const texture = useTexture(textureUrls[label] ?? textureUrls['React'])

  useFrame(state => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.x = Math.sin(t * orbitSpeed + orbitOffset) * orbitRadius
      groupRef.current.position.z = Math.cos(t * orbitSpeed + orbitOffset) * orbitRadius * 0.4
      groupRef.current.position.y = position[1] + Math.sin(t * 0.3 + orbitOffset) * 0.3
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += rotationSpeed * 0.016
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.7} metalness={0.1} />
        <Text
          position={[0, 0, size + 0.01]}
          fontSize={size * 0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {label}
        </Text>
      </mesh>
    </group>
  )
}

const planets: PlanetProps[] = [
  {
    position: [-3, 1.5, -2],
    color: '#61dafb',
    label: 'React',
    size: 0.55,
    orbitSpeed: 0.18,
    rotationSpeed: 0.4,
    orbitRadius: 3.5,
    orbitOffset: 0,
  },
  {
    position: [3.5, -1, -1],
    color: '#3178c6',
    label: 'TypeScript',
    size: 0.5,
    orbitSpeed: 0.14,
    rotationSpeed: 0.3,
    orbitRadius: 4,
    orbitOffset: Math.PI / 2,
  },
  {
    position: [-2, -2, -3],
    color: '#e8e8e8',
    label: 'Next.js',
    size: 0.48,
    orbitSpeed: 0.22,
    rotationSpeed: 0.5,
    orbitRadius: 3,
    orbitOffset: Math.PI,
  },
  {
    position: [2.5, 2, -2],
    color: '#dd1b16',
    label: 'Angular',
    size: 0.45,
    orbitSpeed: 0.16,
    rotationSpeed: 0.35,
    orbitRadius: 3.8,
    orbitOffset: Math.PI * 1.5,
  },
]

export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 3, 5]} intensity={2} />
        <pointLight position={[-8, -5, -8]} intensity={0.3} color="#1a3aff" />
        <Particles />
        {planets.map(planet => (
          <Planet key={planet.label} {...planet} />
        ))}
      </Suspense>
    </Canvas>
  )
}
