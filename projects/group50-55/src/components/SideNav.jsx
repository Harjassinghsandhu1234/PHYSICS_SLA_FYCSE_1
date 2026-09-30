import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'hero', label: '00 Introduction', accent: '#ffffff' },
  { id: 'origins', label: '01 Origins', accent: '#38bdf8' },
  { id: 'practice', label: '02 In Practice', accent: '#fbbf24' },
  { id: 'simulations', label: '03 Simulations', accent: '#0ea5e9' },
  { id: 'astronomy', label: '04 Astronomy', accent: '#a855f7' },
  { id: 'ayurveda', label: '05 Medicine', accent: '#f97316' },
  { id: 'legacy', label: '06 Legacy', accent: '#14b8a6' }
];

export default function SideNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
          window.history.replaceState(null, '', `#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav style={{ position: 'fixed', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
      {navItems.map((item) => (
        <a 
          key={item.id} 
          href={`#${item.id}`} 
          onClick={() => setActive(item.id)}
          style={{
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontFamily: "'Cinzel', serif",
            color: active === item.id ? item.accent : 'var(--text-secondary)',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ opacity: active === item.id ? 1 : 0, transition: 'opacity 0.2s' }}>{item.label}</span>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: active === item.id ? item.accent : 'rgba(255,255,255,0.2)' }} />
        </a>
      ))}
    </nav>
  );
}
