import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function SpinTransition({ 
  children, 
  trigger, 
  duration = 1000,
  spinSpeed = 12 
}) {
  const groupRef = useRef();
  const [isSpinning, setIsSpinning] = useState(false);
  const [previousTrigger, setPreviousTrigger] = useState(trigger);

  // Detects trigger change
  useEffect(() => {
    if (previousTrigger !== trigger && previousTrigger !== undefined) {
      setIsSpinning(true);
      
      const timer = setTimeout(() => {
        setIsSpinning(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
    setPreviousTrigger(trigger);
  }, [trigger, previousTrigger, duration]);

  // Animation Spin
  useFrame(() => {
    if (groupRef.current && isSpinning) {
      groupRef.current.rotation.y += spinSpeed * 0.016;
    }
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}