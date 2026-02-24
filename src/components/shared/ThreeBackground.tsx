import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedWaveGrid({ slideIndex }: { slideIndex: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Create wave grid geometry
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(20, 20, 50, 50);
  }, []);
  
  // Color interpolation based on slide
  const color = useMemo(() => {
    const colors = [
      '#00D4FF', // Blue (slides 1-3)
      '#00D4FF',
      '#00D4FF',
      '#00FF9F', // Green (slides 4-6)
      '#00FF9F',
      '#00FF9F',
      '#FFD700', // Gold (slides 7-9)
      '#FFD700',
      '#FFD700'
    ];
    return new THREE.Color(colors[slideIndex] || '#00D4FF');
  }, [slideIndex]);
  
  // Track mouse position
  useMemo(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animate vertices
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Create wave pattern
      const wave1 = Math.sin(x * 0.5 + time) * 0.3;
      const wave2 = Math.sin(y * 0.5 + time * 0.8) * 0.3;
      
      // Mouse influence (subtle)
      const mouseInfluence = (mouseRef.current.x * x * 0.05 + mouseRef.current.y * y * 0.05) * 0.5;
      
      const z = wave1 + wave2 + mouseInfluence;
      positions.setZ(i, z);
    }
    
    positions.needsUpdate = true;
    
    // Gentle rotation
    meshRef.current.rotation.z = time * 0.05;
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, -5]}>
      <meshBasicMaterial 
        color={color}
        wireframe 
        opacity={0.15} 
        transparent 
      />
    </mesh>
  );
}

export default function ThreeBackground({ slideIndex }: { slideIndex: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <AnimatedWaveGrid slideIndex={slideIndex} />
      </Canvas>
    </div>
  );
}
