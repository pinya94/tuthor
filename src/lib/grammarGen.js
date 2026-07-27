// Motor generativo de frases para "Analiza la Frase".
// Una plantilla construye una lista de "unidades" (palabras) etiquetadas con su
// clase, su función sintáctica y su género/número. De ahí se derivan TODAS las
// respuestas correctas por construcción (no hay anotación a mano → no hay erratas).
//
// unidad = { text, classes:[clase…], roles:[función…], gen?:'m'|'f', num?:'sg'|'pl' }

export const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
export const pick = (arr, rand) => arr[rnd(0, arr.length - 1, rand)]

// Clave de forma para género+número: 'ms' | 'fs' | 'mp' | 'fp'
export function gk(gen, num) { return gen + (num === 'sg' ? 's' : 'p') }

// ── Grupo nominal con género (español / catalán) ──────────────────────────────
// opts: { det:'def'|'ind'|'pos'|'dem'|null, adj:bool, num, gen, role:[…], nucleo:bool }
export function npGen(P, rand, opts = {}) {
  const s = pick(opts.pool || P.sustCosa, rand)
  const gen = s.gen
  const num = opts.num || (rand() < 0.5 ? 'sg' : 'pl')
  const k = gk(gen, num)
  const role = opts.role || []
  const units = []
  if (opts.det) {
    const table = P.det[opts.det]
    const isArt = opts.det === 'def' || opts.det === 'ind'
    units.push({ text: table[k], classes: isArt ? ['determinante', 'articulo'] : ['determinante'], roles: role, gen, num })
  }
  units.push({ text: s.forms[num], classes: ['sustantivo'], roles: opts.nucleo ? [...role, 'nucleo-sujeto'] : role, gen, num })
  if (opts.adj) {
    const a = pick(opts.adjPool || P.adj, rand)
    units.push({ text: a.forms[k], classes: ['adjetivo'], roles: role, gen, num })
  }
  return { units, gen, num }
}

// ── Grupo nominal inglés (sin género) ─────────────────────────────────────────
export function npEn(P, rand, opts = {}) {
  const s = pick(opts.pool || P.sustCosa, rand)
  const num = opts.num || (rand() < 0.5 ? 'sg' : 'pl')
  const role = opts.role || []
  const units = []
  if (opts.det) {
    const table = P.det[opts.det]
    const isArt = opts.det === 'def' || opts.det === 'ind'
    units.push({ text: table[num] ?? table.sg, classes: isArt ? ['determinante', 'articulo'] : ['determinante'], roles: role, num })
  }
  if (opts.adj) {
    const a = pick(opts.adjPool || P.adj, rand)
    units.push({ text: a, classes: ['adjetivo'], roles: role, num })
  }
  units.push({ text: s.forms[num], classes: ['sustantivo'], roles: opts.nucleo ? [...role, 'nucleo-sujeto'] : role, num })
  return { units, num }
}

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
  for (let attempt = 0; attempt < 60; attempt++) {
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

// ── Plantillas para lenguas con género (español, catalán) ─────────────────────
// P = bolsas de palabras del idioma. Devuelve el array de plantillas.
const cap = u => { u.text = u.text.charAt(0).toUpperCase() + u.text.slice(1); return u }
const verbU = (v, num) => ({ text: v.forms[num], classes: ['verbo'], roles: ['predicado'] })

export function makeGenderedTemplates(P) {
  // Restricciones semánticas: los sujetos de verbos de acción son ANIMADOS
  // (personas/animales) y los objetos y lugares son COSAS. Así no salen frases
  // como "las flores leen los regalos" o "el cuadro ladra".
  const cosa = P.sustCosa
  const persona = P.sustPer
  const animal = P.sustAnimal || []
  const sujAnim = persona.concat(animal)   // sujeto de verbos intransitivos (animado)
  const adjP = P.adjPer || P.adj            // adjetivos aptos para personas/animales (sin colores)
  return [
    // rank 0 (Primaria+)
    { id: 'g-svo', rank: 0, build(rand) {
      const s = npGen(P, rand, { pool: persona, det: pick(['def', 'ind'], rand), adj: rand() < 0.4, adjPool: adjP, role: ['sujeto'], nucleo: true })
      cap(s.units[0])
      const cd = npGen(P, rand, { pool: cosa, det: pick(['def', 'ind'], rand), adj: rand() < 0.4, role: ['predicado', 'cd'] })
      return [...s.units, verbU(pick(P.verbTr, rand), s.num), ...cd.units]
    } },
    { id: 'g-sv-adj', rank: 0, build(rand) {
      const s = npGen(P, rand, { pool: sujAnim, det: 'def', adj: true, adjPool: adjP, role: ['sujeto'], nucleo: true })
      cap(s.units[0])
      return [...s.units, verbU(pick(P.verbIntr, rand), s.num)]
    } },
    { id: 'g-sv-adv', rank: 0, build(rand) {
      const s = npGen(P, rand, { pool: sujAnim, det: pick(['def', 'ind'], rand), role: ['sujeto'], nucleo: true })
      cap(s.units[0])
      const adv = { text: pick(P.adv, rand), classes: ['adverbio'], roles: ['predicado', 'cc'] }
      return [...s.units, verbU(pick(P.verbIntr, rand), s.num), adv]
    } },
    // rank 1 (ESO+)
    { id: 'g-sv-cc', rank: 1, build(rand) {
      const s = npGen(P, rand, { pool: sujAnim, det: 'def', role: ['sujeto'], nucleo: true })
      cap(s.units[0])
      const prep = { text: pick(P.prepCC, rand), classes: ['preposicion'], roles: ['predicado', 'cc'] }
      const place = npGen(P, rand, { pool: cosa, det: 'def', role: ['predicado', 'cc'] })
      return [...s.units, verbU(pick(P.verbIntr, rand), s.num), prep, ...place.units]
    } },
    { id: 'g-cop', rank: 1, build(rand) {
      const anim = rand() < 0.5
      const s = npGen(P, rand, { pool: anim ? sujAnim : cosa, det: 'def', role: ['sujeto'], nucleo: true })
      cap(s.units[0])
      const v = pick(P.verbCop, rand)
      const a = pick(anim ? adjP : P.adj, rand)
      const attr = { text: a.forms[gk(s.gen, s.num)], classes: ['adjetivo'], roles: ['predicado', 'atributo'], gen: s.gen, num: s.num }
      return [...s.units, { text: v.forms[s.num], classes: ['verbo'], roles: ['predicado'] }, attr]
    } },
    { id: 'g-ditr', rank: 1, build(rand) {
      const s = npGen(P, rand, { pool: persona, det: 'def', role: ['sujeto'], nucleo: true })
      cap(s.units[0])
      const cd = npGen(P, rand, { pool: cosa, det: 'ind', role: ['predicado', 'cd'] })
      const aU = { text: 'a', classes: ['preposicion'], roles: ['predicado', 'ci'] }
      const ci = npGen(P, rand, { pool: persona, det: 'def', num: 'sg', role: ['predicado', 'ci'] })
      return [...s.units, verbU(pick(P.verbDitr, rand), s.num), ...cd.units, aU, ...ci.units]
    } },
    { id: 'g-pron-svo', rank: 1, build(rand) {
      const pr = pick(P.pronSuj, rand)
      const pron = { text: pr.t, classes: ['pronombre'], roles: ['sujeto', 'nucleo-sujeto'], gen: pr.gen, num: pr.num }
      const cd = npGen(P, rand, { pool: cosa, det: pick(['def', 'ind'], rand), adj: rand() < 0.3, role: ['predicado', 'cd'] })
      return [pron, verbU(pick(P.verbTr, rand), pr.num), ...cd.units]
    } },
    // rank 2 (Bachillerato) — frase larga
    { id: 'g-svo-cc', rank: 2, build(rand) {
      const s = npGen(P, rand, { pool: persona, det: 'def', adj: true, adjPool: adjP, role: ['sujeto'], nucleo: true })
      cap(s.units[0])
      const cd = npGen(P, rand, { pool: cosa, det: 'ind', adj: rand() < 0.5, role: ['predicado', 'cd'] })
      const prep = { text: pick(P.prepCC, rand), classes: ['preposicion'], roles: ['predicado', 'cc'] }
      const place = npGen(P, rand, { pool: cosa, det: 'def', role: ['predicado', 'cc'] })
      return [...s.units, verbU(pick(P.verbTr, rand), s.num), ...cd.units, prep, ...place.units]
    } },
  ]
}
