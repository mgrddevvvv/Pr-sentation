# Notre présentation

Le visiteur choisit **qui** il veut découvrir (toi ou ton coéquipier), puis **le style** de la page :
Néon, Bento, Terminal, Arcade, Minimal ou Vinyle. Chaque style a son écran d'entrée, la musique, le texte animé et les liens.

## Personnaliser
- `data/profiles.js` : **le seul fichier à modifier** — un bloc par personne (pseudo, description, liens, couleurs, musique…).
- `assets/moi/` et `assets/coequipier/` : mets `avatar.png` et `music.mp3` de chacun.
- Pour ajouter une personne : copie un bloc dans `profiles.js`, change son `id`, et crée `assets/<id>/`.

## Organisation
```
index.html, chooser.*   page d'accueil (choix de la personne puis du style)
data/                   profils et liste des styles
shared/                 code commun à tous les styles
themes/<style>/         un dossier par style
assets/<id>/            images et musique de chaque personne
```

## Liens directs
`themes/arcade/?p=coequipier` ouvre directement le style Arcade du coéquipier.

## Mettre en ligne sur GitHub Pages
1. Crée un dépôt (par ex. `TON_PSEUDO.github.io`).
2. Envoie le **contenu** de ce dossier à la racine du dépôt.
3. Dépôt → **Settings → Pages** → Source : `Deploy from a branch`, branche `main`, dossier `/ (root)`.
4. La page est en ligne après une minute environ.
