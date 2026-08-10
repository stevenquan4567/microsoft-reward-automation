# ⚡ Microsoft Reward Automation (`v2.3.0`)

🌐 **Languages / 语言 / 언어 / 言語 / Idiomas**:  
[🇻🇳 Tiếng Việt](../README.md) | [🇬🇧 English](README_EN.md) | [🇨🇳 简体中文](README_ZH.md) | [🇰🇷 한국어](README_KO.md) | [🇯🇵 日本語](README_JA.md) | [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md) | [🇩🇪 Deutsch](README_DE.md) | [🇮🇹 Italiano](README_IT.md) | [🇧🇷 Português](README_PT.md) | [🇷🇺 Русский](README_RU.md) | [🇮🇳 हिंदी](README_HI.md)

---

> Bing Desktop検索用のスマート Microsoft Rewards 自動化ブラウザ拡張機能。Bot検知回避の人間行動シミュレーション、手続き型重複なしキーワード生成、MV3バックグラウンド定期実行機能を搭載。

![Version](https://img.shields.io/badge/Version-v2.3.0-blue?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-00F2FE?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 主な機能 (Version 1.0.0)

### 🖥️ デスクトップ自動検索エンジン
* **完全自動化**: 設定された毎日の Bing デスクトップ検索を自動的に実行します（デフォルト: 30回検索、約90リワードポイント）。
* **スマートタブ管理**: バックグラウンドで Bing 検索タブを自動生成し、検索完了後に自動で閉じます。
* **リアルタイム獲得ポイント計算**: Popup画面で獲得予定の予想ポイントをリアルタイム表示します（検索成功1回につき +3pt）。

### 🛡️ Bing Bot対策ヒューマナイザー Pro (Humanizer)
* **リアルな人間行動のシミュレーション**:
  * 多段階スムーズスクロール（下へスクロール、結果閲覧、少し上へ戻る）。
  * 自然なマウス移動＆オーガニック検索結果やBingタブ（ニュース、画像、地図）のホバー。
  * 検索結果テキストの選択・ハイライトシミュレーション。
  * 設定可能なランダム遅延時間（Min/Max Delay）でBot検知アルゴリズムを回避。

### 📚 手続き型キーワード生成エンジン
* **2,000件の履歴重複排除**: 直近2,000件の検索履歴を自動チェックし、すべての検索ワードが重複しないよう保証します。
* **名言＆知識データベース**: 哲学の名言、科学、技術、歴史、世界の文化を組み合わせ、数百万通りの自然な検索クエリを生成します。
* **カスタムキーワード対応**: オプション画面から自分好みのキーワードリストを自由に追加可能。

### ⏰ MV3 バックグラウンド日次スケジューラー
* **MV3 Service Worker Alarms**: `chrome.alarms` を採用し、Service Workerがバックグラウンドで指定時間に正確に起動して検索を実行します。
* **ブラウザ起動時自動実行**: 当日の目標未達成時、Edge/Chromeブラウザ起動時に自動で検索を開始するオプション。

---

## 📦 インストール方法 (Microsoft Edge / Google Chrome)

1. **ソースコードのダウンロード**:
   * ZIPをダウンロードするか `git clone https://github.com/stevenquan4567/microsoft-reward-automation.git` を実行

2. **拡張機能管理ページを開く**:
   * **Microsoft Edge**: `edge://extensions/` にアクセス
   * **Google Chrome**: `chrome://extensions/` にアクセス

3. **デベロッパーモードを有効化**:
   * 右上の **デベロッパーモード (Developer mode)** スイッチをオン。

4. **パッケージ化されていない拡張機能を読み込む**:
   * **パッケージ化されていない拡張機能を読み込む (Load unpacked)** をクリック。
   * `microsoft-reward-automation` フォルダを選択。

5. **完了！** ツールバーに **MS Rewards Auto Search Pro ⚡** をピン留めしてください。

---

## ⚖️ ライセンス

[MIT License](LICENSE) のもとで公開されています。本プロジェクトは学習・研究および個人ブラウザ自動化目的専用です。
