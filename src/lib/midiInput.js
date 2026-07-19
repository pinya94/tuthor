// ── Entrada MIDI opcional ────────────────────────────────────────────────────
// Conecta un piano/teclado MIDI real (USB o Bluetooth) y traduce sus notas a
// la octava que el piano virtual espera, transportando cualquier octava
// física que se toque. Solo Chrome/Edge soportan Web MIDI en el navegador —
// Safari y Firefox no lo implementan.
//
// La conexión se gestiona con un hook a nivel de página (no dentro del
// piano) para poder conectar desde la pantalla de inicio, antes de que
// empiece la partida — así el usuario sabe si su piano está listo ANTES de
// que el playhead se ponga en marcha, en vez de tener que encontrar el
// botón mientras el juego ya corre.

import { useCallback, useEffect, useRef, useState } from 'react'

const PITCH_CLASSES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export function isMidiSupported() {
  return typeof navigator !== 'undefined' && 'requestMIDIAccess' in navigator
}

// Transporta cualquier nota MIDI a la octava del juego. El DO siempre cae en
// octavaBase (el DO agudo de arriba no es alcanzable por MIDI) — a cambio,
// tocar en cualquier octava física del teclado real funciona sin configurar nada.
export function transponer(midiNote, octavaBase) {
  return `${PITCH_CLASSES[midiNote % 12]}${octavaBase}`
}

/**
 * Hook de conexión MIDI persistente a nivel de página.
 * - `estado`: 'desconectado' | 'conectando' | 'conectado'
 * - `conectar()`: pide acceso; devuelve { ok, reason } — reason es
 *   'unsupported' o 'denied' si ok es false (el caller decide qué alerta
 *   mostrar, en su idioma).
 * - `onNoteRef`: ref mutable — quien esté escuchando en cada momento
 *   (nadie durante la intro, la pantalla de juego durante la partida)
 *   asigna `onNoteRef.current = midiNote => ...`. Así la conexión
 *   establecida en la intro sigue viva al entrar en la partida, sin
 *   tener que volver a pedir permiso.
 */
export function useMidiPiano() {
  const [estado, setEstado] = useState('desconectado')
  const onNoteRef = useRef(null)
  const inputsRef = useRef([])
  const handleMessageRef = useRef((e) => {
    const [status, note, velocity] = e.data
    const isNoteOn = (status & 0xf0) === 0x90 && velocity > 0
    if (isNoteOn) onNoteRef.current?.(note)
  })

  const conectar = useCallback(async () => {
    if (estado === 'conectado') return { ok: true }
    if (!isMidiSupported()) return { ok: false, reason: 'unsupported' }
    setEstado('conectando')
    try {
      const access = await navigator.requestMIDIAccess()
      const inputs = [...access.inputs.values()]
      inputs.forEach(input => input.addEventListener('midimessage', handleMessageRef.current))
      inputsRef.current = inputs
      setEstado('conectado')
      return { ok: true }
    } catch {
      setEstado('desconectado')
      return { ok: false, reason: 'denied' }
    }
  }, [estado])

  useEffect(() => () => {
    inputsRef.current.forEach(input => input.removeEventListener('midimessage', handleMessageRef.current))
  }, [])

  return { estado, conectar, onNoteRef }
}
