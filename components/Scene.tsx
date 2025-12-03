
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import Robot from './Robot';

// Define the R3F elements used in this file
interface CustomIntrinsicElements {
  ambientLight: any;
  pointLight: any;
  spotLight: any;
}

// Extend global JSX
declare global {
  namespace JSX {
    interface IntrinsicElements extends CustomIntrinsicElements {}
  }
}

// Extend React JSX (for newer React types)
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends CustomIntrinsicElements {}
  }
}

const Scene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Handle high DPI screens
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          
          {/* Main Key Light */}
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
          
          {/* Secondary Fill Light */}
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ec4899" />
          
          {/* Rim Light for Robot Edges */}
          <spotLight position={[0, 10, -10]} intensity={2} color="#00ffff" angle={0.5} penumbra={1} />
          
          {/* Environment Reflection */}
          <Environment preset="city" />
          
          {/* Background Stars (Subtle) */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          <Robot />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
