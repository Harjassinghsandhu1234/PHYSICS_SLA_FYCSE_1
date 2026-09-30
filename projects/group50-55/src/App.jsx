import React, { useEffect } from 'react';
import { Droplet } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

import TopicOrigins from './components/TopicOrigins';

// Force start at the top before React even mounts
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  if (window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname);
  }
}
import TopicPractice from './components/TopicPractice';
import TopicAstronomy from './components/TopicAstronomy';
import TopicAyurveda from './components/TopicAyurveda';
import TopicLegacy from './components/TopicLegacy';
import IndexSources from './components/IndexSources';
import Simulations from './components/Simulations';
import WaterBackground from './components/WaterBackground';
import SideNav from './components/SideNav';
import LiveClock from './components/LiveClock';
import './index.css';

// Scroll reveal variants
const revealUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

function App() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Force start at the very top (Hero section) on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
    });

    // Ensure Lenis and the browser agree we are at the top
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <motion.div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent-primary)', transformOrigin: '0%', scaleX: scrollYProgress, zIndex: 100 }} />
      <WaterBackground />
      <SideNav />
      
      <div className="app-container grain">
        
        {/* HERO SECTION */}
        <section id="hero" className="full-bleed" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          
          {/* Devanagari Background Layer */}
          <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '18vw', color: 'rgba(255,255,255,0.03)', fontFamily: 'serif', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 0 }}>
            घटी यन्त्र
          </div>

          <motion.div 
            initial="hidden" animate="visible" variants={revealUp}
            style={{ textAlign: 'center', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}
          >
            
            {/* Animated Drop */}
            <motion.div 
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "bounce" }}
              style={{ marginBottom: '2rem' }}
            >
              <Droplet size={60} style={{ color: '#38bdf8', filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.8))' }} />
            </motion.div>

            {/* Main Title */}
            <h1 className="hero-title">
              GHATI YANTRA
            </h1>
            <p style={{ fontSize: '1.5rem', fontFamily: "'Cinzel', serif", color: 'var(--text-secondary)', letterSpacing: '4px', marginBottom: '2rem' }}>
              The Water Clock of Ancient India
            </p>

            <LiveClock />

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ marginTop: '4rem', color: 'var(--accent-primary)', opacity: 0.7 }}
            >
              Scroll to explore ▼
            </motion.div>

          </motion.div>
        </section>

        {/* CONTENT SECTIONS */}
        <div className="section-wrap">
          
          <motion.div id="origins" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp} style={{ marginBottom: '6rem' }}>
            <TopicOrigins />
          </motion.div>

          <motion.div id="practice" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp} style={{ marginBottom: '6rem' }}>
            <TopicPractice />
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp} style={{ marginBottom: '6rem' }}>
            <Simulations />
          </motion.div>
          
          <motion.div id="astronomy" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp} style={{ marginBottom: '6rem' }}>
            <TopicAstronomy />
          </motion.div>

          <motion.div id="ayurveda" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp} style={{ marginBottom: '6rem' }}>
            <TopicAyurveda />
          </motion.div>

          <motion.div id="legacy" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp} style={{ marginBottom: '2rem' }}>
            <TopicLegacy />
          </motion.div>

        </div>

        {/* FOOTER SUMMARY */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="section-wrap" style={{ paddingBottom: '2rem' }}>
          <IndexSources />
        </motion.div>

      </div>
    </>
  );
}

export default App;
