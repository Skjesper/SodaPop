import styles from "./../../styles/flavourPickerButton.module.css";

export function FlavourPickerButton({
  flavorKey,
  flavorConfig,
  isSelected,
  onClick,
  showCheckmark = false,
  alwaysBorder = false,
}) {
  const buttonStyle = flavorConfig?.colors
    ? {
        "--primary-color": flavorConfig.colors.primary,
        "--secondary-color": flavorConfig.colors.secondary,
        "--hover-color": flavorConfig.colors.hover,
        "--shadow-color": flavorConfig.colors.primary + "40",
      }
    : {};

  return (
    <button
      className={`
                ${styles.flavourPickerButton} 
                ${flavorConfig?.colors ? styles.dynamic : styles.default}
                ${isSelected ? styles.selected : ""}
                ${alwaysBorder ? styles.alwaysBorder : ""}
            `}
      style={buttonStyle}
      onClick={() => onClick(flavorKey)}
    >
      {showCheckmark && isSelected && (
        <span className={styles.checkmark}>✓</span>
      )}
    </button>
  );
}
