"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import ConfiguratorPanel from "./ui/ConfiguratorPanel";
import LoadingFallback from "./3d/LoadingFallback";
import { DEFAULT_CONFIG } from "../config/modelConfig";
import styles from "../styles/configurator.module.css";

// Simple test model to verify everything works
function TestModel({ config }) {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 3, 8]} />
      <meshStandardMaterial
        color={config.color}
        roughness={config.material.roughness}
        metalness={config.material.metalness}
      />
    </mesh>
  );
}

// Simple scene without complex imports
function SimpleScene({ config }) {
  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, 5]} intensity={0.5} />

      {/* Test Model */}
      <TestModel config={config} />

      {/* Ground plane */}
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

      {/* Environment - this might be causing issues */}
      <Environment preset="sunset" />
    </>
  );
}

export default function StepByStepConfigurator() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  return (
    <div className={styles.appContainer}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SimpleScene config={config} />
        </Suspense>
      </Canvas>

      <ConfiguratorPanel config={config} setConfig={setConfig} />

      <div className={styles.appHeader}>
        <h1 className={styles.appTitle}>Step-by-Step Configurator</h1>
        <div className={styles.appInstructions}>
          <p>🖱️ Click and drag to rotate</p>
          <p>🔍 Scroll to zoom</p>
          <p>⚙️ Use the panel to customize</p>
          <p>🧪 Testing with simple model first</p>
        </div>
      </div>
    </div>
  );
}
