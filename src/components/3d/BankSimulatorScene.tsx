import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
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

const Coin = ({ position, rotationSpeed = 1, delay = 0 }: { position: [number, number, number]; rotationSpeed?: number; delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed + delay;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.15, 0.15, 0.03, 32]} />
      <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

const VaultDoor = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Vault door frame */}
      <RoundedBox args={[1.2, 1.2, 0.15]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.2} metalness={0.6} roughness={0.3} />
      </RoundedBox>
      
      {/* Inner door */}
      <RoundedBox args={[0.9, 0.9, 0.1]} radius={0.03} position={[0, 0, 0.08]}>
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.15} metalness={0.7} roughness={0.2} />
      </RoundedBox>
      
      {/* Lock mechanism */}
      <mesh position={[0.25, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 32]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Lock handle */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.2}>
        <mesh position={[0.25, 0, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.08, 0.02, 8, 32]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.2} metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

const TransactionFlow = () => {
  const particles = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  const particleCount = 30;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 0.8 + Math.random() * 0.3;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = Math.sin(angle) * radius * 0.3;
  }

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#EC4899" transparent opacity={0.6} />
    </points>
  );
};

const CreditCard = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <RoundedBox ref={meshRef} args={[0.5, 0.3, 0.02]} radius={0.02} position={position} rotation={rotation}>
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.2} metalness={0.5} roughness={0.3} />
      </RoundedBox>
    </Float>
  );
};

const BankingScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useFrame(() => {
    if (groupRef.current) {
      // Smooth lerp to mouse position
      targetRotation.current.x = mouse.current.y * 0.25;
      targetRotation.current.y = mouse.current.x * 0.25;
      
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central vault */}
      <VaultDoor />
      
      {/* Floating coins */}
      <Coin position={[-0.7, 0.5, 0.3]} rotationSpeed={1.5} delay={0} />
      <Coin position={[0.8, 0.3, 0.2]} rotationSpeed={1.2} delay={1} />
      <Coin position={[-0.5, -0.4, 0.4]} rotationSpeed={1.8} delay={2} />
      <Coin position={[0.6, -0.5, 0.3]} rotationSpeed={1.3} delay={3} />
      
      {/* Credit cards */}
      <CreditCard position={[-0.8, 0, -0.3]} rotation={[0.2, 0.3, 0.1]} />
      <CreditCard position={[0.9, -0.2, -0.2]} rotation={[-0.1, -0.2, -0.15]} />
      
      {/* Transaction flow particles */}
      <TransactionFlow />
    </group>
  );
};

export const BankSimulatorScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4F46E5" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#FFD700" />
      <spotLight position={[0, 5, 5]} intensity={0.5} color="#EC4899" angle={0.3} />
      <BankingScene />
    </Canvas>
  );
};

export default BankSimulatorScene;
