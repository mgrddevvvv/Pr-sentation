// ============================================================
//  LES PROFILS — un bloc par personne. Modifie seulement ce fichier.
//  Mets les images/musiques dans assets/<id>/
//  Icônes des liens : https://fontawesome.com/search?o=r&m=free
// ============================================================
const SITE = {
  title: "Notre équipe",
};

const PROFILES = [
  {
    id: "moi", // utilisé dans l'adresse (?p=moi) : pas d'espace ni d'accent
    name: "TonPseudo",
    handle: "@tonpseudo",
    avatar: "assets/moi/avatar.png",
    status: { text: "en ligne", color: "#22c55e" },
    bios: ["Développeur & créateur", "Je fais des addons Garry's Mod", "Bienvenue chez moi ✦"],
    // Tu peux sauter des lignes avec \n
    description:
      "Salut ! Moi c'est TonPseudo, j'ai XX ans.\nJe passe mon temps sur Garry's Mod à créer des addons et des serveurs. Toujours partant pour un projet !",
    interests: ["Garry's Mod", "Lua", "Musique", "Jeux vidéo"],
    location: "France",
    timezone: "Europe/Paris",
    links: [
      { icon: "fa-brands fa-discord", label: "Discord", sub: "tonpseudo", url: "https://discord.com/users/TON_ID" },
      { icon: "fa-brands fa-youtube", label: "YouTube", sub: "mes vidéos", url: "https://youtube.com/@TON_PSEUDO" },
    ],
    music: { src: "assets/moi/music.mp3", title: "Titre", artist: "Artiste", volume: 0.35 },
    // Deux couleurs : elles teintent tous les styles
    colors: ["#a855f7", "#ff4d8d"],
  },
  {
    id: "coequipier",
    name: "Coéquipier",
    handle: "@coequipier",
    avatar: "assets/coequipier/avatar.png",
    status: { text: "occupé", color: "#f59e0b" },
    bios: ["Mappeur & builder", "Il construit, je code", "Content de te voir ici"],
    description:
      "Yo ! Moi c'est Coéquipier.\nJe m'occupe des maps et du design de nos projets. Écris-moi si tu veux bosser avec nous.",
    interests: ["Mapping", "Hammer", "Design", "FPS"],
    location: "France",
    timezone: "Europe/Paris",
    links: [
      { icon: "fa-brands fa-discord", label: "Discord", sub: "coequipier", url: "https://discord.com/users/SON_ID" },
      { icon: "fa-brands fa-youtube", label: "YouTube", sub: "ses vidéos", url: "https://youtube.com/@SON_PSEUDO" },
      { icon: "fa-brands fa-tiktok", label: "TikTok", sub: "ses clips", url: "https://tiktok.com/@SON_PSEUDO" },
    ],
    music: { src: "assets/coequipier/music.mp3", title: "Titre", artist: "Artiste", volume: 0.35 },
    colors: ["#22d3ee", "#3b82f6"],
  },
];
