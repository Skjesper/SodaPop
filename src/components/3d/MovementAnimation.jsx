// components/3D/MovementAnimation.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function MovementAnimation({ 
  children, 
  oscillation = 0.6,         
  oscillationAmplitude = 0.8, 
  floatSpeed = 1.5,      
  floatAmplitude = 0.4,  
  enabled = true 
}) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current && enabled) {
      // Rotation in Y axis (left-right oscillation)
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * oscillation) * oscillationAmplitude;
      
      // Float up and down
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude;
    }
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}