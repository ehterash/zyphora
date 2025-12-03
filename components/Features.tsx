
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, Eye, Star, Activity, Cpu, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- Data & Types ---

const VOICE_DATA = [
  { name: 'Legacy TTS', lat: 800 },
  { name: 'Std. AI', lat: 450 },
  { name: 'Human', lat: 200 },
  { name: 'Zyphora', lat: 120 }, // Highlighting our speed
];

const REVIEWS = {
  chatbot: {
    text: "The contextual awareness is frighteningly good. It handled our complex insurance queries better than our senior support staff.",
    author: "J. Mercer, CEO at InsureTech",
    stars: 5
  },
  voice: {
    text: "We replaced our entire call center. Customers literally cannot tell they are speaking to an AI. The latency is zero.",
    author: "Samantha Wu, CTO at Voicify",
    stars: 5
  }
};

// --- Sub-Components ---

const ReviewCard = ({ data }: { data: typeof REVIEWS.chatbot }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl mt-8 transform transition-transform hover:scale-105">
    <div className="flex gap-1 mb-3">
      {[...Array(data.stars)].map((_, i) => (
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{data.text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-indigo-600 flex items-center justify-center text-xs text-white font-bold">
        {data.author.charAt(0)}
      </div>
      <div className="text-sm font-semibold text-gray-900 dark:text-white">{data.author}</div>
    </div>
  </div>
);

const Features: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for 3D parallax effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20, // -10 to 10
      y: (clientY / innerHeight - 0.5) * 20, // -10 to 10
    });
  };

  return (
    <section 
      id="features" 
      className="py-32 relative overflow-hidden bg-gray-50 dark:bg-[#050505]"
      onMouseMove={handleMouseMove}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
         <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-32">
          <h2 className="text-primary-600 dark:text-primary-400 font-semibold tracking-[0.2em] uppercase text-sm mb-4">
            Next-Gen Services
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Beyond Artificial. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-primary-500 to-purple-500">
              Truly Intelligent.
            </span>
          </h3>
        </div>

        {/* --- SERVICE 1: CHATBOT --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-40 group perspective-1000">
          
          {/* Content Left */}
          <div className="order-2 lg:order-1">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare size={24} />
            </div>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Neural Conversational Agents
            </h4>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Forget scripted responses. Our agents utilize <strong>Large Language Models (LLMs)</strong> with 
              proprietary RAG (Retrieval-Augmented Generation) pipelines. They understand context, 
              sarcasm, and complex intent, retaining memory across infinitely long conversation threads.
            </p>
            <ul className="space-y-3 mb-8">
              {['Sentiment Analysis', 'Multi-turn Memory', '100+ Languages'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Cpu size={16} className="text-primary-500" /> {item}
                </li>
              ))}
            </ul>
            <ReviewCard data={REVIEWS.chatbot} />
          </div>

          {/* Visual Right (3D Chat UI) */}
          <div 
            className="order-1 lg:order-2 relative h-[500px] perspective-1000"
            style={{ perspective: '1000px' }}
          >
            <div 
              className="relative w-full h-full bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl p-6 flex flex-col transition-transform duration-200 ease-out"
              style={{
                transform: `rotateY(${mousePos.x * -0.5}deg) rotateX(${mousePos.y * 0.5}deg)`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Fake Chat UI */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"/>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                  <div className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <div className="text-xs text-gray-400 font-mono">LIVE_AGENT_V2.0</div>
              </div>

              <div className="space-y-4 flex-1">
                {/* User Msg */}
                <div className="flex justify-end animate-in slide-in-from-right fade-in duration-700">
                  <div className="bg-primary-600 text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-lg">
                    Analyze the Q3 revenue drop in the APAC region vs EU.
                  </div>
                </div>

                {/* AI Processing State */}
                <div className="flex gap-2 mb-2 animate-pulse pl-2">
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full delay-75"></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full delay-150"></div>
                </div>

                {/* AI Msg */}
                <div className="flex justify-start animate-in slide-in-from-left fade-in duration-700 delay-300">
                  <div className="bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-[90%] text-sm border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-md">
                    <p className="mb-2">I've detected a <strong>12.4% variance</strong>. The primary factor is supply chain latency in the Singapore node.</p>
                    <div className="h-24 bg-gray-200 dark:bg-black/30 rounded-lg w-full relative overflow-hidden mt-2">
                        {/* Fake mini chart */}
                        <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-between px-2 pb-2 gap-1">
                            {[40, 60, 30, 80, 50, 90, 40].map((h, i) => (
                                <div key={i} style={{height: `${h}%`}} className="w-full bg-indigo-500/50 rounded-sm"></div>
                            ))}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Decoration */}
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-white/10 animate-float">
                <ShieldCheck className="text-green-500 w-8 h-8" />
                <div className="text-[10px] font-bold mt-1 text-center">SECURE</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SERVICE 2: VOICE --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-40">
           
           {/* Visual Left (Charts + Wave) */}
           <div 
             className="relative h-[500px]"
             style={{
                transform: `translateY(${mousePos.y * -1}px)`
             }}
           >
             <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                {/* Sonic Wave BG */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="flex gap-1 h-32 items-center">
                        {[...Array(20)].map((_, i) => (
                            <div 
                                key={i} 
                                className="w-2 bg-primary-500 rounded-full animate-pulse"
                                style={{ 
                                    height: `${Math.random() * 100}%`,
                                    animationDuration: `${0.5 + Math.random()}s`
                                }} 
                            />
                        ))}
                    </div>
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col">
                    <h5 className="text-white/70 text-sm font-mono mb-6 uppercase">Latency Benchmark (ms)</h5>
                    
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={VOICE_DATA} layout="vertical" margin={{ left: 0, right: 30 }}>
                                <XAxis type="number" hide />
                                <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                                    width={70}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                                />
                                <Bar dataKey="lat" radius={[0, 4, 4, 0]} barSize={30}>
                                    {VOICE_DATA.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.name === 'Zyphora' ? '#6366f1' : '#374151'} 
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-6 flex items-center gap-4 bg-black/30 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                        <Activity className="text-green-400" />
                        <div>
                            <div className="text-white font-bold text-lg">120ms</div>
                            <div className="text-xs text-gray-400">Total Roundtrip Latency</div>
                        </div>
                    </div>
                </div>
             </div>
           </div>

           {/* Content Right */}
           <div>
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl flex items-center justify-center mb-6">
              <Mic size={24} />
            </div>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Sonic Voice Synthesis
            </h4>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Create vocal experiences that are indistinguishable from reality. Our 
              <strong> Neural Audio Engine</strong> captures breath, pause, and intonation 
              nuances, delivering a warm, human-like presence that traditional TTS cannot match.
            </p>
            <ul className="space-y-3 mb-8">
              {['Sub-200ms Latency', 'Emotion Control', 'Voice Cloning'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Activity size={16} className="text-pink-500" /> {item}
                </li>
              ))}
            </ul>
            <ReviewCard data={REVIEWS.voice} />
          </div>
        </div>

        {/* --- SERVICE 3: VISION (Added) --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Left */}
          <div className="order-2 lg:order-1">
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-xl flex items-center justify-center mb-6">
              <Eye size={24} />
            </div>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Cognitive Computer Vision
            </h4>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Give your applications the gift of sight. From real-time defect detection on 
              assembly lines to biometric security, our vision models process video streams 
              at 60FPS on the edge.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-8">
               {['Object Detection', 'Facial Recognition', 'Spatial Analysis'].map(tag => (
                   <span key={tag} className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                       {tag}
                   </span>
               ))}
            </div>
          </div>

          {/* Visual Right (Scanning Animation) */}
          <div className="order-1 lg:order-2 relative h-[400px] w-full group overflow-hidden rounded-3xl">
             <img 
               src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000" 
               alt="AI Vision" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
             />
             <div className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply" />
             
             {/* Scanning Line */}
             <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-[scan_3s_ease-in-out_infinite]" />

             {/* Bounding Boxes */}
             <div className="absolute top-[30%] left-[40%] w-[100px] h-[100px] border-2 border-cyan-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-6 left-0 bg-cyan-400 text-black text-xs font-bold px-2 py-0.5">HUMAN: 99%</div>
             </div>

             <div className="absolute top-[20%] right-[20%] w-[60px] h-[60px] border-2 border-primary-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <div className="absolute -top-6 left-0 bg-primary-500 text-white text-xs font-bold px-2 py-0.5">BOT: 45%</div>
             </div>

             {/* Overlay UI */}
             <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="text-white font-mono text-xs">
                    <div>FPS: 59.9</div>
                    <div>CONFIDENCE: 0.98</div>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
             </div>
          </div>

        </div>

      </div>
      
      {/* Global CSS for unique animations */}
      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Features;
