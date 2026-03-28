import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';
import './HeroThree.css';

const RotatingProp = ({ position, geometryType, color, speed = 0.6 }) => {
  const meshRef = useRef(null);

  const geometry = useMemo(() => {
    if (geometryType === 'sphere') return new THREE.SphereGeometry(0.75, 42, 42);
    if (geometryType === 'torus') return new THREE.TorusGeometry(0.65, 0.2, 22, 80);
    return new THREE.IcosahedronGeometry(0.82, 0);
  }, [geometryType]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += delta * speed;
    meshRef.current.rotation.y += delta * speed * 1.35;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.08;
  });

  const spinFullCircle = () => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.rotation, {
      y: meshRef.current.rotation.y + Math.PI * 2,
      x: meshRef.current.rotation.x + Math.PI * 2,
      duration: 1.2,
      ease: 'power3.out',
    });
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        position={position}
        onClick={spinFullCircle}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.65} />
      </mesh>
    </Float>
  );
};

const SceneLights = () => (
  <>
    <ambientLight intensity={0.45} />
    <directionalLight position={[3, 4, 5]} intensity={1.2} color="#f2d7a0" />
    <pointLight position={[-3, -2, -2]} intensity={1} color="#ffffff" />
  </>
);

const HeroThree = () => (
  <div className="hero-three">
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 5, 12]} />
      <SceneLights />
      <Environment preset="city" />

      <RotatingProp position={[-1.8, 0.2, 0]} geometryType="torus" color="#dcca87" speed={0.7} />
      <RotatingProp position={[0.2, -0.15, -0.6]} geometryType="sphere" color="#f5efdb" speed={0.5} />
      <RotatingProp position={[1.95, 0.35, 0.2]} geometryType="icosa" color="#c9a34e" speed={0.85} />
    </Canvas>

    <p className="hero-three__hint">Tap a shape to rotate it 360 degrees</p>
  </div>
);

export default HeroThree;
