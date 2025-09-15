// src/components/3d/Scene.jsx
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import Model from "./Model";

// Simple fallback component
function ModelFallback() {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#ff4444" />
    </mesh>
  );
}

export default function Scene({ config }) {
  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <pointLight position={[-5, 5, 5]} intensity={0.5} />
      <pointLight position={[5, -5, -5]} intensity={0.3} />

      {/* Model with Suspense fallback */}
      <Suspense fallback={<ModelFallback />}>
        <Model
          color={config.color}
          material={config.material}
          textureUrl={config.textureUrl}
        />
      </Suspense>

      {/* Ground plane for shadows and context */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Camera controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0, 0]}
      />

      {/* Environment lighting for realistic reflections */}
      <Environment preset="sunset" />
    </>
  );
}
