export const CONFIG_OPTIONS = {
	models: {
		base: '/frolig1.glb',
		variant1: '/assets/models/product-variant-1.gltf',
		variant2: '/assets/models/product-variant-2.gltf'
	},
	colors: {
		red: '#ff4444',
		blue: '#4444ff',
		green: '#44ff44',
		black: '#222222',
		white: '#ffffff01',
		orange: '#ff8844',
		purple: '#8844ff',
		yellow: '#ffff44'
	},
	materials: {
		matte: {
			roughness: 0.8,
			metalness: 0.1,
			name: 'Matte'
		},
		glossy: {
			roughness: 0.2,
			metalness: 0.1,
			name: 'Glossy'
		},
		metallic: {
			roughness: 0.3,
			metalness: 0.9,
			name: 'Metallic'
		},
		plastic: {
			roughness: 0.4,
			metalness: 0.0,
			name: 'Plastic'
		}
	},
	textures: {
		blueberryMint: '/assets/textures/Label_BlueberryMint.png',
		orangeYuzu: '/assets/textures/Label_OrangeYuzu.png',
		limeExplosion: '/assets/textures/Label_LimeExplosion.png',
		strawberryPunch: '/assets/textures/Label_StrawberryPunch.png',

		blueberryMintSugarFree:
			'/assets/textures/Label_BlueberryMint-Sugarfree.png',
		orangeYuzuSugarFree: '/assets/textures/Label_OrangeYuzu-Sugarfree.png',
		limeExplosionSugarFree:
			'/assets/textures/Label_LimeExplosion-Sugarfree.png',
		strawberryPunchSugarFree:
			'/assets/textures/Label_StrawberryPunch-Sugarfree.png'
	},

	flavorColors: {
		strawberry: '#fe3944',
		yuzu: '#fe8a26',
		blueberry: '#51a3d9',
		lime: '#83c846',
		strawberryZero: '#d1000c',
		yuzuZero: '#ffbd37',
		blueberryZero: '#056db2',
		limeZero: '#40790e'
	}
}

export const DEFAULT_CONFIG = {
	modelPath: CONFIG_OPTIONS.models.base,
	color: CONFIG_OPTIONS.colors.red,
	material: CONFIG_OPTIONS.materials.matte,
	textureUrl: null,
	textureControls: {
		repeatX: 1,
		repeatY: 1,
		offsetX: 0,
		offsetY: 0,
		flipX: false,
		flipY: false,
		useColorTint: false
	}
}
