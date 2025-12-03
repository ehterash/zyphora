
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, TrendingUp, DollarSign, Activity, Star, Users, MessageSquare, ThumbsUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';

// --- Data ---
const PROJECTS = [
  {
    id: 1,
    title: "Project Aether",
    client: "Global Logistics Co.",
    description: "Autonomous drone fleet management system optimizing last-mile delivery routes in real-time using reinforcement learning.",
    metrics: {
      cost: "2.4M",
      revenue: "18.5M",
      growth: "+640%",
    },
    reviews: [
      { text: "We cut delivery times by 45% in the first month.", author: "Sarah J., VP Operations", rating: 5 },
      { text: "The autonomous routing is flawless.", author: "Mike T., Fleet Mgr", rating: 5 },
      { text: "ROI achieved in just 4 weeks. Incredible.", author: "Elena R., CFO", rating: 5 },
      { text: "Fuel costs dropped by 30% instantly.", author: "David B., Sustainability Lead", rating: 5 },
      { text: "Zyphora's API is a joy to work with.", author: "Jessica L., Lead Dev", rating: 5 },
      { text: "Customer satisfaction scores are at an all-time high.", author: "Tom H., CS Head", rating: 5 },
      { text: "A logistics nightmare solved by AI.", author: "Amanda C., Ops Director", rating: 5 },
      { text: "Uptime has been 99.99% since launch.", author: "Robert K., CTO", rating: 5 },
      { text: "The drone swarm logic is mesmerizing to watch.", author: "Sam P., Field Tech", rating: 5 },
      { text: "Scaled to 50 cities without a hitch.", author: "Lucia M., Growth VP", rating: 5 },
      { text: "Support team resolves issues in minutes.", author: "Ken W., IT Manager", rating: 5 },
      { text: "This is the future of shipping.", author: "Global Trade Magazine", rating: 5 },
      // Added Reviews
      { text: "Drivers love the new optimized routes.", author: "Gary S., Union Rep", rating: 5 },
      { text: "Package theft reduced by 60% with drone cams.", author: "Security Chief", rating: 5 },
      { text: "Real-time tracking is precise to the meter.", author: "Ops Center", rating: 5 },
      { text: "API docs are clear and easy to implement.", author: "Junior Dev", rating: 5 },
      { text: "Onboarding the whole fleet took 2 days.", author: "Fleet Coordinator", rating: 5 },
      { text: "Saved 15% on vehicle maintenance costs.", author: "Finance Dept", rating: 5 },
      { text: "Drone fleet is fully autonomous now.", author: "Innovation Lead", rating: 5 },
      { text: "No downtime during Black Friday rush.", author: "E-comm Manager", rating: 5 },
      { text: "Predictive maintenance actually works.", author: "Mechanic Lead", rating: 5 },
      { text: "Warehouse efficiency up 20% due to sync.", author: "Logistics Planner", rating: 5 },
    ],
    graphData: [
      { month: 'Q1', value: 10 },
      { month: 'Q2', value: 25 },
      { month: 'Q3', value: 45 },
      { month: 'Q4', value: 80 },
      { month: 'Q1', value: 95 },
      { month: 'Q2', value: 140 },
    ],
    reviewGraphData: [
      { day: 'Mon', score: 98, vol: 45 },
      { day: 'Tue', score: 96, vol: 52 },
      { day: 'Wed', score: 99, vol: 48 },
      { day: 'Thu', score: 97, vol: 61 },
      { day: 'Fri', score: 98, vol: 55 },
      { day: 'Sat', score: 100, vol: 30 },
      { day: 'Sun', score: 99, vol: 25 },
    ],
    color: "#6366f1" // Indigo
  },
  {
    id: 2,
    title: "Quantum Ledger",
    client: "FinTech Corp",
    description: "High-frequency trading bot leveraging sentiment analysis on news streams to execute trades microseconds before market shifts.",
    metrics: {
      cost: "5.1M",
      revenue: "42.0M",
      growth: "+820%",
    },
    reviews: [
      { text: "Zyphora's models predicted the crash 3 days early.", author: "Marcus Ray, Hedge Fund Mgr", rating: 5 },
      { text: "Alpha generation like we've never seen.", author: "Jennifer W., Quant", rating: 5 },
      { text: "Execution speed is virtually zero latency.", author: "Hiroshi T., Tech Lead", rating: 5 },
      { text: "Our risk profile has never been better.", author: "Sarah L., Risk Officer", rating: 5 },
      { text: "Automated hedging saved us millions.", author: "Ben G., Trader", rating: 5 },
      { text: "The sentiment analysis is frighteningly accurate.", author: "Lisa M., Data Scientist", rating: 5 },
      { text: "We are beating the market consistently.", author: "Executive Board", rating: 5 },
      { text: "Installation was seamless on our private cloud.", author: "DevOps Team", rating: 5 },
      { text: "A true competitive advantage.", author: "Investment Weekly", rating: 5 },
      { text: "The dashboard provides insane clarity.", author: "John D., Portfolio Mgr", rating: 5 },
      { text: "Microsecond arbitrage is now reality.", author: "TechCrunch", rating: 5 },
      { text: "Security protocols are top notch.", author: "CISO, FinTech Corp", rating: 5 },
      // Added Reviews
      { text: "Slippage is practically non-existent.", author: "Head Trader", rating: 5 },
      { text: "Backtesting strategies is lightning fast.", author: "Quant Researcher", rating: 5 },
      { text: "Arbitrage opportunities found instantly.", author: "Algo Lead", rating: 5 },
      { text: "Compliance reporting is fully automated.", author: "Legal Dept", rating: 5 },
      { text: "Audit trails are perfect for regulators.", author: "Compliance Officer", rating: 5 },
      { text: "Dashboard is real-time to the millisecond.", author: "UI/UX Team", rating: 5 },
      { text: "Crypto pairings supported out of the box.", author: "Digital Assets VP", rating: 5 },
      { text: "Forex spread reduced significantly.", author: "FX Desk", rating: 5 },
      { text: "Risk management is now automated.", author: "CRO", rating: 5 },
      { text: "Profit margins improved by 12%.", author: "CFO", rating: 5 },
    ],
    graphData: [
      { month: 'Jan', value: 100 },
      { month: 'Feb', value: 120 },
      { month: 'Mar', value: 110 },
      { month: 'Apr', value: 180 },
      { month: 'May', value: 240 },
      { month: 'Jun', value: 380 },
    ],
    reviewGraphData: [
      { day: 'Mon', score: 92, vol: 80 },
      { day: 'Tue', score: 94, vol: 95 },
      { day: 'Wed', score: 91, vol: 88 },
      { day: 'Thu', score: 95, vol: 110 },
      { day: 'Fri', score: 98, vol: 125 },
      { day: 'Sat', score: 96, vol: 60 },
      { day: 'Sun', score: 95, vol: 50 },
    ],
    color: "#ec4899" // Pink
  },
  {
    id: 3,
    title: "Neural Health",
    client: "MediCare Plus",
    description: "Diagnostic imaging assistant that identifies early-stage anomalies in MRI scans with higher accuracy than top radiologists.",
    metrics: {
      cost: "1.8M",
      revenue: "12.2M",
      growth: "+580%",
    },
    reviews: [
      { text: "This technology is literally saving lives daily.", author: "Dr. K. Silva, Chief Surgeon", rating: 5 },
      { text: "It caught a tumor 6 months before a human could.", author: "Dr. House, Diagnostician", rating: 5 },
      { text: "False positives reduced by 85%.", author: "Hospital Admin", rating: 5 },
      { text: "Patients get results in minutes, not days.", author: "Patient Advocacy Group", rating: 5 },
      { text: "Radiologists love the second opinion.", author: "Head of Radiology", rating: 5 },
      { text: "Seamless integration with our PACS.", author: "IT Director", rating: 5 },
      { text: "HIPAA compliance was handled perfectly.", author: "Legal Team", rating: 5 },
      { text: "Cost per scan dropped significantly.", author: "Finance Dept", rating: 5 },
      { text: "The 3D reconstruction feature is magic.", author: "Dr. A. Wong", rating: 5 },
      { text: "Training the model on local data was easy.", author: "Research Lead", rating: 5 },
      { text: "A new standard of care.", author: "Medical Journal", rating: 5 },
      { text: "AI with empathy.", author: "HealthTech Review", rating: 5 },
      // Added Reviews
      { text: "Waiting rooms are empty thanks to speed.", author: "Floor Manager", rating: 5 },
      { text: "Diagnosis is instant and accurate.", author: "ER Doctor", rating: 5 },
      { text: "Doctors can focus on care, not screens.", author: "Chief of Staff", rating: 5 },
      { text: "Telehealth integration works flawlessly.", author: "Remote Care Lead", rating: 5 },
      { text: "Secure data transfer is rock solid.", author: "InfoSec", rating: 5 },
      { text: "Patient trust has increased visibly.", author: "PR Director", rating: 5 },
      { text: "Insurance claims processed faster.", author: "Billing Dept", rating: 5 },
      { text: "MRI analysis is spot on every time.", author: "Lab Tech", rating: 5 },
      { text: "Saved doctors 3 hours per day.", author: "Ops Consultant", rating: 5 },
      { text: "Truly life saving technology.", author: "Recovered Patient", rating: 5 },
    ],
    graphData: [
      { month: 'M1', value: 20 },
      { month: 'M2', value: 22 },
      { month: 'M3', value: 35 },
      { month: 'M4', value: 45 },
      { month: 'M5', value: 60 },
      { month: 'M6', value: 85 },
    ],
    reviewGraphData: [
      { day: 'Mon', score: 99, vol: 15 },
      { day: 'Tue', score: 100, vol: 18 },
      { day: 'Wed', score: 99, vol: 22 },
      { day: 'Thu', score: 100, vol: 20 },
      { day: 'Fri', score: 100, vol: 25 },
      { day: 'Sat', score: 98, vol: 12 },
      { day: 'Sun', score: 99, vol: 10 },
    ],
    color: "#06b6d4" // Cyan
  }
];

// --- Sub-Components ---

const ProjectCard = ({ project, index }: { project: typeof PROJECTS[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  // Dynamic Styles for 3D effect
  const transformStyle = {
    transform: isVisible 
      ? `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg) translateY(0) opacity(1)`
      : `perspective(1000px) rotateY(0) rotateX(10deg) translateY(100px) opacity(0)`,
    transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease-out'
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full min-h-[600px] mb-32 flex flex-col lg:flex-row items-stretch gap-8 transition-all duration-700 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
      style={transformStyle}
    >
      {/* Visual / Graph Side */}
      <div className="flex-1 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black rounded-3xl transform translate-z-[-20px] shadow-2xl border border-white/10" />
        
        {/* Main Revenue Graph Container */}
        <div className="relative h-full min-h-[400px] bg-gray-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 p-6 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <TrendingUp size={20} style={{ color: project.color }} />
                    <span className="text-gray-400 font-mono text-sm">REVENUE_GROWTH_V2</span>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-white border border-white/10 animate-pulse flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    LIVE DATA
                </div>
            </div>

            <div className="flex-1 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={project.graphData}>
                        <defs>
                            <linearGradient id={`grad-${project.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={project.color} stopOpacity={0.6}/>
                                <stop offset="95%" stopColor={project.color} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="month" hide />
                        <YAxis hide />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: project.color }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={project.color} 
                            strokeWidth={3}
                            fill={`url(#grad-${project.id})`} 
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* NEW: Review/Sentiment Graph Card (Top Left) */}
            <div 
                className="absolute top-20 left-6 w-72 h-52 bg-gray-800/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl transition-transform duration-300 transform group-hover:translate-z-20 group-hover:scale-105 p-4 hidden md:block"
                style={{ transform: `translateZ(40px) translateX(${mousePos.x * 30}px)` }}
            >
               <div className="flex justify-between items-center mb-4">
                  <div className="text-xs text-gray-300 font-bold uppercase tracking-wider flex items-center gap-2">
                    <ThumbsUp size={12} className="text-cyan-400" /> Sentiment Analysis
                  </div>
                  <div className="text-sm text-cyan-400 font-bold">99.8% Positive</div>
               </div>
               <div className="h-full w-full pb-6">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={project.reviewGraphData} barSize={20}>
                         <Bar dataKey="vol" radius={[4, 4, 0, 0]}>
                            {project.reviewGraphData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === project.reviewGraphData.length - 1 ? '#22d3ee' : '#4b5563'} />
                            ))}
                         </Bar>
                         <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '10px', padding: '8px' }}
                         />
                      </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Live Review Ticker (Replaces Single Review) */}
            <div 
                className="absolute bottom-6 right-6 w-72 h-48 bg-black/60 backdrop-blur-xl border border-white/10 p-0 rounded-xl shadow-2xl transition-transform duration-300 transform group-hover:translate-z-10 group-hover:scale-105 overflow-hidden"
                style={{ transform: `translateZ(30px) translateX(${mousePos.x * -20}px)` }}
            >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 z-20 backdrop-blur-sm">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-wider">
                      <MessageSquare size={12} className="text-primary-400" />
                      Live Feed
                   </div>
                   <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                      <div className="text-[9px] text-gray-400">REC</div>
                   </div>
                </div>

                {/* Scrolling List */}
                <div className="mt-10 h-full overflow-hidden relative">
                    <div className="animate-scroll-vertical p-4 space-y-4">
                        {[...project.reviews, ...project.reviews].map((review, i) => (
                            <div key={i} className="pb-3 border-b border-white/5 last:border-0">
                                <div className="flex gap-0.5 mb-1.5">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} size={8} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-200 italic mb-1.5 leading-snug">"{review.text}"</p>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-[8px] text-white font-bold">
                                    {review.author.charAt(0)}
                                  </div>
                                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider truncate">{review.author}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Fade Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10"></div>
                </div>
            </div>
        </div>
      </div>

      {/* Content Side */}
      <div className="flex-1 flex flex-col justify-center relative p-4">
        <div 
            className="absolute top-0 right-0 text-[10rem] font-bold text-gray-800/10 dark:text-white/5 leading-none pointer-events-none select-none transition-transform duration-500"
            style={{ transform: `translateX(${mousePos.x * 40}px)` }}
        >
            0{project.id}
        </div>

        <h3 
            className="text-sm font-bold text-primary-500 uppercase tracking-[0.3em] mb-2"
            style={{ color: project.color }}
        >
            {project.client}
        </h3>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {project.title}
        </h2>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
            {project.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl hover:bg-gray-800 transition-colors">
                <div className="text-gray-500 text-xs uppercase mb-1 flex items-center gap-1"><DollarSign size={12}/> Cost</div>
                <div className="text-xl font-bold text-white">${project.metrics.cost}</div>
                <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                    <div className="bg-red-400 h-full w-[30%]"></div>
                </div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl hover:bg-gray-800 transition-colors">
                <div className="text-gray-500 text-xs uppercase mb-1 flex items-center gap-1"><DollarSign size={12}/> Revenue</div>
                <div className="text-xl font-bold text-white">${project.metrics.revenue}</div>
                <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                    <div className="bg-green-400 h-full w-[80%]"></div>
                </div>
            </div>
            <div className="bg-primary-900/20 border border-primary-500/30 p-4 rounded-xl relative overflow-hidden group/stat">
                <div className="absolute inset-0 bg-primary-500/10 animate-pulse"></div>
                <div className="relative z-10">
                    <div className="text-primary-300 text-xs uppercase mb-1 flex items-center gap-1"><Activity size={12}/> Growth</div>
                    <div className="text-xl font-bold text-primary-400 group-hover/stat:scale-110 transition-transform">{project.metrics.growth}</div>
                </div>
            </div>
        </div>

        <button className="group flex items-center gap-3 text-white font-bold hover:text-primary-400 transition-colors w-fit">
            View Case Study
            <span className="bg-white/10 p-2 rounded-full group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                <ArrowUpRight size={16} />
            </span>
        </button>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (e.clientX / innerWidth - 0.5) * 20,
      y: (e.clientY / innerHeight - 0.5) * 20,
    });
  };

  return (
    <section 
      id="portfolio" 
      className="py-32 relative overflow-hidden bg-[#0a0a0a]" 
      onMouseMove={handleMouseMove}
    >
      {/* Styles for the ticker animation */}
      <style>{`
        @keyframes scroll-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical 60s linear infinite;
        }
        .animate-scroll-vertical:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen transition-transform duration-100 ease-out"
          style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] mix-blend-screen transition-transform duration-100 ease-out"
          style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Users size={16} className="text-primary-500" />
            <span>Deployment Archive</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Velocity.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We don't just build models. We engineer market dominance.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
