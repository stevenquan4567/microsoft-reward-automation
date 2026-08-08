# 🌐 Internationalization & Translation Guide (i18n)

Thank you for helping translate **Microsoft Reward Automation** into your language! We welcome contributions from supporters and developers around the world.

---

## 🚀 How to Add a New Language

Adding a new language takes less than 5 minutes!

### Step 1: Fork & Clone the Repository
```bash
git clone https://github.com/stevenquan4567/msr_automation.git
cd msr_automation
```

### Step 2: Add your language dictionary in `data/i18n.js`
Open [data/i18n.js](data/i18n.js) and add your language code object (e.g. `tr` for Turkish, `nl` for Dutch, `pl` for Polish):

```javascript
  tr: {
    app_title: "Microsoft Reward Automation",
    app_badge: "v2.1.0 Desktop",
    settings_tooltip: "Gelişmiş Ayarlar",
    dashboard_subtitle: "Kontrol Paneli ve Ayarlar",

    status_label: "Durum",
    status_ready: "Hazır",
    status_running: "Otomatik Aranıyor...",
    status_completed: "Bugün Tamamlandı!",

    desktop_searches_today: "Bugünkü Masaüstü Aramaları",
    points_earned: "Bugün Kazanılan Puanlar",
    points_unit: "puan",
    last_search: "Son arama:",
    no_search_yet: "Bugün henüz arama yapılmadı",

    btn_start_search: "MASAÜSTÜ ARAMASINI BAŞLAT",
    btn_stop_search: "ARAMAYI DURDUR",
    btn_donate_kofi: "☕ Ko-fi Destek Ol",
    btn_check_update: "🚀 Güncelle ve Yeniden Yükle",

    link_rewards_dashboard: "🎁 MS Rewards",
    link_bing_home: "🔍 Bing Ana Sayfa",
    link_github_project: "⭐ GitHub Projesi",

    tab_general: "Genel Ayarlar",
    tab_schedule: "Arka Plan Zamanlayıcı",
    tab_keywords: "Anahtar Kelime Bankası",
    tab_logs: "Arama Geçmişi",

    general_title: "⚙️ Otomasyon Ayarları",
    general_subtitle: "Günlük arama hedeflerini, gecikme aralıklarını ve anti-bot özelliklerini özelleştirin.",
    target_card_title: "🖥️ Masaüstü Arama Hedefi",
    target_label: "Günlük Masaüstü arama kotası:",
    target_help: "Varsayılan: 30 arama (~90 Rewards puanı)",
    
    delay_card_title: "⏳ Gecikme Aralığı (Saniye)",
    min_delay_label: "Min Gecikme:",
    max_delay_label: "Maks Gecikme:",
    delay_help: "Bot algılama algoritmalarını atlatmak için aramalar arasında rastgele bekleme.",

    advanced_card_title: "🛡️ Gelişmiş ve Anti-Bot Özellikleri",
    lang_card_title: "🌐 Uygulama Dili",
    lang_label: "Arayüz görüntüleme dilini seçin:",
    opt_run_on_startup: "🚀 Edge tarayıcısı açıldığında otomatik başlat",
    opt_auto_close: "Arama tamamlandığında Bing sekmesini otomatik kapat",
    opt_enable_humanizer: "İnsan Davranışı Pro (Çok aşamalı kaydırma, vurgulama)",
    opt_enable_notifications: "Aramalar tamamlandığında sistem bildirimi gönder",
    opt_enable_auto_update: "⚡ GitHub'dan otomatik güncelle ve uzantıyı yeniden yükle",
    
    btn_save_settings: "💾 Ayarları Kaydet",

    schedule_title: "⏰ Arka Plan Günlük Zamanlayıcı",
    schedule_subtitle: "Aramaları her gün istediğiniz saatte arka planda otomatik çalıştırın.",
    schedule_card_title: "Günlük Arka Plan Programı",
    schedule_toggle: "Günlük arka plan programını etkinleştir",
    schedule_time_label: "Çalışma saatini seçin (SS:DK):",
    btn_save_schedule: "💾 Programı Kaydet",

    keywords_title: "📚 Arama Kelime Bankası",
    keywords_subtitle: "Özel anahtar kelimelerinizi aşağıya ekleyebilirsiniz.",
    keywords_card_title: "Özel Anahtar Kelimeler (Her satıra bir tane)",
    keywords_placeholder: "Örnek:\nen son yapay zeka gelişmeleri 2026\nkuantum bilgisayarlar nasıl çalışır",
    btn_save_keywords: "💾 Kelimeleri Kaydet",
    btn_clear_keywords: "🗑️ Kelimeleri Temizle",

    logs_title: "📊 Son Arama Kayıtları",
    logs_subtitle: "Başarıyla yürütülen son Bing aramalarının listesi.",
    table_time: "Zaman",
    table_mode: "Mod",
    table_query: "Yürütülen Arama Sorgusu",
    no_logs: "Henüz arama kaydı yok.",

    toast_settings_saved: "💾 Ayarlar başarıyla kaydedildi!",
    toast_schedule_saved: "⏰ Arka plan programı kaydedildi!",
    toast_keywords_saved: "📚 Özel kelimeler kaydedildi!",
    toast_keywords_cleared: "🗑️ Özel kelimeler temizlendi.",
    toast_checking_update: "🚀 GitHub verileri senkronize ediliyor ve uzantı yeniden yükleniyor...",
    toast_up_to_date: "✨ Başarıyla güncellendi ve yeniden yüklendi! (v2.1.0)",
    toast_update_available: "🎉 Otomatik olarak güncellendi ve yeniden yüklendi!",
    notif_completed_title: "Microsoft Reward Automation",
    notif_completed_msg: "🎉 Bugünün tüm Bing masaüstü aramaları tamamlandı!"
  }
```

### Step 3: Add your language option to dropdowns
1. Open `popup/popup.html` and add your option inside `#popupLangSelect`:
```html
<option value="tr">🇹🇷 TR</option>
```
2. Open `options/options.html` and add your option inside `#appLanguage`:
```html
<option value="tr">🇹🇷 Türkçe (Turkish)</option>
```

### Step 4: Add documentation translation
Create a new file `docs/README_<LANG_CODE>.md` (e.g. `docs/README_TR.md`) and add your language flag to the navigation bar across all README files!

### Step 5: Submit a Pull Request (PR)
Push your changes to your fork and submit a PR on GitHub. Your translation will be merged and instantly made available to thousands of users worldwide!

---
❤️ **Thank you for making Microsoft Reward Automation accessible to everyone!**
