"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "../styles/configurator.module.css";

// Simple test box to verify Three.js is working
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

// Simple scene for debugging
function DebugScene({ config }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <TestBox config={config} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
      />
    </>
  );
}

// Simple loading component
function SimpleLoading() {
  return (
    <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
      Loading 3D Scene...
    </div>
  );
}

export default function DebugConfigurator() {
  const [config, setConfig] = useState({
    color: "#ff4444",
    material: { roughness: 0.8, metalness: 0.1, name: "Matte" },
  });

  return (
    <div className={styles.appContainer}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<SimpleLoading />}>
          <DebugScene config={config} />
        </Suspense>
      </Canvas>

      <div className={styles.appHeader}>
        <h1 className={styles.appTitle}>Debug Mode - Testing Basic Three.js</h1>
        <div className={styles.appInstructions}>
          <p>🖱️ Click and drag to rotate</p>
          <p>🔍 Scroll to zoom</p>
          <p>📦 You should see a red box</p>
        </div>
      </div>

      {/* Simple test panel */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "8px",
          zIndex: 20,
          maxWidth: "200px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>Debug Panel</h3>
        <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
          Testing basic Three.js setup
        </p>
        <button
          onClick={() =>
            setConfig({
              ...config,
              color: config.color === "#ff4444" ? "#4444ff" : "#ff4444",
            })
          }
          style={{
            padding: "8px 12px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Change Color
        </button>
      </div>
    </div>
  );
}
