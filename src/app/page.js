'use client'

import React, { useState } from 'react'
import AddToCartButton from '../components/ui/AddToCartButton'
import PresetTextures from '../components/PresetTextures'
import SugarFreeTextures from '../components/SugarFreeTextures'
import IngredientsDropdown from '../components/ui/IngredientsDropDown/IngredientsDropDown'
import Configurator from '../components/Configurator'
import { DEFAULT_CONFIG } from '../config/modelConfig'
import { FLAVOR_CONFIG } from '../config/flavorConfig'
import styles from './page.module.css'

export default function Home() {
	const [config, setConfig] = useState(DEFAULT_CONFIG)

	const getCurrentFlavor = () => {
		if (!config.textureUrl) return null

		const flavorKey = Object.keys(FLAVOR_CONFIG).find((key) =>
			config.textureUrl.toLowerCase().includes(key.toLowerCase())
		)

		return flavorKey ? FLAVOR_CONFIG[flavorKey] : null
	}

	const getFlavorName = () => {
		const currentFlavor = getCurrentFlavor()

		if (!currentFlavor) {
			return 'Choose Your Flavor'
		}

		const isSugarFree = config.textureUrl?.includes('Sugarfree')

		return isSugarFree ? `${currentFlavor.name} Sugar Free` : currentFlavor.name
	}

	const getFlavorText = (textKey) => {
		const currentFlavor = getCurrentFlavor()
		return (
			currentFlavor?.text?.[textKey] || 'Choose your flavor to see description'
		)
	}

	const getIngredients = () => {
		const currentFlavor = getCurrentFlavor()
		return currentFlavor?.ingredients || []
	}

	const getButtonTexts = () => {
		const flavorName = getFlavorName()

		return {
			default: `Add to cart`,
			clicked: `${flavorName} added!`
		}
	}

	const handleAddToCart = (cartConfig) => {
		const currentFlavor = getCurrentFlavor()
		console.log('Adding to cart:', {
			flavor: getFlavorName(),
			flavorConfig: currentFlavor,
			config: cartConfig
		})
	}

	const getTitleStyle = () => {
		const currentFlavor = getCurrentFlavor()
		if (!currentFlavor?.colors) {
			return {}
		}

		return {
			color: currentFlavor.colors.primary
		}
	}

	return (
		<div>
			<section className={styles.container}>
				<div className={styles.leftContent}>
					<div className={styles.configuratorWrapper}>
						<Configurator config={config} setConfig={setConfig} />
					</div>
				</div>
				<div className={styles.rightContent}>
					<div className={styles.rightContentWrapper}>
						<h1 className={styles.title} style={getTitleStyle()}>
							{getFlavorName()}
						</h1>
						<h3 className={styles.flavourTitle}>Choose flavour</h3>

						<PresetTextures config={config} setConfig={setConfig} />

						<h3 className={styles.sugarFreeTitle}>Sugar Free</h3>

						<SugarFreeTextures config={config} setConfig={setConfig} />

						<AddToCartButton
							config={config}
							flavorColors={getCurrentFlavor()?.colors}
							texts={getButtonTexts()}
							onAddToCart={handleAddToCart}
						/>

						<div className={styles.infoText}>
							{getFlavorText('description')}
						</div>
						<IngredientsDropdown ingredients={getIngredients()} />
					</div>
				</div>
			</section>
		</div>
	)
}
