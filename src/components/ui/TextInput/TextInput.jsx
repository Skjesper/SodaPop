import { useState, useEffect } from "react";
import styles from "./textInput.module.css";

export default function TextInput({
  value = "",
  onChange,
  placeholder = "Enter custom text...",
  maxLength = 15,
  flavorColors = null,
}) {
  const [isClient, setIsClient] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value.slice(0, maxLength);
    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleClear = () => {
    setLocalValue("");
    if (onChange) {
      onChange("");
    }
  };

  // Set CSS custom properties for dynamic theming
  const inputStyle =
    isClient && flavorColors
      ? {
          "--primary-color": flavorColors.primary,
          "--secondary-color": flavorColors.secondary,
          "--border-color": flavorColors.primary + "60",
        }
      : {};

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${styles.textInput} ${
            isClient && flavorColors ? styles.dynamic : styles.default
          }`}
          style={inputStyle}
        />
        {localValue && (
          <button
            onClick={handleClear}
            className={styles.clearButton}
            title="Clear text"
          >
            ×
          </button>
        )}
      </div>
      <div className={styles.counter}>
        {localValue.length}/{maxLength}
      </div>
    </div>
  );
}
