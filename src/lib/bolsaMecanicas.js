// Bolsa de mecánicas de UNA partida (nov-2026), común a los juegos con varias
// mecánicas por nivel (Ciclo de las rocas, La Orquesta…).
//
// Los tipos de ronda del nivel se barajan en una bolsa y se van sacando; al
// vaciarse se rellena. Se saca el primero que no haga la tercera ronda
// seguida de la misma mecánica (maxSeguidas). Se crea al empezar cada partida
// y no se arrastra a la siguiente. Los reintentos están acotados: un nivel con
// una sola mecánica no tiene salida y entonces se repite.
//
//   const bolsa = crearBolsaMecanicas(['sienta', 'clasifica'], { rand })
//   const tipo = sacarDeBolsa(bolsa)
//
// `mecanica(tipo)`: qué mecánica es cada tipo (por defecto, el propio tipo;
// en Ciclo de las rocas «tipo» y «subtipo» son la misma: clasifica).

export const MAX_SEGUIDAS = 2

export function barajar(rand, xs) {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

export function crearBolsaMecanicas(tipos, { rand = Math.random, mecanica = t => t, maxSeguidas = MAX_SEGUIDAS } = {}) {
  return { tipos, rand, mecanica, maxSeguidas, saco: [], historial: [] }
}

export function sacarDeBolsa(bolsa) {
  const { mecanica: mec, maxSeguidas } = bolsa
  const ult = bolsa.historial.slice(-maxSeguidas).map(mec)
  const bloqueada = ult.length === maxSeguidas && ult.every(m => m === ult[0]) ? ult[0] : null
  if (!bolsa.saco.length) bolsa.saco = barajar(bolsa.rand, bolsa.tipos)
  let i = bolsa.saco.findIndex(t => mec(t) !== bloqueada)
  for (let k = 0; i < 0 && k < 5; k++) {
    bolsa.saco.push(...barajar(bolsa.rand, bolsa.tipos))
    i = bolsa.saco.findIndex(t => mec(t) !== bloqueada)
  }
  if (i < 0) i = 0
  const [t] = bolsa.saco.splice(i, 1)
  bolsa.historial.push(t)
  return t
}
