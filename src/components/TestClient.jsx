"use client";

import dynamic from "next/dynamic";

const SimpleTest = dynamic(() => import("./SimpleTest"), {
  ssr: false,
  loading: () => <div>Loading Three.js...</div>,
});

export default function TestClient() {
  return <SimpleTest />;
}
