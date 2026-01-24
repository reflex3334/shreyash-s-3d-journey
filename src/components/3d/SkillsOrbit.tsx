import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: 'React', color: '#61DAFB', category: 'Frontend' },
  { name: 'TypeScript', color: '#3178C6', category: 'Frontend' },
  { name: 'Python', color: '#3776AB', category: 'Backend' },
  { name: 'Node.js', color: '#339933', category: 'Backend' },
  { name: 'TensorFlow', color: '#FF6F00', category: 'ML' },
  { name: 'Docker', color: '#2496ED', category: 'DevOps' },
  { name: 'PostgreSQL', color: '#336791', category: 'Backend' },
  { name: 'Tailwind', color: '#06B6D4', category: 'Frontend' },
];

interface SkillSphereProps {
  skill: typeof skills[0];
  index: number;
  total: number;
  onHover: (name: string | null) => void;
  isHovered: boolean;
}

const SkillSphere = ({ skill, index, total, onHover, isHovered }: SkillSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.5;
  const yOffset = (index % 3 - 1) * 0.5;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      const currentAngle = angle + time * 0.2;
      meshRef.current.position.x = Math.cos(currentAngle) * radius;
      meshRef.current.position.z = Math.sin(currentAngle) * radius;
      meshRef.current.position.y = yOffset + Math.sin(time * 0.5 + index) * 0.2;
      
      // Scale on hover
      const targetScale = isHovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => onHover(skill.name)}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const CenterCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={0.5}
        roughness={0.1}
        metalness={0.9}
        wireframe
      />
    </mesh>
  );
};

interface SkillsOrbitSceneProps {
  onSkillHover: (name: string | null) => void;
  hoveredSkill: string | null;
}

const SkillsOrbitScene = ({ onSkillHover, hoveredSkill }: SkillsOrbitSceneProps) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#6366f1" />
      
      <CenterCore />
      
      {skills.map((skill, index) => (
        <SkillSphere
          key={skill.name}
          skill={skill}
          index={index}
          total={skills.length}
          onHover={onSkillHover}
          isHovered={hoveredSkill === skill.name}
        />
      ))}

      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.6, 64]} />
        <meshBasicMaterial color="#6366f1" opacity={0.1} transparent side={THREE.DoubleSide} />
      </mesh>

      <fog attach="fog" args={['#0a0a0f', 5, 20]} />
    </>
  );
};

export const SkillsOrbitCanvas = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="relative h-[400px] w-full">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <SkillsOrbitScene onSkillHover={setHoveredSkill} hoveredSkill={hoveredSkill} />
      </Canvas>
      
      {/* Skill tooltip */}
      {hoveredSkill && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full">
          <span className="text-foreground font-semibold">{hoveredSkill}</span>
        </div>
      )}
    </div>
  );
};

export default SkillsOrbitCanvas;
