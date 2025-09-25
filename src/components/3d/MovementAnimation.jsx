import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function MovementAnimation({
	children,
	rotationSpeed = 0.8,
	floatSpeed = 1.5,
	floatAmplitude = 0.4,
	enabled = true
}) {
	const groupRef = useRef()

	useFrame((state) => {
		if (groupRef.current && enabled) {
			groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed

			groupRef.current.position.y =
				Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude
		}
	})

	return <group ref={groupRef}>{children}</group>
}
