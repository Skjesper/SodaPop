// src/components/DebugConfigurator.jsx
"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import DebugScene from "./3d/DebugScene";
// import { DEFAULT_CONFIG } from '../config/modelConfig';

// Simple config for testing
const TEST_CONFIG = {
  color: "#ff4444",
  material: { roughness: 0.8, metalness: 0.1, name: "Matte" },
};

function SimpleLoading() {
  return <div style={{ color: "white", textAlign: "center" }}>Loading...</div>;
}

export default function DebugConfigurator() {
  const [config, setConfig] = useState(TEST_CONFIG);

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
          <DebugScene config={config} />
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
          Debug Configurator - Step 2
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
            🖱️ Testing Scene component
          </p>
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
        <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
          Step 2: Scene Test
        </h3>
        <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
          Testing Scene with Environment
        </p>
        <button
          onClick={() =>
            setConfig({
              ...config,
              color: config.color === "#ff4444" ? "#4444ff" : "#ff4444",
            })
          }
          style={{
            marginTop: "10px",
            padding: "5px 10px",
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
