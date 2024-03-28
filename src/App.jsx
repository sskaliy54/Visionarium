import React, { useRef , useState} from 'react';
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import "./App.css";
import Overlay from './components/Overlay';
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./config";
import {  Stars } from '@react-three/drei';


function App() {
  const [section, setSection] = useState(0);

  return (
    <>
     <MotionConfig
        transition={{
          ...framerMotionConfig,
        }} >
      <Canvas className='App' id='fordelete' shadows camera={{ position: [0, 1, 4.5], fov: 22 }}>
        <fog attach="fog" args={['#000000', 0, 15]} />
        <Experience />
        <Stars radius={100} depth={100} count={5000} factor={5} />
      </Canvas>
        <Overlay />
      </MotionConfig>
    </>
  );
}


export default App;



