/**
 * placeholder-data.js
 * ─────────────────────────────────────────────
 * Prototype seed data for FEEL app.
 * Load order: emotions-data.js → placeholder-data.js → page script
 *
 * Covers Sunday May 10 → Wednesday May 20, 2026
 *
 * KEY CHANGE vs previous version:
 *   Emotion source priority:
 *     1. 'device_emotions'  — keys saved by device_button.html after user edits
 *     2. 'ob_emotions'      — keys saved during onboarding
 *     3. Hard-coded fallback
 * ─────────────────────────────────────────────
 */

(function seedPlaceholderData() {

  /* ── 0. Full emotion color map matching CSS classes ── */
  const EMOTION_COLORS_MAP = {
    happiness:'#F6A952', anger:'#C0392B', fear:'#6C3483', disgust:'#5D7A2B',
    sadness:'#5B9EC9', envy:'#E91E8C', contempt:'#0E8C77', pride:'#922B21',
    nostalgia:'#45B39D', comfort:'#F0A87E', gratitude:'#F7C948', love:'#E8537A',
    hope:'#7EC8A4', supported:'#5DADE2', safe:'#52BE80', jealousy:'#A569BD',
    resentment:'#884EA0', shame:'#B03A2E', guilt:'#9B59B6', rejection:'#CB4335',
    betrayal:'#7B241C', loneliness:'#5D6D7E', disappointment:'#797D7F',
    numbness:'#AAB7B8', insecurity:'#8E44AD', boredom:'#95A5A6',
    overwhelmed:'#E74C3C', triumph:'#F39C12', craving:'#E67E22',
    excitement:'#F1C40F', determination:'#D35400', confidence:'#2E86C1',
    inspired:'#1ABC9C', compassion:'#E91E8C', admiration:'#3498DB',
    sympathy:'#85C1E9', empathy:'#76D7C4', romance:'#F1948A',
  };

  /* ── 1. Read active emotions: device overrides first, then onboarding ── */
  function getActiveEmotionKeys() {
    // Priority 1: device_emotions (set when user edits buttons in device_button.html)
    try {
      const raw = localStorage.getItem('device_emotions');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log('[FEEL] Using device_emotions:', parsed);
          return parsed.slice(0, 5);
        }
      }
    } catch(e) {}

    // Priority 2: ob_emotions (set during onboarding)
    try {
      const raw = localStorage.getItem('ob_emotions');
      if (raw) {
        const parsed = JSON.parse(raw).slice(0, 5);
        if (parsed.length > 0) {
          console.log('[FEEL] Using ob_emotions:', parsed);
          return parsed;
        }
      }
    } catch(e) {}

    // Priority 3: hard-coded fallback
    return ['happiness', 'sadness', 'anger', 'fear', 'envy'];
  }

  /* ── 2. Check if onboarding is complete ── */
  if (!localStorage.getItem('ob_emotions') && !localStorage.getItem('device_emotions')) {
    console.log('[FEEL] Onboarding not complete, skipping seed.');
    return;
  }

  /* ── 3. Check if re-seed is needed ── */
  function needsReseed(keys) {
    try {
      const feelRaw = localStorage.getItem('feel_emotions');
      if (!feelRaw) return true; // never seeded

      const feelEmos = JSON.parse(feelRaw);

      // Must have same count
      if (feelEmos.length !== keys.length) return true;

      // Every emotion key must match what's currently stored
      // We compare by name since that's what's persisted in feel_emotions
      const meta = typeof EMOTION_META !== 'undefined' ? EMOTION_META : {};
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i].toLowerCase();
        const expectedName = meta[k]
          ? meta[k].label
          : k.charAt(0).toUpperCase() + k.slice(1);
        if (feelEmos[i].name !== expectedName) return true;
      }
      return false;
    } catch(e) { return true; }
  }

const activeKeys = getActiveEmotionKeys();

// Force reseed if placeholder data count doesn't match DATA length
try {
  const existing = JSON.parse(localStorage.getItem('feel_placeholder') || '[]');
  if (existing.length !== 44) localStorage.removeItem('feel_emotions');
} catch(e) {}

if (!needsReseed(activeKeys)) {
    console.log('[FEEL] Placeholder data already up to date, skipping reseed.');
    return;
  }

  /* ── 4. Build EMOTIONS from active key list ── */
  const meta = typeof EMOTION_META !== 'undefined' ? EMOTION_META : {};

  const EMOTIONS = activeKeys.map((key, i) => {
    const k = key.toLowerCase();
    return {
      name:  meta[k] ? meta[k].label : k.charAt(0).toUpperCase() + k.slice(1),
      value: i + 1,
      color: EMOTION_COLORS_MAP[k] || '#77DEF8',
    };
  });

  /* ── 5. Helper: generate UTC timestamp string ── */
  const _anchor = new Date(Date.UTC(2026, 4, 10, 0, 0, 0));

  function ts(dayOffset, hour, minute = 0) {
    const d = new Date(_anchor);
    d.setUTCDate(_anchor.getUTCDate() + dayOffset);
    d.setUTCHours(hour, minute, 0, 0);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:00`;
  }

  /* ── 6. Log entries (button_value 1–5 maps to EMOTIONS above) ── */
  const DATA = [
    // May 10 (Sun)
    { id:'p001', button_value:1, timestamp:ts(0,  8, 15) },
    { id:'p002', button_value:3, timestamp:ts(0, 11,  0) },
    { id:'p003', button_value:5, timestamp:ts(0, 14, 30) },
    { id:'p004', button_value:1, timestamp:ts(0, 20, 45) },

    // May 11 (Mon)
    { id:'p005', button_value:3, timestamp:ts(1,  7,  5) },
    { id:'p045', button_value:3, timestamp:ts(1,  7,  5) },
    { id:'p046', button_value:3, timestamp:ts(1,  8,  10) },
    { id:'p006', button_value:1, timestamp:ts(1,  9, 20) },
    { id:'p007', button_value:5, timestamp:ts(1, 12,  0) },
    { id:'p047', button_value:5, timestamp:ts(1, 12,  0) },
    { id:'p008', button_value:3, timestamp:ts(1, 14, 45) },
    { id:'p009', button_value:1, timestamp:ts(1, 20, 10) },

    // May 12 (Tue)
    { id:'p010', button_value:2, timestamp:ts(2,  8, 30) },
    { id:'p011', button_value:4, timestamp:ts(2, 11,  0) },
    { id:'p012', button_value:1, timestamp:ts(2, 13, 15) },
    { id:'p013', button_value:5, timestamp:ts(2, 17, 40) },
    { id:'p049', button_value:5, timestamp:ts(2, 17, 55) },
    { id:'p050', button_value:5, timestamp:ts(2, 20, 40) },
    { id:'p051', button_value:5, timestamp:ts(2, 19, 40) },
    { id:'p052', button_value:5, timestamp:ts(2, 17, 40) },
    { id:'p014', button_value:1, timestamp:ts(2, 22, 50) },
    { id:'p053', button_value:4, timestamp:ts(2, 22, 55) },

    // May 13 (Wed)
    { id:'p015', button_value:5, timestamp:ts(3,  7, 55) },
    { id:'p016', button_value:2, timestamp:ts(3, 10, 20) },
    { id:'p017', button_value:1, timestamp:ts(3, 12, 30) },
    { id:'p018', button_value:4, timestamp:ts(3, 15,  0) },
    { id:'p019', button_value:5, timestamp:ts(3, 19, 45) },

    // May 14 (Thu)
    { id:'p020', button_value:5, timestamp:ts(4,  8,  0) },
    { id:'p021', button_value:5, timestamp:ts(4, 10, 30) },
    { id:'p022', button_value:2, timestamp:ts(4, 12,  0) },
    { id:'p023', button_value:5, timestamp:ts(4, 16, 20) },
    { id:'p024', button_value:5, timestamp:ts(4, 20,  0) },

    // May 15 (Fri)
    { id:'p025', button_value:2, timestamp:ts(5,  9, 10) },
    { id:'p026', button_value:4, timestamp:ts(5, 12,  0) },
    { id:'p027', button_value:3, timestamp:ts(5, 16, 55) },
    { id:'p028', button_value:1, timestamp:ts(5, 21, 30) },

    // May 16 (Sat)
    { id:'p029', button_value:2, timestamp:ts(6,  9,  0) },
    { id:'p030', button_value:4, timestamp:ts(6, 11, 15) },
    { id:'p031', button_value:3, timestamp:ts(6, 17, 30) },
    { id:'p032', button_value:5, timestamp:ts(6, 20, 45) },

    // May 17 (Sun)
    { id:'p033', button_value:1, timestamp:ts(7,  9, 30) },
    { id:'p034', button_value:5, timestamp:ts(7, 13,  0) },
    { id:'p035', button_value:2, timestamp:ts(7, 18, 20) },

    // May 18 (Mon)
    { id:'p036', button_value:3, timestamp:ts(8,  8, 10) },
    { id:'p037', button_value:1, timestamp:ts(8, 11, 45) },
    { id:'p038', button_value:5, timestamp:ts(8, 15,  0) },

    // May 19 (Tue)
    { id:'p039', button_value:2, timestamp:ts(9,  9,  0) },
    { id:'p040', button_value:4, timestamp:ts(9, 14, 30) },
    { id:'p041', button_value:1, timestamp:ts(9, 20,  0) },

    // May 20 (Wed)
    { id:'p042', button_value:5, timestamp:ts(10,  8, 30) },
    { id:'p043', button_value:2, timestamp:ts(10, 12,  0) },
    { id:'p044', button_value:3, timestamp:ts(10, 17, 15) },
  ];

  /* ── 7. Clamp any button_value that exceeds emotion count ── */
  DATA.forEach(d => {
    if (d.button_value > EMOTIONS.length) {
      d.button_value = (d.button_value % EMOTIONS.length) || 1;
    }
  });

  /* ── 8. Write to localStorage ── */
  try {
    localStorage.setItem('feel_emotions',    JSON.stringify(EMOTIONS));
    localStorage.setItem('feel_placeholder', JSON.stringify(DATA));
    console.log('[FEEL] Seeded', DATA.length, 'entries. Emotions:', EMOTIONS.map(e => `${e.name}(${e.color})`).join(', '));
  } catch(e) {
    console.warn('[FEEL] Could not seed placeholder data:', e);
  }

})();