"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./3d/Scene";
import ConfiguratorPanel from "./ui/ConfiguratorPanel";
import LoadingFallback from "./3d/LoadingFallback";
import { DEFAULT_CONFIG } from "../config/modelConfig";

export default function Configurator() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  return (
    <>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
          overflow: hidden;
        }
        .header {
          position: absolute;
          top: 20px;
          left: 20px;
          color: white;
          max-width: 300px;
          z-index: 10;
        }
        .title {
          font-size: 1.75rem;
          font-weight: bold;
          margin: 0 0 12px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .instructions {
          color: #d1d5db;
          font-size: 0.875rem;
        }
        .instructions p {
          margin: 4px 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      <div className="container">
        <Canvas
          shadows
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Scene config={config} />
          </Suspense>
        </Canvas>

        <ConfiguratorPanel config={config} setConfig={setConfig} />

        <div className="header">
          <h1 className="title">3D Model Configurator</h1>
          <div className="instructions">
            <p>🖱️ Click and drag to rotate</p>
            <p>🔍 Scroll to zoom</p>
            <p>⚙️ Use the panel to customize</p>
          </div>
        </div>
      </div>
    </>
  );
}
