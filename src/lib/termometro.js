// Termómetro (física · calor y temperatura, ESO).
//
// Tipos de pregunta (y la trampa que cada uno pone a prueba):
//   escala      °C ↔ K y °C ↔ °F con el termómetro de dos escalas
//               (olvidar el +273, multiplicar por 1,8 sin sumar 32)
//   mezcla      dos vasos de agua → temperatura final
//               (sumar las temperaturas; hacer la media sin mirar las masas)
//   calor       Q = m · c · ΔT             (usar la temperatura final en vez de ΔT; olvidar la masa)
//   transmision conducción, convección o radiación en una escena cotidiana
//   conductor   qué material conduce o aísla mejor
//   concepto    calor ≠ temperatura, equilibrio, cero absoluto, dilatación…
//
// Todas las respuestas numéricas salen enteras: los datos se eligen para eso.

const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const num = (n, l = 'es') => n.toLocaleString(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES', { maximumFractionDigits: 1 }).replace('-', '−')

export const NIVELES = {
  facil:   { tipos: ['escala', 'mezcla', 'mezcla', 'transmision', 'transmision', 'conductor'], escalas: ['CK', 'KC'], masasIguales: true },
  medio:   { tipos: ['escala', 'escala', 'mezcla', 'mezcla', 'transmision', 'concepto'], escalas: ['CK', 'KC', 'CF'], masasIguales: false },
  dificil: { tipos: ['escala', 'mezcla', 'calor', 'calor', 'concepto', 'concepto', 'transmision'], escalas: ['KC', 'CF', 'FC'], masasIguales: false },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
function opciones(rand, bueno, candidatos) {
  const vistos = new Set([bueno])
  const out = []
  for (const c of candidatos) {
    if (c == null || !Number.isFinite(c) || !Number.isInteger(c) || vistos.has(c)) continue
    vistos.add(c); out.push(c)
    if (out.length === 3) break
  }
  return out.length === 3 ? baraja(rand, [bueno, ...out]) : null
}

// ── Escenas y bancos ──────────────────────────────────────────────────────
export const MODOS = {
  conduccion: T('Conducción', 'Conduction', 'Conducció'),
  conveccion: T('Convección', 'Convection', 'Convecció'),
  radiacion: T('Radiación', 'Radiation', 'Radiació'),
}

// Solo escenas en las que los libros de ESO dan una única respuesta.
export const ESCENAS = [
  { id: 'cuchara', emoji: '🥄', modo: 'conduccion', texto: T('Dejas una cuchara de metal en la sopa caliente y al rato el mango quema.', 'You leave a metal spoon in hot soup and soon the handle is too hot to touch.', 'Deixes una cullera de metall a la sopa calenta i al cap d’una estona el mànec crema.') },
  { id: 'sarten', emoji: '🍳', modo: 'conduccion', texto: T('El mango metálico de la sartén se calienta, aunque no toca el fuego.', 'The metal handle of the frying pan gets hot, even though it is not touching the flame.', 'El mànec metàl·lic de la paella s’escalfa, tot i que no toca el foc.') },
  { id: 'hielo', emoji: '❄️', modo: 'conduccion', texto: T('Coges un cubito de hielo y enseguida notas la mano fría.', 'You pick up an ice cube and your hand quickly feels cold.', 'Agafes un glaçó i de seguida notes la mà freda.') },
  { id: 'plancha', emoji: '👕', modo: 'conduccion', texto: T('Apoyas la plancha caliente sobre la camiseta y la tela se calienta.', 'You press the hot iron on the T-shirt and the fabric heats up.', 'Recolzes la planxa calenta sobre la samarreta i la roba s’escalfa.') },
  { id: 'olla', emoji: '🍲', modo: 'conveccion', texto: T('En una olla al fuego, el agua del fondo sube, la de arriba baja y al final toda está caliente.', 'In a pot on the hob, the water at the bottom rises, the water at the top sinks and in the end it is all hot.', 'En una olla al foc, l’aigua del fons puja, la de dalt baixa i al final tota és calenta.') },
  { id: 'radiador', emoji: '🏠', modo: 'conveccion', texto: T('Un radiador bajo la ventana calienta toda la habitación: el aire caliente sube y el frío baja.', 'A radiator under the window heats the whole room: warm air rises and cold air sinks.', 'Un radiador sota la finestra escalfa tota l’habitació: l’aire calent puja i el fred baixa.') },
  { id: 'brisa', emoji: '🌊', modo: 'conveccion', texto: T('En la playa, de día, sopla una brisa del mar hacia la arena porque el aire caliente de la playa sube.', 'At the beach, during the day, a breeze blows from the sea to the sand because the warm air over the beach rises.', 'A la platja, de dia, bufa una brisa del mar cap a la sorra perquè l’aire calent de la platja puja.') },
  { id: 'sol', emoji: '☀️', modo: 'radiacion', texto: T('El Sol calienta la Tierra, aunque entre los dos solo hay espacio vacío.', 'The Sun warms the Earth, even though there is only empty space between them.', 'El Sol escalfa la Terra, encara que entre tots dos només hi ha espai buit.') },
  { id: 'hoguera', emoji: '🔥', modo: 'radiacion', texto: T('Te calientas las manos delante de una hoguera, sin tocarla.', 'You warm your hands in front of a campfire, without touching it.', 'T’escalfes les mans davant d’una foguera, sense tocar-la.') },
  { id: 'coche', emoji: '🚗', modo: 'radiacion', texto: T('Un coche aparcado al sol con las ventanillas cerradas está ardiendo por dentro.', 'A car parked in the sun with the windows shut is boiling hot inside.', 'Un cotxe aparcat al sol amb les finestretes tancades està que crema per dins.') },
]

export const MATERIALES = {
  cobre: { emoji: '🔌', conduce: true, n: T('Cobre', 'Copper', 'Coure') },
  aluminio: { emoji: '🥫', conduce: true, n: T('Aluminio', 'Aluminium', 'Alumini') },
  hierro: { emoji: '🔩', conduce: true, n: T('Hierro', 'Iron', 'Ferro') },
  plata: { emoji: '🥈', conduce: true, n: T('Plata', 'Silver', 'Plata') },
  acero: { emoji: '🍴', conduce: true, n: T('Acero', 'Steel', 'Acer') },
  madera: { emoji: '🌲', conduce: false, n: T('Madera', 'Wood', 'Fusta') },
  plastico: { emoji: '🧴', conduce: false, n: T('Plástico', 'Plastic', 'Plàstic') },
  corcho: { emoji: '🍾', conduce: false, n: T('Corcho', 'Cork', 'Suro') },
  lana: { emoji: '🧶', conduce: false, n: T('Lana', 'Wool', 'Llana') },
  porexpan: { emoji: '📦', conduce: false, n: T('Porexpán (poliestireno)', 'Polystyrene foam', 'Porexpan (poliestirè)') },
}

// Conceptos: una pregunta, una buena y tres malas (las malas son ideas
// equivocadas reales, no relleno).
export const CONCEPTOS = [
  { id: 'banera', emoji: '🛁',
    q: T('Una bañera llena de agua a 40 °C y una taza de té a 80 °C. ¿Cuál tiene más energía térmica en total?', 'A full bath of water at 40 °C and a cup of tea at 80 °C. Which has more thermal energy in total?', 'Una banyera plena d’aigua a 40 °C i una tassa de te a 80 °C. Quina té més energia tèrmica en total?'),
    ops: [T('La bañera: tiene muchísima más agua', 'The bath: it has far more water', 'La banyera: té moltíssima més aigua'), T('La taza: está más caliente', 'The cup: it is hotter', 'La tassa: és més calenta'), T('Las dos igual', 'Both the same', 'Totes dues igual'), T('Ninguna: el agua no tiene calor', 'Neither: water has no heat', 'Cap: l’aigua no té calor')],
    exp: T('La temperatura mide lo agitadas que están las partículas de media; la energía térmica depende también de cuántas hay. La taza está más caliente, pero la bañera tiene tanta agua que guarda mucha más energía.', 'Temperature measures how agitated the particles are on average; thermal energy also depends on how many there are. The tea is hotter, but the bath holds so much water that it stores far more energy.', 'La temperatura mesura com d’agitades estan les partícules de mitjana; l’energia tèrmica depèn també de quantes n’hi ha. La tassa és més calenta, però la banyera té tanta aigua que guarda molta més energia.') },
  { id: 'lata', emoji: '🥤',
    q: T('Metes una lata a 30 °C en una nevera a 4 °C. ¿Qué pasa?', 'You put a can at 30 °C into a fridge at 4 °C. What happens?', 'Fiques una llauna a 30 °C en una nevera a 4 °C. Què passa?'),
    ops: [T('El calor pasa de la lata al aire de la nevera', 'Heat flows from the can to the air in the fridge', 'La calor passa de la llauna a l’aire de la nevera'), T('El frío pasa de la nevera a la lata', 'Cold flows from the fridge into the can', 'El fred passa de la nevera a la llauna'), T('El calor pasa de la nevera a la lata', 'Heat flows from the fridge into the can', 'La calor passa de la nevera a la llauna'), T('No pasa nada hasta que se abre', 'Nothing happens until it is opened', 'No passa res fins que s’obre')],
    exp: T('El calor siempre va del cuerpo más caliente al más frío. El «frío» no es algo que se mueva: la lata se enfría porque pierde calor.', 'Heat always flows from the hotter body to the colder one. “Cold” is not something that moves: the can cools because it loses heat.', 'La calor sempre va del cos més calent al més fred. El «fred» no és una cosa que es mogui: la llauna es refreda perquè perd calor.') },
  { id: 'equilibrio', emoji: '⚖️',
    q: T('Dos cuerpos en contacto dejan de intercambiar calor cuando…', 'Two bodies in contact stop exchanging heat when…', 'Dos cossos en contacte deixen d’intercanviar calor quan…'),
    ops: [T('…tienen la misma temperatura', '…they are at the same temperature', '…tenen la mateixa temperatura'), T('…tienen la misma cantidad de calor', '…they have the same amount of heat', '…tenen la mateixa quantitat de calor'), T('…tienen la misma masa', '…they have the same mass', '…tenen la mateixa massa'), T('…el más caliente llega a 0 °C', '…the hotter one reaches 0 °C', '…el més calent arriba a 0 °C')],
    exp: T('Es el equilibrio térmico: cuando las temperaturas se igualan, el calor deja de pasar. Los cuerpos no «tienen» calor; el calor es la energía que pasa de uno a otro.', 'That is thermal equilibrium: once the temperatures are equal, heat stops flowing. Bodies do not “have” heat; heat is the energy that passes from one to the other.', 'És l’equilibri tèrmic: quan les temperatures s’igualen, la calor deixa de passar. Els cossos no «tenen» calor; la calor és l’energia que passa d’un a l’altre.') },
  { id: 'especifico', emoji: '🍳',
    q: T('Das el mismo calor a 1 kg de agua y a 1 kg de hierro. ¿Cuál sube más de temperatura?', 'You give the same heat to 1 kg of water and 1 kg of iron. Which one gets hotter?', 'Dones la mateixa calor a 1 kg d’aigua i a 1 kg de ferro. Quin puja més de temperatura?'),
    ops: [T('El hierro: su calor específico es mucho menor', 'The iron: its specific heat capacity is much lower', 'El ferro: la seva calor específica és molt menor'), T('El agua, porque es líquida', 'The water, because it is a liquid', 'L’aigua, perquè és líquida'), T('Los dos igual: misma masa, mismo calor', 'Both the same: same mass, same heat', 'Tots dos igual: mateixa massa, mateixa calor'), T('El agua: su calor específico es mayor', 'The water: its specific heat capacity is higher', 'L’aigua: la seva calor específica és més gran')],
    exp: T('El calor específico es el calor que necesita 1 kg para subir 1 °C. El del agua (unos 4180 J/kg·°C) es casi diez veces el del hierro (unos 450): con el mismo calor, el hierro se calienta muchísimo más. Por eso la sartén quema enseguida y el agua tarda en hervir.', 'Specific heat capacity is the heat 1 kg needs to rise 1 °C. Water’s (about 4180 J/kg·°C) is almost ten times iron’s (about 450): with the same heat, the iron gets far hotter. That is why the pan gets hot at once and the water takes ages to boil.', 'La calor específica és la calor que necessita 1 kg per pujar 1 °C. La de l’aigua (uns 4180 J/kg·°C) és gairebé deu vegades la del ferro (uns 450): amb la mateixa calor, el ferro s’escalfa moltíssim més. Per això la paella crema de seguida i l’aigua triga a bullir.') },
  { id: 'banco', emoji: '🌨️',
    q: T('En invierno, el hierro de un banco parece más frío que la madera, aunque los dos están a la misma temperatura. ¿Por qué?', 'In winter, the iron of a bench feels colder than the wood, although both are at the same temperature. Why?', 'A l’hivern, el ferro d’un banc sembla més fred que la fusta, encara que tots dos són a la mateixa temperatura. Per què?'),
    ops: [T('El hierro conduce mejor y le quita el calor a la mano más deprisa', 'Iron conducts better and takes heat from your hand faster', 'El ferro condueix millor i treu la calor a la mà més de pressa'), T('El hierro está a menos temperatura', 'The iron is at a lower temperature', 'El ferro és a menys temperatura'), T('La madera produce su propio calor', 'Wood makes its own heat', 'La fusta produeix la seva pròpia calor'), T('El hierro guarda frío dentro', 'Iron stores cold inside', 'El ferro guarda fred a dins')],
    exp: T('Están a la misma temperatura, pero el metal es buen conductor: se lleva el calor de la mano muy deprisa y por eso lo notamos frío. La madera es aislante y apenas lo roba.', 'They are at the same temperature, but metal is a good conductor: it draws heat from your hand very quickly, so it feels cold. Wood is an insulator and barely takes any.', 'Són a la mateixa temperatura, però el metall és bon conductor: s’emporta la calor de la mà molt de pressa i per això el notem fred. La fusta és aïllant i gairebé no en pren.') },
  { id: 'cero', emoji: '🥶',
    q: T('¿Cuál es la temperatura más baja posible?', 'What is the lowest possible temperature?', 'Quina és la temperatura més baixa possible?'),
    ops: [T('0 K, el cero absoluto (−273 °C)', '0 K, absolute zero (−273 °C)', '0 K, el zero absolut (−273 °C)'), T('0 °C', '0 °C', '0 °C'), T('−100 °C', '−100 °C', '−100 °C'), T('No hay límite: siempre se puede enfriar más', 'There is no limit: it can always get colder', 'No hi ha límit: sempre es pot refredar més')],
    exp: T('A 0 K (−273,15 °C) las partículas tendrían la mínima agitación posible: no se puede bajar de ahí. Por eso la escala Kelvin empieza en 0 y no tiene números negativos.', 'At 0 K (−273.15 °C) particles would have the least possible motion: you cannot go lower. That is why the Kelvin scale starts at 0 and has no negative numbers.', 'A 0 K (−273,15 °C) les partícules tindrien la mínima agitació possible: no es pot baixar d’aquí. Per això l’escala Kelvin comença a 0 i no té nombres negatius.') },
  { id: 'vias', emoji: '🚆',
    q: T('Las vías del tren tienen pequeñas separaciones entre tramos. ¿Para qué?', 'Railway tracks have small gaps between sections. What for?', 'Les vies del tren tenen petites separacions entre trams. Per a què?'),
    ops: [T('El metal se dilata con el calor y necesita espacio', 'Metal expands with heat and needs room', 'El metall es dilata amb la calor i necessita espai'), T('Para ahorrar metal', 'To save metal', 'Per estalviar metall'), T('Para que escurra el agua de la lluvia', 'So rainwater can drain away', 'Perquè s’escoli l’aigua de la pluja'), T('El metal se encoge en verano', 'Metal shrinks in summer', 'El metall s’encongeix a l’estiu')],
    exp: T('Al calentarse, las partículas se mueven más y se separan: el metal se dilata. En verano los raíles se alargan y, sin esas juntas, se doblarían.', 'When heated, particles move more and spread out: the metal expands. In summer the rails get longer and, without those gaps, they would buckle.', 'En escalfar-se, les partícules es mouen més i se separen: el metall es dilata. A l’estiu els rails s’allarguen i, sense aquestes juntes, es doblegarien.') },
  { id: 'termometro', emoji: '🌡️',
    q: T('¿Qué mide un termómetro?', 'What does a thermometer measure?', 'Què mesura un termòmetre?'),
    ops: [T('La temperatura: lo agitadas que están las partículas', 'Temperature: how agitated the particles are', 'La temperatura: com d’agitades estan les partícules'), T('El calor que tiene un cuerpo', 'The heat a body contains', 'La calor que té un cos'), T('La energía total de un cuerpo', 'The total energy of a body', 'L’energia total d’un cos'), T('Lo rápido que se enfría algo', 'How fast something cools down', 'Com de pressa es refreda una cosa')],
    exp: T('El termómetro mide la temperatura, que es la agitación media de las partículas. El calor no se «tiene»: es energía que pasa de un cuerpo caliente a uno frío.', 'A thermometer measures temperature, the average motion of the particles. Heat is not something a body “has”: it is energy flowing from a hot body to a cold one.', 'El termòmetre mesura la temperatura, que és l’agitació mitjana de les partícules. La calor no es «té»: és energia que passa d’un cos calent a un de fred.') },
]

export const SUSTANCIAS = {
  agua: { c: 4180, n: T('agua', 'water', 'aigua') },
  aluminio: { c: 900, n: T('aluminio', 'aluminium', 'alumini') },
  hierro: { c: 450, n: T('hierro', 'iron', 'ferro') },
  cobre: { c: 385, n: T('cobre', 'copper', 'coure') },
}

// ── Conversiones ──────────────────────────────────────────────────────────
export const aK = c => c + 273
export const aF = c => (c * 9) / 5 + 32

let seq = 0

// La ronda clásica de un tipo (con opciones): la usan las mecánicas y el
// texto del schema (ver «Mecánicas» al final).
function genVieja(nivel, tipo, rand) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'escala') {
      const e = elige(rand, cfg.escalas)
      if (e === 'CK' || e === 'KC') {
        const c = entre(rand, -60, 150)
        const k = aK(c)
        if (e === 'CK') {
          const ops = opciones(rand, k, [c - 273, c + 237, c, c + 100, k + 10])
          if (!ops) continue
          return { ...base, escala: e, c, dato: c, bueno: k, opciones: ops }
        }
        const ops = opciones(rand, c, [k + 273, k - 237, k, k - 100, c - 10])
        if (!ops) continue
        return { ...base, escala: e, c, dato: k, bueno: c, opciones: ops }
      }
      const c = 5 * entre(rand, -8, 20) // múltiplos de 5: °F exactos
      const f = aF(c)
      if (e === 'CF') {
        const ops = opciones(rand, f, [c * 1.8, c + 32, 2 * c + 30 === f ? null : 2 * c + 30, f + 10, (c - 32) / 1.8])
        if (!ops) continue
        return { ...base, escala: e, c, dato: c, bueno: f, opciones: ops }
      }
      const ops = opciones(rand, c, [f - 32, f / 1.8, (f - 32) * 1.8, c + 10, (f - 30) / 2 === c ? null : (f - 30) / 2])
      if (!ops) continue
      return { ...base, escala: e, c, dato: f, bueno: c, opciones: ops }
    }

    if (tipo === 'mezcla') {
      const masas = [100, 150, 200, 250, 300, 400, 500]
      const m1 = elige(rand, masas)
      const m2 = cfg.masasIguales ? m1 : elige(rand, masas.filter(m => m !== m1))
      const t1 = 5 * entre(rand, 1, 6) // frío: 5–30 °C
      const t2 = 5 * entre(rand, 9, 18) // caliente: 45–90 °C
      const tf = (m1 * t1 + m2 * t2) / (m1 + m2)
      if (!Number.isInteger(tf)) continue
      const media = (t1 + t2) / 2
      const alReves = (m2 * t1 + m1 * t2) / (m1 + m2)
      const ops = opciones(rand, tf, [cfg.masasIguales ? null : media, alReves, t1 + t2, t2 - t1, tf + 10, tf - 10])
      if (!ops) continue
      return { ...base, vasos: [[m1, t1], [m2, t2]], bueno: tf, opciones: ops }
    }

    if (tipo === 'calor') {
      const sId = elige(rand, Object.keys(SUSTANCIAS))
      const { c } = SUSTANCIAS[sId]
      const m = elige(rand, [0.5, 1, 2, 3])
      const t0 = 5 * entre(rand, 2, 6)
      const tf = t0 + 10 * entre(rand, 2, 7)
      const q = m * c * (tf - t0)
      if (!Number.isInteger(q)) continue
      const ops = opciones(rand, q, [m * c * tf, c * (tf - t0), m * c * (tf + t0), q * 10, q / 10])
      if (!ops) continue
      return { ...base, sustancia: sId, m, t0, tf, bueno: q, opciones: ops }
    }

    if (tipo === 'transmision') {
      const e = elige(rand, ESCENAS)
      return { ...base, escena: e.id, bueno: e.modo, opciones: Object.keys(MODOS) }
    }

    if (tipo === 'conductor') {
      const conduce = rand() < 0.5 // ¿se pregunta el que conduce o el que aísla?
      const ids = Object.keys(MATERIALES)
      const raro = elige(rand, ids.filter(id => MATERIALES[id].conduce === conduce))
      const otros = baraja(rand, ids.filter(id => MATERIALES[id].conduce !== conduce)).slice(0, 3)
      return { ...base, pide: conduce ? 'conductor' : 'aislante', bueno: raro, opciones: baraja(rand, [raro, ...otros]) }
    }

    // concepto
    const cpt = elige(rand, CONCEPTOS)
    return { ...base, concepto: cpt.id, bueno: 0, opciones: baraja(rand, [0, 1, 2, 3]) }
  }
}


// ── Textos ────────────────────────────────────────────────────────────────
const UNIDAD = { C: '°C', K: 'K', F: '°F' }
export const escalaDe = r => ({ CK: ['C', 'K'], KC: ['K', 'C'], CF: ['C', 'F'], FC: ['F', 'C'] }[r.escala])
const conUnidad = (v, u, l) => `${num(v, l)} ${UNIDAD[u]}`
const julios = (q, l) => `${num(q, l)} J`

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'escala': return conUnidad(o, escalaDe(r)[1], l)
    case 'mezcla': return `${num(o, l)} °C`
    case 'calor': return julios(o, l)
    case 'transmision': return tx(MODOS[o], l)
    case 'conductor': return `${MATERIALES[o].emoji} ${tx(MATERIALES[o].n, l)}`
    default: return tx(CONCEPTOS.find(c => c.id === r.concepto).ops[o], l)
  }
}

function enunciadoViejo(r, l) {
  switch (r.tipo) {
    case 'escala': {
      const [de, a] = escalaDe(r)
      const nombre = { K: s(l, 'kelvin', 'kelvin', 'kelvin'), C: s(l, 'grados Celsius', 'degrees Celsius', 'graus Celsius'), F: s(l, 'grados Fahrenheit', 'degrees Fahrenheit', 'graus Fahrenheit') }[a]
      return s(l, `El termómetro marca ${conUnidad(r.dato, de, l)}. ¿Cuánto es en ${nombre}?`, `The thermometer reads ${conUnidad(r.dato, de, l)}. What is that in ${nombre}?`, `El termòmetre marca ${conUnidad(r.dato, de, l)}. Quant és en ${nombre}?`)
    }
    case 'mezcla': {
      const [[m1, t1], [m2, t2]] = r.vasos
      return s(l, `Mezclas ${m1} g de agua a ${t1} °C con ${m2} g de agua a ${t2} °C. ¿A qué temperatura queda la mezcla?`, `You mix ${m1} g of water at ${t1} °C with ${m2} g of water at ${t2} °C. What temperature does the mixture end up at?`, `Barreges ${m1} g d’aigua a ${t1} °C amb ${m2} g d’aigua a ${t2} °C. A quina temperatura queda la barreja?`)
    }
    case 'calor': {
      const S = SUSTANCIAS[r.sustancia]
      return s(l,
        `¿Cuánto calor hace falta para calentar ${num(r.m, l)} kg de ${S.n.es} de ${r.t0} °C a ${r.tf} °C? (c = ${num(S.c, l)} J/kg·°C)`,
        `How much heat is needed to warm ${num(r.m, l)} kg of ${S.n.en} from ${r.t0} °C to ${r.tf} °C? (c = ${num(S.c, l)} J/kg·°C)`,
        `Quanta calor cal per escalfar ${num(r.m, l)} kg de ${S.n.ca} de ${r.t0} °C a ${r.tf} °C? (c = ${num(S.c, l)} J/kg·°C)`)
    }
    case 'transmision': return `${tx(ESCENAS.find(e => e.id === r.escena).texto, l)} ${s(l, '¿Cómo se transmite el calor?', 'How is the heat transferred?', 'Com es transmet la calor?')}`
    case 'conductor': return r.pide === 'conductor'
      ? s(l, '¿Cuál de estos materiales conduce mejor el calor?', 'Which of these materials conducts heat best?', 'Quin d’aquests materials condueix millor la calor?')
      : s(l, '¿Con cuál de estos materiales harías el mango de una sartén?', 'Which of these materials would you make a frying-pan handle from?', 'Amb quin d’aquests materials faries el mànec d’una paella?')
    default: return tx(CONCEPTOS.find(c => c.id === r.concepto).q, l)
  }
}

function explicacionVieja(r, l) {
  switch (r.tipo) {
    case 'escala': {
      const [de, a] = escalaDe(r)
      if (de === 'C' && a === 'K') return s(l, `Para pasar a kelvin se suma 273: ${num(r.c, l)} + 273 = ${r.bueno} K. El 0 de la escala Kelvin es el cero absoluto, así que nunca hay kelvin negativos.`, `To convert to kelvin add 273: ${num(r.c, l)} + 273 = ${r.bueno} K. Zero on the Kelvin scale is absolute zero, so there are never negative kelvins.`, `Per passar a kelvin se suma 273: ${num(r.c, l)} + 273 = ${r.bueno} K. El 0 de l’escala Kelvin és el zero absolut, així que mai no hi ha kelvins negatius.`)
      if (de === 'K') return s(l, `De kelvin a grados Celsius se resta 273: ${r.dato} − 273 = ${num(r.bueno, l)} °C.`, `From kelvin to degrees Celsius subtract 273: ${r.dato} − 273 = ${num(r.bueno, l)} °C.`, `De kelvin a graus Celsius es resta 273: ${r.dato} − 273 = ${num(r.bueno, l)} °C.`)
      if (de === 'C') return s(l, `°F = °C × 1,8 + 32: ${num(r.c, l)} × 1,8 + 32 = ${num(r.bueno, l)} °F. Si se olvida el + 32, sale mal: 0 °C son 32 °F, no 0.`, `°F = °C × 1.8 + 32: ${num(r.c, l)} × 1.8 + 32 = ${num(r.bueno, l)} °F. Forget the + 32 and it goes wrong: 0 °C is 32 °F, not 0.`, `°F = °C × 1,8 + 32: ${num(r.c, l)} × 1,8 + 32 = ${num(r.bueno, l)} °F. Si s’oblida el + 32, surt malament: 0 °C són 32 °F, no 0.`)
      return s(l, `°C = (°F − 32) ÷ 1,8: (${num(r.dato, l)} − 32) ÷ 1,8 = ${num(r.bueno, l)} °C. Primero se resta 32 y después se divide.`, `°C = (°F − 32) ÷ 1.8: (${num(r.dato, l)} − 32) ÷ 1.8 = ${num(r.bueno, l)} °C. Subtract 32 first, then divide.`, `°C = (°F − 32) ÷ 1,8: (${num(r.dato, l)} − 32) ÷ 1,8 = ${num(r.bueno, l)} °C. Primer es resta 32 i després es divideix.`)
    }
    case 'mezcla': {
      const [[m1, t1], [m2, t2]] = r.vasos
      if (m1 === m2) return s(l, `Con la misma cantidad de agua, la mezcla queda justo en medio: (${t1} + ${t2}) ÷ 2 = ${r.bueno} °C. El calor que pierde el agua caliente es el que gana la fría.`, `With equal amounts of water, the mixture ends up exactly halfway: (${t1} + ${t2}) ÷ 2 = ${r.bueno} °C. The heat lost by the hot water is gained by the cold.`, `Amb la mateixa quantitat d’aigua, la barreja queda just al mig: (${t1} + ${t2}) ÷ 2 = ${r.bueno} °C. La calor que perd l’aigua calenta és la que guanya la freda.`)
      return s(l,
        `El calor que pierde el agua caliente lo gana la fría, así que pesa más el vaso con más agua: (${m1} · ${t1} + ${m2} · ${t2}) ÷ (${m1} + ${m2}) = ${r.bueno} °C. La media simple, ${num((t1 + t2) / 2, l)} °C, solo vale si hay la misma cantidad.`,
        `The heat lost by the hot water is gained by the cold, so the glass with more water counts for more: (${m1} · ${t1} + ${m2} · ${t2}) ÷ (${m1} + ${m2}) = ${r.bueno} °C. The plain average, ${num((t1 + t2) / 2, l)} °C, only works with equal amounts.`,
        `La calor que perd l’aigua calenta la guanya la freda, així que pesa més el got amb més aigua: (${m1} · ${t1} + ${m2} · ${t2}) ÷ (${m1} + ${m2}) = ${r.bueno} °C. La mitjana simple, ${num((t1 + t2) / 2, l)} °C, només val si n’hi ha la mateixa quantitat.`)
    }
    case 'calor': {
      const S = SUSTANCIAS[r.sustancia]
      return s(l,
        `Q = m · c · ΔT, y ΔT es lo que SUBE la temperatura: ${r.tf} − ${r.t0} = ${r.tf - r.t0} °C. Q = ${num(r.m, l)} · ${num(S.c, l)} · ${r.tf - r.t0} = ${julios(r.bueno, l)}.`,
        `Q = m · c · ΔT, and ΔT is how much the temperature RISES: ${r.tf} − ${r.t0} = ${r.tf - r.t0} °C. Q = ${num(r.m, l)} · ${num(S.c, l)} · ${r.tf - r.t0} = ${julios(r.bueno, l)}.`,
        `Q = m · c · ΔT, i ΔT és el que PUJA la temperatura: ${r.tf} − ${r.t0} = ${r.tf - r.t0} °C. Q = ${num(r.m, l)} · ${num(S.c, l)} · ${r.tf - r.t0} = ${julios(r.bueno, l)}.`)
    }
    case 'transmision': {
      const why = {
        conduccion: s(l, 'Conducción: el calor pasa por contacto, de partícula en partícula, sobre todo en los sólidos.', 'Conduction: heat passes by contact, from particle to particle, mostly in solids.', 'Conducció: la calor passa per contacte, de partícula en partícula, sobretot en els sòlids.'),
        conveccion: s(l, 'Convección: en líquidos y gases, la parte caliente sube y la fría baja, y se forman corrientes que reparten el calor.', 'Convection: in liquids and gases, the warm part rises and the cold part sinks, making currents that spread the heat.', 'Convecció: en líquids i gasos, la part calenta puja i la freda baixa, i es formen corrents que reparteixen la calor.'),
        radiacion: s(l, 'Radiación: el calor viaja como ondas, sin necesidad de contacto ni de materia; por eso el del Sol cruza el espacio vacío.', 'Radiation: heat travels as waves, with no need for contact or matter; that is how the Sun’s heat crosses empty space.', 'Radiació: la calor viatja com a ones, sense necessitat de contacte ni de matèria; per això la del Sol travessa l’espai buit.'),
      }
      return why[r.bueno]
    }
    case 'conductor': return r.pide === 'conductor'
      ? s(l, `Los metales son buenos conductores del calor; ${tx(MATERIALES[r.bueno].n, l).toLowerCase()} es el único metal de la lista. Madera, plástico, corcho, lana y porexpán son aislantes.`, `Metals are good conductors of heat; ${tx(MATERIALES[r.bueno].n, l).toLowerCase()} is the only metal in the list. Wood, plastic, cork, wool and polystyrene are insulators.`, `Els metalls són bons conductors de la calor; ${tx(MATERIALES[r.bueno].n, l).toLowerCase()} és l’únic metall de la llista. Fusta, plàstic, suro, llana i porexpan són aïllants.`)
      : s(l, `El mango tiene que ser aislante para no quemarte: ${tx(MATERIALES[r.bueno].n, l).toLowerCase()} lo es. Los otros son metales, buenos conductores.`, `The handle must be an insulator so it does not burn you: ${tx(MATERIALES[r.bueno].n, l).toLowerCase()} is one. The others are metals, good conductors.`, `El mànec ha de ser aïllant perquè no et cremis: ${tx(MATERIALES[r.bueno].n, l).toLowerCase()} ho és. Els altres són metalls, bons conductors.`)
    default: return tx(CONCEPTOS.find(c => c.id === r.concepto).exp, l)
  }
}

function schemaVieja(r, l) {
  return {
    question: enunciadoViejo(r, l),
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}

// Color del agua según su temperatura (azul frío → rojo caliente), para los vasos.
export function colorAgua(t) {
  const x = Math.max(0, Math.min(1, t / 90))
  const a = [59, 130, 246], b = [239, 68, 68]
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * x)).join(',')})`
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genVieja sigue dando la ronda clásica y el texto del schema):
//   escala       se teclea la temperatura en la otra escala (con signo)
//   mezcla       se sube o se baja la temperatura del vaso de la mezcla hasta
//                la que quedará; el agua cambia de color
//   calor        se teclean los julios de Q = m · c · ΔT
//   transmision  tres escenas, cada una a la caja de su forma de transmitirse
//                el calor («clasifica:fallos»)
//   sarten       se monta una sartén: el cuerpo con un material que conduzca y
//                el mango con uno que aísle («sarten:fallos»)
// Las preguntas de concepto (bañera, nevera, cero absoluto…) quedan solo en
// el examen de teoría: son de elegir una respuesta y no tienen mecánica.
const MECANICAS = {
  facil:   ['escala', 'mezcla', 'transmision', 'sarten'],
  medio:   ['escala', 'escala', 'mezcla', 'transmision', 'sarten'],
  dificil: ['escala', 'mezcla', 'calor', 'calor', 'transmision'],
}
export const MECANICAS_DE = nivel => MECANICAS[nivel] ?? MECANICAS.facil

const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  for (let intento = 0; ; intento++) {
    const r = genNueva(nivel, rand)
    const tema = `${r.mecanica}${r.dato ?? ''}${r.vasos ?? ''}${r.sustancia ?? ''}${r.m ?? ''}${(r.escenas ?? []).join()}${(r.piezas ?? []).join()}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

function genNueva(nivel, rand) {
  const mecanica = elige(rand, MECANICAS_DE(nivel))
  if (mecanica === 'sarten') {
    const r = genVieja(nivel, 'conductor', rand)
    const ids = Object.keys(MATERIALES)
    const piezas = baraja(rand, [
      ...baraja(rand, ids.filter(id => MATERIALES[id].conduce)).slice(0, 2),
      ...baraja(rand, ids.filter(id => !MATERIALES[id].conduce)).slice(0, 2),
    ])
    return { ...r, mecanica, piezas }
  }
  if (mecanica === 'transmision') {
    for (;;) {
      const escenas = baraja(rand, ESCENAS).slice(0, 3)
      if (new Set(escenas.map(e => e.modo)).size < 2) continue
      const r = genVieja(nivel, 'transmision', rand)
      // la primera escena hace de pregunta clásica para el schema
      return { ...r, mecanica, escena: escenas[0].id, bueno: escenas[0].modo, escenas: escenas.map(e => e.id) }
    }
  }
  const r = genVieja(nivel, mecanica, rand)
  return { ...r, mecanica }
}

// Números tecleados: admite «−» o «-».
export const leeNumero = t => {
  const x = String(t).trim().replace('−', '-')
  return /^-?\d+$/.test(x) ? Number(x) : null
}
export function respuestaBuena(r) {
  if (r.mecanica === 'transmision') return 'clasifica:0'
  if (r.mecanica === 'sarten') return 'sarten:0'
  return String(r.bueno)
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (!r.mecanica) return o === r.bueno
  if (r.mecanica === 'transmision' || r.mecanica === 'sarten') return o === respuestaBuena(r)
  return leeNumero(o) === r.bueno
}
export const isCorrect = esCorrecta
export const modoDe = id => ESCENAS.find(e => e.id === id).modo

export function enunciado(r, l) {
  switch (r.mecanica) {
    case 'escala': {
      const [de, a] = escalaDe(r)
      const nombre = { K: s(l, 'kelvin', 'kelvin', 'kelvin'), C: s(l, 'grados Celsius', 'degrees Celsius', 'graus Celsius'), F: s(l, 'grados Fahrenheit', 'degrees Fahrenheit', 'graus Fahrenheit') }[a]
      return s(l, `El termómetro marca ${conUnidad(r.dato, de, l)}. Escribe cuánto es en ${nombre}`, `The thermometer reads ${conUnidad(r.dato, de, l)}. Type what that is in ${nombre}`, `El termòmetre marca ${conUnidad(r.dato, de, l)}. Escriu quant és en ${nombre}`)
    }
    case 'mezcla': return s(l, 'Mezclas los dos vasos. Pon el termómetro de la mezcla en la temperatura a la que quedará', 'You mix the two glasses. Set the mixture’s thermometer to the temperature it will end up at', 'Barreges els dos gots. Posa el termòmetre de la barreja a la temperatura on quedarà')
    case 'calor': return `${enunciadoViejo(r, l)} ${s(l, 'Escribe los julios.', 'Type the joules.', 'Escriu els joules.')}`
    case 'transmision': return s(l, 'Pon cada escena en la caja de cómo se transmite el calor', 'Put each scene in the box for how the heat is transferred', 'Posa cada escena a la caixa de com es transmet la calor')
    default: return s(l, 'Monta una sartén que caliente bien y no te queme: elige el material del cuerpo y el del mango', 'Build a frying pan that heats well and does not burn you: choose the material for the pan and for the handle', 'Munta una paella que escalfi bé i no et cremi: tria el material del cos i el del mànec')
  }
}

export function explicacion(r, l) {
  if (r.mecanica === 'transmision') {
    return r.escenas.map(id => {
      const e = ESCENAS.find(x => x.id === id)
      return `${e.emoji} ${tx(MODOS[e.modo], l)}`
    }).join(' · ') + '. ' + explicacionVieja({ ...r, tipo: 'transmision', bueno: modoDe(r.escenas[0]) }, l)
  }
  if (r.mecanica === 'sarten') return s(l, 'El cuerpo tiene que conducir el calor del fuego a la comida: metal. El mango, aislar para no quemarte: madera, plástico, corcho, lana o porexpán.', 'The pan must conduct heat from the flame to the food: metal. The handle must insulate so you do not get burnt: wood, plastic, cork, wool or polystyrene.', 'El cos ha de conduir la calor del foc al menjar: metall. El mànec, aïllar perquè no et cremis: fusta, plàstic, suro, llana o porexpan.')
  return explicacionVieja(r, l)
}

export function schemaQuestion(r, l) {
  return schemaVieja(r, l)
}
