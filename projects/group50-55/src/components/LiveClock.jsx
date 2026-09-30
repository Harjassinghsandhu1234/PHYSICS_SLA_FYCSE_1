import React, { useState, useEffect } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState({ ghati: 0, pala: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Assume sunrise is at 6:00 AM for the sake of the simulation
      const sunrise = new Date();
      sunrise.setHours(6, 0, 0, 0);
      
      // If it's before 6 AM, calculate since yesterday's sunrise
      if (now < sunrise) {
        sunrise.setDate(sunrise.getDate() - 1);
      }
      
      const diffMs = now - sunrise;
      const diffSeconds = Math.floor(diffMs / 1000);
      
      const totalPalas = Math.floor(diffSeconds / 24);
      const ghati = Math.floor(totalPalas / 60);
      const pala = totalPalas % 60;
      
      setTime({ ghati, pala });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 24000); // Update every Pala (24s)
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: '3rem', padding: '1rem 2rem', border: '1px solid var(--accent-primary)', borderRadius: '30px', background: 'rgba(2, 132, 199, 0.1)', backdropFilter: 'blur(10px)', color: '#fff', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', letterSpacing: '1px' }}>
      It is <strong style={{ color: 'var(--accent-primary)' }}>Ghaṭī {time.ghati}</strong> · <strong style={{ color: 'var(--accent-primary)' }}>Pala {time.pala}</strong> since sunrise
    </div>
  );
}
