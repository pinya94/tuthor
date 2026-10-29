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

// Tipos nuevos (sin opciones, ver «Mecánicas» más abajo):
//   diagrama   se dibujan las fuerzas tocando cada lado de la caja (inercia: la
//              pelota que sube, la caja que frena sola, la nave sin motores)
//   reaccion   acción y reacción: se teclea la fuerza que devuelve el otro cuerpo
//   constante  velocidad constante: se ajusta el empuje hasta igualar el rozamiento
export const NIVELES = {
  facil:   { tipos: ['segunda', 'segunda', 'peso', 'peso', 'diagrama', 'diagrama', 'reaccion'] },
  medio:   { tipos: ['segunda', 'peso', 'rozamiento', 'rozamiento', 'constante', 'diagrama'] },
  dificil: { tipos: ['rozamiento', 'plano', 'plano', 'ascensor', 'ascensor', 'diagrama'] },
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

// El generador de siempre (con sus cuatro opciones): da los números de cada
// ronda y el texto de las preguntas de ejemplo del schema.
function genVieja(nivel, tipo, rand) {
  for (;;) {
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

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Nada se responde eligiendo entre cuatro:
//   teclea    se escribe el número (a, m, peso, plano —con una décima—, la reacción)
//   empuja    se arrastra la flecha del empuje hasta la fuerza que hace falta
//             (F = m · a; con rozamiento F = Fr + m · a; a velocidad constante F = Fr)
//   bascula   se mueve la aguja de la báscula del ascensor (de 10 en 10 N)
//   diagrama  se dibujan las fuerzas: cada lado de la caja va pasando por
//             nada → P → N → F → Fr → T al tocarlo
export const LADOS = ['arriba', 'abajo', 'izq', 'der']
export const FUERZAS = ['', 'P', 'N', 'F', 'Fr', 'T']

// Escenas del diagrama de fuerzas (sin aire). Cada una es una idea de las
// leyes de Newton con su error típico.
export const ESCENAS = [
  { id: 'reposo', emoji: '📕', fuerzas: { arriba: 'N', abajo: 'P' },
    q: T('Un libro quieto sobre una mesa', 'A book at rest on a table', 'Un llibre quiet sobre una taula'),
    exp: T('Dos fuerzas iguales y opuestas: el peso (P), hacia abajo, y la normal (N) que hace la mesa, hacia arriba. Se anulan y por eso el libro no se mueve.', 'Two equal and opposite forces: weight (W), downwards, and the normal force (N) from the table, upwards. They cancel out, so the book does not move.', 'Dues forces iguals i oposades: el pes (P), cap avall, i la normal (N) que fa la taula, cap amunt. S’anul·len i per això el llibre no es mou.') },
  { id: 'empuje', emoji: '📦', fuerzas: { arriba: 'N', abajo: 'P', der: 'F', izq: 'Fr' },
    q: T('Empujas una caja hacia la derecha y se desliza por el suelo (hay rozamiento)', 'You push a box to the right and it slides along the floor (there is friction)', 'Empenys una caixa cap a la dreta i llisca per terra (hi ha fregament)'),
    exp: T('Cuatro fuerzas: tu empuje (F) hacia la derecha, el rozamiento (Fr) en contra del movimiento, el peso (P) hacia abajo y la normal (N) hacia arriba.', 'Four forces: your push (F) to the right, friction (Fr) against the motion, weight (W) downwards and the normal force (N) upwards.', 'Quatre forces: la teva empenta (F) cap a la dreta, el fregament (Fr) en contra del moviment, el pes (P) cap avall i la normal (N) cap amunt.') },
  { id: 'frena', emoji: '📦', fuerzas: { arriba: 'N', abajo: 'P', izq: 'Fr' },
    q: T('Una caja se desliza hacia la derecha y se va frenando sola (nadie la empuja)', 'A box slides to the right and slows down on its own (nobody pushes it)', 'Una caixa llisca cap a la dreta i es va frenant sola (ningú no l’empeny)'),
    exp: T('Ya no hay ninguna fuerza hacia la derecha: la caja se mueve por inercia. Solo el rozamiento (Fr), hacia la izquierda, la va frenando; más el peso y la normal.', 'There is no longer any force to the right: the box keeps moving by inertia. Only friction (Fr), to the left, slows it down; plus weight and the normal force.', 'Ja no hi ha cap força cap a la dreta: la caixa es mou per inèrcia. Només el fregament (Fr), cap a l’esquerra, la va frenant; més el pes i la normal.') },
  { id: 'tira', emoji: '📦', fuerzas: { arriba: 'N', abajo: 'P', izq: 'T', der: 'Fr' },
    q: T('Tiras de una cuerda hacia la izquierda, pero la caja no se mueve', 'You pull a rope to the left, but the box does not move', 'Estires una corda cap a l’esquerra, però la caixa no es mou'),
    exp: T('La cuerda tira hacia la izquierda (T) y el rozamiento (Fr) se opone hacia la derecha con la misma fuerza: por eso no se mueve. Además, peso y normal.', 'The rope pulls to the left (T) and friction (Fr) opposes it to the right with the same force: that is why it does not move. Plus weight and the normal force.', 'La corda estira cap a l’esquerra (T) i el fregament (Fr) s’hi oposa cap a la dreta amb la mateixa força: per això no es mou. A més, pes i normal.') },
  { id: 'colgada', emoji: '💡', fuerzas: { arriba: 'T', abajo: 'P' },
    q: T('Una lámpara colgada del techo por un cable', 'A lamp hanging from the ceiling by a cable', 'Un llum penjat del sostre per un cable'),
    exp: T('El cable tira hacia arriba (tensión, T) y el peso (P) hacia abajo. No hay normal: no se apoya en nada.', 'The cable pulls upwards (tension, T) and weight (W) pulls downwards. There is no normal force: it rests on nothing.', 'El cable estira cap amunt (tensió, T) i el pes (P) cap avall. No hi ha normal: no es recolza en res.') },
  { id: 'cae', emoji: '⚫', fuerzas: { abajo: 'P' },
    q: T('Una piedra cayendo (sin aire)', 'A falling stone (no air)', 'Una pedra caient (sense aire)'),
    exp: T('Solo el peso (P). Mientras cae no toca nada, así que no hay normal ni rozamiento.', 'Only weight (W). While it falls it touches nothing, so there is no normal force or friction.', 'Només el pes (P). Mentre cau no toca res, així que no hi ha normal ni fregament.') },
  { id: 'lanzada', emoji: '⚽', fuerzas: { abajo: 'P' },
    q: T('Una pelota que acabas de lanzar hacia arriba, mientras sube (sin aire)', 'A ball you have just thrown upwards, while it rises (no air)', 'Una pilota que acabes de llançar cap amunt, mentre puja (sense aire)'),
    exp: T('Solo el peso, hacia abajo. La «fuerza del lanzamiento» no existe: la mano dejó de empujar al soltarla. La pelota sube por inercia y el peso la va frenando.', 'Only weight, downwards. There is no «force of the throw»: your hand stopped pushing when it let go. The ball rises by inertia and weight slows it down.', 'Només el pes, cap avall. La «força del llançament» no existeix: la mà va deixar d’empènyer en deixar-la anar. La pilota puja per inèrcia i el pes la va frenant.') },
  { id: 'nave', emoji: '🚀', fuerzas: {},
    q: T('Una nave en el espacio, lejos de todo, con los motores apagados (sigue moviéndose)', 'A spacecraft in space, far from everything, with its engines off (it keeps moving)', 'Una nau a l’espai, lluny de tot, amb els motors apagats (continua movent-se)'),
    exp: T('Ninguna fuerza. Lejos de todo no hay peso que notar, y sin motores nada la empuja; aun así sigue en línea recta a la misma velocidad: es la inercia (primera ley).', 'No forces. Far from everything there is no weight to speak of, and with the engines off nothing pushes it; even so it carries on in a straight line at the same speed: that is inertia (first law).', 'Cap força. Lluny de tot no hi ha pes a tenir en compte, i sense motors res no l’empeny; tot i així continua en línia recta a la mateixa velocitat: és la inèrcia (primera llei).') },
]

// Acción y reacción: el otro cuerpo devuelve la misma fuerza.
const REACCIONES = [
  { id: 'pared', emoji: '🧱', concepto: 'pared',
    q: (F, l) => s(l, `Empujas una pared con una fuerza de ${F} N. ¿Con qué fuerza te empuja la pared a ti? (en N)`, `You push a wall with a force of ${F} N. How hard does the wall push on you? (in N)`, `Empenys una paret amb una força de ${F} N. Amb quina força t’empeny la paret a tu? (en N)`) },
  { id: 'camion', emoji: '🚚', concepto: 'camion',
    q: (F, l) => s(l, `En un choque, un camión hace una fuerza de ${F} N sobre un mosquito. ¿Qué fuerza hace el mosquito sobre el camión? (en N)`, `In a collision, a lorry exerts a force of ${F} N on a mosquito. What force does the mosquito exert on the lorry? (in N)`, `En un xoc, un camió fa una força de ${F} N sobre un mosquit. Quina força fa el mosquit sobre el camió? (en N)`) },
]

const MECANICA = r =>
  r.tipo === 'diagrama' ? 'diagrama'
    : r.tipo === 'ascensor' ? 'bascula'
    : r.tipo === 'constante' || (r.tipo === 'segunda' && r.despeje === 'F') || (r.tipo === 'rozamiento' && !r.quieta) ? 'empuja'
    : 'teclea'

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (let intento = 0; ; intento++) {
    const tipo = elige(rand, cfg.tipos)
    let r
    if (tipo === 'diagrama') {
      const e = elige(rand, ESCENAS)
      r = { id: ++seq, nivel, tipo, escena: e.id }
    } else if (tipo === 'reaccion') {
      const c = elige(rand, REACCIONES)
      const F = elige(rand, [20, 50, 80, 150, 300, 500])
      r = { id: ++seq, nivel, tipo, caso: c.id, F, bueno: F }
    } else if (tipo === 'constante') {
      const m = elige(rand, [5, 10, 20, 40]), mu = elige(rand, [0.1, 0.2, 0.25, 0.5])
      const Fr = mu * m * G
      if (!exacto(Fr)) continue
      r = { id: ++seq, nivel, tipo, m, mu, Fr: Math.round(Fr), bueno: Math.round(Fr) }
    } else {
      r = genVieja(nivel, tipo, rand)
      // En fácil la segunda ley solo despeja la aceleración (se teclea)
      if (tipo === 'segunda' && nivel === 'facil' && r.despeje !== 'a') continue
      // El rozamiento con empuje: la pregunta es la fuerza (F = Fr + m·a)
      if (tipo === 'rozamiento' && !r.quieta) r = { ...r, bueno: r.F, aObjetivo: r.bueno }
    }
    const tema = `${tipo}${r.escena ?? ''}${r.caso ?? ''}${r.m ?? ''}${r.ang ?? ''}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 6) recientes.shift()
    return { ...r, mecanica: MECANICA(r) }
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Máximo de la flecha o la báscula: el doble del bueno, redondeado hacia arriba
// a una cifra «redonda», para que la posición no delate la respuesta.
export function rango(r) {
  const tope = Math.max(10, r.bueno * 2)
  const paso = tope <= 50 ? 10 : tope <= 200 ? 50 : tope <= 1000 ? 100 : 500
  return { max: Math.ceil((tope * (1 + (r.id % 3) * 0.25)) / paso) * paso, paso: r.mecanica === 'bascula' ? 10 : 1 }
}

// Números tecleados: «7,1», «7.1» o «7».
export const leeNumero = t => {
  const x = String(t ?? '').trim().replace(',', '.')
  return /^\d+(\.\d+)?$/.test(x) ? Number(x) : null
}

// Lo que dibuja la respuesta correcta en el diagrama (lado → fuerza)
export const diagramaBueno = r => ESCENAS.find(e => e.id === r.escena).fuerzas
// La fuerza aplicada se puede llamar F o T (empujar, tirar de una cuerda)
const igual = (a = '', b = '') => a === b || (['F', 'T'].includes(a) && ['F', 'T'].includes(b))

export function esCorrecta(r, o) {
  if (o == null) return false
  switch (r.mecanica) {
    case 'diagrama': {
      const bueno = diagramaBueno(r)
      return typeof o === 'object' && LADOS.every(lado => igual(o[lado] ?? '', bueno[lado] ?? ''))
    }
    case 'empuja':
    case 'bascula': return Number(o) === r.bueno
    case 'teclea': {
      const n = leeNumero(o)
      if (n == null) return false
      // el plano va en décimas y con calculadora: vale la décima vecina
      if (r.tipo === 'plano') return Math.abs(Math.round(n * 10) - r.bueno) <= 1
      return n === r.bueno
    }
    default: return o === r.bueno
  }
}

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

function enunciadoViejo(r, l) {
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

function explicacionVieja(r, l) {
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

// ── Textos de las mecánicas ────────────────────────────────────────────────
export const NOMBRE_FUERZA = {
  P: T('Peso', 'Weight', 'Pes'),
  N: T('Normal', 'Normal', 'Normal'),
  F: T('Empuje', 'Push', 'Empenta'),
  Fr: T('Rozamiento', 'Friction', 'Fregament'),
  T: T('Tensión', 'Tension', 'Tensió'),
}
const LADO = { arriba: T('hacia arriba', 'upwards', 'cap amunt'), abajo: T('hacia abajo', 'downwards', 'cap avall'), izq: T('hacia la izquierda', 'to the left', 'cap a l’esquerra'), der: T('hacia la derecha', 'to the right', 'cap a la dreta') }
const escena = r => ESCENAS.find(e => e.id === r.escena)
const reaccion = r => REACCIONES.find(c => c.id === r.caso)

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'diagrama': return s(l, `${tx(escena(r).q, l)}. Dibuja las fuerzas que actúan: toca cada lado.`, `${tx(escena(r).q, l)}. Draw the forces acting on it: tap each side.`, `${tx(escena(r).q, l)}. Dibuixa les forces que hi actuen: toca cada costat.`)
    case 'reaccion': return reaccion(r).q(r.F, l)
    case 'constante': return s(l, `Empujas un carrito de ${r.m} kg y va a velocidad constante. El rozamiento es de ${r.Fr} N. Ajusta la flecha: ¿con qué fuerza empujas?`, `You push a ${r.m} kg trolley and it moves at constant speed. Friction is ${r.Fr} N. Set the arrow: how hard are you pushing?`, `Empenys un carretó de ${r.m} kg i va a velocitat constant. El fregament és de ${r.Fr} N. Ajusta la fletxa: amb quina força empenys?`)
    case 'segunda':
      if (r.despeje === 'F') return s(l, `Una caja de ${r.m} kg tiene que acelerar a ${r.a} m/s². Ajusta la flecha a la fuerza neta que hace falta.`, `A ${r.m} kg box has to accelerate at ${r.a} m/s². Set the arrow to the net force needed.`, `Una caixa de ${r.m} kg ha d’accelerar a ${r.a} m/s². Ajusta la fletxa a la força neta que cal.`)
      return enunciadoViejo(r, l)
    case 'rozamiento':
      if (!r.quieta) return s(l, `Una caja de ${r.m} kg en un suelo con rozamiento μ = ${num(r.mu, l)} tiene que acelerar a ${r.aObjetivo} m/s². Ajusta la flecha: ¿con qué fuerza hay que empujar? ${conG(l)}`, `A ${r.m} kg box on a floor with friction μ = ${num(r.mu, l)} has to accelerate at ${r.aObjetivo} m/s². Set the arrow: how hard do you need to push? ${conG(l)}`, `Una caixa de ${r.m} kg en un terra amb fregament μ = ${num(r.mu, l)} ha d’accelerar a ${r.aObjetivo} m/s². Ajusta la fletxa: amb quina força cal empènyer? ${conG(l)}`)
      return enunciadoViejo(r, l)
    case 'plano': return `${enunciadoViejo(r, l)} ${s(l, '(con una décima)', '(to one decimal place)', '(amb una dècima)')}`
    case 'ascensor': return `${enunciadoViejo(r, l)} ${s(l, 'Mueve la aguja.', 'Move the needle.', 'Mou l’agulla.')}`
    default: return enunciadoViejo(r, l)
  }
}

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'diagrama': return tx(escena(r).exp, l)
    case 'reaccion': return tx(cpt({ concepto: reaccion(r).concepto }).exp, l)
    case 'constante': return s(l, `Velocidad constante es aceleración cero, y eso exige fuerza neta cero (primera ley): tu empuje iguala al rozamiento, ${r.Fr} N. Si empujaras más, el carrito aceleraría.`, `Constant velocity means zero acceleration, which requires zero net force (first law): your push equals friction, ${r.Fr} N. If you pushed harder, the trolley would speed up.`, `Velocitat constant vol dir acceleració zero, i això exigeix força neta zero (primera llei): la teva empenta iguala el fregament, ${r.Fr} N. Si empenyessis més, el carretó acceleraria.`)
    case 'rozamiento':
      if (!r.quieta) return s(l,
        `Primero hay que vencer el rozamiento: Fr = μ · m · g = ${num(r.mu, l)} · ${r.m} · 10 = ${r.Fr} N. Y además hace falta la fuerza neta para acelerar: m · a = ${r.m} · ${r.aObjetivo} = ${r.m * r.aObjetivo} N. F = ${r.Fr} + ${r.m * r.aObjetivo} = ${r.F} N. Olvidar el rozamiento da ${r.m * r.aObjetivo} N.`,
        `First you have to overcome friction: Fr = μ × m × g = ${num(r.mu, l)} × ${r.m} × 10 = ${r.Fr} N. On top of that you need the net force to accelerate: m × a = ${r.m} × ${r.aObjetivo} = ${r.m * r.aObjetivo} N. F = ${r.Fr} + ${r.m * r.aObjetivo} = ${r.F} N. Forgetting friction gives ${r.m * r.aObjetivo} N.`,
        `Primer cal vèncer el fregament: Fr = μ · m · g = ${num(r.mu, l)} · ${r.m} · 10 = ${r.Fr} N. I a més cal la força neta per accelerar: m · a = ${r.m} · ${r.aObjetivo} = ${r.m * r.aObjetivo} N. F = ${r.Fr} + ${r.m * r.aObjetivo} = ${r.F} N. Oblidar el fregament dona ${r.m * r.aObjetivo} N.`)
      return explicacionVieja(r, l)
    default: return explicacionVieja(r, l)
  }
}

// Unidad de lo que se teclea
export function unidad(r) {
  if (r.tipo === 'segunda') return r.despeje === 'a' ? 'm/s²' : r.despeje === 'm' ? 'kg' : 'N'
  if (r.tipo === 'peso') return r.caso === 'masaLuna' ? 'kg' : 'N'
  if (r.tipo === 'rozamiento') return r.quieta ? 'm/s²' : 'N'
  if (r.tipo === 'plano') return r.pide === 'a' ? 'm/s²' : 'N'
  return 'N'
}

// La respuesta buena dicha con palabras (para el schema y para corregir)
export function textoRespuesta(r, l) {
  if (r.tipo === 'diagrama') {
    const f = diagramaBueno(r)
    const partes = LADOS.filter(lado => f[lado]).map(lado => `${tx(NOMBRE_FUERZA[f[lado]], l)} (${f[lado]}) ${tx(LADO[lado], l)}`)
    return partes.length ? partes.join(', ') : s(l, 'Ninguna fuerza', 'No forces', 'Cap força')
  }
  if (r.tipo === 'reaccion' || r.tipo === 'constante') return `${r.bueno} N`
  if (r.tipo === 'rozamiento' && !r.quieta) return `${r.bueno} N`
  return textoOpcion(r.bueno, r, l)
}

// Sin opciones falsas: en el juego no las hay, y las de antes ya no
// corresponden a lo que se pregunta (p. ej. el empuje en vez de la aceleración).
export function schemaQuestion(r, l) {
  return { question: enunciado(r, l), correctAnswer: textoRespuesta(r, l), wrongAnswers: [] }
}
