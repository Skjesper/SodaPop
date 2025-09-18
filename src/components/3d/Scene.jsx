import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Model from './Model'
import SpinTransition from './SpinTransition'

// Simple fallback component
function ModelFallback() {
	return (
		<mesh position={[0, 0, 0]} castShadow receiveShadow>
			<cylinderGeometry args={[1, 1, 3, 8]} />
			<meshStandardMaterial color="#ff4444" />
		</mesh>
	)
}

export default function Scene({ config }) {
	console.log('Scene received config:', config)

	return (
		<>
			{/* Enhanced Lighting Setup (replacing Environment) */}
			<ambientLight intensity={0.3} />

			{/* Main directional light */}
			<directionalLight
				position={[5, 5, 5]}
				intensity={1.2}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
				shadow-camera-far={50}
				shadow-camera-left={-10}
				shadow-camera-right={10}
				shadow-camera-top={10}
				shadow-camera-bottom={-10}
			/>

			{/* Fill lights for better illumination */}
			<pointLight position={[-5, 5, 5]} intensity={0.6} color="#ffffff" />
			<pointLight position={[5, -5, -5]} intensity={0.4} color="#ffffff" />
			<pointLight position={[0, 5, -5]} intensity={0.3} color="#ffeaa7" />

			{/* Rim lighting for better shape definition */}
			<spotLight
				position={[-3, 3, 3]}
				angle={0.3}
				penumbra={1}
				intensity={0.5}
				color="#74b9ff"
			/>

			{/* Model with Suspense fallback */}
			<Suspense fallback={<ModelFallback />}>
				{/* spin effect: Wrapper detect change textureUrl */}
				<SpinTransition trigger={config.textureUrl}>
					<Model
						modelPath={config.modelPath}
						color={config.color}
						material={config.material}
						textureUrl={config.textureUrl}
						showDebug={false}
					/>
				</SpinTransition>
			</Suspense>

			{/* Camera controls */}
			<OrbitControls
				enablePan={false}
				enableZoom={true}
				enableRotate={true}
				minDistance={10}
				maxDistance={100}
				maxPolarAngle={Math.PI / 2}
				target={[0, 0, 0]}
				enableDamping={true}
				dampingFactor={0.05}
			/>
		</>
	)
}
