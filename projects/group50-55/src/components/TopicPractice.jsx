import React from 'react';
import { User, Book, Sun } from 'lucide-react';

export default function TopicPractice() {
  const accent = "#fbbf24";

  return (
    <div style={{ marginTop: '4rem', position: 'relative' }}>
      <div className="section-watermark" style={{ '--watermark-color': accent }}>02</div>
      
      <div style={{ fontFamily: "'Cinzel', serif", fontStyle: 'italic', color: accent, fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'baseline', gap: '8px', justifyContent: 'center' }}>
        <span style={{ fontSize: '4rem', fontStyle: 'normal', lineHeight: 1 }}>02</span>
        <span style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontStyle: 'normal' }}>— In Practice</span>
      </div>
      
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem', color: '#fff', fontFamily: "'Cinzel', serif", textAlign: 'center' }}>
        Ghariyalis & Real Sites
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', position: 'relative' }}>
        
        {/* Timeline Node 1 */}
        <div className="hover-lift" style={{ '--hover-glow': 'rgba(251, 191, 36, 0.3)', position: 'relative', zIndex: 1, background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(10px)', padding: '1.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', borderTop: `4px solid ${accent}`, borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '140px', backgroundImage: 'url(/assets/sanskrit_manuscript_duotone_1790264746607.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8, maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}></div>
          <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-color)', border: `2px solid ${accent}`, marginBottom: '1.5rem', margin: '60px auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            <User size={32} color={accent} />
          </div>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Town Timekeepers</h3>
          <p className="body-standard" style={{ textAlign: 'center' }}>
            Appointed timekeepers (<strong style={{color:'#fff'}}>ghariyālīs</strong>) tended the water clock and struck a large brass disc at each sinking, signalling the quarters (<strong style={{color:'#fff'}}>pahars</strong>) of the day.
          </p>
        </div>

        {/* Timeline Node 2 */}
        <div className="hover-lift" style={{ '--hover-glow': 'rgba(251, 191, 36, 0.3)', position: 'relative', zIndex: 1, background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(10px)', padding: '1.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', borderTop: `4px solid ${accent}`, borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '140px', backgroundImage: 'url(/assets/nalanda_ruins_duotone_1790264724807.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8, maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}></div>
          <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-color)', border: `2px solid ${accent}`, marginBottom: '1.5rem', margin: '60px auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            <Book size={32} color={accent} />
          </div>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Nalanda University</h3>
          <p className="body-standard" style={{ textAlign: 'center' }}>
            In the 7th century, students operated the clock, adjusting for seasons. Drums and conch-shell blasts marked immersions, growing more elaborate through the day. <sup><a href="#sources" style={{color:accent, textDecoration:'none'}}>[4]</a></sup>
          </p>
        </div>

        {/* Timeline Node 3 */}
        <div className="hover-lift" style={{ '--hover-glow': 'rgba(251, 191, 36, 0.3)', position: 'relative', zIndex: 1, background: 'rgba(30, 41, 59, 0.4)', backdropFilter: 'blur(10px)', padding: '1.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', borderTop: `4px solid ${accent}`, borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '140px', backgroundImage: 'url(/assets/jantar_mantar_duotone_1790264702398.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8, maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}></div>
          <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-color)', border: `2px solid ${accent}`, marginBottom: '1.5rem', margin: '60px auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            <Sun size={32} color={accent} />
          </div>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>Monumental Legacy</h3>
          <p className="body-standard" style={{ textAlign: 'center' }}>
            The <strong>Narivalaya Yantra</strong> sundial at Jantar Mantar and dials at the Mecca Masjid (Hyderabad) remain marked in ghaṭī lines rather than hours today. <sup><a href="#sources" style={{color:accent, textDecoration:'none'}}>[3]</a></sup>
          </p>
        </div>

      </div>
    </div>
  );
}
