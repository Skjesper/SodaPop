"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Simple test model
function TestModel({ color = "#ff4444" }) {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 3, 8]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Simple scene
function SimpleScene({ color }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <TestModel color={color} />
      <OrbitControls />
    </>
  );
}

// Simple loading
function SimpleLoading() {
  return null; // Even simpler - no loading component
}

export default function ZeroDepsConfigurator() {
  const [color, setColor] = useState("#ff4444");

  // Inline styles to avoid any CSS module conflicts
  const containerStyle = {
    width: "100vw",
    height: "100vh",
    position: "relative",
    background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    margin: 0,
    padding: 0,
  };

  const headerStyle = {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
    zIndex: 10,
    fontFamily: "Arial, sans-serif",
  };

  const panelStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "8px",
    zIndex: 20,
  };

  return (
    <div style={containerStyle}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={<SimpleLoading />}>
          <SimpleScene color={color} />
        </Suspense>
      </Canvas>

      <div style={headerStyle}>
        <h1>Zero Dependencies Test</h1>
        <p>Testing minimal setup</p>
      </div>

      <div style={panelStyle}>
        <h3>Color Test</h3>
        <button
          onClick={() => setColor(color === "#ff4444" ? "#4444ff" : "#ff4444")}
          style={{
            padding: "10px",
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