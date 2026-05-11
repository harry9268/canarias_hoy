/* ============================================================
   Canarias Hoy — script.js
   Datos compartidos + lógica de la web pública
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

let eventos = [
  { id:1,  nombre:'Gay Pride Maspalomas',           isla:'Gran Canaria', cat:'orgullo',     fecha:'2026-05-10', emoji:'🏳️‍🌈', color:'#EC4899', desc:'El mayor orgullo LGTBIQ+ de África y Canarias. Desfile, conciertos y tres días de fiesta en las dunas de Maspalomas.', destacado:true  },
  { id:2,  nombre:'Día de Canarias',                isla:'Tenerife',     cat:'festivos',    fecha:'2026-05-30', emoji:'🌴',    color:'#EF4444', desc:'Fiesta nacional del Archipiélago. Actos institucionales, folklore canario, concurso de lucha y gastronomía tradicional en todas las islas.', destacado:true  },
  { id:3,  nombre:'Sonidos Líquidos',               isla:'Lanzarote',    cat:'conciertos',  fecha:'2026-06-06', emoji:'🎵',    color:'#0EA5E9', desc:'Festival de música electrónica y ambient en los Jameos del Agua. Artistas internacionales en uno de los escenarios más únicos del mundo.', destacado:true  },
  { id:4,  nombre:'Noche de San Juan — Las Canteras',isla:'Gran Canaria', cat:'festivos',   fecha:'2026-06-23', emoji:'🔥',    color:'#EF4444', desc:'La noche más mágica del año. Hogueras, zambullidas en el mar y la tradición de pedir deseos en la playa de Las Canteras.', destacado:false },
  { id:5,  nombre:'Aitana — Gira Gran Canaria',     isla:'Gran Canaria', cat:'conciertos',  fecha:'2026-07-04', emoji:'🎤',    color:'#0EA5E9', desc:'La artista más escuchada de España lleva su gira al estadio de Gran Canaria. Sold out en 48 horas.', destacado:true  },
  { id:6,  nombre:'GRANCA Live Fest',               isla:'Gran Canaria', cat:'conciertos',  fecha:'2026-07-05', emoji:'🎸',    color:'#0EA5E9', desc:'El festival multitudinario del verano canario. Artistas nacionales e internacionales en el sur de Gran Canaria.', destacado:false },
  { id:7,  nombre:'Bajada de la Rama — Agaete',     isla:'Gran Canaria', cat:'romerias',    fecha:'2026-08-04', emoji:'🌿',    color:'#92400E', desc:'El ritual prehispánico más antiguo de Canarias. Miles de personas bajan al mar arrastrando ramas de pino al ritmo de los tambores guanche.', destacado:true  },
  { id:8,  nombre:'Fiestas del Cristo de La Laguna',isla:'Tenerife',     cat:'festivos',    fecha:'2026-09-14', emoji:'✝️',    color:'#EF4444', desc:'La procesión más emotiva de Tenerife. El Cristo recorre La Laguna Patrimonio de la Humanidad rodeado de miles de fieles.', destacado:false },
  { id:9,  nombre:'Carnaval de Santa Cruz de Tenerife',isla:'Tenerife',  cat:'carnavales',  fecha:'2027-02-13', emoji:'🎭',    color:'#A855F7', desc:'El carnaval más grande de España y segundo del mundo. Comparsas, murgas y la legendaria noche de fuego.', destacado:true  },
  { id:10, nombre:'Romería de San Marcos',          isla:'Lanzarote',    cat:'romerias',    fecha:'2026-04-25', emoji:'🕯️',   color:'#92400E', desc:'Procesión tradicional en honor al patrón de Teguise. Trajes típicos, carros engalanados y la mejor gastronomía lanzaroteña.', destacado:false },
  { id:11, nombre:'Ironman Lanzarote',              isla:'Lanzarote',    cat:'deportes',    fecha:'2026-05-17', emoji:'🏊',    color:'#F97316', desc:'El triatlón de larga distancia más duro del mundo. 3,8 km de nado, 180 km en bici y 42 km corriendo bajo el sol canario.', destacado:true  },
  { id:12, nombre:'Mercadillo Artesano de Teror',   isla:'Gran Canaria', cat:'mercadillos', fecha:'2026-08-16', emoji:'🛍️',   color:'#22C55E', desc:'El mercadillo más auténtico de Gran Canaria. Artesanía local, quesos, mojo, pan de Teror y el ambiente de pueblo más encantador.', destacado:false },
];

/* ── Helpers ─────────────────────────────────────────────── */
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function isFuture(dateStr) {
  return new Date(dateStr + 'T00:00:00') >= new Date(new Date().toDateString());
}

function isThisWeek(dateStr) {
  const now = new Date();
  const d = new Date(dateStr + 'T00:00:00');
  const start = new Date(now); start.setDate(now.getDate() - now.getDay() + 1);
  const end = new Date(start); end.setDate(start.getDate() + 13);
  return d >= start && d <= end;
}

/* ── State ───────────────────────────────────────────────── */
let activeCategory = 'todos';
let activeIsland   = 'todas';

/* ── Render helpers ──────────────────────────────────────── */
function catBadge(cat) {
  const m = CAT_META[cat] || { label: cat, emoji: '📅', color: '#F97316' };
  return `<span class="cat-badge" style="--bc:${m.color}">${m.emoji} ${m.label}</span>`;
}

function buildCard(ev, featured = false) {
  const meta = CAT_META[ev.cat] || { label: ev.cat, emoji: '📅', color: '#F97316' };
  const islaEmoji = ISLA_META[ev.isla] || '🏝️';
  const future = isFuture(ev.fecha);

  if (featured) {
    return `
    <article class="feat-card" data-id="${ev.id}">
      <div class="feat-card__visual" style="background:${ev.color}22; border-color:${ev.color}44">
        <span class="feat-card__emoji">${ev.emoji}</span>
        ${future ? '<span class="badge-soon">Próximo</span>' : ''}
      </div>
      <div class="feat-card__body">
        ${catBadge(ev.cat)}
        <h3 class="feat-card__name">${ev.nombre}</h3>
        <p class="feat-card__desc">${ev.desc}</p>
        <div class="feat-card__meta">
          <span class="feat-card__isla">${islaEmoji} ${ev.isla}</span>
          <span class="feat-card__date">${formatDate(ev.fecha)}</span>
        </div>
      </div>
    </article>`;
  }

  return `
  <article class="ev-card anim-entry" data-id="${ev.id}" data-cat="${ev.cat}" data-isla="${ev.isla}">
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
    </div>
  </article>`;
}

/* ── Render featured (Esta semana) ───────────────────────── */
function renderFeatured() {
  const grid = document.getElementById('featGrid');
  if (!grid) return;
  const featured = eventos.filter(e => e.destacado).slice(0, 4);
  grid.innerHTML = featured.map(e => buildCard(e, true)).join('');
}

/* ── Render main grid ────────────────────────────────────── */
function renderGrid() {
  const grid = document.getElementById('evGrid');
  const counter = document.getElementById('evCounter');
  if (!grid) return;

  const filtered = eventos.filter(ev => {
    const catOk   = activeCategory === 'todos' || ev.cat === activeCategory;
    const islaOk  = activeIsland   === 'todas' || ev.isla === activeIsland;
    return catOk && islaOk;
  });

  grid.innerHTML = filtered.length
    ? filtered.map(e => buildCard(e)).join('')
    : '<p class="no-results">No hay eventos con ese filtro. ¡Prueba otra combinación!</p>';

  if (counter) counter.textContent = filtered.length;
  initObserver();
}

/* ── Filter buttons ──────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.filter;
      renderGrid();
    });
  });

  const islandSel = document.getElementById('islandSelect');
  if (islandSel) {
    islandSel.addEventListener('change', () => {
      activeIsland = islandSel.value;
      renderGrid();
    });
  }
}

/* ── Footer island chips ─────────────────────────────────── */
function initIslandChips() {
  document.querySelectorAll('[data-isla-chip]').forEach(chip => {
    chip.addEventListener('click', () => {
      const isla = chip.dataset.islaChip;
      const sel  = document.getElementById('islandSelect');
      if (sel) { sel.value = isla; activeIsland = isla; }
      renderGrid();
      document.getElementById('eventos')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ── IntersectionObserver animations ────────────────────── */
function initObserver() {
  const cards = document.querySelectorAll('.anim-entry');
  if (!('IntersectionObserver' in window)) {
    cards.forEach(c => c.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  cards.forEach(c => obs.observe(c));
}

/* ── Counter animation ───────────────────────────────────── */
function animateCounter(el, target, duration = 1400) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initHeroCounters() {
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count));
      });
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  const hero = document.querySelector('.hero');
  if (hero) obs.observe(hero);
}

/* ── Modal de envío de evento ────────────────────────────── */
function initModal() {
  const openBtn  = document.getElementById('openModal');
  const closeBtn = document.getElementById('closeModal');
  const modal    = document.getElementById('eventModal');
  const form     = document.getElementById('eventForm');
  const navLink  = document.querySelector('[href="#enviar"]');

  const open  = () => { modal?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { modal?.classList.remove('open'); document.body.style.overflow = ''; };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  navLink?.addEventListener('click', (e) => { e.preventDefault(); open(); });
  modal?.addEventListener('click', (e) => { if (e.target === modal) close(); });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const nombre = form.nombre.value.trim();
    const email  = form.email.value.trim();

    if (!nombre || !email) {
      showToast('Por favor, rellena todos los campos obligatorios.', 'error');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Enviando…';

    try {
      const data = Object.fromEntries(new FormData(form));
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        showToast('¡Evento enviado! Lo revisaremos pronto. 🌴', 'success');
        form.reset();
        setTimeout(close, 1800);
      } else {
        showToast('Algo salió mal. Inténtalo de nuevo.', 'error');
      }
    } catch {
      showToast('Error de conexión. Comprueba tu internet.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Enviar evento';
    }
  });
}

/* ── Toast ───────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  existing?.remove();
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 4000);
}

/* ── Mobile menu ─────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mainNav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('open'));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

/* ── Smooth scroll for nav links ─────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    if (a.getAttribute('href') === '#enviar') return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderGrid();
  initFilters();
  initIslandChips();
  initObserver();
  initHeroCounters();
  initModal();
  initMobileMenu();
  initSmoothScroll();
});
