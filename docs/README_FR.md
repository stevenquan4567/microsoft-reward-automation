# ⚡ Microsoft Reward Automation (`v2.2.0`)

🌐 **Languages / 语言 / 언어 / 言語 / Idiomas**:  
[🇻🇳 Tiếng Việt](../README.md) | [🇬🇧 English](README_EN.md) | [🇨🇳 简体中文](README_ZH.md) | [🇰🇷 한국어](README_KO.md) | [🇯🇵 日本語](README_JA.md) | [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md) | [🇩🇪 Deutsch](README_DE.md) | [🇮🇹 Italiano](README_IT.md) | [🇧🇷 Português](README_PT.md) | [🇷🇺 Русский](README_RU.md) | [🇮🇳 हिंदी](README_HI.md)

---

> Extension de navigateur intelligente pour l'automatisation de Microsoft Rewards sur Bing Desktop. Simulation de comportement humain anti-bot, génération procédurale de mots-clés uniques et planification quotidienne en arrière-plan avec MV3.

![Version](https://img.shields.io/badge/Version-v2.2.0-blue?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-00F2FE?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Fonctionnalités Principales (Version 1.0.0)

### 🖥️ Moteur de Recherche Automatique Desktop
* **Entièrement Automatisé** : Exécute automatiquement vos recherches Bing Desktop quotidiennes (Par défaut : 30 recherches ~90 points Rewards).
* **Gestion Intelligente des Onglets** : Ouvre les onglets en arrière-plan et les ferme automatiquement une fois la recherche terminée.
* **Calculateur de Points en Temps Réel** : Affiche une estimation en temps réel des points gagnés directement sur le Popup (+3 pts / recherche réussie).

### 🛡️ Bing Anti-Bot Humanizer Pro
* **Simulation Humaine Réaliste** :
  * Défilement fluide en plusieurs étapes (scroll vers le bas, lecture des résultats, léger défilement vers le haut).
  * Mouvement naturel de la souris et survol des liens de résultats ou des onglets Bing (Actualités, Images, Cartes).
  * Sélection et surbrillance aléatoire de texte sur les extraits de résultats.
  * Délais aléatoires configurables (Min/Max Delay) pour contourner les algorithmes de détection de bots.

### 📚 Générateur Procédural de Mots-Clés
* **Dédoublonnage sur 2 000 Recherches** : Suit et vérifie les 2 000 dernières recherches pour s'assurer que chaque requête est unique.
* **Banque de Citations et de Connaissances** : Génère des millions de requêtes combinant citations philosophiques, science, technologie, histoire et culture mondiale.
* **Mots-Clés Personnalisés** : Importez facilement vos propres listes de mots-clés via la page d'options.

### ⏰ Planificateur Quotidien en Arrière-plan (MV3)
* **Alarmes Service Worker MV3** : Utilise `chrome.alarms` pour réveiller le Service Worker et exécuter les recherches à l'heure exacte configurée.
* **Démarrage Automatique du Navigateur** : Option pour démarrer automatiquement si l'objectif du jour n'est pas encore atteint.

---

## 📦 Guide d'Installation (Microsoft Edge / Google Chrome)

1. **Télécharger le Code** :
   * Téléchargez le fichier ZIP ou exécutez `git clone https://github.com/stevenquan4567/microsoft-reward-automation.git`

2. **Ouvrir la Page des Extensions** :
   * **Microsoft Edge** : Allez sur `edge://extensions/`
   * **Google Chrome** : Allez sur `chrome://extensions/`

3. **Activer le Mode Développeur** :
   * Activez le commutateur **Mode développeur (Developer mode)**.

4. **Charger l'Extension Non Paquetée** :
   * Cliquez sur **Charger l'extension non paquetée (Load unpacked)**.
   * Sélectionnez le dossier du projet `microsoft-reward-automation`.

5. **Terminé !** Épinglez **MS Rewards Auto Search Pro ⚡** à la barre d'outils de votre navigateur.

---

## ⚖️ Licence

Publié sous la licence [MIT License](LICENSE). Ce projet est destiné exclusivement à des fins d'apprentissage, de recherche et d'automatisation personnelle du navigateur.
