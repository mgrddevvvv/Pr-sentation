// Outils partagés par tous les styles (chargé après data/profiles.js)
const ROOT = new URL("../", document.currentScript.src).href;
const asset = (path) => new URL(path, ROOT).href;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Profil choisi : ?p=<id>
const P = PROFILES.find((p) => p.id === new URLSearchParams(location.search).get("p")) || PROFILES[0];

document.documentElement.style.setProperty("--c1", P.colors[0]);
document.documentElement.style.setProperty("--c2", P.colors[1]);

// ---------- Contenu ----------
// Remplit chaque élément [data-f="champ"] (ex. data-f="music.title")
function fillText() {
  $$("[data-f]").forEach((el) => {
    el.textContent = el.dataset.f.split(".").reduce((o, k) => o?.[k], P) ?? "";
  });
}

function setAvatar(img, fallback) {
  img.onerror = () => {
    img.hidden = true;
    if (fallback) {
      fallback.textContent = P.name.charAt(0).toUpperCase();
      fallback.hidden = false;
    }
  };
  img.src = asset(P.avatar);
}

const linkAttrs = (l) => `href="${esc(l.url)}" target="_blank" rel="noopener" aria-label="${esc(l.label)}"`;

// ---------- Barre « changer » ----------
(function backBar() {
  const bar = document.createElement("nav");
  bar.className = "back-bar";
  bar.innerHTML = `<a href="${asset("index.html")}?p=${encodeURIComponent(P.id)}"><i class="fa-solid fa-arrow-left"></i> changer de style</a>`;
  for (const other of PROFILES.filter((p) => p !== P)) {
    const url = new URL(location.href);
    url.searchParams.set("p", other.id);
    bar.innerHTML += `<a href="${esc(url.href)}"><i class="fa-solid fa-user"></i> ${esc(other.name)}</a>`;
  }
  document.body.append(bar);
})();

// ---------- Musique ----------
const audio = new Audio();
audio.loop = true;
audio.preload = "auto";
audio.src = asset(P.music.src);
audio.volume = P.music.volume;
audio.addEventListener("error", () => audio.pause());
// Ne tente pas de lire un fichier introuvable (sinon le lecteur croit jouer)
const playMusic = () => (audio.error ? Promise.reject(audio.error) : audio.play());

// Appelle fn si la musique n'existe pas (même si l'erreur est déjà arrivée)
function onNoMusic(fn) {
  if (audio.error) fn();
  else audio.addEventListener("error", fn, { once: true });
}

// L'analyseur ne peut être créé qu'après un clic (sinon le navigateur coupe le son)
let analyser = null;
let freq = null;
function getAnalyser() {
  if (analyser) return analyser;
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    analyser = ac.createAnalyser();
    analyser.fftSize = 64;
    ac.createMediaElementSource(audio).connect(analyser);
    analyser.connect(ac.destination);
    freq = new Uint8Array(analyser.frequencyBinCount);
  } catch {
    analyser = null;
  }
  return analyser;
}
addEventListener("pointerdown", getAnalyser, { once: true });

// n valeurs entre 0 et 1 (fausses mais vivantes si l'analyseur n'est pas dispo)
function spectrum(n, t = performance.now()) {
  if (analyser && !audio.paused) {
    analyser.getByteFrequencyData(freq);
    return Array.from({ length: n }, (_, i) => freq[Math.floor((i * freq.length) / n)] / 255);
  }
  const base = audio.paused ? 0.1 : 0.35;
  return Array.from({ length: n }, (_, i) => base + 0.08 * Math.sin(t / 500 + i / 2));
}

function bindPlayer({ play, volume, progress, icons = ["fa-solid fa-play", "fa-solid fa-pause"], onState }) {
  const sync = () => {
    const i = play?.querySelector("i");
    if (i) i.className = icons[audio.paused ? 0 : 1];
    onState?.(!audio.paused);
  };
  audio.addEventListener("play", sync);
  audio.addEventListener("pause", sync);
  play?.addEventListener("click", () => (audio.paused ? playMusic().catch(() => {}) : audio.pause()));
  if (volume) {
    volume.value = audio.volume;
    volume.addEventListener("input", () => (audio.volume = volume.value));
  }
  if (progress) {
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    });
  }
  sync();
}

// ---------- Texte ----------
async function typeText(el, text, speed = 50, onChar) {
  for (let k = 1; k <= text.length; k++) {
    el.textContent = text.slice(0, k);
    onChar?.(text[k - 1]);
    await wait(speed);
  }
}

async function typeLoop(el, lines = P.bios, { type = 60, erase = 28, hold = 1800 } = {}) {
  for (let i = 0; ; i = (i + 1) % lines.length) {
    await typeText(el, lines[i], type);
    await wait(hold);
    for (let k = lines[i].length; k >= 0; k--) {
      el.textContent = lines[i].slice(0, k);
      await wait(erase);
    }
    await wait(300);
  }
}

function animateTabTitle(text = P.handle || P.name) {
  let i = 1;
  let dir = 1;
  setInterval(() => {
    document.title = text.slice(0, i) || "​";
    i += dir;
    if (i > text.length || i < 1) {
      dir = -dir;
      i += dir * 2;
    }
  }, 300);
}

function clock(el, opts = { hour: "2-digit", minute: "2-digit", second: "2-digit" }) {
  const fmt = new Intl.DateTimeFormat("fr-FR", { ...opts, timeZone: P.timezone });
  const tick = () => (el.textContent = fmt.format(new Date()));
  tick();
  setInterval(tick, 1000);
}

// ---------- Démarrage ----------
// Essaie de lancer la musique directement ; si le navigateur refuse, affiche l'écran #enter
function start(onStart, gate = $("#enter")) {
  let started = false;
  let asked = false;
  const go = () => {
    if (started) return;
    started = true;
    gate?.classList.remove("show");
    document.body.classList.add("started");
    onStart();
  };
  const ask = () => {
    if (asked || started) return;
    asked = true;
    if (!gate) return go();
    gate.classList.add("show");
    const click = () => {
      getAnalyser();
      playMusic().catch(() => {});
      go();
    };
    gate.addEventListener("click", click, { once: true });
    addEventListener("keydown", click, { once: true });
  };
  const timer = setTimeout(ask, 1200);
  playMusic().then(
    () => (clearTimeout(timer), go()),
    () => (clearTimeout(timer), ask())
  );
}
