// Engranajes (física · máquinas y mecanismos, ESO): una cadena de ruedas
// dentadas generada al azar. La primera (la motriz) gira en un sentido y a
// unas rpm conocidas; hay que razonar qué hace la última.
//
// Física de un tren de engranajes:
//   · dos ruedas engranadas giran en sentidos CONTRARIOS;
//   · se conserva velocidad × dientes: n1 · z1 = n2 · z2 (la pequeña va más
//     rápida);
//   · por eso las ruedas intermedias («locas») NO cambian la velocidad final,
//     solo el sentido: n_última = n_primera · z_primera / z_última;
//   · una rueda doble (dos piñones en el mismo eje) gira entera a la misma
//     velocidad y en el mismo sentido: ahí sí se multiplica la reducción.
//
// Niveles:
//   facil   → 2-3 ruedas; ¿hacia dónde gira?, ¿más rápida o más lenta?
//   medio   → 3-5 ruedas; también ¿a cuántas rpm?
//   dificil → 3-5 ruedas con una rueda doble en medio; sentido y rpm

export const DIENTES = [8, 10, 12, 15, 16, 20, 24, 30, 36, 40]
export const RPM_MOTRIZ = [20, 30, 40, 60, 80, 90, 120]

export const NIVELES = {
  facil:   { ruedas: [2, 3], preguntas: ['sentido', 'velocidad'], doble: false },
  medio:   { ruedas: [3, 5], preguntas: ['sentido', 'velocidad', 'rpm', 'rpm'], doble: false },
  dificil: { ruedas: [3, 5], preguntas: ['sentido', 'rpm', 'rpm'], doble: true },
}

const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
const redondea = x => Math.round(x * 100) / 100

// Una rueda: { z, eje, sentido (+1 horario, −1 antihorario), rpm }. Las de una
// rueda doble comparten `eje`. `engranaCon`: índice de la rueda que la mueve.
export function resolverTren(ruedas, rpm0, sentido0 = 1) {
  const out = ruedas.map(r => ({ ...r }))
  out[0].sentido = sentido0
  out[0].rpm = rpm0
  for (let i = 1; i < out.length; i++) {
    const r = out[i]
    const m = out[r.mueve]
    if (r.mismoEje) { r.sentido = m.sentido; r.rpm = m.rpm }
    else { r.sentido = -m.sentido; r.rpm = (m.rpm * m.z) / r.z }
  }
  return out
}

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const n = entre(rand, cfg.ruedas[0], cfg.ruedas[1])
    const ruedas = [{ z: elige(rand, DIENTES), mueve: null, mismoEje: false }]
    // posición de la rueda doble (el piñón pequeño va pegado a la rueda i)
    const dobleEn = cfg.doble ? entre(rand, 1, n - 2) : -1
    for (let i = 1; i < n; i++) {
      ruedas.push({ z: elige(rand, DIENTES), mueve: ruedas.length - 1, mismoEje: false })
      if (i === dobleEn) {
        // segundo piñón en el mismo eje, distinto tamaño, que mueve a la siguiente
        // El otro piñón del eje, claramente más grande o más pequeño: si se
        // parecen, en el dibujo no se distinguen las dos ruedas.
        const z1 = ruedas[ruedas.length - 1].z
        const z2 = elige(rand, DIENTES.filter(z => z <= z1 * 0.6 || z >= z1 * 1.6))
        if (!z2) continue
        ruedas.push({ z: z2, mueve: ruedas.length - 1, mismoEje: true })
      }
    }
    if (cfg.doble && !ruedas.some(r => r.mismoEje)) continue
    const rpm0 = elige(rand, RPM_MOTRIZ)
    const sentido0 = rand() < 0.5 ? 1 : -1
    const tren = resolverTren(ruedas, rpm0, sentido0)
    const ultima = tren[tren.length - 1]
    if (!Number.isInteger(ultima.rpm)) continue
    if (tren.some(r => r.rpm > 400)) continue
    const pregunta = elige(rand, cfg.preguntas)
    let bueno, opciones
    if (pregunta === 'sentido') {
      bueno = ultima.sentido === 1 ? 'horario' : 'antihorario'
      opciones = ['horario', 'antihorario']
    } else if (pregunta === 'velocidad') {
      bueno = ultima.rpm > rpm0 ? 'rapida' : ultima.rpm < rpm0 ? 'lenta' : 'igual'
      opciones = ['rapida', 'lenta', 'igual']
    } else {
      bueno = ultima.rpm
      // Distractores con los errores típicos: la razón al revés, creer que
      // las intermedias cuentan, o que no cambia nada.
      const z0 = tren[0].z, zu = ultima.z
      const cand = [redondea((rpm0 * zu) / z0), rpm0, redondea((rpm0 * z0) / tren[1].z), ultima.rpm * 2, redondea(ultima.rpm / 2), ultima.rpm + 10]
        .filter(x => Number.isInteger(x) && x > 0 && x !== bueno)
      const unicos = [...new Set(cand)]
      if (unicos.length < 3) continue
      opciones = baraja(rand, [bueno, ...baraja(rand, unicos).slice(0, 3)])
    }
    return { nivel, tren, rpm0, pregunta, bueno, opciones }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
const tx = (l, es, en, ca) => ({ es, en, ca })[l] ?? es
export const NOMBRE_RESP = {
  horario: { es: 'Sentido horario ↻', en: 'Clockwise ↻', ca: 'Sentit horari ↻' },
  antihorario: { es: 'Sentido antihorario ↺', en: 'Anticlockwise ↺', ca: 'Sentit antihorari ↺' },
  rapida: { es: 'Más rápida que la primera', en: 'Faster than the first', ca: 'Més ràpida que la primera' },
  lenta: { es: 'Más lenta que la primera', en: 'Slower than the first', ca: 'Més lenta que la primera' },
  igual: { es: 'A la misma velocidad', en: 'At the same speed', ca: 'A la mateixa velocitat' },
}
export const textoOpcion = (o, l) => (typeof o === 'number' ? `${o} rpm` : (NOMBRE_RESP[o][l] ?? NOMBRE_RESP[o].es))

export function enunciado(ronda, l) {
  const { pregunta } = ronda
  if (pregunta === 'sentido') return tx(l, '¿Hacia dónde gira la rueda marcada?', 'Which way does the marked gear turn?', 'Cap a on gira la roda marcada?')
  if (pregunta === 'velocidad') return tx(l, '¿Cómo gira la rueda marcada?', 'How does the marked gear turn?', 'Com gira la roda marcada?')
  return tx(l, '¿A cuántas vueltas por minuto (rpm) gira la rueda marcada?', 'How many revolutions per minute (rpm) does the marked gear make?', 'A quantes voltes per minut (rpm) gira la roda marcada?')
}

export function explicacion(ronda, l) {
  const { tren, rpm0, pregunta } = ronda
  const u = tren[tren.length - 1]
  const n = tren.length
  const engranes = tren.filter((r, i) => i > 0 && !r.mismoEje).length
  const hayDoble = tren.some(r => r.mismoEje)
  if (pregunta === 'sentido') {
    const base = tx(l,
      `Cada vez que dos ruedas engranan, el giro se invierte. Aquí hay ${engranes} engrane${engranes > 1 ? 's' : ''}: ${engranes % 2 ? 'un número impar, así que la última gira al revés que la primera' : 'un número par, así que la última gira igual que la primera'}.`,
      `Every time two gears mesh, the rotation reverses. Here there ${engranes > 1 ? 'are' : 'is'} ${engranes} mesh${engranes > 1 ? 'es' : ''}: ${engranes % 2 ? 'an odd number, so the last turns the opposite way to the first' : 'an even number, so the last turns the same way as the first'}.`,
      `Cada vegada que dues rodes engranen, el gir s’inverteix. Aquí hi ha ${engranes} engranatge${engranes > 1 ? 's' : ''}: ${engranes % 2 ? 'un nombre senar, així que l’última gira al revés que la primera' : 'un nombre parell, així que l’última gira igual que la primera'}.`)
    return hayDoble ? base + tx(l, ' Las dos ruedas del mismo eje giran juntas y no cuentan como engrane.', ' The two gears on the same shaft turn together and do not count as a mesh.', ' Les dues rodes del mateix eix giren juntes i no compten com a engranatge.') : base
  }
  if (!hayDoble) {
    const z0 = tren[0].z
    const inter = n > 2 ? tx(l, ' Las ruedas de en medio solo cambian el sentido, no la velocidad final.', ' The gears in between only change the direction, not the final speed.', ' Les rodes del mig només canvien el sentit, no la velocitat final.') : ''
    return tx(l,
      `Se conserva velocidad × dientes: ${rpm0} × ${z0} = ${u.rpm} × ${u.z}, así que la última gira a ${u.rpm} rpm.`,
      `Speed × teeth is conserved: ${rpm0} × ${z0} = ${u.rpm} × ${u.z}, so the last turns at ${u.rpm} rpm.`,
      `Es conserva velocitat × dents: ${rpm0} × ${z0} = ${u.rpm} × ${u.z}, així que l’última gira a ${u.rpm} rpm.`) + inter
  }
  // Con rueda doble: la cuenta paso a paso.
  const pasos = tren.map((r, i) => `${i + 1}: ${redondea(r.rpm)} rpm`).join(' · ')
  return tx(l,
    `En cada engrane, rpm × dientes se conserva; las dos ruedas del mismo eje giran a las mismas rpm. ${pasos}.`,
    `At each mesh, rpm × teeth is conserved; the two gears on the same shaft turn at the same rpm. ${pasos}.`,
    `A cada engranatge, rpm × dents es conserva; les dues rodes del mateix eix giren a les mateixes rpm. ${pasos}.`)
}

// JSON-LD / ejemplos: solo los trenes sin rueda doble se entienden sin dibujo.
export function schemaQuestion(ronda, l) {
  if (ronda.tren.some(r => r.mismoEje)) return null
  const t = ronda.tren
  const desc = t.map((r, i) => `${i + 1}: ${r.z} ${tx(l, 'dientes', 'teeth', 'dents')}`).join(', ')
  const motriz = tx(l, `La rueda 1 gira a ${ronda.rpm0} rpm en sentido ${t[0].sentido === 1 ? 'horario' : 'antihorario'}`, `Gear 1 turns at ${ronda.rpm0} rpm ${t[0].sentido === 1 ? 'clockwise' : 'anticlockwise'}`, `La roda 1 gira a ${ronda.rpm0} rpm en sentit ${t[0].sentido === 1 ? 'horari' : 'antihorari'}`)
  return {
    question: `${tx(l, 'Tren de engranajes', 'Gear train', 'Tren d’engranatges')} (${desc}). ${motriz}. ${enunciado(ronda, l).replace(tx(l, 'la rueda marcada', 'the marked gear', 'la roda marcada'), tx(l, `la rueda ${t.length}`, `gear ${t.length}`, `la roda ${t.length}`))}`,
    correctAnswer: textoOpcion(ronda.bueno, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, l)),
  }
}
