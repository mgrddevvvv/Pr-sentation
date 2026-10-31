// ============================================================
//  LES PROFILS — un bloc par personne. Modifie seulement ce fichier.
//  Mets les images/musiques dans assets/<id>/
//  Icônes des liens : https://fontawesome.com/search?o=r&m=free
// ============================================================
const SITE = {
  title: "Nexium Profiles",
};

const PROFILES = [
  {
    id: "moi", // utilisé dans l'adresse (?p=moi) : pas d'espace ni d'accent
    name: "Mgrd___",
    handle: "@mgrd____",
    avatar: "assets/mgrd/avatar.jpg",
    status: { text: "En Ligne", color: "#22c55e" },
    bios: ["Développeur", "Je fais des addons Garry's Mod", "Bienvenue sur la page Github !"],
    // Tu peux sauter des lignes avec \n
    description:
      "Salut ! Moi c'est Mgrd__, j'ai 15 ans.\nJe passe mon temps sur Garry's Mod à créer des addons et des serveurs. Toujours partant pour un projet ! \nEn ce moment, je suis entrain d'apprendre le mapping sur Hammer++ !"
    
    interests: ["Garry's Mod", "Lua", "Mapping", "Dev"],
    location: "France",
    timezone: "Europe/Paris",
    links: [
      { icon: "fa-brands fa-discord", label: "Discord", sub: "Mgrd___", url: "https://discord.com/users/1492811688657817701" },
      { icon: "fa-brands fa-youtube", label: "YouTube", sub: "Nexium DarkRP", url: "https://youtube.com/@nexiumdarkrp" },
    ],
    music: { src: "assets/mgrd/music.mp3", title: "Akimbo", artist: "Ziak", volume: 0.75 },
    // Deux couleurs : elles teintent tous les styles
    colors: ["#a855f7", "#ff4d8d"],
  },
  {
    id: "coequipier",
    name: "Marlou",
    handle: "@marlou46",
    avatar: "assets/marlou/avatar.png",
    status: { text: "occupé", color: "#f59e0b" },
    bios: ["Gérant Staff", "J'organise, Je Pense"],
    description:
      "Yo ! Moi c'est Coéquipier.\nJe m'occupe des maps et du design de nos projets. Écris-moi si tu veux bosser avec nous.",
    interests: ["Staff", "Organisation", "Arma Reforger Forever", "FPS"],
    location: "France",
    timezone: "Europe/Paris",
    links: [
      { icon: "fa-brands fa-discord", label: "Discord", sub: "coequipier", url: "https://discord.com/users/SON_ID" },
      { icon: "fa-brands fa-youtube", label: "YouTube", sub: "ses vidéos", url: "https://youtube.com/@SON_PSEUDO" },
      { icon: "fa-brands fa-tiktok", label: "TikTok", sub: "ses clips", url: "https://tiktok.com/@SON_PSEUDO" },
    ],
    music: { src: "assets/marlou/music.mp3", title: "Titre", artist: "Artiste", volume: 0.35 },
    colors: ["#22d3ee", "#3b82f6"],
  },
];
