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
					{/* Här kan du lägga till innehåll för rightContent */}
				</div>
			</section>
		</div>
	)
}
