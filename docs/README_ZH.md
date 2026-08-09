# ⚡ Microsoft Reward Automation (`v2.2.1`)

🌐 **Languages / 语言 / 언어 / 言語 / Idiomas**:  
[🇻🇳 Tiếng Việt](../README.md) | [🇬🇧 English](README_EN.md) | [🇨🇳 简体中文](README_ZH.md) | [🇰🇷 한국어](README_KO.md) | [🇯🇵 日本語](README_JA.md) | [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md) | [🇩🇪 Deutsch](README_DE.md) | [🇮🇹 Italiano](README_IT.md) | [🇧🇷 Português](README_PT.md) | [🇷🇺 Русский](README_RU.md) | [🇮🇳 हिंदी](README_HI.md)

---

> 智能 Microsoft Rewards 自动搜索浏览器扩展（适用于 Bing Desktop）。具备高级防封人脸行为模拟、程序化不重复关键词生成以及 MV3 后台定时调度功能。

![Version](https://img.shields.io/badge/Version-v2.2.1-blue?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-00F2FE?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 核心功能 (Version 1.0.0)

### 🖥️ Desktop 自动搜索引擎
* **全自动运行**：自动执行每日设置的 Bing 桌面搜索次数（默认：30 次，约 90 积分）。
* **智能标签页管理**：自动后台创建 Bing 搜索标签页并在完成后自动关闭。
* **实时积分估算**：在 Popup 界面实时显示本次已赚取的估算积分（每成功搜索 1 次 +3 分）。

### 🛡️ Bing 防封真人模拟器 Pro (Humanizer)
* **逼真真人行为模拟**：
  * 多阶段平滑滚动（向下滚动、阅读结果、微向上回滚）。
  * 自然鼠标移动与悬停（自动悬停在搜索结果标题或 Bing 导航标签上，如新闻、图片、地图）。
  * 随机选中文本与高亮模拟。
  * 可配置的随机间隔延迟（Min/Max Delay），轻松绕过 Bing 机器人检测机制。

### 📚 程序化关键词生成器
* **2,000 条历史去重**：自动记录并校验最近 2,000 条搜索词，确保每次搜索关键词绝不重复。
* **名言与知识库引擎**：组合哲学名言、科学、技术、历史及全球文化，生成数百万条自然的搜索语句。
* **自定义关键词支持**：可通过设置界面导入您自己的个性化关键词列表。

### ⏰ MV3 后台每日定时任务
* **MV3 Service Worker 警报**：采用 `chrome.alarms` 架构，确保 Service Worker 在后台精准唤醒并按时执行每日任务。
* **开机自动运行**：可选设置，若当天未完成搜索目标，将在打开 Edge/Chrome 浏览器时自动启动。

---

## 📦 安装指南 (Microsoft Edge / Google Chrome)

1. **下载源码**：
   * 下载 ZIP 包或运行 `git clone https://github.com/stevenquan4567/microsoft-reward-automation.git`

2. **打开扩展管理页面**：
   * **Microsoft Edge**：访问 `edge://extensions/`
   * **Google Chrome**：访问 `chrome://extensions/`

3. **开启开发者模式**：
   * 开启右上角（或左上角）的 **开发者模式 (Developer Mode)** 开关。

4. **加载已解压的扩展**：
   * 点击 **加载已解压的扩展程序 (Load unpacked)**。
   * 选择 `microsoft-reward-automation` 项目目录。

5. **完成！** 将 **MS Rewards Auto Search Pro ⚡** 固定到浏览器工具栏即可使用。

---

## ⚙️ 使用说明

### Popup 快捷界面
* 点击工具栏上的扩展图标 ⚡。
* 点击 **🚀 开始 Desktop 搜索** 立即运行。
* 观察 **环形进度条**、**估算积分** 和 **最新搜索词**。

### Options 设置 Dashboard
* 右键扩展图标 -> **选项**（或点击 Popup 中的 ⚙️）。
* 自定义设置：
  * 每日 Desktop 搜索目标次数。
  * 搜索随机延迟范围 Min/Max（秒）。
  * 防封模拟、系统通知及开机自启开关。
  * 每日后台定时运行时间。
  * 个人自定义关键词库。

---

## ⚖️ 许可协议

基于 [MIT License](LICENSE) 开源。本项目仅供学习交流及个人浏览器自动化研究使用。
