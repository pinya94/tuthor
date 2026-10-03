// El Tiempo (geología · atmósfera y clima; ciencias sociales en Primaria):
// leer una previsión meteorológica y decidir qué ponerse, o si va a llover.
//
// La ropa es subjetiva, así que el juego aplica REGLAS fijas y las enseña al
// corregir (lo que se aprende es a leer la previsión, no un gusto personal):
//   · prenda por temperatura: menos de 10 °C abrigo, de 10 a 18 chaqueta,
//     más de 18 camiseta;
//   · con viento de 30 km/h o más se siente unos 4 grados menos (sensación);
//   · paraguas si la probabilidad de lluvia llega al 50 % mientras estás fuera;
//   · gafas de sol y crema si el índice UV es 6 o más.
// Los generadores evitan los valores justo en el límite (10, 18, 50 %, UV 6):
// ahí la regla decide, pero el alumno sentiría que es una trampa.
//
// Tres formatos de ronda:
//   simple → la tarjeta de una app: cielo, temperatura, % de lluvia (viento, UV)
//   horas  → gráfica de 8:00 a 22:00 y una salida concreta («de 17 a 20 h»)
//   radar  → mapa con lluvia que se mueve: ¿lloverá en tu ciudad dentro de N h?

export const PRENDAS = ['abrigo', 'chaqueta', 'camiseta']
export const VIENTO_FUERTE = 30
export const BAJADA_VIENTO = 4
export const LLUVIA_PARAGUAS = 50
export const UV_SOL = 6
export const KM_CASILLA = 10
export const INTENSIDADES = ['nada', 'debil', 'moderada', 'fuerte']

export const NIVELES = {
  facil:   { tipos: ['simple'], viento: false, uv: false, radarHoras: [1] },
  medio:   { tipos: ['simple', 'horas', 'radar'], viento: true, uv: false, radarHoras: [1] },
  dificil: { tipos: ['simple', 'horas', 'radar'], viento: true, uv: true, radarHoras: [1, 2] },
}

export const prendaPara = t => (t < 10 ? 'abrigo' : t <= 18 ? 'chaqueta' : 'camiseta')
export const sensacion = (t, viento = 0) => (viento >= VIENTO_FUERTE ? t - BAJADA_VIENTO : t)
export const cieloDe = prob => (prob >= 60 ? 'lluvia' : prob >= 30 ? 'nube' : prob >= 15 ? 'solNube' : 'sol')
export const claveTraje = t => `${t.prenda}|${t.paraguas ? 1 : 0}|${t.sol ? 1 : 0}`

const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const LIMITE_T = new Set([10, 18])

export const SITUACIONES = {
  simple: [
    { es: 'Vas al colegio por la mañana', en: 'You are going to school in the morning', ca: 'Vas a l’escola al matí' },
    { es: 'Quedas con tus amigos en el parque esta tarde', en: 'You are meeting friends in the park this afternoon', ca: 'Quedes amb els amics al parc aquesta tarda' },
    { es: 'Sales a hacer la compra', en: 'You are going out to do the shopping', ca: 'Surts a fer la compra' },
    { es: 'Vas andando a entrenar', en: 'You are walking to training', ca: 'Vas caminant a entrenar' },
    { es: 'Hoy hay excursión con la clase', en: 'There is a class trip today', ca: 'Avui hi ha excursió amb la classe' },
  ],
  horas: [
    { es: 'Vas al cine', en: 'You are going to the cinema', ca: 'Vas al cinema' },
    { es: 'Tienes partido', en: 'You have a match', ca: 'Tens partit' },
    { es: 'Vas a casa de tus abuelos', en: 'You are going to your grandparents’', ca: 'Vas a casa dels avis' },
    { es: 'Sales a pasear al perro', en: 'You are taking the dog for a walk', ca: 'Surts a passejar el gos' },
  ],
}
export const CIUDADES = ['Zaragoza', 'Sevilla', 'Bilbao', 'Valencia', 'Burgos', 'Granada', 'Lleida', 'Oviedo', 'Toledo', 'Murcia']

// ── Traje ────────────────────────────────────────────────────────────────
export function trajeCorrecto({ temp, viento = 0, lluvia, uv = 0 }, cfg) {
  return {
    prenda: prendaPara(cfg.viento ? sensacion(temp, viento) : temp),
    paraguas: lluvia >= LLUVIA_PARAGUAS,
    sol: cfg.uv ? uv >= UV_SOL : false,
  }
}

// Tres distractores que cambian UNA cosa del traje bueno: así cada opción
// errónea corresponde a un fallo de lectura concreto.
export function opcionesTraje(bueno, cfg, rand = Math.random) {
  const cand = PRENDAS.filter(p => p !== bueno.prenda).map(p => ({ ...bueno, prenda: p }))
  cand.push({ ...bueno, paraguas: !bueno.paraguas })
  if (cfg.uv) cand.push({ ...bueno, sol: !bueno.sol })
  const elegidas = [...cand].sort(() => rand() - 0.5).slice(0, 3)
  return [bueno, ...elegidas].sort(() => rand() - 0.5)
}

// ── Generadores ──────────────────────────────────────────────────────────
function genSimple(cfg, rand) {
  for (;;) {
    const lluvia = elige(rand, [0, 5, 10, 20, 25, 35, 40, 45, 55, 60, 70, 80, 90, 95])
    const temp = entre(rand, -3, 33)
    const viento = cfg.viento ? elige(rand, [5, 10, 15, 20, 35, 40, 45, 50]) : 0
    const uv = lluvia >= 30 ? entre(rand, 1, 3) : temp >= 20 ? entre(rand, 3, 10) : entre(rand, 1, 5)
    const sens = cfg.viento ? sensacion(temp, viento) : temp
    if (LIMITE_T.has(temp) || LIMITE_T.has(sens) || uv === UV_SOL) continue
    const datos = { temp, viento, lluvia, uv, cielo: cieloDe(lluvia) }
    const bueno = trajeCorrecto(datos, cfg)
    return { tipo: 'simple', datos, situacion: elige(rand, SITUACIONES.simple), bueno, opciones: opcionesTraje(bueno, cfg, rand) }
  }
}

export const HORAS = Array.from({ length: 15 }, (_, i) => 8 + i) // 8:00 … 22:00

function genHoras(cfg, rand) {
  for (;;) {
    const tmin = entre(rand, -2, 22)
    const tmax = tmin + entre(rand, 4, 12)
    // Mínimo a primera hora, máximo hacia las 15-16 h, baja por la noche.
    const temps = HORAS.map(h => {
      const x = h <= 15 ? (h - 8) / 7 : 1 - (h - 15) / 10
      return Math.round(tmin + (tmax - tmin) * Math.sin((x * Math.PI) / 2))
    })
    const inicio = entre(rand, 9, 19)
    const dur = entre(rand, 2, 3)
    const fin = Math.min(22, inicio + dur)
    // Un frente de lluvia: dentro de la salida o fuera de ella, a partes iguales.
    const dentro = rand() < 0.5
    let frenteIni
    if (dentro) frenteIni = entre(rand, Math.max(8, inicio - 1), fin - 1)
    else frenteIni = rand() < 0.5 && inicio - 4 >= 8 ? entre(rand, 8, inicio - 4) : (fin + 1 <= 20 ? entre(rand, fin + 1, 20) : 8)
    const frenteDur = entre(rand, 2, 4)
    const pico = elige(rand, [60, 70, 80, 90])
    const lluvias = HORAS.map(h => {
      if (h >= frenteIni && h < frenteIni + frenteDur) return pico
      if (h === frenteIni - 1 || h === frenteIni + frenteDur) return elige(rand, [20, 30, 40])
      return elige(rand, [0, 5, 10])
    })
    const viento = cfg.viento ? elige(rand, [5, 10, 15, 35, 40, 45]) : 0
    const enSalida = HORAS.map((h, i) => i).filter(i => HORAS[i] >= inicio && HORAS[i] < fin)
    const tSalida = Math.min(...enSalida.map(i => temps[i]))
    const lSalida = Math.max(...enSalida.map(i => lluvias[i]))
    const sens = cfg.viento ? sensacion(tSalida, viento) : tSalida
    if (LIMITE_T.has(tSalida) || LIMITE_T.has(sens) || lSalida === LLUVIA_PARAGUAS) continue
    const datos = { temps, lluvias, viento, inicio, fin, temp: tSalida, lluvia: lSalida, uv: 0 }
    const bueno = trajeCorrecto(datos, { ...cfg, uv: false })
    return { tipo: 'horas', datos, situacion: elige(rand, SITUACIONES.horas), bueno, opciones: opcionesTraje(bueno, { ...cfg, uv: false }, rand) }
  }
}

// Radar: rejilla de 9×7 casillas de 10 km. Una mancha de lluvia (centro
// fuerte, borde débil) se mueve en línea recta a 10, 20 o 30 km/h.
export const RADAR_W = 9
export const RADAR_H = 7
const DIRS = {
  este: [1, 0], oeste: [-1, 0], norte: [0, -1], sur: [0, 1],
}
const MANCHAS = [
  // [dx, dy, intensidad]
  [[0, 0, 3], [1, 0, 2], [-1, 0, 2], [0, 1, 2], [0, -1, 1], [1, 1, 1], [-1, 1, 1], [2, 0, 1], [-1, -1, 1]],
  [[0, 0, 3], [1, 0, 3], [0, 1, 2], [1, 1, 2], [-1, 0, 1], [2, 0, 1], [0, -1, 1], [1, -1, 1], [0, 2, 1], [2, 1, 1]],
  [[0, 0, 2], [1, 0, 2], [0, 1, 1], [-1, 0, 1], [1, -1, 1], [2, 0, 1]],
  [[0, 0, 3], [0, 1, 2], [0, -1, 2], [1, 0, 1], [-1, 0, 1], [0, 2, 1], [0, -2, 1]],
]

export function intensidadEn(celdas, x, y) {
  return celdas.find(c => c.x === x && c.y === y)?.i ?? 0
}

function genRadar(cfg, rand) {
  for (;;) {
    const forma = elige(rand, MANCHAS)
    const dir = elige(rand, Object.keys(DIRS))
    const [vx, vy] = DIRS[dir]
    const kmh = elige(rand, [10, 20, 30])
    const horas = elige(rand, cfg.radarHoras)
    const paso = (kmh / KM_CASILLA) * horas
    const ciudad = { x: entre(rand, 2, RADAR_W - 3), y: entre(rand, 1, RADAR_H - 2), nombre: elige(rand, CIUDADES) }
    const objetivo = elige(rand, [0, 0, 1, 2, 3]) // ~40 % sin lluvia
    let ox, oy
    if (objetivo > 0) {
      const celda = elige(rand, forma.filter(c => c[2] === objetivo))
      if (!celda) continue
      // La celda elegida tiene que llegar a la ciudad dentro de `horas`.
      ox = ciudad.x - vx * paso - celda[0]
      oy = ciudad.y - vy * paso - celda[1]
    } else {
      ox = entre(rand, 0, RADAR_W - 1)
      oy = entre(rand, 0, RADAR_H - 1)
    }
    const ahora = forma.map(([dx, dy, i]) => ({ x: ox + dx, y: oy + dy, i }))
    const luego = ahora.map(c => ({ ...c, x: c.x + vx * paso, y: c.y + vy * paso }))
    const dentroMapa = c => c.x >= 0 && c.x < RADAR_W && c.y >= 0 && c.y < RADAR_H
    if (!ahora.every(dentroMapa)) continue
    if (intensidadEn(ahora, ciudad.x, ciudad.y) > 0) continue // que haya que pensar el movimiento
    const llega = intensidadEn(luego, ciudad.x, ciudad.y)
    if (llega !== objetivo) continue
    // Para «no lloverá», que la mancha esté cerca (si no, es demasiado fácil).
    if (objetivo === 0 && !ahora.some(c => Math.abs(c.x - ciudad.x) + Math.abs(c.y - ciudad.y) <= 3)) continue
    return { tipo: 'radar', datos: { ahora, luego, dir, kmh, horas, ciudad }, bueno: INTENSIDADES[llega], opciones: INTENSIDADES }
  }
}

export function genRonda(nivel = 'facil', { rand = Math.random, tipo } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const t = tipo ?? elige(rand, cfg.tipos)
  const ronda = t === 'radar' ? genRadar(cfg, rand) : t === 'horas' ? genHoras(cfg, rand) : genSimple(cfg, rand)
  return { ...ronda, nivel }
}

export function esCorrecta(ronda, respuesta) {
  if (respuesta == null) return false
  if (ronda.tipo === 'radar') return respuesta === ronda.bueno
  return claveTraje(respuesta) === claveTraje(ronda.bueno)
}

// Examen (MechanicExam).
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
export const NOMBRE_PRENDA = {
  abrigo: { es: 'Abrigo', en: 'Coat', ca: 'Abric' },
  chaqueta: { es: 'Chaqueta', en: 'Jacket', ca: 'Jaqueta' },
  camiseta: { es: 'Camiseta', en: 'T-shirt', ca: 'Samarreta' },
}
export const NOMBRE_INTENSIDAD = {
  nada: { es: 'No lloverá', en: 'No rain', ca: 'No plourà' },
  debil: { es: 'Lluvia débil', en: 'Light rain', ca: 'Pluja feble' },
  moderada: { es: 'Lluvia moderada', en: 'Moderate rain', ca: 'Pluja moderada' },
  fuerte: { es: 'Lluvia fuerte', en: 'Heavy rain', ca: 'Pluja forta' },
}
export const NOMBRE_DIR = {
  este: { es: 'el este', en: 'the east', ca: 'l’est' },
  oeste: { es: 'el oeste', en: 'the west', ca: 'l’oest' },
  norte: { es: 'el norte', en: 'the north', ca: 'el nord' },
  sur: { es: 'el sur', en: 'the south', ca: 'el sud' },
}

export function textoTraje(t, l) {
  const partes = [NOMBRE_PRENDA[t.prenda][l] ?? NOMBRE_PRENDA[t.prenda].es]
  if (t.paraguas) partes.push({ es: 'paraguas', en: 'umbrella', ca: 'paraigua' }[l] ?? 'paraguas')
  if (t.sol) partes.push({ es: 'gafas de sol y crema', en: 'sunglasses and sun cream', ca: 'ulleres de sol i crema' }[l] ?? 'gafas de sol y crema')
  return partes.join(' + ')
}

// Por qué es ese traje, con los números de la previsión.
export function explicacion(ronda, l) {
  const tx = (es, en, ca) => ({ es, en, ca })[l] ?? es
  if (ronda.tipo === 'radar') {
    const { kmh, horas, dir } = ronda.datos
    const casillas = (kmh / KM_CASILLA) * horas
    return tx(
      `La lluvia avanza hacia ${NOMBRE_DIR[dir].es} a ${kmh} km/h: en ${horas} h recorre ${kmh * horas} km, ${casillas} casilla${casillas === 1 ? '' : 's'}. Mueve la mancha y mira qué color cae en ${ronda.datos.ciudad.nombre}.`,
      `The rain is moving towards ${NOMBRE_DIR[dir].en} at ${kmh} km/h: in ${horas} h it travels ${kmh * horas} km, ${casillas} square${casillas === 1 ? '' : 's'}. Shift the patch and see which colour lands on ${ronda.datos.ciudad.nombre}.`,
      `La pluja avança cap a ${NOMBRE_DIR[dir].ca} a ${kmh} km/h: en ${horas} h recorre ${kmh * horas} km, ${casillas} casella${casillas === 1 ? '' : 'es'}. Mou la taca i mira quin color cau a ${ronda.datos.ciudad.nombre}.`,
    )
  }
  const { temp, viento, lluvia, uv } = ronda.datos
  const cfg = NIVELES[ronda.nivel]
  const sens = cfg.viento ? sensacion(temp, viento) : temp
  const partes = []
  if (cfg.viento && viento >= VIENTO_FUERTE) {
    partes.push(tx(`${temp} °C con viento de ${viento} km/h se sienten como ${sens} °C`, `${temp} °C with a ${viento} km/h wind feels like ${sens} °C`, `${temp} °C amb vent de ${viento} km/h se senten com ${sens} °C`))
  } else {
    partes.push(tx(`${ronda.tipo === 'horas' ? 'La temperatura más baja mientras estás fuera es ' : ''}${temp} °C`, `${ronda.tipo === 'horas' ? 'The lowest temperature while you are out is ' : ''}${temp} °C`, `${ronda.tipo === 'horas' ? 'La temperatura més baixa mentre ets fora és ' : ''}${temp} °C`))
  }
  partes[0] += ' → ' + (NOMBRE_PRENDA[prendaPara(sens)][l] ?? NOMBRE_PRENDA[prendaPara(sens)].es).toLowerCase()
  const pl = ronda.tipo === 'horas'
    ? tx(`lluvia de hasta el ${lluvia} % en tu salida`, `up to ${lluvia}% chance of rain while you are out`, `pluja de fins al ${lluvia} % a la sortida`)
    : tx(`${lluvia} % de lluvia`, `${lluvia}% chance of rain`, `${lluvia} % de pluja`)
  partes.push(pl + (lluvia >= LLUVIA_PARAGUAS ? tx(' → paraguas', ' → umbrella', ' → paraigua') : tx(' → sin paraguas', ' → no umbrella', ' → sense paraigua')))
  if (cfg.uv && ronda.tipo === 'simple') partes.push(tx(`UV ${uv}`, `UV ${uv}`, `UV ${uv}`) + (uv >= UV_SOL ? tx(' → gafas y crema', ' → sunglasses and cream', ' → ulleres i crema') : tx(' → no hace falta crema', ' → no cream needed', ' → no cal crema')))
  return partes.join('. ') + '.'
}

// Texto para el JSON-LD y «Cómo es este examen»: solo la previsión simple se
// entiende sin su dibujo.
export function schemaQuestion(ronda, l) {
  if (ronda.tipo !== 'simple') return null
  const { temp, viento, lluvia, uv } = ronda.datos
  const cfg = NIVELES[ronda.nivel]
  const sit = ronda.situacion[l] ?? ronda.situacion.es
  const datos = [`${temp} °C`, { es: `${lluvia} % de lluvia`, en: `${lluvia}% chance of rain`, ca: `${lluvia} % de pluja` }[l]]
  if (cfg.viento) datos.push({ es: `viento ${viento} km/h`, en: `wind ${viento} km/h`, ca: `vent ${viento} km/h` }[l])
  if (cfg.uv) datos.push(`UV ${uv}`)
  return {
    question: { es: `${sit}. Previsión: ${datos.join(', ')}. ¿Qué te llevas?`, en: `${sit}. Forecast: ${datos.join(', ')}. What do you take?`, ca: `${sit}. Previsió: ${datos.join(', ')}. Què t’emportes?` }[l],
    correctAnswer: textoTraje(ronda.bueno, l),
    wrongAnswers: ronda.opciones.filter(o => claveTraje(o) !== claveTraje(ronda.bueno)).map(o => textoTraje(o, l)),
  }
}
