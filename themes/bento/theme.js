fillText();
setAvatar($("#avatar"), $("#avatar-fallback"));
$("#status-dot").style.background = P.status.color;
$("#interests").innerHTML = P.interests.map((t) => `<span>${esc(t)}</span>`).join("");
$("#links").innerHTML = P.links
  .map((l) => `<a class="tile" ${linkAttrs(l)}><i class="${esc(l.icon)}"></i><span>${esc(l.label)}<small>${esc(l.sub)}</small></span></a>`)
  .join("");
$$(".tile").forEach((el, i) => el.style.setProperty("--i", i));

clock($("#time"));
onNoMusic(() =>($("#artist").textContent = "pas encore de musique"));
bindPlayer({ play: $("#play"), volume: $("#volume") });
animateTabTitle();

// Visualiseur : barres qui bougent avec la musique
(function viz() {
  const c = $("#viz");
  const ctx = c.getContext("2d");
  (function draw(t) {
    c.width = c.clientWidth;
    c.height = c.clientHeight;
    const n = 24;
    const w = c.width / n;
    const g = ctx.createLinearGradient(0, c.height, 0, 0);
    g.addColorStop(0, P.colors[0]);
    g.addColorStop(1, P.colors[1]);
    ctx.fillStyle = g;
    spectrum(n, t).forEach((v, i) => {
      const h = Math.max(4, v * c.height * 0.9);
      ctx.beginPath();
      ctx.roundRect(i * w + 2, c.height - h, w - 4, h, 4);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })(0);
})();

start(() => typeLoop($("#typed")));
