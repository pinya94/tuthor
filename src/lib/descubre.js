// ── Descubrir Tuthor desde cualquier página ─────────────────────────────────
//
// Casi todo el que llega a Tuthor entra por UNA página concreta (un juego, un
// examen, la ficha de un juego) desde Google, y esa página solo hablaba de sí
// misma: nada decía que el mismo tema tenía examen, resumen u otro juego, ni
// que hay más de cien juegos y exámenes de todas las materias, gratis. Este
// módulo contesta las dos preguntas con los registros, sin listas a mano:
//
//   · relacionados(id)  → ¿de qué tema es esta página y qué más hay de él?
//   · cifrasTuthor()    → ¿cuánto hay en Tuthor? (juegos, exámenes, materias)
//   · buscarEnTuthor(q) → el buscador de la home: temas y juegos por nombre
//
// El tema sale del catálogo (topicCatalog vía lib/temario.js): una página es
// de un tema si alguno de sus formatos apunta a ella. Un juego se reconoce
// también por su examen «<slug>-test».
import { construirTemario } from './temario'
import { GAMES } from './games'
import { EXAMS, examRoute } from './exams'
import { TEMA_DISCIPLINA } from '../data/ciencias'

const CIENCIAS = new Set(['fisica', 'quimica', 'biologia', 'geologia'])

const cache = {}
function temario(lang) {
  if (!cache[lang]) cache[lang] = construirTemario(lang)
  return cache[lang]
}
const tx = (o, lang) => (o && (o[lang] ?? o.es)) || ''

// La página de estudio del tema (resumen y puntos clave), si la tiene.
export function paginaDelTema(materia, tema) {
  if (materia === 'historia') return `/estudiar/historia/${tema}`
  if (CIENCIAS.has(materia) && TEMA_DISCIPLINA[tema] === materia) return `/estudiar/${materia}/${tema}`
  return null
}

// El hub de cada materia (lengua e inglés cuelgan de /estudiar/idiomas).
const HUB = { lengua: '/estudiar/idiomas/espanol', ingles: '/estudiar/idiomas/ingles' }
export const hubDeMateria = materia => HUB[materia] || `/estudiar/${materia}`

// A dónde lleva de verdad un formato: al examen o al juego directamente, y
// si no, al puente /examen/<materia>/<tema>/<formato>.
function rutaDirecta(f) {
  if (f.game && EXAMS[f.game]) return examRoute(f.game) || f.ruta
  if (f.game && GAMES[f.game]?.route) return GAMES[f.game].route
  return f.ruta
}

export function relacionados(id, lang = 'es') {
  if (!id) return null
  const base = id.replace(/-test$/, '')
  const candidatos = new Set([id, `${id}-test`, base])
  let hallado = null
  for (const m of temario(lang)) {
    for (const t of m.temas) {
      if (t.formatos.some(f => f.game === id)) { hallado = { m, t }; break }
      if (!hallado && t.formatos.some(f => candidatos.has(f.game))) hallado = { m, t }
    }
    if (hallado && hallado.t.formatos.some(f => f.game === id)) break
  }
  if (!hallado) return null
  const { m, t } = hallado
  const items = []
  const pagina = paginaDelTema(m.id, t.id)
  if (pagina) items.push({ emoji: '📖', label: tx({ es: 'Resumen del tema', en: 'Topic summary', ca: 'Resum del tema' }, lang), ruta: pagina })
  // Desde un examen «con el juego», el juego mismo.
  if (id !== base && GAMES[base]?.route) {
    items.push({ emoji: GAMES[base].emoji, label: tx(GAMES[base].label, lang), ruta: GAMES[base].route })
  }
  for (const f of t.formatos) {
    if (f.game === id) continue
    // Desde el juego, su propio examen se presenta como tal, no con el nombre del juego otra vez.
    const label = f.game === `${id}-test` ? tx({ es: 'Examen de este juego (sin reloj)', en: 'This game as a quiz (no timer)', ca: 'Examen d’aquest joc (sense rellotge)' }, lang) : f.label
    items.push({ emoji: f.emoji, label, ruta: rutaDirecta(f) })
  }
  // Y siempre, la materia entera.
  items.push({ emoji: m.emoji, label: tx({ es: `Todo ${m.label}`, en: `All of ${m.label}`, ca: `Tot ${m.label}` }, lang), ruta: hubDeMateria(m.id) })
  const vistos = new Set()
  const unicos = items.filter(i => i.ruta && !vistos.has(i.ruta) && vistos.add(i.ruta))
  return { tema: t.label, materia: m.label, items: unicos.slice(0, 7) }
}

// El id de la página a partir de la URL: /juegos/<slug> o /examen/<id>.
export function idDeRuta(pathname) {
  const p = pathname.replace(/^\/(en|ca)(?=\/|$)/, '')
  const m = p.match(/^\/(?:juegos|examen|info\/juegos)\/([^/?#]+)$/)
  return m ? m[1] : null
}

export function cifrasTuthor() {
  return {
    juegos: Object.keys(GAMES).length,
    examenes: Object.values(EXAMS).filter(e => !e.retired).length,
    materias: temario('es').length,
  }
}

// ── Buscador ────────────────────────────────────────────────────────────────
const normaliza = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

function indice(lang) {
  const key = `idx-${lang}`
  if (cache[key]) return cache[key]
  const out = []
  for (const m of temario(lang)) {
    out.push({ tipo: 'materia', label: m.label, sub: tx({ es: 'Materia', en: 'Subject', ca: 'Matèria' }, lang), emoji: m.emoji, ruta: hubDeMateria(m.id) })
    for (const t of m.temas) {
      const ruta = paginaDelTema(m.id, t.id) || (t.formatos[0] && rutaDirecta(t.formatos[0]))
      if (ruta) out.push({ tipo: 'tema', label: t.label, sub: m.label, emoji: m.emoji, ruta })
    }
  }
  for (const g of Object.values(GAMES)) {
    if (!g.route) continue
    out.push({ tipo: 'juego', label: tx(g.label, lang), sub: tx({ es: 'Juego', en: 'Game', ca: 'Joc' }, lang), emoji: g.emoji, ruta: g.route })
  }
  for (const e of out) e.clave = normaliza(`${e.label} ${e.sub}`)
  cache[key] = out
  return out
}

export function buscarEnTuthor(q, lang = 'es', max = 8) {
  const palabras = normaliza(q).split(/\s+/).filter(w => w.length > 1)
  if (!palabras.length) return []
  const vistos = new Set()
  return indice(lang)
    .filter(e => palabras.every(w => e.clave.includes(w)))
    .map(e => ({ e, peso: normaliza(e.label).startsWith(palabras[0]) ? 0 : 1 }))
    .sort((a, b) => a.peso - b.peso || a.e.label.length - b.e.label.length)
    .map(x => x.e)
    .filter(e => !vistos.has(e.ruta) && vistos.add(e.ruta))
    .slice(0, max)
}
