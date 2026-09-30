import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Simulation2D from './Simulation2D';
import Simulation3D from './Simulation3D';
import { Layers, Box } from 'lucide-react';

export default function Simulations() {
  const [view, setView] = useState('2d'); // '2d' or '3d'
  const accent = "#0ea5e9";

  return (
    <section id="simulations" className="asymmetric-grid reverse" style={{ position: 'relative' }}>
      <div className="section-watermark" style={{ '--watermark-color': accent }}>03</div>
      
      {/* Simulation Area */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.1), rgba(11,22,54,1) 80%)', border: `1px solid ${accent}` }}>
        {view === '2d' ? <Simulation2D /> : <Simulation3D />}
      </div>

      {/* Caption Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div style={{ fontFamily: "'Cinzel', serif", fontStyle: 'italic', color: accent, fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '4rem', fontStyle: 'normal', lineHeight: 1 }}>03</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontStyle: 'normal' }}>— Visualization</span>
        </div>
        <h2 style={{ fontSize: '3rem', color: '#fff', margin: '0 0 1rem 0', fontFamily: "'Cinzel Decorative', serif" }}>
          Clepsydra Mechanics
        </h2>
        <p className="body-standard">
          Observe the fixed-rate inflow and precise sinking mechanism. Toggle between the structural 2D cross-section and the fully rendered 3D historical model.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={() => setView('2d')} style={{ background: view === '2d' ? accent : 'transparent', borderColor: accent, color: view === '2d' ? '#fff' : accent }}>
            <Layers size={18} /> 2D Blueprint
          </button>
          <button onClick={() => setView('3d')} style={{ background: view === '3d' ? accent : 'transparent', borderColor: accent, color: view === '3d' ? '#fff' : accent }}>
            <Box size={18} /> 3D Model
          </button>
        </div>
      </motion.div>

    </section>
  );
}
