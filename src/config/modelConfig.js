export const CONFIG_OPTIONS = {
  models: {
    base: "/sodacan.gltf",
    variant1: "/assets/models/product-variant-1.gltf",
    variant2: "/assets/models/product-variant-2.gltf",
  },
  colors: {
    red: "#ff4444",
    blue: "#4444ff",
    green: "#44ff44",
    black: "#222222",
    white: "#ffffff",
    orange: "#ff8844",
    purple: "#8844ff",
    yellow: "#ffff44",
  },
  materials: {
    matte: {
      roughness: 0.8,
      metalness: 0.1,
      name: "Matte",
    },
    glossy: {
      roughness: 0.2,
      metalness: 0.1,
      name: "Glossy",
    },
    metallic: {
      roughness: 0.3,
      metalness: 0.9,
      name: "Metallic",
    },
    plastic: {
      roughness: 0.4,
      metalness: 0.0,
      name: "Plastic",
    },
  },
  textures: {
    leather: "/assets/textures/leather.jpg",
    fabric: "/assets/textures/fabric.jpg",
    metal: "/assets/textures/metal.jpg",
    wood: "/assets/textures/wood.jpg",
  },
};

export const DEFAULT_CONFIG = {
  modelPath: CONFIG_OPTIONS.models.base,
  color: CONFIG_OPTIONS.colors.red,
  material: CONFIG_OPTIONS.materials.matte,
  textureUrl: null,
};
