const I18N = (() => {
  const LANGS = ['es', 'en'];
  const KEY = 'qacurso_lang';

  function lang() {
    try {
      const saved = localStorage.getItem(KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) {}
    return String(navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  }

  function setLang(l) {
    try { localStorage.setItem(KEY, l); } catch (e) {}
    location.reload();
  }

  const empty = (v) => v === '' || v === null || v === undefined;

  function merge(base, over) {
    if (Array.isArray(base)) return base.map((v, i) => merge(v, Array.isArray(over) ? over[i] : undefined));
    if (base && typeof base === 'object') {
      const out = {};
      for (const k of Object.keys(base)) out[k] = merge(base[k], over && typeof over === 'object' ? over[k] : undefined);
      return out;
    }
    return empty(over) ? base : over;
  }

  async function fetchJson(l, file) {
    const r = await fetch(`i18n/${l}/${file}`);
    if (!r.ok) throw new Error(`${r.status} i18n/${l}/${file}`);
    return r.json();
  }

  async function load(files) {
    const l = lang();
    const es = await Promise.all(files.map((f) => fetchJson('es', f)));
    const tr = l === 'es' ? es : await Promise.all(files.map((f) => fetchJson(l, f).catch(() => undefined)));
    const out = {};
    files.forEach((f, i) => { out[f.replace(/\.json$/, '')] = l === 'es' ? es[i] : merge(es[i], tr[i]); });
    return out;
  }

  function t(dict, key, vars) {
    const s = key.split('.').reduce((o, k) => (o == null ? o : o[k]), dict);
    if (s == null) return key;
    return vars ? String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : s;
  }

  function apply(dict, root) {
    (root || document).querySelectorAll('[data-i18n]').forEach((e) => { e.innerHTML = t(dict, e.dataset.i18n); });
    (root || document).querySelectorAll('[data-i18n-ph]').forEach((e) => { e.placeholder = t(dict, e.dataset.i18nPh); });
  }

  function switcher(el, label) {
    const l = lang();
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', label || 'Idioma / Language');
    el.innerHTML = LANGS.map((x) => `<button type="button" data-lang="${x}" aria-pressed="${x === l}" lang="${x}">${x.toUpperCase()}</button>`).join('');
    el.querySelectorAll('button').forEach((b) => { b.onclick = () => { if (b.dataset.lang !== l) setLang(b.dataset.lang); }; });
    document.documentElement.lang = l;
  }

  return { LANGS, lang, load, merge, t, apply, switcher };
})();
