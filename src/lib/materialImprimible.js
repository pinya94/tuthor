import { EVENTOS_HISTORIA } from '../data/historiaEvents'
import { PAISES } from '../data/paises'
import { ELEMENTOS, TIPOS } from '../data/tablaperiodica'
import { SUBJECTS } from './statsAggregation'

// ── Imprimibles ──────────────────────────────────────────────────────────────
// Material de VERDAD para llevar a clase: tarjetas ya escritas, listas para
// recortar y repartir.
//
// La diferencia con las "actividades" (el `enPapel` de infoJuegosFichas.js) es
// justo la que faltaba: una actividad DICE "escribe 15-20 eventos históricos
// en tarjetas"; un imprimible TRAE esas tarjetas hechas. Los datos ya estaban
// en el repo desde que existen los juegos —200 eventos, 112 países, 71
// elementos—; lo único que les faltaba era forma de hoja.
//
// Todo aquí es puro: entra un id y una variante, sale una lista de tarjetas.
// Sin Firestore y sin React, así que el reparto y el recorte se pueden probar
// sin montar nada (ver materialImprimible.test.js).

// Los datos de los juegos guardan los idiomas como SUFIJO (nombreEn/nombreCa),
// no como objeto {es,en,ca}. Mismo mapa de claves que ya usa
// encuentraElemento.js, en vez de un ternario por idioma.
const SUFIJO = { es: '', en: 'En', ca: 'Ca' }
const enIdioma = (obj, campo, lang) => obj[campo + (SUFIJO[lang] ?? '')] ?? obj[campo]

const tr3 = (o, lang) => o[lang] ?? o.es

// Cuántas tarjetas caben razonablemente en una tanda: por encima de esto no
// es una hoja, son diez, y nadie recorta 200 tarjetas para una clase. Las
// épocas grandes (edad-media tiene 32 eventos) se quedan igual por debajo.
export const MAX_TARJETAS = 40

// Las etiquetas de las épocas ya viven en SUBJECTS (statsAggregation), que es
// de donde salen también en el perfil y en el panel: no se reescriben aquí
// para que no puedan divergir.
const CAT_LABELS_HISTORIA = SUBJECTS.find(s => s.id === 'historia')?.catLabels ?? {}

const CONTINENTES = {
  'Europa':      { es: 'Europa', en: 'Europe', ca: 'Europa' },
  'Asia':        { es: 'Asia', en: 'Asia', ca: 'Àsia' },
  'América':     { es: 'América', en: 'Americas', ca: 'Amèrica' },
  'África':      { es: 'África', en: 'Africa', ca: 'Àfrica' },
  'Oceanía':     { es: 'Oceanía', en: 'Oceania', ca: 'Oceania' },
  'Europa/Asia': { es: 'Europa/Asia', en: 'Europe/Asia', ca: 'Europa/Àsia' },
}

// ── Los imprimibles ──────────────────────────────────────────────────────────
// `variantes(lang)` da los grupos elegibles (época, continente, tipo…) con su
// número de tarjetas, para que el profesor sepa qué está a punto de imprimir
// antes de darle. `tarjetas(varianteId, lang)` devuelve el material.
export const IMPRIMIBLES = {
  'historia-eventos': {
    emoji: '🕰️',
    asignatura: { es: 'Historia', en: 'History', ca: 'Història' },
    titulo: { es: 'Tarjetas de eventos históricos', en: 'Historical event cards', ca: "Targetes d'esdeveniments històrics" },
    desc: {
      es: 'El evento por delante y el año por detrás, listas para recortar.',
      en: 'The event on the front and the year on the back, ready to cut out.',
      ca: "L'esdeveniment al davant i l'any al darrere, a punt per retallar.",
    },
    comoUsarlo: {
      es: 'Recorta por las líneas y dobla cada tarjeta por la mitad: delante el evento, detrás el año. Uno lee, los demás escriben su año y gana quien más se acerque.',
      en: 'Cut along the lines and fold each card in half: event on the front, year on the back. One reads it out, the rest write their guess, closest wins.',
      ca: "Retalla per les línies i doblega cada targeta per la meitat: davant l'esdeveniment, darrere l'any. Un el llegeix, la resta escriu el seu any i guanya qui més s'acosti.",
    },
    variantes(lang) {
      const cuenta = {}
      for (const e of EVENTOS_HISTORIA) cuenta[e.categoria] = (cuenta[e.categoria] ?? 0) + 1
      return Object.entries(cuenta)
        .filter(([id]) => CAT_LABELS_HISTORIA[id])
        .map(([id, n]) => ({ id, label: tr3(CAT_LABELS_HISTORIA[id], lang), n }))
        .sort((a, b) => a.label.localeCompare(b.label))
    },
    tarjetas(varianteId, lang) {
      return EVENTOS_HISTORIA
        .filter(e => e.categoria === varianteId)
        .map(e => ({
          frente: enIdioma(e, 'nombre', lang),
          pista: enIdioma(e, 'descripcion', lang),
          dorso: String(e.año),
        }))
    },
  },

  'geografia-capitales': {
    emoji: '🌍',
    asignatura: { es: 'Geografía', en: 'Geography', ca: 'Geografia' },
    titulo: { es: 'Tarjetas de países y capitales', en: 'Country and capital cards', ca: 'Targetes de països i capitals' },
    desc: {
      es: 'El país por delante y su capital por detrás, con la bandera.',
      en: 'The country on the front and its capital on the back, with the flag.',
      ca: 'El país al davant i la seva capital al darrere, amb la bandera.',
    },
    comoUsarlo: {
      es: 'Recorta y reparte. Sirven para preguntarse por parejas, para un trivial rápido o para ordenarlas por continente sobre la mesa.',
      en: 'Cut them out and hand them round. Good for pair quizzing, a quick trivia round, or sorting them by continent on the table.',
      ca: 'Retalla i reparteix. Serveixen per preguntar-se per parelles, per a un trivial ràpid o per ordenar-les per continent sobre la taula.',
    },
    variantes(lang) {
      const cuenta = {}
      for (const p of PAISES) cuenta[p.continente] = (cuenta[p.continente] ?? 0) + 1
      return Object.entries(cuenta)
        .filter(([id]) => CONTINENTES[id])
        .map(([id, n]) => ({ id, label: tr3(CONTINENTES[id], lang), n }))
        .sort((a, b) => a.label.localeCompare(b.label))
    },
    tarjetas(varianteId, lang) {
      return PAISES
        .filter(p => p.continente === varianteId)
        .map(p => ({
          frente: `${p.bandera} ${enIdioma(p, 'nombre', lang)}`,
          pista: null,
          dorso: p.capital,
        }))
    },
  },

  'quimica-elementos': {
    emoji: '⚗️',
    asignatura: { es: 'Química', en: 'Chemistry', ca: 'Química' },
    titulo: { es: 'Tarjetas de elementos químicos', en: 'Chemical element cards', ca: 'Targetes d\'elements químics' },
    desc: {
      es: 'El símbolo por delante y el nombre y el número atómico por detrás.',
      en: 'The symbol on the front, name and atomic number on the back.',
      ca: 'El símbol al davant i el nom i el número atòmic al darrere.',
    },
    comoUsarlo: {
      es: 'Recorta y usa el símbolo como pregunta: qué elemento es y qué número atómico tiene. También sirven para montar la tabla periódica sobre la mesa.',
      en: 'Cut them out and use the symbol as the question: which element is it and what is its atomic number. They also work for laying out the periodic table on a table.',
      ca: "Retalla i fes servir el símbol com a pregunta: quin element és i quin número atòmic té. També serveixen per muntar la taula periòdica sobre la taula.",
    },
    variantes(lang) {
      const cuenta = {}
      for (const e of ELEMENTOS) cuenta[e.tipo] = (cuenta[e.tipo] ?? 0) + 1
      return Object.entries(cuenta)
        .filter(([id]) => TIPOS[id])
        .map(([id, n]) => ({ id, label: enIdioma(TIPOS[id], 'label', lang), n }))
        .sort((a, b) => a.label.localeCompare(b.label))
    },
    tarjetas(varianteId, lang) {
      return ELEMENTOS
        .filter(e => e.tipo === varianteId)
        .map(e => ({
          frente: e.symbol,
          pista: null,
          dorso: `${enIdioma(e, 'nombre', lang)} · Z=${e.z}`,
        }))
    },
  },
}

export const IMPRIMIBLE_IDS = Object.keys(IMPRIMIBLES)

// Las tarjetas de una variante, ya acotadas a lo que cabe en una tanda
// razonable de recorte. Devuelve [] para un id o una variante que no existan,
// nunca revienta: la hoja se queda vacía en vez de tumbar el panel.
export function tarjetasDe(imprimibleId, varianteId, lang = 'es') {
  const def = IMPRIMIBLES[imprimibleId]
  if (!def || !varianteId) return []
  return def.tarjetas(varianteId, lang).slice(0, MAX_TARJETAS)
}
