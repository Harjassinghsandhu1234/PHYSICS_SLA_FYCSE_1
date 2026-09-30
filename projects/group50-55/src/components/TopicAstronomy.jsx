import React from 'react';

export default function TopicAstronomy() {
  const accent = "#a855f7";

  return (
    <div className="asymmetric-grid reverse" style={{ position: 'relative' }}>
      <div className="section-watermark" style={{ '--watermark-color': accent }}>04</div>
      
      <div style={{ position: 'relative' }}>
        <div style={{ 
          width: '100%', aspectRatio: '1/1', borderRadius: '50%', 
          border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', 
          background: `radial-gradient(circle at 68% 32%, rgba(168, 85, 247, 0.1), rgba(15,23,42,0.6) 68%, rgba(15,23,42,1) 100%)`,
          padding: '2rem' 
        }}>
          <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            
            {/* Background Grid Lines */}
            <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
              <line x1="110" y1="20" x2="110" y2="200" />
              <line x1="20" y1="110" x2="200" y2="110" />
            </g>

            {/* Sun */}
            <circle cx="110" cy="110" r="10" fill={accent} opacity="0.9" className="flicker" />
            
            {/* Static Orbit Paths */}
            {/* 1. Mercury (rx=25, ry=15) */}
            <path id="mercuryOrbit" d="M 135,110 A 25,15 0 1,1 85,110 A 25,15 0 1,1 135,110" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="1 3" opacity="0.4" />
            {/* 2. Venus (rx=45, ry=35) */}
            <path id="venusOrbit" d="M 155,110 A 45,35 0 1,1 65,110 A 45,35 0 1,1 155,110" fill="none" stroke={accent} strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
            {/* 3. Earth (rx=65, ry=55) */}
            <path id="earthOrbit" d="M 175,110 A 65,55 0 1,1 45,110 A 65,55 0 1,1 175,110" fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
            {/* 4. Mars (rx=95, ry=85) */}
            <path id="marsOrbit" d="M 110,25 A 95,85 0 1,1 110,195 A 95,85 0 1,1 110,25" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3" />

            {/* 1. Mercury */}
            <circle r="2" fill="#e2e8f0">
              <animateMotion dur="2.4s" repeatCount="indefinite">
                <mpath href="#mercuryOrbit" />
              </animateMotion>
            </circle>

            {/* 2. Venus */}
            <circle r="3" fill="#e2e8f0" opacity="0.8">
              <animateMotion dur="6.1s" repeatCount="indefinite">
                <mpath href="#venusOrbit" />
              </animateMotion>
            </circle>

            {/* 3. Earth & Moon System */}
            <g>
              <animateMotion dur="10s" repeatCount="indefinite">
                <mpath href="#earthOrbit" />
              </animateMotion>
              
              <circle r="4" fill="#38bdf8" />
              
              {/* Moon Orbit Path (relative to Earth at 0,0) */}
              <path id="moonOrbit" d="M 12,0 A 12,12 0 1,1 -12,0 A 12,12 0 1,1 12,0" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.4" />
              
              {/* Moon */}
              <circle r="1.5" fill={accent}>
                <animateMotion dur="0.75s" repeatCount="indefinite">
                  <mpath href="#moonOrbit" />
                </animateMotion>
              </circle>
            </g>

            {/* 4. Mars */}
            <circle r="3.5" fill="#f97316" opacity="0.7">
              <animateMotion dur="18.8s" repeatCount="indefinite">
                <mpath href="#marsOrbit" />
              </animateMotion>
            </circle>

            <text x="110" y="212" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize="13" fill="var(--text-secondary)">eclipses · planetary positions · muhūrtas</text>
          </svg>
        </div>
      </div>

      <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontStyle: 'italic', color: accent, fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '4rem', fontStyle: 'normal', lineHeight: 1 }}>04</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontStyle: 'normal' }}>— In Astronomy</span>
        </div>
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#fff', fontFamily: "'Cinzel', serif", lineHeight: 1.2 }}>
          The scientist's clock
        </h2>
        <p className="body-standard" style={{ marginBottom: '1.5rem' }}>
          Beyond daily rituals, the ghaṭī yantra was the primary timekeeping instrument for Hindu astronomy (Jyotiṣa). Treatises like the <strong style={{color:'#fff'}}>Sūrya Siddhānta</strong> relied on it to calculate planetary positions and cast horoscopes.
        </p>
        <p className="body-standard">
          Because it ran continuously regardless of weather or sunlight—unlike a sundial—it was critical for timing eclipses, predicting solstices, and determining auspicious moments (<strong style={{color:'#fff'}}>muhūrtas</strong>) for state events. <sup><a href="#sources" style={{color:accent, textDecoration:'none'}}>[5]</a></sup>
        </p>
      </div>

    </div>
  );
}
