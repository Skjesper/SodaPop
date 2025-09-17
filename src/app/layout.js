import { DM_Sans } from 'next/font/google'
import './../styles/globals.css' // Importera din globala CSS

// Importera Google Font här
const dmSans = DM_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-dm-sans'
})

export const metadata = {
	title: '3D Configurator App',
	description:
		'Interactive 3D model configurator built with Next.js and Three.js'
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head></head>
			<body className={dmSans.className}>{children}</body>{' '}
		</html>
	)
}
