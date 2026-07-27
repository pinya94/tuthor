// Analiza la Frase — API de rondas. Genera con el motor (grammarGen) a partir
// de las plantillas del idioma. genRound({ lang, level, filter }).
import { TASKS, RANK } from '../data/frasesTasks'
import { TEMPLATES_ES } from '../data/frases_es'
import { TEMPLATES_CA } from '../data/frases_ca'
import { TEMPLATES_EN } from '../data/frases_en'
import { buildRound, sameSet } from './grammarGen'

const TEMPLATES = { es: TEMPLATES_ES, ca: TEMPLATES_CA, en: TEMPLATES_EN }

export { sameSet, TASKS }

// lang: 'es'|'ca'|'en' · level: 'primaria'|'eso'|'bach' · filter: [task…] | null
export function genRound({ lang = 'es', level = 'primaria', filter = null } = {}, rand = Math.random) {
  const templates = TEMPLATES[lang] || TEMPLATES_ES
  return buildRound(templates, TASKS, RANK[level] ?? 0, filter, rand, lang)
}
