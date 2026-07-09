"use client";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Text } from "@react-three/drei";
import { motion } from "framer-motion";

function Avatar() {
  const ref = useRef<any>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ref}>
        <Sphere args={[1, 64, 64]} castShadow>
          <MeshDistortMaterial color="#00f5ff" attach="material" distort={0.45} speed={2} roughness={0.1} metalness={0.8} />
        </Sphere>
        <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.15} />
        </Sphere>
        <Text position={[0, -1.6, 0]} fontSize={0.18} color="#00f5ff" anchorX="center" anchorY="middle" font="https://fonts.gstatic.com/s/orbitron/v34/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWg1.woff">
          Firdavs
        </Text>
      </group>
    </Float>
  );
}

export default function ThreeAvatar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-56 z-[105] hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-bg/80 backdrop-blur-xl text-primary shadow-neon-cyan hover:scale-110 transition" title="3D Avatar">
        <span className="text-base">🧬</span>
      </button>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[240] flex items-center justify-center bg-black/85 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="relative w-[min(600px,95vw)] h-[min(600px,80vh)] overflow-hidden rounded-2xl border border-primary/30 bg-bg/95 shadow-neon-cyan">
            <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-primary z-10">// 3d.avatar · drag to rotate</div>
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 z-10 text-white/50 hover:text-white">×</button>
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
              <Suspense fallback={null}>
                <Avatar />
                <Stars radius={50} depth={50} count={2000} factor={4} fade speed={1} />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
