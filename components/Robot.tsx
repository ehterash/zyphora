
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Trail, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Define the R3F elements used in this file
interface CustomIntrinsicElements {
  group: any;
  mesh: any;
  torusGeometry: any;
  meshStandardMaterial: any;
  octahedronGeometry: any;
  meshBasicMaterial: any;
  pointLight: any;
  boxGeometry: any;
  meshPhysicalMaterial: any;
  cylinderGeometry: any;
  sphereGeometry: any;
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

// --- High-Fidelity Futuristic Robot Parts ---

const GyroCore = () => {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.x += delta * 0.5;
    if (ring1.current) ring1.current.rotation.y += delta * 0.2;
    
    if (ring2.current) ring2.current.rotation.x -= delta * 0.4;
    if (ring2.current) ring2.current.rotation.z += delta * 0.3;
    
    if (ring3.current) ring3.current.rotation.y -= delta * 0.6;
    
    if (core.current) {
        core.current.rotation.y += delta * 2;
        core.current.rotation.z += delta;
        // Pulse effect
        const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
        core.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Gyro Ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[0.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#444" metalness={1} roughness={0.1} />
      </mesh>
      {/* Middle Gyro Ring */}
      <mesh ref={ring2}>
        <torusGeometry args={[0.4, 0.03, 16, 100]} />
        <meshStandardMaterial color="#333" metalness={1} roughness={0.1} />
      </mesh>
      {/* Inner Gyro Ring */}
      <mesh ref={ring3}>
        <torusGeometry args={[0.3, 0.04, 16, 100]} />
        <meshStandardMaterial color="#6366f1" metalness={1} roughness={0} emissive="#6366f1" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Energy Core */}
      <mesh ref={core}>
        <octahedronGeometry args={[0.15]} />
        <meshBasicMaterial color="#00ffff" toneMapped={false} />
      </mesh>
      <pointLight color="#00ffff" intensity={2} distance={2} />
    </group>
  );
};

const CyberHead = () => (
  <group position={[0, 0.9, 0]}>
    {/* Main Skull */}
    <mesh>
      <boxGeometry args={[0.35, 0.45, 0.4]} />
      <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
    </mesh>
    
    {/* Visor */}
    <mesh position={[0, 0.05, 0.18]}>
      <boxGeometry args={[0.36, 0.15, 0.1]} />
      <meshPhysicalMaterial 
        color="#00ffff" 
        emissive="#00ffff"
        emissiveIntensity={2}
        metalness={1}
        roughness={0}
        transparent
        opacity={0.9}
      />
    </mesh>

    {/* Side Ears/Vents */}
    <mesh position={[0.2, 0, -0.05]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.1, 0.3, 0.3]} />
        <meshStandardMaterial color="#333" metalness={0.9} />
    </mesh>
    <mesh position={[-0.2, 0, -0.05]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.1, 0.3, 0.3]} />
        <meshStandardMaterial color="#333" metalness={0.9} />
    </mesh>
    
    {/* Antenna */}
    <mesh position={[0.15, 0.3, -0.1]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3]} />
        <meshStandardMaterial color="#666" metalness={1} />
    </mesh>
  </group>
);

const FloatingArmor = () => (
    <group>
        {/* Chest Plate */}
        <mesh position={[0, 0.4, 0.35]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.4, 0.3, 0.1]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
        </mesh>
        
        {/* Back Plate */}
        <mesh position={[0, 0.4, -0.35]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[0.4, 0.4, 0.1]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Shoulder Floaters */}
        <group position={[0.6, 0.5, 0]}>
            <mesh rotation={[0, 0, -0.2]}>
                <boxGeometry args={[0.1, 0.4, 0.4]} />
                <meshStandardMaterial color="#6366f1" metalness={1} roughness={0.1} />
            </mesh>
        </group>
        <group position={[-0.6, 0.5, 0]}>
            <mesh rotation={[0, 0, 0.2]}>
                <boxGeometry args={[0.1, 0.4, 0.4]} />
                <meshStandardMaterial color="#6366f1" metalness={1} roughness={0.1} />
            </mesh>
        </group>
    </group>
);

const MechArm = ({ side = 'left' }: { side?: 'left' | 'right' }) => {
    const xMult = side === 'left' ? -1 : 1;
    return (
        <group position={[xMult * 0.7, -0.2, 0]}>
            {/* Upper Arm */}
            <mesh rotation={[0, 0, xMult * 0.2]}>
                <cylinderGeometry args={[0.05, 0.04, 0.5]} />
                <meshStandardMaterial color="#333" metalness={0.8} />
            </mesh>
            
            {/* Forearm - Floating */}
            <group position={[xMult * 0.1, -0.7, 0.2]}>
                <mesh>
                   <boxGeometry args={[0.15, 0.4, 0.15]} />
                   <meshStandardMaterial color="#eee" metalness={0.6} />
                </mesh>
                {/* Hand/Claw */}
                <mesh position={[0, -0.25, 0]}>
                    <sphereGeometry args={[0.08]} />
                    <meshBasicMaterial color="#00ffff" />
                </mesh>
            </group>
        </group>
    )
}

// --- Waypoints Configuration with Camera Control ---
// Includes position (pos), rotation (rot), camera position (cam), and camera focus (look)
const WAYPOINTS = [
  { 
    t: 0.0, 
    pos: [2.5, 0.5, 2], 
    rot: [0, -0.5, 0],
    cam: [0, 0, 10],
    look: [0, 0, 0]
  },     
  { 
    t: 0.15, 
    pos: [2, -0.5, 1], 
    rot: [0.1, -0.3, 0],
    cam: [0, -0.5, 11],
    look: [0.5, -0.5, 0] 
  },   
  { 
    t: 0.25, 
    pos: [-2.5, -1, 3], 
    rot: [0.2, 0.5, 0.1],
    cam: [0, -1, 12],
    look: [-1, -1, 0]
  }, 
  { 
    t: 0.35, 
    pos: [-1, 0, 2], 
    rot: [0.3, 0.2, 0],
    cam: [0, 0, 10],
    look: [-0.5, 0, 0]
  },      
  { 
    t: 0.45, 
    pos: [0, 0.5, 4], 
    rot: [0.5, 0, 0],
    cam: [0, 0.5, 8], // Zoom in for Mission
    look: [0, 0.5, 0]
  },       
  { 
    t: 0.55, 
    pos: [1.5, -1, 3], 
    rot: [0.2, -0.4, 0],
    cam: [0, -1, 10],
    look: [0.5, -1, 0]
  },   
  { 
    t: 0.65, 
    pos: [3.5, -2, 2], 
    rot: [0, -0.8, -0.2],
    cam: [1, -2, 12],
    look: [2, -2, 0]
  },    
  { 
    t: 0.75, 
    pos: [-3, -1.5, 2], 
    rot: [0.1, 0.6, 0],
    cam: [-1, -1.5, 11],
    look: [-2, -1.5, 0]
  },   
  { 
    t: 0.85, 
    pos: [0, -1, 0], 
    rot: [0, 0, 0],
    cam: [0, -1, 10],
    look: [0, -1, 0]
  },          
  { 
    t: 1.0, 
    pos: [0, 4, -5], 
    rot: [1, 0, 0],
    cam: [0, 2, 14],
    look: [0, 4, 0]
  },           
];

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

const Robot = () => {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Create vectors once to avoid garbage collection
  const targetCamPos = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!group.current) return;

    // 1. Get Scroll Position
    const scrollY = window.scrollY;
    // Calculate max scroll but assume a reasonable height if document is loading
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1000); 
    const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 0.999); // Clamp just under 1 to avoid array index out of bounds

    // 2. Find Active Keyframe
    let startIdx = 0;
    // Iterate to find the segment we are currently in
    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      if (scrollProgress >= WAYPOINTS[i].t && scrollProgress < WAYPOINTS[i+1].t) {
        startIdx = i;
        break;
      }
    }
    
    // Fallback for end of scroll
    if (scrollProgress >= WAYPOINTS[WAYPOINTS.length - 1].t) {
        startIdx = WAYPOINTS.length - 2;
    }

    const endIdx = startIdx + 1;
    const startWaypoint = WAYPOINTS[startIdx];
    const endWaypoint = WAYPOINTS[endIdx];

    // 3. Interpolate
    const segmentDuration = endWaypoint.t - startWaypoint.t;
    const segmentProgress = (scrollProgress - startWaypoint.t) / segmentDuration;
    
    // Cubic ease-in-out for smoother robot movement
    const t = Math.max(0, Math.min(1, segmentProgress));
    const easedT = t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    // Interpolate Robot Position
    const currentPos = new THREE.Vector3(
      lerp(startWaypoint.pos[0], endWaypoint.pos[0], easedT),
      lerp(startWaypoint.pos[1], endWaypoint.pos[1], easedT),
      lerp(startWaypoint.pos[2], endWaypoint.pos[2], easedT)
    );

    // Interpolate Robot Rotation
    const currentRot = new THREE.Euler(
      lerp(startWaypoint.rot[0], endWaypoint.rot[0], easedT),
      lerp(startWaypoint.rot[1], endWaypoint.rot[1], easedT),
      lerp(startWaypoint.rot[2], endWaypoint.rot[2], easedT)
    );

    // Interpolate Camera Position
    targetCamPos.set(
      lerp(startWaypoint.cam[0], endWaypoint.cam[0], easedT),
      lerp(startWaypoint.cam[1], endWaypoint.cam[1], easedT),
      lerp(startWaypoint.cam[2], endWaypoint.cam[2], easedT)
    );

    // Interpolate Camera LookAt Target
    targetLookAt.set(
      lerp(startWaypoint.look[0], endWaypoint.look[0], easedT),
      lerp(startWaypoint.look[1], endWaypoint.look[1], easedT),
      lerp(startWaypoint.look[2], endWaypoint.look[2], easedT)
    );

    // 4. Apply Transforms
    
    // Apply floating noise
    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 0.5) * 0.2; 
    
    // Smooth dampening for Robot
    group.current.position.lerp(new THREE.Vector3(currentPos.x, currentPos.y + floatY, currentPos.z), 0.1);
    
    // Use MathUtils.lerp for Euler angles to avoid gimbal lock issues locally
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, currentRot.x, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, currentRot.y + Math.sin(time * 0.2) * 0.1, 0.1);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, currentRot.z, 0.1);

    // Smooth dampening for Camera
    state.camera.position.lerp(targetCamPos, 0.05);
    
    // For LookAt, we need to manually update the quaternion or use a dummy object, 
    // but calling lookAt every frame with a lerped target vector works well for this use case.
    // We lerp the lookAt vector itself to smooth the focus transition.
    // However, since lookAt is a hard set, we can create a currentLookAt vector to store state if we wanted damping.
    // For simplicity and responsiveness, we'll look at the interpolated target.
    state.camera.lookAt(targetLookAt);
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group scale={1.3}>
          {/* Robot Components */}
          <CyberHead />
          <GyroCore />
          <FloatingArmor />
          <MechArm side="left" />
          <MechArm side="right" />

          {/* Effects */}
          <Sparkles count={50} scale={2} size={4} speed={0.4} opacity={0.5} color="#00ffff" />
          
          <Trail
            width={1}
            length={6}
            color={new THREE.Color("#6366f1")}
            attenuation={(t) => t * t}
          >
            <mesh position={[0, -0.5, 0]} visible={false}>
               <sphereGeometry args={[0.1]} />
            </mesh>
          </Trail>
        </group>
      </Float>
    </group>
  );
};

export default Robot;
