// Señal a Señal (vida práctica · seguridad vial, Primaria y ESO).
//
// Señales de tráfico dibujadas (components/senalASenal) y situaciones de
// peatón, ciclista y pasajero. Se pregunta:
//   significado  qué significa esta señal
//   tipo         peligro, prohibición, obligación, indicación o prioridad
//                (se deduce de la forma y el color)
//   situacion    qué es lo seguro en esta situación
//
// Las parejas que se confunden salen juntas a propósito: velocidad máxima y
// mínima, estacionamiento prohibido y parada prohibida, el paso de peatones de
// peligro (triángulo) y el de indicación (cuadrado). Solo reglas claras de la
// DGT; lo que depende de cada ayuntamiento (el casco en patinete) no sale.

const T = (es, en, ca) => ({ es, en, ca })
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const tx = (o, l) => o[l] ?? o.es

export const TIPOS = {
  peligro: { nombre: T('Peligro', 'Warning', 'Perill'), forma: T('Triángulo blanco con borde rojo: avisa de un peligro que viene.', 'White triangle with a red border: it warns of a hazard ahead.', 'Triangle blanc amb vora vermella: avisa d’un perill que ve.') },
  prohibicion: { nombre: T('Prohibición', 'Prohibition', 'Prohibició'), forma: T('Círculo con borde rojo: prohíbe algo.', 'Circle with a red border: it forbids something.', 'Cercle amb vora vermella: prohibeix alguna cosa.') },
  obligacion: { nombre: T('Obligación', 'Mandatory', 'Obligació'), forma: T('Círculo azul: obliga a hacer algo.', 'Blue circle: it tells you what you must do.', 'Cercle blau: obliga a fer alguna cosa.') },
  indicacion: { nombre: T('Indicación', 'Information', 'Indicació'), forma: T('Cuadrado o rectángulo azul: informa.', 'Blue square or rectangle: it gives information.', 'Quadrat o rectangle blau: informa.') },
  prioridad: { nombre: T('Prioridad', 'Priority', 'Prioritat'), forma: T('Forma única (octógono de STOP, triángulo invertido): dice quién pasa primero.', 'Unique shape (STOP octagon, upside-down triangle): it says who goes first.', 'Forma única (octògon de STOP, triangle invertit): diu qui passa primer.') },
}

// [id, tipo, significado, pareja con la que se confunde]
const S = (id, tipo, sig, pareja = null) => ({ id, tipo, sig, pareja })
export const SENALES = [
  S('stop', 'prioridad', T('STOP: detenerse siempre y ceder el paso', 'STOP: always stop and give way', 'STOP: aturar-se sempre i cedir el pas'), 'ceda'),
  S('ceda', 'prioridad', T('Ceda el paso', 'Give way', 'Cediu el pas'), 'stop'),
  S('curva', 'peligro', T('Curva peligrosa hacia la derecha', 'Dangerous bend to the right', 'Corba perillosa cap a la dreta')),
  S('peatonesPeligro', 'peligro', T('Peligro: paso de peatones cerca', 'Warning: pedestrian crossing ahead', 'Perill: pas de vianants a prop'), 'peatonesInd'),
  S('semaforoPeligro', 'peligro', T('Peligro: semáforos cerca', 'Warning: traffic lights ahead', 'Perill: semàfors a prop')),
  S('ciclistasPeligro', 'peligro', T('Peligro: ciclistas', 'Warning: cyclists', 'Perill: ciclistes'), 'carrilBici'),
  S('direccionProhibida', 'prohibicion', T('Dirección prohibida: no se puede entrar', 'No entry', 'Direcció prohibida: no s’hi pot entrar'), 'sinSalida'),
  S('maxima50', 'prohibicion', T('Velocidad máxima: 50 km/h', 'Maximum speed: 50 km/h', 'Velocitat màxima: 50 km/h'), 'minima30'),
  S('noEstacionar', 'prohibicion', T('Estacionamiento prohibido (sí se puede parar un momento)', 'No parking (stopping briefly is allowed)', 'Estacionament prohibit (sí que es pot parar un moment)'), 'noParar'),
  S('noParar', 'prohibicion', T('Parada y estacionamiento prohibidos', 'No stopping or parking', 'Parada i estacionament prohibits'), 'noEstacionar'),
  S('noBicis', 'prohibicion', T('Prohibido el paso a bicicletas', 'No cycling', 'Prohibit el pas a bicicletes'), 'carrilBici'),
  S('derecha', 'obligacion', T('Sentido obligatorio: girar a la derecha', 'Turn right only', 'Sentit obligatori: girar a la dreta')),
  S('carrilBici', 'obligacion', T('Vía reservada para bicicletas', 'Route for cycles only', 'Via reservada per a bicicletes'), 'noBicis'),
  S('minima30', 'obligacion', T('Velocidad mínima: 30 km/h', 'Minimum speed: 30 km/h', 'Velocitat mínima: 30 km/h'), 'maxima50'),
  S('peatonesInd', 'indicacion', T('Aquí hay un paso de peatones', 'Pedestrian crossing here', 'Aquí hi ha un pas de vianants'), 'peatonesPeligro'),
  S('aparcamiento', 'indicacion', T('Aparcamiento', 'Parking', 'Aparcament')),
  S('hospital', 'indicacion', T('Hospital', 'Hospital', 'Hospital')),
  S('sinSalida', 'indicacion', T('Calle sin salida', 'No through road', 'Carrer sense sortida'), 'direccionProhibida'),
]
export const senal = id => SENALES.find(x => x.id === id)
const FACILES = ['stop', 'ceda', 'curva', 'peatonesPeligro', 'direccionProhibida', 'maxima50', 'carrilBici', 'aparcamiento', 'hospital', 'semaforoPeligro']

// [emoji, situación, opción segura, opciones peligrosas o falsas, por qué]
const C = (emoji, sit, ok, mal, porque) => ({ emoji, sit, ok, mal, porque })
export const SITUACIONES = [
  C('🚦', T('Vas a cruzar y el semáforo de peatones se pone en verde.', 'You are about to cross and the pedestrian light turns green.', 'Vas a creuar i el semàfor de vianants es posa verd.'),
    T('Miro a los dos lados y cruzo cuando los coches se han parado', 'I look both ways and cross once the cars have stopped', 'Miro a banda i banda i creuo quan els cotxes s’han aturat'),
    [T('Cruzo corriendo sin mirar, que está en verde', 'I run across without looking, it is green', 'Creuo corrent sense mirar, que és verd'), T('Cruzo mirando el móvil', 'I cross while looking at my phone', 'Creuo mirant el mòbil'), T('Cruzo en diagonal para llegar antes', 'I cross diagonally to get there faster', 'Creuo en diagonal per arribar abans')],
    T('El verde te da el derecho a cruzar, no la garantía de que todos paren.', 'Green gives you the right to cross, not a guarantee that everyone will stop.', 'El verd et dona el dret a creuar, no la garantia que tothom s’aturi.')),
  C('⚽', T('Se te escapa la pelota a la calzada.', 'Your ball rolls into the road.', 'Se t’escapa la pilota a la calçada.'),
    T('No salgo detrás: miro el tráfico y, si hace falta, pido ayuda a un adulto', 'I do not run after it: I check the traffic and ask an adult for help if needed', 'No surto darrere: miro el trànsit i, si cal, demano ajuda a un adult'),
    [T('Salgo corriendo a por ella antes de que se aleje', 'I run after it before it rolls away', 'Surto corrent a buscar-la abans que s’allunyi'), T('Cruzo entre los coches aparcados para alcanzarla', 'I go between parked cars to reach it', 'Creuo entre els cotxes aparcats per agafar-la'), T('Grito a los coches para que paren', 'I shout at the cars to stop', 'Crido als cotxes perquè s’aturin')],
    T('Es la causa típica de atropellos de niños: una pelota se recupera, un accidente no.', 'It is the typical cause of children being hit: a ball can be replaced, an accident cannot be undone.', 'És la causa típica d’atropellaments de nens: una pilota es recupera, un accident no.')),
  C('🚗', T('Subes al coche para un trayecto muy corto.', 'You get in the car for a very short trip.', 'Puges al cotxe per a un trajecte molt curt.'),
    T('Me pongo el cinturón antes de arrancar, en cualquier asiento', 'I put my seatbelt on before we set off, in any seat', 'Em poso el cinturó abans d’arrencar, a qualsevol seient'),
    [T('Como es cerca, no hace falta', 'It is close, so there is no need', 'Com que és a prop, no cal'), T('Solo si voy delante', 'Only if I sit in the front', 'Només si vaig davant'), T('Me lo pongo si hay carretera', 'Only on a main road', 'Me’l poso si hi ha carretera')],
    T('El cinturón es obligatorio en todos los asientos y en todos los trayectos: la mayoría de accidentes ocurren cerca de casa.', 'Seatbelts are compulsory in every seat and on every trip: most accidents happen close to home.', 'El cinturó és obligatori a tots els seients i a tots els trajectes: la majoria d’accidents passen a prop de casa.')),
  C('👶', T('Un niño de 6 años que mide 1,15 m va a viajar en coche.', 'A 6-year-old who is 1.15 m tall is going to travel by car.', 'Un nen de 6 anys que fa 1,15 m viatjarà en cotxe.'),
    T('En una silla o un alzador homologado', 'In an approved child seat or booster', 'En una cadira o un alçador homologat'),
    [T('Con el cinturón normal, como un adulto', 'With the normal seatbelt, like an adult', 'Amb el cinturó normal, com un adult'), T('En brazos de un adulto', 'On an adult’s lap', 'En braços d’un adult'), T('Sin nada si el viaje es corto', 'With nothing if the trip is short', 'Sense res si el viatge és curt')],
    T('Por debajo de 1,35 m es obligatorio un sistema de retención infantil homologado: el cinturón de adulto le quedaría en el cuello.', 'Under 1.35 m an approved child restraint is compulsory: an adult belt would sit across their neck.', 'Per sota d’1,35 m és obligatori un sistema de retenció infantil homologat: el cinturó d’adult li quedaria al coll.')),
  C('🚲', T('Vas a volver a casa en bici y ya es de noche.', 'You are cycling home and it is already dark.', 'Tornes a casa amb bici i ja és de nit.'),
    T('Enciendo la luz delantera y la trasera y llevo algo reflectante', 'I switch on front and rear lights and wear something reflective', 'Encenc el llum de davant i el de darrere i porto alguna cosa reflectant'),
    [T('Voy por la acera, que es más seguro', 'I ride on the pavement, it is safer', 'Vaig per la vorera, que és més segur'), T('Voy rápido para llegar antes', 'I ride fast to get home sooner', 'Vaig ràpid per arribar abans'), T('Me pongo ropa oscura para no deslumbrar', 'I wear dark clothes so as not to dazzle anyone', 'Em poso roba fosca per no enlluernar')],
    T('De noche la bici tiene que llevar luces: no se trata de ver, sino de que te vean.', 'At night a bike must have lights: it is not about seeing, but being seen.', 'De nit la bici ha de portar llums: no es tracta de veure-hi, sinó que et vegin.')),
  C('🛣️', T('En bici, ¿por qué lado de la calzada circulas?', 'On a bike, which side of the road do you ride on?', 'En bici, per quin costat de la calçada circules?'),
    T('Por la derecha, en el mismo sentido que los coches', 'On the right, in the same direction as the cars', 'Per la dreta, en el mateix sentit que els cotxes'),
    [T('Por la izquierda, de frente a los coches', 'On the left, facing the cars', 'Per l’esquerra, de cara als cotxes'), T('Por el centro, para que me vean', 'In the middle, so they can see me', 'Pel centre, perquè em vegin'), T('Por donde haya menos tráfico en cada momento', 'Wherever there is less traffic', 'Per on hi hagi menys trànsit a cada moment')],
    T('La bici es un vehículo y va con el tráfico, por la derecha. El peatón sin acera, en cambio, va por la izquierda para ver venir los coches.', 'A bike is a vehicle and goes with the traffic, on the right. A pedestrian with no pavement walks on the left to see the cars coming.', 'La bici és un vehicle i va amb el trànsit, per la dreta. El vianant sense vorera, en canvi, va per l’esquerra per veure venir els cotxes.')),
  C('🚶', T('Caminas por una carretera que no tiene acera.', 'You are walking along a road with no pavement.', 'Camines per una carretera que no té vorera.'),
    T('Por la izquierda, de frente a los coches que vienen', 'On the left, facing the oncoming cars', 'Per l’esquerra, de cara als cotxes que vénen'),
    [T('Por la derecha, de espaldas al tráfico', 'On the right, with my back to the traffic', 'Per la dreta, d’esquena al trànsit'), T('Por el centro de la carretera', 'In the middle of the road', 'Pel centre de la carretera'), T('Por cualquier lado, con cuidado', 'Either side, carefully', 'Per qualsevol costat, amb compte')],
    T('Así ves venir los coches y puedes apartarte a tiempo.', 'That way you see the cars coming and can step aside in time.', 'Així veus venir els cotxes i et pots apartar a temps.')),
  C('🎧', T('Llevas auriculares con música y vas a cruzar.', 'You are wearing headphones with music and about to cross.', 'Portes auriculars amb música i vas a creuar.'),
    T('Me los quito o bajo el volumen para oír el tráfico', 'I take them off or turn it down to hear the traffic', 'Me’ls trec o abaixo el volum per sentir el trànsit'),
    [T('Subo el volumen y cruzo rápido', 'I turn it up and cross quickly', 'Pujo el volum i creuo ràpid'), T('No pasa nada si miro bien', 'It is fine if I look carefully', 'No passa res si miro bé'), T('Cruzo detrás de otra persona sin mirar', 'I cross behind someone else without looking', 'Creuo darrere d’una altra persona sense mirar')],
    T('Al cruzar, el oído avisa de lo que no ves: un coche que da marcha atrás, una moto, una sirena.', 'When crossing, your ears warn you of what you cannot see: a reversing car, a motorbike, a siren.', 'En creuar, l’oïda avisa del que no veus: un cotxe que fa marxa enrere, una moto, una sirena.')),
  C('🛴', T('Vas en patinete eléctrico por la ciudad.', 'You are riding an e-scooter in town.', 'Vas amb patinet elèctric per la ciutat.'),
    T('Voy por la calzada o el carril bici, nunca por la acera', 'I ride on the road or the cycle lane, never on the pavement', 'Vaig per la calçada o el carril bici, mai per la vorera'),
    [T('Voy por la acera, que es más segura', 'I ride on the pavement, it is safer', 'Vaig per la vorera, que és més segura'), T('Llevo a un amigo de pie conmigo', 'I carry a friend standing with me', 'Porto un amic dret amb mi'), T('Voy por donde haya hueco, también por pasos de peatones', 'I go wherever there is space, including zebra crossings', 'Vaig per on hi hagi lloc, també pels passos de vianants')],
    T('Los patinetes eléctricos no pueden circular por las aceras ni llevar pasajero: son vehículos.', 'E-scooters may not be ridden on pavements or carry a passenger: they are vehicles.', 'Els patinets elèctrics no poden circular per les voreres ni portar passatger: són vehicles.')),
  C('🚌', T('Te bajas del autobús y tienes que cruzar la calle.', 'You get off the bus and need to cross the road.', 'Baixes de l’autobús i has de creuar el carrer.'),
    T('Espero a que el autobús se vaya para ver bien la calle', 'I wait for the bus to leave so I can see the road properly', 'Espero que l’autobús se’n vagi per veure bé el carrer'),
    [T('Cruzo por delante del autobús enseguida', 'I cross in front of the bus straight away', 'Creuo per davant de l’autobús de seguida'), T('Cruzo por detrás del autobús parado', 'I cross behind the stopped bus', 'Creuo per darrere de l’autobús aturat'), T('Corro para no perder a mis amigos', 'I run so I do not lose my friends', 'Corro per no perdre els meus amics')],
    T('El autobús parado tapa a los coches que vienen y a ti: espera a que se vaya.', 'The stopped bus hides the oncoming cars from you, and you from them: wait for it to leave.', 'L’autobús aturat amaga els cotxes que vénen i a tu: espera que se’n vagi.')),
  C('🦓', T('Vas a cruzar por un paso de cebra sin semáforo.', 'You are about to use a zebra crossing with no lights.', 'Vas a creuar per un pas de zebra sense semàfor.'),
    T('Me aseguro de que los coches me han visto y se paran', 'I make sure the cars have seen me and are stopping', 'M’asseguro que els cotxes m’han vist i s’aturen'),
    [T('Cruzo sin mirar: en el paso de cebra tengo prioridad', 'I cross without looking: I have priority on the zebra', 'Creuo sense mirar: al pas de zebra tinc prioritat'), T('Cruzo corriendo justo cuando llega un coche', 'I run across just as a car arrives', 'Creuo corrent just quan arriba un cotxe'), T('Espero a que no haya ningún coche en toda la calle', 'I wait until there are no cars on the whole street', 'Espero que no hi hagi cap cotxe en tot el carrer')],
    T('Tienes prioridad, pero el conductor tiene que verte a tiempo: el contacto visual es tu seguro.', 'You have priority, but the driver needs to see you in time: eye contact is your insurance.', 'Tens prioritat, però el conductor t’ha de veure a temps: el contacte visual és la teva assegurança.')),
]

export const NIVELES = {
  facil:   { tipos: ['significado', 'significado', 'tipo'] },
  medio:   { tipos: ['significado', 'tipo', 'situacion', 'situacion'] },
  dificil: { tipos: ['significado', 'significado', 'tipo', 'situacion'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    const tema = r.senal ?? `sit${r.caso}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel, tipo }
  if (tipo === 'situacion') {
    const k = Math.floor(rand() * SITUACIONES.length)
    return { ...base, caso: k, bueno: 'ok', opciones: baraja(rand, ['ok', 'm0', 'm1', 'm2']) }
  }
  // En difícil, sobre todo las señales que tienen pareja con la que se confunden.
  const pool = nivel === 'facil' ? SENALES.filter(x => FACILES.includes(x.id)) : nivel === 'dificil' && rand() < 0.7 ? SENALES.filter(x => x.pareja) : SENALES
  const sn = elige(rand, pool)
  if (tipo === 'tipo') {
    const otros = baraja(rand, Object.keys(TIPOS).filter(t => t !== sn.tipo)).slice(0, 3)
    return { ...base, senal: sn.id, bueno: sn.tipo, opciones: baraja(rand, [sn.tipo, ...otros]) }
  }
  const pareja = sn.pareja && nivel !== 'facil' ? [sn.pareja] : []
  const resto = baraja(rand, SENALES.filter(x => x.id !== sn.id && !pareja.includes(x.id)).map(x => x.id))
  return { ...base, senal: sn.id, bueno: sn.id, opciones: baraja(rand, [sn.id, ...pareja, ...resto].slice(0, 4)) }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
export function textoOpcion(o, r, l) {
  if (r.tipo === 'tipo') return tx(TIPOS[o].nombre, l)
  if (r.tipo === 'situacion') {
    const c = SITUACIONES[r.caso]
    return tx(o === 'ok' ? c.ok : c.mal[+o.slice(1)], l)
  }
  return tx(senal(o).sig, l)
}
export function enunciado(r, l) {
  if (r.tipo === 'tipo') return s(l, '¿De qué tipo es esta señal?', 'What type of sign is this?', 'De quin tipus és aquest senyal?')
  if (r.tipo === 'situacion') return s(l, '¿Qué es lo seguro?', 'What is the safe thing to do?', 'Què és el segur?')
  return s(l, '¿Qué significa esta señal?', 'What does this sign mean?', 'Què vol dir aquest senyal?')
}
export function explicacion(r, l) {
  if (r.tipo === 'situacion') return tx(SITUACIONES[r.caso].porque, l)
  const sn = senal(r.senal)
  const base = `${tx(sn.sig, l)}. ${tx(TIPOS[sn.tipo].forma, l)}`
  if (sn.pareja && r.tipo === 'significado') {
    const p = senal(sn.pareja)
    return base + ' ' + s(l, `No la confundas con «${tx(p.sig, l)}».`, `Do not confuse it with “${tx(p.sig, l)}”.`, `No la confonguis amb «${tx(p.sig, l)}».`)
  }
  return base
}
export function schemaQuestion(r, l) {
  const q = r.tipo === 'situacion' ? `${tx(SITUACIONES[r.caso].sit, l)} ` : `${tx(TIPOS[senal(r.senal).tipo].forma, l)} `
  return {
    question: `${q}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
