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
import {
  TOPIC_CATALOG, TOPIC_SUBJECT_IDS, topicIds, topicFormats,
  topicTask, findTopic, taskMatchesPlay, examsCoveredByTopics,
} from '../topicCatalog.js'
import { GAMES as CATALOG_GAMES } from '../../data/constants.js'
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

  it('todo juego /juegos/* del registro tiene tarjeta en el catálogo (constants.js GAMES)', () => {
    // El catálogo visual de /juegos es la única lista manual que queda:
    // sin tarjeta, el juego existe pero nadie lo encuentra.
    const catalogPaths = new Set(CATALOG_GAMES.filter(g => g.ready && g.path).map(g => g.path))
    for (const [id, g] of Object.entries(GAMES)) {
      if (!g.route.startsWith('/juegos/')) continue
      expect(catalogPaths.has(g.route), `${id}: falta tarjeta con path ${g.route} en src/data/constants.js`).toBe(true)
    }
  })

  it('toda tarjeta ready del catálogo corresponde a un juego registrado (guarda stats)', () => {
    const registryRoutes = new Set(Object.values(GAMES).map(g => g.route))
    for (const c of CATALOG_GAMES) {
      if (!c.ready || !c.path || !c.path.startsWith('/juegos/')) continue
      expect(registryRoutes.has(c.path), `catálogo "${c.title}": path ${c.path} sin entrada en src/lib/games.js`).toBe(true)
    }
  })

})

// Recorre todas las combinaciones jugables del catálogo por tema.
function everyCombo(fn) {
  for (const materia of TOPIC_SUBJECT_IDS) {
    for (const tema of topicIds(materia)) {
      for (const f of topicFormats(materia, tema)) {
        const niveles = f.niveles.length > 0 ? f.niveles : [null]
        for (const nivel of niveles) fn({ materia, tema, formato: f.id, nivel, fmt: f })
      }
    }
  }
}

describe('catálogo por tema (topicCatalog.js): materia → tema → formato → nivel', () => {
  it('todo tema tiene etiqueta (catLabels propia o la del examen homónimo)', () => {
    for (const materia of TOPIC_SUBJECT_IDS) {
      const subj = SUBJECTS.find(s => s.id === materia)
      expect(subj, `${materia}: materia inexistente en SUBJECT_DEFS`).toBeTruthy()
      for (const tema of topicIds(materia)) {
        // examLabels ya mezcla las etiquetas de exámenes y las de catLabels
        expect(subj.examLabels[tema], `${materia}.${tema}: sin etiqueta`).toBeTruthy()
      }
    }
  })

  it('todo tema tiene al menos un formato jugable', () => {
    for (const materia of TOPIC_SUBJECT_IDS) {
      for (const tema of topicIds(materia)) {
        expect(topicFormats(materia, tema).length, `${materia}.${tema}: sin formatos jugables`).toBeGreaterThan(0)
      }
    }
  })

  it('el juego/examen de cada combinación está registrado y es jugable', () => {
    everyCombo(({ materia, tema, formato, nivel }) => {
      const { gameId } = topicTask(materia, tema, formato, nivel)
      const known = GAMES[gameId] || EXAMS[gameId] ||
        // ids de stats sin juego propio, declarados en SUBJECT_DEFS.gameIds
        SUBJECT_DEFS.some(s => s.gameIds.includes(gameId))
      expect(known, `${materia}/${tema}/${formato}: "${gameId}" no está en ningún registro`).toBeTruthy()
      // Si es un examen del registro, debe tener ruta (no estar retirado)
      if (EXAMS[gameId]) {
        expect(examRoute(gameId), `${materia}/${tema}/${formato}: examen "${gameId}" sin ruta jugable`).toMatch(/^\//)
      }
    })
  })

  it('cada examen se ofrece por una sola vía: o por tema, o en la lista plana', () => {
    for (const materia of TOPIC_SUBJECT_IDS) {
      const cubiertos = examsCoveredByTopics(materia)
      for (const id of cubiertos) {
        expect(EXAMS[id], `${materia}: el tema referencia "${id}", que no existe en exams.js`).toBeTruthy()
        expect(EXAMS[id].retired, `${materia}: el tema referencia "${id}", que está retirado`).toBeFalsy()
      }
    }
  })

  it('topicTask ↔ findTopic hacen ida y vuelta, sin colisiones', () => {
    // Garantiza que toda tarea creada por el profesor se puede etiquetar y
    // enrutar después (Clase.jsx), y que no hay dos combinaciones distintas
    // que produzcan la misma tarea {gameId, category}.
    const seen = new Map()
    everyCombo(({ materia, tema, formato, nivel, fmt }) => {
      const label = `${materia}/${tema}/${formato}${nivel ? `/${nivel}` : ''}`
      const task = topicTask(materia, tema, formato, nivel)
      expect(task.gameId, `${label}: sin gameId`).toBeTruthy()
      expect(task.category, `${label}: sin category`).toBeTruthy()
      expect(task.level, `${label}: level debe seguir a usesLevel`).toBe(fmt.usesLevel ? nivel : null)
      const key = `${task.gameId}|${task.category}`
      // Dos niveles del mismo formato comparten category si no la incluye:
      // solo es colisión si cambia el tema o el formato.
      const prev = seen.get(key)
      if (prev) expect(prev, `${label}: colisiona con ${prev}`).toBe(`${materia}/${tema}/${formato}`)
      seen.set(key, `${materia}/${tema}/${formato}`)
      expect(findTopic(task), `${label}: findTopic no lo recupera`)
        .toEqual({ materia, tema, formato, nivel: task.level })
    })
  })

  it('una partida del tema completa la tarea; otra del mismo juego solo si el formato no distingue temas', () => {
    everyCombo(({ materia, tema, formato, nivel, fmt }) => {
      const task = { kind: 'catalog', ...topicTask(materia, tema, formato, nivel) }
      const label = `${materia}/${tema}/${formato}`
      // Jugar ESTE tema siempre completa
      expect(taskMatchesPlay(task, { gameId: task.gameId, category: task.category }), `${label}: no se completa jugándolo`).toBe(true)
      // Jugar otra cosa con el mismo juego: solo si el formato no puede saber el tema
      expect(taskMatchesPlay(task, { gameId: task.gameId, category: '__otro__' }), `${label}: matching cruzado incorrecto`).toBe(!fmt.tracksTopic)
      // Otro juego nunca completa
      expect(taskMatchesPlay(task, { gameId: '__otro__', category: task.category }), `${label}: completa con otro juego`).toBe(false)
    })
  })

  it('las listas de disponibilidad coinciden con los datos reales', async () => {
    // El catálogo escribe estas listas a mano (para no cargar ~140 kB de datos
    // en cada bundle). Aquí se validan contra la fuente real.
    const { EVENTOS_HISTORIA } = await import('../../data/historiaEvents.js')
    const { PORTADAS } = await import('../../data/portadas.js')

    for (const tema of topicIds('historia')) {
      const declarados = TOPIC_CATALOG.historia.temas[tema].niveles
      const reales = ['primaria', 'eso', 'bachillerato'].filter(n =>
        EVENTOS_HISTORIA.some(e => e.categoria === tema && (!e.nivel || e.nivel.includes(n))))
      expect(declarados, `historia.${tema}: niveles declarados ≠ eventos reales`).toEqual(reales)

      // Portadas necesita ≥10 titulares del tema para poder examinar
      const conPortadas = PORTADAS.filter(p => p.temas?.includes(tema)).length >= 10
      const ofrecePortadas = topicFormats('historia', tema).some(f => f.id === 'portadas')
      expect(ofrecePortadas, `historia.${tema}: Portadas ofrecido=${ofrecePortadas} pero datos=${conPortadas}`).toBe(conPortadas)
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
