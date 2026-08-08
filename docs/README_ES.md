# ⚡ Microsoft Reward Automation (`v2.1.0`)

🌐 **Languages / 语言 / 언어 / 言語 / Idiomas**:  
[🇻🇳 Tiếng Việt](../README.md) | [🇬🇧 English](README_EN.md) | [🇨🇳 简体中文](README_ZH.md) | [🇰🇷 한국어](README_KO.md) | [🇯🇵 日本語](README_JA.md) | [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md) | [🇩🇪 Deutsch](README_DE.md) | [🇮🇹 Italiano](README_IT.md) | [🇧🇷 Português](README_PT.md) | [🇷🇺 Русский](README_RU.md) | [🇮🇳 हिंदी](README_HI.md)

---

> Extensión de navegador inteligente para la automatización de Microsoft Rewards en búsquedas de Bing Desktop. Cuenta con simulación de comportamiento humano anti-bot, generación de palabras clave únicas y programación en segundo plano con MV3.

![Version](https://img.shields.io/badge/Version-v2.1.0-blue?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-00F2FE?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Características Principales (Versión 1.0.0)

### 🖥️ Motor de Búsqueda Automática Desktop
* **Totalmente Automatizado**: Ejecuta automáticamente las búsquedas diarias configuradas en Bing Desktop (Por defecto: 30 búsquedas ~90 puntos de Rewards).
* **Gestión Inteligente de Pestañas**: Abre pestañas de búsqueda en segundo plano y las cierra automáticamente al finalizar.
* **Calculadora de Puntos en Tiempo Real**: Muestra el estimado de puntos ganados directamente en la interfaz Popup (+3 puntos por búsqueda exitosa).

### 🛡️ Bing Anti-Bot Humanizer Pro
* **Simulación Humana Realista**:
  * Desplazamiento suave en múltiples etapas (scroll hacia abajo, lectura, ligero desplazamiento hacia arriba).
  * Movimiento natural del cursor y simulación de cursor sobre enlaces o pestañas de filtro (Noticias, Imágenes, Mapas).
  * Selección y resaltado de texto aleatorio en los fragmentos de resultados.
  * Pausas y retardo configurable (Min/Max Delay) para evadir algoritmos de detección de bots.

### 📚 Generador Procedimental de Palabras Clave
* **Deduplicación de 2.000 Búsquedas**: Registra y verifica hasta 2.000 búsquedas recientes para garantizar que cada consulta sea única.
* **Banco de Conocimiento y Citas**: Genera millones de frases combinando citas filosóficas, ciencia, tecnología, historia y cultura global.
* **Palabras Clave Personalizadas**: Importa fácilmente tus propias listas de palabras clave desde el panel de opciones.

### ⏰ Programador Diario en Segundo Plano (MV3)
* **Alarmas de Service Worker MV3**: Utiliza `chrome.alarms` para despertar el Service Worker y ejecutar búsquedas en segundo plano a la hora exacta configurada.
* **Inicio Automático al Abrir el Navegador**: Opción para iniciar la búsqueda automáticamente al abrir Edge o Chrome si aún no se ha cumplido la meta diaria.

---

## 📦 Guía de Instalación (Microsoft Edge / Google Chrome)

1. **Descargar Código**:
   * Descarga el ZIP o ejecuta `git clone https://github.com/stevenquan4567/microsoft-reward-automation.git`

2. **Abrir la Página de Extensiones**:
   * **Microsoft Edge**: Visita `edge://extensions/`
   * **Google Chrome**: Visita `chrome://extensions/`

3. **Activar el Modo de Desarrollador**:
   * Activa el interruptor **Modo de desarrollador (Developer mode)**.

4. **Cargar Extensión Descomprimida**:
   * Haz clic en **Cargar descomprimida (Load unpacked)**.
   * Selecciona la carpeta del proyecto `microsoft-reward-automation`.

5. **¡Listo!** Ancla **MS Rewards Auto Search Pro ⚡** a la barra de herramientas de tu navegador.

---

## ⚖️ Licencia

Publicado bajo la licencia [MIT License](LICENSE). Este proyecto está destinado únicamente a fines educativos, de investigación y automatización personal del navegador.
