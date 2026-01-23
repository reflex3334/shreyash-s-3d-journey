import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, RoundedBox, Text } from '@react-three/drei';
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

const BidCard = ({ position, rotation, color, delay = 0 }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number]; 
  color: string;
  delay?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <RoundedBox ref={meshRef} args={[0.4, 0.25, 0.02]} radius={0.02} position={position} rotation={rotation || [0, 0, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} metalness={0.2} roughness={0.8} />
      </RoundedBox>
    </Float>
  );
};

const UserAvatar = ({ position, color, isClient = false }: { 
  position: [number, number, number]; 
  color: string;
  isClient?: boolean;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Head */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
        {/* Body */}
        <mesh position={[0, -0.05, 0]}>
          <capsuleGeometry args={[0.06, 0.1, 8, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </mesh>
        {/* Role indicator */}
        <mesh position={[0.1, 0.18, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial 
            color={isClient ? "#FFD700" : "#EC4899"} 
            emissive={isClient ? "#FFD700" : "#EC4899"} 
            emissiveIntensity={0.6} 
          />
        </mesh>
      </Float>
    </group>
  );
};

const ConnectionBeam = ({ start, end }: { start: [number, number, number]; end: [number, number, number] }) => {
  const ref = useRef<THREE.Line>(null);
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: "#8B5CF6", 
    transparent: true, 
    opacity: 0.5 
  });
  
  return <primitive ref={ref} object={new THREE.Line(lineGeometry, lineMaterial)} />;
};

const CentralHub = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.25, 1]} />
        <MeshDistortMaterial 
          color="#4F46E5" 
          emissive="#4F46E5" 
          emissiveIntensity={0.4} 
          distort={0.2} 
          speed={2}
        />
      </mesh>
      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.015, 16, 50]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.4} />
      </mesh>
    </Float>
  );
};

const TaskProgress = ({ position }: { position: [number, number, number] }) => {
  const progressRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (progressRef.current) {
      const progress = (Math.sin(state.clock.elapsedTime * 0.5) + 1) / 2;
      progressRef.current.scale.x = 0.3 + progress * 0.7;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group position={position}>
        {/* Progress bar background */}
        <RoundedBox args={[0.35, 0.06, 0.02]} radius={0.01}>
          <meshStandardMaterial color="#1a1a2e" />
        </RoundedBox>
        {/* Progress bar fill */}
        <mesh ref={progressRef} position={[-0.08, 0, 0.01]}>
          <boxGeometry args={[0.3, 0.04, 0.01]} />
          <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

const FreelancingSceneContent = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useFrame(() => {
    if (groupRef.current) {
      targetRotation.current.x = mouse.current.y * 0.2;
      targetRotation.current.y = mouse.current.x * 0.25;
      
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
    }
  });

  const clientPos: [number, number, number] = [-0.7, 0.4, 0.2];
  const freelancer1Pos: [number, number, number] = [0.7, 0.3, 0.1];
  const freelancer2Pos: [number, number, number] = [0.5, -0.4, 0.3];

  return (
    <group ref={groupRef}>
      {/* Central marketplace hub */}
      <CentralHub />
      
      {/* Client avatar */}
      <UserAvatar position={clientPos} color="#FFD700" isClient />
      
      {/* Freelancer avatars */}
      <UserAvatar position={freelancer1Pos} color="#8B5CF6" />
      <UserAvatar position={freelancer2Pos} color="#EC4899" />
      
      {/* Connection beams */}
      <ConnectionBeam start={[0, 0, 0]} end={clientPos} />
      <ConnectionBeam start={[0, 0, 0]} end={freelancer1Pos} />
      <ConnectionBeam start={[0, 0, 0]} end={freelancer2Pos} />
      
      {/* Bid cards */}
      <BidCard position={[-0.3, -0.5, 0.2]} rotation={[-0.1, 0.2, 0]} color="#4F46E5" delay={0} />
      <BidCard position={[0.8, -0.1, 0.3]} rotation={[0.1, -0.15, 0.05]} color="#8B5CF6" delay={1} />
      
      {/* Task progress indicator */}
      <TaskProgress position={[-0.6, -0.2, 0.3]} />
      
      {/* Base platform */}
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.9, 32]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.1} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const FreelancingScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4F46E5" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#FFD700" />
      <spotLight position={[0, 5, 5]} intensity={0.5} color="#EC4899" angle={0.3} />
      <FreelancingSceneContent />
    </Canvas>
  );
};

export default FreelancingScene;
