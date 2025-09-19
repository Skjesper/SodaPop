import { useState } from 'react'
import styles from './ingredientsDropDown.module.css'

function IngredientsDropdown({ ingredients = [] }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={styles.container}>
			<div
				className={styles.ingredientsHeader}
				onClick={() => setIsOpen(!isOpen)}
			>
				<h3>Ingredients</h3>
				<span className={styles.plusIcon}>{isOpen ? '-' : '+'}</span>
			</div>

			<div className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}>
				<ul className={styles.ingredientList}>
					{ingredients.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
			</div>

			<div className={styles.underLine}></div>
		</div>
	)
}

export default IngredientsDropdown
