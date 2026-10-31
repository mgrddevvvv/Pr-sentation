fillText();
setAvatar($("#avatar"), $("#avatar-fallback"));
animateTabTitle();

// Le fond reprend la photo de profil, très floutée
$("#avatar").addEventListener("load", () => {
  $("#bg").style.backgroundImage = `url("${asset(P.avatar)}")`;
});

$("#interests").innerHTML = P.interests.map((t) => `<span>${esc(t)}</span>`).join("");
$("#links").innerHTML = P.links.map((l) => `<a ${linkAttrs(l)}><i class="${esc(l.icon)}"></i>${esc(l.label)}</a>`).join("");

const deck = $("#deck");
let noMusic = false;
bindPlayer({
  play: $("#play"),
  volume: $("#volume"),
  progress: $("#progress"),
  onState: (on) => deck.classList.toggle("spinning", on || (noMusic && document.body.classList.contains("started"))),
});
onNoMusic(() => {
  noMusic = true;
  $("#artist").textContent = "pas encore de musique";
});

// La lueur autour du disque suit le volume du son
(function pulse() {
  const s = spectrum(8);
  const lvl = audio.paused ? 0 : s.reduce((a, b) => a + b, 0) / s.length;
  deck.style.setProperty("--lvl", lvl.toFixed(3));
  requestAnimationFrame(pulse);
})();

start(() => {
  if (noMusic) deck.classList.add("spinning");
  typeLoop($("#typed"));
});
