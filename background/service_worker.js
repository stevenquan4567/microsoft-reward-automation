/**
 * Microsoft Reward Automation - Service Worker (Background)
 * Core automation engine handling desktop search queues, MV3 alarms, state management & anti-bot scheduling.
 *
 * ARCHITECTURE: Uses chrome.alarms (NOT setTimeout) so the service worker can sleep safely.
 * Full state is persisted to chrome.storage.local.
 */

const ALARM_NEXT_SEARCH = 'next_search';
const ALARM_DAILY_SCHEDULE = 'daily_msr_schedule';

// ─────────────────────────────────────────────────────────────
// STATE HELPERS
// ─────────────────────────────────────────────────────────────

async function getState() {
  const s = await chrome.storage.local.get([
    'isRunning', 'currentMode', 'currentCount', 'targetCount', 'activeTabId',
    'minDelay', 'maxDelay', 'desktopTarget'
  ]);
  return {
    isRunning: !!s.isRunning,
    mode: s.currentMode || 'desktop',
    currentCount: s.currentCount || 0,
    targetCount: s.targetCount || s.desktopTarget || 30,
    activeTabId: s.activeTabId || null,
    minDelay: Math.max(1, s.minDelay || 3),
    maxDelay: Math.max(1, s.maxDelay || 6),
    desktopTarget: s.desktopTarget || 30
  };
}

async function saveState(patch) {
  const mapped = {};
  if (patch.isRunning !== undefined) mapped.isRunning = patch.isRunning;
  if (patch.mode !== undefined) mapped.currentMode = patch.mode;
  if (patch.currentCount !== undefined) mapped.currentCount = patch.currentCount;
  if (patch.targetCount !== undefined) mapped.targetCount = patch.targetCount;
  if (patch.activeTabId !== undefined) mapped.activeTabId = patch.activeTabId;
  await chrome.storage.local.set(mapped);
}

// ─────────────────────────────────────────────────────────────
// INSTALLATION & STARTUP HANDLERS
// ─────────────────────────────────────────────────────────────

chrome.runtime.onInstalled.addListener(async () => {
  console.log('[MSR Pro] Service worker installed.');
  const existing = await chrome.storage.local.get(null);

  const defaults = {
    desktopTarget: 30,
    minDelay: 3,
    maxDelay: 6,
    autoCloseTab: true,
    enableHumanizer: true,
    enableNotifications: true,
    runOnStartup: true,
    scheduledTime: '09:00',
    enableSchedule: false,
    desktopCompletedToday: 0,
    lastRunDate: new Date().toLocaleDateString(),
    logs: [],
    customKeywords: [],
    usedQueriesHistory: [],
    isRunning: false,
    activeTabId: null
  };

  for (const [key, value] of Object.entries(defaults)) {
    if (existing[key] === undefined) {
      await chrome.storage.local.set({ [key]: value });
    }
  }
});

chrome.runtime.onStartup.addListener(async () => {
  console.log('[MSR Pro] Browser startup event triggered.');

  // Reset stale state from previous session
  const prev = await chrome.storage.local.get(['isRunning']);
  if (prev.isRunning) {
    console.log('[MSR Pro] Clearing stale isRunning state from previous session.');
    await chrome.storage.local.set({ isRunning: false, activeTabId: null });
    await chrome.alarms.clear(ALARM_NEXT_SEARCH);
  }

  await checkAndRunOnStartup();
});

async function checkAndRunOnStartup() {
  const data = await chrome.storage.local.get([
    'runOnStartup', 'isRunning', 'lastRunDate',
    'desktopCompletedToday', 'desktopTarget'
  ]);

  if (data.runOnStartup === false || data.isRunning) {
    console.log('[MSR Pro] Startup auto-run skipped.');
    return;
  }

  const todayStr = new Date().toLocaleDateString();
  const dDone = (data.lastRunDate === todayStr) ? (data.desktopCompletedToday || 0) : 0;
  const dTarget = data.desktopTarget || 30;

  if (dDone >= dTarget) {
    console.log('[MSR Pro] Startup auto-run skipped (Already completed today).');
    return;
  }

  console.log('[MSR Pro] Auto-starting search in 5s...');
  chrome.alarms.create('startup_delay', { delayInMinutes: 5 / 60 });
}

// ─────────────────────────────────────────────────────────────
// ALARM DISPATCHER
// ─────────────────────────────────────────────────────────────

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log('[MSR Pro] Alarm fired:', alarm.name);

  if (alarm.name === ALARM_NEXT_SEARCH) {
    const st = await getState();
    if (!st.isRunning) {
      console.log('[MSR Pro] next_search alarm fired but isRunning=false. Ignoring.');
      return;
    }
    await executeNextSearch(st);

  } else if (alarm.name === 'startup_delay') {
    await startAutomation('desktop');

  } else if (alarm.name === ALARM_DAILY_SCHEDULE) {
    console.log('[MSR Pro] Daily schedule alarm triggered.');
    const settings = await chrome.storage.local.get(['enableSchedule', 'isRunning']);
    if (settings.enableSchedule && !settings.isRunning) {
      startAutomation('desktop');
    }
  }
});

// ─────────────────────────────────────────────────────────────
// PROCEDURAL KEYWORD ENGINE
// ─────────────────────────────────────────────────────────────

let quotesBankData = null;

async function loadQuotesBank() {
  if (quotesBankData) return quotesBankData;
  try {
    const res = await fetch(chrome.runtime.getURL('data/quotes_bank.json'));
    quotesBankData = await res.json();
  } catch (e) {
    console.error('[MSR Pro] Error loading quotes bank:', e);
    quotesBankData = {
      authors_and_thinkers: ['Albert Einstein', 'Marcus Aurelius', 'Seneca', 'Mark Twain', 'Socrates'],
      topics_and_concepts: ['wisdom and knowledge', 'courage and bravery', 'happiness and inner peace', 'technology and the future'],
      snippets: ['be the change that you wish to see in the world', 'I think therefore I am'],
      templates: ['famous quotes about {topics_and_concepts} by {authors_and_thinkers}', '{authors_and_thinkers} inspiring quote on {topics_and_concepts}']
    };
  }
  return quotesBankData;
}

async function generateProceduralQuoteQuery() {
  const bank = await loadQuotesBank();
  const templates = bank.templates || ['famous quotes about {topics_and_concepts} by {authors_and_thinkers}'];
  let query = templates[Math.floor(Math.random() * templates.length)];

  const getRandom = (arr) => (arr && arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : '');

  const authors = bank.authors_and_thinkers || ["Albert Einstein"];
  const topics = bank.topics_and_concepts || ["wisdom and knowledge"];
  const snippets = bank.snippets || ["be the change that you wish to see in the world"];

  query = query
    .replace('{authors_and_thinkers}', () => getRandom(authors))
    .replace('{author}', () => getRandom(authors))
    .replace('{topics_and_concepts}', () => getRandom(topics))
    .replace('{topic}', () => getRandom(topics))
    .replace('{snippets}', () => getRandom(snippets))
    .replace('{snippet}', () => getRandom(snippets))
    .replace('{tech_and_programming}', () => getRandom(bank.tech_and_programming))
    .replace('{science_and_cosmos}', () => getRandom(bank.science_and_cosmos))
    .replace('{history_and_civilizations}', () => getRandom(bank.history_and_civilizations))
    .replace('{geography_and_cities}', () => getRandom(bank.geography_and_cities))
    .replace('{nature_and_wildlife}', () => getRandom(bank.nature_and_wildlife))
    .replace('{cuisine_and_cooking}', () => getRandom(bank.cuisine_and_cooking));

  const modifiers = bank.modifiers || ['', 'full analysis', 'meaning explained', 'historical context', 'deep dive'];
  const mod = getRandom(modifiers);
  if (mod) query += ` ${mod}`;

  return query;
}

async function getNextKeyword() {
  const store = await chrome.storage.local.get(['customKeywords', 'usedQueriesHistory']);
  const custom = store.customKeywords || [];
  const usedHistory = new Set(store.usedQueriesHistory || []);

  let candidateQuery = '';
  let attempts = 0;

  while (attempts < 20) {
    attempts++;
    if (custom.length > 0 && Math.random() < 0.35) {
      candidateQuery = custom[Math.floor(Math.random() * custom.length)];
    } else {
      candidateQuery = await generateProceduralQuoteQuery();
    }
    if (!usedHistory.has(candidateQuery.toLowerCase())) break;
  }

  usedHistory.add(candidateQuery.toLowerCase());
  const updatedHistoryList = Array.from(usedHistory).slice(-2000);
  await chrome.storage.local.set({ usedQueriesHistory: updatedHistoryList });

  console.log(`[MSR Pro] Unique Search Query #${usedHistory.size}: "${candidateQuery}"`);
  return candidateQuery;
}

// ─────────────────────────────────────────────────────────────
// SEARCH AUTOMATION ENGINE
// ─────────────────────────────────────────────────────────────

async function startAutomation(mode = 'desktop') {
  await chrome.alarms.clear(ALARM_NEXT_SEARCH);

  const settings = await chrome.storage.local.get(['desktopTarget']);
  const targetCount = settings.desktopTarget || 30;

  await chrome.storage.local.set({
    isRunning: true,
    currentMode: 'desktop',
    currentCount: 0,
    targetCount: targetCount,
    activeTabId: null
  });

  console.log(`[MSR Pro] Starting Desktop Auto Search: target=${targetCount}`);

  try {
    const tab = await chrome.tabs.create({ url: 'https://www.bing.com', active: false });
    await chrome.storage.local.set({ activeTabId: tab.id });
  } catch (err) {
    console.error('[MSR Pro] Error creating search tab:', err);
  }

  const st = await getState();
  await executeNextSearch(st);
}

async function executeNextSearch(st) {
  if (!st) st = await getState();
  if (!st.isRunning) return;

  const minDelay = st.minDelay;
  const maxDelay = Math.max(minDelay, st.maxDelay);

  // Completion Check
  if (st.currentCount >= st.targetCount) {
    console.log('[MSR Pro] Desktop search target reached. Stopping...');
    await stopAutomation(true);
    return;
  }

  // Generate keyword and navigate
  const keyword = await getNextKeyword();
  const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(keyword)}&FORM=QBLH`;

  const newCount = st.currentCount + 1;
  await saveState({ currentCount: newCount });

  // Update daily stats and logs
  const dateKey = new Date().toLocaleDateString();
  const stats = await chrome.storage.local.get(['lastRunDate', 'desktopCompletedToday', 'logs']);

  let desktopDone = stats.desktopCompletedToday || 0;
  if (stats.lastRunDate !== dateKey) {
    desktopDone = 0;
  }
  desktopDone++;

  const newLog = { time: new Date().toLocaleTimeString(), query: keyword, mode: 'desktop', count: newCount };
  const logs = [newLog, ...(stats.logs || [])].slice(0, 50);

  await chrome.storage.local.set({
    lastRunDate: dateKey,
    desktopCompletedToday: desktopDone,
    logs: logs
  });

  // Navigate or recreate tab
  let tabId = st.activeTabId;
  if (tabId) {
    try {
      await chrome.tabs.update(tabId, { url: searchUrl });
    } catch (e) {
      try {
        const newTab = await chrome.tabs.create({ url: searchUrl, active: false });
        tabId = newTab.id;
        await saveState({ activeTabId: tabId });
      } catch (e2) {
        console.error('[MSR Pro] Could not recreate search tab:', e2);
      }
    }
  }

  // Schedule next search tick via alarm
  const randomDelayMs = (minDelay + Math.random() * (maxDelay - minDelay)) * 1000;
  const delayMinutes = randomDelayMs / (1000 * 60);

  console.log(`[MSR Pro] (Desktop) Search ${newCount}/${st.targetCount}: "${keyword}" | Next search in ${(randomDelayMs / 1000).toFixed(1)}s`);

  chrome.alarms.create(ALARM_NEXT_SEARCH, { delayInMinutes: Math.max(0.017, delayMinutes) });
}

async function stopAutomation(completed = false) {
  await chrome.alarms.clear(ALARM_NEXT_SEARCH);

  const settings = await chrome.storage.local.get(['autoCloseTab', 'enableNotifications', 'activeTabId']);

  if (settings.autoCloseTab && settings.activeTabId) {
    try {
      await chrome.tabs.remove(settings.activeTabId);
    } catch (e) {}
  }

  await chrome.storage.local.set({
    isRunning: false,
    currentCount: 0,
    activeTabId: null
  });

  if (completed && settings.enableNotifications) {
    try {
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'assets/icon48.png',
        title: 'Microsoft Reward Automation',
        message: '🎉 Đã hoàn thành toàn bộ lượt tìm kiếm Bing Desktop hôm nay!'
      });
    } catch (e) {
      console.log('[MSR Pro] Notification skipped or unsupported.');
    }
  }

  console.log('[MSR Pro] Search automation stopped. Completed:', completed);
}

// ─────────────────────────────────────────────────────────────
// MESSAGE LISTENER
// ─────────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    startAutomation('desktop');
    sendResponse({ status: 'started' });
    return false;

  } else if (request.action === 'stop') {
    stopAutomation(false);
    sendResponse({ status: 'stopped' });
    return false;

  } else if (request.action === 'getStatus') {
    getState().then(st => {
      sendResponse({
        isRunning: st.isRunning,
        mode: st.mode,
        currentCount: st.currentCount,
        targetCount: st.targetCount
      });
    }).catch(() => {});
    return true;

  } else if (request.action === 'updateSchedule') {
    setupScheduleAlarm(request.enable, request.time);
    sendResponse({ status: 'schedule_updated' });
    return false;
  }

  return false;
});

// ─────────────────────────────────────────────────────────────
// DAILY SCHEDULE ALARM
// ─────────────────────────────────────────────────────────────

async function setupScheduleAlarm(enable, timeStr) {
  await chrome.alarms.clear(ALARM_DAILY_SCHEDULE);
  if (!enable || !timeStr) return;

  const [hours, minutes] = timeStr.split(':').map(Number);
  const now = new Date();
  const scheduledDate = new Date();
  scheduledDate.setHours(hours, minutes, 0, 0);

  if (scheduledDate <= now) {
    scheduledDate.setDate(scheduledDate.getDate() + 1);
  }

  const delayInMinutes = (scheduledDate.getTime() - now.getTime()) / (1000 * 60);
  chrome.alarms.create(ALARM_DAILY_SCHEDULE, {
    delayInMinutes: delayInMinutes,
    periodInMinutes: 24 * 60
  });

  console.log(`[MSR Pro] Schedule set for ${timeStr} daily (First run in ${delayInMinutes.toFixed(1)} mins).`);
}
