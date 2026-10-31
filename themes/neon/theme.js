fillText();
setAvatar($("#avatar"), $("#avatar-fallback"));
$("#name").dataset.text = P.name;
$("#status").textContent = P.status.text;
$("#interests").innerHTML = P.interests.map((t) => `<span>${esc(t)}</span>`).join("");
$("#links").innerHTML = P.links
  .map((l) => `<a ${linkAttrs(l)} title="${esc(l.label)}"><i class="${esc(l.icon)}"></i></a>`)
  .join("");

$("#track").textContent = `♪ ${P.music.title} — ${P.music.artist}`;
onNoMusic(() =>($("#track").textContent = "♪ pas encore de musique"));
bindPlayer({ play: $("#play"), volume: $("#volume"), progress: $("#progress") });
animateTabTitle();

// Fond : particules reliées
(function particles() {
  const c = $("#bg");
  const ctx = c.getContext("2d");
  let w, h, dots;
  const resize = () => {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
    dots = Array.from({ length: Math.min(90, Math.floor((w * h) / 16000)) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
    }));
  };
  resize();
  addEventListener("resize", resize);
  (function loop() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = ctx.strokeStyle = P.colors[0];
    for (const d of dots) {
      d.x = (d.x + d.vx + w) % w;
      d.y = (d.y + d.vy + h) % h;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
        if (dist < 120) {
          ctx.globalAlpha = (1 - dist / 120) * 0.25;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  })();
})();

// Carte qui s'incline + étincelles du curseur
let last = 0;
addEventListener("mousemove", (e) => {
  const x = e.clientX / innerWidth - 0.5;
  const y = e.clientY / innerHeight - 0.5;
  $("#card").style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;

  const now = performance.now();
  if (now - last < 35) return;
  last = now;
  const s = document.createElement("span");
  s.className = "spark";
  s.style.left = e.clientX + "px";
  s.style.top = e.clientY + "px";
  s.style.setProperty("--dx", (Math.random() - 0.5) * 40 + "px");
  s.style.setProperty("--dy", Math.random() * 30 + 10 + "px");
  document.body.append(s);
  setTimeout(() => s.remove(), 700);
});

start(() => {
  typeLoop($("#typed"));
  $$(".links a").forEach((a, i) => setTimeout(() => a.classList.add("in"), 500 + i * 120));
});
