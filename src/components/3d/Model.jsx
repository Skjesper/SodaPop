import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

import { useOptionalTexture } from './../../hooks/useOptionalTexture'
import MovementAnimation from './MovementAnimation'

// Fallback component if model fails to load
function ModelFallback({ color, material }) {
	return (
		<mesh position={[0, 0, 0]} castShadow receiveShadow>
			<cylinderGeometry args={[1, 1, 3, 8]} />
			<meshStandardMaterial
				color={color}
				roughness={material.roughness}
				metalness={material.metalness}
			/>
		</mesh>
	)
}

export default function Model({
	color,
	material,
	textureUrl,
	textureControls
}) {
	const groupRef = useRef()
	const [modelError, setModelError] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [boundingBox, setBoundingBox] = useState(null)

	// Load the GLB model - använd modelPath prop
	const gltf = useGLTF('/frolig1.glb')

	// Load optional texture
	const { texture, isLoading: textureLoading } = useOptionalTexture(textureUrl)

	console.log('textureUrl received:', textureUrl)
	console.log('texture loaded:', texture)
	console.log('textureControls:', textureControls)

	// Handle loading timeout
	useEffect(() => {
		if (gltf?.scene) {
			setIsLoading(false)
			setModelError(false)
			return
		}

		const timeout = setTimeout(() => {
			setModelError(true)
			setIsLoading(false)
		}, 10000)

		return () => clearTimeout(timeout)
	}, [gltf?.scene])

	// Show loading fallback during initial load
	if (isLoading && !gltf?.scene) {
		return (
			<ModelFallback
				color="#888888"
				material={{ roughness: 0.5, metalness: 0.1 }}
			/>
		)
	}

	// If model failed to load, show fallback
	if (modelError || !gltf?.scene) {
		return <ModelFallback color={color} material={material} />
	}

	// Clone the scene to avoid modifying the original
	const clonedScene = gltf.scene.clone()

	// Calculate bounding box for auto-centering (only once)
	useEffect(() => {
		if (clonedScene && groupRef.current && !boundingBox) {
			const timer = setTimeout(() => {
				const box = new THREE.Box3().setFromObject(groupRef.current)
				const center = box.getCenter(new THREE.Vector3())
				const size = box.getSize(new THREE.Vector3())

				setBoundingBox({
					center: { x: center.x, y: center.y, z: center.z },
					size: { x: size.x, y: size.y, z: size.z }
				})
			}, 100)

			return () => clearTimeout(timer)
		}
	}, [clonedScene, boundingBox])

	// Apply materials to different parts
	useEffect(() => {
		if (clonedScene) {
			clonedScene.traverse((child) => {
				if (child.isMesh) {
					console.log('Found mesh:', child.name) // ← DEBUGGING TILLAGT HÄR
					const meshName = child.name.toLowerCase()

					if (meshName === 'cylinder006_1') {
						// Main body - apply texture and user-selected material
						let bodyTexture = null
						if (texture && child.geometry.attributes.uv) {
							bodyTexture = texture.clone()
							bodyTexture.wrapS = THREE.RepeatWrapping
							bodyTexture.wrapT = THREE.RepeatWrapping

							// Try different rotation - 90 degrees counterclockwise
							bodyTexture.center.set(0.5, 0.5) // Set rotation center
							bodyTexture.rotation = 0 // -90 degrees

							// Apply user controls normally
							const repeatX = textureControls?.flipX
								? -textureControls.repeatX
								: textureControls?.repeatX || 1
							const repeatY = textureControls?.flipY
								? -textureControls.repeatY
								: textureControls?.repeatY || 1

							bodyTexture.repeat.set(repeatX, repeatY)
							bodyTexture.offset.set(
								textureControls?.offsetX || 0,
								textureControls?.offsetY || 0
							)

							// Disable automatic flipping
							bodyTexture.flipY = false
						}

						child.material = new THREE.MeshStandardMaterial({
							color: textureControls?.useColorTint ? color : '#ffffff',
							roughness: 0.2,
							metalness: 0.1,
							map: bodyTexture
						})
					} else if (meshName === 'cylinder006') {
						// Glossy material
						child.material = new THREE.MeshStandardMaterial({
							color: '#ffffff',
							roughness: 0.5,
							metalness: 1.6
						})
					} else if (meshName === 'opener') {
						// Metallic material
						child.material = new THREE.MeshStandardMaterial({
							color: '#dcdcdc',
							roughness: 0.3,
							metalness: 0.9
						})
					} else {
						// Default metallic for any other parts
						child.material = new THREE.MeshStandardMaterial({
							color: '#cdcdcd',
							roughness: 0.3,
							metalness: 0.9
						})
					}

					child.castShadow = true
					child.receiveShadow = true
				}
			})
		}
	}, [clonedScene, color, material, texture, textureControls])

	return (
		<group ref={groupRef}>
			<group
				position={
					boundingBox
						? [
								-boundingBox.center.x,
								-boundingBox.center.y,
								-boundingBox.center.z
						  ]
						: [0, 0, 0]
				}
			>
				<group rotation={[0, 0, Math.PI / 6]}>
					<MovementAnimation rotationSpeed={0.5} floatAmplitude={0.4}>
						<primitive
							object={clonedScene}
							position={[0, 0, 0]}
							scale={[7, 7, 7]}
						/>
					</MovementAnimation>
				</group>
			</group>
		</group>
	)
}

// Preload the GLB model - uppdaterad sökväg
useGLTF.preload('/frolig1.glb')
