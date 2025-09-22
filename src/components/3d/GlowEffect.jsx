import { useState, useEffect } from 'react';

export default function GlowEffect({ trigger }) {
  const [glowActive, setGlowActive] = useState(false);
  const [previousTrigger, setPreviousTrigger] = useState(trigger);

  useEffect(() => {
    if (previousTrigger !== trigger && previousTrigger !== undefined) {
      setGlowActive(true);
      setTimeout(() => setGlowActive(false), 800);
    }
    setPreviousTrigger(trigger);
  }, [trigger, previousTrigger]);

  if (!glowActive) return null;

  return (
    <>
      {/* Principal frontal light */}
      <pointLight position={[0, 0, 8]} intensity={25} color="#ffffff" distance={18} />
      {/* Lights above and under*/}
      <pointLight position={[0, 6, 0]} intensity={35} color="#ffdd00" distance={16} />
      <pointLight position={[0, -6, 0]} intensity={35} color="#ffaa00" distance={16} />
      {/* Lateral lights */}
      <pointLight position={[6, 0, 4]} intensity={15} color="#ffff00" distance={14} />
      <pointLight position={[-6, 0, 4]} intensity={15} color="#ffff00" distance={14} />
    </>
  );
}