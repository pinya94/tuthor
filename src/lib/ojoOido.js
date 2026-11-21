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
//
// Ciencia (revisión 21-nov-2026): la luz NO viaja por el nervio óptico. En la
// retina se convierte en señales nerviosas, y son ellas las que van al
// cerebro. Igual en el oído: el sonido pasa a vibración en el tímpano y la
// vibración a señal nerviosa en la cóclea. Los textos distinguen luz,
// vibración y señal; las respuestas y RUTAS no cambian.

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
    fun: T('tiene los conos y los bastones, que captan la luz y la convierten en señales nerviosas', 'contains the rods and cones, which detect light and turn it into nerve signals', 'té els cons i els bastons, que capten la llum i la converteixen en senyals nerviosos') },
  'nervio-optico': { organo: 'ojo', nom: T('Nervio óptico', 'Optic nerve', 'Nervi òptic'), art: T('el nervio óptico', 'the optic nerve', 'el nervi òptic'),
    fun: T('lleva las señales nerviosas de la retina al cerebro', 'carries nerve signals from the retina to the brain', 'porta els senyals nerviosos de la retina al cervell') },
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
    fun: T('tiene forma de caracol y convierte las vibraciones en señales nerviosas', 'is snail-shaped and turns vibrations into nerve signals', 'té forma de cargol i converteix les vibracions en senyals nerviosos') },
  canales: { organo: 'oido', nom: T('Canales semicirculares', 'Semicircular canals', 'Canals semicirculars'), art: T('los canales semicirculares', 'the semicircular canals', 'els canals semicirculars'),
    fun: T('se encarga del equilibrio, no de oír', 'controls balance, not hearing', 's’encarrega de l’equilibri, no de sentir-hi'),
    def: T('Los canales semicirculares se encargan del equilibrio, no de oír.', 'The semicircular canals control balance, not hearing.', 'Els canals semicirculars s’encarreguen de l’equilibri, no de sentir-hi.') },
  trompa: { organo: 'oido', nom: T('Trompa de Eustaquio', 'Eustachian tube', 'Trompa d’Eustaqui'), art: T('la trompa de Eustaquio', 'the Eustachian tube', 'la trompa d’Eustaqui'),
    fun: T('comunica el oído medio con la garganta e iguala la presión', 'connects the middle ear to the throat and equalises the pressure', 'comunica l’orella mitjana amb la gola i iguala la pressió') },
  'nervio-auditivo': { organo: 'oido', nom: T('Nervio auditivo', 'Auditory nerve', 'Nervi auditiu'), art: T('el nervio auditivo', 'the auditory nerve', 'el nervi auditiu'),
    fun: T('lleva las señales nerviosas de la cóclea al cerebro', 'carries nerve signals from the cochlea to the brain', 'porta els senyals nerviosos de la còclea al cervell') },
}

export const RUTAS = {
  ojo: ['cornea', 'pupila', 'cristalino', 'retina', 'nervio-optico'],
  oido: ['pabellon', 'conducto', 'timpano', 'huesecillos', 'coclea', 'nervio-auditivo'],
}
export const NIVELES = { facil: {}, medio: {}, dificil: {} }

// Tiempo de partida (21-nov-2026, a petición del usuario): MENOS de lo que
// cuesta una vuelta, para que siempre se acabe perdiendo. Una vuelta = ~5 s
// por pregunta distinta del nivel (fácil y medio: 15 partes → 75 s; difícil:
// 11 «¿adónde llega después?» ×5 + 2 recorridos ×15 → 85 s). Se da un 55 %
// de eso, redondeado a 5 s (40 s y 45 s), y cada acierto suma solo 1 s.
// «Una vez hecho todo, no tiene sentido seguir dando vueltas.»
export const SEG_POR_RESPUESTA = 5
export const SEG_POR_RECORRIDO = 15
export const SEG_POR_ACIERTO = 1
export function tiempoVuelta(nivel) {
  if (nivel === 'dificil') {
    const pasos = Object.values(RUTAS).reduce((n, r) => n + r.length, 0)
    return pasos * SEG_POR_RESPUESTA + Object.keys(RUTAS).length * SEG_POR_RECORRIDO
  }
  return Object.keys(PARTES).length * SEG_POR_RESPUESTA
}
export const tiempoPartida = nivel => Math.round((tiempoVuelta(nivel) * 0.55) / 5) * 5
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

// «¿Adónde llega después?» cuando lo que viaja ya no es luz (o sonido) sino
// vibración o señal nerviosa. El resto del ojo usa el texto general de la luz.
const DESPUES = {
  retina: T('En la retina, la luz se convierte en señales nerviosas. ¿Por dónde viajan esas señales hasta el cerebro?', 'In the retina, light is turned into nerve signals. Which way do those signals travel to the brain?', 'A la retina, la llum es converteix en senyals nerviosos. Per on viatgen aquests senyals fins al cervell?'),
  pabellon: T('El sonido acaba de entrar por el pabellón auditivo. ¿Por dónde sigue?', 'Sound has just entered through the pinna. Where does it go next?', 'El so acaba d’entrar pel pavelló auditiu. Per on continua?'),
  conducto: T('El sonido llega al final del conducto auditivo. ¿Qué parte hace vibrar?', 'Sound reaches the end of the ear canal. Which part does it make vibrate?', 'El so arriba al final del conducte auditiu. Quina part fa vibrar?'),
  timpano: T('El tímpano vibra. ¿Qué parte lleva esa vibración hacia dentro?', 'The eardrum vibrates. Which part carries that vibration further in?', 'El timpà vibra. Quina part porta aquesta vibració cap a dins?'),
  huesecillos: T('Los huesecillos transmiten la vibración. ¿Adónde llega después?', 'The ossicles pass on the vibration. Where does it go next?', 'Els ossets transmeten la vibració. On arriba després?'),
  coclea: T('En la cóclea, la vibración se convierte en señales nerviosas. ¿Por dónde viajan esas señales hasta el cerebro?', 'In the cochlea, the vibration is turned into nerve signals. Which way do those signals travel to the brain?', 'A la còclea, la vibració es converteix en senyals nerviosos. Per on viatgen aquests senyals fins al cervell?'),
}

export function enunciado(r, l) {
  if (r.tipo === 'nombre') return s(l, `Toca: ${nom(r.objetivo, l)}`, `Tap: ${nom(r.objetivo, l)}`, `Toca: ${nom(r.objetivo, l)}`)
  if (r.tipo === 'funcion') return s(l, `Toca la parte que ${PARTES[r.objetivo].fun.es}`, `Tap the part that ${PARTES[r.objetivo].fun.en}`, `Toca la part que ${PARTES[r.objetivo].fun.ca}`)
  const luz = r.organo === 'ojo'
  if (r.tipo === 'ruta') return luz
    ? s(l, 'Toca en orden el recorrido: por dónde pasa la luz hasta la retina y por dónde viaja después la señal nerviosa hasta el cerebro', 'Tap, in order, the path: where light travels until it reaches the retina, and where the nerve signal then travels to the brain', 'Toca en ordre el recorregut: per on passa la llum fins a la retina i per on viatja després el senyal nerviós fins al cervell')
    : s(l, 'Toca en orden el recorrido: por dónde pasa el sonido (y después la vibración) hasta la cóclea y por dónde viaja la señal nerviosa hasta el cerebro', 'Tap, in order, the path: where sound (and then the vibration) travels to the cochlea, and where the nerve signal travels to the brain', 'Toca en ordre el recorregut: per on passa el so (i després la vibració) fins a la còclea i per on viatja el senyal nerviós fins al cervell')
  if (!r.tras) return luz
    ? s(l, '¿Qué es lo primero que atraviesa la luz al entrar en el ojo?', 'What is the first part light passes through as it enters the eye?', 'Què és el primer que travessa la llum en entrar a l’ull?')
    : s(l, '¿Qué parte recoge primero el sonido?', 'Which part collects the sound first?', 'Quina part recull primer el so?')
  const paso = DESPUES[r.tras]
  if (paso) return paso[l]
  return s(l, `La luz acaba de pasar por ${art(r.tras, l)}. ¿Adónde llega después?`, `Light has just passed through ${art(r.tras, l)}. Where does it go next?`, `La llum acaba de passar per ${art(r.tras, l)}. On arriba després?`)
}

export function recorrido(organo, l) {
  return RUTAS[organo].map(p => nom(p, l).replace(/ \(.*\)$/, '')).join(' → ')
}
// El camino explicado: dónde se convierte en señal nerviosa y que acaba en el cerebro
const CAMBIO = {
  ojo: { en: 'retina', txt: T('aquí la luz se convierte en señal nerviosa', 'here light becomes a nerve signal', 'aquí la llum es converteix en senyal nerviós') },
  oido: { en: 'coclea', txt: T('aquí la vibración se convierte en señal nerviosa', 'here the vibration becomes a nerve signal', 'aquí la vibració es converteix en senyal nerviós') },
}
export function caminoExplicado(organo, l) {
  const { en, txt } = CAMBIO[organo]
  const partes = RUTAS[organo].map(p => { const n = nom(p, l).replace(/ \(.*\)$/, ''); return p === en ? `${n} (${txt[l]})` : n })
  return [...partes, s(l, 'cerebro', 'brain', 'cervell')].join(' → ')
}
export function explicacion(r, l) {
  const nota = r.organo === 'ojo'
    ? s(l, 'Entre la córnea y el cristalino la luz cruza el humor acuoso (la pupila es el hueco del iris), y entre el cristalino y la retina, el humor vítreo.', 'Between the cornea and the lens, light crosses the aqueous humour (the pupil is the opening in the iris); between the lens and the retina, the vitreous humour.', 'Entre la còrnia i el cristal·lí la llum travessa l’humor aquós (la pupil·la és el forat de l’iris), i entre el cristal·lí i la retina, l’humor vitri.')
    : s(l, 'El oído externo recoge el sonido, el medio lo transmite como vibración y el interno lo convierte en señales nerviosas.', 'The outer ear collects the sound, the middle ear passes it on as vibration and the inner ear turns it into nerve signals.', 'L’orella externa recull el so, la mitjana el transmet com a vibració i la interna el converteix en senyals nerviosos.')
  const camino = `${s(l, 'Camino', 'Path', 'Camí')}: ${caminoExplicado(r.organo, l)}.`
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
