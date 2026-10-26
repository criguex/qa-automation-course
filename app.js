const FILES = ['ui.json', 'pages.json', 'glossary.json', 'exam.json',
  'modules-01-14.json', 'modules-15-23.json', 'modules-24-29.json', 'modules-30-35.json',
  'quiz-01-10.json', 'quiz-11-19.json', 'quiz-20-27.json', 'quiz-28-35.json'];
const KEY = 'qacurso_v1';
const GUEST = 'qacurso_guest';
const firebaseConfig = { apiKey:"AIzaSyDM_lCq_wl7kJVmtJxHcgXP8yrvwDuvGi8", authDomain:"curso-qa.firebaseapp.com", projectId:"curso-qa", appId:"1:53424252272:web:c44521947443a21f111bb5" };
const FB_ON = typeof firebase !== 'undefined';

let UI = {}, COURSE = [], QUIZ = {}, GLOSSARY = [], T = {}, QN = 8, QPASS = 0.75;
let examBest = null, quizBest = {}, fbDb = null, fbUser = null;
const QS = {};

const $ = (id) => document.getElementById(id);
const u = (key, vars) => I18N.t(UI, key, vars);
const shuf = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((p) => p[1]);
const short = (title) => title.split(' — ')[0];
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function weekLabel(w) {
  if (!w.length) return u('week.closing');
  return w.length === 1 ? u('week.one', { a: w[0] }) : u('week.range', { a: w[0], b: w[1] });
}

function buildCourse(meta, data) {
  const texts = Object.assign({}, data['modules-01-14'], data['modules-15-23'], data['modules-24-29'], data['modules-30-35']);
  QUIZ = Object.assign({}, data['quiz-01-10'], data['quiz-11-19'], data['quiz-20-27'], data['quiz-28-35'], data.exam);
  COURSE = meta.modules.map((m) => {
    const x = texts[m.id];
    return Object.assign({}, x, {
      id: m.id, track: m.track, icon: m.icon, level: m.level, when: weekLabel(m.weeks),
      res: m.res.map((r, i) => Object.assign({}, r, x.res[i])),
      rubm: x.rubm ? x.rubm.map((r) => [r.row, r.levels]) : null,
    });
  });
  T = Object.fromEntries(Object.entries(meta.colors).map(([k, c]) => [k, { c, name: UI.levels[k] }]));
  GLOSSARY = data.glossary;
  QN = meta.qn; QPASS = meta.qpass;
}

function renderModules() {
  const legend = $('legend'), map = $('map'), modules = $('modules');
  Object.values(T).forEach((t) => { const s = document.createElement('span'); s.innerHTML = `<i class="ldot" style="background:${t.c}"></i>${t.name}`; legend.appendChild(s); });
  const LVL = UI.rubric.levels;
  let prevTrack = null;
  COURSE.forEach((m, i) => {
    const tc = T[m.track].c;
    if (m.track !== prevTrack) { const h = document.createElement('div'); h.className = 'lvlhead'; h.style.setProperty('--tc', tc); h.textContent = T[m.track].name; map.appendChild(h); prevTrack = m.track; }
    const node = document.createElement('div');
    node.className = 'node'; node.id = 'node-' + m.id; node.style.setProperty('--tc', tc);
    node.innerHTML = `<div class="ring"></div><div class="nn">${u('node.module', { n: i + 1 })}</div><div class="nicon">${m.icon}</div><div class="ntitle">${short(m.title)}</div><div class="ntrack">${T[m.track].name}</div>`;
    node.onclick = () => { location.hash = '#/' + m.id; };
    map.appendChild(node);

    const mod = document.createElement('div');
    mod.className = 'mod'; mod.id = m.id; mod.style.setProperty('--tc', tc);
    const resHtml = m.res.map((r) => `<a class="res" href="${r.url}" target="_blank" rel="noopener"><span class="ric">${r.ic}</span><span class="rmain"><span class="rlabel">${r.label}</span><span class="rtype ${r.free ? 'free' : ''}">${r.type}</span></span></a>`).join('');
    const li = (xs) => xs.map((x) => `<li>${x}</li>`).join('');
    const rubric = m.rubm
      ? `<div class="rubwrap"><table class="rub"><tr><th>${u('rubric.axis')}</th>${LVL.map((l) => `<th>${l}</th>`).join('')}</tr>${m.rubm.map(([k, ls]) => `<tr><th>${k}</th>${ls.map((x) => `<td>${x}</td>`).join('')}</tr>`).join('')}</table></div><p class="evalnote">${u('rubric.allRows')}</p>`
      : `<div class="rubwrap"><table class="rub"><tr>${LVL.map((l) => `<th>${l}</th>`).join('')}</tr><tr>${UI.rubric.generic.map((g) => `<td>${I18N.t({ g }, 'g', { top: m.top })}</td>`).join('')}</tr></table></div>`;
    mod.innerHTML = `
    <div class="mhead" onclick="this.parentElement.classList.toggle('open')">
      <div class="mnum">${m.icon}</div>
      <div class="mhcol">
        <div class="mttl">${m.title}</div>
        <div class="mmeta"><span>${m.when}</span><span>·</span><span>${u('module.level')} <b>${m.level}</b></span><span>·</span><span>${m.hours}</span><span>·</span><span style="color:${tc}">${T[m.track].name}</span></div>
      </div>
      <span class="caret">▸</span>
    </div>
    <div class="mbody">
      <div class="mentor"><div class="mav">CG</div><div class="mtext"><div class="who">${u('module.mentor')}</div>${m.mentor}</div></div>
      <div class="kid">${u('module.kid')} ${m.kid}</div>
      <div class="two goals"><div class="card"><h4>${u('module.goals')}</h4><ul class="tight">${li(m.obj)}</ul></div><div class="card"><h4>${u('module.pre')}</h4><p>${m.pre}</p></div></div>
      <div class="seclbl">${u('module.theory')}</div>
      <ul class="tight">${li(m.theory)}</ul>
      <div class="seclbl">${u('module.resources')}</div>
      <div class="reslist">${resHtml}</div>
      <div class="hands">
        <div class="hl">${u('module.lab')}</div>
        <ul class="tight">${li(m.hands)}</ul>
        <div class="hl" style="margin-top:14px">${u('module.criteria')}</div>
        <ul class="tight">${li(m.crit)}</ul>
        <div class="deliver"><input type="checkbox" id="chk-${m.id}"><label for="chk-${m.id}">${u('module.deliver')} ${m.deliver}</label></div>
      </div>
      <div class="mutw"><b>${u('module.mutation')}</b> ${m.mut}</div>
      <div class="seclbl">${u('module.evalTitle')}</div>
      <p class="evalnote">${u('module.evalNote', { qn: QN, bank: (QUIZ[m.id] || []).length, min: Math.ceil(QN * QPASS) })} <span class="qbest" id="qbest-${m.id}"></span></p>
      ${rubric}
      <div class="qmount" data-mid="${m.id}"></div>
    </div>`;
    modules.appendChild(mod);
  });
}

function renderGlos(q) {
  q = (q || '').toLowerCase().trim();
  const host = $('glosList'); if (!host) return;
  const items = GLOSSARY.filter(({ term, def }) => !q || term.toLowerCase().includes(q) || def.toLowerCase().includes(q));
  host.innerHTML = items.length ? items.map(({ term, def }) => `<div class="glos-item"><div class="gt">${esc(term)}</div><div class="gd">${esc(def)}</div></div>`).join('') : `<div style="color:var(--muted);font-size:13px">${u('glossary.empty')}</div>`;
}

function quizStart(id) {
  if (!QUIZ[id] || !QUIZ[id].length) return;
  const qs = id === 'final' ? QUIZ[id] : shuf(QUIZ[id]).slice(0, QN);
  QS[id] = { i: 0, ok: 0, qs, seq: qs.map((it) => shuf(it.o.map((op, oi) => ({ op, ok: oi === it.a })))) };
  renderQuizStep(id);
}

function renderQuizStep(id) {
  const box = document.querySelector(`.qmount[data-mid="${id}"]`); if (!box) return;
  const s = QS[id], qs = s.qs;
  const lbl = id === 'final' ? u('quiz.exam') : u('quiz.module');
  if (s.i >= qs.length) {
    const score = Math.round(s.ok / qs.length * 100);
    if (id === 'final') examDone(score); else quizDone(id, s.ok, qs.length);
    const pass = id === 'final' ? score >= 80 : s.ok / qs.length >= QPASS;
    const head = id === 'final' ? u(pass ? 'quiz.examPass' : 'quiz.examFail') : u(pass ? 'quiz.modPass' : 'quiz.modFail');
    const sub = id === 'final' ? u(pass ? 'quiz.examPassSub' : 'quiz.examFailSub') : u(pass ? 'quiz.modPassSub' : 'quiz.modFailSub', { min: Math.ceil(qs.length * QPASS), n: qs.length });
    box.innerHTML = `<div class="quiz"><div class="ql">${lbl}</div><div class="qend">
      <div class="qbig">${head}</div>
      <div class="qbig2">${s.ok} / ${qs.length} <span>(${score}%)</span></div>
      <div class="qsub">${sub}</div>
      <button class="qnext" onclick="quizStart('${id}')">${u('quiz.retry')}</button>
    </div></div>`;
    return;
  }
  const it = qs[s.i], opts = s.seq[s.i], pct = Math.round(s.i / qs.length * 100);
  box.innerHTML = `<div class="quiz"><div class="ql">${lbl} — ${u('quiz.oneAnswer')}</div>
    <div class="qprog"><div class="qbar"><i style="width:${pct}%"></i></div><span class="qcount">${s.i + 1} / ${qs.length}</span></div>
    <div class="qcard">
      <div class="qq">${it.q}</div>
      <div class="qopts" id="qopts-${id}">${opts.map((o) => `<button class="qo" data-ok="${o.ok ? 1 : 0}" onclick="answerQuiz('${id}',this)">${o.op}</button>`).join('')}</div>
      <div class="qwhy" id="why-${id}"><span class="qverdict" id="verdict-${id}"></span>${u('quiz.why')} ${it.why}</div>
      <button class="qnext" id="qnext-${id}" style="display:none" onclick="QS['${id}'].i++;renderQuizStep('${id}')">${s.i + 1 === qs.length ? u('quiz.result') : u('quiz.next')}</button>
    </div></div>`;
}

function answerQuiz(id, btn) {
  const s = QS[id], cont = $('qopts-' + id);
  if (!s || !cont || cont.dataset.done) return;
  cont.dataset.done = '1';
  const ok = btn.dataset.ok === '1'; if (ok) s.ok++;
  [...cont.querySelectorAll('.qo')].forEach((b) => { b.disabled = true; if (b.dataset.ok === '1') b.classList.add('ok'); });
  if (!ok) btn.classList.add('no');
  const v = $('verdict-' + id); if (v) { v.textContent = ok ? u('quiz.correct') : u('quiz.wrong'); v.className = 'qverdict ' + (ok ? 'okv' : 'nov'); }
  $('why-' + id).classList.add('show');
  $('qnext-' + id).style.display = 'inline-block';
}

const chks = () => Array.from(document.querySelectorAll('input[type=checkbox]'));
function mark(id, done) { $(id)?.classList.toggle('done', done); $('node-' + id)?.classList.toggle('done', done); }
function upd() { const done = chks().filter((c) => c.checked).length; const pct = Math.round(done / COURSE.length * 100); $('barfill').style.width = pct + '%'; $('pcttxt').textContent = pct + '%'; }
function renderExamBadge() { const el = $('exambadge'); if (!el) return; el.textContent = examBest == null ? '' : u(examBest >= 80 ? 'quiz.examBadgePass' : 'quiz.examBadge', { x: examBest }); }
function renderQuizBest(id) { const el = $('qbest-' + id), b = quizBest[id]; if (!el || !b) return; el.textContent = u('quiz.best', { ok: b[0], n: b[1] }) + (b[0] / b[1] >= QPASS ? u('quiz.bestPass') : u('quiz.bestFail')); }
function examDone(pct) { if (examBest == null || pct > examBest) { examBest = pct; saveP(); } renderExamBadge(); }
function quizDone(id, ok, n) { const b = quizBest[id]; if (!b || ok / n > b[0] / b[1]) { quizBest[id] = [ok, n]; saveP(); } renderQuizBest(id); }
function readLocal() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
function saveP() {
  const s = {}; chks().forEach((c) => { if (c.checked) s[c.id.replace('chk-', '')] = 1; });
  if (examBest != null) s._exam = examBest; s._quiz = quizBest;
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  cloudSave(s);
}
function applyProgress(s) {
  chks().forEach((c) => { const id = c.id.replace('chk-', ''); const on = !!s[id]; c.checked = on; mark(id, on); });
  examBest = typeof s._exam === 'number' ? s._exam : null; quizBest = s._quiz || {};
  document.querySelectorAll('.qbest').forEach((e) => { e.textContent = ''; }); Object.keys(quizBest).forEach(renderQuizBest); renderExamBadge(); upd();
}
function resetProg() { try { localStorage.removeItem(KEY); } catch (e) {} applyProgress({}); cloudSave({ _quiz: {} }); }

function mergeProgress(a, b) {
  const out = {}, q = {}, ex = [];
  for (const s of [a || {}, b || {}]) {
    for (const [k, v] of Object.entries(s)) if (!k.startsWith('_') && v) out[k] = 1;
    if (typeof s._exam === 'number') ex.push(s._exam);
    for (const [k, v] of Object.entries(s._quiz || {})) if (Array.isArray(v) && v[1] > 0 && (!q[k] || v[0] / v[1] > q[k][0] / q[k][1])) q[k] = v;
  }
  if (ex.length) out._exam = Math.max(...ex);
  out._quiz = q;
  return out;
}

function notify(msg, kind) {
  const n = $('notice'); if (!n) return;
  n.textContent = msg; n.className = 'notice' + (kind ? ' ' + kind : ''); n.hidden = false;
  clearTimeout(notify.t); notify.t = setTimeout(() => { n.hidden = true; }, kind === 'error' ? 15000 : 6000);
}
function cloudSave(s) { if (fbDb && fbUser) fbDb.collection('progress').doc(fbUser.uid).set({ data: s, updated: Date.now() }).catch((e) => notify(u('auth.saveFail', { code: e.code || e.message }), 'error')); }
async function cloudLoad(uid) {
  try {
    const d = await fbDb.collection('progress').doc(uid).get();
    const cloud = (d.exists && d.data().data) || {};
    applyProgress(mergeProgress(readLocal(), cloud)); saveP();
    notify(u('auth.merged'), 'ok');
  } catch (e) { notify(u('auth.loadFail', { code: e.code || e.message }), 'error'); }
}
function authError(e) {
  const c = e && e.code;
  if (c === 'auth/unauthorized-domain') notify(u('auth.unauthorizedDomain', { host: location.hostname }), 'error');
  else if (c === 'auth/popup-closed-by-user' || c === 'auth/cancelled-popup-request') notify(u('auth.popupClosed'));
  else if (c === 'auth/popup-blocked') notify(u('auth.popupBlocked'), 'error');
  else notify(u('auth.other', { code: c || (e && e.message) || 'error' }), 'error');
}
function authUI() {
  const w = $('authWho'), b = $('authBtn'); if (!b) return;
  b.style.display = 'inline-block';
  if (fbUser) { w.textContent = '👤 ' + (fbUser.displayName || fbUser.email || u('auth.user')); b.textContent = u('auth.signOut'); }
  else { w.textContent = ''; b.textContent = u('auth.signIn'); }
}
function doAuth() {
  if (!FB_ON) { notify(u('auth.noFirebase'), 'error'); return; }
  if (fbUser) { firebase.auth().signOut(); return; }
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(authError);
}
const isGuest = () => { try { return localStorage.getItem(GUEST) === '1'; } catch (e) { return false; } };
function enterCourse() { document.body.classList.remove('gated'); }
function enterGuest() { try { localStorage.setItem(GUEST, '1'); } catch (e) {} enterCourse(); }

function route() {
  const mm = location.hash.match(/^#\/(\w+)$/);
  const id = (mm && COURSE.some((m) => m.id === mm[1])) ? mm[1] : null;
  document.body.classList.toggle('modview', !!id);
  document.querySelectorAll('.mod').forEach((el) => el.classList.toggle('active', el.id === id));
  if (id) {
    const i = COURSE.findIndex((m) => m.id === id), p = COURSE[i - 1], n = COURSE[i + 1];
    $('modpos').textContent = u('nav.position', { i: i + 1, n: COURSE.length });
    const pv = $('prevmod'), nx = $('nextmod');
    pv.style.display = p ? '' : 'none'; if (p) { pv.href = '#/' + p.id; pv.textContent = '← ' + short(p.title); }
    nx.style.display = n ? '' : 'none'; if (n) { nx.href = '#/' + n.id; nx.textContent = short(n.title) + ' →'; }
    window.scrollTo(0, 0);
  }
}

async function boot() {
  I18N.switcher($('langsw'));
  let meta, data;
  try {
    [meta, data] = await Promise.all([fetch('course.json').then((r) => { if (!r.ok) throw new Error('course.json'); return r.json(); }), I18N.load(FILES)]);
  } catch (e) {
    document.body.classList.remove('gated');
    $('bootmsg').innerHTML = 'No se pudo cargar el curso. / Could not load the course.<br><code>python3 -m http.server 8080</code>';
    return;
  }
  UI = data.ui;
  document.title = data.pages.title;
  I18N.apply({ home: data.pages.home, ui: UI });
  buildCourse(meta, data);
  renderModules();
  renderGlos('');
  document.querySelectorAll('.qmount').forEach((el) => quizStart(el.dataset.mid));
  document.addEventListener('change', (e) => { if (e.target.matches('input[type=checkbox]')) { const id = e.target.id.replace('chk-', ''); mark(id, e.target.checked); saveP(); upd(); } });
  applyProgress(readLocal());
  if (isGuest() || !FB_ON) enterCourse();
  if (FB_ON) {
    firebase.initializeApp(firebaseConfig); fbDb = firebase.firestore();
    firebase.auth().onAuthStateChanged((usr) => {
      fbUser = usr; authUI();
      if (usr) { try { localStorage.removeItem(GUEST); } catch (e) {} enterCourse(); cloudLoad(usr.uid); }
      else if (!isGuest()) document.body.classList.add('gated');
    });
  }
  authUI();
  window.addEventListener('hashchange', route);
  route();
  document.body.classList.remove('loading');
}

boot();
