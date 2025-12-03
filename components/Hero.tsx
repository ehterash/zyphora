import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-500/20 dark:bg-primary-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-500/30 text-primary-600 dark:text-primary-300 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              v2.0 is now live
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500 dark:from-primary-400 dark:to-indigo-300">
                Digital Intelligence
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
              Zyphora delivers the world's most advanced AI infrastructure. 
              Scale effortlessly from prototype to planet-scale with zero friction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-primary-500/20">
                Start Building
                <ArrowRight size={20} />
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-white/20 transition-colors backdrop-blur-sm">
                <Play size={18} className="fill-current" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Visual/Illustration */}
          <div className="relative h-[500px] hidden lg:block perspective-1000">
             {/* Floating elements composed to look like a futuristic dashboard */}
             <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-50 dark:from-white/5 dark:to-white/5 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-xl shadow-2xl animate-float">
                {/* Mock UI Elements */}
                <div className="p-6 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="h-2 w-32 bg-gray-200 dark:bg-white/10 rounded-full"></div>
                </div>
                <div className="p-8 space-y-6">
                   <div className="flex gap-4">
                      <div className="w-1/3 h-32 bg-primary-100 dark:bg-primary-500/20 rounded-xl animate-pulse"></div>
                      <div className="w-2/3 h-32 bg-gray-100 dark:bg-white/5 rounded-xl border border-dashed border-gray-300 dark:border-white/20"></div>
                   </div>
                   <div className="h-4 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 w-[65%] rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                      </div>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-20 bg-gray-50 dark:bg-white/5 rounded-lg"></div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Floating Badge */}
             <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-white/10 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                   </div>
                   <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">System Optimal</div>
                      <div className="text-xs text-gray-500">All systems operational</div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;