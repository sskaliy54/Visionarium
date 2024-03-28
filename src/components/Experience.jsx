import { OrbitControls ,ContactShadows,Environment,MeshReflectorMaterial, } from "@react-three/drei";
import { Avatar } from "./Avatar";
import {useControls} from "leva";
import { Box  } from "@react-three/drei";
import { MeshWobbleMaterial } from '@react-three/drei';
import React, { useRef, useState } from 'react';
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";


export function RotatingBox(props) {

  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <Box ref={mesh} {...props}>
      <MeshWobbleMaterial
        color="#210b40" 
        speed={1} 
        factor={0.6} 
      />
    </Box>
  );
}
export const Experience = () => {
  const [section, setSection] = useState(0);
  const characterContainerAboutRef = useRef();
  const [characterAnimation, setCharacterAnimation] = useState("StandingGreeting");

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    
    setCharacterAnimation("StandingGreeting");

    setTimeout(() => {
      setCharacterAnimation("Hold");
    }, 7000);
  }, []);

  return (
    <>
    <OrbitControls   enableZoom={false}  
     enablePan={false}
     enableRotate={false} />
     
      <Environment preset="sunset" />
      <ambientLight intensity={0.25} />
      <pointLight position={[2, 3, 1]} intensity={0.5} />
      <Avatar animation={characterAnimation}  position={[isMobile ? 0 : -1.5,isMobile ? -1.19 : -1,isMobile? -5 : -1]} />
      <group position-y={-1}>
        <ContactShadows
          opacity={0.70}
          scale={10}
          blur={1}
          far={5}
          resolution={256}
          color="#2F4F4F"
        />
       <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 8]}  />
        <MeshReflectorMaterial
  blur={[300, 100]}
  resolution={2048}
  mixBlur={1}
  mixStrength={80}
  roughness={0.5}
  depthScale={1.2}
  minDepthThreshold={0.4}
  maxDepthThreshold={1.4}
  metalness={0.5}
  color="#050505"
/>
      </mesh>
      <RotatingBox args={[0.5, 0.5, 0.5]} position={[1.5, 0.45, -1.5]} /> 

      </group>
    </>
  );
  }


