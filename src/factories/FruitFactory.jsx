export class FruitFactory {
  static createFruitsByTexture(textureUrl, count = 6) {
    if (!textureUrl) return [];

    let fruitType = null;
    if (textureUrl.includes("BlueberryMint")) fruitType = "blueberry";
    if (textureUrl.includes("OrangeYuzu")) fruitType = "orange";
    if (textureUrl.includes("LimeExplosion")) fruitType = "lime";
    if (textureUrl.includes("StrawberryPunch")) fruitType = "strawberry";

    if (!fruitType) return [];

    return this._generateFruitGroup(fruitType, count);
  }

  static _generateFruitGroup(fruitType, count) {
    const fruits = [];
    const maxAttempts = 50; // Prevent infinite loops

    // Different positioning strategies based on fruit type
    const isGLTFModel = fruitType === "strawberry"; // Will expand this list later

    for (let i = 0; i < count; i++) {
      let position;
      let scale;
      let validPosition = false;
      let attempts = 0;

      while (!validPosition && attempts < maxAttempts) {
        attempts++;

        if (isGLTFModel) {
          // Tighter, more controlled positioning for GLTF models
          position = [
            (Math.random() - 0.5) * 25, // Reduced from 60 - closer together
            (Math.random() - 0.5) * 25, // Reduced from 40 - closer together
            -5 + Math.random() * -12, // Closer range: -15 to -25 (vs -25 to -40)
          ];
          scale = Math.random() * 5 + 22.5; // Smaller scale for GLTF: 0.2-0.5 vs 0.4-1.2
        } else {
          // Original positioning for geometric shapes
          position = [
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 40,
            -25 + Math.random() * -15,
          ];
          scale = Math.random() * 0.8 + 0.4;
        }

        // Check if position is valid
        if (this._isPositionValid(position, fruits, isGLTFModel)) {
          validPosition = true;
        }
      }

      // If we couldn't find a valid position after max attempts, use the last generated one
      // This prevents getting stuck but might occasionally have overlaps
      fruits.push({
        type: fruitType,
        position: position,
        scale: scale,
        key: `${fruitType}-${i}-${Date.now()}`,
      });
    }

    return fruits;
  }

  static _isPositionValid(newPosition, existingFruits, isGLTFModel) {
    const [x, y, z] = newPosition;

    // Forbidden zone: directly behind the can
    // Can is roughly at [0, 0, 0], so avoid a cylinder behind it
    const forbiddenRadius = 8; // Adjust this based on your can size
    const distanceFromCenter = Math.sqrt(x * x + y * y);

    if (distanceFromCenter < forbiddenRadius) {
      return false; // Too close to can center
    }

    // Check distance from other fruits
    const minDistance = isGLTFModel ? 12 : 8; // GLTF models need more space

    for (const existingFruit of existingFruits) {
      const [ex, ey, ez] = existingFruit.position;
      const distance = Math.sqrt((x - ex) ** 2 + (y - ey) ** 2 + (z - ez) ** 2);

      if (distance < minDistance) {
        return false; // Too close to another fruit
      }
    }

    return true; // Position is valid!
  }
}
