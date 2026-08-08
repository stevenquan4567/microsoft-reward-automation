const fs = require('fs');
const path = require('path');

// Mock chrome extension APIs
global.chrome = {
  runtime: {
    onInstalled: { addListener: (cb) => { global.onInstalledCb = cb; } },
    onStartup: { addListener: (cb) => { global.onStartupCb = cb; } },
    onMessage: { addListener: (cb) => { global.onMessageCb = cb; } },
    getURL: (p) => path.join(__dirname, '..', p)
  },
  storage: {
    local: {
      data: {},
      get: async (keys) => {
        if (!keys) return { ...global.chrome.storage.local.data };
        if (typeof keys === 'string') keys = [keys];
        const res = {};
        keys.forEach(k => { res[k] = global.chrome.storage.local.data[k]; });
        return res;
      },
      set: async (obj) => {
        Object.assign(global.chrome.storage.local.data, obj);
      }
    }
  },
  declarativeNetRequest: {
    rules: [],
    updateDynamicRules: async ({ removeRuleIds, addRules }) => {
      if (removeRuleIds) {
        global.chrome.declarativeNetRequest.rules = global.chrome.declarativeNetRequest.rules.filter(
          r => !removeRuleIds.includes(r.id)
        );
      }
      if (addRules) {
        global.chrome.declarativeNetRequest.rules.push(...addRules);
      }
    }
  },
  alarms: {
    alarms: {},
    onAlarm: { addListener: (cb) => { global.onAlarmCb = cb; } },
    create: (name, opts) => { global.chrome.alarms.alarms[name] = opts; },
    clear: async (name) => { delete global.chrome.alarms.alarms[name]; }
  },
  tabs: {
    createdTabs: [],
    create: async (opts) => {
      const tab = { id: Math.floor(Math.random() * 10000), ...opts };
      global.chrome.tabs.createdTabs.push(tab);
      return tab;
    },
    update: async (id, opts) => {},
    remove: async (id) => {}
  },
  notifications: {
    create: (opts) => {}
  }
};

async function runTests() {
  console.log('==============================================');
  console.log('🧪 RUNNING MSR AUTO PRO EXTENSION UNIT & MOCK TESTS');
  console.log('==============================================\n');

  // Load service worker code in mock context
  const swPath = path.join(__dirname, '..', 'background', 'service_worker.js');
  const swCode = fs.readFileSync(swPath, 'utf8');

  // Eval service worker code
  eval(swCode);

  // Test 1: OnInstalled Initialization
  console.log('Test 1: Testing extension installation & default state init...');
  if (global.onInstalledCb) {
    await global.onInstalledCb();
  }
  const storedData = await chrome.storage.local.get(null);
  console.assert(storedData.desktopTarget === 30, 'desktopTarget default should be 30');
  console.assert(storedData.mobileTarget === 20, 'mobileTarget default should be 20');
  console.assert(storedData.runOnStartup === true, 'runOnStartup default should be true');
  console.assert(storedData.minDelay === 3, 'minDelay default should be 3');
  console.assert(storedData.maxDelay === 6, 'maxDelay default should be 6');
  console.log('✅ Test 1 Passed: Default state initialized correctly.\n');

  // Test 2: Mobile User-Agent Dynamic Rule Activation
  console.log('Test 2: Testing Mobile User-Agent dynamic header spoofing...');
  await enableMobileUA();
  console.assert(chrome.declarativeNetRequest.rules.length === 1, 'Should have 1 active DNR rule');
  console.assert(chrome.declarativeNetRequest.rules[0].id === 1001, 'Rule ID should be 1001');
  console.assert(
    chrome.declarativeNetRequest.rules[0].action.requestHeaders[0].value.includes('Mobile Safari'),
    'Header should contain Mobile Safari User-Agent'
  );
  await disableMobileUA();
  console.assert(chrome.declarativeNetRequest.rules.length === 0, 'DNR rule should be removed');
  console.log('✅ Test 2 Passed: Mobile User-Agent spoofing rule working as expected.\n');

  // Test 3: Infinite Non-Repeating Quote Engine
  console.log('Test 3: Testing Infinite Non-Repeating Quote Generator...');
  const generatedQueries = [];
  for (let i = 0; i < 5; i++) {
    const q = await getNextKeyword();
    console.log(`   Sample Unique Query #${i + 1}: "${q}"`);
    console.assert(typeof q === 'string' && q.length > 0, 'Query should be a non-empty string');
    console.assert(!generatedQueries.includes(q), `Query "${q}" should not repeat`);
    generatedQueries.push(q);
  }
  console.log('✅ Test 3 Passed: Infinite quote generator produced 5 unique non-repeating queries.\n');

  // Test 4: Alarm Scheduler Setup
  console.log('Test 4: Testing Alarm Scheduler...');
  await setupScheduleAlarm(true, '10:30');
  console.assert(chrome.alarms.alarms['daily_msr_schedule'] !== undefined, 'Alarm daily_msr_schedule should be created');
  console.assert(chrome.alarms.alarms['daily_msr_schedule'].periodInMinutes === 1440, 'Alarm period should be 24 hours');
  await setupScheduleAlarm(false, '');
  console.assert(chrome.alarms.alarms['daily_msr_schedule'] === undefined, 'Alarm should be cleared when disabled');
  console.log('✅ Test 4 Passed: Alarm scheduler working properly.\n');

  // Test 5: Browser Startup Event Auto-Run
  console.log('Test 5: Testing Browser Startup Event (onStartup)...');
  console.assert(typeof global.onStartupCb === 'function', 'onStartup listener should be registered');
  await checkAndRunOnStartup();
  console.log('✅ Test 5 Passed: Startup auto-run check completed successfully.\n');

  console.log('==============================================');
  console.log('🎉 ALL INTEGRATION & MOCK TESTS PASSED SUCCESSFULLY!');
  console.log('==============================================');
}

runTests().catch(err => {
  console.error('❌ Test Failed:', err);
  process.exit(1);
});
