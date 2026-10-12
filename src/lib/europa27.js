// Europa a 27 (geografía · la Unión Europea, ESO y Bachillerato).
//
// Un mapa de Europa con países marcados y preguntas sobre la UE: qué país
// es, su capital, si es miembro (y las trampas: Noruega, Suiza, Reino Unido),
// el euro, Schengen, las ampliaciones y las instituciones.
//
// Datos a octubre de 2026: 27 miembros; zona euro de 21 (Croacia desde 2023,
// Bulgaria desde el 1 de enero de 2026); Schengen con Bulgaria y Rumanía de
// pleno derecho desde 2025, sin Irlanda ni Chipre. Si algo de esto cambia,
// el test de datos lo recuerda.

const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
const T = (es, en, ca) => ({ es, en, ca })
export const tx = (o, l) => o[l] ?? o.es

// [iso, nombre, capital, lat, lon, entrada (0 = no miembro), euro, schengen, nota]
const P = (iso, nombre, capital, lat, lon, entrada, euro, schengen, nota) => ({ iso, nombre, capital, lat, lon, entrada, euro, schengen, nota })
export const PAISES = [
  P('DEU', T('Alemania', 'Germany', 'Alemanya'), T('Berlín', 'Berlin', 'Berlín'), 52.5, 13.4, 1957, true, true),
  P('AUT', T('Austria', 'Austria', 'Àustria'), T('Viena', 'Vienna', 'Viena'), 48.2, 16.4, 1995, true, true),
  P('BEL', T('Bélgica', 'Belgium', 'Bèlgica'), T('Bruselas', 'Brussels', 'Brussel·les'), 50.8, 4.4, 1957, true, true),
  P('BGR', T('Bulgaria', 'Bulgaria', 'Bulgària'), T('Sofía', 'Sofia', 'Sofia'), 42.7, 23.3, 2007, true, true, T('Adoptó el euro el 1 de enero de 2026.', 'It adopted the euro on 1 January 2026.', 'Va adoptar l’euro l’1 de gener de 2026.')),
  P('CYP', T('Chipre', 'Cyprus', 'Xipre'), T('Nicosia', 'Nicosia', 'Nicòsia'), 35.2, 33.4, 2004, true, false),
  P('CZE', T('Chequia', 'Czechia', 'Txèquia'), T('Praga', 'Prague', 'Praga'), 50.1, 14.4, 2004, false, true),
  P('HRV', T('Croacia', 'Croatia', 'Croàcia'), T('Zagreb', 'Zagreb', 'Zagreb'), 45.8, 16.0, 2013, true, true, T('Es el último país que ha entrado, en 2013.', 'It is the most recent country to join, in 2013.', 'És l’últim país que hi ha entrat, el 2013.')),
  P('DNK', T('Dinamarca', 'Denmark', 'Dinamarca'), T('Copenhague', 'Copenhagen', 'Copenhaguen'), 55.7, 12.6, 1973, false, true, T('Conserva la corona danesa: negoció quedarse fuera del euro.', 'It keeps the Danish krone: it negotiated an opt-out from the euro.', 'Conserva la corona danesa: va negociar quedar-se fora de l’euro.')),
  P('SVK', T('Eslovaquia', 'Slovakia', 'Eslovàquia'), T('Bratislava', 'Bratislava', 'Bratislava'), 48.1, 17.1, 2004, true, true),
  P('SVN', T('Eslovenia', 'Slovenia', 'Eslovènia'), T('Liubliana', 'Ljubljana', 'Ljubljana'), 46.1, 14.5, 2004, true, true),
  P('ESP', T('España', 'Spain', 'Espanya'), T('Madrid', 'Madrid', 'Madrid'), 40.4, -3.7, 1986, true, true),
  P('EST', T('Estonia', 'Estonia', 'Estònia'), T('Tallin', 'Tallinn', 'Tallinn'), 59.4, 24.7, 2004, true, true),
  P('FIN', T('Finlandia', 'Finland', 'Finlàndia'), T('Helsinki', 'Helsinki', 'Hèlsinki'), 60.2, 24.9, 1995, true, true),
  P('FRA', T('Francia', 'France', 'França'), T('París', 'Paris', 'París'), 48.9, 2.3, 1957, true, true),
  P('GRC', T('Grecia', 'Greece', 'Grècia'), T('Atenas', 'Athens', 'Atenes'), 38.0, 23.7, 1981, true, true),
  P('HUN', T('Hungría', 'Hungary', 'Hongria'), T('Budapest', 'Budapest', 'Budapest'), 47.5, 19.0, 2004, false, true),
  P('IRL', T('Irlanda', 'Ireland', 'Irlanda'), T('Dublín', 'Dublin', 'Dublín'), 53.3, -6.3, 1973, true, false, T('No está en Schengen: mantiene una zona de viaje común con el Reino Unido.', 'It is not in Schengen: it keeps a common travel area with the United Kingdom.', 'No és a Schengen: manté una zona de viatge comuna amb el Regne Unit.')),
  P('ITA', T('Italia', 'Italy', 'Itàlia'), T('Roma', 'Rome', 'Roma'), 41.9, 12.5, 1957, true, true),
  P('LVA', T('Letonia', 'Latvia', 'Letònia'), T('Riga', 'Riga', 'Riga'), 56.9, 24.1, 2004, true, true),
  P('LTU', T('Lituania', 'Lithuania', 'Lituània'), T('Vilna', 'Vilnius', 'Vílnius'), 54.7, 25.3, 2004, true, true),
  P('LUX', T('Luxemburgo', 'Luxembourg', 'Luxemburg'), T('Luxemburgo', 'Luxembourg', 'Luxemburg'), 49.6, 6.1, 1957, true, true),
  P('MLT', T('Malta', 'Malta', 'Malta'), T('La Valeta', 'Valletta', 'La Valletta'), 35.9, 14.5, 2004, true, true),
  P('NLD', T('Países Bajos', 'Netherlands', 'Països Baixos'), T('Ámsterdam', 'Amsterdam', 'Amsterdam'), 52.4, 4.9, 1957, true, true),
  P('POL', T('Polonia', 'Poland', 'Polònia'), T('Varsovia', 'Warsaw', 'Varsòvia'), 52.2, 21.0, 2004, false, true),
  P('PRT', T('Portugal', 'Portugal', 'Portugal'), T('Lisboa', 'Lisbon', 'Lisboa'), 38.7, -9.1, 1986, true, true),
  P('ROU', T('Rumanía', 'Romania', 'Romania'), T('Bucarest', 'Bucharest', 'Bucarest'), 44.4, 26.1, 2007, false, true),
  P('SWE', T('Suecia', 'Sweden', 'Suècia'), T('Estocolmo', 'Stockholm', 'Estocolm'), 59.3, 18.1, 1995, false, true),
  // No miembros
  P('NOR', T('Noruega', 'Norway', 'Noruega'), T('Oslo', 'Oslo', 'Oslo'), 59.9, 10.8, 0, false, true, T('Votó dos veces que no a entrar (1972 y 1994), aunque está en Schengen y en el Espacio Económico Europeo.', 'It voted no to joining twice (1972 and 1994), although it is in Schengen and the European Economic Area.', 'Va votar dues vegades que no a entrar-hi (1972 i 1994), tot i que és a Schengen i a l’Espai Econòmic Europeu.')),
  P('CHE', T('Suiza', 'Switzerland', 'Suïssa'), T('Berna', 'Bern', 'Berna'), 46.9, 7.4, 0, false, true, T('No es de la UE, pero está en Schengen y tiene muchos acuerdos con ella.', 'It is not in the EU, but it is in Schengen and has many agreements with it.', 'No és de la UE, però és a Schengen i hi té molts acords.')),
  P('GBR', T('Reino Unido', 'United Kingdom', 'Regne Unit'), T('Londres', 'London', 'Londres'), 51.5, -0.1, 0, false, false, T('Entró en 1973 y salió en 2020 tras el referéndum del Brexit.', 'It joined in 1973 and left in 2020 after the Brexit referendum.', 'Hi va entrar el 1973 i en va sortir el 2020 després del referèndum del Brexit.')),
  P('ISL', T('Islandia', 'Iceland', 'Islàndia'), T('Reikiavik', 'Reykjavik', 'Reykjavík'), 64.1, -21.9, 0, false, true, T('No es de la UE, pero está en Schengen y en el Espacio Económico Europeo.', 'It is not in the EU, but it is in Schengen and the European Economic Area.', 'No és de la UE, però és a Schengen i a l’Espai Econòmic Europeu.')),
  P('SRB', T('Serbia', 'Serbia', 'Sèrbia'), T('Belgrado', 'Belgrade', 'Belgrad'), 44.8, 20.5, 0, false, false),
  P('UKR', T('Ucrania', 'Ukraine', 'Ucraïna'), T('Kiev', 'Kyiv', 'Kíiv'), 50.5, 30.5, 0, false, false),
  P('ALB', T('Albania', 'Albania', 'Albània'), T('Tirana', 'Tirana', 'Tirana'), 41.3, 19.8, 0, false, false),
  P('MKD', T('Macedonia del Norte', 'North Macedonia', 'Macedònia del Nord'), T('Skopie', 'Skopje', 'Skopje'), 42.0, 21.4, 0, false, false),
  P('MNE', T('Montenegro', 'Montenegro', 'Montenegro'), T('Podgorica', 'Podgorica', 'Podgorica'), 42.4, 19.3, 0, false, false),
  P('BIH', T('Bosnia y Herzegovina', 'Bosnia and Herzegovina', 'Bòsnia i Hercegovina'), T('Sarajevo', 'Sarajevo', 'Sarajevo'), 43.9, 18.4, 0, false, false),
  P('MDA', T('Moldavia', 'Moldova', 'Moldàvia'), T('Chisináu', 'Chisinau', 'Chisinau'), 47.0, 28.9, 0, false, false),
]
export const pais = iso => PAISES.find(p => p.iso === iso)
export const MIEMBROS = PAISES.filter(p => p.entrada)
const NO_MIEMBROS = PAISES.filter(p => !p.entrada)
const CANDIDATOS = ['SRB', 'UKR', 'ALB', 'MKD', 'MNE', 'BIH', 'MDA']
// Sin forma en el mapa de 110 m (se marcan con un punto): no salen en «qué país es».
export const SIN_FORMA = ['MLT']

export const AMPLIACIONES = [1957, 1973, 1981, 1986, 1995, 2004, 2007, 2013]

export const INSTITUCIONES = {
  parlamento: { nombre: T('Parlamento Europeo', 'European Parliament', 'Parlament Europeu'), sede: 'estrasburgo', emoji: '🗳️',
    hace: T('La eligen los ciudadanos cada cinco años y aprueba las leyes y el presupuesto junto con los gobiernos.', 'Citizens elect it every five years, and it passes laws and the budget together with the governments.', 'L’escullen els ciutadans cada cinc anys i aprova les lleis i el pressupost juntament amb els governs.') },
  consejo: { nombre: T('Consejo de la UE', 'Council of the EU', 'Consell de la UE'), sede: null, emoji: '🤝',
    hace: T('Reúne a los ministros de cada país, por temas, y aprueba las leyes junto con el Parlamento.', 'It brings together ministers from each country, by subject, and passes laws together with Parliament.', 'Reuneix els ministres de cada país, per temes, i aprova les lleis juntament amb el Parlament.') },
  comision: { nombre: T('Comisión Europea', 'European Commission', 'Comissió Europea'), sede: 'bruselas', emoji: '📜',
    hace: T('Propone las leyes y vigila que se cumplan; tiene un comisario por país.', 'It proposes laws and makes sure they are applied; it has one commissioner per country.', 'Proposa les lleis i vetlla perquè es compleixin; té un comissari per país.') },
  europeo: { nombre: T('Consejo Europeo', 'European Council', 'Consell Europeu'), sede: 'bruselas', emoji: '🏛️',
    hace: T('Reúne a los jefes de Estado o de Gobierno y marca las grandes líneas políticas de la Unión.', 'It brings together the heads of state or government and sets the Union’s overall political direction.', 'Reuneix els caps d’Estat o de Govern i marca les grans línies polítiques de la Unió.') },
  tribunal: { nombre: T('Tribunal de Justicia de la UE', 'Court of Justice of the EU', 'Tribunal de Justícia de la UE'), sede: 'luxemburgo', emoji: '⚖️',
    hace: T('Interpreta el derecho europeo y resuelve si un país o una institución lo incumple.', 'It interprets EU law and rules on whether a country or an institution has broken it.', 'Interpreta el dret europeu i resol si un país o una institució l’incompleix.') },
  bce: { nombre: T('Banco Central Europeo', 'European Central Bank', 'Banc Central Europeu'), sede: 'francfort', emoji: '💶',
    hace: T('Dirige la política monetaria del euro: fija los tipos de interés y vigila los precios.', 'It runs the euro’s monetary policy: it sets interest rates and keeps an eye on prices.', 'Dirigeix la política monetària de l’euro: fixa els tipus d’interès i vigila els preus.') },
}
export const CIUDADES = {
  bruselas: T('Bruselas', 'Brussels', 'Brussel·les'),
  estrasburgo: T('Estrasburgo', 'Strasbourg', 'Estrasburg'),
  luxemburgo: T('Luxemburgo', 'Luxembourg', 'Luxemburg'),
  francfort: T('Fráncfort', 'Frankfurt', 'Frankfurt'),
}

export const NIVELES = {
  facil:   { tipos: ['pais', 'pais', 'capital', 'miembro', 'miembro'] },
  medio:   { tipos: ['pais', 'capital', 'miembro', 'euro', 'ampliacion', 'institucion'] },
  dificil: { tipos: ['miembro', 'euro', 'schengen', 'ampliacion', 'ampliacion', 'institucion', 'sede'] },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lon - b.lon) * Math.cos((a.lat * Math.PI) / 180))
// Los vecinos más cercanos: las opciones falsas de «qué país es» y «capital».
const cercanos = (p, lista) => lista.filter(x => x.iso !== p.iso).sort((a, b) => dist(p, a) - dist(p, b))

let seq = 0
const recientes = []
const tema = r => `${r.tipo}:${r.pais ?? r.inst ?? r.bueno}`

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    if (intento < 20 && recientes.includes(tema(r))) continue
    recientes.push(tema(r))
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'pais' || tipo === 'capital') {
      const lista = tipo === 'pais' ? PAISES.filter(p => !SIN_FORMA.includes(p.iso)) : PAISES
      const p = elige(rand, nivel === 'facil' ? lista.filter(x => x.entrada) : lista)
      const otros = baraja(rand, cercanos(p, lista).slice(0, 5)).slice(0, 3)
      return { ...base, pais: p.iso, bueno: p.iso, opciones: baraja(rand, [p.iso, ...otros.map(x => x.iso)]) }
    }

    if (tipo === 'miembro') {
      // ¿Cuál NO es de la UE? Las trampas son los países que «parecen» de la UE.
      const trampas = nivel === 'facil' ? NO_MIEMBROS : NO_MIEMBROS.filter(p => !CANDIDATOS.includes(p.iso) || rand() < 0.3)
      const no = elige(rand, trampas)
      const si = baraja(rand, cercanos(no, MIEMBROS).slice(0, 6)).slice(0, 3)
      return { ...base, pais: no.iso, bueno: no.iso, opciones: baraja(rand, [no.iso, ...si.map(x => x.iso)]) }
    }

    if (tipo === 'euro' || tipo === 'schengen') {
      // Uno distinto de los otros tres: el que NO tiene euro (o no está en Schengen),
      // o al revés. En Schengen entran también Noruega, Suiza e Islandia.
      const lista = tipo === 'euro' ? MIEMBROS : PAISES.filter(p => p.entrada || ['NOR', 'CHE', 'ISL', 'GBR'].includes(p.iso))
      const campo = tipo === 'euro' ? 'euro' : 'schengen'
      const con = lista.filter(p => p[campo]), sin = lista.filter(p => !p[campo])
      const alReves = tipo === 'euro' ? rand() < 0.35 : false
      const [raros, comunes] = alReves ? [con, sin] : [sin, con]
      const b = elige(rand, raros)
      const otros = baraja(rand, comunes).slice(0, 3)
      return { ...base, alReves, pais: b.iso, bueno: b.iso, opciones: baraja(rand, [b.iso, ...otros.map(x => x.iso)]) }
    }

    if (tipo === 'ampliacion') {
      const p = elige(rand, MIEMBROS)
      const i = AMPLIACIONES.indexOf(p.entrada)
      const cerca = AMPLIACIONES.filter(a => a !== p.entrada).sort((a, b) => Math.abs(AMPLIACIONES.indexOf(a) - i) - Math.abs(AMPLIACIONES.indexOf(b) - i))
      return { ...base, pais: p.iso, bueno: p.entrada, opciones: [p.entrada, ...cerca.slice(0, 3)].sort((a, b) => a - b) }
    }

    if (tipo === 'institucion') {
      const id = elige(rand, Object.keys(INSTITUCIONES))
      const otros = baraja(rand, Object.keys(INSTITUCIONES).filter(x => x !== id)).slice(0, 3)
      return { ...base, inst: id, bueno: id, opciones: baraja(rand, [id, ...otros]) }
    }

    // sede: solo instituciones con una sede indiscutible
    const id = elige(rand, Object.keys(INSTITUCIONES).filter(k => INSTITUCIONES[k].sede))
    return { ...base, inst: id, bueno: INSTITUCIONES[id].sede, opciones: Object.keys(CIUDADES) }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
export const esCorrecta = (r, o) => o === r.bueno

// ── Textos ────────────────────────────────────────────────────────────────
const nom = (iso, l) => tx(pais(iso).nombre, l)

export function textoOpcion(o, r, l) {
  switch (r.tipo) {
    case 'capital': return tx(pais(o).capital, l)
    case 'ampliacion': return o === 1957 ? s(l, '1957 (fundador)', '1957 (founder)', '1957 (fundador)') : String(o)
    case 'institucion': return tx(INSTITUCIONES[o].nombre, l)
    case 'sede': return tx(CIUDADES[o], l)
    default: return nom(o, l)
  }
}

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'pais': return s(l, '¿Qué país está marcado en el mapa?', 'Which country is marked on the map?', 'Quin país està marcat al mapa?')
    case 'capital': return s(l, `¿Cuál es la capital de ${nom(r.pais, l)}?`, `What is the capital of ${nom(r.pais, l)}?`, `Quina és la capital de ${nom(r.pais, l)}?`)
    case 'miembro': return s(l, '¿Cuál de estos países NO es miembro de la UE?', 'Which of these countries is NOT an EU member?', 'Quin d’aquests països NO és membre de la UE?')
    case 'euro': return r.alReves
      ? s(l, '¿Cuál de estos países de la UE usa el euro?', 'Which of these EU countries uses the euro?', 'Quin d’aquests països de la UE fa servir l’euro?')
      : s(l, '¿Cuál de estos países de la UE NO usa el euro?', 'Which of these EU countries does NOT use the euro?', 'Quin d’aquests països de la UE NO fa servir l’euro?')
    case 'schengen': return s(l, '¿Cuál de estos países NO está en el espacio Schengen?', 'Which of these countries is NOT in the Schengen area?', 'Quin d’aquests països NO és a l’espai Schengen?')
    case 'ampliacion': return s(l, `¿En qué año entró ${nom(r.pais, l)} en la Unión Europea (entonces CEE)?`, `In what year did ${nom(r.pais, l)} join the European Union (then the EEC)?`, `En quin any va entrar ${nom(r.pais, l)} a la Unió Europea (llavors CEE)?`)
    case 'institucion': return s(l, '¿Qué institución es?', 'Which institution is this?', 'Quina institució és?')
    default: return s(l, `¿Dónde tiene su sede oficial: ${tx(INSTITUCIONES[r.inst].nombre, l)}?`, `Where is the official seat of the ${tx(INSTITUCIONES[r.inst].nombre, l)}?`, `On té la seu oficial: ${tx(INSTITUCIONES[r.inst].nombre, l)}?`)
  }
}

const ANYO_FRASE = {
  // Sin «con X» para no decir «España entró con España»: se enumera el grupo.
  1957: ['Es uno de los seis fundadores de la CEE, con los Tratados de Roma (1957): Alemania, Francia, Italia, Bélgica, Países Bajos y Luxemburgo.', 'It is one of the six founders of the EEC, with the Treaties of Rome (1957): Germany, France, Italy, Belgium, the Netherlands and Luxembourg.', 'És un dels sis fundadors de la CEE, amb els Tractats de Roma (1957): Alemanya, França, Itàlia, Bèlgica, els Països Baixos i Luxemburg.'],
  1973: ['Entró en 1973, en la primera ampliación: Dinamarca, Irlanda y el Reino Unido.', 'It joined in 1973, in the first enlargement: Denmark, Ireland and the United Kingdom.', 'Hi va entrar el 1973, en la primera ampliació: Dinamarca, Irlanda i el Regne Unit.'],
  1981: ['Entró en 1981, en solitario, pocos años después de recuperar la democracia.', 'It joined on its own in 1981, a few years after returning to democracy.', 'Hi va entrar el 1981, tota sola, pocs anys després de recuperar la democràcia.'],
  1986: ['Entró en 1986: España y Portugal entraron juntos, tras sus transiciones a la democracia.', 'It joined in 1986: Spain and Portugal joined together, after their transitions to democracy.', 'Hi va entrar el 1986: Espanya i Portugal hi van entrar junts, després de les seves transicions a la democràcia.'],
  1995: ['Entró en 1995: Austria, Finlandia y Suecia.', 'It joined in 1995: Austria, Finland and Sweden.', 'Hi va entrar el 1995: Àustria, Finlàndia i Suècia.'],
  2004: ['Entró en 2004, en la gran ampliación al este: diez países a la vez.', 'It joined in 2004, in the big eastward enlargement: ten countries at once.', 'Hi va entrar el 2004, en la gran ampliació a l’est: deu països alhora.'],
  2007: ['Entró en 2007: Bulgaria y Rumanía.', 'It joined in 2007: Bulgaria and Romania.', 'Hi va entrar el 2007: Bulgària i Romania.'],
  2013: ['Entró en 2013: es la incorporación más reciente.', 'It joined in 2013: the most recent member.', 'Hi va entrar el 2013: és la incorporació més recent.'],
}
const ix = l => (l === 'en' ? 1 : l === 'ca' ? 2 : 0)
const nota = (iso, l) => (pais(iso).nota ? ' ' + tx(pais(iso).nota, l) : '')

export function explicacion(r, l) {
  const p = r.pais ? pais(r.pais) : null
  switch (r.tipo) {
    case 'pais': return s(l, `Es ${nom(p.iso, l)}, con capital en ${tx(p.capital, l)}. `, `It is ${nom(p.iso, l)}, whose capital is ${tx(p.capital, l)}. `, `És ${nom(p.iso, l)}, amb capital a ${tx(p.capital, l)}. `)
      + (p.entrada ? s(l, `Es miembro de la UE desde ${p.entrada}.`, `It has been an EU member since ${p.entrada}.`, `És membre de la UE des del ${p.entrada}.`) : s(l, 'No es miembro de la UE.', 'It is not an EU member.', 'No és membre de la UE.')) + nota(p.iso, l)
    case 'capital': return s(l, `La capital de ${nom(p.iso, l)} es ${tx(p.capital, l)}.`, `The capital of ${nom(p.iso, l)} is ${tx(p.capital, l)}.`, `La capital de ${nom(p.iso, l)} és ${tx(p.capital, l)}.`)
      + (p.entrada ? '' : ' ' + s(l, 'Ojo: no es de la UE.', 'Note: it is not in the EU.', 'Compte: no és de la UE.')) + nota(p.iso, l)
    case 'miembro': {
      const extra = p.nota ? tx(p.nota, l) : CANDIDATOS.includes(p.iso) ? s(l, 'Es candidato a entrar, pero todavía no es miembro.', 'It is a candidate to join, but not yet a member.', 'És candidat a entrar-hi, però encara no n’és membre.') : ''
      return s(l, `${nom(p.iso, l)} no es de la UE. ${extra} Los otros tres sí lo son.`, `${nom(p.iso, l)} is not in the EU. ${extra} The other three are.`, `${nom(p.iso, l)} no és de la UE. ${extra} Els altres tres sí que ho són.`)
    }
    case 'euro': {
      const base = r.alReves
        ? s(l, `${nom(p.iso, l)} usa el euro; los otros tres conservan su moneda.`, `${nom(p.iso, l)} uses the euro; the other three keep their own currency.`, `${nom(p.iso, l)} fa servir l’euro; els altres tres conserven la seva moneda.`)
        : s(l, `${nom(p.iso, l)} es de la UE pero no usa el euro: conserva su moneda.`, `${nom(p.iso, l)} is in the EU but does not use the euro: it keeps its own currency.`, `${nom(p.iso, l)} és de la UE però no fa servir l’euro: conserva la seva moneda.`)
      return base + nota(p.iso, l) + ' ' + s(l, 'Hoy la zona euro la forman 21 de los 27; no tienen euro Chequia, Dinamarca, Hungría, Polonia, Rumanía y Suecia.', 'Today 21 of the 27 are in the euro area; Czechia, Denmark, Hungary, Poland, Romania and Sweden do not use it.', 'Avui la zona euro la formen 21 dels 27; no tenen euro Txèquia, Dinamarca, Hongria, Polònia, Romania i Suècia.')
    }
    case 'schengen': return s(l, `${nom(p.iso, l)} no está en Schengen.`, `${nom(p.iso, l)} is not in Schengen.`, `${nom(p.iso, l)} no és a Schengen.`) + nota(p.iso, l)
      + ' ' + s(l, 'Schengen no es lo mismo que la UE: dentro no hay controles en las fronteras, y entran también Noruega, Suiza e Islandia; de la UE se quedan fuera Irlanda y Chipre.', 'Schengen is not the same as the EU: there are no border checks inside it, and it includes Norway, Switzerland and Iceland; Ireland and Cyprus are the EU countries left out.', 'Schengen no és el mateix que la UE: a dins no hi ha controls a les fronteres, i hi entren també Noruega, Suïssa i Islàndia; de la UE en queden fora Irlanda i Xipre.')
    case 'ampliacion': return ANYO_FRASE[r.bueno][ix(l)]
    case 'institucion': return `${tx(INSTITUCIONES[r.inst].nombre, l)}. ` + DIFERENCIA[ix(l)]
    default: return s(l, `La sede oficial está en ${tx(CIUDADES[r.bueno], l)}.`, `Its official seat is in ${tx(CIUDADES[r.bueno], l)}.`, `La seu oficial és a ${tx(CIUDADES[r.bueno], l)}.`) + ' ' + SEDES[ix(l)]
  }
}
const DIFERENCIA = [
  'No hay que confundir el Consejo de la UE (ministros) con el Consejo Europeo (jefes de Estado o de Gobierno): la Comisión propone las leyes y el Parlamento y el Consejo de la UE las aprueban.',
  'Do not confuse the Council of the EU (ministers) with the European Council (heads of state or government): the Commission proposes laws, and Parliament and the Council of the EU pass them.',
  'No s’ha de confondre el Consell de la UE (ministres) amb el Consell Europeu (caps d’Estat o de Govern): la Comissió proposa les lleis i el Parlament i el Consell de la UE les aproven.',
]
const SEDES = [
  'Las sedes se reparten: Bruselas (Comisión y Consejo Europeo), Estrasburgo (Parlamento, que también se reúne en Bruselas), Luxemburgo (Tribunal de Justicia) y Fráncfort (Banco Central Europeo).',
  'The seats are spread out: Brussels (Commission and European Council), Strasbourg (Parliament, which also meets in Brussels), Luxembourg (Court of Justice) and Frankfurt (European Central Bank).',
  'Les seus es reparteixen: Brussel·les (Comissió i Consell Europeu), Estrasburg (Parlament, que també es reuneix a Brussel·les), Luxemburg (Tribunal de Justícia) i Frankfurt (Banc Central Europeu).',
]

export function schemaQuestion(r, l) {
  // En «qué país es» el mapa no se puede escribir: se da la capital como pista.
  const extra = r.tipo === 'pais' ? s(l, `Su capital es ${tx(pais(r.pais).capital, l)}. `, `Its capital is ${tx(pais(r.pais).capital, l)}. `, `La seva capital és ${tx(pais(r.pais).capital, l)}. `)
    : r.tipo === 'institucion' ? `${tx(INSTITUCIONES[r.inst].hace, l)} ` : ''
  return {
    question: `${extra}${enunciado(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}
