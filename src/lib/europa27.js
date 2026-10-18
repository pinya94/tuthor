// Europa a 27 (geografía · la Unión Europea, ESO y Bachillerato).
//
// Un mapa de Europa para tocar y pintar: buscar países, pintar los de la UE,
// el euro o Schengen (con sus trampas: Noruega, Suiza, Reino Unido…), las
// ampliaciones y las instituciones con sus sedes (ver las mecánicas abajo).
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

// Coordenadas de las ciudades sede (para el mapa ampliado de «sedes»).
export const COORD_CIUDAD = { bruselas: [4.35, 50.85], estrasburgo: [7.75, 48.58], luxemburgo: [6.13, 49.61], francfort: [8.68, 50.11] }
// Demasiado pequeños para tocarlos en un móvil (Chipre mide pocos píxeles).
export const SIN_TOCAR = ['MLT', 'LUX', 'CYP']

// Mecánicas (nada de elegir entre cuatro):
//   busca     tocar en el mapa el país que se pide (por su nombre o su capital)
//   pinta     seis países marcados: pintar los que son de la UE, usan el euro
//             o están en Schengen
//   anyos     cada país, al año en que entró (cajas: sus años y uno más)
//   funciones unir cada institución con lo que hace
//   sedes     cada institución, a su ciudad en un mapa ampliado
export const NIVELES = {
  facil:   { tipos: ['busca', 'busca', 'pinta'], pinta: ['miembro'], soloMiembros: true, capital: false },
  medio:   { tipos: ['busca', 'busca', 'pinta', 'anyos', 'funciones'], pinta: ['miembro', 'euro'], soloMiembros: false, capital: true },
  dificil: { tipos: ['busca', 'pinta', 'pinta', 'anyos', 'sedes'], pinta: ['euro', 'schengen'], soloMiembros: false, capital: true },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lon - b.lon) * Math.cos((a.lat * Math.PI) / 180))
const cercanos = (p, lista) => lista.filter(x => x.iso !== p.iso).sort((a, b) => dist(p, a) - dist(p, b))
const LISTA = {
  miembro: () => PAISES.filter(p => !SIN_TOCAR.includes(p.iso)),
  euro: () => MIEMBROS.filter(p => !SIN_TOCAR.includes(p.iso)),
  schengen: () => PAISES.filter(p => (p.entrada || ['NOR', 'CHE', 'ISL', 'GBR'].includes(p.iso)) && !SIN_TOCAR.includes(p.iso)),
}
export const tiene = (variante, iso) => (variante === 'miembro' ? !!pais(iso).entrada : !!pais(iso)[variante])

let seq = 0
const recientes = []

export function genRonda(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    if (intento < 20 && recientes.includes(r.clave)) continue
    recientes.push(r.clave)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'busca') {
      const lista = PAISES.filter(p => !SIN_TOCAR.includes(p.iso) && (!cfg.soloMiembros || p.entrada))
      const p = elige(rand, lista)
      const modo = cfg.capital && rand() < 0.4 ? 'capital' : 'nombre'
      return { ...base, clave: `b${p.iso}`, pais: p.iso, modo, bueno: p.iso }
    }

    if (tipo === 'pinta') {
      // Seis países vecinos entre sí, con al menos dos de cada clase.
      const variante = elige(rand, cfg.pinta)
      const lista = LISTA[variante]()
      const semilla = elige(rand, lista)
      const grupo = [semilla, ...cercanos(semilla, lista).slice(0, 5)].map(p => p.iso)
      const si = grupo.filter(iso => tiene(variante, iso)).length
      if (si < 2 || grupo.length - si < 2) continue
      return { ...base, clave: `p${variante}${semilla.iso}`, variante, grupo, bueno: 'pinta:0' }
    }

    if (tipo === 'anyos') {
      const paises = []
      for (const p of baraja(rand, MIEMBROS)) {
        if (paises.some(x => pais(x).entrada === p.entrada)) continue
        paises.push(p.iso)
        if (paises.length === 3) break
      }
      const anyos = paises.map(x => pais(x).entrada)
      const extra = baraja(rand, AMPLIACIONES.filter(a => !anyos.includes(a)))[0]
      return { ...base, clave: `a${paises.join()}`, paises, cajas: [...anyos, extra].sort((a, b) => a - b), bueno: 'clasifica:0' }
    }

    if (tipo === 'funciones') {
      // El Consejo de la UE y el Consejo Europeo salen juntos a menudo: es la trampa.
      const ids = rand() < 0.5 ? baraja(rand, ['consejo', 'europeo', elige(rand, ['parlamento', 'comision', 'tribunal', 'bce'])]) : baraja(rand, Object.keys(INSTITUCIONES)).slice(0, 3)
      return { ...base, clave: `f${[...ids].sort().join()}`, insts: ids, nombres: baraja(rand, ids), bueno: 'empareja:0' }
    }

    // sedes: cuatro instituciones con sede indiscutible
    const ids = baraja(rand, Object.keys(INSTITUCIONES).filter(k => INSTITUCIONES[k].sede)).slice(0, 4)
    return { ...base, clave: `s${[...ids].sort().join()}`, insts: ids, bueno: 'sedes:0' }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: busca, el país tocado; «pinta:fallos», «clasifica:fallos»,
// «empareja:fallos», «sedes:fallos».
export const esCorrecta = (r, o) => String(o) === String(r.bueno)

// ── Textos ────────────────────────────────────────────────────────────────
const nom = (iso, l) => tx(pais(iso).nombre, l)
export const nombrePais = nom
export const textoAnyo = (a, l) => (a === 1957 ? s(l, '1957 (fundadores)', '1957 (founders)', '1957 (fundadors)') : String(a))

export function enunciado(r, l) {
  switch (r.tipo) {
    case 'busca': return r.modo === 'capital'
      ? s(l, `Toca en el mapa el país cuya capital es ${tx(pais(r.pais).capital, l)}`, `Tap the country whose capital is ${tx(pais(r.pais).capital, l)}`, `Toca al mapa el país la capital del qual és ${tx(pais(r.pais).capital, l)}`)
      : s(l, `Toca ${nom(r.pais, l)} en el mapa`, `Tap ${nom(r.pais, l)} on the map`, `Toca ${nom(r.pais, l)} al mapa`)
    case 'pinta': return {
      miembro: s(l, 'Pinta los países marcados que son de la UE', 'Colour the marked countries that are in the EU', 'Pinta els països marcats que són de la UE'),
      euro: s(l, 'Pinta los países marcados que usan el euro', 'Colour the marked countries that use the euro', 'Pinta els països marcats que fan servir l’euro'),
      schengen: s(l, 'Pinta los países marcados que están en Schengen', 'Colour the marked countries that are in Schengen', 'Pinta els països marcats que són a Schengen'),
    }[r.variante]
    case 'anyos': return s(l, '¿En qué año entró cada país en la Unión (entonces CEE)?', 'In what year did each country join (then the EEC)?', 'En quin any va entrar cada país a la Unió (llavors CEE)?')
    case 'funciones': return s(l, 'Une cada institución con lo que hace', 'Match each institution with what it does', 'Uneix cada institució amb el que fa')
    default: return s(l, 'Coloca cada institución en su ciudad', 'Put each institution in its city', 'Col·loca cada institució a la seva ciutat')
  }
}

export function explicacion(r, l) {
  switch (r.tipo) {
    case 'busca': {
      const p = pais(r.pais)
      return s(l, `Es ${nom(p.iso, l)}, con capital en ${tx(p.capital, l)}. `, `It is ${nom(p.iso, l)}, whose capital is ${tx(p.capital, l)}. `, `És ${nom(p.iso, l)}, amb capital a ${tx(p.capital, l)}. `)
        + (p.entrada ? s(l, `Es miembro de la UE desde ${p.entrada}.`, `It has been an EU member since ${p.entrada}.`, `És membre de la UE des del ${p.entrada}.`) : s(l, 'No es de la UE.', 'It is not in the EU.', 'No és de la UE.') + (CANDIDATOS.includes(p.iso) ? ' ' + s(l, 'Es candidato a entrar.', 'It is a candidate to join.', 'És candidat a entrar-hi.') : '')) + nota(p.iso, l)
    }
    case 'pinta': {
      const si = r.grupo.filter(iso => tiene(r.variante, iso)).map(iso => nom(iso, l)).join(', ')
      const no = r.grupo.filter(iso => !tiene(r.variante, iso)).map(iso => nom(iso, l)).join(', ')
      const regla = {
        miembro: s(l, 'La UE tiene 27 miembros; Noruega, Suiza, Islandia y el Reino Unido no lo son.', 'The EU has 27 members; Norway, Switzerland, Iceland and the UK are not among them.', 'La UE té 27 membres; Noruega, Suïssa, Islàndia i el Regne Unit no en són.'),
        euro: s(l, 'Hoy la zona euro la forman 21 de los 27; no tienen euro Chequia, Dinamarca, Hungría, Polonia, Rumanía y Suecia.', 'Today 21 of the 27 use the euro; Czechia, Denmark, Hungary, Poland, Romania and Sweden do not.', 'Avui la zona euro la formen 21 dels 27; no tenen euro Txèquia, Dinamarca, Hongria, Polònia, Romania i Suècia.'),
        schengen: s(l, 'Schengen no es lo mismo que la UE: entran Noruega, Suiza e Islandia, y de la UE se quedan fuera Irlanda y Chipre.', 'Schengen is not the same as the EU: Norway, Switzerland and Iceland are in, and Ireland and Cyprus are out.', 'Schengen no és el mateix que la UE: hi entren Noruega, Suïssa i Islàndia, i de la UE en queden fora Irlanda i Xipre.'),
      }[r.variante]
      return `${s(l, 'Sí', 'Yes', 'Sí')}: ${si}. ${s(l, 'No', 'No', 'No')}: ${no}. ${regla}`
    }
    case 'anyos': return r.paises.map(iso => `${nom(iso, l)}: ${pais(iso).entrada}`).join(' · ') + '. ' + ANYO_FRASE[pais(r.paises[0]).entrada][ix(l)]
    case 'funciones': return r.insts.map(id => `${tx(INSTITUCIONES[id].nombre, l)}: ${tx(INSTITUCIONES[id].hace, l)}`).join(' ') + ' ' + DIFERENCIA[ix(l)]
    default: return SEDES[ix(l)]
  }
}

// Para los buscadores y el examen en texto: una pregunta de cada mecánica.
export function schemaQuestion(r, l) {
  switch (r.tipo) {
    case 'busca': {
      const p = pais(r.pais)
      const otros = cercanos(p, PAISES).slice(0, 3)
      return { question: s(l, `¿Cuál es la capital de ${nom(p.iso, l)}?`, `What is the capital of ${nom(p.iso, l)}?`, `Quina és la capital de ${nom(p.iso, l)}?`), correctAnswer: tx(p.capital, l), wrongAnswers: otros.map(x => tx(x.capital, l)) }
    }
    case 'pinta': {
      const no = r.grupo.find(iso => !tiene(r.variante, iso))
      const si = r.grupo.filter(iso => tiene(r.variante, iso)).slice(0, 3)
      const q = { miembro: s(l, '¿Cuál de estos países NO es miembro de la UE?', 'Which of these countries is NOT an EU member?', 'Quin d’aquests països NO és membre de la UE?'), euro: s(l, '¿Cuál de estos países NO usa el euro?', 'Which of these countries does NOT use the euro?', 'Quin d’aquests països NO fa servir l’euro?'), schengen: s(l, '¿Cuál de estos países NO está en Schengen?', 'Which of these countries is NOT in Schengen?', 'Quin d’aquests països NO és a Schengen?') }[r.variante]
      return { question: q, correctAnswer: nom(no, l), wrongAnswers: si.map(iso => nom(iso, l)) }
    }
    case 'anyos': {
      const iso = r.paises[0]
      return { question: s(l, `¿En qué año entró ${nom(iso, l)} en la Unión Europea?`, `In what year did ${nom(iso, l)} join the European Union?`, `En quin any va entrar ${nom(iso, l)} a la Unió Europea?`), correctAnswer: textoAnyo(pais(iso).entrada, l), wrongAnswers: r.cajas.filter(a => a !== pais(iso).entrada).map(a => textoAnyo(a, l)) }
    }
    case 'funciones': {
      const id = r.insts[0]
      return { question: `${tx(INSTITUCIONES[id].hace, l)} ${s(l, '¿Qué institución es?', 'Which institution is this?', 'Quina institució és?')}`, correctAnswer: tx(INSTITUCIONES[id].nombre, l), wrongAnswers: r.insts.slice(1).map(x => tx(INSTITUCIONES[x].nombre, l)) }
    }
    default: {
      const id = r.insts[0]
      const c = INSTITUCIONES[id].sede
      return { question: s(l, `¿Dónde tiene su sede oficial: ${tx(INSTITUCIONES[id].nombre, l)}?`, `Where is the official seat of the ${tx(INSTITUCIONES[id].nombre, l)}?`, `On té la seu oficial: ${tx(INSTITUCIONES[id].nombre, l)}?`), correctAnswer: tx(CIUDADES[c], l), wrongAnswers: Object.keys(CIUDADES).filter(x => x !== c).map(x => tx(CIUDADES[x], l)) }
    }
  }
}
