/* ═══════════════════════════════════════════════════════════════
   GRAMMAR SECTION — граматичний довідник курсу + практика.
   Дані: study/data/grammar-data.js (window.AK_GRAMMAR)
   Компоненти: GrammarCard, GrammarTopicView, QuestionCard,
               GrammarPractice, UnitAccordion, ProgressBar
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const AK = window.AKStudy;
  const { $, $$, esc, icon } = AK;

  const TOPICS = (window.AK_GRAMMAR || []).filter(t => t && t.id && t.title)
    .map((t, i) => ({ practisedIn: [], revisedIn: [], practice: [], when: [], structure: [], examples: [], mistakes: [], ...t, order: i }))
    .sort((a, b) => a.introducedIn - b.introducedIn || a.order - b.order);
  const byId = new Map(TOPICS.map(t => [t.id, t]));
  const lessonsOf = t => [t.introducedIn, ...t.practisedIn, ...t.revisedIn];
  const topicsForLesson = n => TOPICS.filter(t => lessonsOf(t).includes(+n));

  /* ────────────── STATE (localStorage) ────────────── */
  let ST = AK.store.get('grammar', {});
  const save = () => AK.store.set('grammar', ST);
  const status = id => (ST[id] && ST[id].s) || '';
  const isFav = id => !!(ST[id] && ST[id].f);
  function setStatus(id, s, toggle) { const c = ST[id] || {}; c.s = (toggle && c.s === s) ? '' : s; ST[id] = c; save(); }
  function toggleFav(id) { const c = ST[id] || {}; c.f = !c.f; ST[id] = c; save(); return c.f; }
  const counts = () => {
    let learned = 0, practice = 0, fav = 0;
    TOPICS.forEach(t => { const s = status(t.id); if (s === 'learned') learned++; else if (s === 'practice') practice++; if (isFav(t.id)) fav++; });
    return { learned, practice, fav, none: TOPICS.length - learned - practice, total: TOPICS.length };
  };

  const UI = { tab: 'all', unit: 'all', lesson: null, topic: null, ua: new Set(), openUnits: new Set(AK.units.map(u => u.n)) };
  let root;

  const where = t => `Unit ${t.unit} · Lesson ${t.introducedIn}`;
  const lvl = t => t.level ? `<span class="lvl lv-${AK.slug(String(t.level).replace('+', '-plus'))}" title="Level ${esc(t.level)}">${esc(t.level)}</span>` : '';
  const starBtn = t => { const f = isFav(t.id); return `<button class="star${f ? ' on' : ''}" data-act="fav" data-id="${esc(t.id)}" aria-pressed="${f}" aria-label="${f ? 'Remove from favourites' : 'Add to favourites'}">${icon('star')}</button>`; };

  /* ────────────── COMPONENTS ────────────── */
  function GrammarCard(t) {
    const s = status(t.id);
    const f0 = (t.structure.find(x => x.formula) || {}).formula;
    return `
      <article class="gc${s ? ' s-' + s : ''}" data-topic-card="${esc(t.id)}">
        <div class="gc-top">
          <span class="gc-u">${esc(where(t))}</span>
          ${lvl(t)}
          ${starBtn(t)}
        </div>
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.short)}</p>
        ${f0 ? `<div class="gc-f">${AK.formula(f0)}</div>` : ''}
        <div class="gc-foot">
          ${AK.StatusPill(s)}
          <button class="btn sm primary" data-topic="${esc(t.id)}">Open topic ${icon('chev')}</button>
        </div>
      </article>`;
  }

  /* QuestionCard — один і той самий для Mini Practice та Practice */
  const QLABEL = { mc: 'Choose the correct answer', gap: 'Complete the sentence', rewrite: 'Rewrite the sentence', error: 'Spot the mistake' };
  const blank = s => esc(s).replace(/___/g, '<span class="blank">_____</span>');

  function QuestionCard(q, key, st, n) {
    st = st || {};
    const done = !!st.done;
    let body = '';
    if (q.t === 'mc') {
      body = `<p class="qq-q">${blank(q.q)}</p>
        <div class="qq-opts">${q.options.map((o, i) => {
          let c = '';
          if (done) c = i === q.a ? ' right' : i === st.value ? ' wrong' : ' dim';
          return `<button class="qq-o${c}" data-qa="pick" data-i="${i}" ${done ? 'disabled' : ''}><kbd>${String.fromCharCode(65 + i)}</kbd>${esc(o)}</button>`;
        }).join('')}</div>`;
    } else if (q.t === 'gap') {
      const parts = q.q.split('___');
      const cls = done ? (st.ok ? ' right' : ' wrong') : '';
      body = `<p class="qq-q gap">${esc(parts[0])}<input class="qq-in${cls}" data-qi aria-label="Your answer" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(st.value || '')}" ${done ? 'disabled' : ''} size="${Math.max(8, ...q.a.map(a => a.length)) + 2}">${esc(parts.slice(1).join('___'))}</p>
        ${done ? '' : `<button class="btn sm" data-qa="check">Check</button>`}`;
    } else if (q.t === 'rewrite') {
      const cls = done ? (st.ok ? ' right' : ' wrong') : '';
      body = `<p class="qq-q quote">${esc(q.q)}</p>
        <p class="qq-start">Start with: <b>${esc(q.start)}…</b></p>
        <div class="qq-rw"><input class="qq-in wide${cls}" data-qi aria-label="Rewrite the sentence" autocomplete="off" spellcheck="false" value="${esc(st.value != null ? st.value : q.start + ' ')}" ${done ? 'disabled' : ''}>
        ${done ? '' : `<button class="btn sm" data-qa="check">Check</button>`}</div>`;
    } else if (q.t === 'error') {
      body = `<p class="qq-hint">Tap the part with the mistake:</p>
        <div class="qq-parts">${q.parts.map((p, i) => {
          let c = '';
          if (done) c = i === q.wrong ? ' bad' : i === st.value ? ' miss' : '';
          return `<button class="qq-p${c}" data-qa="part" data-i="${i}" ${done ? 'disabled' : ''}>${esc(p)}</button>`;
        }).join('')}</div>`;
    }
    let fb = '';
    if (done) {
      let right = '';
      if (!st.ok) {
        if (q.t === 'mc') right = q.options[q.a];
        else if (q.t === 'gap' || q.t === 'rewrite') right = q.a[0];
        else if (q.t === 'error') right = q.full || q.fix;
      }
      fb = `<div class="qq-fb ${st.ok ? 'ok' : 'no'}" role="status">
        <b>${st.ok ? 'Correct!' : 'Not quite.'}</b>
        ${q.t === 'error' ? `<span>Fix: <strong>${esc(q.parts[q.wrong])}</strong> → <strong class="fix">${esc(q.fix)}</strong></span>` : ''}
        ${right && q.t !== 'error' ? `<span>Correct answer: <strong>${esc(right)}</strong></span>` : ''}
        ${q.t === 'error' && q.full ? `<span class="full">${esc(q.full)}</span>` : ''}
        ${q.why ? `<p>${esc(q.why)}</p>` : ''}
      </div>`;
    }
    return `
      <div class="qq${done ? (st.ok ? ' is-ok' : ' is-no') : ''}" data-q="${esc(key)}">
        <div class="qq-h"><span class="qq-n">${n}</span><span class="qq-type">${QLABEL[q.t] || 'Question'}</span></div>
        ${body}${fb}
      </div>`;
  }

  /* перевірка відповіді — повертає новий стан */
  function grade(q, action, val) {
    if (q.t === 'mc') return { done: true, value: +val, ok: +val === q.a };
    if (q.t === 'error') return { done: true, value: +val, ok: +val === q.wrong };
    const v = String(val || '');
    return { done: true, value: v, ok: AK.matches(v, q.a) };
  }

  /* ────────────── TOPIC VIEW ────────────── */
  const MINI = 5;
  const mini = {}; // topicId → { key: state }

  function section(n, id, title, html) {
    return `<section class="gs" id="gs-${id}" aria-labelledby="gsh-${id}">
      <h3 id="gsh-${id}"><span class="gs-n">${String(n).padStart(2, '0')}</span>${esc(title)}</h3>${html}</section>`;
  }

  function structureHTML(t) {
    return `<div class="fx-list">${t.structure.map(s => s.table
      ? `<div class="fx-table" role="region" tabindex="0" aria-label="${esc(s.table.head.join(' / '))}"><table>
          <thead><tr>${s.table.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${s.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>`
      : `<div class="fx">
          ${s.label ? `<span class="fx-l">${esc(s.label)}</span>` : ''}
          <div class="fx-f">${AK.formula(s.formula)}</div>
          ${s.example ? `<div class="fx-e">${esc(s.example)}</div>` : ''}
        </div>`).join('')}</div>`;
  }

  function miniHTML(t) {
    const qs = t.practice.slice(0, MINI);
    const st = mini[t.id] || {};
    const answered = qs.filter((q, i) => st['m' + i] && st['m' + i].done);
    const right = answered.filter((q, i) => st['m' + qs.indexOf(q)].ok).length;
    const all = answered.length === qs.length;
    return `
      <div class="mini" data-mini="${esc(t.id)}">
        <div class="qqs">${qs.map((q, i) => QuestionCard(q, 'm' + i, st['m' + i], i + 1)).join('')}</div>
        <div class="mini-sum${all ? ' on' : ''}" aria-live="polite">
          ${all ? `<b>${right} / ${qs.length} correct</b>
            <span>${right === qs.length ? 'Perfect! You can mark this topic as learned.' : right >= qs.length - 1 ? 'Almost there!' : 'Review the structure and try again.'}</span>
            <div class="mini-btns">
              ${right >= qs.length - 1 && status(t.id) !== 'learned' ? `<button class="btn sm primary" data-act="learned" data-id="${esc(t.id)}">${icon('check')}Mark as learned</button>` : ''}
              <button class="btn sm ghost" data-act="mini-reset" data-id="${esc(t.id)}">${icon('loop')}Try again</button>
              ${t.practice.length > MINI ? `<button class="btn sm ghost" data-act="practise-topic" data-id="${esc(t.id)}">More practice</button>` : ''}
            </div>`
          : `<span class="small">${answered.length} / ${qs.length} answered</span>`}
        </div>
      </div>`;
  }

  function actionsHTML(t) {
    const s = status(t.id), f = isFav(t.id);
    return `<div class="gt-act" role="group" aria-label="Your progress on this topic">
      <button class="act ok${s === 'learned' ? ' on' : ''}" data-act="learned" data-id="${esc(t.id)}" aria-pressed="${s === 'learned'}">${icon('check')}${s === 'learned' ? 'Learned' : 'Mark as learned'}</button>
      <button class="act fav${f ? ' on' : ''}" data-act="fav" data-id="${esc(t.id)}" aria-pressed="${f}">${icon('star')}Favourite</button>
      <button class="act warn${s === 'practice' ? ' on' : ''}" data-act="practice" data-id="${esc(t.id)}" aria-pressed="${s === 'practice'}">${icon('loop')}Need more practice</button>
    </div>`;
  }

  function GrammarTopicView(t) {
    const ua = UI.ua.has(t.id);
    const idx = TOPICS.indexOf(t), prev = TOPICS[idx - 1], next = TOPICS[idx + 1];
    let n = 0;
    const secs = [];
    secs.push(['what', 'What is it?', `
      <p class="gs-lead">${esc(t.what)}</p>
      <button class="btn sm ghost" data-act="ua" data-id="${esc(t.id)}" aria-expanded="${ua}">${icon(ua ? 'eyeOff' : 'eye')}${ua ? 'Hide Ukrainian explanation' : 'Show Ukrainian explanation'}</button>
      ${ua ? `<p class="gs-ua" lang="uk">${esc(t.whatUa)}</p>` : ''}`]);
    secs.push(['when', 'When do we use it?', `<ul class="ticks">${t.when.map(w => `<li>${esc(w)}</li>`).join('')}</ul>`]);
    secs.push(['structure', 'Structure', structureHTML(t)]);
    secs.push(['examples', 'Examples', `<ul class="exs">${t.examples.map(e => `<li>${AK.fmt(e)}</li>`).join('')}</ul>`]);
    if (t.compare && t.compare.cols) secs.push(['compare', 'Compare', `
      ${t.compare.title ? `<p class="cmp-t">${esc(t.compare.title)}</p>` : ''}
      <div class="cmp" style="--cols:${t.compare.cols.length}">${t.compare.cols.map((c, i) => `
        ${i ? '<span class="cmp-vs" aria-hidden="true">vs</span>' : ''}
        <div class="cmp-c"><b>${esc(c.h)}</b><div class="cmp-f">${AK.formula(c.formula)}</div>${c.ex ? `<p class="cmp-ex">${esc(c.ex)}</p>` : ''}${c.note ? `<p class="cmp-n">${esc(c.note)}</p>` : ''}</div>`).join('')}
      </div>`]);
    secs.push(['mistakes', 'Common mistakes', `<div class="mks">${t.mistakes.map(m => `
      <div class="mk">
        <div class="mk-w"><span aria-label="Wrong">❌</span><s>${esc(m.wrong)}</s></div>
        <div class="mk-r"><span aria-label="Correct">✅</span><b>${esc(m.right)}</b></div>
        ${m.why ? `<p>${esc(m.why)}</p>` : ''}
      </div>`).join('')}</div>`]);
    if (t.practice.length) secs.push(['practice', 'Mini Practice', miniHTML(t)]);
    secs.push(['course', 'Course location', `
      <div class="dr-path wide">
        <div class="pt"><span class="pt-k in">Introduced in</span><div>${AK.lessonLink(t.introducedIn, where(t), 'lloc')}</div></div>
        <div class="pt"><span class="pt-k pr">Practised in</span><div class="lchips">${AK.lessonList(t.practisedIn)}</div></div>
        <div class="pt"><span class="pt-k rv">Revised in</span><div class="lchips">${AK.lessonList(t.revisedIn)}</div></div>
      </div>
      <a class="btn sm ghost" href="${AK.hashFor('words', { lesson: t.introducedIn })}">${icon('book')}Vocabulary used in Lesson ${t.introducedIn}</a>`]);
    secs.push(['you', 'Your progress', `<p class="small">How confident do you feel with ${esc(t.title)}?</p>${actionsHTML(t)}`]);

    const toc = secs.map(([id, title], i) => `<a href="#gs-${id}" data-toc="${id}"><span>${i + 1}</span>${esc(title)}</a>`).join('');
    return `
      <div class="gt" data-topic-view="${esc(t.id)}">
        <button class="btn sm ghost gt-back" data-act="back">${icon('back')}All topics</button>
        <header class="gt-hero">
          <div class="gt-meta"><span class="stamp">${esc(where(t))}</span>${lvl(t)}<span id="gtPill">${AK.StatusPill(status(t.id))}</span></div>
          <h2 class="dsp gt-h" tabindex="-1" id="gtTitle">${esc(t.title)}</h2>
          <p class="gt-lede">${esc(t.short)}</p>
          <div id="gtAct">${actionsHTML(t)}</div>
        </header>
        <nav class="gt-toc" aria-label="Topic sections">${toc}</nav>
        ${secs.map(([id, title, html]) => section(++n, id, title, html)).join('')}
        <nav class="gt-pn" aria-label="Other topics">
          ${prev ? `<button class="pn prev" data-topic="${esc(prev.id)}">${icon('back')}<span><small>Previous</small>${esc(prev.title)}</span></button>` : '<span></span>'}
          ${next ? `<button class="pn next" data-topic="${esc(next.id)}"><span><small>Next</small>${esc(next.title)}</span>${icon('chev')}</button>` : ''}
        </nav>
      </div>`;
  }

  /* ────────────── LIST VIEWS ────────────── */
  function AllTopics() {
    const L = UI.lesson ? AK.lesson(UI.lesson) : null;
    const list = TOPICS.filter(t => (UI.unit === 'all' || t.unit === +UI.unit) && (!L || lessonsOf(t).includes(L.n)));
    return `
      <div class="chips" role="group" aria-label="Filter by unit">
        <button class="chip${UI.unit === 'all' ? ' on' : ''}" data-act="unit" data-u="all" aria-pressed="${UI.unit === 'all'}">All Units</button>
        ${AK.units.map(u => `<button class="chip${String(UI.unit) === String(u.n) ? ' on' : ''}" data-act="unit" data-u="${u.n}" aria-pressed="${String(UI.unit) === String(u.n)}">Unit ${u.n}</button>`).join('')}
        ${L ? `<button class="chip on" data-act="clear-lesson" aria-label="Remove lesson filter">L${L.n} · ${esc(L.title)} ${icon('close')}</button>` : ''}
      </div>
      ${list.length ? `<div class="ggrid">${list.map(GrammarCard).join('')}</div>`
        : AK.Empty({ title: 'No topics here yet', text: 'Grammar for this unit will appear here after the lessons.', action: '<button class="btn sm" data-act="unit" data-u="all">Show all topics</button>' })}`;
  }

  function ByUnit() {
    return `<div class="uas">${AK.units.map(u => {
      const ts = TOPICS.filter(t => t.unit === u.n);
      if (!ts.length) return '';
      const learned = ts.filter(t => status(t.id) === 'learned').length;
      return AK.UnitAccordion({
        id: 'gu' + u.n, unit: u, open: UI.openUnits.has(u.n),
        meta: `${AK.plural(ts.length, 'topic', 'topics')} · ${learned} learned`,
        pct: Math.round(learned / ts.length * 100),
        body: () => unitBody(u)
      });
    }).join('')}</div>`;
  }
  function unitBody(u) {
    return `<div class="gl">${TOPICS.filter(t => t.unit === u.n).map(t => `
      <button class="gl-r${status(t.id) ? ' s-' + status(t.id) : ''}" data-topic="${esc(t.id)}">
        <span class="lz">L${String(t.introducedIn).padStart(2, '0')}</span>
        <span class="gl-t"><b>${esc(t.title)}</b><small>${esc(t.short)}</small></span>
        ${AK.StatusPill(status(t.id))}
        ${icon('chev', 'lr-ar')}
      </button>`).join('')}</div>`;
  }

  function Favourites() {
    const list = TOPICS.filter(t => isFav(t.id));
    if (!list.length) return AK.Empty({
      title: 'No favourite topics yet.',
      text: 'Tap the star on a topic to keep it here.',
      action: `<button class="btn primary" data-seg="all">${icon('book')}Browse all topics</button>`
    });
    return `<div class="ggrid">${list.map(GrammarCard).join('')}</div>`;
  }

  /* ────────────── PRACTICE ────────────── */
  const GP = { scope: 'all', unit: 1, topic: null, count: 10, phase: 'setup', qs: [], i: 0, ans: [], showMistakes: false };

  function gpPool() {
    const ts = GP.scope === 'unit' ? TOPICS.filter(t => t.unit === +GP.unit)
      : GP.scope === 'topic' ? TOPICS.filter(t => t.id === GP.topic)
      : GP.scope === 'weak' ? TOPICS.filter(t => status(t.id) === 'practice')
      : TOPICS;
    return ts.flatMap(t => t.practice.map((q, i) => ({ q, topic: t.id, k: t.id + ':' + i })));
  }

  function GrammarPractice() {
    if (GP.phase === 'run') return gpRun();
    if (GP.phase === 'done') return gpResults();
    if (!GP.topic) GP.topic = (TOPICS[0] || {}).id;
    const c = counts();
    const n = gpPool().length;
    const sub = GP.scope === 'unit'
      ? `<label class="fsel"><span>Unit</span><select id="gpUnit">${AK.units.filter(u => TOPICS.some(t => t.unit === u.n)).map(u => `<option value="${u.n}" ${+GP.unit === u.n ? 'selected' : ''}>Unit ${u.n} · ${esc(u.title)}</option>`).join('')}</select></label>`
      : GP.scope === 'topic'
      ? `<label class="fsel"><span>Topic</span><select id="gpTopic">${AK.units.map(u => { const ts = TOPICS.filter(t => t.unit === u.n); return ts.length ? `<optgroup label="Unit ${u.n}">${ts.map(t => `<option value="${esc(t.id)}" ${GP.topic === t.id ? 'selected' : ''}>${esc(t.title)}</option>`).join('')}</optgroup>` : ''; }).join('')}</select></label>`
      : '';
    return `
      <div class="pr">
        <div class="pr-step"><span class="pr-k">1</span><h3>What to practise</h3></div>
        <div class="chips">
          ${[['all', 'All grammar'], ['unit', 'Unit'], ['topic', 'Specific topic'], ['weak', `Need practice (${c.practice})`]].map(([v, l]) => `<button class="chip${GP.scope === v ? ' on' : ''}" data-act="gp-scope" data-v="${v}" aria-pressed="${GP.scope === v}">${esc(l)}</button>`).join('')}
        </div>
        ${sub ? `<div class="pr-sub">${sub}</div>` : ''}
        <div class="pr-step"><span class="pr-k">2</span><h3>How many questions</h3></div>
        <div class="chips">${[5, 10, 15, 20].map(k => `<button class="chip${GP.count === k ? ' on' : ''}" data-act="gp-count" data-n="${k}" aria-pressed="${GP.count === k}">${k}</button>`).join('')}</div>
        <div class="pr-types">
          ${Object.values(QLABEL).map(l => `<span class="tag">${esc(l)}</span>`).join('')}
        </div>
        <div class="pr-go">
          <span class="small">${n ? `${Math.min(n, GP.count)} questions from a bank of ${n}` : GP.scope === 'weak' ? 'No topics marked “Need more practice” yet.' : 'No questions here yet.'}</span>
          <button class="btn primary" data-act="gp-start" ${n ? '' : 'disabled'}>${icon('play')}Start</button>
        </div>
      </div>`;
  }

  function gpStart(list) {
    const pool = list || AK.shuffle(gpPool()).slice(0, GP.count);
    if (!pool.length) return;
    GP.qs = pool; GP.i = 0; GP.ans = []; GP.phase = 'run'; GP.showMistakes = false;
    renderBody(true);
  }

  function gpRun() {
    const item = GP.qs[GP.i], t = byId.get(item.topic), st = GP.ans[GP.i];
    const pct = Math.round(GP.i / GP.qs.length * 100);
    return `
      <div class="run">
        <div class="run-top">
          <button class="btn sm ghost" data-act="gp-end">${icon('back')}End</button>
          <span class="run-pos mono">${GP.i + 1} / ${GP.qs.length}</span>
          <button class="run-mode link" data-topic="${esc(t.id)}">${esc(t.title)}</button>
        </div>
        <div class="run-bar"><i style="width:${pct}%"></i></div>
        <div class="gp-q">${QuestionCard(item.q, 'gp' + GP.i, st, GP.i + 1)}</div>
        ${st && st.done ? `<div class="fc-ctl"><button class="btn primary big" data-act="gp-next" id="gpNext">${GP.i + 1 < GP.qs.length ? 'Next question' : 'See results'}</button></div>` : '<p class="kbd">A · B · C — choose · Enter — check</p>'}
      </div>`;
  }

  function gpResults() {
    const total = GP.qs.length, ok = GP.ans.filter(a => a && a.ok).length, bad = total - ok;
    const pct = total ? Math.round(ok / total * 100) : 0;
    const wrong = GP.qs.map((it, i) => ({ it, a: GP.ans[i] || {} })).filter(x => !x.a.ok);
    const weak = [...new Set(wrong.map(x => x.it.topic))].map(id => byId.get(id));
    return `
      <div class="res">
        <div class="res-ring" style="--p:${pct}"><span>${pct}%</span></div>
        <h3 class="dsp res-h">${pct >= 80 ? 'Great job!' : pct >= 50 ? 'Good effort!' : 'Keep going!'}</h3>
        <div class="tiles">
          <div class="tile ok"><b class="dsp">${ok} / ${total}</b><span>Score</span></div>
          <div class="tile ok"><b class="dsp">${ok}</b><span>Correct</span></div>
          <div class="tile warn"><b class="dsp">${bad}</b><span>Needs practice</span></div>
        </div>
        ${weak.length ? `<div class="res-rev"><span class="dr-lbl">Topics to review</span>
          <div class="wchips">${weak.map(t => `<button class="wchip s-practice" data-topic="${esc(t.id)}">${esc(t.title)}</button>`).join('')}</div>
          <button class="btn sm ghost" data-act="gp-mark">${icon('loop')}Mark these as Need more practice</button></div>` : '<p class="res-perfect">Zero mistakes — impressive! ✨</p>'}
        <div class="res-btns">
          ${bad ? `<button class="btn" data-act="gp-mistakes" aria-expanded="${GP.showMistakes}">${icon('eye')}${GP.showMistakes ? 'Hide mistakes' : 'Review mistakes'}</button>` : ''}
          ${bad ? `<button class="btn" data-act="gp-retry">${icon('loop')}Retry mistakes</button>` : ''}
          <button class="btn primary" data-act="gp-again">${icon('play')}Practise again</button>
          <button class="btn ghost" data-act="gp-new">New practice</button>
        </div>
        ${GP.showMistakes ? `<div class="mist">${wrong.map(({ it, a }, i) => {
          const q = it.q, t = byId.get(it.topic);
          const qtext = q.t === 'error' ? q.parts.join(' ') : q.q;
          const yours = q.t === 'mc' ? (q.options[a.value] ?? '—') : q.t === 'error' ? (a.value != null ? q.parts[a.value] : '—') : (a.value || '—');
          const right = q.t === 'mc' ? q.options[q.a] : q.t === 'error' ? `${q.parts[q.wrong]} → ${q.fix}` : q.a[0];
          return `<div class="mist-i">
            <div class="mist-h"><span class="qq-n">${i + 1}</span><button class="link" data-topic="${esc(t.id)}">${esc(t.title)}</button></div>
            <p class="mist-q">${blank(qtext)}</p>
            <p><span class="no">Your answer:</span> ${esc(yours)}</p>
            <p><span class="yes">Correct:</span> <b>${esc(right)}</b></p>
            ${q.why ? `<p class="small">${esc(q.why)}</p>` : ''}
          </div>`;
        }).join('')}</div>` : ''}
      </div>`;
  }

  /* ────────────── RENDER ────────────── */
  const TABS = () => [
    { id: 'all', label: 'All Topics', icon: 'book', count: TOPICS.length },
    { id: 'units', label: 'By Unit', icon: 'cards' },
    { id: 'fav', label: 'Favourites', icon: 'star', count: counts().fav },
    { id: 'practice', label: 'Practice', icon: 'play' }
  ];

  function renderHead() {
    const c = counts();
    $('#gProg', root).innerHTML = AK.ProgressBar({
      label: 'Grammar Progress', done: c.learned, total: c.total, noun: 'topics learned',
      stats: [{ text: c.practice + ' need practice', cls: 'warn' }, { text: c.none + ' not reviewed' }, { text: c.fav + ' favourites', cls: 'fav' }]
    });
    $('#gSeg', root).innerHTML = AK.Seg(TABS(), UI.topic ? '' : UI.tab, 'Grammar sections');
  }

  function renderBody(focus) {
    const b = $('#gBody', root);
    const t = UI.topic && byId.get(UI.topic);
    if (t) b.innerHTML = GrammarTopicView(t);
    else if (UI.tab === 'units') b.innerHTML = ByUnit();
    else if (UI.tab === 'fav') b.innerHTML = Favourites();
    else if (UI.tab === 'practice') b.innerHTML = GrammarPractice();
    else b.innerHTML = AllTopics();
    if (focus) {
      const el = t ? $('#gtTitle', root) : $('.qq-o:not([disabled]), .qq-in:not([disabled]), .qq-p:not([disabled]), #gpNext, .res-btns .btn', root);
      if (el) el.focus({ preventScroll: true });
      if (t || (UI.tab === 'practice' && GP.phase !== 'setup')) {
        const y = b.getBoundingClientRect().top + scrollY - 140;
        if (scrollY > y + 10 || scrollY < y - 200) window.scrollTo({ top: Math.max(0, y), behavior: t ? 'auto' : 'smooth' });
      }
    }
  }
  function render(focus) { renderHead(); renderBody(focus); }

  function refreshTopicBits(id) {
    renderHead();
    const t = byId.get(id);
    if (UI.topic === id) {
      const p = $('#gtPill', root); if (p) p.innerHTML = AK.StatusPill(status(id));
      $$('.gt-act', root).forEach(el => { el.outerHTML = actionsHTML(t); });
      const m = $(`[data-mini="${CSS.escape(id)}"]`, root); if (m) m.outerHTML = miniHTML(t);
    } else if (UI.tab !== 'practice') {
      renderBody();
    }
  }

  function openTopic(id, push = true) {
    if (!byId.has(id)) return;
    UI.topic = id;
    render(true);
    AK.setHash('grammar', { topic: id }, push);
  }
  function closeTopic() {
    UI.topic = null;
    render(false);
    syncHash();
    window.scrollTo({ top: Math.max(0, $('#gBody', root).getBoundingClientRect().top + scrollY - 140) });
    const s = $('.seg-b.on', root); if (s) s.focus({ preventScroll: true });
  }
  function setTab(tab) {
    UI.tab = tab; UI.topic = null;
    if (tab !== 'practice') GP.phase = 'setup';
    render(false); syncHash();
    const s = $('.seg-b.on', root); if (s) s.focus({ preventScroll: true });
  }
  function syncHash() {
    if (AK.parseHash().view !== 'grammar') return;
    const p = {};
    if (UI.tab !== 'all') p.tab = UI.tab;
    if (UI.tab === 'all' && UI.unit !== 'all') p.unit = UI.unit;
    if (UI.tab === 'all' && UI.lesson) p.lesson = UI.lesson;
    AK.setHash('grammar', p);
  }

  /* ────────────── EVENTS ────────────── */
  function answerQuestion(card, action, val) {
    const key = card.dataset.q;
    if (key.startsWith('gp')) {
      const i = +key.slice(2), q = GP.qs[i].q;
      if (GP.ans[i] && GP.ans[i].done) return;
      GP.ans[i] = grade(q, action, val);
      renderBody(false);
      const n = $('#gpNext', root); if (n) n.focus({ preventScroll: true });
    } else {
      const tid = card.closest('[data-mini]').dataset.mini, t = byId.get(tid);
      const i = +key.slice(1), q = t.practice[i];
      mini[tid] = mini[tid] || {};
      if (mini[tid][key] && mini[tid][key].done) return;
      mini[tid][key] = grade(q, action, val);
      const tmp = document.createElement('div');
      tmp.innerHTML = QuestionCard(q, key, mini[tid][key], i + 1);
      card.replaceWith(tmp.firstElementChild);
      const qs = t.practice.slice(0, MINI);
      const sum = $(`[data-mini="${CSS.escape(tid)}"] .mini-sum`, root);
      if (sum && qs.every((x, j) => mini[tid]['m' + j] && mini[tid]['m' + j].done)) {
        const m = $(`[data-mini="${CSS.escape(tid)}"]`, root); m.outerHTML = miniHTML(t);
      } else if (sum) {
        sum.querySelector('.small').textContent = `${qs.filter((x, j) => mini[tid]['m' + j] && mini[tid]['m' + j].done).length} / ${qs.length} answered`;
      }
      const nextQ = $(`[data-mini="${CSS.escape(tid)}"] [data-q="m${i + 1}"] .qq-o, [data-mini="${CSS.escape(tid)}"] [data-q="m${i + 1}"] .qq-in, [data-mini="${CSS.escape(tid)}"] [data-q="m${i + 1}"] .qq-p`, root);
      const fb = $(`[data-mini="${CSS.escape(tid)}"] [data-q="${key}"] .qq-fb`, root);
      if (fb) fb.setAttribute('tabindex', '-1');
      if (nextQ && action !== 'pick' && action !== 'part') nextQ.focus({ preventScroll: true });
    }
  }

  function onClick(ev) {
    const tg = ev.target;
    const seg = tg.closest('[data-seg]');
    if (seg) { setTab(seg.dataset.seg); return; }

    const toc = tg.closest('[data-toc]');
    if (toc) { ev.preventDefault(); const s = $('#gs-' + toc.dataset.toc, root); if (s) { s.scrollIntoView({ behavior: 'smooth', block: 'start' }); s.querySelector('h3').setAttribute('tabindex', '-1'); s.querySelector('h3').focus({ preventScroll: true }); } return; }

    const ua = tg.closest('[data-ua]');
    if (ua) {
      const n = +ua.dataset.ua.replace('gu', '');
      UI.openUnits.has(n) ? UI.openUnits.delete(n) : UI.openUnits.add(n);
      const sec = ua.closest('.ua'), open = UI.openUnits.has(n), body = $('.ua-b', sec);
      sec.classList.toggle('open', open); ua.setAttribute('aria-expanded', open);
      body.hidden = !open; body.innerHTML = open ? unitBody(AK.unit(n)) : '';
      return;
    }

    const q = tg.closest('[data-qa]');
    if (q) {
      const card = q.closest('[data-q]');
      const act = q.dataset.qa;
      if (act === 'check') { const inp = $('[data-qi]', card); if (!inp.value.trim() || (inp.value.trim() === (card.querySelector('.qq-start b') || {}).textContent?.replace('…', ''))) { inp.focus(); inp.classList.add('shake'); setTimeout(() => inp.classList.remove('shake'), 400); return; } answerQuestion(card, 'check', inp.value); }
      else answerQuestion(card, act, q.dataset.i);
      return;
    }

    const a = tg.closest('[data-act]');
    if (a) {
      const id = a.dataset.id;
      switch (a.dataset.act) {
        case 'fav': { const on = toggleFav(id); AK.toast(on ? 'Saved to favourites' : 'Removed from favourites'); refreshTopicBits(id); return; }
        case 'learned': setStatus(id, 'learned', true); if (status(id) === 'learned') AK.toast('Topic marked as learned ✓'); refreshTopicBits(id); return;
        case 'practice': setStatus(id, 'practice', true); if (status(id) === 'practice') AK.toast('Added to Need more practice'); refreshTopicBits(id); return;
        case 'ua': UI.ua.has(id) ? UI.ua.delete(id) : UI.ua.add(id); { const s = $('#gs-what', root); const t = byId.get(id); const open = UI.ua.has(id);
          a.setAttribute('aria-expanded', open); a.innerHTML = `${icon(open ? 'eyeOff' : 'eye')}${open ? 'Hide Ukrainian explanation' : 'Show Ukrainian explanation'}`;
          const p = $('.gs-ua', s); if (open && !p) a.insertAdjacentHTML('afterend', `<p class="gs-ua" lang="uk">${esc(t.whatUa)}</p>`); else if (!open && p) p.remove(); }
          return;
        case 'back': closeTopic(); return;
        case 'unit': UI.unit = a.dataset.u; UI.lesson = null; renderBody(); syncHash(); { const c = $(`[data-act="unit"][data-u="${UI.unit}"]`, root); if (c) c.focus({ preventScroll: true }); } return;
        case 'clear-lesson': UI.lesson = null; renderBody(); syncHash(); return;
        case 'mini-reset': delete mini[id]; { const m = $(`[data-mini="${CSS.escape(id)}"]`, root); if (m) { m.outerHTML = miniHTML(byId.get(id)); const f = $(`[data-mini="${CSS.escape(id)}"] button, [data-mini="${CSS.escape(id)}"] input`, root); if (f) f.focus({ preventScroll: true }); } } return;
        case 'practise-topic': GP.scope = 'topic'; GP.topic = id; GP.count = 10; UI.topic = null; UI.tab = 'practice'; renderHead(); gpStart(); syncHash(); return;
        case 'gp-scope': GP.scope = a.dataset.v; renderBody(); $(`[data-act="gp-scope"][data-v="${GP.scope}"]`, root).focus({ preventScroll: true }); return;
        case 'gp-count': GP.count = +a.dataset.n; renderBody(); $(`[data-act="gp-count"][data-n="${GP.count}"]`, root).focus({ preventScroll: true }); return;
        case 'gp-start': case 'gp-again': gpStart(); return;
        case 'gp-retry': gpStart(GP.qs.filter((it, i) => !(GP.ans[i] && GP.ans[i].ok))); return;
        case 'gp-next': GP.i++; if (GP.i >= GP.qs.length) GP.phase = 'done'; renderBody(true); return;
        case 'gp-end': GP.phase = GP.ans.some(Boolean) ? 'done' : 'setup'; if (GP.phase === 'done') { GP.qs = GP.qs.slice(0, GP.ans.filter(Boolean).length); } renderBody(true); return;
        case 'gp-new': GP.phase = 'setup'; renderBody(true); return;
        case 'gp-mistakes': GP.showMistakes = !GP.showMistakes; renderBody(false); { const m = $('[data-act="gp-mistakes"]', root); if (m) m.focus({ preventScroll: true }); } return;
        case 'gp-mark': {
          const ids = [...new Set(GP.qs.filter((it, i) => !(GP.ans[i] && GP.ans[i].ok)).map(it => it.topic))];
          ids.forEach(i => { if (status(i) !== 'learned') setStatus(i, 'practice', false); });
          AK.toast(AK.plural(ids.length, 'topic', 'topics') + ' added to Need more practice'); renderHead(); a.disabled = true; return;
        }
      }
    }

    const top = tg.closest('[data-topic]');
    if (top) { openTopic(top.dataset.topic, true); return; }
    const card = tg.closest('[data-topic-card]');
    if (card && !tg.closest('button, a')) openTopic(card.dataset.topicCard, true);
  }

  function onKey(ev) {
    if (ev.key === 'Enter' && ev.target.matches && ev.target.matches('[data-qi]')) {
      ev.preventDefault();
      const card = ev.target.closest('[data-q]'); const b = $('[data-qa="check"]', card); if (b) b.click();
      return;
    }
    if (UI.tab === 'practice' && GP.phase === 'run' && !UI.topic && root.closest('.view.on') && !(ev.target.matches && ev.target.matches('input, select, textarea'))) {
      const card = $('.gp-q [data-q]', root); if (!card) return;
      const item = GP.qs[GP.i];
      if (!(GP.ans[GP.i] && GP.ans[GP.i].done) && item.q.t === 'mc') {
        const i = 'abcd'.indexOf(ev.key.toLowerCase());
        if (i > -1 && i < item.q.options.length) { ev.preventDefault(); answerQuestion(card, 'pick', i); }
      }
    }
  }
  function onChange(ev) {
    if (ev.target.id === 'gpUnit') { GP.unit = +ev.target.value; renderBody(); $('#gpUnit', root).focus(); }
    if (ev.target.id === 'gpTopic') { GP.topic = ev.target.value; renderBody(); $('#gpTopic', root).focus(); }
  }

  /* ────────────── MOUNT & ROUTE ────────────── */
  function mount(el) {
    root = el;
    root.innerHTML = `
      <div class="st-hero">
        <div class="st-title">
          <span class="stamp">Grammar library</span>
          <h2 class="dsp">Grammar</h2>
          <p>Review all the grammar from the course in one place.</p>
        </div>
        <div id="gProg"></div>
      </div>
      <div id="gSeg" class="seg-wrap"></div>
      <div id="gBody" class="st-body"></div>`;
    root.addEventListener('click', onClick);
    root.addEventListener('change', onChange);
    root.addEventListener('keydown', onKey);
    document.addEventListener('keydown', onKey);
    render(false);
  }

  /* #grammar, #grammar?topic=id, #grammar?lesson=15, #grammar?tab=practice&topic=id */
  function route(p, fromLink) {
    if (!root) return;
    if (p.topic && byId.has(p.topic) && p.tab !== 'practice') {
      if (UI.topic !== p.topic) { UI.topic = p.topic; render(true); }
      return;
    }
    const tab = ['all', 'units', 'fav', 'practice'].includes(p.tab) ? p.tab : 'all';
    if (p.lesson && AK.lesson(p.lesson)) {
      const ts = topicsForLesson(p.lesson);
      const intro = ts.filter(t => t.introducedIn === +p.lesson);
      if (intro.length === 1) { UI.topic = intro[0].id; render(true); AK.setHash('grammar', { topic: intro[0].id }); return; }
      UI.lesson = +p.lesson; UI.unit = 'all';
    } else UI.lesson = null;
    if (p.unit && AK.unit(p.unit)) UI.unit = String(+p.unit);
    if (tab === 'practice' && fromLink) { GP.phase = 'setup'; if (p.topic && byId.has(p.topic)) { GP.scope = 'topic'; GP.topic = p.topic; } }
    const changed = UI.topic || UI.tab !== tab;
    UI.topic = null; UI.tab = tab;
    if (changed || fromLink || p.lesson || p.unit) render(false);
  }

  AK.sections.grammar = { mount, route, topics: TOPICS, topicsForLesson };
  if (!TOPICS.length) console.info('[Grammar] Тем поки немає — додайте їх у study/data/grammar-data.js');
})();
