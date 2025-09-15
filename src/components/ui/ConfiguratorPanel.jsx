import { CONFIG_OPTIONS, DEFAULT_CONFIG } from "../../config/modelConfig";
import styles from "../../styles/configurator.module.css";

export default function ConfiguratorPanel({ config, setConfig }) {
  const handleModelChange = (modelKey) => {
    setConfig((prev) => ({
      ...prev,
      modelPath: CONFIG_OPTIONS.models[modelKey],
    }));
  };

  const handleColorChange = (colorKey) => {
    setConfig((prev) => ({
      ...prev,
      color: CONFIG_OPTIONS.colors[colorKey],
    }));
  };

  const handleMaterialChange = (materialKey) => {
    setConfig((prev) => ({
      ...prev,
      material: CONFIG_OPTIONS.materials[materialKey],
    }));
  };

  const handlePresetTextureChange = (textureKey) => {
    setConfig((prev) => ({
      ...prev,
      textureUrl: CONFIG_OPTIONS.textures[textureKey],
    }));
  };

  const handleCustomTextureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setConfig((prev) => ({
        ...prev,
        textureUrl: url,
      }));
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const removeTexture = () => {
    setConfig((prev) => ({
      ...prev,
      textureUrl: null,
    }));
  };

  return (
    <div className={styles.configuratorPanel}>
      <h2 className={styles.panelTitle}>Configure Model</h2>

      {/* Model Selection */}
      <div className={styles.configSection}>
        <h3 className={styles.sectionTitle}>Model Variant</h3>
        <div className={styles.modelButtons}>
          {Object.entries(CONFIG_OPTIONS.models).map(([key, path]) => (
            <button
              key={key}
              onClick={() => handleModelChange(key)}
              className={`${styles.modelButton} ${
                config.modelPath === path ? styles.active : ""
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className={styles.configSection}>
        <h3 className={styles.sectionTitle}>Color</h3>
        <div className={styles.colorGrid}>
          {Object.entries(CONFIG_OPTIONS.colors).map(([key, color]) => (
            <button
              key={key}
              onClick={() => handleColorChange(key)}
              className={`${styles.colorButton} ${
                config.color === color ? styles.active : ""
              }`}
              style={{ backgroundColor: color }}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </div>
      </div>

      {/* Material Selection */}
      <div className={styles.configSection}>
        <h3 className={styles.sectionTitle}>Material</h3>
        <div className={styles.materialButtons}>
          {Object.entries(CONFIG_OPTIONS.materials).map(
            ([materialKey, materialProps]) => (
              <button
                key={materialKey}
                onClick={() => handleMaterialChange(materialKey)}
                className={`${styles.materialButton} ${
                  config.material === materialProps ? styles.active : ""
                }`}
              >
                {materialProps.name}
              </button>
            )
          )}
        </div>
      </div>

      {/* Preset Textures */}
      <div className={styles.configSection}>
        <h3 className={styles.sectionTitle}>Preset Textures</h3>
        <div className={styles.textureButtons}>
          {Object.entries(CONFIG_OPTIONS.textures).map(([key, texturePath]) => (
            <button
              key={key}
              onClick={() => handlePresetTextureChange(key)}
              className={`${styles.textureButton} ${
                config.textureUrl === texturePath ? styles.active : ""
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Texture Upload */}
      <div className={styles.configSection}>
        <h3 className={styles.sectionTitle}>Custom Texture</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleCustomTextureChange}
          className={styles.fileInput}
        />
        {config.textureUrl &&
          !Object.values(CONFIG_OPTIONS.textures).includes(
            config.textureUrl
          ) && (
            <button
              onClick={removeTexture}
              className={styles.removeTextureButton}
            >
              Remove Custom Texture
            </button>
          )}
      </div>

      {/* Action Buttons */}
      <div className={styles.configSection}>
        <button onClick={handleReset} className={styles.resetButton}>
          Reset to Default
        </button>
      </div>

      {/* Info */}
      <div className={styles.infoText}>
        💡 Tip: Try different model variants and textures!
      </div>
    </div>
  );
}
