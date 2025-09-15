// src/components/DebugEnvironment.jsx
"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

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

function SceneWithEnvironment({ config }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <TestBox config={config} />
      <OrbitControls />

      {/* This is likely the problem! */}
      <Environment preset="sunset" />
    </>
  );
}

function SceneWithoutEnvironment({ config }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <TestBox config={config} />
      <OrbitControls />
      {/* No Environment component */}
    </>
  );
}

function SimpleLoading() {
  return <div style={{ color: "white", textAlign: "center" }}>Loading...</div>;
}

export default function DebugEnvironment() {
  const [config] = useState({
    color: "#ff4444",
    material: { roughness: 0.8, metalness: 0.1, name: "Matte" },
  });

  const [useEnvironment, setUseEnvironment] = useState(false);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: "hidden",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<SimpleLoading />}>
          {useEnvironment ? (
            <SceneWithEnvironment config={config} />
          ) : (
            <SceneWithoutEnvironment config={config} />
          )}
        </Suspense>
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          maxWidth: "300px",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: "bold",
            margin: "0 0 12px 0",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Debug Environment
        </h1>
        <div
          style={{
            color: "#d1d5db",
            fontSize: "0.875rem",
          }}
        >
          <p
            style={{
              margin: "4px 0",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            🖱️ Testing Environment component
          </p>
        </div>
      </div>

      {/* Test panel */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "8px",
          zIndex: 20,
          maxWidth: "250px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
          Environment Test
        </h3>
        <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
          Current: {useEnvironment ? "WITH Environment" : "WITHOUT Environment"}
        </p>
        <button
          onClick={() => setUseEnvironment(!useEnvironment)}
          style={{
            padding: "8px 12px",
            background: useEnvironment ? "#dc2626" : "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {useEnvironment ? "Remove Environment" : "Add Environment"}
        </button>
        <p style={{ margin: "10px 0 0 0", fontSize: "12px", color: "#999" }}>
          Click to toggle and see which causes the error!
        </p>
      </div>
    </div>
  );
}
