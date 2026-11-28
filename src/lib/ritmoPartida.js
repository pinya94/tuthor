// Ritmo de partida común a los juegos contra reloj (nov-2026).
//
// El problema que resuelve: con 90 s, +6 s por acierto y 4-5 s de pausa
// obligatoria tras cada respuesta, una partida «de 90 s» duraba unos 4 min y
// el alumno releía la misma explicación una y otra vez. Aquí:
//
//   · Perfiles, no un tiempo para todo (ver PERFILES).
//   · El bonus por acierto tiene TOPE por partida: el tiempo de juego nunca
//     pasa de base + bonusMax, así que la partida se acaba siempre.
//   · Acierto: confirmación breve y se pasa sola (revelarOkMs) con el reloj
//     parado.
//   · Fallo: corrección concreta con el reloj PARADO y un botón «Seguir»
//     (Enter/Espacio). Nada de espera forzada; autoSeguirMs opcional.
//   · Tiempo real jugado (sin las pausas de lectura) para saveActivity.
//
// La lógica es pura (RelojPartida recibe el «ahora») para poder probarla;
// el hook useRitmoPartida (lib/useRitmoPartida.js) la conecta a React.
//
// Cómo elegir perfil para un juego:
//   rapido        un toque por ronda (elegir estilo, tocar la celda…)
//   construccion  varias acciones por ronda (sentar 4 instrumentos, poner su
//                 proceso a 3 flechas…): el bonus es por acción acertada

export const PERFILES = {
  rapido: {
    base: 45,          // s de juego al empezar
    porAcierto: 1,     // s por ronda acertada
    porAccion: 0,      // (no se usa: una acción por ronda)
    porFallo: 5,       // s que quita un fallo
    bonusMax: 20,      // s de bonus como mucho en toda la partida
    revelarOkMs: 1000, // confirmación del acierto, reloj parado
    autoSeguirMs: null,// tras un fallo: null = solo con «Seguir»
  },
  construccion: {
    base: 60,
    porAcierto: 0,
    porAccion: 1,      // s por cada pieza de una ronda acertada (4 piezas → +4 s)
    porFallo: 5,
    bonusMax: 30,
    revelarOkMs: 1100,
    autoSeguirMs: null,
  },
}

export function perfil(p) {
  if (typeof p === 'string') {
    if (!PERFILES[p]) throw new Error(`[ritmoPartida] perfil desconocido: ${p}`)
    return PERFILES[p]
  }
  return { ...PERFILES.construccion, ...p }
}

// Tiempo máximo de JUEGO (sin pausas de lectura) que puede durar una partida.
export const duracionMaxima = p => perfil(p).base + perfil(p).bonusMax

// Segundos que da un acierto, sin pasar del tope de la partida.
export function bonusAcierto(p, acciones = 1, yaGanado = 0) {
  const pf = perfil(p)
  const bruto = pf.porAcierto + pf.porAccion * Math.max(1, acciones)
  return Math.max(0, Math.min(bruto, pf.bonusMax - yaGanado))
}

// Reloj de una partida. Todos los métodos reciben `ahora` en ms (performance.now()
// en el navegador, un número cualquiera en los tests).
//   estado: 'parado' (antes de empezar) | 'corre' | 'pausa' | 'fin'
export class RelojPartida {
  constructor(p) {
    this.p = perfil(p)
    this.estado = 'parado'
    this.restanteMs = this.p.base * 1000
    this.jugadoMs = 0
    this.bonusGanado = 0
    this.desde = null // cuándo empezó el tramo que corre
  }
  _cierra(ahora) {
    if (this.estado !== 'corre') return
    const d = Math.max(0, ahora - this.desde)
    const usado = Math.min(d, this.restanteMs)
    this.restanteMs -= usado
    this.jugadoMs += usado
    this.desde = ahora
    if (this.restanteMs <= 0) { this.restanteMs = 0; this.estado = 'fin' }
  }
  empezar(ahora) { this.estado = 'corre'; this.desde = ahora; return this }
  pausar(ahora) { this._cierra(ahora); if (this.estado === 'corre') this.estado = 'pausa'; return this }
  seguir(ahora) {
    if (this.estado !== 'pausa') return this
    if (this.restanteMs <= 0) { this.estado = 'fin'; return this }
    this.estado = 'corre'; this.desde = ahora; return this
  }
  // Ronda acertada: para el reloj (confirmación) y suma el bonus con tope.
  acierto(ahora, acciones = 1) {
    this.pausar(ahora)
    if (this.estado === 'fin') return 0
    const b = bonusAcierto(this.p, acciones, this.bonusGanado)
    this.bonusGanado += b
    this.restanteMs += b * 1000
    return b
  }
  // Ronda fallada: para el reloj (lectura) y quita porFallo. Si se queda a 0,
  // la partida acaba al pulsar «Seguir».
  fallo(ahora) {
    this.pausar(ahora)
    if (this.estado === 'fin') return 0
    const q = Math.min(this.p.porFallo * 1000, this.restanteMs)
    this.restanteMs -= q
    return q / 1000
  }
  terminar(ahora) { this._cierra(ahora); this.estado = 'fin'; return this }
  restante(ahora) {
    if (this.estado !== 'corre') return this.restanteMs / 1000
    return Math.max(0, this.restanteMs - (ahora - this.desde)) / 1000
  }
  jugado(ahora) {
    if (this.estado !== 'corre') return this.jugadoMs / 1000
    return (this.jugadoMs + Math.min(this.restanteMs, Math.max(0, ahora - this.desde))) / 1000
  }
  agotado(ahora) { return this.estado === 'fin' || (this.estado === 'corre' && this.restante(ahora) <= 0) }
}

// Simula una partida (para los tests y para elegir números): un jugador que
// tarda `segPorRonda` en cada ronda y acierta con probabilidad pAcierto.
// Devuelve el tiempo de juego, las rondas y si se acabó sola.
export function simularPartida(p, { segPorRonda = 3, acciones = 1, pAcierto = 1, rand = Math.random, maxRondas = 10000 } = {}) {
  const r = new RelojPartida(p)
  let t = 0
  r.empezar(t)
  let rondas = 0, aciertos = 0
  while (rondas < maxRondas) {
    t += segPorRonda * 1000
    if (r.agotado(t)) { r.terminar(t); break }
    rondas++
    if (rand() < pAcierto) { aciertos++; r.acierto(t, acciones) } else r.fallo(t)
    t += 5000 // pausa de lectura: no cuenta
    r.seguir(t)
    if (r.estado === 'fin') break
  }
  return { jugado: r.jugado(t), rondas, aciertos, termino: r.estado === 'fin' }
}

// Textos comunes de la barra de partida y de la corrección.
export const TXT = {
  seguir: { es: 'Seguir', en: 'Continue', ca: 'Continuar' },
  terminar: { es: 'Terminar', en: 'Finish', ca: 'Acabar' },
  terminarPartida: { es: 'Terminar partida', en: 'End game', ca: 'Acabar la partida' },
  porQue: { es: '¿Por qué?', en: 'Why?', ca: 'Per què?' },
  relojParado: { es: 'Reloj parado mientras lees', en: 'Clock paused while you read', ca: 'Rellotge aturat mentre llegeixes' },
  cambiarNivel: { es: 'Nivel', en: 'Level', ca: 'Nivell' },
}
