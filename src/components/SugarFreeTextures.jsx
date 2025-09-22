'use client'

import React from 'react'
import { CONFIG_OPTIONS } from '../config/modelConfig'
import { FLAVOR_CONFIG } from '../config/flavorConfig'
import { FlavourPickerButton } from './ui/FlavourPickerButton/FlavourPickerButton'
import styles from './Configurator/configurator.module.css'

const SugarFreeTextures = ({ config, setConfig }) => {
	const handleSugarFreeToggle = () => {
		if (!config.textureUrl) return

		const currentFlavorKey = Object.keys(CONFIG_OPTIONS.textures).find(
			(key) => config.textureUrl === CONFIG_OPTIONS.textures[key]
		)

		if (!currentFlavorKey) return

		const isSugarFree = currentFlavorKey.includes('SugarFree')

		if (isSugarFree) {
			const regularKey = currentFlavorKey.replace('SugarFree', '')
			if (CONFIG_OPTIONS.textures[regularKey]) {
				setConfig((prev) => ({
					...prev,
					textureUrl: CONFIG_OPTIONS.textures[regularKey]
				}))
			}
		} else {
			const sugarFreeKey = currentFlavorKey + 'SugarFree'
			if (CONFIG_OPTIONS.textures[sugarFreeKey]) {
				setConfig((prev) => ({
					...prev,
					textureUrl: CONFIG_OPTIONS.textures[sugarFreeKey]
				}))
			}
		}
	}

	const getCurrentFlavorKey = () => {
		if (!config.textureUrl) return null

		return Object.keys(CONFIG_OPTIONS.textures).find(
			(key) => config.textureUrl === CONFIG_OPTIONS.textures[key]
		)
	}

	const isSugarFreeSelected = () => {
		const currentKey = getCurrentFlavorKey()
		return currentKey?.includes('SugarFree') || false
	}

	const whiteButtonConfig = {
		colors: {
			primary: '#ffffff',
			secondary: '#f8f9fa',
			hover: '#e9ecef'
		}
	}

	return (
		<div className={styles.sugarFreeSection}>
			<FlavourPickerButton
				flavorKey="sugarFree"
				flavorConfig={whiteButtonConfig}
				isSelected={isSugarFreeSelected()}
				onClick={handleSugarFreeToggle}
				showCheckmark={true}
				alwaysBorder={true}
			/>
		</div>
	)
}

export default SugarFreeTextures
