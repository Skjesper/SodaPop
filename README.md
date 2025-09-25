# SodaPop - 3D Product Configurator

A sophisticated interactive 3D beverage can configurator that brings product customization to life with cutting-edge web technologies.

## Description

SodaPop is a highly interactive and visually stunning 3D product configurator developed with modern web technologies. Built with Next.js 15, React Three Fiber, and Three.js, the application allows users to customize beverage cans with different flavors, textures, and visual effects in real-time. The project represents a professional-grade system that combines advanced 3D rendering with an intuitive user experience.

The customization process is seamless and engaging: users can select from multiple beverage flavors, each with its own unique color scheme and thematic elements. As selections are made, the 3D model updates instantly with new textures, materials, and lighting effects. The system features dynamic theming that transforms the entire interface based on the chosen flavor, creating an immersive brand experience.

The application showcases sophisticated 3D rendering techniques including professional lighting systems optimized for metallic materials, smooth animation transitions, and procedural content generation. Built with a modular architecture, SodaPop demonstrates enterprise-level code organization and scalability.

## Core Features

- **Real-time 3D Customization**: Interactive product configuration with immediate visual feedback
- **Dynamic Theming System**: Flavor-based color schemes using CSS variables
- **Advanced 3D Rendering**: Professional lighting optimized for metallic materials
- **Smooth Animations**: Fluid transitions with bounce effects and spin animations
- **Modular Architecture**: Scalable codebase with clear separation of concerns
- **Responsive Design**: Mobile-ready with progressive web app capabilities
- **Procedural Generation**: Algorithmic content creation for visual effects
- **Material System**: Multiple preset materials (matte, glossy, metallic, plastic)

### Technologies Used

Frontend:

- **Next.js 15**: Modern React framework with App Router
- **React Three Fiber**: React renderer for Three.js
- **Three.js**: Powerful 3D graphics library
- **CSS Modules**: Scoped styling with dynamic variables
- **Google Fonts**: Typography with DM Sans and DynaPuff

3D Assets & Configuration:

- **GLB Models**: Optimized 3D models with multiple mesh support
- **Dynamic Textures**: Real-time texture mapping and manipulation
- **Material Presets**: Pre-configured material properties
- **Lighting Systems**: Professional multi-source lighting setup

## Next.js 15 + React Three Fiber Setup

This project uses Next.js 15 with App Router for optimal performance and developer experience:

- **App Router**: Modern routing with layout support
- **React Three Fiber**: Declarative 3D rendering in React
- **Dynamic Imports**: Code splitting for optimal loading
- **CSS Modules**: Component-scoped styling

## Project Structure

SodaPop/
├── src/
│ ├── app/ Next.js App Router
│ ├── components/
│ │ ├── 3d/ Active 3D components
│ │ │ ├── Scene.jsx Main 3D scene orchestrator
│ │ │ ├── Model.jsx 3D model management
│ │ │ └── SpinTransition.jsx Animation system
│ │ ├── ui/ User interface components
│ │ │ ├── FlavourPickerButton.tsx
│ │ │ ├── IngredientsDropdown.tsx
│ │ │ └── AddToCartButton.tsx
│ │ └── componentsGY/ Extended 3D components
│ │ ├── FruitFactory.jsx Procedural generation
│ │ └── IceCircles.jsx Ice effects
│ ├── config/
│ │ ├── modelConfig.js Assets configuration
│ │ └── flavorConfig.js Content configuration
│ ├── factories/ Procedural generation patterns
│ └── hooks/ Custom React utilities
├── public/
│ ├── frolig1.glb Main 3D model
│ └── textures/ Product textures
└── README.md Project documentation

## How to Use

1. **Select Your Flavor**: Choose from 8 available beverage flavors, each with unique theming
2. **Customize Material**: Apply different material presets (matte, glossy, metallic, plastic)
3. **Adjust Texture Parameters**: Fine-tune texture repeat, offset, and color tinting
4. **Explore in 3D**: Use mouse controls to rotate and examine your customized product
5. **View Details**: Access ingredient information and product specifications
6. **Add to Cart**: Complete your configuration and proceed to purchase

## Installation Instructions

Prerequisites:

- Node.js v18 or higher
- npm or yarn package manager

Dependencies:

- Next.js 15.5.3 with React 19.1.0
- React Three Fiber 9.3.0 + Three.js 0.180.0
- React Three Drei 10.7.6 for 3D utilities

Steps:

1. Clone the repository:

git clone https://github.com/Skjesper/SodaPop
cd sodapop-configurator

2. Install dependencies:

npm install

3. Start development server:

npm run dev

For faster development with Turbopack:

npm run dev-turbo

4. Build for production:

npm run build
npm start

5. Visit:

http://localhost:3000

Available Scripts:

- npm run dev - Start development server
- npm run dev-turbo - Start development with Turbopack (faster)
- npm run build - Build for production
- npm run start - Start production server
- npm run lint - Run ESLint

## Configuration Setup

### Adding New Flavors

1. **Add Texture Files**: Place new texture images in the public/textures directory
2. **Update Asset Configuration**: Modify config/modelConfig.js:

textures: {
newFlavor: '/textures/new-flavor.jpg',
newFlavorZero: '/textures/new-flavor-zero.jpg'
}

3. **Configure Flavor Settings**: Update config/flavorConfig.js:

newFlavor: {
name: 'New Flavor',
colors: {
primary: '#FF6B35',
secondary: '#F7931E',
hover: '#FF8C42',
zero: '#FFB74D'
},
description: 'Flavor description...',
ingredients: ['ingredient1', 'ingredient2']
}

### Customizing Materials

Modify material presets in config/modelConfig.js:

materialPresets: {
matte: { roughness: 0.8, metalness: 0.1 },
glossy: { roughness: 0.2, metalness: 0.8 },
metallic: { roughness: 0.1, metalness: 0.9 },
plastic: { roughness: 0.6, metalness: 0.0 }
}

## 3D System Architecture

### Scene Management

- **Professional Lighting**: Multi-source lighting system optimized for metallic materials
- **Camera Controls**: Smooth OrbitControls for intuitive 3D navigation
- **Auto-centering**: Automatic bounding box calculation for model positioning

### Animation System

- **Spin Transitions**: Smooth rotation animations with precise tracking
- **Bounce Effects**: Coordinated bounce animations for product changes
- **Frame-based Timing**: 60fps synchronization using React Three Fiber's useFrame

### Procedural Generation

- **FruitFactory**: Algorithmic 3D content generation with anti-collision systems
- **Spatial Algorithms**: Position validation and forbidden zone management
- **Dual Rendering Modes**: Support for both GLTF models and geometric shapes

## Contributing

Contributions are welcome! To get involved:

1. Fork the repository
2. Create a new branch:

git checkout -b feature/amazing-feature

3. Make your changes and commit:

git commit -m "Add some amazing feature"

4. Push your branch:

git push origin feature/amazing-feature

5. Open a Pull Request

### Development Roadmap

**Product Expansion**

- Multiple 3D models with product variants
- New flavors with extensible architecture
- Custom materials and seasonal variants

**Advanced Visual Effects**

- Enhanced procedural background systems
- Particle effects for bubbles and vapor
- Environmental HDR lighting

**E-commerce Integration**

- Shopping cart functionality
- User accounts with saved configurations
- Configuration sharing system
- AR preview capabilities


© 2025 All Rights Reserved
