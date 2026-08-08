const fs = require('fs');
const path = require('path');

// Pure JS Minimal DOM element mock
class MockElement {
  constructor(tagName, attrs = {}, text = '') {
    this.tagName = tagName.toUpperCase();
    this.attrs = attrs;
    this.innerText = text;
    this.children = [];
    this.listeners = {};
    this.href = attrs.href || '';
    this.disabled = false;
  }

  querySelector(selector) {
    for (const child of this.children) {
      if (child.matches(selector)) return child;
      const found = child.querySelector(selector);
      if (found) return found;
    }
    return null;
  }

  querySelectorAll(selector) {
    let res = [];
    for (const child of this.children) {
      if (child.matches(selector)) res.push(child);
      res.push(...child.querySelectorAll(selector));
    }
    return res;
  }

  matches(selector) {
    const parts = selector.split(',').map(s => s.trim());
    return parts.some(sel => {
      let targetTag = null;
      let targetClass = null;
      let targetId = null;

      if (sel.includes('.')) {
        const [t, c] = sel.split('.');
        if (t) targetTag = t.toUpperCase();
        targetClass = c;
      } else if (sel.startsWith('#')) {
        targetId = sel.slice(1);
      } else if (sel.startsWith('[')) {
        if (sel.includes('[aria-label*=')) {
          const match = sel.match(/\[aria-label\*="?([^"]+)"?\]/);
          return match && (this.attrs['aria-label'] || '').includes(match[1]);
        }
        return false;
      } else {
        targetTag = sel.toUpperCase();
      }

      if (targetTag && this.tagName !== targetTag) return false;
      if (targetId && this.attrs.id !== targetId) return false;
      if (targetClass && !(this.attrs.class || '').split(' ').includes(targetClass)) return false;

      return true;
    });
  }

  addEventListener(type, cb) {
    this.listeners[type] = cb;
  }

  click() {
    if (this.listeners['click']) this.listeners['click']();
    if (global.onElementClick) global.onElementClick(this);
  }

  getAttribute(attr) {
    return this.attrs[attr] || null;
  }
}

class MockDocument {
  constructor(rootElement) {
    this.body = rootElement;
  }
  querySelector(sel) { return this.body.querySelector(sel); }
  querySelectorAll(sel) { return this.body.querySelectorAll(sel); }
}

async function testDailySetAndQuizSolver() {
  console.log('==================================================');
  console.log('🧪 E2E MOCK TEST: DAILY SET & QUIZ AUTO-SOLVER');
  console.log('==================================================\n');

  const scriptPath = path.join(__dirname, '..', 'content', 'rewards_autocard.js');
  const autocardCode = fs.readFileSync(scriptPath, 'utf8');

  // ----------------------------------------------------
  // TEST 1: rewards.bing.com Dashboard Card Scanner
  // ----------------------------------------------------
  console.log('Test 1: Testing rewards.bing.com Dashboard Card Scanner...');

  const root1 = new MockElement('body');
  const card1 = new MockElement('mee-rewards-daily-set-item-element', { class: 'mee-rewards-card-item' });
  const card1Link = new MockElement('a', { class: 'ds-card-sec', href: 'https://www.bing.com/search?q=card1' });
  const card1Icon = new MockElement('span', { class: 'mee-icon-OutlineCorrectCompleted' });
  card1.children.push(card1Link, card1Icon);

  const card2 = new MockElement('mee-rewards-daily-set-item-element', { class: 'mee-rewards-card-item' });
  const card2Link = new MockElement('a', { class: 'ds-card-sec', href: 'https://www.bing.com/search?q=card2' });
  card2.children.push(card2Link);

  const card3 = new MockElement('mee-rewards-daily-set-item-element', { class: 'mee-rewards-card-item' });
  const card3Link = new MockElement('a', { class: 'ds-card-sec', href: 'https://www.bing.com/search?q=card3' });
  card3.children.push(card3Link);

  root1.children.push(card1, card2, card3);

  let clickedUrls = [];
  global.onElementClick = (el) => {
    if (el.href) clickedUrls.push(el.href);
  };

  global.window = { location: { hostname: 'rewards.bing.com', pathname: '/' } };
  global.document = new MockDocument(root1);
  global.chrome = {
    storage: {
      local: {
        get: (keys, cb) => cb({ autoDailySet: true, isRunningDailySet: true })
      }
    }
  };

  eval(autocardCode);
  // Wait for 2000ms scan timeout + 4500ms click timeouts to finish
  await new Promise(r => setTimeout(r, 7500));

  console.assert(clickedUrls.length === 2, `Should click 2 uncompleted cards, got ${clickedUrls.length}`);
  console.assert(clickedUrls.includes('https://www.bing.com/search?q=card2'), 'Card 2 should be clicked');
  console.assert(clickedUrls.includes('https://www.bing.com/search?q=card3'), 'Card 3 should be clicked');
  console.log('✅ Test 1 Passed: Uncompleted cards detected and clicked successfully.\n');

  // ----------------------------------------------------
  // TEST 2: Bing Daily Poll Solver
  // ----------------------------------------------------
  console.log('Test 2: Testing Bing Daily Poll Auto-Vote...');

  const root2 = new MockElement('body');
  const pollOpt0 = new MockElement('button', { id: 'btoption0', class: 'bt_poll_option' });
  root2.children.push(pollOpt0);

  let pollOptionClicked = false;
  pollOpt0.addEventListener('click', () => { pollOptionClicked = true; });

  global.window = { location: { hostname: 'www.bing.com', pathname: '/search' } };
  global.document = new MockDocument(root2);

  eval(autocardCode);
  await new Promise(r => setTimeout(r, 2500));

  console.assert(pollOptionClicked === true, 'Daily Poll Option 0 should be auto-clicked');
  console.log('✅ Test 2 Passed: Daily Poll auto-voted successfully.\n');

  // ----------------------------------------------------
  // TEST 3: Bing Supersonic Quiz Solver
  // ----------------------------------------------------
  console.log('Test 3: Testing Bing Quiz Auto-Solver...');

  const root3 = new MockElement('body');
  const quizStart = new MockElement('input', { id: 'rqStartQuiz' });
  const quizOpt0 = new MockElement('input', { id: 'rqAnswerOption0', class: 'rqOption' });
  root3.children.push(quizStart, quizOpt0);

  let quizStartClicked = false;
  let quizAnswerClicked = false;

  quizStart.addEventListener('click', () => { quizStartClicked = true; });
  quizOpt0.addEventListener('click', () => { quizAnswerClicked = true; });

  global.window = { location: { hostname: 'www.bing.com', pathname: '/search' } };
  global.document = new MockDocument(root3);

  eval(autocardCode);
  await new Promise(r => setTimeout(r, 3000));

  console.assert(quizStartClicked === true, 'Quiz Start button should be clicked');
  console.log('✅ Test 3 Passed: Quiz Start and Answer auto-selected successfully.\n');

  console.log('==================================================');
  console.log('🎉 ALL DAILY SET & QUIZ E2E MOCK TESTS PASSED!');
  console.log('==================================================');
}

testDailySetAndQuizSolver().catch(err => {
  console.error('❌ Test Failed:', err);
  process.exit(1);
});

