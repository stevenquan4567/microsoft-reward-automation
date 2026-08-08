/**
 * Microsoft Reward Automation - Options Dashboard Controller
 * Supports i18n (Default: English 'en', Supported: 'en', 'vi')
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Navigation tabs
  const navItems = document.querySelectorAll('.nav-item');
  const tabPages = document.querySelectorAll('.tab-page');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.dataset.tab;
      navItems.forEach(n => n.classList.remove('active'));
      tabPages.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(`tab-${tabId}`).classList.add('active');
    });
  });

  // Inputs
  const appLanguageSelect = document.getElementById('appLanguage');
  const desktopTarget = document.getElementById('desktopTarget');
  const minDelay = document.getElementById('minDelay');
  const maxDelay = document.getElementById('maxDelay');
  const runOnStartup = document.getElementById('runOnStartup');
  const autoCloseTab = document.getElementById('autoCloseTab');
  const enableHumanizer = document.getElementById('enableHumanizer');
  const enableNotifications = document.getElementById('enableNotifications');

  const enableSchedule = document.getElementById('enableSchedule');
  const scheduledTime = document.getElementById('scheduledTime');

  const customKeywordsText = document.getElementById('customKeywordsText');
  const logsTableBody = document.getElementById('logsTableBody');
  const toast = document.getElementById('toast');

  let currentLang = 'en';

  // Load existing settings
  await loadSettings();

  // Language Change Event
  appLanguageSelect.addEventListener('change', async () => {
    currentLang = appLanguageSelect.value;
    await chrome.storage.local.set({ appLanguage: currentLang });
    applyI18n(currentLang);
  });

  // Button Listeners
  document.getElementById('btnSaveSettings').addEventListener('click', saveGeneralSettings);
  document.getElementById('btnSaveSchedule').addEventListener('click', saveScheduleSettings);
  document.getElementById('btnSaveKeywords').addEventListener('click', saveKeywords);
  document.getElementById('btnClearKeywords').addEventListener('click', clearKeywords);

  async function loadSettings() {
    const data = await chrome.storage.local.get([
      'appLanguage', 'desktopTarget', 'minDelay', 'maxDelay',
      'runOnStartup', 'autoCloseTab', 'enableHumanizer', 'enableNotifications',
      'enableSchedule', 'scheduledTime', 'customKeywords', 'logs'
    ]);

    currentLang = data.appLanguage || 'en';
    appLanguageSelect.value = currentLang;
    applyI18n(currentLang);

    if (data.desktopTarget !== undefined) desktopTarget.value = data.desktopTarget;
    if (data.minDelay !== undefined) minDelay.value = data.minDelay;
    if (data.maxDelay !== undefined) maxDelay.value = data.maxDelay;

    runOnStartup.checked = data.runOnStartup !== false;
    autoCloseTab.checked = data.autoCloseTab !== false;
    enableHumanizer.checked = data.enableHumanizer !== false;
    enableNotifications.checked = data.enableNotifications !== false;

    enableSchedule.checked = !!data.enableSchedule;
    if (data.scheduledTime) scheduledTime.value = data.scheduledTime;

    if (data.customKeywords && Array.isArray(data.customKeywords)) {
      customKeywordsText.value = data.customKeywords.join('\n');
    }

    renderLogs(data.logs || []);
  }

  async function saveGeneralSettings() {
    const lang = appLanguageSelect.value || 'en';
    const dTarget = Math.max(1, parseInt(desktopTarget.value) || 30);
    const minD = Math.max(1, parseInt(minDelay.value) || 3);
    const maxD = Math.max(minD, parseInt(maxDelay.value) || 6);

    await chrome.storage.local.set({
      appLanguage: lang,
      desktopTarget: dTarget,
      minDelay: minD,
      maxDelay: maxD,
      runOnStartup: runOnStartup.checked,
      autoCloseTab: autoCloseTab.checked,
      enableHumanizer: enableHumanizer.checked,
      enableNotifications: enableNotifications.checked
    });

    const dict = getDict(lang);
    showToast(dict.toast_settings_saved);
  }

  async function saveScheduleSettings() {
    const isEnabled = enableSchedule.checked;
    const timeVal = scheduledTime.value || "09:00";

    await chrome.storage.local.set({
      enableSchedule: isEnabled,
      scheduledTime: timeVal
    });

    try {
      chrome.runtime.sendMessage({
        action: 'updateSchedule',
        enable: isEnabled,
        time: timeVal
      }, () => {
        if (chrome.runtime.lastError) {}
      });
    } catch (e) {}

    const dict = getDict(currentLang);
    showToast(dict.toast_schedule_saved);
  }

  async function saveKeywords() {
    const text = customKeywordsText.value || '';
    const keywordsList = text
      .split('\n')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    await chrome.storage.local.set({ customKeywords: keywordsList });
    const dict = getDict(currentLang);
    showToast(dict.toast_keywords_saved);
  }

  async function clearKeywords() {
    customKeywordsText.value = '';
    await chrome.storage.local.set({ customKeywords: [] });
    const dict = getDict(currentLang);
    showToast(dict.toast_keywords_cleared);
  }

  function renderLogs(logs) {
    const dict = getDict(currentLang);
    if (!logs || logs.length === 0) {
      logsTableBody.innerHTML = `<tr><td colspan="3" class="text-center">${dict.no_logs}</td></tr>`;
      return;
    }

    logsTableBody.innerHTML = logs.map(log => `
      <tr>
        <td style="color: #94a3b8; font-size: 11px;">${log.time}</td>
        <td>
          <span style="padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; background: rgba(59,130,246,0.2); color: #60a5fa;">
            ${(log.mode || 'DESKTOP').toUpperCase()}
          </span>
        </td>
        <td style="font-weight: 600;">${log.query}</td>
      </tr>
    `).join('');
  }

  function getDict(lang) {
    return (typeof I18N !== 'undefined' && I18N[lang]) ? I18N[lang] : I18N['en'];
  }

  function applyI18n(lang) {
    const dict = getDict(lang);
    const setElem = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    const setHTML = (id, html) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    };

    document.title = `${dict.general_title.replace('⚙️ ', '')} - Microsoft Reward Automation`;

    setElem('i18n_app_title', dict.app_title);
    setElem('i18n_dashboard_subtitle', dict.dashboard_subtitle);
    setHTML('i18n_tab_general', `<span>⚙️</span> ${dict.tab_general}`);
    setHTML('i18n_tab_schedule', `<span>⏰</span> ${dict.tab_schedule}`);
    setHTML('i18n_tab_keywords', `<span>📚</span> ${dict.tab_keywords}`);
    setHTML('i18n_tab_logs', `<span>📊</span> ${dict.tab_logs}`);
    setElem('i18n_link_rewards_dashboard', dict.link_rewards_dashboard);

    setElem('i18n_general_title', dict.general_title);
    setElem('i18n_general_subtitle', dict.general_subtitle);
    setElem('i18n_target_card_title', dict.target_card_title);
    setElem('i18n_target_label', dict.target_label);
    setElem('i18n_target_help', dict.target_help);

    setElem('i18n_delay_card_title', dict.delay_card_title);
    setElem('i18n_min_delay_label', dict.min_delay_label);
    setElem('i18n_max_delay_label', dict.max_delay_label);
    setElem('i18n_delay_help', dict.delay_help);

    setElem('i18n_advanced_card_title', dict.advanced_card_title);
    setElem('i18n_lang_label', dict.lang_label);
    setElem('i18n_opt_run_on_startup', dict.opt_run_on_startup);
    setElem('i18n_opt_auto_close', dict.opt_auto_close);
    setElem('i18n_opt_enable_humanizer', dict.opt_enable_humanizer);
    setElem('i18n_opt_enable_notifications', dict.opt_enable_notifications);
    setElem('btnSaveSettings', dict.btn_save_settings);

    setElem('i18n_schedule_title', dict.schedule_title);
    setElem('i18n_schedule_subtitle', dict.schedule_subtitle);
    setElem('i18n_schedule_toggle', dict.schedule_toggle);
    setElem('i18n_schedule_time_label', dict.schedule_time_label);
    setElem('btnSaveSchedule', dict.btn_save_schedule);

    setElem('i18n_keywords_title', dict.keywords_title);
    setElem('i18n_keywords_subtitle', dict.keywords_subtitle);
    setElem('i18n_keywords_card_title', dict.keywords_card_title);
    if (customKeywordsText) customKeywordsText.placeholder = dict.keywords_placeholder;
    setElem('btnSaveKeywords', dict.btn_save_keywords);
    setElem('btnClearKeywords', dict.btn_clear_keywords);

    setElem('i18n_logs_title', dict.logs_title);
    setElem('i18n_logs_subtitle', dict.logs_subtitle);
    setElem('i18n_table_time', dict.table_time);
    setElem('i18n_table_mode', dict.table_mode);
    setElem('i18n_table_query', dict.table_query);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  }
});
