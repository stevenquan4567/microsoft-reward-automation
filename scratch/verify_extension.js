const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const jsonFiles = [
  'manifest.json',
  'data/default_keywords.json',
  'data/quotes_bank.json'
];

const jsFiles = [
  'data/i18n.js',
  'background/service_worker.js',
  'content/bing_humanizer.js',
  'content/rewards_autocard.js',
  'popup/popup.js',
  'options/options.js'
];

let errors = 0;

console.log('--- Checking JSON files ---');
jsonFiles.forEach(f => {
  const filePath = path.join(root, f);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING FILE: ${f}`);
    errors++;
  } else {
    try {
      JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`✅ ${f} syntax valid`);
    } catch (e) {
      console.error(`❌ INVALID JSON in ${f}:`, e.message);
      errors++;
    }
  }
});

console.log('\n--- Checking JS files existence ---');
jsFiles.forEach(f => {
  const filePath = path.join(root, f);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING FILE: ${f}`);
    errors++;
  } else {
    console.log(`✅ ${f} exists`);
  }
});

console.log('\n--- Checking Icon assets ---');
['assets/icon16.png', 'assets/icon48.png', 'assets/icon128.png'].forEach(f => {
  const filePath = path.join(root, f);
  if (!fs.existsSync(filePath)) {
    console.error(`MISSING ICON: ${f}`);
    errors++;
  } else {
    console.log(`✅ ${f} exists (${fs.statSync(filePath).size} bytes)`);
  }
});

if (errors === 0) {
  console.log('\n🎉 ALL EXTENSION FILES ARE VALID AND READY!');
} else {
  console.error(`\n❌ Found ${errors} error(s).`);
  process.exit(1);
}
