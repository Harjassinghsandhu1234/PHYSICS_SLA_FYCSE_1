import React, { useEffect, useRef, useState } from 'react';

export default function RainBackground() {
  const rainRef = useRef(null);
  const [sway, setSway] = useState(0);

  useEffect(() => {
    // Generate rain drops
    const rainContainer = rainRef.current;
    if (!rainContainer) return;

    // Clear existing drops (in case of HMR)
    rainContainer.innerHTML = '';

    const count = 80;
    for (let i = 0; i < count; i++) {
      const drop = document.createElement('div');
      drop.className = 'drop';
      const left = Math.random() * 100;
      const duration = 0.6 + Math.random() * 0.8;
      const delay = Math.random() * 2;
      const height = 40 + Math.random() * 60;
      
      drop.style.left = `${left}vw`;
      drop.style.height = `${height}px`;
      drop.style.animationDuration = `${duration}s`;
      drop.style.animationDelay = `${delay}s`;
      drop.style.opacity = 0.3 + Math.random() * 0.5;
      
      rainContainer.appendChild(drop);
    }
  }, []);

  useEffect(() => {
    // Handle interactive mouse sway
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to center of screen (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      // Sway angle between -15 and 15 degrees based on mouse X
      setSway(x * 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="rain" 
      ref={rainRef} 
      style={{
        '--sway-angle': `${sway}deg`,
        transform: `rotate(${sway}deg) scale(1.5)`,
        transformOrigin: 'top center',
        transition: 'transform 0.2s ease-out'
      }}
    ></div>
  );
}
