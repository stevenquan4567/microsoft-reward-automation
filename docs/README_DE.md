# ⚡ Microsoft Reward Automation (`v2.1.0`)

🌐 **Languages / 语言 / 언어 / 言語 / Idiomas**:  
[🇻🇳 Tiếng Việt](../README.md) | [🇬🇧 English](README_EN.md) | [🇨🇳 简体中文](README_ZH.md) | [🇰🇷 한국어](README_KO.md) | [🇯🇵 日本語](README_JA.md) | [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md) | [🇩🇪 Deutsch](README_DE.md) | [🇮🇹 Italiano](README_IT.md) | [🇧🇷 Português](README_PT.md) | [🇷🇺 Русский](README_RU.md)

---

> Intelligente Browser-Erweiterung zur Microsoft Rewards Automatisierung für Bing Desktop-Suchanfragen. Mit Anti-Bot-Simulation menschlichen Verhaltens, prozeduraler Generierung von eindeutigen Schlüsselwörtern und MV3-Hintergrund-Tagesplanung.

![Version](https://img.shields.io/badge/Version-v2.1.0-blue?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-00F2FE?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Hauptmerkmale (Version 1.0.0)

### 🖥️ Desktop Auto-Suchmaschine
* **Vollautomatisch**: Führt Ihre konfigurierten täglichen Bing-Desktop-Suchanfragen automatisch aus (Standard: 30 Suchanfragen ~90 Rewards-Punkte).
* **Intelligentes Tab-Management**: Öffnet Such-Tabs im Hintergrund und schließt sie nach Abschluss automatisch.
* **Echtzeit-Punkte-Rechner**: Zeigt geschätzte gesammelte Punkte direkt im Popup-Interface an (+3 Punkte pro erfolgreicher Suche).

### 🛡️ Bing Anti-Bot Humanizer Pro
* **Realistische menschliche Simulation**:
  * Sanftes Scrollen in mehreren Phasen (nach unten scrollen, Ergebnisse lesen, leicht nach oben scrollen).
  * Natürliche Mausbewegungen und Schweben über Suchergebnissen oder Bing-Filter-Tabs (News, Bilder, Karten).
  * Zufällige Textauswahl und Hervorhebung auf Ergebnisseiten.
  * Einstellbare zufällige Verzögerungszeiten (Min/Max Delay) zur Umgehung von Bot-Erkennungsalgorithmen.

### 📚 Prozeduraler Keyword-Generator
* **Duplikatsprüfung für 2.000 Suchanfragen**: Speichert und überprüft die letzten 2.000 Suchbegriffe, um sicherzustellen, dass jede Suche einzigartig ist.
* **Zitate- & Wissensdatenbank**: Generiert Millionen natürlicher Suchbegriffe aus Philosophie, Wissenschaft, Technologie, Geschichte und Weltkultur.
* **Eigene Schlüsselwörter**: Importieren Sie ganz einfach Ihre eigenen Keyword-Listen über die Einstellungen.

### ⏰ MV3 Hintergrund-Tagesplaner
* **MV3 Service Worker Alarme**: Nutzt `chrome.alarms`, um den Service Worker im Hintergrund zur exakten Wunschzeit zu wecken und die Suchen auszuführen.
* **Automatischer Start beim Browserstart**: Optionale Einstellung zum automatischen Starten bei der Öffnung von Edge/Chrome, falls das Tagesziel noch nicht erreicht wurde.

---

## 📦 Installationsanleitung (Microsoft Edge / Google Chrome)

1. **Code herunterladen**:
   * ZIP herunterladen oder `git clone https://github.com/stevenquan4567/msr_automation.git` ausführen

2. **Erweiterungsseite öffnen**:
   * **Microsoft Edge**: Navigieren Sie zu `edge://extensions/`
   * **Google Chrome**: Navigieren Sie zu `chrome://extensions/`

3. **Entwicklermodus aktivieren**:
   * Schalten Sie den Schalter **Entwicklermodus (Developer mode)** ein.

4. **Entpackte Erweiterung laden**:
   * Klicken Sie auf **Entpackte Erweiterung laden (Load unpacked)**.
   * Wählen Sie den Ordner `msr_automation` aus.

5. **Fertig!** Heftet **MS Rewards Auto Search Pro ⚡** an Ihre Browser-Symbolleiste an.

---

## ⚖️ Lizenz

Veröffentlicht unter der [MIT-Lizenz](LICENSE). Dieses Projekt dient ausschließlich zu Lern-, Forschungs- und persönlichen Browser-Automatisierungszwecken.
