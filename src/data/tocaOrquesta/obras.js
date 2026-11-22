// Obras de «Toca con la Orquesta» y del recurso «Ensayo con la orquesta».
// Arreglos PROPIOS de Tuthor a partir de la obra original (dominio público):
// no se ha copiado ningún MIDI, partitura ni grabación.
//
// Cada voz es una lista de compases; cada compás, notas [altura, negras]:
//   altura = MIDI de sonido real (número), un acorde ([MIDI, MIDI…]),
//   'x' (golpe de percusión) o null (silencio).
// voz.tipo: sin tipo = melodía de una nota (se puede tocar en el juego con
// micro); 'acordes' = ukelele (cifrado + rasgueo); 'percusion' = una línea.
// voz.inst = el instrumento con el que se escribe en la partitura general.
//
// Himno de la alegría (Beethoven, 9.ª sinfonía, 4.º mov., 1824), en dos
// versiones con la misma melodía y la misma armonía (I y V7):
//   · escuela: Sol mayor. La flauta dulce solo usa Si, La, Sol, Do y Re (y el
//     Re grave), sin alteraciones; el ukelele, Sol y Re7.
//   · orquesta: Fa mayor, cómoda para los instrumentos de orquesta y banda
//     (Si♭ → Sol mayor, Mi♭ → Re mayor, trompa en Fa → Do mayor).

const T = (es, en, ca) => ({ es, en, ca })

// La melodía en grados (b5 = la dominante grave del compás 12)
const q = g => [g, 1]
const GRADOS = [
  [q(3), q(3), q(4), q(5)],
  [q(5), q(4), q(3), q(2)],
  [q(1), q(1), q(2), q(3)],
  [[3, 1.5], [2, 0.5], [2, 2]],
  [q(3), q(3), q(4), q(5)],
  [q(5), q(4), q(3), q(2)],
  [q(1), q(1), q(2), q(3)],
  [[2, 1.5], [1, 0.5], [1, 2]],
  [q(2), q(2), q(3), q(1)],
  [q(2), [3, 0.5], [4, 0.5], q(3), q(1)],
  [q(2), [3, 0.5], [4, 0.5], q(3), q(2)],
  [q(1), q(2), ['b5', 2]],
  [q(3), q(3), q(4), q(5)],
  [q(5), q(4), q(3), q(2)],
  [q(1), q(1), q(2), q(3)],
  [[2, 1.5], [1, 0.5], [1, 2]],
]
const melodia = alturas => GRADOS.map(c => c.map(([g, d]) => [alturas[g], d]))

// Acorde de cada medio compás: I (tónica) o V (dominante con séptima)
export const ACORDES = ['II', 'VV', 'II', 'IV', 'II', 'VV', 'II', 'VI', 'VI', 'VI', 'VV', 'IV', 'II', 'VV', 'II', 'VI']
// Una voz que hace, en cada medio compás, las notas del patrón de su acorde
// (patrón = lista de [altura, negras] que dura dos negras)
const porAcordes = patron => ACORDES.map(par => [...par].flatMap(a => patron[a]))

const PERCUSION = ACORDES.map((_, i) => (i === ACORDES.length - 1
  ? [['x', 1], ['x', 1], ['x', 2]]
  : [['x', 1], ['x', 1], ['x', 0.5], ['x', 0.5], ['x', 1]]))

// Partes para ensayar por trozos (plan de ensayo del recurso de clase)
const SECCIONES_HIMNO = [
  { nombre: T('Parte A (compases 1-8)', 'Part A (bars 1-8)', 'Part A (compassos 1-8)'), desde: 1, hasta: 8 },
  { nombre: T('Parte B (compases 9-16)', 'Part B (bars 9-16)', 'Part B (compassos 9-16)'), desde: 9, hasta: 16 },
]

export const OBRAS = {
  'himno-alegria-escuela': {
    titulo: T('Himno de la alegría', 'Ode to Joy', 'Himne de l’alegria'),
    version: T('versión escuela, en Sol', 'school version, in G', 'versió escola, en Sol'),
    autor: 'Ludwig van Beethoven',
    origen: T('9.ª sinfonía, 4.º movimiento (1824)', 'Symphony No. 9, 4th movement (1824)', '9a simfonia, 4t moviment (1824)'),
    tonalidad: 1, // armadura de concierto en quintas (Sol mayor)
    compas: [4, 4],
    tempo: 100,
    cifrado: { I: 'G', V: 'D7' },
    secciones: SECCIONES_HIMNO,
    conjuntos: [
      { voces: ['melodia', 'laminas'], nombre: T('Conjunto: flautas y láminas', 'Ensemble: recorders and tuned percussion', 'Conjunt: flautes i làmines') },
      { voces: ['acordes', 'percusion'], nombre: T('Conjunto: la base (ukeleles y percusión)', 'Ensemble: the rhythm section (ukuleles and percussion)', 'Conjunt: la base (ukeleles i percussió)') },
    ],
    voces: {
      // La flauta dulce suena una octava más alta de lo que se escribe
      melodia: { grupo: T('Flautas', 'Recorders', 'Flautes'), nombre: T('Melodía (flauta dulce)', 'Melody (recorder)', 'Melodia (flauta dolça)'), inst: 'flautaDulce', timbre: 'recorder',
        compases: melodia({ 1: 79, 2: 81, 3: 83, 4: 84, 5: 86, b5: 74 }) },
      laminas: { grupo: T('Láminas', 'Tuned percussion', 'Làmines'), nombre: T('Láminas (xilófono o metalófono)', 'Tuned percussion (xylophone or glockenspiel)', 'Làmines (xilòfon o metal·lòfon)'), inst: 'laminas', timbre: 'xylophone',
        compases: porAcordes({ I: [[67, 1], [62, 1]], V: [[62, 1], [69, 1]] }) }, // bordón: fundamental y quinta
      acordes: { grupo: T('Ukeleles', 'Ukuleles', 'Ukeleles'), nombre: T('Acordes (ukelele)', 'Chords (ukulele)', 'Acords (ukelele)'), inst: 'ukelele', timbre: 'guitarra', tipo: 'acordes',
        // Sol (0232) y Re7 (2020) con la afinación del ukelele (Sol Do Mi La)
        compases: porAcordes({ I: [[[67, 62, 67, 71], 1], [[67, 62, 67, 71], 1]], V: [[[69, 60, 66, 69], 1], [[69, 60, 66, 69], 1]] }) },
      percusion: { grupo: T('Percusión', 'Percussion', 'Percussió'), nombre: T('Percusión (claves, pandero o palmas)', 'Percussion (claves, tambourine or clapping)', 'Percussió (claus, pandero o picant de mans)'), inst: 'percusion', timbre: 'woodblock', tipo: 'percusion',
        compases: PERCUSION },
    },
  },
  'himno-alegria': {
    titulo: T('Himno de la alegría', 'Ode to Joy', 'Himne de l’alegria'),
    version: T('versión orquesta, en Fa', 'orchestra version, in F', 'versió orquestra, en Fa'),
    autor: 'Ludwig van Beethoven',
    origen: T('9.ª sinfonía, 4.º movimiento (1824)', 'Symphony No. 9, 4th movement (1824)', '9a simfonia, 4t moviment (1824)'),
    tonalidad: -1, // Fa mayor: un bemol
    compas: [4, 4],
    tempo: 100,
    cifrado: { I: 'F', V: 'C7' },
    secciones: SECCIONES_HIMNO,
    conjuntos: [
      { voces: ['melodia', 'armonia'], nombre: T('Conjunto: las voces agudas', 'Ensemble: the upper parts', 'Conjunt: les veus agudes') },
      { voces: ['acompanamiento', 'bajo'], nombre: T('Conjunto: las voces graves', 'Ensemble: the lower parts', 'Conjunt: les veus greus') },
    ],
    voces: {
      melodia: { grupo: T('Melodía', 'Melody', 'Melodia'), nombre: T('Melodía', 'Melody', 'Melodia'), inst: 'violin', timbre: 'violin',
        compases: melodia({ 1: 65, 2: 67, 3: 69, 4: 70, 5: 72, b5: 60 }) },
      // La séptima (Si♭) resuelve en La; la sensible (Mi) resuelve en Fa
      armonia: { grupo: T('2.ª voz', '2nd part', '2a veu'), nombre: T('Armonía (2.ª voz)', 'Harmony (2nd part)', 'Harmonia (2a veu)'), inst: 'viola', timbre: 'viola',
        compases: porAcordes({ I: [[57, 2]], V: [[58, 2]] }) },
      acompanamiento: { grupo: T('3.ª voz', '3rd part', '3a veu'), nombre: T('Acompañamiento (3.ª voz)', 'Accompaniment (3rd part)', 'Acompanyament (3a veu)'), inst: 'chelo', timbre: 'cello',
        compases: porAcordes({ I: [[53, 2]], V: [[52, 2]] }) },
      bajo: { grupo: T('Bajos', 'Basses', 'Baixos'), nombre: T('Bajo', 'Bass', 'Baix'), inst: 'chelo', timbre: 'contrabass',
        compases: porAcordes({ I: [[41, 1], [48, 1]], V: [[36, 1], [43, 1]] }) }, // fundamental y quinta
    },
  },
}
export const OBRA_POR_DEFECTO = 'himno-alegria-escuela'
// Voces que se pueden tocar en el juego (una nota cada vez: el micro las sigue)
export const vocesJugables = obraId => Object.keys(OBRAS[obraId].voces).filter(v => !OBRAS[obraId].voces[v].tipo)
