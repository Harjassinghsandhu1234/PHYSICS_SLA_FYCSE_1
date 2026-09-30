import React from 'react';

export default function TopicOrigins() {
  return (
    <div className="asymmetric-grid" style={{ position: 'relative' }}>
      <div className="section-watermark" style={{ '--watermark-color': 'var(--accent-primary)' }}>01</div>
      
      <div style={{ position: 'relative' }}>
        <div style={{ 
          width: '100%', aspectRatio: '1/1', borderRadius: '50%', 
          border: '1px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          background: 'radial-gradient(circle at 32% 28%, rgba(2,132,199,0.1), rgba(15,23,42,0.6) 68%, rgba(15,23,42,1) 100%)',
          padding: '2rem' 
        }}>
          <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <ellipse cx="110" cy="150" rx="78" ry="26" fill="none" stroke="var(--accent-primary)" strokeWidth="1.4"/>
            <path d="M52 150 A58 34 0 0 0 168 150" fill="none" stroke="var(--accent-primary)" strokeWidth="1.8"/>
            <g className="bob">
              <path d="M68 150 A42 24 0 0 0 152 150" fill="rgba(2,132,199,0.15)" stroke="var(--accent-primary)" strokeWidth="1.2"/>
              <circle cx="110" cy="150" r="2.6" fill="#e2e8f0"/>
              <line x1="110" y1="152" x2="110" y2="170" stroke="#e2e8f0" strokeWidth="1.2" className="drip"/>
              <ellipse cx="110" cy="116" rx="58" ry="17" fill="none" stroke="var(--accent-primary)" strokeWidth="1.4"/>
            </g>
            <text x="110" y="60" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize="15" fill="var(--accent-primary)">ghaṭī = 24 min</text>
            <text x="110" y="80" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize="15" fill="var(--accent-primary)">yantra = instrument</text>
          </svg>
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "'Cinzel', serif", fontStyle: 'italic', color: 'var(--accent-primary)', fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '4rem', fontStyle: 'normal', lineHeight: 1 }}>01</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontStyle: 'normal' }}>— Origins & Construction</span>
        </div>
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#fff', fontFamily: "'Cinzel', serif", lineHeight: 1.2 }}>
          What the Ghaṭī Yantra is, and how it was built
        </h2>
        <div className="body-standard">
          <p style={{ marginBottom: '1.5rem' }}>The name comes from two Sanskrit words: <strong style={{color:'#fff'}}>ghaṭī</strong>, a unit of time equal to twenty-four minutes, and <strong style={{color:'#fff'}}>yantra</strong>, meaning instrument. Together they describe a device built to divide the day into equal, measurable parts using nothing but water.</p>
          <p style={{ marginBottom: '1.5rem' }}>Construction was precise. A small hemispherical bowl, usually <strong style={{color:'#fff'}}>copper or bronze</strong> for their resistance to corrosion, floated in a larger basin. A finely drilled aperture at its base let water seep in at a calibrated rate.</p>
          <p style={{ marginBottom: '1.5rem' }}>When the bowl filled completely, it sank, marking one ghaṭī. Retrieved, emptied, and refloated, this cycle repeated <strong style={{color:'#fff'}}>sixty times</strong> to account for a full day and night.</p>
        </div>
        <div style={{ marginTop: '3rem', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '6px 16px', borderRadius: '20px', background: 'rgba(56,189,248,0.05)' }}>Copper & bronze construction</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '6px 16px', borderRadius: '20px', background: 'rgba(56,189,248,0.05)' }}>Sindhu-Saraswati origins, c. 3300 BCE <sup><a href="#sources" style={{color: 'var(--accent-primary)', textDecoration:'none'}}>[1]</a></sup></span>
        </div>
      </div>

    </div>
  );
}
