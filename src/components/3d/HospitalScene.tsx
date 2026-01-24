import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
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

const Cross = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  return (
    <group position={position} scale={scale}>
      {/* Horizontal bar */}
      <mesh>
        <boxGeometry args={[0.4, 0.12, 0.08]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.4} />
      </mesh>
      {/* Vertical bar */}
      <mesh>
        <boxGeometry args={[0.12, 0.4, 0.08]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
};

const QueuePerson = ({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.05;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Head */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.3} />
      </mesh>
      {/* Body */}
      <mesh position={[0, -0.05, 0]}>
        <capsuleGeometry args={[0.06, 0.15, 8, 16]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

const TokenDisplay = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={ref}>
          <cylinderGeometry args={[0.25, 0.25, 0.05, 32]} />
          <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Token number indicator */}
        <mesh position={[0, 0.04, 0]}>
          <ringGeometry args={[0.1, 0.15, 16]} />
          <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

const HospitalBuilding = () => {
  return (
    <group position={[0, 0.2, 0]}>
      {/* Main building */}
      <RoundedBox args={[0.8, 1, 0.4]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" emissive="#4F46E5" emissiveIntensity={0.1} />
      </RoundedBox>
      {/* Windows */}
      {[-0.2, 0.2].map((x, i) => 
        [0.3, 0, -0.3].map((y, j) => (
          <mesh key={`${i}-${j}`} position={[x, y, 0.21]}>
            <planeGeometry args={[0.15, 0.15]} />
            <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.4} transparent opacity={0.8} />
          </mesh>
        ))
      )}
      {/* Cross on top */}
      <Cross position={[0, 0.7, 0.21]} scale={0.6} />
    </group>
  );
};

const HospitalNetwork = () => {
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
      <HospitalBuilding />
      
      {/* Queue of patients */}
      <QueuePerson position={[-0.8, -0.5, 0.3]} delay={0} />
      <QueuePerson position={[-0.5, -0.5, 0.3]} delay={0.5} />
      <QueuePerson position={[-0.2, -0.5, 0.3]} delay={1} />
      
      {/* Token display */}
      <TokenDisplay position={[0.7, 0.3, 0.4]} />
      
      {/* Base platform */}
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1.0, 32]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.1} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const HospitalScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4F46E5" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#EC4899" />
      <HospitalNetwork />
    </Canvas>
  );
};

export default HospitalScene;
