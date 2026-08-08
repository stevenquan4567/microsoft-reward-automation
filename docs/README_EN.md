# ⚡ Microsoft Reward Automation (`v1.0.0`)

🌐 **Languages / 语言 / 언어 / 言語 / Idiomas**:  
[🇻🇳 Tiếng Việt](../README.md) | [🇬🇧 English](README_EN.md) | [🇨🇳 简体中文](README_ZH.md) | [🇰🇷 한국어](README_KO.md) | [🇯🇵 日本語](README_JA.md) | [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md) | [🇩🇪 Deutsch](README_DE.md)

---

> Smart Microsoft Rewards automation browser extension for Bing Desktop search. Features anti-bot human behavior simulation, procedural unique keyword generation, and MV3 background daily scheduling.

![Version](https://img.shields.io/badge/Version-v1.0.0-blue?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-00F2FE?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Key Features (Version 1.0.0)

### 🖥️ Desktop Auto Search Engine
* **Fully Automated**: Automatically performs your configured daily Bing Desktop searches (Default: 30 searches ~90 Rewards points).
* **Smart Tab Lifecycle**: Automatically creates background Bing search tabs and closes them upon completion.
* **Real-time Point Estimator**: Displays real-time estimated earned Rewards points right inside the Popup UI (+3 pts / successful search).

### 🛡️ Bing Anti-Bot Humanizer Pro
* **Realistic Human Simulation**:
  * Multi-stage smooth scrolling (scroll down, read results, slight scroll back up).
  * Natural mouse movement & hover over organic search results or Bing filter tabs (News, Images, Maps).
  * Random text selection & highlighting simulation on result snippets.
  * Configurable random delay (Min/Max Delay) between searches to bypass bot detection algorithms.

### 📚 Procedural Keyword Generator
* **2,000-Query Deduplication**: Automatically tracks and verifies history for up to 2,000 recent queries to ensure every search is unique.
* **Procedural Quotes & Knowledge Bank**: Generates millions of natural search queries combining philosophy quotes, science, tech, history, and global culture.
* **Custom Keyword Support**: Easily import your own custom keyword list via Options dashboard.

### ⏰ MV3 Background Daily Scheduler
* **MV3 Service Worker Alarms**: Built with `chrome.alarms` to ensure service worker wakes up reliably and executes background daily searches on your exact scheduled time.
* **Browser Startup Auto-Run**: Optional setting to auto-start daily searches upon browser startup if today's quota is not yet completed.

---

## 📦 Installation Guide (Microsoft Edge / Google Chrome)

1. **Download Code**:
   * Download ZIP or run `git clone https://github.com/stevenquan4567/msr_automation.git`

2. **Open Extensions Page**:
   * **Microsoft Edge**: Navigate to `edge://extensions/`
   * **Google Chrome**: Navigate to `chrome://extensions/`

3. **Enable Developer Mode**:
   * Toggle the **Developer mode** switch in the top corner.

4. **Load Unpacked Extension**:
   * Click **Load unpacked**.
   * Select the `msr_automation` project directory.

5. **Done!** Pin **MS Rewards Auto Search Pro ⚡** to your browser toolbar.

---

## ⚙️ How to Use

### Popup Interface
* Click the extension icon ⚡ on the toolbar.
* Click **🚀 START DESKTOP SEARCH** to run immediately.
* Monitor progress with the **Radial Progress Ring**, **Estimated Points Counter**, and **Live Query Ticker**.

### Options Dashboard
* Right-click extension icon -> **Options** (or click ⚙️ in Popup).
* Customize:
  * Daily Desktop target count.
  * Min/Max random delay intervals (seconds).
  * Anti-bot humanizer, system notifications, and startup auto-run toggles.
  * Daily background schedule execution time.
  * Personal custom keyword bank.

---

## 📜 Project Structure

```text
msr_automation/
├── manifest.json            # Extension Manifest V3 configuration
├── background/
│   └── service_worker.js    # Core background engine & MV3 alarms
├── content/
│   └── bing_humanizer.js    # Bing anti-bot human simulator script
├── popup/
│   ├── popup.html           # Dashboard Popup UI
│   ├── popup.js             # Popup controller logic
│   └── popup.css            # Sleek dark-mode styling
├── options/
│   ├── options.html         # Custom options dashboard
│   ├── options.js           # Storage controller & settings handler
│   └── options.css          # Options page styling
├── data/
│   ├── default_keywords.json # Topic keyword bank
│   └── quotes_bank.json     # Quotes & wisdom database
└── assets/                  # Extension icons (16px, 48px, 128px)
```

---

## ⚖️ License & Disclaimer

Released under the [MIT License](LICENSE). This project is intended for educational, research, and personal browser automation purposes only.
