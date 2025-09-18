import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function SpinTransition({
  children,
  trigger,
  spinSpeed = 14,
  minSpins = 2,
}) {
  const groupRef = useRef();
  const [isSpinning, setIsSpinning] = useState(false);
  const [previousTrigger, setPreviousTrigger] = useState(trigger);
  const [savedRotation, setSavedRotation] = useState(0);
  const [canStop, setCanStop] = useState(false);
  const [rotationsCompleted, setRotationsCompleted] = useState(0);
  const [lastRotation, setLastRotation] = useState(0);

  // Detects trigger change
  useEffect(() => {
    if (previousTrigger !== trigger && previousTrigger !== undefined) {
      if (groupRef.current) {
        const currentRotation = groupRef.current.rotation.y;
        setSavedRotation(currentRotation);
        setLastRotation(currentRotation);
        setRotationsCompleted(0);
        setCanStop(false);
        setIsSpinning(true);
      }
    }
    setPreviousTrigger(trigger);
  }, [trigger, previousTrigger]);

  // Animation Spin
  useFrame(() => {
    if (!groupRef.current || !isSpinning) return;

    const group = groupRef.current;
    group.rotation.y += spinSpeed * 0.016;

    // Simplified rotation counting
    if (!canStop) {
      const totalRotated = group.rotation.y - lastRotation;
      const completedSpins = Math.floor(totalRotated / (Math.PI * 2));

      if (completedSpins !== rotationsCompleted) {
        setRotationsCompleted(completedSpins);
        if (completedSpins >= minSpins) {
          setCanStop(true);
        }
      }
    }

    // Stop condition
    if (canStop) {
      const currentRot = group.rotation.y;
      const rotationsFromSaved = currentRot - savedRotation;
      const nextFullRotation =
        Math.ceil(rotationsFromSaved / (Math.PI * 2)) * Math.PI * 2;
      const targetRot = savedRotation + nextFullRotation;

      if (currentRot >= targetRot - 0.05) {
        group.rotation.y = targetRot;
        setIsSpinning(false);
        setCanStop(false);
      }
    }
  });

  return <group ref={groupRef}>{children}</group>;
}
