'use client'

import React from 'react'
import { CONFIG_OPTIONS } from '../config/modelConfig'
import styles from '../styles/configurator.module.css'

const PresetTextures = ({ config, setConfig }) => {
	const handlePresetTextureChange = (textureKey) => {
		setConfig((prev) => ({
			...prev,
			textureUrl: CONFIG_OPTIONS.textures[textureKey]
		}))
	}

	return (
		<div className={styles.configSection}>
			<h3 className={styles.sectionTitle}>Preset Textures</h3>
			<div className={styles.textureButtons}>
				{Object.entries(CONFIG_OPTIONS.textures).map(([key, texturePath]) => (
					<button
						key={key}
						onClick={() => handlePresetTextureChange(key)}
						className={`${styles.textureButton} ${
							config.textureUrl === texturePath ? styles.active : ''
						}`}
					>
						{key.charAt(0).toUpperCase() + key.slice(1)}
					</button>
				))}
			</div>
		</div>
	)
}

export default PresetTextures
