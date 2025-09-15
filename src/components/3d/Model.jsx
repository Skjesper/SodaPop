// src/components/3d/Model.jsx
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Model({ color, material, textureUrl }) {
  const groupRef = useRef();

  // Load your actual GLTF file
  const { scene } = useGLTF("/sodacan.gltf");

  // Load texture if provided - handle potential errors
  let texture = null;
  try {
    texture = textureUrl ? useTexture(textureUrl) : null;
  } catch (error) {
    console.warn("Failed to load texture:", textureUrl, error);
    texture = null;
  }

  // Clone the scene to avoid modifying the original
  const clonedScene = scene.clone();

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

// Preload the model for better performance
useGLTF.preload("/sodacan.gltf");
