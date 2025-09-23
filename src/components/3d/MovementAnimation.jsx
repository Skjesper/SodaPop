import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function MovementAnimation({
	children,
	rotationSpeed = 0.8, // Hastighet för rotation
	floatSpeed = 1.5, // Hastighet för upp/ner rörelse
	floatAmplitude = 0.4, // Amplitud för upp/ner rörelse
	enabled = true
}) {
	const groupRef = useRef()

	useFrame((state) => {
		if (groupRef.current && enabled) {
			// Kontinuerlig 360 graders rotation runt Y-axel
			groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed

			// Float up and down
			groupRef.current.position.y =
				Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude
		}
	})

	return <group ref={groupRef}>{children}</group>
}
