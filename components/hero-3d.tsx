"use client"

import type React from "react"
import { Suspense, useRef, useMemo, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const m4 = new THREE.Matrix4()
const v3 = new THREE.Vector3()
const euler = new THREE.Euler()

// main orb
function CoffeeSphere({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }> }) {
  const mesh = useRef<THREE.Mesh>(null)
  const pulseRef = useRef(0)

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime

    const vel = Math.sqrt(mouse.current.vx ** 2 + mouse.current.vy ** 2)
    pulseRef.current = THREE.MathUtils.lerp(pulseRef.current, vel * 0.5, 0.1)

    const scale = 1 + Math.sin(t * 0.5) * 0.03 + pulseRef.current * 0.1
    mesh.current.scale.setScalar(scale)

    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, mouse.current.y * 0.2, 0.05)
    mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, -mouse.current.x * 0.2, 0.05)
    mesh.current.rotation.y = t * 0.1
  })

  return (
    <mesh ref={mesh} position={[0, -0.5, 0]}>
      <sphereGeometry args={[1.8, 16, 16]} />
      <meshStandardMaterial color="#1a0f0a" roughness={0.1} metalness={0.8} envMapIntensity={1.5} />
    </mesh>
  )
}

// orbit rings
function TorusRings({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }> }) {
  const group = useRef<THREE.Group>(null)
  const rotRef = useRef(0)

  useFrame(() => {
    if (!group.current) return

    const stir = mouse.current.vx * 0.5 - mouse.current.vy * 0.3
    rotRef.current = THREE.MathUtils.lerp(rotRef.current, stir * 2, 0.02)

    group.current.rotation.y += rotRef.current * 0.05 + 0.003

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.15, 0.03)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -mouse.current.x * 0.15, 0.03)
  })

  return (
    <group ref={group} position={[0, 0.8, 0]}>
      {[1.2, 1.6, 2.0, 2.4, 2.8].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI * 0.5, 0, 0]}>
          <torusGeometry args={[r, 0.015 + i * 0.005, 8, 32]} />
          <meshStandardMaterial
            color="#c4775b"
            roughness={0.4}
            metalness={0.6}
            transparent
            opacity={0.7 - i * 0.1}
            emissive="#c4775b"
            emissiveIntensity={0.2 - i * 0.03}
          />
        </mesh>
      ))}
    </group>
  )
}

// coffee beans orbiting
function BeanOrbits({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }> }) {
  const count = 8
  const mesh = useRef<THREE.InstancedMesh>(null)
  const boostRef = useRef(0)

  const beans = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 2.5 + Math.random() * 1.5,
      height: (Math.random() - 0.5) * 2,
      orbitSpeed: 0.15 + Math.random() * 0.1,
      rotSpeed: new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2),
      rotation: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      scale: 0.2 + Math.random() * 0.15,
      wobble: Math.random() * Math.PI * 2,
    }))
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime

    const stir = mouse.current.vx * 0.8
    boostRef.current = THREE.MathUtils.lerp(boostRef.current, stir, 0.02)

    beans.forEach((bean, i) => {
      const orbitMul = 1 + boostRef.current * 0.5
      bean.angle += bean.orbitSpeed * 0.02 * orbitMul

      const wobbleAmt = Math.abs(boostRef.current) * 0.3
      const x = Math.cos(bean.angle) * bean.radius + Math.sin(t + bean.wobble) * wobbleAmt
      const z = Math.sin(bean.angle) * bean.radius + Math.cos(t + bean.wobble) * wobbleAmt
      const y = bean.height + Math.sin(t * 0.5 + bean.wobble) * 0.2

      bean.rotation.x += bean.rotSpeed.x * 0.01 * (1 + Math.abs(boostRef.current))
      bean.rotation.y += bean.rotSpeed.y * 0.01 * (1 + Math.abs(boostRef.current))
      bean.rotation.z += bean.rotSpeed.z * 0.01

      euler.set(bean.rotation.x, bean.rotation.y, bean.rotation.z)
      m4.makeRotationFromEuler(euler)
      m4.scale(v3.set(bean.scale, bean.scale * 1.6, bean.scale))
      m4.setPosition(x, y, z)
      mesh.current!.setMatrixAt(i, m4)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} castShadow>
      <capsuleGeometry args={[0.5, 0.8, 4, 12]} />
      <meshStandardMaterial color="#2a1810" roughness={0.35} metalness={0.15} />
    </instancedMesh>
  )
}

// steam particles
function SteamParticles({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }> }) {
  const count = 20
  const mesh = useRef<THREE.InstancedMesh>(null)

  const wisps = useMemo(() => {
    return Array.from({ length: count }, () => ({
      baseX: (Math.random() - 0.5) * 2.5,
      baseZ: (Math.random() - 0.5) * 2.5,
      speed: 0.15 + Math.random() * 0.2,
      offset: Math.random() * 20,
      size: 0.06 + Math.random() * 0.1,
      turbulence: new THREE.Vector2(0, 0),
      curl: Math.random() * Math.PI * 2,
    }))
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime

    const mx = mouse.current.x * 4
    const my = mouse.current.y * 4

    wisps.forEach((wisp, i) => {
      const prog = ((t * wisp.speed + wisp.offset) % 6) / 6
      const baseY = -1 + prog * 8

      const curl = prog * 1.5
      let x = wisp.baseX + Math.sin(t * 0.3 + wisp.curl) * curl * 0.4
      const z = wisp.baseZ + Math.cos(t * 0.3 + wisp.curl) * curl * 0.3

      const dx = mx - x
      const dy = my - baseY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 3) {
        const turbStr = (3 - dist) / 3
        const vel = Math.sqrt(mouse.current.vx ** 2 + mouse.current.vy ** 2)

        wisp.turbulence.x = THREE.MathUtils.lerp(
          wisp.turbulence.x,
          mouse.current.vx * turbStr * 2 + Math.sin(t * 4 + i) * vel * 0.5,
          0.08,
        )
        wisp.turbulence.y = THREE.MathUtils.lerp(
          wisp.turbulence.y,
          mouse.current.vy * turbStr * 2 + Math.cos(t * 4 + i) * vel * 0.5,
          0.08,
        )
      } else {
        wisp.turbulence.x *= 0.95
        wisp.turbulence.y *= 0.95
      }

      x += wisp.turbulence.x
      const y = baseY + wisp.turbulence.y * 0.5

      const in1 = Math.min(prog * 4, 1)
      const out1 = 1 - Math.max((prog - 0.7) / 0.3, 0)
      const s = wisp.size * in1 * out1 * (1 + Math.abs(wisp.turbulence.x) * 0.5)

      m4.makeScale(s, s * 2, s)
      m4.setPosition(x, y, z)
      mesh.current!.setMatrixAt(i, m4)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#f5e6d3" transparent opacity={0.08} depthWrite={false} />
    </instancedMesh>
  )
}

// crema surface
function CremaParticles({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }> }) {
  const count = 15
  const mesh = useRef<THREE.InstancedMesh>(null)
  const boostRef = useRef(0)

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.3 + Math.random() * 1.8,
      speed: 0.1 + Math.random() * 0.15,
      size: 0.04 + Math.random() * 0.06,
      offset: Math.random() * Math.PI * 2,
    }))
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime

    boostRef.current = THREE.MathUtils.lerp(boostRef.current, mouse.current.vx * 0.5, 0.03)

    particles.forEach((p, i) => {
      p.angle += p.speed * 0.02 * (1 + boostRef.current)

      const wobble = Math.sin(t * 0.8 + p.offset) * 0.1
      const x = Math.cos(p.angle) * (p.radius + wobble)
      const z = Math.sin(p.angle) * (p.radius + wobble)
      const y = 0.85 + Math.sin(t * 0.5 + p.offset) * 0.05

      const s = p.size * (1 + Math.sin(t + p.offset) * 0.2)

      m4.makeScale(s, s * 0.3, s)
      m4.setPosition(x, y, z)
      mesh.current!.setMatrixAt(i, m4)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#d4a574"
        roughness={0.6}
        metalness={0.2}
        emissive="#c4775b"
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} color="#f5e6d3" />
      <pointLight position={[3, 4, 3]} intensity={1.2} color="#c4775b" distance={15} decay={2} />
      <pointLight position={[-3, 2, -2]} intensity={0.8} color="#f5e6d3" distance={12} decay={2} />
      <pointLight position={[0, -2, 4]} intensity={0.5} color="#2a1810" distance={10} decay={2} />
      <spotLight position={[0, 6, 0]} angle={0.6} penumbra={0.8} intensity={0.6} color="#ffe4c4" />
    </>
  )
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number; vx: number; vy: number }> }) {
  return (
    <>
      <Lights />
      <CoffeeSphere mouse={mouse} />
      <TorusRings mouse={mouse} />
      <BeanOrbits mouse={mouse} />
      <SteamParticles mouse={mouse} />
      <CremaParticles mouse={mouse} />
      <fog attach="fog" args={["#0a0604", 8, 20]} />
    </>
  )
}

export function HeroCanvasContainer() {
  const mouse = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 3, 7], fov: 40 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  )
}
