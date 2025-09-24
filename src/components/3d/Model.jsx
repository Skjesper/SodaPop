import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { useTexturedCanvas } from "./../../hooks/useTexturedCanvas";
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
  customText = "", // Custom text for baking into texture
}) {
  const groupRef = useRef();
  const [modelError, setModelError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [boundingBox, setBoundingBox] = useState(null);

  // Load the GLB model
  const gltf = useGLTF("/frolig1.glb");

  // Stable text options - useMemo to prevent recreation on every render
  const textOptions = useMemo(
    () => ({
      fontSize: 48,
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
      color: "#ff0000", // Bright red for testing
      strokeColor: "#ffffff", // White outline
      strokeWidth: 4, // Thicker outline
      x: 0.5, // Center horizontally
      y: 0.2, // A bit lower
      maxWidth: 0.8,
      textAlign: "center",
    }),
    []
  ); // Empty dependency array - these options are static

  // Use texture baking hook with stable options
  const { texture: combinedTexture, isLoading: textureLoading } =
    useTexturedCanvas(textureUrl, customText, textOptions);

  // Handle loading timeout
  useEffect(() => {
    if (gltf?.scene) {
      setIsLoading(false);
      setModelError(false);
      return;
    }

    const timeout = setTimeout(() => {
      setModelError(true);
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [gltf?.scene]);

  // Show loading fallback during initial load
  if (isLoading && !gltf?.scene) {
    return (
      <ModelFallback
        color="#888888"
        material={{ roughness: 0.5, metalness: 0.1 }}
      />
    );
  }

  // If model failed to load, show fallback
  if (modelError || !gltf?.scene) {
    return <ModelFallback color={color} material={material} />;
  }

  // Clone the scene to avoid modifying the original
  const clonedScene = gltf.scene.clone();

  // Calculate bounding box for auto-centering (only once)
  useEffect(() => {
    if (clonedScene && groupRef.current && !boundingBox) {
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
  }, [clonedScene, boundingBox]);

  // Apply materials to different parts
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          const meshName = child.name.toLowerCase();

          if (meshName === "cylinder006_1") {
            // Main body - use combined texture (base + custom text)
            let bodyTexture = null;
            if (combinedTexture && child.geometry.attributes.uv) {
              bodyTexture = combinedTexture.clone();
              bodyTexture.wrapS = THREE.RepeatWrapping;
              bodyTexture.wrapT = THREE.RepeatWrapping;

              bodyTexture.center.set(0.5, 0.5);
              bodyTexture.rotation = 0;

              // Apply user controls normally
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

              bodyTexture.flipY = false;
            }

            child.material = new THREE.MeshStandardMaterial({
              color: textureControls?.useColorTint ? color : "#ffffff",
              roughness: 0.2,
              metalness: 0.1,
              map: bodyTexture,
            });
          } else if (meshName === "cylinder006") {
            // Glossy material
            child.material = new THREE.MeshStandardMaterial({
              color: "#ffffff",
              roughness: 0.5,
              metalness: 1.6,
            });
          } else if (meshName === "opener") {
            // Metallic material
            child.material = new THREE.MeshStandardMaterial({
              color: "#dcdcdc",
              roughness: 0.3,
              metalness: 0.9,
            });
          } else {
            // Default metallic for any other parts
            child.material = new THREE.MeshStandardMaterial({
              color: "#cdcdcd",
              roughness: 0.3,
              metalness: 0.9,
            });
          }

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [clonedScene, color, material, combinedTexture, textureControls]);

  return (
    <group ref={groupRef}>
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
        <group rotation={[0, 0, Math.PI / 6]}>
          <MovementAnimation rotationSpeed={0.5} floatAmplitude={0.4}>
            <primitive
              object={clonedScene}
              position={[0, 0, 0]}
              scale={[7, 7, 7]}
            />
          </MovementAnimation>
        </group>
      </group>
    </group>
  );
}

// Preload the GLB model
useGLTF.preload("/frolig1.glb");
