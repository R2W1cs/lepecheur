"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Caustics() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Simple texture offset or shader-based approach
    // For now, let's use a plane with a custom material that pulses
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial
        color="#F7F3E8"
        transparent
        opacity={0.05}
        emissive="#D4AF7A"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
