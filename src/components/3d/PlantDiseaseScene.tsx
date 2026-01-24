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

const TreeTrunk = () => {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Main trunk */}
      <mesh>
        <cylinderGeometry args={[0.08, 0.12, 0.6, 8]} />
        <meshStandardMaterial color="#8B4513" emissive="#5D3A1A" emissiveIntensity={0.2} />
      </mesh>
      {/* Branch left */}
      <mesh position={[-0.15, 0.2, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.03, 0.05, 0.25, 6]} />
        <meshStandardMaterial color="#8B4513" emissive="#5D3A1A" emissiveIntensity={0.2} />
      </mesh>
      {/* Branch right */}
      <mesh position={[0.12, 0.15, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.03, 0.05, 0.2, 6]} />
        <meshStandardMaterial color="#8B4513" emissive="#5D3A1A" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

const TreeCanopy = ({ hasDisease = false }: { hasDisease?: boolean }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={ref} position={[0, 0.3, 0]}>
      {/* Main foliage layers */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial 
          color={hasDisease ? "#6B8E23" : "#228B22"} 
          emissive={hasDisease ? "#4A5D16" : "#1B6B1B"} 
          emissiveIntensity={0.3} 
        />
      </mesh>
      <mesh position={[-0.2, -0.1, 0.1]}>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshStandardMaterial 
          color={hasDisease ? "#7A9B30" : "#2E8B2E"} 
          emissive={hasDisease ? "#5A7320" : "#1E6B1E"} 
          emissiveIntensity={0.3} 
        />
      </mesh>
      <mesh position={[0.2, -0.05, 0.05]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial 
          color={hasDisease ? "#8BA63D" : "#32CD32"} 
          emissive={hasDisease ? "#6B862D" : "#22AD22"} 
          emissiveIntensity={0.3} 
        />
      </mesh>
      
      {/* Disease spots */}
      {hasDisease && (
        <>
          <mesh position={[0.1, 0.15, 0.3]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#8B4513" emissive="#A0522D" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[-0.15, 0.05, 0.28]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#D2691E" emissive="#CD853F" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.05, -0.1, 0.25]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#8B4513" emissive="#A0522D" emissiveIntensity={0.5} />
          </mesh>
        </>
      )}
    </group>
  );
};

const ScanningRing = ({ yOffset = 0 }: { yOffset?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      // Animate up and down along the tree
      const scanRange = 1.2;
      ref.current.position.y = -0.4 + (Math.sin(state.clock.elapsedTime * 1.5 + yOffset) * 0.5 + 0.5) * scanRange;
      ref.current.rotation.z = state.clock.elapsedTime * 2;
      
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.5, 0.02, 8, 32]} />
      <meshStandardMaterial 
        color="#4F46E5" 
        emissive="#4F46E5" 
        emissiveIntensity={1} 
        transparent 
        opacity={0.6} 
      />
    </mesh>
  );
};

const ScanBeamVertical = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0.2, 0]}>
      <cylinderGeometry args={[0.5, 0.5, 1.4, 32, 1, true]} />
      <meshStandardMaterial 
        color="#8B5CF6" 
        emissive="#8B5CF6" 
        emissiveIntensity={0.5} 
        transparent 
        opacity={0.2} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const DataNodes = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  const nodes = [
    { angle: 0, y: 0.5, color: "#22c55e" },
    { angle: Math.PI * 0.5, y: 0.2, color: "#EC4899" },
    { angle: Math.PI, y: 0.4, color: "#4F46E5" },
    { angle: Math.PI * 1.5, y: 0, color: "#22c55e" },
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={[Math.cos(node.angle) * 0.7, node.y, Math.sin(node.angle) * 0.7]}>
            <octahedronGeometry args={[0.05]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.8} />
          </mesh>
          {/* Connection line to center */}
          <mesh 
            position={[Math.cos(node.angle) * 0.35, node.y, Math.sin(node.angle) * 0.35]}
            rotation={[0, -node.angle + Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.01, 0.01, 0.5]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.5} transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const AnalysisDisplay = () => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 0.7 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={ref} position={[0.6, 0.7, 0.2]}>
        {/* Display panel */}
        <mesh>
          <boxGeometry args={[0.25, 0.15, 0.02]} />
          <meshStandardMaterial color="#1a1a2e" emissive="#4F46E5" emissiveIntensity={0.1} />
        </mesh>
        {/* Status indicator */}
        <mesh position={[-0.08, 0.03, 0.015]}>
          <circleGeometry args={[0.02, 16]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
        </mesh>
        {/* Data bars */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0.02 + i * 0.05, -0.02, 0.015]}>
            <boxGeometry args={[0.03, 0.06, 0.005]} />
            <meshStandardMaterial 
              color={i === 1 ? "#EC4899" : "#8B5CF6"} 
              emissive={i === 1 ? "#EC4899" : "#8B5CF6"} 
              emissiveIntensity={0.6} 
            />
          </mesh>
        ))}
      </group>
    </Float>
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
      {/* Tree */}
      <TreeTrunk />
      <TreeCanopy hasDisease={true} />
      
      {/* Scanning effects */}
      <ScanBeamVertical />
      <ScanningRing yOffset={0} />
      <ScanningRing yOffset={Math.PI} />
      
      {/* Floating data nodes */}
      <DataNodes />
      
      {/* Analysis display */}
      <AnalysisDisplay />
      
      {/* Base platform */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.7, 32]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.15} transparent opacity={0.4} />
      </mesh>
      
      {/* Grid lines on platform */}
      <mesh position={[0, -0.64, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.25, 32]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.3} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const PlantDiseaseScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#22c55e" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8B5CF6" />
      <pointLight position={[0, 3, 2]} intensity={0.3} color="#4F46E5" />
      <PlantAnalysis />
    </Canvas>
  );
};

export default PlantDiseaseScene;
