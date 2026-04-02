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

const ExamSheet = ({ position, rotation, color = '#4F46E5' }: { position: [number, number, number]; rotation: [number, number, number]; color?: string }) => {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Paper */}
        <RoundedBox args={[0.45, 0.6, 0.02]} radius={0.01}>
          <meshStandardMaterial color="#f0f0f5" emissive="#ffffff" emissiveIntensity={0.05} roughness={0.8} />
        </RoundedBox>
        {/* Lines on paper */}
        {[-0.15, -0.05, 0.05, 0.15].map((y, i) => (
          <mesh key={i} position={[0, y, 0.012]}>
            <boxGeometry args={[0.3, 0.012, 0.001]} />
            <meshStandardMaterial color={color} opacity={0.4} transparent />
          </mesh>
        ))}
        {/* Checkmark */}
        <mesh position={[0.12, 0.22, 0.012]}>
          <boxGeometry args={[0.06, 0.06, 0.001]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

const Shield = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Shield body */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.35, 0.08, 6]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.25} metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Inner emblem */}
      <mesh position={[0, 0, 0.045]}>
        <cylinderGeometry args={[0.3, 0.2, 0.02, 6]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.3} metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Lock icon (small torus on top) */}
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh position={[0, 0.35, 0.05]}>
          <torusGeometry args={[0.08, 0.025, 8, 24]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.4} metalness={0.9} roughness={0.1} />
        </mesh>
        <RoundedBox args={[0.12, 0.1, 0.04]} radius={0.01} position={[0, 0.28, 0.05]}>
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} />
        </RoundedBox>
      </Float>
    </group>
  );
};

const UserBadge = ({ position, color, label }: { position: [number, number, number]; color: string; label: string }) => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0] * 3) * 0.04;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={ref} position={position}>
        {/* Badge body */}
        <RoundedBox args={[0.25, 0.3, 0.03]} radius={0.03}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} metalness={0.5} roughness={0.3} />
        </RoundedBox>
        {/* Avatar circle */}
        <mesh position={[0, 0.05, 0.02]}>
          <circleGeometry args={[0.06, 24]} />
          <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
        </mesh>
        {/* ID lines */}
        <mesh position={[0, -0.06, 0.02]}>
          <boxGeometry args={[0.15, 0.015, 0.001]} />
          <meshStandardMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
        <mesh position={[0, -0.09, 0.02]}>
          <boxGeometry args={[0.1, 0.015, 0.001]} />
          <meshStandardMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
      </group>
    </Float>
  );
};

const DataParticles = () => {
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  const count = 40;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = 1.0 + Math.random() * 0.4;
    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
    positions[i * 3 + 2] = Math.sin(angle) * r * 0.5;
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#8B5CF6" transparent opacity={0.5} />
    </points>
  );
};

const ExamScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (groupRef.current) {
      targetRotation.current.x = mouse.current.y * 0.25;
      targetRotation.current.y = mouse.current.x * 0.25;
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Shield />
      <ExamSheet position={[-0.8, 0.3, 0.2]} rotation={[0, 0.3, 0.1]} color="#4F46E5" />
      <ExamSheet position={[0.85, 0.2, 0.15]} rotation={[0, -0.2, -0.08]} color="#EC4899" />
      <ExamSheet position={[-0.6, -0.4, 0.3]} rotation={[0.1, 0.15, -0.12]} color="#8B5CF6" />
      <UserBadge position={[0.7, -0.35, 0.2]} color="#EC4899" label="Student" />
      <UserBadge position={[-0.9, -0.1, -0.1]} color="#22c55e" label="Admin" />
      <DataParticles />
    </group>
  );
};

export const ExamManagementScene = () => (
  <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
    <ambientLight intensity={0.4} />
    <pointLight position={[5, 5, 5]} intensity={1} color="#4F46E5" />
    <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8B5CF6" />
    <spotLight position={[0, 5, 5]} intensity={0.5} color="#EC4899" angle={0.3} />
    <ExamScene />
  </Canvas>
);

export default ExamManagementScene;
