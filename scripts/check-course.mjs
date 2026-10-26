import { readFileSync, readdirSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (p) => JSON.parse(readFileSync(new URL(p, root), 'utf8'));
const meta = read('course.json');
const files = (l) => readdirSync(new URL(`i18n/${l}/`, root)).filter((f) => f.endsWith('.json')).sort();
const problems = [];

const esFiles = files('es');
const enFiles = files('en');
for (const f of esFiles) if (!enFiles.includes(f)) problems.push(`en is missing ${f}`);
for (const f of enFiles) if (!esFiles.includes(f)) problems.push(`en has extra ${f}`);
const es = Object.fromEntries(esFiles.map((f) => [f, read(`i18n/es/${f}`)]));
const en = Object.fromEntries(enFiles.filter((f) => es[f]).map((f) => [f, read(`i18n/en/${f}`)]));

let leaves = 0, translated = 0;
function sameShape(a, b, path) {
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return problems.push(`${path}: en is not a list`);
    if (a.length !== b.length) problems.push(`${path}: es has ${a.length} items, en has ${b.length}`);
    a.forEach((v, i) => sameShape(v, b[i], `${path}[${i}]`));
  } else if (a && typeof a === 'object') {
    if (!b || typeof b !== 'object' || Array.isArray(b)) return problems.push(`${path}: en is not an object`);
    for (const k of Object.keys(a)) if (!(k in b)) problems.push(`${path}.${k}: missing in en`);
    for (const k of Object.keys(b)) if (!(k in a)) problems.push(`${path}.${k}: extra in en`);
    for (const k of Object.keys(a)) if (k in b) sameShape(a[k], b[k], `${path}.${k}`);
  } else if (typeof a === 'string') {
    leaves++;
    if (typeof b !== 'string') problems.push(`${path}: en must be a string`);
    else if (b.trim()) translated++;
  } else if (a !== b) {
    problems.push(`${path}: es is ${JSON.stringify(a)}, en is ${JSON.stringify(b)}`);
  }
}
for (const f of Object.keys(en)) sameShape(es[f], en[f], f);

const pick = (prefix, src) => Object.assign({}, ...Object.entries(src).filter(([f]) => f.startsWith(prefix)).map(([, v]) => v));
const texts = pick('modules-', es);
const quiz = Object.assign(pick('quiz-', es), es['exam.json']);
for (const [lang, src] of [['es', es], ['en', en]]) {
  const q = Object.assign(pick('quiz-', src), src['exam.json']);
  for (const [id, bank] of Object.entries(q)) bank.forEach((it, i) => {
    const ref = quiz[id] && quiz[id][i];
    if (!Array.isArray(it.o) || !Number.isInteger(it.a) || it.a < 0 || it.a >= it.o.length) problems.push(`${lang} ${id}[${i}]: answer index out of range`);
    if (lang === 'en' && ref && (it.o.length !== ref.o.length || it.a !== ref.a)) problems.push(`en ${id}[${i}]: options or answer index differ from es`);
  });
}

const fields = ['title', 'hours', 'mentor', 'kid', 'obj', 'pre', 'theory', 'res', 'hands', 'crit', 'deliver', 'mut'];
const ids = new Set();
for (const m of meta.modules) {
  ids.add(m.id);
  const t = texts[m.id];
  if (!t) { problems.push(`${m.id}: no text in i18n/es`); continue; }
  for (const f of fields) if (!t[f] || (Array.isArray(t[f]) && !t[f].length)) problems.push(`${m.id}: missing ${f}`);
  if (!t.top && !t.rubm) problems.push(`${m.id}: missing rubric`);
  if ((t.res || []).length !== m.res.length) problems.push(`${m.id}: ${m.res.length} resources in course.json, ${(t.res || []).length} texts`);
  if (!meta.colors[m.track]) problems.push(`${m.id}: unknown level ${m.track}`);
  if ((quiz[m.id] || []).length < meta.qn) problems.push(`${m.id}: quiz bank smaller than ${meta.qn}`);
}
for (const id of Object.keys(texts)) if (!ids.has(id)) problems.push(`text without module: ${id}`);
for (const id of Object.keys(quiz)) if (id !== 'final' && !ids.has(id)) problems.push(`quiz without module: ${id}`);

const questions = Object.values(quiz).reduce((n, b) => n + b.length, 0);
const levels = new Set(meta.modules.map((m) => m.track).filter((t) => t !== 'cap')).size;
console.log(`${meta.modules.length} modules · ${levels} levels + final project`);
console.log(`${questions} quiz questions · ${problems.length} problems`);
console.log(`en: ${translated}/${leaves} texts translated (${Math.round((translated / leaves) * 100)}%)`);
for (const p of problems) console.log(`✗ ${p}`);
process.exit(problems.length ? 1 : 0);
