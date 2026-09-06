import { MAX_TARJETAS } from './materialImprimible'

// ── Un imprimible más por tema de ciencias: su propio banco de examen ────────
// Cada tema de ciencias ya tiene un banco de preguntas escrito para su examen
// online (11-23 preguntas por tema, en tres idiomas, con la respuesta buena
// marcada). En papel eso es un juego de tarjetas de repaso listo: la pregunta
// por delante, la respuesta por detrás. No hay nada que escribir — solo que
// nadie las había puesto en una hoja.
//
// POR QUÉ ESTE MÓDULO VA APARTE Y CON import() DINÁMICO
// Los diecisiete bancos juntos son 417 KB de fuente. materialImprimible se
// carga entero en las páginas de teoría y en /recursos, que son páginas
// públicas de captación: meterlos ahí de forma estática significaría que quien
// entra a leer sobre la célula se descarga también las preguntas de placas
// tectónicas, de ondas y de las otras quince. Cada página necesita UN banco,
// así que cada banco se carga solo cuando hace falta y solo el suyo.
//
// El precio es que esto es asíncrono y el resto del material no: la sección se
// pinta con lo que ya está y estas tarjetas aparecen cuando llegan. Es el
// orden correcto — el contenido de la página no espera a un recurso opcional.
//
// Por lo mismo no salen en /recursos: allí habría que cargar los diecisiete de
// golpe para poder listarlos. Tampoco se pierde nada, porque el sitio natural
// de las tarjetas de un tema es la página que explica ese tema.

// De qué export sale el banco COMPLETO de cada fichero. No es un capricho:
// unos exportan `PREGUNTAS` con todo y otros solo `PREGUNTAS_ESO`, que en esos
// ficheros ES el banco entero (ahí ESO incluye lo de primaria). Elegir mal
// aquí no daría error, daría media hoja — por eso hay un test que compara lo
// que sale de aquí con los niveles que traen las propias preguntas.
const BANCOS = {
  'quimica/atomos-moleculas': {
    emoji: '⚛️', clave: 'PREGUNTAS',
    cargar: () => import('../data/atomosMoleculas'),
    nombre: { es: 'Átomos y Moléculas', en: 'Atoms and Molecules', ca: 'Àtoms i Molècules' },
  },
  'quimica/estados-materia': {
    emoji: '🧊', clave: 'PREGUNTAS',
    cargar: () => import('../data/estadosMateria'),
    nombre: { es: 'Estados de la Materia', en: 'States of Matter', ca: 'Estats de la Matèria' },
  },
  'quimica/mezclas-separacion': {
    emoji: '🧪', clave: 'PREGUNTAS',
    cargar: () => import('../data/mezclasMateria'),
    nombre: { es: 'Mezclas y Separación', en: 'Mixtures and Separation', ca: 'Mescles i Separació' },
  },
  'quimica/acidos-bases': {
    emoji: '🧫', clave: 'PREGUNTAS',
    cargar: () => import('../data/acidosBases'),
    nombre: { es: 'Ácidos y Bases', en: 'Acids and Bases', ca: 'Àcids i Bases' },
  },
  'fisica/fuerzas': {
    emoji: '💪', clave: 'PREGUNTAS_ESO',
    cargar: () => import('../data/fuerzas'),
    nombre: { es: 'Fuerzas y Movimiento', en: 'Forces and Motion', ca: 'Forces i Moviment' },
  },
  'fisica/energia': {
    emoji: '⚡', clave: 'PREGUNTAS_ESO',
    cargar: () => import('../data/energia'),
    nombre: { es: 'Energía', en: 'Energy', ca: 'Energia' },
  },
  'fisica/electricidad': {
    emoji: '🔌', clave: 'PREGUNTAS_ESO',
    cargar: () => import('../data/electricidad'),
    nombre: { es: 'Electricidad', en: 'Electricity', ca: 'Electricitat' },
  },
  'fisica/ondas-luz': {
    emoji: '🌈', clave: 'PREGUNTAS_ESO',
    cargar: () => import('../data/ondasLuz'),
    nombre: { es: 'Ondas y Luz', en: 'Waves and Light', ca: 'Ones i Llum' },
  },
  'biologia/celula': {
    emoji: '🔬', clave: 'PREGUNTAS',
    cargar: () => import('../data/celula'),
    nombre: { es: 'La Célula', en: 'The Cell', ca: 'La Cèl·lula' },
  },
  'biologia/cuerpo-humano': {
    emoji: '❤️', clave: 'PREGUNTAS_ESO',
    cargar: () => import('../data/cuerpoHumano'),
    nombre: { es: 'Cuerpo Humano', en: 'Human Body', ca: 'Cos Humà' },
  },
  'biologia/seres-vivos': {
    emoji: '🦋', clave: 'PREGUNTAS_ESO',
    cargar: () => import('../data/seresVivos'),
    nombre: { es: 'Seres Vivos', en: 'Living Things', ca: 'Éssers Vius' },
  },
  'biologia/genetica': {
    emoji: '🧬', clave: 'PREGUNTAS_ESO',
    cargar: () => import('../data/genetica'),
    nombre: { es: 'Genética', en: 'Genetics', ca: 'Genètica' },
  },
  'biologia/nutricion': {
    emoji: '🥗', clave: 'PREGUNTAS_ESO',
    cargar: () => import('../data/nutricion'),
    nombre: { es: 'Nutrición', en: 'Nutrition', ca: 'Nutrició' },
  },
  'biologia/evolucion': {
    emoji: '🐒', clave: 'PREGUNTAS',
    cargar: () => import('../data/evolucion'),
    nombre: { es: 'Evolución', en: 'Evolution', ca: 'Evolució' },
  },
  'geologia/sistema-solar': {
    emoji: '🌍', clave: 'PREGUNTAS',
    cargar: () => import('../data/sistemaSolar'),
    nombre: { es: 'Sistema Solar', en: 'Solar System', ca: 'Sistema Solar' },
  },
  'geologia/rocas-minerales': {
    emoji: '⛰️', clave: 'PREGUNTAS',
    cargar: () => import('../data/rocasMinerales'),
    nombre: { es: 'Rocas y Minerales', en: 'Rocks and Minerals', ca: 'Roques i Minerals' },
  },
  'geologia/placas-tectonicas': {
    emoji: '🌋', clave: 'PREGUNTAS',
    cargar: () => import('../data/placasTectonicas'),
    nombre: { es: 'Placas Tectónicas', en: 'Tectonic Plates', ca: 'Plaques Tectòniques' },
  },
}

const ASIGNATURAS = {
  quimica:  { es: 'Química', en: 'Chemistry', ca: 'Química' },
  fisica:   { es: 'Física', en: 'Physics', ca: 'Física' },
  biologia: { es: 'Biología', en: 'Biology', ca: 'Biologia' },
  geologia: { es: 'Geología y el Universo', en: 'Geology & the Universe', ca: "Geologia i l'Univers" },
}

// El nivel que trae cada pregunta, con nombre. Sale como grupo elegible para
// que un maestro de primaria no se lleve las de bachillerato en el montón.
const NIVELES = {
  primaria:     { es: 'Primaria', en: 'Primary', ca: 'Primària' },
  eso:          { es: 'ESO', en: 'Secondary', ca: 'ESO' },
  bachillerato: { es: 'Bachillerato', en: 'Upper secondary', ca: 'Batxillerat' },
}
const ORDEN_NIVELES = Object.keys(NIVELES)

const tr3 = (o, lang) => o?.[lang] ?? o?.es ?? ''

// Mismo mínimo que en materialImprimible: un botón que imprime dos tarjetas no
// vale la pena. Aquí importa más, porque hay temas con solo tres o cuatro
// preguntas de un nivel.
const MIN_POR_NIVEL = 3

export const TEMAS_CON_TARJETAS_DE_EXAMEN = Object.keys(BANCOS)

export function temaTieneTarjetasDeExamen(materia, tema) {
  return Boolean(BANCOS[`${materia}/${tema}`])
}

// Construye el imprimible a partir de un banco YA cargado. Separado de la
// carga para que los tests puedan pasarle preguntas a mano, sin red.
export function imprimibleDeBanco(banco, preguntas, materia) {
  const porNivel = {}
  for (const p of preguntas) (porNivel[p.nivel] ??= []).push(p)

  return {
    emoji: banco.emoji,
    // Plegable siempre: estas respuestas son frases enteras (las hay de 155
    // caracteres) y en el reparto de tira no caben.
    formato: 'plegable',
    asignatura: ASIGNATURAS[materia] ?? ASIGNATURAS.biologia,
    titulo: {
      es: `Tarjetas de repaso · ${banco.nombre.es}`,
      en: `Revision cards · ${banco.nombre.en}`,
      ca: `Targetes de repàs · ${banco.nombre.ca}`,
    },
    desc: {
      es: 'La pregunta por delante y la respuesta por detrás, del banco del examen de este tema.',
      en: 'The question on the front and the answer on the back, from this topic\'s exam bank.',
      ca: 'La pregunta al davant i la resposta al darrere, del banc de l\'examen d\'aquest tema.',
    },
    comoUsarlo: {
      es: 'Recorta y dobla: por parejas, uno pregunta y el otro responde antes de girar la tarjeta. También valen para un concurso por equipos — se leen en voz alta y la respuesta ya viene detrás, así que no hay nada que preparar.',
      en: 'Cut and fold: in pairs, one asks and the other answers before turning the card over. They also work for a team quiz — read them aloud and the answer is already on the back, so there is nothing to prepare.',
      ca: 'Retalla i doblega: per parelles, un pregunta i l\'altre respon abans de girar la targeta. També serveixen per a un concurs per equips — es llegeixen en veu alta i la resposta ja ve al darrere.',
    },
    variantes(lang) {
      return ORDEN_NIVELES
        .filter(n => (porNivel[n]?.length ?? 0) >= MIN_POR_NIVEL)
        .map(n => ({ id: n, label: tr3(NIVELES[n], lang), n: Math.min(porNivel[n].length, MAX_TARJETAS) }))
    },
    tarjetas(varianteId, lang) {
      return (porNivel[varianteId] ?? [])
        .slice(0, MAX_TARJETAS)
        .map(p => ({
          frente: p.emoji ? `${p.emoji} ${tr3(p.pregunta, lang)}` : tr3(p.pregunta, lang),
          pista: null,
          dorso: tr3(p.correcta, lang),
        }))
    },
  }
}

// Carga el banco de ese tema y devuelve su imprimible, o null si el tema no
// tiene. El error se traga a propósito: que falle la descarga de un recurso
// opcional no puede tumbar la página de teoría entera.
export async function cargarTarjetasDeExamen(materia, tema) {
  const banco = BANCOS[`${materia}/${tema}`]
  if (!banco) return null
  try {
    const mod = await banco.cargar()
    const preguntas = mod[banco.clave]
    if (!Array.isArray(preguntas) || preguntas.length === 0) return null
    return imprimibleDeBanco(banco, preguntas, materia)
  } catch {
    return null
  }
}
