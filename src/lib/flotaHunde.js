// ¿Flota o se hunde? (física · presión y fluidos, primaria y ESO): un objeto
// y un líquido; hay que predecir qué pasa al soltarlo y, en difícil, cuánto
// queda sumergido.
//
// Física:
//   · un cuerpo flota si es MENOS denso que el líquido, y se hunde si lo es más
//     (empuje de Arquímedes = peso del líquido desalojado);
//   · densidad = masa / volumen (g/cm³);
//   · si flota, la fracción sumergida es ρ_cuerpo / ρ_líquido (un iceberg:
//     0,92 / 1,03 ≈ 89 % bajo el agua).
//
// Niveles:
//   facil   → agua; el objeto trae su densidad escrita: comparar
//   medio   → cualquier líquido; el objeto trae masa y volumen: calcular ρ
//   dificil → bloques con masa y volumen: ¿qué parte queda sumergida?
//
// Las densidades son las de referencia habituales en los libros (redondeadas).
// Nunca se proponen pares a menos de un MARGEN de diferencia: ahí la respuesta
// depende de la pieza concreta (no todas las manzanas pesan igual) y el juego
// no puede dar por buena una sola.

export const MARGEN = 0.05

export const LIQUIDOS = {
  agua:      { rho: 1, color: '#3B82F6', nombre: { es: 'Agua', en: 'Water', ca: 'Aigua' }, conArticulo: { es: 'el agua', en: 'water', ca: 'l’aigua' } },
  mar:       { rho: 1.03, color: '#0EA5E9', nombre: { es: 'Agua de mar', en: 'Seawater', ca: 'Aigua de mar' }, conArticulo: { es: 'el agua de mar', en: 'seawater', ca: 'l’aigua de mar' } },
  muerto:    { rho: 1.24, color: '#14B8A6', nombre: { es: 'Agua del mar Muerto', en: 'Dead Sea water', ca: 'Aigua del mar Mort' }, conArticulo: { es: 'el agua del mar Muerto', en: 'Dead Sea water', ca: 'l’aigua del mar Mort' } },
  aceite:    { rho: 0.92, color: '#EAB308', nombre: { es: 'Aceite de oliva', en: 'Olive oil', ca: 'Oli d’oliva' }, conArticulo: { es: 'el aceite de oliva', en: 'olive oil', ca: 'l’oli d’oliva' } },
  alcohol:   { rho: 0.79, color: '#A5B4FC', nombre: { es: 'Alcohol', en: 'Alcohol', ca: 'Alcohol' }, conArticulo: { es: 'el alcohol', en: 'alcohol', ca: 'l’alcohol' } },
  glicerina: { rho: 1.26, color: '#E2E8F0', nombre: { es: 'Glicerina', en: 'Glycerine', ca: 'Glicerina' }, conArticulo: { es: 'la glicerina', en: 'glycerine', ca: 'la glicerina' } },
  miel:      { rho: 1.42, color: '#D97706', nombre: { es: 'Miel', en: 'Honey', ca: 'Mel' }, conArticulo: { es: 'la miel', en: 'honey', ca: 'la mel' } },
  mercurio:  { rho: 13.6, color: '#94A3B8', nombre: { es: 'Mercurio', en: 'Mercury', ca: 'Mercuri' }, conArticulo: { es: 'el mercurio', en: 'mercury', ca: 'el mercuri' } },
}

// conArticulo: para las frases («más denso que la miel»): el género no se adivina.

// forma: cómo se dibuja (bloque, bola, huevo, plano). nota: un dato curioso
// que sale al corregir, solo cuando aplica (`si`: con qué líquido/resultado).
export const OBJETOS = {
  poliestireno: { rho: 0.03, forma: 'bloque', color: '#F8FAFC', nombre: { es: 'Corcho blanco', en: 'Polystyrene foam', ca: 'Suro blanc' },
    nota: { es: 'El corcho blanco (poliestireno expandido) es casi todo aire: por eso pesa tan poco.', en: 'Polystyrene foam is almost all air: that is why it weighs so little.', ca: 'El suro blanc (poliestirè expandit) és gairebé tot aire: per això pesa tan poc.' } },
  balsa:     { rho: 0.16, forma: 'bloque', color: '#E7C590', nombre: { es: 'Madera de balsa', en: 'Balsa wood', ca: 'Fusta de balsa' } },
  corcho:    { rho: 0.24, forma: 'bloque', color: '#C08A55', nombre: { es: 'Corcho', en: 'Cork', ca: 'Suro' } },
  pino:      { rho: 0.5, forma: 'bloque', color: '#D6A35C', nombre: { es: 'Madera de pino', en: 'Pine wood', ca: 'Fusta de pi' } },
  manzana:   { rho: 0.8, forma: 'bola', color: '#EF4444', nombre: { es: 'Manzana', en: 'Apple', ca: 'Poma' },
    nota: { es: 'La manzana flota porque tiene mucho aire entre sus células: hasta una cuarta parte de su volumen.', en: 'An apple floats because it has a lot of air between its cells: up to a quarter of its volume.', ca: 'La poma sura perquè té molt d’aire entre les cèl·lules: fins a una quarta part del volum.' } },
  naranja:   { rho: 0.85, forma: 'bola', color: '#F97316', nombre: { es: 'Naranja (con piel)', en: 'Orange (with peel)', ca: 'Taronja (amb pell)' },
    nota: { es: 'La piel de la naranja está llena de bolsitas de aire, como un chaleco salvavidas.', en: 'Orange peel is full of tiny air pockets, like a life jacket.', ca: 'La pell de la taronja és plena de bossetes d’aire, com una armilla salvavides.' } },
  vela:      { rho: 0.9, forma: 'bloque', color: '#FEF3C7', nombre: { es: 'Vela de parafina', en: 'Paraffin candle', ca: 'Espelma de parafina' } },
  hielo:     { rho: 0.92, forma: 'bloque', color: '#BAE6FD', nombre: { es: 'Hielo', en: 'Ice', ca: 'Gel' },
    nota: { es: 'El agua es rara: sólida es menos densa que líquida. Por eso el hielo flota y los lagos se hielan por arriba.', en: 'Water is unusual: solid it is less dense than liquid. That is why ice floats and lakes freeze from the top.', ca: 'L’aigua és estranya: sòlida és menys densa que líquida. Per això el gel sura i els llacs es glacen per dalt.' } },
  tapon:     { rho: 0.95, forma: 'bloque', color: '#22C55E', nombre: { es: 'Tapón de plástico', en: 'Plastic bottle cap', ca: 'Tap de plàstic' } },
  patata:    { rho: 1.08, forma: 'bola', color: '#CA8A04', nombre: { es: 'Patata', en: 'Potato', ca: 'Patata' },
    nota: { es: 'En agua dulce la patata se hunde; si disuelves mucha sal, el agua se vuelve más densa y la patata sube.', en: 'In fresh water a potato sinks; dissolve plenty of salt and the water gets denser and the potato rises.', ca: 'En aigua dolça la patata s’enfonsa; si hi dissols molta sal, l’aigua es fa més densa i la patata puja.' } },
  huevo:     { rho: 1.09, forma: 'huevo', color: '#FDE6C8', nombre: { es: 'Huevo fresco', en: 'Fresh egg', ca: 'Ou fresc' },
    nota: { es: 'Un huevo fresco se hunde en agua del grifo, pero flota en agua muy salada, como la del mar Muerto.', en: 'A fresh egg sinks in tap water but floats in very salty water, like the Dead Sea.', ca: 'Un ou fresc s’enfonsa en aigua de l’aixeta, però sura en aigua molt salada, com la del mar Mort.' } },
  ebano:     { rho: 1.2, forma: 'bloque', color: '#3F2A1D', nombre: { es: 'Madera de ébano', en: 'Ebony wood', ca: 'Fusta d’ebe' },
    nota: { es: 'No todas las maderas flotan: el ébano es tan denso que se hunde en agua.', en: 'Not all woods float: ebony is so dense that it sinks in water.', ca: 'No totes les fustes suren: l’eben és tan dens que s’enfonsa a l’aigua.' } },
  vidrio:    { rho: 2.5, forma: 'bola', color: '#67E8F9', nombre: { es: 'Canica de vidrio', en: 'Glass marble', ca: 'Bala de vidre' } },
  granito:   { rho: 2.7, forma: 'bloque', color: '#9CA3AF', nombre: { es: 'Piedra (granito)', en: 'Stone (granite)', ca: 'Pedra (granit)' } },
  aluminio:  { rho: 2.7, forma: 'bloque', color: '#CBD5E1', nombre: { es: 'Aluminio', en: 'Aluminium', ca: 'Alumini' } },
  hierro:    { rho: 7.9, forma: 'bloque', color: '#64748B', nombre: { es: 'Hierro', en: 'Iron', ca: 'Ferro' },
    nota: { es: 'Un barco de hierro flota porque su forma encierra mucho aire: lo que cuenta es la densidad media del barco entero.', en: 'An iron ship floats because its shape encloses a lot of air: what counts is the average density of the whole ship.', ca: 'Un vaixell de ferro sura perquè la seva forma tanca molt d’aire: el que compta és la densitat mitjana del vaixell sencer.' } },
  cobre:     { rho: 8.9, forma: 'plano', color: '#B45309', nombre: { es: 'Moneda de cobre', en: 'Copper coin', ca: 'Moneda de coure' } },
  plomo:     { rho: 11.3, forma: 'bloque', color: '#475569', nombre: { es: 'Plomo', en: 'Lead', ca: 'Plom' } },
  oro:       { rho: 19.3, forma: 'bloque', color: '#FACC15', nombre: { es: 'Oro', en: 'Gold', ca: 'Or' } },
}

// El mercurio solo tiene sentido con metales (lo demás flota siempre en él).
const METALES = ['aluminio', 'hierro', 'cobre', 'plomo', 'oro', 'granito', 'vidrio']

export const NIVELES = {
  facil:   { liquidos: ['agua'], dato: 'densidad', pregunta: 'flota' },
  medio:   { liquidos: ['agua', 'mar', 'muerto', 'aceite', 'alcohol', 'glicerina', 'miel', 'mercurio'], dato: 'masa', pregunta: 'flota' },
  dificil: { liquidos: ['agua', 'mar', 'aceite', 'alcohol', 'glicerina', 'mercurio'], dato: 'masa', pregunta: 'fraccion' },
}

const VOLUMENES = [10, 20, 25, 40, 50, 80, 100, 125, 200, 250, 500]
const FRACCIONES = [20, 25, 30, 40, 50, 60, 70, 75, 80, 90]
const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
const r2 = x => Math.round(x * 100) / 100
const esEntero = x => Math.abs(x - Math.round(x)) < 1e-9

let seq = 0 // id de ronda: cada una monta su vaso desde arriba
// La ronda clásica (pregunta con opciones): la usan «coloca» y el schema.
export function genVieja(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const liquido = elige(rand, cfg.liquidos)
    const rl = LIQUIDOS[liquido].rho

    if (cfg.pregunta === 'fraccion') {
      // Un bloque con masa y volumen exactos; casi siempre flota (la pregunta
      // es cuánto), y una de cada cuatro se hunde entero.
      const hunde = rand() < 0.25
      const V = elige(rand, VOLUMENES)
      const rho = hunde ? rl * elige(rand, [1.2, 1.25, 1.5, 2, 3]) : (rl * elige(rand, FRACCIONES)) / 100
      const masa = r2(rho * V)
      if (!esEntero(masa) || masa > 9000 || masa < 2) continue
      // Densidad con dos decimales como mucho: la cuenta de la explicación
      // tiene que ser exacta, no «0,552 ≈ 0,55».
      if (!esEntero((masa / V) * 100)) continue
      const bueno = hunde ? 'hunde' : Math.round((masa / V / rl) * 100)
      // Distractores: lo que asoma en vez de lo que se hunde (100 − f), la
      // densidad leída como porcentaje sin dividir, otras fracciones y el
      // «se hunde».
      const cand = hunde
        ? baraja(rand, FRACCIONES).slice(0, 3)
        : [100 - bueno, Math.round((masa / V) * 100), ...baraja(rand, FRACCIONES), 'hunde']
      const unicos = [...new Set(cand)].filter(x => x !== bueno && (x === 'hunde' || (x > 0 && x < 100)))
      const distr = hunde ? unicos.slice(0, 3) : ['hunde', ...unicos.filter(x => x !== 'hunde').slice(0, 2)]
      if (distr.length < 3) continue
      return { id: ++seq, nivel, liquido, objeto: 'bloque', rho: masa / V, masa, V, pregunta: 'fraccion', bueno, opciones: orden([bueno, ...distr]) }
    }

    // flota / se hunde: primero se decide el resultado, para que salgan
    // parejos, y luego se busca un objeto que lo cumpla con margen.
    const quiereFlotar = rand() < 0.5
    const pool = Object.keys(OBJETOS).filter(id => {
      if (liquido === 'mercurio' && !METALES.includes(id)) return false
      const q = OBJETOS[id].rho / rl
      return quiereFlotar ? q <= 1 - MARGEN : q >= 1 + MARGEN
    })
    if (!pool.length) continue
    const objeto = elige(rand, pool)
    let rho = OBJETOS[objeto].rho, masa = null, V = null
    if (cfg.dato === 'masa') {
      V = elige(rand, VOLUMENES)
      masa = Math.round(rho * V)
      if (masa < 1) continue
      rho = masa / V
      const q = rho / rl
      // Con el redondeo de la masa, el margen se vuelve a comprobar.
      if (quiereFlotar ? q > 1 - MARGEN : q < 1 + MARGEN) continue
    }
    return { id: ++seq, nivel, liquido, objeto, rho, masa, V, pregunta: 'flota', bueno: quiereFlotar ? 'flota' : 'hunde', opciones: ['flota', 'hunde'] }
  }
}

// Las fracciones de menor a mayor y «se hunde» al final: se leen como una escala.
const orden = xs => [...xs].sort((a, b) => (a === 'hunde' ? 1 : b === 'hunde' ? -1 : a - b))


// Qué parte del objeto queda bajo el líquido al final (1 = entero, al fondo).
export const fraccionSumergida = ronda => Math.min(1, ronda.rho / LIQUIDOS[ronda.liquido].rho)

// ── Textos ───────────────────────────────────────────────────────────────
const tx = (l, es, en, ca) => ({ es, en, ca })[l] ?? es
export const num = (x, l) => {
  const s = String(r2(x))
  return l === 'en' ? s : s.replace('.', ',')
}
const pct = (x, l) => (l === 'en' ? `${x}%` : `${x} %`)

export const nombreObjeto = (ronda, l) => (ronda.objeto === 'bloque'
  ? tx(l, 'Bloque', 'Block', 'Bloc')
  : OBJETOS[ronda.objeto].nombre[l] ?? OBJETOS[ronda.objeto].nombre.es)
export const nombreLiquido = (ronda, l) => LIQUIDOS[ronda.liquido].nombre[l] ?? LIQUIDOS[ronda.liquido].nombre.es
const liquidoArt = (ronda, l) => LIQUIDOS[ronda.liquido].conArticulo[l] ?? LIQUIDOS[ronda.liquido].conArticulo.es

// El dato del objeto tal como se enseña: su densidad o su masa y volumen.
export const datoObjeto = (ronda, l) => (ronda.masa === null
  ? `ρ = ${num(ronda.rho, l)} g/cm³`
  : `m = ${num(ronda.masa, l)} g · V = ${num(ronda.V, l)} cm³`)

export function textoOpcion(o, l) {
  if (o === 'flota') return tx(l, 'Flota', 'Floats', 'Sura')
  if (o === 'hunde') return tx(l, 'Se hunde', 'Sinks', 'S’enfonsa')
  return tx(l, `${pct(o, l)} bajo el líquido`, `${pct(o, l)} under the surface`, `${pct(o, l)} sota el líquid`)
}

function enunciadoViejo(ronda, l) {
  if (ronda.pregunta === 'fraccion') return tx(l, 'Si flota, ¿qué parte del bloque queda sumergida?', 'If it floats, how much of the block is under the surface?', 'Si sura, quina part del bloc queda submergida?')
  return tx(l, '¿Flota o se hunde?', 'Does it float or sink?', 'Sura o s’enfonsa?')
}

function explicacionVieja(ronda, l) {
  const rl = LIQUIDOS[ronda.liquido].rho
  const liq = liquidoArt(ronda, l)
  const flota = ronda.rho < rl
  const igual = esEntero(ronda.rho * 100) ? '=' : '≈'
  const calc = ronda.masa === null ? '' : tx(l,
    `Densidad = masa / volumen = ${num(ronda.masa, l)} / ${num(ronda.V, l)} ${igual} ${num(ronda.rho, l)} g/cm³. `,
    `Density = mass / volume = ${num(ronda.masa, l)} / ${num(ronda.V, l)} ${igual} ${num(ronda.rho, l)} g/cm³. `,
    `Densitat = massa / volum = ${num(ronda.masa, l)} / ${num(ronda.V, l)} ${igual} ${num(ronda.rho, l)} g/cm³. `)
  const comp = flota
    ? tx(l, `Tiene menos densidad que ${liq} (${num(rl, l)} g/cm³), así que flota.`, `It is less dense than ${liq} (${num(rl, l)} g/cm³), so it floats.`, `Té menys densitat que ${liq} (${num(rl, l)} g/cm³), així que sura.`)
    : tx(l, `Tiene más densidad que ${liq} (${num(rl, l)} g/cm³), así que se hunde.`, `It is denser than ${liq} (${num(rl, l)} g/cm³), so it sinks.`, `Té més densitat que ${liq} (${num(rl, l)} g/cm³), així que s’enfonsa.`)
  let fr = ''
  if (flota && (ronda.pregunta === 'fraccion' || ronda.nivel === 'medio')) {
    const f = Math.round((ronda.rho / rl) * 100)
    fr = tx(l,
      ` La parte sumergida es ρ cuerpo / ρ líquido = ${num(ronda.rho, l)} / ${num(rl, l)} ≈ ${pct(f, l)}.`,
      ` The part under the surface is ρ body / ρ liquid = ${num(ronda.rho, l)} / ${num(rl, l)} ≈ ${pct(f, l)}.`,
      ` La part submergida és ρ cos / ρ líquid = ${num(ronda.rho, l)} / ${num(rl, l)} ≈ ${pct(f, l)}.`)
  }
  const o = OBJETOS[ronda.objeto]
  const nota = ronda.liquido === 'mercurio' && flota
    ? ' ' + tx(l, 'El mercurio es tan denso que hasta muchos metales flotan en él.', 'Mercury is so dense that even many metals float on it.', 'El mercuri és tan dens que fins i tot molts metalls hi suren.')
    : o?.nota ? ' ' + (o.nota[l] ?? o.nota.es) : ''
  return calc + comp + fr + nota
}

// JSON-LD / ejemplos: se entiende sin el dibujo.
function schemaVieja(ronda, l) {
  const rl = LIQUIDOS[ronda.liquido].rho
  const obj = `${nombreObjeto(ronda, l)} (${datoObjeto(ronda, l)})`
  const liq = `${liquidoArt(ronda, l)} (ρ = ${num(rl, l)} g/cm³)`
  const q = ronda.pregunta === 'fraccion'
    ? tx(l, `Se echa un bloque (${datoObjeto(ronda, l)}) en ${liq}. ¿Qué parte queda sumergida?`, `A block (${datoObjeto(ronda, l)}) is dropped into ${liq}. How much of it is under the surface?`, `Es tira un bloc (${datoObjeto(ronda, l)}) a ${liq}. Quina part queda submergida?`)
    : tx(l, `${obj}, en ${liq}: ¿flota o se hunde?`, `${obj}, in ${liq}: does it float or sink?`, `${obj}, a ${liq}: sura o s’enfonsa?`)
  return {
    question: q,
    correctAnswer: textoOpcion(ronda.bueno, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, l)),
  }
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genVieja sigue dando la ronda clásica y el texto del schema):
//   clasifica  cuatro objetos, cada uno a «flota» o «se hunde» en el líquido
//              del vaso («clasifica:fallos»)
//   liquido    un objeto y cuatro botellas: elige un líquido en el que flote
//              (o se hunda); vale cualquiera que lo cumpla (el id)
//   coloca     un bloque: se baja o se sube en el vaso hasta la línea de
//              flotación que toca, o se manda al fondo (el % o «hunde»)
const MECANICAS = {
  facil:   ['clasifica', 'clasifica', 'liquido'],
  medio:   ['clasifica', 'liquido', 'clasifica'],
  dificil: ['coloca', 'coloca', 'liquido', 'clasifica'],
}
export const MECANICAS_DE = nivel => MECANICAS[nivel] ?? MECANICAS.facil
const LIQ_BOTELLAS = ['agua', 'mar', 'muerto', 'aceite', 'alcohol', 'glicerina', 'miel']

let seqN = 0
const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  for (let intento = 0; ; intento++) {
    // Se reintenta la MISMA mecánica: si no, las que se descartan más (elegir
    // líquido) saldrían mucho menos de lo que dice MECANICAS.
    const mecanica = elige(rand, MECANICAS_DE(nivel))
    let r = null
    while (!r) r = genNueva(nivel, rand, mecanica)
    const tema = `${r.mecanica}${r.objeto}${r.liquido}${(r.items ?? []).map(x => x.objeto).join()}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}
export const genRound = difficulty => genRonda(difficulty)

// Un objeto con su dato: la densidad a la vista (fácil) o masa y volumen.
function conDato(objeto, conMasa, rand) {
  const rho = OBJETOS[objeto].rho
  if (!conMasa) return { objeto, rho, masa: null, V: null }
  const V = elige(rand, VOLUMENES)
  const masa = Math.round(rho * V)
  return masa < 1 ? null : { objeto, rho: masa / V, masa, V }
}
// Más margen que en la ronda clásica: aquí se juntan muchos pares a la vez y
// el huevo en agua de mar (1,09 / 1,03) ya depende del huevo.
export const MARGEN_MECANICAS = 0.08
const claro = (rho, rl) => Math.abs(rho / rl - 1) >= MARGEN_MECANICAS

function genNueva(nivel, rand, mecanica) {
  const conMasa = nivel !== 'facil'
  const base = { id: ++seqN, nivel, mecanica }
  if (mecanica === 'coloca') {
    const r = genVieja('dificil', { rand })
    return { ...r, ...base, pregunta: 'fraccion' }
  }
  if (mecanica === 'clasifica') {
    const liquido = nivel === 'facil' ? 'agua' : elige(rand, LIQ_BOTELLAS)
    const rl = LIQUIDOS[liquido].rho
    const items = []
    for (const objeto of baraja(rand, Object.keys(OBJETOS))) {
      const d = conDato(objeto, conMasa, rand)
      if (d && claro(d.rho, rl)) items.push(d)
      if (items.length === 4) break
    }
    const flotan = items.filter(x => x.rho < rl).length
    if (items.length < 4 || flotan === 0 || flotan === 4) return null
    return { ...base, liquido, items, objeto: items[0].objeto, rho: items[0].rho, masa: items[0].masa, V: items[0].V, pregunta: 'flota', bueno: 'clasifica:0' }
  }
  // liquido: cuatro botellas, sin ninguna en el límite
  const quiere = rand() < 0.5 ? 'flota' : 'hunde'
  const d = conDato(elige(rand, Object.keys(OBJETOS)), conMasa, rand)
  if (!d) return null
  const botellas = baraja(rand, LIQ_BOTELLAS).slice(0, 4)
  if (!botellas.every(b => claro(d.rho, LIQUIDOS[b].rho))) return null
  const validos = botellas.filter(b => (quiere === 'flota') === (d.rho < LIQUIDOS[b].rho))
  if (!validos.length || validos.length === 4) return null
  return { ...base, ...d, liquido: validos[0], botellas, quiere, validos, pregunta: 'flota', bueno: validos[0] }
}

// La respuesta que da el componente cuando se hace todo bien.
export function respuestaBuena(r) {
  if (r.mecanica === 'clasifica') return 'clasifica:0'
  return String(r.bueno)
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (r.mecanica === 'liquido') return r.validos.includes(o)
  if (r.mecanica === 'coloca') return String(o) === String(r.bueno)
  if (r.mecanica === 'clasifica') return o === 'clasifica:0'
  return o === r.bueno
}
export const isCorrect = esCorrecta

export function enunciado(r, l) {
  if (r.mecanica === 'clasifica') return tx(l, `Pon cada objeto en su sitio: ¿flota o se hunde en ${liquidoArt(r, l)}?`, `Put each object in its place: does it float or sink in ${liquidoArt(r, l)}?`, `Posa cada objecte al seu lloc: sura o s’enfonsa a ${liquidoArt(r, l)}?`)
  if (r.mecanica === 'liquido') return r.quiere === 'flota'
    ? tx(l, 'Elige un líquido en el que este objeto flote', 'Choose a liquid this object floats in', 'Tria un líquid en què aquest objecte suri')
    : tx(l, 'Elige un líquido en el que este objeto se hunda', 'Choose a liquid this object sinks in', 'Tria un líquid en què aquest objecte s’enfonsi')
  if (r.mecanica === 'coloca') return tx(l, 'Sube o baja el bloque hasta donde flotará (o mándalo al fondo)', 'Move the block up or down to where it will float (or send it to the bottom)', 'Puja o baixa el bloc fins on surarà (o envia’l al fons)')
  return enunciadoViejo(r, l)
}

export function explicacion(r, l) {
  if (r.mecanica === 'clasifica') {
    const rl = LIQUIDOS[r.liquido].rho
    const lista = r.items.map(x => `${OBJETOS[x.objeto].nombre[l] ?? OBJETOS[x.objeto].nombre.es} ${num(x.rho, l)} → ${x.rho < rl ? tx(l, 'flota', 'floats', 'sura') : tx(l, 'se hunde', 'sinks', 's’enfonsa')}`).join(' · ')
    return tx(l, `Flota lo que tiene menos densidad que ${liquidoArt(r, l)} (${num(rl, l)} g/cm³): ${lista}.`, `Whatever is less dense than ${liquidoArt(r, l)} (${num(rl, l)} g/cm³) floats: ${lista}.`, `Sura el que té menys densitat que ${liquidoArt(r, l)} (${num(rl, l)} g/cm³): ${lista}.`)
  }
  if (r.mecanica === 'liquido') {
    const lista = r.botellas.map(b => `${LIQUIDOS[b].nombre[l] ?? LIQUIDOS[b].nombre.es} ${num(LIQUIDOS[b].rho, l)}${r.validos.includes(b) ? ' ✓' : ''}`).join(' · ')
    const calc = r.masa === null ? '' : tx(l, `Densidad = ${num(r.masa, l)} / ${num(r.V, l)} ≈ ${num(r.rho, l)} g/cm³. `, `Density = ${num(r.masa, l)} / ${num(r.V, l)} ≈ ${num(r.rho, l)} g/cm³. `, `Densitat = ${num(r.masa, l)} / ${num(r.V, l)} ≈ ${num(r.rho, l)} g/cm³. `)
    return calc + (r.quiere === 'flota'
      ? tx(l, `Flota en los líquidos más densos que él (${num(r.rho, l)} g/cm³): ${lista}.`, `It floats in liquids denser than it (${num(r.rho, l)} g/cm³): ${lista}.`, `Sura en els líquids més densos que ell (${num(r.rho, l)} g/cm³): ${lista}.`)
      : tx(l, `Se hunde en los líquidos menos densos que él (${num(r.rho, l)} g/cm³): ${lista}.`, `It sinks in liquids less dense than it (${num(r.rho, l)} g/cm³): ${lista}.`, `S’enfonsa en els líquids menys densos que ell (${num(r.rho, l)} g/cm³): ${lista}.`))
  }
  return explicacionVieja(r, l)
}

export function schemaQuestion(r, l) {
  if (!r.mecanica || r.mecanica === 'coloca') return schemaVieja(r, l)
  // Como pregunta de texto: ¿flota o se hunde el primer objeto en su líquido?
  const flota = r.rho < LIQUIDOS[r.liquido].rho
  return schemaVieja({ ...r, pregunta: 'flota', bueno: flota ? 'flota' : 'hunde', opciones: ['flota', 'hunde'] }, l)
}
