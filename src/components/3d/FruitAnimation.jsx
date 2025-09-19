import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function FruitAnimation({
  children,
  rotationSpeed = 0.3, // Slower than the can
  floatSpeed = 1.2, // Different timing than the can
  floatAmplitude = 0.2, // Subtle bobbing
  randomOffset = 0, // To make each fruit unique
  enabled = true,
}) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current && enabled) {
      // Unique timing for each fruit based on randomOffset
      const time = state.clock.elapsedTime + randomOffset;

      // Gentle rotation around Y axis
      groupRef.current.rotation.y = Math.sin(time * rotationSpeed) * 0.3;

      // Subtle floating motion
      groupRef.current.position.y =
        Math.sin(time * floatSpeed) * floatAmplitude;

      // Optional: slight X/Z wobble for more organic feel
      groupRef.current.rotation.x = Math.sin(time * 0.8) * 0.1;
      groupRef.current.rotation.z = Math.cos(time * 0.6) * 0.1;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}
