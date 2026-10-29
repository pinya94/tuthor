// Temas de Español (gramática y ortografía). Los usan sus dos índices y la
// página de Español, que los enlaza directos para que cualquier examen quede a
// tres clics de la portada.

// Cada tema de gramática abre su página de elección (examen tipo test +
// mecánica Analiza la Frase).
export const TEMAS_GRAMATICA = [
  { id: 'sustantivos', titulo: { es: 'Sustantivos', en: 'Nouns', ca: 'Substantius' }, emoji: '📚', gradient: 'from-red-500 to-rose-600' },
  { id: 'adjetivos', titulo: { es: 'Adjetivos', en: 'Adjectives', ca: 'Adjectius' }, emoji: '🎨', gradient: 'from-pink-500 to-rose-600' },
  { id: 'determinantes', titulo: { es: 'Determinantes', en: 'Determiners', ca: 'Determinants' }, emoji: '🔖', gradient: 'from-amber-500 to-orange-600' },
  { id: 'pronombres', titulo: { es: 'Pronombres', en: 'Pronouns', ca: 'Pronoms' }, emoji: '🙋', gradient: 'from-lime-500 to-green-600' },
  { id: 'verbos', titulo: { es: 'Verbos', en: 'Verbs', ca: 'Verbs' }, emoji: '🏃', gradient: 'from-orange-500 to-amber-600' },
  { id: 'adverbios', titulo: { es: 'Adverbios', en: 'Adverbs', ca: 'Adverbis' }, emoji: '⏱️', gradient: 'from-teal-500 to-cyan-600' },
  { id: 'nexos', titulo: { es: 'Preposiciones y conjunciones', en: 'Prepositions & conjunctions', ca: 'Preposicions i conjuncions' }, emoji: '🔗', gradient: 'from-sky-500 to-blue-600' },
  { id: 'sintaxis', titulo: { es: 'Sintaxis', en: 'Syntax', ca: 'Sintaxi' }, emoji: '🔬', gradient: 'from-purple-500 to-violet-600' },
  { id: 'morfologia', titulo: { es: 'Género y número', en: 'Gender & number', ca: 'Gènere i nombre' }, emoji: '♀️', gradient: 'from-fuchsia-500 to-purple-600' },
]

// Los de ortografía van directos a su examen.
export const TEMAS_ORTOGRAFIA = [
  { id: 'acentuacion', titulo: { es: 'Acentuación', en: 'Accentuation', ca: 'Accentuació' }, emoji: '´', gradient: 'from-yellow-500 to-orange-500', gameId: 'espanol-ortografia-acentuacion-test' },
  { id: 'bv', titulo: { es: 'B y V', en: 'B and V', ca: 'B i V' }, emoji: '🔤', gradient: 'from-teal-500 to-cyan-600', gameId: 'espanol-ortografia-bv-test' },
  { id: 'gj', titulo: { es: 'G y J', en: 'G and J', ca: 'G i J' }, emoji: '🔡', gradient: 'from-violet-500 to-purple-700', gameId: 'espanol-ortografia-gj-test' },
  { id: 'letras', titulo: { es: 'H, LL/Y y C/Z', en: 'H, LL/Y and C/Z', ca: 'H, LL/Y i C/Z' }, emoji: '✍️', gradient: 'from-sky-500 to-indigo-700', gameId: 'espanol-ortografia-letras-test' },
  { id: 'puntuacion', titulo: { es: 'Puntuación', en: 'Punctuation', ca: 'Puntuació' }, emoji: '❓', gradient: 'from-rose-500 to-pink-700', gameId: 'espanol-ortografia-puntuacion-test' },
  { id: 'correccion', titulo: { es: 'Corregir un texto', en: 'Proofreading', ca: 'Corregir un text' }, emoji: '🔍', gradient: 'from-amber-500 to-orange-700', gameId: 'corrige-el-texto-test' },
]
