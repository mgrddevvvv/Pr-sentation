fillText();
setAvatar($("#avatar"), $("#avatar-fallback"));
clock($("#time"), { hour: "2-digit", minute: "2-digit" });
animateTabTitle("PRESS START");

// Sons 8-bit
let sfx;
function blip(freq = 880, dur = 0.04, vol = 0.03) {
  try {
    sfx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (sfx.state === "suspended") sfx.resume();
    const o = sfx.createOscillator();
    const g = sfx.createGain();
    o.type = "square";
    o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g).connect(sfx.destination);
    o.start();
    o.stop(sfx.currentTime + dur);
  } catch {}
}

// Compétences : une barre par centre d'intérêt (niveau fixe calculé depuis le texte)
const level = (s) => 5 + ([...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9973, 7) % 6);
$("#skills").innerHTML = P.interests
  .map((t) => {
    const n = level(t);
    return `<div class="skill"><span>${esc(t)}</span><div class="segs">${Array.from({ length: 10 }, (_, k) => `<i class="${k < n ? "on" : ""}"></i>`).join("")}</div></div>`;
  })
  .join("");

$("#menu").innerHTML = P.links.map((l) => `<a ${linkAttrs(l)}><i class="${esc(l.icon)}"></i>${esc(l.label.toUpperCase())}</a>`).join("");
$$("#menu a").forEach((a) => {
  a.addEventListener("mouseenter", () => blip(660, 0.05));
  a.addEventListener("focus", () => blip(660, 0.05));
});

bindPlayer({ play: $("#play"), onState: (on) => ($("#bgm").textContent = on ? "ON" : "OFF") });
onNoMusic(() =>($("#bgm").textContent = "—"));

// Fond : étoiles pixel qui défilent
(function stars() {
  const c = $("#stars");
  const ctx = c.getContext("2d");
  const scale = 3;
  let w, h, list;
  const resize = () => {
    w = c.width = Math.ceil(innerWidth / scale);
    h = c.height = Math.ceil(innerHeight / scale);
    list = Array.from({ length: 120 }, () => ({ x: Math.random() * w, y: Math.random() * h, s: Math.random() * 0.6 + 0.1 }));
  };
  resize();
  addEventListener("resize", resize);
  (function loop() {
    ctx.fillStyle = "#0b0630";
    ctx.fillRect(0, 0, w, h);
    for (const st of list) {
      st.y = (st.y + st.s) % h;
      ctx.fillStyle = st.s > 0.5 ? P.colors[0] : st.s > 0.3 ? "#ffffff" : "#5a4fb0";
      ctx.fillRect(Math.floor(st.x), Math.floor(st.y), 1, 1);
    }
    requestAnimationFrame(loop);
  })();
})();

start(async () => {
  blip(523, 0.08, 0.05);
  setTimeout(() => blip(784, 0.12, 0.05), 90);
  typeLoop($("#typed"), P.bios.map((b) => b.toUpperCase()));
  await wait(700);
  $$(".segs").forEach((s, i) => setTimeout(() => s.classList.add("go"), i * 200));
  await wait(400);
  // Dialogue façon RPG, avec un bip toutes les 2 lettres
  let k = 0;
  await typeText($("#dialog"), P.description, 28, (ch) => ch !== " " && k++ % 2 === 0 && blip(440 + Math.random() * 60, 0.02, 0.015));
});
