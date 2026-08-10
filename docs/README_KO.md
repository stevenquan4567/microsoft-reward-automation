# ⚡ Microsoft Reward Automation (`v2.3.0`)

🌐 **Languages / 语言 / 언어 / 言語 / Idiomas**:  
[🇻🇳 Tiếng Việt](../README.md) | [🇬🇧 English](README_EN.md) | [🇨🇳 简体中文](README_ZH.md) | [🇰🇷 한국어](README_KO.md) | [🇯🇵 日本語](README_JA.md) | [🇪🇸 Español](README_ES.md) | [🇫🇷 Français](README_FR.md) | [🇩🇪 Deutsch](README_DE.md) | [🇮🇹 Italiano](README_IT.md) | [🇧🇷 Português](README_PT.md) | [🇷🇺 Русский](README_RU.md) | [🇮🇳 हिंदी](README_HI.md)

---

> Bing Desktop 검색을 위한 스마트 Microsoft Rewards 자동화 브라우저 확장 프로그램. 봇 탐지 방지 인간 행동 시뮬레이션, 절차적 고유 키워드 생성 및 MV3 백그라운드 일일 스케줄링 지원.

![Version](https://img.shields.io/badge/Version-v2.3.0-blue?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-00F2FE?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 주요 기능 (Version 1.0.0)

### 🖥️ 데스크톱 자동 검색 엔진
* **완전 자동화**: 설정된 일일 Bing 데스크톱 검색을 자동으로 수행합니다 (기본값: 30회 검색 ~90 리워드 포인트).
* **스마트 탭 관리**: 백그라운드 Bing 검색 탭을 자동으로 생성하고 완료 시 자동으로 닫습니다.
* **실시간 포인트 획득 계산기**: 팝업 UI에서 예상 획득 포인트를 실시간으로 표시합니다 (검색 성공 1회당 +3점).

### 🛡️ Bing 봇 방지 휴머니저 Pro (Humanizer)
* **리얼한 인간 행동 시뮬레이션**:
  * 다단계 부드러운 스크롤 (아래로 스크롤, 결과 읽기, 살짝 위로 다시 스크롤).
  * 자연스러운 마우스 이동 및 오가닉 검색 결과/Bing 탭 (뉴스, 이미지, 지도) 호버ing.
  * 검색 결과 텍스트 드래그 및 하이라이트 시뮬레이션.
  * 봇 탐지 알고리즘을 우회하기 위한 설정 가능한 임의 지연 시간 (최소/최대 지연).

### 📚 절차적 키워드 생성기
* **2,000개 키워드 중복 제거**: 최근 2,000개 검색어 기록을 자동으로 추적하여 모든 검색어가 유일하도록 보장합니다.
* **명언 및 지식 데이터베이스**: 철학 명언, 과학, 기술, 역사 및 글로벌 문화를 조합하여 수백만 개의 자연스러운 검색어를 생성합니다.
* **사용자 지정 키워드 지원**: 옵션 페이지에서 자신만의 키워드 목록을 쉽게 추가할 수 있습니다.

### ⏰ MV3 백그라운드 일일 스케줄러
* **MV3 Service Worker Alarms**: `chrome.alarms` 방식을 채택하여 서비스 워커가 백그라운드에서 정확한 지정 시간에 깨어나 검색을 수행합니다.
* **브라우저 시작 시 자동 실행**: 오늘 목표를 달성하지 못한 경우 브라우저 실행 시 자동으로 검색을 시작하는 옵션을 지원합니다.

---

## 📦 설치 방법 (Microsoft Edge / Google Chrome)

1. **소스 코드 다운로드**:
   * ZIP 다운로드 또는 `git clone https://github.com/stevenquan4567/microsoft-reward-automation.git` 실행

2. **확장 프로그램 페이지 열기**:
   * **Microsoft Edge**: `edge://extensions/` 접속
   * **Google Chrome**: `chrome://extensions/` 접속

3. **개발자 모드 활성화**:
   * 오른쪽 상단의 **개발자 모드 (Developer mode)** 스위치를 켭니다.

4. **압축 해제된 확장 프로그램 로드**:
   * **압축 해제된 확장 프로그램을 로드합니다 (Load unpacked)** 버튼 클릭.
   * `microsoft-reward-automation` 프로젝트 폴더 선택.

5. **완료!** 브라우저 툴바에 **MS Rewards Auto Search Pro ⚡** 아이콘을 고정합니다.

---

## ⚙️ 사용 설명

### 팝업 (Popup) UI
* 툴바의 확장 프로그램 아이콘 ⚡ 클릭.
* **🚀 데스크톱 검색 시작** 버튼 클릭하여 즉시 실행.
* **원형 진행률 링**, **예상 포인트**, **최근 검색어** 확인.

### 옵션 (Options) 설정
* 아이콘 우클릭 -> **옵션** (또는 팝업 내 ⚙️ 클릭).
* 설정 항목:
  * 일일 데스크톱 목표 검색 수.
  * 최소/최대 임의 지연 시간 (초).
  * 봇 방지 휴머니저, 알림, 브라우저 시작 시 자동 실행 설정.
  * 일일 백그라운드 자동 실행 시간 설정.
  * 사용자 지정 키워드 목록 관리.

---

## ⚖️ 라이선스

[MIT License](LICENSE)에 따라 배포됩니다. 본 프로젝트는 학습 및 개인 브라우저 자동화 연구 목적 전용입니다.
