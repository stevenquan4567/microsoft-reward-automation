const GITHUB_MANIFEST_URL = 'https://raw.githubusercontent.com/stevenquan4567/microsoft-reward-automation/main/manifest.json';
const GITHUB_KEYWORDS_URL = 'https://raw.githubusercontent.com/stevenquan4567/microsoft-reward-automation/main/data/default_keywords.json';

const CURRENT_VERSION = '2.2.0';

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

async function testAutoUpdate() {
  console.log('--- Testing Auto-Update Engine ---');
  console.log(`Current Local Version: ${CURRENT_VERSION}`);

  try {
    const manifestRes = await fetch(GITHUB_MANIFEST_URL, { cache: 'no-cache' });
    if (!manifestRes.ok) throw new Error(`HTTP ${manifestRes.status}`);
    const manifestData = await manifestRes.json();
    console.log(`✅ Remote Manifest Version: ${manifestData.version}`);

    const hasUpdate = isNewerVersion(CURRENT_VERSION, manifestData.version);
    console.log(`Is Remote Version Newer? ${hasUpdate}`);

    const kwRes = await fetch(GITHUB_KEYWORDS_URL, { cache: 'no-cache' });
    if (!kwRes.ok) throw new Error(`HTTP ${kwRes.status}`);
    const kwData = await kwRes.json();
    const categories = Object.keys(kwData);
    console.log(`✅ Remote Keywords Categories: ${categories.join(', ')} (${categories.length} categories)`);

    console.log('🎉 Auto-Update fetch test PASSED PERFECTLY!');
  } catch (err) {
    console.error('❌ Auto-Update test failed:', err.message);
    process.exit(1);
  }
}

testAutoUpdate();
