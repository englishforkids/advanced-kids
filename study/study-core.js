/* ═══════════════════════════════════════════════════════════════
   STUDY CORE — спільні помічники для розділів Vocabulary і Grammar.
   Нічого тут редагувати не потрібно, коли додаються нові уроки.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const AK = window.AKStudy = window.AKStudy || {};

  /* ---------- DOM helpers ---------- */
  AK.$  = (s, r = document) => r.querySelector(s);
  AK.$$ = (s, r = document) => [...r.querySelectorAll(s)];
  AK.esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /* **bold** у даних → виділена граматика */
  AK.fmt = s => AK.esc(s).replace(/\*\*(.+?)\*\*/g, '<b class="hl">$1</b>');
  /* формула: + і → підсвічуються */
  AK.formula = s => AK.esc(s)
    .replace(/ \+ /g, ' <i class="op">+</i> ')
    .replace(/→/g, '<i class="ar">→</i>')
    .replace(/ \/ /g, ' <i class="op">/</i> ');

  AK.slug = s => String(s).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  AK.shuffle = a => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [r[i], r[j]] = [r[j], r[i]]; } return r; };
  AK.plural = (n, one, many) => n + ' ' + (n === 1 ? one : many);

  /* ---------- storage (localStorage, той самий префікс ak_, що й платформа) ---------- */
  AK.store = {
    get(k, d) { try { const v = JSON.parse(localStorage.getItem('ak_' + k)); return v ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ak_' + k, JSON.stringify(v)); } catch (e) { /* приватний режим — працюємо без збереження */ } }
  };

  /* ---------- answer checking ---------- */
  const CONTR = [
    [/won['’]t/g, 'will not'], [/can['’]t/g, 'cannot'], [/shan['’]t/g, 'shall not'],
    [/n['’]t\b/g, ' not'], [/['’]ve\b/g, ' have'], [/['’]re\b/g, ' are'], [/['’]ll\b/g, ' will'], [/\bi['’]m\b/g, 'i am']
  ];
  AK.norm = s => {
    let t = String(s || '').toLowerCase().replace(/[’‘`]/g, "'").replace(/[“”"]/g, '');
    CONTR.forEach(([re, rep]) => { t = t.replace(re, rep); });
    return t.replace(/cannot/g, 'can not').replace(/[.,!?;:—–-]/g, ' ').replace(/\s+/g, ' ').trim();
  };
  AK.matches = (input, answers) => {
    const n = AK.norm(input);
    return !!n && (answers || []).some(a => AK.norm(a) === n);
  };

  /* ---------- course map ---------- */
  const COURSE = window.AK_COURSE || { units: [] };
  AK.units = COURSE.units;
  AK.lessonMap = new Map();
  COURSE.units.forEach(u => u.lessons.forEach(l => AK.lessonMap.set(l.n, { ...l, unit: u.n })));
  AK.lesson = n => AK.lessonMap.get(+n);
  AK.unitOf = n => (AK.lesson(n) || {}).unit;
  AK.unit = n => COURSE.units.find(u => u.n === +n);

  /* Посилання на сторінку уроку — лише якщо урок є в LESSONS платформи */
  AK.lessonUrl = n => {
    const list = (typeof LESSONS !== 'undefined' && Array.isArray(LESSONS)) ? LESSONS : [];
    const L = list.find(x => +x.n === +n);
    if (!L) return null;
    return (L.dir ? L.dir.replace(/\/?$/, '/') : '') + (L.home || 'index.html');
  };
  AK.lessonLink = (n, label, cls = 'llink') => {
    const u = AK.lessonUrl(n);
    const text = AK.esc(label ?? ('Lesson ' + n));
    return u
      ? `<a class="${cls} is-link" href="${AK.esc(u)}" title="Open Lesson ${n}">${text}<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8"/></svg></a>`
      : `<span class="${cls}">${text}</span>`;
  };
  AK.lessonList = arr => (arr || []).length
    ? arr.map(n => AK.lessonLink(n, 'L' + n, 'lchip')).join('')
    : '<span class="small">—</span>';

  /* ---------- icons (inline SVG, inherit currentColor) ---------- */
  const P = {
    star:    '<path d="m12 3.2 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
    check:   '<path d="m5 12.5 4.2 4.2L19 7"/>',
    loop:    '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.7M20 4v4.7h-4.7M20 12a8 8 0 0 1-13.7 5.6L4 15.3M4 20v-4.7h4.7"/>',
    search:  '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    chev:    '<path d="m9 6 6 6-6 6"/>',
    back:    '<path d="M15 6 9 12l6 6"/>',
    close:   '<path d="M6 6l12 12M18 6 6 18"/>',
    eye:     '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff:  '<path d="M3 3l18 18M10.6 6a9.5 9.5 0 0 1 1.4-.1c6 0 9.5 6.1 9.5 6.1a17 17 0 0 1-2.8 3.5M6.6 7.4C4 9.2 2.5 12 2.5 12S6 18.5 12 18.5c1.5 0 2.9-.4 4.1-1"/>',
    filter:  '<path d="M4 6h16M7 12h10M10 18h4"/>',
    cards:   '<rect x="3.5" y="6" width="13" height="14" rx="2.5"/><path d="M7.5 3.5h10a3 3 0 0 1 3 3v11"/>',
    swap:    '<path d="M4 8h14l-4-4M20 16H6l4 4"/>',
    bulb:    '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3Z"/>',
    shuffle: '<path d="M3 7h3.5c4 0 6 10 10 10H21M3 17h3.5c1.6 0 2.8-1.6 3.8-3.5M14 10c1-1.7 2-3 3.5-3H21M18 4l3 3-3 3M18 14l3 3-3 3"/>',
    play:    '<path d="M7 4.5v15l12.5-7.5z"/>',
    book:    '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 21H20"/>',
    spark:   '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
    ext:     '<path d="M7 17 17 7M9 7h8v8"/>'
  };
  AK.icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || ''}</svg>`;

  /* ---------- reusable components ---------- */

  /* ProgressBar — шапка прогресу розділу */
  AK.ProgressBar = ({ label, done, total, noun, stats = [] }) => {
    const pct = total ? Math.round(done / total * 100) : 0;
    return `
      <div class="pg" role="group" aria-label="${AK.esc(label)}">
        <div class="pg-top">
          <span class="pg-lbl">${AK.esc(label)}</span>
          <span class="pg-pct">${pct}%</span>
        </div>
        <div class="pg-num"><b class="dsp">${done}</b><span> / ${total} ${AK.esc(noun)}</span></div>
        <div class="pg-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}"><i style="width:${pct}%"></i></div>
        ${stats.length ? `<div class="pg-stats">${stats.map(s => `<span class="pg-st ${s.cls || ''}"><i></i>${AK.esc(s.text)}</span>`).join('')}</div>` : ''}
      </div>`;
  };

  /* StatusPill */
  AK.StatusPill = s => s === 'learned' ? '<span class="pill ok">Learned</span>'
    : s === 'practice' ? '<span class="pill warn">Need practice</span>'
    : '<span class="pill">Not reviewed</span>';

  /* UnitAccordion — обгортка юніту; тіло рендериться функцією body() */
  AK.UnitAccordion = ({ id, unit, meta, body, open, pct }) => `
    <section class="ua${open ? ' open' : ''}" id="${id}">
      <button class="ua-h" aria-expanded="${open ? 'true' : 'false'}" aria-controls="${id}-b" data-ua="${id}">
        <span class="ua-n dsp"><s>Unit</s>${unit.n}</span>
        <span class="ua-t"><b>${AK.esc(unit.title)}</b><small>${meta}</small></span>
        ${pct != null ? `<span class="ua-ring" style="--p:${pct}"><span>${pct}%</span></span>` : ''}
        ${AK.icon('chev', 'ua-ar')}
      </button>
      <div class="ua-b" id="${id}-b" ${open ? '' : 'hidden'}>${open ? body() : ''}</div>
    </section>`;

  /* Сегментовані вкладки */
  AK.Seg = (items, active, name) => `
    <div class="seg" role="tablist" aria-label="${AK.esc(name)}">
      ${items.map(it => `<button class="seg-b${it.id === active ? ' on' : ''}" role="tab" aria-selected="${it.id === active}" data-seg="${it.id}">${it.icon ? AK.icon(it.icon) : ''}<span>${AK.esc(it.label)}</span>${it.count != null ? `<em>${it.count}</em>` : ''}</button>`).join('')}
    </div>`;

  /* Порожній стан */
  AK.Empty = ({ title, text, action }) => `
    <div class="empty">
      <div class="empty-ic">${AK.icon('spark')}</div>
      <h3>${AK.esc(title)}</h3>
      ${text ? `<p>${AK.esc(text)}</p>` : ''}
      ${action || ''}
    </div>`;

  /* Невелике спливне повідомлення */
  let toastT;
  AK.toast = msg => {
    let t = AK.$('#akToast');
    if (!t) { t = document.createElement('div'); t.id = 'akToast'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 1800);
  };

  /* ---------- hash routing: #words?lesson=14, #grammar?topic=mixed-conditionals ---------- */
  AK.parseHash = () => {
    const h = location.hash.slice(1);
    const [view, qs] = h.split('?');
    const params = {};
    new URLSearchParams(qs || '').forEach((v, k) => { params[k] = v; });
    return { view: view || '', params };
  };
  AK.hashFor = (view, params = {}) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== '' && v !== 'all')).toString();
    return '#' + view + (qs ? '?' + qs : '');
  };
  /* replace = оновити адресу без нового запису в історії */
  AK.setHash = (view, params, push) => {
    const h = AK.hashFor(view, params);
    if (location.hash === h) return;
    if (push) { AK._silent = h; location.hash = h; }
    else history.replaceState(null, '', h);
  };

  /* Розділи реєструють себе тут: AK.sections.words = { route(params, fromLink) } */
  AK.sections = {};
  AK.route = (view, params, fromLink) => {
    const s = AK.sections[view];
    if (s && s.route) s.route(params || {}, !!fromLink);
  };

  /* Для карток уроків на платформі: що є у словнику / граматиці для уроку n */
  AK.lessonLinks = n => {
    const out = [];
    const v = AK.sections.words, g = AK.sections.grammar;
    if (v && v.countForLesson(n)) out.push({ label: 'Vocabulary', href: AK.hashFor('words', { lesson: n }), count: v.countForLesson(n) });
    const t = g && g.topicsForLesson(n);
    if (t && t.length) out.push({ label: t.length === 1 ? 'Grammar' : 'Grammar ×' + t.length, href: t.length === 1 ? AK.hashFor('grammar', { topic: t[0].id }) : AK.hashFor('grammar', { lesson: n }) });
    return out;
  };
})();
