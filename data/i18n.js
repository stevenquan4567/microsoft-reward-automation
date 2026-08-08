/**
 * Microsoft Reward Automation - Internationalization (i18n) Dictionary
 * Default language: English ('en')
 * Supported languages: English ('en'), Vietnamese ('vi')
 */

const I18N = {
  en: {
    // Header & Brand
    app_title: "Microsoft Reward Automation",
    app_badge: "v2.0 Desktop",
    settings_tooltip: "Advanced Settings",
    dashboard_subtitle: "Dashboard & Settings",

    // Status
    status_label: "Status",
    status_ready: "Ready",
    status_running: "Auto Searching...",
    status_completed: "Completed Today!",

    // Quick Stats
    desktop_searches_today: "Desktop Searches Today",
    points_earned: "Points Earned Today",
    points_unit: "pts",
    last_search: "Last search:",
    no_search_yet: "No searches run today",

    // Controls
    btn_start_search: "START DESKTOP SEARCH",
    btn_stop_search: "STOP SEARCH",

    // Links
    link_rewards_dashboard: "🎁 MS Rewards Dashboard",
    link_bing_home: "🔍 Bing Home",

    // Options Navigation Tabs
    tab_general: "General Settings",
    tab_schedule: "Background Schedule",
    tab_keywords: "Keyword Bank",
    tab_logs: "Search History",

    // Options - General Tab
    general_title: "⚙️ Automation Settings",
    general_subtitle: "Customize daily search targets, random delay intervals, and anti-bot features.",
    target_card_title: "🖥️ Desktop Search Target",
    target_label: "Daily Desktop search quota:",
    target_help: "Default: 30 searches (~90 Rewards points)",
    
    delay_card_title: "⏳ Delay Interval (Seconds)",
    min_delay_label: "Min Delay:",
    max_delay_label: "Max Delay:",
    delay_help: "Random delay between searches to bypass bot detection algorithms.",

    advanced_card_title: "🛡️ Advanced & Anti-Bot Features",
    lang_label: "🌐 Application Interface Language:",
    opt_run_on_startup: "🚀 Auto-start searches when opening Edge browser (if today's target is not complete)",
    opt_auto_close: "Auto-close Bing search tab upon completion",
    opt_enable_humanizer: "Human Anti-Bot Simulation Pro (Multi-stage scrolling, hover & text highlight)",
    opt_enable_notifications: "Send system notification when daily searches complete",
    
    btn_save_settings: "💾 Save Settings",

    // Options - Schedule Tab
    schedule_title: "⏰ Background Daily Scheduler",
    schedule_subtitle: "Automatically run Bing searches in the background daily at your preferred time.",
    schedule_toggle: "Enable background daily schedule",
    schedule_time_label: "Select daily background run time (HH:MM):",
    btn_save_schedule: "💾 Save Schedule",

    // Options - Keywords Tab
    keywords_title: "📚 Search Keyword Bank",
    keywords_subtitle: "By default, the extension generates thousands of unique queries across philosophy, science, history, and tech. Add custom keywords below.",
    keywords_card_title: "Custom Keywords (One per line)",
    keywords_placeholder: "Example:\nlatest AI breakthroughs 2026\nhow quantum computing works\nbest open source dev tools",
    btn_save_keywords: "💾 Save Custom Keywords",
    btn_clear_keywords: "🗑️ Clear Custom Keywords",

    // Options - Logs Tab
    logs_title: "📊 Recent Search Logs",
    logs_subtitle: "List of recent successfully executed Bing search queries.",
    table_time: "Time",
    table_mode: "Mode",
    table_query: "Executed Search Query",
    no_logs: "No search logs available yet.",

    // Notifications & Toasts
    toast_settings_saved: "💾 Settings saved successfully!",
    toast_schedule_saved: "⏰ Background schedule saved!",
    toast_keywords_saved: "📚 Saved custom keywords!",
    toast_keywords_cleared: "🗑️ Cleared custom keywords list.",
    notif_completed_title: "Microsoft Reward Automation",
    notif_completed_msg: "🎉 Completed all Bing Desktop searches for today!"
  },

  vi: {
    // Header & Brand
    app_title: "Microsoft Reward Automation",
    app_badge: "v2.0 Desktop",
    settings_tooltip: "Cài đặt nâng cao",
    dashboard_subtitle: "Dashboard & Cài đặt",

    // Status
    status_label: "Trạng thái",
    status_ready: "Sẵn sàng",
    status_running: "Đang tự động tìm kiếm...",
    status_completed: "Đã hoàn thành hôm nay!",

    // Quick Stats
    desktop_searches_today: "Desktop Tìm Kiếm Hôm Nay",
    points_earned: "Điểm Nhận Được Hôm Nay",
    points_unit: "điểm",
    last_search: "Lần tìm gần nhất:",
    no_search_yet: "Chưa chạy lần nào hôm nay",

    // Controls
    btn_start_search: "BẮT ĐẦU TÌM KIẾM DESKTOP",
    btn_stop_search: "TẠM DỪNG TÌM KIẾM",

    // Links
    link_rewards_dashboard: "🎁 MS Rewards Dashboard",
    link_bing_home: "🔍 Bing Home",

    // Options Navigation Tabs
    tab_general: "Cài đặt chung",
    tab_schedule: "Lên lịch ngầm",
    tab_keywords: "Ngân hàng từ khóa",
    tab_logs: "Lịch sử tìm kiếm",

    // Options - General Tab
    general_title: "⚙️ Cài đặt tự động hóa",
    general_subtitle: "Tùy chỉnh số lượng lượt tìm kiếm, khoảng thời gian delay và cơ chế né bot.",
    target_card_title: "🖥️ Target Tìm Kiếm Desktop",
    target_label: "Số lượt tìm kiếm Desktop hàng ngày:",
    target_help: "Mặc định: 30 lượt (~90 điểm Rewards)",
    
    delay_card_title: "⏳ Khoảng Thời Gian Delay (Giây)",
    min_delay_label: "Tối thiểu (Min Delay):",
    max_delay_label: "Tối đa (Max Delay):",
    delay_help: "Thời gian nghỉ ngẫu nhiên giữa các lần search để né thuật toán bot detection.",

    advanced_card_title: "🛡️ Tính Năng Nâng Cao & Anti-Bot",
    lang_label: "🌐 Ngôn ngữ giao diện ứng dụng:",
    opt_run_on_startup: "🚀 Tự động cày điểm ngay mỗi khi mở trình duyệt Edge (nếu hôm nay chưa xong)",
    opt_auto_close: "Tự động đóng tab Bing sau khi hoàn thành lượt tìm kiếm",
    opt_enable_humanizer: "Giả lập hành vi người thật Pro (Tự động cuộn trang, hover kết quả & bôi đen text Bing)",
    opt_enable_notifications: "Gửi thông báo hệ thống khi cày điểm hoàn tất",
    
    btn_save_settings: "💾 Lưu Cài Đặt",

    // Options - Schedule Tab
    schedule_title: "⏰ Lên lịch cày ngầm tự động",
    schedule_subtitle: "Tự động khởi chạy tìm kiếm Bing hàng ngày vào khung giờ bạn mong muốn mà không cần bấm thủ công.",
    schedule_toggle: "Bật tự động cày điểm theo lịch hàng ngày",
    schedule_time_label: "Chọn khung giờ chạy ngầm hàng daily (Giờ:Phút):",
    btn_save_schedule: "💾 Lưu Lịch Chạy",

    // Options - Keywords Tab
    keywords_title: "📚 Ngân hàng từ khóa tìm kiếm",
    keywords_subtitle: "Mặc định Extension sử dụng hơn 100+ từ khóa phong phú đa chủ đề. Bạn có thể thêm từ khóa cá nhân của riêng mình bên dưới.",
    keywords_card_title: "Từ khóa tùy chỉnh (Mỗi từ 1 dòng)",
    keywords_placeholder: "Ví dụ:\ntin tức công nghệ mới nhất\ncách làm bánh pizza hải sản\nlịch thi đấu bóng đá hôm nay",
    btn_save_keywords: "💾 Lưu Danh Sách Từ Khóa",
    btn_clear_keywords: "🗑️ Xóa Từ Khóa Cá Nhân",

    // Options - Logs Tab
    logs_title: "📊 Nhật ký tìm kiếm gần đây",
    logs_subtitle: "Danh sách các từ khóa đã được tìm kiếm thành công gần đây.",
    table_time: "Thời gian",
    table_mode: "Chế độ",
    table_query: "Từ khóa đã tìm kiếm",
    no_logs: "Chưa có lịch sử tìm kiếm nào.",

    // Notifications & Toasts
    toast_settings_saved: "💾 Lưu cài đặt tự động thành công!",
    toast_schedule_saved: "⏰ Lưu lịch chạy ngầm thành công!",
    toast_keywords_saved: "📚 Đã lưu từ khóa tùy chỉnh!",
    toast_keywords_cleared: "🗑️ Đã xóa bộ từ khóa tùy chỉnh.",
    notif_completed_title: "Microsoft Reward Automation",
    notif_completed_msg: "🎉 Đã hoàn thành toàn bộ lượt tìm kiếm Bing Desktop hôm nay!"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18N;
}
