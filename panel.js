/* ============================================================
   Canarias Hoy — panel.js
   Lógica del panel de gestión de eventos
   ============================================================ */

/* ── Password protection ─────────────────────────────────── */
(function () {
  const KEY   = 'ch_panel_auth';
  const PASS  = 'canarias2026';
  const wall  = document.getElementById('authWall');
  const app   = document.getElementById('panelApp');
  const form  = document.getElementById('authForm');
  const input = document.getElementById('authInput');
  const err   = document.getElementById('authError');

  if (sessionStorage.getItem(KEY) === '1') {
    wall.style.display = 'none';
    app.style.display  = 'block';
    initPanel();
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value === PASS) {
      sessionStorage.setItem(KEY, '1');
      wall.style.display = 'none';
      app.style.display  = 'block';
      initPanel();
    } else {
      err.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
      input.value = '';
      input.focus();
    }
  });
})();

/* ── Panel state ─────────────────────────────────────────── */
// Carga desde localStorage si hay datos guardados (sincronización con index)
function loadPanelEventos() {
  try {
    const raw = localStorage.getItem('ch_eventos_v1');
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved) && saved.length > 0) return saved;
    }
  } catch {}
  return JSON.parse(JSON.stringify(eventos));
}

let panelEventos   = loadPanelEventos();
let selectedId     = null;
let panelCatFilter = 'todas';
let panelIslaFilter= 'todas';

const EMOJIS = ['🎉','🕯️','🎭','🎵','🛍️','🏄','🏳️‍🌈','🌴','🔥','🎤','🎸','🌿','✝️','🏊','🕯️','🏝️','🌊','⭐','🎪','🎺','🥁','🎨','🍾','🌟'];
const SWATCHES = ['#EF4444','#92400E','#A855F7','#0EA5E9','#22C55E','#F97316','#EC4899','#FCD34D','#14B8A6','#8B5CF6'];

/* ── Helpers ─────────────────────────────────────────────── */
function pFormatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function pIsFuture(dateStr) {
  return new Date(dateStr + 'T00:00:00') >= new Date(new Date().toDateString());
}

function getNextId() {
  return Math.max(0, ...panelEventos.map(e => e.id)) + 1;
}

/* ── Render grid ─────────────────────────────────────────── */
function renderPanelGrid() {
  const grid = document.getElementById('panelGrid');
  if (!grid) return;

  const filtered = panelEventos.filter(ev => {
    const catOk  = panelCatFilter  === 'todas' || ev.cat  === panelCatFilter;
    const islaOk = panelIslaFilter === 'todas' || ev.isla === panelIslaFilter;
    return catOk && islaOk;
  });

  if (!filtered.length) {
    grid.innerHTML = '<p class="p-no-results">No hay eventos con estos filtros.</p>';
    return;
  }

  grid.innerHTML = filtered.map(ev => buildPanelCard(ev)).join('');

  grid.querySelectorAll('.p-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.p-card__del')) return;
      selectEvent(parseInt(card.dataset.id));
    });
  });

  grid.querySelectorAll('.p-card__del').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      confirmDelete(parseInt(btn.dataset.id));
    });
  });

  updateStatusBar();
}

function buildPanelCard(ev) {
  const meta    = CAT_META[ev.cat] || { label: ev.cat, emoji: '📅', color: '#F97316' };
  const islaEm  = ISLA_META[ev.isla] || '🏝️';
  const selected = selectedId === ev.id ? 'selected' : '';
  return `
  <article class="p-card ${selected}" data-id="${ev.id}" style="--ac:${ev.color}">
    <button class="p-card__del" data-id="${ev.id}" title="Eliminar">✕</button>
    <div class="p-card__thumb" style="background:${ev.color}22">
      <span>${ev.emoji}</span>
    </div>
    <span class="p-cat-badge" style="--bc:${meta.color}">${meta.emoji} ${meta.label}</span>
    <h3 class="p-card__name">${ev.nombre}</h3>
    <div class="p-card__meta">
      <span>${islaEm} ${ev.isla}</span>
      <span class="p-card__date">${pFormatDate(ev.fecha)}</span>
    </div>
  </article>`;
}

/* ── Select & edit panel ─────────────────────────────────── */
function selectEvent(id) {
  selectedId = id;
  const ev = panelEventos.find(e => e.id === id);
  if (!ev) return;

  renderPanelGrid();

  const panel = document.getElementById('editPanel');
  panel.classList.add('open');

  document.getElementById('editNombre').value    = ev.nombre;
  document.getElementById('editIsla').value      = ev.isla;
  document.getElementById('editCat').value       = ev.cat;
  document.getElementById('editFecha').value     = ev.fecha;
  document.getElementById('editDesc').value      = ev.desc;
  document.getElementById('editDestacado').checked = ev.destacado;

  renderEmojiPicker(ev.emoji, ev);
  renderColorSwatches(ev.color, ev);
  renderPreview(ev);
}

function renderPreview(ev) {
  const meta   = CAT_META[ev.cat] || { label: ev.cat, emoji: '📅', color: '#F97316' };
  const islaEm = ISLA_META[ev.isla] || '🏝️';
  document.getElementById('previewCard').innerHTML = `
    <div class="prev-card" style="--ac:${ev.color}">
      <div class="prev-thumb" style="background:${ev.color}22; border-color:${ev.color}55">
        <span class="prev-emoji">${ev.emoji}</span>
      </div>
      <span class="prev-badge" style="background:${meta.color}22;color:${meta.color};border:1px solid ${meta.color}55">
        ${meta.emoji} ${meta.label}
      </span>
      <p class="prev-name">${ev.nombre || '—'}</p>
      <p class="prev-desc">${ev.desc || ''}</p>
      <div class="prev-foot">
        <span>${islaEm} ${ev.isla}</span>
        <span style="color:#F97316;font-family:'JetBrains Mono',monospace;font-size:.75rem">${pFormatDate(ev.fecha)}</span>
      </div>
    </div>`;
}

function renderEmojiPicker(currentEmoji, ev) {
  const picker = document.getElementById('emojiPicker');
  picker.innerHTML = EMOJIS.map(em => `
    <button class="ep-btn ${em === currentEmoji ? 'active' : ''}" data-emoji="${em}">${em}</button>
  `).join('');
  picker.querySelectorAll('.ep-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      picker.querySelectorAll('.ep-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ev.emoji = btn.dataset.emoji;
      renderPreview(ev);
      syncGridCard(ev);
    });
  });
}

function renderColorSwatches(currentColor, ev) {
  const sw = document.getElementById('colorSwatches');
  sw.innerHTML = SWATCHES.map(c => `
    <button class="swatch ${c === currentColor ? 'active' : ''}" data-color="${c}" style="background:${c}" title="${c}"></button>
  `).join('');
  sw.querySelectorAll('.swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      sw.querySelectorAll('.swatch').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ev.color = btn.dataset.color;
      renderPreview(ev);
      syncGridCard(ev);
    });
  });
}

/* ── Live edit sync ──────────────────────────────────────── */
function initLiveEdit() {
  const fields = ['editNombre','editIsla','editCat','editFecha','editDesc','editDestacado'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', syncFromForm);
    el?.addEventListener('change', syncFromForm);
  });
}

function syncFromForm() {
  if (!selectedId) return;
  const ev = panelEventos.find(e => e.id === selectedId);
  if (!ev) return;
  ev.nombre    = document.getElementById('editNombre').value;
  ev.isla      = document.getElementById('editIsla').value;
  ev.cat       = document.getElementById('editCat').value;
  ev.fecha     = document.getElementById('editFecha').value;
  ev.desc      = document.getElementById('editDesc').value;
  ev.destacado = document.getElementById('editDestacado').checked;
  renderPreview(ev);
  syncGridCard(ev);
  renderEmojiPicker(ev.emoji, ev);
  renderColorSwatches(ev.color, ev);
}

function syncGridCard(ev) {
  const card = document.querySelector(`.p-card[data-id="${ev.id}"]`);
  if (!card) return;
  card.outerHTML = buildPanelCard(ev);
  rebindCardEvents();
}

function rebindCardEvents() {
  document.querySelectorAll('.p-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.p-card__del')) return;
      selectEvent(parseInt(card.dataset.id));
    });
  });
  document.querySelectorAll('.p-card__del').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      confirmDelete(parseInt(btn.dataset.id));
    });
  });
}

/* ── Save ────────────────────────────────────────────────── */
function initSave() {
  document.getElementById('saveBtn')?.addEventListener('click', () => {
    syncFromForm();
    // Persiste en localStorage para que index.html lo vea
    if (typeof saveEventos === 'function') saveEventos(panelEventos);
    else { try { localStorage.setItem('ch_eventos_v1', JSON.stringify(panelEventos)); } catch {} }
    pShowToast('Cambios guardados y publicados ✓', 'success');
    renderPanelGrid();
  });
}

/* ── Delete ──────────────────────────────────────────────── */
function confirmDelete(id) {
  const ev = panelEventos.find(e => e.id === id);
  if (!ev) return;
  const modal = document.getElementById('deleteModal');
  document.getElementById('deleteModalName').textContent = ev.nombre;
  modal.classList.add('open');
  document.getElementById('confirmDelete').onclick = () => {
    panelEventos = panelEventos.filter(e => e.id !== id);
    try { localStorage.setItem('ch_eventos_v1', JSON.stringify(panelEventos)); } catch {}
    modal.classList.remove('open');
    if (selectedId === id) {
      selectedId = null;
      document.getElementById('editPanel').classList.remove('open');
    }
    renderPanelGrid();
    pShowToast('Evento eliminado.', 'success');
  };
  document.getElementById('cancelDelete').onclick = () => modal.classList.remove('open');
}

function initDeleteBtn() {
  document.getElementById('deleteBtn')?.addEventListener('click', () => {
    if (!selectedId) return;
    confirmDelete(selectedId);
  });
}

/* ── New event ───────────────────────────────────────────── */
function initNewEvent() {
  document.getElementById('newEventBtn')?.addEventListener('click', () => {
    const newEv = {
      id: getNextId(), nombre: 'Nuevo evento', isla: 'Tenerife', cat: 'festivos',
      fecha: new Date().toISOString().split('T')[0], emoji: '🎉',
      color: '#EF4444', desc: 'Descripción del evento.', destacado: false,
    };
    panelEventos.unshift(newEv);
    renderPanelGrid();
    selectEvent(newEv.id);
    pShowToast('Nuevo evento creado. ¡Edítalo a continuación!', 'success');
  });
}

/* ── Close panel ─────────────────────────────────────────── */
function initClosePanel() {
  document.getElementById('closePanelBtn')?.addEventListener('click', () => {
    selectedId = null;
    document.getElementById('editPanel').classList.remove('open');
    renderPanelGrid();
  });
}

/* ── Export JSON ─────────────────────────────────────────── */
function initExport() {
  document.getElementById('exportBtn')?.addEventListener('click', () => {
    const json = JSON.stringify(panelEventos, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'canarias-hoy-eventos.json';
    a.click();
    URL.revokeObjectURL(url);
    pShowToast('JSON exportado correctamente.', 'success');
  });

  document.getElementById('resetBtn')?.addEventListener('click', () => {
    if (!confirm('¿Restablecer los eventos originales? Se perderán los cambios guardados.')) return;
    try { localStorage.removeItem('ch_eventos_v1'); } catch {}
    panelEventos = JSON.parse(JSON.stringify(eventos));
    selectedId = null;
    document.getElementById('editPanel')?.classList.remove('open');
    renderPanelGrid();
    pShowToast('Eventos restablecidos al original.', 'success');
  });
}

/* ── Filters ─────────────────────────────────────────────── */
function initPanelFilters() {
  document.getElementById('panelIslaFilter')?.addEventListener('change', (e) => {
    panelIslaFilter = e.target.value;
    renderPanelGrid();
  });
  document.getElementById('panelCatFilter')?.addEventListener('change', (e) => {
    panelCatFilter = e.target.value;
    renderPanelGrid();
  });
}

/* ── Status bar ──────────────────────────────────────────── */
function updateStatusBar() {
  const total    = document.getElementById('sbTotal');
  const proximos = document.getElementById('sbProximos');
  const dist     = document.getElementById('sbDist');
  if (total)    total.textContent    = panelEventos.length;
  if (proximos) proximos.textContent = panelEventos.filter(e => pIsFuture(e.fecha)).length;
  if (dist) {
    const counts = {};
    panelEventos.forEach(e => { counts[e.isla] = (counts[e.isla] || 0) + 1; });
    dist.textContent = Object.entries(counts)
      .sort((a,b) => b[1]-a[1])
      .map(([isla, n]) => `${ISLA_META[isla]||'🏝️'} ${isla.split(' ')[0]} ${n}`)
      .join(' · ');
  }
}

/* ── Toast ───────────────────────────────────────────────── */
function pShowToast(msg, type = 'success') {
  const existing = document.querySelector('.p-toast');
  existing?.remove();
  const t = document.createElement('div');
  t.className = `p-toast p-toast--${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
}

/* ── Init ────────────────────────────────────────────────── */
function initPanel() {
  renderPanelGrid();
  initLiveEdit();
  initSave();
  initDeleteBtn();
  initNewEvent();
  initClosePanel();
  initExport();
  initPanelFilters();
}
