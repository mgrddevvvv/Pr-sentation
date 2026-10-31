const out = $("#out");
const user = "visiteur";
const host = P.id;
$("#title").textContent = `${user}@${host}: ~`;
document.documentElement.style.setProperty("--status", P.status.color);
animateTabTitle(`${host}:~$`);

function append(cls, html) {
  const el = document.createElement("div");
  el.className = cls;
  el.innerHTML = html;
  out.append(el);
  out.scrollTop = out.scrollHeight;
  return el;
}

// Tape une commande, puis affiche sa sortie
async function run(cmd, html) {
  const line = append("line", `<span class="ps">${user}@${esc(host)}</span>:<span class="path">~</span>$ <span class="cmd"></span>`);
  await wait(400);
  await typeText($(".cmd", line), cmd, 55);
  await wait(250);
  const o = html == null ? null : append("output", html);
  await wait(350);
  return o;
}

const volBar = () => {
  const n = Math.round(audio.volume * 10);
  return "▮".repeat(n) + "▯".repeat(10 - n);
};

async function session() {
  append("output dim", `Dernière connexion : ${new Date().toLocaleString("fr-FR")}\nTape rien, je m'occupe de tout.`);

  const who = await run(
    "whoami",
    `<div class="who"><img id="avatar" alt=""><span class="fb" id="avatar-fallback" hidden></span>
     <div><span class="name">${esc(P.name)}</span> <span class="dim">${esc(P.handle)}</span>
     <br><span class="ok">●</span> ${esc(P.status.text)} <span class="dim">· ${esc(P.location)}</span></div></div>`
  );
  setAvatar($("#avatar", who), $("#avatar-fallback", who));

  const bio = await run("echo $BIO", `<span id="typed"></span><span class="cur">▌</span>`);
  typeLoop($("#typed", bio));

  await run("cat a_propos.txt", esc(P.description));
  await run("ls centres_interet/", `<div class="cols">${P.interests.map((t) => `<span>${esc(t)}</span>`).join("")}</div>`);
  await run(
    "ls liens/",
    `<div class="cols">${P.links.map((l) => `<a ${linkAttrs(l)}><i class="${esc(l.icon)}"></i>${esc(l.label.toLowerCase())}/</a>`).join("")}</div>`
  );

  const np = await run(
    "now-playing",
    `♪ ${esc(P.music.title)} — ${esc(P.music.artist)}
<button id="play">[ <span id="pl">pause</span> ]</button>  vol <button id="vm">[-]</button> <span id="vb"></span> <button id="vp">[+]</button>`
  );
  $("#vb", np).textContent = volBar();
  bindPlayer({ play: $("#play", np), onState: (on) => ($("#pl", np).textContent = on ? "pause" : "lecture") });
  const vol = (d) => {
    audio.volume = Math.min(1, Math.max(0, Math.round((audio.volume + d) * 10) / 10));
    $("#vb", np).textContent = volBar();
  };
  $("#vm", np).onclick = () => vol(-0.1);
  $("#vp", np).onclick = () => vol(0.1);
  onNoMusic(() => ($("#pl", np).textContent = "aucune musique"));

  const d = await run("date", `<span id="time"></span> <span class="dim">(${esc(P.timezone)})</span>`);
  clock($("#time", d), { dateStyle: "full", timeStyle: "medium" });

  append("line", `<span class="ps">${user}@${esc(host)}</span>:<span class="path">~</span>$ <span class="cur">█</span>`);
}

start(session);
