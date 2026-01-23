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

const DataBar = ({ position, height, color, delay = 0 }: { position: [number, number, number]; height: number; color: string; delay?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1;
      meshRef.current.scale.y = scale;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.15, height, 0.15]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </mesh>
  );
};

const DataPoint = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <Float speed={4} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh position={position}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
};

const TrendLine = () => {
  const ref = useRef<THREE.Line>(null);
  const points = [
    new THREE.Vector3(-1, -0.2, 0.5),
    new THREE.Vector3(-0.5, 0.3, 0.5),
    new THREE.Vector3(0, 0.1, 0.5),
    new THREE.Vector3(0.5, 0.6, 0.5),
    new THREE.Vector3(1, 0.4, 0.5),
  ];
  
  const curve = new THREE.CatmullRomCurve3(points);
  const curvePoints = curve.getPoints(50);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
  const lineMaterial = new THREE.LineBasicMaterial({ color: "#EC4899" });

  return (
    <group>
      <primitive ref={ref} object={new THREE.Line(lineGeometry, lineMaterial)} />
      {points.map((point, i) => (
        <DataPoint key={i} position={[point.x, point.y, point.z]} color="#EC4899" />
      ))}
    </group>
  );
};

const BrainCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0.8, 0]}>
        <icosahedronGeometry args={[0.3, 1]} />
        <MeshDistortMaterial 
          color="#8B5CF6" 
          emissive="#8B5CF6" 
          emissiveIntensity={0.4} 
          distort={0.3} 
          speed={3}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const DataVisualization = () => {
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

  const barData = [
    { x: -0.8, height: 0.4, color: "#4F46E5" },
    { x: -0.5, height: 0.7, color: "#8B5CF6" },
    { x: -0.2, height: 0.5, color: "#4F46E5" },
    { x: 0.1, height: 0.9, color: "#EC4899" },
    { x: 0.4, height: 0.6, color: "#8B5CF6" },
    { x: 0.7, height: 0.8, color: "#4F46E5" },
  ];

  return (
    <group ref={groupRef}>
      {/* ML Brain Core */}
      <BrainCore />
      
      {/* Data bars */}
      {barData.map((bar, i) => (
        <DataBar 
          key={i} 
          position={[bar.x, -0.3 + bar.height / 2, 0]} 
          height={bar.height} 
          color={bar.color}
          delay={i * 0.5}
        />
      ))}
      
      {/* Trend line */}
      <TrendLine />
      
      {/* Base grid */}
      <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 2]} />
        <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={0.05} transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  );
};

export const ChurnPredictionScene = () => {
  return (
    <Canvas camera={{ position: [0, 0.5, 3.5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-5, 3, 5]} intensity={0.5} color="#EC4899" />
      <DataVisualization />
    </Canvas>
  );
};

export default ChurnPredictionScene;
