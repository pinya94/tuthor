import { writeFileSync } from 'node:fs'
import { FICHAS_ES, FICHAS_EN } from '../src/data/infoJuegosFichas.js'

const out = {}
for (const [id, f] of Object.entries(FICHAS_ES)) {
  const es = (f.beneficios ?? []).map(b => b.titulo).filter(Boolean)
  const en = (FICHAS_EN[id]?.beneficios ?? []).map(b => b.titulo).filter(Boolean)
  if (es.length) out[id] = { es, en: en.length ? en : es }
}

const body = Object.entries(out)
  .map(([id, v]) => `  '${id}': {\n    es: [${v.es.map(s => JSON.stringify(s)).join(', ')}],\n    en: [${v.en.map(s => JSON.stringify(s)).join(', ')}],\n  },`)
  .join('\n')

const file = `// ── Qué se practica con cada ejercicio ───────────────────────────────────────
// Espejo COMPACTO de los títulos de \`beneficios\` de infoJuegosFichas.js, para
// alimentar la propiedad \`teaches\` de schema.org (ver QuizSchema.jsx).
//
// Por qué un fichero aparte y no importar las fichas: infoJuegosFichas.js pesa
// 229 KB (lleva intro, ejemplo, versión en papel, FAQ… de 34 juegos) y esto
// hace falta en TODAS las páginas de examen. Aquí solo van los títulos: unos
// pocos KB.
//
// GENERADO por scripts/gen-exerciseSkills.mjs a partir de las fichas — no
// editar a mano. El test de invariantes comprueba que no se desincronice.
//
// El catalán cae al español, igual que hace resolveMeta en scripts/seoMeta.mjs
// mientras no esté traducido.
export const EXERCISE_SKILLS = {
${body}
}

export function skillsFor(gameId, lang = 'es') {
  const entry = EXERCISE_SKILLS[gameId]
  if (!entry) return undefined
  return (lang === 'en' ? entry.en : entry.es) ?? entry.es
}
`

writeFileSync(new URL('../src/data/exerciseSkills.js', import.meta.url), file, 'utf8')
console.log(`${Object.keys(out).length} juegos, ${file.length} bytes`)
