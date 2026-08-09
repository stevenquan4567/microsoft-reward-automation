/**
 * Microsoft Reward Automation - Service Worker (Background)
 * Core automation engine handling desktop search queues, MV3 alarms, state management & anti-bot scheduling.
 *
 * ARCHITECTURE: Uses chrome.alarms (NOT setTimeout) so the service worker can sleep safely.
 * Full state is persisted to chrome.storage.local.
 */

const ALARM_NEXT_SEARCH = 'next_search';
const ALARM_DAILY_SCHEDULE = 'daily_msr_schedule';
const ALARM_AUTO_UPDATE = 'auto_update_check';

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
    appLanguage: 'en',
    desktopTarget: 30,
    maxPointsCap: 90,
    minDelay: 3,
    maxDelay: 6,
    autoCloseTab: true,
    enableHumanizer: true,
    enableNotifications: true,
    enableAutoUpdate: true,
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

  await setupAutoUpdateAlarm();
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

  await setupAutoUpdateAlarm();
  performAutoUpdateAndReload().catch(() => {});
  await checkAndRunOnStartup();
});

async function setupAutoUpdateAlarm() {
  await chrome.alarms.clear(ALARM_AUTO_UPDATE);
  chrome.alarms.create(ALARM_AUTO_UPDATE, { periodInMinutes: 60 });
  console.log('[MSR Pro] Auto-update hourly background alarm initialized.');
}

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
  } else if (alarm.name === ALARM_AUTO_UPDATE) {
    console.log('[MSR Pro] Auto-update alarm triggered.');
    const settings = await chrome.storage.local.get(['enableAutoUpdate']);
    if (settings.enableAutoUpdate !== false) {
      await performAutoUpdateAndReload();
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

async function loadDefaultKeywords() {
  const stored = await chrome.storage.local.get(['defaultKeywords']);
  if (stored.defaultKeywords && typeof stored.defaultKeywords === 'object') {
    return stored.defaultKeywords;
  }
  try {
    const res = await fetch(chrome.runtime.getURL('data/default_keywords.json'));
    return await res.json();
  } catch (e) {
    console.error('[MSR Pro] Error loading default keywords:', e);
    return {};
  }
}

async function generateNextQuery() {
  const data = await chrome.storage.local.get(['customKeywords', 'usedQueriesHistory']);
  const customList = data.customKeywords || [];
  let history = data.usedQueriesHistory || [];

  if (history.length > 2000) {
    history = history.slice(-1000);
  }

  // 25% chance custom keywords if user provided any
  if (customList.length > 0 && Math.random() < 0.25) {
    const unusedCustom = customList.filter(k => !history.includes(k));
    if (unusedCustom.length > 0) {
      const selected = unusedCustom[Math.floor(Math.random() * unusedCustom.length)];
      history.push(selected);
      await chrome.storage.local.set({ usedQueriesHistory: history });
      return selected;
    }
  }

  const bank = await loadQuotesBank();
  const defaultKw = await loadDefaultKeywords();

  function pickRandom(arr) {
    if (!arr || arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
  }

  for (let attempt = 0; attempt < 15; attempt++) {
    let candidate = '';
    const roll = Math.random();

    if (roll < 0.25) {
      // 1. Tech & Software Engineering (25%)
      const techList = bank.tech_and_programming || [];
      const item = pickRandom(techList) || 'software engineering';
      const tmpl = pickRandom([
        "how to learn {item} efficiently in 2026",
        "best practices for {item} development",
        "step by step tutorial for {item}",
        "difference between {item} and modern alternatives",
        "top open source projects built with {item}",
        "architecture and performance of {item}",
        "beginner friendly guide to {item}"
      ]);
      candidate = tmpl.replace('{item}', item);

    } else if (roll < 0.50) {
      // 2. Science, Cosmos & Nature (25%)
      if (Math.random() < 0.4) {
        const natureItem = pickRandom(bank.nature_and_wildlife || []) || 'deep sea ecosystems';
        candidate = `fascinating facts and habitat of ${natureItem}`;
      } else {
        const scienceItem = pickRandom(bank.science_and_cosmos || []) || 'quantum mechanics';
        const tmpl = pickRandom([
          "latest scientific discoveries in {item}",
          "fundamental principles of {item} explained simply",
          "how {item} changed our understanding of science",
          "real world applications of {item} technology"
        ]);
        candidate = tmpl.replace('{item}', scienceItem);
      }

    } else if (roll < 0.75) {
      // 3. History, Geography & Cuisine (25%)
      const sub = Math.random();
      if (sub < 0.4) {
        const item = pickRandom(bank.history_and_civilizations || []) || 'Ancient Egypt';
        candidate = `historical timeline and key events of ${item}`;
      } else if (sub < 0.7) {
        const item = pickRandom(bank.geography_and_cities || []) || 'Kyoto Japan';
        candidate = `top travel attractions and hidden gems in ${item}`;
      } else {
        const item = pickRandom(bank.cuisine_and_cooking || []) || 'Italian pasta making';
        candidate = `authentic step by step guide to master ${item}`;
      }

    } else if (roll < 0.90) {
      // 4. Default Multi-Category Keywords (15%)
      const categories = Object.keys(defaultKw);
      if (categories.length > 0) {
        const catName = pickRandom(categories);
        const kwArray = defaultKw[catName];
        if (Array.isArray(kwArray) && kwArray.length > 0) {
          candidate = pickRandom(kwArray);
        }
      }

    } else {
      // 5. Philosophy & Literature Insights (10%)
      const author = pickRandom(bank.authors_and_thinkers || []) || 'Marcus Aurelius';
      const topic = pickRandom(bank.topics_and_concepts || []) || 'wisdom and knowledge';
      candidate = `life lessons and thoughts by ${author} on ${topic}`;
    }

    if (candidate && !history.includes(candidate)) {
      history.push(candidate);
      await chrome.storage.local.set({ usedQueriesHistory: history });
      return candidate;
    }
  }

  const fallback = `latest technology news ${Date.now().toString().slice(-4)}`;
  history.push(fallback);
  await chrome.storage.local.set({ usedQueriesHistory: history });
  return fallback;
}

// ─────────────────────────────────────────────────────────────
// SEARCH QUEUE CONTROLLER
// ─────────────────────────────────────────────────────────────

async function startAutomation(mode = 'desktop') {
  console.log(`[MSR Pro] Starting automation mode: ${mode}`);
  const st = await getState();

  const todayStr = new Date().toLocaleDateString();
  const data = await chrome.storage.local.get(['lastRunDate', 'desktopCompletedToday']);

  let completedToday = 0;
  if (data.lastRunDate === todayStr) {
    completedToday = data.desktopCompletedToday || 0;
  } else {
    await chrome.storage.local.set({
      lastRunDate: todayStr,
      desktopCompletedToday: 0
    });
  }

  const targetQuota = st.desktopTarget || 30;

  if (completedToday >= targetQuota) {
    console.log('[MSR Pro] Target quota already reached today!');
    await sendDailyCompletionNotification();
    await saveState({ isRunning: false });
    return;
  }

  await saveState({
    isRunning: true,
    mode: 'desktop',
    currentCount: completedToday,
    targetCount: targetQuota
  });

  await executeNextSearch({ ...st, isRunning: true, currentCount: completedToday, targetCount: targetQuota });
}

async function executeNextSearch(st) {
  if (!st.isRunning) return;

  if (st.currentCount >= st.targetCount) {
    console.log('[MSR Pro] Search target reached! Stopping.');
    await stopAutomation(true);
    return;
  }

  const query = await generateNextQuery();
  const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}&FORM=QBLH`;

  console.log(`[MSR Pro] [${st.currentCount + 1}/${st.targetCount}] Searching: "${query}"`);

  let tab = null;
  try {
    tab = await chrome.tabs.create({ url: searchUrl, active: false });
    await saveState({ activeTabId: tab.id });
  } catch (err) {
    console.error('[MSR Pro] Error creating tab:', err);
  }

  const nextCount = st.currentCount + 1;
  const todayStr = new Date().toLocaleDateString();

  await chrome.storage.local.set({
    desktopCompletedToday: nextCount,
    lastRunDate: todayStr
  });

  await saveState({ currentCount: nextCount });
  await addLogEntry('desktop', query);

  const delaySec = Math.floor(Math.random() * (st.maxDelay - st.minDelay + 1)) + st.minDelay;
  console.log(`[MSR Pro] Waiting ${delaySec}s before next search...`);

  chrome.alarms.create(ALARM_NEXT_SEARCH, { delayInMinutes: delaySec / 60 });
}

async function addLogEntry(mode, query) {
  const data = await chrome.storage.local.get(['logs']);
  const logs = data.logs || [];
  logs.unshift({
    time: new Date().toLocaleTimeString(),
    mode: mode,
    query: query
  });

  if (logs.length > 50) logs.pop();
  await chrome.storage.local.set({ logs: logs });
}

async function stopAutomation(completed = false) {
  await chrome.alarms.clear(ALARM_NEXT_SEARCH);
  const st = await getState();

  if (st.activeTabId) {
    const data = await chrome.storage.local.get(['autoCloseTab']);
    if (data.autoCloseTab !== false) {
      try {
        await chrome.tabs.remove(st.activeTabId);
      } catch (e) {}
    }
  }

  await saveState({ isRunning: false, activeTabId: null });

  if (completed) {
    await sendDailyCompletionNotification();
  }

  console.log('[MSR Pro] Search automation stopped. Completed:', completed);
}

async function sendDailyCompletionNotification() {
  const data = await chrome.storage.local.get(['enableNotifications', 'appLanguage']);
  if (data.enableNotifications === false) return;

  const lang = data.appLanguage || 'en';
  const dict = (typeof I18N !== 'undefined' && I18N[lang]) ? I18N[lang] : I18N['en'];

  try {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('assets/icon128.png'),
      title: dict.notif_completed_title || 'Microsoft Reward Automation',
      message: dict.notif_completed_msg || '🎉 Completed all Bing Desktop searches for today!',
      priority: 2
    });
  } catch (e) {}
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

  } else if (request.action === 'autoUpdateAndReload') {
    performAutoUpdateAndReload().then(res => {
      sendResponse(res);
    }).catch(() => {
      sendResponse({ success: false });
    });
    return true;
  }

  return false;
});

// ─────────────────────────────────────────────────────────────
// TRUE AUTO UPDATE & RELOAD ENGINE
// ─────────────────────────────────────────────────────────────

const CURRENT_VERSION = '2.2.1';
const GITHUB_MANIFEST_URL = 'https://raw.githubusercontent.com/stevenquan4567/microsoft-reward-automation/main/manifest.json';
const GITHUB_KEYWORDS_URL = 'https://raw.githubusercontent.com/stevenquan4567/microsoft-reward-automation/main/data/default_keywords.json';

async function performAutoUpdateAndReload(forceReload = false) {
  console.log('[MSR Pro] Checking GitHub for extension updates...');
  let hasNewUpdate = false;
  let newVersionFound = '';

  try {
    const localData = await chrome.storage.local.get(['defaultKeywords', 'isRunning']);
    const isSearching = !!localData.isRunning;

    // 1. Fetch remote keywords & compare with local storage
    const kwRes = await fetch(GITHUB_KEYWORDS_URL, { cache: 'no-cache' });
    if (kwRes.ok) {
      const remoteKeywords = await kwRes.json();
      if (remoteKeywords && typeof remoteKeywords === 'object') {
        const localKwStr = JSON.stringify(localData.defaultKeywords || {});
        const remoteKwStr = JSON.stringify(remoteKeywords);
        if (localKwStr !== remoteKwStr) {
          await chrome.storage.local.set({ defaultKeywords: remoteKeywords });
          hasNewUpdate = true;
          console.log('[MSR Pro] Remote keywords updated!');
        }
      }
    }

    // 2. Fetch remote manifest version and compare with CURRENT_VERSION
    const manifestRes = await fetch(GITHUB_MANIFEST_URL, { cache: 'no-cache' });
    if (manifestRes.ok) {
      const remoteManifest = await manifestRes.json();
      const remoteVer = remoteManifest.version || CURRENT_VERSION;
      if (isNewerVersion(CURRENT_VERSION, remoteVer)) {
        hasNewUpdate = true;
        newVersionFound = remoteVer;
        console.log(`[MSR Pro] Newer version v${remoteVer} found on GitHub!`);
      }
    }

    // 3. Request native Chrome/Edge extension update check if store installed
    if (chrome.runtime.requestUpdateCheck) {
      chrome.runtime.requestUpdateCheck((status) => {
        console.log('[MSR Pro] Native store update status:', status);
      });
    }

    // 4. Save check timestamp
    await chrome.storage.local.set({
      lastAutoUpdate: new Date().toLocaleString(),
      appVersion: CURRENT_VERSION
    });

    // 5. Reload ONLY if there is an actual new update AND search is NOT running (or forceReload requested by user)
    if ((hasNewUpdate || forceReload) && !isSearching) {
      console.log('[MSR Pro] Valid update detected. Reloading extension in 600ms...');
      setTimeout(() => {
        chrome.runtime.reload();
      }, 600);
    } else if (hasNewUpdate && isSearching) {
      console.log('[MSR Pro] New update available, but search is running. Postponing reload until search completes.');
    }

    return { success: true, updated: hasNewUpdate, newVersion: newVersionFound };

  } catch (err) {
    console.error('[MSR Pro] Auto-update check error:', err.message);
    return { success: false, error: err.message };
  }
}

function isNewerVersion(current, remote) {
  const cParts = current.split('.').map(Number);
  const rParts = remote.split('.').map(Number);
  for (let i = 0; i < Math.max(cParts.length, rParts.length); i++) {
    const c = cParts[i] || 0;
    const r = rParts[i] || 0;
    if (r > c) return true;
    if (r < c) return false;
  }
  return false;
}

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
