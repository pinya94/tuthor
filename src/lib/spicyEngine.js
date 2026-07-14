// ── Motor de "Spicy" ─────────────────────────────────────────────────────────
// Simulación económica por turnos: 1 año = 1 tick. Cada partida tiene una
// seed que genera su línea económica (inflación, bolsa, vivienda, crisis):
// misma seed + mismas decisiones = misma vida.
//
// Principio pedagógico central: los números de riesgo (pQuiebra, retornos)
// viven OCULTOS en cada activo; el jugador solo ve señales cualitativas
// ("no regulado", "rentabilidad garantizada", "te lo ofrece un conocido").
// Los números reales solo se revelan en la autopsia, cuando el riesgo ya se
// materializó (o no). Nunca convertir una decisión en cálculo de valor esperado.

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
}

// ── Línea económica de la partida ────────────────────────────────────────────
function generarEconomia(rng) {
  const inflacion = [], bolsa = [], vivienda = []
  // 2 crisis en la vida adulta + burbuja previa a la primera
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
  return { inflacion, bolsa, vivienda, crisis: [crisis1, crisis2] }
}

// ── Partida nueva ────────────────────────────────────────────────────────────
export function crearPartida(seed = Math.floor(Math.random() * 2 ** 31)) {
  const rng = mulberry32(seed)
  const economia = generarEconomia(rng)
  // No todas las vidas tienen los mismos eventos: los que declaran `prob`
  // pueden no existir en esta vida (no siempre hay cromo, herencia o sobrina)
  const omitidos = EVENTOS.filter(ev => ev.prob != null && rng() > ev.prob).map(ev => ev.id)
  return {
    seed, rng, economia, omitidos,
    edad: 6,
    edadFinal: 82 + Math.floor(rng() * 9),   // 82-90
    dinero: 15,                               // la hucha del niño
    ingresos: 0, gastos: 0,
    bienestar: 65,                            // 0-100: salud/felicidad — el dinero no lo es todo
    vivienda: 'familia',                      // familia | alquiler | propia
    alquilerAnual: 0,
    hipoteca: null,                           // { pendiente, cuota, años }
    prestamos: [],                            // [{ pendiente, cuota, años }]
    activos: [],
    flags: [],
    usados: [],
    historial: [],                            // decisiones para el resumen final
    autopsias: [],                            // lecciones reveladas
    experiencias: [],                         // vivencias compradas (viajes, bodas…) — abren caminos
    indice: 1,                                // índice de precios (1 = euros de hoy al empezar)
    fin: false,
  }
}

// ── Helpers de dinero ────────────────────────────────────────────────────────
export function fmt(n) {
  return `${Math.round(n).toLocaleString('es-ES')} €`
}
// Cantidad base (en € del año 0) escalada al índice de precios actual
export function escala(p, base) {
  const v = base * p.indice
  if (v < 200) return Math.round(v)
  if (v < 5000) return Math.round(v / 50) * 50
  return Math.round(v / 500) * 500
}

// Factor de variación por vida y evento (0.75–1.45, estable dentro de la run):
// la herencia de esta vida no es la de la anterior
export function factorEvento(p, eventoId) {
  let h = 0
  for (let i = 0; i < eventoId.length; i++) h = (h * 31 + eventoId.charCodeAt(i)) | 0
  return 0.75 + mulberry32(p.seed ^ h)() * 0.7
}

// Cantidad de un evento: base × factor de esta vida × inflación acumulada
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

// Nota financiera 0-10000 (escala log — cabe en el tope del leaderboard)
export function notaFinanciera(p) {
  const real = Math.max(0, patrimonioReal(p))
  return Math.max(0, Math.min(10000, Math.round(1500 * Math.log(1 + real / 10000))))
}

// ── Contexto que reciben los eventos (su función aplicar) ────────────────────
function crearCtx(p, evento) {
  return {
    rng: p.rng,
    f: fmt,
    cant: nombre => cantEvento(p, evento, nombre),
    dinero: delta => { p.dinero += delta },
    flag: f => { if (!p.flags.includes(f)) p.flags.push(f) },
    tieneFlag: f => p.flags.includes(f),
    bienestar: delta => { p.bienestar = Math.max(0, Math.min(100, p.bienestar + delta)) },
    // Los riesgos ocultos también varían por vida: la cripto de esta run
    // puede ser menos (o más) letal que la de la anterior
    activo: def => {
      const oculto = def.oculto?.pQuiebraAnual != null
        ? { ...def.oculto, pQuiebraAnual: Math.min(0.9, def.oculto.pQuiebraAnual * (0.65 + p.rng() * 0.7)) }
        : def.oculto
      p.activos.push({ estado: 'vivo', edadCompra: p.edad, valor: def.invertido, ...def, oculto })
    },
    // Préstamo al consumo/negocio: recibes el importe como inversión, pagas
    // cuotas con interés. Apalancarse multiplica ambos finales.
    prestamo: ({ importe, años = 5, interes = 0.25 }) => {
      const total = Math.round(importe * (1 + interes))
      p.prestamos.push({ pendiente: total, cuota: Math.round(total / años), años })
    },
    autopsia: a => { p.autopsias.push({ edad: p.edad, ...a }) },
    experiencia: titulo => { p.experiencias.push({ edad: p.edad, titulo }) },
  }
}

// Interpola {nombre} de cantidades en un texto trilingüe
export function interpolar(p, evento, textoObj) {
  if (!textoObj) return textoObj
  const out = {}
  for (const l of ['es', 'en', 'ca']) {
    let t = textoObj[l] ?? textoObj.es
    if (evento.cantidades) {
      for (const nombre of Object.keys(evento.cantidades)) {
        t = t.replaceAll(`{${nombre}}`, fmt(cantEvento(p, evento, nombre)))
      }
    }
    out[l] = t
  }
  return out
}

// ── Hitos vitales automáticos (sin decisión) ─────────────────────────────────
function hitosDelAño(p, log) {
  if (p.edad === 18) {
    p.ingresos = escala(p, 14000)
    p.gastos = escala(p, 7000)
    log.push({ tipo: 'hito', texto: { es: '🎓 Terminas los estudios y empiezas a trabajar. Sigues viviendo con tu familia: es la época dorada para ahorrar.', en: '🎓 You finish school and start working. Still living with your family: the golden age for saving.', ca: "🎓 Acabes els estudis i comences a treballar. Encara vius amb la família: l'època daurada per estalviar." } })
  }
  if (p.edad === 25) {
    p.ingresos = escala(p, 24000)
    p.gastos = escala(p, 10000)
    if (p.vivienda === 'familia') {
      p.vivienda = 'alquiler'
      p.alquilerAnual = escala(p, 8400)
      log.push({ tipo: 'hito', texto: { es: '🏠 Te independizas: trabajo mejor pagado, pero ahora pagas alquiler. Bienvenido a la vida adulta.', en: '🏠 You move out: better-paid job, but now you pay rent. Welcome to adult life.', ca: '🏠 T\'independitzes: feina més ben pagada, però ara pagues lloguer. Benvingut a la vida adulta.' } })
    }
  }
  if (p.edad === 40) {
    const cafe = (1.5 * p.indice).toFixed(2).replace('.', ',')
    log.push({ tipo: 'hito', texto: {
      es: `📊 Te fijas en algo: el café que costaba 1,50 € cuando naciste ahora cuesta ${cafe} €. Es la inflación — los precios suben cada año y cada euro compra un poco menos. Por eso el dinero parado en la cuenta pierde valor aunque el número no cambie.`,
      en: `📊 You notice something: the coffee that cost €1.50 when you were born now costs €${cafe}. That's inflation — prices rise every year and each euro buys a little less. That's why money sitting in your account loses value even if the number doesn't change.`,
      ca: `📊 T'adones d'una cosa: el cafè que costava 1,50 € quan vas néixer ara costa ${cafe} €. És la inflació — els preus pugen cada any i cada euro compra una mica menys. Per això els diners aturats al compte perden valor encara que el número no canviï.`,
    } })
  }
  if (p.edad === 67 && !p.flags.includes('jubilado')) {
    p.flags.push('jubilado')
    const factor = p.flags.includes('plan-pensiones') ? 0.72 : 0.58
    p.ingresos = Math.round(p.ingresos * factor)
    p.gastos = Math.round(p.gastos * 0.9)
    log.push({ tipo: 'hito', texto: { es: `👴 Te jubilas. Tu pensión es menor que tu último sueldo${p.flags.includes('plan-pensiones') ? ', pero tu plan de pensiones la complementa' : ''}. A partir de aquí, vives de lo sembrado.`, en: `👴 You retire. Your pension is lower than your last salary${p.flags.includes('plan-pensiones') ? ', but your pension plan tops it up' : ''}. From here on, you live off what you sowed.`, ca: `👴 Et jubiles. La pensió és menor que l'últim sou${p.flags.includes('plan-pensiones') ? ', però el pla de pensions la complementa' : ''}. A partir d'aquí, vius del que has sembrat.` } })
  }
}

// ── Resolución anual de activos ──────────────────────────────────────────────
function resolverActivos(p, log) {
  const { inflacion, bolsa, vivienda } = p.economia
  for (const a of p.activos) {
    if (a.estado !== 'vivo') continue
    const años = p.edad - a.edadCompra

    if (a.tipo === 'deposito') {
      a.valor *= 1 + Math.max(0.002, inflacion[p.edad] - 0.015)
    } else if (a.tipo === 'fondo') {
      a.valor *= 1 + bolsa[p.edad]
    } else if (a.tipo === 'casa') {
      a.valor *= 1 + vivienda[p.edad]
    } else if (a.tipo === 'negocio') {
      if (p.rng() < a.oculto.pQuiebraAnual) {
        a.estado = 'quebrado'; a.valor = 0
        log.push({ tipo: 'malo', texto: { es: `💥 ${a.nombre.es} cierra. Pierdes lo invertido (${fmt(a.invertido)}).`, en: `💥 ${a.nombre.en} shuts down. You lose your investment (${fmt(a.invertido)}).`, ca: `💥 ${a.nombre.ca} tanca. Perds la inversió (${fmt(a.invertido)}).` } })
        p.autopsias.push({ edad: p.edad, tipo: 'mala', titulo: a.nombre, senales: a.senales, texto: { es: `La mayoría de negocios pequeños no superan los 5 años. Invertir en el negocio de un amigo puede salir bien, pero solo con dinero que puedas permitirte perder.`, en: `Most small businesses don't survive 5 years. Backing a friend's venture can work out — but only with money you can afford to lose.`, ca: `La majoria de negocis petits no superen els 5 anys. Invertir en el negoci d'un amic pot sortir bé, però només amb diners que puguis permetre't perdre.` } })
      } else {
        const renta = Math.round(a.invertido * a.oculto.renta)
        p.dinero += renta
        if (años === 5) {
          p.autopsias.push({ edad: p.edad, tipo: 'buena', titulo: a.nombre, senales: a.senales, texto: { es: `El negocio sobrevive y reparte beneficios cada año. Era arriesgado (casi la mitad quiebran), pero era un negocio real, de alguien de confianza, y solo pusiste dinero que podías perder.`, en: `The business survives and pays out every year. It was risky (nearly half fail), but it was a real business, run by someone you trust, and you only risked money you could lose.`, ca: `El negoci sobreviu i reparteix beneficis cada any. Era arriscat (gairebé la meitat fan fallida), però era un negoci real, d'algú de confiança, i només hi vas posar diners que podies perdre.` } })
        }
      }
    } else if (a.tipo === 'turbio') {
      if (p.rng() < a.oculto.pQuiebraAnual) {
        a.estado = 'quebrado'; a.valor = 0
        log.push({ tipo: 'malo', texto: { es: `💥 ${a.nombre.es} desaparece de la noche a la mañana. Pierdes ${fmt(a.invertido)}.`, en: `💥 ${a.nombre.en} vanishes overnight. You lose ${fmt(a.invertido)}.`, ca: `💥 ${a.nombre.ca} desapareix d'un dia per l'altre. Perds ${fmt(a.invertido)}.` } })
        p.autopsias.push({ edad: p.edad, tipo: 'mala', titulo: a.nombre, senales: a.senales, texto: { es: `Tenía un ${Math.round(a.oculto.pQuiebraAnual * 100)}% de probabilidad de esfumarse CADA año. Las señales estaban ahí: cuando veas varias juntas, no es una oportunidad — es un anzuelo.`, en: `It had a ${Math.round(a.oculto.pQuiebraAnual * 100)}% chance of vanishing EVERY year. The signals were there: when you see several together, it's not an opportunity — it's bait.`, ca: `Tenia un ${Math.round(a.oculto.pQuiebraAnual * 100)}% de probabilitat d'esfumar-se CADA any. Els senyals hi eren: quan en vegis diversos junts, no és una oportunitat — és un ham.` } })
      } else {
        a.valor *= 1 + a.oculto.retorno + normal(p.rng) * a.oculto.vol
        if (años >= a.oculto.horizonte) {
          a.estado = 'vendido'
          p.dinero += Math.max(0, Math.round(a.valor))
          const gano = a.valor > a.invertido
          log.push({ tipo: gano ? 'bueno' : 'malo', texto: { es: `${gano ? '🍀' : '📉'} Recuperas ${fmt(Math.max(0, a.valor))} de ${a.nombre.es} (pusiste ${fmt(a.invertido)}).`, en: `${gano ? '🍀' : '📉'} You cash out ${fmt(Math.max(0, a.valor))} from ${a.nombre.en} (you put in ${fmt(a.invertido)}).`, ca: `${gano ? '🍀' : '📉'} Recuperes ${fmt(Math.max(0, a.valor))} de ${a.nombre.ca} (hi vas posar ${fmt(a.invertido)}).` } })
          if (gano) p.autopsias.push({ edad: p.edad, tipo: 'neutra', titulo: a.nombre, senales: a.senales, texto: { es: `Esta vez salió bien — pero tenía un ${Math.round(a.oculto.pQuiebraAnual * 100)}% de quiebra anual. Que una apuesta salga bien no la convierte en buena decisión: la mayoría de quienes entran en esto, pierden.`, en: `It worked out this time — but it had a ${Math.round(a.oculto.pQuiebraAnual * 100)}% yearly chance of collapse. A bet paying off doesn't make it a good decision: most people who try this lose.`, ca: `Aquesta vegada va sortir bé — però tenia un ${Math.round(a.oculto.pQuiebraAnual * 100)}% de fallida anual. Que una aposta surti bé no la converteix en bona decisió: la majoria dels qui hi entren, perden.` } })
        }
      }
    }
  }
}

// ── Crisis: efectos sobre el empleo ──────────────────────────────────────────
function efectosCrisis(p, log) {
  if (!p.economia.crisis.includes(p.edad)) return
  log.push({ tipo: 'malo', texto: { es: '📰 CRISIS ECONÓMICA. Los mercados se desploman y hay despidos por todas partes.', en: '📰 ECONOMIC CRISIS. Markets crash and layoffs are everywhere.', ca: '📰 CRISI ECONÒMICA. Els mercats s\'enfonsen i hi ha acomiadaments a tot arreu.' } })
  if (p.flags.includes('startup') && !p.flags.includes('despedido') && p.edad < 67) {
    if (p.rng() < 0.6) {
      p.flags.push('despedido')
      p.ingresos = Math.round(p.ingresos * 0.3)
      log.push({ tipo: 'malo', texto: { es: '📦 Tu startup no aguanta la crisis: te despiden. Cobras paro una temporada.', en: '📦 Your startup doesn\'t survive the crisis: you\'re laid off. You live on benefits for a while.', ca: '📦 La teva startup no aguanta la crisi: t\'acomiaden. Cobres atur una temporada.' } })
      p.autopsias.push({ edad: p.edad, tipo: 'mala', titulo: { es: 'El sueldo alto de la startup', en: 'The startup\'s high salary', ca: 'El sou alt de la startup' }, senales: ['conocido'], texto: { es: 'El +35% de sueldo tenía un coste oculto: fragilidad. Las empresas jóvenes sin beneficios son las primeras en caer cuando la economía se tuerce.', en: 'The +35% salary had a hidden cost: fragility. Young unprofitable companies are the first to fall when the economy turns.', ca: 'El +35% de sou tenia un cost ocult: fragilitat. Les empreses joves sense beneficis són les primeres a caure quan l\'economia es torça.' } })
    }
  }
}

// Recuperación tras despido
function recuperarEmpleo(p, log) {
  if (p.flags.includes('despedido') && !p.flags.includes('recolocado') && p.edad < 67) {
    if (p.rng() < 0.5) {
      p.flags.push('recolocado')
      p.ingresos = escala(p, 22000)
      log.push({ tipo: 'bueno', texto: { es: '💼 Encuentras trabajo de nuevo. Algo menos de sueldo que antes, pero estable.', en: '💼 You find a job again. Slightly lower pay than before, but stable.', ca: '💼 Trobes feina de nou. Una mica menys de sou que abans, però estable.' } })
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
  // Los que se acaban este año son obligatorios; el resto, con probabilidad
  const urgentes = elegibles.filter(ev => ev.edad[1] === p.edad)
  if (urgentes.length > 0) return urgentes[Math.floor(p.rng() * urgentes.length)]
  if (p.rng() < 0.75) return elegibles[Math.floor(p.rng() * elegibles.length)]
  return null
}

// ── Tick anual. Devuelve { logs, evento, fin } ───────────────────────────────
export function avanzarAño(p) {
  const log = []
  p.edad += 1
  if (p.edad >= p.edadFinal) {
    p.fin = true
    return { logs: log, evento: null, fin: true }
  }

  const inf = p.economia.inflacion[p.edad]
  p.indice *= 1 + inf
  // Los sueldos suelen ir un poco por detrás de los precios
  p.ingresos = Math.round(p.ingresos * (1 + inf * 0.9))
  p.gastos = Math.round(p.gastos * (1 + inf))
  p.alquilerAnual = Math.round(p.alquilerAnual * (1 + inf))

  hitosDelAño(p, log)
  efectosCrisis(p, log)
  recuperarEmpleo(p, log)

  // Flujo de caja del año
  let cuota = 0
  if (p.hipoteca) {
    cuota = p.hipoteca.cuota
    p.hipoteca.años -= 1
    p.hipoteca.pendiente = Math.max(0, p.hipoteca.pendiente - p.hipoteca.cuota * 0.75)
    if (p.hipoteca.años <= 0) {
      p.hipoteca = null
      p.flags.push('casa-pagada')
      log.push({ tipo: 'bueno', texto: { es: '🎉 ¡Última cuota de la hipoteca! La casa es tuya. Gracias a la inflación, la cuota fija de hace 25 años se había quedado pequeña.', en: '🎉 Final mortgage payment! The house is yours. Thanks to inflation, the fixed payment from 25 years ago had become small.', ca: '🎉 Última quota de la hipoteca! La casa és teva. Gràcies a la inflació, la quota fixa de fa 25 anys s\'havia quedat petita.' } })
    }
  }
  // Préstamos al consumo/negocio: cuota anual fija
  let cuotasPrestamos = 0
  p.prestamos ??= []
  for (const pr of p.prestamos) {
    cuotasPrestamos += pr.cuota
    pr.pendiente = Math.max(0, pr.pendiente - pr.cuota)
    pr.años -= 1
  }
  const pagados = p.prestamos.filter(pr => pr.años <= 0)
  if (pagados.length > 0) {
    p.prestamos = p.prestamos.filter(pr => pr.años > 0)
    log.push({ tipo: 'bueno', texto: { es: '✅ Última cuota del préstamo: deuda saldada.', en: '✅ Final loan instalment: debt cleared.', ca: '✅ Última quota del préstec: deute saldat.' } })
  }

  p.dinero += p.ingresos - p.gastos - p.alquilerAnual - cuota - cuotasPrestamos

  // Números rojos: la deuda cobra intereses y quita el sueño
  if (p.dinero < 0) {
    p.dinero = Math.round(p.dinero * 1.12)
    p.bienestar = Math.max(0, p.bienestar - 4)
    log.push({ tipo: 'malo', texto: { es: `🔴 Estás en números rojos (${fmt(p.dinero)}). El banco te cobra un 12% de interés por el descubierto — y tú lo pagas en noches sin dormir.`, en: `🔴 You're in the red (${fmt(p.dinero)}). The bank charges 12% interest on your overdraft — and you pay it in sleepless nights.`, ca: `🔴 Estàs en números vermells (${fmt(p.dinero)}). El banc et cobra un 12% d'interès pel descobert — i tu el pagues en nits sense dormir.` } })
  }

  resolverActivos(p, log)

  const evento = elegirEvento(p)
  if (evento) p.usados.push(evento.id)
  return { logs: log, evento, fin: false }
}

// ── Aplicar la opción elegida ────────────────────────────────────────────────
export function elegirOpcion(p, evento, opcion) {
  const ctx = crearCtx(p, evento)
  const resultado = opcion.aplicar ? opcion.aplicar(p, ctx) : null
  p.historial.push({ edad: p.edad, eventoId: evento.id, opcionId: opcion.id })
  return resultado   // { nota: {es,en,ca} } | null
}
