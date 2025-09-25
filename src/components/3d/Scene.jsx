'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'
import SpinTransition from './SpinTransition'

export default function Scene({ config, windowSize }) {
	console.log('Scene received config:', config)

	const controlsRef = useRef()

	const [isClient, setIsClient] = useState(false)
	const [lightIntensity, setLightIntensity] = useState({
		ambient: 0.55,
		main: 2.0
	})
	const [controlSettings, setControlSettings] = useState({
		enablePan: false,
		minDistance: 10,
		maxDistance: 100,
		rotateSpeed: 1.0,
		zoomSpeed: 1.0
	})

	const prevTextureUrl = useRef(config.textureUrl)

	useEffect(() => {
		setIsClient(true)
	}, [])

	useEffect(() => {
		if (isClient && windowSize) {
			const isMobile = windowSize.width < 768

			setLightIntensity({
				ambient: isMobile ? 0.66 : 0.55,
				main: isMobile ? 2.2 : 2.0
			})

			setControlSettings({
				enablePan: !isMobile,
				minDistance: isMobile ? 15 : 10,
				maxDistance: isMobile ? 120 : 100,
				rotateSpeed: isMobile ? 0.8 : 1.0,
				zoomSpeed: isMobile ? 0.6 : 1.0
			})
		}
	}, [isClient, windowSize])

	useEffect(() => {
		if (
			isClient &&
			controlsRef.current &&
			prevTextureUrl.current !== config.textureUrl
		) {
			controlsRef.current.reset()
			prevTextureUrl.current = config.textureUrl
		}
	}, [config.textureUrl, isClient])

	return (
		<>
			{/* Improved Ambient Light - Increased for darker metallic materials */}
			<ambientLight intensity={lightIntensity.ambient} color="#ffffff" />

			{/* Main directional light -new intensity*/}
			<directionalLight
				position={[5, 5, 5]}
				intensity={lightIntensity.main}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-camera-far={50}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>

			{/* Back lighting - NEW for dark rear areas */}
			<directionalLight
				position={[-5, 3, -3]}
				intensity={1.0}
				color="#ffffff"
			/>
			<directionalLight
				position={[0, -3, -5]}
				intensity={0.8}
				color="#f8f9fa"
			/>

			{/* Boosted Fill lights for better illumination */}
			<pointLight position={[-5, 5, 5]} intensity={0.8} color="#ffffff" />
			<pointLight position={[5, -5, -5]} intensity={0.7} color="#ffffff" />
			<pointLight position={[0, 5, -5]} intensity={0.6} color="#ffeaa7" />

			{/* NEW: Additional point lights for 360° coverage */}
			<pointLight position={[0, -5, 0]} intensity={0.4} color="#ffffff" />
			<pointLight position={[-3, 0, -3]} intensity={0.5} color="#ffffff" />
			<pointLight position={[3, 0, -3]} intensity={0.5} color="#ffffff" />

			{/* Improved Silhouette lighting for  shape definition */}
			<spotLight
				position={[-3, 3, 3]}
				angle={0.3}
				penumbra={1}
				intensity={0.7}
				color="#74b9ff"
			/>

			{/* NEW: Silhouette lighting */}
			<spotLight
				position={[3, -3, -3]}
				angle={0.4}
				penumbra={1}
				intensity={0.6}
				color="#ddd6fe"
			/>

			{/* Model with Suspense */}
			<Suspense fallback={null}>
				{/* Ice circles - capa intermedia */}
				{/* <IceCircles count={4} /> */}

				{/* spin effect: Wrapper detect change textureUrl */}
				<group rotation={[0, Math.PI / 6, 0]}>
					{/* 30° till vänster */}
					<SpinTransition trigger={config.textureUrl}>
						<Model
							modelPath={config.modelPath}
							color={config.color}
							material={config.material}
							textureUrl={config.textureUrl}
							textureControls={config.textureControls}
							customText={config.customText} // Pass custom text to model
							showDebug={false}
						/>
					</SpinTransition>
				</group>
				{/* Background from the "FruitFactory"*/}
				{/* <FruitBackground config={config} /> */}
			</Suspense>

			{/* Rendera OrbitControls endast på client-side för att undvika hydration errors */}
			{isClient && (
				<OrbitControls
					ref={controlsRef}
					enablePan={controlSettings.enablePan}
					enableZoom={true}
					enableRotate={true}
					minDistance={controlSettings.minDistance}
					maxDistance={controlSettings.maxDistance}
					maxPolarAngle={Math.PI / 2}
					target={[0, 0, 0]}
					enableDamping={true}
					dampingFactor={0.05}
					rotateSpeed={controlSettings.rotateSpeed}
					zoomSpeed={controlSettings.zoomSpeed}
				/>
			)}
		</>
	)
}
