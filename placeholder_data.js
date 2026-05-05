/**
 * placeholder-data.js
 * ─────────────────────────────────────────────
 * Prototype seed data for FEEL app.
 * Include this script BEFORE data.html loads:
 *   <script src="placeholder-data.js"></script>
 *
 * It writes to localStorage under the same keys
 * the app uses — feel_emotions & feel_data —
 * but only if those keys are empty, so real user
 * data always wins.
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
  // Find this week's Monday in UTC
  const _now = new Date();
  const _dow = _now.getUTCDay(); // 0=Sun,1=Mon...6=Sat
  const _daysToMon = (_dow + 6) % 7; // days since Monday
  const _monday = new Date(_now);
  _monday.setUTCDate(_now.getUTCDate() - _daysToMon);
  _monday.setUTCHours(0, 0, 0, 0);

  // ts(dayOfWeek, hour, minute)
  // dayOfWeek: 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
  // Entries for future days this week are skipped automatically — they won't
  // appear in the past filter, which is fine for a prototype.
  function ts(dayOfWeek, hour, minute = 0) {
    const d = new Date(_monday);
    d.setUTCDate(_monday.getUTCDate() + dayOfWeek);
    d.setUTCHours(hour, minute, 0, 0);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:00`;
  }

  /* ── 3. Log entries  ── */
  //  id must be unique; button_value maps to emotion value above.
  //  We seed ~35 entries spread across the current week to match
  //  the "35 total logs" shown in the wireframe.
  // dayOfWeek: 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
  const DATA = [

    // ── Monday ──
    { id: 'p001', button_value: 3, timestamp: ts(0,  7,  5)  },  // Anger
    { id: 'p002', button_value: 1, timestamp: ts(0,  9, 20)  },  // Sadness
    { id: 'p003', button_value: 5, timestamp: ts(0, 12,  0)  },  // Calm
    { id: 'p004', button_value: 3, timestamp: ts(0, 14, 45)  },  // Anger
    { id: 'p005', button_value: 1, timestamp: ts(0, 20, 10)  },  // Sadness

    // ── Tuesday ──
    { id: 'p006', button_value: 2, timestamp: ts(1,  8, 30)  },  // Joy
    { id: 'p007', button_value: 4, timestamp: ts(1, 11,  0)  },  // Envy
    { id: 'p008', button_value: 1, timestamp: ts(1, 13, 15)  },  // Sadness
    { id: 'p009', button_value: 6, timestamp: ts(1, 17, 40)  },  // Contempt ← new
    { id: 'p010', button_value: 6, timestamp: ts(1, 21,  5)  },  // Contempt
    { id: 'p011', button_value: 1, timestamp: ts(1, 22, 50)  },  // Sadness

    // ── Wednesday ──
    { id: 'p012', button_value: 5, timestamp: ts(2,  7, 55)  },  // Calm
    { id: 'p013', button_value: 2, timestamp: ts(2, 10, 20)  },  // Joy
    { id: 'p014', button_value: 1, timestamp: ts(2, 12, 30)  },  // Sadness
    { id: 'p015', button_value: 4, timestamp: ts(2, 15,  0)  },  // Envy
    { id: 'p016', button_value: 5, timestamp: ts(2, 19, 45)  },  // Calm
    { id: 'p017', button_value: 1, timestamp: ts(2, 23, 10)  },  // Sadness

    // ── Thursday — calmest day ──
    { id: 'p018', button_value: 5, timestamp: ts(3,  8,  0)  },  // Calm
    { id: 'p019', button_value: 5, timestamp: ts(3, 10, 30)  },  // Calm
    { id: 'p020', button_value: 2, timestamp: ts(3, 12,  0)  },  // Joy
    { id: 'p021', button_value: 5, timestamp: ts(3, 14,  0)  },  // Calm
    { id: 'p022', button_value: 5, timestamp: ts(3, 16, 20)  },  // Calm
    { id: 'p023', button_value: 5, timestamp: ts(3, 20,  0)  },  // Calm

    // ── Friday ──
    { id: 'p024', button_value: 2, timestamp: ts(4,  9, 10)  },  // Joy
    { id: 'p025', button_value: 1, timestamp: ts(4, 11, 40)  },  // Sadness
    { id: 'p026', button_value: 7, timestamp: ts(4, 14,  0)  },  // Boredom ← new
    { id: 'p027', button_value: 3, timestamp: ts(4, 16, 55)  },  // Anger
    { id: 'p028', button_value: 1, timestamp: ts(4, 21, 30)  },  // Sadness

    // ── Saturday ──
    { id: 'p029', button_value: 2, timestamp: ts(5,  9,  0)  },  // Joy
    { id: 'p030', button_value: 4, timestamp: ts(5, 11, 15)  },  // Envy
    { id: 'p031', button_value: 1, timestamp: ts(5, 14, 50)  },  // Sadness
    { id: 'p032', button_value: 7, timestamp: ts(5, 17, 30)  },  // Boredom
    { id: 'p033', button_value: 6, timestamp: ts(5, 20, 45)  },  // Contempt

    // ── Sunday ──
    { id: 'p034', button_value: 3, timestamp: ts(6,  8,  0)  },  // Anger
    { id: 'p035', button_value: 1, timestamp: ts(6, 10, 30)  },  // Sadness
  ];

  /* ── 4. Write to localStorage only if empty ── */
  try {
    // Placeholder data lives under its own key so real Arduino/API
    // data (feel_data) can be merged on top without ever overwriting it.
    // Always regenerate so timestamps stay relative to today.
    localStorage.setItem('feel_emotions',    JSON.stringify(EMOTIONS));
    localStorage.setItem('feel_placeholder', JSON.stringify(DATA));
    console.log('[FEEL] Placeholder data seeded — 35 entries across the current week.');
  } catch (e) {
    console.warn('[FEEL] Could not seed placeholder data:', e);
  }

})();