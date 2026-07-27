// Frases fijas "un poco más largas": oraciones COORDINADAS (rank 1, ESO) y
// SUBORDINADAS (rank 2, Bachillerato). Se escriben a mano y se etiqueta cada
// palabra por su clase (+ género/número); las respuestas correctas se derivan
// solas con annFromUnits (no hay que calcular índices). No se anotan funciones
// sintácticas (sujeto/predicado): estas frases lucen las CONJUNCIONES, los
// VERBOS (varios) y las clases de palabras. Ver [[analiza-frases]].

// Atajos de etiquetado con género/número (español/catalán)
const A = (t, g, n) => ({ text: t, classes: ['determinante', 'articulo'], roles: [], gen: g, num: n })
const N = (t, g, n) => ({ text: t, classes: ['sustantivo'], roles: [], gen: g, num: n })
const J = (t, g, n) => ({ text: t, classes: ['adjetivo'], roles: [], gen: g, num: n })
const V = t => ({ text: t, classes: ['verbo'], roles: [] })
const C = t => ({ text: t, classes: ['conjuncion'], roles: [] })
const R = t => ({ text: t, classes: ['preposicion'], roles: [] })
const D = t => ({ text: t, classes: ['adverbio'], roles: [] })
const P = (t, n) => ({ text: t, classes: ['pronombre'], roles: [], num: n })
// Inglés (sin género): solo número
const eA = (t, n) => ({ text: t, classes: ['determinante', 'articulo'], roles: [], num: n })
const eN = (t, n) => ({ text: t, classes: ['sustantivo'], roles: [], num: n })
const eJ = t => ({ text: t, classes: ['adjetivo'], roles: [] })

export const FIJAS_ES = [
  // ── Coordinadas (rank 1) ──
  { rank: 1, units: [A('El', 'm', 'sg'), N('niño', 'm', 'sg'), V('corre'), C('y'), A('la', 'f', 'sg'), N('niña', 'f', 'sg'), V('salta')] },
  { rank: 1, units: [A('El', 'm', 'sg'), N('perro', 'm', 'sg'), V('duerme'), C('pero'), A('el', 'm', 'sg'), N('gato', 'm', 'sg'), V('juega')] },
  { rank: 1, units: [A('Los', 'm', 'pl'), N('alumnos', 'm', 'pl'), V('leen'), C('y'), V('escriben')] },
  { rank: 1, units: [A('La', 'f', 'sg'), N('profesora', 'f', 'sg'), V('canta'), C('o'), V('baila')] },
  { rank: 1, units: [A('El', 'm', 'sg'), N('coche', 'm', 'sg'), V('es'), J('viejo', 'm', 'sg'), C('pero'), J('rápido', 'm', 'sg')] },
  { rank: 1, units: [A('La', 'f', 'sg'), N('niña', 'f', 'sg'), V('salta'), C('y'), V('ríe')] },
  { rank: 1, units: [A('El', 'm', 'sg'), N('gato', 'm', 'sg'), V('bebe'), C('y'), V('descansa')] },
  { rank: 1, units: [A('Los', 'm', 'pl'), N('amigos', 'm', 'pl'), V('juegan'), C('y'), V('cantan')] },
  // ── Subordinadas (rank 2) ──
  { rank: 2, units: [A('El', 'm', 'sg'), N('niño', 'm', 'sg'), V('dice'), C('que'), A('la', 'f', 'sg'), N('niña', 'f', 'sg'), V('miente')] },
  { rank: 2, units: [C('Cuando'), V('llueve'), A('los', 'm', 'pl'), N('alumnos', 'm', 'pl'), V('leen'), D('dentro')] },
  { rank: 2, units: [A('El', 'm', 'sg'), N('perro', 'm', 'sg'), V('ladra'), C('porque'), V('tiene'), N('hambre', 'f', 'sg')] },
  { rank: 2, units: [C('Aunque'), V('está'), J('cansado', 'm', 'sg'), A('el', 'm', 'sg'), N('profesor', 'm', 'sg'), V('trabaja')] },
  { rank: 2, units: [A('El', 'm', 'sg'), N('alumno', 'm', 'sg'), V('estudia'), C('mientras'), V('escucha'), N('música', 'f', 'sg')] },
  { rank: 2, units: [C('Si'), V('estudias'), D('mucho'), V('apruebas')] },
]

export const FIJAS_CA = [
  // ── Coordinades (rank 1) ──
  { rank: 1, units: [A('El', 'm', 'sg'), N('nen', 'm', 'sg'), V('corre'), C('i'), A('la', 'f', 'sg'), N('nena', 'f', 'sg'), V('salta')] },
  { rank: 1, units: [A('El', 'm', 'sg'), N('gos', 'm', 'sg'), V('dorm'), C('però'), A('el', 'm', 'sg'), N('gat', 'm', 'sg'), V('juga')] },
  { rank: 1, units: [A('Els', 'm', 'pl'), N('alumnes', 'm', 'pl'), V('llegeixen'), C('i'), V('escriuen')] },
  { rank: 1, units: [A('La', 'f', 'sg'), N('professora', 'f', 'sg'), V('canta'), C('o'), V('balla')] },
  { rank: 1, units: [A('El', 'm', 'sg'), N('cotxe', 'm', 'sg'), V('és'), J('vell', 'm', 'sg'), C('però'), J('ràpid', 'm', 'sg')] },
  { rank: 1, units: [A('La', 'f', 'sg'), N('nena', 'f', 'sg'), V('salta'), C('i'), V('riu')] },
  { rank: 1, units: [A('El', 'm', 'sg'), N('gat', 'm', 'sg'), V('beu'), C('i'), V('descansa')] },
  { rank: 1, units: [A('Els', 'm', 'pl'), N('amics', 'm', 'pl'), V('juguen'), C('i'), V('canten')] },
  // ── Subordinades (rank 2) ──
  { rank: 2, units: [A('El', 'm', 'sg'), N('nen', 'm', 'sg'), V('diu'), C('que'), A('la', 'f', 'sg'), N('nena', 'f', 'sg'), V('menteix')] },
  { rank: 2, units: [C('Quan'), V('plou'), A('els', 'm', 'pl'), N('alumnes', 'm', 'pl'), V('llegeixen'), D('dins')] },
  { rank: 2, units: [A('El', 'm', 'sg'), N('gos', 'm', 'sg'), V('lladra'), C('perquè'), V('té'), N('gana', 'f', 'sg')] },
  { rank: 2, units: [C('Encara'), C('que'), V('està'), J('cansat', 'm', 'sg'), A('el', 'm', 'sg'), N('professor', 'm', 'sg'), V('treballa')] },
  { rank: 2, units: [A("L'", 'm', 'sg'), N('alumne', 'm', 'sg'), V('estudia'), C('mentre'), V('escolta'), N('música', 'f', 'sg')] },
  { rank: 2, units: [C('Si'), V('estudies'), D('molt'), V('aproves')] },
]

export const FIJAS_EN = [
  // ── Coordinated (rank 1) ──
  { rank: 1, units: [eA('The', 'sg'), eN('boy', 'sg'), V('runs'), C('and'), eA('the', 'sg'), eN('girl', 'sg'), V('jumps')] },
  { rank: 1, units: [eA('The', 'sg'), eN('dog', 'sg'), V('sleeps'), C('but'), eA('the', 'sg'), eN('cat', 'sg'), V('plays')] },
  { rank: 1, units: [eA('The', 'pl'), eN('students', 'pl'), V('read'), C('and'), V('write')] },
  { rank: 1, units: [eA('The', 'sg'), eN('teacher', 'sg'), V('sings'), C('or'), V('dances')] },
  { rank: 1, units: [eA('The', 'sg'), eN('car', 'sg'), V('is'), eJ('old'), C('but'), eJ('fast')] },
  { rank: 1, units: [eA('The', 'sg'), eN('girl', 'sg'), V('jumps'), C('and'), V('laughs')] },
  { rank: 1, units: [eA('The', 'sg'), eN('cat', 'sg'), V('drinks'), C('and'), V('rests')] },
  { rank: 1, units: [eA('The', 'pl'), eN('friends', 'pl'), V('play'), C('and'), V('sing')] },
  // ── Subordinate (rank 2) ──
  { rank: 2, units: [eA('The', 'sg'), eN('boy', 'sg'), V('says'), C('that'), eA('the', 'sg'), eN('girl', 'sg'), V('lies')] },
  { rank: 2, units: [C('When'), P('it', 'sg'), V('rains'), eA('the', 'pl'), eN('students', 'pl'), V('read'), D('inside')] },
  { rank: 2, units: [eA('The', 'sg'), eN('dog', 'sg'), V('barks'), C('because'), P('it', 'sg'), V('is'), eJ('hungry')] },
  { rank: 2, units: [C('Although'), P('he', 'sg'), V('is'), eJ('tired'), eA('the', 'sg'), eN('teacher', 'sg'), V('works')] },
  { rank: 2, units: [eA('The', 'sg'), eN('student', 'sg'), V('studies'), C('while'), P('he', 'sg'), V('listens'), R('to'), eN('music', 'sg')] },
  { rank: 2, units: [C('If'), P('you'), V('study'), D('hard'), P('you'), V('pass')] },
]

export const FIJAS = { es: FIJAS_ES, ca: FIJAS_CA, en: FIJAS_EN }
