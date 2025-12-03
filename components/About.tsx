import React, { useState, useEffect, useRef } from 'react';
import { STATS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Bot, Scan, Zap } from 'lucide-react';

const data = [
  { name: 'Jan', uv: 4000 },
  { name: 'Feb', uv: 3000 },
  { name: 'Mar', uv: 2000 },
  { name: 'Apr', uv: 2780 },
  { name: 'May', uv: 1890 },
  { name: 'Jun', uv: 2390 },
  { name: 'Jul', uv: 3490 },
  { name: 'Aug', uv: 4200 },
  { name: 'Sep', uv: 5100 },
  { name: 'Oct', uv: 6200 },
  { name: 'Nov', uv: 7800 },
  { name: 'Dec', uv: 9500 },
];

const Counter = ({ end, duration }: { end: number; duration: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={countRef}>{count}</span>;
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Trigger for 3D Stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-32 relative overflow-hidden perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-500/30 text-primary-600 dark:text-primary-300 text-xs font-medium mb-6">
              <Zap size={14} className="fill-current" />
              System Architecture
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Data Driven at <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-cyan-400">
                Quantum Scale
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              We process petabytes of information daily to refine our models. 
              Our growth isn't just a metric; it's a testament to the efficacy of our 
              quantum-resistant algorithms and distributed neural architecture.
            </p>

            {/* 3D Animated Stats Grid */}
            <div 
              ref={statsRef}
              className="grid grid-cols-2 gap-6 perspective-1000"
            >
              {STATS.map((stat, index) => (
                <div 
                  key={stat.id}
                  className={`
                    bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-2xl 
                    transition-all duration-1000 ease-out
                    ${statsVisible 
                      ? 'opacity-100 translate-y-0 rotate-x-0' 
                      : 'opacity-0 translate-y-20 rotate-x-90'}
                  `}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1 flex items-baseline gap-0.5">
                    <Counter end={stat.value} duration={2500} />
                    <span className="text-primary-500 text-2xl">{stat.suffix}</span>
                  </div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
             {/* Chart Container with Glass Effect */}
             <div className="h-[500px] w-full bg-white/50 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-white/10 p-2 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
                
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

                <div className="h-full w-full relative z-10 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#9ca3af', fontSize: 12}} 
                          dy={10}
                        />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                            borderColor: 'rgba(255,255,255,0.1)', 
                            color: '#f3f4f6',
                            borderRadius: '12px',
                            backdropFilter: 'blur(8px)'
                          }}
                          itemStyle={{ color: '#818cf8' }}
                          cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="uv" 
                          stroke="#6366f1" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorUv)" 
                          animationDuration={2000}
                        />
                      </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Chart Overlay Badge */}
                <div className="absolute top-6 right-6 bg-white dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-100 dark:border-white/10 shadow-lg flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-xs font-bold text-gray-800 dark:text-white">Live Ingestion</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
