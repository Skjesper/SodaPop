// src/components/3d/Model.jsx
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Fallback component if model fails to load
function ModelFallback({ color, material }) {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 3, 8]} />
      <meshStandardMaterial
        color={color}
        roughness={material.roughness}
        metalness={material.metalness}
      />
    </mesh>
  );
}

export default function Model({ color, material, textureUrl }) {
  const groupRef = useRef();
  const [modelError, setModelError] = useState(false);
  const [textureError, setTextureError] = useState(false);

  // Try to load the GLTF model with error handling
  let gltf = null;
  try {
    gltf = useGLTF("/sodacan.gltf");
  } catch (error) {
    console.warn("Failed to load GLTF model:", error);
    setModelError(true);
  }

  // Try to load texture with error handling
  let texture = null;
  try {
    if (textureUrl && !textureError) {
      texture = useTexture(textureUrl);
    }
  } catch (error) {
    console.warn("Failed to load texture:", textureUrl, error);
    setTextureError(true);
    texture = null;
  }

  // If model failed to load, show fallback
  if (modelError || !gltf?.scene) {
    console.log("Using fallback model - GLTF failed to load");
    return <ModelFallback color={color} material={material} />;
  }

  // Clone the scene to avoid modifying the original
  const clonedScene = gltf.scene.clone();

  // Apply materials to the model
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          // Store original material name for reference
          const originalMaterialName = child.material?.name;

          // Create new material based on configuration
          const newMaterial = new THREE.MeshStandardMaterial({
            color: color,
            roughness: material.roughness,
            metalness: material.metalness,
            map: texture,
            // Preserve some original material properties if needed
            transparent: child.material?.transparent || false,
            alphaTest: child.material?.alphaTest || 0,
          });

          // Copy material name for debugging
          newMaterial.name = originalMaterialName || "ConfiguredMaterial";

          child.material = newMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [clonedScene, color, material, texture]);

  // Optional: Add subtle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} position={[0, 0, 0]} scale={[1, 1, 1]} />
    </group>
  );
}

// Only preload if the file exists
try {
  useGLTF.preload("/sodacan.gltf");
} catch (error) {
  console.warn("Could not preload GLTF model");
}
