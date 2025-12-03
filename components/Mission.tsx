
import React, { useRef, useState, useEffect } from 'react';
import { Flag, Target, Rocket, Star } from 'lucide-react';

const TIMELINE = [
  {
    year: "Phase 1: Genesis",
    title: "Democratizing Intelligence",
    desc: "Making state-of-the-art inference accessible to every developer, startup, and enterprise without the capex of GPU farms.",
    icon: Flag,
    active: true
  },
  {
    year: "Phase 2: Expansion",
    title: "The Neural Fabric",
    desc: "Integrating AI into the physical world via IoT edge nodes, creating a responsive, ambient intelligence layer.",
    icon: Rocket,
    active: false
  },
  {
    year: "Phase 3: Singularity",
    title: "Human-AI Symbiosis",
    desc: "Closing the bandwidth gap between biological and silicon intelligence. The final frontier of evolution.",
    icon: Star,
    active: false
  }
];

const Mission: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight * 0.8;
      const end = -rect.height * 0.2;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="mission" ref={sectionRef} className="py-32 relative overflow-hidden bg-black text-white">
      {/* Starfield Background */}
      <div className="absolute inset-0 opacity-40">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Left: Sticky Title */}
          <div className="md:w-1/3">
            <div className="sticky top-32">
              <h2 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tighter">
                OUR <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-600">
                  MISSION
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                We are building the nervous system of the future. It's not just about better chatbots; it's about unlocking the latent potential of the human species through silicon amplification.
              </p>
              <button className="px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold tracking-widest text-sm uppercase">
                Read The Manifesto
              </button>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="md:w-2/3 relative pl-8 md:pl-16">
            
            {/* The Laser Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="w-full bg-gradient-to-b from-primary-500 via-purple-500 to-cyan-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            <div className="space-y-32">
              {TIMELINE.map((item, index) => {
                const isRevealed = scrollProgress > (index + 0.1) * 0.3; // Stagger reveal based on scroll
                
                return (
                  <div 
                    key={index}
                    className={`relative transition-all duration-1000 transform ${isRevealed ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-10'}`}
                  >
                    {/* Node on the line */}
                    <div className={`absolute -left-[41px] md:-left-[73px] top-0 w-6 h-6 rounded-full border-4 border-black transition-colors duration-500 ${isRevealed ? 'bg-primary-500 shadow-[0_0_20px_rgba(99,102,241,1)]' : 'bg-gray-800'}`} />

                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-primary-500 font-mono text-sm tracking-widest uppercase border border-primary-500/30 px-3 py-1 rounded-full bg-primary-500/10">
                        {item.year}
                      </span>
                      <item.icon className={`w-6 h-6 ${isRevealed ? 'text-white' : 'text-gray-600'}`} />
                    </div>

                    <h3 className="text-4xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                      {item.desc}
                    </p>

                    {/* Holographic Card Effect Background */}
                    <div className={`absolute -inset-6 bg-gradient-to-r from-primary-500/5 to-purple-500/5 rounded-3xl -z-10 blur-xl transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Mission;
