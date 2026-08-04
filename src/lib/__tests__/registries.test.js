// Tests de invariantes de los registros centrales y su sincronía con el
// sitemap. No prueban UI: cazan la clase de bug que el build no detecta
// (juego sin fórmula, examen sin loader, URL del sitemap sin meta).
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { GAMES, computeCoins } from '../games.js'
import { EXAMS, routableExams, examRoute } from '../exams.js'
import { SUBJECT_DEFS, SUBJECTS } from '../statsAggregation.js'
import { EXAM_TOPICS, EXAM_FORMATS } from '../examTopics.js'
import { resolveMeta } from '../../../scripts/seoMeta.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const LANGS = ['es', 'en', 'ca']

const sitemap = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8')
const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)
const neutralPaths = new Set(
  sitemapPaths.map(p => p.replace(/^\/(en|ca)(?=\/|$)/, '').replace(/\/$/, '') || '/')
)

describe('registro de juegos (games.js)', () => {
  it.each(Object.entries(GAMES))('%s tiene label/emoji/subject/route/coins válidos', (id, game) => {
    for (const l of LANGS) {
      expect(game.label[l], `${id}: falta label.${l}`).toBeTypeOf('string')
      expect(game.label[l].length).toBeGreaterThan(0)
    }
    expect(game.emoji).toBeTypeOf('string')
    expect(game.subject).toBeTypeOf('string')
    expect(game.route, `${id}: route debe empezar por /`).toMatch(/^\//)
    expect(game.coins, `${id}: falta la fórmula coins`).toBeTypeOf('function')
  })

  it('computeCoins acota entre 0 y 500 con cualquier resultado', () => {
    for (const id of Object.keys(GAMES)) {
      for (const result of [{}, { score: 0 }, { score: 1e9 }, { score: -50 }, { diff: 0 }, { correct: 10, total: 10 }]) {
        const coins = computeCoins(id, result)
        expect(coins, `${id} con ${JSON.stringify(result)}`).toBeGreaterThanOrEqual(0)
        expect(coins, `${id} con ${JSON.stringify(result)}`).toBeLessThanOrEqual(500)
        expect(Number.isInteger(coins), `${id}: monedas enteras`).toBe(true)
      }
    }
  })

  it('las rutas de los juegos están en el sitemap', () => {
    const routes = new Set(Object.values(GAMES).map(g => g.route))
    for (const route of routes) {
      expect(neutralPaths.has(route), `falta ${route} en public/sitemap.xml`).toBe(true)
    }
  })
})

describe('registro de exámenes (exams.js)', () => {
  it.each(Object.entries(EXAMS))('%s tiene label/emoji/subject válidos', (id, exam) => {
    for (const l of LANGS) {
      expect(exam.label[l], `${id}: falta label.${l}`).toBeTypeOf('string')
    }
    expect(exam.emoji).toBeTypeOf('string')
    expect(exam.subject).toBeTypeOf('string')
  })

  it('los exámenes con ruta tienen loader y path relativo (App.jsx los monta bajo /)', () => {
    for (const { id, path, page } of routableExams()) {
      expect(page, `${id}: falta el loader page`).toBeTypeOf('function')
      expect(path, `${id}: path sin / inicial`).not.toMatch(/^\//)
    }
  })

  it('no hay paths duplicados entre exámenes', () => {
    const paths = routableExams().map(e => e.path)
    expect(new Set(paths).size).toBe(paths.length)
  })

  it('las rutas de los exámenes están en el sitemap', () => {
    for (const { path } of routableExams()) {
      expect(neutralPaths.has(`/${path}`), `falta /${path} en public/sitemap.xml`).toBe(true)
    }
  })
})

describe('materias (statsAggregation.js) ↔ registros', () => {
  const subjectIds = new Set(SUBJECT_DEFS.map(s => s.id))

  it('todo juego pertenece a una materia existente (si no, desaparece del perfil y del panel de profesor)', () => {
    for (const [id, g] of Object.entries(GAMES)) {
      expect(subjectIds.has(g.subject), `${id}: subject "${g.subject}" no está en SUBJECT_DEFS`).toBe(true)
    }
  })

  it('SUBJECTS incluye todos los juegos del registro en su materia', () => {
    for (const [id, g] of Object.entries(GAMES)) {
      const subj = SUBJECTS.find(s => s.id === g.subject)
      expect(subj.gameIds, `${id}: falta en gameIds de ${g.subject}`).toContain(id)
    }
  })

  it('todo examen no retirado es jugable: tiene path (registro) o route (hardcoded en App.jsx)', () => {
    for (const [id, e] of Object.entries(EXAMS)) {
      if (e.retired) continue
      expect(examRoute(id), `${id}: sin ruta jugable — o se le añade route/path o se marca retired`).toMatch(/^\//)
    }
  })

  it('los exámenes de materias reales pertenecen a una materia existente', () => {
    // 'ciencias' (diagnostico) queda fuera de SUBJECT_DEFS a propósito
    const allowlist = new Set(['ciencias'])
    for (const [id, e] of Object.entries(EXAMS)) {
      if (allowlist.has(e.subject)) continue
      expect(subjectIds.has(e.subject), `${id}: subject "${e.subject}" no está en SUBJECT_DEFS`).toBe(true)
    }
  })

  it('EXAM_TOPICS solo referencia formatos con etiqueta y temas con catLabel', () => {
    for (const [subjectId, temas] of Object.entries(EXAM_TOPICS)) {
      const subj = SUBJECT_DEFS.find(s => s.id === subjectId)
      expect(subj, `EXAM_TOPICS.${subjectId}: materia inexistente`).toBeTruthy()
      for (const [temaId, formatos] of Object.entries(temas)) {
        expect(subj.catLabels[temaId], `${subjectId}.${temaId}: sin etiqueta en catLabels`).toBeTruthy()
        for (const f of formatos) {
          expect(EXAM_FORMATS[f], `${subjectId}.${temaId}: formato "${f}" sin entrada en EXAM_FORMATS`).toBeTruthy()
        }
      }
    }
  })
})

describe('sitemap ↔ meta SEO (prerender)', () => {
  it('toda URL del sitemap resuelve meta específica', () => {
    const generic = []
    for (const urlPath of sitemapPaths) {
      const lang = urlPath.startsWith('/ca') ? 'ca' : urlPath.startsWith('/en') ? 'en' : 'es'
      const neutral = urlPath.replace(/^\/(en|ca)(?=\/|$)/, '').replace(/\/$/, '') || '/'
      if (!resolveMeta(neutral, lang)) generic.push(urlPath)
    }
    expect(generic, `URLs sin meta (añadir a STATIC_META o a su fuente): ${generic.join(', ')}`).toEqual([])
  })

  it('title y description no superan los límites razonables de las SERP', () => {
    for (const neutral of neutralPaths) {
      for (const lang of ['es', 'en']) {
        const meta = resolveMeta(neutral, lang)
        if (!meta) continue
        if (meta.title) expect(meta.title.length, `${neutral} (${lang}): title largo`).toBeLessThanOrEqual(120)
        expect(meta.desc.length, `${neutral} (${lang}): description larga`).toBeLessThanOrEqual(180)
      }
    }
  })
})
