// ── Pentagrama Path: piano virtual ───────────────────────────────────────────
// Una octava (DO-DO) clicable, con teclas negras y mapeo a teclado físico:
// blancas A S D F G H J K, negras W E T Y U. La octava real que representa
// depende de `octavaBase` (4 en clave de sol, 3 en clave de fa). También
// admite un piano MIDI real conectado por USB/Bluetooth (solo Chrome/Edge).

import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext'
import { isMidiSupported, connectMidi } from '../lib/midiInput'

const WHITE_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
const WHITE_KEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k']
// tecla física → nombre de negra (posicionada tras la blanca whiteIdx)
const BLACKS = [
  { name: 'C#', whiteIdx: 0, key: 'w' },
  { name: 'D#', whiteIdx: 1, key: 'e' },
  { name: 'F#', whiteIdx: 3, key: 't' },
  { name: 'G#', whiteIdx: 4, key: 'y' },
  { name: 'A#', whiteIdx: 5, key: 'u' },
]

const NOTE_NAMES = {
  es: { C: 'DO', D: 'RE', E: 'MI', F: 'FA', G: 'SOL', A: 'LA', B: 'SI' },
  ca: { C: 'DO', D: 'RE', E: 'MI', F: 'FA', G: 'SOL', A: 'LA', B: 'SI' },
  en: { C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', A: 'A', B: 'B' },
}

function whitePitch(idx, octavaBase) {
  return idx === 7 ? `C${octavaBase + 1}` : `${WHITE_LETTERS[idx]}${octavaBase}`
}

/**
 * Props:
 *  - octavaBase  octava del DO grave (4 → DO4-DO5, 3 → DO3-DO4)
 *  - onKey       (pitch) => void — pulsación de tecla (ratón o teclado físico)
 *  - hintPitch   tecla resaltada como pista tras un fallo (o null)
 *  - conNegras   si se muestran las teclas negras (fases con alteraciones)
 *  - disabled    ignora la entrada (entre melodías, count-in ya acepta)
 */
export default function PianoVirtual({ octavaBase = 4, onKey, hintPitch = null, conNegras = false, disabled = false }) {
  const { lang, tr } = useLang()
  const names = NOTE_NAMES[lang] || NOTE_NAMES.es
  const [pressed, setPressed] = useState(null)
  const [midiEstado, setMidiEstado] = useState('desconectado') // desconectado | conectando | conectado
  const onKeyRef = useRef(onKey)
  onKeyRef.current = onKey
  const disabledRef = useRef(disabled)
  disabledRef.current = disabled
  const octavaBaseRef = useRef(octavaBase)
  octavaBaseRef.current = octavaBase

  function press(pitch) {
    if (disabledRef.current) return
    setPressed(pitch)
    setTimeout(() => setPressed(p => (p === pitch ? null : p)), 140)
    onKeyRef.current?.(pitch)
  }
  const pressRef = useRef(press)
  pressRef.current = press

  useEffect(() => {
    function handle(e) {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      const wi = WHITE_KEYS.indexOf(k)
      if (wi >= 0) { e.preventDefault(); pressRef.current(whitePitch(wi, octavaBase)); return }
      const b = BLACKS.find(x => x.key === k)
      if (b && conNegras) { e.preventDefault(); pressRef.current(`${b.name}${octavaBase}`) }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [octavaBase, conNegras])

  // Piano MIDI real: se conecta bajo demanda (gesto del usuario) y se
  // desconecta solo al desmontar. octavaBaseRef evita tener que reconectar
  // si la octava cambia a mitad de partida (p.ej. fase 4, clave de fa).
  const midiCleanupRef = useRef(null)
  useEffect(() => () => midiCleanupRef.current?.(), [])

  async function conectarMidi() {
    if (!isMidiSupported()) {
      alert(tr({
        es: 'La entrada MIDI solo funciona en Chrome o Edge — este navegador no la soporta.',
        en: 'MIDI input only works in Chrome or Edge — this browser does not support it.',
        ca: 'L\'entrada MIDI només funciona a Chrome o Edge — aquest navegador no la suporta.',
      }))
      return
    }
    setMidiEstado('conectando')
    try {
      midiCleanupRef.current = await connectMidi(octavaBaseRef, pitch => pressRef.current(pitch))
      setMidiEstado('conectado')
    } catch {
      setMidiEstado('desconectado')
      alert(tr({
        es: 'No se pudo conectar con el piano MIDI. Revisa que esté enchufado y que hayas dado permiso al navegador.',
        en: 'Could not connect to the MIDI piano. Check it\'s plugged in and that you granted the browser permission.',
        ca: 'No s\'ha pogut connectar amb el piano MIDI. Comprova que estigui endollat i que hagis donat permís al navegador.',
      }))
    }
  }

  return (
    <div className="relative select-none touch-manipulation">
      <div className="flex justify-center mb-1.5">
        <button onClick={conectarMidi} disabled={midiEstado !== 'desconectado'}
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
            midiEstado === 'conectado' ? 'text-green-400 border-green-400/30 bg-green-400/10'
            : 'text-white/30 border-white/10 hover:text-white/60 hover:border-white/20'
          }`}>
          {midiEstado === 'conectado'
            ? tr({ es: '🎹 Piano MIDI conectado', en: '🎹 MIDI piano connected', ca: '🎹 Piano MIDI connectat' })
            : midiEstado === 'conectando'
              ? tr({ es: 'Conectando…', en: 'Connecting…', ca: 'Connectant…' })
              : tr({ es: '🎹 Conectar piano MIDI (solo Chrome/Edge)', en: '🎹 Connect MIDI piano (Chrome/Edge only)', ca: '🎹 Connectar piano MIDI (només Chrome/Edge)' })}
        </button>
      </div>
      <div className="relative" style={{ height: 148 }}>
      <div className="flex h-full gap-[3px]">
        {WHITE_LETTERS.map((letter, i) => {
          const pitch = whitePitch(i, octavaBase)
          const isHint = hintPitch === pitch
          const isPressed = pressed === pitch
          return (
            <button key={i}
              onPointerDown={() => press(pitch)}
              className={`flex-1 rounded-b-lg border flex flex-col items-center justify-end pb-2 transition-colors duration-75 ${
                isHint ? 'bg-amber-300 border-amber-400 animate-pulse'
                : isPressed ? 'bg-white/60 border-white'
                : 'bg-white/90 hover:bg-white border-white/40 active:bg-white/70'
              }`}>
              <span className="text-black/70 font-bold text-[11px] sm:text-xs leading-none">{names[letter]}</span>
              <span className="text-black/30 text-[9px] mt-0.5 hidden sm:block uppercase">{WHITE_KEYS[i]}</span>
            </button>
          )
        })}
      </div>
      {conNegras && BLACKS.map(b => {
        const pitch = `${b.name}${octavaBase}`
        const isHint = hintPitch === pitch
        const isPressed = pressed === pitch
        const left = `${((b.whiteIdx + 1) / 8) * 100}%`
        return (
          <button key={b.name}
            onPointerDown={e => { e.stopPropagation(); press(pitch) }}
            style={{ left, width: '8%', transform: 'translateX(-50%)', height: '58%' }}
            className={`absolute top-0 rounded-b-md border flex flex-col items-center justify-end pb-1.5 z-10 transition-colors duration-75 ${
              isHint ? 'bg-amber-500 border-amber-400 animate-pulse'
              : isPressed ? 'bg-neutral-600 border-white/40'
              : 'bg-neutral-900 hover:bg-neutral-800 border-white/20'
            }`}>
            <span className="text-white/70 font-bold text-[9px] leading-none">{names[b.name[0]]}♯</span>
            <span className="text-white/25 text-[8px] mt-0.5 hidden sm:block uppercase">{b.key}</span>
          </button>
        )
      })}
      </div>
    </div>
  )
}
