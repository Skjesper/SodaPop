import { useState, useEffect } from "react";
import * as THREE from "three";

export function useOptionalTexture(url) {
  const [loadedTexture, setLoadedTexture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) {
      setLoadedTexture(null);
      return;
    }

    setIsLoading(true);
    const loader = new THREE.TextureLoader();

    loader.load(
      url,
      (texture) => {
        setLoadedTexture(texture);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.warn("Failed to load texture:", url, error);
        setLoadedTexture(null);
        setIsLoading(false);
      }
    );
  }, [url]);

  return { texture: loadedTexture, isLoading };
}
