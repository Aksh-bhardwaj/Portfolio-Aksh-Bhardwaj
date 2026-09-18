import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';

function FloatingOrb({ position, color, scale = 1, speed = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.35;
    ref.current.rotation.y = t * 0.45;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          metalness={0.85}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function TorusRing({ position, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={0.8} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={1.15}>
        <torusGeometry args={[1.2, 0.04, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const points = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#67e8f9"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={1.2} color="#00f3ff" />
      <pointLight position={[-4, -2, 2]} intensity={0.7} color="#39ff14" />
      <Stars radius={40} depth={40} count={900} factor={2.5} saturation={0} fade speed={0.4} />
      <ParticleField />
      <FloatingOrb position={[2.6, 0.8, -1]} color="#00f3ff" scale={0.55} speed={0.8} />
      <FloatingOrb position={[-2.8, -0.6, -0.5]} color="#39ff14" scale={0.4} speed={1.1} />
      <FloatingOrb position={[0.4, 1.6, -2]} color="#a78bfa" scale={0.28} speed={0.6} />
      <TorusRing position={[-1.2, 1.1, -1.5]} color="#22d3ee" />
    </>
  );
}

export default function Scene3D({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
