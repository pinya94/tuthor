// ── Resolución de meta SEO por URL ───────────────────────────────────────────
// Módulo puro (sin I/O): dado un path neutro y un idioma devuelve
// { title, desc }. Lo usan scripts/prerender.mjs (build) y los tests de
// invariantes (src/lib/__tests__), que comprueban que toda URL del sitemap
// resuelve meta específica.
//
// Fuentes (las mismas que usan las páginas):
//   - src/lib/exams.js      → /examen/*
//   - src/lib/games.js      → /juegos/*
//   - src/data/fichasEstudiarIndex.js → /info/estudiar/* (una ficha por fichero)
//   - src/data/infoJuegosFichas.js   → /info/juegos/*
//   - STATIC_META (abajo)   → portadas de sección y páginas sueltas

import { EXAMS } from '../src/lib/exams.js'
import { GAMES } from '../src/lib/games.js'
import { CICLOS } from '../src/data/ciclosCientificos.js'
import { TEMAS_DIAGNOSTICO } from '../src/data/diagnostico.js'
import { FICHAS as FICHAS_ESTUDIAR } from '../src/data/fichasEstudiarIndex.js'
import {
  FICHAS_ES as JUEGOS_FICHAS_ES,
  FICHAS_EN as JUEGOS_FICHAS_EN,
} from '../src/data/infoJuegosFichas.js'

// STATIC_META vive en src/ para que también la usen las páginas (ver
// src/components/SEOEstatico.jsx). Se reexporta porque el prerender y los
// tests de invariantes la importan desde aquí desde siempre.
export { STATIC_META } from '../src/lib/staticMeta.js'
import { STATIC_META } from '../src/lib/staticMeta.js'

export const BASE_URL = 'https://www.tuthor.es'
// Idiomas publicados en hreflang — mantener en sintonía con SEOHead.jsx
export const HREFLANG_LANGS = ['es', 'en']


// Temas de matemáticas con página propia (/estudiar/matematicas/:tema)
const MATH_TEMAS = ['algebra', 'enteros-racionales', 'estadistica', 'fracciones', 'funciones', 'geometria']

// /examen/<sufijo> cuya entrada en EXAMS usa otro id
const EXAM_PATH_ALIASES = {
  'portadas': 'portadas-examen',
  'geografia': 'geografia-examen',
  'geomapa': 'geomapa-examen',
  'geomapa-espana': 'geomapa-espana-examen',
  'geomapa-eeuu': 'geomapa-eeuu-examen',
  'portero': 'portero-examen',
  'trayectoria': 'trayectoria-examen',
}

const label = (entry, lang) => entry.label[lang] ?? entry.label.es

// Devuelve { title, desc } para un path neutro, o null si no hay meta específica.
export function resolveMeta(path, lang) {
  const l = lang === 'en' ? 'en' : 'es' // ca cae a es mientras no esté traducido

  const stat = STATIC_META[path]
  if (stat) return stat[l]

  let m = path.match(/^\/info\/estudiar\/([\w-]+)$/)
  if (m) {
    const entry = FICHAS_ESTUDIAR[m[1]]
    const ficha = entry && (entry[l] ?? entry.es)
    if (ficha) return { title: `${ficha.titulo} — ${ficha.subtitulo}`, desc: `${ficha.intro.slice(0, 155)}…` }
  }

  m = path.match(/^\/info\/juegos\/([\w-]+)$/)
  if (m) {
    const ficha = (l === 'en' ? JUEGOS_FICHAS_EN : JUEGOS_FICHAS_ES)[m[1]]
    if (ficha) return { title: `${ficha.titulo} — ${ficha.subtitulo}`, desc: `${ficha.intro.slice(0, 155)}…` }
  }

  m = path.match(/^\/examen\/([\w-]+)$/)
  if (m) {
    const exam = EXAMS[EXAM_PATH_ALIASES[m[1]] ?? m[1]]
    if (exam) {
      const name = label(exam, l)
      // Sin "gratis": los exámenes van con la suscripción desde el muro de
      // pago. Anunciar como gratuito lo que se cobra genera devoluciones y
      // reseñas malas, y sale en el título de ~88 páginas.
      return l === 'en'
        ? { title: `${name} — multiple-choice exam`, desc: `Interactive ${name} exam with instant feedback, explained answers and a final grade. For primary and secondary school students.` }
        : { title: `Examen de ${name} tipo test`, desc: `Examen interactivo de ${name}, con corrección al instante, explicación en cada respuesta y nota final. Para Primaria, ESO y Bachillerato.` }
    }
  }

  m = path.match(/^\/examen\/ciclo\/([\w-]+)$/)
  if (m) {
    const ciclo = CICLOS[m[1]]
    if (ciclo) {
      const name = label(ciclo, l)
      const desc = ciclo.descripcion[l] ?? ciclo.descripcion.es
      return l === 'en'
        ? { title: `${name} — order the steps`, desc: `${desc} Interactive exam: place each step before or after the others in the right order.` }
        : { title: `Examen de ${name} — ordena los pasos`, desc: `${desc} Examen interactivo: coloca cada paso antes o después en el orden correcto.` }
    }
  }

  m = path.match(/^\/examen\/diagnostico\/([\w-]+)$/)
  if (m) {
    const diag = TEMAS_DIAGNOSTICO.find(t => t.id === m[1])
    if (diag) {
      const name = diag.titulo[l] ?? diag.titulo.es
      return l === 'en'
        ? { title: `${name} Diagnosis — revise by elimination`, desc: `Revise ${name} by ruling out candidates with progressive science clues until you find the right one. Free interactive practice.` }
        : { title: `Diagnóstico de ${name} — repasa por descarte`, desc: `Repasa ${name} descartando candidatos con pistas científicas progresivas hasta dar con el correcto. Práctica interactiva gratis.` }
    }
  }

  m = path.match(/^\/juegos\/([\w-]+)$/)
  if (m) {
    const game = Object.values(GAMES).find(g => g.route === path)
    if (game) {
      const name = label(game, l)
      // Sin "gratis" — igual que en /examen/* más abajo: jugar va con la
      // suscripción desde el muro de pago, y anunciar como gratuito lo que
      // se cobra sale en el título de ~22 páginas y genera reseñas malas.
      return l === 'en'
        ? { title: `${name} — educational game`, desc: `Play ${name}: quick 5-minute rounds, coins, rankings and real learning. For primary and secondary school students.` }
        : { title: `${name} — juego educativo`, desc: `Juega a ${name}: partidas rápidas de 5 minutos, monedas, ranking y aprendizaje real. Para Primaria, ESO y Bachillerato.` }
    }
  }

  m = path.match(/^\/estudiar\/matematicas\/([\w-]+)$/)
  if (m && MATH_TEMAS.includes(m[1])) {
    const exam = EXAMS[m[1]]
    if (exam) {
      const name = label(exam, l)
      return l === 'en'
        ? { title: `${name} — theory, examples and exam`, desc: `Learn ${name} with short theory, worked examples and an interactive exam with explained answers. Free for primary and secondary school.` }
        : { title: `${name} — teoría, ejemplos y examen`, desc: `Aprende ${name} con teoría breve, ejemplos resueltos y un examen interactivo con explicaciones. Gratis, para Primaria, ESO y Bachillerato.` }
    }
  }

  return null
}
