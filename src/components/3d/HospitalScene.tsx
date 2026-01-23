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

const HospitalBuilding = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main building */}
      <RoundedBox args={[0.8, 1, 0.4]} radius={0.03} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.2} metalness={0.3} roughness={0.7} />
      </RoundedBox>
      
      {/* Cross symbol */}
      <RoundedBox args={[0.3, 0.08, 0.05]} radius={0.01} position={[0, 0.3, 0.23]}>
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.5} />
      </RoundedBox>
      <RoundedBox args={[0.08, 0.3, 0.05]} radius={0.01} position={[0, 0.3, 0.23]}>
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.5} />
      </RoundedBox>
      
      {/* Windows */}
      {[-0.2, 0.2].map((x, i) =>
        [-0.15, 0.05].map((y, j) => (
          <RoundedBox key={`${i}-${j}`} args={[0.12, 0.1, 0.02]} radius={0.01} position={[x, y, 0.22]}>
            <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.3} transparent opacity={0.8} />
          </RoundedBox>
        ))
      )}
      
      {/* Entrance */}
      <RoundedBox args={[0.15, 0.2, 0.02]} radius={0.02} position={[0, -0.4, 0.22]}>
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.4} />
      </RoundedBox>
    </group>
  );
};

const QueueToken = ({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime + delay;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={[0.1, 0.1, 0.03, 32]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.4} metalness={0.5} roughness={0.3} />
      </mesh>
    </Float>
  );
};

const NotificationBell = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.15;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Bell body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Bell clapper */}
        <mesh position={[0, -0.05, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.4} />
        </mesh>
        {/* Notification dot */}
        <mesh position={[0.06, 0.06, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.8} />
        </mesh>
      </Float>
    </group>
  );
};

const FloatingCalendar = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        <RoundedBox args={[0.2, 0.22, 0.02]} radius={0.02}>
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.2} />
        </RoundedBox>
        {/* Calendar header */}
        <RoundedBox args={[0.2, 0.05, 0.025]} radius={0.01} position={[0, 0.085, 0.005]}>
          <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.3} />
        </RoundedBox>
        {/* Date grid dots */}
        {[-0.05, 0, 0.05].map((x, i) =>
          [-0.02, -0.06].map((y, j) => (
            <mesh key={`${i}-${j}`} position={[x, y, 0.015]}>
              <sphereGeometry args={[0.012, 8, 8]} />
              <meshStandardMaterial color={i === 1 && j === 0 ? "#EC4899" : "#ffffff"} emissive={i === 1 && j === 0 ? "#EC4899" : "#ffffff"} emissiveIntensity={0.3} />
            </mesh>
          ))
        )}
      </group>
    </Float>
  );
};

const HospitalSceneContent = () => {
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

  return (
    <group ref={groupRef}>
      <HospitalBuilding />
      
      {/* Queue tokens */}
      <QueueToken position={[-0.7, 0.3, 0.2]} delay={0} />
      <QueueToken position={[0.7, 0.1, 0.3]} delay={1} />
      <QueueToken position={[-0.5, -0.3, 0.4]} delay={2} />
      
      {/* Notification bell */}
      <NotificationBell position={[0.8, 0.5, 0.1]} />
      
      {/* Calendar */}
      <FloatingCalendar position={[-0.8, -0.2, 0.2]} />
      
      {/* Base platform */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1, 32]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.1} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const HospitalScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4F46E5" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#EC4899" />
      <spotLight position={[0, 5, 5]} intensity={0.5} color="#8B5CF6" angle={0.3} />
      <HospitalSceneContent />
    </Canvas>
  );
};

export default HospitalScene;
