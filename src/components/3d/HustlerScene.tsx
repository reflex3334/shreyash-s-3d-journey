import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
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

const BidCard = ({ position, rotation = [0, 0, 0], color, delay = 0 }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number];
  color: string;
  delay?: number;
}) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={ref} position={position} rotation={rotation}>
        {/* Card base */}
        <mesh>
          <boxGeometry args={[0.4, 0.5, 0.02]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </mesh>
        {/* Card lines */}
        {[-0.12, 0, 0.12].map((y, i) => (
          <mesh key={i} position={[0, y, 0.015]}>
            <boxGeometry args={[0.28, 0.04, 0.01]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const UserAvatar = ({ position, isClient = true }: { position: [number, number, number]; isClient?: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime + (isClient ? 0 : Math.PI)) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Head */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color={isClient ? "#4F46E5" : "#EC4899"} 
          emissive={isClient ? "#4F46E5" : "#EC4899"} 
          emissiveIntensity={0.4} 
        />
      </mesh>
      {/* Body */}
      <mesh position={[0, -0.05, 0]}>
        <capsuleGeometry args={[0.1, 0.2, 8, 16]} />
        <meshStandardMaterial 
          color={isClient ? "#8B5CF6" : "#8B5CF6"} 
          emissive={isClient ? "#8B5CF6" : "#8B5CF6"} 
          emissiveIntensity={0.2} 
        />
      </mesh>
      {/* Role indicator */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.15, 0.06, 0.02]} />
        <meshStandardMaterial 
          color={isClient ? "#4F46E5" : "#EC4899"} 
          emissive={isClient ? "#4F46E5" : "#EC4899"} 
          emissiveIntensity={0.6} 
        />
      </mesh>
    </group>
  );
};

const ConnectionArrow = ({ start, end }: { start: [number, number, number]; end: [number, number, number] }) => {
  const ref = useRef<THREE.Line>(null);
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineDashedMaterial({ 
    color: "#8B5CF6", 
    transparent: true, 
    opacity: 0.6,
    dashSize: 0.1,
    gapSize: 0.05
  });
  
  const line = new THREE.Line(lineGeometry, lineMaterial);
  line.computeLineDistances();
  
  return <primitive ref={ref} object={line} />;
};

const FreelanceNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useFrame(() => {
    if (groupRef.current) {
      targetRotation.current.x = mouse.current.y * 0.3;
      targetRotation.current.y = mouse.current.x * 0.3;
      
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Client side */}
      <UserAvatar position={[-0.8, 0.2, 0]} isClient={true} />
      
      {/* Freelancer side */}
      <UserAvatar position={[0.8, 0.2, 0]} isClient={false} />
      
      {/* Bid cards in center */}
      <BidCard position={[-0.2, 0.1, 0.2]} rotation={[0, -0.2, 0.1]} color="#4F46E5" delay={0} />
      <BidCard position={[0.15, -0.1, 0.1]} rotation={[0, 0.15, -0.05]} color="#8B5CF6" delay={0.5} />
      <BidCard position={[0, 0.3, -0.1]} rotation={[0, 0.1, 0.15]} color="#EC4899" delay={1} />
      
      {/* Connection lines */}
      <ConnectionArrow start={[-0.5, 0.2, 0]} end={[-0.1, 0.1, 0.15]} />
      <ConnectionArrow start={[0.5, 0.2, 0]} end={[0.1, 0.1, 0.15]} />
      
      {/* Platform base */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.1} transparent opacity={0.3} />
      </mesh>
      
      {/* Dollar/bid indicators */}
      {[0, 1, 2].map((i) => (
        <Float key={i} speed={3} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh position={[Math.sin(i * 2.1) * 0.5, -0.3, Math.cos(i * 2.1) * 0.3]}>
            <octahedronGeometry args={[0.06]} />
            <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.6} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const HustlerScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#EC4899" />
      <FreelanceNetwork />
    </Canvas>
  );
};

export default HustlerScene;
