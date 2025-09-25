import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import * as THREE from "three";
import { useOptionalTexture } from "../../hooks/useOptionalTexture";
import { CONFIG_OPTIONS } from "../../config/modelConfig";
import FruitAnimation from "./FruitAnimation";

// Fallback component for when models are loading or fail
function FruitFallback({ fruitType, scale, color }) {
  const geometricConfig = {
    blueberry: <sphereGeometry args={[1.8 * scale, 8, 6]} />,
    strawberry: <coneGeometry args={[1.8 * scale, 0.6 * scale, 8]} />,
    lime: <sphereGeometry args={[1.8 * scale, 8, 6]} />,
    orange: <sphereGeometry args={[1.8 * scale, 8, 6]} />,
  };

  return (
    <mesh castShadow>
      {geometricConfig[fruitType]}
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// GLTF model component for strawberry
function StrawberryModel({ scale }) {
  const strawberryConfig = CONFIG_OPTIONS.fruitModels.strawberry;
  const gltf = useGLTF(strawberryConfig.modelPath);
  const { texture: strawberryTexture } = useOptionalTexture(
    strawberryConfig.texturePath
  );

  // Clone the scene to avoid modifying the original
  const clonedScene = gltf.scene.clone();

  // Apply strawberry texture with inverted colors to fix the texture issue
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          // Apply strawberry texture to the model
          // Try different approaches to fix the inverted colors
          const material = new THREE.MeshStandardMaterial({
            map: strawberryTexture || null,
            color: strawberryTexture ? "#ffffff" : "#fe3944", // White when texture loaded, red fallback
            roughness: 0.3,
            metalness: 0.1,
          });

          // Try flipping the texture if colors are inverted
          if (strawberryTexture) {
            // Option 1: Try flipping the texture
            strawberryTexture.wrapS = THREE.RepeatWrapping;
            strawberryTexture.wrapT = THREE.RepeatWrapping;
            strawberryTexture.flipY = false; // Try both true and false

            // Option 2: You might need to invert the color
            // material.color.setHex(0x000000) // Try black instead of white
          }

          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [clonedScene, strawberryTexture]);

  return <primitive object={clonedScene} scale={[scale, scale, scale]} />;
}

// Main Fruit component
export function Fruit({ fruitType, position, scale = 1 }) {
  const fruitConfig = {
    blueberry: { color: "#51a3d9", hasModel: false },
    strawberry: { color: "#fe3944", hasModel: true },
    lime: { color: "#83c846", hasModel: false },
    orange: { color: "#fe8a26", hasModel: false },
  };

  const config = fruitConfig[fruitType];
  if (!config) return null;

  // Generate a random offset for unique animations
  const randomOffset = Math.random() * Math.PI * 2;

  return (
    <group position={position}>
      <FruitAnimation
        randomOffset={randomOffset}
        rotationSpeed={0.2 + Math.random() * 0.3} // 0.2-0.5 random speed
        floatSpeed={1.0 + Math.random() * 0.8} // 1.0-1.8 random speed
        floatAmplitude={0.15 + Math.random() * 0.2} // 0.15-0.35 random amplitude
        enabled={config.hasModel} // Only animate GLTF models for now
      >
        {config.hasModel && fruitType === "strawberry" ? (
          <Suspense
            fallback={
              <FruitFallback
                fruitType={fruitType}
                scale={scale}
                color={config.color}
              />
            }
          >
            <StrawberryModel scale={scale} />
          </Suspense>
        ) : (
          <FruitFallback
            fruitType={fruitType}
            scale={scale}
            color={config.color}
          />
        )}
      </FruitAnimation>
    </group>
  );
}

// Preload the strawberry model from config
useGLTF.preload(CONFIG_OPTIONS.fruitModels.strawberry.modelPath);
