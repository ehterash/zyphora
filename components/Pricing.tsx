
import React, { useState, useEffect, useRef } from 'react';
import { Check, X, Zap, Server, Shield, Cpu, ArrowRight } from 'lucide-react';
import { PRICING_TIERS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- Types & Data ---

const COMPARISON_DATA = [
  { month: 'Jan', legacy: 4000, zyphora: 4000 },
  { month: 'Feb', legacy: 4200, zyphora: 3000 },
  { month: 'Mar', legacy: 4500, zyphora: 2500 },
  { month: 'Apr', legacy: 4800, zyphora: 2200 },
  { month: 'May', legacy: 5200, zyphora: 2000 },
  { month: 'Jun', legacy: 5800, zyphora: 1800 },
  { month: 'Jul', legacy: 6500, zyphora: 1700 },
  { month: 'Aug', legacy: 7000, zyphora: 1650 },
];

const FEATURE_COMPARISON = [
  { feature: 'API Latency', zyphora: '< 50ms', others: '200ms+' },
  { feature: 'Model Training', zyphora: 'Real-time', others: 'Batch (24h)' },
  { feature: 'Encryption', zyphora: 'Quantum-Safe', others: 'AES-256' },
  { feature: 'Support', zyphora: 'Dedicated AI Agent', others: 'Email Ticket' },
];

// --- Sub-Components ---
// 3D Robot has replaced the CSS PricingRobot

const ComparisonGraph = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full h-[500px] perspective-1000 mt-24"
      style={{ perspective: '1000px' }}
    >
      <div 
        className="w-full h-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-white/10 p-8 shadow-2xl transition-transform duration-100 ease-out"
        style={{
          transform: `rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="flex items-center justify-between mb-8 transform translate-z-10">
           <div>
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Cost Efficiency Projection</h3>
             <p className="text-gray-500 text-sm">Cumulative monthly operational costs ($)</p>
           </div>
           <div className="flex gap-4 text-sm font-bold">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-red-400 rounded-full" /> Legacy Cloud
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-primary-500 rounded-full" /> Zyphora
              </div>
           </div>
        </div>

        <div className="h-[350px] w-full transform translate-z-20">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COMPARISON_DATA}>
                 <defs>
                    <linearGradient id="gradLegacy" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gradZyphora" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                       <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                 <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ fontSize: '12px' }}
                 />
                 <Area 
                    type="monotone" 
                    dataKey="legacy" 
                    stroke="#f87171" 
                    strokeWidth={3}
                    fill="url(#gradLegacy)" 
                    animationDuration={2000}
                 />
                 <Area 
                    type="monotone" 
                    dataKey="zyphora" 
                    stroke="#6366f1" 
                    strokeWidth={4}
                    fill="url(#gradZyphora)" 
                    animationDuration={2000} 
                    animationBegin={500}
                 />
              </AreaChart>
           </ResponsiveContainer>
        </div>

        {/* Floating Stat Badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md border border-primary-500/50 p-4 rounded-xl shadow-2xl transform translate-z-30 animate-float">
           <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Projected Savings</div>
           <div className="text-3xl font-bold text-white text-center">64%</div>
        </div>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-32 relative overflow-hidden bg-white dark:bg-[#080808]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Invest in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-600">Velocity</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Stop paying for idle compute. Zyphora's autonomous scaling ensures you only pay for the intelligence you use.
          </p>
          
          {/* Toggle */}
          <div className="inline-flex items-center p-1 bg-gray-100 dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 backdrop-blur-sm">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${!isYearly ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isYearly ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Yearly
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-32 perspective-1000">
          {PRICING_TIERS.map((tier, index) => (
            <div
              key={tier.id}
              className={`
                relative rounded-3xl p-8 flex flex-col transition-all duration-500 group
                ${tier.highlighted 
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-2xl scale-105 z-10' 
                  : 'bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:border-primary-500/50 hover:shadow-xl'
                }
              `}
              style={{
                animation: `popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards`,
                animationDelay: `${index * 150}ms`
              }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest shadow-lg animate-pulse">
                  POPULAR CHOICE
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {tier.name}
                  {tier.id === 'enterprise' && <Shield size={18} className="text-primary-500" />}
                  {tier.id === 'pro' && <Zap size={18} className="text-yellow-400" />}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tighter">
                    ${isYearly ? tier.price.yearly : tier.price.monthly}
                  </span>
                  <span className={`text-sm ${tier.highlighted ? 'opacity-80' : 'text-gray-500'}`}>/{isYearly ? 'yr' : 'mo'}</span>
                </div>
                <p className={`text-sm mt-4 leading-relaxed ${tier.highlighted ? 'opacity-90' : 'text-gray-500'}`}>
                   Perfect for {tier.id === 'starter' ? 'startups' : tier.id === 'pro' ? 'growing teams' : 'global organizations'} looking to leverage AI.
                </p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm group-hover:translate-x-1 transition-transform duration-300">
                    <div className={`mt-0.5 p-0.5 rounded-full ${tier.highlighted ? 'bg-white/20' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'}`}>
                      <Check size={12} />
                    </div>
                    <span className={tier.highlighted ? 'opacity-90' : 'opacity-80'}>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02]'
                    : 'bg-gray-900 dark:bg-white/10 text-white hover:bg-primary-600 dark:hover:bg-white/20 hover:scale-[1.02]'
                }`}
              >
                {tier.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* 3D Graph Section */}
        <div className="mb-32">
           <ComparisonGraph />
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/5">
          <div className="text-center mb-12">
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Why leaders switch to Zyphora</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="py-4 pl-4 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feature</th>
                  <th className="py-4 text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Zyphora</th>
                  <th className="py-4 pr-4 text-sm font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider">Competitors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {FEATURE_COMPARISON.map((row, i) => (
                  <tr key={i} className="group hover:bg-white dark:hover:bg-white/5 transition-colors">
                    <td className="py-6 pl-4 font-medium text-gray-900 dark:text-white flex items-center gap-3">
                      {i === 0 && <Zap size={18} className="text-yellow-500" />}
                      {i === 1 && <Cpu size={18} className="text-blue-500" />}
                      {i === 2 && <Shield size={18} className="text-green-500" />}
                      {i === 3 && <Server size={18} className="text-purple-500" />}
                      {row.feature}
                    </td>
                    <td className="py-6 font-bold text-gray-900 dark:text-white">{row.zyphora}</td>
                    <td className="py-6 pr-4 text-gray-500 dark:text-gray-500">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Pricing;
