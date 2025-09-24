"use client";

import React, { useState, useEffect } from "react";
import AddToCartButton from "../components/ui/AddToCartButton/AddToCartButton";
import PresetTextures from "../components/PresetTextures";
import SugarFreeTextures from "../components/SugarFreeTextures";
import IngredientsDropdown from "../components/ui/IngredientsDropDown/IngredientsDropDown";
import TextInput from "../components/ui/TextInput/TextInput";
import Configurator from "../components/Configurator/Configurator";
import { DEFAULT_CONFIG } from "../config/modelConfig";
import { FLAVOR_CONFIG } from "../config/flavorConfig";
import styles from "./page.module.css";

export default function Home() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isClient, setIsClient] = useState(false);

  // Sätt isClient till true efter mount för att undvika hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);

  const getCurrentFlavor = () => {
    if (!config.textureUrl) return null;

    const flavorKey = Object.keys(FLAVOR_CONFIG).find((key) =>
      config.textureUrl.toLowerCase().includes(key.toLowerCase())
    );

    return flavorKey ? FLAVOR_CONFIG[flavorKey] : null;
  };

  const getCurrentColors = () => {
    const currentFlavor = getCurrentFlavor();
    if (!currentFlavor?.colors) return null;

    const isSugarFree = config.textureUrl?.includes("Sugarfree");

    if (isSugarFree && currentFlavor.colors.zero) {
      return {
        ...currentFlavor.colors,
        primary: currentFlavor.colors.zero,
        secondary: currentFlavor.colors.zero,
        hover: currentFlavor.colors.zero,
      };
    }

    return currentFlavor.colors;
  };

  const getFlavorName = () => {
    // Returnera consistent värde på server och initialt på klient
    if (!isClient) {
      return "Choose Your Flavor";
    }

    const currentFlavor = getCurrentFlavor();

    if (!currentFlavor) {
      return "Choose Your Flavor";
    }

    const isSugarFree = config.textureUrl?.includes("Sugarfree");

    return isSugarFree
      ? `${currentFlavor.name} Sugar Free`
      : currentFlavor.name;
  };

  const getFlavorText = (textKey) => {
    // Returnera consistent värde på server och initialt på klient
    if (!isClient) {
      return "Choose your flavor to see description";
    }

    const currentFlavor = getCurrentFlavor();
    return (
      currentFlavor?.text?.[textKey] || "Choose your flavor to see description"
    );
  };

  const getIngredients = () => {
    if (!isClient) {
      return [];
    }

    const currentFlavor = getCurrentFlavor();
    return currentFlavor?.ingredients || [];
  };

  const getButtonTexts = () => {
    const flavorName = getFlavorName();

    return {
      default: `Add to cart`,
      clicked: `${flavorName} added!`,
    };
  };

  const handleAddToCart = (cartConfig) => {
    const currentFlavor = getCurrentFlavor();
  };

  const handleTextChange = (newText) => {
    setConfig((prev) => ({
      ...prev,
      customText: newText,
    }));
  };

  const getTitleStyle = () => {
    // Returnera tomt objekt på server för consistent rendering
    if (!isClient) {
      return {};
    }

    const colors = getCurrentColors();
    if (!colors) return {};

    return {
      color: colors.primary,
    };
  };

  return (
    <div>
      <section className={styles.container}>
        <div className={styles.leftContent}>
          <div className={styles.configuratorWrapper}>
            <Configurator config={config} setConfig={setConfig} />
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.rightContentInner}>
            <div className={styles.rightContentWrapper}>
              <h1 className={styles.title} style={getTitleStyle()}>
                {getFlavorName()}
              </h1>
              <h3 className={styles.flavourTitle}>Choose flavour</h3>

              <PresetTextures config={config} setConfig={setConfig} />

              <h3 className={styles.sugarFreeTitle}>Sugar Free</h3>

              <SugarFreeTextures config={config} setConfig={setConfig} />

              <h3 className={styles.customTextTitle}>Custom Text</h3>

              <TextInput
                value={config.customText}
                onChange={handleTextChange}
                placeholder="Enter text for your can..."
                maxLength={20}
                flavorColors={getCurrentColors()}
              />

              <AddToCartButton
                config={config}
                flavorColors={getCurrentColors()}
                texts={getButtonTexts()}
                onAddToCart={handleAddToCart}
              />

              <div className={styles.infoText}>
                {getFlavorText("description")}
              </div>
              <IngredientsDropdown ingredients={getIngredients()} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
