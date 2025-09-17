import Link from 'next/link'

export default function Home() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
				color: 'white',
				fontFamily: 'system-ui, sans-serif'
			}}
		>
			<h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
				3D Configurator App
			</h1>

			<div style={{ display: 'flex', gap: '1rem' }}>
				<Link
					href="/configurator"
					style={{
						padding: '12px 24px',
						background: '#3b82f6',
						color: 'white',
						textDecoration: 'none',
						borderRadius: '6px',
						fontWeight: '500'
					}}
				>
					Launch Configurator
				</Link>

				<Link
					href="/test"
					style={{
						padding: '12px 24px',
						background: '#6b7280',
						color: 'white',
						textDecoration: 'none',
						borderRadius: '6px',
						fontWeight: '500'
					}}
				>
					Test Three.js
				</Link>
			</div>
		</div>
	)
}
