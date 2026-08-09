/**
 * MS Rewards Auto Search Pro - Content Script (Bing Humanizer Pro)
 * Advanced human behavior simulator (natural variable-speed scrolling, hover, text highlight, micro-pauses)
 * to bypass Bing anti-bot detection and mimic genuine user searches.
 */

(function () {
  'use strict';

  if (!window.location.hostname.includes('bing.com')) return;

  console.log('[MSR Pro Humanizer] Active on Bing Search page.');

  // Live Bing Rewards points scraper
  setTimeout(() => {
    try {
      const el = document.querySelector('#id_rc, #b_id_rc, .id_rc, #id_rh, a[href*="rewards.bing.com"]');
      if (el && el.innerText) {
        const txt = el.innerText.replace(/,/g, '').trim();
        const m = txt.match(/\d+/);
        if (m) {
          const livePts = parseInt(m[0], 10);
          if (!isNaN(livePts) && livePts > 0) {
            chrome.storage.local.set({ liveRewardsPoints: livePts });
          }
        }
      }
    } catch (e) {}
  }, 1200);

  // Read humanizer & execution state from storage
  chrome.storage.local.get(['enableHumanizer', 'isRunning'], (res) => {
    if (!res.isRunning) return;
    if (res.enableHumanizer !== false) {
      // Initiate human simulation with random initial reaction delay (800ms - 1800ms)
      const startDelay = 800 + Math.floor(Math.random() * 1000);
      setTimeout(runHumanSimulationSequence, startDelay);
    }
  });

  async function runHumanSimulationSequence() {
    try {
      // 1. Initial visual reading pause
      await delay(400 + Math.random() * 600);

      // 2. Multi-stage Smooth Scrolling (simulates scrolling down results)
      const pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxTargetScroll = Math.min(pageHeight - viewportHeight, 350 + Math.random() * 600);

      if (maxTargetScroll > 150) {
        // First scroll down increment
        const step1 = Math.floor(maxTargetScroll * (0.4 + Math.random() * 0.3));
        window.scrollTo({ top: step1, behavior: 'smooth' });

        await delay(800 + Math.random() * 700);

        // Second scroll down increment
        window.scrollTo({ top: maxTargetScroll, behavior: 'smooth' });

        await delay(1200 + Math.random() * 900);

        // Slight scroll back up (reading/checking result)
        if (Math.random() > 0.3) {
          const scrollBack = Math.max(0, maxTargetScroll - (100 + Math.random() * 150));
          window.scrollTo({ top: scrollBack, behavior: 'smooth' });
          await delay(600 + Math.random() * 600);
        }
      }

      // 3. Random Hover over Organic Search Results or Filter Tabs
      await simulateElementInteraction();

      // 4. Random Text Selection simulation (rare, ~30% chance, mimics double-click reading)
      if (Math.random() < 0.3) {
        simulateRandomTextHighlight();
      }
    } catch (e) {
      console.log('[MSR Pro Humanizer] Interaction skipped:', e);
    }
  }

  function simulateElementInteraction() {
    return new Promise((resolve) => {
      // Target search result title links or top navigation tabs (News, Images, Maps)
      const targetSelectors = [
        '#b_results > li.b_algo h2 a',
        '#b_results .b_caption p',
        '#b_header #b_tween a',
        '#b_results .b_title a'
      ];

      let targets = [];
      for (const selector of targetSelectors) {
        const els = document.querySelectorAll(selector);
        if (els.length > 0) {
          targets = Array.from(els);
          break;
        }
      }

      if (targets.length > 0) {
        const randomIndex = Math.floor(Math.random() * Math.min(targets.length, 5));
        const element = targets[randomIndex];

        if (element && element.getBoundingClientRect) {
          const rect = element.getBoundingClientRect();
          // Dispatch realistic mouse event sequence (mouseenter, mouseover, mousemove)
          const mouseEvents = ['mouseenter', 'mouseover', 'mousemove'];
          mouseEvents.forEach((evtName) => {
            const evt = new MouseEvent(evtName, {
              view: window,
              bubbles: true,
              cancelable: true,
              clientX: rect.left + rect.width / 2,
              clientY: rect.top + rect.height / 2
            });
            element.dispatchEvent(evt);
          });
        }
      }

      setTimeout(resolve, 500 + Math.random() * 500);
    });
  }

  function simulateRandomTextHighlight() {
    try {
      const paragraphs = document.querySelectorAll('#b_results p');
      if (paragraphs.length === 0) return;

      const randomP = paragraphs[Math.floor(Math.random() * Math.min(paragraphs.length, 4))];
      if (randomP && randomP.firstChild) {
        const selection = window.getSelection();
        const range = document.createRange();
        const textLength = randomP.textContent.length;
        if (textLength > 10) {
          range.setStart(randomP.firstChild, 0);
          range.setEnd(randomP.firstChild, Math.min(textLength, 15 + Math.floor(Math.random() * 20)));
          selection.removeAllRanges();
          selection.addRange(range);

          // Clear selection after short pause
          setTimeout(() => {
            selection.removeAllRanges();
          }, 1200 + Math.random() * 800);
        }
      }
    } catch (err) {}
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
})();
