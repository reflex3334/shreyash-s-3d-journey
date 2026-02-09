import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { HoverInfoPanel } from './HoverInfoPanel';
import { useInViewport } from '@/hooks/use-in-viewport';
export interface TechPlanet {
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  isPrimary: boolean;
  hasLiveDeployment?: boolean;
  category: 'frontend' | 'backend' | 'ml' | 'database' | 'devops';
  projects: {
    name: string;
    implementation: string[];
    outcome: string;
  }[];
}

export const techPlanets: TechPlanet[] = [
  {
    name: 'Docker',
    color: '#2496ED',
    size: 0.35,
    orbitRadius: 1.8,
    orbitSpeed: 0.15,
    isPrimary: true,
    hasLiveDeployment: true,
    category: 'devops',
    projects: [
      {
        name: 'Smart Service Hub (Live Deployment)',
        implementation: [
          'Containerized frontend and backend services',
          'Created Dockerfiles for application services',
          'Ensured environment consistency across development and deployment',
          'MySQL integration within Dockerized environment',
          'Stripe payment integration tested in containerized setup',
        ],
        outcome: 'Enabled smooth live deployment with reduced dependency issues and improved reliability',
      },
    ],
  },
  {
    name: 'Java',
    color: '#ED8B00',
    size: 0.4,
    orbitRadius: 2.2,
    orbitSpeed: 0.12,
    isPrimary: true,
    category: 'backend',
    projects: [
      {
        name: 'Bank Simulator',
        implementation: [
          'Core business logic implementation',
          'Secure transaction flow management',
          'OOP-based layered architecture design',
        ],
        outcome: 'Real-world banking simulation with strong backend fundamentals',
      },
    ],
  },
  {
    name: 'React',
    color: '#61DAFB',
    size: 0.45,
    orbitRadius: 2.6,
    orbitSpeed: 0.1,
    isPrimary: true,
    category: 'frontend',
    projects: [
      {
        name: 'Smart Service Hub',
        implementation: ['Component-based UI architecture', 'Responsive service booking dashboard'],
        outcome: 'Clean UX and scalable frontend design',
      },
      {
        name: 'Hospital Management System',
        implementation: ['Patient appointment booking interface', 'Real-time queue notification UI'],
        outcome: 'User-friendly healthcare portal',
      },
      {
        name: 'Hustler – Freelancing Platform',
        implementation: ['Dual-role dashboard (Client/Freelancer)', 'Gig posting and bidding interfaces'],
        outcome: 'Comprehensive freelancing marketplace UI',
      },
    ],
  },
  {
    name: 'Node.js',
    color: '#339933',
    size: 0.38,
    orbitRadius: 3.0,
    orbitSpeed: 0.08,
    isPrimary: true,
    category: 'backend',
    projects: [
      {
        name: 'Hustler – Freelancing Platform',
        implementation: [
          'REST API development',
          'Authentication and authorization logic',
          'Business logic for bidding system',
        ],
        outcome: 'Full-stack backend development experience with Express.js',
      },
      {
        name: 'Hospital Management System',
        implementation: ['Token generation API', 'Real-time notification system'],
        outcome: 'Efficient appointment management backend',
      },
    ],
  },
  {
    name: 'Python',
    color: '#3776AB',
    size: 0.42,
    orbitRadius: 3.4,
    orbitSpeed: 0.06,
    isPrimary: true,
    category: 'ml',
    projects: [
      {
        name: 'Customer Churn Prediction',
        implementation: ['Data preprocessing pipeline', 'Feature engineering', 'ML model integration'],
        outcome: 'End-to-end ML workflow experience',
      },
      {
        name: 'Plant Disease Recognition System',
        implementation: ['Image data preprocessing', 'CNN model development', 'Prediction pipeline'],
        outcome: 'Deep learning for agriculture application',
      },
    ],
  },
  {
    name: 'TensorFlow',
    color: '#FF6F00',
    size: 0.36,
    orbitRadius: 3.8,
    orbitSpeed: 0.05,
    isPrimary: true,
    category: 'ml',
    projects: [
      {
        name: 'Customer Churn Prediction',
        implementation: ['Neural network model training', 'Model evaluation and tuning'],
        outcome: 'Predictive analytics for business insights',
      },
      {
        name: 'Plant Disease Recognition System',
        implementation: ['CNN model training with Keras', 'Image-based disease detection'],
        outcome: 'Real-world ML model for agriculture',
      },
    ],
  },
  {
    name: 'Flask',
    color: '#000000',
    size: 0.28,
    orbitRadius: 4.2,
    orbitSpeed: 0.04,
    isPrimary: false,
    category: 'backend',
    projects: [
      {
        name: 'Customer Churn Prediction',
        implementation: ['ML model serving as REST API', 'Prediction endpoint development'],
        outcome: 'ML deployment experience',
      },
      {
        name: 'Plant Disease Recognition System',
        implementation: ['Image upload and processing API', 'Model inference endpoint'],
        outcome: 'Web-based ML application deployment',
      },
    ],
  },
  {
    name: 'MySQL',
    color: '#4479A1',
    size: 0.32,
    orbitRadius: 4.6,
    orbitSpeed: 0.035,
    isPrimary: false,
    category: 'database',
    projects: [
      {
        name: 'Smart Service Hub',
        implementation: ['Relational database design', 'User and service data management'],
        outcome: 'Structured data storage for live deployment',
      },
      {
        name: 'Bank Simulator',
        implementation: ['Transaction data storage', 'Account management tables'],
        outcome: 'Secure banking data management',
      },
    ],
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    size: 0.32,
    orbitRadius: 5.0,
    orbitSpeed: 0.03,
    isPrimary: false,
    category: 'database',
    projects: [
      {
        name: 'Hustler – Freelancing Platform',
        implementation: ['NoSQL document storage', 'Flexible schema for gigs and bids'],
        outcome: 'Scalable data storage for marketplace',
      },
      {
        name: 'Hospital Management System',
        implementation: ['Patient records storage', 'Appointment data management'],
        outcome: 'Efficient healthcare data handling',
      },
    ],
  },
];

interface PlanetProps {
  planet: TechPlanet;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
  focusedPlanet: string | null;
}

const Planet = ({ planet, isSelected, isHovered, onSelect, onHover, focusedPlanet }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const initialAngle = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      const isFocused = focusedPlanet === planet.name;
      const dimmed = focusedPlanet && !isFocused;

      // Orbit animation
      const angle = initialAngle.current + time * planet.orbitSpeed;
      const targetRadius = isFocused ? 0 : planet.orbitRadius;
      const currentRadius = THREE.MathUtils.lerp(
        meshRef.current.position.length() || planet.orbitRadius,
        targetRadius,
        0.05
      );

      if (!isFocused) {
        meshRef.current.position.x = Math.cos(angle) * currentRadius;
        meshRef.current.position.z = Math.sin(angle) * currentRadius;
        meshRef.current.position.y = Math.sin(time * 0.5 + initialAngle.current) * 0.2;
      } else {
        meshRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      }

      // Scale animation
      const baseScale = planet.size;
      const hoverScale = isHovered ? 1.3 : 1;
      const focusScale = isFocused ? 2 : 1;
      const dimScale = dimmed ? 0.7 : 1;
      const targetScale = baseScale * hoverScale * focusScale * dimScale;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Rotation
      meshRef.current.rotation.y += 0.01;

      // Glow effect
      if (glowRef.current) {
        const glowIntensity = isHovered || isFocused || planet.hasLiveDeployment ? 0.8 : 0.3;
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = dimmed ? 0.1 : glowIntensity;
        glowRef.current.scale.copy(meshRef.current.scale).multiplyScalar(1.5);
        glowRef.current.position.copy(meshRef.current.position);
      }
    }

    // Orbit ring highlight
    if (ringRef.current) {
      const isFocused = focusedPlanet === planet.name;
      const dimmed = focusedPlanet && !isFocused;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = isHovered && !dimmed ? 0.4 : dimmed ? 0.05 : 0.15;
    }
  });

  return (
    <>
      {/* Orbit ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.orbitRadius - 0.02, planet.orbitRadius + 0.02, 64]} />
        <meshBasicMaterial color={planet.color} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={planet.color} transparent opacity={0.3} />
      </mesh>

      {/* Planet */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3} enabled={!focusedPlanet}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          onPointerEnter={(e) => {
            e.stopPropagation();
            onHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            onHover(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={planet.color}
            emissiveIntensity={planet.isPrimary ? 0.5 : 0.3}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </Float>
    </>
  );
};

const CenterCore = ({ focusedPlanet }: { focusedPlanet: string | null }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;

      const targetOpacity = focusedPlanet ? 0.2 : 1;
      (meshRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
        (meshRef.current.material as THREE.MeshStandardMaterial).opacity,
        targetOpacity,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.4, 2]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.9}
        wireframe
        transparent
      />
    </mesh>
  );
};

interface SceneProps {
  onPlanetSelect: (planet: TechPlanet | null) => void;
  onPlanetHover: (planet: TechPlanet | null) => void;
  selectedPlanet: TechPlanet | null;
  hoveredPlanet: TechPlanet | null;
}

const Scene = ({ onPlanetSelect, onPlanetHover, selectedPlanet, hoveredPlanet }: SceneProps) => {
  const { camera } = useThree();

  useFrame(() => {
    // Smooth camera zoom on selection
    const targetZ = selectedPlanet ? 4 : 7;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 7]} fov={55} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#6366f1" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-10, -10, 10]} intensity={0.3} color="#8b5cf6" />

      <CenterCore focusedPlanet={selectedPlanet?.name || null} />

      {techPlanets.map((planet) => (
        <Planet
          key={planet.name}
          planet={planet}
          isSelected={selectedPlanet?.name === planet.name}
          isHovered={hoveredPlanet?.name === planet.name}
          onSelect={() => onPlanetSelect(selectedPlanet?.name === planet.name ? null : planet)}
          onHover={(hovered) => onPlanetHover(hovered ? planet : null)}
          focusedPlanet={selectedPlanet?.name || null}
        />
      ))}

      <fog attach="fog" args={['#0a0a0f', 8, 25]} />
    </>
  );
};

interface SkillsOrbitCanvasProps {
  onPlanetSelect: (planet: TechPlanet | null) => void;
  onPlanetHover: (planet: TechPlanet | null) => void;
  selectedPlanet: TechPlanet | null;
  hoveredPlanet: TechPlanet | null;
}

export const SkillsOrbitCanvas = ({
  onPlanetSelect,
  onPlanetHover,
  selectedPlanet,
  hoveredPlanet,
}: SkillsOrbitCanvasProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const [containerRef, isVisible] = useInViewport<HTMLDivElement>();

  return (
    <div ref={containerRef} className="relative h-[420px] w-full">
      {isVisible ? (
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          onClick={() => {
            if (selectedPlanet) onPlanetSelect(null);
          }}
        >
          <Scene
            onPlanetSelect={onPlanetSelect}
            onPlanetHover={onPlanetHover}
            selectedPlanet={selectedPlanet}
            hoveredPlanet={hoveredPlanet}
          />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Hover tooltip - Rich Info Panel */}
      {!selectedPlanet && <HoverInfoPanel planet={hoveredPlanet} />}

      {/* Click hint */}
      {!selectedPlanet && !hoveredPlanet && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground text-sm animate-pulse">
          Click any planet to explore
        </div>
      )}
    </div>
  );
};

export default SkillsOrbitCanvas;
