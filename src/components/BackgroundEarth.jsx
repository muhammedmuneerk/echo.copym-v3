import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Torus } from '@react-three/drei';
import * as THREE from 'three';

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
    </group>
  );
};

const BackgroundEarth = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Load Three.js and Vanta.js scripts
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        // Check if scripts are already loaded
        if (!window.THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        }
        
        if (!window.VANTA || !window.VANTA.CLOUDS2) {
          await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds2.min.js');
        }

        // Initialize Vanta effect
        if (vantaRef.current && window.VANTA) {
          vantaEffect.current = window.VANTA.CLOUDS2({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            texturePath: './gallery/noise.png'
          });
        }
      } catch (error) {
        console.error('Error loading Vanta.js:', error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      {/* Vanta.js Background */}
      <div 
        ref={vantaRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* Three.js Canvas with transparent background */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
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
              background: 'transparent'
            }}
          >
            {/* Enhanced lighting for the Earth model */}
            <ambientLight intensity={0.4} color="#ffffff" />
            
            <directionalLight 
              position={[20, 20, 10]} 
              intensity={2.5}
              color="#ffffff"
              castShadow
            />
            
            <directionalLight 
              position={[-15, -10, -8]} 
              intensity={1.2}
              color="#ffffff"
            />
            
            <pointLight 
              position={[0, 10, 15]} 
              intensity={3.0}
              color="#ffffff"
              distance={80}
            />
            
            <pointLight 
              position={[15, -15, 5]} 
              intensity={2.0}
              color="#ffffff"
              distance={60}
            />
            
            <HolographicEarth />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

useGLTF.preload('/models/earth/earth.gltf');

export default BackgroundEarth; 