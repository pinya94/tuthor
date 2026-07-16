// ── Motor de "Spicy" ─────────────────────────────────────────────────────────
// Simulación económica mes a mes. Cada partida tiene una seed que genera su
// línea económica (inflación, bolsa, vivienda, crisis): misma seed + mismas
// decisiones = misma vida.
//
// Dos capas:
//  - EVENTOS narrativos (src/data/spicyEventos.js): cartas con decisión, ~1/año.
//  - ACCIONES libres (invertir, vender, modo de vida, buscar empleo): el
//    jugador puede usarlas en cualquier pausa; los mercados se mueven cada mes.
//
// Principio pedagógico central: los números de riesgo (pQuiebra, retornos)
// viven OCULTOS; el jugador solo ve señales cualitativas. Los números reales
// solo se revelan en la autopsia, cuando el riesgo ya se materializó (o no).
// Y casi nada es "la opción correcta": los porcentajes deciden.

import { EVENTOS } from '../data/spicyEventos'

// ── RNG con seed (mulberry32) ────────────────────────────────────────────────
export function mulberry32(seed) {
  let a = seed | 0
  return function () {
    a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Aproximación normal(0,1) con 3 uniformes (suficiente para retornos)
const normal = rng => (rng() + rng() + rng() - 1.5) * 2

// ── Señales de riesgo (catálogo compartido con los eventos) ──────────────────
export const SENALES = {
  'no-regulado':   { emoji: '🚫', label: { es: 'No regulado', en: 'Unregulated', ca: 'No regulat' } },
  'garantizado':   { emoji: '🎁', label: { es: '"Rentabilidad garantizada"', en: '"Guaranteed returns"', ca: '"Rendibilitat garantida"' } },
  'presion':       { emoji: '⏰', label: { es: 'Prisa por decidir', en: 'Pressure to decide', ca: 'Pressa per decidir' } },
  'fuente-turbia': { emoji: '🕶️', label: { es: 'Fuente dudosa', en: 'Dubious source', ca: 'Font dubtosa' } },
  'conocido':      { emoji: '👋', label: { es: 'Te lo ofrece un conocido', en: 'Offered by someone you know', ca: "T'ho ofereix un conegut" } },
  'entidad-seria': { emoji: '🏦', label: { es: 'Entidad regulada', en: 'Regulated institution', ca: 'Entitat regulada' } },
  'diversificado': { emoji: '🧺', label: { es: 'Diversificado', en: 'Diversified', ca: 'Diversificat' } },
  'iliquido':      { emoji: '🔒', label: { es: 'Difícil de recuperar', en: 'Hard to cash out', ca: 'Difícil de recuperar' } },
  'negocio-real':  { emoji: '🏪', label: { es: 'Negocio tangible', en: 'Tangible business', ca: 'Negoci tangible' } },
  'urgencia-tel':  { emoji: '📞', label: { es: 'Te llaman ellos y piden claves', en: 'They call YOU and ask for codes', ca: 'Et truquen ells i demanen claus' } },
  'volatil':       { emoji: '🎢', label: { es: 'Sube y baja violentamente', en: 'Swings violently', ca: 'Puja i baixa violentament' } },
  'especulativo':  { emoji: '🃏', label: { es: 'Vale lo que otro quiera pagar', en: 'Worth what someone else will pay', ca: 'Val el que un altre vulgui pagar' } },
}

// ── Modos de vida (accionables en cualquier momento) ─────────────────────────
export const MODOS_VIDA = {
  ajustado: { factor: 0.8, emoji: '🍱', label: { es: 'Ajustado', en: 'Tight', ca: 'Ajustat' } },
  medio:    { factor: 1.0, emoji: '🍜', label: { es: 'Término medio', en: 'Middle ground', ca: 'Terme mitjà' } },
  alegre:   { factor: 1.2, emoji: '🥂', label: { es: 'Alegre', en: 'Free-spending', ca: 'Alegre' } },
}

// ── Clases de inversión (acción libre; parámetros MENSUALES ocultos) ─────────
export const CLASES_INVERSION = {
  fondo: {
    emoji: '📈', tipo: 'fondo',
    label: { es: 'Fondo indexado', en: 'Index fund', ca: 'Fons indexat' },
    senales: ['entidad-seria', 'diversificado'],
    nombre: { es: 'Fondo indexado global', en: 'Global index fund', ca: 'Fons indexat global' },
  },
  acciones: {
    emoji: '📊', tipo: 'acciones',
    label: { es: 'Acciones sueltas', en: 'Individual stocks', ca: 'Accions soltes' },
    senales: ['entidad-seria', 'volatil'],
    nombre: { es: 'Tus acciones', en: 'Your stocks', ca: 'Les teves accions' },
  },
  cripto: {
    emoji: '🪙', tipo: 'cripto',
    label: { es: 'Criptomonedas', en: 'Crypto', ca: 'Criptomonedes' },
    senales: ['volatil', 'no-regulado'],
    nombre: { es: 'Tus criptomonedas', en: 'Your crypto', ca: 'Les teves criptomonedes' },
  },
  coleccion: {
    emoji: '🃏', tipo: 'coleccion',
    label: { es: 'Coleccionismo', en: 'Collectibles', ca: 'Col·leccionisme' },
    senales: ['especulativo', 'iliquido'],
    nombre: { es: 'Tu colección', en: 'Your collection', ca: 'La teva col·lecció' },
  },
  deposito: {
    emoji: '🏦', tipo: 'deposito',
    label: { es: 'Depósito a plazo fijo', en: 'Fixed-term deposit', ca: 'Dipòsit a termini fix' },
    senales: ['entidad-seria'],
    nombre: { es: 'Depósito a plazo fijo', en: 'Fixed-term deposit', ca: 'Dipòsit a termini fix' },
  },
}

// ── Línea económica de la partida ────────────────────────────────────────────
function generarEconomia(rng) {
  const inflacion = [], bolsa = [], vivienda = []
  const crisis1 = 28 + Math.floor(rng() * 14)          // 28-41
  const crisis2 = 48 + Math.floor(rng() * 14)          // 48-61
  const crisisYears = new Set([crisis1, crisis1 + 1, crisis2, crisis2 + 1])
  const burbuja = new Set([crisis1 - 2, crisis1 - 1])

  for (let edad = 0; edad < 100; edad++) {
    const enCrisis = crisisYears.has(edad)
    inflacion[edad] = enCrisis
      ? 0.055 + rng() * 0.035
      : Math.max(0.005, 0.02 + normal(rng) * 0.008)
    bolsa[edad] = enCrisis
      ? -(0.25 + rng() * 0.18)
      : burbuja.has(edad)
        ? 0.16 + rng() * 0.10
        : 0.07 + normal(rng) * 0.13
    vivienda[edad] = enCrisis
      ? -(0.08 + rng() * 0.08)
      : 0.03 + normal(rng) * 0.03
  }
  return { inflacion, bolsa, vivienda, crisis: [crisis1, crisis2], crisisYears }
}

// ── Contexto familiar: no toda la infancia es igual ──────────────────────────
// Determina si hay paga, si la familia puede pagarte la universidad y cuánto
// te "cubren" de joven. No es bueno ni malo — cambia el punto de partida.
export const FAMILIAS = {
  humilde:   { label: { es: 'Familia trabajadora', en: 'Working-class family', ca: 'Família treballadora' }, pagaMes: 0,  uniPagada: false, cubreJoven: 0.3 },
  media:     { label: { es: 'Familia de clase media', en: 'Middle-class family', ca: 'Família de classe mitjana' }, pagaMes: 5,  uniPagada: false, cubreJoven: 0.55 },
  acomodada: { label: { es: 'Familia acomodada', en: 'Well-off family', ca: 'Família benestant' }, pagaMes: 15, uniPagada: true, cubreJoven: 0.85 },
}

// ── Partida nueva ────────────────────────────────────────────────────────────
export function crearPartida(seed = Math.floor(Math.random() * 2 ** 31)) {
  const rng = mulberry32(seed)
  const economia = generarEconomia(rng)
  const omitidos = EVENTOS.filter(ev => ev.prob != null && rng() > ev.prob).map(ev => ev.id)
  const rf = rng()
  const familia = rf < 0.4 ? 'humilde' : rf < 0.8 ? 'media' : 'acomodada'
  return {
    seed, rng, economia, omitidos, familia,
    edad: 5, mes: 0, mesesTotales: 0,
    edadFinal: 82 + Math.floor(rng() * 9),   // 82-90
    dinero: 30 + Math.floor(rng() * 71),      // la hucha del niño: entre 30 y 100€, si no no se puede comprar nada
    ingresos: 0, gastos: 0,                   // anuales (el mes paga 1/12)
    gastoVivienda: 0, gastoVida: 0, gastoHijos: 0, // desglose de "gastos" para mostrarlo en la interfaz
    nivelVidaFactor: 1,                       // subida permanente de gastos (evento "nivel de vida"): nunca baja sola
    pagaAhorroMes: 0,                         // lo que la paga añade a la hucha cada mes
    bienestar: 65,                            // 0-100: salud/felicidad
    modoVida: 'medio',
    estudios: null,                           // { tipo: 'uni'|'fp', añosRestantes, mediaJornada, sueldoJornada }
    paroMeses: 0, ingresosPrevios: 0,
    señaladoMeses: 0,                         // te buscaste otro empleo y se supo
    ultimaBusqueda: -999,
    ultimaPeticionAumento: -999,
    buscandoEmpleoMeses: 0,                   // tras graduarte, meses hasta que llegan ofertas reales
    tipoTituloPendiente: null,
    vivienda: 'familia',                      // familia | alquiler | propia
    alquilerAnual: 0,
    hipoteca: null,                           // { pendiente, cuota (anual), años }
    prestamos: [],                            // [{ pendiente, cuotaMes, meses }]
    hijos: [],                                // [{ edadNacimiento }]
    activos: [],
    flags: [],
    usados: [],
    historial: [],
    autopsias: [],
    experiencias: [],
    indice: 1,
    fin: false,
  }
}

// Cambia el sueldo anual dejando siempre rastro en el feed (nunca cambia "de golpe")
export function setIngresos(p, nuevoAnual, log, motivo) {
  const antes = p.ingresos
  p.ingresos = Math.round(nuevoAnual)
  if (log && motivo && Math.abs(p.ingresos - antes) > 1) {
    const signo = p.ingresos >= antes ? '📈' : '📉'
    log.push({ tipo: p.ingresos >= antes ? 'bueno' : 'malo', texto: {
      es: `${signo} ${motivo.es} Tu sueldo pasa a ${fmt(Math.round(p.ingresos / 12))}/mes.`,
      en: `${signo} ${motivo.en} Your salary is now ${fmt(Math.round(p.ingresos / 12))}/mo.`,
      ca: `${signo} ${motivo.ca} El teu sou passa a ${fmt(Math.round(p.ingresos / 12))}/mes.`,
    } })
  }
}

// ── Helpers de dinero ────────────────────────────────────────────────────────
export function fmt(n) {
  return `${Math.round(n).toLocaleString('es-ES')} €`
}
export function escala(p, base) {
  const v = base * p.indice
  if (v < 200) return Math.round(v)
  if (v < 5000) return Math.round(v / 50) * 50
  return Math.round(v / 500) * 500
}
export function factorEvento(p, eventoId) {
  let h = 0
  for (let i = 0; i < eventoId.length; i++) h = (h * 31 + eventoId.charCodeAt(i)) | 0
  return 0.75 + mulberry32(p.seed ^ h)() * 0.7
}
export function cantEvento(p, evento, nombre) {
  const base = evento.cantidades?.[nombre] ?? 0
  return escala(p, base * factorEvento(p, evento.id))
}

export function patrimonio(p) {
  let total = p.dinero
  for (const a of p.activos) if (a.estado === 'vivo') total += a.valor
  if (p.hipoteca) total -= p.hipoteca.pendiente
  for (const pr of p.prestamos ?? []) total -= pr.pendiente
  return total
}
export function patrimonioReal(p) {
  return patrimonio(p) / p.indice
}
// La nota no es solo "cuánto queda al final": el patrimonio bruto puede venir de
// una herencia con suerte o de una vida entera bien gestionada, y el número final
// no distingue eso. Por eso pesan también la diversificación, las quiebras
// evitadas (o no) y las lecciones de las autopsias — decisiones, no solo resultado.
export function notaFinanciera(p) {
  const real = Math.max(0, patrimonioReal(p))
  let base = 1500 * Math.log(1 + real / 10000)

  const tipos = new Set(p.activos.filter(a => a.tipo !== 'casa').map(a => a.tipo))
  if (tipos.size >= 2) base *= 1.05
  if (tipos.size >= 3) base *= 1.05

  const buenas = p.autopsias.filter(a => a.tipo === 'buena').length
  const malas = p.autopsias.filter(a => a.tipo === 'mala').length
  base += buenas * 60 - malas * 40

  if (p.flags.includes('arruinado')) base *= 0.7
  if (p.flags.includes('legado')) base += 150

  return Math.max(0, Math.min(10000, Math.round(base)))
}

const clampB = v => Math.max(0, Math.min(100, v))

// ── Contexto que reciben los eventos ─────────────────────────────────────────
function crearCtx(p, evento) {
  return {
    rng: p.rng,
    f: fmt,
    cant: nombre => cantEvento(p, evento, nombre),
    dinero: delta => { p.dinero += delta },
    // Antes de los 16 no hay crédito: si no tienes el dinero, no puedes gastarlo
    puedePagar: coste => p.edad >= 16 || p.dinero >= coste,
    flag: f => { if (!p.flags.includes(f)) p.flags.push(f) },
    tieneFlag: f => p.flags.includes(f),
    bienestar: delta => { p.bienestar = clampB(p.bienestar + delta) },
    activo: def => {
      const oculto = def.oculto?.pQuiebraAnual != null
        ? { ...def.oculto, pQuiebraAnual: Math.min(0.9, def.oculto.pQuiebraAnual * (0.65 + p.rng() * 0.7)) }
        : def.oculto
      p.activos.push({ estado: 'vivo', edadCompra: p.edad, valor: def.invertido, ...def, oculto })
    },
    prestamo: ({ importe, años = 5, interes = 0.25 }) => {
      const total = Math.round(importe * (1 + interes))
      p.prestamos.push({ pendiente: total, cuotaMes: Math.round(total / (años * 12)), meses: años * 12 })
    },
    familia: p.familia,
    esFamilia: nivel => p.familia === nivel,
    pagaMesFamilia: FAMILIAS[p.familia].pagaMes,
    autopsia: a => { p.autopsias.push({ edad: p.edad, ...a }) },
    experiencia: titulo => { p.experiencias.push({ edad: p.edad, titulo }) },
    recalcularGastos: () => ajustarGastos(p),
  }
}

// Interpola {nombre} de cantidades en un texto trilingüe. `textoObj` puede ser
// el objeto {es,en,ca} o una función (p) => {es,en,ca} para texto que depende
// del estado de la partida (p. ej. quién paga los estudios según la familia).
export function interpolar(p, evento, textoObj) {
  if (!textoObj) return textoObj
  const resuelto = typeof textoObj === 'function' ? textoObj(p) : textoObj
  const out = {}
  for (const l of ['es', 'en', 'ca']) {
    let t = resuelto[l] ?? resuelto.es
    if (evento.cantidades) {
      for (const nombre of Object.keys(evento.cantidades)) {
        t = t.replaceAll(`{${nombre}}`, fmt(cantEvento(p, evento, nombre)))
      }
    }
    out[l] = t
  }
  return out
}

// ── ACCIONES LIBRES (disponibles en cualquier pausa) ─────────────────────────

export function cambiarModoVida(p, modo) {
  if (!MODOS_VIDA[modo] || modo === p.modoVida) return null
  const antes = MODOS_VIDA[p.modoVida].factor
  p.gastos = Math.round(p.gastos / antes * MODOS_VIDA[modo].factor)
  p.modoVida = modo
  const gastoMes = fmt(Math.round(p.gastos / 12))
  const notas = {
    ajustado: { es: `Tupper, marcas blancas y ticket mirado. Nuevo gasto: ${gastoMes}/mes. Cada mes sobra más — y cada mes pesa un poco más.`, en: `Packed lunches, own brands and checked receipts. New spending: ${gastoMes}/mo. More left over each month — and each month weighs a little more.`, ca: `Carmanyola, marques blanques i tiquet mirat. Nova despesa: ${gastoMes}/mes. Cada mes sobra més — i cada mes pesa una mica més.` },
    medio: { es: `Ni monje ni derrochador: gastos normales (${gastoMes}/mes).`, en: `Neither monk nor spendthrift: normal expenses (${gastoMes}/mo).`, ca: `Ni monjo ni malgastador: despeses normals (${gastoMes}/mes).` },
    alegre: { es: `Cenas fuera, planes que no se posponen. Nuevo gasto: ${gastoMes}/mes. El neto mensual se resiente; el ánimo, al revés.`, en: `Dinners out, plans that don't wait. New spending: ${gastoMes}/mo. Monthly net takes the hit; your mood, the opposite.`, ca: `Sopars fora, plans que no es posposen. Nova despesa: ${gastoMes}/mes. El net mensual se'n ressent; l'ànim, al revés.` },
  }
  return { nota: notas[modo] }
}

// Invertir dinero disponible en una clase (crea o amplía la posición)
export function invertir(p, clase, importe) {
  const def = CLASES_INVERSION[clase]
  if (!def || importe <= 0 || importe > p.dinero) return null
  p.dinero -= importe
  const id = `inv-${clase}`
  const existente = p.activos.find(a => a.id === id && a.estado === 'vivo')
  if (existente) {
    existente.valor += importe
    existente.invertido += importe
  } else {
    p.activos.push({ id, tipo: def.tipo, estado: 'vivo', edadCompra: p.edad, invertido: importe, valor: importe, senales: def.senales, nombre: def.nombre })
  }
  const notas = {
    fondo: { es: 'Al fondo indexado. Aburrido a corto plazo — que es justo lo que quieres a largo.', en: 'Into the index fund. Boring short-term — exactly what you want long-term.', ca: 'Al fons indexat. Avorrit a curt termini — que és just el que vols a llarg.' },
    acciones: { es: 'Acciones compradas. Empresas concretas: más recorrido y más sustos que un fondo.', en: 'Stocks bought. Specific companies: more upside and more scares than a fund.', ca: 'Accions comprades. Empreses concretes: més recorregut i més ensurts que un fons.' },
    cripto: { es: 'Cripto comprada. Puede doblar o quedarse en la mitad — solo dinero que puedas ver caer.', en: 'Crypto bought. It can double or halve — only money you can watch fall.', ca: 'Cripto comprada. Pot doblar o quedar-se a la meitat — només diners que puguis veure caure.' },
    coleccion: { es: 'A la vitrina. Recuerda: no produce nada y venderlo lleva tiempo y descuento.', en: 'Into the display case. Remember: it produces nothing, and selling takes time and a haircut.', ca: 'A la vitrina. Recorda: no produeix res i vendre-ho porta temps i descompte.' },
    deposito: { es: 'Al depósito a plazo fijo. Seguro y tranquilo — pero si el interés no supera la inflación, tu dinero "crece" y aun así compra menos.', en: 'Into the fixed-term deposit. Safe and calm — but if the rate doesn\'t beat inflation, your money "grows" and still buys less.', ca: 'Al dipòsit a termini fix. Segur i tranquil — però si l\'interès no supera la inflació, els teus diners "creixen" i tot i així compren menys.' },
  }
  return { nota: notas[clase] }
}

// Vender una posición entera (el coleccionismo paga su iliquidez)
export function venderActivo(p, activoId) {
  const a = p.activos.find(x => x.id === activoId && x.estado === 'vivo')
  if (!a) return null
  const haircut = a.tipo === 'coleccion' ? 0.85 : 1
  const importe = Math.max(0, Math.round(a.valor * haircut))
  p.dinero += importe
  a.estado = 'vendido'
  const gano = importe >= a.invertido
  return {
    importe,
    nota: {
      es: `Vendido por ${fmt(importe)} (pusiste ${fmt(a.invertido)}).${a.tipo === 'coleccion' ? ' El 15% se quedó en el camino: encontrar comprador tiene precio.' : ''}${gano ? '' : ' Vender en pérdidas a veces es lo correcto y a veces es pánico — solo el tiempo lo dice.'}`,
      en: `Sold for ${fmt(importe)} (you put in ${fmt(a.invertido)}).${a.tipo === 'coleccion' ? ' 15% was lost on the way: finding a buyer has a price.' : ''}${gano ? '' : ' Selling at a loss is sometimes right and sometimes panic — only time tells.'}`,
      ca: `Venut per ${fmt(importe)} (hi vas posar ${fmt(a.invertido)}).${a.tipo === 'coleccion' ? ' El 15% es va quedar pel camí: trobar comprador té preu.' : ''}${gano ? '' : ' Vendre en pèrdues de vegades és correcte i de vegades és pànic — només el temps ho diu.'}`,
    },
  }
}

// ── Segunda vivienda: comprar, usar, vender, donar ───────────────────────────
export function precioSegundaVivienda(p) {
  return escala(p, 90000)
}
export function comprarSegundaVivienda(p) {
  if (p.activos.some(a => a.tipo === 'casa2' && a.estado === 'vivo')) return null
  const precio = precioSegundaVivienda(p)
  if (p.dinero < precio) return null
  p.dinero -= precio
  p.activos.push({ id: 'casa2', tipo: 'casa2', estado: 'vivo', edadCompra: p.edad, invertido: precio, valor: precio, uso: 'vacia', senales: ['iliquido'], nombre: { es: 'Tu segunda vivienda', en: 'Your second home', ca: 'La teva segona vivenda' } })
  return { nota: { es: 'Comprada. Ahora toca decidir: ¿la usáis vosotros, la alquiláis, o la dejáis esperando mejor momento (con riesgo de okupas)?', en: 'Bought. Now decide: use it yourselves, rent it out, or leave it waiting for a better moment (with squatting risk)?', ca: 'Comprada. Ara toca decidir: la useu vosaltres, la llogueu, o la deixeu esperant un moment millor (amb risc d\'okupes)?' } }
}
export function usarSegundaVivienda(p, uso) {
  const a = p.activos.find(x => x.tipo === 'casa2' && x.estado === 'vivo')
  if (!a || a.uso === 'ocupada' || a.uso === uso) return null
  a.uso = uso
  const notas = {
    vive: { es: 'La reserváis para vosotros: findes y vacaciones. No da renta, pero tampoco corre riesgo de okupas.', en: 'You keep it for yourselves: weekends and holidays. No income, but no squatting risk either.', ca: 'La reserveu per a vosaltres: caps de setmana i vacances. No dona renda, però tampoc corre risc d\'okupes.' },
    alquiler: { es: 'La ponéis en alquiler. Renta extra cada año — con el riesgo de un mal inquilino o de que algún año no encontréis a nadie.', en: 'You put it up for rent. Extra income every year — with the risk of a bad tenant.', ca: 'La poseu en lloguer. Renda extra cada any — amb el risc d\'un mal inquilí.' },
    vacia: { es: 'La dejáis vacía. Sin gestión ni renta — pero una vivienda vacía también es un imán para problemas.', en: 'You leave it empty. No management, no income — but an empty home is also a magnet for trouble.', ca: 'La deixeu buida. Sense gestió ni renda — però una vivenda buida també és un imant per a problemes.' },
  }
  return { nota: notas[uso] }
}
export function venderSegundaVivienda(p) {
  const a = p.activos.find(x => x.tipo === 'casa2' && x.estado === 'vivo')
  if (!a) return null
  const factor = a.uso === 'ocupada' ? 0.55 : 1
  const importe = Math.round(a.valor * factor)
  p.dinero += importe
  a.estado = 'vendido'
  return { importe, nota: {
    es: `Vendida por ${fmt(importe)}${a.uso === 'ocupada' ? ' — vender con okupas dentro sale caro, literalmente' : ''}.`,
    en: `Sold for ${fmt(importe)}${a.uso === 'ocupada' ? ' — selling with squatters inside is literally costly' : ''}.`,
    ca: `Venuda per ${fmt(importe)}${a.uso === 'ocupada' ? ' — vendre amb okupes a dins surt car, literalment' : ''}.`,
  } }
}
export function donarSegundaVivienda(p) {
  const a = p.activos.find(x => x.tipo === 'casa2' && x.estado === 'vivo')
  if (!a || (p.hijos ?? []).length === 0 || a.uso === 'ocupada') return null
  a.estado = 'donada'
  if (!p.flags.includes('legado')) p.flags.push('legado')
  return { nota: { es: 'Se la donáis a vuestros hijos. Sale de vuestras cuentas — pero hay patrimonios que no se miden en tu propio balance.', en: 'You gift it to your kids. It leaves your books — but some wealth isn\'t measured on your own balance sheet.', ca: 'La doneu als vostres fills. Surt dels vostres comptes — però hi ha patrimonis que no es mesuren en el teu propi balanç.' } }
}

// Buscar otro empleo: puede mejorar, no hacer nada… o señalarte
export function buscarEmpleo(p) {
  if (p.estudios || p.flags.includes('jubilado') || p.ingresos <= 0 || p.paroMeses > 0) {
    return { nota: { es: 'Ahora mismo no estás en situación de moverte de empleo.', en: 'Right now you\'re in no position to switch jobs.', ca: 'Ara mateix no estàs en situació de moure\'t de feina.' } }
  }
  if (p.mesesTotales - p.ultimaBusqueda < 24) {
    return { nota: { es: 'Acabas de moverte hace poco: el mercado (y tu currículum) necesitan un tiempo antes del siguiente salto.', en: 'You moved recently: the market (and your CV) need time before the next jump.', ca: 'Acabes de moure\'t fa poc: el mercat (i el teu currículum) necessiten un temps abans del següent salt.' } }
  }
  p.ultimaBusqueda = p.mesesTotales
  const r = p.rng()
  if (r < 0.4) {
    // Dos ofertas reales, no una subida asignada en silencio: tú eliges el trade-off.
    const subidaA = 1.05 + p.rng() * 0.05      // conservadora: revisión automática
    const subidaB = 1.13 + p.rng() * 0.10      // más agresiva: las subidas hay que pedirlas
    return {
      ofertas: [
        {
          id: 'conservadora', subida: subidaA, automatica: true, bienestarDelta: 0,
          label: { es: `Cambio con revisión salarial automática (+${Math.round((subidaA - 1) * 100)}%)`, en: `Move with automatic salary review (+${Math.round((subidaA - 1) * 100)}%)`, ca: `Canvi amb revisió salarial automàtica (+${Math.round((subidaA - 1) * 100)}%)` },
        },
        {
          id: 'agresiva', subida: subidaB, automatica: false, bienestarDelta: -2,
          label: { es: `Cambio más agresivo, las subidas las pides tú (+${Math.round((subidaB - 1) * 100)}%)`, en: `More aggressive move, you ask for raises yourself (+${Math.round((subidaB - 1) * 100)}%)`, ca: `Canvi més agressiu, les pujades les demanes tu (+${Math.round((subidaB - 1) * 100)}%)` },
        },
      ],
    }
  }
  if (r < 0.9) {
    return { nota: { es: 'Entrevistas, silencios y algún "ya te llamaremos". El mercado está parado: te quedas donde estás.', en: 'Interviews, silences and a few "we\'ll call you". The market is flat: you stay put.', ca: 'Entrevistes, silencis i algun "ja et trucarem". El mercat està aturat: et quedes on ets.' } }
  }
  p.señaladoMeses = 24
  return { nota: { es: 'Alguien te vio en una entrevista y llegó a oídos de tu jefa. Nadie dice nada… pero tu nombre subió puestos en la lista de prescindibles.', en: 'Someone saw you at an interview and word reached your boss. Nobody says anything… but your name moved up the expendables list.', ca: 'Algú et va veure en una entrevista i va arribar a oïdes de la teva cap. Ningú diu res… però el teu nom va pujar llocs a la llista de prescindibles.' } }
}

// Aplica la oferta elegida tras buscarEmpleo(). Siempre avisa con la cifra
// concreta y si las próximas subidas llegarán solas o habrá que pedirlas.
export function elegirOfertaEmpleo(p, oferta) {
  const antes = p.ingresos
  p.ingresos = Math.round(p.ingresos * oferta.subida)
  p.flags = p.flags.filter(f => f !== 'startup' && f !== 'revision-automatica' && f !== 'revision-manual')
  p.flags.push(oferta.automatica ? 'revision-automatica' : 'revision-manual')
  p.señaladoMeses = 0
  if (oferta.bienestarDelta) p.bienestar = clampB(p.bienestar + oferta.bienestarDelta)
  const subidaPct = Math.round((p.ingresos / antes - 1) * 100)
  const condicion = oferta.automatica
    ? { es: 'Aquí las subidas llegan solas, con revisión salarial cada año.', en: 'Here raises come on their own, with a yearly salary review.', ca: 'Aquí les pujades arriben soles, amb revisió salarial cada any.' }
    : { es: 'Aquí las subidas no llegan solas — si quieres una, toca pedirla tú.', en: 'Here raises don\'t come on their own — if you want one, you have to ask.', ca: 'Aquí les pujades no arriben soles — si en vols una, l\'has de demanar tu.' }
  return { nota: {
    es: `Aceptas: +${subidaPct}% de sueldo (${fmt(Math.round(p.ingresos / 12))}/mes). ${condicion.es}`,
    en: `You accept: +${subidaPct}% salary (${fmt(Math.round(p.ingresos / 12))}/mo). ${condicion.en}`,
    ca: `Acceptes: +${subidaPct}% de sou (${fmt(Math.round(p.ingresos / 12))}/mes). ${condicion.ca}`,
  } }
}

// Pedir un aumento en tu empleo actual: agencia real del jugador sobre el sueldo,
// en vez de esperar a que "toque" solo. Riesgo real de que te digan que no.
export function pedirAumento(p) {
  if (p.estudios || p.flags.includes('jubilado') || p.ingresos <= 0 || p.paroMeses > 0) {
    return { nota: { es: 'Ahora mismo no tienes a quién pedírselo.', en: 'Right now there\'s nobody to ask.', ca: 'Ara mateix no tens a qui demanar-l\'hi.' } }
  }
  if (p.mesesTotales - (p.ultimaPeticionAumento ?? -999) < 12) {
    return { nota: { es: 'Ya lo pediste hace poco. Insistir tan pronto no suele sentar bien.', en: 'You already asked recently. Pushing again this soon rarely lands well.', ca: 'Ja ho vas demanar fa poc. Insistir tan aviat no sol sentar bé.' } }
  }
  p.ultimaPeticionAumento = p.mesesTotales
  const r = p.rng()
  if (r < 0.35) {
    const subida = 1.05 + p.rng() * 0.08
    const antes = p.ingresos
    p.ingresos = Math.round(p.ingresos * subida)
    return { nota: { es: `Te lo conceden: +${Math.round((p.ingresos / antes - 1) * 100)}% de sueldo. Pedir no garantiza nada — pero no pedir garantiza que no llegue solo.`, en: `They grant it: +${Math.round((p.ingresos / antes - 1) * 100)}% salary. Asking doesn't guarantee anything — but not asking guarantees it won't come on its own.`, ca: `T'ho concedeixen: +${Math.round((p.ingresos / antes - 1) * 100)}% de sou. Demanar no garanteix res — però no demanar garanteix que no arribi sol.` } }
  }
  if (r < 0.8) {
    return { nota: { es: '"Ahora mismo no toca, pero lo tendremos en cuenta." La respuesta clásica. Ni sí ni no — pero al menos lo has puesto sobre la mesa.', en: '"Not right now, but we\'ll keep it in mind." The classic answer. Neither yes nor no — but at least it\'s on the table.', ca: '"Ara mateix no toca, però ho tindrem en compte." La resposta clàssica. Ni sí ni no — però almenys ho has posat sobre la taula.' } }
  }
  p.bienestar = clampB(p.bienestar - 3)
  return { nota: { es: 'Te dicen que no, y con cara de pocos amigos: parece que pedir se ha notado más de lo que esperabas.', en: 'They say no, and not kindly: asking seems to have registered more than you expected.', ca: 'Et diuen que no, i amb mala cara: sembla que demanar s\'ha notat més del que esperaves.' } }
}

// Coste anual fijo de los hijos menores de 18 (comida, ropa, cole, extraescolares…)
function costeHijos(p) {
  const menores = (p.hijos ?? []).filter(h => p.edad - h.edadNacimiento < 18).length
  return menores > 0 ? escala(p, 3000) * menores : 0
}

// Recalcula los gastos de vida según la fase y la familia, guardando el
// desglose (vivienda / vida / hijos) para que la interfaz pueda mostrar en
// qué se va cada euro, no solo el total. Autoridad anual: en casa de los
// padres ahorras una parte realista del sueldo (300-900 €/mes); independizado,
// el alquiler y la vida se comen casi todo (ahorras poco).
function ajustarGastos(p) {
  const f = MODOS_VIDA[p.modoVida].factor
  const hijos = costeHijos(p)
  if (p.vivienda !== 'familia') {
    // El alquiler/hipoteca ya se descuenta aparte (p.alquilerAnual / hipoteca.cuota):
    // aquí solo va la vida diaria (comida, suministros, ocio, transporte).
    p.gastoVivienda = 0
    p.gastoVida = Math.round(escala(p, 7000) * f)
  } else if (p.edad < 18) {
    p.gastoVivienda = 0                                 // menor en casa: la familia cubre lo esencial
    p.gastoVida = 0
  } else if (p.ingresos > 0) {
    // Trabajas viviendo con tu familia: una parte es lo que aportas en casa,
    // el resto tu propio gasto de vida. Cuánto ahorras (300-900 €/mes) depende
    // de si te dejan quedarte con lo tuyo.
    const consumo = { humilde: 0.82, media: 0.74, acomodada: 0.62 }[p.familia]
    const total = Math.round(p.ingresos * consumo * f)
    p.gastoVivienda = Math.round(total * 0.45)          // ayuda en casa
    p.gastoVida = total - p.gastoVivienda               // tu vida (nivel de gasto)
  } else {
    p.gastoVivienda = 0
    p.gastoVida = Math.round(escala(p, 2400) * f)       // adulto estudiando en casa: gasto propio modesto
  }
  // Jubilado: vida algo más modesta que de activo, aplicado aquí (no como
  // un multiplicador suelto) para que el desglose siga cuadrando siempre.
  if (p.flags.includes('jubilado')) {
    p.gastoVivienda = Math.round(p.gastoVivienda * 0.9)
    p.gastoVida = Math.round(p.gastoVida * 0.9)
  }
  // Subida de nivel de vida (evento "nivel de vida" a los 50): permanente,
  // se aplica aquí para que el desglose no se desincronice del total.
  p.gastoVida = Math.round(p.gastoVida * p.nivelVidaFactor)
  p.gastoHijos = hijos
  p.gastos = p.gastoVivienda + p.gastoVida + p.gastoHijos
}

// ── Hitos vitales (al cambiar de año) ────────────────────────────────────────
function hitosDelAño(p, log) {
  if (p.edad === 25 && p.vivienda === 'familia') {
    p.vivienda = 'alquiler'
    p.alquilerAnual = Math.round(escala(p, 8400) * (p.flags.includes('capital') ? 1.4 : 1))
    log.push({ tipo: 'hito', texto: { es: `🏠 Te independizas: alquiler (${fmt(Math.round(p.alquilerAnual / 12))}/mes), facturas, comida, transporte. Ahora ahorras mucho menos del sueldo — bienvenido a la vida adulta.`, en: `🏠 You move out: rent (${fmt(Math.round(p.alquilerAnual / 12))}/mo), bills, food, transport. You now save much less of your salary — welcome to adult life.`, ca: `🏠 T'independitzes: lloguer (${fmt(Math.round(p.alquilerAnual / 12))}/mes), factures, menjar, transport. Ara estalvies molt menys del sou — benvingut a la vida adulta.` } })
  }
  // La experiencia también sube sueldos — sin título, con techo más bajo. Avisa siempre.
  if (!p.estudios && p.ingresos > 0 && !p.flags.includes('jubilado')) {
    if (!p.flags.includes('titulado')) {
      if (p.edad === 21 && p.ingresos < escala(p, 13500)) setIngresos(p, escala(p, 13500), log, { es: 'Con un par de años de experiencia, te suben.', en: 'With a couple of years\' experience, you get a raise.', ca: 'Amb un parell d\'anys d\'experiència, et pugen.' })
      if (p.edad === 26 && p.ingresos < escala(p, 16500)) setIngresos(p, escala(p, 16500), log, { es: 'Tu experiencia empieza a pesar en la nómina.', en: 'Your experience starts to show on the payslip.', ca: 'La teva experiència comença a pesar a la nòmina.' })
      if (p.edad === 33 && p.ingresos < escala(p, 18500)) setIngresos(p, escala(p, 18500), log, { es: 'Años de oficio: te consolidas.', en: 'Years on the job: you consolidate.', ca: 'Anys d\'ofici: et consolides.' })
    } else if (p.edad === 30 && p.ingresos < escala(p, 17000)) {
      setIngresos(p, escala(p, 17000), log, { es: 'Tu carrera coge tracción.', en: 'Your career gains traction.', ca: 'La teva carrera agafa tracció.' })
    }
  }
  // Revisión salarial automática: te lo dijeron al fichar, y aquí llega sola — no toda subida depende de pedirla
  if (p.flags.includes('revision-automatica') && p.ingresos > 0 && p.rng() < 0.7) {
    setIngresos(p, Math.round(p.ingresos * (1.02 + p.rng() * 0.03)), log, { es: 'Revisión salarial automática de la empresa.', en: 'Automatic company salary review.', ca: 'Revisió salarial automàtica de l\'empresa.' })
  }
  ajustarGastos(p)
  if (p.edad === 40) {
    const cafe = (1.5 * p.indice).toFixed(2).replace('.', ',')
    log.push({ tipo: 'hito', texto: {
      es: `📊 Te fijas en algo: el café que costaba 1,50 € cuando naciste ahora cuesta ${cafe} €. Es la inflación — cada euro compra un poco menos cada año. Por eso el dinero parado pierde valor aunque el número no cambie.`,
      en: `📊 You notice something: the coffee that cost €1.50 when you were born now costs €${cafe}. That's inflation — each euro buys a little less every year. That's why idle money loses value even if the number doesn't change.`,
      ca: `📊 T'adones d'una cosa: el cafè que costava 1,50 € quan vas néixer ara costa ${cafe} €. És la inflació — cada euro compra una mica menys cada any. Per això els diners aturats perden valor encara que el número no canviï.`,
    } })
  }
  if (p.edad === 67 && !p.flags.includes('jubilado')) {
    p.flags.push('jubilado')
    p.estudios = null
    p.paroMeses = 0
    // Traspaso de negocios: nadie regenta un bar a los 80
    for (const a of p.activos) {
      if (a.tipo === 'negocio' && a.estado === 'vivo') {
        const traspaso = Math.round(a.invertido * (0.9 + p.rng() * 0.9))
        a.estado = 'vendido'
        p.dinero += traspaso
        log.push({ tipo: 'bueno', texto: { es: `🔑 Traspasas ${a.nombre.es} por ${fmt(traspaso)}: los negocios también se jubilan.`, en: `🔑 You sell ${a.nombre.en} on for ${fmt(traspaso)}: businesses retire too.`, ca: `🔑 Traspasses ${a.nombre.ca} per ${fmt(traspaso)}: els negocis també es jubilen.` } })
      }
    }
    const factor = p.flags.includes('plan-pensiones') ? 0.72 : 0.58
    p.ingresos = Math.round(Math.max(p.ingresos, p.ingresosPrevios) * factor)
    ajustarGastos(p)   // recalcula ya con el flag 'jubilado' puesto: vida algo más modesta
    log.push({ tipo: 'hito', texto: { es: `👴 Te jubilas. Tu pensión es menor que tu último sueldo${p.flags.includes('plan-pensiones') ? ', pero tu plan de pensiones la complementa' : ''}. A partir de aquí, vives de lo sembrado.`, en: `👴 You retire. Your pension is lower than your last salary${p.flags.includes('plan-pensiones') ? ', but your pension plan tops it up' : ''}. From here on, you live off what you sowed.`, ca: `👴 Et jubiles. La pensió és menor que l'últim sou${p.flags.includes('plan-pensiones') ? ', però el pla de pensions la complementa' : ''}. A partir d'aquí, vius del que has sembrat.` } })
  }
}

// ── Estudios: fin de curso (junio) ───────────────────────────────────────────
function finDeCurso(p, log) {
  const e = p.estudios
  if (!e) return
  // La matrícula la cubre la familia (media/acomodada) o la beca-préstamo:
  // nunca sale de la hucha de un estudiante que no trabaja
  const matricula = escala(p, e.tipo === 'uni' ? 2200 : 1200)
  let pSuspenso = (e.tipo === 'uni' ? 0.16 : 0.10) + (e.riesgoExtra ?? 0)
  if (p.rng() < pSuspenso) {
    p.bienestar = clampB(p.bienestar - 4)
    log.push({ tipo: 'malo', texto: { es: `📕 Curso suspendido${e.mediaJornada ? ' — compaginar trabajo y estudios pasa factura' : ''}. Repites año: otra matrícula (${fmt(matricula)}) y doce meses más.`, en: `📕 Failed the year${e.mediaJornada ? ' — juggling work and study takes its toll' : ''}. You repeat: another tuition fee (${fmt(matricula)}) and twelve more months.`, ca: `📕 Curs suspès${e.mediaJornada ? ' — compaginar feina i estudis passa factura' : ''}. Repeteixes any: una altra matrícula (${fmt(matricula)}) i dotze mesos més.` } })
    return
  }
  e.añosRestantes -= 1
  if (e.añosRestantes > 0) {
    log.push({ tipo: 'hito', texto: { es: `📗 Curso aprobado (quedan ${e.añosRestantes}). La matrícula del que viene: ${fmt(matricula)}.`, en: `📗 Year passed (${e.añosRestantes} to go). Next year's tuition: ${fmt(matricula)}.`, ca: `📗 Curs aprovat (en queden ${e.añosRestantes}). La matrícula del que ve: ${fmt(matricula)}.` } })
    return
  }
  // Graduación: el título mejora tus opciones — no te cae un sueldo del cielo.
  // Toca buscar el primer empleo (lleva su tiempo) y elegir entre ofertas reales.
  p.estudios = null
  p.flags.push('titulado')
  p.tipoTituloPendiente = e.tipo
  p.buscandoEmpleoMeses = 2 + Math.floor(p.rng() * 5)   // 2 a 6 meses buscando
  ajustarGastos(p)
  log.push({ tipo: 'hito', texto: { es: '🎓 Título en mano. Ahora toca buscar el primer trabajo — rara vez es inmediato.', en: '🎓 Degree in hand. Now the search for a first job begins — it\'s rarely immediate.', ca: '🎓 Títol a la mà. Ara toca buscar la primera feina — rares vegades és immediat.' } })
}

// Ofertas del primer empleo tras graduarse: dos reales, con sus trade-offs —
// nunca un sueldo asignado en silencio. La suerte de mercado fija el nivel;
// elegir entre las dos ofertas sigue siendo tuyo.
function ofertaGraduacion(p) {
  const tipo = p.tipoTituloPendiente
  p.tipoTituloPendiente = null
  const bonus = p.flags.includes('curro-temprano') ? 0.05 : 0
  const pBueno = (tipo === 'uni' ? 0.65 : 0.60) + bonus
  const bueno = p.rng() < pBueno
  const [baseA, baseB] = tipo === 'uni'
    ? (bueno ? [12500, 13200] : [10200, 10800])
    : (bueno ? [10800, 11400] : [9000, 9500])
  const sueldoA = escala(p, baseA)
  const sueldoB = escala(p, baseB)
  return {
    id: 'oferta-graduacion',
    texto: bueno
      ? { es: '🎓 Título en mano y suerte en las entrevistas: te llegan dos ofertas reales. El título abrió la puerta; cuál cruzar es cosa tuya.', en: '🎓 Degree in hand and luck in interviews: two real offers come in. The degree opened the door; which to walk through is up to you.', ca: '🎓 Títol a la mà i sort a les entrevistes: et arriben dues ofertes reals. El títol va obrir la porta; quina creuar és cosa teva.' }
      : { es: '🎓 Título en mano… y un mercado frío. Ha costado, pero al final llegan dos ofertas — ninguna es la soñada, pero hay que empezar por algún sitio.', en: '🎓 Degree in hand… and a cold market. It took a while, but two offers finally arrive — neither is the dream job, but you have to start somewhere.', ca: '🎓 Títol a la mà… i un mercat fred. Ha costat, però al final arriben dues ofertes — cap és la somiada, però cal començar per algun lloc.' },
    opciones: [
      {
        id: 'estable',
        texto: { es: `Empresa grande, revisión salarial automática (${fmt(Math.round(sueldoA / 12))}/mes)`, en: `Large company, automatic salary review (${fmt(Math.round(sueldoA / 12))}/mo)`, ca: `Empresa gran, revisió salarial automàtica (${fmt(Math.round(sueldoA / 12))}/mes)` },
        aplicar: (p) => {
          p.ingresos = sueldoA
          p.flags.push('empleo-estable', 'revision-automatica')
          return { nota: { es: `Entras en un puesto estable (${fmt(Math.round(sueldoA / 12))}/mes). Menos brillante, pero las subidas llegarán solas.`, en: `You start a stable job (${fmt(Math.round(sueldoA / 12))}/mo). Less flashy, but raises will come on their own.`, ca: `Entres en un lloc estable (${fmt(Math.round(sueldoA / 12))}/mes). Menys brillant, però les pujades arribaran soles.` } }
        },
      },
      {
        id: 'ambiciosa',
        texto: { es: `Empresa pequeña, algo más de sueldo pero las subidas hay que pedirlas (${fmt(Math.round(sueldoB / 12))}/mes)`, en: `Small company, a bit more pay but you'll have to ask for raises (${fmt(Math.round(sueldoB / 12))}/mo)`, ca: `Empresa petita, una mica més de sou però les pujades s'han de demanar (${fmt(Math.round(sueldoB / 12))}/mes)` },
        aplicar: (p) => {
          p.ingresos = sueldoB
          p.flags.push('revision-manual')
          return { nota: { es: `Entras con algo más de sueldo (${fmt(Math.round(sueldoB / 12))}/mes), pero aquí nadie te lo sube si no lo pides tú.`, en: `You start with a bit more pay (${fmt(Math.round(sueldoB / 12))}/mo), but here nobody raises it unless you ask.`, ca: `Entres amb una mica més de sou (${fmt(Math.round(sueldoB / 12))}/mes), però aquí ningú te'l puja si no el demanes tu.` } }
        },
      },
    ],
  }
}

// Cuenta atrás de la búsqueda del primer empleo: mientras dura, sin ingresos
// (protegido de números rojos, igual que un estudiante). Al llegar a cero,
// materializa las ofertas — nunca antes de que "pase el tiempo" de verdad.
function tickBusquedaPrimerEmpleo(p) {
  if (!p.buscandoEmpleoMeses || p.buscandoEmpleoMeses <= 0) return null
  p.buscandoEmpleoMeses -= 1
  if (p.buscandoEmpleoMeses > 0) return null
  return ofertaGraduacion(p)
}

// ── Empleo: despido y recolocación (mensual) ─────────────────────────────────
function empleoMensual(p, log) {
  if (p.edad < 16 || p.flags.includes('jubilado') || p.estudios) return
  // En paro: cuenta atrás de la prestación + búsqueda
  if (p.paroMeses > 0) {
    p.paroMeses -= 1
    const pReempleo = 0.08 + (p.flags.includes('titulado') ? 0.03 : 0)
    if (p.rng() < pReempleo) {
      p.ingresos = Math.round(p.ingresosPrevios * (0.85 + p.rng() * 0.3))
      p.paroMeses = 0
      p.flags = p.flags.filter(f => f !== 'despedido')
      p.bienestar = clampB(p.bienestar + 6)
      log.push({ tipo: 'bueno', texto: { es: `💼 Nuevo trabajo (${fmt(Math.round(p.ingresos / 12))}/mes). El paro fue un puente, no un destino.`, en: `💼 New job (${fmt(Math.round(p.ingresos / 12))}/mo). Unemployment was a bridge, not a destination.`, ca: `💼 Nova feina (${fmt(Math.round(p.ingresos / 12))}/mes). L'atur va ser un pont, no una destinació.` } })
    } else if (p.paroMeses === 0) {
      p.ingresos = 0
      log.push({ tipo: 'malo', texto: { es: '🔻 Se agota la prestación de paro y sigues sin trabajo. Ahora tiran (solo) tus ahorros.', en: '🔻 Unemployment benefits run out and you\'re still jobless. Now (only) your savings carry you.', ca: '🔻 S\'esgota la prestació d\'atur i segueixes sense feina. Ara tiren (només) els teus estalvis.' } })
    }
    return
  }
  if (p.ingresos <= 0) {
    // Sin prestación: sigue buscando — solo si alguna vez tuviste empleo
    if (p.ingresosPrevios > 0 && p.rng() < 0.10) {
      p.ingresos = Math.round(p.ingresosPrevios * 0.85)
      log.push({ tipo: 'bueno', texto: { es: `💼 Por fin: trabajo nuevo (${fmt(Math.round(p.ingresos / 12))}/mes).`, en: `💼 At last: a new job (${fmt(Math.round(p.ingresos / 12))}/mo).`, ca: `💼 Per fi: feina nova (${fmt(Math.round(p.ingresos / 12))}/mes).` } })
    }
    return
  }
  // Con empleo: siempre existe un riesgo real de perderlo
  let pDespido = 0.003                                        // ~3,5% anual
  if (p.economia.crisisYears.has(p.edad)) pDespido *= 5
  if (p.flags.includes('startup')) pDespido *= 2.5
  if (p.flags.includes('empleo-estable')) pDespido *= 0.5
  if (p.señaladoMeses > 0) { pDespido *= 3; p.señaladoMeses -= 1 }
  if (p.rng() < pDespido) {
    p.ingresosPrevios = p.ingresos
    p.ingresos = Math.round(p.ingresos * 0.6)                 // prestación
    p.paroMeses = 18
    p.flags.push('despedido')
    p.bienestar = clampB(p.bienestar - 8)
    log.push({ tipo: 'malo', texto: { es: `📦 Te despiden${p.economia.crisisYears.has(p.edad) ? ' — la crisis se lleva puestos a miles' : ''}. Prestación de paro: el 60% de tu sueldo, máximo año y medio.`, en: `📦 You're laid off${p.economia.crisisYears.has(p.edad) ? ' — the crisis is taking thousands of jobs' : ''}. Unemployment benefit: 60% of your salary, for up to 18 months.`, ca: `📦 T'acomiaden${p.economia.crisisYears.has(p.edad) ? ' — la crisi s\'emporta llocs a milers' : ''}. Prestació d'atur: el 60% del teu sou, màxim any i mig.` } })
  }
}

// ── Mercados mensuales (fondo, acciones, cripto, coleccionismo, depósito) ────
function mercadosMensuales(p, log) {
  const bolsaMes = p.economia.bolsa[p.edad] / 12
  const infMes = p.economia.inflacion[p.edad] / 12
  const enCrisis = p.economia.crisisYears.has(p.edad)
  for (const a of p.activos) {
    if (a.estado !== 'vivo') continue
    if (a.tipo === 'fondo') {
      a.valor *= 1 + bolsaMes + normal(p.rng) * 0.012
    } else if (a.tipo === 'acciones') {
      a.valor *= 1 + bolsaMes * 1.1 + normal(p.rng) * 0.035
    } else if (a.tipo === 'cripto') {
      if (p.rng() < (enCrisis ? 0.02 : 0.006)) {
        const caida = 0.45 + p.rng() * 0.25
        a.valor *= 1 - caida
        log.push({ tipo: 'malo', texto: { es: `🪙 Desplome cripto: tu posición cae un ${Math.round(caida * 100)}% en semanas. Esto también era el trato.`, en: `🪙 Crypto crash: your position drops ${Math.round(caida * 100)}% in weeks. This was part of the deal too.`, ca: `🪙 Desplomada cripto: la teva posició cau un ${Math.round(caida * 100)}% en setmanes. Això també era el tracte.` } })
      } else {
        a.valor *= 1 + 0.009 + normal(p.rng) * 0.14
      }
    } else if (a.tipo === 'coleccion') {
      a.valor *= 1 + 0.003 + normal(p.rng) * 0.05
    } else if (a.tipo === 'deposito') {
      a.valor *= 1 + Math.max(0.0002, infMes - 0.00125)
    }
    a.valor = Math.max(0, a.valor)
  }
}

// ── Activos narrativos (negocios, chollos turbios, casa): resolución anual ───
function resolverActivosAnuales(p, log) {
  const { vivienda } = p.economia
  for (const a of p.activos) {
    if (a.estado !== 'vivo') continue
    const años = p.edad - a.edadCompra

    if (a.tipo === 'casa') {
      a.valor *= 1 + vivienda[p.edad]
    } else if (a.tipo === 'negocio') {
      if (p.rng() < a.oculto.pQuiebraAnual) {
        a.estado = 'quebrado'; a.valor = 0
        log.push({ tipo: 'malo', texto: { es: `💥 ${a.nombre.es} cierra. Pierdes lo invertido (${fmt(a.invertido)}).`, en: `💥 ${a.nombre.en} shuts down. You lose your investment (${fmt(a.invertido)}).`, ca: `💥 ${a.nombre.ca} tanca. Perds la inversió (${fmt(a.invertido)}).` } })
        p.autopsias.push({ edad: p.edad, tipo: 'mala', titulo: a.nombre, senales: a.senales, texto: { es: 'La mayoría de negocios pequeños no superan los 5 años. Puede salir bien — pero solo con dinero que puedas permitirte perder.', en: 'Most small businesses don\'t survive 5 years. It can work out — but only with money you can afford to lose.', ca: 'La majoria de negocis petits no superen els 5 anys. Pot sortir bé — però només amb diners que puguis permetre\'t perdre.' } })
      } else {
        const renta = Math.round(a.invertido * a.oculto.renta)
        p.dinero += renta
        if (años === 5) {
          p.autopsias.push({ edad: p.edad, tipo: 'buena', titulo: a.nombre, senales: a.senales, texto: { es: 'El negocio sobrevive y reparte cada año. Era arriesgado (muchos quiebran), pero era real, con plan, y solo pusiste lo que podías perder.', en: 'The business survives and pays out yearly. It was risky (many fail), but it was real, planned, and you only risked what you could lose.', ca: 'El negoci sobreviu i reparteix cada any. Era arriscat (molts fan fallida), però era real, amb pla, i només hi vas posar el que podies perdre.' } })
        }
      }
    } else if (a.tipo === 'casa2') {
      a.valor *= 1 + vivienda[p.edad]
      if (a.uso === 'alquiler') {
        const renta = Math.round(a.valor * 0.045)
        p.dinero += renta
        if (p.rng() < 0.05) {
          const dano = Math.round(a.valor * (0.05 + p.rng() * 0.1))
          a.valor = Math.max(0, a.valor - dano)
          log.push({ tipo: 'malo', texto: { es: `🔨 El inquilino de tu segunda vivienda se va dejando destrozos: -${fmt(dano)} en arreglos.`, en: `🔨 Your tenant leaves your second home trashed on the way out: -${fmt(dano)} in repairs.`, ca: `🔨 L'inquilí de la teva segona vivenda marxa deixant destrosses: -${fmt(dano)} en arranjaments.` } })
        } else if (p.rng() < 0.02) {
          a.uso = 'ocupada'
          log.push({ tipo: 'malo', texto: { es: '🚪 Te okupan la segunda vivienda: se acabó la renta hasta que consigas el desalojo — y eso lleva tiempo y abogados.', en: '🚪 Your second home gets squatted: no more rent until you get it evicted — and that takes time and lawyers.', ca: '🚪 Et okupen la segona vivenda: s\'ha acabat la renda fins que aconsegueixis el desnonament — i això porta temps i advocats.' } })
        }
      } else if (a.uso === 'vacia' && p.rng() < 0.03) {
        a.uso = 'ocupada'
        log.push({ tipo: 'malo', texto: { es: '🚪 Una vivienda vacía llama la atención: te la okupan. Sin alquiler, sin uso, y con un desalojo por delante.', en: '🚪 An empty home draws attention: it gets squatted. No rent, no use, and an eviction ahead.', ca: '🚪 Una vivenda buida crida l\'atenció: te la okupen. Sense lloguer, sense ús, i amb un desnonament per davant.' } })
      } else if (a.uso === 'vive') {
        p.bienestar = clampB(p.bienestar + 1)
      }
      if (a.uso === 'ocupada' && p.rng() < 0.3) {
        a.uso = 'vacia'
        log.push({ tipo: 'bueno', texto: { es: '⚖️ Consigues el desalojo tras meses de papeleo: tu segunda vivienda vuelve a estar libre para decidir qué hacer con ella.', en: '⚖️ You get the eviction after months of paperwork: your second home is free again to decide what to do with it.', ca: '⚖️ Aconsegueixes el desnonament després de mesos de paperassa: la teva segona vivenda torna a estar lliure per decidir què fer-ne.' } })
      }
    } else if (a.tipo === 'turbio') {
      if (p.rng() < a.oculto.pQuiebraAnual) {
        a.estado = 'quebrado'; a.valor = 0
        log.push({ tipo: 'malo', texto: { es: `💥 ${a.nombre.es} desaparece de la noche a la mañana. Pierdes ${fmt(a.invertido)}.`, en: `💥 ${a.nombre.en} vanishes overnight. You lose ${fmt(a.invertido)}.`, ca: `💥 ${a.nombre.ca} desapareix d'un dia per l'altre. Perds ${fmt(a.invertido)}.` } })
        p.autopsias.push({ edad: p.edad, tipo: 'mala', titulo: a.nombre, senales: a.senales, texto: { es: `Tenía un ${Math.round(a.oculto.pQuiebraAnual * 100)}% de probabilidad de esfumarse CADA año. Las señales estaban ahí: varias juntas no son una oportunidad — son un anzuelo.`, en: `It had a ${Math.round(a.oculto.pQuiebraAnual * 100)}% chance of vanishing EVERY year. The signals were there: several together aren't an opportunity — they're bait.`, ca: `Tenia un ${Math.round(a.oculto.pQuiebraAnual * 100)}% de probabilitat d'esfumar-se CADA any. Els senyals hi eren: diversos junts no són una oportunitat — són un ham.` } })
      } else {
        a.valor *= 1 + a.oculto.retorno + normal(p.rng) * a.oculto.vol
        if (años >= a.oculto.horizonte) {
          a.estado = 'vendido'
          p.dinero += Math.max(0, Math.round(a.valor))
          const gano = a.valor > a.invertido
          log.push({ tipo: gano ? 'bueno' : 'malo', texto: { es: `${gano ? '🍀' : '📉'} Recuperas ${fmt(Math.max(0, a.valor))} de ${a.nombre.es} (pusiste ${fmt(a.invertido)}).`, en: `${gano ? '🍀' : '📉'} You cash out ${fmt(Math.max(0, a.valor))} from ${a.nombre.en} (you put in ${fmt(a.invertido)}).`, ca: `${gano ? '🍀' : '📉'} Recuperes ${fmt(Math.max(0, a.valor))} de ${a.nombre.ca} (hi vas posar ${fmt(a.invertido)}).` } })
          if (gano) p.autopsias.push({ edad: p.edad, tipo: 'neutra', titulo: a.nombre, senales: a.senales, texto: { es: `Esta vez salió bien — pero tenía un ${Math.round(a.oculto.pQuiebraAnual * 100)}% de quiebra anual. Que una apuesta salga bien no la convierte en buena decisión.`, en: `It worked out this time — but it had a ${Math.round(a.oculto.pQuiebraAnual * 100)}% yearly collapse chance. A bet paying off doesn't make it a good decision.`, ca: `Aquesta vegada va sortir bé — però tenia un ${Math.round(a.oculto.pQuiebraAnual * 100)}% de fallida anual. Que una aposta surti bé no la converteix en bona decisió.` } })
        }
      }
    }
  }
}

// ── Selección del evento del año ─────────────────────────────────────────────
function elegirEvento(p) {
  const elegibles = EVENTOS.filter(ev =>
    p.edad >= ev.edad[0] && p.edad <= ev.edad[1] &&
    !p.usados.includes(ev.id) &&
    !p.omitidos.includes(ev.id) &&
    (ev.requiere ?? []).every(f => p.flags.includes(f)) &&
    !(ev.sinFlags ?? []).some(f => p.flags.includes(f)) &&
    (ev.condicion == null || ev.condicion(p))
  )
  if (elegibles.length === 0) return null
  // Sin ingresos no hay préstamo posible: si tus estudios dependen de trabajar, no se deja al azar
  if (p.flags.includes('necesita-trabajar') && p.ingresos <= 0) {
    const forzoso = elegibles.find(ev => ev.id === 'trabajo-estudiante')
    if (forzoso) return forzoso
  }
  const urgentes = elegibles.filter(ev => ev.edad[1] === p.edad)
  if (urgentes.length > 0) return urgentes[Math.floor(p.rng() * urgentes.length)]
  if (p.rng() < 0.75) return elegibles[Math.floor(p.rng() * elegibles.length)]
  return null
}

// ── Tick MENSUAL. Devuelve { logs, evento, fin } ─────────────────────────────
export function avanzarMes(p) {
  const log = []
  p.mes += 1
  p.mesesTotales += 1
  let evento = null

  if (p.mes >= 12) {
    // ── Cambio de año ──
    p.mes = 0
    p.edad += 1
    if (p.edad >= p.edadFinal) {
      p.fin = true
      return { logs: log, evento: null, fin: true }
    }
    const inf = p.economia.inflacion[p.edad]
    p.indice *= 1 + inf
    p.ingresos = Math.round(p.ingresos * (1 + inf * 0.9))   // el sueldo va por detrás de los precios
    p.gastos = Math.round(p.gastos * (1 + inf))
    p.alquilerAnual = Math.round(p.alquilerAnual * (1 + inf))

    if (p.economia.crisisYears.has(p.edad) && !p.economia.crisisYears.has(p.edad - 1)) {
      log.push({ tipo: 'malo', texto: { es: '📰 CRISIS ECONÓMICA. Los mercados se desploman y hay despidos por todas partes.', en: '📰 ECONOMIC CRISIS. Markets crash and layoffs are everywhere.', ca: '📰 CRISI ECONÒMICA. Els mercats s\'enfonsen i hi ha acomiadaments a tot arreu.' } })
    }
    hitosDelAño(p, log)
    resolverActivosAnuales(p, log)

    // El modo de vida pesa año a año sobre el ánimo
    if (p.modoVida === 'ajustado') p.bienestar = clampB(p.bienestar - 1)
    if (p.modoVida === 'alegre') p.bienestar = clampB(p.bienestar + 1)
    // Resiliencia: sin sobresaltos, el ánimo tiende a un punto medio (ni euforia
    // ni hundimiento permanentes). Los golpes de la vida lo mueven; el tiempo cura.
    p.bienestar = clampB(Math.round(p.bienestar + (52 - p.bienestar) * 0.07))

    if (p.hipoteca) {
      p.hipoteca.años -= 1
      p.hipoteca.pendiente = Math.max(0, p.hipoteca.pendiente - p.hipoteca.cuota * 0.75)
      if (p.hipoteca.años <= 0) {
        p.hipoteca = null
        p.flags.push('casa-pagada')
        log.push({ tipo: 'bueno', texto: { es: '🎉 ¡Última cuota de la hipoteca! La casa es tuya. La cuota fija de hace 25 años se había quedado pequeña gracias a la inflación.', en: '🎉 Final mortgage payment! The house is yours. The fixed payment from 25 years ago had become small thanks to inflation.', ca: '🎉 Última quota de la hipoteca! La casa és teva. La quota fixa de fa 25 anys s\'havia quedat petita gràcies a la inflació.' } })
      }
    }

    evento = elegirEvento(p)
    if (evento) {
      p.usados.push(evento.id)
      // El mundo de la inversión se descubre cuando la vida te lo presenta
      if (['primer-colchon', 'fondo-indexado', 'cripto-gimnasio'].includes(evento.id) && !p.flags.includes('sabe-invertir')) {
        p.flags.push('sabe-invertir')
      }
    }
  }

  // ── Cada mes ──
  if (p.mes === 8) finDeCurso(p, log)         // junio: notas, matrículas y graduación
  if (!evento) {
    const ofertaEv = tickBusquedaPrimerEmpleo(p)
    if (ofertaEv) evento = ofertaEv
  }
  empleoMensual(p, log)
  mercadosMensuales(p, log)

  // La paga se ingresa MES a MES (no de golpe a fin de año)
  if (p.pagaAhorroMes > 0 && p.edad < 16) p.dinero += p.pagaAhorroMes

  // Flujo de caja mensual
  let cuotaMes = (p.hipoteca?.cuota ?? 0) / 12
  for (const pr of p.prestamos) {
    cuotaMes += pr.cuotaMes
    pr.pendiente = Math.max(0, pr.pendiente - pr.cuotaMes)
    pr.meses -= 1
  }
  const saldados = p.prestamos.some(pr => pr.meses <= 0)
  if (saldados) {
    p.prestamos = p.prestamos.filter(pr => pr.meses > 0)
    log.push({ tipo: 'bueno', texto: { es: '✅ Última cuota del préstamo: deuda saldada.', en: '✅ Final loan instalment: debt cleared.', ca: '✅ Última quota del préstec: deute saldat.' } })
  }
  const extraEstudios = p.estudios?.mediaJornada ? escala(p, p.estudios.sueldoJornada ?? 7200) : 0
  const antesDinero = p.dinero
  p.dinero += (p.ingresos + extraEstudios - p.gastos - p.alquilerAnual) / 12 - cuotaMes

  // Un menor de edad no acumula deuda: la familia cubre lo esencial.
  // Un estudiante sin ingresos tampoco, ni quien busca su primer empleo tras
  // graduarse: sin nómina no hay banco que preste, así que no hay números
  // rojos posibles — la única salida es trabajar o dejarlo.
  const sinIngresosProtegido = (p.estudios && p.ingresos <= 0) || p.buscandoEmpleoMeses > 0
  if ((p.edad < 18 || sinIngresosProtegido) && p.dinero < antesDinero && p.dinero < 0) p.dinero = Math.max(0, antesDinero)

  // Apretarse el cinturón: si trabajas y la cuenta se pone en rojo por vivir
  // (no por deudas), recortas gastos automáticamente. No te arruinas por comer,
  // simplemente ahorras poco o nada — el drama del alquiler de por vida.
  const soloVivir = (p.prestamos?.length ?? 0) === 0 && !p.hipoteca
  if (p.dinero < 0 && p.ingresos > 0 && soloVivir && !p.flags.includes('arruinado')) {
    if (p.modoVida !== 'ajustado') { p.modoVida = 'ajustado'; ajustarGastos(p) }
    p.dinero = Math.max(p.dinero, -escala(p, 1500))
  }

  // Números rojos: interés mensual y noches sin dormir. Tras una quiebra
  // nadie te presta más: la deuda toca suelo y se vive al día.
  if (p.flags.includes('arruinado')) {
    p.dinero = Math.max(p.dinero, -escala(p, 8000))
  }
  if (p.dinero < 0) {
    // Sin redondear: el 1% mensual muerde también a las deudas pequeñas
    p.dinero = p.dinero * 1.01
    // El ánimo solo se resiente de verdad con una deuda seria (no el sobregiro
    // de supervivencia): vivir apretado desgasta, pero no como ahogarse en deudas.
    if (p.mes % 4 === 0 && p.dinero < -escala(p, 3000)) {
      p.bienestar = clampB(p.bienestar - 2)
      log.push({ tipo: 'malo', texto: { es: `🔴 Números rojos (${fmt(p.dinero)}): el descubierto cobra intereses y quita el sueño.`, en: `🔴 In the red (${fmt(p.dinero)}): the overdraft charges interest and steals sleep.`, ca: `🔴 Números vermells (${fmt(p.dinero)}): el descobert cobra interessos i treu la son.` } })
    }
  }

  // El banco no presta sin fin: liquidación forzosa y, si no basta, quiebra
  if (p.dinero < -escala(p, 15000) && !p.flags.includes('arruinado')) {
    let liquidado = 0
    for (const a of p.activos) {
      if (a.estado === 'vivo' && ['fondo', 'acciones', 'cripto', 'coleccion', 'deposito'].includes(a.tipo)) {
        liquidado += Math.round(a.valor * (a.tipo === 'coleccion' ? 0.7 : 0.9))
        a.estado = 'vendido'
      }
    }
    if (liquidado > 0) {
      p.dinero += liquidado
      log.push({ tipo: 'malo', texto: { es: `⚖️ El banco fuerza la venta de tus inversiones (${fmt(liquidado)}) para cubrir la deuda. Vender con prisas siempre sale peor.`, en: `⚖️ The bank forces the sale of your investments (${fmt(liquidado)}) to cover the debt. Selling in a hurry always goes worse.`, ca: `⚖️ El banc força la venda de les teves inversions (${fmt(liquidado)}) per cobrir el deute. Vendre amb presses sempre surt pitjor.` } })
    }
    if (p.dinero < -escala(p, 10000)) {
      p.flags.push('arruinado')
      p.prestamos = []
      p.dinero = -escala(p, 2000)
      p.bienestar = clampB(p.bienestar - 20)
      log.push({ tipo: 'malo', texto: { es: '🏚️ Quiebra personal: concurso de acreedores. Las deudas se reestructuran y empiezas casi de cero, con la mochila (y el historial crediticio) cargados.', en: '🏚️ Personal bankruptcy: creditors\' arrangement. Debts are restructured and you start almost from zero, with a heavy load (and credit record).', ca: '🏚️ Fallida personal: concurs de creditors. Els deutes es reestructuren i comences gairebé de zero, amb la motxilla (i l\'historial creditici) carregats.' } })
      p.autopsias.push({ edad: p.edad, tipo: 'mala', titulo: { es: 'La quiebra personal', en: 'Personal bankruptcy', ca: 'La fallida personal' }, senales: [], texto: { es: 'La deuda compone igual que el interés — pero en contra. Cuando los gastos superan a los ingresos mes tras mes, no hay inversión que lo arregle: primero se tapa el agujero, después se invierte.', en: 'Debt compounds just like interest — but against you. When expenses beat income month after month, no investment fixes it: first plug the hole, then invest.', ca: 'El deute compon igual que l\'interès — però en contra. Quan les despeses superen els ingressos mes rere mes, no hi ha inversió que ho arregli: primer es tapa el forat, després s\'inverteix.' } })
    }
  }

  return { logs: log, evento, fin: false }
}

// ── Aplicar la opción elegida ────────────────────────────────────────────────
// `extra` transporta datos de UI (p. ej. el % del deslizador de la paga)
export function elegirOpcion(p, evento, opcion, extra) {
  const ctx = crearCtx(p, evento)
  const resultado = opcion.aplicar ? opcion.aplicar(p, ctx, extra) : null
  p.historial.push({ edad: p.edad, eventoId: evento.id, opcionId: opcion.id })
  return resultado
}
