/**
 * MS Rewards Auto Search Pro - Options Dashboard Controller
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

  // Load existing settings
  await loadSettings();

  // Button Listeners
  document.getElementById('btnSaveSettings').addEventListener('click', saveGeneralSettings);
  document.getElementById('btnSaveSchedule').addEventListener('click', saveScheduleSettings);
  document.getElementById('btnSaveKeywords').addEventListener('click', saveKeywords);
  document.getElementById('btnClearKeywords').addEventListener('click', clearKeywords);

  async function loadSettings() {
    const data = await chrome.storage.local.get([
      'desktopTarget', 'minDelay', 'maxDelay',
      'runOnStartup', 'autoCloseTab', 'enableHumanizer', 'enableNotifications',
      'enableSchedule', 'scheduledTime', 'customKeywords', 'logs'
    ]);

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
    const dTarget = Math.max(1, parseInt(desktopTarget.value) || 30);
    const minD = Math.max(1, parseInt(minDelay.value) || 3);
    const maxD = Math.max(minD, parseInt(maxDelay.value) || 6);

    await chrome.storage.local.set({
      desktopTarget: dTarget,
      minDelay: minD,
      maxDelay: maxD,
      runOnStartup: runOnStartup.checked,
      autoCloseTab: autoCloseTab.checked,
      enableHumanizer: enableHumanizer.checked,
      enableNotifications: enableNotifications.checked
    });

    showToast('💾 Lưu cài đặt tự động thành công!');
  }

  async function saveScheduleSettings() {
    const isEnabled = enableSchedule.checked;
    const timeVal = scheduledTime.value || "09:00";

    await chrome.storage.local.set({
      enableSchedule: isEnabled,
      scheduledTime: timeVal
    });

    // Notify service worker to create or clear alarm
    try {
      chrome.runtime.sendMessage({
        action: 'updateSchedule',
        enable: isEnabled,
        time: timeVal
      }, () => {
        if (chrome.runtime.lastError) { /* ignore */ }
      });
    } catch (e) {}

    showToast('⏰ Lưu lịch chạy ngầm thành công!');
  }

  async function saveKeywords() {
    const text = customKeywordsText.value || '';
    const keywordsList = text
      .split('\n')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    await chrome.storage.local.set({ customKeywords: keywordsList });
    showToast(`📚 Đã lưu ${keywordsList.length} từ khóa tùy chỉnh!`);
  }

  async function clearKeywords() {
    customKeywordsText.value = '';
    await chrome.storage.local.set({ customKeywords: [] });
    showToast('🗑️ Đã xóa bộ từ khóa tùy chỉnh. Extension sẽ dùng từ khóa mặc định.');
  }

  function renderLogs(logs) {
    if (!logs || logs.length === 0) {
      logsTableBody.innerHTML = '<tr><td colspan="3" class="text-center">Chưa có nhật ký nào.</td></tr>';
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

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  }
});
