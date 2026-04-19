import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, Stars } from '@react-three/drei';
import * as THREE from 'three';
import {
    STACK_PLANETS,
    OUTER_TOOLS,
    CENTER_LABEL,
    CATEGORY_META,
} from '../data/skillOrbitData';

function orbitCirclePoints(radius, segments = 96) {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
}

function TiltSceneRoot({ children }) {
    const root = useRef(null);
    useFrame((state) => {
        if (!root.current) return;
        const tx = state.pointer.y * 0.14;
        const ty = state.pointer.x * 0.22;
        root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, tx, 0.06);
        root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, ty, 0.06);
    });
    return <group ref={root}>{children}</group>;
}

function SunCore() {
    const mesh = useRef(null);
    useFrame(({ clock }) => {
        if (!mesh.current) return;
        const wobble = Math.sin(clock.elapsedTime * 1.8) * 0.03 + 1;
        mesh.current.scale.setScalar(wobble);
    });
    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[0.46, 56, 56]} />
            <meshStandardMaterial
                color="#ffb347"
                emissive="#ff7700"
                emissiveIntensity={1.35}
                roughness={0.35}
                metalness={0.15}
            />
        </mesh>
    );
}

function SunGlow() {
    const mesh = useRef(null);
    useFrame(({ clock }) => {
        if (!mesh.current || !mesh.current.material) return;
        const p = 0.92 + Math.sin(clock.elapsedTime * 2.2) * 0.06;
        mesh.current.material.opacity = p * 0.35;
        mesh.current.scale.setScalar(1.05 + Math.sin(clock.elapsedTime * 1.5) * 0.02);
    });
    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[0.72, 32, 32]} />
            <meshBasicMaterial color="#ff9500" transparent opacity={0.35} depthWrite={false} />
        </mesh>
    );
}

function PlanetSphere({ color, categoryKey, sphereRadius, onSelect, item }) {
    const meta = CATEGORY_META[categoryKey] || CATEGORY_META.Frontend;
    return (
        <group>
            <mesh
                castShadow
                onClick={(e) => {
                    e.stopPropagation();
                    if (item) onSelect(item);
                }}
                onPointerOver={() => {
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto';
                }}
            >
                <sphereGeometry args={[sphereRadius, 28, 28]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.35}
                    roughness={0.42}
                    metalness={0.25}
                />
            </mesh>
            <mesh scale={1.12}>
                <sphereGeometry args={[sphereRadius, 20, 20]} />
                <meshBasicMaterial
                    color={meta.color}
                    transparent
                    opacity={0.12}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

function StackPlanetRow({ planet, onOpen }) {
    const orbitRef = useRef(null);

    useFrame((_, dt) => {
        if (orbitRef.current) orbitRef.current.rotation.y += planet.speed * dt;
    });

    const payload = {
        modalTitle: planet.modalTitle,
        modalBody: planet.modalBody,
        label: planet.label,
        category: planet.category,
        speedNote: `Orbit rate is controlled by \`speed\` in skillOrbitData.js (${planet.label}).`,
    };

    return (
        <group ref={orbitRef}>
            <group position={[planet.orbitRadius, 0, 0]}>
                <PlanetSphere
                    color={planet.color}
                    categoryKey={planet.category}
                    sphereRadius={0.22}
                    onSelect={onOpen}
                    item={payload}
                />
            </group>
        </group>
    );
}

function OrbitRings() {
    return (
        <group>
            {STACK_PLANETS.map((p) => (
                <Line
                    key={p.id}
                    points={orbitCirclePoints(p.orbitRadius)}
                    color="#22d3ee"
                    opacity={0.14}
                    transparent
                    lineWidth={1}
                />
            ))}
            <Line
                points={orbitCirclePoints(OUTER_TOOLS[0].orbitRadius)}
                color="#f472b6"
                opacity={0.18}
                transparent
                lineWidth={1}
            />
        </group>
    );
}

function OuterToolRing({ onOpen }) {
    const ringRef = useRef(null);
    const speed = OUTER_TOOLS[0]?.ringSpeed ?? 0.11;

    useFrame((_, dt) => {
        if (ringRef.current) ringRef.current.rotation.y += speed * dt;
    });

    return (
        <group ref={ringRef}>
            {OUTER_TOOLS.map((tool) => (
                <group key={tool.id} rotation={[0, tool.slotAngle, 0]}>
                    <group position={[tool.orbitRadius, 0, 0]}>
                        <PlanetSphere
                            color={tool.color}
                            categoryKey={tool.category}
                            sphereRadius={0.17}
                            onSelect={onOpen}
                            item={{
                                modalTitle: tool.modalTitle,
                                modalBody: tool.modalBody,
                                label: tool.label,
                                category: tool.category,
                                speedNote: 'Outer orbit: tooling layer.',
                            }}
                        />
                    </group>
                </group>
            ))}
        </group>
    );
}

function SpaceScene({ onPlanetOpen }) {
    return (
        <TiltSceneRoot>
            <ambientLight intensity={0.35} />
            <pointLight position={[0, 1.5, 1]} intensity={2.2} color="#ffd4a8" distance={20} decay={2} />
            <pointLight position={[-6, -2, 4]} intensity={0.5} color="#22d3ee" />
            <OrbitRings />

            <group position={[0, 0.1, 0]}>
                <SunGlow />
                <SunCore />
                <Html center distanceFactor={11} style={{ pointerEvents: 'none', userSelect: 'none' }}>
                    <div className="w-[200px] -translate-x-1/2 text-center md:w-[240px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-amber-100/90">
                            {CENTER_LABEL.role}
                        </p>
                        <p className="mt-2 text-lg font-bold text-white drop-shadow-[0_0_18px_rgba(0,0,0,0.85)] md:text-xl">
                            {CENTER_LABEL.name}
                        </p>
                    </div>
                </Html>
            </group>

            {STACK_PLANETS.map((p) => (
                <StackPlanetRow key={p.id} planet={p} onOpen={onPlanetOpen} />
            ))}

            <OuterToolRing onOpen={onPlanetOpen} />

            <Stars radius={70} depth={38} count={4200} factor={2.8} saturation={0} fade speed={0.4} />
        </TiltSceneRoot>
    );
}

function OrbitModal({ detail, onClose }) {
    useEffect(() => {
        if (!detail) return undefined;
        const esc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', esc);
        return () => window.removeEventListener('keydown', esc);
    }, [detail, onClose]);

    if (!detail) return null;

    const cat = CATEGORY_META[detail.category] || { color: '#94a3b8', label: detail.category };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="orbit-modal-title"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-4 py-10 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                className="glass relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl border p-7 shadow-[0_0_50px_rgba(34,211,238,0.12)]"
                style={{ borderColor: `${cat.color}44` }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="absolute right-4 top-4 rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-wider text-gray-400 transition-colors hover:border-neon-cyan/40 hover:text-white"
                    onClick={onClose}
                >
                    Close
                </button>
                <p
                    className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em]"
                    style={{ color: cat.color }}
                >
                    {cat.label}
                </p>
                <h3
                    id="orbit-modal-title"
                    className="mb-3 text-2xl font-bold tracking-tight text-white"
                >
                    {detail.modalTitle}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">{detail.modalBody}</p>
                {detail.speedNote && (
                    <p className="mt-5 border-t border-white/10 pt-4 text-xs italic text-gray-500">
                        {detail.speedNote}
                    </p>
                )}
            </div>
        </div>
    );
}

function CanvasFallback() {
    return (
        <div className="flex h-full min-h-[420px] w-full items-center justify-center bg-black/40 text-sm text-gray-500">
            Loading orbit…
        </div>
    );
}

export default function OrbitalSkills() {
    const [detail, setDetail] = useState(null);

    return (
        <section
            id="skill-orbit"
            className="relative border-y border-white/5 bg-[#030712] py-16 md:py-20"
            aria-labelledby="skill-orbit-heading"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_30%,rgba(34,211,238,0.07),transparent_55%)]" />

            <div className="container relative z-10 mx-auto px-4">
                <div className="mb-10 flex flex-col items-center gap-4 text-center">
                    <div className="flex items-center gap-4">
                        <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-cyan" />
                        <h2
                            id="skill-orbit-heading"
                            className="text-3xl font-bold uppercase tracking-wider neon-text-cyan"
                        >
                            Stack Universe
                        </h2>
                        <div className="h-px w-10 bg-gradient-to-l from-transparent to-neon-cyan" />
                    </div>
                    <p className="max-w-2xl text-sm text-gray-500 md:text-base">
                        Center: role · Inner orbits: stack · Outer ring: Git, Docker, Postman · Orbit speed is
                        configurable in data · Pointer tilts the view · Click a sphere for notes.
                    </p>

                    <ul className="flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-widest text-gray-500">
                        {Object.entries(CATEGORY_META).map(([key, v]) => (
                            <li
                                key={key}
                                className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1"
                            >
                                <span
                                    className="h-2 w-2 rounded-full"
                                    style={{ background: v.color, boxShadow: `0 0 8px ${v.color}` }}
                                />
                                {v.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative mx-auto h-[420px] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_0_60px_rgba(0,0,0,0.5)] md:h-[520px]">
                    <Suspense fallback={<CanvasFallback />}>
                        <Canvas
                            camera={{ position: [0, 2.4, 14.5], fov: 42 }}
                            dpr={[1, 2]}
                            gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
                            onCreated={({ gl }) => {
                                gl.setClearColor('#030712');
                            }}
                        >
                            <SpaceScene onPlanetOpen={setDetail} />
                        </Canvas>
                    </Suspense>
                </div>
            </div>

            <OrbitModal detail={detail} onClose={() => setDetail(null)} />
        </section>
    );
}
