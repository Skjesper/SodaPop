// src/components/3d/DebugScene.jsx
import { OrbitControls, Environment } from "@react-three/drei";

// Simple test box instead of Model
function TestBox({ config }) {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={config.color}
        roughness={config.material.roughness}
        metalness={config.material.metalness}
      />
    </mesh>
  );
}

export default function DebugScene({ config }) {
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

      {/* Test Box instead of Model */}
      <TestBox config={config} />

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
