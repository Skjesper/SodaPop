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
  const [boundingBox, setBoundingBox] = useState(null);

  // Try to load the GLTF model with error handling
  let gltf = null;
  try {
    gltf = useGLTF("/sodacan.gltf");
    // Check if there are any images in the raw JSON that we missed
    console.log("Raw JSON keys:", Object.keys(gltf.parser.json));
    console.log("Any images?", gltf.parser.json.images);
    console.log("Any textures?", gltf.parser.json.textures);

    // Check the buffer more thoroughly - it might contain image data
    const buffer = gltf.parser.json.buffers[0];
    console.log("Buffer starts with:", buffer.uri.substring(0, 100));
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
  }, []);

  // Apply different materials to different parts
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          const meshName = child.name.toLowerCase();

          // Apply materials based on the mesh names we discovered
          if (meshName === "base") {
            // Metal material for base (bottom)
            child.material = new THREE.MeshStandardMaterial({
              color: "#dcdcdc", // Silver
              roughness: 0.3,
              metalness: 0.9,
              map: texture,
            });
          } else if (meshName === "uppiece") {
            // Metal material for uppiece (top)
            child.material = new THREE.MeshStandardMaterial({
              color: "#cdcdcd", // Silver
              roughness: 0.3,
              metalness: 0.9,
              map: texture,
            });
          } else if (meshName === "upcontorn") {
            child.material = new THREE.MeshStandardMaterial({
              color: "#cdcdcd", // Silver
              roughness: 0.3,
              metalness: 0.9,
              map: texture,
            });
          } else if (meshName === "ringball") {
            child.material = new THREE.MeshStandardMaterial({
              color: "#cdcdcd", // Silver
              roughness: 0.3,
              metalness: 0.9,
              map: texture,
            });
          } else if (meshName === "ringpart1") {
            child.material = new THREE.MeshStandardMaterial({
              color: "#cdcdcd", // Silver
              roughness: 0.3,
              metalness: 0.9,
              map: texture,
            });
          } else {
            // Matte material for body, upcontorn, ringball, ringpart1
            child.material = new THREE.MeshStandardMaterial({
              color: color,
              roughness: material.roughness,
              metalness: material.metalness,
              map: texture,
            });
          }
          // console.log(gltf.parser);
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [clonedScene, color, material, texture]);

  // Smooth rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
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
  );
}

// Preload the model
try {
  useGLTF.preload("/sodacan.gltf");
} catch (error) {
  console.warn("Could not preload GLTF model");
}
