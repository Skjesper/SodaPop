import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Model from './Model'
import SpinTransition from './SpinTransition'
import FruitBackground from './FruitBackground'
import IceCircles from './IceCircles'

// Simple fallback component
function ModelFallback() {
	return (
		<mesh position={[0, 0, 0]} castShadow receiveShadow>
			<cylinderGeometry args={[1, 1, 3, 8]} />
			<meshStandardMaterial color="#ff4444" />
		</mesh>
	)
}

export default function Scene({ config, windowSize }) {
	console.log('Scene received config:', config)

	// Lights controls eacgh light intensity,Responsive lighting based on screen size, 
	const ambientIntensity = windowSize?.width < 768 ? 0.66 : 0.55
	const mainLightIntensity = windowSize?.width < 768 ? 2.2 : 2.0

	return (
		<>
			{/* Improved Ambient Light - Increased for darker metallic materials */}
			<ambientLight intensity={ambientIntensity} color="#ffffff" />

			{/* Main directional light -new intensity*/}
			<directionalLight
				position={[5, 5, 5]}
				intensity={mainLightIntensity}
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

			{/* Model with Suspense fallback */}
			<Suspense fallback={<ModelFallback />}>
				{/* Ice circles - capa intermedia */}
				{/* <IceCircles count={4} /> */}
				
				{/* spin effect: Wrapper detect change textureUrl */}
				<SpinTransition trigger={config.textureUrl}>
					<Model
						modelPath={config.modelPath}
						color={config.color}
						material={config.material}
						textureUrl={config.textureUrl}
						textureControls={config.textureControls}
						showDebug={false}
					/>
				</SpinTransition>
				
				{/* Background from the "FruitFactrory"*/}
				{/* <FruitBackground config={config} /> */}
			</Suspense>

			{/* Responsive Camera controls */}
			<OrbitControls
				enablePan={windowSize?.width > 768}
				enableZoom={true}
				enableRotate={true}
				minDistance={windowSize?.width < 768 ? 15 : 10}
				maxDistance={windowSize?.width < 768 ? 120 : 100}
				maxPolarAngle={Math.PI / 2}
				target={[0, 0, 0]}
				enableDamping={true}
				dampingFactor={0.05}
				rotateSpeed={windowSize?.width < 768 ? 0.8 : 1.0}
				zoomSpeed={windowSize?.width < 768 ? 0.6 : 1.0}
			/>
		</>
	)
}