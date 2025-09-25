import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import { useTexturedCanvas } from "./../../hooks/useTexturedCanvas";
import MovementAnimation from "./MovementAnimation";

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
  customText = "",
}) {
  const groupRef = useRef();
  const visibleGroupRef = useRef();
  const [modelError, setModelError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [boundingBox, setBoundingBox] = useState(null);
  const [showModel, setShowModel] = useState(false);

  const [animationScale, setAnimationScale] = useState(0);

  const gltf = useGLTF("/frolig1.glb");

  const textOptions = useMemo(
    () => ({
      fontSize: 150,
      fontFamily: "Pacifico, cursive",
      fontWeight: "",
      color: "#e8e8e8",
      strokeColor: "#b2b2b2",
      strokeWidth: 9,
      x: 0.25,
      y: 0.09,
      maxWidth: 1,
      textAlign: "center",
    }),
    []
  );

  const { texture: combinedTexture, isLoading: textureLoading } =
    useTexturedCanvas(textureUrl, customText, textOptions);

  useFrame((state, delta) => {
    if (showModel && visibleGroupRef.current) {
      const targetScale = 1;
      const animationSpeed = 4;

      if (animationScale < targetScale) {
        const newScale = Math.min(
          targetScale,
          animationScale + delta * animationSpeed
        );
        setAnimationScale(newScale);

        const easedScale = 1 - Math.pow(1 - newScale, 3);
        visibleGroupRef.current.scale.setScalar(easedScale);
      }
    }
  });

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

  if (isLoading && !gltf?.scene) {
    return (
      <ModelFallback
        color="#888888"
        material={{ roughness: 0.5, metalness: 0.1 }}
      />
    );
  }

  if (modelError || !gltf?.scene) {
    return <ModelFallback color={color} material={material} />;
  }

  const clonedScene = gltf.scene.clone();
  const visibleClonedScene = gltf.scene.clone();

  useEffect(() => {
    if (clonedScene && groupRef.current && !boundingBox) {
      const timer = setTimeout(() => {
        try {
          const box = new THREE.Box3().setFromObject(groupRef.current);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          const newBoundingBox = {
            center: { x: center.x, y: center.y, z: center.z },
            size: { x: size.x, y: size.y, z: size.z },
          };

          setBoundingBox(newBoundingBox);

          setTimeout(() => {
            setShowModel(true);
            setAnimationScale(0.01);
          }, 50);
        } catch (error) {
          console.error("Error calculating bounding box:", error);
          setShowModel(true);
          setAnimationScale(0.01);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [clonedScene, boundingBox]);

  useEffect(() => {
    [clonedScene, visibleClonedScene].forEach((scene) => {
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh) {
            const meshName = child.name.toLowerCase();

            if (meshName === "cylinder006_1") {
              let bodyTexture = null;
              if (combinedTexture && child.geometry.attributes.uv) {
                bodyTexture = combinedTexture.clone();
                bodyTexture.wrapS = THREE.RepeatWrapping;
                bodyTexture.wrapT = THREE.RepeatWrapping;

                bodyTexture.center.set(0.5, 0.5);
                bodyTexture.rotation = 0;

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
              child.material = new THREE.MeshStandardMaterial({
                color: "#ffffff",
                roughness: 0.5,
                metalness: 1.6,
              });
            } else if (meshName === "opener") {
              child.material = new THREE.MeshStandardMaterial({
                color: "#dcdcdc",
                roughness: 0.3,
                metalness: 0.9,
              });
            } else {
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
    });
  }, [
    clonedScene,
    visibleClonedScene,
    color,
    material,
    combinedTexture,
    textureControls,
  ]);

  return (
    <>
      <group ref={groupRef}>
        <group position={[0, 0, 0]}>
          <group rotation={[0, 0, Math.PI / 6]}>
            <MovementAnimation rotationSpeed={0.5} floatAmplitude={0.4}>
              <primitive
                object={clonedScene}
                position={[0, 0, 0]}
                scale={[7, 7, 7]}
                visible={false}
              />
            </MovementAnimation>
          </group>
        </group>
      </group>

      {/* Visible model with scale animation */}
      {showModel && (
        <group ref={visibleGroupRef} scale={[0, 0, 0]}>
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
                  object={visibleClonedScene}
                  position={[0, 0, 0]}
                  scale={[7, 7, 7]}
                />
              </MovementAnimation>
            </group>
          </group>
        </group>
      )}
    </>
  );
}

useGLTF.preload("/frolig1.glb");
