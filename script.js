
const logo = document.getElementById('logo_turbo');
const viewer = document.getElementById('car');





let targetRotation = 0;
let currentRotation = 50;



function updateRotation() {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  Rotation = scrollPercent * 210;


  currentRotation += (Rotation - currentRotation) * 0.1;

  


 viewer.cameraOrbit = `${currentRotation}deg 75deg 1m`;




  requestAnimationFrame(updateRotation);
}


updateRotation();


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        logo.classList.add('visible'); 
      } else {
        logo.classList.remove('visible');
      }
    });
  },
  { threshold: 0.3 }
);


observer.observe(logo);


    const loader = document.getElementById('loader');
    const carModel = document.getElementById('car');


    carModel.addEventListener('load', () => {
      loader.classList.add('hidden');
    });


    setTimeout(() => loader.classList.add('hidden'), 10000);






const bouton = document.getElementById('btnMoteur');
const moteur = document.getElementById('soundMoteur');

if (bouton && moteur) {
  bouton.addEventListener('mousedown', () => {
    moteur.currentTime = 0;
    moteur.loop = true;
    moteur.play();
  });

  ['mouseup', 'mouseleave'].forEach(evt => {
    bouton.addEventListener(evt, () => {
      moteur.pause();
    });
  });
}

