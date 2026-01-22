import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, GradientTexture } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  mousePosition: { x: number; y: number };
}

export const FloatingGeometry = ({ mousePosition }: FloatingGeometryProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const octahedronRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth mouse follow
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.3,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.3,
        0.05
      );
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.z = time * 0.1;
      torusRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(time * 0.7 + 1) * 0.2;
      sphereRef.current.position.x = Math.cos(time * 0.3) * 0.1;
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.y = time * 0.4;
      octahedronRef.current.rotation.x = time * 0.2;
      octahedronRef.current.position.y = Math.sin(time * 0.6 + 2) * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Torus Knot - Primary */}
      <mesh ref={torusRef} position={[0, 0, 0]} scale={1.2}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.2}
          speed={2}
        />
      </mesh>

      {/* Floating Sphere - Secondary */}
      <mesh ref={sphereRef} position={[-2.5, 0.5, -1]} scale={0.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={3}
        />
      </mesh>

      {/* Octahedron - Accent */}
      <mesh ref={octahedronRef} position={[2.5, -0.5, -0.5]} scale={0.6}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Small floating spheres */}
      {[...Array(8)].map((_, i) => (
        <FloatingOrb key={i} index={i} />
      ))}
    </group>
  );
};

const FloatingOrb = ({ index }: { index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const position = useMemo(() => {
    const angle = (index / 8) * Math.PI * 2;
    const radius = 3 + Math.random() * 2;
    return [
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 3,
      Math.sin(angle) * radius - 2
    ] as [number, number, number];
  }, [index]);

  const color = useMemo(() => {
    const colors = ['#6366f1', '#a855f7', '#ec4899', '#8b5cf6'];
    return colors[index % colors.length];
  }, [index]);

  const scale = useMemo(() => 0.1 + Math.random() * 0.15, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + index) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.5 + index) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

export default FloatingGeometry;
