"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the entire Configurator to avoid SSR issues with Three.js
const Configurator = dynamic(() => import("./Configurator"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
        color: "white",
        fontSize: "1.25rem",
      }}
    >
      Loading 3D Configurator...
    </div>
  ),
});

export default function ConfiguratorClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return <Configurator />;
}
