import React, { useRef, useState, MouseEvent } from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced max rotation for a more subtle, premium feel
    const MAX_ROTATION = 5;
    
    const rotateX = ((y - centerY) / centerY) * -MAX_ROTATION;
    const rotateY = ((x - centerX) / centerX) * MAX_ROTATION;
    
    // Calculate glare position as percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div
        className="transition-transform duration-100 ease-out h-full relative rounded-2xl overflow-hidden"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
        
        {/* Premium Glare Effect */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
            opacity: glare.opacity,
            mixBlendMode: 'overlay',
          }}
        />
        
        {/* Optional Border Glow */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl z-20 border border-white/10"
          style={{ opacity: glare.opacity }}
        />
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-gray-900 dark:text-white mb-16">
          Trusted by Visionaries
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <TiltCard key={t.id} className="h-full">
              <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 shadow-lg flex flex-col">
                <Quote className="text-primary-500 mb-6 opacity-50" size={32} />
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic flex-grow">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500/20"
                  />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;