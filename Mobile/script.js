// script.js
const loader = document.getElementById('loader');
const carModel = document.getElementById('carModel');
const turboLogo = document.getElementById('turboLogo');
const btnSound = document.getElementById('btnSound');
const engine = document.getElementById('engineSound');

function hideLoader(){ loader.classList.add('hidden'); }
if (carModel){ carModel.addEventListener('load', hideLoader, {once:true}); }
setTimeout(hideLoader, 8000);

let targetYaw = 0, currentYaw = 0;
function onScroll(){
  const scroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  targetYaw = scroll * 90;
}
function rafLoop(){
  currentYaw += (targetYaw - currentYaw) * 0.18;
  if (carModel) carModel.cameraOrbit = `${currentYaw}deg 75deg 1.5m`;
  requestAnimationFrame(rafLoop);
}
window.addEventListener('scroll', onScroll, {passive:true});
rafLoop();

const io = new IntersectionObserver(entries =>{
  entries.forEach(e =>{
    if (e.isIntersecting){
      turboLogo.classList.add('visible');
    } else turboLogo.classList.remove('visible');
  });
},{threshold:0.35});
io.observe(document.getElementById('car-section'));

function playEngine(){
  if (!engine) return;
  engine.currentTime = 0;
  engine.loop = true;
  engine.play().catch(()=>{});
  btnSound.setAttribute('aria-pressed','true');
}
function stopEngine(){
  if (!engine) return;
  engine.pause();
  btnSound.setAttribute('aria-pressed','false');
}

btnSound.addEventListener('mousedown', playEngine);
btnSound.addEventListener('mouseup', stopEngine);
btnSound.addEventListener('mouseleave', stopEngine);
btnSound.addEventListener('touchstart', e=>{e.preventDefault();playEngine();},{passive:false});
btnSound.addEventListener('touchend', stopEngine);
btnSound.addEventListener('keydown', e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();if(engine.paused)playEngine();else stopEngine();}});