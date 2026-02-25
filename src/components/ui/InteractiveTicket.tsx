import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Environment, Float } from '@react-three/drei';

// --- PHYSICS ENGINE (Verlet Integration) ---
class Particle {
  position: THREE.Vector3;
  oldPosition: THREE.Vector3;
  acceleration: THREE.Vector3;
  mass: number;
  fixed: boolean;

  constructor(x: number, y: number, z: number, mass: number = 1, fixed: boolean = false) {
    this.position = new THREE.Vector3(x, y, z);
    this.oldPosition = new THREE.Vector3(x, y, z);
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.mass = mass;
    this.fixed = fixed;
  }

  update(dt: number) {
    if (this.fixed) return;
    const velocity = this.position.clone().sub(this.oldPosition);
    this.oldPosition.copy(this.position);
    // Verlet: pos + vel + acc * dt^2
    this.position.add(velocity).add(this.acceleration.clone().multiplyScalar(dt * dt));
    this.acceleration.set(0, 0, 0);
  }
}

class Constraint {
  p1: Particle;
  p2: Particle;
  distance: number;

  constructor(p1: Particle, p2: Particle) {
    this.p1 = p1;
    this.p2 = p2;
    this.distance = p1.position.distanceTo(p2.position);
  }

  solve() {
    const diff = this.p1.position.clone().sub(this.p2.position);
    const currentDist = diff.length();
    const error = (currentDist - this.distance) / currentDist;
    const correction = diff.multiplyScalar(error * 0.5);

    if (!this.p1.fixed) this.p1.position.sub(correction);
    if (!this.p2.fixed) this.p2.position.add(correction);
  }
}

// --- TICKET TEXTURE GENERATOR ---
const generateTicketTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Background
  ctx.fillStyle = '#111111'; // Black background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Watermark
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 4);
  ctx.font = 'bold 180px Courier New';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'; // Slightly more visible white watermark
  ctx.textAlign = 'center';
  ctx.fillText('GATEPASS', 0, -400);
  ctx.fillText('GATEPASS', 0, 0);
  ctx.fillText('GATEPASS', 0, 400);
  ctx.restore();

  // Border/Texture
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.fillStyle = '#ffffff'; // White text
  const drawCentered = (text: string, y: number, font: string, bold = false) => {
    ctx.font = `${bold ? 'bold ' : ''}${font}`;
    const metrics = ctx.measureText(text);
    ctx.fillText(text, (canvas.width - metrics.width) / 2, y);
  };

  const drawLeftRight = (left: string, right: string, y: number, font: string) => {
    ctx.font = font;
    ctx.fillText(left, 50, y);
    const metrics = ctx.measureText(right);
    ctx.fillText(right, canvas.width - 50 - metrics.width, y);
  };

  const drawDashed = (y: number) => {
    ctx.setLineDash([15, 10]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(canvas.width - 50, y);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  // Content
  drawCentered('GATEPASS TICKETING', 150, '64px Courier New', true);
  drawCentered('Decentralized Access Protocol', 220, '32px Courier New');
  drawCentered('Lagos, Nigeria', 270, '28px Courier New');
  drawCentered('Tel: +234 800 GATEPASS', 320, '28px Courier New');

  ctx.textAlign = 'left';
  ctx.font = '32px Courier New';
  ctx.fillText(`Date: ${new Date().toLocaleDateString('en-NG')} ${new Date().toLocaleTimeString('en-NG')}`, 50, 450);
  ctx.fillText('Order: #GP-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'), 50, 500);

  drawDashed(550);

  let y = 620;
  const items = [
    { name: 'VIP Access Pass', price: '₦5,000' },
    { name: 'Table of 4 (Silver)', price: '₦15,000' },
    { name: 'Table + Food (Gold)', price: '₦25,000' },
    { name: 'Early Bird Access', price: '₦2,000' },
    { name: 'Network Protocol Fee', price: '₦500' },
  ];

  items.forEach(item => {
    drawLeftRight(item.name, item.price, y, '32px Courier New');
    y += 60;
  });

  drawDashed(y + 20);
  y += 100;

  drawLeftRight('Subtotal', '₦47,500', y, '32px Courier New');
  drawLeftRight('VAT (7.5%)', '₦3,562', y + 60, '32px Courier New');

  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.beginPath();
  ctx.moveTo(50, y + 120);
  ctx.lineTo(canvas.width - 50, y + 120);
  ctx.stroke();

  drawLeftRight('TOTAL', '₦51,062', y + 200, 'bold 48px Courier New');

  drawCentered('THANK YOU FOR SECURING YOUR ACCESS!', 1850, '32px Courier New', true);
  drawCentered('gatepass.xyz', 1920, '24px Courier New');

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
};

// --- MAIN COMPONENT ---
const TicketMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport, mouse, raycaster, camera } = useThree();
  const [grabbedIndex, setGrabbedIndex] = useState<number | null>(null);
  
  // Grid settings
  const cols = 20;
  const rows = 40;
  const width = 3;
  const height = 6;
  const gravity = new THREE.Vector3(0, -9.8, 0);
  const dt = 0.016; // 60fps

  // Initialize particles and constraints
  const { particles, constraints } = useMemo(() => {
    const p: Particle[] = [];
    const c: Constraint[] = [];

    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols - 0.5) * width;
        const y = (0.5 - j / rows) * height + 1.2; // Hang slightly lower to avoid header
        const fixed = j === 0; // Pin the top row
        p.push(new Particle(x, y, 0, 1, fixed));
      }
    }

    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i <= cols; i++) {
        const idx = j * (cols + 1) + i;
        // Horizontal
        if (i < cols) c.push(new Constraint(p[idx], p[idx + 1]));
        // Vertical
        if (j < rows) c.push(new Constraint(p[idx], p[idx + (cols + 1)]));
        // Diagonals for stability
        if (i < cols && j < rows) {
          c.push(new Constraint(p[idx], p[idx + cols + 2]));
          c.push(new Constraint(p[idx + 1], p[idx + cols + 1]));
        }
      }
    }

    return { particles: p, constraints: c };
  }, []);

  const texture = useMemo(() => generateTicketTexture(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Automatic movement (simulating wind or "breathing")
    particles.forEach((p, i) => {
      if (!p.fixed && grabbedIndex === null) {
        // Subtle wave effect based on vertex position and time
        const force = Math.sin(time * 2 + p.position.x + p.position.y) * 0.05;
        p.acceleration.x += force;
        p.acceleration.z += Math.cos(time * 1.5 + i) * 0.02;
      }
    });

    // Interaction logic
    if (grabbedIndex !== null) {
      const mouse3D = new THREE.Vector3(mouse.x * viewport.width / 2, mouse.y * viewport.height / 2, 0);
      particles[grabbedIndex].position.copy(mouse3D);
      particles[grabbedIndex].oldPosition.copy(mouse3D);
    }

    // Physics steps
    particles.forEach(p => {
      p.acceleration.add(gravity);
      p.update(dt);
    });

    // Solver iterations
    for (let i = 0; i < 10; i++) {
      constraints.forEach(c => c.solve());
    }

    // Update geometry
    const positions = meshRef.current.geometry.attributes.position;
    particles.forEach((p, i) => {
      positions.setXYZ(i, p.position.x, p.position.y, p.position.z);
    });
    positions.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    const { index } = e.face;
    // Find the closest vertex from the face indices
    const indices = [e.face.a, e.face.b, e.face.c];
    let closestIdx = indices[0];
    let minDist = Infinity;
    
    indices.forEach(idx => {
      const dist = particles[idx].position.distanceTo(e.point);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });

    setGrabbedIndex(closestIdx);
  };

  const handlePointerUp = () => setGrabbedIndex(null);

  return (
    <group onPointerUp={handlePointerUp}>
      <mesh 
        ref={meshRef} 
        onPointerDown={handlePointerDown}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[width, height, cols, rows]} />
        <meshStandardMaterial 
          map={texture} 
          side={THREE.DoubleSide} 
          roughness={0.8}
          metalness={0.1}
          transparent
          alphaTest={0.5}
        />
      </mesh>
      
      {/* Interaction Indicator */}
      {grabbedIndex !== null && (
        <mesh position={particles[grabbedIndex].position}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.5} depthTest={false} />
        </mesh>
      )}
    </group>
  );
};

export const InteractiveTicket: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950">
      <div className="w-full h-[80vh] relative">
        <Canvas shadows camera={{ position: [0, -0.5, 9], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} castShadow />
          <directionalLight 
            position={[-5, 5, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />
          
          <TicketMesh />
          
          <Environment preset="night" />
        </Canvas>
      </div>
      
      {/* Automatic floating label removed as per request */}
    </div>
  );
};

export default InteractiveTicket;
