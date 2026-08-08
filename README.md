# ⚡ Microsoft Reward Automation (`v2.1.0`)

🌐 **Languages / 语言 / 언어 / 言語 / Idiomas**:  
[🇻🇳 Tiếng Việt](README.md) | [🇬🇧 English](docs/README_EN.md) | [🇨🇳 简体中文](docs/README_ZH.md) | [🇰🇷 한국어](docs/README_KO.md) | [🇯🇵 日本語](docs/README_JA.md) | [🇪🇸 Español](docs/README_ES.md) | [🇫🇷 Français](docs/README_FR.md) | [🇩🇪 Deutsch](docs/README_DE.md) | [🇮🇹 Italiano](docs/README_IT.md) | [🇧🇷 Português](docs/README_PT.md) | [🇷🇺 Русский](docs/README_RU.md)

---

> Extension tự động cày điểm Microsoft Rewards thông minh trên Bing Desktop, né thuật toán phát hiện bot, hỗ trợ ngân hàng từ khóa phong phú, lên lịch ngầm hàng ngày và tự động kiểm tra cập nhật.

[![Version](https://img.shields.io/badge/Version-v2.1.0-blue?style=for-the-badge)](#)
[![Manifest](https://img.shields.io/badge/Manifest-V3-00F2FE?style=for-the-badge)](#)
[![Ko-fi](https://img.shields.io/badge/Donate-Ko--fi-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/stevenquan45)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#)

---

## 🌐 Community Translations / Đóng góp Ngôn ngữ

Bạn muốn đóng góp bản dịch ngôn ngữ mới hoặc cải thiện bản dịch có sẵn?  
👉 Xem hướng dẫn chi tiết tại **[TRANSLATIONS.md](TRANSLATIONS.md)** và **[CONTRIBUTING.md](CONTRIBUTING.md)**. Quá trình thêm ngôn ngữ mới chỉ mất 5 phút!

---

## 🌟 Tính Năng Nổi Bật (Version 1.0.0)

### 🖥️ Desktop Auto Search Engine
* **Tự động hóa hoàn toàn**: Tự động thực hiện số lượt tìm kiếm Bing Desktop được cài đặt hàng ngày (Mặc định: 30 lượt ~90 điểm Rewards).
* **Tự động mở & đóng tab**: Tự động khởi tạo tab tìm kiếm Bing ngầm và tự động đóng tab sau khi hoàn tất lượt tìm kiếm.
* **Tính toán điểm thưởng realtime**: Hiển thị ước tính điểm Rewards nhận được ngay trên giao diện Popup (+3 điểm / lượt search thành công).

### 🛡️ Bing Anti-Bot Humanizer Pro
* **Giả lập hành vi người thật**:
  * Cuộn trang mượt ngẫu nhiên nhiều giai đoạn (Scroll down, đọc kết quả, cuộn nhẹ ngược lên).
  * Tự động di chuyển con trỏ chuột & hover lên các tiêu đề tìm kiếm organic hoặc các tab Bing (Tin tức, Hình ảnh, Bản đồ).
  * Giả lập bôi đen (text highlight) trích dẫn ngẫu nhiên trên trang kết quả.
  * Khoảng nghỉ ngẫu nhiên (Min/Max Delay) giữa các lượt tìm kiếm để né thuật toán bot detection của Microsoft.

### 📚 Procedural Keyword Generator
* **Chống trùng lặp 2.000 từ khóa**: Thuật toán tự động lưu và kiểm tra lịch sử 2.000 truy vấn gần nhất để đảm bảo mỗi lượt tìm kiếm đều là duy nhất.
* **Ngân hàng trích dẫn & triết học**: Tự động tạo hàng triệu truy vấn tự nhiên kết hợp danh ngôn, khoa học, công nghệ, lịch sử, văn hóa Việt Nam và thế giới.
* **Hỗ trợ từ khóa cá nhân**: Dễ dàng thêm danh sách từ khóa tùy chỉnh của riêng bạn.

### ⏰ Lên Lịch Chạy Ngầm Hàng Ngày
* **MV3 Service Worker Alarms**: Sử dụng `chrome.alarms` chạy ngầm chuẩn Manifest V3, tự động wakeup service worker và khởi chạy tìm kiếm đúng khung giờ bạn cài đặt hàng ngày mà không sợ bị trôi lịch.
* **Khởi chạy khi mở trình duyệt**: Tùy chọn tự động cày điểm ngay khi mở trình duyệt Edge nếu hôm nay chưa hoàn thành target.

---

## 📦 Hướng Dẫn Cài Đặt (Microsoft Edge / Google Chrome)

1. **Tải mã nguồn dự án**:
   * Tải về hoặc `git clone` kho lưu trữ này về máy của bạn.

2. **Mở trang quản lý Extension**:
   * **Microsoft Edge**: Truy cập `edge://extensions/`
   * **Google Chrome**: Truy cập `chrome://extensions/`

3. **Bật Chế độ dành cho nhà phát triển (Developer Mode)**:
   * Bật công tắc **Developer Mode** ở góc trên cùng bên trái (hoặc bên phải).

4. **Tải tiện ích đã giải nén (Load Unpacked)**:
   * Nhấn nút **Load unpacked** (Tải tiện ích đã giải nén).
   * Chọn thư mục dự án `microsoft-reward-automation`.

5. **Hoàn tất!** Biểu tượng **MS Rewards Auto Search Pro ⚡** sẽ xuất hiện trên thanh công cụ trình duyệt.

---

## ⚙️ Hướng Dẫn Sử Dụng

### Giao Diện Popup
* Click vào icon extension ⚡ trên thanh công cụ.
* Nhấn **🚀 BẮT ĐẦU TÌM KIẾM DESKTOP** để chạy ngay lập tức.
* Theo dõi tiến trình qua **Vòng tròn Radial Progress**, **Số điểm ước tính** và **Dòng chữ lần tìm ngẫu nhiên gần nhất**.

### Giao Diện Cài Đặt (Options)
* Click biểu tượng ⚙️ trên Popup hoặc chuột phải vào Icon Extension -> **Cài đặt**.
* Tùy chỉnh:
  * Số lượt tìm kiếm Desktop target hàng ngày.
  * Khoảng thời gian nghỉ ngẫu nhiên Min / Max delay (giây).
  * Bật/tắt tự động cuộn trang, thông báo hệ thống, tự động chạy khi mở Edge.
  * Đặt khung giờ chạy ngầm tự động hàng ngày.
  * Thêm/xóa danh sách từ khóa cá nhân.

---

## 📜 Cấu Trúc Dự Án

```text
microsoft-reward-automation/
├── manifest.json            # Cấu hình Extension Manifest V3
├── background/
│   └── service_worker.js    # Core background engine & MV3 alarms
├── content/
│   └── bing_humanizer.js    # Bing anti-bot human simulator script
├── popup/
│   ├── popup.html           # Dashboard Popup UI
│   ├── popup.js             # Controller tương tác Popup
│   └── popup.css            # Style giao diện mượt mà & hiện đại
├── options/
│   ├── options.html         # Trang cài đặt tùy chỉnh
│   ├── options.js           # Controller cài đặt & lưu storage
│   └── options.css          # Style trang Options
├── data/
│   ├── default_keywords.json # Bộ từ khóa mẫu đa chủ đề
│   └── quotes_bank.json     # Ngân hàng trích dẫn triết học & khoa học
└── assets/                  # Icons tiện ích (16px, 48px, 128px)
```

---

## ⚖️ Giấy Phép & Tuyên Bố Miễn Trừ Trách Nhiệm

Phát hành theo giấy phép [MIT License](LICENSE). Dự án phục vụ mục đích học tập, nghiên cứu và tự động hóa trình duyệt cá nhân.
