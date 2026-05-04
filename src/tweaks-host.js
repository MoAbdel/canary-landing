// Tweaks host — stores state in localStorage, broadcasts to React, also
// persists to the EDITMODE block when running inside the design host.
(function () {
  const STORAGE_KEY = 'canary.tweaks.v1';

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "direction": "safe",
    "headline": "Instruments for the modern desk.",
    "dropDateISO": "",
    "countdown": "off",
    "palette": "canary",
    "sectionOrder": ["hero", "manifesto", "system", "capture", "community"]
  }/*EDITMODE-END*/;

  const SECTION_LABELS = {
    hero: "Hero / Film",
    manifesto: "Manifesto",
    system: "The System",
    capture: "Email capture",
    community: "Community"
  };

  // --- state ----------------------------------------------------------------
  let state = loadState();
  const listeners = new Set();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...TWEAK_DEFAULTS };
      const parsed = JSON.parse(raw);
      return { ...TWEAK_DEFAULTS, ...parsed };
    } catch {
      return { ...TWEAK_DEFAULTS };
    }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

  function setState(patch, opts = {}) {
    state = { ...state, ...patch };
    saveState();
    // broadcast to React
    window.dispatchEvent(new CustomEvent('canary:tweaks', { detail: state }));
    // update UI reflections
    reflectPanel();
    applyPalette();
    // persist to edit mode host if present
    if (!opts.silent && window.parent && window.parent !== window) {
      try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
      } catch {}
    }
  }

  window.CanaryTweaks = {
    get: () => ({ ...state }),
    set: setState,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  };

  // --- panel wiring ---------------------------------------------------------
  const panel = document.getElementById('tweaks-panel');
  const closeBtn = panel.querySelector('.tw-close');
  const dirEl = panel.querySelector('#tw-direction');
  const hdlEl = panel.querySelector('#tw-headline');
  const dateEl = panel.querySelector('#tw-drop-date');
  const cdEl = panel.querySelector('#tw-countdown');
  const palEl = panel.querySelector('#tw-palette');
  const orderEl = panel.querySelector('#tw-order');

  closeBtn.addEventListener('click', () => setPanelOpen(false));

  dirEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-direction]');
    if (!btn) return;
    setState({ direction: btn.dataset.direction });
  });
  cdEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-countdown]');
    if (!btn) return;
    setState({ countdown: btn.dataset.countdown });
  });
  palEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-palette]');
    if (!btn) return;
    setState({ palette: btn.dataset.palette });
  });
  hdlEl.addEventListener('input', (e) => setState({ headline: e.target.value }));
  dateEl.addEventListener('input', (e) => {
    const v = e.target.value;
    if (!v) { setState({ dropDateISO: "" }); return; }
    // value is local datetime — convert to ISO
    const d = new Date(v);
    setState({ dropDateISO: isNaN(d) ? "" : d.toISOString() });
  });

  function renderOrder() {
    orderEl.innerHTML = '';
    state.sectionOrder.forEach((key, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${String(idx + 1).padStart(2, '0')} · ${SECTION_LABELS[key] || key}</span>
        <span class="tw-mv">
          <button data-act="up" data-key="${key}" aria-label="Move ${key} up">↑</button>
          <button data-act="dn" data-key="${key}" aria-label="Move ${key} down">↓</button>
        </span>
      `;
      orderEl.appendChild(li);
    });
  }
  orderEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-act]');
    if (!btn) return;
    const key = btn.dataset.key;
    const act = btn.dataset.act;
    const order = [...state.sectionOrder];
    const i = order.indexOf(key);
    if (i < 0) return;
    if (act === 'up' && i > 0) { [order[i-1], order[i]] = [order[i], order[i-1]]; }
    if (act === 'dn' && i < order.length - 1) { [order[i+1], order[i]] = [order[i], order[i+1]]; }
    setState({ sectionOrder: order });
  });

  function reflectPanel() {
    // direction
    dirEl.querySelectorAll('button').forEach(b =>
      b.setAttribute('aria-pressed', b.dataset.direction === state.direction ? 'true' : 'false')
    );
    // countdown
    cdEl.querySelectorAll('button').forEach(b =>
      b.setAttribute('aria-pressed', b.dataset.countdown === state.countdown ? 'true' : 'false')
    );
    // palette
    palEl.querySelectorAll('button').forEach(b =>
      b.setAttribute('aria-pressed', b.dataset.palette === state.palette ? 'true' : 'false')
    );
    // headline
    if (document.activeElement !== hdlEl) hdlEl.value = state.headline;
    // date
    if (state.dropDateISO) {
      const d = new Date(state.dropDateISO);
      if (!isNaN(d)) {
        const pad = n => String(n).padStart(2, '0');
        const v = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
        if (document.activeElement !== dateEl) dateEl.value = v;
      }
    } else {
      if (document.activeElement !== dateEl) dateEl.value = '';
    }
    renderOrder();
  }

  // --- palette theming ------------------------------------------------------
  const PALETTES = {
    canary: { bg: '#FFEF00', fg: '#111111', inverse: false, name: 'Canary' },
    white:  { bg: '#FFFFFF', fg: '#111111', inverse: false, name: 'White' },
    recon:  { bg: '#1E1F22', fg: '#E8E4D6', inverse: true,  name: 'C01 Recon' },
    strike: { bg: '#FF5B1F', fg: '#111111', inverse: false, name: 'C01 Strike' }
  };
  function applyPalette() {
    const p = PALETTES[state.palette] || PALETTES.canary;
    console.log('[canary] applyPalette', state.palette, p.bg);
    const root = document.documentElement.style;
    root.setProperty('--canary', p.bg, 'important');
    root.setProperty('--ink', p.fg, 'important');
    // recompute ink tints
    const [r,g,b] = hexToRgb(p.fg);
    root.setProperty('--ink-60', `rgba(${r},${g},${b},0.6)`);
    root.setProperty('--ink-40', `rgba(${r},${g},${b},0.4)`);
    root.setProperty('--ink-20', `rgba(${r},${g},${b},0.2)`);
    root.setProperty('--ink-10', `rgba(${r},${g},${b},0.1)`);
    document.body.dataset.palette = state.palette;
    document.body.dataset.inverse = p.inverse ? 'true' : 'false';
  }
  function hexToRgb(hex) {
    const m = hex.replace('#','');
    const bigint = parseInt(m.length === 3 ? m.split('').map(c=>c+c).join('') : m, 16);
    return [(bigint>>16)&255, (bigint>>8)&255, bigint&255];
  }

  // --- toolbar integration --------------------------------------------------
  function setPanelOpen(open) {
    panel.classList.toggle('open', open);
  }
  window.addEventListener('message', (ev) => {
    const d = ev.data || {};
    if (d.type === '__activate_edit_mode') setPanelOpen(true);
    else if (d.type === '__deactivate_edit_mode') setPanelOpen(false);
  });
  // announce availability AFTER listener is wired
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    }
  } catch {}

  // init
  reflectPanel();
  applyPalette();
  // give React a chance to see initial state too
  queueMicrotask(() => {
    window.dispatchEvent(new CustomEvent('canary:tweaks', { detail: state }));
  });
})();
