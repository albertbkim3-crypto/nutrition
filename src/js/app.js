/* ============================================================
   빛나는 음식 / Radiant Food — Shared App Logic
   Handles: bilingual toggle, localStorage persistence, read-aloud
   ============================================================ */

'use strict';

// ── Language ────────────────────────────────────────────────

let currentLang = localStorage.getItem('ht_lang') || 'ko';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('ht_lang', lang);

  // Update all text nodes that carry data-en / data-ko attributes
  document.querySelectorAll('[data-en][data-ko]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.ko;
  });

  // Update placeholder text on inputs
  document.querySelectorAll('[data-en-ph][data-ko-ph]').forEach(el => {
    el.placeholder = lang === 'en' ? el.dataset.enPh : el.dataset.koPh;
  });

  // Highlight the active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Set the HTML lang attribute for screen readers
  document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
}

function initLang() {
  setLang(currentLang);
}

// ── Read Aloud ───────────────────────────────────────────────

let isReading = false;
let currentUtterance = null;

function toggleReadPage() {
  const btn = document.getElementById('read-btn');
  const label = btn ? btn.querySelector('[data-en]') : null;

  if (isReading) {
    window.speechSynthesis.cancel();
    setReadingState(false, btn, label);
    return;
  }

  // Collect readable text from the main content region
  const contentEl = document.getElementById('read-content');
  if (!contentEl) return;

  // Walk text nodes, skip hidden/script elements
  const text = getReadableText(contentEl);
  if (!text.trim()) return;

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang  = currentLang === 'ko' ? 'ko-KR' : 'en-US';
  currentUtterance.rate  = 0.82;  // slightly slower for seniors
  currentUtterance.pitch = 1.0;
  currentUtterance.volume = 1.0;

  currentUtterance.onend = () => setReadingState(false, btn, label);
  currentUtterance.onerror = () => setReadingState(false, btn, label);

  window.speechSynthesis.speak(currentUtterance);
  setReadingState(true, btn, label);
}

function setReadingState(reading, btn, label) {
  isReading = reading;
  if (!btn) return;

  btn.classList.toggle('reading', reading);

  if (label) {
    label.dataset.en = reading ? '⏹ Stop' : '🔊 Read Aloud';
    label.dataset.ko = reading ? '⏹ 중지' : '🔊 읽어주기';
    label.textContent = currentLang === 'en' ? label.dataset.en : label.dataset.ko;
  }
}

function getReadableText(el) {
  const skipTags = new Set(['SCRIPT', 'STYLE', 'BUTTON', 'NAV', 'HEADER', 'FOOTER']);
  let out = '';

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      out += node.textContent + ' ';
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (skipTags.has(node.tagName)) return;
      if (node.hidden || node.style.display === 'none') return;
      node.childNodes.forEach(walk);
      // Add a pause after block-level elements
      if (['P','H1','H2','H3','H4','LI','DIV'].includes(node.tagName)) out += '. ';
    }
  }

  walk(el);
  return out.replace(/\s+/g, ' ').trim();
}

// ── Star field ───────────────────────────────────────────────

function createStarfield() {
  const field = document.createElement('div');
  field.className = 'starfield';
  field.setAttribute('aria-hidden', 'true');

  // Mix of 4-pointed sparkle (✦ ✧) and classic 5-pointed (★) shapes
  const shapes = ['✦', '✦', '✦', '✧', '✦', '★', '✧', '✦'];

  for (let i = 0; i < 60; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    s.setAttribute('aria-hidden', 'true');
    s.textContent = shapes[Math.floor(Math.random() * shapes.length)];

    const size = (Math.random() * 12 + 6).toFixed(1);   // 6 – 18 px
    const delay    = (Math.random() * 7).toFixed(2);     // 0 – 7 s offset
    const duration = (Math.random() * 3 + 2.5).toFixed(2); // 2.5 – 5.5 s cycle

    s.style.cssText = [
      `left:${(Math.random() * 100).toFixed(2)}%`,
      `top:${(Math.random() * 100).toFixed(2)}%`,
      `font-size:${size}px`,
      `animation-delay:${delay}s`,
      `animation-duration:${duration}s`
    ].join(';');

    field.appendChild(s);
  }

  document.body.prepend(field);
}

// ── Init on DOM ready ───────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  createStarfield();
  initLang();
});
