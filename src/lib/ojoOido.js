// Ojo y Oído: los órganos de la vista y del oído dibujados en corte, para
// tocar sus partes.
//
//   facil    «Toca la pupila»: cada parte por su nombre
//   medio    «Toca la parte que enfoca la imagen»: cada parte por su función
//   dificil  el recorrido de la luz o del sonido, en orden, y «¿adónde llega
//            después?»
//
// Las funciones están redactadas para que solo una parte encaje (la córnea
// también desvía la luz, así que «enfocar cambiando de forma» es solo del
// cristalino). Los humores acuoso y vítreo no se tocan: el recorrido va
// córnea → pupila → cristalino → retina → nervio óptico, y la explicación
// los menciona, para no contradecir al libro que los incluye.

const T = (es, en, ca) => ({ es, en, ca })

export const PARTES = {
  // ── Ojo ──
  cornea: { organo: 'ojo', nom: T('Córnea', 'Cornea', 'Còrnia'), art: T('la córnea', 'the cornea', 'la còrnia'),
    fun: T('es la capa transparente de delante, la primera que atraviesa la luz', 'is the clear layer at the front, the first thing light passes through', 'és la capa transparent del davant, la primera que travessa la llum') },
  iris: { organo: 'ojo', nom: T('Iris', 'Iris', 'Iris'), art: T('el iris', 'the iris', 'l’iris'),
    fun: T('es la parte de color, que abre o cierra la pupila según la luz', 'is the coloured part, which opens or closes the pupil depending on the light', 'és la part de color, que obre o tanca la pupil·la segons la llum') },
  pupila: { organo: 'ojo', nom: T('Pupila', 'Pupil', 'Pupil·la'), art: T('la pupila', 'the pupil', 'la pupil·la'),
    fun: T('es el orificio por el que la luz entra al interior del ojo', 'is the opening through which light enters the eye', 'és l’orifici per on la llum entra a l’interior de l’ull') },
  cristalino: { organo: 'ojo', nom: T('Cristalino', 'Lens', 'Cristal·lí'), art: T('el cristalino', 'the lens', 'el cristal·lí'),
    fun: T('es la lente que cambia de forma para enfocar la imagen', 'is the lens that changes shape to focus the image', 'és la lent que canvia de forma per enfocar la imatge') },
  retina: { organo: 'ojo', nom: T('Retina', 'Retina', 'Retina'), art: T('la retina', 'the retina', 'la retina'),
    fun: T('tiene los conos y los bastones, las células que captan la luz', 'contains the rods and cones, the cells that detect light', 'té els cons i els bastons, les cèl·lules que capten la llum') },
  'nervio-optico': { organo: 'ojo', nom: T('Nervio óptico', 'Optic nerve', 'Nervi òptic'), art: T('el nervio óptico', 'the optic nerve', 'el nervi òptic'),
    fun: T('lleva la información de la retina al cerebro', 'carries information from the retina to the brain', 'porta la informació de la retina al cervell') },
  esclerotica: { organo: 'ojo', nom: T('Esclerótica', 'Sclera', 'Escleròtica'), art: T('la esclerótica', 'the sclera', 'l’escleròtica'),
    fun: T('es la capa blanca y resistente que protege el ojo', 'is the tough white layer that protects the eye', 'és la capa blanca i resistent que protegeix l’ull') },
  // ── Oído ──
  pabellon: { organo: 'oido', nom: T('Pabellón auditivo', 'Pinna (outer ear)', 'Pavelló auditiu'), art: T('el pabellón auditivo', 'the pinna', 'el pavelló auditiu'),
    fun: T('recoge las ondas sonoras del exterior', 'collects sound waves from outside', 'recull les ones sonores de l’exterior') },
  conducto: { organo: 'oido', nom: T('Conducto auditivo', 'Ear canal', 'Conducte auditiu'), art: T('el conducto auditivo', 'the ear canal', 'el conducte auditiu'),
    fun: T('lleva el sonido desde fuera hasta el tímpano', 'carries sound from outside to the eardrum', 'porta el so des de fora fins al timpà') },
  timpano: { organo: 'oido', nom: T('Tímpano', 'Eardrum', 'Timpà'), art: T('el tímpano', 'the eardrum', 'el timpà'),
    fun: T('es la membrana que vibra cuando le llega el sonido', 'is the membrane that vibrates when sound reaches it', 'és la membrana que vibra quan li arriba el so') },
  huesecillos: { organo: 'oido', nom: T('Huesecillos (martillo, yunque y estribo)', 'Ossicles (hammer, anvil and stirrup)', 'Ossets (martell, enclusa i estrep)'), art: T('los huesecillos', 'the ossicles', 'els ossets'),
    fun: T('pasa la vibración del tímpano al oído interno', 'passes the vibration from the eardrum to the inner ear', 'passa la vibració del timpà a l’orella interna'),
    def: T('Los huesecillos (martillo, yunque y estribo) son los tres huesos más pequeños del cuerpo y pasan la vibración del tímpano al oído interno.', 'The ossicles (hammer, anvil and stirrup) are the three smallest bones in the body and pass the vibration from the eardrum to the inner ear.', 'Els ossets (martell, enclusa i estrep) són els tres ossos més petits del cos i passen la vibració del timpà a l’orella interna.') },
  coclea: { organo: 'oido', nom: T('Cóclea (caracol)', 'Cochlea', 'Còclea (cargol)'), art: T('la cóclea', 'the cochlea', 'la còclea'),
    fun: T('tiene forma de caracol y convierte las vibraciones en impulsos nerviosos', 'is snail-shaped and turns vibrations into nerve impulses', 'té forma de cargol i converteix les vibracions en impulsos nerviosos') },
  canales: { organo: 'oido', nom: T('Canales semicirculares', 'Semicircular canals', 'Canals semicirculars'), art: T('los canales semicirculares', 'the semicircular canals', 'els canals semicirculars'),
    fun: T('se encarga del equilibrio, no de oír', 'controls balance, not hearing', 's’encarrega de l’equilibri, no de sentir-hi'),
    def: T('Los canales semicirculares se encargan del equilibrio, no de oír.', 'The semicircular canals control balance, not hearing.', 'Els canals semicirculars s’encarreguen de l’equilibri, no de sentir-hi.') },
  trompa: { organo: 'oido', nom: T('Trompa de Eustaquio', 'Eustachian tube', 'Trompa d’Eustaqui'), art: T('la trompa de Eustaquio', 'the Eustachian tube', 'la trompa d’Eustaqui'),
    fun: T('comunica el oído medio con la garganta e iguala la presión', 'connects the middle ear to the throat and equalises the pressure', 'comunica l’orella mitjana amb la gola i iguala la pressió') },
  'nervio-auditivo': { organo: 'oido', nom: T('Nervio auditivo', 'Auditory nerve', 'Nervi auditiu'), art: T('el nervio auditivo', 'the auditory nerve', 'el nervi auditiu'),
    fun: T('lleva la información del oído al cerebro', 'carries information from the ear to the brain', 'porta la informació de l’orella al cervell') },
}

export const RUTAS = {
  ojo: ['cornea', 'pupila', 'cristalino', 'retina', 'nervio-optico'],
  oido: ['pabellon', 'conducto', 'timpano', 'huesecillos', 'coclea', 'nervio-auditivo'],
}
export const NIVELES = { facil: {}, medio: {}, dificil: {} }
export const partesDe = organo => Object.keys(PARTES).filter(k => PARTES[k].organo === organo)

const elige = (rand, arr) => arr[Math.floor(rand() * arr.length)]
const recientes = []

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  for (let k = 0; k < 30; k++) {
    const organo = rand() < 0.5 ? 'ojo' : 'oido'
    let r
    if (nivel === 'dificil') {
      if (rand() < 0.35) r = { tipo: 'ruta', organo, ruta: RUTAS[organo] }
      else {
        const i = Math.floor(rand() * RUTAS[organo].length) // 0 = «¿qué es lo primero?»
        r = { tipo: 'siguiente', organo, tras: i === 0 ? null : RUTAS[organo][i - 1], objetivo: RUTAS[organo][i] }
      }
    } else {
      r = { tipo: nivel === 'facil' ? 'nombre' : 'funcion', organo, objetivo: elige(rand, partesDe(organo)) }
    }
    const id = `${nivel}:${r.tipo}:${r.organo}:${r.objetivo ?? 'ruta'}:${r.tras ?? ''}`
    if (recientes.includes(id) && k < 29) continue
    recientes.push(id); if (recientes.length > 6) recientes.shift()
    return { id, nivel, ...r }
  }
  throw new Error('ojo-y-oido: no se pudo generar')
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Respuesta: id de la parte tocada, o array de ids en el recorrido
export function esCorrecta(r, x) {
  if (r.tipo === 'ruta') return Array.isArray(x) && x.length === r.ruta.length && x.every((p, i) => p === r.ruta[i])
  return x === r.objetivo
}

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const nom = (id, l) => PARTES[id].nom[l]
const art = (id, l) => PARTES[id].art[l]
const cap = t => t.charAt(0).toUpperCase() + t.slice(1)

export function enunciado(r, l) {
  if (r.tipo === 'nombre') return s(l, `Toca: ${nom(r.objetivo, l)}`, `Tap: ${nom(r.objetivo, l)}`, `Toca: ${nom(r.objetivo, l)}`)
  if (r.tipo === 'funcion') return s(l, `Toca la parte que ${PARTES[r.objetivo].fun.es}`, `Tap the part that ${PARTES[r.objetivo].fun.en}`, `Toca la part que ${PARTES[r.objetivo].fun.ca}`)
  const luz = r.organo === 'ojo'
  if (r.tipo === 'ruta') return luz
    ? s(l, 'Toca en orden las partes por las que pasa la luz, hasta el cerebro', 'Tap, in order, the parts light passes through on its way to the brain', 'Toca en ordre les parts per on passa la llum, fins al cervell')
    : s(l, 'Toca en orden las partes por las que pasa el sonido, hasta el cerebro', 'Tap, in order, the parts sound passes through on its way to the brain', 'Toca en ordre les parts per on passa el so, fins al cervell')
  if (!r.tras) return luz
    ? s(l, '¿Qué es lo primero que atraviesa la luz al entrar en el ojo?', 'What is the first part light passes through as it enters the eye?', 'Què és el primer que travessa la llum en entrar a l’ull?')
    : s(l, '¿Qué parte recoge primero el sonido?', 'Which part collects the sound first?', 'Quina part recull primer el so?')
  return luz
    ? s(l, `La luz acaba de pasar por ${art(r.tras, l)}. ¿Adónde llega después?`, `Light has just passed through ${art(r.tras, l)}. Where does it go next?`, `La llum acaba de passar per ${art(r.tras, l)}. On arriba després?`)
    : s(l, `El sonido acaba de pasar por ${art(r.tras, l)}. ¿Adónde llega después?`, `Sound has just passed through ${art(r.tras, l)}. Where does it go next?`, `El so acaba de passar per ${art(r.tras, l)}. On arriba després?`)
}

export function recorrido(organo, l) {
  return RUTAS[organo].map(p => nom(p, l).replace(/ \(.*\)$/, '')).join(' → ')
}
export function explicacion(r, l) {
  const nota = r.organo === 'ojo'
    ? s(l, 'Entre la córnea y la pupila la luz cruza el humor acuoso, y entre el cristalino y la retina, el humor vítreo.', 'Between the cornea and the pupil, light crosses the aqueous humour; between the lens and the retina, the vitreous humour.', 'Entre la còrnia i la pupil·la la llum travessa l’humor aquós, i entre el cristal·lí i la retina, l’humor vitri.')
    : s(l, 'El oído externo recoge el sonido, el medio lo transmite como vibración y el interno lo convierte en impulsos.', 'The outer ear collects the sound, the middle ear passes it on as vibration and the inner ear turns it into impulses.', 'L’orella externa recull el so, la mitjana el transmet com a vibració i la interna el converteix en impulsos.')
  const camino = `${r.organo === 'ojo' ? s(l, 'Camino de la luz', 'Path of light', 'Camí de la llum') : s(l, 'Camino del sonido', 'Path of sound', 'Camí del so')}: ${recorrido(r.organo, l)}.`
  if (r.tipo === 'ruta') return `${camino} ${nota}`
  const o = r.objetivo
  const def = PARTES[o].def?.[l] ?? `${cap(art(o, l))} ${PARTES[o].fun[l]}.`
  return r.tipo === 'siguiente' ? `${def} ${camino}` : def
}

export function schemaQuestion(r, l) {
  if (r.tipo === 'ruta') {
    const buena = recorrido(r.organo, l)
    const ids = RUTAS[r.organo]
    const cambia = (i, j) => { const a = [...ids]; [a[i], a[j]] = [a[j], a[i]]; return a.map(p => nom(p, l).replace(/ \(.*\)$/, '')).join(' → ') }
    return { question: enunciado(r, l), correctAnswer: buena, wrongAnswers: [cambia(0, 1), cambia(1, 2), cambia(2, 3)] }
  }
  const otras = partesDe(r.organo).filter(p => p !== r.objetivo)
  return { question: enunciado(r, l), correctAnswer: nom(r.objetivo, l), wrongAnswers: otras.slice(0, 3).map(p => nom(p, l)) }
}
