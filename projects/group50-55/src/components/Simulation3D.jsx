import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- Materials ---
const polishedBrass = new THREE.MeshStandardMaterial({
  color: '#e2ab3d',
  roughness: 0.15,
  metalness: 0.9,
  envMapIntensity: 2.0,
});

const darkBrass = new THREE.MeshStandardMaterial({
  color: '#8a6420',
  roughness: 0.4,
  metalness: 0.8,
  envMapIntensity: 1.0,
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#e0f7ff',
  transmission: 0.95,
  opacity: 1,
  metalness: 0.1,
  roughness: 0.05,
  ior: 1.5,
  thickness: 0.2,
  transparent: true,
});

// --- Components ---

function Finial({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh material={polishedBrass} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
      </mesh>
      <mesh material={polishedBrass} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 0.2, 32]} />
      </mesh>
      <mesh material={polishedBrass} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
      </mesh>
      <mesh material={polishedBrass} position={[0, 0.7, 0]}>
        <coneGeometry args={[0.1, 0.4, 32]} />
      </mesh>
    </group>
  );
}

function SmallCup({ position, rotation = [0,0,0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Arm connecting to center */}
      <mesh material={darkBrass} position={[-1.2, -0.2, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.2]} />
      </mesh>
      
      {/* Cup Bowl */}
      <mesh material={polishedBrass}>
        <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
      </mesh>
      
      {/* Cup Rim */}
      <mesh material={polishedBrass} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.05, 16, 64]} />
      </mesh>
      
      {/* Cup Lid / Plate */}
      <mesh material={polishedBrass} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.05, 32]} />
      </mesh>
      
      {/* Bottom Drop/Spout */}
      <mesh material={polishedBrass} position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 0.4, 16]} />
      </mesh>

      {/* Finial on top */}
      <Finial position={[0, 0.1, 0]} scale={0.7} />
    </group>
  );
}

function MainDial() {
  // Generate tick marks and measurements
  const ticks = useMemo(() => {
    const marks = [];
    const rOuter = 3.6;
    const rInner = 2.5;
    
    // Outer degrees
    for (let i = 0; i < 120; i++) {
      const angle = (i / 120) * Math.PI * 2;
      const isMajor = i % 10 === 0;
      marks.push(
        <mesh key={`t1_${i}`} material={darkBrass} position={[Math.cos(angle) * rOuter, 0.06, Math.sin(angle) * rOuter]} rotation={[0, -angle, 0]}>
          <boxGeometry args={[isMajor ? 0.4 : 0.15, 0.02, 0.02]} />
        </mesh>
      );
    }
    
    // Inner zodiac/ghati markings
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2;
      const isMajor = i % 5 === 0;
      marks.push(
        <mesh key={`t2_${i}`} material={darkBrass} position={[Math.cos(angle) * rInner, 0.06, Math.sin(angle) * rInner]} rotation={[0, -angle, 0]}>
          <boxGeometry args={[isMajor ? 0.3 : 0.1, 0.02, 0.02]} />
        </mesh>
      );
    }
    
    return marks;
  }, []);

  return (
    <group>
      {/* Main Base Plate */}
      <mesh material={polishedBrass} position={[0, 0, 0]}>
        <cylinderGeometry args={[4, 4, 0.1, 64]} />
      </mesh>
      
      {/* Concentric Rings */}
      <mesh material={darkBrass} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.8, 0.05, 16, 64]} />
      </mesh>
      <mesh material={darkBrass} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 64]} />
      </mesh>
      <mesh material={darkBrass} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
      </mesh>
      
      {/* Engraved Ticks */}
      <group>{ticks}</group>
      
      {/* Decorative Text/Numbers */}
      <Text position={[0, 0.06, -3.2]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.2} color="#4a3611" anchorX="center" anchorY="middle">
        XXIV
      </Text>
      <Text position={[0, 0.06, 3.2]} rotation={[-Math.PI / 2, 0, Math.PI]} fontSize={0.2} color="#4a3611" anchorX="center" anchorY="middle">
        XII
      </Text>
      <Text position={[3.2, 0.06, 0]} rotation={[-Math.PI / 2, 0, Math.PI/2]} fontSize={0.2} color="#4a3611" anchorX="center" anchorY="middle">
        VI
      </Text>
      <Text position={[-3.2, 0.06, 0]} rotation={[-Math.PI / 2, 0, -Math.PI/2]} fontSize={0.2} color="#4a3611" anchorX="center" anchorY="middle">
        XVIII
      </Text>
    </group>
  );
}

function BaseStructure() {
  return (
    <group position={[0, -2, 0]}>
      {/* Lower Ring */}
      <mesh material={polishedBrass} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.15, 32, 64]} />
      </mesh>
      
      {/* Feet */}
      {[0, 1, 2, 3].map(i => {
        const angle = (i * Math.PI) / 2;
        const x = Math.cos(angle) * 3.5;
        const z = Math.sin(angle) * 3.5;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh material={darkBrass} position={[0, -0.5, 0]}>
              <cylinderGeometry args={[0.2, 0.1, 1, 32]} />
            </mesh>
            <mesh material={polishedBrass} position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
            </mesh>
            <mesh material={polishedBrass} position={[0, 1, 0]}>
              <sphereGeometry args={[0.3, 32, 16]} />
            </mesh>
          </group>
        );
      })}
      
      {/* Cross Bracing underneath */}
      <mesh material={darkBrass} position={[0, 0, 0]}>
        <boxGeometry args={[7, 0.05, 0.2]} />
      </mesh>
      <mesh material={darkBrass} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[7, 0.05, 0.2]} />
      </mesh>
      
      {/* Glass catch basin at the bottom */}
      <mesh material={glassMaterial} position={[0, -0.3, 0]}>
        <cylinderGeometry args={[2, 1.5, 0.5, 64]} />
      </mesh>
    </group>
  );
}

function CentralMechanism() {
  const pointerRef = useRef();

  useFrame((state) => {
    // Slowly rotate the central pointer
    if (pointerRef.current) {
      pointerRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* Central Axis */}
      <mesh material={darkBrass} position={[0, 1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 2, 32]} />
      </mesh>
      
      {/* Mid Cage */}
      <mesh material={polishedBrass} position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.6, 32]} />
      </mesh>
      <mesh material={darkBrass} position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.05, 32]} />
      </mesh>
      
      {/* Rotating Pointer */}
      <group ref={pointerRef} position={[0, 1.2, 0]}>
        <mesh material={polishedBrass} position={[1.5, 0, 0]}>
          <boxGeometry args={[3, 0.05, 0.1]} />
        </mesh>
        <mesh material={darkBrass} position={[3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.1, 0.4, 16]} />
        </mesh>
      </group>

      {/* Cage Struts */}
      {[0, 1, 2, 3].map(i => {
        const angle = (i * Math.PI) / 2;
        return (
          <mesh key={`strut_${i}`} material={darkBrass} position={[Math.cos(angle)*0.8, 0.5, Math.sin(angle)*0.8]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
          </mesh>
        );
      })}

      {/* Top Ornate Bowl */}
      <group position={[0, 2.5, 0]}>
        {/* Bowl Support */}
        <mesh material={darkBrass} position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.4, 0.1, 0.5, 32]} />
        </mesh>
        
        {/* Main Upper Bowl */}
        <mesh material={polishedBrass}>
          <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        </mesh>
        
        {/* Upper Rim */}
        <mesh material={polishedBrass} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.1, 16, 64]} />
        </mesh>
        
        {/* Bowl Lid */}
        <mesh material={polishedBrass} position={[0, 0.1, 0]}>
          <cylinderGeometry args={[1.25, 1.25, 0.1, 64]} />
        </mesh>

        {/* Central Spire / Finial */}
        <Finial position={[0, 0.15, 0]} scale={2} />
      </group>
      
      {/* Outward Arms and Small Cups */}
      {[0, 1, 2, 3].map(i => {
        const angle = (i * Math.PI) / 2 + Math.PI / 4; // Offset from struts
        const x = Math.cos(angle) * 4.2;
        const z = Math.sin(angle) * 4.2;
        return <SmallCup key={`cup_${i}`} position={[x, 1.5, z]} rotation={[0, -angle, 0]} />;
      })}
    </group>
  );
}

export default function Simulation3D() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', cursor: 'grab' }}>
      <Canvas camera={{ position: [6, 8, 8], fov: 45 }}>
        <fog attach="fog" args={['#0a0a0a', 15, 35]} />
        <ambientLight intensity={0.5} color="#fff1e0" />
        {/* Warm key light to highlight brass */}
        <spotLight position={[10, 15, 10]} angle={0.4} penumbra={0.5} intensity={4} color="#ffedd6" castShadow />
        {/* Side rim light */}
        <pointLight position={[-10, 5, -5]} intensity={2} color="#a6e6ff" />
        {/* Soft fill light */}
        <pointLight position={[0, 5, 10]} intensity={1.5} color="#ffffff" />
        
        <group position={[0, -1, 0]}>
          <BaseStructure />
          <MainDial />
          <CentralMechanism />
        </group>
        
        <ContactShadows position={[0, -3.5, 0]} opacity={0.8} scale={15} blur={2.5} far={4} color="#000000" />
        
        {/* Environment map is critical for brass reflections */}
        <Environment preset="city" />
        
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 8} 
          maxPolarAngle={Math.PI / 2 - 0.1} 
          minDistance={10} 
          maxDistance={25} 
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', pointerEvents: 'none' }}>
        <div style={{ fontFamily: "'Cinzel', serif", color: '#d4af37', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          THE GHATIKA YANTRA
        </div>
      </div>
    </div>
  );
}
