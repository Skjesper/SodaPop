import { DM_Sans, DynaPuff } from 'next/font/google'
import './../styles/globals.css' // Importera din globala CSS

const dmSans = DM_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-dm-sans'
})

const dynaPuff = DynaPuff({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'], // Kolla vilka weights som finns för DynaPuff
	variable: '--font-dynapuff'
})

export const metadata = {
	title: '3D Configurator App',
	description:
		'Interactive 3D model configurator built with Next.js and Three.js'
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${dmSans.variable} ${dynaPuff.variable}`}>
				{children}
			</body>
		</html>
	)
}
