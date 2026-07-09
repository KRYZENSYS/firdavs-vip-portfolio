"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function WireSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.y += dt * 0.15; ref.current.rotation.x += dt * 0.05; } });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.35} />
    </mesh>
  );
}
function FloatingRing({ radius = 3.6, color = "#7b2eff", speed = 0.2 }: { radius?: number; color?: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) { ref.current.rotation.x += dt * speed; ref.current.rotation.y += dt * speed * 0.7; } });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 200]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const { positions } = useMemo(() => {
    const N = 700; const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { const r = 5 + Math.random() * 5; const t = Math.random() * Math.PI * 2; const p = Math.acos(2 * Math.random() - 1);
      arr[i*3] = r * Math.sin(p) * Math.cos(t); arr[i*3+1] = r * Math.cos(p); arr[i*3+2] = r * Math.sin(p) * Math.sin(t);
    }
    return { positions: arr };
  }, []);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.04; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
      </bufferGeometry>
      <pointsMaterial color="#4da6ff" size={0.04} transparent opacity={0.9} sizeAttenuation />
    </points>
  );
}
export default function ThreeScene() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-70">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6.5], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} />
        <WireSphere />
        <FloatingRing radius={3.4} color="#00f5ff" speed={0.18} />
        <FloatingRing radius={4.2} color="#7b2eff" speed={-0.12} />
        <FloatingRing radius={5.0} color="#4da6ff" speed={0.10} />
        <Particles />
      </Canvas>
    </div>
  );
}
