/**
 * PATCH for device_button.html
 *
 * Problem: When a user reassigns an emotion via the picker, BUTTONS[] is
 * updated in memory but never written back to localStorage.  placeholder-data.js
 * therefore keeps using the original ob_emotions values.
 *
 * Fix: After every picker selection AND when closePicker() runs, persist the
 * current BUTTONS key-order to localStorage as 'device_emotions'
 * (an array of 5 emotion keys, e.g. ['happiness','comfort','love','jealousy','sympathy']).
 *
 * ─── WHERE TO ADD EACH SNIPPET ───────────────────────────────────────────────
 */


/* ── 1. NEW helper — add this function anywhere in the <script> block ── */
function saveDeviceEmotions() {
  const keys = BUTTONS.map(b => b.key);
  localStorage.setItem('device_emotions', JSON.stringify(keys));
}


/* ── 2. REPLACE the existing closePicker() with this version ── */
function closePicker() {
  saveDeviceEmotions();                 // ← persist before closing
  document.getElementById('picker-overlay').classList.remove('active');
  editingButton = null;
}


/* ── 3. INSIDE card.onclick (the mini-card click handler inside buildPickerGrids),
        add one line right after renderList() and updateActiveStrip() ── */
// card.onclick = () => {
//   BUTTONS[editingButton].emotion = label;
//   BUTTONS[editingButton].key     = key;
//   … existing code …
//   renderList();
//   updateActiveStrip();
//   saveDeviceEmotions();   // ← ADD THIS LINE
// };


/* ── 4. ALSO initialise from 'device_emotions' if it exists.
        REPLACE the existing getOnboardingEmotions() call that builds BUTTONS
        (the line: const selectedEmotions = getOnboardingEmotions(); )
        with the block below ── */
function getActiveEmotions() {
  // Prefer device-level overrides set in the picker
  try {
    const raw = localStorage.getItem('device_emotions');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 5) return parsed;
    }
  } catch(e) {}
  // Fall back to onboarding selections
  return getOnboardingEmotions();
}
// Then build BUTTONS with:
// const selectedEmotions = getActiveEmotions();