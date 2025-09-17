"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./3d/Scene";
import ConfiguratorPanel from "./ui/ConfiguratorPanel";
import LoadingFallback from "./3d/LoadingFallback";
import IngredientsDropdown from "./ui/IngredientsDropdown";
import { DEFAULT_CONFIG } from "../config/modelConfig";
import styles from "../styles/configurator.module.css";

export default function Configurator() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  return (
    <div className={styles.appContainer}>
      <Canvas
        shadows
        camera={{
          position: [0, 0, 50],
          fov: 30,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        className={styles.canvasContainer}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene config={config} />
        </Suspense>
      </Canvas>

      <ConfiguratorPanel config={config} setConfig={setConfig} />

      <IngredientsDropdown />

      <div className={styles.appHeader}>
        <h1 className={styles.appTitle}>3D Model Configurator</h1>
        <div className={styles.appInstructions}>
          <p>🖱️ Click and drag to rotate</p>
          <p>🔍 Scroll to zoom</p>
          <p>⚙️ Use the panel to customize</p>
        </div>
      </div>
    </div>
  );
}
