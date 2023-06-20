import React from 'react'
import {easing} from 'maath'
import {useSnapshot} from 'valtio'
import { useFrame ,useGraph} from '@react-three/fiber'
import { Decal,useGLTF,useTexture } from '@react-three/drei'
import state from '../store'

type ShirtNode = THREE.Mesh & {
  geometry: THREE.BufferGeometry;
  material: THREE.MeshStandardMaterial;
};


const Shirt = () => {
  const snap = useSnapshot(state)
  const {scene} = useGLTF('/shirt_baked.glb')
  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  const shirtNode = React.useMemo(() => scene.getObjectByName('T_Shirt_male') as ShirtNode, [scene]);

  useFrame((state,delta)=> easing.dampC(shirtNode.material.color , snap.color , 0.25 , delta) )

  if (!shirtNode) {
    return null; // Return null or handle the case where the node is not found
  }

  const stateString = JSON.stringify(snap)

  return (
    <group key={stateString}>
      <mesh 
        castShadow
        geometry={shirtNode.geometry}
        material={shirtNode.material}
        material-roughness={1}
        dispose={null}
      > 
        {snap.isFulltexture && (
          <Decal 
          position={[0,0,0]}
          rotation={[0,0,0]}
          scale={1}
          map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
          position={[0,0.04,0.15]}
          rotation={[0,0,0]}
          scale={0.15}
          map={logoTexture}
          map-anisotropy ={16}
          depthTest={false}
          depthWrite={false}
          />
        )}
      
      </mesh>
    </group>
  )
}

export default Shirt