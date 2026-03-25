"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera, Environment, Float, Sparkles } from "@react-three/drei";
import Fish from "./Fish";
import UnderwaterBackground from "./UnderwaterBackground";
import Caustics from "./Caustics";

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas shadows gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#2C6E5C" />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Fish />
          </Float>

          <UnderwaterBackground />
          <Caustics />
          
          <Sparkles 
            count={400} 
            size={2} 
            scale={[15, 15, 15]} 
            speed={0.3} 
            opacity={0.1} 
            color="#F7F3E8" 
          />
          
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
