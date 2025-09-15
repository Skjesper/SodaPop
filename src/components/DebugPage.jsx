"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DebugConfigurator = dynamic(() => import("./DebugConfigurator"), {
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
      Loading Debug Configurator...
    </div>
  ),
});

export default function DebugPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <DebugConfigurator />;
}
