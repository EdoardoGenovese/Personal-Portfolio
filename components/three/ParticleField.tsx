'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const meshRef = useRef<THREE.Points>(null)
  const { size } = useThree()
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
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1
      } else if (t < 0.7) {
        colors[i * 3] = 0.47; colors[i * 3 + 1] = 0.71; colors[i * 3 + 2] = 1
      } else {
        colors[i * 3] = 0.78; colors[i * 3 + 1] = 0.55; colors[i * 3 + 2] = 1
      }
    }
    return { positions, colors }
  }, [])

  useFrame((state) => {
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
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function GeometryShapes() {
  const torusRef = useRef<THREE.Mesh>(null)
  const icosaRef = useRef<THREE.Mesh>(null)
  const octaRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2
      torusRef.current.rotation.y = t * 0.3
      torusRef.current.position.x = Math.sin(t * 0.3) * 3
      torusRef.current.position.y = Math.cos(t * 0.2) * 1.5
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.x = t * 0.15
      icosaRef.current.rotation.z = t * 0.25
      icosaRef.current.position.x = Math.sin(t * 0.2 + 2) * 4
      icosaRef.current.position.y = Math.cos(t * 0.3 + 1) * 2
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = t * 0.4
      octaRef.current.rotation.x = t * 0.2
      octaRef.current.position.x = Math.sin(t * 0.25 + 4) * 3.5
      octaRef.current.position.y = Math.cos(t * 0.15 + 3) * 1.8
    }
  })

  const wireMaterial = (color: string) => (
    <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
  )

  return (
    <>
      <mesh ref={torusRef} position={[3, 1, -3]}>
        <torusGeometry args={[0.8, 0.3, 16, 32]} />
        {wireMaterial('#7850ff')}
      </mesh>
      <mesh ref={icosaRef} position={[-4, -1, -4]}>
        <icosahedronGeometry args={[0.8, 1]} />
        {wireMaterial('#4fa3ff')}
      </mesh>
      <mesh ref={octaRef} position={[4, -2, -2]}>
        <octahedronGeometry args={[0.7]} />
        {wireMaterial('#ff78c8')}
      </mesh>
    </>
  )
}

export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 75 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Particles />
      <GeometryShapes />
    </Canvas>
  )
}