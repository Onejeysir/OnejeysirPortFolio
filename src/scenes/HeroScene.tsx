import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import type { Group, Mesh } from 'three'

const motePositions: [number, number, number][] = [
  [-1.85, 0.82, -0.3], [-1.52, -0.54, 0.35], [-1.12, 1.43, -0.5], [-0.55, -1.72, -0.25],
  [0.04, 1.9, -0.4], [0.36, -1.64, 0.12], [0.92, 1.48, -0.48], [1.62, 0.93, 0.2],
  [1.89, -0.27, -0.44], [1.38, -1.22, -0.18], [-1.89, 0.12, -0.58], [0.66, -0.24, -1.2],
  [-0.71, 0.71, 1.25], [0.15, -1.35, 0.74], [1.71, 0.18, 0.42], [-1.35, -1.29, -0.54],
]

function OrbitalForm({ reducedMotion }: { reducedMotion: boolean }) {
  const core = useRef<Group>(null)
  const shard = useRef<Mesh>(null)
  useFrame((state, delta) => {
    if (reducedMotion) return
    const pointerX = state.pointer.x
    const pointerY = state.pointer.y
    if (core.current) {
      core.current.rotation.y += delta * 0.075 + pointerX * delta * 0.075
      core.current.rotation.x += delta * 0.035 + pointerY * delta * 0.045
      core.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.055
    }
    if (shard.current) {
      shard.current.rotation.y -= delta * 0.12
      shard.current.rotation.x += delta * 0.08
    }
  })

  return (
    <group ref={core}>
      <mesh rotation={[0.32, 0.1, -0.18]}>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshStandardMaterial color="#c9c7bd" metalness={0.7} roughness={0.28} wireframe />
      </mesh>
      <mesh ref={shard} position={[0.93, 0.58, 0.48]} scale={0.31}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.45} roughness={0.28} emissive="#6d1f08" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.87, -0.72, 0.35]} scale={0.1}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#f2f0e9" metalness={0.4} roughness={0.24} />
      </mesh>
      <mesh rotation={[Math.PI / 2.55, 0.14, -0.28]} scale={1.57}>
        <torusGeometry args={[1, 0.006, 5, 96]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.68} />
      </mesh>
      <mesh rotation={[1.92, 0.32, 0.65]} scale={1.78}>
        <torusGeometry args={[1, 0.004, 4, 96]} />
        <meshBasicMaterial color="#d8d6ce" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0, -0.7]}>
        <sphereGeometry args={[0.29, 16, 12]} />
        <meshStandardMaterial color="#ff6b35" metalness={0.72} roughness={0.22} emissive="#421403" emissiveIntensity={0.22} />
      </mesh>
      {motePositions.map((position, index) => (
        <mesh key={index} position={position} scale={index % 3 === 0 ? 0.023 : 0.014}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={index % 4 === 0 ? '#ff8b5b' : '#d9d7cf'} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene() {
  const reducedMotion = useReducedMotion() ?? false

  return (
    <Canvas
      camera={{ position: [0, 0, 5.1], fov: 42 }}
      dpr={[1, 1.25]}
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power', failIfMajorPerformanceCaveat: true }}
      aria-label="Objet géométrique tridimensionnel en acier et orange"
    >
      <ambientLight intensity={0.58} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} color="#f5f1e7" />
      <pointLight position={[-3, -1, 2]} intensity={18} distance={7} color="#ff6b35" />
      <OrbitalForm reducedMotion={reducedMotion} />
    </Canvas>
  )
}
