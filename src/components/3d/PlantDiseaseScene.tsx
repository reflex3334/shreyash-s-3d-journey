import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
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

const Leaf = ({ position, rotation = [0, 0, 0], scale = 1, isHealthy = true }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number];
  scale?: number;
  isHealthy?: boolean;
}) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation} scale={scale}>
      {/* Leaf shape using a scaled sphere */}
      <mesh scale={[1, 1.5, 0.1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color={isHealthy ? "#22c55e" : "#84cc16"} 
          emissive={isHealthy ? "#22c55e" : "#eab308"} 
          emissiveIntensity={isHealthy ? 0.3 : 0.4} 
        />
      </mesh>
      {/* Leaf vein */}
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[0.02, 0.25, 0.01]} />
        <meshStandardMaterial color="#15803d" emissive="#15803d" emissiveIntensity={0.2} />
      </mesh>
      {/* Disease spots if unhealthy */}
      {!isHealthy && (
        <>
          <mesh position={[0.05, 0.08, 0.02]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#92400e" emissive="#92400e" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[-0.06, -0.05, 0.02]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#92400e" emissive="#92400e" emissiveIntensity={0.5} />
          </mesh>
        </>
      )}
    </group>
  );
};

const NeuralBrain = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position}>
        {/* Core brain */}
        <mesh>
          <icosahedronGeometry args={[0.25, 1]} />
          <meshStandardMaterial 
            color="#8B5CF6" 
            emissive="#8B5CF6" 
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>
        <mesh scale={0.8}>
          <icosahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial 
            color="#4F46E5" 
            emissive="#4F46E5" 
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Neural connections */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.35, Math.sin(angle) * 0.35, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.6} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};

const ScanBeam = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, 0, Math.PI / 4]}>
      <boxGeometry args={[0.8, 0.02, 0.02]} />
      <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={1} transparent opacity={0.5} />
    </mesh>
  );
};

const PlantAnalysis = () => {
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
      {/* Healthy leaf */}
      <Leaf position={[-0.7, 0.2, 0]} rotation={[0, 0, 0.3]} scale={1.2} isHealthy={true} />
      
      {/* Diseased leaf being scanned */}
      <Leaf position={[0, -0.1, 0.2]} rotation={[0, 0, -0.1]} scale={1.4} isHealthy={false} />
      
      {/* Another healthy leaf */}
      <Leaf position={[0.6, 0.3, -0.1]} rotation={[0, 0.2, -0.2]} scale={1} isHealthy={true} />
      
      {/* Neural network brain */}
      <NeuralBrain position={[0.5, -0.3, 0.3]} />
      
      {/* Scan beam */}
      <ScanBeam position={[0, 0.2, 0.3]} />
      
      {/* Result indicator */}
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[-0.5, -0.4, 0.2]}>
          <torusGeometry args={[0.1, 0.03, 8, 16]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} />
        </mesh>
      </Float>
      
      {/* Base platform */}
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1.0, 32]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.1} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const PlantDiseaseScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#22c55e" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8B5CF6" />
      <PlantAnalysis />
    </Canvas>
  );
};

export default PlantDiseaseScene;
