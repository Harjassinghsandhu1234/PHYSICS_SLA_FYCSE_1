/* ==========================================================
   YASTI YANTRA — interaction & simulation logic
   ========================================================== */
(function () {
  "use strict";

  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SVGNS = "http://www.w3.org/2000/svg";

  /* ---------------------------------------------------------
     Helpers
  --------------------------------------------------------- */
  function el(tag, attrs) {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function rand(min, max) { return Math.random() * (max - min) + min; }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
  function deg2rad(d) { return d * Math.PI / 180; }
  function rad2deg(r) { return r * 180 / Math.PI; }

  function scatterStars(container, count, opts) {
    opts = opts || {};
    const w = opts.w || 100, h = opts.h || 100, rMin = opts.rMin || 0.5, rMax = opts.rMax || 1.6;
    for (let i = 0; i < count; i++) {
      const c = el('circle', {
        cx: rand(0, w).toFixed(1),
        cy: rand(0, h).toFixed(1),
        r: rand(rMin, rMax).toFixed(2),
        opacity: rand(0.25, 0.95).toFixed(2)
      });
      container.appendChild(c);
    }
  }

  /* ---------------------------------------------------------
     LOADER
  --------------------------------------------------------- */
  function initLoader() {
    const loader = document.getElementById('loader');
    const starGroup = document.getElementById('loader-stars');
    const lineGroup = document.getElementById('loader-lines');
    const yasti = document.getElementById('loader-yasti');
    const text = document.getElementById('loader-text');
    const progressBar = document.getElementById('loader-progress-bar');
    const nav = document.getElementById('site-nav');
    const main = document.getElementById('main');

    // scatter a handful of "constellation" points that will connect
    const pts = [];
    const N = 7;
    for (let i = 0; i < N; i++) {
      const p = { x: rand(280, 520), y: rand(120, 340) };
      pts.push(p);
      const c = el('circle', { cx: p.x, cy: p.y, r: 2.2, fill: '#E7D9BC', opacity: 0 });
      starGroup.appendChild(c);
    }
    // background scatter
    scatterStars(starGroup, 60, { w: 800, h: 600, rMin: 0.4, rMax: 1.3 });

    // connecting lines between the constellation points (simple path)
    for (let i = 0; i < pts.length - 1; i++) {
      const line = el('line', {
        x1: pts[i].x, y1: pts[i].y, x2: pts[i + 1].x, y2: pts[i + 1].y
      });
      lineGroup.appendChild(line);
    }

    let done = false;
    function finish() {
      if (done) return; done = true;
      loader.classList.add('loader-done');
      nav.classList.remove('hidden-until-ready');
      main.classList.remove('hidden-until-ready');
      if (window.gsap) {
        gsap.to([nav, main], { opacity: 1, duration: 0.8, ease: 'power1.out' });
      } else {
        nav.style.opacity = 1; main.style.opacity = 1;
      }
      document.body.style.overflow = '';
      setTimeout(() => loader.remove(), 1000);
    }

    if (REDUCED_MOTION || !window.gsap) {
      progressBar.style.width = '100%';
      finish();
      return;
    }

    document.body.style.overflow = 'hidden';
    const tl = gsap.timeline({ onComplete: () => setTimeout(finish, 350) });
    tl.to(starGroup.children, { opacity: 1, duration: 0.8, stagger: 0.01, ease: 'power1.in' })
      .to(lineGroup.querySelectorAll('line'), { opacity: 0.8, duration: 0.35, stagger: 0.12 }, "-=0.3")
      .to(yasti, { opacity: 1, duration: 0.5 }, "-=0.1")
      .to(lineGroup, { opacity: 0, duration: 0.4 }, "-=0.1")
      .to(text.querySelector('h1'), { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, "-=0.2")
      .to(text.querySelector('p'), { opacity: 1, duration: 0.7 }, "-=0.4")
      .to(progressBar, { width: '100%', duration: 2.2, ease: 'none' }, 0);

    // safety: never trap the user
    setTimeout(finish, 5200);
    loader.addEventListener('click', finish);
  }

  /* ---------------------------------------------------------
     NAV: scroll progress "sun", active link, mobile menu
  --------------------------------------------------------- */
  function initNav() {
    const fill = document.getElementById('scroll-progress-fill');
    const sun = document.getElementById('scroll-progress-sun');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#site-nav nav a[data-nav]');
    const sections = ['yasti', 'history', 'science', 'simulator', 'sky']
      .map(id => document.getElementById(id)).filter(Boolean);

    function onScroll() {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? clamp(scrolled / height, 0, 1) : 0;
      fill.style.width = (pct * 100).toFixed(2) + '%';
      sun.style.left = (pct * 100).toFixed(2) + '%';

      let current = null;
      sections.forEach(s => {
        const r = s.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.3) current = s.id;
      });
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.nav === current));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function openMenu(open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
    toggle.addEventListener('click', () => openMenu(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => openMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') openMenu(false); });
  }

  /* ---------------------------------------------------------
     HERO: stars, sun path, shadow tied to scroll
  --------------------------------------------------------- */
  function initHero() {
    const starGroup = document.getElementById('hero-stars');
    scatterStars(starGroup, 90, { w: 1440, h: 520, rMin: 0.5, rMax: 1.6 });

    const sun = document.getElementById('hero-sun');
    const glow = document.getElementById('hero-sun-glow');
    const shadow = document.getElementById('hero-shadow');
    const yasti = document.getElementById('hero-yasti');

    if (!window.gsap || REDUCED_MOTION) {
      return;
    }

    // Sunrise + shadow shortening as the hero scrolls away
    gsap.timeline({
      scrollTrigger: {
        trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.6
      }
    })
      .to([sun, glow], { attr: { cy: 300 }, x: -260, duration: 1, ease: 'none' }, 0)
      .to(starGroup, { opacity: 0.15, duration: 1 }, 0)
      .to(shadow, { attr: { x2: 745 }, duration: 1, ease: 'none' }, 0)
      .to('.hero-copy', { opacity: 0, y: -30, duration: 0.6 }, 0)
      .to('.scroll-cue', { opacity: 0, duration: 0.3 }, 0);
  }

  /* ---------------------------------------------------------
     HISTORY: decorative ticks + stars on the astrolabe motif
  --------------------------------------------------------- */
  function initHistoryVisual() {
    const ticks = document.getElementById('history-ticks');
    const stars = document.getElementById('history-stars');
    if (!ticks) return;
    const cx = 210, cy = 210, r = 180;
    for (let i = 0; i < 72; i++) {
      const a = deg2rad(i * 5);
      const long = i % 6 === 0;
      const r1 = r, r2 = long ? r - 14 : r - 6;
      const line = el('line', {
        x1: (cx + r1 * Math.cos(a)).toFixed(1), y1: (cy + r1 * Math.sin(a)).toFixed(1),
        x2: (cx + r2 * Math.cos(a)).toFixed(1), y2: (cy + r2 * Math.sin(a)).toFixed(1),
        stroke: '#8A6A45', 'stroke-width': long ? 1 : 0.5, opacity: long ? 0.7 : 0.35
      });
      ticks.appendChild(line);
    }
    scatterStars(stars, 18, { w: 420, h: 420, rMin: 0.6, rMax: 1.4 });
  }

  /* ---------------------------------------------------------
     YASTI BREAKDOWN — hover / tap hotspots
  --------------------------------------------------------- */
  const YASTI_INFO = {
    staff: {
      title: 'Staff',
      text: 'A single straight rod, set exactly vertical. Its height is known and fixed — everything else is measured against it.'
    },
    sun: {
      title: 'Sun',
      text: 'The light source. As the Sun climbs higher through the day, the angle of its rays against the staff keeps changing.'
    },
    shadow: {
      title: 'Shadow',
      text: 'The staff blocks the Sun\u2019s rays and throws a shadow along the ground. Its length is what the observer actually measures.'
    },
    measurement: {
      title: 'Measurement',
      text: 'By comparing the staff\u2019s known height to the shadow\u2019s measured length, an observer can calculate the Sun\u2019s altitude angle.'
    }
  };

  function initYastiSection() {
    const ticks = document.getElementById('yasti-ground-ticks');
    const measureTicks = document.getElementById('yasti-measure-ticks');
    if (ticks) {
      for (let x = 60; x <= 640; x += 24) {
        ticks.appendChild(el('line', { x1: x, y1: 466, x2: x, y2: 474, stroke: '#5C4A34', 'stroke-width': 1, opacity: 0.5 }));
      }
    }
    if (measureTicks) {
      for (let i = 0; i <= 4; i++) {
        const t = i / 4;
        const ang = deg2rad(90 - t * 55);
        const rr = 180;
        const x = 350 + rr * Math.cos(ang), y = 470 - rr * Math.sin(ang);
        measureTicks.appendChild(el('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: 1.6, fill: '#C9A15A', opacity: 0.7 }));
      }
    }

    const parts = document.querySelectorAll('.yasti-part');
    const calloutPart = document.getElementById('yasti-callout').querySelector('.yasti-callout-part');
    const calloutText = document.getElementById('yasti-callout').querySelector('.yasti-callout-text');

    function activate(key) {
      const info = YASTI_INFO[key];
      if (!info) return;
      calloutPart.textContent = info.title;
      calloutText.textContent = info.text;
      parts.forEach(p => p.classList.toggle('active', p.dataset.part === key));
    }

    parts.forEach(p => {
      p.addEventListener('mouseenter', () => activate(p.dataset.part));
      p.addEventListener('focus', () => activate(p.dataset.part));
      p.addEventListener('click', () => activate(p.dataset.part));
      p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(p.dataset.part); } });
    });
  }

  /* ---------------------------------------------------------
     SCIENCE: draggable-feeling slider driving the shadow diagram
  --------------------------------------------------------- */
  function initMathDiagram() {
    const slider = document.getElementById('math-slider');
    const staff = document.getElementById('math-staff');
    const shadow = document.getElementById('math-shadow');
    const ray = document.getElementById('math-ray');
    const arc = document.getElementById('math-angle-arc');
    const thetaLabel = document.getElementById('math-theta-label');
    const fvTheta = document.getElementById('fv-theta');
    const fvHeight = document.getElementById('fv-height');
    const fvShadow = document.getElementById('fv-shadow');

    const baseX = 220, baseY = 300, staffLen = 180; // px, fixed staff height on screen

    function render() {
      const theta = parseFloat(slider.value); // degrees, altitude angle
      const shadowLen = staffLen / Math.tan(deg2rad(theta));
      const shadowLenClamped = clamp(shadowLen, 40, 420);

      staff.setAttribute('x2', baseX);
      staff.setAttribute('y2', baseY - staffLen);
      shadow.setAttribute('x2', baseX + shadowLenClamped);
      ray.setAttribute('x1', baseX); ray.setAttribute('y1', baseY - staffLen);
      ray.setAttribute('x2', baseX + shadowLenClamped); ray.setAttribute('y2', baseY);

      const arcR = 46;
      const ax = baseX + arcR, ay = baseY;
      const bx = baseX + arcR * Math.cos(deg2rad(theta)), by = baseY - arcR * Math.sin(deg2rad(theta));
      arc.setAttribute('d', `M ${ax} ${ay} A ${arcR} ${arcR} 0 0 1 ${bx.toFixed(1)} ${by.toFixed(1)}`);
      thetaLabel.setAttribute('x', baseX + arcR + 10);
      thetaLabel.setAttribute('y', baseY - 6);

      fvTheta.textContent = theta.toFixed(1) + '\u00B0';
      fvHeight.textContent = '1.0 m';
      fvShadow.textContent = (1 / Math.tan(deg2rad(theta))).toFixed(2) + ' m';
    }
    slider.addEventListener('input', render);
    render();
  }

  /* ---------------------------------------------------------
     SOLAR MODEL — simplified educational math, shared by
     the simulator stage and the sun dial.
  --------------------------------------------------------- */
  const SolarModel = {
    dayOfYear(dateStr) {
      const d = new Date(dateStr + 'T00:00:00');
      const start = new Date(d.getFullYear(), 0, 0);
      return Math.floor((d - start) / 86400000);
    },
    declination(doy) {
      // simplified approximation (degrees)
      return 23.44 * Math.sin(deg2rad((360 / 365) * (doy - 81)));
    },
    // returns {altitude (deg), azimuth (deg, 0=N,90=E,180=S,270=W), visible (bool)}
    position(latDeg, dateStr, hourDecimal) {
      const doy = this.dayOfYear(dateStr);
      const decl = this.declination(doy);
      const H = 15 * (hourDecimal - 12); // hour angle, degrees
      const lat = deg2rad(latDeg), d = deg2rad(decl), h = deg2rad(H);

      const sinAlt = Math.sin(lat) * Math.sin(d) + Math.cos(lat) * Math.cos(d) * Math.cos(h);
      const alt = rad2deg(Math.asin(clamp(sinAlt, -1, 1)));

      let cosAz = (Math.sin(d) - Math.sin(lat) * sinAlt) / (Math.cos(lat) * Math.cos(deg2rad(alt)) || 1e-6);
      cosAz = clamp(cosAz, -1, 1);
      let az = rad2deg(Math.acos(cosAz));
      if (H > 0) az = 360 - az; // afternoon: sun in the west

      return { altitude: alt, azimuth: az, declination: decl, visible: alt > 0.3 };
    }
  };

  function compassLabel(az) {
    // Shadow points opposite the Sun's azimuth
    const shadowAz = (az + 180) % 360;
    const dirs = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
    const idx = Math.round(shadowAz / 45) % 8;
    return dirs[idx];
  }

  /* ---------------------------------------------------------
     SIMULATOR
  --------------------------------------------------------- */
  function initSimulator() {
    const svgSun = document.getElementById('sim-sun');
    const sunRay = document.getElementById('sim-sun-ray');
    const staff = document.getElementById('sim-staff');
    const shadowLine = document.getElementById('sim-shadow');
    const belowHorizon = document.getElementById('sim-below-horizon');
    const skyTop = document.getElementById('simSkyTop');
    const skyBot = document.getElementById('simSkyBot');
    const starGroup = document.getElementById('sim-stars');

    const ctrlTime = document.getElementById('ctrl-time');
    const ctrlTimeOut = document.getElementById('ctrl-time-out');
    const ctrlDate = document.getElementById('ctrl-date');
    const ctrlLat = document.getElementById('ctrl-lat');
    const ctrlLatOut = document.getElementById('ctrl-lat-out');
    const seasonBtns = document.querySelectorAll('.season-toggle button');

    const readAlt = document.getElementById('read-altitude');
    const readShadow = document.getElementById('read-shadow');
    const readDir = document.getElementById('read-direction');

    const dial = document.getElementById('sun-dial');
    const dialHandle = document.getElementById('sun-dial-handle');

    scatterStars(starGroup, 40, { w: 700, h: 220, rMin: 0.4, rMax: 1.3 });

    const groundY = 380, staffTopY = 338, staffX = 350;
    const arcCx = 350, arcCy = 380, arcR = 290;

    function timeToHHMM(t) {
      const h = Math.floor(t);
      const m = Math.round((t - h) * 60);
      return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
    }

    function render() {
      const time = parseFloat(ctrlTime.value);
      const lat = parseFloat(ctrlLat.value);
      const dateStr = ctrlDate.value || '2026-03-20';

      ctrlTimeOut.textContent = timeToHHMM(time);
      ctrlLatOut.textContent = lat.toFixed(1) + '\u00B0 N';

      const pos = SolarModel.position(lat, dateStr, time);

      // Sun screen position: sweep 6h->18h across a 180deg arc, height by altitude
      const frac = clamp((time - 6) / 12, 0, 1);
      const arcAngle = Math.PI - frac * Math.PI; // pi (left/east) -> 0 (right/west)
      const altClamp = clamp(pos.altitude, -6, 90);
      const heightFactor = clamp(altClamp / 90, -0.06, 1);
      const sunX = arcCx + arcR * 0.92 * Math.cos(arcAngle);
      const sunY = arcCy - (arcR * 0.86) * Math.max(heightFactor, 0) - 20;

      svgSun.setAttribute('cx', sunX.toFixed(1));
      svgSun.setAttribute('cy', Math.max(sunY, 40).toFixed(1));
      svgSun.setAttribute('opacity', pos.visible ? 1 : 0.15);

      if (pos.visible) {
        const altRad = deg2rad(clamp(pos.altitude, 2, 89));
        const shadowLenPx = clamp(42 / Math.tan(altRad), 0, 300);
        // shadow points away from sun horizontally, opposite side
        const dirSign = sunX < staffX ? 1 : -1;
        shadowLine.setAttribute('x2', (staffX + dirSign * shadowLenPx).toFixed(1));
        shadowLine.setAttribute('opacity', 0.6);
        sunRay.setAttribute('x1', sunX.toFixed(1)); sunRay.setAttribute('y1', Math.max(sunY, 40).toFixed(1));
        sunRay.setAttribute('x2', staffX); sunRay.setAttribute('y2', staffTopY);
        sunRay.setAttribute('opacity', 0.55);
        belowHorizon.setAttribute('opacity', 0);

        readAlt.textContent = pos.altitude.toFixed(1) + '\u00B0';
        readShadow.textContent = (1 / Math.tan(altRad)).toFixed(2) + '\u00D7';
        readDir.textContent = compassLabel(pos.azimuth);
      } else {
        shadowLine.setAttribute('x2', staffX);
        shadowLine.setAttribute('opacity', 0);
        sunRay.setAttribute('opacity', 0);
        belowHorizon.setAttribute('opacity', 0.8);
        readAlt.textContent = pos.altitude.toFixed(1) + '\u00B0';
        readShadow.textContent = '\u2014';
        readDir.textContent = '\u2014';
      }

      // sky color: darker when sun low/below horizon
      const light = clamp((pos.altitude + 6) / 40, 0, 1);
      skyTop.setAttribute('stop-color', mixColor('#0A1020', '#16233C', light));
      skyBot.setAttribute('stop-color', mixColor('#101B30', '#C98B4A', light * 0.8));
      starGroup.setAttribute('opacity', (1 - light).toFixed(2));

      // sync dial handle (0..1 across 6-18h)
      dialHandle.style.left = (frac * 100).toFixed(2) + '%';
      dial.setAttribute('aria-valuenow', time.toFixed(2));
    }

    function mixColor(c1, c2, t) {
      const p1 = hexToRgb(c1), p2 = hexToRgb(c2);
      const r = Math.round(p1[0] + (p2[0] - p1[0]) * t);
      const g = Math.round(p1[1] + (p2[1] - p1[1]) * t);
      const b = Math.round(p1[2] + (p2[2] - p1[2]) * t);
      return `rgb(${r},${g},${b})`;
    }
    function hexToRgb(h) {
      const n = parseInt(h.slice(1), 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    ctrlTime.addEventListener('input', render);
    ctrlDate.addEventListener('input', render);
    ctrlLat.addEventListener('input', render);

    const SEASON_DATES = { summer: '2026-05-21', monsoon: '2026-08-15', winter: '2026-12-21' };
    seasonBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        seasonBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        ctrlDate.value = SEASON_DATES[btn.dataset.season];
        render();
      });
    });

    // Sun dial drag interaction ("Move the Sun")
    let dragging = false;
    function setFromClientX(clientX) {
      const rect = dial.getBoundingClientRect();
      const frac = clamp((clientX - rect.left) / rect.width, 0, 1);
      const time = 6 + frac * 12;
      ctrlTime.value = time.toFixed(2);
      render();
    }
    dial.addEventListener('pointerdown', e => { dragging = true; dial.setPointerCapture(e.pointerId); setFromClientX(e.clientX); });
    dial.addEventListener('pointermove', e => { if (dragging) setFromClientX(e.clientX); });
    dial.addEventListener('pointerup', () => dragging = false);
    dial.addEventListener('keydown', e => {
      const t = parseFloat(ctrlTime.value);
      if (e.key === 'ArrowRight') { ctrlTime.value = clamp(t + 0.25, 6, 18); render(); }
      if (e.key === 'ArrowLeft') { ctrlTime.value = clamp(t - 0.25, 6, 18); render(); }
    });

    render();
  }

  /* ---------------------------------------------------------
     SKY MAP — lightweight, hand-picked stars
  --------------------------------------------------------- */
  const SKY_STARS = [
    { x: 180, y: 150, name: 'Dhruva (Pole Star)', text: 'Known in Sanskrit tradition as Dhruva. Because it stays almost fixed in the sky, it served as a reliable marker for finding true north.' },
    { x: 420, y: 110, name: 'Rohini (Aldebaran)', text: 'One of the twenty-seven nakshatras, or lunar mansions, used to track the Moon\u2019s path through the sky night by night.' },
    { x: 600, y: 260, name: 'Citra (Spica)', text: 'Another of the nakshatras, marking a segment of the ecliptic — the band of sky the Sun, Moon and planets appear to travel through.' },
    { x: 300, y: 340, name: 'Agastya (Canopus)', text: 'A bright southern star used as a seasonal marker, referenced in classical Indian texts on timekeeping.' }
  ];

  function initSkyMap() {
    const bg = document.getElementById('sky-bg-stars');
    const constellations = document.getElementById('sky-constellations');
    const marked = document.getElementById('sky-marked-stars');
    const panel = document.getElementById('sky-panel');
    if (!bg) return;

    scatterStars(bg, 160, { w: 800, h: 500, rMin: 0.4, rMax: 1.5 });

    // faint connective lines between marked stars, just for atmosphere
    for (let i = 0; i < SKY_STARS.length - 1; i++) {
      const a = SKY_STARS[i], b = SKY_STARS[i + 1];
      constellations.appendChild(el('line', {
        x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'sky-constellation-line'
      }));
    }

    SKY_STARS.forEach((s, i) => {
      const g = el('g', { class: 'sky-star', tabindex: '0', role: 'button', 'aria-label': s.name });
      g.appendChild(el('circle', { cx: s.x, cy: s.y, r: 5 }));
      g.appendChild(el('circle', { cx: s.x, cy: s.y, r: 11, fill: '#F3B45C', opacity: '0.12' }));
      const label = el('text', { x: s.x + 12, y: s.y + 4 });
      label.textContent = s.name.split(' ')[0];
      g.appendChild(label);
      marked.appendChild(g);

      function activate() {
        marked.querySelectorAll('.sky-star').forEach(n => n.classList.remove('active'));
        g.classList.add('active');
        panel.innerHTML = `<p class="sky-panel-title">${s.name}</p><p class="sky-panel-text">${s.text}</p>`;
      }
      g.addEventListener('click', activate);
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
    });
  }

  /* ---------------------------------------------------------
     SCROLL REVEALS (GSAP ScrollTrigger) — one quiet pattern
     reused across sections, not a different effect per block.
  --------------------------------------------------------- */
  function initScrollReveals() {
    if (!window.gsap || REDUCED_MOTION) return;
    gsap.registerPlugin(ScrollTrigger);

    const revealTargets = document.querySelectorAll(
      '.section-eyebrow, .section-title, .section-lead, .history-text p, .science-cards article, .timeline li, .transition-card, .dyk-inner, .reflection-text, .reflection-sub'
    );
    revealTargets.forEach(t => {
      gsap.fromTo(t, { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: t, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });

    gsap.fromTo('#yasti-svg', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#yasti-svg', start: 'top 85%' }
    });
    gsap.fromTo('#sim-svg', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#sim-svg', start: 'top 85%' }
    });
  }

  /* ---------------------------------------------------------
     BOOT
  --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initHistoryVisual();
    initYastiSection();
    initMathDiagram();
    initSimulator();
    initSkyMap();
    initNav();
    initHero();
    initScrollReveals();
    initLoader();
  });

})();
