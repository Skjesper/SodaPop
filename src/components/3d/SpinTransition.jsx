import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import GlowEffect from './GlowEffect'

export default function SpinTransition({
	children,
	trigger,
	spinSpeed = 16,
	minSpins = 2
}) {
	const groupRef = useRef()
	const [isSpinning, setIsSpinning] = useState(false)
	const [previousTrigger, setPreviousTrigger] = useState(trigger)
	const [savedRotation, setSavedRotation] = useState(0)
	const [canStop, setCanStop] = useState(false)
	const [rotationsCompleted, setRotationsCompleted] = useState(0)
	const [lastRotation, setLastRotation] = useState(0)
	// Added effect "Rebound/jump" for the 3d
	const [bouncing, setBouncing] = useState(false)
	const [bounceFrameStart, setBounceFrameStart] = useState(0) // Frame count when bounce starts
	const frameCountRef = useRef(0) // Frame counter

	// Detects trigger change
	useEffect(() => {
		if (previousTrigger !== trigger && previousTrigger !== undefined) {
			if (groupRef.current) {
				const currentRotation = groupRef.current.rotation.y
				setSavedRotation(currentRotation)
				setLastRotation(currentRotation)
				setRotationsCompleted(0)
				setCanStop(false)
				setIsSpinning(true)
				// Effect jump/Rebound
				setBouncing(false)
				groupRef.current.position.y = 0
			}
		}
		setPreviousTrigger(trigger)
	}, [trigger, previousTrigger])

	// Animation Spin
	useFrame(() => {
		frameCountRef.current += 1 // Increment frame count

		if (!groupRef.current) return

		const group = groupRef.current

		// Spin logic
		if (isSpinning) {
			group.rotation.y += spinSpeed * 0.028

			// Simplified rotation counting
			if (!canStop) {
				const totalRotated = group.rotation.y - lastRotation
				const completedSpins = Math.floor(totalRotated / (Math.PI * 2))

				if (completedSpins !== rotationsCompleted) {
					setRotationsCompleted(completedSpins)
					if (completedSpins >= minSpins) {
						setCanStop(true)
					}
				}
			}

			// Stop condition
			if (canStop) {
				const currentRot = group.rotation.y
				const rotationsFromSaved = currentRot - savedRotation
				const nextFullRotation =
					Math.ceil(rotationsFromSaved / (Math.PI * 2)) * Math.PI * 2
				const targetRot = savedRotation + nextFullRotation

				// Overlapp the spin with the Jump/Rebound
				if (currentRot >= targetRot - 0.2) {
					// Starts the bounce a bit before spins stopps
					if (!bouncing) {
						setBouncing(true)
						setBounceFrameStart(frameCountRef.current) // Use frames instead of Date.now
						setTimeout(() => setBouncing(false), 300)
					}

					if (currentRot >= targetRot - 0.05) {
						group.rotation.y = targetRot
						setIsSpinning(false)
						setCanStop(false)
					}
				}
			}
		}

		// Logic for the Rebounce effect
		if (bouncing && bounceFrameStart > 0) {
			const framesPassed = frameCountRef.current - bounceFrameStart
			const bounceProgress = framesPassed / 36 //= 600ms

			if (bounceProgress < 1) {
				const bounceHeight =
					Math.sin(bounceProgress * Math.PI * 4) * 0.3 * (1 - bounceProgress)
				group.position.y = bounceHeight
			} else {
				group.position.y = 0
			}
		}
	})

	return (
		<group ref={groupRef}>
			{/* Removed glow effect to spinTransition for now. */}
			{/* <GlowEffect trigger={trigger} /> */}
			{children}
		</group>
	)
}
