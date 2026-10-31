const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

$("#site-title").textContent = SITE.title;
document.title = SITE.title;

// Petites maquettes de chaque style
const PREVIEWS = {
  neon: `<div class="n-card"><i class="av"></i><b></b><s></s><span><i></i><i></i><i></i></span></div>`,
  bento: `<div class="b-grid"><i class="w3"></i><i class="w2 h2"></i><i></i><i></i><i class="w3"></i></div>`,
  terminal: `<div class="t-win"><em><i></i><i></i><i></i></em><code><b>$</b> whoami<br>NAME<br><b>$</b> cat a_propos.txt<br>…<br><b>$</b> <u>█</u></code></div>`,
  arcade: `<div class="a-scr"><span>PRESS START</span><small>1UP NAME</small></div>`,
  minimal: `<div class="m-page"><small>@handle</small><strong>NAME</strong><hr><hr><hr></div>`,
  vinyle: `<div class="v-deck"><i class="rec"><i></i></i><i class="arm"></i></div>`,
};

$("#people").innerHTML = PROFILES.map(
  (p, i) => `
  <button class="person" data-id="${esc(p.id)}" style="--pc1:${esc(p.colors[0])};--pc2:${esc(p.colors[1])};--i:${i}">
    <span class="pav"><b>${esc(p.name.charAt(0).toUpperCase())}</b><img src="${esc(p.avatar)}" alt="" onerror="this.remove()"></span>
    <strong>${esc(p.name)}</strong>
    <span class="ph">${esc(p.handle)}</span>
    <span class="pb">${esc(p.bios[0] || "")}</span>
    <span class="go">choisir <i class="fa-solid fa-arrow-right"></i></span>
  </button>`
).join("");

let who = null;

function choose(p) {
  who = p;
  document.documentElement.style.setProperty("--c1", p.colors[0]);
  document.documentElement.style.setProperty("--c2", p.colors[1]);
  $("#who-name").textContent = p.name;
  $("#themes").innerHTML = THEMES.map(
    (t, i) => `
    <a class="theme" href="themes/${t.id}/?p=${encodeURIComponent(p.id)}" style="--i:${i}">
      <div class="pv pv-${t.id}">${PREVIEWS[t.id].replaceAll("NAME", esc(p.name)).replace("@handle", esc(p.handle))}</div>
      <strong>${esc(t.name)}</strong>
      <span>${esc(t.desc)}</span>
    </a>`
  ).join("");
  show("#step-style");
  history.replaceState(null, "", "?p=" + encodeURIComponent(p.id));
}

function show(id) {
  document.querySelectorAll(".step").forEach((s) => s.classList.toggle("active", s.matches(id)));
  scrollTo(0, 0);
}

$("#people").addEventListener("click", (e) => {
  const btn = e.target.closest(".person");
  if (btn) choose(PROFILES.find((p) => p.id === btn.dataset.id));
});
$("#back-who").onclick = () => {
  show("#step-who");
  history.replaceState(null, "", location.pathname);
};
$("#random").onclick = () => {
  const t = THEMES[Math.floor(Math.random() * THEMES.length)];
  location.href = `themes/${t.id}/?p=${encodeURIComponent(who.id)}`;
};

// Retour depuis un style : on revient directement au choix du style
const preset = PROFILES.find((p) => p.id === new URLSearchParams(location.search).get("p"));
if (preset) choose(preset);
