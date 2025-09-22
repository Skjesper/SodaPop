'use client'

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './3d/Scene'
import LoadingFallback from './3d/LoadingFallback'
import { CONFIG_OPTIONS } from '../config/modelConfig'
import styles from '../styles/configurator.module.css'
import { DEFAULT_CONFIG } from '../config/modelConfig'

export default function Configurator({ config, setConfig }) {
	const getBackgroundForTexture = () => {
		if (!config.textureUrl) {
			return '#ff0080'
		}

		if (config.textureUrl.includes('BlueberryMint')) {
			return CONFIG_OPTIONS.flavorColors.blueberry
		}
		if (config.textureUrl.includes('OrangeYuzu')) {
			return CONFIG_OPTIONS.flavorColors.yuzu
		}
		if (config.textureUrl.includes('LimeExplosion')) {
			return CONFIG_OPTIONS.flavorColors.lime
		}
		if (config.textureUrl.includes('StrawberryPunch')) {
			const isZero = config.textureUrl.includes('Sugarfree')
			const strawberryColor = isZero
				? CONFIG_OPTIONS.flavorColors.strawberryZero
				: CONFIG_OPTIONS.flavorColors.strawberry
			return strawberryColor
		}

		return '#000000'
	}

	const background = getBackgroundForTexture()

	return (
		<div className={styles.appContainer} style={{ background: background }}>
			{/* DEBUG BOX - Vit box med röd kant */}
			<div
				style={{
					position: 'absolute',
					top: '10px',
					right: '10px',
					background: 'rgba(255,255,255,0.95)',
					color: 'black',
					padding: '15px',
					borderRadius: '8px',
					fontSize: '14px',
					fontWeight: 'bold',
					zIndex: 1000,
					border: '3px solid #ff0000',
					boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
				}}
			>
				<div style={{ marginBottom: '5px' }}>🔍 DEBUG INFO</div>
				<div style={{ marginBottom: '3px' }}>
					Texture:{' '}
					{config.textureUrl ? config.textureUrl.split('/').pop() : 'None'}
				</div>
				<div style={{ marginBottom: '3px' }}>
					Background: {background.substring(0, 30)}...
				</div>
				<div>
					FlavorColors:{' '}
					{CONFIG_OPTIONS.flavorColors ? 'Loaded ✅' : 'Missing ❌'}
				</div>
			</div>

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
