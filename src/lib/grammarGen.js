// Motor generativo de frases para "Analiza la Frase".
// Una plantilla construye una lista de "unidades" (palabras) etiquetadas con su
// clase, su función sintáctica y su género/número. De ahí se derivan TODAS las
// respuestas correctas por construcción (no hay anotación a mano → no hay erratas).
//
// unidad = { text, classes:[clase…], roles:[función…], gen?:'m'|'f', num?:'sg'|'pl' }
import { NOMBRES, ADJETIVOS, ADVERBIOS, PREPS, TRANSITIVOS, DITRANSITIVOS, INTRANSITIVOS, COPULATIVOS, IDIOMA } from '../data/frasesLexico'

export const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
export const pick = (arr, rand) => arr[rnd(0, arr.length - 1, rand)]

// Clave de forma para género+número: 'ms' | 'fs' | 'mp' | 'fp'
export function gk(gen, num) { return gen + (num === 'sg' ? 's' : 'p') }

// ── Contracciones preposición + artículo (a+el=al, de+el=del, per+el=pel…) ─────
// Se hace a nivel de unidades ANTES de anotar, así los índices siguen cuadrando.
// La unidad fusionada lleva las clases de ambas (preposición + artículo), que es
// lo correcto: "al" es la contracción de las dos.
const CONTRACTIONS = {
  es: { 'a el': 'al', 'de el': 'del' },
  ca: { 'a el': 'al', 'a els': 'als', 'de el': 'del', 'de els': 'dels', 'per el': 'pel', 'per els': 'pels' },
}
// ── Elisió catalana: article el/la → l' davant de vocal o h (l'arbre, l'amiga) ──
// Es fa abans de la contracció, així "a el arbre" acaba sent "a l'arbre" (no "al
// arbre"). Només per al català; l'article queda com a fitxa pròpia "l'".
const VOWEL_CA = /^[aeiouàèéíòóúïüh]/i
export function elide(units, lang) {
  if (lang !== 'ca') return units
  return units.map((u, i) => {
    const n = units[i + 1]
    const low = u.text.toLowerCase()
    if (n && (u.classes || []).includes('articulo') && (low === 'el' || low === 'la') && VOWEL_CA.test(n.text)) {
      const wasCap = u.text[0] !== low[0] // el→l' · El→L' (mantén la mayúscula del inicio de frase)
      return { ...u, text: wasCap ? "L'" : "l'" }
    }
    return u
  })
}

export function contract(units, lang) {
  const table = CONTRACTIONS[lang]
  if (!table) return units
  const out = []
  for (let i = 0; i < units.length; i++) {
    const u = units[i], n = units[i + 1]
    const key = n ? `${u.text.toLowerCase()} ${n.text.toLowerCase()}` : null
    if (key && table[key] && (u.classes || []).includes('preposicion') && (n.classes || []).includes('articulo')) {
      out.push({
        text: table[key],
        classes: [...new Set([...(u.classes || []), ...(n.classes || [])])],
        roles: [...new Set([...(u.roles || []), ...(n.roles || [])])],
        gen: n.gen, num: n.num,
      })
      i++ // saltar el artículo, ya fusionado
    } else {
      out.push(u)
    }
  }
  return out
}

// ── Deriva todas las respuestas (índices por tarea) a partir de las unidades ───
export function annFromUnits(units) {
  const ann = {}
  const add = (task, i) => { (ann[task] = ann[task] || []).push(i) }
  units.forEach((u, i) => {
    (u.classes || []).forEach(c => add(c, i))
    ;(u.roles || []).forEach(r => add(r, i))
    if (u.gen === 'f') add('femenino', i)
    if (u.gen === 'm') add('masculino', i)
    if (u.num === 'sg') add('singular', i)
    if (u.num === 'pl') add('plural', i)
  })
  return ann
}

// ── Construye una ronda: plantilla válida + tarea válida para nivel/filtro ─────
export function buildRound(templates, TASKS, levelRank, filter, rand, lang, fixed = []) {
  const elig = templates.filter(t => t.rank <= levelRank)
  const eligFix = fixed.filter(f => f.rank <= levelRank)
  const mk = (id, tokens, ann, find) => ({
    id: `${id}:${find}:${tokens.join('_')}`,
    tokens, find, indices: ann[find], label: TASKS[find].label, explica: TASKS[find].explica,
  })
  let fallback = null
  // Con filtro hacen falta más intentos: p. ej. solo una plantilla lleva adverbio
  for (let attempt = 0; attempt < (filter ? 400 : 60); attempt++) {
    // ~30% de las veces una frase fija (compuesta), si hay alguna para el nivel.
    const useFix = eligFix.length && rand() < 0.3
    let units, id
    if (useFix) {
      const f = pick(eligFix, rand)
      units = f.units
      id = 'fija'
    } else {
      const t = pick(elig, rand)
      units = contract(elide(t.build(rand), lang), lang)
      id = t.id
    }
    const tokens = units.map(u => u.text)
    const ann = annFromUnits(units)
    const all = Object.keys(ann).filter(k => ann[k].length > 0 && TASKS[k] && TASKS[k].min <= levelRank)
    if (!all.length) continue
    if (!fallback) fallback = mk(id, tokens, ann, pick(all, rand))
    const tasks = filter ? all.filter(k => filter.includes(k)) : all
    if (!tasks.length) continue
    return mk(id, tokens, ann, pick(tasks, rand))
  }
  return fallback
}

export function sameSet(a, b) {
  if (a.length !== b.length) return false
  const sa = new Set(a)
  return b.every(x => sa.has(x))
}

// ── Plantillas a partir del léxico común (data/frasesLexico.js) ───────────────
// Las mismas ocho plantillas para los tres idiomas. Cada hueco se rellena
// SOLO con palabras que el léxico declara compatibles con lo ya elegido
// (verbo → objeto, lugar → sujeto, adjetivo → sustantivo, verbo → adverbio),
// así que no salen frases como «It reads the cars» o «el perro corre ayer».
// Cada unidad lleva `lex` (id del concepto) para que el test pueda auditar
// las combinaciones.

// ¿El sustantivo n encaja con alguna de estas etiquetas (tipo o tag)?
export const encaja = (n, etiquetas) => etiquetas.some(e => e === n.tipo || n.tags.includes(e))
// Clave de sujeto de un sustantivo animado: persona | mascota | granja
export const claseSujeto = n => (n.tipo === 'persona' ? 'persona' : n.tags.includes('granja') ? 'granja' : n.tags.includes('mascota') ? 'mascota' : null)

const capU = u => ({ ...u, text: u.text.charAt(0).toUpperCase() + u.text.slice(1) })
const VOCAL_EN = /^[aeiou]/i

export function makeTemplates(lang) {
  const L = IDIOMA[lang]
  const gendered = lang !== 'en'
  const nombres = NOMBRES.filter(n => n[lang])
  const adjetivos = ADJETIVOS.filter(a => a[lang])
  const forma = (n, num) => n[lang][num === 'sg' ? 0 : 1]
  const genero = n => (gendered ? n[lang][2] : undefined)
  const adjForma = (a, gen, num) => (gendered ? a[lang][['ms', 'fs', 'mp', 'fp'].indexOf(gk(gen, num))] : a[lang])
  const verbo = (v, num) => ({ text: v[lang][num === 'sg' ? 0 : 1], classes: ['verbo'], roles: ['predicado'], lex: v.id })
  const adjsPara = (n, clases) => adjetivos.filter(a => clases.includes(a.clase) && encaja(n, a.para))
  const pool = pred => nombres.filter(pred)

  // Grupo nominal: [det] N [adj] (es/ca) · [det] [adj] N (en)
  function np(rand, n, { det = null, num, adj = false, role = [], nucleo = false } = {}) {
    num = num || (rand() < 0.5 ? 'sg' : 'pl')
    const gen = genero(n)
    const nU = { text: forma(n, num), classes: ['sustantivo'], roles: nucleo ? [...role, 'nucleo-sujeto'] : role, gen, num, lex: n.id }
    let aU = null
    if (adj) {
      const posibles = adjsPara(n, ['cualidad'])
      if (posibles.length) {
        const a = pick(posibles, rand)
        aU = { text: adjForma(a, gen, num), classes: ['adjetivo'], roles: role, gen, num, lex: a.id }
      }
    }
    const units = gendered ? [nU, ...(aU ? [aU] : [])] : [...(aU ? [aU] : []), nU]
    if (det) {
      let t = gendered ? L.det[det][gk(gen, num)] : L.det[det][num]
      if (t === 'a' && VOCAL_EN.test(units[0].text)) t = 'an'
      if (t) units.unshift({ text: t, classes: ['determinante', 'articulo'], roles: role, gen, num })
    }
    return { units, gen, num, n }
  }
  const detAlAzar = rand => pick(['def', 'ind'], rand)
  const distinto = (a, b) => forma(a, 'sg') !== forma(b, 'sg')

  const intr = INTRANSITIVOS.filter(v => v[lang])
  const sujetosDe = v => pool(n => v.suj.some(e => e === claseSujeto(n) || n.tags.includes(e)))
  // Complementos posibles de un verbo intransitivo para un sujeto concreto
  function opcionesCC(v, s) {
    const out = []
    for (const c of v.cc) {
      if (c.lugar) {
        const sitios = pool(n => n.tags.includes('lugar') && encaja(n, c.lugar) && n.caben.includes(claseSujeto(s)))
        if (sitios.length) out.push({ ...c, sitios })
      } else if (c.comp) {
        const comps = pool(n => c.comp.includes(claseSujeto(n)) && distinto(n, s))
        if (comps.length) out.push({ ...c, comps })
      }
    }
    return out
  }
  function prepU(prep, sitio) {
    const t = lang === 'en' && prep === 'en' ? sitio.enEn : PREPS[prep][lang]
    return { text: t, classes: ['preposicion'], roles: ['predicado', 'cc'], lex: prep }
  }
  const lugarCC = (rand, prep, sitio) => [prepU(prep, sitio), ...np(rand, sitio, { det: 'def', num: 'sg', role: ['predicado', 'cc'] }).units]
  const objetosDe = v => pool(n => n.tipo === 'cosa' && encaja(n, v.obj))
  const tr = TRANSITIVOS.filter(v => v[lang] && objetosDe(v).length)
  const ditr = DITRANSITIVOS.filter(v => v[lang] && objetosDe(v).length)
  const personas = pool(n => n.tipo === 'persona')
  const cop = COPULATIVOS.filter(c => c[lang])
  const conAdverbio = intr.filter(v => v.adv.some(id => ADVERBIOS.find(a => a.id === id)?.[lang]))

  const sujeto = (rand, n, opts) => {
    const s = np(rand, n, { ...opts, role: ['sujeto'], nucleo: true })
    s.units[0] = capU(s.units[0])
    return s
  }

  return [
    // rank 0 (Primaria+)
    { id: 'g-svo', rank: 0, build(rand) {
      const v = pick(tr, rand)
      const s = sujeto(rand, pick(personas, rand), { det: detAlAzar(rand), adj: rand() < 0.4 })
      const o = np(rand, pick(objetosDe(v), rand), { det: detAlAzar(rand), adj: rand() < 0.4, role: ['predicado', 'cd'] })
      return [...s.units, verbo(v, s.num), ...o.units]
    } },
    { id: 'g-sv-adj', rank: 0, build(rand) {
      const v = pick(intr, rand)
      const s = sujeto(rand, pick(sujetosDe(v), rand), { det: 'def', adj: true })
      return [...s.units, verbo(v, s.num)]
    } },
    { id: 'g-sv-adv', rank: 0, build(rand) {
      const v = pick(conAdverbio, rand)
      const s = sujeto(rand, pick(sujetosDe(v), rand), { det: detAlAzar(rand) })
      const a = pick(ADVERBIOS.filter(x => v.adv.includes(x.id) && x[lang]), rand)
      return [...s.units, verbo(v, s.num), { text: a[lang], classes: ['adverbio'], roles: ['predicado', 'cc'], lex: a.id }]
    } },
    // rank 1 (ESO+)
    { id: 'g-sv-cc', rank: 1, build(rand) {
      for (;;) {
        const v = pick(intr, rand)
        const sN = pick(sujetosDe(v), rand)
        const ops = opcionesCC(v, sN)
        if (!ops.length) continue
        const c = pick(ops, rand)
        const s = sujeto(rand, sN, { det: 'def' })
        const cc = c.sitios
          ? lugarCC(rand, c.prep, pick(c.sitios, rand))
          : [prepU(c.prep), ...np(rand, pick(c.comps, rand), { det: 'def', role: ['predicado', 'cc'] }).units]
        return [...s.units, verbo(v, s.num), ...cc]
      }
    } },
    { id: 'g-cop', rank: 1, build(rand) {
      for (;;) {
        const c = pick(cop, rand)
        const [sg, pl, admite] = c[lang]
        const clases = admite === 'ambos' ? ['cualidad', 'estado'] : [admite]
        const sN = pick(nombres, rand)
        const adjs = adjsPara(sN, clases)
        if (!adjs.length) continue
        const s = sujeto(rand, sN, { det: 'def' })
        const a = pick(adjs, rand)
        const attr = { text: adjForma(a, s.gen, s.num), classes: ['adjetivo'], roles: ['predicado', 'atributo'], gen: s.gen, num: s.num, lex: a.id }
        return [...s.units, { text: s.num === 'sg' ? sg : pl, classes: ['verbo'], roles: ['predicado'], lex: c.id }, attr]
      }
    } },
    { id: 'g-ditr', rank: 1, build(rand) {
      const v = pick(ditr, rand)
      const sN = pick(personas, rand)
      const s = sujeto(rand, sN, { det: 'def' })
      const o = np(rand, pick(objetosDe(v), rand), { det: 'ind', num: lang === 'en' ? 'sg' : undefined, role: ['predicado', 'cd'] })
      const ci = np(rand, pick(personas.filter(p => distinto(p, sN)), rand), { det: 'def', num: 'sg', role: ['predicado', 'ci'] })
      const aU = { text: PREPS.ci[lang], classes: ['preposicion'], roles: ['predicado', 'ci'] }
      return [...s.units, verbo(v, s.num), ...o.units, aU, ...ci.units]
    } },
    { id: 'g-pron-svo', rank: 1, build(rand) {
      const pr = pick(L.pron, rand)
      const v = pick(tr, rand)
      const pron = { text: pr.t, classes: ['pronombre'], roles: ['sujeto', 'nucleo-sujeto'], gen: pr.gen, num: pr.num }
      const o = np(rand, pick(objetosDe(v), rand), { det: detAlAzar(rand), adj: rand() < 0.3, role: ['predicado', 'cd'] })
      return [pron, verbo(v, pr.num), ...o.units]
    } },
    // rank 2 (Bachillerato) — frase larga: sujeto + verbo + CD + lugar
    { id: 'g-svo-cc', rank: 2, build(rand) {
      const v = pick(tr.filter(x => x.enLugar), rand)
      const s = sujeto(rand, pick(personas, rand), { det: 'def', adj: true })
      const o = np(rand, pick(objetosDe(v), rand), { det: 'ind', num: lang === 'en' ? 'sg' : undefined, adj: rand() < 0.5, role: ['predicado', 'cd'] })
      const sitio = pick(pool(n => n.tags.includes('lugar') && n.caben.includes('persona')), rand)
      return [...s.units, verbo(v, s.num), ...o.units, ...lugarCC(rand, 'en', sitio)]
    } },
  ]
}
