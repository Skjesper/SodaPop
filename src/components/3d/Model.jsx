import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { useOptionalTexture } from "./../../hooks/useOptionalTexture";

import MovementAnimation from "./MovementAnimation";


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

export default function Model({
  color,
  material,
  textureUrl,
  textureControls,
}) {
  const groupRef = useRef();
  const [modelError, setModelError] = useState(false);
  const [boundingBox, setBoundingBox] = useState(null);

  // Always call hooks in the same order - load GLTF
  let gltf = null;
  try {
    gltf = useGLTF("/sodacan.gltf");
  } catch (error) {
    console.warn("Failed to load GLTF model:", error);
    setModelError(true);
  }

  // Use our custom hook that safely handles optional textures
  const { texture, isLoading } = useOptionalTexture(textureUrl);

  // If model failed to load, show fallback
  if (modelError || !gltf?.scene) {
    console.log("Using fallback model - GLTF failed to load");
    return <ModelFallback color={color} material={material} />;
  }

  // Clone the scene to avoid modifying the original
  const clonedScene = gltf.scene.clone();

  // Calculate bounding box for auto-centering
  useEffect(() => {
    if (clonedScene && groupRef.current) {
      const timer = setTimeout(() => {
        const box = new THREE.Box3().setFromObject(groupRef.current);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        setBoundingBox({
          center: { x: center.x, y: center.y, z: center.z },
          size: { x: size.x, y: size.y, z: size.z },
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array - only calculate once!

  // Apply different materials to different parts
  useEffect(() => {
    if (clonedScene) {
      console.log("=== UV Coordinate Analysis ===");

      clonedScene.traverse((child) => {
        if (child.isMesh) {
          const meshName = child.name.toLowerCase();

          // Debug: Log UV coordinates for ALL meshes
          if (child.geometry.attributes.uv) {
            console.log(
              `✅ ${meshName} HAS UV coordinates (${child.geometry.attributes.uv.count} points)`
            );
          } else {
            console.log(`❌ ${meshName} is MISSING UV coordinates!`);
          }

          // Apply materials based on the mesh names
          if (meshName === "body") {
            // Configure texture if it exists AND we have UV coordinates
            let bodyTexture = null;
            if (texture && child.geometry.attributes.uv) {
              bodyTexture = texture.clone();
              bodyTexture.wrapS = THREE.RepeatWrapping;
              bodyTexture.wrapT = THREE.RepeatWrapping;

              // Apply controls from sliders
              const repeatX = textureControls?.flipX
                ? -textureControls.repeatX
                : textureControls?.repeatX || 1;
              const repeatY = textureControls?.flipY
                ? -textureControls.repeatY
                : textureControls?.repeatY || 1;

              bodyTexture.repeat.set(repeatX, repeatY);
              bodyTexture.offset.set(
                textureControls?.offsetX || 0,
                textureControls?.offsetY || 0
              );

              console.log("✅ Applied texture to body with controls:", {
                repeat: [repeatX, repeatY],
                offset: [
                  textureControls?.offsetX || 0,
                  textureControls?.offsetY || 0,
                ],
                size: `${texture.image?.width}x${texture.image?.height}`,
              });
            } else if (texture && !child.geometry.attributes.uv) {
              console.warn(
                "⚠️ Cannot apply texture to body: missing UV coordinates!"
              );
            }

            // Body gets the soda label texture + optional user color tint
            child.material = new THREE.MeshStandardMaterial({
              color: textureControls?.useColorTint ? color : "#ffffff", // White = no tint
              roughness: material.roughness,
              metalness: material.metalness,
              map: bodyTexture, // Will be null if no UV coordinates
            });
          } else if (meshName === "base" || meshName === "uppiece") {
            // Top and bottom stay metallic (no texture)
            child.material = new THREE.MeshStandardMaterial({
              color: "#dcdcdc", // Silver
              roughness: 0.3,
              metalness: 0.9,
            });
          } else {
            // Other parts stay metallic
            child.material = new THREE.MeshStandardMaterial({
              color: "#cdcdcd", // Silver
              roughness: 0.3,
              metalness: 0.9,
            });
          }

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      console.log("=== End UV Analysis ===");
    }
  }, [clonedScene, color, material, texture, textureControls]);


  return (
    <MovementAnimation rotationSpeed={0.5} floatAmplitude={0.4}>
    <group ref={groupRef}>
      {/* Auto-center the model based on bounding box */}
      <group
        position={
          boundingBox
            ? [
                -boundingBox.center.x,
                -boundingBox.center.y,
                -boundingBox.center.z,
              ]
            : [0, 0, 0]
        }
      >
        <primitive
          object={clonedScene}
          position={[0, 0, 0]}
          scale={[0.5, 0.5, 0.5]}
        />
      </group>
    </group>
    </MovementAnimation>
  );
}

// Preload the model
try {
  useGLTF.preload("/sodacan.gltf");
} catch (error) {
  console.warn("Could not preload GLTF model");
}
