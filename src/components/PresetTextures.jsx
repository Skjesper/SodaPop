'use client'

import React from 'react'
import { CONFIG_OPTIONS } from '../config/modelConfig'
import { FLAVOR_CONFIG } from '../config/flavorConfig'
import { FlavourPickerButton } from './ui/FlavourPickerButton/FlavourPickerButton'
import styles from '../components/Configurator/configurator.module.css'

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

	// Filtrera bort sugar free variants - visa bara bas-smakerna
	const getBaseTextures = () => {
		return Object.entries(CONFIG_OPTIONS.textures).filter(
			([key]) => !key.includes('SugarFree')
		)
	}

	return (
		<div className={styles.configSection}>
			<div className={styles.textureButtons}>
				{getBaseTextures().map(([key, texturePath]) => {
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
