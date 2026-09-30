import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Simulation2D() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [sunk, setSunk] = useState(false);

  useEffect(() => {
    let animationFrame;
    let lastTime = performance.now();

    const animate = (time) => {
      if (isPlaying && !sunk) {
        const deltaTime = time - lastTime;
        setProgress((prev) => {
          const next = prev + (deltaTime * 0.005); // Adjust speed here
          if (next >= 100) {
            setSunk(true);
            setIsPlaying(false);
            return 100;
          }
          return next;
        });
      }
      lastTime = time;
      animationFrame = requestAnimationFrame(animate);
    };

    if (isPlaying && !sunk) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, sunk]);

  const handleToggle = () => {
    if (!sunk) setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setSunk(false);
  };


  // Math for the sinking bowl
  // The bowl is a hemisphere of radius 80.
  // Math for the sinking bowl
  // The bowl is a hemisphere of radius 80.
  // Bowl top edge Y starts at 100. Water level in basin is 120.
  // We'll sink it down to Y=200 over the course of filling.
  const bowlY = sunk ? 300 : 100 + (progress * 1.0); 
  const waterInsideHeight = (progress / 100) * 75; // fills up to 75px deep
  
  // Calculate width of the flat water surface inside the bowl at current height
  const dh = 80 - waterInsideHeight; // distance from center of sphere
  const dx = Math.sqrt(Math.max(0, 80 * 80 - dh * dh));

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#0f172a' }}>
      
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '500px', aspectRatio: '1/1' }}>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          
          {/* Main Basin Container */}
          <path d="M 50,50 L 50,350 A 20,20 0 0,0 70,370 L 330,370 A 20,20 0 0,0 350,350 L 350,50" fill="none" stroke="#475569" strokeWidth="4" />
          
          {/* Main Basin Water */}
          <path d="M 52,120 L 348,120 L 348,350 A 18,18 0 0,1 330,368 L 70,368 A 18,18 0 0,1 52,350 Z" fill="rgba(14, 165, 233, 0.2)" />
          
          {/* Surface Line */}
          <line x1="52" y1="120" x2="348" y2="120" stroke="rgba(14, 165, 233, 0.5)" strokeWidth="2" strokeDasharray="4 2" />

          {/* The Sinking Bowl Group */}
          <g transform={`translate(0, ${bowlY - 100})`} style={{ transition: sunk ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none' }}>
            
            {/* Bowl Body */}
            <path d="M 120,100 A 80,80 0 0,0 280,100 Z" fill="rgba(30, 41, 59, 0.9)" stroke="#fbbf24" strokeWidth="3" />
            
            {/* Water Inside Bowl */}
            {progress > 0 && dx > 0 && (
              <path d={`M ${200 - dx},${180 - waterInsideHeight} A 80,80 0 0,0 ${200 + dx},${180 - waterInsideHeight} Z`} fill="rgba(14, 165, 233, 0.6)" />
            )}
            
            <line x1="130" y1="180" x2="270" y2="180" stroke="rgba(14,165,233,0.3)" strokeWidth="1" /> {/* bottom edge approximation */}

            {/* Inflow hole at bottom */}
            <circle cx="200" cy="180" r="3" fill="#0f172a" />
            
            {/* Bubbles / Flow coming in from bottom */}
            {isPlaying && !sunk && (
              <g className="flow-up">
                <circle cx="200" cy="175" r="1.5" fill="#38bdf8" opacity="0.6" />
                <circle cx="196" cy="165" r="1" fill="#38bdf8" opacity="0.4" />
                <circle cx="203" cy="155" r="2" fill="#38bdf8" opacity="0.5" />
              </g>
            )}
          </g>

          <style>{`
            .flow-up {
              animation: flowUp 1s linear infinite;
            }
            @keyframes flowUp {
              0% { transform: translateY(0); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: translateY(-20px); opacity: 0; }
            }
          `}</style>
        </svg>

        {/* Status Overlay Ping */}
        <AnimatePresence>
          {sunk && (
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 1.5, opacity: 0 }}
              style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fbbf24', textAlign: 'center', pointerEvents: 'none' }}
            >
              <Bell size={48} className="ring-bell" style={{ margin: '0 auto', filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.8))' }} />
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', marginTop: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>Ghaṭī Complete</h3>
              <style>{`
                .ring-bell { animation: ring 0.5s ease-in-out 3; transform-origin: top center; }
                @keyframes ring { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-15deg); } 75% { transform: rotate(15deg); } }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Controls Overlay */}
      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '1rem', background: 'rgba(15,23,42,0.8)', padding: '1rem', borderRadius: '12px', backdropFilter: 'blur(10px)', zIndex: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={handleToggle} disabled={sunk} className={isPlaying && !sunk ? '' : (sunk ? '' : 'primary')} style={{ width: '100px', justifyContent: 'center', opacity: sunk ? 0.5 : 1 }}>
          {isPlaying ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Play</>}
        </button>
        <button onClick={handleReset} className={sunk ? 'primary' : ''} style={{ width: '100px', justifyContent: 'center' }}>
          <RotateCcw size={18} /> Reset
        </button>
        <div style={{ color: '#0ea5e9', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Cinzel', serif", fontVariantNumeric: 'tabular-nums', width: '220px', fontSize: '1.2rem', letterSpacing: '1px' }}>
          Ghaṭī {sunk ? 1 : 0} <span style={{ opacity: 0.5, margin: '0 8px' }}>·</span> Pala {sunk ? '00' : Math.floor((progress / 100) * 60).toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
