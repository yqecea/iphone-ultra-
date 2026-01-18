import React from 'react';

interface SpecsOverlayProps {
  progress: number;
}

export const SpecsOverlay: React.FC<SpecsOverlayProps> = ({ progress }) => {
  // Determine opacity based on progress phases
  const getOpacity = (start: number, end: number) => {
    if (progress >= start && progress <= end) {
      return 1;
    }
    return 0;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-6 md:p-12 mix-blend-difference text-titanium-50">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="font-mono text-xs md:text-sm tracking-widest opacity-60">
          PROJECT ULTRA
          <br />
          MK-X PROTOTYPE
        </div>
        <div className="font-mono text-xs md:text-sm text-right opacity-60">
          <span className="text-ultra">REC</span> {Math.floor(progress * 100)}%
        </div>
      </div>

      {/* Dynamic Specs based on scroll phase */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-6 md:px-24 flex justify-between items-center">
        {/* Phase 1: Core */}
        <div 
          className="transition-opacity duration-500 ease-out transform"
          style={{ 
            opacity: getOpacity(0.1, 0.25),
            transform: `translateY(${(0.2 - progress) * 100}px)` 
          }}
        >
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter">
            A18 <span className="text-transparent bg-clip-text bg-gradient-to-r from-titanium-100 to-titanium-500">BIONIC</span>
          </h2>
          <p className="font-mono text-sm mt-2 text-titanium-400 border-l-2 border-ultra pl-4">
            3nm ARCHITECTURE<br/>
            35 TRILLION OPS/SEC
          </p>
        </div>

        {/* Phase 2: Material */}
        <div 
          className="transition-opacity duration-500 ease-out absolute right-6 md:right-24 text-right"
          style={{ 
            opacity: getOpacity(0.3, 0.55),
            transform: `translateY(${(0.45 - progress) * 100}px)` 
          }}
        >
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter">
            GRADE 5
            <br />
            TITANIUM
          </h2>
          <p className="font-mono text-sm mt-2 text-titanium-400 border-r-2 border-titanium-100 pr-4 inline-block">
            AEROSPACE ALLOY<br/>
            BRUSHED FINISH
          </p>
        </div>

        {/* Phase 3: Optics */}
        <div 
          className="transition-opacity duration-500 ease-out absolute left-6 md:left-24 text-left"
          style={{ 
            opacity: getOpacity(0.6, 0.8),
            transform: `translateY(${(0.7 - progress) * 100}px)` 
          }}
        >
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter">
            TETRAPRISM
            <br />
            <span className="text-ultra">OPTICS</span>
          </h2>
          <p className="font-mono text-sm mt-2 text-titanium-400">
            ƒ/1.2 APERTURE<br/>
            120mm EQUIVALENT
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end">
        <div className="font-mono text-[10px] opacity-40 max-w-[200px]">
          SYSTEM STATUS: NOMINAL
          <br />
          THERMAL REGULATION: ACTIVE
          <br />
          BATTERY: 100%
        </div>
        <div className="hidden md:block">
           <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-50 animate-spin-slow">
             <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 4" />
           </svg>
        </div>
      </div>
    </div>
  );
};
