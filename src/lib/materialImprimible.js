import { EVENTOS_HISTORIA } from '../data/historiaEvents'
import { PAISES } from '../data/paises'
import { ELEMENTOS } from '../data/tablaperiodica'
import { PORTADAS } from '../data/portadas'
import { ORGANISMOS, ROLES } from '../data/cadenaTrofica'
import { ORGANULOS, CELULAS } from '../data/organulos'
import { ORGANOS, SISTEMAS } from '../data/organos'
import { PLANETAS } from '../data/planetas'
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

// Por debajo de esto un grupo no es una BARAJA: son unos recortes sueltos.
// Cinco halógenos, tres órganos del aparato respiratorio o cuatro planetas
// rocosos no son una actividad — no se puede jugar, ni clasificar, ni montar
// nada con ellos. Y ofrecerlos tenía un coste doble: llenaban el panel de
// botones inútiles y escondían entre ellos el único reparto con el que sí se
// podía hacer algo. Esas tarjetas no se pierden: siguen saliendo en el
// reparto completo, que es donde sirven.
//
// Lo exporta para tarjetasExamen, que reparte por nivel y tenía su propio
// mínimo: un solo número o "8 tarjetas" pasa a significar dos cosas distintas
// según de qué hoja se hable.
export const MIN_TARJETAS_GRUPO = 8

// Las etiquetas de las épocas ya viven en SUBJECTS (statsAggregation), que es
// de donde salen también en el perfil y en el panel: no se reescriben aquí
// para que no puedan divergir.
const CAT_LABELS_HISTORIA = SUBJECTS.find(s => s.id === 'historia')?.catLabels ?? {}

// Los orgánulos que solo salen en una de las dos células. Va como pista en la
// tarjeta porque es la única forma de que el alumno pueda comprobarse: sin
// esto, quien tiene el cloroplasto no sabe si le tocaba estar en la animal.
const SOLO_EN = {
  animal:  { es: 'Solo en la animal', en: 'Animal cell only', ca: 'Només a l\'animal' },
  vegetal: { es: 'Solo en la vegetal', en: 'Plant cell only', ca: 'Només a la vegetal' },
}

const CONTINENTES = {
  'Europa':      { es: 'Europa', en: 'Europe', ca: 'Europa' },
  'Asia':        { es: 'Asia', en: 'Asia', ca: 'Àsia' },
  'América':     { es: 'América', en: 'Americas', ca: 'Amèrica' },
  'África':      { es: 'África', en: 'Africa', ca: 'Àfrica' },
  'Oceanía':     { es: 'Oceanía', en: 'Oceania', ca: 'Oceania' },
}

// Rusia viene marcada como "Europa/Asia" en paises.js, que es correcto pero no
// es un continente: tratarlo como uno más dejaba un botón que imprimía UNA
// tarjeta. Los países a caballo salen en los dos continentes, que además es lo
// que un profesor espera — quien imprime las capitales de Europa quiere Moscú
// en el montón.
const continentesDe = pais => String(pais.continente).split('/')

// El reparto "Mundo" NO son los 40 países más poblados del planeta: ese corte
// deja fuera a Oceanía entera (Australia es la 45ª por población) y la
// actividad de esta hoja es justo clasificar por continente. Se cogen los ocho
// más poblados de CADA continente, así los cinco están dentro y Asia no se
// come la hoja. Ocho porque cinco continentes por ocho ya roza el tope de
// recorte sin pasarse.
const POR_CONTINENTE_EN_MUNDO = 8

function paisesDelMundo() {
  const porContinente = Object.keys(CONTINENTES).map(c => PAISES
    .filter(p => continentesDe(p).includes(c))
    .sort((a, b) => b.poblacion - a.poblacion)
    .slice(0, POR_CONTINENTE_EN_MUNDO))

  // Ronda a ronda y no continente a continente: si la hoja saliera agrupada,
  // el profesor que la recorta por filas y reparte le daría a un grupo Europa
  // entera y a otro África entera, y ahí ya no queda nada que clasificar.
  // Rusia sale en dos listas (está marcada 'Europa/Asia'), de ahí el visto.
  const vistos = new Set()
  const salida = []
  for (let i = 0; i < POR_CONTINENTE_EN_MUNDO; i++) {
    for (const lista of porContinente) {
      const p = lista[i]
      if (p && !vistos.has(p.iso)) { vistos.add(p.iso); salida.push(p) }
    }
  }
  return salida
}

// La tabla periódica solo se puede montar sobre la mesa si el juego de
// tarjetas es un bloque CERRADO. ELEMENTOS tiene 71 elementos hasta el Z=86,
// con hueco a partir del 57 (faltan los lantánidos), así que "todos" no es una
// tabla: es una tabla con agujeros y encima no cabe en una hoja. Los períodos
// 1 a 4 sí son una tabla entera — 36 elementos seguidos, del hidrógeno al
// criptón, que es exactamente el trozo que se estudia.
const Z_MAX_PERIODOS_1_4 = 36
const Z_PRIMEROS = 20

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
      es: 'Recorta y reparte. Sirven para preguntarse por parejas o para un trivial rápido. Para clasificarlas por continente sobre la mesa hace falta el reparto "Mundo", que trae países de los cinco: una hoja de un solo continente no da nada que clasificar.',
      en: 'Cut them out and hand them round. Good for pair quizzing or a quick trivia round. To sort them by continent on the table you need the "World" set, which brings countries from all five: a single-continent sheet leaves nothing to sort.',
      ca: 'Retalla i reparteix. Serveixen per preguntar-se per parelles o per a un trivial ràpid. Per classificar-les per continent sobre la taula cal el repartiment "Món", que porta països dels cinc.',
    },
    variantes(lang) {
      const cuenta = {}
      for (const p of PAISES) for (const c of continentesDe(p)) cuenta[c] = (cuenta[c] ?? 0) + 1
      const continentes = Object.entries(cuenta)
        .filter(([id]) => CONTINENTES[id])
        .map(([id, n]) => ({ id, label: tr3(CONTINENTES[id], lang), n }))
        .sort((a, b) => a.label.localeCompare(b.label))
      // El mundo va primero: es el único reparto con el que se puede hacer la
      // actividad de clasificar, y los continentes sueltos son para repasar uno.
      return [
        { id: 'mundo', label: tr3({ es: '🌐 Mundo', en: '🌐 World', ca: '🌐 Món' }, lang), n: paisesDelMundo().length, completo: true },
        ...continentes,
      ]
    },
    tarjetas(varianteId, lang) {
      return (varianteId === 'mundo' ? paisesDelMundo() : PAISES.filter(p => continentesDe(p).includes(varianteId)))
        .map(p => ({
          frente: `${p.bandera} ${enIdioma(p, 'nombre', lang)}`,
          pista: null,
          dorso: p.capital,
        }))
    },
  },

  'quimica-elementos': {
    emoji: '⚗️',
    // El reparto de tira está pensado para frente largo y dorso corto, y esta
    // hoja es justo al revés: delante van dos letras ("Ti") y detrás quince
    // ("Titanio · Z=22"). Salía una tarjeta con dos tercios en blanco y el
    // nombre partido en la tira estrecha. Plegable le da la vuelta al reparto.
    formato: 'plegable',
    asignatura: { es: 'Química', en: 'Chemistry', ca: 'Química' },
    titulo: { es: 'Tarjetas de elementos químicos', en: 'Chemical element cards', ca: 'Targetes d\'elements químics' },
    desc: {
      es: 'El símbolo por delante y el nombre y el número atómico por detrás.',
      en: 'The symbol on the front, name and atomic number on the back.',
      ca: 'El símbol al davant i el nom i el número atòmic al darrere.',
    },
    comoUsarlo: {
      es: 'Recorta y usa el símbolo como pregunta: qué elemento es y qué número atómico tiene. Con el reparto de los períodos 1 a 4 se puede montar la tabla entera sobre la mesa, porque son los 36 primeros seguidos y no falta ninguno: el número atómico del dorso es el que dice dónde va cada uno.',
      en: 'Cut them out and use the symbol as the question: which element is it and what is its atomic number. The periods 1-4 set lets you lay out the whole table, since it is the first 36 in a row with none missing: the atomic number on the back is what says where each one goes.',
      ca: "Retalla i fes servir el símbol com a pregunta: quin element és i quin número atòmic té. Amb el repartiment dels períodes 1 a 4 es pot muntar la taula sencera sobre la taula, perquè són els 36 primers seguits i no en falta cap.",
    },
    // Dos bloques SEGUIDOS, no ocho montones por tipo. Antes esto ofrecía un
    // botón por familia —cinco halógenos, seis gases nobles— y con eso no se
    // hace nada: la actividad de unas tarjetas de elementos es montar la tabla,
    // y una tabla necesita el bloque entero sin huecos. Los dos cortes son los
    // que se estudian: los veinte primeros en primaria y primero de ESO, y los
    // cuatro primeros períodos completos después.
    variantes(lang) {
      const bloque = (id, label, zMax) => ({
        id, label: tr3(label, lang), completo: true,
        n: ELEMENTOS.filter(e => e.z <= zMax).length,
      })
      return [
        bloque('primeros-20', { es: 'Los 20 primeros', en: 'The first 20', ca: 'Els 20 primers' }, Z_PRIMEROS),
        bloque('periodos-1-4', { es: 'Períodos 1-4 (los 36)', en: 'Periods 1-4 (all 36)', ca: 'Períodes 1-4 (els 36)' }, Z_MAX_PERIODOS_1_4),
      ]
    },
    tarjetas(varianteId, lang) {
      const zMax = { 'primeros-20': Z_PRIMEROS, 'periodos-1-4': Z_MAX_PERIODOS_1_4 }[varianteId]
      if (!zMax) return []
      return ELEMENTOS
        .filter(e => e.z <= zMax)
        // En orden de número atómico, que es el orden de la tabla. ELEMENTOS
        // viene agrupado por tipo, así que sin esto la hoja saldría saltando
        // del 1 al 11 y volviendo atrás.
        .sort((a, b) => a.z - b.z)
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
    // Plegable aunque el dorso sea corto: no es la longitud de la frase, es la
    // de la PALABRA. "Descomponedor" no cabe en la tira de un tercio de
    // columna, y de las dos maneras salía mal — cortada en seco ("Descomponedo")
    // o partida en dos líneas por la mitad. En la banda de ancho entero cabe.
    formato: 'plegable',
    // Como los titulares, y por lo mismo: ORGANISMOS viene agrupado por rol,
    // así que la hoja completa salía con los nueve productores juntos al
    // principio. El profesor la recorta por filas, reparte, y un grupo se
    // queda con nueve plantas y ninguna cosa que se las coma.
    intercalar: true,
    asignatura: { es: 'Biología', en: 'Biology', ca: 'Biologia' },
    titulo: { es: 'Tarjetas de la cadena alimentaria', en: 'Food chain cards', ca: 'Targetes de la cadena alimentària' },
    desc: {
      es: 'Un ser vivo por delante y su papel en la cadena por detrás.',
      en: 'A living thing on the front and its role in the chain on the back.',
      ca: 'Un ésser viu al davant i el seu paper a la cadena al darrere.',
    },
    comoUsarlo: {
      es: 'Imprime el ecosistema completo, recorta y reparte: por grupos, tienen que ordenar sus tarjetas en una cadena que se sostenga, del productor al último consumidor. Los roles sueltos son para repasar uno solo — con una hoja de productores no hay cadena que montar.',
      en: 'Print the full ecosystem, cut it out and hand it round: in groups, they arrange their cards into a chain that holds up, from producer to top consumer. The single-role sets are for revising one role — a sheet of producers builds no chain.',
      ca: "Imprimeix l'ecosistema complet, retalla i reparteix: per grups, han d'ordenar les seves targetes en una cadena que se sostingui, del productor a l'últim consumidor. Els rols solts són per repassar-ne un de sol.",
    },
    // Un solo reparto, el ecosistema entero. Esto ofrecía un botón por rol
    // —nueve productores, diez consumidores primarios…— y ninguno servía para
    // nada: una cadena necesita productor, consumidor y descomponedor A LA VEZ,
    // así que con cualquiera de esas hojas la actividad era imposible de hacer.
    // El rol no es una baraja, es la respuesta que va detrás de la tarjeta.
    variantes(lang) {
      return [{
        id: 'todos',
        label: tr3({ es: 'Ecosistema completo', en: 'Full ecosystem', ca: 'Ecosistema complet' }, lang),
        n: ORGANISMOS.length,
        completo: true,
      }]
    },
    tarjetas(varianteId, lang) {
      if (varianteId !== 'todos') return []
      return ORGANISMOS
        .map(o => ({
          frente: `${o.emoji} ${enIdioma(o, 'nombre', lang)}`,
          pista: null,
          dorso: `${ROLES[o.rol].emoji} ${tr3(ROLES[o.rol].label, lang)}`,
        }))
    },
  },

  // ── Tres sets más, con datos que ya estaban estructurados ──────────────────
  // Estos tres salen de datos que ya existían con la forma exacta que hace
  // falta (nombre + función, órgano + sistema, planeta + dato), igual que los
  // de arriba. No hay contenido inventado en ninguno: si algún día se corrige
  // un orgánulo en el juego, la tarjeta se corrige sola.

  'biologia-organulos': {
    emoji: '🔬',
    formato: 'plegable',
    asignatura: { es: 'Biología', en: 'Biology', ca: 'Biologia' },
    titulo: { es: 'Tarjetas de los orgánulos', en: 'Organelle cards', ca: 'Targetes dels orgànuls' },
    desc: {
      es: 'El orgánulo por delante y lo que hace por detrás.',
      en: 'The organelle on the front and what it does on the back.',
      ca: "L'orgànul al davant i el que fa al darrere.",
    },
    comoUsarlo: {
      es: 'Recorta y reparte una a cada alumno: tiene que explicar su orgánulo al resto sin leer el dorso, y entre todos montar la célula en la pizarra. Los que salen en las dos células (membrana, núcleo, citoplasma…) están en los dos juegos, así que se puede jugar animal contra vegetal.',
      en: 'Cut them out and hand one to each student: they explain their organelle to the rest without reading the back, and together they build the cell on the board. The ones present in both cells appear in both sets, so you can play animal against plant.',
      ca: "Retalla i reparteix-ne una a cada alumne: ha d'explicar el seu orgànul a la resta sense llegir el darrere, i entre tots muntar la cèl·lula a la pissarra.",
    },
    // Las dos son repartos COMPLETOS, no medio material cada una: una célula
    // animal y una vegetal son dos barajas enteras que comparten la mitad de
    // las tarjetas (membrana, núcleo, citoplasma…). Aquí partir no rompe nada
    // —al revés, es lo que permite jugar animal contra vegetal—, que es justo
    // lo contrario de lo que pasaba con los roles de la cadena alimentaria.
    variantes(lang) {
      return Object.entries(CELULAS).map(([id, c]) => ({
        id,
        label: `${c.emoji} ${tr3(c.label, lang)}`,
        n: ORGANULOS.filter(o => o.donde === 'ambas' || o.donde === id).length,
        completo: true,
      }))
    },
    tarjetas(varianteId, lang) {
      return ORGANULOS
        .filter(o => o.donde === 'ambas' || o.donde === varianteId)
        .map(o => ({
          frente: tr3(o.nombre, lang),
          // Marcar los exclusivos es lo que convierte el juego de "animal
          // contra vegetal" en algo comprobable: sin esto, un alumno no puede
          // saber si su tarjeta debería estar en la otra célula.
          pista: o.donde === 'ambas' ? null : tr3(SOLO_EN[o.donde], lang),
          dorso: tr3(o.funcion, lang),
        }))
    },
  },

  'biologia-organos': {
    emoji: '❤️',
    formato: 'plegable',
    asignatura: { es: 'Biología', en: 'Biology', ca: 'Biologia' },
    titulo: { es: 'Tarjetas de los órganos', en: 'Organ cards', ca: 'Targetes dels òrgans' },
    desc: {
      es: 'El órgano por delante, su sistema y lo que hace por detrás.',
      en: 'The organ on the front, its system and what it does on the back.',
      ca: "L'òrgan al davant, el seu sistema i el que fa al darrere.",
    },
    comoUsarlo: {
      es: 'Reparte las tarjetas y que las coloquen sobre una silueta dibujada en un papel grande, cada sistema en un color. Después se juntan las siluetas: los sistemas comparten sitio en el cuerpo, y verlo montado es justo lo que no se ve en un dibujo de libro.',
      en: 'Hand out the cards and have students place them on a body outline drawn on a large sheet, one colour per system. Then put the outlines together: systems share space in the body, and seeing that assembled is exactly what a textbook diagram does not show.',
      ca: 'Reparteix les targetes i que les col·loquin sobre una silueta dibuixada en un paper gran, cada sistema d\'un color. Després s\'ajunten les siluetes: els sistemes comparteixen lloc al cos.',
    },
    variantes(lang) {
      // El cuerpo entero va primero porque es el reparto normal en clase. Los
      // sistemas sueltos los criba variantesDe: la silueta de Rayos X —de
      // donde vienen estos datos— tiene un solo órgano circulatorio y tres del
      // respiratorio, y eso no es una baraja. Siguen dentro de "Todos".
      const sueltos = Object.entries(SISTEMAS)
        .map(([id, label]) => ({ id, label: tr3(label, lang), n: ORGANOS.filter(o => o.sistema === id).length }))
      return [
        { id: 'todos', label: tr3({ es: 'Todos los sistemas', en: 'All systems', ca: 'Tots els sistemes' }, lang), n: ORGANOS.length, completo: true },
        ...sueltos,
      ]
    },
    tarjetas(varianteId, lang) {
      return ORGANOS
        .filter(o => varianteId === 'todos' || o.sistema === varianteId)
        .map(o => ({
          frente: tr3(o.nombre, lang),
          pista: tr3(SISTEMAS[o.sistema], lang),
          dorso: tr3(o.funcion, lang),
        }))
    },
  },

  'geologia-planetas': {
    emoji: '🔭',
    formato: 'plegable',
    asignatura: { es: 'Geología y el Universo', en: 'Geology & the Universe', ca: "Geologia i l'Univers" },
    titulo: { es: 'Tarjetas de los planetas', en: 'Planet cards', ca: 'Targetes dels planetes' },
    desc: {
      es: 'El planeta y su distancia al Sol por delante, un dato real por detrás.',
      en: 'The planet and its distance from the Sun on the front, a real fact on the back.',
      ca: 'El planeta i la seva distància al Sol al davant, una dada real al darrere.',
    },
    // Sin decir "las ocho": el mismo texto sirve para la hoja entera y para
    // los dos grupos sueltos, así que no puede prometer un número de tarjetas
    // que dependa de lo que se haya elegido imprimir.
    comoUsarlo: {
      es: 'Recorta, reparte y que las ordenen por distancia al Sol sin mirar el dorso. La distancia va en UA (1 UA = del Sol a la Tierra): con los ocho planetas sobre la mesa se ve solo el salto del cinturón de asteroides, porque de Marte a Júpiter hay más hueco que del Sol a Marte.',
      en: 'Cut them out, hand them round and have the planets ordered by distance from the Sun without looking at the back. Distance is in AU (1 AU = Sun to Earth): with all eight on the table the asteroid-belt jump shows up by itself, since there is more space between Mars and Jupiter than between the Sun and Mars.',
      ca: "Retalla, reparteix i que els ordenin per distància al Sol sense mirar el darrere. La distància va en UA (1 UA = del Sol a la Terra): amb els vuit planetes sobre la taula es veu sol el salt del cinturó d'asteroides.",
    },
    // Un solo reparto: el sistema solar son ocho planetas y caben en una hoja.
    // Hubo un momento en que esto ofrecía "rocosos" y "gigantes" por separado,
    // cuatro tarjetas cada uno, y era peor de las dos maneras — media hoja, y
    // sin el salto del cinturón de asteroides no queda actividad ninguna.
    variantes(lang) {
      return [{
        id: 'todos',
        label: tr3({ es: 'Los ocho planetas', en: 'All eight planets', ca: 'Els vuit planetes' }, lang),
        n: PLANETAS.length,
        completo: true,
      }]
    },
    tarjetas(varianteId, lang) {
      if (varianteId !== 'todos') return []
      return PLANETAS.map(p => ({
        frente: `${p.emoji} ${tr3(p.nombre, lang)}`,
        pista: `${p.distanciaUA} UA`,
        dorso: tr3(p.dato, lang),
      }))
    },
  },
}

export const IMPRIMIBLE_IDS = Object.keys(IMPRIMIBLES)

// Los repartos que se ENSEÑAN, que no son todos los que existen: el completo
// siempre (va marcado `completo`, y aunque fuera corto es la actividad), y los
// grupos sueltos solo si llenan una baraja.
//
// Pasa por aquí todo el que pinte botones —el panel de recursos y las páginas
// de teoría— para que la regla viva en un sitio. Un imprimible que solo tiene
// un reparto bueno (los planetas, la cadena alimentaria) enseña un botón y ya:
// el objetivo de esta pantalla es que el profesor imprima algo que pueda usar,
// no que tenga mucho donde elegir.
// Toma la DEFINICIÓN y no el id porque las páginas de teoría mezclan estos
// imprimibles con las barajas sacadas de los bancos de examen, que se cargan
// aparte y no viven en IMPRIMIBLES. La regla tiene que ser la misma para las
// dos o el mismo botón significa cosas distintas según de dónde salga.
export function variantesUsables(def, lang = 'es') {
  return def?.variantes(lang).filter(v => v.completo || v.n >= MIN_TARJETAS_GRUPO) ?? []
}

export const variantesDe = (imprimibleId, lang = 'es') => variantesUsables(IMPRIMIBLES[imprimibleId], lang)

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
  'biologia/celula': ['biologia-organulos'],
  'biologia/cuerpo-humano': ['biologia-organos'],
  'geologia/sistema-solar': ['geologia-planetas'],
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
