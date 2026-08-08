/**
 * MS Rewards Auto Search Pro - Popup Controller Script (v2.0 Desktop)
 */

document.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const btnOptions = document.getElementById('btnOptions');
  const btnStart = document.getElementById('btnStart');
  const btnStop = document.getElementById('btnStop');

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

  async function updateUI() {
    const data = await chrome.storage.local.get([
      'isRunning', 'currentCount', 'targetCount',
      'desktopCompletedToday', 'desktopTarget', 'logs'
    ]);

    const isRunning = !!data.isRunning;
    const currentCount = data.currentCount || 0;
    const targetCount = data.targetCount || data.desktopTarget || 30;

    // Update Status Pill & Controls
    if (isRunning) {
      statusPill.className = 'status-pill running';
      statusText.textContent = 'Đang tự động tìm kiếm...';
      btnStart.classList.add('hidden');
      btnStop.classList.remove('hidden');
    } else {
      statusPill.className = 'status-pill idle';
      statusText.textContent = 'Sẵn sàng';
      btnStart.classList.remove('hidden');
      btnStop.classList.add('hidden');
    }

    // Update Progress Ring
    progressCount.textContent = `${currentCount}/${targetCount}`;
    const percent = targetCount > 0 ? Math.min(100, Math.round((currentCount / targetCount) * 100)) : 0;
    progressPercent.textContent = `${percent}%`;

    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
    progressCircle.style.strokeDashoffset = offset;

    // Update Stats & Estimated Points (+3 pts per desktop search)
    const deskDone = data.desktopCompletedToday || 0;
    const deskGoal = data.desktopTarget || 30;
    const estPoints = deskDone * 3;

    desktopStats.textContent = `${deskDone}/${deskGoal}`;
    pointsEarned.textContent = `+${estPoints} điểm`;

    // Update Ticker
    const logs = data.logs || [];
    if (logs.length > 0) {
      tickerText.textContent = `"${logs[0].query}"`;
    } else {
      tickerText.textContent = 'Chưa chạy lần nào hôm nay';
    }
  }
});
