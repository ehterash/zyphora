
import React, { useRef, useState } from 'react';
import { Shield, Zap, Lock, Cpu, Globe, Layers } from 'lucide-react';

const REASONS = [
  {
    icon: Layers,
    title: "Sovereign Architecture",
    desc: "We don't wrap APIs. We own the stack. Full vertical integration from silicon to software.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Zap,
    title: "Velocity Prime",
    desc: "The world's first sub-10ms inference engine for LLMs. Speed is no longer a bottleneck.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Lock,
    title: "Quantum Shield",
    desc: "AES-256 is obsolete. Our data fortress is secured by post-quantum cryptographic lattices.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: Globe,
    title: "Edge Ubiquity",
    desc: "200+ Points of Presence. Your intelligence lives where your users do.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Cpu,
    title: "Neuromorphic Design",
    desc: "Hardware-aware model optimization that mimics biological synaptic efficiency.",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: Shield,
    title: "Zero-Trust Compliance",
    desc: "GDPR, HIPAA, SOC2 Type III. We exceed the standards so you don't have to worry.",
    color: "from-red-500 to-rose-500"
  }
];

const BentoCard = ({ item, index }: { item: typeof REASONS[0], index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 overflow-hidden hover:scale-[1.02] transition-transform duration-500 ${index === 0 || index === 3 ? 'md:col-span-2' : ''}`}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-transparent via-primary-500 to-transparent"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg shadow-gray-200/50 dark:shadow-none group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
          <item.icon className="text-white w-7 h-7" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:translate-x-1 transition-transform">{item.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
          {item.desc}
        </p>

        {/* Decorative Elements */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-1">
             <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
             <div className="w-1 h-1 bg-current rounded-full animate-bounce delay-100"></div>
             <div className="w-1 h-1 bg-current rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-32 relative bg-white dark:bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-primary-500 tracking-[0.2em] uppercase mb-4 animate-pulse">The Zyphora Standard</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Why the <span className="underline decoration-primary-500 underline-offset-8 decoration-4">Giants</span> Choose Us
          </h3>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We aren't just another API wrapper. We are the foundational layer for the next decade of computing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REASONS.map((item, index) => (
            <BentoCard key={index} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
