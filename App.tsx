import React, { useState, useEffect } from 'react';
import { PhoneConstruct } from './components/PhoneConstruct';
import { SpecsOverlay } from './components/SpecsOverlay';

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);

  // Custom cursor logic
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="min-h-screen bg-titanium-950 text-titanium-50 selection:bg-ultra selection:text-white cursor-none">
      
      {/* Custom Cursor */}
      <div 
        id="custom-cursor" 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      >
        <div className="w-full h-full rounded-full border border-titanium-50 opacity-50 flex items-center justify-center">
          <div className="w-1 h-1 bg-ultra rounded-full" />
        </div>
      </div>

      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-40 mix-blend-difference">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.07-3.14-1.04.05-2.29.69-3.02 1.55-.65.75-1.21 1.95-1.06 3.1 1.15.09 2.33-.64 3.01-1.51" />
          </svg>
          <span className="font-display font-bold text-xl tracking-tight">Ultra</span>
        </div>
        <button className="hidden md:flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-colors font-mono text-xs uppercase tracking-wider">
          <span>Pre-Order</span>
          <span className="w-1.5 h-1.5 bg-ultra rounded-full animate-pulse" />
        </button>
      </nav>

      <main>
        {/* Intro Section - Just for initial impact */}
        <section className="h-screen flex flex-col items-center justify-center relative z-10 pointer-events-none">
          <h1 className="font-display text-[12vw] md:text-[8vw] font-bold leading-none tracking-tighter text-center opacity-10">
            TITANIUM
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <p className="font-mono text-xs md:text-sm text-titanium-400 animate-bounce mt-96">
                SCROLL TO FORGE
             </p>
          </div>
        </section>

        {/* The Construct - Sticky Section */}
        <div className="relative z-20">
          <SpecsOverlay progress={progress} />
          <PhoneConstruct setProgress={setProgress} />
        </div>

        {/* Footer / CTA */}
        <section className="h-screen bg-titanium-950 flex flex-col items-center justify-center relative z-30">
          <div className="text-center space-y-8 px-6">
            <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-titanium-600">
              The Future <br/> Is Formed.
            </h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 bg-ultra text-white rounded-full font-display font-bold text-lg overflow-hidden transition-transform hover:scale-105">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">Buy iPhone Ultra</span>
              </button>
              <button className="px-8 py-4 text-titanium-400 hover:text-white transition-colors font-mono text-sm underline decoration-titanium-700 underline-offset-4">
                View Technical Specifications
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-12 text-titanium-700 font-mono text-[10px] uppercase tracking-widest">
            Designed in California. Assembled in the Void.
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
