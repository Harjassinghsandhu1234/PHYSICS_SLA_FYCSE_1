import React from 'react';

export default function IndexSources() {
  const links = [
    { id: 'origins', label: 'Origins & Construction', num: '01', color: '#38bdf8' },
    { id: 'practice', label: 'In Practice', num: '02', color: '#fbbf24' },
    { id: 'simulations', label: 'Simulations', num: '03', color: '#0ea5e9' },
    { id: 'astronomy', label: 'In Astronomy', num: '04', color: '#a855f7' },
    { id: 'ayurveda', label: 'In Ayurveda', num: '05', color: '#f97316' },
    { id: 'legacy', label: 'Legacy Today', num: '06', color: '#14b8a6' },
  ];

  return (
    <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(56,189,248,0.2)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem', textAlign: 'left' }}>
        
        <div>
          <h4 style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.2rem', paddingLeft: '1.5rem' }}>Index</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {links.map((link) => (
              <li key={link.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: link.color, fontFamily: "'Cinzel', serif", fontSize: '0.9rem', width: '20px', textAlign: 'right' }}>
                  {link.num}.
                </span>
                <a href={`#${link.id}`} className="footer-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Sources & Further Reading</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li>
              <a href="https://en.wikipedia.org/wiki/Surya_Siddhanta" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                <strong style={{ color: '#e2e8f0' }}>[1] Sūrya Siddhānta & Āryabhaṭīya</strong> <br/>
                <span style={{ opacity: 0.8, transition: 'opacity 0.2s' }} className="hover-fade">Foundational texts establishing early Vedic timekeeping and astronomy.</span>
              </a>
            </li>
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5041381/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                <strong style={{ color: '#e2e8f0' }}>[2] Kumbhare-Patil et al. (2016)</strong> <br/>
                <span style={{ opacity: 0.8 }} className="hover-fade">"Clinical efficacy of Ghati Yantra in Gridhrasi" – AYU 37(1). DOI: 10.4103/ayu.AYU_54_16</span>
              </a>
            </li>
            <li>
              <a href="https://magnumworkshop.com/the-bharat-clock/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                <strong style={{ color: '#e2e8f0' }}>[3] Sankul's Bharat Clock Project</strong> <br/>
                <span style={{ opacity: 0.8 }} className="hover-fade">Modern reconstruction and advocacy for the 60-ghaṭī analog dial.</span>
              </a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/Xuanzang" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', lineHeight: 1.4, display: 'block' }}>
                <strong style={{ color: '#e2e8f0' }}>[4] Records of the Western Regions (Xuanzang)</strong> <br/>
                <span style={{ opacity: 0.8 }} className="hover-fade">7th-century travelogues documenting Nalanda University's water clock operations.</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Photo Credits */}
      <div style={{ textAlign: 'left', marginBottom: '3rem', paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
        <h4 style={{ fontFamily: "'Cinzel', serif", color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1rem' }}>Image Credits</h4>
        <p>The duotone imagery featured in Section 02 (Nalanda Ruins, Jantar Mantar, Sanskrit Manuscripts) are AI-generated stylized visualizations created for this exhibition, intended to evoke the historical atmosphere rather than serve as direct documentary photography.</p>
      </div>

      <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '16px', padding: '3rem 2rem', marginBottom: '2rem' }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
          Explore the Simulation Code
        </h3>
        <p className="body-standard" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          The 2D and 3D fluid mechanics algorithms driving this interactive exhibition are open source. Dive into the mathematical reconstruction of ancient timekeeping.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'var(--accent-primary)', color: '#0f172a', border: 'none', fontWeight: 600 }}>
            View Repository on GitHub
          </button>
        </div>
      </div>

    </div>
  );
}
