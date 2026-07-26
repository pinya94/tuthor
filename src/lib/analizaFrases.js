// Analiza la Frase — lógica de rondas (sin React). Elige una frase y una tarea
// gramatical adecuadas al nivel, y devuelve las palabras correctas a señalar.
import { SENTENCES, TASKS, RANK } from '../data/analizaFrases'

const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))

// Todas las combinaciones (frase, tarea) válidas para un rango de nivel.
function candidates(maxRank) {
  const out = []
  for (const s of SENTENCES) {
    if (RANK[s.nivel] > maxRank) continue
    for (const find of Object.keys(s.ann)) {
      const task = TASKS[find]
      if (!task || task.min > maxRank) continue
      if (!s.ann[find] || s.ann[find].length === 0) continue
      out.push({ sentenceId: s.id, tokens: s.tokens, find, indices: s.ann[find], label: task.label, explica: task.explica })
    }
  }
  return out
}

// nivel: 'primaria' | 'eso' | 'bach'
export function genRound(nivel = 'primaria', rand = Math.random) {
  const maxRank = RANK[nivel] ?? 0
  const pool = candidates(maxRank)
  const c = pool[rnd(0, pool.length - 1, rand)]
  return {
    id: c.sentenceId + ':' + c.find,
    tokens: c.tokens,
    find: c.find,
    indices: c.indices,          // conjunto correcto de índices
    label: c.label,              // {es,en,ca} de la tarea (ya lleva artículo)
    explica: c.explica,          // {es,en,ca}
  }
}

// ¿El conjunto seleccionado coincide exactamente con el correcto?
export function sameSet(a, b) {
  if (a.length !== b.length) return false
  const sa = new Set(a)
  return b.every(x => sa.has(x))
}
