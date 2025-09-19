import { useState, useEffect } from 'react';
import { FruitFactory } from '../../factories/FruitFactory';
import { ProvisionalFruit } from './ProvisionalFruit';

export default function FruitBackground({ config }) {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const newFruits = FruitFactory.createFruitsByTexture(config.textureUrl, 6);
    setFruits(newFruits);
  }, [config.textureUrl]);

  return (
    <group>
      {fruits.map((fruit) => (
        <ProvisionalFruit
          key={fruit.key}
          fruitType={fruit.type}
          position={fruit.position}
          scale={fruit.scale}
        />
      ))}
    </group>
  );
}