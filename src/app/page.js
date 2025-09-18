'use client'

import React, { useState } from 'react'
import AddToCartButton from '../components/ui/AddToCartButton'
import PresetTextures from '../components/PresetTextures'
import Configurator from '../components/Configurator'
import { DEFAULT_CONFIG } from '../config/modelConfig'
import { FLAVOR_CONFIG } from '../config/flavorConfig'
import styles from './page.module.css'

export default function Home() {
	const [config, setConfig] = useState(DEFAULT_CONFIG)

	// Hitta aktuell smak baserat på textureUrl
	const getCurrentFlavor = () => {
		if (!config.textureUrl) return null

		// DEBUG: Se vad som faktiskt finns i textureUrl
		console.log('Current textureUrl:', config.textureUrl)
		console.log('Available flavor keys:', Object.keys(FLAVOR_CONFIG))

		const flavorKey = Object.keys(FLAVOR_CONFIG).find((key) =>
			config.textureUrl.toLowerCase().includes(key.toLowerCase())
		)

		console.log('Found flavor key:', flavorKey)

		return flavorKey ? FLAVOR_CONFIG[flavorKey] : null
	}

	const getFlavorName = () => {
		const currentFlavor = getCurrentFlavor()

		if (!currentFlavor) {
			return 'Choose Your Flavor'
		}

		// Hantera special case för Sugar Free
		if (
			config.textureUrl.includes('StrawberryPunch') &&
			config.textureUrl.includes('Sugarfree')
		) {
			return 'Strawberry Punch Sugar Free'
		}

		return currentFlavor.name
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

	return (
		<div>
			<section className={styles.container}>
				<div className={styles.leftContent}>
					<div className={styles.configuratorWrapper}>
						<Configurator config={config} setConfig={setConfig} />
					</div>
				</div>
				<div className={styles.rightContent}>
					<h1 className={styles.title}>{getFlavorName()}</h1>
					<h3 className={styles.flavourTitle}>Choose flavour</h3>

					<PresetTextures config={config} setConfig={setConfig} />

					<h3 className={styles.sugarFreeTitel}>Sugar Free</h3>

					<AddToCartButton
						config={config}
						flavorColors={getCurrentFlavor()?.colors}
						texts={getButtonTexts()}
						onAddToCart={handleAddToCart}
					/>

					<div className={styles.infoText}>
						This is some information about some good soda
					</div>
					<button className={styles.dropDown}>Ingredients</button>
				</div>
			</section>
		</div>
	)
}
