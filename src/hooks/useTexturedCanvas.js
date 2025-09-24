import { useState, useEffect, useCallback, useMemo } from "react";
import * as THREE from "three";

// Custom debounce hook
function useDebounced(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useTexturedCanvas(
  baseTextureUrl,
  customText = "",
  textOptions = {}
) {
  const [combinedTexture, setCombinedTexture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce customText to avoid regenerating texture on every keystroke
  const debouncedCustomText = useDebounced(customText, 300);

  // Serialize textOptions to avoid object reference issues
  const textOptionsKey = useMemo(
    () => JSON.stringify(textOptions),
    [textOptions]
  );

  // Memoize text options with serialized key to avoid unnecessary re-renders
  const finalTextOptions = useMemo(
    () => ({
      fontSize: 48,
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
      color: "#ffffff",
      strokeColor: "#000000",
      strokeWidth: 2,
      x: 0.5, // 0-1 relative position (0.5 = center)
      y: 0.2, // 0-1 relative position (0.2 = near top)
      maxWidth: 0.8, // Maximum width as fraction of canvas
      textAlign: "center",
      ...textOptions,
    }),
    [textOptionsKey]
  ); // Use serialized key instead of object reference

  const generateCombinedTexture = useCallback(async () => {
    if (!baseTextureUrl) {
      console.log("No base texture URL provided");
      setCombinedTexture(null);
      return;
    }

    console.log("Generating combined texture with:", {
      baseTextureUrl,
      customText: debouncedCustomText,
    });
    setIsLoading(true);

    try {
      // Load base texture
      const textureLoader = new THREE.TextureLoader();
      const baseTexture = await new Promise((resolve, reject) => {
        textureLoader.load(baseTextureUrl, resolve, undefined, reject);
      });

      console.log("Base texture loaded:", baseTexture);

      // Create canvas with same dimensions as base texture
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size to match texture (or reasonable default)
      canvas.width = baseTexture.image.width || 512;
      canvas.height = baseTexture.image.height || 512;

      console.log("Canvas dimensions:", canvas.width, canvas.height);

      // Draw base texture
      ctx.drawImage(baseTexture.image, 0, 0, canvas.width, canvas.height);

      // Add custom text if provided
      if (debouncedCustomText && debouncedCustomText.trim()) {
        console.log("Adding custom text:", debouncedCustomText);

        // Calculate text position
        const x = finalTextOptions.x * canvas.width;
        const y = finalTextOptions.y * canvas.height;
        const maxWidth = finalTextOptions.maxWidth * canvas.width;

        console.log("Text position:", { x, y, maxWidth });

        // Set up text styling
        ctx.font = `${finalTextOptions.fontWeight} ${finalTextOptions.fontSize}px ${finalTextOptions.fontFamily}`;
        ctx.textAlign = finalTextOptions.textAlign;
        ctx.textBaseline = "middle";

        console.log("Text styling:", ctx.font);

        // Draw text stroke (outline)
        if (finalTextOptions.strokeWidth > 0) {
          ctx.strokeStyle = finalTextOptions.strokeColor;
          ctx.lineWidth = finalTextOptions.strokeWidth;
          ctx.strokeText(debouncedCustomText, x, y, maxWidth);
        }

        // Draw text fill
        ctx.fillStyle = finalTextOptions.color;
        ctx.fillText(debouncedCustomText, x, y, maxWidth);

        console.log("Text drawn with color:", finalTextOptions.color);
      } else {
        console.log("No custom text to add");
      }

      // Create Three.js texture from canvas
      const canvasTexture = new THREE.CanvasTexture(canvas);
      canvasTexture.wrapS = THREE.RepeatWrapping;
      canvasTexture.wrapT = THREE.RepeatWrapping;
      canvasTexture.flipY = false; // Important for proper orientation

      console.log("Canvas texture created:", canvasTexture);

      setCombinedTexture(canvasTexture);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to generate combined texture:", error);
      setCombinedTexture(null);
      setIsLoading(false);
    }
  }, [baseTextureUrl, debouncedCustomText, finalTextOptions]);

  // Regenerate texture when dependencies change
  useEffect(() => {
    generateCombinedTexture();
  }, [generateCombinedTexture]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (combinedTexture) {
        combinedTexture.dispose();
      }
    };
  }, [combinedTexture]);

  return {
    texture: combinedTexture,
    isLoading,
    regenerate: generateCombinedTexture,
  };
}
