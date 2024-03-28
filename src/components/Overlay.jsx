import { motion } from "framer-motion";
import { useState } from "react";
import * as THREE from 'three'
import { useEffect, useRef} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import {  Stars } from '@react-three/drei';
import { FaArrowAltCircleRight } from 'react-icons/fa';

const GOLDENRATIO = 1.61803398875

const isMobile = window.innerWidth < 768;

const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      className={`
        configurator
      ${isMobile ? "justify-start" : "justify-center"}`}

      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.25,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Overlay = (props) => {
  const [showFirstSection, setShowFirstSection] = useState(true);
  const [showSecondSection, setShowSecondSection] = useState(false);


  const goToSecondSection = () => {
    setShowFirstSection(false);
    document.getElementById('fordelete').remove();
    setShowSecondSection(true);
  };

  return (
    <div className="flex flex-col items-center w-screen">
      {showFirstSection && <AboutSection goToSecondSection={goToSecondSection} />}
      {showSecondSection && <SecondSection />}
    </div>
  );
};

const AboutSection = (props) => {
  const { goToSecondSection } = props;

  return (
    <Section>
      <h1 className={`${isMobile ? "text-3xl" : "text-7xl"} font-extrabold leading-snug`} id="header">
        <span className="underline decoration-indigo-950"> Welcome to Our Online</span>
        <span className="bg-indigo-400 text-black px-1 italic">Gallery!</span>
        <br />
        <motion.span
          className="bg-white text-black px-1 italic"
          animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 2 } }}
          whileHover={{ backgroundColor: "#C7D2FE", transition: { duration: 0 } }}
        >
          Visionarium{" "}
        </motion.span>
      </h1>
      <motion.p
        className={`${isMobile ? "text-sm" : " text-lg"} text-indigo-300 mt-2 max-w-lg`}
        id="text"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
      >
        Step into our virtual gallery and immerse yourself in a rich tapestry <br />
        of artistic expression from around the globe. Explore captivating <br />
        artworks from renowned artists and emerging talents alike, <br />
        each telling a unique story and offering a glimpse into the diverse world of creativity.
      </motion.p>
      <motion.button
        onClick={goToSecondSection}
        className={`bg-indigo-500 text-black py-4 px-6 rounded-lg font-bold text-xl mt-4 w-64 italic`}
        id={'toGallery'}
        initial={{ opacity: 0, y: 100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 2 },
        }}
        whileHover={{
          scale: 0.85,
          backgroundColor: "#C7D2FE",
          transition: { duration: 0 },
        }}
      >
        TO GALLERY
      </motion.button>
    </Section>
  );
};

const SecondSection = ({ images }) => {
  return (
    <Section className="configurator2">
      <Gallery images={images} />
      <motion.button
        className={`bg-transparent text-black py-4 px-6 rounded-lg font-bold text-xl mt-4 w-64  fixed bottom-3 right-0.5`}
        id={'backToMain'}
        onClick={() => window.location.reload()}
        initial={{ opacity: 1 }} 
        whileHover={{
          scale: 1.5,
          //backgroundColor: 'rgba(52, 52, 52, 0.8)',
          transition: { duration: 0 },
        }}
        style={{ color: '#C7D2FE', fontSize: '48px' }}
      >
        &#8594;
      </motion.button>
    </Section>
  );
};



export const Gallery = () => {
  const images = [
    { position: [0, 0, 1.5], rotation: [0, 0, 0], url: "/images/1.jpeg" },
    { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: "/images/2.jpeg" },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: "/images/3.jpeg" },
  // Left
  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url: "/images/4.jpeg" },
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: "/images/5.jpeg" },
  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: "/images/6.jpeg" },
  // Right
  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: "/images/7.jpeg" },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: "/images/8.jpeg" },
  { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: "/images/9.jpeg" }
  ];

  return (
<div style={{ width: isMobile ? '100vw' : '110vw', height: isMobile ? '100vh' : '110vh', transform: isMobile ? 'translate(0%, 0%)' : 'translate(-35.5%, 20%)', background: "radial-gradient(at -25% 35%, #2b2b42 0%, #14141d 40%, #06080c 80%, #06193d 100%)" }}>
  <Canvas dpr={[1, 1.5]} camera={{ fov: 60, position: [-1, 2, 15] }}>
    <color attach="background" args={['#191920']} />
    <Stars radius={100} depth={100} count={5000} factor={5} />
    <fog attach="fog" args={['#191920', 0, 15]} />
    <group position={[0, -0.5, 0]}>
      <Frames images={images} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
    </group>
    <Environment preset="city" />
  </Canvas>
  </div>
  );
}


function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.75))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const image = useRef()
  const frame = useRef()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
    image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
    easing.dampC(frame.current.material.color, hovered ? '#ad5e6c' : 'white', 0.1, dt)
  })
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>
    </group>
  )
}

export default Overlay;
