"use client";

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, Image as DreiImage } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function BagScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Mouse Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!groupRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(groupRef.current.rotation, {
        x: y * 0.05,
        y: x * 0.08,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      {/* Bag 2 (Back / Offset) */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={1}
        floatingRange={[-0.1, 0.1]}
      >
        <group position={[-1.2, -0.3, -2]}>
          {/* Soft purple glow */}
          <mesh position={[0, 0, -0.1]}>
            <circleGeometry args={[1.5, 32]} />
            <meshBasicMaterial color="#d8b4fe" transparent opacity={0.15} />
          </mesh>
          <DreiImage
            url="/images/purple-bag2.png"
            transparent
            scale={[3, 3]}
            toneMapped={false}
          />
        </group>
      </Float>

      {/* Bag 1 (Front / Main) */}
      <Float
        speed={2}
        rotationIntensity={0.3}
        floatIntensity={1.5}
        floatingRange={[-0.15, 0.15]}
      >
        <group position={[0.8, 0.1, 0]}>
          {/* Stronger purple glow */}
          <mesh position={[0, 0, -0.1]}>
            <circleGeometry args={[2, 32]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.15} />
          </mesh>
          <DreiImage
            url="/images/purple-bag1.png"
            transparent
            scale={[4, 4]}
            toneMapped={false}
          />
        </group>
      </Float>
    </group>
  );
}

export function HeroBags3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power3.out", delay: 0.4 }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <BagScene />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
