import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const root = new URL('..', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const ctx = { R: (ic, label, type, url, free) => ({ ic, label, type, url, free: !!free }) };
vm.createContext(ctx);
vm.runInContext(readFileSync(new URL('quiz-data.js', root), 'utf8').replace('const QUIZ', 'globalThis.QUIZ'), ctx);
const data = html.slice(html.indexOf('const T = {'), html.indexOf('const LVL'));
vm.runInContext(data.replace(/^const (T|QN|QPASS|COURSE|EVAL)\b/gm, 'globalThis.$1'), ctx);

const { COURSE, QUIZ, T, QN } = ctx;
const problems = [];
const fields = ['obj', 'pre', 'kid', 'theory', 'res', 'hands', 'crit', 'deliver', 'mut'];
for (const m of COURSE) {
  for (const f of fields) if (!m[f] || (Array.isArray(m[f]) && m[f].length === 0)) problems.push(`${m.id}: missing ${f}`);
  if (!m.top && !m.rubm) problems.push(`${m.id}: missing rubric`);
  if (!T[m.track]) problems.push(`${m.id}: unknown level ${m.track}`);
  if ((QUIZ[m.id] || []).length < QN) problems.push(`${m.id}: quiz bank smaller than ${QN}`);
}
let questions = 0;
for (const [id, bank] of Object.entries(QUIZ)) {
  for (const it of bank) {
    questions++;
    if (!(Number.isInteger(it.a) && it.a >= 0 && it.a < it.o.length) || !it.why) problems.push(`${id}: bad question "${it.q.slice(0, 40)}"`);
  }
}
const ids = new Set(COURSE.map((m) => m.id));
for (const id of Object.keys(QUIZ)) if (id !== 'final' && !ids.has(id)) problems.push(`quiz without module: ${id}`);

const levels = new Set(COURSE.map((m) => m.track).filter((t) => t !== 'cap')).size;
console.log(`${COURSE.length} modules · ${levels} levels + final project`);
console.log(`${questions} quiz questions · ${problems.length} problems`);
for (const p of problems) console.log(`✗ ${p}`);
process.exit(problems.length ? 1 : 0);
