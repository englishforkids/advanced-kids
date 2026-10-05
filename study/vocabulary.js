/* ═══════════════════════════════════════════════════════════════
   VOCABULARY SECTION — словник курсу + повторення.
   Дані: study/data/vocabulary-data.js (window.AK_VOCAB)
   Компоненти: VocabularySearch, VocabularyFilters, VocabularyCard,
               VocabularyDrawer, UnitAccordion, Flashcard, Quiz
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const AK = window.AKStudy;
  const { $, $$, esc, icon } = AK;

  /* ────────────────── DATA: один запис на слово ────────────────── */
  const TYPES = {
    word:    { label: 'Word',         short: 'Word' },
    phrase:  { label: 'Phrase',       short: 'Phrase' },
    phrasal: { label: 'Phrasal Verb', short: 'Phrasal verb' },
    idiom:   { label: 'Idiom',        short: 'Idiom' },
    slang:   { label: 'Slang / Informal', short: 'Slang' }
  };
  const addU = (arr, n) => { if (n != null && !arr.includes(n)) arr.push(n); };

  const ENTRIES = [];
  const byKey = new Map();
  const byId = new Map();

  (window.AK_VOCAB || []).forEach(g => {
    (g.words || []).forEach((w, i) => {
      if (!w || !w.word) return;
      const key = AK.norm(w.word);
      const prev = byKey.get(key);
      if (prev) {                         // повтор у пізнішому уроці → без дубля
        addU(prev.practisedIn, g.lesson);
        (g.revisedIn || []).forEach(n => addU(prev.revisedIn, n));
        addU(prev.seenIn, g.lesson);
        return;
      }
      if (w.repeat) { console.warn('[Vocabulary] repeat:true, але слова ще немає в словнику:', w.word); return; }
      const type = TYPES[w.type] ? w.type : (/\s/.test(w.word.trim()) ? 'phrase' : 'word');
      const e = {
        id: w.id || `u${g.unit}-l${g.lesson}-${AK.slug(w.word)}`,
        word: w.word, type,
        translation: w.translation || '', meaning: w.meaning || '', example: w.example || '',
        note: w.note || '', pron: w.pron || '', related: w.related || [],
        unit: g.unit, lesson: g.lesson, lessonTitle: g.title,
        introducedIn: g.lesson,
        practisedIn: [...(w.practisedIn || g.practisedIn || [])],
        revisedIn: [...(w.revisedIn || g.revisedIn || [])],
        seenIn: [g.lesson],
        order: ENTRIES.length
      };
      ENTRIES.push(e); byKey.set(key, e); byId.set(e.id, e);
    });
  });
  ENTRIES.forEach(e => { e.practisedIn.sort((a, b) => a - b); e.revisedIn.sort((a, b) => a - b); });

  /* усі уроки, де слово звучить */
  const touches = e => [e.introducedIn, ...e.seenIn, ...e.practisedIn, ...e.revisedIn];
  const wordsForLesson = n => ENTRIES.filter(e => touches(e).includes(+n));
  const newInLesson = n => ENTRIES.filter(e => e.seenIn.includes(+n));
  const wordsInRange = ([a, b]) => ENTRIES.filter(e => e.seenIn.some(n => n >= a && n <= b));

  /* ────────────────── STUDENT STATE (localStorage) ────────────────── */
  let ST = AK.store.get('vocab', {});
  const save = () => AK.store.set('vocab', ST);
  const status = id => (ST[id] && ST[id].s) || '';
  const isFav = id => !!(ST[id] && ST[id].f);
  function setStatus(id, s, toggle) {
    const cur = ST[id] || {};
    cur.s = (toggle && cur.s === s) ? '' : s;
    ST[id] = cur; save();
  }
  function toggleFav(id) { const cur = ST[id] || {}; cur.f = !cur.f; ST[id] = cur; save(); return cur.f; }
  const counts = () => {
    let learned = 0, practice = 0, fav = 0;
    ENTRIES.forEach(e => { const s = status(e.id); if (s === 'learned') learned++; else if (s === 'practice') practice++; if (isFav(e.id)) fav++; });
    return { learned, practice, fav, none: ENTRIES.length - learned - practice, total: ENTRIES.length };
  };

  /* ────────────────── UI STATE ────────────────── */
  const UI = {
    tab: 'dictionary',
    q: '', unit: 'all', type: 'all', st: 'all', lesson: 'all', favOnly: false,
    showAll: false, revealed: new Set(), filtersOpen: false,
    openUnits: new Set([1]), openLessons: new Set(), openRev: new Set()
  };

  let root;           // #vocabApp
  const TABS = () => {
    const c = counts();
    return [
      { id: 'dictionary', label: 'Dictionary', icon: 'book', count: ENTRIES.length },
      { id: 'units', label: 'By Unit', icon: 'cards' },
      { id: 'favourites', label: 'Favourites', icon: 'star', count: c.fav },
      { id: 'practice', label: 'Practice', icon: 'play' }
    ];
  };

  /* ────────────────── COMPONENTS ────────────────── */

  const typeBadge = t => `<span class="tbadge t-${t}">${esc(TYPES[t].short)}</span>`;

  /* "rebel (noun)" → rebel + маленьке (noun) */
  const wordHTML = (w, q) => {
    const m = String(w).match(/^(.*?)\s*(\([^)]*\))$/);
    const main = m ? m[1] : w, tail = m ? m[2] : '';
    let h = esc(main);
    if (q) {
      const i = main.toLowerCase().indexOf(q.toLowerCase());
      if (i > -1) h = esc(main.slice(0, i)) + '<mark>' + esc(main.slice(i, i + q.length)) + '</mark>' + esc(main.slice(i + q.length));
    }
    return h + (tail ? ` <small class="pos">${esc(tail)}</small>` : '');
  };

  const locText = e => `Unit ${e.unit} · Lesson ${e.lesson}`;

  function VocabularyCard(e, opts = {}) {
    const s = status(e.id), f = isFav(e.id);
    const shown = UI.showAll || UI.revealed.has(e.id);
    const rev = e.revisedIn.length ? `<span class="vc-rev">Revised in: ${e.revisedIn.map(n => AK.lessonLink(n, 'L' + n, 'lmini')).join(', ')}</span>` : '';
    const from = opts.inLesson && opts.inLesson !== e.lesson ? `<span class="from">from L${e.lesson}</span>` : '';
    return `
    <article class="vc${s ? ' s-' + s : ''}${f ? ' is-fav' : ''}" data-card="${esc(e.id)}"${opts.inLesson ? ` data-in="${opts.inLesson}"` : ''} tabindex="0" aria-label="${esc(e.word)} — open details">
      <div class="vc-top">
        ${typeBadge(e.type)}${from}
        <span class="vc-state">${s === 'learned' ? icon('check') : s === 'practice' ? icon('loop') : ''}</span>
        <button class="star${f ? ' on' : ''}" data-act="fav" data-id="${esc(e.id)}" aria-pressed="${f}" aria-label="${f ? 'Remove from favourites' : 'Add to favourites'}">${icon('star')}</button>
      </div>
      <h3 class="vc-w">${wordHTML(e.word, opts.q)}</h3>
      <div class="vc-tr">
        ${shown
          ? `<span class="tr">${esc(e.translation)}</span>${UI.showAll ? '' : `<button class="tr-hide" data-act="hide" data-id="${esc(e.id)}" aria-label="Hide translation">${icon('eyeOff')}</button>`}`
          : `<button class="tr-btn" data-act="reveal" data-id="${esc(e.id)}">${icon('eye')}Show translation</button>`}
      </div>
      <p class="vc-m">${esc(e.meaning)}</p>
      ${e.example ? `<p class="vc-ex">${esc(e.example)}</p>` : ''}
      <div class="vc-loc">${AK.lessonLink(e.lesson, locText(e), 'lloc')}${rev}</div>
      <div class="vc-act">
        <button class="act ok${s === 'learned' ? ' on' : ''}" data-act="learned" data-id="${esc(e.id)}" aria-pressed="${s === 'learned'}">${icon('check')}I know this</button>
        <button class="act warn${s === 'practice' ? ' on' : ''}" data-act="practice" data-id="${esc(e.id)}" aria-pressed="${s === 'practice'}">${icon('loop')}Need practice</button>
      </div>
    </article>`;
  }

  function VocabularySearch() {
    return `
      <label class="search">
        ${icon('search')}
        <input id="vQ" type="search" placeholder="Search vocabulary..." aria-label="Search vocabulary: English, Ukrainian or meaning" value="${esc(UI.q)}" autocomplete="off" spellcheck="false">
        <button class="search-x" data-act="clear-q" aria-label="Clear search" ${UI.q ? '' : 'hidden'}>${icon('close')}</button>
      </label>`;
  }

  function lessonOptions(sel) {
    return AK.units.map(u => {
      const opts = u.lessons.map(l => {
        const c = wordsForLesson(l.n).length;
        if (!c) return '';
        const k = l.kind === 'vocab' ? '' : l.kind === 'grammar' ? ' (grammar)' : ' (revision)';
        return `<option value="${l.n}" ${String(sel) === String(l.n) ? 'selected' : ''}>L${l.n} · ${esc(l.title)}${k}</option>`;
      }).join('');
      return opts ? `<optgroup label="Unit ${u.n}">${opts}</optgroup>` : '';
    }).join('');
  }

  function VocabularyFilters() {
    const sel = (id, label, cur, opts) => `
      <label class="fsel"><span>${label}</span>
        <select id="${id}" aria-label="${label}">${opts.map(([v, t]) => `<option value="${v}" ${String(cur) === String(v) ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>
      </label>`;
    return `
      ${sel('vUnit', 'Unit', UI.unit, [['all', 'All Units'], ...AK.units.map(u => [u.n, 'Unit ' + u.n])])}
      <label class="fsel"><span>Lesson</span>
        <select id="vLesson" aria-label="Lesson"><option value="all">All Lessons</option>${lessonOptions(UI.lesson)}</select>
      </label>
      ${sel('vType', 'Type', UI.type, [['all', 'All'], ...Object.entries(TYPES).map(([k, t]) => [k, t.label])])}
      ${sel('vSt', 'Status', UI.st, [['all', 'All'], ['learned', 'Learned'], ['practice', 'Need Practice'], ['none', 'Not Reviewed']])}
      <button class="chip fav-chip${UI.favOnly ? ' on' : ''}" data-act="fav-only" aria-pressed="${UI.favOnly}">${icon('star')}Favourites only</button>
      <button class="btn sm ghost" data-act="clear-f">Clear filters</button>`;
  }

  const activeFilterCount = () => ['unit', 'type', 'st', 'lesson'].filter(k => UI[k] !== 'all').length + (UI.favOnly ? 1 : 0);

  /* ────────────────── FILTERING ────────────────── */
  function filtered() {
    const q = UI.q.trim().toLowerCase();
    let list = ENTRIES.filter(e => {
      if (UI.unit !== 'all' && e.unit !== +UI.unit) return false;
      if (UI.lesson !== 'all' && !touches(e).includes(+UI.lesson)) return false;
      if (UI.type !== 'all' && e.type !== UI.type) return false;
      const s = status(e.id);
      if (UI.st === 'learned' && s !== 'learned') return false;
      if (UI.st === 'practice' && s !== 'practice') return false;
      if (UI.st === 'none' && s) return false;
      if (UI.favOnly && !isFav(e.id)) return false;
      if (q) {
        const hay = (e.word + ' ' + e.translation + ' ' + e.meaning).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (q) {
      const rank = e => e.word.toLowerCase().startsWith(q) ? 0 : e.word.toLowerCase().includes(q) ? 1 : e.translation.toLowerCase().includes(q) ? 2 : 3;
      list = list.sort((a, b) => rank(a) - rank(b) || a.order - b.order);
    }
    return list;
  }

  /* ────────────────── RENDER ────────────────── */
  function renderHead() {
    const c = counts();
    $('#vProg', root).innerHTML = AK.ProgressBar({
      label: 'Vocabulary Progress', done: c.learned, total: c.total, noun: 'words learned',
      stats: [{ text: c.practice + ' need practice', cls: 'warn' }, { text: c.none + ' not reviewed' }, { text: c.fav + ' favourites', cls: 'fav' }]
    });
    $('#vSeg', root).innerHTML = AK.Seg(TABS(), UI.tab, 'Vocabulary sections');
  }

  function renderBody() {
    const b = $('#vBody', root);
    if (UI.tab === 'dictionary') b.innerHTML = Dictionary();
    else if (UI.tab === 'units') b.innerHTML = ByUnit();
    else if (UI.tab === 'favourites') b.innerHTML = Favourites();
    else b.innerHTML = Practice.render();
    if (UI.tab === 'dictionary') renderGrid();
    if (UI.tab === 'practice') Practice.after();
  }

  function render() { renderHead(); renderBody(); }

  function Dictionary() {
    const n = activeFilterCount();
    return `
      <div class="tools">
        <div class="tools-row">
          ${VocabularySearch()}
          <button class="btn sm filt-tg${UI.filtersOpen ? ' on' : ''}" data-act="filters" aria-expanded="${UI.filtersOpen}" aria-controls="vFilters">${icon('filter')}Filters${n ? `<em>${n}</em>` : ''}</button>
        </div>
        <div class="filters${UI.filtersOpen ? ' open' : ''}" id="vFilters">${VocabularyFilters()}</div>
      </div>
      <div class="res-line">
        <span id="vCount" aria-live="polite"></span>
        <span id="vLessonTag"></span>
        <button class="btn sm ghost tr-all" data-act="show-all" aria-pressed="${UI.showAll}">${icon(UI.showAll ? 'eyeOff' : 'eye')}${UI.showAll ? 'Hide translations' : 'Show all translations'}</button>
      </div>
      <div class="vgrid" id="vGrid"></div>`;
  }

  function renderGrid() {
    const g = $('#vGrid', root); if (!g) return;
    const list = filtered();
    $('#vCount', root).textContent = list.length === ENTRIES.length ? `${list.length} words & phrases` : `${list.length} of ${ENTRIES.length} shown`;
    const L = UI.lesson !== 'all' ? AK.lesson(UI.lesson) : null;
    $('#vLessonTag', root).innerHTML = L ? `<button class="chip on sm" data-act="clear-lesson" aria-label="Remove lesson filter">L${L.n} · ${esc(L.title)} ${icon('close')}</button>` : '';
    g.innerHTML = list.length
      ? list.map(e => VocabularyCard(e, { q: UI.q.trim() })).join('')
      : AK.Empty({ title: 'No words found', text: 'Try a different search or clear the filters.', action: '<button class="btn sm" data-act="clear-all">Clear search & filters</button>' });
    const ft = $('.filt-tg', root);
    if (ft) { const n = activeFilterCount(); ft.innerHTML = `${icon('filter')}Filters${n ? `<em>${n}</em>` : ''}`; }
  }

  /* ---------- By Unit ---------- */
  function lessonRow(l) {
    const words = newInLesson(l.n);
    const open = UI.openLessons.has(l.n);
    const learned = words.filter(e => status(e.id) === 'learned').length;
    const url = AK.lessonUrl(l.n);
    return `
      <div class="lr${open ? ' open' : ''}">
        <button class="lr-h" data-lr="${l.n}" aria-expanded="${open}">
          <span class="lz">L${String(l.n).padStart(2, '0')}</span>
          <span class="lr-t"><b>${esc(l.title)}</b><small>${AK.plural(words.length, 'new word', 'new words')} · ${learned} learned</small></span>
          ${icon('chev', 'lr-ar')}
        </button>
        ${open ? `<div class="lr-b">
          <div class="lr-tools">
            <button class="btn sm" data-act="practise-lesson" data-n="${l.n}">${icon('cards')}Practise this lesson</button>
            ${url ? `<a class="btn sm ghost" href="${esc(url)}">${icon('ext')}Open Lesson ${l.n}</a>` : ''}
          </div>
          <div class="vgrid">${words.map(e => VocabularyCard(e, { inLesson: l.n })).join('')}</div>
        </div>` : ''}
      </div>`;
  }

  function revisionRow(l) {
    const [a, b] = l.reviews;
    const words = wordsInRange(l.reviews);
    const open = UI.openRev.has(l.n);
    const what = l.kind === 'unit-revision' ? `Reviews all the vocabulary from Unit ${AK.unitOf(l.n)}.` : l.kind === 'course-review' ? 'Reviews vocabulary from the whole course.' : `Reviews vocabulary from Lessons ${a}–${b}.`;
    const label = l.title === 'Revision' ? `Revision (Lessons ${a}–${b})` : l.kind === 'revision' ? `${l.title} · Revision ${a}–${b}` : l.title;
    return `
      <div class="lr rev${open ? ' open' : ''}">
        <div class="lr-h as-row">
          <span class="lz rv">L${String(l.n).padStart(2, '0')}</span>
          <span class="lr-t"><b>${esc(label)}</b><small>${esc(what)}</small></span>
          <button class="btn sm ghost" data-rev="${l.n}" aria-expanded="${open}">${open ? 'Hide' : 'View reviewed vocabulary'}</button>
        </div>
        ${open ? `<div class="lr-b">
          <div class="wchips">${words.map(e => `<button class="wchip${status(e.id) ? ' s-' + status(e.id) : ''}" data-open="${esc(e.id)}">${esc(e.word)}</button>`).join('')}</div>
          <div class="lr-tools">
            <button class="btn sm" data-act="practise-range" data-n="${l.n}">${icon('cards')}Practise these ${words.length}</button>
            ${AK.lessonUrl(l.n) ? `<a class="btn sm ghost" href="${esc(AK.lessonUrl(l.n))}">${icon('ext')}Open Lesson ${l.n}</a>` : ''}
          </div>
        </div>` : ''}
      </div>`;
  }

  function unitBody(u) {
    return `<div class="lrs">${u.lessons.map(l => {
      if (l.kind === 'vocab' && newInLesson(l.n).length) return lessonRow(l);
      if (['revision', 'unit-revision', 'course-review'].includes(l.kind) && l.kind !== 'course-review' && wordsInRange(l.reviews).length) return revisionRow(l);
      return '';
    }).join('')}</div>`;
  }

  function ByUnit() {
    return `<div class="uas">${AK.units.map(u => {
      const words = ENTRIES.filter(e => e.unit === u.n);
      if (!words.length) return '';
      const learned = words.filter(e => status(e.id) === 'learned').length;
      return AK.UnitAccordion({
        id: 'vu' + u.n, unit: u, open: UI.openUnits.has(u.n),
        meta: `${words.length} words · ${learned} learned`,
        pct: Math.round(learned / words.length * 100),
        body: () => unitBody(u)
      });
    }).join('')}</div>`;
  }

  /* ---------- Favourites ---------- */
  function Favourites() {
    const list = ENTRIES.filter(e => isFav(e.id));
    if (!list.length) return AK.Empty({
      title: 'You haven’t saved any words yet.',
      text: 'Tap the star on any word card to keep it here for quick review.',
      action: `<button class="btn primary" data-seg="dictionary">${icon('book')}Go to Dictionary</button>`
    });
    return `
      <div class="res-line">
        <span>${AK.plural(list.length, 'saved word', 'saved words')}</span>
        <button class="btn sm" data-act="practise-fav">${icon('cards')}Practise favourites</button>
      </div>
      <div class="vgrid">${list.map(e => VocabularyCard(e)).join('')}</div>`;
  }

  /* ────────────────── DRAWER (details) ────────────────── */
  let lastFocus = null;
  function drawer() {
    let d = $('#vDrawer');
    if (!d) {
      d = document.createElement('div');
      d.id = 'vDrawer'; d.className = 'drawer'; d.hidden = true;
      d.innerHTML = `<div class="dr-bg" data-close></div><aside class="dr-p" role="dialog" aria-modal="true" aria-labelledby="drW" tabindex="-1"></aside>`;
      document.body.appendChild(d);
      d.addEventListener('click', onDrawerClick);
      d.addEventListener('keydown', ev => {
        if (ev.key === 'Escape') closeDrawer();
        if (ev.key === 'Tab') {               // простий focus trap
          const f = $$('button, a[href], select, input', d).filter(x => !x.disabled && x.offsetParent !== null);
          if (!f.length) return;
          if (ev.shiftKey && document.activeElement === f[0]) { ev.preventDefault(); f[f.length - 1].focus(); }
          else if (!ev.shiftKey && document.activeElement === f[f.length - 1]) { ev.preventDefault(); f[0].focus(); }
        }
      });
    }
    return d;
  }

  function VocabularyDrawer(e) {
    const s = status(e.id), f = isFav(e.id);
    const relatedRaw = e.related.map(w => byKey.get(AK.norm(w))).filter(Boolean);
    const related = relatedRaw.length ? relatedRaw : newInLesson(e.lesson).filter(x => x.id !== e.id).slice(0, 6);
    const canSpeak = 'speechSynthesis' in window;
    const row = (label, val) => val ? `<div class="dr-row"><span>${label}</span><div>${val}</div></div>` : '';
    const also = e.seenIn.filter(n => n !== e.lesson);
    return `
      <div class="dr-head">
        ${typeBadge(e.type)}
        <button class="star${f ? ' on' : ''}" data-act="fav" data-id="${esc(e.id)}" aria-pressed="${f}" aria-label="${f ? 'Remove from favourites' : 'Add to favourites'}">${icon('star')}</button>
        <button class="dr-x" data-close aria-label="Close details">${icon('close')}</button>
      </div>
      <h2 id="drW" class="dr-w">${wordHTML(e.word)}</h2>
      <div class="dr-pron">
        ${e.pron ? `<span class="mono">${esc(e.pron)}</span>` : ''}
        ${canSpeak ? `<button class="btn sm ghost" data-act="speak" data-id="${esc(e.id)}">${icon('play')}Listen</button>` : ''}
      </div>
      <div class="dr-tr">${esc(e.translation)}</div>
      ${row('Meaning', esc(e.meaning))}
      ${row('Example', `<em>${esc(e.example)}</em>`)}
      ${row('Note', esc(e.note))}
      ${row('Type', esc(TYPES[e.type].label))}
      <div class="dr-path">
        <div class="pt"><span class="pt-k in">Introduced</span><div>${AK.lessonLink(e.lesson, locText(e) + ' — ' + e.lessonTitle, 'lloc')}</div></div>
        ${also.length ? `<div class="pt"><span class="pt-k in">Also taught</span><div class="lchips">${AK.lessonList(also)}</div></div>` : ''}
        <div class="pt"><span class="pt-k pr">Practised</span><div class="lchips">${AK.lessonList(e.practisedIn.filter(n => !also.includes(n)))}</div></div>
        <div class="pt"><span class="pt-k rv">Revised</span><div class="lchips">${AK.lessonList(e.revisedIn)}</div></div>
      </div>
      ${related.length ? `<div class="dr-rel"><span class="dr-lbl">${relatedRaw.length ? 'Related vocabulary' : 'More from this lesson'}</span>
        <div class="wchips">${related.map(r => `<button class="wchip" data-open="${esc(r.id)}">${esc(r.word)}</button>`).join('')}</div></div>` : ''}
      <div class="dr-act">
        <button class="act ok${s === 'learned' ? ' on' : ''}" data-act="learned" data-id="${esc(e.id)}" aria-pressed="${s === 'learned'}">${icon('check')}I know this</button>
        <button class="act warn${s === 'practice' ? ' on' : ''}" data-act="practice" data-id="${esc(e.id)}" aria-pressed="${s === 'practice'}">${icon('loop')}Need practice</button>
      </div>
      <button class="btn sm ghost dr-go" data-act="practise-lesson" data-n="${e.lesson}">${icon('cards')}Practise Lesson ${e.lesson} vocabulary</button>`;
  }

  let drawerId = null;
  function openDrawer(id) {
    const e = byId.get(id); if (!e) return;
    const d = drawer();
    if (d.hidden) lastFocus = document.activeElement;
    drawerId = id;
    $('.dr-p', d).innerHTML = VocabularyDrawer(e);
    d.hidden = false;
    requestAnimationFrame(() => d.classList.add('on'));
    document.documentElement.classList.add('no-scroll');
    $('.dr-p', d).focus({ preventScroll: true });
  }
  function closeDrawer() {
    const d = $('#vDrawer'); if (!d || d.hidden) return;
    d.classList.remove('on'); drawerId = null;
    document.documentElement.classList.remove('no-scroll');
    setTimeout(() => { d.hidden = true; }, 220);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  function onDrawerClick(ev) {
    if (ev.target.closest('[data-close]')) { closeDrawer(); return; }
    const op = ev.target.closest('[data-open]');
    if (op) { openDrawer(op.dataset.open); return; }
    const a = ev.target.closest('[data-act]');
    if (!a) return;
    const id = a.dataset.id, act = a.dataset.act;
    if (act === 'speak') { speak(byId.get(id)); return; }
    if (act === 'practise-lesson') { closeDrawer(); startFrom({ source: 'lesson', lesson: +a.dataset.n }); return; }
    if (handleStateAct(act, id)) { $('.dr-p', drawer()).innerHTML = VocabularyDrawer(byId.get(id)); }
  }

  function speak(e) {
    if (!e || !('speechSynthesis' in window)) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(e.word.replace(/\s*\(.*?\)$/, ''));
      u.lang = 'en-GB'; u.rate = .92;
      speechSynthesis.speak(u);
    } catch (err) { /* голосу немає — нічого страшного */ }
  }

  /* ────────────────── ACTIONS ────────────────── */
  /* повертає true, якщо змінився стан слова */
  function handleStateAct(act, id) {
    if (!id || !byId.has(id)) return false;
    if (act === 'fav') { const on = toggleFav(id); AK.toast(on ? 'Saved to favourites' : 'Removed from favourites'); }
    else if (act === 'learned') { setStatus(id, 'learned', true); if (status(id) === 'learned') AK.toast('Nice! Marked as learned'); }
    else if (act === 'practice') { setStatus(id, 'practice', true); if (status(id) === 'practice') AK.toast('Added to Need practice'); }
    else return false;
    refreshCards(id);
    renderHead();
    return true;
  }

  /* оновити картки цього слова на місці (без перемальовки всієї сторінки) */
  function refreshCards(id) {
    const e = byId.get(id);
    $$(`[data-card="${CSS.escape(id)}"]`, root).forEach(el => {
      const inLesson = el.dataset.in ? +el.dataset.in : null;
      const tmp = document.createElement('div');
      tmp.innerHTML = VocabularyCard(e, { q: UI.tab === 'dictionary' ? UI.q.trim() : '', inLesson });
      const neu = tmp.firstElementChild;
      const hadFocus = el.contains(document.activeElement) ? document.activeElement.dataset.act : null;
      el.replaceWith(neu);
      if (hadFocus) { const f = neu.querySelector(`[data-act="${hadFocus}"]`); if (f) f.focus({ preventScroll: true }); }
    });
    $$(`.wchip[data-open="${CSS.escape(id)}"]`, root).forEach(c => { c.className = 'wchip' + (status(id) ? ' s-' + status(id) : ''); });
    if (UI.tab === 'favourites' && !isFav(id)) renderBody();
  }

  function onClick(ev) {
    const t = ev.target;

    const seg = t.closest('[data-seg]');
    if (seg) { setTab(seg.dataset.seg); return; }

    const ua = t.closest('[data-ua]');
    if (ua) {
      const n = +ua.dataset.ua.replace('vu', '');
      UI.openUnits.has(n) ? UI.openUnits.delete(n) : UI.openUnits.add(n);
      const sec = ua.closest('.ua'), open = UI.openUnits.has(n), body = $('.ua-b', sec);
      sec.classList.toggle('open', open); ua.setAttribute('aria-expanded', open);
      body.hidden = !open; body.innerHTML = open ? unitBody(AK.unit(n)) : '';
      return;
    }
    const lr = t.closest('[data-lr]');
    if (lr) { const n = +lr.dataset.lr; UI.openLessons.has(n) ? UI.openLessons.delete(n) : UI.openLessons.add(n); rerenderUnitOf(n); focusAfter(`[data-lr="${n}"]`); return; }
    const rv = t.closest('[data-rev]');
    if (rv) { const n = +rv.dataset.rev; UI.openRev.has(n) ? UI.openRev.delete(n) : UI.openRev.add(n); rerenderUnitOf(n); focusAfter(`[data-rev="${n}"]`); return; }

    const op = t.closest('[data-open]');
    if (op) { openDrawer(op.dataset.open); return; }

    const a = t.closest('[data-act]');
    if (a) {
      const act = a.dataset.act, id = a.dataset.id;
      if (handleStateAct(act, id)) return;
      switch (act) {
        case 'reveal': UI.revealed.add(id); refreshCards(id); { const c = $(`[data-card="${CSS.escape(id)}"] .tr-hide`, root); if (c) c.focus({ preventScroll: true }); } return;
        case 'hide': UI.revealed.delete(id); refreshCards(id); { const c = $(`[data-card="${CSS.escape(id)}"] .tr-btn`, root); if (c) c.focus({ preventScroll: true }); } return;
        case 'show-all': UI.showAll = !UI.showAll; UI.revealed.clear(); a.setAttribute('aria-pressed', UI.showAll); a.innerHTML = `${icon(UI.showAll ? 'eyeOff' : 'eye')}${UI.showAll ? 'Hide translations' : 'Show all translations'}`; renderGrid(); return;
        case 'filters': UI.filtersOpen = !UI.filtersOpen; $('#vFilters', root).classList.toggle('open', UI.filtersOpen); a.classList.toggle('on', UI.filtersOpen); a.setAttribute('aria-expanded', UI.filtersOpen); return;
        case 'fav-only': UI.favOnly = !UI.favOnly; a.classList.toggle('on', UI.favOnly); a.setAttribute('aria-pressed', UI.favOnly); renderGrid(); return;
        case 'clear-f': clearFilters(false); return;
        case 'clear-all': clearFilters(true); return;
        case 'clear-q': UI.q = ''; $('#vQ', root).value = ''; a.hidden = true; renderGrid(); $('#vQ', root).focus(); syncHash(); return;
        case 'clear-lesson': UI.lesson = 'all'; const ls = $('#vLesson', root); if (ls) ls.value = 'all'; renderGrid(); syncHash(); return;
        case 'practise-lesson': startFrom({ source: 'lesson', lesson: +a.dataset.n }); return;
        case 'practise-range': { const L = AK.lesson(+a.dataset.n); startFrom({ source: 'range', range: L.reviews, rangeLabel: `Lessons ${L.reviews[0]}–${L.reviews[1]}` }); return; }
        case 'practise-fav': startFrom({ source: 'fav' }); return;
      }
      if (Practice.onAct(act, a)) return;
    }

    /* клік по картці (не по кнопці чи посиланню) → деталі */
    const card = t.closest('[data-card]');
    if (card && !t.closest('button, a, input, select')) openDrawer(card.dataset.card);
  }

  function focusAfter(sel) { const el = $(sel, root); if (el) el.focus({ preventScroll: true }); }
  function rerenderUnitOf(n) {
    const u = AK.unitOf(n), body = $(`#vu${u}-b`, root);
    if (body) body.innerHTML = unitBody(AK.unit(u));
  }

  function clearFilters(alsoQ) {
    UI.unit = UI.type = UI.st = UI.lesson = 'all'; UI.favOnly = false;
    if (alsoQ) UI.q = '';
    const f = $('#vFilters', root); if (f) f.innerHTML = VocabularyFilters();
    if (alsoQ) { const q = $('#vQ', root); if (q) q.value = ''; const x = $('.search-x', root); if (x) x.hidden = true; }
    renderGrid(); syncHash();
  }

  function onInput(ev) {
    if (ev.target.id === 'vQ') {
      UI.q = ev.target.value;
      const x = $('.search-x', root); if (x) x.hidden = !UI.q;
      renderGrid();
    }
  }
  function onChange(ev) {
    const id = ev.target.id, v = ev.target.value;
    if (id === 'vUnit') UI.unit = v;
    else if (id === 'vLesson') UI.lesson = v;
    else if (id === 'vType') UI.type = v;
    else if (id === 'vSt') UI.st = v;
    else { Practice.onChange(ev); return; }
    renderGrid(); syncHash();
  }
  function onKey(ev) {
    const card = ev.target.closest && ev.target.closest('[data-card]');
    if (card && ev.target === card && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); openDrawer(card.dataset.card); }
  }

  function setTab(tab, keepHash) {
    UI.tab = tab;
    if (tab !== 'practice') Practice.reset(false);
    render();
    if (!keepHash) syncHash();
    const s = $('.seg-b.on', root); if (s && document.activeElement && document.activeElement.closest && document.activeElement.closest('.seg')) s.focus({ preventScroll: true });
  }

  function syncHash() {
    const p = {};
    if (UI.tab !== 'dictionary') p.tab = UI.tab;
    if (UI.tab === 'dictionary' && UI.lesson !== 'all') p.lesson = UI.lesson;
    if (UI.tab === 'dictionary' && UI.unit !== 'all') p.unit = UI.unit;
    if (AK.parseHash().view === 'words') AK.setHash('words', p);
  }

  /* ────────────────── PRACTICE ────────────────── */
  const MODES = [
    { id: 'flash',   title: 'Flashcards',        desc: 'Flip a card, then rate yourself.', icon: 'cards' },
    { id: 'en-ua',   title: 'English → Ukrainian', desc: 'See the phrase, pick the translation.', icon: 'swap' },
    { id: 'ua-en',   title: 'Ukrainian → English', desc: 'See the translation, pick the phrase.', icon: 'swap' },
    { id: 'meaning', title: 'Meaning Challenge', desc: 'Read the meaning, find the phrase.', icon: 'bulb' },
    { id: 'random',  title: 'Random Review',     desc: 'A surprise mix of question types.', icon: 'shuffle' }
  ];
  const QKIND = { 'en-ua': 'English → Ukrainian', 'ua-en': 'Ukrainian → English', meaning: 'Meaning Challenge' };

  const Practice = (function () {
    const P = { mode: 'flash', source: 'all', unit: 1, lesson: null, range: null, rangeLabel: '', count: 15, phase: 'setup', queue: [], i: 0, flipped: false, res: null, picked: null, setupFrom: null };

    function pool() {
      switch (P.source) {
        case 'unit': return ENTRIES.filter(e => e.unit === +P.unit);
        case 'lesson': return P.lesson ? wordsForLesson(P.lesson).filter(e => e.seenIn.includes(+P.lesson) || AK.lesson(P.lesson).kind !== 'vocab') : [];
        case 'range': return P.range ? wordsInRange(P.range) : [];
        case 'fav': return ENTRIES.filter(e => isFav(e.id));
        case 'practice': return ENTRIES.filter(e => status(e.id) === 'practice');
        case 'review': return P.reviewIds.map(id => byId.get(id)).filter(Boolean);
        default: return ENTRIES;
      }
    }
    const vocabLessons = () => AK.units.flatMap(u => u.lessons.filter(l => newInLesson(l.n).length));

    function reset(full) { P.phase = 'setup'; P.queue = []; P.i = 0; P.flipped = false; P.res = null; if (full) { P.source = 'all'; } }

    function setup() {
      const c = counts();
      if (!P.lesson) P.lesson = (vocabLessons()[0] || {}).n;
      const src = [
        ['all', 'All course', ENTRIES.length], ['unit', 'Unit', null], ['lesson', 'Lesson', null],
        ['fav', 'Favourites', c.fav], ['practice', 'Need Practice', c.practice]
      ];
      if (P.source === 'range') src.push(['range', P.rangeLabel, null]);
      const n = pool().length;
      const sub = P.source === 'unit'
        ? `<label class="fsel"><span>Unit</span><select id="pUnit">${AK.units.map(u => `<option value="${u.n}" ${+P.unit === u.n ? 'selected' : ''}>Unit ${u.n} · ${esc(u.title)}</option>`).join('')}</select></label>`
        : P.source === 'lesson'
        ? `<label class="fsel"><span>Lesson</span><select id="pLesson">${AK.units.map(u => `<optgroup label="Unit ${u.n}">${u.lessons.filter(l => l.kind === 'vocab' && newInLesson(l.n).length).map(l => `<option value="${l.n}" ${+P.lesson === l.n ? 'selected' : ''}>L${l.n} · ${esc(l.title)}</option>`).join('')}</optgroup>`).join('')}</select></label>`
        : '';
      return `
        <div class="pr">
          <div class="pr-step"><span class="pr-k">1</span><h3>Choose a mode</h3></div>
          <div class="modes" role="radiogroup" aria-label="Practice mode">
            ${MODES.map(m => `<button class="mode${P.mode === m.id ? ' on' : ''}" role="radio" aria-checked="${P.mode === m.id}" data-act="mode" data-mode="${m.id}">
              <span class="mode-ic">${icon(m.icon)}</span><b>${esc(m.title)}</b><small>${esc(m.desc)}</small>
              ${m.id === 'flash' ? '<em class="mode-tag">Best start</em>' : ''}</button>`).join('')}
          </div>
          <div class="pr-step"><span class="pr-k">2</span><h3>What to practise</h3></div>
          <div class="chips">${src.map(([v, l, cnt]) => `<button class="chip${P.source === v ? ' on' : ''}" data-act="source" data-src="${v}" aria-pressed="${P.source === v}">${esc(l)}${cnt != null ? ` <em>${cnt}</em>` : ''}</button>`).join('')}</div>
          ${sub ? `<div class="pr-sub">${sub}</div>` : ''}
          <div class="pr-step"><span class="pr-k">3</span><h3>How many</h3></div>
          <div class="chips">${[10, 15, 20, 0].map(k => `<button class="chip${P.count === k ? ' on' : ''}" data-act="count" data-n="${k}" aria-pressed="${P.count === k}">${k || 'All'}</button>`).join('')}</div>
          <div class="pr-go">
            <span class="small">${n ? `${AK.plural(Math.min(n, P.count || n), 'card', 'cards')} from ${AK.plural(n, 'word', 'words')}` : P.source === 'fav' ? 'No favourites yet — star some words first.' : P.source === 'practice' ? 'Nothing marked “Need practice” yet. 🎉' : 'No words here yet.'}</span>
            <button class="btn primary" data-act="start" ${n ? '' : 'disabled'}>${icon('play')}Start</button>
          </div>
        </div>`;
    }

    function start() {
      const p = AK.shuffle(pool());
      if (!p.length) return;
      P.queue = (P.count ? p.slice(0, P.count) : p).map(e => e.id);
      P.i = 0; P.flipped = false; P.picked = null;
      P.res = { easy: [], know: [], practice: [], right: [], wrong: [] };
      P.kinds = P.queue.map(() => P.mode === 'random' ? AK.shuffle(['en-ua', 'ua-en', 'meaning', 'flash'])[0] : P.mode);
      P.phase = 'run';
      redraw(true);
    }

    const cur = () => byId.get(P.queue[P.i]);
    const kind = () => P.kinds[P.i];

    function top() {
      const pct = Math.round(P.i / P.queue.length * 100);
      return `
        <div class="run-top">
          <button class="btn sm ghost" data-act="end">${icon('back')}End</button>
          <span class="run-pos mono">${Math.min(P.i + 1, P.queue.length)} / ${P.queue.length}</span>
          <span class="run-mode">${esc((MODES.find(m => m.id === P.mode) || {}).title)}</span>
        </div>
        <div class="run-bar"><i style="width:${pct}%"></i></div>`;
    }

    /* Flashcard component */
    function Flashcard(e) {
      return `
        <div class="fc${P.flipped ? ' flipped' : ''}" id="fc" role="button" tabindex="0" aria-label="${P.flipped ? 'Answer side' : 'Flashcard: ' + esc(e.word) + '. Press Space to show the answer.'}">
          <div class="fc-in">
            <div class="fc-face fc-front" aria-hidden="${P.flipped}">
              ${typeBadge(e.type)}
              <div class="fc-word">${wordHTML(e.word)}</div>
              <span class="fc-loc">${esc(locText(e))}</span>
              <span class="fc-hint">Tap the card or press Space</span>
            </div>
            <div class="fc-face fc-back" aria-hidden="${!P.flipped}">
              <span class="fc-small">${esc(e.word)}</span>
              <div class="fc-tr">${esc(e.translation)}</div>
              <p class="fc-m">${esc(e.meaning)}</p>
              ${e.example ? `<p class="fc-ex">${esc(e.example)}</p>` : ''}
            </div>
          </div>
        </div>
        <div class="fc-ctl" id="fcCtl">${fcButtons()}</div>
        <p class="kbd">Space — flip · 1 · 2 · 3 — answer</p>`;
    }
    const fcButtons = () => P.flipped
      ? `<button class="ans easy" data-act="fc" data-r="easy"><span>😎</span>Easy</button>
         <button class="ans know" data-act="fc" data-r="know"><span>🙂</span>I know it</button>
         <button class="ans prac" data-act="fc" data-r="practice"><span>🤔</span>Need practice</button>`
      : `<button class="btn primary big" data-act="flip">Show answer</button>`;

    /* Quiz component (3 типи) */
    function options(e, k) {
      const field = k === 'en-ua' ? 'translation' : 'word';
      const same = AK.shuffle(ENTRIES.filter(x => x.id !== e.id && x.unit === e.unit));
      const other = AK.shuffle(ENTRIES.filter(x => x.id !== e.id && x.unit !== e.unit));
      const seen = new Set([AK.norm(e[field])]); const out = [];
      for (const x of [...same, ...other]) { const v = AK.norm(x[field]); if (!seen.has(v)) { seen.add(v); out.push(x); } if (out.length === 3) break; }
      return AK.shuffle([e, ...out]).map(x => ({ id: x.id, text: x[field] }));
    }
    function Quiz(e, k) {
      if (!P.opts || P.optsFor !== P.i) { P.opts = options(e, k); P.optsFor = P.i; P.picked = null; }
      const prompt = k === 'en-ua' ? esc(e.word) : k === 'ua-en' ? esc(e.translation) : esc(e.meaning);
      const ask = k === 'en-ua' ? 'What does it mean in Ukrainian?' : k === 'ua-en' ? 'Which English phrase is it?' : 'Which phrase has this meaning?';
      const done = P.picked != null, ok = done && P.picked === e.id;
      return `
        <div class="qz-card ${k}">
          <span class="qz-kind">${esc(QKIND[k])}</span>
          <div class="qz-prompt${k === 'meaning' ? ' long' : ''}">${prompt}</div>
          <span class="qz-ask">${ask}</span>
        </div>
        <div class="qz-opts" role="group" aria-label="Answer options">
          ${P.opts.map((o, i) => {
            let c = '';
            if (done) c = o.id === e.id ? ' right' : o.id === P.picked ? ' wrong' : ' dim';
            return `<button class="qz-o${c}" data-act="pick" data-id="${esc(o.id)}" ${done ? 'disabled' : ''}><kbd>${i + 1}</kbd><span>${esc(o.text)}</span></button>`;
          }).join('')}
        </div>
        ${done ? `<div class="qz-fb ${ok ? 'ok' : 'no'}" role="status">
            <b>${ok ? 'Correct!' : 'Not quite.'}</b>
            <span><strong>${esc(e.word)}</strong> — ${esc(e.translation)}. <em>${esc(e.meaning)}</em></span>
          </div>
          <div class="fc-ctl"><button class="btn primary big" data-act="next" id="qzNext">${P.i + 1 < P.queue.length ? 'Next' : 'See results'}</button></div>`
        : '<p class="kbd">Press 1 – 4 to answer</p>'}`;
    }

    function run() {
      const e = cur(); const k = kind();
      return `<div class="run">${top()}${k === 'flash' ? Flashcard(e) : Quiz(e, k)}</div>`;
    }

    function results() {
      const R = P.res;
      const isFlash = P.kinds.every(k => k === 'flash');
      const known = R.easy.length + R.know.length + R.right.length;
      const need = [...new Set([...R.practice, ...R.wrong])];
      const total = P.queue.length;
      const pct = total ? Math.round(known / total * 100) : 0;
      const tiles = isFlash
        ? [['Known', R.easy.length + R.know.length, 'ok'], ['Need practice', R.practice.length, 'warn'], ['Review again', need.length, 'lil']]
        : [['Score', `${known} / ${total}`, 'ok'], ['Known', known, 'ok'], ['Need practice', need.length, 'warn']];
      return `
        <div class="res">
          <div class="res-ring" style="--p:${pct}"><span>${pct}%</span></div>
          <h3 class="dsp res-h">Great job!</h3>
          <p class="small">You practised ${AK.plural(total, 'word', 'words')}${isFlash && R.easy.length ? ` · ${R.easy.length} felt easy 😎` : ''}.</p>
          <div class="tiles">${tiles.map(([l, v, c]) => `<div class="tile ${c}"><b class="dsp">${v}</b><span>${l}</span></div>`).join('')}</div>
          ${need.length ? `<div class="res-rev"><span class="dr-lbl">Review again</span>
            <div class="wchips">${need.map(id => `<button class="wchip s-practice" data-open="${esc(id)}">${esc(byId.get(id).word)}</button>`).join('')}</div></div>` : '<p class="res-perfect">Everything known — nice! ✨</p>'}
          <div class="res-btns">
            <button class="btn primary" data-act="again">${icon('loop')}Practise again</button>
            ${need.length ? `<button class="btn" data-act="review">${icon('cards')}Review again (${need.length})</button>` : ''}
            <button class="btn ghost" data-act="new">Change mode</button>
          </div>
        </div>`;
    }

    function render() { return P.phase === 'setup' ? setup() : P.phase === 'run' ? run() : results(); }
    function redraw(focus) {
      const b = $('#vBody', root); if (!b) return;
      b.innerHTML = render(); after(focus);
    }
    function after(focus) {
      if (!focus) return;
      const el = $('#fc', root) || $('.qz-o:not([disabled])', root) || $('#qzNext', root) || $('.res-btns .btn', root);
      if (el) el.focus({ preventScroll: true });
      const r = $('.run, .res', root); if (r) { const y = r.getBoundingClientRect().top; if (y < 120 || y > innerHeight * .45) window.scrollTo({ top: scrollY + y - 140, behavior: 'smooth' }); }
    }

    function flip() {
      P.flipped = !P.flipped;
      const fc = $('#fc', root); if (!fc) return;
      fc.classList.toggle('flipped', P.flipped);
      $('.fc-front', fc).setAttribute('aria-hidden', P.flipped);
      $('.fc-back', fc).setAttribute('aria-hidden', !P.flipped);
      $('#fcCtl', root).innerHTML = fcButtons();
      if (P.flipped) { const b = $('#fcCtl .ans', root); if (b && document.activeElement && document.activeElement.dataset.act === 'flip') b.focus({ preventScroll: true }); }
    }
    function rate(r) {
      const e = cur(); if (!e || !P.flipped) return;
      P.res[r].push(e.id);
      setStatus(e.id, r === 'practice' ? 'practice' : 'learned', false);
      next();
    }
    function pick(id) {
      const e = cur(); if (!e || P.picked != null) return;
      P.picked = id;
      if (id === e.id) P.res.right.push(e.id);
      else { P.res.wrong.push(e.id); setStatus(e.id, 'practice', false); }
      redraw(false);
      const n = $('#qzNext', root); if (n) n.focus({ preventScroll: true });
    }
    function next() {
      P.i++; P.flipped = false; P.picked = null; P.opts = null;
      if (P.i >= P.queue.length) { P.phase = 'done'; renderHead(); }
      redraw(true);
      if (P.phase === 'done') renderHead();
    }

    function onAct(act, el) {
      switch (act) {
        case 'mode': P.mode = el.dataset.mode; redraw(); $(`[data-mode="${P.mode}"]`, root).focus({ preventScroll: true }); return true;
        case 'source': P.source = el.dataset.src; redraw(); $(`[data-src="${P.source}"]`, root).focus({ preventScroll: true }); return true;
        case 'count': P.count = +el.dataset.n; redraw(); $(`[data-act="count"][data-n="${P.count}"]`, root).focus({ preventScroll: true }); return true;
        case 'start': start(); return true;
        case 'flip': flip(); return true;
        case 'fc': rate(el.dataset.r); return true;
        case 'pick': pick(el.dataset.id); return true;
        case 'next': next(); return true;
        case 'end':
          P.phase = P.res && P.i > 0 ? 'done' : 'setup';
          if (P.phase === 'done') { P.queue = P.queue.slice(0, P.i); P.kinds = P.kinds.slice(0, P.i); }
          else if (P.source === 'review') P.source = 'all';
          redraw(true); renderHead(); return true;
        case 'again': start(); return true;
        case 'review': {
          const need = [...new Set([...P.res.practice, ...P.res.wrong])];
          P.reviewIds = need; P.source = 'review'; P.count = 0; start(); return true;
        }
        case 'new': if (P.source === 'review') P.source = 'all'; reset(false); redraw(true); return true;
      }
      return false;
    }
    function onChange(ev) {
      if (ev.target.id === 'pUnit') { P.unit = +ev.target.value; redraw(); $('#pUnit', root).focus(); }
      if (ev.target.id === 'pLesson') { P.lesson = +ev.target.value; redraw(); $('#pLesson', root).focus(); }
    }
    function onKey(ev) {
      if (UI.tab !== 'practice' || P.phase !== 'run') return;
      if (!root.closest('.view.on')) return;
      if (ev.target.matches && ev.target.matches('input, select, textarea')) return;
      if ($('#vDrawer') && !$('#vDrawer').hidden) return;
      const k = kind();
      if (k === 'flash') {
        if ((ev.key === ' ' || ev.key === 'Enter') && (ev.target.id === 'fc' || ev.target === document.body)) { ev.preventDefault(); flip(); }
        else if (P.flipped && ['1', '2', '3'].includes(ev.key)) { ev.preventDefault(); rate(['easy', 'know', 'practice'][+ev.key - 1]); }
      } else if (P.picked == null && ['1', '2', '3', '4'].includes(ev.key)) {
        const b = $$('.qz-o', root)[+ev.key - 1]; if (b) { ev.preventDefault(); pick(b.dataset.id); }
      }
    }
    function configure(o) { Object.assign(P, o); }
    return { render, after, reset, onAct, onChange, onKey, start, configure, P };
  })();

  /* відкрити Practice з потрібним набором і одразу почати */
  function startFrom(o) {
    Practice.configure({ mode: 'flash', count: 0, ...o });
    UI.tab = 'practice';
    renderHead();
    Practice.start();
    syncHash();
  }

  /* ────────────────── MOUNT ────────────────── */
  function mount(el) {
    root = el;
    root.innerHTML = `
      <div class="st-hero">
        <div class="st-title">
          <span class="stamp">Course dictionary</span>
          <h2 class="dsp">Vocabulary</h2>
          <p>Explore, review and practise all the vocabulary from the course.</p>
        </div>
        <div id="vProg"></div>
      </div>
      <div id="vSeg" class="seg-wrap"></div>
      <div id="vBody" class="st-body"></div>`;
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('change', onChange);
    root.addEventListener('keydown', onKey);
    document.addEventListener('keydown', Practice.onKey);
    render();
  }

  /* маршрути: #words, #words?lesson=14, #words?tab=practice, #words?word=u1-l1-authentic */
  function route(p, fromLink) {
    if (!root) return;
    const tab = ['dictionary', 'units', 'favourites', 'practice'].includes(p.tab) ? p.tab : 'dictionary';
    let changed = tab !== UI.tab;
    if (p.lesson && AK.lesson(p.lesson)) {
      UI.lesson = String(+p.lesson); UI.unit = 'all'; UI.q = ''; UI.type = UI.st = 'all'; UI.favOnly = false; changed = true;
    }
    if (p.unit && AK.unit(p.unit)) { UI.unit = String(+p.unit); changed = true; }
    if (changed || fromLink) { UI.tab = tab; Practice.reset(false); render(); }
    if (p.word && byId.has(p.word)) openDrawer(p.word);
  }

  const S = AK.sections.words = {
    mount, route,
    entries: ENTRIES,
    countForLesson: n => wordsForLesson(n).length,
    closeOverlays: closeDrawer
  };

  /* Для розробника: перевірка даних у консолі → AKStudy.sections.words.entries */
  if (ENTRIES.length === 0) console.info('[Vocabulary] Словник порожній — додайте слова у study/data/vocabulary-data.js');
  void S;
})();
