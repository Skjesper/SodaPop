import { useState } from 'react'
import styles from './ingredientsDropDown.module.css'

function IngredientsDropdown({ ingredients = [] }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<div
				className={styles.ingredientsHeader}
				onClick={() => setIsOpen(!isOpen)}
			>
				<h3>Ingredients</h3>
				<span className={styles.plusIcon}>{isOpen ? '-' : '+'}</span>
			</div>

			<div className={styles.underLine}></div>

			<div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
				{ingredients.length > 0 && (
					<ul className={styles.ingredientList}>
						{ingredients.map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default IngredientsDropdown
