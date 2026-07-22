// ── Disciplinas de Ciencias ──────────────────────────────────────────────────
// Fuente única de verdad para las cuatro asignaturas de ciencias (Física,
// Química, Biología, Geología y el Universo) y a qué disciplina pertenece cada
// tema. Antes todo colgaba de un único índice "Ciencias" (/estudiar/quimica);
// ahora cada disciplina es una asignatura propia en Estudiar, con su ruta:
//   /estudiar/quimica · /estudiar/fisica · /estudiar/biologia · /estudiar/geologia
// y sus temas en /estudiar/<disciplina>/<tema>.
//
// La metadata visual de cada tema (título, subtítulo, tags, niveles) sigue en
// QuimicaIndex; aquí vive solo la taxonomía compartida, que necesitan también
// módulos que no pueden importar la página (scripts/seoMeta, exámenes, ciclos).

export const DISCIPLINAS = [
  {
    id: 'quimica', emoji: '⚗️', gradient: 'from-violet-500 to-purple-700',
    label: { es: 'Química', en: 'Chemistry', ca: 'Química' },
    subtitulo: { es: 'Tabla periódica, materia, mezclas, ácidos y átomos', en: 'Periodic table, matter, mixtures, acids and atoms', ca: 'Taula periòdica, matèria, mescles, àcids i àtoms' },
  },
  {
    id: 'fisica', emoji: '⚡', gradient: 'from-yellow-500 to-orange-600',
    label: { es: 'Física', en: 'Physics', ca: 'Física' },
    subtitulo: { es: 'Fuerzas, energía, electricidad, ondas y luz', en: 'Forces, energy, electricity, waves and light', ca: 'Forces, energia, electricitat, ones i llum' },
  },
  {
    id: 'biologia', emoji: '🧬', gradient: 'from-green-500 to-emerald-600',
    label: { es: 'Biología', en: 'Biology', ca: 'Biologia' },
    subtitulo: { es: 'Célula, cuerpo humano, seres vivos, ecosistemas y genética', en: 'Cell, human body, living things, ecosystems and genetics', ca: 'Cèl·lula, cos humà, éssers vius, ecosistemes i genètica' },
  },
  {
    id: 'geologia', emoji: '🪐', gradient: 'from-stone-500 to-neutral-700',
    label: { es: 'Geología y el Universo', en: 'Geology & the Universe', ca: "Geologia i l'Univers" },
    subtitulo: { es: 'Rocas, minerales y el sistema solar', en: 'Rocks, minerals and the solar system', ca: 'Roques, minerals i el sistema solar' },
  },
]

// Tema de ciencias → disciplina. Cada tema aparece exactamente una vez.
export const TEMA_DISCIPLINA = {
  'tabla-periodica':    'quimica',
  'estados-materia':    'quimica',
  'mezclas-separacion': 'quimica',
  'acidos-bases':       'quimica',
  'atomos-moleculas':   'quimica',
  'fuerzas':            'fisica',
  'energia':            'fisica',
  'electricidad':       'fisica',
  'ondas-luz':          'fisica',
  'celula':             'biologia',
  'cuerpo-humano':      'biologia',
  'seres-vivos':        'biologia',
  'ecosistemas':        'biologia',
  'genetica':           'biologia',
  'nutricion':          'biologia',
  'rocas-minerales':    'geologia',
  'sistema-solar':      'geologia',
}

export const DISCIPLINA_IDS = DISCIPLINAS.map(d => d.id)

export function getDisciplina(id) {
  return DISCIPLINAS.find(d => d.id === id) ?? null
}

// Disciplina de un tema (cae a 'quimica' por seguridad si el tema no está mapeado).
export function disciplinaDeTema(temaId) {
  return TEMA_DISCIPLINA[temaId] ?? 'quimica'
}

// Ruta de la ficha de un tema dentro de su disciplina.
export function rutaTema(temaId) {
  return `/estudiar/${disciplinaDeTema(temaId)}/${temaId}`
}
