import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PhoneConstruct: React.FC<{ setProgress: (n: number) => void }> = ({ setProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // Refs for layers
  const chassisRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const batteryRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=5000", // Long scroll for detailed control
          scrub: 1, // Smooth scrubbing
          pin: true,
          onUpdate: (self) => setProgress(self.progress),
        }
      });

      // INITIAL STATE: Exploded View
      // We set initial transforms here or in CSS, but GSAP is safer
      gsap.set([chassisRef.current, chipRef.current, batteryRef.current, glassRef.current, screenRef.current], {
        opacity: 0,
        scale: 0.8,
      });

      // ANIMATION SEQUENCE

      // 1. REVEAL THE COMPONENTS (0% - 15%)
      // Layers fly in from Z-space (simulated with scale and y)
      tl.to([chassisRef.current, batteryRef.current, chipRef.current, screenRef.current, glassRef.current], {
        opacity: 1,
        scale: 1,
        duration: 2,
        stagger: 0.2,
        ease: "power2.out"
      })
      
      // 2. EXPAND LAYERS VERTICALLY (Exploded View) (15% - 30%)
      // Move layers apart to inspect them
      .to(chassisRef.current, { y: 150, rotateX: 20, scale: 0.95 }, "<")
      .to(batteryRef.current, { y: 80, rotateX: 20, scale: 0.95 }, "<")
      .to(chipRef.current, { y: 0, rotateX: 20, scale: 1.05, zIndex: 50 }, "<") // Highlight chip
      .to(screenRef.current, { y: -80, rotateX: 20, scale: 0.95 }, "<")
      .to(glassRef.current, { y: -160, rotateX: 20, scale: 0.95 }, "<")
      
      // 3. FOCUS ON CHIP (30% - 45%)
      // Subtle pulse on the chip
      .to(chipRef.current, { 
        boxShadow: "0 0 50px rgba(255, 59, 0, 0.4)",
        borderColor: "#FF3B00",
        duration: 2 
      })

      // 4. COMPRESS (The Forge) (45% - 70%)
      // Snap everything together into the chassis
      .to([chassisRef.current, batteryRef.current, chipRef.current, screenRef.current, glassRef.current], {
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 4,
        ease: "expo.inOut",
        stagger: 0.1
      })
      .to(chipRef.current, { boxShadow: "none", borderColor: "rgba(255,255,255,0.1)", duration: 1 }, "<")

      // 5. BOOT UP (70% - 85%)
      // Screen turns on, Lens rotates
      .to(screenRef.current, { backgroundColor: "#000", duration: 1 })
      .to(".screen-content", { opacity: 1, duration: 1 })
      .to(lensRef.current, { rotate: 360, duration: 5, ease: "power1.inOut" }, "<")

      // 6. FINAL PRESENTATION (85% - 100%)
      // Slight rotation of the unified device
      .to(containerRef.current, { rotateY: 10, scale: 1.1, duration: 3 })

    }, triggerRef);

    return () => ctx.revert();
  }, [setProgress]);

  // SVG PATTERNS
  const ChipSVG = () => (
    <svg width="100%" height="100%" viewBox="0 0 200 200" className="absolute inset-0 opacity-80">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-titanium-600"/>
        </pattern>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FF3B00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF3B00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect x="80" y="80" width="40" height="40" fill="url(#glow)" />
      <path d="M60,60 L140,60 L140,140 L60,140 Z" fill="none" stroke="#FF3B00" strokeWidth="1" />
      <circle cx="100" cy="100" r="15" fill="#FF3B00" className="animate-pulse" />
      <path d="M100 20 V50 M100 150 V180 M20 100 H50 M150 100 H180" stroke="currentColor" className="text-titanium-500" strokeWidth="2" />
    </svg>
  );

  return (
    <div ref={triggerRef} className="relative w-full h-screen bg-titanium-950 overflow-hidden flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-titanium-900 via-titanium-950 to-black opacity-80" />
      
      {/* 3D Container */}
      <div 
        ref={containerRef}
        className="relative w-[300px] h-[600px] md:w-[360px] md:h-[720px] perspective-1000"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* LAYER 1: TITANIUM CHASSIS (Bottom) */}
        <div 
          ref={chassisRef}
          className="absolute inset-0 rounded-[48px] border-[6px] border-titanium-600 bg-titanium-900 shadow-2xl overflow-hidden z-10"
          style={{ transformOrigin: 'center center' }}
        >
          {/* Brushed Metal Texture */}
          <div className="absolute inset-0 opacity-30 bg-metal-gradient" />
          <div className="absolute inset-0 metal-sheen opacity-20" />
          {/* Internal Skeleton */}
          <div className="absolute inset-4 border border-titanium-700 rounded-[32px] opacity-50" />
        </div>

        {/* LAYER 2: BATTERY / MAGSAFE (Middle-Bottom) */}
        <div 
          ref={batteryRef}
          className="absolute inset-0 rounded-[48px] flex items-center justify-center z-20"
        >
          <div className="w-[80%] h-[60%] bg-titanium-800 rounded-2xl border border-titanium-700 flex items-center justify-center relative shadow-xl">
             <div className="absolute inset-0 bg-gradient-to-br from-titanium-800 to-black rounded-2xl" />
             {/* MagSafe Ring */}
             <div className="w-32 h-32 rounded-full border-[8px] border-titanium-700 opacity-40 relative">
               <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-4 h-12 bg-titanium-700 rounded-full" />
             </div>
             <span className="absolute bottom-4 font-mono text-[10px] text-titanium-500 tracking-widest">Li-ION HIGH DENSITY</span>
          </div>
        </div>

        {/* LAYER 3: LOGIC BOARD (Middle - The Hero) */}
        <div 
          ref={chipRef}
          className="absolute inset-0 rounded-[48px] z-30 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[85%] h-[85%] bg-titanium-900/80 backdrop-blur-sm border border-titanium-600 rounded-[36px] overflow-hidden relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <ChipSVG />
          </div>
        </div>

        {/* LAYER 4: OLED PANEL (Middle-Top) */}
        <div 
          ref={screenRef}
          className="absolute inset-0 rounded-[48px] z-40 bg-black overflow-hidden border border-titanium-800 shadow-lg flex flex-col"
        >
           {/* Screen Content (Initially Hidden) */}
           <div className="screen-content opacity-0 w-full h-full relative">
              {/* Wallpaper */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/40 via-black to-titanium-900/40" />
              
              {/* UI Elements */}
              <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start pt-14 text-white">
                 <div className="font-display font-bold text-6xl leading-none tracking-tighter mix-blend-overlay">
                   12<br/>45
                 </div>
                 <div className="font-mono text-xs opacity-60">
                    SUN 24<br/>24°C
                 </div>
              </div>
              
              <div className="absolute bottom-8 w-full flex justify-center gap-6 opacity-60">
                 <div className="w-12 h-12 rounded-full bg-titanium-800/50 backdrop-blur" />
                 <div className="w-12 h-12 rounded-full bg-titanium-800/50 backdrop-blur" />
                 <div className="w-12 h-12 rounded-full bg-titanium-800/50 backdrop-blur" />
                 <div className="w-12 h-12 rounded-full bg-titanium-800/50 backdrop-blur" />
              </div>
           </div>
        </div>

        {/* LAYER 5: CERAMIC SHIELD GLASS (Top) */}
        <div 
          ref={glassRef}
          className="absolute inset-0 rounded-[48px] z-50 border-[2px] border-white/10 bg-glass-gradient shadow-2xl backdrop-blur-[1px]"
        >
          {/* Dynamic Island */}
          <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full shadow-lg z-50 flex items-center justify-center overflow-hidden transition-all duration-300">
             <div className="w-2 h-2 rounded-full bg-green-500/0" /> {/* Hidden indicator */}
             {/* FaceID Emitters */}
             <div className="absolute right-3 w-3 h-3 rounded-full bg-titanium-800 opacity-50" />
          </div>

          {/* Reflections */}
          <div className="absolute top-0 right-0 w-full h-[60%] bg-gradient-to-bl from-white/20 to-transparent rounded-tr-[48px] opacity-30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-tr from-white/10 to-transparent rounded-bl-[48px] opacity-20 pointer-events-none" />
        </div>
        
        {/* Camera Bump (Attached to Chassis but floats) */}
        <div className="absolute top-12 right-6 w-24 h-52 bg-transparent z-50 pointer-events-none transform translate-x-10 opacity-0" id="camera-system">
           {/* This would be animated separately if we had time, keeping it simple inside layers for now */}
        </div>

        {/* Floating Lens Elements (Visual Flair) */}
        <div 
          ref={lensRef}
          className="absolute top-12 left-8 w-32 h-32 z-[60] opacity-0 mix-blend-screen pointer-events-none"
        >
           <svg viewBox="0 0 100 100" className="w-full h-full text-white/20">
             <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 2" />
             <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
             <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
           </svg>
        </div>

      </div>
    </div>
  );
};
