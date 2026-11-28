// Hook del ritmo de partida (ver lib/ritmoPartida.js).
//
//   const ritmo = useRitmoPartida('construccion', { onSiguiente, onFin })
//   ritmo.empezar()                 al empezar (o reempezar) la partida
//   ritmo.responder(bien, acciones) al cerrar una ronda
//   ritmo.seguir()                  botón «Seguir» tras un fallo
//   ritmo.terminar()                botón «Terminar partida»
//   ritmo.fase      'jugando' | 'acierto' | 'fallo' | 'fin'
//   ritmo.restante  segundos que quedan (entero, para el reloj)
//   ritmo.delta     lo que cambió el reloj en la última respuesta (+4, −5…)
//   ritmo.total     segundos de referencia para el color del reloj
//
// onSiguiente(): pide la ronda siguiente (tras el acierto o tras «Seguir»).
// onFin({ jugadoSeg }): la partida terminó; jugadoSeg es el tiempo de juego
// REAL, sin las pausas de lectura: es lo que va a saveActivity.timeSpent.
import { useState, useRef, useEffect, useCallback } from 'react'
import { RelojPartida, perfil as getPerfil } from './ritmoPartida'

const ahora = () => (typeof performance !== 'undefined' ? performance.now() : Date.now())

export function useRitmoPartida(perfilId, { onSiguiente, onFin } = {}) {
  const pf = getPerfil(perfilId)
  const reloj = useRef(null)
  const [fase, setFase] = useState('jugando')
  const [restante, setRestante] = useState(pf.base)
  const [delta, setDelta] = useState(0)
  const pasoRef = useRef(null)
  // Los callbacks cambian en cada render de la página: se leen por ref.
  const cb = useRef({ onSiguiente, onFin })
  useEffect(() => { cb.current = { onSiguiente, onFin } })

  const limpiar = () => { clearTimeout(pasoRef.current); pasoRef.current = null }

  const acabar = useCallback(() => {
    limpiar()
    const r = reloj.current
    if (!r || r.finalizado) return
    r.terminar(ahora())
    r.finalizado = true
    setRestante(Math.ceil(r.restante(ahora())))
    setFase('fin')
    cb.current.onFin?.({ jugadoSeg: Math.round(r.jugado(ahora())) })
  }, [])

  const empezar = useCallback(() => {
    limpiar()
    reloj.current = new RelojPartida(perfilId).empezar(ahora())
    setRestante(reloj.current.p.base)
    setDelta(0)
    setFase('jugando')
  }, [perfilId])

  // El tic del reloj: solo mientras corre.
  useEffect(() => {
    if (fase !== 'jugando') return
    const id = setInterval(() => {
      const r = reloj.current
      if (!r) return
      if (r.agotado(ahora())) { acabar(); return }
      setRestante(Math.ceil(r.restante(ahora())))
    }, 200)
    return () => clearInterval(id)
  }, [fase, acabar])

  const continuar = useCallback(() => {
    limpiar()
    const r = reloj.current
    if (!r || r.finalizado) return
    r.seguir(ahora())
    if (r.estado === 'fin') { acabar(); return }
    setRestante(Math.ceil(r.restante(ahora())))
    setFase('jugando')
    cb.current.onSiguiente?.()
  }, [acabar])

  const responder = useCallback((bien, acciones = 1) => {
    const r = reloj.current
    if (!r || r.estado !== 'corre') return
    if (bien) {
      const b = r.acierto(ahora(), acciones)
      setDelta(b)
      setFase('acierto')
      pasoRef.current = setTimeout(continuar, r.p.revelarOkMs)
    } else {
      const q = r.fallo(ahora())
      setDelta(-q)
      setFase('fallo')
      if (r.p.autoSeguirMs) pasoRef.current = setTimeout(continuar, r.p.autoSeguirMs)
    }
    setRestante(Math.ceil(r.restante(ahora())))
  }, [continuar])

  useEffect(() => () => clearTimeout(pasoRef.current), [])

  return {
    fase, restante, delta, total: pf.base, perfil: pf,
    empezar, responder, seguir: continuar, terminar: acabar,
    jugadoSeg: () => (reloj.current ? Math.round(reloj.current.jugado(ahora())) : 0),
  }
}
