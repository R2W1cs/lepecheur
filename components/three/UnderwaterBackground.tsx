"use client";

import { useThree } from "@react-three/fiber";

export default function UnderwaterBackground() {
  const { viewport } = useThree();

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, -2]}>
      <planeGeometry />
      <meshBasicMaterial color="#0A2A2A" />
    </mesh>
  );
}
