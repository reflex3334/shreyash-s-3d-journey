import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const useMousePosition = () => {
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  
  useFrame(({ pointer }) => {
    mouse.current.x = (pointer.x * viewport.width) / 2;
    mouse.current.y = (pointer.y * viewport.height) / 2;
  });
  
  return mouse;
};

const ConnectionNode = ({ position, color, size = 0.15 }: { position: [number, number, number]; color: string; size?: number }) => {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
};

const ConnectionLine = ({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) => {
  const ref = useRef<THREE.Line>(null);
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 });
  
  return <primitive ref={ref} object={new THREE.Line(lineGeometry, lineMaterial)} />;
};

const MapPin = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.8}>
        {/* Pin head */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <MeshDistortMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.3} distort={0.2} speed={2} />
        </mesh>
        {/* Pin body */}
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.15, 0.4, 16]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </group>
  );
};

const ServiceNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useFrame(() => {
    if (groupRef.current) {
      // Smooth lerp to mouse position
      targetRotation.current.x = mouse.current.y * 0.3;
      targetRotation.current.y = mouse.current.x * 0.3;
      
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
    }
  });

  const nodes: [number, number, number][] = [
    [-0.8, 0.5, 0],
    [0.8, 0.3, 0.2],
    [-0.5, -0.5, 0.3],
    [0.6, -0.4, -0.2],
    [0, 0.7, -0.3],
  ];

  return (
    <group ref={groupRef}>
      {/* Central map pin */}
      <MapPin position={[0, 0, 0]} />
      
      {/* Connection nodes */}
      {nodes.map((pos, i) => (
        <ConnectionNode 
          key={i} 
          position={pos} 
          color={i % 2 === 0 ? "#EC4899" : "#8B5CF6"} 
          size={0.1 + Math.random() * 0.05}
        />
      ))}
      
      {/* Connection lines from center to nodes */}
      {nodes.map((pos, i) => (
        <ConnectionLine key={`line-${i}`} start={[0, 0, 0]} end={pos} color="#4F46E5" />
      ))}
      
      {/* Dashboard base */}
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.1} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const ServiceHubScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4F46E5" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#EC4899" />
      <ServiceNetwork />
    </Canvas>
  );
};

export default ServiceHubScene;
