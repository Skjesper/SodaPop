'use client'

import React, { useState } from 'react'
import PresetTextures from '../components/PresetTextures'
import Configurator from '../components/Configurator'
import { DEFAULT_CONFIG } from '../config/modelConfig'
import styles from './page.module.css'

export default function Home() {
	const [config, setConfig] = useState(DEFAULT_CONFIG)

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
					<h1 className={styles.title}>Rubrik</h1>
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
