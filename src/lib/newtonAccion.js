// Newton en Acción (física · dinámica, 4.º de ESO y Bachillerato).
//
// Una caja dibujada con sus fuerzas como flechas a escala: sobre el suelo,
// en un plano inclinado o dentro de un ascensor. Siempre con g = 10 m/s²
// (se dice en el enunciado), para que las cuentas salgan limpias.
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   segunda    F = m·a, despejando a o F          (multiplicar donde hay que dividir)
//   peso       P = m·g en la Tierra y en la Luna   (creer que la masa cambia en la Luna)
//   rozamiento a = (F − Fr)/m, con Fr = μ·m·g      (olvidar el rozamiento; que la caja no se mueva)
//   plano      plano inclinado sin rozamiento: a = g·sen α y N = m·g·cos α  (N = m·g)
//   ascensor   peso aparente N = m·(g ± a)          (el signo según acelere hacia arriba o abajo)
//   concepto   inercia y acción-reacción            (la fuerza mayor la hace «el más grande»)
//
// Las medidas con decimales van en décimas enteras (×10).

const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const num = (n, l = 'es') => n.toLocaleString(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES', { maximumFractionDigits: 1 })
export const G = 10
const G_LUNA = 1.6

export const NIVELES = {
  facil:   { tipos: ['segunda', 'segunda', 'peso', 'peso', 'concepto'] },
  medio:   { tipos: ['segunda', 'peso', 'rozamiento', 'rozamiento', 'concepto'] },
  dificil: { tipos: ['rozamiento', 'plano', 'plano', 'ascensor', 'ascensor', 'concepto'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const exacto = x => Math.abs(x - Math.round(x)) < 1e-9
function opciones(rand, bueno, candidatos, ok = v => v >= 0) {
  const vistos = new Set([bueno])
  const out = []
  for (const c of candidatos) {
    if (c == null || !Number.isFinite(c) || !exacto(c)) continue
    const v = Math.round(c)
    if (!ok(v) || vistos.has(v)) continue
    vistos.add(v); out.push(v)
    if (out.length === 3) break
  }
  return out.length === 3 ? baraja(rand, [bueno, ...out]) : null
}

// Conceptos: la buena es siempre la 0.
export const CONCEPTOS = [
  { id: 'pared', emoji: '🧱',
    q: T('Empujas una pared con una fuerza de 50 N. ¿Qué fuerza hace la pared sobre ti?', 'You push a wall with a force of 50 N. What force does the wall exert on you?', 'Empenys una paret amb una força de 50 N. Quina força fa la paret sobre tu?'),
    ops: [T('50 N, en sentido contrario', '50 N, in the opposite direction', '50 N, en sentit contrari'), T('Ninguna: las paredes no empujan', 'None: walls do not push', 'Cap: les parets no empenyen'), T('Menos de 50 N, porque no se mueve', 'Less than 50 N, because it does not move', 'Menys de 50 N, perquè no es mou'), T('Más de 50 N, porque pesa más que tú', 'More than 50 N, because it weighs more than you', 'Més de 50 N, perquè pesa més que tu')],
    exp: T('Tercera ley de Newton (acción y reacción): si un cuerpo ejerce una fuerza sobre otro, el otro ejerce sobre el primero una fuerza igual y de sentido contrario. Actúan sobre cuerpos distintos, por eso no se anulan.', 'Newton’s third law (action and reaction): if one body exerts a force on another, the other exerts an equal and opposite force on the first. They act on different bodies, which is why they do not cancel out.', 'Tercera llei de Newton (acció i reacció): si un cos fa una força sobre un altre, l’altre fa sobre el primer una força igual i de sentit contrari. Actuen sobre cossos diferents, per això no s’anul·len.') },
  { id: 'camion', emoji: '🚚',
    q: T('Un camión choca con un mosquito en la carretera. ¿Quién recibe la fuerza mayor en el choque?', 'A lorry hits a mosquito on the road. Which one receives the bigger force in the collision?', 'Un camió xoca amb un mosquit a la carretera. Qui rep la força més gran en el xoc?'),
    ops: [T('Los dos reciben la misma fuerza', 'They both receive the same force', 'Tots dos reben la mateixa força'), T('El mosquito', 'The mosquito', 'El mosquit'), T('El camión', 'The lorry', 'El camió'), T('Ninguno: el mosquito no hace fuerza', 'Neither: the mosquito exerts no force', 'Cap: el mosquit no fa força')],
    exp: T('Por la tercera ley, las dos fuerzas son iguales. El mosquito sale peor parado porque, con su masa diminuta, esa misma fuerza le produce una aceleración enorme (a = F/m).', 'By the third law, the two forces are equal. The mosquito comes off worse because, with its tiny mass, the same force gives it a huge acceleration (a = F/m).', 'Per la tercera llei, les dues forces són iguals. El mosquit en surt pitjor perquè, amb la seva massa diminuta, la mateixa força li produeix una acceleració enorme (a = F/m).') },
  { id: 'autobus', emoji: '🚌',
    q: T('Vas de pie en un autobús y frena de golpe. ¿Por qué te vas hacia delante?', 'You are standing on a bus and it brakes suddenly. Why do you lurch forwards?', 'Vas dret en un autobús i frena de cop. Per què te’n vas cap endavant?'),
    ops: [T('Por inercia: tu cuerpo tiende a seguir moviéndose', 'Inertia: your body tends to keep moving', 'Per inèrcia: el teu cos tendeix a continuar movent-se'), T('El freno te empuja hacia delante', 'The brake pushes you forwards', 'El fre t’empeny cap endavant'), T('El aire del autobús te empuja', 'The air in the bus pushes you', 'L’aire de l’autobús t’empeny'), T('Tu peso aumenta al frenar', 'Your weight increases when braking', 'El teu pes augmenta en frenar')],
    exp: T('Primera ley de Newton (inercia): un cuerpo mantiene su velocidad si no actúa ninguna fuerza neta sobre él. El autobús frena, pero tu cuerpo sigue moviéndose hasta que algo (los pies, la barra) le hace fuerza.', 'Newton’s first law (inertia): a body keeps its velocity unless a net force acts on it. The bus slows down, but your body keeps moving until something (your feet, the handrail) exerts a force on it.', 'Primera llei de Newton (inèrcia): un cos manté la seva velocitat si no hi actua cap força neta. L’autobús frena, però el teu cos continua movent-se fins que alguna cosa (els peus, la barra) hi fa força.') },
  { id: 'nave', emoji: '🚀',
    q: T('Una nave en el espacio, lejos de todo, apaga los motores. ¿Qué le pasa?', 'A spacecraft far out in space switches off its engines. What happens to it?', 'Una nau a l’espai, lluny de tot, apaga els motors. Què li passa?'),
    ops: [T('Sigue en línea recta a la misma velocidad', 'It carries on in a straight line at the same speed', 'Continua en línia recta a la mateixa velocitat'), T('Se va frenando hasta pararse', 'It gradually slows down and stops', 'Es va frenant fins que s’atura'), T('Se para de golpe', 'It stops at once', 'S’atura de cop'), T('Empieza a caer', 'It starts to fall', 'Comença a caure')],
    exp: T('Sin fuerza neta, la velocidad no cambia (primera ley). En la Tierra las cosas se paran por el rozamiento; en el espacio vacío no hay nada que la frene.', 'With no net force, the velocity does not change (first law). On Earth things stop because of friction; in empty space there is nothing to slow it down.', 'Sense força neta, la velocitat no canvia (primera llei). A la Terra les coses s’aturen pel fregament; a l’espai buit no hi ha res que la freni.') },
  { id: 'pluma', emoji: '🍂',
    q: T('En un tubo sin aire se dejan caer a la vez una pluma y una piedra. ¿Cuál llega antes al fondo?', 'In a tube with no air, a feather and a stone are dropped at the same time. Which reaches the bottom first?', 'En un tub sense aire es deixen caure alhora una ploma i una pedra. Quina arriba abans al fons?'),
    ops: [T('Llegan a la vez', 'They arrive together', 'Arriben alhora'), T('La piedra, porque pesa más', 'The stone, because it is heavier', 'La pedra, perquè pesa més'), T('La pluma, porque es más ligera', 'The feather, because it is lighter', 'La ploma, perquè és més lleugera'), T('Ninguna: sin aire no caen', 'Neither: with no air they do not fall', 'Cap: sense aire no cauen')],
    exp: T('La piedra pesa más, pero también tiene más masa: a = P/m = m·g/m = g. Sin aire todos los cuerpos caen con la misma aceleración. En el aire, la pluma llega después por el rozamiento.', 'The stone weighs more, but it also has more mass: a = W/m = m·g/m = g. Without air, all bodies fall with the same acceleration. In air, the feather arrives later because of air resistance.', 'La pedra pesa més, però també té més massa: a = P/m = m·g/m = g. Sense aire tots els cossos cauen amb la mateixa acceleració. A l’aire, la ploma arriba després pel fregament.') },
  { id: 'constante', emoji: '🛒',
    q: T('Empujas un carrito y va a velocidad constante. ¿Qué se puede decir de las fuerzas?', 'You push a trolley and it moves at constant speed. What can you say about the forces?', 'Empenys un carretó i va a velocitat constant. Què es pot dir de les forces?'),
    ops: [T('Se compensan: la fuerza neta es cero', 'They balance: the net force is zero', 'Es compensen: la força neta és zero'), T('Tu empuje es mayor que el rozamiento', 'Your push is bigger than friction', 'La teva empenta és més gran que el fregament'), T('No actúa ninguna fuerza', 'No forces act at all', 'No hi actua cap força'), T('Solo actúa tu empuje', 'Only your push acts', 'Només hi actua la teva empenta')],
    exp: T('Velocidad constante significa aceleración cero, y por la segunda ley eso exige fuerza neta cero: tu empuje es igual al rozamiento. Si empujaras más, el carrito aceleraría.', 'Constant velocity means zero acceleration, and by the second law that requires zero net force: your push equals friction. If you pushed harder, the trolley would speed up.', 'Velocitat constant vol dir acceleració zero, i per la segona llei això exigeix força neta zero: la teva empenta és igual al fregament. Si empenyessis més, el carretó acceleraria.') },
]

let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'segunda') {
      const m = elige(rand, [2, 4, 5, 8, 10, 20, 25, 50]), a = elige(rand, [1, 2, 3, 4, 5, 6])
      const F = m * a
      const despeje = nivel === 'facil' ? 'a' : elige(rand, ['a', 'F', 'm'])
      const bueno = despeje === 'a' ? a : despeje === 'F' ? F : m
      const cands = despeje === 'a' ? [F * m, F - m, F + m, a * 2, m / F]
        : despeje === 'F' ? [m / a, m + a, F * 2, F / 2] : [F * a, F - a, F + a, m * 2]
      const ops = opciones(rand, bueno, cands, v => v > 0)
      if (!ops) continue
      return { ...base, m, a, F, despeje, bueno, opciones: ops }
    }

    if (tipo === 'peso') {
      const caso = elige(rand, ['tierra', 'luna', 'masaLuna'])
      const m = elige(rand, [5, 10, 25, 50, 60, 75])
      if (caso === 'tierra') {
        const ops = opciones(rand, m * G, [m, m * G_LUNA, m / G, m * G * 2, m * 9])
        if (!ops) continue
        return { ...base, caso, m, bueno: m * G, opciones: ops }
      }
      if (caso === 'luna') {
        const bueno = Math.round(m * G_LUNA)
        const ops = opciones(rand, bueno, [m * G, m, m / 6, m * 6, m * G / G_LUNA])
        if (!ops) continue
        return { ...base, caso, m, bueno, opciones: ops }
      }
      const ops = opciones(rand, m, [Math.round(m * G_LUNA), Math.round(m / 6), m * G, 0])
      if (!ops) continue
      return { ...base, caso, m, bueno: m, opciones: ops }
    }

    if (tipo === 'rozamiento') {
      const m = elige(rand, [2, 4, 5, 10, 20]), mu = elige(rand, [0.1, 0.2, 0.25, 0.5])
      const Fr = mu * m * G
      if (!exacto(Fr)) continue
      const quieta = rand() < 0.25
      let F, a
      if (quieta) { F = Math.round(Fr * elige(rand, [0.4, 0.5, 0.8])); if (F <= 0 || F >= Fr || !exacto(F)) continue; a = 0 }
      else { a = elige(rand, [1, 2, 3, 4, 5]); F = Math.round(Fr) + m * a }
      const ops = opciones(rand, a, [F / m, (F + Fr) / m, Fr / m, (F - mu * m) / m, a + 1])
      if (!ops) continue
      return { ...base, m, mu, Fr: Math.round(Fr), F, quieta, bueno: a, opciones: ops }
    }

    if (tipo === 'plano') {
      const ang = elige(rand, [20, 30, 37, 45, 53, 60])
      const pide = elige(rand, ['a', 'normal'])
      const r = (ang * Math.PI) / 180
      if (pide === 'a') {
        const bueno = Math.round(G * Math.sin(r) * 10)
        const ops = opciones(rand, bueno, [Math.round(G * Math.cos(r) * 10), G * 10, Math.round(G * Math.tan(r) * 10), Math.round(G * Math.sin(r) * 5)])
        if (!ops) continue
        return { ...base, ang, pide, bueno, opciones: ops }
      }
      const m = elige(rand, [2, 4, 5, 10, 20])
      const bueno = Math.round(m * G * Math.cos(r) * 10)
      const ops = opciones(rand, bueno, [m * G * 10, Math.round(m * G * Math.sin(r) * 10), Math.round(m * Math.cos(r) * 10), Math.round(m * G * 10 / Math.cos(r))])
      if (!ops) continue
      return { ...base, ang, pide, m, bueno, opciones: ops }
    }

    if (tipo === 'ascensor') {
      const m = elige(rand, [40, 50, 60, 70, 80]), a = elige(rand, [1, 2, 3])
      const caso = elige(rand, ['subeAcelera', 'bajaAcelera', 'subeFrena', 'constante'])
      const signo = caso === 'subeAcelera' ? 1 : caso === 'constante' ? 0 : -1
      const bueno = m * (G + signo * a)
      const ops = opciones(rand, bueno, [m * G, m * (G - signo * a || G + a), m * a, m * (G + 2 * a)], v => v > 0)
      if (!ops) continue
      return { ...base, m, a, caso, bueno, opciones: ops }
    }

    const c = elige(rand, CONCEPTOS)
    return { ...base, concepto: c.id, bueno: 0, opciones: baraja(rand, [0, 1, 2, 3]) }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
const cpt = r => CONCEPTOS.find(c => c.id === r.concepto)
const conG = l => s(l, '(g = 10 m/s²)', '(g = 10 m/s²)', '(g = 10 m/s²)')

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'segunda': return `${num(o, l)} ${r.despeje === 'a' ? 'm/s²' : r.despeje === 'F' ? 'N' : 'kg'}`
    case 'peso': return `${num(o, l)} ${r.caso === 'masaLuna' ? 'kg' : 'N'}`
    case 'rozamiento': return o === 0 ? s(l, '0 m/s² (no se mueve)', '0 m/s² (it does not move)', '0 m/s² (no es mou)') : `${num(o, l)} m/s²`
    case 'plano': return `${num(o / 10, l)} ${r.pide === 'a' ? 'm/s²' : 'N'}`
    case 'ascensor': return `${num(o, l)} N`
    default: return tx(cpt(r).ops[o], l)
  }
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'segunda':
      if (r.despeje === 'a') return s(l, `Sobre una caja de ${r.m} kg actúa una fuerza neta de ${r.F} N. ¿Qué aceleración adquiere?`, `A net force of ${r.F} N acts on a ${r.m} kg box. What acceleration does it get?`, `Sobre una caixa de ${r.m} kg actua una força neta de ${r.F} N. Quina acceleració adquireix?`)
      if (r.despeje === 'F') return s(l, `Una caja de ${r.m} kg acelera a ${r.a} m/s². ¿Qué fuerza neta actúa sobre ella?`, `A ${r.m} kg box accelerates at ${r.a} m/s². What net force acts on it?`, `Una caixa de ${r.m} kg accelera a ${r.a} m/s². Quina força neta hi actua?`)
      return s(l, `Una fuerza neta de ${r.F} N produce una aceleración de ${r.a} m/s². ¿Qué masa tiene la caja?`, `A net force of ${r.F} N produces an acceleration of ${r.a} m/s². What is the mass of the box?`, `Una força neta de ${r.F} N produeix una acceleració de ${r.a} m/s². Quina massa té la caixa?`)
    case 'peso':
      if (r.caso === 'tierra') return s(l, `¿Cuánto pesa en la Tierra un cuerpo de ${r.m} kg? ${conG(l)}`, `How much does a ${r.m} kg body weigh on Earth? ${conG(l)}`, `Quant pesa a la Terra un cos de ${r.m} kg? ${conG(l)}`)
      if (r.caso === 'luna') return s(l, `¿Cuánto pesa en la Luna un astronauta de ${r.m} kg? (g Luna = 1,6 m/s²)`, `How much does a ${r.m} kg astronaut weigh on the Moon? (Moon g = 1.6 m/s²)`, `Quant pesa a la Lluna un astronauta de ${r.m} kg? (g Lluna = 1,6 m/s²)`)
      return s(l, `Un astronauta tiene una masa de ${r.m} kg en la Tierra. ¿Qué masa tiene en la Luna?`, `An astronaut has a mass of ${r.m} kg on Earth. What is their mass on the Moon?`, `Un astronauta té una massa de ${r.m} kg a la Terra. Quina massa té a la Lluna?`)
    case 'rozamiento': return s(l, `Empujas una caja de ${r.m} kg con ${r.F} N. El coeficiente de rozamiento es ${num(r.mu, l)}. ¿Qué aceleración tiene? ${conG(l)}`, `You push a ${r.m} kg box with ${r.F} N. The coefficient of friction is ${num(r.mu, l)}. What is its acceleration? ${conG(l)}`, `Empenys una caixa de ${r.m} kg amb ${r.F} N. El coeficient de fregament és ${num(r.mu, l)}. Quina acceleració té? ${conG(l)}`)
    case 'plano': return r.pide === 'a'
      ? s(l, `Una caja baja por un plano inclinado ${r.ang}° sin rozamiento. ¿Con qué aceleración? ${conG(l)}`, `A box slides down a ${r.ang}° slope with no friction. What is its acceleration? ${conG(l)}`, `Una caixa baixa per un pla inclinat ${r.ang}° sense fregament. Amb quina acceleració? ${conG(l)}`)
      : s(l, `Una caja de ${r.m} kg está en un plano inclinado ${r.ang}°. ¿Cuánto vale la fuerza normal? ${conG(l)}`, `A ${r.m} kg box sits on a ${r.ang}° slope. What is the normal force? ${conG(l)}`, `Una caixa de ${r.m} kg és en un pla inclinat ${r.ang}°. Quant val la força normal? ${conG(l)}`)
    case 'ascensor': {
      const como = {
        subeAcelera: s(l, `sube acelerando a ${r.a} m/s²`, `goes up speeding up at ${r.a} m/s²`, `puja accelerant a ${r.a} m/s²`),
        bajaAcelera: s(l, `baja acelerando a ${r.a} m/s²`, `goes down speeding up at ${r.a} m/s²`, `baixa accelerant a ${r.a} m/s²`),
        subeFrena: s(l, `sube frenando a ${r.a} m/s²`, `goes up slowing down at ${r.a} m/s²`, `puja frenant a ${r.a} m/s²`),
        constante: s(l, 'sube a velocidad constante', 'goes up at constant speed', 'puja a velocitat constant'),
      }[r.caso]
      return s(l, `Una persona de ${r.m} kg está sobre una báscula en un ascensor que ${como}. ¿Qué marca la báscula (la normal)? ${conG(l)}`, `A ${r.m} kg person stands on scales in a lift that ${como}. What do the scales read (the normal force)? ${conG(l)}`, `Una persona de ${r.m} kg és sobre una bàscula en un ascensor que ${como}. Què marca la bàscula (la normal)? ${conG(l)}`)
    }
    default: return tx(cpt(r).q, l)
  }
}

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'segunda': return s(l,
      `Segunda ley de Newton: F = m · a. ${r.despeje === 'a' ? `a = F ÷ m = ${r.F} ÷ ${r.m} = ${r.a} m/s²` : r.despeje === 'F' ? `F = ${r.m} · ${r.a} = ${r.F} N` : `m = F ÷ a = ${r.F} ÷ ${r.a} = ${r.m} kg`}. Cuanta más masa, más cuesta acelerar el cuerpo con la misma fuerza.`,
      `Newton’s second law: F = m × a. ${r.despeje === 'a' ? `a = F ÷ m = ${r.F} ÷ ${r.m} = ${r.a} m/s²` : r.despeje === 'F' ? `F = ${r.m} × ${r.a} = ${r.F} N` : `m = F ÷ a = ${r.F} ÷ ${r.a} = ${r.m} kg`}. The more mass, the harder it is to accelerate with the same force.`,
      `Segona llei de Newton: F = m · a. ${r.despeje === 'a' ? `a = F ÷ m = ${r.F} ÷ ${r.m} = ${r.a} m/s²` : r.despeje === 'F' ? `F = ${r.m} · ${r.a} = ${r.F} N` : `m = F ÷ a = ${r.F} ÷ ${r.a} = ${r.m} kg`}. Com més massa, més costa accelerar el cos amb la mateixa força.`)
    case 'peso':
      if (r.caso === 'masaLuna') return s(l, `La masa es la cantidad de materia y no cambia de un sitio a otro: sigue siendo ${r.m} kg. Lo que cambia en la Luna es el peso, la fuerza con que la atrae: ${r.m} · 1,6 = ${num(r.m * G_LUNA, l)} N.`, `Mass is the amount of matter and does not change from place to place: it is still ${r.m} kg. What changes on the Moon is the weight, the force pulling it: ${r.m} × 1.6 = ${num(r.m * G_LUNA, l)} N.`, `La massa és la quantitat de matèria i no canvia d’un lloc a l’altre: continua sent ${r.m} kg. El que canvia a la Lluna és el pes, la força amb què l’atrau: ${r.m} · 1,6 = ${num(r.m * G_LUNA, l)} N.`)
      return s(l, `El peso es una fuerza: P = m · g. ${r.m} kg · ${r.caso === 'luna' ? '1,6' : '10'} m/s² = ${num(r.bueno, l)} N. Se mide en newtons; la masa, en kilos.`, `Weight is a force: W = m × g. ${r.m} kg × ${r.caso === 'luna' ? '1.6' : '10'} m/s² = ${num(r.bueno, l)} N. It is measured in newtons; mass in kilograms.`, `El pes és una força: P = m · g. ${r.m} kg · ${r.caso === 'luna' ? '1,6' : '10'} m/s² = ${num(r.bueno, l)} N. Es mesura en newtons; la massa, en quilos.`)
    case 'rozamiento': return r.quieta
      ? s(l, `El rozamiento máximo es Fr = μ · m · g = ${num(r.mu, l)} · ${r.m} · 10 = ${r.Fr} N. Empujas con ${r.F} N, menos que eso: el rozamiento iguala tu fuerza y la caja no se mueve (a = 0).`, `Maximum friction is Fr = μ × m × g = ${num(r.mu, l)} × ${r.m} × 10 = ${r.Fr} N. You push with ${r.F} N, less than that: friction matches your push and the box does not move (a = 0).`, `El fregament màxim és Fr = μ · m · g = ${num(r.mu, l)} · ${r.m} · 10 = ${r.Fr} N. Empenys amb ${r.F} N, menys que això: el fregament iguala la teva força i la caixa no es mou (a = 0).`)
      : s(l, `Fr = μ · m · g = ${num(r.mu, l)} · ${r.m} · 10 = ${r.Fr} N. Fuerza neta = ${r.F} − ${r.Fr} = ${r.F - r.Fr} N, y a = ${r.F - r.Fr} ÷ ${r.m} = ${r.bueno} m/s². Olvidar el rozamiento da ${num(r.F / r.m, l)} m/s².`, `Fr = μ × m × g = ${num(r.mu, l)} × ${r.m} × 10 = ${r.Fr} N. Net force = ${r.F} − ${r.Fr} = ${r.F - r.Fr} N, and a = ${r.F - r.Fr} ÷ ${r.m} = ${r.bueno} m/s². Forgetting friction gives ${num(r.F / r.m, l)} m/s².`, `Fr = μ · m · g = ${num(r.mu, l)} · ${r.m} · 10 = ${r.Fr} N. Força neta = ${r.F} − ${r.Fr} = ${r.F - r.Fr} N, i a = ${r.F - r.Fr} ÷ ${r.m} = ${r.bueno} m/s². Oblidar el fregament dona ${num(r.F / r.m, l)} m/s².`)
    case 'plano': return r.pide === 'a'
      ? s(l, `El peso se descompone en dos partes: una paralela al plano (P · sen α), que la hace bajar, y otra perpendicular (P · cos α), que la anula la normal. a = g · sen ${r.ang}° ≈ ${num(r.bueno / 10, l)} m/s²: no depende de la masa.`, `Weight splits into two parts: one along the slope (W sin α), which pulls it down, and one perpendicular (W cos α), cancelled by the normal force. a = g sin ${r.ang}° ≈ ${num(r.bueno / 10, l)} m/s²: it does not depend on mass.`, `El pes es descompon en dues parts: una paral·lela al pla (P · sin α), que la fa baixar, i una altra perpendicular (P · cos α), que l’anul·la la normal. a = g · sin ${r.ang}° ≈ ${num(r.bueno / 10, l)} m/s²: no depèn de la massa.`)
      : s(l, `En un plano inclinado la normal NO es el peso: solo compensa la parte perpendicular del peso. N = m · g · cos ${r.ang}° = ${r.m} · 10 · cos ${r.ang}° ≈ ${num(r.bueno / 10, l)} N.`, `On a slope the normal force is NOT the weight: it only balances the perpendicular part of the weight. N = m g cos ${r.ang}° = ${r.m} × 10 × cos ${r.ang}° ≈ ${num(r.bueno / 10, l)} N.`, `En un pla inclinat la normal NO és el pes: només compensa la part perpendicular del pes. N = m · g · cos ${r.ang}° = ${r.m} · 10 · cos ${r.ang}° ≈ ${num(r.bueno / 10, l)} N.`)
    case 'ascensor': {
      const signo = r.caso === 'subeAcelera' ? '+' : r.caso === 'constante' ? null : '−'
      return signo
        ? s(l, `La aceleración va hacia ${signo === '+' ? 'arriba' : 'abajo'}, así que la normal ${signo === '+' ? 'supera' : 'es menor que'} el peso: N = m · (g ${signo} a) = ${r.m} · (10 ${signo} ${r.a}) = ${r.bueno} N. Por eso te notas ${signo === '+' ? 'más pesado' : 'más ligero'}.`, `The acceleration points ${signo === '+' ? 'up' : 'down'}, so the normal force is ${signo === '+' ? 'more' : 'less'} than the weight: N = m (g ${signo} a) = ${r.m} × (10 ${signo} ${r.a}) = ${r.bueno} N. That is why you feel ${signo === '+' ? 'heavier' : 'lighter'}.`, `L’acceleració va cap ${signo === '+' ? 'amunt' : 'avall'}, així que la normal ${signo === '+' ? 'supera' : 'és menor que'} el pes: N = m · (g ${signo} a) = ${r.m} · (10 ${signo} ${r.a}) = ${r.bueno} N. Per això et notes ${signo === '+' ? 'més pesant' : 'més lleuger'}.`)
        : s(l, `A velocidad constante no hay aceleración: la normal es igual al peso, N = m · g = ${r.bueno} N. La báscula marca lo mismo que parado.`, `At constant speed there is no acceleration: the normal force equals the weight, N = m g = ${r.bueno} N. The scales read the same as when standing still.`, `A velocitat constant no hi ha acceleració: la normal és igual al pes, N = m · g = ${r.bueno} N. La bàscula marca el mateix que aturat.`)
    }
    default: return tx(cpt(r).exp, l)
  }
}

export function schemaQuestion(r, l) {
  return {
    question: enunciado(r, l),
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
