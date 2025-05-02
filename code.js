let bambous = 0;
let gainParClic = 1;
let autoClickers = 0;
let ameliorations = 0;
let prestigePoints = 0;

let prixAmelioration = 10;
let prixAutoClick = 50;
let prixBooster = 100;
let boosters = 0;

let pandasActifs = true;
let pandasDVD = [];

function sauvegarder() {
  const data = {
    bambous,
    gainParClic,
    autoClickers,
    ameliorations,
    prestigePoints,
    prixAmelioration,
    prixAutoClick,
    prixBooster,
    boosters,
    pandasActifs
  };
  localStorage.setItem('bambouClickerSave', JSON.stringify(data));
}

function charger() {
  const sauvegarde = localStorage.getItem('bambouClickerSave');
  if (sauvegarde) {
    const data = JSON.parse(sauvegarde);
    bambous = data.bambous || 0;
    gainParClic = data.gainParClic || 1;
    autoClickers = data.autoClickers || 0;
    ameliorations = data.ameliorations || 0;
    prestigePoints = data.prestigePoints || 0;
    prixAmelioration = data.prixAmelioration || 10;
    prixAutoClick = data.prixAutoClick || 50;
    prixBooster = data.prixBooster || 100;
    boosters = data.boosters || 0;
    pandasActifs = data.pandasActifs ?? true;
  }
}

function majAffichage() {
  document.getElementById("bambou").innerText = bambous;
  document.getElementById("prixAmelioration").innerText = prixAmelioration;
  document.getElementById("prixAutoClick").innerText = prixAutoClick;
  document.getElementById("nbAutoClickers").innerText = autoClickers;
  document.getElementById("prestigePoints").innerText = prestigePoints;
  document.getElementById("gainParClic").innerText = gainParClic;
  document.getElementById("prixBooster").innerText = prixBooster;
  afficherPrestige();
  afficherPoeme();
}

function gagnerBambou() {
  bambous += gainParClic;
  majAffichage();
  sauvegarder();
}

function ameliorerClick() {
  if (bambous >= prixAmelioration) {
    bambous -= prixAmelioration;
    gainParClic *= 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
    prixAmelioration = Math.floor(prixAmelioration * 1.5);
    majAffichage();
    sauvegarder();
  } else {
    alert("Pas assez de bambous !");
  }
}

function ameliorerClick1() {
  if (bambous >= prixBooster) {
    bambous -= prixBooster;
    gainParClic += 10;
    boosters++;
    prixBooster = Math.floor(prixBooster * 1.5);
    majAffichage();
    sauvegarder();
  } else {
    alert("Pas assez de bambous !");
  }
}

function acheterAutoClick() {
  if (bambous >= prixAutoClick) {
    bambous -= prixAutoClick;
    autoClickers++;
    prixAutoClick = Math.floor(prixAutoClick * 9999999999999999999999999999999999999999999999999999999999999999999999999);
    majAffichage();
    sauvegarder();
  } else {
    alert("Pas assez de bambous !");
  }
}

setInterval(() => {
  bambous += autoClickers;
  majAffichage();
  sauvegarder();
}, 1000);

function afficherPrestige() {
  const zone = document.getElementById("prestigeZone");
  if (bambous >= 1000000) {
    zone.innerHTML = `<button onclick="prestige()">🌟 Prestige !</button>`;
  } else {
    zone.innerHTML = `Prestige à 1 000 000 🌿`;
  }
}

function prestige() {
  if (bambous >= 1000000) {
    prestigePoints++;
    bambous = 0;
    gainParClic = 1;
    autoClickers = 0;
    prixAmelioration = 10;
    prixAutoClick = 50;
    alert("Bravo ! Tu as gagné un point de prestige !");
    sauvegarder();
    majAffichage();
  }
}

function afficherPoeme() {
  const btnPoeme = document.getElementById("btn-poeme");
  if (prestigePoints >= 10) {
    btnPoeme.style.display = 'block';
  }
}

function afficherPoemeComplet() {
  const poemeDiv = document.createElement('div');
  poemeDiv.classList.add('poeme');
  poemeDiv.innerHTML = `
    <div class="poeme-content">
      <h2>🌿 Poème du Panda 🐼</h2>
      <p>Dans la forêt calme et secrète,<br>
      Le panda mange et s’endort, paisible.<br>
      Le bambou danse, tout en silence,<br>
      Dans le vent doux, il trouve sa place.</p>
      <button onclick="fermerPoeme()">❌ Fermer</button>
    </div>
  `;
  document.body.appendChild(poemeDiv);
}

function fermerPoeme() {
  const poemeDiv = document.querySelector('.poeme');
  if (poemeDiv) {
    poemeDiv.remove();
  }
}

// --- DVD Images flottantes ---
function creerImagesDVD() {
  const container = document.getElementById('dvd-container');
  for (let i = 0; i < 5; i++) {
    const img = document.createElement('img');
    img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Phyllostachys_viridiglaucescens.jpg/1920px-Phyllostachys_viridiglaucescens.jpg";
    img.classList.add('dvd-panda');
    img.style.position = 'absolute';
    img.style.top = `${Math.random() * 90}vh`;
    img.style.left = `${Math.random() * 90}vw`;
    container.appendChild(img);
    animeDVD(img);
  }
}


function animeDVD(img) {
  let dx = 1 + Math.random() * 2;
  let dy = 1 + Math.random() * 2;
  setInterval(() => {
    const rect = img.getBoundingClientRect();
    if (rect.left <= 0 || rect.right >= window.innerWidth) dx *= -1;
    if (rect.top <= 0 || rect.bottom >= window.innerHeight) dy *= -1;
    img.style.left = `${img.offsetLeft + dx}px`;
    img.style.top = `${img.offsetTop + dy}px`;
  }, 20);
}

// --- Initialisation ---
charger();
majAffichage();
if (pandasActifs) creerImagesDVD();
