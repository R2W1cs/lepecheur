"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshWobbleMaterial } from "@react-three/drei";

export default function Fish() {
  const meshRef = useRef<THREE.Group>(null);
  
  // Create a procedural fish shape using segments
  const fishGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const t = state.clock.getElapsedTime();
    
    // Swimming motion (organic sway)
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    meshRef.current.position.x = Math.sin(t * 0.2) * 0.3;
    
    // Mouse follow effect
    const mouseX = state.mouse.x * 2;
    const mouseY = state.mouse.y * 1;
    
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, 
      mouseX * 0.5, 
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x, 
      -mouseY * 0.3, 
      0.05
    );
    
    // Tail sway
    const tail = meshRef.current.children[1]; // Reference to tail mesh
    if (tail) {
      tail.rotation.y = Math.sin(t * 4) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1.5, 4, 32]} />
        <MeshWobbleMaterial 
          factor={0.1} 
          speed={1} 
          color="#D4AF7A" 
          roughness={0.1} 
          metalness={0.8}
          emissive="#2C6E5C"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, -1.2, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.4, 0.8, 4]} />
        <MeshWobbleMaterial factor={0.5} speed={2} color="#D4AF7A" metalness={0.8} />
      </mesh>
      
      {/* Fins */}
      <mesh position={[0.4, 0, 0]} rotation={[0, 0, -0.5]}>
        <planeGeometry args={[0.4, 0.6]} />
        <meshStandardMaterial color="#D4AF7A" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.4, 0, 0]} rotation={[0, 0, 0.5]}>
        <planeGeometry args={[0.4, 0.6]} />
        <meshStandardMaterial color="#D4AF7A" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.2, 0.7, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="black" roughness={0} metalness={1} />
      </mesh>
      <mesh position={[-0.2, 0.7, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="black" roughness={0} metalness={1} />
      </mesh>
    </group>
  );
}
