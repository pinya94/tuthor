// «Dilo en Inglés»: comprobar una respuesta dicha (o escrita) en una
// conversación con guion. Sin IA: lo que se dice se normaliza y se compara con
// patrones escritos a mano para cada turno.
//
// Ojo con lo que esto mide: el reconocedor de voz no dice CÓMO has pronunciado,
// devuelve la frase más parecida que conoce. Así que medimos «¿te ha entendido
// el camarero?», no la pronunciación (ver data/diloIngles.js).
//
// Patrones (las palabras van seguidas, en ese orden, en cualquier parte de lo dicho):
//   palabra           esa palabra
//   palabra$          esa palabra y nada detrás (final de lo dicho)
//   ^palabra          esa palabra al principio de lo dicho
//   (a|b c|d)         una de las opciones (pueden ser de varias palabras)
//   [a|b]             opcional
//   ...               cualquier cosa en medio (también nada)
//   *                 una palabra cualquiera
//   {NUM}             un número (los de palabra se pasan a cifras)
//   {NUM2}            un número de 2 o más
//   {ING}             una palabra acabada en -ing
//   {LETRAS}          dos o más letras sueltas seguidas (deletrear)
//   {BEBIDA} {COMIDA} las listas de MACROS

export const MACROS = {
  BEBIDA: '(water|sparkling water|still water|orange juice|apple juice|juice|lemonade|coke|cola|tea|coffee|milk|hot chocolate|milkshake|smoothie|lemon tea|iced tea)',
  COMIDA: '(pizza|pasta|spaghetti|lasagne|burger|hamburger|cheeseburger|chicken|fish|fish and chips|salad|soup|steak|chips|sandwich|omelette|rice|vegetables|sausages|eggs|roast beef|pie|curry|noodles|tomato soup|chicken soup)',
}

const CONTRACCIONES = {
  "i'd": 'i would', "i'm": 'i am', "i've": 'i have', "i'll": 'i will', "you're": 'you are', "we're": 'we are', "they're": 'they are',
  "it's": 'it is', "that's": 'that is', "what's": 'what is', "where's": 'where is', "there's": 'there is', "here's": 'here is',
  "how's": 'how is', "who's": 'who is', "name's": 'name is', "let's": 'let us', "we'd": 'we would', "we'll": 'we will',
  "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'cannot', "won't": 'will not', "isn't": 'is not',
  "aren't": 'are not', "wasn't": 'was not', "haven't": 'have not', "hasn't": 'has not', "couldn't": 'could not', "wouldn't": 'would not',
}
const UNIDADES = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19 }
const DECENAS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 }

// Texto → lista de palabras en minúscula, sin puntuación, con las contracciones
// deshechas y los números en cifras («twenty one» y «21» quedan igual).
export function normaliza(texto) {
  const t = String(texto || '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[’‘`´]/g, "'")
    .replace(/wi-fi/g, 'wifi').replace(/\bcheck-in\b/g, 'check in').replace(/\bo\.?k\.?\b/g, 'ok').replace(/\bokay\b/g, 'ok')
    .replace(/(\d)(st|nd|rd|th)\b/g, '$1')
    .replace(/[^a-z0-9'\s-]/g, ' ').replace(/-/g, ' ')
  const palabras = []
  for (const w of t.split(/\s+/).filter(Boolean)) {
    const c = CONTRACCIONES[w]
    if (c) palabras.push(...c.split(' '))
    else palabras.push(w.replace(/'/g, ''))
  }
  // números con palabras → cifras
  const out = []
  for (let i = 0; i < palabras.length; i++) {
    const w = palabras[i]
    if (DECENAS[w] !== undefined) {
      const sig = palabras[i + 1]
      if (sig && UNIDADES[sig] > 0 && UNIDADES[sig] < 10) { out.push(String(DECENAS[w] + UNIDADES[sig])); i++ }
      else out.push(String(DECENAS[w]))
    } else if (UNIDADES[w] !== undefined) out.push(String(UNIDADES[w]))
    else out.push(w)
  }
  return out
}

// Patrón → lista de elementos
function compila(patron) {
  let p = patron
  for (const [k, v] of Object.entries(MACROS)) p = p.split(`{${k}}`).join(v)
  const els = []
  const re = /\(([^)]*)\)|\[([^\]]*)\]|(\.\.\.)|(\*)|\{(NUM2?|ING|LETRAS)\}|([^\s()[\]{}]+)/g
  let m
  while ((m = re.exec(p))) {
    if (m[1] !== undefined) els.push({ t: 'alt', ops: m[1].split('|').map(o => normaliza(o)) })
    else if (m[2] !== undefined) els.push({ t: 'opt', ops: m[2].split('|').map(o => normaliza(o)) })
    else if (m[3]) els.push({ t: 'gap' })
    else if (m[4]) els.push({ t: 'any' })
    else if (m[5]) els.push({ t: m[5] })
    else {
      const ini = m[6].startsWith('^'), fin = m[6].endsWith('$')
      const palabra = m[6].slice(ini ? 1 : 0, fin ? -1 : undefined)
      if (ini) els.push({ t: 'ini' })
      if (palabra) els.push({ t: 'alt', ops: [normaliza(palabra)] })
      if (fin) els.push({ t: 'fin' })
    }
  }
  return els
}

const cache = new Map()
export function encaja(patron, palabras) {
  let els = cache.get(patron)
  if (!els) { els = compila(patron); cache.set(patron, els) }
  const n = palabras.length
  const rec = (e, j) => {
    if (e === els.length) return true
    const el = els[e]
    switch (el.t) {
      case 'ini': return j === 0 && rec(e + 1, j)
      case 'fin': return j === n && rec(e + 1, j)
      case 'gap': for (let k = j; k <= n; k++) if (rec(e + 1, k)) return true; return false
      case 'any': return j < n && rec(e + 1, j + 1)
      case 'NUM': return j < n && /^\d+$/.test(palabras[j]) && rec(e + 1, j + 1)
      case 'NUM2': return j < n && /^\d+$/.test(palabras[j]) && Number(palabras[j]) >= 2 && rec(e + 1, j + 1)
      case 'ING': return j < n && palabras[j].length > 4 && palabras[j].endsWith('ing') && rec(e + 1, j + 1)
      case 'LETRAS': {
        let k = j
        while (k < n && /^[a-z]$/.test(palabras[k])) k++
        for (let f = k; f >= j + 2; f--) if (rec(e + 1, f)) return true
        return false
      }
      default: {
        for (const op of el.ops) {
          if (op.length && op.every((w, i) => palabras[j + i] === w) && rec(e + 1, j + op.length)) return true
        }
        return el.t === 'opt' ? rec(e + 1, j) : false
      }
    }
  }
  for (let s = 0; s <= n; s++) if (rec(0, s)) return true
  return false
}

const casa = (lista, palabras) => (lista || []).find(x => encaja(typeof x === 'string' ? x : x.p, palabras))

// Marcas de educación al pedir, y de brusquedad. Sirven para cualquier frase:
// no hace falta haber previsto cómo lo dice cada uno.
export const EDUCADO = ['please', 'could', 'can', 'would', 'may', 'do you have', 'have you got', 'is there', 'are there',
  'excuse me', 'is it possible', 'if possible', 'i would like', 'i would love', 'thank', 'thanks', 'sorry']
export const BRUSCO = ['i want', 'give me']

// Corrección de un turno-misión. El turno lleva:
//   claves  [{ p, falta }]  lo que la misión pide que digas (todas). Si falta
//                           algo NO es un error: se dice qué falta.
//   tono    true si es pedir algo: sin marca de educación o con «I want» → amarillo
//   mal     [{ p, nota }]   errores típicos → rojo con la explicación
//   mejor   [{ p, nota }]   se entiende pero hay forma mejor → amarillo
// Niveles: verde · amarillo (superado, con nota) · rojo (error típico) · falta.
// Lo que no está fichado como error se acepta: no detecta TODOS los errores
// de gramática, y lo dice la propia página.
export function corrige(turno, texto) {
  const w = normaliza(texto)
  if (!w.length) return { nivel: 'falta', nota: null, faltan: [], vacio: true }
  const mal = casa(turno.mal, w)
  if (mal) return { nivel: 'rojo', nota: mal.nota, faltan: [] }
  const faltan = (turno.claves || []).filter(c => !encaja(c.p, w)).map(c => c.falta)
  if (faltan.length) return { nivel: 'falta', nota: null, faltan }
  const mejor = casa(turno.mejor, w)
  if (mejor) return { nivel: 'amarillo', nota: mejor.nota, faltan: [] }
  if (turno.tono) {
    // «give me» dentro de «Could you give me…?» es educado: solo es brusco sin el modal
    if (BRUSCO.some(b => encaja(b, w)) && !encaja('(could|can|would|may) (you|i|we)', w)) return { nivel: 'amarillo', nota: '«I want…» o «Give me…» suenan bruscos al pedir. Mejor «Could I have…, please?» o «I\'d like…».', faltan: [] }
    if (!EDUCADO.some(b => encaja(b, w))) return { nivel: 'amarillo', nota: 'Se entiende, pero suena seco. Añade «please» o empieza con «Could I…?» / «Can I…?».', faltan: [] }
  }
  return { nivel: 'verde', nota: null, faltan: [] }
}

// El reconocedor da varias versiones de lo que ha oído: nos quedamos con la
// mejor. Un error típico (rojo) se enseña antes que un «te falta algo».
const RANGO = { verde: 3, amarillo: 2, rojo: 1, falta: 0 }
export function corrigeVarias(turno, textos) {
  let mejor = null
  for (const t of textos) {
    const r = { ...corrige(turno, t), texto: t }
    if (!mejor || RANGO[r.nivel] > RANGO[mejor.nivel]) mejor = r
  }
  return mejor ?? { nivel: 'falta', nota: null, faltan: [], vacio: true, texto: '' }
}

export const PUNTOS = { verde: 20, amarillo: 12, rojo: 0, falta: 0 }
