import { useState, useEffect } from "react";
import { FruitFactory } from "../../factories/FruitFactory";
import { Fruit } from "./Fruit";

export default function FruitBackground({ config }) {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    const newFruits = FruitFactory.createFruitsByTexture(config.textureUrl, 9);
    setFruits(newFruits);
  }, [config.textureUrl]);

  return (
    <group>
      {fruits.map((fruit) => (
        <Fruit
          key={fruit.key}
          fruitType={fruit.type}
          position={fruit.position}
          scale={fruit.scale}
        />
      ))}
    </group>
  );
}
