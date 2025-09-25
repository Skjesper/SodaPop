import * as THREE from 'three';

export default function IceCircles({ count = 4 }) {
  const circles = Array.from({ length: count }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20, 
      -5 + Math.random() * -4
    ],
    scale: Math.random() * 1.5 + 1.5,
    key: i
  }));

  const iceMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 0.95,
    roughness: 0.05,
    metalness: 0,
    thickness: 0.8,
    ior: 1.31,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    color: '#e8f4f8'
  });

  return (
    <group>
      {circles.map((circle) => (
        <mesh key={circle.key} position={circle.position}>
          <sphereGeometry args={[circle.scale, 32, 32]} />
          <primitive object={iceMaterial} />
        </mesh>
      ))}
    </group>
  );
}