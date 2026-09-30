import React from 'react';

export default function TopicAyurveda() {
  const accent = "#f97316";

  return (
    <div className="asymmetric-grid" style={{ position: 'relative' }}>
      <div className="section-watermark" style={{ '--watermark-color': accent }}>05</div>
      
      <div style={{ position: 'relative' }}>
        <div style={{ 
          width: '100%', aspectRatio: '1/1', borderRadius: '50%', 
          border: `1px solid ${accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', 
          background: `radial-gradient(circle at 32% 28%, rgba(249, 115, 22, 0.1), rgba(15,23,42,0.6) 68%, rgba(15,23,42,1) 100%)`,
          padding: '2rem' 
        }}>
          <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path d="M78 70 L142 70 L136 150 A26 20 0 0 1 84 150 Z" fill="rgba(249, 115, 22, 0.15)" stroke={accent} strokeWidth="1.6"/>
            <ellipse cx="110" cy="70" rx="32" ry="8" fill="none" stroke={accent} strokeWidth="1.4"/>
            <path d="M110 40 C104 50 100 56 110 64 C120 56 116 50 110 40 Z" fill="#e2e8f0" opacity="0.75" className="flicker" />
            <ellipse cx="110" cy="150" rx="46" ry="9" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.7"/>
            <text x="110" y="185" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize="14" fill={accent}>Ghaṭiyantra · Kanchapatra</text>
            <text x="110" y="203" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontSize="13" fill="var(--text-secondary)">Raktamokshana for Gridhrasi</text>
          </svg>
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "'Cinzel', serif", fontStyle: 'italic', color: accent, fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '4rem', fontStyle: 'normal', lineHeight: 1 }}>05</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontStyle: 'normal' }}>— Ayurvedic Medicine</span>
        </div>
        <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#fff', fontFamily: "'Cinzel', serif", lineHeight: 1.2 }}>
          Inspired by the Ghaṭī Yantra
        </h2>
        <div className="body-standard">
          <p style={{ marginBottom: '1.5rem' }}>The water clock's name and form also travelled somewhere unexpected. In Ayurveda, a <strong style={{color:'#fff'}}>"Ghaṭiyantra"</strong> (or Kanchapatra) is a medium glass jar, open at one end, adapted from a Unani cupping instrument. It borrows the ancient bowl-and-vacuum logic — but seals over skin rather than floating on water, and keeps no time at all.</p>
          <p style={{ marginBottom: '1.5rem' }}>It's used in <strong style={{color:'#fff'}}>Raktamokshana</strong>, a Panchakarma blood-letting therapy, most often for <strong style={{color:'#fff'}}>Gridhrasi</strong> — the classical term closest to sciatica. The vacuum draws out vitiated blood until it clots, leaving a ring-shaped mark that is later massaged.</p>
          <p style={{ marginBottom: '1.5rem' }}>A 2016 AYU pilot study tested this on twenty sciatica patients across four sessions. Pain, pricking sensation, stiffness, and fasciculation scores all fell sharply and significantly (p &lt; 0.0001).</p>
          <div style={{ background: 'rgba(249, 115, 22, 0.05)', borderLeft: `4px solid ${accent}`, padding: '1rem', marginTop: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
            <strong>Note:</strong> This cites a single pilot case study (n=20 patients) investigating traditional techniques. It is presented for historical and engineering interest only and does not constitute medical advice.
          </div>
        </div>
      </div>

    </div>
  );
}
