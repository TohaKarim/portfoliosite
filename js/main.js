/* =========================================================
   Toha Karim Sujal - Portfolio  |  main.js
   ========================================================= */

/* ---------- EDIT YOUR DETAILS HERE ---------- */
const CONFIG = {
  name: 'Toha Karim Sujal',
  email: 'sujalleo123@gmail.com',
  phone: '+8801744188079',
  phoneDisplay: '+880 1744 188079',
  address: 'Bashundhara C Block, Road 7',
  cv: 'assets/Toha_Karim_Sujal_CV.pdf',
  // Replace '#' with your real profile links
  social: { github: '#', linkedin: '#', facebook: '#' }
};

const NAV = [
  { id: 'home',     href: 'index.html',    icon: 'home',      label: 'Home' },
  { id: 'resume',   href: 'resume.html',   icon: 'user',      label: 'Resume' },
  { id: 'projects', href: 'projects.html', icon: 'briefcase', label: 'Projects' },
  { id: 'contact',  href: 'contact.html',  icon: 'mail',      label: 'Contact' }
];

const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

/* ---------- shared shell: nav, theme switcher, footer ---------- */
function buildShell() {
  const page = document.body.dataset.page || 'home';
  const root = document.body.dataset.root || '';   // '' for all pages (flat folder)

  const nav = document.createElement('nav');
  nav.className = 'side-nav';
  nav.setAttribute('aria-label', 'Main');
  nav.innerHTML = NAV.map(n =>
    `<a href="${root}${n.href}" class="${n.id === page ? 'active' : ''}" aria-label="${n.label}">${ICON(n.icon)}<span>${n.label}</span></a>`
  ).join('');
  document.body.appendChild(nav);

  const colors = ['#ffb400', '#ff7a1a', '#35c76f', '#2fa8ff', '#ff4d8d', '#a066ff'];
  const saved = store.get('accent') || colors[0];
  setAccent(saved);
  const toggle = document.createElement('button');
  toggle.className = 'theme-toggle'; toggle.setAttribute('aria-label', 'Change theme colour');
  toggle.innerHTML = ICON('gear');
  const panel = document.createElement('div');
  panel.className = 'theme-panel';
  panel.innerHTML = '<h4>Theme colour</h4><div class="swatches">' +
    colors.map(c => `<button style="background:${c}" data-c="${c}" class="${c === saved ? 'on' : ''}" aria-label="${c}"></button>`).join('') + '</div>';
  document.body.append(panel, toggle);
  toggle.addEventListener('click', () => panel.classList.toggle('open'));
  panel.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    setAccent(b.dataset.c); store.set('accent', b.dataset.c);
    $$('.swatches button', panel).forEach(x => x.classList.toggle('on', x === b));
  });

  const f = document.createElement('footer');
  f.innerHTML = `<div class="container"><span>&copy; ${new Date().getFullYear()} ${CONFIG.name}. All rights reserved.</span>
    <div class="socials">${socialLinks()}</div></div>`;
  document.body.appendChild(f);

  const toast = document.createElement('div');
  toast.className = 'toast'; toast.id = 'toast';
  document.body.appendChild(toast);
}
function setAccent(c) { document.documentElement.style.setProperty('--accent', c); }
function socialLinks() {
  return ['github', 'linkedin', 'facebook'].map(k =>
    `<a href="${CONFIG.social[k]}" target="_blank" rel="noopener" aria-label="${k}">${ICON(k)}</a>`).join('');
}
function showToast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(showToast.t); showToast.t = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ---------- fill config-driven placeholders ---------- */
function fillConfig() {
  $$('[data-cfg]').forEach(el => {
    const k = el.dataset.cfg;
    if (k === 'email') { el.textContent = CONFIG.email; if (el.tagName === 'A') el.href = 'mailto:' + CONFIG.email; }
    if (k === 'phone') { el.textContent = CONFIG.phoneDisplay; if (el.tagName === 'A') el.href = 'tel:' + CONFIG.phone; }
    if (k === 'address') el.textContent = CONFIG.address;
    if (k === 'socials') el.innerHTML = socialLinks();
  });
}

/* ---------- typing effect ---------- */
function typer() {
  const el = $('#typed'); if (!el) return;
  const words = (el.dataset.words || '').split('|');
  let w = 0, i = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; return setTimeout(tick, 350); }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 45 : 85);
  })();
}

/* ---------- reveal, counters, skill bars ---------- */
function observers() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
    if (e.target.matches('.stat')) countUp($('.n b', e.target));
    $$('.skill .bar i', e.target).forEach(b => b.style.width = b.dataset.w + '%');
    if (e.target.matches('.skill')) { const b = $('.bar i', e.target); b.style.width = b.dataset.w + '%'; }
  }), { threshold: .15 });
  $$('.reveal, .stat, .skill').forEach(el => io.observe(el));
}
function countUp(el) {
  if (!el) return;
  const end = +el.dataset.to, dur = 1400, t0 = performance.now();
  (function step(t) {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ---------- CV viewer / modal ---------- */
function cvViewer() {
  const modal = $('#cvModal');
  $$('[data-open-cv]').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    if (modal) {
      const fr = $('iframe', modal); if (!fr.src) fr.src = CONFIG.cv + '#view=FitH';
      modal.classList.add('open');
    } else { window.open(CONFIG.cv, '_blank'); }
  }));
  $$('[data-close-cv]').forEach(b => b.addEventListener('click', () => modal && modal.classList.remove('open')));
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
  }
  $$('[data-cv-href]').forEach(a => a.href = CONFIG.cv);
  // inline viewer toggle
  const tg = $('#toggleViewer'), v = $('#cvInline');
  if (tg && v) tg.addEventListener('click', () => {
    const open = v.hidden; v.hidden = !open;
    const fr = $('iframe', v); if (open && !fr.src) fr.src = CONFIG.cv + '#view=FitH';
    tg.querySelector('.lbl').textContent = open ? 'Hide CV' : 'View CV';
    if (open) v.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* ---------- project filters ---------- */
function filters() {
  const bar = $('.filters'); if (!bar) return;
  bar.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', bar).forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.f;
    $$('.card[data-cat]').forEach(c => c.classList.toggle('hide', f !== 'all' && !c.dataset.cat.split(' ').includes(f)));
  });
}

/* ---------- lightbox for project images ---------- */
function lightbox() {
  const imgs = $$('[data-zoom]'); if (!imgs.length) return;
  const lb = document.createElement('div'); lb.className = 'lightbox';
  lb.innerHTML = '<img alt="">'; document.body.appendChild(lb);
  imgs.forEach(i => i.addEventListener('click', () => {
    $('img', lb).src = i.currentSrc || i.src; $('img', lb).alt = i.alt; lb.classList.add('open');
  }));
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
}

/* ---------- contact form (opens the visitor's email app) ---------- */
function contactForm() {
  const f = $('#contactForm'); if (!f) return;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    const subject = encodeURIComponent(d.get('subject') || 'Portfolio enquiry');
    const body = encodeURIComponent(`${d.get('message')}\n\n- ${d.get('name')} (${d.get('email')})`);
    showToast('Opening your email app...');
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    f.reset();
  });
}

/* ---------- smooth page leave ---------- */
function transitions() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a) return;
    const h = a.getAttribute('href');
    if (a.target || e.ctrlKey || e.metaKey || !h || h.startsWith('#') || /^(https?:|mailto:|tel:)/.test(h) || h.endsWith('.pdf')) return;
    e.preventDefault(); document.body.classList.add('leaving');
    setTimeout(() => (location.href = h), 230);
  });
  window.addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });
}

document.addEventListener('DOMContentLoaded', () => {
  buildShell(); fillConfig(); renderIcons();
  typer(); observers(); cvViewer(); filters(); lightbox(); contactForm(); transitions();
});
