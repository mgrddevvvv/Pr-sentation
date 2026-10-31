fillText();
setAvatar($("#avatar"), $("#avatar-fallback"));
clock($("#time"), { hour: "2-digit", minute: "2-digit" });
animateTabTitle();

// Chaque lettre du pseudo monte à son tour
$("#name").innerHTML = [...P.name].map((c, i) => `<span style="--i:${i}">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");

// Bandeau défilant (deux copies pour boucler sans trou)
const chips = P.interests.map((t) => `<span>${esc(t)}</span>`).join("");
$("#marquee").innerHTML = chips + chips;

$("#links").innerHTML = P.links
  .map(
    (l, i) => `<li><a ${linkAttrs(l)}>
      <span class="n">${String(i + 1).padStart(2, "0")}</span>
      <span class="t">${esc(l.label)}</span>
      <span class="s">${esc(l.sub)}</span>
      <i class="arrow">→</i></a></li>`
  )
  .join("");

bindPlayer({ play: $("#play") });
onNoMusic(() =>($("#np").textContent = "pas encore de musique"));

start(() => setTimeout(() => typeLoop($("#typed")), 900));
