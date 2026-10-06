// Lee el movimiento (física · cinemática, ESO y Bachillerato): gráficas de
// tres tramos (A, B, C) generadas con números enteros.
//
//   x-t (posición-tiempo): cada tramo es un MRU. La pendiente es la
//       velocidad: horizontal = parado, sube = avanza, baja = retrocede.
//   v-t (velocidad-tiempo): cada tramo es MRU (horizontal) o MRUA (inclinado).
//       La pendiente es la aceleración y el área bajo la línea, la distancia.
//
// Tipos de pregunta:
//   que          ¿qué hace el móvil en el tramo B? (en x-t o en v-t)
//   velocidad    x-t: velocidad de un tramo (Δx ÷ Δt)
//   rapido       x-t: ¿en qué tramo va más rápido?
//   aceleracion  v-t: aceleración de un tramo (Δv ÷ Δt)
//   area         v-t: distancia recorrida en un tramo o en total (área)
//   recorrido    x-t: distancia total recorrida (no es el desplazamiento si
//                el móvil vuelve atrás)
//
// Niveles: facil → que; medio → velocidad, aceleracion, rapido, que;
// dificil → area, recorrido, aceleracion.

export const NIVELES = {
  facil:   { tipos: ['que', 'que'] },
  medio:   { tipos: ['velocidad', 'aceleracion', 'rapido', 'que'] },
  dificil: { tipos: ['area', 'area', 'recorrido', 'aceleracion'] },
}
export const TRAMOS = ['A', 'B', 'C']
const QUE_XT = ['parado', 'avanza', 'retrocede', 'acelera']
const QUE_VT = ['parado', 'constante', 'acelera', 'frena']

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
const DURACIONES = [2, 3, 4, 5]
let seq = 0

// Puntos [t, y] de una gráfica x-t: tres MRU con velocidades enteras.
function grafXT(rand, { conVuelta = false } = {}) {
  for (;;) {
    const pts = [[0, elige(rand, [0, 0, 2, 4, 6])]]
    const vs = []
    for (let i = 0; i < 3; i++) {
      const dt = elige(rand, DURACIONES)
      const v = elige(rand, [-3, -2, -1, 0, 1, 2, 3, 4])
      const [t0, x0] = pts.at(-1)
      pts.push([t0 + dt, x0 + v * dt])
      vs.push(v)
    }
    if (pts.some(([, x]) => x < 0 || x > 30)) continue
    if (conVuelta && !vs.some(v => v < 0)) continue
    if (new Set(vs).size < 2) continue
    return { pts, vs }
  }
}

// Puntos [t, v] de una gráfica v-t: tres tramos con aceleración entera.
function grafVT(rand) {
  for (;;) {
    const pts = [[0, elige(rand, [0, 2, 4, 6, 8])]]
    const as = []
    for (let i = 0; i < 3; i++) {
      const dt = elige(rand, DURACIONES)
      const a = elige(rand, [-3, -2, -1, 0, 0, 1, 2, 3])
      const [t0, v0] = pts.at(-1)
      pts.push([t0 + dt, v0 + a * dt])
      as.push(a)
    }
    if (pts.some(([, v]) => v < 0 || v > 16)) continue
    if (new Set(as).size < 2) continue
    return { pts, as }
  }
}

function opNum(rand, bueno, cands) {
  const u = [...new Set(cands)].filter(x => Number.isFinite(x) && x !== bueno)
  return u.length >= 3 ? baraja(rand, [bueno, ...baraja(rand, u).slice(0, 3)]) : null
}

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const tramo = Math.floor(rand() * 3)
    const base = { id: ++seq, nivel, tipo, tramo }

    if (tipo === 'que') {
      if (rand() < 0.5) {
        const g = grafXT(rand)
        const v = g.vs[tramo]
        const bueno = v === 0 ? 'parado' : v > 0 ? 'avanza' : 'retrocede'
        return { ...base, eje: 'x', pts: g.pts, bueno, opciones: QUE_XT }
      }
      const g = grafVT(rand)
      const [, v0] = g.pts[tramo], [, v1] = g.pts[tramo + 1]
      const a = g.as[tramo]
      // «parado» solo si la velocidad es 0 todo el tramo
      const bueno = a === 0 ? (v0 === 0 ? 'parado' : 'constante') : a > 0 ? 'acelera' : 'frena'
      if (a < 0 && v1 === 0 && rand() < 0.5) continue // que no todos los frenazos acaben en 0
      return { ...base, eje: 'v', pts: g.pts, bueno, opciones: QUE_VT }
    }

    if (tipo === 'velocidad' || tipo === 'rapido' || tipo === 'recorrido') {
      const g = grafXT(rand, { conVuelta: tipo === 'recorrido' })
      const [t0, x0] = g.pts[tramo], [t1, x1] = g.pts[tramo + 1]
      if (tipo === 'velocidad') {
        const v = g.vs[tramo], dx = x1 - x0, dt = t1 - t0
        // Errores típicos: Δx sin dividir, el signo, la posición final entre
        // el tiempo final (en vez de los incrementos), Δt ÷ Δx.
        const ops = opNum(rand, v, [dx, -v, t1 ? x1 / t1 : NaN, dx ? dt / dx : NaN, v + 1, v - 1].map(x => Math.round(x * 100) / 100))
        if (!ops || dx === 0 && rand() < 0.6) continue
        return { ...base, eje: 'x', pts: g.pts, bueno: v, opciones: ops }
      }
      if (tipo === 'rapido') {
        const abs = g.vs.map(Math.abs)
        const max = Math.max(...abs)
        if (abs.filter(x => x === max).length > 1) continue
        // la trampa: el tramo que llega más alto no es el más rápido
        return { ...base, eje: 'x', pts: g.pts, bueno: TRAMOS[abs.indexOf(max)], opciones: TRAMOS }
      }
      const recorrido = g.pts.slice(1).reduce((s, [, x], i) => s + Math.abs(x - g.pts[i][1]), 0)
      const desplaz = Math.abs(g.pts[3][1] - g.pts[0][1])
      const maxX = Math.max(...g.pts.map(([, x]) => x))
      const ops = opNum(rand, recorrido, [desplaz, maxX, g.pts[3][1], recorrido + 2])
      if (!ops || desplaz === recorrido) continue
      return { ...base, eje: 'x', pts: g.pts, bueno: recorrido, opciones: ops }
    }

    // v-t: aceleración o área
    const g = grafVT(rand)
    const [t0, v0] = g.pts[tramo], [t1, v1] = g.pts[tramo + 1]
    if (tipo === 'aceleracion') {
      const a = g.as[tramo], dv = v1 - v0, dt = t1 - t0
      const ops = opNum(rand, a, [dv, -a, t1 ? Math.round((v1 / t1) * 100) / 100 : NaN, a + 1, a - 1, dt])
      if (!ops || (a === 0 && rand() < 0.6)) continue
      return { ...base, eje: 'v', pts: g.pts, bueno: a, opciones: ops }
    }
    // área: un tramo o todo el recorrido (siempre entero)
    const total = rand() < 0.4
    const area = (i) => ((g.pts[i][1] + g.pts[i + 1][1]) * (g.pts[i + 1][0] - g.pts[i][0])) / 2
    const bueno = total ? area(0) + area(1) + area(2) : area(tramo)
    if (!Number.isInteger(bueno) || bueno === 0) continue
    const dt = t1 - t0
    // Errores: la velocidad final × tiempo (rectángulo de más), la inicial ×
    // tiempo (olvidar el triángulo), solo el triángulo, sin el ½.
    const cands = total
      ? [g.pts[3][1] * g.pts[3][0], Math.max(...g.pts.map(([, v]) => v)) * g.pts[3][0], bueno * 2, bueno + area(tramo)]
      : [v1 * dt, v0 * dt, Math.abs(v1 - v0) * dt / 2, (v0 + v1) * dt]
    const ops = opNum(rand, bueno, cands.filter(x => Number.isInteger(x) && x > 0))
    if (!ops) continue
    return { ...base, eje: 'v', pts: g.pts, total, bueno, opciones: ops }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es
const num = (x, l) => (l === 'en' ? String(x) : String(x).replace('.', ',').replace('-', '−'))

const NOMBRE_QUE = {
  parado: T('Está parado', 'It is at rest', 'Està aturat'),
  avanza: T('Avanza a velocidad constante', 'Moves forward at constant velocity', 'Avança a velocitat constant'),
  retrocede: T('Vuelve hacia atrás a velocidad constante', 'Moves back at constant velocity', 'Torna enrere a velocitat constant'),
  acelera: T('Acelera', 'Speeds up', 'Accelera'),
  constante: T('Va a velocidad constante', 'Moves at constant velocity', 'Va a velocitat constant'),
  frena: T('Frena', 'Slows down', 'Frena'),
}

export function textoOpcion(o, ronda, l) {
  switch (ronda.tipo) {
    case 'que': return tx(NOMBRE_QUE[o], l)
    case 'rapido': return tx(T(`Tramo ${o}`, `Stretch ${o}`, `Tram ${o}`), l)
    case 'velocidad': return `${num(o, l)} m/s`
    case 'aceleracion': return `${num(o, l)} m/s²`
    default: return `${num(o, l)} m`
  }
}

export function enunciado(ronda, l) {
  const tr = TRAMOS[ronda.tramo]
  switch (ronda.tipo) {
    case 'que': return tx(T(`¿Qué hace el móvil en el tramo ${tr}?`, `What is the object doing in stretch ${tr}?`, `Què fa el mòbil al tram ${tr}?`), l)
    case 'velocidad': return tx(T(`¿Qué velocidad lleva en el tramo ${tr}?`, `What is its velocity in stretch ${tr}?`, `Quina velocitat porta al tram ${tr}?`), l)
    case 'rapido': return tx(T('¿En qué tramo va más rápido?', 'In which stretch is it fastest?', 'En quin tram va més ràpid?'), l)
    case 'aceleracion': return tx(T(`¿Qué aceleración tiene en el tramo ${tr}?`, `What is its acceleration in stretch ${tr}?`, `Quina acceleració té al tram ${tr}?`), l)
    case 'recorrido': return tx(T('¿Qué distancia total ha recorrido?', 'What total distance has it travelled?', 'Quina distància total ha recorregut?'), l)
    default: return ronda.total
      ? tx(T('¿Qué distancia recorre en total?', 'What distance does it cover in total?', 'Quina distància recorre en total?'), l)
      : tx(T(`¿Qué distancia recorre en el tramo ${tr}?`, `What distance does it cover in stretch ${tr}?`, `Quina distància recorre al tram ${tr}?`), l)
  }
}

export function explicacion(ronda, l) {
  const r = ronda
  const tr = TRAMOS[r.tramo]
  const [t0, y0] = r.pts[r.tramo], [t1, y1] = r.pts[r.tramo + 1]
  const n = x => num(x, l)
  switch (r.tipo) {
    case 'que':
      if (r.eje === 'x') return tx({
        parado: T('En una gráfica posición-tiempo, una línea horizontal significa que la posición no cambia: está parado.', 'On a position-time graph, a horizontal line means the position does not change: it is at rest.', 'En una gràfica posició-temps, una línia horitzontal vol dir que la posició no canvia: està aturat.'),
        avanza: T('La posición crece en línea recta: avanza a velocidad constante (MRU). En una gráfica x-t una recta nunca es una aceleración.', 'The position grows in a straight line: it moves forward at constant velocity. On an x-t graph a straight line is never acceleration.', 'La posició creix en línia recta: avança a velocitat constant (MRU). En una gràfica x-t una recta mai no és una acceleració.'),
        retrocede: T('La posición baja: el móvil vuelve hacia el origen, a velocidad constante porque es una recta.', 'The position goes down: the object moves back towards the origin, at constant velocity because it is a straight line.', 'La posició baixa: el mòbil torna cap a l’origen, a velocitat constant perquè és una recta.'),
      }[r.bueno], l)
      return tx({
        parado: T('En una gráfica velocidad-tiempo, la velocidad es 0 en todo el tramo: está parado.', 'On a velocity-time graph, the velocity is 0 throughout the stretch: it is at rest.', 'En una gràfica velocitat-temps, la velocitat és 0 en tot el tram: està aturat.'),
        constante: T('En la gráfica v-t la línea es horizontal: la velocidad no cambia (MRU). Ojo: no está parado, porque la velocidad no es 0.', 'On the v-t graph the line is horizontal: the velocity does not change (uniform motion). Careful: it is not at rest, as the velocity is not 0.', 'A la gràfica v-t la línia és horitzontal: la velocitat no canvia (MRU). Compte: no està aturat, perquè la velocitat no és 0.'),
        acelera: T('La velocidad sube en línea recta: acelera de forma constante (MRUA).', 'The velocity rises in a straight line: it speeds up steadily (uniform acceleration).', 'La velocitat puja en línia recta: accelera de manera constant (MRUA).'),
        frena: T('La velocidad baja: frena. La aceleración es negativa.', 'The velocity drops: it slows down. The acceleration is negative.', 'La velocitat baixa: frena. L’acceleració és negativa.'),
      }[r.bueno], l)
    case 'velocidad':
      return tx(T(`v = Δx ÷ Δt = (${n(y1)} − ${n(y0)}) ÷ (${n(t1)} − ${n(t0)}) = ${n(y1 - y0)} ÷ ${n(t1 - t0)} = ${n(r.bueno)} m/s.${r.bueno < 0 ? ' El signo negativo indica que vuelve hacia atrás.' : ''}`,
        `v = Δx ÷ Δt = (${n(y1)} − ${n(y0)}) ÷ (${n(t1)} − ${n(t0)}) = ${n(y1 - y0)} ÷ ${n(t1 - t0)} = ${n(r.bueno)} m/s.${r.bueno < 0 ? ' The minus sign means it is moving back.' : ''}`,
        `v = Δx ÷ Δt = (${n(y1)} − ${n(y0)}) ÷ (${n(t1)} − ${n(t0)}) = ${n(y1 - y0)} ÷ ${n(t1 - t0)} = ${n(r.bueno)} m/s.${r.bueno < 0 ? ' El signe negatiu indica que torna enrere.' : ''}`), l)
    case 'rapido':
      return tx(T(`Va más rápido donde la recta está más inclinada (subiendo o bajando), no donde llega más alto: el tramo ${r.bueno}.`, `It is fastest where the line is steepest (rising or falling), not where it gets highest: stretch ${r.bueno}.`, `Va més ràpid on la recta és més inclinada (pujant o baixant), no on arriba més amunt: el tram ${r.bueno}.`), l)
    case 'aceleracion':
      return tx(T(`a = Δv ÷ Δt = (${n(y1)} − ${n(y0)}) ÷ (${n(t1)} − ${n(t0)}) = ${n(r.bueno)} m/s².${r.bueno === 0 ? ' Velocidad constante: no hay aceleración.' : r.bueno < 0 ? ' Negativa: está frenando.' : ''}`,
        `a = Δv ÷ Δt = (${n(y1)} − ${n(y0)}) ÷ (${n(t1)} − ${n(t0)}) = ${n(r.bueno)} m/s².${r.bueno === 0 ? ' Constant velocity: no acceleration.' : r.bueno < 0 ? ' Negative: it is slowing down.' : ''}`,
        `a = Δv ÷ Δt = (${n(y1)} − ${n(y0)}) ÷ (${n(t1)} − ${n(t0)}) = ${n(r.bueno)} m/s².${r.bueno === 0 ? ' Velocitat constant: no hi ha acceleració.' : r.bueno < 0 ? ' Negativa: està frenant.' : ''}`), l)
    case 'recorrido': {
      const tramos = r.pts.slice(1).map(([, x], i) => Math.abs(x - r.pts[i][1]))
      const desp = Math.abs(r.pts[3][1] - r.pts[0][1])
      return tx(T(`Se suman los metros de cada tramo, vaya hacia delante o hacia atrás: ${tramos.join(' + ')} = ${r.bueno} m. El desplazamiento (de dónde salió a dónde acaba) es solo ${desp} m.`,
        `Add up the metres in each stretch, forwards or backwards: ${tramos.join(' + ')} = ${r.bueno} m. The displacement (from start to finish) is only ${desp} m.`,
        `Se sumen els metres de cada tram, vagi endavant o enrere: ${tramos.join(' + ')} = ${r.bueno} m. El desplaçament (d’on va sortir a on acaba) és només ${desp} m.`), l)
    }
    default: {
      if (r.total) {
        const partes = [0, 1, 2].map(i => ((r.pts[i][1] + r.pts[i + 1][1]) * (r.pts[i + 1][0] - r.pts[i][0])) / 2)
        return tx(T(`La distancia es el área bajo la gráfica v-t. Tramo a tramo: ${partes.map(n).join(' + ')} = ${n(r.bueno)} m.`, `Distance is the area under the v-t graph. Stretch by stretch: ${partes.map(n).join(' + ')} = ${n(r.bueno)} m.`, `La distància és l’àrea sota la gràfica v-t. Tram a tram: ${partes.map(n).join(' + ')} = ${n(r.bueno)} m.`), l)
      }
      return tx(T(`La distancia es el área bajo la gráfica en el tramo ${tr}: (${n(y0)} + ${n(y1)}) ÷ 2 × ${n(t1 - t0)} = ${n(r.bueno)} m (la velocidad media del tramo por su duración).`,
        `Distance is the area under the graph in stretch ${tr}: (${n(y0)} + ${n(y1)}) ÷ 2 × ${n(t1 - t0)} = ${n(r.bueno)} m (the stretch’s average velocity times its duration).`,
        `La distància és l’àrea sota la gràfica al tram ${tr}: (${n(y0)} + ${n(y1)}) ÷ 2 × ${n(t1 - t0)} = ${n(r.bueno)} m (la velocitat mitjana del tram per la seva durada).`), l)
    }
  }
}

// JSON-LD: la gráfica descrita con sus puntos.
export function schemaQuestion(ronda, l) {
  const eje = ronda.eje === 'x' ? 'x (m)' : 'v (m/s)'
  const pts = ronda.pts.map(([t, y]) => `(${num(t, l)} s, ${num(y, l)})`).join(' → ')
  const datos = tx(T(`Gráfica ${eje} frente a t, tramos A, B y C entre los puntos ${pts}.`, `Graph of ${eje} against t, stretches A, B and C between the points ${pts}.`, `Gràfica ${eje} respecte de t, trams A, B i C entre els punts ${pts}.`), l)
  return {
    question: `${datos} ${enunciado(ronda, l)}`,
    correctAnswer: textoOpcion(ronda.bueno, ronda, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, ronda, l)),
  }
}
