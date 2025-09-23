'use client'

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from '../3d/Scene'
import LoadingFallback from '../3d/LoadingFallback'
import { CONFIG_OPTIONS } from '../../config/modelConfig'
import styles from './configurator.module.css'

export default function Configurator({ config, setConfig }) {
	const getBackgroundForTexture = () => {
		if (!config.textureUrl) {
			return '#ff0080'
		}

		const isZero = config.textureUrl.includes('Sugarfree')

		if (config.textureUrl.includes('BlueberryMint')) {
			return isZero
				? CONFIG_OPTIONS.flavorColors.blueberryZero
				: CONFIG_OPTIONS.flavorColors.blueberry
		}
		if (config.textureUrl.includes('OrangeYuzu')) {
			return isZero
				? CONFIG_OPTIONS.flavorColors.yuzuZero
				: CONFIG_OPTIONS.flavorColors.yuzu
		}
		if (config.textureUrl.includes('LimeExplosion')) {
			return isZero
				? CONFIG_OPTIONS.flavorColors.limeZero
				: CONFIG_OPTIONS.flavorColors.lime
		}
		if (config.textureUrl.includes('StrawberryPunch')) {
			return isZero
				? CONFIG_OPTIONS.flavorColors.strawberryZero
				: CONFIG_OPTIONS.flavorColors.strawberry
		}

		return '#000000'
	}

	const getBackgroundImage = () => {
		if (!config.textureUrl) return null

		const isZero = config.textureUrl.includes('Sugarfree')

		if (config.textureUrl.includes('BlueberryMint')) {
			return isZero
				? CONFIG_OPTIONS.backgroundImages.blueberryZero
				: CONFIG_OPTIONS.backgroundImages.blueberry
		}
		if (config.textureUrl.includes('OrangeYuzu')) {
			return isZero
				? CONFIG_OPTIONS.backgroundImages.yuzuZero
				: CONFIG_OPTIONS.backgroundImages.yuzu
		}
		if (config.textureUrl.includes('LimeExplosion')) {
			return isZero
				? CONFIG_OPTIONS.backgroundImages.limeZero
				: CONFIG_OPTIONS.backgroundImages.lime
		}
		if (config.textureUrl.includes('StrawberryPunch')) {
			return isZero
				? CONFIG_OPTIONS.backgroundImages.strawberryZero
				: CONFIG_OPTIONS.backgroundImages.strawberry
		}

		return null
	}

	const getBackgroundStyle = () => {
		const color = getBackgroundForTexture()
		const image = getBackgroundImage()

		return {
			backgroundColor: color,
			backgroundImage: image ? `url(${image})` : 'none',
			backgroundSize: '80%',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat'
		}
	}

	return (
		<div className={styles.appContainer} style={getBackgroundStyle()}>
			<Canvas
				shadows
				camera={{
					position: [0, 0, 50],
					fov: 30,
					near: 0.1,
					far: 1000
				}}
				gl={{ antialias: true, alpha: true }}
				dpr={[1, 2]}
				className={styles.canvasContainer}
			>
				<Suspense fallback={<LoadingFallback />}>
					<Scene config={config} />
				</Suspense>
			</Canvas>

			<div className={styles.appHeader}></div>
		</div>
	)
}
