// AddToCartButton med CSS Custom Properties
import { useState } from 'react'
import styles from '../../styles/addToCartButton.module.css'

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

	const handleAddToCart = () => {
		setIsClicked(true)

		if (onAddToCart) {
			onAddToCart(config)
		}

		setTimeout(() => {
			setIsClicked(false)
		}, clickDuration)
	}

	// Sätt CSS custom properties
	const buttonStyle = flavorColors
		? {
				'--primary-color': flavorColors.primary,
				'--secondary-color': flavorColors.secondary,
				'--hover-color': flavorColors.hover,
				'--text-color': flavorColors.textColor || 'white',
				'--shadow-color': flavorColors.primary + '40'
		  }
		: {}

	return (
		<button
			className={`${styles.addToCartButton} ${
				flavorColors ? styles.dynamic : styles.default
			} ${isClicked ? styles.clicked : ''}`}
			style={buttonStyle}
			onClick={handleAddToCart}
		>
			{isClicked ? texts.clicked : texts.default}
		</button>
	)
}
