// Léxico de Analiza la Frase: UNA sola lista de conceptos con su forma en
// castellano, catalán e inglés y con las reglas de qué puede ir con qué.
//
// Por qué existe: antes cada idioma tenía sus bolsas sueltas (sujetos, verbos,
// objetos) y solo se distinguía persona/animal/cosa, así que salían frases
// gramaticales pero absurdas: «It reads the cars», «el niño rompe la manzana»,
// «The dog runs yesterday». Ahora cada palabra lleva etiquetas (tags) y cada
// verbo, adjetivo, preposición y adverbio dice qué etiquetas acepta. El motor
// (grammarGen.makeTemplates) solo elige combinaciones permitidas, y el test
// (analizaFrasesLexico.test.js) lo comprueba con miles de frases.
//
// REGLA PARA AMPLIAR: una palabra nueva entra en los tres idiomas a la vez
// (o con null donde no hay buena traducción) y con sus etiquetas; un verbo
// nuevo dice qué objetos (obj), sujetos (suj), adverbios (adv) y
// complementos (cc) acepta. Si una combinación no te sonaría bien en clase,
// no se etiqueta.
//
// Formas: es/ca = [singular, plural, género]; en = [singular, plural].

// ── Sustantivos ──────────────────────────────────────────────────────────────
// tipo: persona | animal | cosa. tags: lo que permite combinarlo.
//   leible, escrito, comida, dulce, portable, comprable, regalable, enviable,
//   prestable, guardable, pintable, dibujable, rompible, ensuciable, color,
//   duradero, alto, rapido, verde · lugar + interior/exterior/descanso
//   (los lugares dicen además qué sujetos caben en ellos: `caben`)
//   personas: joven = niños y alumnos (los que «saltan», «son pequeños»)
//   animales: mascota (perro, gato) o granja (caballo); pelaje = puede ser blanco
export const NOMBRES = [
  // Personas
  { id: 'nino', tipo: 'persona', tags: ['joven'], es: ['niño', 'niños', 'm'], ca: ['nen', 'nens', 'm'], en: ['boy', 'boys'] },
  { id: 'nina', tipo: 'persona', tags: ['joven'], es: ['niña', 'niñas', 'f'], ca: ['nena', 'nenes', 'f'], en: ['girl', 'girls'] },
  { id: 'profesor', tipo: 'persona', tags: [], es: ['profesor', 'profesores', 'm'], ca: ['professor', 'professors', 'm'], en: ['teacher', 'teachers'] },
  { id: 'profesora', tipo: 'persona', tags: [], es: ['profesora', 'profesoras', 'f'], ca: ['professora', 'professores', 'f'], en: ['teacher', 'teachers'] },
  { id: 'amigo', tipo: 'persona', tags: [], es: ['amigo', 'amigos', 'm'], ca: ['amic', 'amics', 'm'], en: ['friend', 'friends'] },
  { id: 'amiga', tipo: 'persona', tags: [], es: ['amiga', 'amigas', 'f'], ca: ['amiga', 'amigues', 'f'], en: ['friend', 'friends'] },
  { id: 'alumno', tipo: 'persona', tags: ['joven'], es: ['alumno', 'alumnos', 'm'], ca: ['alumne', 'alumnes', 'm'], en: ['student', 'students'] },
  { id: 'alumna', tipo: 'persona', tags: ['joven'], es: ['alumna', 'alumnas', 'f'], ca: ['alumna', 'alumnes', 'f'], en: ['student', 'students'] },
  { id: 'abuelo', tipo: 'persona', tags: [], es: ['abuelo', 'abuelos', 'm'], ca: ['avi', 'avis', 'm'], en: ['grandad', 'grandads'] },
  { id: 'abuela', tipo: 'persona', tags: [], es: ['abuela', 'abuelas', 'f'], ca: ['àvia', 'àvies', 'f'], en: ['grandma', 'grandmas'] },
  // Animales
  { id: 'perro', tipo: 'animal', tags: ['mascota', 'pelaje'], es: ['perro', 'perros', 'm'], ca: ['gos', 'gossos', 'm'], en: ['dog', 'dogs'] },
  { id: 'gato', tipo: 'animal', tags: ['mascota', 'pelaje'], es: ['gato', 'gatos', 'm'], ca: ['gat', 'gats', 'm'], en: ['cat', 'cats'] },
  { id: 'gata', tipo: 'animal', tags: ['mascota', 'pelaje'], es: ['gata', 'gatas', 'f'], ca: ['gata', 'gates', 'f'], en: ['cat', 'cats'] },
  { id: 'caballo', tipo: 'animal', tags: ['granja', 'pelaje', 'alto', 'rapido'], es: ['caballo', 'caballos', 'm'], ca: ['cavall', 'cavalls', 'm'], en: ['horse', 'horses'] },
  // Lugares (donde se corre, se duerme, se lee…). `caben`: qué sujetos tienen sentido allí.
  { id: 'casa', tipo: 'cosa', tags: ['lugar', 'interior', 'color', 'pintable', 'dibujable', 'comprable', 'ensuciable', 'duradero', 'alto'], caben: ['persona', 'mascota'], es: ['casa', 'casas', 'f'], ca: ['casa', 'cases', 'f'], en: ['house', 'houses'], enEn: 'in' },
  { id: 'cama', tipo: 'cosa', tags: ['lugar', 'descanso'], caben: ['persona', 'mascota'], es: ['cama', 'camas', 'f'], ca: ['llit', 'llits', 'm'], en: ['bed', 'beds'], enEn: 'in' },
  { id: 'parque', tipo: 'cosa', tags: ['lugar', 'exterior', 'natural'], caben: ['persona', 'mascota'], es: ['parque', 'parques', 'm'], ca: ['parc', 'parcs', 'm'], en: ['park', 'parks'], enEn: 'in' },
  { id: 'jardin', tipo: 'cosa', tags: ['lugar', 'exterior', 'natural'], caben: ['persona', 'mascota'], es: ['jardín', 'jardines', 'm'], ca: ['jardí', 'jardins', 'm'], en: ['garden', 'gardens'], enEn: 'in' },
  { id: 'playa', tipo: 'cosa', tags: ['lugar', 'exterior', 'natural'], caben: ['persona', 'mascota'], es: ['playa', 'playas', 'f'], ca: ['platja', 'platges', 'f'], en: ['beach', 'beaches'], enEn: 'on' },
  { id: 'calle', tipo: 'cosa', tags: ['lugar', 'exterior', 'ensuciable'], caben: ['persona', 'mascota'], es: ['calle', 'calles', 'f'], ca: ['carrer', 'carrers', 'm'], en: ['street', 'streets'], enEn: 'in' },
  { id: 'campo', tipo: 'cosa', tags: ['lugar', 'exterior', 'natural'], caben: ['persona', 'mascota', 'granja'], es: ['campo', 'campos', 'm'], ca: ['camp', 'camps', 'm'], en: ['field', 'fields'], enEn: 'in' },
  // Objetos
  { id: 'coche', tipo: 'cosa', tags: ['color', 'pintable', 'dibujable', 'comprable', 'ensuciable', 'duradero', 'rapido'], es: ['coche', 'coches', 'm'], ca: ['cotxe', 'cotxes', 'm'], en: ['car', 'cars'] },
  { id: 'mesa', tipo: 'cosa', tags: ['color', 'pintable', 'dibujable', 'comprable', 'rompible', 'ensuciable', 'duradero'], es: ['mesa', 'mesas', 'f'], ca: ['taula', 'taules', 'f'], en: ['table', 'tables'] },
  { id: 'silla', tipo: 'cosa', tags: ['color', 'pintable', 'dibujable', 'comprable', 'rompible', 'ensuciable', 'duradero'], es: ['silla', 'sillas', 'f'], ca: ['cadira', 'cadires', 'f'], en: ['chair', 'chairs'] },
  { id: 'valla', tipo: 'cosa', tags: ['color', 'pintable', 'rompible', 'duradero'], es: ['valla', 'vallas', 'f'], ca: ['tanca', 'tanques', 'f'], en: ['fence', 'fences'] },
  { id: 'ventana', tipo: 'cosa', tags: ['rompible', 'ensuciable'], es: ['ventana', 'ventanas', 'f'], ca: ['finestra', 'finestres', 'f'], en: ['window', 'windows'] },
  { id: 'libro', tipo: 'cosa', tags: ['leible', 'escrito', 'color', 'portable', 'comprable', 'regalable', 'enviable', 'prestable', 'guardable', 'duradero'], es: ['libro', 'libros', 'm'], ca: ['llibre', 'llibres', 'm'], en: ['book', 'books'] },
  { id: 'carta', tipo: 'cosa', tags: ['leible', 'escrito', 'portable', 'enviable', 'guardable'], es: ['carta', 'cartas', 'f'], ca: ['carta', 'cartes', 'f'], en: ['letter', 'letters'] },
  { id: 'cuento', tipo: 'cosa', tags: ['leible', 'escrito'], es: ['cuento', 'cuentos', 'm'], ca: ['conte', 'contes', 'm'], en: ['story', 'stories'] },
  { id: 'manzana', tipo: 'cosa', tags: ['comida', 'dulce', 'verde', 'portable', 'comprable', 'guardable', 'dibujable'], es: ['manzana', 'manzanas', 'f'], ca: ['poma', 'pomes', 'f'], en: ['apple', 'apples'] },
  { id: 'galleta', tipo: 'cosa', tags: ['comida', 'dulce', 'portable', 'comprable', 'guardable'], es: ['galleta', 'galletas', 'f'], ca: ['galeta', 'galetes', 'f'], en: ['biscuit', 'biscuits'] },
  { id: 'pastel', tipo: 'cosa', tags: ['comida', 'dulce', 'comprable', 'regalable'], es: ['pastel', 'pasteles', 'm'], ca: ['pastís', 'pastissos', 'm'], en: ['cake', 'cakes'] },
  { id: 'flor', tipo: 'cosa', tags: ['color', 'portable', 'comprable', 'regalable', 'enviable', 'dibujable'], es: ['flor', 'flores', 'f'], ca: ['flor', 'flors', 'f'], en: ['flower', 'flowers'] },
  { id: 'arbol', tipo: 'cosa', tags: ['dibujable', 'alto', 'verde', 'duradero'], es: ['árbol', 'árboles', 'm'], ca: ['arbre', 'arbres', 'm'], en: ['tree', 'trees'] },
  { id: 'pelota', tipo: 'cosa', tags: ['color', 'portable', 'comprable', 'regalable', 'prestable', 'guardable', 'dibujable', 'duradero'], es: ['pelota', 'pelotas', 'f'], ca: ['pilota', 'pilotes', 'f'], en: ['ball', 'balls'] },
  { id: 'regalo', tipo: 'cosa', tags: ['portable', 'comprable', 'enviable', 'guardable'], es: ['regalo', 'regalos', 'm'], ca: ['regal', 'regals', 'm'], en: ['present', 'presents'] },
  { id: 'cuadro', tipo: 'cosa', tags: ['pintable', 'comprable', 'regalable', 'rompible', 'duradero'], es: ['cuadro', 'cuadros', 'm'], ca: ['quadre', 'quadres', 'm'], en: ['painting', 'paintings'] },
]

// ── Adjetivos ────────────────────────────────────────────────────────────────
// para: tipos o tags de sustantivo con los que encaja. clase: cualidad (va
// también dentro del grupo nominal, «el perro blanco») o estado (solo tras
// estar/parecer: «el niño está cansado»).
// es/ca = [ms, fs, mp, fp]; en = palabra.
export const ADJETIVOS = [
  { id: 'rojo', clase: 'cualidad', para: ['color'], es: ['rojo', 'roja', 'rojos', 'rojas'], ca: ['vermell', 'vermella', 'vermells', 'vermelles'], en: 'red' },
  { id: 'azul', clase: 'cualidad', para: ['color'], es: ['azul', 'azul', 'azules', 'azules'], ca: ['blau', 'blava', 'blaus', 'blaves'], en: 'blue' },
  { id: 'blanco', clase: 'cualidad', para: ['color', 'pelaje'], es: ['blanco', 'blanca', 'blancos', 'blancas'], ca: ['blanc', 'blanca', 'blancs', 'blanques'], en: 'white' },
  { id: 'verde', clase: 'cualidad', para: ['color', 'verde'], es: ['verde', 'verde', 'verdes', 'verdes'], ca: ['verd', 'verda', 'verds', 'verdes'], en: 'green' },
  { id: 'pequeno', clase: 'cualidad', para: ['joven', 'animal', 'cosa'], es: ['pequeño', 'pequeña', 'pequeños', 'pequeñas'], ca: ['petit', 'petita', 'petits', 'petites'], en: 'small' },
  { id: 'grande', clase: 'cualidad', para: ['animal', 'cosa'], es: ['grande', 'grande', 'grandes', 'grandes'], ca: ['gran', 'gran', 'grans', 'grans'], en: 'big' },
  { id: 'bonito', clase: 'cualidad', para: ['animal', 'cosa'], es: ['bonito', 'bonita', 'bonitos', 'bonitas'], ca: ['bonic', 'bonica', 'bonics', 'boniques'], en: 'lovely' },
  { id: 'viejo', clase: 'cualidad', para: ['duradero', 'animal'], es: ['viejo', 'vieja', 'viejos', 'viejas'], ca: ['vell', 'vella', 'vells', 'velles'], en: 'old' },
  { id: 'nuevo', clase: 'cualidad', para: ['duradero'], es: ['nuevo', 'nueva', 'nuevos', 'nuevas'], ca: ['nou', 'nova', 'nous', 'noves'], en: 'new' },
  { id: 'alto', clase: 'cualidad', para: ['persona', 'alto'], es: ['alto', 'alta', 'altos', 'altas'], ca: ['alt', 'alta', 'alts', 'altes'], en: 'tall' },
  { id: 'rapido', clase: 'cualidad', para: ['joven', 'mascota', 'rapido'], es: ['rápido', 'rápida', 'rápidos', 'rápidas'], ca: ['ràpid', 'ràpida', 'ràpids', 'ràpides'], en: 'fast' },
  { id: 'simpatico', clase: 'cualidad', para: ['persona', 'mascota'], es: ['simpático', 'simpática', 'simpáticos', 'simpáticas'], ca: ['simpàtic', 'simpàtica', 'simpàtics', 'simpàtiques'], en: 'friendly' },
  { id: 'dulce', clase: 'cualidad', para: ['dulce'], es: ['dulce', 'dulce', 'dulces', 'dulces'], ca: ['dolç', 'dolça', 'dolços', 'dolces'], en: 'sweet' },
  { id: 'contento', clase: 'estado', para: ['persona', 'animal'], es: ['contento', 'contenta', 'contentos', 'contentas'], ca: ['content', 'contenta', 'contents', 'contentes'], en: 'happy' },
  { id: 'cansado', clase: 'estado', para: ['persona', 'animal'], es: ['cansado', 'cansada', 'cansados', 'cansadas'], ca: ['cansat', 'cansada', 'cansats', 'cansades'], en: 'tired' },
  { id: 'limpio', clase: 'estado', para: ['ensuciable', 'persona', 'animal'], es: ['limpio', 'limpia', 'limpios', 'limpias'], ca: ['net', 'neta', 'nets', 'netes'], en: 'clean' },
  { id: 'sucio', clase: 'estado', para: ['ensuciable', 'persona', 'animal'], es: ['sucio', 'sucia', 'sucios', 'sucias'], ca: ['brut', 'bruta', 'bruts', 'brutes'], en: 'dirty' },
  { id: 'roto', clase: 'estado', para: ['rompible'], es: ['roto', 'rota', 'rotos', 'rotas'], ca: ['trencat', 'trencada', 'trencats', 'trencades'], en: 'broken' },
]

// ── Adverbios ────────────────────────────────────────────────────────────────
// Solo los que caben AL FINAL de una frase en presente. Fuera «ayer» (el verbo
// va en presente: «el perro corre ayer») y en inglés «always» (va antes del
// verbo). null = no se usa en ese idioma.
export const ADVERBIOS = [
  { id: 'hoy', es: 'hoy', ca: 'avui', en: 'today' },
  { id: 'ahora', es: 'ahora', ca: 'ara', en: 'now' },
  { id: 'siempre', es: 'siempre', ca: 'sempre', en: null },
  { id: 'mucho', es: 'mucho', ca: 'molt', en: null },
  { id: 'poco', es: 'poco', ca: 'poc', en: null },
  { id: 'bien', es: 'bien', ca: 'bé', en: 'well' },
  { id: 'deprisa', es: 'deprisa', ca: 'ràpidament', en: 'quickly' },
  { id: 'despacio', es: 'despacio', ca: 'lentament', en: 'slowly' },
  { id: 'lejos', es: 'lejos', ca: 'lluny', en: 'far' },
  { id: 'fuera', es: 'fuera', ca: 'fora', en: 'outside' },
  { id: 'aqui', es: 'aquí', ca: 'aquí', en: 'here' },
]

// ── Preposiciones de los complementos ────────────────────────────────────────
// `en` del inglés depende del sitio (in the park, on the beach): lo dice el
// lugar con `enEn`.
export const PREPS = {
  en: { es: 'en', ca: 'a', en: null },
  por: { es: 'por', ca: 'per', en: 'around' },
  con: { es: 'con', ca: 'amb', en: 'with' },
  ci: { es: 'a', ca: 'a', en: 'to' },
}

// ── Verbos ───────────────────────────────────────────────────────────────────
// Transitivos: sujeto persona; obj = tags que acepta como CD; enLugar = admite
// «… en la casa / en el parque» (frase larga de Bachillerato).
export const TRANSITIVOS = [
  { id: 'comer', obj: ['comida'], enLugar: true, es: ['come', 'comen'], ca: ['menja', 'mengen'], en: ['eats', 'eat'] },
  { id: 'leer', obj: ['leible'], enLugar: true, es: ['lee', 'leen'], ca: ['llegeix', 'llegeixen'], en: ['reads', 'read'] },
  { id: 'escribir', obj: ['escrito'], enLugar: true, es: ['escribe', 'escriben'], ca: ['escriu', 'escriuen'], en: ['writes', 'write'] },
  { id: 'dibujar', obj: ['dibujable'], enLugar: true, es: ['dibuja', 'dibujan'], ca: ['dibuixa', 'dibuixen'], en: ['draws', 'draw'] },
  { id: 'comprar', obj: ['comprable'], es: ['compra', 'compran'], ca: ['compra', 'compren'], en: ['buys', 'buy'] },
  { id: 'pintar', obj: ['pintable'], es: ['pinta', 'pintan'], ca: ['pinta', 'pinten'], en: ['paints', 'paint'] },
  { id: 'guardar', obj: ['guardable'], es: ['guarda', 'guardan'], ca: ['guarda', 'guarden'], en: ['keeps', 'keep'] },
  { id: 'romper', obj: ['rompible'], es: ['rompe', 'rompen'], ca: ['trenca', 'trenquen'], en: ['breaks', 'break'] },
  { id: 'limpiar', obj: ['ensuciable'], es: ['limpia', 'limpian'], ca: ['neteja', 'netegen'], en: ['cleans', 'clean'] },
]

// Ditransitivos: sujeto persona, CD con estos tags y CI una persona.
export const DITRANSITIVOS = [
  { id: 'dar', obj: ['portable'], es: ['da', 'dan'], ca: ['dona', 'donen'], en: ['gives', 'give'] },
  { id: 'regalar', obj: ['regalable'], es: ['regala', 'regalan'], ca: ['regala', 'regalen'], en: null },
  { id: 'enviar', obj: ['enviable'], es: ['envía', 'envían'], ca: ['envia', 'envien'], en: ['sends', 'send'] },
  { id: 'prestar', obj: ['prestable'], es: ['presta', 'prestan'], ca: ['deixa', 'deixen'], en: ['lends', 'lend'] },
  { id: 'ensenar', obj: ['portable'], es: ['enseña', 'enseñan'], ca: ['ensenya', 'ensenyen'], en: ['shows', 'show'] },
]

// Intransitivos: suj = qué sujetos (persona, joven, mascota, granja); adv = adverbios
// que le caben; cc = complementos con preposición: lugar (con estos tags) o
// compañía («con el perro», con estos sujetos).
export const INTRANSITIVOS = [
  { id: 'correr', suj: ['persona', 'mascota', 'granja'], adv: ['hoy', 'ahora', 'siempre', 'mucho', 'deprisa', 'despacio', 'lejos', 'fuera'],
    cc: [{ prep: 'en', lugar: ['exterior'] }, { prep: 'por', lugar: ['exterior'] }, { prep: 'con', comp: ['persona', 'mascota'] }],
    es: ['corre', 'corren'], ca: ['corre', 'corren'], en: ['runs', 'run'] },
  { id: 'saltar', suj: ['joven', 'mascota', 'granja'], adv: ['hoy', 'ahora', 'mucho', 'lejos', 'bien'],
    cc: [{ prep: 'en', lugar: ['exterior'] }],
    es: ['salta', 'saltan'], ca: ['salta', 'salten'], en: ['jumps', 'jump'] },
  { id: 'dormir', suj: ['persona', 'mascota', 'granja'], adv: ['hoy', 'ahora', 'mucho', 'poco', 'bien', 'fuera'],
    cc: [{ prep: 'en', lugar: ['interior', 'descanso'] }],
    es: ['duerme', 'duermen'], ca: ['dorm', 'dormen'], en: ['sleeps', 'sleep'] },
  { id: 'jugar', suj: ['persona', 'mascota'], adv: ['hoy', 'ahora', 'siempre', 'mucho', 'bien', 'fuera', 'aqui'],
    cc: [{ prep: 'en', lugar: ['interior', 'exterior'] }, { prep: 'con', comp: ['persona', 'mascota'] }],
    es: ['juega', 'juegan'], ca: ['juga', 'juguen'], en: ['plays', 'play'] },
  { id: 'pasear', suj: ['persona', 'mascota', 'granja'], adv: ['hoy', 'ahora', 'siempre', 'mucho', 'despacio'],
    cc: [{ prep: 'por', lugar: ['exterior'] }, { prep: 'con', comp: ['persona', 'mascota'] }],
    es: ['pasea', 'pasean'], ca: ['passeja', 'passegen'], en: ['walks', 'walk'] },
  { id: 'descansar', suj: ['persona', 'mascota', 'granja'], adv: ['hoy', 'ahora', 'poco', 'aqui', 'fuera'],
    cc: [{ prep: 'en', lugar: ['interior', 'descanso', 'natural'] }],
    es: ['descansa', 'descansan'], ca: ['descansa', 'descansen'], en: ['rests', 'rest'] },
  { id: 'cantar', suj: ['persona'], adv: ['hoy', 'ahora', 'siempre', 'mucho', 'bien'],
    cc: [{ prep: 'en', lugar: ['interior', 'exterior'] }, { prep: 'con', comp: ['persona'] }],
    es: ['canta', 'cantan'], ca: ['canta', 'canten'], en: ['sings', 'sing'] },
  { id: 'reir', suj: ['persona'], adv: ['hoy', 'ahora', 'siempre', 'mucho', 'poco'],
    cc: [{ prep: 'con', comp: ['persona'] }],
    es: ['ríe', 'ríen'], ca: ['riu', 'riuen'], en: ['laughs', 'laugh'] },
]

// Copulativos: qué clase de adjetivo admite como atributo en cada idioma
// (ser = cualidad, estar = estado, parecer y el «is» inglés = los dos).
export const COPULATIVOS = [
  { id: 'ser', es: ['es', 'son', 'cualidad'], ca: ['és', 'són', 'cualidad'], en: ['is', 'are', 'ambos'] },
  { id: 'estar', es: ['está', 'están', 'estado'], ca: ['està', 'estan', 'estado'], en: null },
  { id: 'parecer', es: ['parece', 'parecen', 'ambos'], ca: ['sembla', 'semblen', 'ambos'], en: ['seems', 'seem', 'ambos'] },
  { id: 'look', es: null, ca: null, en: ['looks', 'look', 'ambos'] },
]

// ── Lo propio de cada idioma: artículos y pronombres sujeto ──────────────────
export const IDIOMA = {
  es: {
    det: { def: { ms: 'el', fs: 'la', mp: 'los', fp: 'las' }, ind: { ms: 'un', fs: 'una', mp: 'unos', fp: 'unas' } },
    pron: [{ t: 'Él', gen: 'm', num: 'sg' }, { t: 'Ella', gen: 'f', num: 'sg' }, { t: 'Ellos', gen: 'm', num: 'pl' }, { t: 'Ellas', gen: 'f', num: 'pl' }],
  },
  ca: {
    det: { def: { ms: 'el', fs: 'la', mp: 'els', fp: 'les' }, ind: { ms: 'un', fs: 'una', mp: 'uns', fp: 'unes' } },
    pron: [{ t: 'Ell', gen: 'm', num: 'sg' }, { t: 'Ella', gen: 'f', num: 'sg' }, { t: 'Ells', gen: 'm', num: 'pl' }, { t: 'Elles', gen: 'f', num: 'pl' }],
  },
  en: {
    // a/an se decide por la palabra siguiente; en plural el indefinido no lleva artículo
    det: { def: { sg: 'the', pl: 'the' }, ind: { sg: 'a', pl: null } },
    pron: [{ t: 'He', num: 'sg' }, { t: 'She', num: 'sg' }, { t: 'They', num: 'pl' }],
  },
}
