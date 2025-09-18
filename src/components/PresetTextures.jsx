'use client'

import React from 'react'
import { CONFIG_OPTIONS } from '../config/modelConfig'
import { FLAVOR_CONFIG } from '../config/flavorConfig'
import { FlavourPickerButton } from './ui/FlavourPickerButton'
import styles from '../styles/configurator.module.css'

const PresetTextures = ({ config, setConfig }) => {
	const handlePresetTextureChange = (textureKey) => {
		setConfig((prev) => ({
			...prev,
			textureUrl: CONFIG_OPTIONS.textures[textureKey]
		}))
	}

	const getCurrentFlavorKey = () => {
		if (!config.textureUrl) return null

		return Object.keys(CONFIG_OPTIONS.textures).find(
			(key) => config.textureUrl === CONFIG_OPTIONS.textures[key]
		)
	}

	return (
		<div className={styles.configSection}>
			<h3 className={styles.sectionTitle}>Preset Textures</h3>
			<div className={styles.textureButtons}>
				{Object.entries(CONFIG_OPTIONS.textures).map(([key, texturePath]) => {
					const flavorConfig = FLAVOR_CONFIG[key]

					return (
						<FlavourPickerButton
							key={key}
							flavorKey={key}
							flavorConfig={flavorConfig}
							isSelected={getCurrentFlavorKey() === key}
							onClick={handlePresetTextureChange}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default PresetTextures
