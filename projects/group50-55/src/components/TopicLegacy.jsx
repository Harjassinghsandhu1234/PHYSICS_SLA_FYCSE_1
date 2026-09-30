import React from 'react';

export default function TopicLegacy() {
  const accent = "#14b8a6";
  
  // Generate dial ticks
  const ticks = Array.from({ length: 60 }).map((_, i) => {
    const angle = (i * 6) * (Math.PI / 180); // 60 ticks = 360/60 = 6 degrees
    const isMajor = i % 5 === 0;
    const r1 = isMajor ? 82 : 78;
    const r2 = 90;
    const x1 = 110 + r1 * Math.cos(angle);
    const y1 = 110 + r1 * Math.sin(angle);
    const x2 = 110 + r2 * Math.cos(angle);
    const y2 = 110 + r2 * Math.sin(angle);
    return (
      <line 
        key={i} x1={x1} y1={y1} x2={x2} y2={y2} 
        stroke={isMajor ? accent : '#e2e8f0'} 
        strokeWidth={isMajor ? 1.5 : 0.5} 
        opacity={isMajor ? 0.9 : 0.4} 
      />
    );
  });

  return (
    <div className="asymmetric-grid reverse" style={{ position: 'relative' }}>
      <div className="section-watermark" style={{ '--watermark-color': accent }}>06</div>
      
      <div style={{ position: 'relative' }}>
        <div style={{ 
          width: '100%', aspectRatio: '1/1', borderRadius: '50%', 
          border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', 
          background: `radial-gradient(circle at 32% 28%, rgba(20, 184, 166, 0.1), rgba(15,23,42,0.6) 68%, rgba(15,23,42,1) 100%)`,
          padding: '2rem' 
        }}>
          <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            
            {/* Outer Dial & Ticks */}
            <circle cx="110" cy="110" r="92" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3"/>
            {ticks}

            {/* Inner Ring */}
            <circle cx="110" cy="110" r="60" fill="none" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.5"/>

            {/* Hands: Ghati (hours equivalent), Pala (minutes equivalent), Vipala (seconds equivalent) */}
            
            {/* Ghati Hand (Slowest, 1 rotation = 60 ghatis = 24 hours = 86400s) */}
            <g className="orbit" style={{ animationDuration: '86400s' }}>
              <circle cx="110" cy="110" r="110" fill="transparent" />
              <line x1="110" y1="110" x2="110" y2="65" stroke={accent} strokeWidth="3" strokeLinecap="round"/>
              <polygon points="107,65 113,65 110,55" fill={accent} />
            </g>

            {/* Pala Hand (Medium, 1 rotation = 60 palas = 1 ghati = 24 minutes = 1440s) */}
            <g className="orbit" style={{ animationDuration: '1440s' }}>
              <circle cx="110" cy="110" r="110" fill="transparent" />
              <line x1="110" y1="110" x2="150" y2="128" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
            </g>

            {/* Vipala Hand (Fastest, 1 rotation = 60 vipalas = 1 pala = 24 seconds) */}
            <g className="orbit" style={{ animationDuration: '24s' }}>
              <circle cx="110" cy="110" r="110" fill="transparent" />
              <line x1="110" y1="110" x2="70" y2="160" stroke="#f97316" strokeWidth="1" strokeLinecap="round"/>
              {/* Counterweight */}
              <line x1="110" y1="110" x2="118" y2="100" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
            </g>

            {/* Center Pin */}
            <circle cx="110" cy="110" r="4" fill="#e2e8f0"/>
            <circle cx="110" cy="110" r="2" fill="#0f172a"/>
            
            <text x="110" y="212" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize="13" fill="var(--text-secondary)">ghaṭī : pala : vipala</text>
          </svg>
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "'Cinzel', serif", fontStyle: 'italic', color: accent, fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '4rem', fontStyle: 'normal', lineHeight: 1 }}>06</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontStyle: 'normal' }}>— Legacy Today</span>
        </div>
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#fff', fontFamily: "'Cinzel', serif", lineHeight: 1.2 }}>
          A quiet campaign to bring the ghaṭī back
        </h2>
        <div className="body-standard">
          <p style={{ marginBottom: '1.5rem' }}>The 24-hour clock in daily use today is, by one account, a historical accident: the Egyptians' <strong style={{color:'#fff'}}>duodecimal</strong>, base-12 hours stitched to the Babylonians' <strong style={{color:'#fff'}}>sexagesimal</strong> minutes and seconds, then frozen to reset at an arbitrary midnight rather than sunrise.</p>
          <p style={{ marginBottom: '1.5rem' }}>Sankul's <strong style={{color:'#fff'}}>"Bharat Clock" project</strong> argues for reviving the 60-ghaṭī sunrise clock instead. Each ghaṭī, at 24 minutes, is pitched as a more natural unit for structuring a day's tasks than an hour.</p>
          <p style={{ marginBottom: '1.5rem' }}>The project has gone as far as sketching working analog dial concepts, with separate <strong style={{color:'#fff'}}>ghaṭī, pala, and vipala</strong> hands, and redesigning the gear ratios a quartz movement would need to drive them.</p>
        </div>
      </div>

    </div>
  );
}
