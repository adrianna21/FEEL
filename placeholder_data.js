/**
 * placeholder-data.js
 * ─────────────────────────────────────────────
 * Prototype seed data for FEEL app.
 * Include this script BEFORE data.html loads:
 *   <script src="placeholder-data.js"></script>
 *
 * Covers Sunday May 10 → Tuesday May 20, 2026
 * (10 days, ~35 entries).
 * ─────────────────────────────────────────────
 */

(function seedPlaceholderData() {

  /* ── 1. Emotion palette ── */
  const EMOTIONS = [
    { name: 'Sadness',     value: 1, color: '#4a8fd4' },
    { name: 'Joy',         value: 2, color: '#f5c842' },
    { name: 'Anger',       value: 3, color: '#e05c5c' },
    { name: 'Envy',        value: 4, color: '#5ec47e' },
    { name: 'Calm',        value: 5, color: '#6bcfb0' },
    { name: 'Contempt',    value: 6, color: '#b47fd4' },
    { name: 'Boredom',     value: 7, color: '#d4b896' },
  ];

  /* ── 2. Helper: generate a UTC timestamp string ── */
  // Anchor: Sunday May 10 2026 UTC midnight
  const _anchor = new Date(Date.UTC(2026, 4, 10, 0, 0, 0)); // month is 0-indexed

  // ts(dayOffset, hour, minute)
  // dayOffset: 0=May 10 (Sun), 1=May 11 (Mon), 2=May 12 (Tue),
  //            3=May 13 (Wed), 4=May 14 (Thu), 5=May 15 (Fri),
  //            6=May 16 (Sat), 7=May 17 (Sun), 8=May 18 (Mon),
  //            9=May 19 (Tue), 10=May 20 (Wed)
  function ts(dayOffset, hour, minute = 0) {
    const d = new Date(_anchor);
    d.setUTCDate(_anchor.getUTCDate() + dayOffset);
    d.setUTCHours(hour, minute, 0, 0);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:00`;
  }

  /* ── 3. Log entries ── */
  const DATA = [

    // ── May 10 (Sun) ──
    { id: 'p001', button_value: 1, timestamp: ts(0,  8, 15) },  // Sadness
    { id: 'p002', button_value: 3, timestamp: ts(0, 11,  0) },  // Anger
    { id: 'p003', button_value: 5, timestamp: ts(0, 14, 30) },  // Calm
    { id: 'p004', button_value: 1, timestamp: ts(0, 20, 45) },  // Sadness

    // ── May 11 (Mon) ──
    { id: 'p005', button_value: 3, timestamp: ts(1,  7,  5) },  // Anger
    { id: 'p006', button_value: 1, timestamp: ts(1,  9, 20) },  // Sadness
    { id: 'p007', button_value: 5, timestamp: ts(1, 12,  0) },  // Calm
    { id: 'p008', button_value: 3, timestamp: ts(1, 14, 45) },  // Anger
    { id: 'p009', button_value: 1, timestamp: ts(1, 20, 10) },  // Sadness

    // ── May 12 (Tue) ──
    { id: 'p010', button_value: 2, timestamp: ts(2,  8, 30) },  // Joy
    { id: 'p011', button_value: 4, timestamp: ts(2, 11,  0) },  // Envy
    { id: 'p012', button_value: 1, timestamp: ts(2, 13, 15) },  // Sadness
    { id: 'p013', button_value: 6, timestamp: ts(2, 17, 40) },  // Contempt
    { id: 'p014', button_value: 1, timestamp: ts(2, 22, 50) },  // Sadness

    // ── May 13 (Wed) ──
    { id: 'p015', button_value: 5, timestamp: ts(3,  7, 55) },  // Calm
    { id: 'p016', button_value: 2, timestamp: ts(3, 10, 20) },  // Joy
    { id: 'p017', button_value: 1, timestamp: ts(3, 12, 30) },  // Sadness
    { id: 'p018', button_value: 4, timestamp: ts(3, 15,  0) },  // Envy
    { id: 'p019', button_value: 5, timestamp: ts(3, 19, 45) },  // Calm

    // ── May 14 (Thu) — calmest day ──
    { id: 'p020', button_value: 5, timestamp: ts(4,  8,  0) },  // Calm
    { id: 'p021', button_value: 5, timestamp: ts(4, 10, 30) },  // Calm
    { id: 'p022', button_value: 2, timestamp: ts(4, 12,  0) },  // Joy
    { id: 'p023', button_value: 5, timestamp: ts(4, 16, 20) },  // Calm
    { id: 'p024', button_value: 5, timestamp: ts(4, 20,  0) },  // Calm

    // ── May 15 (Fri) ──
    { id: 'p025', button_value: 2, timestamp: ts(5,  9, 10) },  // Joy
    { id: 'p026', button_value: 7, timestamp: ts(5, 12,  0) },  // Boredom
    { id: 'p027', button_value: 3, timestamp: ts(5, 16, 55) },  // Anger
    { id: 'p028', button_value: 1, timestamp: ts(5, 21, 30) },  // Sadness

    // ── May 16 (Sat) ──
    { id: 'p029', button_value: 2, timestamp: ts(6,  9,  0) },  // Joy
    { id: 'p030', button_value: 4, timestamp: ts(6, 11, 15) },  // Envy
    { id: 'p031', button_value: 7, timestamp: ts(6, 17, 30) },  // Boredom
    { id: 'p032', button_value: 6, timestamp: ts(6, 20, 45) },  // Contempt

    // ── May 17 (Sun) ──
    { id: 'p033', button_value: 1, timestamp: ts(7,  9, 30) },  // Sadness
    { id: 'p034', button_value: 5, timestamp: ts(7, 13,  0) },  // Calm
    { id: 'p035', button_value: 2, timestamp: ts(7, 18, 20) },  // Joy

    // ── May 18 (Mon) ──
    { id: 'p036', button_value: 3, timestamp: ts(8,  8, 10) },  // Anger
    { id: 'p037', button_value: 1, timestamp: ts(8, 11, 45) },  // Sadness
    { id: 'p038', button_value: 5, timestamp: ts(8, 15,  0) },  // Calm

    // ── May 19 (Tue) ──
    { id: 'p039', button_value: 2, timestamp: ts(9,  9,  0) },  // Joy
    { id: 'p040', button_value: 6, timestamp: ts(9, 14, 30) },  // Contempt
    { id: 'p041', button_value: 1, timestamp: ts(9, 20,  0) },  // Sadness

    // ── May 20 (Wed) ──
    { id: 'p042', button_value: 5, timestamp: ts(10,  8, 30) }, // Calm
    { id: 'p043', button_value: 2, timestamp: ts(10, 12,  0) }, // Joy
    { id: 'p044', button_value: 7, timestamp: ts(10, 17, 15) }, // Boredom
  ];

  /* ── 4. Write to localStorage ── */
  try {
    localStorage.setItem('feel_emotions',    JSON.stringify(EMOTIONS));
    localStorage.setItem('feel_placeholder', JSON.stringify(DATA));
    console.log('[FEEL] Placeholder data seeded — 44 entries, May 10–20 2026.');
  } catch (e) {
    console.warn('[FEEL] Could not seed placeholder data:', e);
  }

})();