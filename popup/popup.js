/**
 * Microsoft Reward Automation - Popup Controller Script (v2.1.0 Desktop)
 * Supports i18n (11 global languages, default: 'en')
 */

document.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const popupLangSelect = document.getElementById('popupLangSelect');
  const btnOptions = document.getElementById('btnOptions');
  const btnStart = document.getElementById('btnStart');
  const btnStop = document.getElementById('btnStop');
  const btnCheckUpdate = document.getElementById('btnCheckUpdate');
  const toast = document.getElementById('toast');

  const statusPill = document.getElementById('statusPill');
  const statusText = document.getElementById('statusText');
  const progressCount = document.getElementById('progressCount');
  const progressPercent = document.getElementById('progressPercent');
  const progressCircle = document.getElementById('progressCircle');

  const desktopStats = document.getElementById('desktopStats');
  const pointsEarned = document.getElementById('pointsEarned');
  const tickerText = document.getElementById('tickerText');

  const CIRCUMFERENCE = 2 * Math.PI * 54; // 339.29

  function safeSendMessage(msg, callback) {
    try {
      chrome.runtime.sendMessage(msg, (res) => {
        if (chrome.runtime.lastError) {}
        if (callback) callback(res);
      });
    } catch (e) {}
  }

  // Language Change Event
  popupLangSelect.addEventListener('change', async () => {
    const newLang = popupLangSelect.value;
    await chrome.storage.local.set({ appLanguage: newLang });
    updateUI();
  });

  // Event Listeners
  btnOptions.addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options/options.html'));
    }
  });

  btnStart.addEventListener('click', () => triggerStart());
  btnStop.addEventListener('click', triggerStop);
  if (btnCheckUpdate) {
    btnCheckUpdate.addEventListener('click', autoUpdateAndReload);
  }

  // Storage listener for real-time UI updates
  chrome.storage.onChanged.addListener(() => {
    updateUI();
  });

  // Initial UI refresh and safety polling
  updateUI();
  setInterval(updateUI, 2000);

  function triggerStart() {
    safeSendMessage({ action: 'start', mode: 'desktop' }, () => {
      updateUI();
    });
  }

  function triggerStop() {
    safeSendMessage({ action: 'stop' }, () => {
      updateUI();
    });
  }

  async function autoUpdateAndReload() {
    const data = await chrome.storage.local.get(['appLanguage']);
    const lang = data.appLanguage || 'en';
    const dict = (typeof I18N !== 'undefined' && I18N[lang]) ? I18N[lang] : I18N['en'];

    showToast(dict.toast_checking_update);

    safeSendMessage({ action: 'autoUpdateAndReload' }, (res) => {
      showToast(dict.toast_up_to_date);
    });
  }

  async function updateUI() {
    const data = await chrome.storage.local.get([
      'isRunning', 'isOfflinePaused', 'currentCount', 'targetCount',
      'desktopCompletedToday', 'desktopTarget', 'logs', 'appLanguage', 'maxPointsCap'
    ]);

    const lang = data.appLanguage || 'en';
    const dict = getDict(lang);

    popupLangSelect.value = lang;

    // Update static i18n text labels
    applyTranslationDict(dict);

    const isRunning = !!data.isRunning;
    const isOfflinePaused = !!data.isOfflinePaused;
    const currentCount = data.currentCount || 0;
    const targetCount = data.targetCount || data.desktopTarget || 30;

    // Update Status Pill & Controls
    if (isOfflinePaused) {
      statusPill.className = 'status-pill offline';
      statusText.textContent = dict.status_offline_paused || '📶 Waiting for Internet...';
      btnStart.classList.add('hidden');
      btnStop.classList.remove('hidden');
    } else if (isRunning) {
      statusPill.className = 'status-pill running';
      statusText.textContent = dict.status_running;
      btnStart.classList.add('hidden');
      btnStop.classList.remove('hidden');
    } else {
      statusPill.className = 'status-pill idle';
      statusText.textContent = dict.status_ready;
      btnStart.classList.remove('hidden');
      btnStop.classList.add('hidden');
    }

    // Update Progress Ring
    progressCount.textContent = `${currentCount}/${targetCount}`;
    const percent = targetCount > 0 ? Math.min(100, Math.round((currentCount / targetCount) * 100)) : 0;
    progressPercent.textContent = `${percent}%`;

    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    progressCircle.style.strokeDashoffset = offset;

    // Update Stats & Estimated Points (+3 pts per desktop search, capped at maxPointsCap)
    const deskDone = data.desktopCompletedToday || 0;
    const deskGoal = data.desktopTarget || 30;
    const maxCap = data.maxPointsCap || 90;

    const rawPoints = deskDone * 3;
    const estPoints = Math.min(maxCap, rawPoints);
    const isMaxReached = rawPoints >= maxCap;

    desktopStats.textContent = `${deskDone}/${deskGoal}`;

    const maxBadge = dict.points_max_badge || 'MAX';
    if (isMaxReached) {
      pointsEarned.textContent = `+${estPoints} ${dict.points_unit} (${maxBadge})`;
      pointsEarned.style.color = '#38ef7d';
    } else {
      pointsEarned.textContent = `+${estPoints} / ${maxCap} ${dict.points_unit}`;
      pointsEarned.style.color = '#f8fafc';
    }

    // Update Ticker
    const logs = data.logs || [];
    if (logs.length > 0) {
      tickerText.textContent = `"${logs[0].query}"`;
    } else {
      tickerText.textContent = dict.no_search_yet;
    }
  }

  function applyTranslationDict(dict) {
    const setElem = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setElem('i18n_app_title', dict.app_title);
    setElem('i18n_app_badge', dict.app_badge);
    setElem('i18n_status_label', dict.status_label);
    setElem('i18n_desktop_searches_today', dict.desktop_searches_today);
    setElem('i18n_points_earned', dict.points_earned);
    setElem('i18n_btn_start_search', dict.btn_start_search);
    setElem('i18n_btn_stop_search', dict.btn_stop_search);
    setElem('i18n_btn_donate_kofi', dict.btn_donate_kofi);
    setElem('i18n_btn_check_update', dict.btn_check_update);
    setElem('i18n_link_rewards_dashboard', dict.link_rewards_dashboard);
    setElem('i18n_link_bing_home', dict.link_bing_home);
    setElem('i18n_link_github_project', dict.link_github_project);
    setElem('i18n_last_search', dict.last_search);
    
    if (btnOptions) btnOptions.title = dict.settings_tooltip;
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2800);
  }
});
