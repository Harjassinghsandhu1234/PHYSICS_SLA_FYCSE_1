(function(){
"use strict";
try{

/* ---------- helpers ---------- */
function starField(scene, count, spread, size){
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(count*3);
  for(let i=0;i<count;i++){
    pos[i*3]=(Math.random()-0.5)*spread;
    pos[i*3+1]=(Math.random()-0.5)*spread;
    pos[i*3+2]=(Math.random()-0.5)*spread;
  }
  g.setAttribute('position', new THREE.BufferAttribute(pos,3));
  const m = new THREE.PointsMaterial({color:0xffffff, size:size, transparent:true, opacity:0.75});
  return new THREE.Points(g,m);
}
function ring(radius, tube, color, seg){
  const geo = new THREE.TorusGeometry(radius, tube, 12, seg||64);
  const mat = new THREE.MeshBasicMaterial({color:color, wireframe:false, transparent:true, opacity:0.9});
  return new THREE.Mesh(geo, mat);
}
function makeYantraGroup(){
  const g = new THREE.Group();
  const outer = ring(2.1, 0.015, 0xcfcfcf, 96); g.add(outer);
  const mid = ring(1.55, 0.012, 0x9a9a9a, 80); mid.rotation.x = Math.PI/2.3; g.add(mid);
  const inner = ring(1.05, 0.01, 0x777777, 64); inner.rotation.x = Math.PI/1.6; g.add(inner);
  const axisGeo = new THREE.CylinderGeometry(0.012,0.012,4.4,8);
  const axisMat = new THREE.MeshBasicMaterial({color:0xf4f4f2});
  const axis = new THREE.Mesh(axisGeo, axisMat); axis.rotation.z = Math.PI/2.15; g.add(axis);
  for(let i=0;i<48;i++){
    const a = (i/48)*Math.PI*2;
    const tickGeo = new THREE.BoxGeometry(0.015,0.06,0.015);
    const tick = new THREE.Mesh(tickGeo, new THREE.MeshBasicMaterial({color:0x8c8c8c}));
    tick.position.set(Math.cos(a)*2.1, Math.sin(a)*2.1, 0);
    g.add(tick);
  }
  return g;
}

/* ---------- HERO SCENE ---------- */
const heroCanvas = document.getElementById('hero-canvas');
let heroW = window.innerWidth, heroH = window.innerHeight;
const heroRenderer = new THREE.WebGLRenderer({canvas:heroCanvas, antialias:true, alpha:true});
heroRenderer.setPixelRatio(Math.min(devicePixelRatio,2));
heroRenderer.setSize(heroW, heroH);
const heroScene = new THREE.Scene();
const heroCam = new THREE.PerspectiveCamera(45, heroW/heroH, 0.1, 100);
heroCam.position.set(6, 0, 7);
heroCam.lookAt(0, 0, 0);
heroScene.add(starField(heroScene, 900, 30, 0.03));
const heroYantra = makeYantraGroup();
heroYantra.scale.setScalar(1.15);
heroScene.add(heroYantra);
const sunLight = new THREE.PointLight(0xffffff, 1.2, 30);
sunLight.position.set(5,4,5);
heroScene.add(sunLight);
heroScene.add(new THREE.AmbientLight(0x404040, 0.6));
function heroLoop(){
  heroYantra.rotation.y += 0.0022;
  heroYantra.rotation.x = Math.sin(Date.now()*0.0002)*0.08;
  heroRenderer.render(heroScene, heroCam);
  requestAnimationFrame(heroLoop);
}
heroLoop();

/* ---------- INTERACTIVE YANTRA SCENE ---------- */
const yCanvas = document.getElementById('yantra-canvas');
const yStage = document.querySelector('.yantra-stage');
let yW = yStage.clientWidth, yH = yStage.clientHeight;
const yRenderer = new THREE.WebGLRenderer({canvas:yCanvas, antialias:true, alpha:true});
yRenderer.setPixelRatio(Math.min(devicePixelRatio,2));
yRenderer.setSize(yW,yH);
const yScene = new THREE.Scene();
const yCam = new THREE.PerspectiveCamera(45, yW/yH, 0.1, 100);
yCam.position.set(0,0,6);
const yYantra = makeYantraGroup();
yScene.add(yYantra);
yScene.add(new THREE.AmbientLight(0x606060,0.9));
const yLight = new THREE.PointLight(0xffffff,1,20); yLight.position.set(4,3,4); yScene.add(yLight);
function yLoop(){
  yYantra.rotation.y += 0.0016;
  yRenderer.render(yScene, yCam);
  requestAnimationFrame(yLoop);
}
yLoop();

/* ---------- STORY BACKGROUND CANVAS (Global Star Field) ---------- */
const sCanvas = document.getElementById('story-canvas');
const sRenderer = new THREE.WebGLRenderer({canvas:sCanvas, antialias:true, alpha:true});
sRenderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
sRenderer.setSize(window.innerWidth, window.innerHeight);
const sScene = new THREE.Scene();
const sCam = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
sCam.position.set(0,0,10);

// High-quality star field: varying sizes and opacities for depth
function createDeepSpaceStars(scene) {
  const starCount = 3000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

    const brightness = 0.5 + Math.random() * 0.5;
    colors[i * 3] = brightness;
    colors[i * 3 + 1] = brightness;
    colors[i * 3 + 2] = brightness;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  return new THREE.Points(geometry, material);
}

sScene.add(createDeepSpaceStars(sScene));

function sLoop(){
  // Slow, subtle rotation of the whole universe for a cinematic feel
  sScene.rotation.y += 0.0001;
  sScene.rotation.x += 0.00005;
  sRenderer.render(sScene, sCam);
  requestAnimationFrame(sLoop);
}
sLoop();

/* ---------- ORBIT MINI CANVAS ---------- */
const oCanvas = document.getElementById('orbit-canvas');
if(oCanvas){
  const holder = oCanvas.parentElement;
  const oRenderer = new THREE.WebGLRenderer({canvas:oCanvas, antialias:true, alpha:true});
  function sizeOrbit(){ oRenderer.setSize(holder.clientWidth, holder.clientHeight); oCam.aspect = holder.clientWidth/holder.clientHeight; oCam.updateProjectionMatrix(); }
  const oScene = new THREE.Scene();
  const oCam = new THREE.PerspectiveCamera(50,1,0.1,50);
  oCam.position.set(0,2.6,3.4); oCam.lookAt(0,0,0);
  sizeOrbit();
  oScene.add(new THREE.Mesh(new THREE.SphereGeometry(0.22,20,20), new THREE.MeshBasicMaterial({color:0xf4f4f2})));
  const miniPlanets=[];
  [0.6,0.95,1.3,1.65].forEach((r,i)=>{
    const ringG = new THREE.RingGeometry(r-0.003,r+0.003,64);
    const ringM = new THREE.Mesh(ringG, new THREE.MeshBasicMaterial({color:0x555555,side:THREE.DoubleSide}));
    ringM.rotation.x = Math.PI/2; oScene.add(ringM);
    const pm = new THREE.Mesh(new THREE.SphereGeometry(0.05,12,12), new THREE.MeshBasicMaterial({color:0xdddddd}));
    oScene.add(pm); miniPlanets.push({m:pm,r:r,s:0.6/(i+1),o:Math.random()*6});
  });
  sizeOrbit();
  function oLoop(){
    const t=Date.now()*0.001;
    miniPlanets.forEach(p=>{ const a=t*p.s+p.o; p.m.position.set(Math.cos(a)*p.r,0,Math.sin(a)*p.r); });
    oRenderer.render(oScene, oCam);
    requestAnimationFrame(oLoop);
  }
  oLoop();
}

/* ---------- CELESTIAL SPHERE MINI CANVAS ---------- */
const spCanvas = document.getElementById('sphere-canvas');
if(spCanvas){
  const holder = spCanvas.parentElement;
  const spRenderer = new THREE.WebGLRenderer({canvas:spCanvas, antialias:true, alpha:true});
  const spScene = new THREE.Scene();
  const spCam = new THREE.PerspectiveCamera(50,1,0.1,50);
  spCam.position.set(0,0,3.2);
  sizeSphere();
  const sphereGeo = new THREE.SphereGeometry(1,16,16);
  const wire = new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({color:0x666666, wireframe:true, transparent:true, opacity:0.6}));
  spScene.add(wire);
  const starsOnSphere = new THREE.Group();
  for(let i=0;i<40;i++){
    const phi = Math.acos(2*Math.random()-1), theta = Math.random()*Math.PI*2;
    const x = Math.sin(phi)*Math.cos(theta), y=Math.sin(phi)*Math.sin(theta), z=Math.cos(phi);
    const st = new THREE.Mesh(new THREE.SphereGeometry(0.02,6,6), new THREE.MeshBasicMaterial({color:0xffffff}));
    st.position.set(x,y,z); starsOnSphere.add(st);
  }
  spScene.add(starsOnSphere);
  function sizeSphere(){ spRenderer.setSize(holder.clientWidth, holder.clientHeight); spCam.aspect = holder.clientWidth/holder.clientHeight; spCam.updateProjectionMatrix(); }
  sizeSphere();
  function spLoop(){ wire.rotation.y += 0.003; starsOnSphere.rotation.y += 0.003; spRenderer.render(spScene, spCam); requestAnimationFrame(spLoop); }
  spLoop();
}

/* ---------- RESIZE ---------- */
window.addEventListener('resize', ()=>{
  heroW=window.innerWidth; heroH=window.innerHeight;
  heroRenderer.setSize(heroW,heroH); heroCam.aspect=heroW/heroH; heroCam.updateProjectionMatrix();
  sRenderer.setSize(window.innerWidth, window.innerHeight); sCam.aspect = window.innerWidth/window.innerHeight; sCam.updateProjectionMatrix();
  yW = yStage.clientWidth; yH = yStage.clientHeight;
  yRenderer.setSize(yW,yH); yCam.aspect = yW/yH; yCam.updateProjectionMatrix();
  if(typeof sizeOrbit === 'function') sizeOrbit();
  if(typeof sizeSphere === 'function') sizeSphere();
});

/* ---------- TEXT REVEAL (hero) ---------- */
if(window.anime){
  // Apply starting styles only after JS initializes to avoid blocking LCP
  anime.set('.eyebrow span', { translateY: '100%', opacity: 0 });
  anime.set('h1.title .word', { translateY: '110%' });
  anime.set('.subtitle', { opacity: 0, translateY: 16 });

  anime.timeline({easing:'cubicBezier(.2,.7,.2,1)'})
    .add({targets:'.eyebrow span', translateY:['100%','0%'], opacity:[0,1], duration:900})
    .add({targets:'h1.title .word', translateY:['110%','0%'], duration:1000, delay:anime.stagger(120)}, '-=600')
    .add({targets:'.subtitle', opacity:[0,1], translateY:[16,0], duration:800}, '-=400');
}

/* ---------- SCROLL PROGRESS ---------- */
const progressBar = document.getElementById('progress');
function onScroll(){
  const h = document.documentElement;
  const p = (h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  progressBar.style.width = p+'%';
  updateStoryCamera();
  updateDayNight();

  const logo = document.querySelector('.logo');
  if(logo){
    if(window.scrollY > 50){
      logo.classList.add('hidden');
    } else {
      logo.classList.remove('hidden');
    }
  }
}
window.addEventListener('scroll', onScroll, {passive:true});

/* ---------- STORY CAMERA MOVEMENT ---------- */
const storySection = document.getElementById('story');
function updateStoryCamera(){
  const rect = storySection.getBoundingClientRect();
  const total = storySection.offsetHeight - window.innerHeight;
  if(total<=0) return;
  const scrolled = Math.min(Math.max(-rect.top,0), total);
  const t = scrolled/total;
  sCam.position.x = Math.sin(t*Math.PI*1.4)*2.4;
  sCam.position.y = 1 + t*2.2;
  sCam.position.z = 10 - t*5;
  sCam.lookAt(0,0,0);
}

/* ---------- DAY / NIGHT MARKER ---------- */
const dnMarker = document.getElementById('dn-marker');
function updateDayNight(){
  if(!dnMarker) return;
  const vizSec = document.getElementById('visuals');
  if(!vizSec) return;
  const rect = vizSec.getBoundingClientRect();
  let t = 1 - (rect.top / window.innerHeight);
  t = Math.min(Math.max(t,0),1);
  dnMarker.style.left = (t*100)+'%';
}

/* ---------- HOTSPOT PANELS ---------- */
document.querySelectorAll('.hotspot').forEach(h=>{
  const id = h.getAttribute('data-id');
  const panel = document.getElementById('panel-'+id);
  function open(){
    document.querySelectorAll('.info-panel').forEach(p=>p.classList.remove('show'));
    document.querySelectorAll('.hotspot').forEach(x=>x.classList.remove('active'));
    panel.classList.add('show'); h.classList.add('active');
  }
  function close(){ panel.classList.remove('show'); h.classList.remove('active'); }
  h.addEventListener('mouseenter', open);
  h.addEventListener('mouseleave', close);
  h.addEventListener('click', (e)=>{ e.stopPropagation(); panel.classList.contains('show') ? close() : open(); });
});
document.addEventListener('click', ()=>{
  document.querySelectorAll('.info-panel').forEach(p=>p.classList.remove('show'));
  document.querySelectorAll('.hotspot').forEach(x=>x.classList.remove('active'));
});

/* ---------- REVEAL ON SCROLL ---------- */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      if(window.anime){
        anime({targets:en.target, opacity:[0,1], translateY:[28,0], duration:900, easing:'cubicBezier(.2,.7,.2,1)'});
      } else { en.target.style.opacity=1; en.target.style.transform='translateY(0)'; }
      io.unobserve(en.target);
    }
  });
}, {threshold:0.2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- CARD TILT ---------- */
document.querySelectorAll('.viz-card, .story-card, .info-panel').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    card.style.transform = 'perspective(600px) rotateX('+(-y*6)+'deg) rotateY('+(x*6)+'deg) translateY(-2px)';
  });
  card.addEventListener('mouseleave', ()=>{ card.style.transform=''; });
});

/* ---------- MAGNETIC / NAV LINKS SMOOTH ---------- */
document.querySelectorAll('.navlinks a').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

onScroll();

}catch(err){ console.error('Chakra Yantra init error:', err); }
})();
