import { CONFIG_OPTIONS, DEFAULT_CONFIG } from "../../config/modelConfig";

export default function ConfiguratorPanel({ config, setConfig }) {
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

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  // Inline styles to avoid CSS module conflicts
  const panelStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    maxWidth: "320px",
    width: "300px",
    maxHeight: "90vh",
    overflowY: "auto",
    zIndex: 20,
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    margin: "0 0 20px 0",
    color: "#1f2937",
  };

  const sectionStyle = {
    marginBottom: "24px",
  };

  const sectionTitleStyle = {
    fontWeight: "600",
    margin: "0 0 12px 0",
    color: "#374151",
    fontSize: "0.95rem",
  };

  const colorGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
  };

  const colorButtonStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "2px solid #d1d5db",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const activeColorButtonStyle = {
    ...colorButtonStyle,
    borderColor: "#1f2937",
    boxShadow: "0 0 0 3px rgba(31, 41, 55, 0.3)",
  };

  const materialButtonsStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const materialButtonStyle = {
    width: "100%",
    padding: "10px 12px",
    background: "#f3f4f6",
    border: "2px solid transparent",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left",
    fontSize: "0.9rem",
  };

  const activeMaterialButtonStyle = {
    ...materialButtonStyle,
    background: "#dbeafe",
    borderColor: "#3b82f6",
    color: "#1e40af",
  };

  const resetButtonStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease",
  };

  const infoTextStyle = {
    marginTop: "16px",
    fontSize: "0.75rem",
    color: "#6b7280",
    textAlign: "center",
  };

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>Configure Model</h2>

      {/* Color Selection */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Color</h3>
        <div style={colorGridStyle}>
          {Object.entries(CONFIG_OPTIONS.colors).map(([key, color]) => (
            <button
              key={key}
              onClick={() => handleColorChange(key)}
              style={
                config.color === color
                  ? activeColorButtonStyle
                  : colorButtonStyle
              }
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: color,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Material Selection */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Material</h3>
        <div style={materialButtonsStyle}>
          {Object.entries(CONFIG_OPTIONS.materials).map(
            ([materialKey, materialProps]) => (
              <button
                key={materialKey}
                onClick={() => handleMaterialChange(materialKey)}
                style={
                  config.material === materialProps
                    ? activeMaterialButtonStyle
                    : materialButtonStyle
                }
                onMouseEnter={(e) => {
                  if (config.material !== materialProps) {
                    e.target.style.background = "#e5e7eb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (config.material !== materialProps) {
                    e.target.style.background = "#f3f4f6";
                  }
                }}
              >
                {materialProps.name}
              </button>
            )
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={sectionStyle}>
        <button
          onClick={handleReset}
          style={resetButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.background = "#4b5563";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#6b7280";
          }}
        >
          Reset to Default
        </button>
      </div>

      {/* Info */}
      <div style={infoTextStyle}>
        💡 Tip: Try different materials and colors!
      </div>
    </div>
  );
}
