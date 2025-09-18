'use client'

import React, { useState } from 'react'
import PresetTextures from '../components/PresetTextures'
import Configurator from '../components/Configurator'
import { DEFAULT_CONFIG } from '../config/modelConfig'
import styles from './page.module.css'

export default function Home() {
	const [config, setConfig] = useState(DEFAULT_CONFIG)

	const getFlavorName = () => {
		if (!config.textureUrl) {
			return 'Choose Your Flavor'
		}

		if (config.textureUrl.includes('BlueberryMint')) {
			return 'Blueberry Mint'
		}
		if (config.textureUrl.includes('OrangeYuzu')) {
			return 'Orange Yuzu'
		}
		if (config.textureUrl.includes('LimeExplosion')) {
			return 'Lime Explosion'
		}
		if (config.textureUrl.includes('StrawberryPunch')) {
			const isZero = config.textureUrl.includes('Sugarfree')
			return isZero ? 'Strawberry Punch Sugar Free' : 'Strawberry Punch'
		}

		return 'Custom Flavor'
	}

	return (
		<div>
			<section className={styles.container}>
				<div className={styles.leftContent}>
					<div className={styles.configuratorWrapper}>
						{/* Skicka config och setConfig som props till Configurator */}
						<Configurator config={config} setConfig={setConfig} />
					</div>
				</div>
				<div className={styles.rightContent}>
					<h1 className={styles.title}>{getFlavorName()}</h1>
					<h3 className={styles.flavourTitle}>Choose flavour</h3>

					<PresetTextures config={config} setConfig={setConfig} />

					<h3 className={styles.sugarFreeTitel}>Sugar Free</h3>
					<button>Add to cart</button>
					<div className={styles.infoText}>
						This is some information about some good soda
					</div>
					<button className={styles.dropDown}>Ingredients</button>
				</div>
			</section>
		</div>
	)
}
