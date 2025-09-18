import styles from '../../styles/flavourPickerButton.module.css'

export function FlavourPickerButton({
	flavorKey,
	flavorConfig,
	isSelected,
	onClick
}) {
	// Sätt CSS custom properties för dynamiska färger
	const buttonStyle = flavorConfig?.colors
		? {
				'--primary-color': flavorConfig.colors.primary,
				'--secondary-color': flavorConfig.colors.secondary,
				'--hover-color': flavorConfig.colors.hover,
				'--shadow-color': flavorConfig.colors.primary + '40' // 40 = 25% opacity
		  }
		: {}

	return (
		<button
			className={`
                ${styles.flavourPickerButton} 
                ${flavorConfig?.colors ? styles.dynamic : styles.default}
                ${isSelected ? styles.selected : ''}
            `}
			style={buttonStyle}
			onClick={() => onClick(flavorKey)}
		>
			{/* Du kan lägga till en ikon eller text här om du vill */}
		</button>
	)
}
