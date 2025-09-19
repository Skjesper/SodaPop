export function ProvisionalFruit({ fruitType, position, scale = 1 }) {
    const fruitConfig = {
      blueberry: {
        geometry: <sphereGeometry args={[1.8 * scale, 8, 6]} />,
        color: '#51a3d9'
      },
      strawberry: {
        geometry: <coneGeometry args={[1.8* scale, 0.6 * scale, 8]} />,
        color: '#fe3944'
      },
      lime: {
        geometry: <sphereGeometry args={[1.8* scale, 8, 6]} />,
        color: '#83c846'
      },
      orange: {
        geometry: <sphereGeometry args={[1.8 * scale, 8, 6]} />,
        color: '#fe8a26'
      }
    };
  
    const config = fruitConfig[fruitType];
    if (!config) return null;
  
    return (
      <mesh position={position} castShadow>
        {config.geometry}
        <meshStandardMaterial color={config.color} />
      </mesh>
    );
  }


  //const fruitResources = {
  //blueberry: {
   // type: 'model',
    //paths: ["/assets/models/blueberry1.glb", "/assets/models/blueberry2.glb"]
  //},
  //strawberry: {
   // type: 'image', 
    //paths: ["/assets/images/strawberry.png"]
 // }
//};