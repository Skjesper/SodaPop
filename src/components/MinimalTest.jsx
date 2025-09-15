"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MinimalConfigurator = dynamic(() => import("./MinimalConfigurator"), {
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
      }}
    >
      Loading Minimal Test...
    </div>
  ),
});

export default function MinimalTestClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <MinimalConfigurator />;
}
