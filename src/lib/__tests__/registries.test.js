// Tests de invariantes de los registros centrales y su sincronía con el
// sitemap. No prueban UI: cazan la clase de bug que el build no detecta
// (juego sin fórmula, examen sin loader, URL del sitemap sin meta).
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { GAMES, computeCoins } from '../games.js'
import { EXAMS, routableExams } from '../exams.js'
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
