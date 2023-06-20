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

  if (!shirtNode) {
    return null; // Return null or handle the case where the node is not found
  }

  return (
    <group>
      <mesh 
        castShadow
        geometry={shirtNode.geometry}
        material={shirtNode.material}
        material-roughness={1}
        dispose={null}
      />
    </group>
  )
}

export default Shirt