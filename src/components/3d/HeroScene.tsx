import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import FloatingGeometry from './FloatingGeometry';
import ParticleField from './ParticleField';
import { useInViewport } from '@/hooks/use-in-viewport';

export const HeroScene = () => {
  const [containerRef, isVisible] = useInViewport<HTMLDivElement>();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isVisible) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10">
      {isVisible && (
        <Canvas
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-5, 5, 5]} intensity={0.5} color="#6366f1" />
            <pointLight position={[5, -5, 5]} intensity={0.5} color="#ec4899" />
            <pointLight position={[0, 5, -5]} intensity={0.3} color="#a855f7" />
            
            <FloatingGeometry mousePosition={mousePosition} />
            <ParticleField mousePosition={mousePosition} />
            
            <Environment preset="night" />
          </Suspense>

          <fog attach="fog" args={['#0a0a0f', 8, 30]} />
        </Canvas>
      )}
    </div>
  );
};

export default HeroScene;
