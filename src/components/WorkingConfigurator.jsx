"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import ConfiguratorPanel from "./ui/ConfiguratorPanel";
import { DEFAULT_CONFIG } from "../config/modelConfig";

// Simple test model first, then we'll add the GLTF
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

      {/* Environment */}
      <Environment preset="sunset" />
    </>
  );
}

function SimpleLoading() {
  return (
    <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
      Loading 3D Model...
    </div>
  );
}

export default function WorkingConfigurator() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  // Use inline styles instead of CSS modules to avoid conflicts
  const containerStyle = {
    width: "100vw",
    height: "100vh",
    position: "relative",
    background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflow: "hidden",
    margin: 0,
    padding: 0,
  };

  const headerStyle = {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
    maxWidth: "300px",
    zIndex: 10,
  };

  const titleStyle = {
    fontSize: "1.75rem",
    fontWeight: "bold",
    margin: "0 0 12px 0",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const instructionsStyle = {
    color: "#d1d5db",
    fontSize: "0.875rem",
  };

  const instructionPStyle = {
    margin: "4px 0",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
  };

  return (
    <div style={containerStyle}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<SimpleLoading />}>
          <SimpleScene config={config} />
        </Suspense>
      </Canvas>

      <ConfiguratorPanel config={config} setConfig={setConfig} />

      <div style={headerStyle}>
        <h1 style={titleStyle}>3D Model Configurator</h1>
        <div style={instructionsStyle}>
          <p style={instructionPStyle}>🖱️ Click and drag to rotate</p>
          <p style={instructionPStyle}>🔍 Scroll to zoom</p>
          <p style={instructionPStyle}>⚙️ Use the panel to customize</p>
        </div>
      </div>
    </div>
  );
}
