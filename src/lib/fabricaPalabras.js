// La Fábrica de Palabras (lengua · vocabulario: prefijos, sufijos, sinónimos y
// antónimos). Solo en castellano: es la formación de palabras del castellano.
//
// Mecánicas (nada de elegir entre cuatro):
//   construir  una definición («Persona que hace o vende zapatos») y una base
//              (zapat-): se pega el prefijo o el sufijo que toca de una paleta
//              de piezas. Tipos: sufijo, prefijo y negacion (in-, im-, i-, des-).
//   parejas    cuatro palabras a cada lado: se unen sinónimos o antónimos.
//
// Para que solo haya UNA respuesta buena:
//   · las piezas trampa nunca son del mismo grupo de significado que la buena
//     (si la respuesta es «cantante», -or no puede salir: «cantor» también
//     vale); salvo en negación, donde la trampa es justo la ortografía
//     (inposible / imposible / ilegal);
//   · en parejas, dos pares del mismo grupo (alto–bajo y grande–pequeño)
//     nunca salen juntos, porque se podrían cruzar.

const s = (l, es) => es // juego solo en castellano

// ── Piezas ───────────────────────────────────────────────────────────────
// grupo: significado; las trampas salen de grupos distintos
export const AFIJOS = {
  // sufijos
  '-ero': { tipo: 'suf', grupo: 'agente', sig: 'oficio o persona que vende o hace algo; también recipiente (florero)' },
  '-ista': { tipo: 'suf', grupo: 'agente', sig: 'profesión o persona que se dedica a algo' },
  '-ador': { tipo: 'suf', grupo: 'agente', sig: 'persona que hace la acción' },
  '-or': { tipo: 'suf', grupo: 'agente', sig: 'persona que hace la acción' },
  '-tor': { tipo: 'suf', grupo: 'agente', sig: 'persona que hace la acción' },
  '-ante': { tipo: 'suf', grupo: 'agente', sig: 'persona que hace la acción' },
  '-ería': { tipo: 'suf', grupo: 'lugar', sig: 'tienda o lugar donde se vende o se hace algo' },
  '-eda': { tipo: 'suf', grupo: 'lugar', sig: 'lugar donde hay muchos de algo' },
  '-ito': { tipo: 'suf', grupo: 'dim', sig: 'diminutivo: más pequeño' },
  '-ita': { tipo: 'suf', grupo: 'dim', sig: 'diminutivo: más pequeña' },
  '-oso': { tipo: 'suf', grupo: 'cualidad', sig: 'que tiene mucho de algo' },
  '-able': { tipo: 'suf', grupo: 'cualidad', sig: 'que se puede hacer' },
  '-mente': { tipo: 'suf', grupo: 'modo', sig: 'forma adverbios de modo: «de forma…»' },
  '-ación': { tipo: 'suf', grupo: 'accion', sig: 'acción o efecto de hacer algo' },
  '-miento': { tipo: 'suf', grupo: 'accion', sig: 'acción o efecto de hacer algo' },
  '-ada': { tipo: 'suf', grupo: 'ada', sig: 'golpe o contenido de algo (patada, cucharada)' },
  '-idad': { tipo: 'suf', grupo: 'nombreCualidad', sig: 'cualidad (convierte un adjetivo en nombre)' },
  '-eza': { tipo: 'suf', grupo: 'nombreCualidad', sig: 'cualidad (convierte un adjetivo en nombre)' },
  '-ez': { tipo: 'suf', grupo: 'nombreCualidad', sig: 'cualidad o etapa (convierte un adjetivo en nombre)' },
  // prefijos
  're-': { tipo: 'pre', grupo: 'repeticion', sig: 'volver a hacer algo' },
  'pre-': { tipo: 'pre', grupo: 'antes', sig: 'antes de' },
  'ante-': { tipo: 'pre', grupo: 'antes', sig: 'antes de' },
  'pos-': { tipo: 'pre', grupo: 'despues', sig: 'después de' },
  'sub-': { tipo: 'pre', grupo: 'debajo', sig: 'debajo de' },
  'super-': { tipo: 'pre', grupo: 'encima', sig: 'encima de o en grado muy alto' },
  'sobre-': { tipo: 'pre', grupo: 'encima', sig: 'encima de o en exceso' },
  'anti-': { tipo: 'pre', grupo: 'contra', sig: 'contra' },
  'contra-': { tipo: 'pre', grupo: 'contra', sig: 'en oposición a, como respuesta a' },
  'multi-': { tipo: 'pre', grupo: 'muchos', sig: 'muchos' },
  'ex-': { tipo: 'pre', grupo: 'ex', sig: 'que fue y ya no es' },
  'inter-': { tipo: 'pre', grupo: 'entre', sig: 'entre varios' },
  'trans-': { tipo: 'pre', grupo: 'traves', sig: 'al otro lado, a través de' },
  // negación (la trampa es la ortografía: in-, im-, i- son el mismo prefijo)
  'in-': { tipo: 'pre', grupo: 'neg', sig: 'negación: «no»' },
  'im-': { tipo: 'pre', grupo: 'neg', sig: 'negación: es in- delante de p y b' },
  'i-': { tipo: 'pre', grupo: 'neg', sig: 'negación: es in- delante de l y r' },
  'des-': { tipo: 'pre', grupo: 'neg', sig: 'negación o lo contrario de una acción' },
}

// [palabra, definición, prefijo | null, base, sufijo | null, nivel]
// nivel 1 = Primaria, 2 = 5.º-6.º y 1.º ESO, 3 = ESO
const W = (palabra, def, pre, base, suf, nivel) => ({ id: palabra, palabra, def, pre, base, suf, nivel })
export const PALABRAS = [
  // sufijos
  W('zapatero', 'Persona que hace o vende zapatos', null, 'zapat', '-ero', 1),
  W('cocinero', 'Persona que cocina', null, 'cocin', '-ero', 1),
  W('jardinero', 'Persona que cuida un jardín', null, 'jardin', '-ero', 1),
  W('librería', 'Tienda donde se venden libros', null, 'libr', '-ería', 1),
  W('frutería', 'Tienda donde se vende fruta', null, 'frut', '-ería', 1),
  W('casita', 'Casa pequeña', null, 'cas', '-ita', 1),
  W('perrito', 'Perro pequeño', null, 'perr', '-ito', 1),
  W('florero', 'Recipiente para poner flores', null, 'flor', '-ero', 1),
  W('dentista', 'Médico que cuida los dientes', null, 'dent', '-ista', 1),
  W('pianista', 'Persona que toca el piano', null, 'pian', '-ista', 1),
  W('nadador', 'Persona que nada', null, 'nad', '-ador', 1),
  W('pintor', 'Persona que pinta', null, 'pint', '-or', 1),
  W('cantante', 'Persona que canta', null, 'cant', '-ante', 2),
  W('arboleda', 'Lugar con muchos árboles', null, 'arbol', '-eda', 2),
  W('cariñoso', 'Que da mucho cariño', null, 'cariñ', '-oso', 2),
  W('miedoso', 'Que tiene miedo con facilidad', null, 'mied', '-oso', 2),
  W('rápidamente', 'De forma rápida', null, 'rápida', '-mente', 2),
  W('felizmente', 'De forma feliz', null, 'feliz', '-mente', 2),
  W('explicación', 'Acción de explicar', null, 'explic', '-ación', 2),
  W('conductor', 'Persona que conduce', null, 'conduc', '-tor', 2),
  W('cucharada', 'Lo que cabe en una cuchara', null, 'cuchar', '-ada', 2),
  W('patada', 'Golpe dado con el pie', null, 'pat', '-ada', 2),
  W('lavable', 'Que se puede lavar', null, 'lav', '-able', 3),
  W('crecimiento', 'Acción de crecer', null, 'creci', '-miento', 3),
  W('tranquilidad', 'Cualidad de estar tranquilo', null, 'tranquil', '-idad', 3),
  W('belleza', 'Cualidad de ser bello', null, 'bell', '-eza', 3),
  W('niñez', 'Etapa de la vida en que se es niño', null, 'niñ', '-ez', 3),
  // prefijos
  W('rehacer', 'Volver a hacer', 're-', 'hacer', null, 2),
  W('releer', 'Volver a leer', 're-', 'leer', null, 2),
  W('prehistoria', 'Época anterior a la historia escrita', 'pre-', 'historia', null, 2),
  W('submarino', 'Que va por debajo del mar', 'sub-', 'marino', null, 2),
  W('supermercado', 'Mercado muy grande donde uno mismo coge los productos', 'super-', 'mercado', null, 2),
  W('antiniebla', 'Que sirve contra la niebla', 'anti-', 'niebla', null, 2),
  W('multicolor', 'De muchos colores', 'multi-', 'color', null, 2),
  W('expresidente', 'Persona que fue presidente', 'ex-', 'presidente', null, 2),
  W('intercambiar', 'Cambiarse algo entre dos o más personas', 'inter-', 'cambiar', null, 3),
  W('sobrecargar', 'Cargar en exceso', 'sobre-', 'cargar', null, 3),
  W('contraataque', 'Ataque que responde a otro', 'contra-', 'ataque', null, 3),
  W('transatlántico', 'Que cruza el océano Atlántico', 'trans-', 'atlántico', null, 3),
  W('posguerra', 'Época posterior a una guerra', 'pos-', 'guerra', null, 3),
  W('anteayer', 'El día antes de ayer', 'ante-', 'ayer', null, 3),
  // negación
  W('imposible', 'Que no es posible', 'im-', 'posible', null, 2),
  W('inútil', 'Que no es útil', 'in-', 'útil', null, 2),
  W('infeliz', 'Que no es feliz', 'in-', 'feliz', null, 2),
  W('desconocido', 'Que no es conocido', 'des-', 'conocido', null, 2),
  W('desordenado', 'Que no está ordenado', 'des-', 'ordenado', null, 2),
  W('desatar', 'Lo contrario de atar', 'des-', 'atar', null, 2),
  W('destapar', 'Lo contrario de tapar', 'des-', 'tapar', null, 2),
  W('ilegal', 'Que no es legal', 'i-', 'legal', null, 3),
  W('ilógico', 'Que no es lógico', 'i-', 'lógico', null, 3),
  W('impaciente', 'Que no es paciente', 'im-', 'paciente', null, 3),
  W('impuro', 'Que no es puro', 'im-', 'puro', null, 3),
  W('inmaduro', 'Que no es maduro', 'in-', 'maduro', null, 3),
  W('incómodo', 'Que no es cómodo', 'in-', 'cómodo', null, 3),
  W('desobedecer', 'No obedecer', 'des-', 'obedecer', null, 3),
]

// Pares: [a, b, grupo, nivel]
const P = (a, b, grupo, nivel) => ({ a, b, grupo, nivel })
export const SINONIMOS = [
  P('alegre', 'contento', 'animo', 1), P('bonito', 'hermoso', 'belleza', 1), P('empezar', 'comenzar', 'inicio', 1),
  P('rápido', 'veloz', 'listo', 1), P('terminar', 'acabar', 'fin', 1), P('cara', 'rostro', 'cara', 1),
  P('pelo', 'cabello', 'pelo', 1), P('coche', 'automóvil', 'coche', 1), P('miedo', 'temor', 'miedo', 1),
  P('contestar', 'responder', 'respuesta', 1), P('regalo', 'obsequio', 'regalo', 1), P('delgado', 'flaco', 'delgado', 1),
  P('listo', 'inteligente', 'listo', 1), P('antiguo', 'viejo', 'edad', 1), P('tirar', 'lanzar', 'tirar', 1),
  P('casa', 'vivienda', 'casa', 1),
  P('efímero', 'pasajero', 'breve', 3), P('obstinado', 'terco', 'terco', 3), P('diáfano', 'transparente', 'claro', 3),
  P('locuaz', 'hablador', 'habla', 3), P('sosegado', 'tranquilo', 'calma', 3), P('vetusto', 'antiguo', 'edad', 3),
  P('exiguo', 'escaso', 'poco', 3), P('pulcro', 'aseado', 'limpio', 3), P('perspicaz', 'agudo', 'listo', 3),
  P('orgulloso', 'ufano', 'orgullo', 3), P('mitigar', 'aliviar', 'aliviar', 3),
]
export const ANTONIMOS = [
  P('alto', 'bajo', 'tamano', 1), P('grande', 'pequeño', 'tamano', 1), P('abrir', 'cerrar', 'abrir', 1),
  P('día', 'noche', 'luz', 1), P('frío', 'caliente', 'temperatura', 1), P('rápido', 'lento', 'velocidad', 1),
  P('encender', 'apagar', 'encender', 1), P('ganar', 'perder', 'ganar', 1), P('lleno', 'vacío', 'lleno', 1),
  P('entrar', 'salir', 'entrar', 1), P('limpio', 'sucio', 'limpio', 1), P('fácil', 'difícil', 'dificultad', 1),
  P('mucho', 'poco', 'cantidad', 1), P('subir', 'bajar', 'tamano', 1), P('comprar', 'vender', 'comprar', 1),
  P('rico', 'pobre', 'dinero', 1), P('claro', 'oscuro', 'luz', 1), P('duro', 'blando', 'dificultad', 1),
  P('antes', 'después', 'tiempo', 1), P('amigo', 'enemigo', 'amigo', 1),
  P('generoso', 'tacaño', 'generoso', 2), P('escaso', 'abundante', 'cantidad', 2), P('optimista', 'pesimista', 'animo', 2),
  P('ascender', 'descender', 'tamano', 2), P('aceptar', 'rechazar', 'aceptar', 2), P('diurno', 'nocturno', 'luz', 2),
  P('recordar', 'olvidar', 'memoria', 2), P('valiente', 'cobarde', 'valor', 2), P('unir', 'separar', 'unir', 2),
  P('ancho', 'estrecho', 'anchura', 2), P('efímero', 'duradero', 'tiempo', 3),
]

export const NIVELES = {
  facil: { tipos: ['sufijo', 'sufijo', 'sinonimos', 'antonimos'], max: 1 },
  medio: { tipos: ['sufijo', 'prefijo', 'negacion', 'sinonimos', 'antonimos'], max: 2 },
  dificil: { tipos: ['sufijo', 'prefijo', 'negacion', 'negacion', 'sinonimos', 'antonimos'], max: 3 },
}

let seq = 0
const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
function baraja(rand, xs) {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const recientes = []
function nuevo(clave) {
  if (recientes.includes(clave)) return false
  recientes.push(clave)
  if (recientes.length > 12) recientes.shift()
  return true
}

export const pieza = a => a.replace(/-/g, '')
export const montar = (pre, base, suf) => `${pre ? pieza(pre) : ''}${base}${suf ? pieza(suf) : ''}`

function genConstruir(rand, tipo, cfg, base) {
  const pool = PALABRAS.filter(w => w.nivel <= cfg.max && (
    tipo === 'sufijo' ? w.suf : tipo === 'negacion' ? AFIJOS[w.pre]?.grupo === 'neg' : w.pre && AFIJOS[w.pre].grupo !== 'neg'))
  for (let intento = 0; ; intento++) {
    const w = elige(rand, pool)
    if (intento < 30 && !nuevo(w.id)) continue
    const buena = w.suf ?? w.pre
    const g = AFIJOS[buena].grupo
    const tipoPieza = w.suf ? 'suf' : 'pre'
    const candidatas = Object.keys(AFIJOS).filter(k => k !== buena && AFIJOS[k].tipo === tipoPieza &&
      (tipo === 'negacion' ? AFIJOS[k].grupo === 'neg' : AFIJOS[k].grupo !== g && AFIJOS[k].grupo !== 'neg'))
    const trampas = baraja(rand, candidatas).slice(0, 3)
    return { ...base, tipo, w: w.id, piezas: baraja(rand, [buena, ...trampas]), lado: tipoPieza, bueno: `w:${w.palabra}` }
  }
}

function genParejas(rand, tipo, cfg, base) {
  const lista = (tipo === 'sinonimos' ? SINONIMOS : ANTONIMOS).filter(p => p.nivel <= cfg.max)
  for (;;) {
    const elegidos = []
    for (const p of baraja(rand, lista)) {
      if (elegidos.length === 4) break
      const palabras = elegidos.flatMap(e => [e.a, e.b])
      if (elegidos.some(e => e.grupo === p.grupo) || palabras.includes(p.a) || palabras.includes(p.b)) continue
      elegidos.push(p)
    }
    if (elegidos.length < 4) continue
    const clave = elegidos.map(e => e.a).sort().join()
    if (!nuevo(clave) && rand() < 0.9) continue
    // a veces la palabra «de la izquierda» es la b, para que no se aprendan el lado
    const pares = elegidos.map(p => (rand() < 0.5 ? [p.a, p.b] : [p.b, p.a]))
    const izq = pares.map(p => p[0])
    const der = baraja(rand, pares.map(p => p[1]))
    return { ...base, tipo, pares, izq, der, bueno: respuestaParejas(pares) }
  }
}

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel }
  return tipo === 'sinonimos' || tipo === 'antonimos' ? genParejas(rand, tipo, cfg, base) : genConstruir(rand, tipo, cfg, base)
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const palabra = id => PALABRAS.find(w => w.id === id)

// Respuestas: «w:zapatero» y «p:alto=bajo|…» (ordenado, así no importa el orden de unión)
export const respuestaPalabra = (r, pre, suf) => {
  const w = palabra(r.w)
  return `w:${montar(pre, w.base, suf)}`
}
export function respuestaParejas(pares) {
  return 'p:' + pares.map(([a, b]) => [a, b].sort().join('=')).sort().join('|')
}
export const esCorrecta = (r, x) => x === r.bueno

export function enunciado(r, l = 'es') {
  if (r.tipo === 'sinonimos') return s(l, 'Une cada palabra con su sinónimo (significa lo mismo)')
  if (r.tipo === 'antonimos') return s(l, 'Une cada palabra con su antónimo (significa lo contrario)')
  const w = palabra(r.w)
  return s(l, `${w.def}: forma la palabra`)
}

export function explicacion(r, l = 'es') {
  if (r.tipo === 'sinonimos' || r.tipo === 'antonimos') {
    const lista = r.pares.map(([a, b]) => `${a} ${r.tipo === 'sinonimos' ? '=' : '≠'} ${b}`).join(' · ')
    return s(l, `${r.tipo === 'sinonimos' ? 'Sinónimos' : 'Antónimos'}: ${lista}.`)
  }
  const w = palabra(r.w)
  const af = w.suf ?? w.pre
  const cuenta = w.suf ? `${w.base}- + ${w.suf} = ${w.palabra}` : `${w.pre} + ${w.base} = ${w.palabra}`
  let extra = ''
  if (af === 'im-') extra = ' Delante de p o b, el prefijo in- se escribe im-: imposible, imborrable.'
  else if (af === 'i-') extra = ' Delante de l o r, el prefijo in- se escribe i-: ilegal, irreal.'
  else if (af === 'in-') extra = ' Delante del resto de letras se escribe in-: inútil, incómodo.'
  return s(l, `${cuenta}. ${af}: ${AFIJOS[af].sig}.${extra}`)
}

// Por qué ha fallado, en una frase (null si no hay una causa clara)
export function pistaFallo(r, x, l = 'es') {
  if (!x?.startsWith('w:')) return null
  const w = palabra(r.w)
  const hecha = x.slice(2)
  if (r.tipo === 'negacion' && /^in[pb]/.test(hecha)) return s(l, `«${hecha}» no existe: delante de p y b se escribe im-.`)
  if (r.tipo === 'negacion' && /^in[lr]/.test(hecha)) return s(l, `«${hecha}» no existe: delante de l y r se escribe i-.`)
  return s(l, `«${hecha}» no es la palabra que significa «${w.def.toLowerCase()}».`)
}

export function schemaQuestion(r) {
  if (r.tipo === 'sinonimos' || r.tipo === 'antonimos') {
    const [a, b] = r.pares[0]
    const otras = r.pares.slice(1).map(p => p[1])
    return { question: `${r.tipo === 'sinonimos' ? '¿Cuál es un sinónimo de' : '¿Cuál es un antónimo de'} «${a}»?`, correctAnswer: b, wrongAnswers: otras }
  }
  const w = palabra(r.w)
  const malas = r.piezas.filter(p => p !== (w.suf ?? w.pre)).map(p => (w.suf ? montar(null, w.base, p) : montar(p, w.base, null)))
  return { question: `${w.def}: ¿cómo se dice?`, correctAnswer: w.palabra, wrongAnswers: malas }
}
