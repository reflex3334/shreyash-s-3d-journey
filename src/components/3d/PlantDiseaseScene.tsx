import { useRef } from 'react';
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

const Leaf = ({ position, rotation, scale = 1, color = "#22c55e" }: { 
  position: [number, number, number]; 
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = (rotation?.[2] || 0) + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <sphereGeometry args={[0.15, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.2} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
};

const PlantPot = () => {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Pot */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.15, 0.25, 16]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.15} />
      </mesh>
      {/* Pot rim */}
      <mesh position={[0, 0.12, 0]}>
        <torusGeometry args={[0.2, 0.025, 8, 32]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.2} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
        <meshStandardMaterial color="#3d2914" />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.5, 8]} />
        <meshStandardMaterial color="#166534" emissive="#166534" emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
};

const ScanningBeam = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.4;
    }
    if (materialRef.current) {
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.3]} rotation={[0, 0, 0]}>
      <planeGeometry args={[1.2, 0.02]} />
      <meshStandardMaterial 
        ref={materialRef}
        color="#4F46E5" 
        emissive="#4F46E5" 
        emissiveIntensity={1} 
        transparent 
        opacity={0.5}
      />
    </mesh>
  );
};

const NeuralNetwork = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  const nodes = [
    [0, 0, 0],
    [0.1, 0.1, 0],
    [-0.1, 0.1, 0],
    [0.1, -0.1, 0],
    [-0.1, -0.1, 0],
    [0, 0.15, 0],
    [0, -0.15, 0],
  ] as [number, number, number][];

  return (
    <group ref={groupRef} position={position}>
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.4}>
        {nodes.map((nodePos, i) => (
          <mesh key={i} position={nodePos}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial 
              color={i === 0 ? "#EC4899" : "#8B5CF6"} 
              emissive={i === 0 ? "#EC4899" : "#8B5CF6"} 
              emissiveIntensity={0.6} 
            />
          </mesh>
        ))}
        {/* Connections */}
        {nodes.slice(1).map((nodePos, i) => {
          const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...nodePos)];
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({ color: "#8B5CF6", transparent: true, opacity: 0.4 });
          return <primitive key={`line-${i}`} object={new THREE.Line(lineGeometry, lineMaterial)} />;
        })}
      </Float>
    </group>
  );
};

const DiagnosticResult = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        {/* Checkmark circle */}
        <mesh>
          <torusGeometry args={[0.08, 0.015, 8, 32]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
        </mesh>
        {/* Check mark */}
        <mesh position={[-0.02, 0, 0.01]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.04, 0.015, 0.01]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.02, 0.02, 0.01]} rotation={[0, 0, 0.8]}>
          <boxGeometry args={[0.06, 0.015, 0.01]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

const AIBrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0.7, 0.3, 0]}>
        <icosahedronGeometry args={[0.15, 1]} />
        <MeshDistortMaterial 
          color="#4F46E5" 
          emissive="#4F46E5" 
          emissiveIntensity={0.4} 
          distort={0.3} 
          speed={3}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const PlantDiseaseSceneContent = () => {
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
      {/* Plant with pot */}
      <PlantPot />
      
      {/* Leaves */}
      <Leaf position={[-0.15, 0.1, 0.1]} rotation={[0.3, 0, -0.5]} scale={1.2} color="#22c55e" />
      <Leaf position={[0.15, 0.15, 0.05]} rotation={[0.2, 0, 0.4]} scale={1} color="#22c55e" />
      <Leaf position={[0, 0.25, 0.1]} rotation={[0.4, 0, 0.1]} scale={1.1} color="#16a34a" />
      <Leaf position={[-0.1, 0.35, 0]} rotation={[0.2, 0.2, -0.3]} scale={0.8} color="#22c55e" />
      <Leaf position={[0.12, 0.3, 0.05]} rotation={[0.3, -0.1, 0.5]} scale={0.9} color="#15803d" />
      
      {/* Scanning beam effect */}
      <ScanningBeam />
      
      {/* AI Brain */}
      <AIBrain />
      
      {/* Neural network visualization */}
      <NeuralNetwork position={[-0.7, 0.4, 0.2]} />
      
      {/* Diagnostic result */}
      <DiagnosticResult position={[0.65, -0.3, 0.2]} />
      
      {/* Base platform */}
      <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.8, 32]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.1} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const PlantDiseaseScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#22c55e" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#4F46E5" />
      <spotLight position={[0, 5, 5]} intensity={0.5} color="#8B5CF6" angle={0.3} />
      <PlantDiseaseSceneContent />
    </Canvas>
  );
};

export default PlantDiseaseScene;
