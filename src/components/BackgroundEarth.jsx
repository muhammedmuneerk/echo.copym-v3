import React, { useRef, useEffect, Suspense, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Sphere, Box, Torus, Cylinder, Plane, Text, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Deep Background Atmospheric Layers (Far Behind Globe)
const DeepAtmosphericLayers = () => {
  const layer1 = useRef();
  const layer2 = useRef();
  const layer3 = useRef();
  const layer4 = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (layer1.current) {
      layer1.current.material.opacity = 0.4 + Math.sin(time * 0.3 + scrollProgress * Math.PI) * 0.1;
      layer1.current.position.z = -120 + Math.sin(time * 0.05) * 3;
    }

    if (layer2.current) {
      layer2.current.material.opacity = 0.3 + Math.cos(time * 0.2 + scrollProgress * Math.PI * 1.2) * 0.15;
      layer2.current.position.z = -100 + Math.cos(time * 0.08) * 4;
    }

    if (layer3.current) {
      layer3.current.material.opacity = 0.25 + Math.sin(time * 0.4 + scrollProgress * Math.PI * 0.8) * 0.2;
      layer3.current.position.z = -80 + Math.sin(time * 0.1) * 3;
    }

    if (layer4.current) {
      layer4.current.material.opacity = 0.2 + Math.cos(time * 0.25 + scrollProgress * Math.PI * 1.8) * 0.1;
      layer4.current.position.z = -60 + Math.cos(time * 0.12) * 2;
    }
  });

  return (
    <group>
      {/* Deepest Background Layer */}
      <Plane ref={layer1} args={[500, 500]} position={[0, 0, -120]}>
        <meshBasicMaterial 
          color="#000208"
          transparent 
          opacity={0.4}
        />
      </Plane>

      {/* Second Deep Layer */}
      <Plane ref={layer2} args={[450, 450]} position={[0, 0, -100]}>
        <meshBasicMaterial 
          color="#030310"
          transparent 
          opacity={0.3}
        />
      </Plane>

      {/* Third Layer */}
      <Plane ref={layer3} args={[400, 400]} position={[0, 0, -80]}>
        <meshBasicMaterial 
          color="#080818"
          transparent 
          opacity={0.25}
        />
      </Plane>

      {/* Nearest Background Layer (Still Behind Globe) */}
      <Plane ref={layer4} args={[350, 350]} position={[0, 0, -60]}>
        <meshBasicMaterial 
          color="#0f0f20"
          transparent 
          opacity={0.2}
        />
      </Plane>
    </group>
  );
};

// Deep Volumetric Background Effects
const DeepVolumetricEffects = () => {
  const effect1 = useRef();
  const effect2 = useRef();
  const effect3 = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (effect1.current) {
      effect1.current.rotation.z = time * 0.02 + scrollProgress * Math.PI * 0.3;
      effect1.current.material.opacity = 0.08 + Math.sin(time * 0.5 + scrollProgress * Math.PI) * 0.04;
      effect1.current.position.z = -90 + Math.sin(time * 0.06) * 5;
    }

    if (effect2.current) {
      effect2.current.rotation.z = -time * 0.015 + scrollProgress * Math.PI * 0.2;
      effect2.current.material.opacity = 0.06 + Math.cos(time * 0.4 + scrollProgress * Math.PI * 1.1) * 0.03;
      effect2.current.position.z = -70 + Math.cos(time * 0.08) * 4;
    }

    if (effect3.current) {
      effect3.current.rotation.z = time * 0.025 - scrollProgress * Math.PI * 0.4;
      effect3.current.material.opacity = 0.05 + Math.sin(time * 0.7 + scrollProgress * Math.PI * 0.9) * 0.02;
      effect3.current.position.z = -50 + Math.sin(time * 0.09) * 3;
    }
  });

  return (
    <group>
      <Plane ref={effect1} args={[600, 600, 30, 30]} position={[0, 0, -90]}>
        <meshBasicMaterial 
          color="#0a0a15"
          transparent 
          opacity={0.08}
        />
      </Plane>
      <Plane ref={effect2} args={[550, 550, 25, 25]} position={[0, 0, -70]}>
        <meshBasicMaterial 
          color="#121220"
          transparent 
          opacity={0.06}
        />
      </Plane>
      <Plane ref={effect3} args={[500, 500, 20, 20]} position={[0, 0, -50]}>
        <meshBasicMaterial 
          color="#181828"
          transparent 
          opacity={0.05}
        />
      </Plane>
    </group>
  );
};

// Far Background Gradient Fields
const FarBackgroundFields = () => {
  const field1 = useRef();
  const field2 = useRef();
  const field3 = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (field1.current) {
      field1.current.position.y = Math.sin(time * 0.1 + scrollProgress * Math.PI) * 8;
      field1.current.material.opacity = 0.12 + Math.sin(time * 0.3 + scrollProgress * Math.PI * 1.5) * 0.06;
    }

    if (field2.current) {
      field2.current.position.x = Math.cos(time * 0.08 + scrollProgress * Math.PI * 1.2) * 12;
      field2.current.material.opacity = 0.1 + Math.cos(time * 0.4 + scrollProgress * Math.PI * 1.3) * 0.05;
    }

    if (field3.current) {
      field3.current.position.y = Math.cos(time * 0.12 - scrollProgress * Math.PI * 0.7) * 10;
      field3.current.position.x = Math.sin(time * 0.09 + scrollProgress * Math.PI * 0.9) * 6;
      field3.current.material.opacity = 0.08 + Math.sin(time * 0.5 + scrollProgress * Math.PI * 1.6) * 0.04;
    }
  });

  return (
    <group>
      <Plane ref={field1} args={[300, 300]} position={[0, 0, -110]} rotation={[0, 0, Math.PI / 6]}>
        <meshBasicMaterial 
          color="#1a1a30"
          transparent 
          opacity={0.12}
        />
      </Plane>
      <Plane ref={field2} args={[280, 280]} position={[0, 0, -95]} rotation={[0, 0, -Math.PI / 8]}>
        <meshBasicMaterial 
          color="#202040"
          transparent 
          opacity={0.1}
        />
      </Plane>
      <Plane ref={field3} args={[260, 260]} position={[0, 0, -75]} rotation={[0, 0, Math.PI / 4]}>
        <meshBasicMaterial 
          color="#252550"
          transparent 
          opacity={0.08}
        />
      </Plane>
    </group>
  );
};

// Central Holographic Earth
const HolographicEarth = () => {
  const { scene } = useGLTF('/models/earth/earth.gltf');
  const earthRef = useRef();
  const groupRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (earthRef.current) {
      const box = new THREE.Box3().setFromObject(earthRef.current);
      const center = box.getCenter(new THREE.Vector3());
      earthRef.current.position.sub(center);
    }
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current || !earthRef.current) return;

    const time = state.clock.elapsedTime;
    const progress = scrollProgress;

    // Advanced orbital animation
    const radius = 3 + Math.sin(progress * Math.PI) * 2;
    const height = Math.sin(progress * Math.PI * 2) * 4;
    
    groupRef.current.position.x = Math.sin(progress * Math.PI * 4 + time * 0.2) * radius;
    groupRef.current.position.y = height;
    groupRef.current.position.z = Math.cos(progress * Math.PI * 4 + time * 0.2) * radius - 5;

    // Dynamic scaling
    const scale = 2 + Math.sin(progress * Math.PI * 3) * 1.5;
    groupRef.current.scale.setScalar(scale);

    // Multiple axis rotation
    earthRef.current.rotation.y = time * 0.3 + progress * Math.PI * 6;
    earthRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    earthRef.current.rotation.z = Math.cos(time * 0.3) * 0.1;

    // Holographic effect
    groupRef.current.rotation.y = time * 0.1;
  });

  return (
    <group ref={groupRef}>
      <primitive ref={earthRef} object={scene} />
      {/* Holographic ring around earth */}
      <Torus args={[4, 0.05, 16, 100]}>
        <meshStandardMaterial color="#00ffff" transparent opacity={0.8} wireframe />
      </Torus>
    </group>
  );
};

// Main Component - All Background Elements Behind Globe
const VibrantDarkBackground = () => {
  return (
    <group>
      {/* All background elements positioned far behind the globe */}
      <DeepAtmosphericLayers />
      <DeepVolumetricEffects />
      <FarBackgroundFields />
      {/* Globe renders in front of all background elements */}
      <HolographicEarth />
    </group>
  );
};

const BackgroundEarth = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <Suspense fallback={null}>
        <Canvas
          camera={{ 
            position: [0, 5, 20], 
            fov: 60,
            near: 0.1,
            far: 1000
          }}
          style={{ 
            width: '100%', 
            height: '100%',
            background: 'linear-gradient(180deg, #000205 0%, #050510 25%, #0a0a18 50%, #0f0f20 75%, #141428 100%)'
          }}
        >
          {/* Enhanced lighting that doesn't interfere with globe visibility */}
          <ambientLight intensity={0.3} color="#ffffff" />
          
          <directionalLight 
            position={[20, 20, 10]} 
            intensity={2.0}
            color="#ffffff"
            castShadow
          />
          
          <directionalLight 
            position={[-15, -10, -8]} 
            intensity={1.0}
            color="#ffffff"
          />
          
          <pointLight 
            position={[0, 10, 15]} 
            intensity={2.5}
            color="#ffffff"
            distance={80}
          />
          
          <pointLight 
            position={[15, -15, 5]} 
            intensity={1.5}
            color="#ffffff"
            distance={60}
          />
          
          {/* Subtle fog that doesn't affect globe */}
          
          
          <VibrantDarkBackground />
        </Canvas>
      </Suspense>
    </div>
  );
};

useGLTF.preload('/models/earth/earth.gltf');

export default BackgroundEarth; 