import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
	return (
		<div>
			<section className={styles.container}>
				<div className={styles.leftContent}>
					{/* Här kan du lägga till innehåll för leftContent */}
				</div>
				<div className={styles.rightContent}>
					<h1 className={styles.title}>Rubrik</h1>
					<h3 className={styles.flavourTitle}>Choose flavour</h3>
					<h3 className={styles.sugarFreeTitel}>Suger Free</h3>
					<button>Add to cart</button>
					<div className={styles.infoText}>
						This is some information about some good soda
					</div>
					<button className={styles.dropDown}>Ingredients</button>
				</div>
			</section>
		</div>
	)
}
