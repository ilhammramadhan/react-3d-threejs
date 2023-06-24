import React, { useRef , RefObject } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

interface AccumulativeContext {
  // Define the properties and methods of your AccumulativeContext here
  // Example:
  // someProperty: string;
  // someMethod: () => void;
}

const Backdrop = () => {
  const shadows = useRef<RefObject<AccumulativeContext>>(null);
  return (
    <AccumulativeShadows
      ref={shadows}
      frames={60}
      temporal
      alphaTest={0.85}
      scae={10}
      rotation={[Math.PI/2,0,0]}
      position={[0,0,-0.14]}
    >
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5,5,-9]}
      />
      <RandomizedLight />
    </AccumulativeShadows>
  )
}

export default Backdrop