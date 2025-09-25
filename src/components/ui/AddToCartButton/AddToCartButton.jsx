import { useState, useEffect } from 'react'
import styles from './addToCartButton.module.css'

export default function AddToCartButton({
	config,
	flavorColors = null,
	texts = {
		default: 'Add to Cart',
		clicked: 'Added to Cart!'
	},
	clickDuration = 2000,
	onAddToCart
}) {
	const [isClicked, setIsClicked] = useState(false)
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	const handleAddToCart = () => {
		setIsClicked(true)

		if (onAddToCart) {
			onAddToCart(config)
		}

		setTimeout(() => {
			setIsClicked(false)
		}, clickDuration)
	}

	const buttonStyle =
		isClient && flavorColors
			? {
					'--primary-color': flavorColors.primary,
					'--secondary-color': flavorColors.secondary,
					'--text-color': flavorColors.textColor || 'white',
					'--shadow-color': flavorColors.primary + '40'
			  }
			: {}

	return (
		<button
			className={`${styles.addToCartButton} ${
				isClient && flavorColors ? styles.dynamic : styles.default
			} ${isClicked ? styles.clicked : ''}`}
			style={buttonStyle}
			onClick={handleAddToCart}
		>
			{isClicked ? texts.clicked : texts.default}
		</button>
	)
}
