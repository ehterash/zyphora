import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Features from './components/Features';
import Mission from './components/Mission';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import Scene from './components/Scene';

const App: React.FC = () => {
  // Theme initialization
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true; // Default to dark for futuristic feel
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen font-sans selection:bg-primary-500 selection:text-white relative">
      {/* 3D Scene Layer (Fixed Background) */}
      <Scene />

      {/* Global Grain Overlay for Cinematic Feel */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.03] bg-noise"></div>
      
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      {/* Main content z-index needs to be relative to sit on top of canvas if needed, 
          but canvas is z-0 and fixed. We ensure content has transparency where needed. */}
      <main className="relative z-10">
        <Hero />
        <WhyUs />
        <Mission />
        <Features />
        <Portfolio />
        <Pricing />
        <About />
        <Contact />
      </main>

      <ChatWidget />
    </div>
  );
};

export default App;
