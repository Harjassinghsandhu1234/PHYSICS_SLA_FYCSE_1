import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WaterBackground() {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', background: '#0b1636' }}>
      
      {/* Scroll-tracking ripples */}
      <motion.div style={{ width: '100%', height: '200%', y: yOffset, opacity: 0.15, position: 'absolute', top: '-50%' }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ripplePattern" width="220" height="220" patternUnits="userSpaceOnUse">
              <circle cx="110" cy="110" r="1.4" fill="#38bdf8" />
              <circle cx="110" cy="110" r="40" fill="none" stroke="#38bdf8" strokeWidth="1" className="pulse-ring" style={{ animationDelay: '0s' }} />
              <circle cx="110" cy="110" r="80" fill="none" stroke="#38bdf8" strokeWidth="0.5" className="pulse-ring" style={{ animationDelay: '4s' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ripplePattern)" />
        </svg>
      </motion.div>

      {/* Gentle gradient overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,11,30,0) 0%, rgba(6,11,30,0.8) 100%)' }} />
    </div>
  );
}
