import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RotatingEarthBackground = () => {
  const { scene } = useGLTF('/models/earth/earth.gltf');
  const earthRef = useRef();
  const groupRef = useRef();
  const scrollDataRef = useRef({ rotationX: 0, rotationY: 0, rotationZ: 0 });
  const scrollTriggersRef = useRef([]);

  useEffect(() => {
    if (earthRef.current) {
      // Center the model
      const box = new THREE.Box3().setFromObject(earthRef.current);
      const center = box.getCenter(new THREE.Vector3());
      earthRef.current.position.sub(center);
    }

    // Set up scroll-triggered animations
    if (groupRef.current) {
      // Create ScrollTrigger animations for different scroll ranges
      
      // Main rotation based on overall scroll progress
      const mainTrigger = ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Update scroll data that will be used in useFrame
          scrollDataRef.current.rotationY = progress * Math.PI * 4; // 4 full rotations
          scrollDataRef.current.rotationX = Math.sin(progress * Math.PI * 2) * 0.3; // Tilt back and forth
          scrollDataRef.current.rotationZ = Math.cos(progress * Math.PI * 3) * 0.2; // Side tilt
        }
      });

      // Additional animation for hero section
      const heroTrigger = ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (groupRef.current) {
            // Scale and position changes during hero section
            const scale = 4.0 + (progress * 1.5); // Grow as we scroll through hero
            groupRef.current.scale.setScalar(scale);
            groupRef.current.position.z = -2 + (progress * -3); // Move further back
          }
        }
      });

      // Features section - different rotation behavior
      const featuresTrigger = ScrollTrigger.create({
        trigger: ".features-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Add extra rotation during features section
          scrollDataRef.current.rotationY += progress * Math.PI * 0.5;
          scrollDataRef.current.rotationX += Math.sin(progress * Math.PI) * 0.1;
        }
      });

      // Tokenization section - spinning effect
      const tokenizationTrigger = ScrollTrigger.create({
        trigger: ".tokenizationslider-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Extra spinning during tokenization section
          scrollDataRef.current.rotationY += progress * Math.PI * 2;
          scrollDataRef.current.rotationZ += Math.sin(progress * Math.PI * 2) * 0.15;
        }
      });

      // Market section - orbital movement
      const marketTrigger = ScrollTrigger.create({
        trigger: ".marketslider-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (groupRef.current) {
            // Orbital movement during market section
            const radius = 1;
            groupRef.current.position.x = Math.sin(progress * Math.PI * 2) * radius;
            groupRef.current.position.y += Math.cos(progress * Math.PI * 2) * radius * 0.5;
          }
          scrollDataRef.current.rotationX += Math.cos(progress * Math.PI * 2) * 0.2;
        }
      });

      // Metrics section - dramatic angle change
      const metricsTrigger = ScrollTrigger.create({
        trigger: ".metrics-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Dramatic tilt during metrics
          scrollDataRef.current.rotationX += progress * 0.4;
          scrollDataRef.current.rotationZ += progress * 0.3;
        }
      });

      // Blog section - gentle sway
      const blogTrigger = ScrollTrigger.create({
        trigger: ".blog-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Gentle swaying motion during blog section
          scrollDataRef.current.rotationX += Math.sin(progress * Math.PI) * 0.15;
          scrollDataRef.current.rotationZ += Math.cos(progress * Math.PI) * 0.1;
        }
      });

      // Store triggers for cleanup
      scrollTriggersRef.current = [
        mainTrigger, 
        heroTrigger, 
        featuresTrigger, 
        tokenizationTrigger,
        marketTrigger,
        metricsTrigger,
        blogTrigger
      ];
    }

    // Cleanup ScrollTriggers on unmount
    return () => {
      scrollTriggersRef.current.forEach(trigger => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, [scene]);

  useFrame((state) => {
    if (earthRef.current && groupRef.current) {
      // Apply scroll-based rotations
      earthRef.current.rotation.x = scrollDataRef.current.rotationX;
      earthRef.current.rotation.y = scrollDataRef.current.rotationY + (state.clock.elapsedTime * 0.1); // Add slow continuous rotation
      earthRef.current.rotation.z = scrollDataRef.current.rotationZ;

      // Subtle floating animation (reduced since we have scroll-based movement)
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      <primitive 
        ref={earthRef} 
        object={scene} 
        scale={4.0}
      />
    </group>
  );
};

const BackgroundEarth = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <Suspense fallback={null}>
        <Canvas
          camera={{ 
            position: [0, 0, 10], 
            fov: 50,
            near: 0.1,
            far: 1000
          }}
          style={{ 
            width: '100%', 
            height: '100%',
            background: 'transparent'
          }}
        >
          {/* Ambient lighting for overall illumination */}
          <ambientLight intensity={0.3} />
          
          {/* Main directional light to simulate sunlight */}
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={2.0}
            color="#ffffff"
            castShadow
          />
          
          {/* Secondary directional light for fill */}
          <directionalLight 
            position={[-8, -8, -8]} 
            intensity={0.6}
            color="#4a90e2"
          />
          
          {/* Point lights for additional atmosphere */}
          <pointLight 
            position={[0, 0, 15]} 
            intensity={0.8}
            color="#ffffff"
          />
          
          <pointLight 
            position={[20, 20, -15]} 
            intensity={0.3}
            color="#87ceeb"
          />
          
          <RotatingEarthBackground />
        </Canvas>
      </Suspense>
    </div>
  );
};

// Preload the GLTF model
useGLTF.preload('/models/earth/earth.gltf');

export default BackgroundEarth; 