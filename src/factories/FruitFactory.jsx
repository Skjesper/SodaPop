export class FruitFactory {
    static createFruitsByTexture(textureUrl, count = 6) {
      if (!textureUrl) return [];
      
      let fruitType = null;
      if (textureUrl.includes('BlueberryMint')) fruitType = 'blueberry';
      if (textureUrl.includes('OrangeYuzu')) fruitType = 'orange';
      if (textureUrl.includes('LimeExplosion')) fruitType = 'lime';
      if (textureUrl.includes('StrawberryPunch')) fruitType = 'strawberry';
      
      if (!fruitType) return [];
      
      return this._generateFruitGroup(fruitType, count);
    }
  
    static _generateFruitGroup(fruitType, count) {
      const fruits = [];
      
      for (let i = 0; i < count; i++) {
        fruits.push({
          type: fruitType,
          position: [
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40,
            -25 + Math.random() * -15
          ],
          scale: Math.random() * 0.8 + 0.4,
          key: `${fruitType}-${i}-${Date.now()}`
        });
      }
      
      return fruits;
    }
  }