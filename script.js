/* ============================================================
   Canarias Hoy — script.js
   Datos compartidos + lógica de la web pública
   Versión con integración Supabase
   ============================================================ */

/* ── Supabase config ─────────────────────────────────────── */
// Importado vía CDN en index.html ANTES que este script:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
const SUPABASE_URL  = 'https://clhteowfpzxdhbmregee.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsaHRlb3dmcHp4ZGhibXJlZ2VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NzU0OTgsImV4cCI6MjA5NDE1MTQ5OH0.qKKo6Wm7XilrFQ6Sn2zpBS6KpAK2jRDXjJI2heX6du0';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

/* ============================================================
   METADATOS DE CATEGORÍAS E ISLAS (sin cambios)
   ============================================================ */

const CAT_META = {
  festivos:    { label: 'Festivos',    emoji: '🎉', color: '#EF4444' },
  romerias:    { label: 'Romerías',    emoji: '🕯️', color: '#92400E' },
  carnavales:  { label: 'Carnavales',  emoji: '🎭', color: '#A855F7' },
  conciertos:  { label: 'Conciertos',  emoji: '🎵', color: '#0EA5E9' },
  mercadillos: { label: 'Mercadillos', emoji: '🛍️', color: '#22C55E' },
  deportes:    { label: 'Deportes',    emoji: '🏄', color: '#F97316' },
  orgullo:     { label: 'Orgullo',     emoji: '🏳️‍🌈', color: '#EC4899' },
};

const ISLA_META = {
  'Tenerife':      '🌋',
  'Gran Canaria':  '🏖️',
  'Lanzarote':     '🌋',
  'Fuerteventura': '🏜️',
  'La Palma':      '🌿',
  'La Gomera':     '🌲',
  'El Hierro':     '⚓',
};

/* ============================================================
   LISTA LOCAL DE EVENTOS (fallback si Supabase falla)
   ============================================================ */

// Este array es el fallback de emergencia. En condiciones normales
// los datos vienen de Supabase. Puedes vaciarlo si ya tienes todos
// los eventos en la base de datos.
let EVENTOS_FALLBACK = [
  {
    id:1, nombre:'Gay Pride Maspalomas', isla:'Gran Canaria', cat:'orgullo',
    fecha:'2026-05-28', emoji:'🏳️‍🌈', color:'#EC4899', destacado:true,
    desc:'El mayor orgullo LGTBIQ+ de África y Canarias. Desfile, conciertos y días de fiesta en las dunas de Maspalomas. Una celebración única con más de 80.000 asistentes cada año.',
    ubicacion:'Dunas de Maspalomas, San Bartolomé de Tirajana', maps:'https://maps.google.com/?q=Dunas+de+Maspalomas',
    web:'https://maspalomaspride.com', entradas:'https://maspalomaspride.com/entradas',
    precio:'Gratuito (zona VIP desde 30€)', horario:'Del 28 mayo al 1 junio · Todo el día',
  },
  // ... (mantén aquí los demás eventos como copia de seguridad)
];

/* ── Variable global de eventos (se rellena desde Supabase) ── */
let eventos = [];

/* ============================================================
   CARGA DE EVENTOS DESDE SUPABASE
   ============================================================ */

/**
 * Carga todos los eventos desde Supabase y actualiza la UI.
 * Si hay un error, usa el fallback local.
 */
async function cargarEventos() {
  try {
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .order('fecha', { ascending: true });

    if (error) throw error;

    if (data && data.length > 0) {
      // Normaliza los campos de Supabase al formato que usa la web
      eventos = data.map(normalizarEvento);
    } else {
      // Tabla vacía: usa fallback
      console.warn('Supabase devolvió 0 eventos. Usando datos locales.');
      eventos = EVENTOS_FALLBACK;
    }
  } catch (err) {
    console.error('Error cargando eventos de Supabase:', err);
    showToast('⚠️ Sin conexión. Mostrando datos locales.', 'error');
    eventos = EVENTOS_FALLBACK;
  }

  // Después de cargar, renderiza toda la web
  updateFavCounts();
  renderFeatured();
  renderGrid();
  initHeroCounters();
  injectJsonLd();
}

/**
 * Convierte una fila de Supabase al objeto que espera la web.
 * Supabase usa snake_case; la web usa camelCase en algunos campos.
 */
function normalizarEvento(row) {
  return {
    id:        row.id,
    nombre:    row.nombre,
    isla:      row.isla,
    cat:       row.categoria,          // columna: 'categoria'
    fecha:     row.fecha,
    emoji:     row.emoji     || '🎉',
    color:     row.color     || '#F97316',
    destacado: row.destacado || false,
    desc:      row.descripcion || '',   // columna: 'descripcion'
    ubicacion: row.ubicacion  || '',
    maps:      row.maps_url   || null,  // columna: 'maps_url'
    web:       row.web_url    || null,  // columna: 'web_url'
    entradas:  row.entradas_url || null, // columna: 'entradas_url'
    precio:    row.precio     || null,
    horario:   row.horario    || null,
  };
}

/* ============================================================
   SUSCRIPCIÓN EN TIEMPO REAL
   Cuando alguien añade/edita/borra en el panel, la web pública
   se actualiza automáticamente sin recargar la página.
   ============================================================ */

function initRealtimeSync() {
  supabase
    .channel('eventos-changes')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'eventos' },
      (payload) => {
        console.log('Cambio en tiempo real recibido:', payload.eventType);
        // Recarga todos los eventos cuando hay cualquier cambio
        cargarEventos();
      }
    )
    .subscribe();
}

/* ============================================================
   COORDENADAS POR UBICACIÓN (sin cambios)
   ============================================================ */

const COORD_MAP = {
  'Dunas de Maspalomas': [27.7408, -15.5846],
  'Maspalomas': [27.7408, -15.5846],
  'Las Canteras': [28.1367, -15.4391],
  'Las Palmas de Gran Canaria': [28.1248, -15.4300],
  'Estadio de Gran Canaria': [28.1007, -15.4593],
  'Agaete': [28.0994, -15.7021],
  'Teror': [28.0588, -15.5476],
  'Parque Santa Catalina': [28.1376, -15.4270],
  'Santa Cruz de Tenerife': [28.4636, -16.2518],
  'La Laguna': [28.4892, -16.3159],
  'Adeje': [28.1227, -16.7259],
  'Garachico': [28.3726, -16.7604],
  'Teide': [28.2723, -16.6421],
  'La Orotava': [28.3908, -16.5228],
  'Puerto de la Cruz': [28.4130, -16.5487],
  'Jameos del Agua': [29.1600, -13.4420],
  'Teguise': [29.0614, -13.5603],
  'Puerto del Carmen': [28.9197, -13.6613],
  'La Geria': [28.9820, -13.6330],
  'Arrecife': [28.9636, -13.5477],
  'Playa de Sotavento': [28.1548, -14.2156],
  'Puerto del Rosario': [28.4995, -13.8634],
  'Antigua': [28.4260, -14.0110],
  'Corralejo': [28.7285, -13.8677],
  'Santa Cruz de La Palma': [28.6835, -17.7642],
  'Los Llanos de Aridane': [28.6586, -17.9174],
  'Fuencaliente': [28.4800, -17.8370],
  'San Sebastián de La Gomera': [28.0916, -17.1132],
  'Valle Gran Rey': [28.0830, -17.3280],
  'Valverde': [27.8088, -17.9139],
  'El Hierro': [27.7390, -18.0300],
};

function getCoords(ev) {
  if (ev.lat && ev.lng) return [ev.lat, ev.lng];
  const loc = ev.ubicacion || '';
  for (const [key, coords] of Object.entries(COORD_MAP)) {
    if (loc.includes(key)) return coords;
  }
  const islaFallback = {
    'Gran Canaria':  [28.1248, -15.4300],
    'Tenerife':      [28.4636, -16.2518],
    'Lanzarote':     [28.9636, -13.5477],
    'Fuerteventura': [28.4995, -13.8634],
    'La Palma':      [28.6835, -17.7642],
    'La Gomera':     [28.0916, -17.1132],
    'El Hierro':     [27.7390, -18.0300],
  };
  return islaFallback[ev.isla] || [28.2916, -16.6291];
}

/* ============================================================
   COMPATIBILIDAD: saveEventos (ya no hace nada, Supabase es la fuente)
   Se mantiene por si panel.js antiguo la llama.
   ============================================================ */
function saveEventos() {
  // No-op: los datos ahora se guardan en Supabase desde panel.js
}

/* ============================================================
   HELPERS
   ============================================================ */

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function isFuture(dateStr) {
  return new Date(dateStr + 'T00:00:00') >= new Date(new Date().toDateString());
}

function isToday(dateStr) {
  return new Date(dateStr + 'T00:00:00').toDateString() === new Date().toDateString();
}

function isThisWeek(dateStr) {
  const now = new Date();
  const d   = new Date(dateStr + 'T00:00:00');
  const mon = new Date(now); mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  mon.setHours(0,0,0,0);
  const sun = new Date(mon); sun.setDate(mon.getDate() + 6); sun.setHours(23,59,59,999);
  return d >= mon && d <= sun;
}

function isThisMonth(dateStr) {
  const d = new Date(dateStr + 'T00:00:00'), n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth();
}

/* ============================================================
   STATE
   ============================================================ */

let activeCategory   = 'todos';
let activeIsland     = 'todas';
let activeDateFilter = 'todos';
let activeTab        = 'todos';
let searchQuery      = '';

/* ── Favourites (localStorage) ───────────────────────────── */
const FAV_KEY = 'ch_favourites';

function getFavs() {
  try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); }
  catch { return new Set(); }
}

function saveFavs(set) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify([...set])); } catch {}
}

function toggleFav(id) {
  const favs = getFavs();
  if (favs.has(id)) favs.delete(id); else favs.add(id);
  saveFavs(favs);
  updateFavCounts();
  return favs.has(id);
}

function isFav(id) { return getFavs().has(id); }

function updateFavCounts() {
  const n = getFavs().size;
  const countEl = document.getElementById('headerFavCount');
  const badgeEl = document.getElementById('tabFavBadge');
  if (countEl) { countEl.hidden = n === 0; countEl.textContent = n; }
  if (badgeEl) { badgeEl.hidden = n === 0; badgeEl.textContent = n; }
  const btn = document.getElementById('headerFavBtn');
  if (btn) btn.classList.toggle('has-favs', n > 0);
}

/* ============================================================
   RENDER HELPERS
   ============================================================ */

function catBadge(cat) {
  const m = CAT_META[cat] || { label: cat, emoji: '📅', color: '#F97316' };
  return `<span class="cat-badge" style="--bc:${m.color}">${m.emoji} ${m.label}</span>`;
}

function buildCard(ev, featured = false) {
  const meta      = CAT_META[ev.cat] || { label: ev.cat, emoji: '📅', color: '#F97316' };
  const islaEmoji = ISLA_META[ev.isla] || '🏝️';
  const future    = isFuture(ev.fecha);
  const fav       = isFav(ev.id);

  if (featured) {
    return `
    <article class="feat-card" data-id="${ev.id}" role="button" tabindex="0" aria-label="Ver detalles de ${ev.nombre}">
      <div class="feat-card__visual" style="background:${ev.color}22; border-color:${ev.color}44">
        <span class="feat-card__emoji">${ev.emoji}</span>
        ${future ? '<span class="badge-soon">Próximo</span>' : ''}
        <button class="fav-btn${fav ? ' active' : ''}" data-id="${ev.id}" aria-label="${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}" title="${fav ? 'Quitar favorito' : 'Guardar favorito'}">
          <svg viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="feat-card__body">
        ${catBadge(ev.cat)}
        <h3 class="feat-card__name">${ev.nombre}</h3>
        <p class="feat-card__desc">${ev.desc}</p>
        <div class="feat-card__meta">
          <span class="feat-card__isla">${islaEmoji} ${ev.isla}</span>
          <span class="feat-card__date">${formatDate(ev.fecha)}</span>
        </div>
        <span class="feat-card__cta">Ver detalles →</span>
      </div>
    </article>`;
  }

  return `
  <article class="ev-card anim-entry" data-id="${ev.id}" data-cat="${ev.cat}" data-isla="${ev.isla}" role="button" tabindex="0" aria-label="Ver detalles de ${ev.nombre}">
    <div class="ev-card__thumb" style="background:${ev.color}22; border-color:${ev.color}55">
      <span class="ev-card__emoji">${ev.emoji}</span>
    </div>
    <div class="ev-card__body">
      ${catBadge(ev.cat)}
      <h3 class="ev-card__name">${ev.nombre}</h3>
      <p class="ev-card__desc">${ev.desc}</p>
      <div class="ev-card__footer">
        <span class="ev-card__isla">${islaEmoji} ${ev.isla}</span>
        <span class="ev-card__date">${formatDate(ev.fecha)}</span>
      </div>
      <span class="ev-card__cta">Ver detalles →</span>
    </div>
    <button class="fav-btn fav-btn--card${fav ? ' active' : ''}" data-id="${ev.id}" aria-label="${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}">
      <svg viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    </button>
  </article>`;
}

/* ============================================================
   FILTER LOGIC
   ============================================================ */

function getFilteredEvents() {
  const favs = getFavs();
  return eventos.filter(ev => {
    if (activeTab === 'favoritos' && !favs.has(ev.id)) return false;
    if (activeCategory !== 'todos'  && ev.cat  !== activeCategory)  return false;
    if (activeIsland   !== 'todas'  && ev.isla !== activeIsland)    return false;
    if (activeDateFilter === 'hoy'   && !isToday(ev.fecha))         return false;
    if (activeDateFilter === 'semana' && !isThisWeek(ev.fecha))     return false;
    if (activeDateFilter === 'mes'   && !isThisMonth(ev.fecha))     return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!ev.nombre.toLowerCase().includes(q) &&
          !ev.desc.toLowerCase().includes(q)   &&
          !ev.isla.toLowerCase().includes(q))   return false;
    }
    return true;
  });
}

/* ============================================================
   RENDER FEATURED
   ============================================================ */

function renderFeatured() {
  const wrap = document.getElementById('featuredWrap');
  if (!wrap) return;
  const featured = eventos.filter(ev => ev.destacado && isFuture(ev.fecha)).slice(0, 6);
  if (!featured.length) { wrap.closest('section')?.remove(); return; }
  wrap.innerHTML = featured.map(ev => buildCard(ev, true)).join('');
  bindCardEvents(wrap);
}

/* ============================================================
   RENDER GRID
   ============================================================ */

function renderGrid() {
  const grid    = document.getElementById('eventsGrid');
  const noRes   = document.getElementById('noResults');
  const counter = document.getElementById('resultsCount');
  if (!grid) return;

  const filtered = getFilteredEvents().sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  if (counter) counter.textContent = `${filtered.length} evento${filtered.length !== 1 ? 's' : ''}`;

  if (!filtered.length) {
    grid.innerHTML = '';
    noRes?.classList.remove('hidden');
    return;
  }
  noRes?.classList.add('hidden');
  grid.innerHTML = filtered.map(ev => buildCard(ev)).join('');
  bindCardEvents(grid);
  initObserver();
}

/* ── Bind click/fav events on a container ───────────────── */
function bindCardEvents(container) {
  container.querySelectorAll('.ev-card, .feat-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.fav-btn')) return;
      openEventModal(parseInt(card.dataset.id));
    });
    card.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.fav-btn')) {
        e.preventDefault();
        openEventModal(parseInt(card.dataset.id));
      }
    });
  });

  container.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id  = parseInt(btn.dataset.id);
      const now = toggleFav(id);
      btn.classList.toggle('active', now);
      btn.querySelector('svg')?.setAttribute('fill', now ? 'currentColor' : 'none');
      btn.setAttribute('aria-label', now ? 'Quitar de favoritos' : 'Añadir a favoritos');
      if (activeTab === 'favoritos') renderGrid();
    });
  });
}

/* ============================================================
   FILTERS UI
   ============================================================ */

function initFilters() {
  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('active', b === btn));
      renderGrid();
    });
  });

  document.querySelectorAll('[data-date]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeDateFilter = btn.dataset.date;
      document.querySelectorAll('[data-date]').forEach(b => b.classList.toggle('active', b === btn));
      renderGrid();
    });
  });
}

function initIslandChips() {
  document.querySelectorAll('[data-isla]').forEach(chip => {
    chip.addEventListener('click', () => {
      activeIsland = chip.dataset.isla;
      document.querySelectorAll('[data-isla]').forEach(c => c.classList.toggle('active', c === chip));
      renderGrid();
    });
  });
}

function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    searchQuery = input.value.trim();
    renderGrid();
  });
}

function initTabs() {
  document.getElementById('tabAll')?.addEventListener('click', () => {
    activeTab = 'todos';
    document.getElementById('tabAll')?.classList.add('active');
    document.getElementById('tabFavs')?.classList.remove('active');
    renderGrid();
  });
  document.getElementById('tabFavs')?.addEventListener('click', () => {
    activeTab = 'favoritos';
    document.getElementById('tabFavs')?.classList.add('active');
    document.getElementById('tabAll')?.classList.remove('active');
    renderGrid();
  });
}

/* ============================================================
   INTERSECTION OBSERVER (animaciones)
   ============================================================ */

function initObserver() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.anim-entry').forEach(el => obs.observe(el));
}

/* ============================================================
   HERO COUNTERS
   ============================================================ */

function initHeroCounters() {
  const totalEl    = document.getElementById('heroTotal');
  const islasEl    = document.getElementById('heroIslas');
  const proximoEl  = document.getElementById('heroProximo');

  if (totalEl)   totalEl.textContent   = eventos.length;
  if (islasEl)   islasEl.textContent   = new Set(eventos.map(e => e.isla)).size;
  if (proximoEl) {
    const next = eventos.filter(e => isFuture(e.fecha)).sort((a,b) => new Date(a.fecha) - new Date(b.fecha))[0];
    proximoEl.textContent = next ? formatDate(next.fecha) : '—';
  }
}

/* ============================================================
   EVENT DETAIL MODAL
   ============================================================ */

function openEventModal(id) {
  const ev = eventos.find(e => e.id === id);
  if (!ev) return;

  const modal = document.getElementById('evDetailModal');
  if (!modal) return;

  const meta      = CAT_META[ev.cat] || { label: ev.cat, emoji: '📅', color: '#F97316' };
  const islaEmoji = ISLA_META[ev.isla] || '🏝️';
  const fav       = isFav(ev.id);

  modal.querySelector('#modalEmoji').textContent     = ev.emoji;
  modal.querySelector('#modalNombre').textContent    = ev.nombre;
  modal.querySelector('#modalDesc').textContent      = ev.desc;
  modal.querySelector('#modalFecha').textContent     = formatDate(ev.fecha);
  modal.querySelector('#modalIsla').textContent      = `${islaEmoji} ${ev.isla}`;
  modal.querySelector('#modalUbicacion').textContent = ev.ubicacion || '—';
  modal.querySelector('#modalPrecio').textContent    = ev.precio   || '—';
  modal.querySelector('#modalHorario').textContent   = ev.horario  || '—';

  const badgeEl = modal.querySelector('#modalCat');
  if (badgeEl) {
    badgeEl.textContent = `${meta.emoji} ${meta.label}`;
    badgeEl.style.setProperty('--bc', meta.color);
  }

  const webBtn      = modal.querySelector('#modalWeb');
  const entradasBtn = modal.querySelector('#modalEntradas');
  const mapsBtn     = modal.querySelector('#modalMaps');
  if (webBtn)      { webBtn.href      = ev.web      || '#'; webBtn.hidden      = !ev.web; }
  if (entradasBtn) { entradasBtn.href = ev.entradas || '#'; entradasBtn.hidden = !ev.entradas; }
  if (mapsBtn)     { mapsBtn.href     = ev.maps     || '#'; mapsBtn.hidden     = !ev.maps; }

  const favBtn = modal.querySelector('#modalFavBtn');
  if (favBtn) {
    favBtn.classList.toggle('active', fav);
    favBtn.dataset.id = id;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function initEventModal() {
  const modal   = document.getElementById('evDetailModal');
  const closeBtn = document.getElementById('closeEvDetail');
  if (!modal) return;

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
  });

  modal.querySelector('#modalFavBtn')?.addEventListener('click', (e) => {
    const id  = parseInt(e.currentTarget.dataset.id);
    const now = toggleFav(id);
    e.currentTarget.classList.toggle('active', now);
    renderFeatured();
    renderGrid();
  });
}

/* ============================================================
   JSON-LD SEO
   ============================================================ */

function injectJsonLd() {
  const existing = document.getElementById('jsonLdEvents');
  if (existing) existing.remove();

  const list = eventos.filter(ev => isFuture(ev.fecha)).slice(0, 20).map(ev => ({
    '@type':     'Event',
    'name':      ev.nombre,
    'startDate': ev.fecha,
    'location':  { '@type': 'Place', 'name': ev.ubicacion || ev.isla },
    'description': ev.desc,
    'eventStatus': 'https://schema.org/EventScheduled',
  }));

  const script = document.createElement('script');
  script.id   = 'jsonLdEvents';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': list });
  document.head.appendChild(script);
}

/* ============================================================
   SUBMIT EVENT MODAL (Formulario de sugerencia de usuarios)
   ============================================================ */

function initModal() {
  const openBtn = document.getElementById('openModal');
  const closeBtn = document.getElementById('closeModal');
  const modal   = document.getElementById('eventModal');
  const form    = document.getElementById('eventForm');
  const navLink = document.querySelector('[href="#enviar"]');
  const open  = () => { modal?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { modal?.classList.remove('open'); document.body.style.overflow = ''; };
  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  navLink?.addEventListener('click', e => { e.preventDefault(); open(); });
  modal?.addEventListener('click', e => { if (e.target === modal) close(); });
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    if (!form.nombre?.value.trim() || !form.email?.value.trim()) {
      showToast('Por favor, rellena todos los campos obligatorios.', 'error'); return;
    }
    btn.disabled = true; btn.textContent = 'Enviando…';
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json();
      if (json.success) { showToast('🌴 ¡Evento enviado! Lo revisaremos pronto.', 'success'); form.reset(); setTimeout(close, 1800); }
      else showToast('Algo salió mal. Inténtalo de nuevo.', 'error');
    } catch { showToast('Error de conexión. Comprueba tu internet.', 'error'); }
    finally  { btn.disabled = false; btn.textContent = 'Enviar evento'; }
  });
}

/* ============================================================
   TOAST
   ============================================================ */

function showToast(msg, type = 'success') {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3800);
}

/* ============================================================
   MOBILE MENU
   ============================================================ */

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mainNav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('open'));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    if (a.getAttribute('href') === '#enviar') return;
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

/* ============================================================
   NEWSLETTER
   ============================================================ */

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  form?.addEventListener('submit', async e => {
    e.preventDefault();
    showToast('✅ ¡Suscrito! Pronto recibirás novedades.', 'success');
    form.reset();
  });
}

/* ============================================================
   PWA — Service Worker + Install Banner
   ============================================================ */

let deferredPrompt = null;

function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById('pwaBanner');
    if (banner && !localStorage.getItem('ch_pwa_dismissed')) {
      setTimeout(() => { banner.hidden = false; }, 3000);
    }
  });

  document.getElementById('pwaInstallBtn')?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    document.getElementById('pwaBanner').hidden = true;
    if (outcome === 'accepted') showToast('🎉 ¡Canarias Hoy instalada!', 'success');
  });

  document.getElementById('pwaDismissBtn')?.addEventListener('click', () => {
    document.getElementById('pwaBanner').hidden = true;
    localStorage.setItem('ch_pwa_dismissed', '1');
  });

  window.addEventListener('appinstalled', () => {
    document.getElementById('pwaBanner').hidden = true;
    showToast('🎉 App instalada correctamente.', 'success');
  });
}

/* ============================================================
   INIT — Arranca la carga asíncrona de Supabase primero
   ============================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  // Muestra UI de carga mientras llegan los datos
  const grid = document.getElementById('eventsGrid');
  if (grid) grid.innerHTML = '<p style="color:#F97316;text-align:center;padding:3rem">Cargando eventos… 🌴</p>';

  // 1. Carga eventos desde Supabase (renderiza al terminar)
  await cargarEventos();

  // 2. Inicia sincronización en tiempo real
  initRealtimeSync();

  // 3. Resto de la UI (filtros, search, tabs, etc.)
  initFilters();
  initSearch();
  initTabs();
  initIslandChips();
  initModal();
  initEventModal();
  initNewsletter();
  initMobileMenu();
  initSmoothScroll();
  initPWA();

  // Handle URL params (PWA shortcuts)
  const params = new URLSearchParams(location.search);
  if (params.get('tab') === 'favoritos') {
    activeTab = 'favoritos';
    document.getElementById('tabFavs')?.click();
  }
  if (params.get('filter') === 'semana') {
    activeDateFilter = 'semana';
    document.querySelector('[data-date="semana"]')?.click();
  }
});
