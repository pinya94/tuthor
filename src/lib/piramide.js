// Pirámide de población (geografía humana, primaria y ESO): una pirámide
// dibujada (hombres a la izquierda, mujeres a la derecha, grupos de 5 años) y
// preguntas para leerla.
//
// Las pirámides se GENERAN a partir de las tres formas de libro (progresiva,
// estacionaria, regresiva) más un rasgo opcional (hueco, baby boom,
// inmigración masculina): no son datos de un país concreto, así que no
// pueden quedarse anticuados ni estar mal.
//
// Tipos de pregunta:
//   tipo     progresiva / estacionaria / regresiva
//   grupo    qué grupo de edad tiene más población
//   sexo     en tal franja, ¿más hombres, más mujeres o casi igual?
//   rasgo    qué explica la marca señalada (hueco, boom, inmigración, longevidad)
//   cuando   en qué años nacieron los del grupo señalado
//
// Niveles: facil → tipo, grupo; medio → tipo, grupo, sexo; dificil → rasgo,
// cuando, tipo.

export const GRUPOS = 18 // 0-4 … 80-84, 85+
export const etiquetaGrupo = i => (i === GRUPOS - 1 ? '85+' : `${i * 5}-${i * 5 + 4}`)

export const TIPOS = ['progresiva', 'estacionaria', 'regresiva']
export const RASGOS = ['hueco', 'boom', 'inmigracion', 'longevidad']
export const NIVELES = {
  facil:   { tipos: ['tipo', 'grupo'] },
  medio:   { tipos: ['tipo', 'grupo', 'sexo'] },
  dificil: { tipos: ['rasgo', 'rasgo', 'cuando', 'tipo'] },
}
const CENSOS = [2000, 2010, 2020, 2024]

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)

// La forma base (sin sexos): un valor por grupo.
function forma(tipo, rand) {
  const v = []
  // La tasa se elige UNA vez por pirámide: elegida por grupo y elevada a la
  // edad, el ruido doblaba o partía en dos las barras de los mayores y salían
  // huecos y abultamientos falsos.
  const tasa = 0.8 + rand() * 0.05
  const pico = 8 + Math.floor(rand() * 3)
  for (let i = 0; i < GRUPOS; i++) {
    let x
    if (tipo === 'progresiva') x = Math.pow(tasa, i)
    else if (tipo === 'estacionaria') x = i < 11 ? 1 - i * 0.012 : Math.pow(0.78, i - 10) * 0.87
    else { // regresiva: base estrecha, máximo hacia los 40-54
      x = i <= pico ? 0.55 + (0.45 * i) / pico : Math.pow(0.8, i - pico)
    }
    v.push(x * (0.97 + rand() * 0.06))
  }
  return v
}

// Pirámide: { h: [..], m: [..] } con hombres y mujeres por grupo.
export function construir(tipo, rasgo, rand, k = null) {
  const v = forma(tipo, rand)
  const h = v.map(x => x * 1.02), m = v.map(x => x * 0.98)
  // Las mujeres viven más: a partir de los 60, cada vez más mujeres que hombres.
  for (let i = 12; i < GRUPOS; i++) { h[i] *= 1 - (i - 11) * 0.07; m[i] *= 1 + (i - 11) * 0.03 }
  if (rasgo === 'hueco') { h[k] *= 0.55; m[k] *= 0.55 }
  // Un solo grupo y bien marcado: si no, en una pirámide que ya baja no se distingue.
  if (rasgo === 'boom') { h[k] *= 1.55; m[k] *= 1.55 }
  if (rasgo === 'inmigracion') for (let i = 4; i <= 8; i++) h[i] *= 1.75
  return { h, m }
}

let seq = 0

// El generador de preguntas tipo test de antes: sigue dando la pirámide y el
// texto del schema (ver «Mecánicas» al final).
function genVieja(nivel, pregunta, rand) {
  for (;;) {
    const tipo = elige(rand, TIPOS)
    const base = { id: ++seq, nivel, pregunta, tipo, censo: elige(rand, CENSOS) }

    if (pregunta === 'tipo') {
      return { ...base, ...construir(tipo, null, rand), rasgo: null, bueno: tipo, opciones: TIPOS }
    }
    if (pregunta === 'grupo') {
      // Sin más, el mayor sería casi siempre 0-4 (progresiva): una de cada
      // cuatro es así y el resto lleva un abultamiento en edades medias.
      const conBoom = rand() < 0.75
      const kb = 3 + Math.floor(rand() * 9)
      const p = conBoom ? construir(elige(rand, ['estacionaria', 'regresiva']), 'boom', rand, kb) : construir('progresiva', null, rand)
      const tot = p.h.map((x, i) => x + p.m[i])
      const max = tot.indexOf(Math.max(...tot))
      // Que se vea a simple vista: el mayor supera al resto en un 6 % o más.
      if (tot.some((x, i) => i !== max && x > tot[max] / 1.06)) continue
      const otros = baraja(rand, [...Array(GRUPOS).keys()].filter(i => i !== max && Math.abs(i - max) > 1)).slice(0, 3)
      return { ...base, ...p, rasgo: null, bueno: max, opciones: [max, ...otros].sort((a, b) => a - b) }
    }
    if (pregunta === 'sexo') {
      // Tres franjas: los mayores (más mujeres), la edad de trabajar con
      // inmigración (más hombres) o sin ella (casi igual).
      const caso = elige(rand, ['mayores', 'inmigracion', 'igual'])
      const rasgo = caso === 'inmigracion' ? 'inmigracion' : null
      const p = construir(tipo, rasgo, rand)
      const franja = caso === 'mayores' ? [16, 17] : [5, 7]
      const bueno = caso === 'mayores' ? 'mujeres' : caso === 'inmigracion' ? 'hombres' : 'igual'
      return { ...base, ...p, rasgo, franja, bueno, opciones: ['hombres', 'mujeres', 'igual'] }
    }
    // rasgo / cuando: una marca sobre la pirámide.
    const rasgo = pregunta === 'cuando' ? elige(rand, ['hueco', 'boom']) : elige(rand, RASGOS)
    let k = null, marca
    if (rasgo === 'hueco' || rasgo === 'boom') { k = 2 + Math.floor(rand() * 13); marca = [k, k] }
    else if (rasgo === 'inmigracion') marca = [4, 8]
    else marca = [15, 17]
    if (rasgo === 'boom' && k > 11) continue // un boom tan antiguo apenas se vería ya
    const p = construir(tipo, rasgo === 'longevidad' ? null : rasgo, rand, k)
    if (pregunta === 'rasgo') return { ...base, ...p, rasgo, marca, bueno: rasgo, opciones: RASGOS }
    // cuando: años de nacimiento del grupo marcado.
    const a = k * 5
    const desde = base.censo - a - 4, hasta = base.censo - a
    const r = (d, hh) => `${d}-${hh}`
    const bueno = r(desde, hasta)
    // Errores típicos: un grupo de más o de menos, y contar el intervalo hacia
    // delante (de censo − edad a censo − edad + 4).
    const cand = [r(desde - 5, hasta - 5), r(desde + 5, hasta + 5), r(hasta, hasta + 4), r(desde - 10, hasta - 10)]
    const ops = [...new Set([bueno, ...cand])].filter(x => +x.split('-')[1] <= base.censo).slice(0, 4)
    if (ops.length < 4) continue
    return { ...base, ...p, rasgo, marca, bueno, opciones: ops.sort() }
  }
}


// ── Textos ───────────────────────────────────────────────────────────────
const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es

export const NOMBRE_TIPO = {
  progresiva: T('Progresiva (joven)', 'Expanding (young)', 'Progressiva (jove)'),
  estacionaria: T('Estacionaria (estable)', 'Stationary (stable)', 'Estacionària (estable)'),
  regresiva: T('Regresiva (envejecida)', 'Contracting (ageing)', 'Regressiva (envellida)'),
}
export const NOMBRE_RASGO = {
  hueco: T('Nacieron menos niños entonces (guerra o crisis)', 'Fewer babies were born then (war or crisis)', 'Van néixer menys nens llavors (guerra o crisi)'),
  boom: T('Nacieron muchos más niños entonces (baby boom)', 'Many more babies were born then (baby boom)', 'Van néixer molts més nens llavors (baby boom)'),
  inmigracion: T('Llegaron trabajadores inmigrantes, sobre todo hombres', 'Immigrant workers arrived, mostly men', 'Van arribar treballadors immigrants, sobretot homes'),
  longevidad: T('Las mujeres viven más años que los hombres', 'Women live longer than men', 'Les dones viuen més anys que els homes'),
}
const NOMBRE_SEXO = {
  hombres: T('Más hombres', 'More men', 'Més homes'),
  mujeres: T('Más mujeres', 'More women', 'Més dones'),
  igual: T('Casi igual', 'About the same', 'Gairebé igual'),
}

function textoOpcion(o, ronda, l) {
  switch (ronda.pregunta) {
    case 'tipo': return tx(NOMBRE_TIPO[o], l)
    case 'grupo': return `${etiquetaGrupo(o)} ${tx(T('años', 'years', 'anys'), l)}`
    case 'sexo': return tx(NOMBRE_SEXO[o], l)
    case 'rasgo': return tx(NOMBRE_RASGO[o], l)
    default: return o.replace('-', '–')
  }
}

function enunciadoViejo(ronda, l) {
  switch (ronda.pregunta) {
    case 'tipo': return tx(T('¿Qué tipo de pirámide es?', 'What type of pyramid is it?', 'Quin tipus de piràmide és?'), l)
    case 'grupo': return tx(T('¿Qué grupo de edad tiene más población?', 'Which age group has the most people?', 'Quin grup d’edat té més població?'), l)
    case 'sexo': {
      const f = `${etiquetaGrupo(ronda.franja[0]).split('-')[0]}–${ronda.franja[1] === GRUPOS - 1 ? '85+' : etiquetaGrupo(ronda.franja[1]).split('-')[1]}`
      return tx(T(`Entre los ${f} años, ¿hay más hombres o más mujeres?`, `Between ${f} years, are there more men or more women?`, `Entre els ${f} anys, hi ha més homes o més dones?`), l)
    }
    case 'rasgo': return tx(T('¿Qué explica lo señalado en la pirámide?', 'What explains the marked part of the pyramid?', 'Què explica el que s’assenyala a la piràmide?'), l)
    default: return tx(T(`Pirámide del año ${ronda.censo}. ¿En qué años nacieron los del grupo señalado?`, `Pyramid for ${ronda.censo}. In which years were the marked group born?`, `Piràmide de l’any ${ronda.censo}. En quins anys van néixer els del grup assenyalat?`), l)
  }
}

function explicacionVieja(ronda, l) {
  const r = ronda
  switch (r.pregunta) {
    case 'tipo': return tx({
      progresiva: T('Base ancha y cima estrecha: nacen muchos niños y pocos llegan a mayores. Es la pirámide de una población joven, típica de países con natalidad alta, como Níger.', 'Wide base and narrow top: many babies are born and few reach old age. It is the pyramid of a young population, typical of countries with a high birth rate, such as Niger.', 'Base ampla i cim estret: neixen molts nens i pocs arriben a grans. És la piràmide d’una població jove, típica de països amb natalitat alta, com el Níger.'),
      estacionaria: T('Barras parecidas hasta edades altas: natalidad y mortalidad bajas y estables. La población apenas crece ni envejece.', 'Similar bars up to older ages: low, stable birth and death rates. The population barely grows or ages.', 'Barres semblants fins a edats altes: natalitat i mortalitat baixes i estables. La població gairebé no creix ni envelleix.'),
      regresiva: T('La base es más estrecha que el centro: nacen pocos niños y se vive muchos años. Es una población envejecida, como la de España o Japón.', 'The base is narrower than the middle: few babies are born and people live long lives. It is an ageing population, like Spain’s or Japan’s.', 'La base és més estreta que el centre: neixen pocs nens i es viuen molts anys. És una població envellida, com la d’Espanya o el Japó.'),
    }[r.tipo], l)
    case 'grupo': return tx(T(`La barra más larga, sumando hombres y mujeres, es la de ${etiquetaGrupo(r.bueno)} años.`, `The longest bar, adding men and women, is ${etiquetaGrupo(r.bueno)} years.`, `La barra més llarga, sumant homes i dones, és la de ${etiquetaGrupo(r.bueno)} anys.`), l)
    case 'sexo': return tx({
      mujeres: T('Entre los mayores hay más mujeres: viven de media unos cinco años más que los hombres.', 'Among older people there are more women: on average they live about five years longer than men.', 'Entre la gent gran hi ha més dones: viuen de mitjana uns cinc anys més que els homes.'),
      hombres: T('La barra de los hombres sobresale en edad de trabajar: llegaron inmigrantes, sobre todo hombres. Pasa en países con mucha demanda de mano de obra, como los del golfo Pérsico.', 'The men’s bar sticks out at working age: immigrants arrived, mostly men. It happens in countries with high demand for labour, such as those in the Persian Gulf.', 'La barra dels homes sobresurt en edat de treballar: van arribar immigrants, sobretot homes. Passa en països amb molta demanda de mà d’obra, com els del golf Pèrsic.'),
      igual: T('A esas edades nacen y sobreviven casi tantos hombres como mujeres: las dos barras son casi iguales.', 'At those ages almost as many men as women are born and survive: the two bars are almost equal.', 'En aquestes edats neixen i sobreviuen gairebé tants homes com dones: les dues barres són gairebé iguals.'),
    }[r.bueno], l)
    case 'rasgo': return tx({
      hueco: T('Un entrante en un solo grupo: esa generación es más pequeña porque nacieron menos niños, por una guerra o una crisis. El hueco sube por la pirámide año tras año.', 'A dent in a single group: that generation is smaller because fewer babies were born, due to a war or a crisis. The gap moves up the pyramid year after year.', 'Un entrant en un sol grup: aquella generació és més petita perquè van néixer menys nens, per una guerra o una crisi. El buit puja per la piràmide any rere any.'),
      boom: T('Un abultamiento: esa generación es más grande porque hubo un baby boom. En España nacieron muchísimos niños entre finales de los 50 y mediados de los 70.', 'A bulge: that generation is bigger because there was a baby boom. In Spain a great many babies were born between the late 1950s and the mid-1970s.', 'Un abombament: aquella generació és més gran perquè hi va haver un baby boom. A Espanya van néixer moltíssims nens entre finals dels 50 i mitjan anys 70.'),
      inmigracion: T('Solo crecen los hombres de 20 a 44 años: llegaron trabajadores inmigrantes, en su mayoría hombres.', 'Only men aged 20 to 44 grow: immigrant workers arrived, mostly men.', 'Només creixen els homes de 20 a 44 anys: van arribar treballadors immigrants, la majoria homes.'),
      longevidad: T('En la cima las barras de las mujeres son más largas: las mujeres viven más años que los hombres.', 'At the top the women’s bars are longer: women live longer than men.', 'Al cim les barres de les dones són més llargues: les dones viuen més anys que els homes.'),
    }[r.rasgo], l)
    default: {
      const [d, h] = r.bueno.split('-')
      const a = r.marca[0] * 5
      return tx(T(`En ${r.censo}, quien tiene entre ${a} y ${a + 4} años nació entre ${d} y ${h}: ${r.censo} − ${a + 4} = ${d} y ${r.censo} − ${a} = ${h}.`, `In ${r.censo}, people aged ${a} to ${a + 4} were born between ${d} and ${h}: ${r.censo} − ${a + 4} = ${d} and ${r.censo} − ${a} = ${h}.`, `L’any ${r.censo}, qui té entre ${a} i ${a + 4} anys va néixer entre ${d} i ${h}: ${r.censo} − ${a + 4} = ${d} i ${r.censo} − ${a} = ${h}.`), l)
    }
  }
}

function schemaVieja(ronda, l) {
  // Sin el dibujo solo se entienden las de tipo (con la descripción de la forma).
  if (ronda.pregunta !== 'tipo') return null
  const forma = tx({
    progresiva: T('Base muy ancha que se estrecha deprisa hacia la cima.', 'A very wide base that narrows quickly towards the top.', 'Base molt ampla que s’estreny de pressa cap al cim.'),
    estacionaria: T('Barras parecidas desde la base hasta los 50 años, y luego se estrecha.', 'Similar bars from the base up to age 50, then it narrows.', 'Barres semblants des de la base fins als 50 anys, i després s’estreny.'),
    regresiva: T('Base más estrecha que el centro, que es la parte más ancha.', 'A base narrower than the middle, which is the widest part.', 'Base més estreta que el centre, que és la part més ampla.'),
  }[ronda.tipo], l)
  return {
    question: `${forma} ${enunciadoViejo(ronda, l)}`,
    correctAnswer: textoOpcion(ronda.bueno, ronda, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(o, ronda, l)),
  }
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Todo se responde tocando la pirámide (sus filas) o colocando pirámides:
//   mayor      tocar el grupo de edad con más población
//   anomalia   tocar el hueco (guerra o crisis) o el baby boom, sin marcar
//   nacidos    «pirámide de 2020: toca a los nacidos entre 1975 y 1979»
//   lado       tocar un grupo con muchos más hombres (inmigración) o más
//              mujeres (longevidad) que del otro sexo
//   clasifica  tres pirámides pequeñas, cada una a la caja de su tipo
const MECANICAS = {
  facil:   ['mayor', 'mayor', 'clasifica', 'lado'],
  medio:   ['clasifica', 'anomalia', 'anomalia', 'lado', 'mayor'],
  dificil: ['anomalia', 'nacidos', 'nacidos', 'clasifica', 'lado'],
}
export const MECANICAS_DE = nivel => MECANICAS[nivel] ?? MECANICAS.facil
const sumaFila = (p, i) => p.h[i] + p.m[i]

let seqN = 0
const recientes = []
export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  for (let intento = 0; ; intento++) {
    const r = genNueva(nivel, rand)
    const tema = r.piramides ? r.piramides.map(x => x.tipo).join() : `${r.mecanica}${r.validos.join()}${r.caso ?? ''}${r.tipo}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 5) recientes.shift()
    return r
  }
}
export const genRound = difficulty => genRonda(difficulty)

function genNueva(nivel, rand) {
  for (;;) {
    const mecanica = elige(rand, MECANICAS_DE(nivel))
    const base = { id: ++seqN, nivel, mecanica, censo: elige(rand, CENSOS) }
    if (mecanica === 'clasifica') {
      const tipos = [0, 1, 2].map(() => elige(rand, TIPOS))
      if (new Set(tipos).size < 2) continue
      const piramides = tipos.map(t => ({ tipo: t, ...construir(t, null, rand) }))
      // La primera hace de ronda «tipo» para el texto del schema.
      return { ...base, ...piramides[0], piramides, cajas: TIPOS, bueno: 'clasifica:0' }
    }
    if (mecanica === 'mayor') {
      const r = genVieja(nivel, 'grupo', rand)
      return { ...r, ...base, validos: [r.bueno] }
    }
    if (mecanica === 'anomalia') {
      const rasgo = elige(rand, ['hueco', 'boom'])
      const k = rasgo === 'boom' ? 3 + Math.floor(rand() * 9) : 2 + Math.floor(rand() * 15)
      const tipo = elige(rand, TIPOS)
      const p = construir(tipo, rasgo, rand, k)
      const v = (sumaFila(p, k - 1) + sumaFila(p, k + 1)) / 2
      // Que se salga a simple vista de la línea de sus vecinos.
      if (rasgo === 'hueco' ? sumaFila(p, k) > v * 0.8 : sumaFila(p, k) < v * 1.12) continue
      return { ...base, ...p, tipo, rasgo, validos: [k] }
    }
    if (mecanica === 'nacidos') {
      const k = 1 + Math.floor(rand() * 15)
      const tipo = elige(rand, TIPOS)
      const a = k * 5
      return { ...base, ...construir(tipo, null, rand), tipo, desde: base.censo - a - 4, hasta: base.censo - a, validos: [k] }
    }
    // lado
    const caso = elige(rand, ['hombres', 'mujeres'])
    const tipo = elige(rand, TIPOS)
    const p = construir(tipo, caso === 'hombres' ? 'inmigracion' : null, rand)
    const filas = [...Array(GRUPOS).keys()]
    const validos = filas.filter(i => (caso === 'hombres' ? p.h[i] > p.m[i] * 1.4 : p.m[i] > p.h[i] * 1.15))
    // Sin zona gris: el resto de grupos, casi iguales o al revés.
    const dudosos = filas.filter(i => !validos.includes(i) && (caso === 'hombres' ? p.h[i] > p.m[i] * 1.1 : p.m[i] > p.h[i] * 1.08))
    if (!validos.length || dudosos.length) continue
    return { ...base, ...p, tipo, caso, rasgo: caso === 'hombres' ? 'inmigracion' : 'longevidad', validos }
  }
}

// Respuestas: el número de la fila tocada, o «clasifica:fallos».
export function esCorrecta(r, o) {
  if (r.mecanica === 'clasifica') return o === 'clasifica:0'
  return /^\d+$/.test(String(o)) && r.validos.includes(Number(o))
}
export const isCorrect = esCorrecta

export function enunciado(r, l) {
  switch (r.mecanica) {
    case 'mayor': return tx(T('Toca el grupo de edad con más población', 'Tap the age group with the most people', 'Toca el grup d’edat amb més població'), l)
    case 'anomalia': return r.rasgo === 'hueco'
      ? tx(T('Toca la generación que nació durante una guerra o una crisis', 'Tap the generation born during a war or a crisis', 'Toca la generació que va néixer durant una guerra o una crisi'), l)
      : tx(T('Toca la generación del baby boom', 'Tap the baby-boom generation', 'Toca la generació del baby boom'), l)
    case 'nacidos': return tx(T(`Pirámide del año ${r.censo}. Toca a quienes nacieron entre ${r.desde} y ${r.hasta}`, `Pyramid for ${r.censo}. Tap the people born between ${r.desde} and ${r.hasta}`, `Piràmide de l’any ${r.censo}. Toca els qui van néixer entre ${r.desde} i ${r.hasta}`), l)
    case 'lado': return r.caso === 'hombres'
      ? tx(T('Toca un grupo de edad con muchos más hombres que mujeres', 'Tap an age group with many more men than women', 'Toca un grup d’edat amb molts més homes que dones'), l)
      : tx(T('Toca un grupo de edad con bastantes más mujeres que hombres', 'Tap an age group with quite a few more women than men', 'Toca un grup d’edat amb força més dones que homes'), l)
    default: return tx(T('Coloca cada pirámide en la caja de su tipo', 'Put each pyramid in the box for its type', 'Col·loca cada piràmide a la caixa del seu tipus'), l)
  }
}

const FORMA_CORTA = {
  progresiva: T('base ancha y cima estrecha, población joven', 'wide base and narrow top, a young population', 'base ampla i cim estret, població jove'),
  estacionaria: T('barras parecidas hasta los 50 años, población estable', 'similar bars up to age 50, a stable population', 'barres semblants fins als 50 anys, població estable'),
  regresiva: T('base más estrecha que el centro, población envejecida', 'base narrower than the middle, an ageing population', 'base més estreta que el centre, població envellida'),
}

export function explicacion(r, l) {
  switch (r.mecanica) {
    case 'mayor': return explicacionVieja({ ...r, pregunta: 'grupo', bueno: r.validos[0] }, l)
    case 'anomalia': case 'lado': return explicacionVieja({ ...r, pregunta: 'rasgo' }, l)
    case 'nacidos': {
      const a = r.validos[0] * 5
      return tx(T(`En ${r.censo}, quien nació entre ${r.desde} y ${r.hasta} tiene entre ${a} y ${a + 4} años: ${r.censo} − ${r.hasta} = ${a} y ${r.censo} − ${r.desde} = ${a + 4}.`, `In ${r.censo}, people born between ${r.desde} and ${r.hasta} are ${a} to ${a + 4} years old: ${r.censo} − ${r.hasta} = ${a} and ${r.censo} − ${r.desde} = ${a + 4}.`, `L’any ${r.censo}, qui va néixer entre ${r.desde} i ${r.hasta} té entre ${a} i ${a + 4} anys: ${r.censo} − ${r.hasta} = ${a} i ${r.censo} − ${r.desde} = ${a + 4}.`), l)
    }
    default: return [...new Set(r.piramides.map(x => x.tipo))].map(t => `${tx(NOMBRE_TIPO[t], l)}: ${tx(FORMA_CORTA[t], l)}.`).join(' ')
  }
}

export function schemaQuestion(r, l) {
  // Sin el dibujo solo se entienden las de tipo (con la descripción de la forma).
  if (r.mecanica !== 'clasifica') return null
  return schemaVieja({ ...r, pregunta: 'tipo', bueno: r.tipo, opciones: TIPOS }, l)
}
