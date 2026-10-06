// Oferta y demanda (economía · el mercado, ESO y Bachillerato): una noticia
// y el gráfico de oferta (S) y demanda (D) con su equilibrio.
//
// Tipos de pregunta:
//   curva       ¿qué curva se desplaza y hacia dónde? (o ninguna: un cambio
//               del precio del propio bien es un movimiento A LO LARGO)
//   efecto      ¿qué pasa con el precio y la cantidad de equilibrio?
//   equilibrio  con Qd = a − bP y Qo = c + dP, ¿precio o cantidad de equilibrio?
//   exceso      a un precio dado, ¿exceso de demanda (escasez) o de oferta, y
//               de cuántas unidades?
//
// Cada noticia mueve UNA sola curva (las que mueven las dos, como «sube la
// renta y a la vez una helada», no se usan: el efecto sobre el precio o la
// cantidad quedaría indeterminado y no habría una respuesta buena).
//
// Niveles: facil → curva (sin «ninguna»); medio → curva (con «ninguna»),
// efecto; dificil → efecto, equilibrio, exceso.

const T = (es, en, ca) => ({ es, en, ca })

// curva: 'D' | 'S' | null (movimiento a lo largo); dir: +1 (derecha), −1
// (izquierda); en un movimiento a lo largo, +1 si el precio sube y −1 si baja. porque: el motivo económico que se enseña al corregir.
const N = (bien, texto, curva, dir, porque) => ({ bien, texto, curva, dir, porque })
export const NOTICIAS = [
  N(T('helados', 'ice cream', 'gelats'), T('Llega una ola de calor.', 'A heatwave arrives.', 'Arriba una onada de calor.'), 'D', 1, T('Cambian los gustos con el tiempo: más gente quiere helado a cualquier precio.', 'Tastes change with the weather: more people want ice cream at any price.', 'Canvien els gustos amb el temps: més gent vol gelat a qualsevol preu.')),
  N(T('sombreros', 'hats', 'barrets'), T('Una cantante famosa pone de moda los sombreros.', 'A famous singer makes hats fashionable.', 'Una cantant famosa posa de moda els barrets.'), 'D', 1, T('Una moda cambia los gustos: se quieren más sombreros a cada precio.', 'A trend changes tastes: more hats are wanted at each price.', 'Una moda canvia els gustos: es volen més barrets a cada preu.')),
  N(T('té', 'tea', 'te'), T('Sube mucho el precio del café.', 'The price of coffee rises sharply.', 'Puja molt el preu del cafè.'), 'D', 1, T('El té y el café son sustitutivos: si el café se encarece, parte de la gente se pasa al té.', 'Tea and coffee are substitutes: if coffee gets dearer, some people switch to tea.', 'El te i el cafè són substitutius: si el cafè s’encareix, part de la gent es passa al te.')),
  N(T('chocolate negro', 'dark chocolate', 'xocolata negra'), T('Un estudio dice que el chocolate negro es bueno para el corazón.', 'A study says dark chocolate is good for the heart.', 'Un estudi diu que la xocolata negra és bona per al cor.'), 'D', 1, T('La información cambia las preferencias: se quiere más a cada precio.', 'Information changes preferences: more is wanted at each price.', 'La informació canvia les preferències: se’n vol més a cada preu.')),
  N(T('paraguas', 'umbrellas', 'paraigües'), T('Se anuncia una semana entera de lluvias.', 'A whole week of rain is forecast.', 'S’anuncia una setmana sencera de pluges.'), 'D', 1, T('Las expectativas de lluvia aumentan las ganas de comprar paraguas a cualquier precio.', 'Expecting rain makes people keener to buy umbrellas at any price.', 'Les expectatives de pluja augmenten les ganes de comprar paraigües a qualsevol preu.')),
  N(T('mantequilla', 'butter', 'mantega'), T('Sube el precio de la margarina.', 'The price of margarine rises.', 'Puja el preu de la margarina.'), 'D', 1, T('Son sustitutivos: al encarecerse la margarina, se compra más mantequilla.', 'They are substitutes: when margarine gets dearer, more butter is bought.', 'Són substitutius: en encarir-se la margarina, es compra més mantega.')),
  N(T('coches grandes', 'large cars', 'cotxes grans'), T('La gasolina se pone carísima.', 'Petrol becomes very expensive.', 'La gasolina es posa caríssima.'), 'D', -1, T('Coche y gasolina son complementarios: si usar el coche sale más caro, se quieren menos coches que gastan mucho.', 'Cars and petrol are complements: if driving costs more, fewer fuel-hungry cars are wanted.', 'Cotxe i gasolina són complementaris: si fer servir el cotxe surt més car, es volen menys cotxes que gasten molt.')),
  N(T('abrigos', 'winter coats', 'abrics'), T('El invierno va a ser muy suave.', 'The winter is going to be very mild.', 'L’hivern serà molt suau.'), 'D', -1, T('Con menos frío se quieren menos abrigos a cada precio.', 'With less cold, fewer coats are wanted at each price.', 'Amb menys fred es volen menys abrics a cada preu.')),
  N(T('tinta de impresora', 'printer ink', 'tinta d’impressora'), T('Casi nadie imprime ya: todo se envía por correo.', 'Hardly anyone prints any more: everything is emailed.', 'Gairebé ningú no imprimeix ja: tot s’envia per correu.'), 'D', -1, T('Cambian los hábitos: se quiere menos tinta a cualquier precio.', 'Habits change: less ink is wanted at any price.', 'Canvien els hàbits: es vol menys tinta a qualsevol preu.')),
  N(T('refrescos azucarados', 'sugary soft drinks', 'refrescos ensucrats'), T('Una campaña avisa de lo malo que es tomar tanto azúcar.', 'A campaign warns how bad so much sugar is.', 'Una campanya avisa de com és de dolent prendre tant de sucre.'), 'D', -1, T('La información cambia las preferencias: se quieren menos refrescos a cada precio.', 'Information changes preferences: fewer soft drinks are wanted at each price.', 'La informació canvia les preferències: es volen menys refrescos a cada preu.')),
  N(T('palomitas del cine', 'cinema popcorn', 'crispetes del cinema'), T('Suben mucho las entradas de cine.', 'Cinema tickets go up a lot.', 'Pugen molt les entrades de cinema.'), 'D', -1, T('Son complementarios: menos gente va al cine, así que se quieren menos palomitas.', 'They are complements: fewer people go to the cinema, so less popcorn is wanted.', 'Són complementaris: menys gent va al cinema, així que es volen menys crispetes.')),
  N(T('patinetes eléctricos', 'e-scooters', 'patinets elèctrics'), T('Una máquina nueva abarata mucho fabricarlos.', 'A new machine makes them much cheaper to build.', 'Una màquina nova abarateix molt fabricar-los.'), 'S', 1, T('Mejor tecnología, costes más bajos: se ofrecen más a cada precio.', 'Better technology, lower costs: more are offered at each price.', 'Millor tecnologia, costos més baixos: se n’ofereixen més a cada preu.')),
  N(T('pan', 'bread', 'pa'), T('Baja el precio de la harina.', 'The price of flour falls.', 'Baixa el preu de la farina.'), 'S', 1, T('La harina es una materia prima del pan: si baja, producir pan cuesta menos y se ofrece más.', 'Flour is an input for bread: if it falls, bread costs less to make and more is offered.', 'La farina és una matèria primera del pa: si baixa, produir pa costa menys i se n’ofereix més.')),
  N(T('tomates', 'tomatoes', 'tomàquets'), T('El buen tiempo da una cosecha excelente.', 'Good weather brings an excellent harvest.', 'El bon temps dona una collita excel·lent.'), 'S', 1, T('Hay más producto para vender a cada precio.', 'There is more produce to sell at each price.', 'Hi ha més producte per vendre a cada preu.')),
  N(T('móviles', 'mobile phones', 'mòbils'), T('Muchas empresas nuevas empiezan a fabricarlos.', 'Many new companies start making them.', 'Moltes empreses noves comencen a fabricar-los.'), 'S', 1, T('Más vendedores en el mercado: se ofrecen más a cada precio.', 'More sellers in the market: more are offered at each price.', 'Més venedors al mercat: se n’ofereixen més a cada preu.')),
  N(T('leche', 'milk', 'llet'), T('El Gobierno da una ayuda a los ganaderos por cada litro.', 'The government pays farmers a subsidy per litre.', 'El Govern dona un ajut als ramaders per cada litre.'), 'S', 1, T('Una subvención abarata producir: se ofrece más a cada precio.', 'A subsidy makes production cheaper: more is offered at each price.', 'Una subvenció abarateix produir: se n’ofereix més a cada preu.')),
  N(T('naranjas', 'oranges', 'taronges'), T('Una helada destruye parte de la cosecha.', 'A frost destroys part of the harvest.', 'Una gelada destrueix part de la collita.'), 'S', -1, T('Hay menos naranjas para vender a cualquier precio.', 'There are fewer oranges to sell at any price.', 'Hi ha menys taronges per vendre a qualsevol preu.')),
  N(T('refrescos', 'soft drinks', 'refrescos'), T('Nuevo impuesto a los fabricantes por cada lata.', 'A new tax on producers for every can.', 'Nou impost als fabricants per cada llauna.'), 'S', -1, T('El impuesto encarece producir: se ofrece menos a cada precio.', 'The tax makes production dearer: less is offered at each price.', 'L’impost encareix produir: se n’ofereix menys a cada preu.')),
  N(T('aceite de oliva', 'olive oil', 'oli d’oliva'), T('Una sequía reduce mucho la cosecha de aceitunas.', 'A drought sharply cuts the olive harvest.', 'Una sequera redueix molt la collita d’olives.'), 'S', -1, T('Menos materia prima: se ofrece menos aceite a cada precio.', 'Less raw material: less oil is offered at each price.', 'Menys matèria primera: s’ofereix menys oli a cada preu.')),
  N(T('consolas', 'games consoles', 'consoles'), T('Faltan chips en las fábricas.', 'Factories are short of chips.', 'Falten xips a les fàbriques.'), 'S', -1, T('Sin piezas se fabrican menos: se ofrecen menos a cada precio.', 'Without parts fewer are made: fewer are offered at each price.', 'Sense peces se’n fabriquen menys: se n’ofereixen menys a cada preu.')),
  N(T('pan', 'bread', 'pa'), T('Se dispara el precio de la luz que gastan los hornos.', 'The electricity the ovens use soars in price.', 'Es dispara el preu de la llum que gasten els forns.'), 'S', -1, T('Producir cuesta más: se ofrece menos pan a cada precio.', 'Production costs more: less bread is offered at each price.', 'Produir costa més: s’ofereix menys pa a cada preu.')),
  N(T('fresas', 'strawberries', 'maduixes'), T('Sube el precio de las fresas.', 'The price of strawberries goes up.', 'Puja el preu de les maduixes.'), null, 1, T('Es el precio del propio bien: ninguna curva se desplaza, nos movemos a lo largo de ellas (se compran menos fresas y se ofrecen más).', 'It is the good’s own price: no curve shifts, we move along them (fewer strawberries are bought and more are offered).', 'És el preu del mateix bé: cap corba no es desplaça, ens movem al llarg d’elles (es compren menys maduixes i se n’ofereixen més).')),
  N(T('entradas de concierto', 'concert tickets', 'entrades de concert'), T('Bajan el precio de las entradas del concierto.', 'The concert tickets are reduced in price.', 'Abaixen el preu de les entrades del concert.'), null, -1, T('Es el precio del propio bien: no se desplaza ninguna curva, es un movimiento a lo largo de la demanda (se compran más entradas).', 'It is the good’s own price: no curve shifts, it is a movement along demand (more tickets are bought).', 'És el preu del mateix bé: no es desplaça cap corba, és un moviment al llarg de la demanda (es compren més entrades).')),
]

// Efecto de cada desplazamiento sobre el equilibrio: [precio, cantidad].
export const EFECTO = { 'D+': [1, 1], 'D-': [-1, -1], 'S+': [-1, 1], 'S-': [1, -1] }

export const NIVELES = {
  facil:   { tipos: ['curva'], ninguna: false },
  medio:   { tipos: ['curva', 'efecto'], ninguna: true },
  dificil: { tipos: ['efecto', 'equilibrio', 'exceso'], ninguna: true },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
const CURVAS = ['D+', 'D-', 'S+', 'S-']
const EFECTOS = ['++', '+-', '-+', '--']
const clave = n => (n.curva ? n.curva + (n.dir > 0 ? '+' : '-') : 'ninguna')
let seq = 0

// Ecuaciones con equilibrio entero: Qd = a − bP, Qo = c + dP (Qs en inglés).
function ecuaciones(rand) {
  const P = 2 + Math.floor(rand() * 19)
  const Q = 20 + 5 * Math.floor(rand() * 17)
  // Pendientes de 2 a 5: con 1 se escribiría «1P» y la recta saldría casi vertical.
  const b = 2 + Math.floor(rand() * 4), d = 2 + Math.floor(rand() * 4)
  return { P, Q, a: Q + b * P, b, c: Q - d * P, d }
}

export function genRonda(nivel = 'facil', { rand = Math.random, evitar = null } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }
    if (tipo === 'curva' || tipo === 'efecto') {
      const pool = NOTICIAS.map((n, i) => i).filter(i => (tipo === 'efecto' || !cfg.ninguna ? NOTICIAS[i].curva : true))
      const i = elige(rand, pool)
      if (i === evitar) continue
      const n = NOTICIAS[i]
      if (tipo === 'curva') {
        const bueno = clave(n)
        return { ...base, noticia: i, bueno, opciones: cfg.ninguna ? [...CURVAS, 'ninguna'] : CURVAS }
      }
      const [p, q] = EFECTO[clave(n)]
      return { ...base, noticia: i, bueno: (p > 0 ? '+' : '-') + (q > 0 ? '+' : '-'), opciones: EFECTOS }
    }
    const e = ecuaciones(rand)
    if (tipo === 'equilibrio') {
      const pideP = rand() < 0.5
      const bueno = pideP ? e.P : e.Q
      // Errores típicos: sumar en vez de restar las constantes, dividir entre
      // b − d, o dar la otra incógnita.
      const malP = [Math.round((e.a + e.c) / (e.b + e.d)), e.b !== e.d ? Math.round((e.a - e.c) / Math.abs(e.b - e.d)) : null, e.P + 2, e.P - 2]
      const malQ = [e.a, e.Q + e.b, e.Q - e.d, e.c + e.d * (e.P + 1)]
      const cands = (pideP ? malP : malQ).filter(x => x !== null && x > 0 && x !== bueno)
      const ops = [...new Set(cands)].slice(0, 3)
      if (ops.length < 3) continue
      return { ...base, ec: e, pide: pideP ? 'P' : 'Q', bueno, opciones: [bueno, ...ops].sort((x, y) => x - y) }
    }
    // exceso: a un precio fijado por encima o por debajo del de equilibrio.
    const k = 1 + Math.floor(rand() * 3)
    const p0 = rand() < 0.5 ? e.P - k : e.P + k
    const qd = e.a - e.b * p0, qs = e.c + e.d * p0
    if (p0 <= 0 || qd <= 0 || qs <= 0) continue
    const n = Math.abs(qd - qs)
    const tipoExceso = qd > qs ? 'demanda' : 'oferta'
    const otro = tipoExceso === 'demanda' ? 'oferta' : 'demanda'
    const malos = [`${otro}:${n}`, `${tipoExceso}:${n + e.b}`, `${tipoExceso}:${Math.max(1, n - e.d)}`, `${otro}:${n + e.d}`]
    const bueno = `${tipoExceso}:${n}`
    const ops = [...new Set(malos)].filter(x => x !== bueno).slice(0, 3)
    if (ops.length < 3) continue
    return { ...base, ec: e, p0, qd, qs, bueno, opciones: baraja(rand, [bueno, ...ops]) }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = esCorrecta

// ── Textos ───────────────────────────────────────────────────────────────
const tx = (o, l) => o[l] ?? o.es
const flecha = s => (s === '+' ? '↑' : '↓')

export const noticiaDe = ronda => NOTICIAS[ronda.noticia]

export function textoOpcion(o, ronda, l) {
  if (ronda.tipo === 'curva') {
    if (o === 'ninguna') return tx(T('Ninguna: es un movimiento a lo largo', 'Neither: it is a movement along', 'Cap: és un moviment al llarg'), l)
    const curva = o[0] === 'D' ? tx(T('La demanda', 'Demand', 'La demanda'), l) : tx(T('La oferta', 'Supply', 'L’oferta'), l)
    const dir = o[1] === '+' ? tx(T('aumenta →', 'increases →', 'augmenta →'), l) : tx(T('disminuye ←', 'decreases ←', 'disminueix ←'), l)
    return `${curva} ${dir}`
  }
  if (ronda.tipo === 'efecto') return `${tx(T('Precio', 'Price', 'Preu'), l)} ${flecha(o[0])} · ${tx(T('cantidad', 'quantity', 'quantitat'), l)} ${flecha(o[1])}`
  if (ronda.tipo === 'equilibrio') return ronda.pide === 'P' ? `${o} €` : `${o} ${tx(T('unidades', 'units', 'unitats'), l)}`
  const [t, n] = o.split(':')
  return t === 'demanda'
    ? tx(T(`Exceso de demanda (escasez) de ${n}`, `Excess demand (shortage) of ${n}`, `Excés de demanda (escassetat) de ${n}`), l)
    : tx(T(`Exceso de oferta de ${n}`, `Excess supply of ${n}`, `Excés d’oferta de ${n}`), l)
}

// La oferta se escribe O en los libros de aquí (Qo) y S en inglés (Qs).
export const letraOferta = l => (l === 'en' ? 'S' : 'O')
const ec = (e, l) => {
  const c = e.c >= 0 ? `${e.c} + ${e.d}P` : `−${-e.c} + ${e.d}P`
  return { qd: `Qd = ${e.a} − ${e.b}P`, qs: `Q${letraOferta(l).toLowerCase()} = ${c}` }
}
export const ecuacionesTexto = (ronda, l) => ec(ronda.ec, l)

export function enunciado(ronda, l) {
  const n = ronda.noticia !== undefined ? noticiaDe(ronda) : null
  switch (ronda.tipo) {
    case 'curva': return tx(T(`Mercado de ${tx(n.bien, 'es')}: ¿qué curva se desplaza?`, `Market for ${tx(n.bien, 'en')}: which curve shifts?`, `Mercat de ${tx(n.bien, 'ca')}: quina corba es desplaça?`), l)
    case 'efecto': return tx(T(`Mercado de ${tx(n.bien, 'es')}: ¿qué pasa con el precio y la cantidad de equilibrio?`, `Market for ${tx(n.bien, 'en')}: what happens to the equilibrium price and quantity?`, `Mercat de ${tx(n.bien, 'ca')}: què passa amb el preu i la quantitat d’equilibri?`), l)
    case 'equilibrio': return ronda.pide === 'P'
      ? tx(T('¿Cuál es el precio de equilibrio?', 'What is the equilibrium price?', 'Quin és el preu d’equilibri?'), l)
      : tx(T('¿Cuál es la cantidad de equilibrio?', 'What is the equilibrium quantity?', 'Quina és la quantitat d’equilibri?'), l)
    default: return tx(T(`Si el precio se fija en ${ronda.p0} €, ¿qué ocurre en el mercado?`, `If the price is set at €${ronda.p0}, what happens in the market?`, `Si el preu es fixa en ${ronda.p0} €, què passa al mercat?`), l)
  }
}

export function explicacion(ronda, l) {
  const r = ronda
  if (r.tipo === 'curva' || r.tipo === 'efecto') {
    const n = noticiaDe(r)
    const por = tx(n.porque, l)
    if (!n.curva) return por
    const [p, q] = EFECTO[clave(n)]
    const efecto = tx(T(
      `Resultado: el precio ${p > 0 ? 'sube' : 'baja'} y la cantidad ${q > 0 ? 'sube' : 'baja'}.`,
      `Result: the price ${p > 0 ? 'rises' : 'falls'} and the quantity ${q > 0 ? 'rises' : 'falls'}.`,
      `Resultat: el preu ${p > 0 ? 'puja' : 'baixa'} i la quantitat ${q > 0 ? 'puja' : 'baixa'}.`), l)
    return `${por} ${efecto}`
  }
  const e = r.ec
  const { qd, qs } = ec(e, l)
  if (r.tipo === 'equilibrio') {
    return tx(T(
      `En equilibrio Qd = Qo: ${e.a} − ${e.b}P = ${qs.slice(5)} → ${e.a - e.c} = ${e.b + e.d}P → P = ${e.P} €. Y Q = ${e.a} − ${e.b}·${e.P} = ${e.Q} unidades.`,
      `At equilibrium Qd = Qs: ${e.a} − ${e.b}P = ${qs.slice(5)} → ${e.a - e.c} = ${e.b + e.d}P → P = €${e.P}. And Q = ${e.a} − ${e.b}·${e.P} = ${e.Q} units.`,
      `En equilibri Qd = Qo: ${e.a} − ${e.b}P = ${qs.slice(5)} → ${e.a - e.c} = ${e.b + e.d}P → P = ${e.P} €. I Q = ${e.a} − ${e.b}·${e.P} = ${e.Q} unitats.`), l)
  }
  const falta = r.qd > r.qs
  return tx(T(
    `A ${r.p0} €: ${qd.replace('P', `·${r.p0}`)} = ${r.qd} y ${qs.replace('P', `·${r.p0}`)} = ${r.qs}. ${falta ? `Se quiere comprar más de lo que se ofrece: exceso de demanda de ${r.qd - r.qs}, porque el precio está por debajo del de equilibrio (${e.P} €).` : `Se ofrece más de lo que se quiere comprar: exceso de oferta de ${r.qs - r.qd}, porque el precio está por encima del de equilibrio (${e.P} €).`}`,
    `At €${r.p0}: ${qd.replace('P', `·${r.p0}`)} = ${r.qd} and ${qs.replace('P', `·${r.p0}`)} = ${r.qs}. ${falta ? `People want to buy more than is offered: excess demand of ${r.qd - r.qs}, because the price is below equilibrium (€${e.P}).` : `More is offered than people want to buy: excess supply of ${r.qs - r.qd}, because the price is above equilibrium (€${e.P}).`}`,
    `A ${r.p0} €: ${qd.replace('P', `·${r.p0}`)} = ${r.qd} i ${qs.replace('P', `·${r.p0}`)} = ${r.qs}. ${falta ? `Es vol comprar més del que s’ofereix: excés de demanda de ${r.qd - r.qs}, perquè el preu és per sota del d’equilibri (${e.P} €).` : `S’ofereix més del que es vol comprar: excés d’oferta de ${r.qs - r.qd}, perquè el preu és per sobre del d’equilibri (${e.P} €).`}`), l)
}

export function schemaQuestion(ronda, l) {
  const n = ronda.noticia !== undefined ? noticiaDe(ronda) : null
  const datos = n ? tx(n.texto, l) : `${ec(ronda.ec, l).qd}; ${ec(ronda.ec, l).qs}.`
  return {
    question: `${datos} ${enunciado(ronda, l)}`,
    correctAnswer: textoOpcion(ronda.bueno, ronda, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, ronda, l)),
  }
}
