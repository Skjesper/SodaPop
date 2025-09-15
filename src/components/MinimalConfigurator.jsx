// src/components/MinimalConfigurator.jsx
"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// Simple box component for testing
function TestBox() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

// Simple scene for testing
function TestScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <TestBox />
      <OrbitControls />
    </>
  );
}

// Simple loading component
function SimpleLoading() {
  return <div style={{ color: "white", textAlign: "center" }}>Loading...</div>;
}

export default function MinimalConfigurator() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={<SimpleLoading />}>
          <TestScene />
        </Suspense>
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          zIndex: 10,
        }}
      >
        <h1>Minimal Test</h1>
      </div>
    </div>
  );
}
