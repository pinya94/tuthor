// «Entras y juegas» (fase 2 de la portada de juegos, nov-2026): quien toca
// un juego en la cuadrícula de la portada o de /juegos llega con
// state = { jugar: true } y el juego arranca ya, en su nivel por defecto
// (fácil), sin pasar por la pantalla de presentación. Quien llega desde
// Google o por un enlace directo sigue viendo la presentación, que es la que
// lleva el texto para buscadores y el «cómo se juega».
//
// Uso: useArranqueDirecto(startGame) después de definir startGame y antes de
// cualquier return. Se dispara una sola vez y limpia el state, para que
// volver atrás o recargar no relance la partida.
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const ESTADO_JUGAR = { jugar: true }

export function useArranqueDirecto(empezar) {
  const location = useLocation()
  const navigate = useNavigate()
  const hecho = useRef(false)
  useEffect(() => {
    if (hecho.current || !location.state?.jugar) return
    hecho.current = true
    navigate(location.pathname + location.search, { replace: true, state: { ...location.state, jugar: false } })
    empezar()
  }, [location, navigate, empezar])
}
