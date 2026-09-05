import { EVENTOS_HISTORIA } from '../data/historiaEvents'
import { PAISES } from '../data/paises'
import { ELEMENTOS, TIPOS } from '../data/tablaperiodica'
import { PORTADAS } from '../data/portadas'
import { ORGANISMOS, ROLES } from '../data/cadenaTrofica'
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

  'historia-portadas': {
    emoji: '📰',
    // Único que lo necesita: los datos vienen agrupados por veracidad y el
    // juego entero está en no saber si el titular es cierto (ver
    // intercalarPorDorso más abajo).
    intercalar: true,
    asignatura: { es: 'Historia', en: 'History', ca: 'Història' },
    titulo: { es: 'Titulares: ¿verdad o bulo?', en: 'Headlines: true or fake?', ca: 'Titulars: veritat o bulo?' },
    desc: {
      es: 'Titulares de periódico reales y falsos, con la respuesta detrás.',
      en: 'Real and fake newspaper headlines, with the answer on the back.',
      ca: 'Titulars de diari reals i falsos, amb la resposta al darrere.',
    },
    comoUsarlo: {
      es: 'Reparte una tarjeta por grupo: leen el titular y deciden si pasó de verdad antes de girarla. Es la mejor entrada a por qué hay que contrastar una fuente.',
      en: 'Hand out one card per group: they read the headline and decide whether it really happened before flipping it. The best way into why sources need checking.',
      ca: 'Reparteix una targeta per grup: llegeixen el titular i decideixen si va passar de debò abans de girar-la. La millor entrada a per què cal contrastar una font.',
    },
    variantes(lang) {
      const cuenta = {}
      for (const p of PORTADAS) for (const t of p.temas ?? []) cuenta[t] = (cuenta[t] ?? 0) + 1
      return Object.entries(cuenta)
        .filter(([id]) => CAT_LABELS_HISTORIA[id])
        .map(([id, n]) => ({ id, label: tr3(CAT_LABELS_HISTORIA[id], lang), n }))
        .sort((a, b) => a.label.localeCompare(b.label))
    },
    tarjetas(varianteId, lang) {
      const VERDAD = { es: 'VERDAD', en: 'TRUE', ca: 'VERITAT' }
      const BULO = { es: 'BULO', en: 'FAKE', ca: 'BULO' }
      return PORTADAS
        .filter(p => (p.temas ?? []).includes(varianteId))
        .map(p => ({
          frente: enIdioma(p, 'titular', lang),
          pista: `${p.periodico} · ${p.año}`,
          dorso: tr3(p.veracidad ? VERDAD : BULO, lang),
        }))
    },
  },

  'biologia-cadena': {
    emoji: '🌿',
    asignatura: { es: 'Biología', en: 'Biology', ca: 'Biologia' },
    titulo: { es: 'Tarjetas de la cadena alimentaria', en: 'Food chain cards', ca: 'Targetes de la cadena alimentària' },
    desc: {
      es: 'Un ser vivo por delante y su papel en la cadena por detrás.',
      en: 'A living thing on the front and its role in the chain on the back.',
      ca: 'Un ésser viu al davant i el seu paper a la cadena al darrere.',
    },
    comoUsarlo: {
      es: 'Recorta y reparte: por grupos, tienen que ordenar sus tarjetas en una cadena que se sostenga, del productor al último consumidor.',
      en: 'Cut them out and hand them round: in groups, they arrange their cards into a chain that holds up, from producer to top consumer.',
      ca: 'Retalla i reparteix: per grups, han d\'ordenar les seves targetes en una cadena que se sostingui, del productor a l\'últim consumidor.',
    },
    variantes(lang) {
      const cuenta = {}
      for (const o of ORGANISMOS) cuenta[o.rol] = (cuenta[o.rol] ?? 0) + 1
      return Object.entries(cuenta)
        .filter(([id]) => ROLES[id])
        .map(([id, n]) => ({ id, label: tr3(ROLES[id].label, lang), n }))
        .sort((a, b) => a.label.localeCompare(b.label))
    },
    tarjetas(varianteId, lang) {
      return ORGANISMOS
        .filter(o => o.rol === varianteId)
        .map(o => ({
          frente: `${o.emoji} ${enIdioma(o, 'nombre', lang)}`,
          pista: null,
          dorso: `${ROLES[o.rol].emoji} ${tr3(ROLES[o.rol].label, lang)}`,
        }))
    },
  },
}

export const IMPRIMIBLE_IDS = Object.keys(IMPRIMIBLES)

// ── Qué imprimible encaja con cada página de teoría ──────────────────────────
// Las páginas de /estudiar/<materia>/<tema> explican el tema y desde ahí se
// mandan los ejercicios: es donde un profesor ya está preparando esa clase,
// así que es donde el material en papel de ESE tema tiene más sentido — mucho
// más que un enlace genérico a /recursos.
//
// En historia no hace falta traducir nada: la `categoria` de la página
// (edad-media, gce, wwii…) es literalmente el id de variante de los dos
// imprimibles de historia. En el resto la relación es explícita porque las
// variantes agrupan por otra cosa (tipo de elemento, rol trófico), así que se
// ofrece el imprimible entero y el profesor elige el grupo.
const IMPRIMIBLES_POR_TEMA = {
  'quimica/tabla-periodica': ['quimica-elementos'],
  'biologia/ecosistemas': ['biologia-cadena'],
}

// Devuelve [{ id, varianteId }] para una página de teoría. varianteId null =
// "este imprimible va con el tema, pero el grupo lo elige el profesor".
// Lista vacía si ese tema no tiene material: la página no pinta la sección.
export function imprimiblesDeTema(materia, tema) {
  if (!materia || !tema) return []

  if (materia === 'historia') {
    return ['historia-eventos', 'historia-portadas']
      .filter(id => IMPRIMIBLES[id].variantes('es').some(v => v.id === tema))
      .map(id => ({ id, varianteId: tema }))
  }

  return (IMPRIMIBLES_POR_TEMA[`${materia}/${tema}`] ?? [])
    .filter(id => IMPRIMIBLES[id])
    .map(id => ({ id, varianteId: null }))
}

// Reparte las tarjetas alternando la respuesta del dorso en vez de dejarlas
// en el orden del dato. Importa de verdad en los titulares: PORTADAS trae
// primero los verdaderos y luego los falsos, así que recortar la hoja y
// repartir por bloques le daba a un grupo entero solo VERDAD y a otro solo
// BULO — y ahí ya no hay nada que decidir.
//
// Determinista a propósito (nada de Math.random): la misma hoja impresa dos
// veces tiene que salir igual, o el profesor que reimprime se encuentra otro
// reparto y las fotocopias ya hechas dejan de encajar.
export function intercalarPorDorso(tarjetas) {
  const grupos = new Map()
  for (const t of tarjetas) {
    if (!grupos.has(t.dorso)) grupos.set(t.dorso, [])
    grupos.get(t.dorso).push(t)
  }

  // Reparto PROPORCIONAL, no por turnos: alternar uno de cada grupo agota
  // antes el grupo pequeño y deja toda la cola del grande al final (con 10
  // verdades y 3 bulos quedaban 7 verdades seguidas al cierre de la hoja).
  // A cada tarjeta se le da su posición ideal dentro de su propio grupo
  // —(i + ½) / tamaño— y se ordena por ella, así cada grupo queda estirado a
  // lo largo de toda la hoja en la proporción que le toca.
  const conPosicion = []
  for (const lista of grupos.values()) {
    lista.forEach((t, i) => conPosicion.push({ t, pos: (i + 0.5) / lista.length }))
  }
  return conPosicion.sort((a, b) => a.pos - b.pos).map(x => x.t)
}

// Las tarjetas de una variante, ya acotadas a lo que cabe en una tanda
// razonable de recorte. Devuelve [] para un id o una variante que no existan,
// nunca revienta: la hoja se queda vacía en vez de tumbar el panel.
export function tarjetasDe(imprimibleId, varianteId, lang = 'es') {
  const def = IMPRIMIBLES[imprimibleId]
  if (!def || !varianteId) return []
  const todas = def.tarjetas(varianteId, lang)
  // El intercalado va ANTES del recorte: si no, quedarse con las 40 primeras
  // de una lista ordenada por respuesta dejaría fuera casi todos los bulos.
  const ordenadas = def.intercalar ? intercalarPorDorso(todas) : todas
  return ordenadas.slice(0, MAX_TARJETAS)
}
