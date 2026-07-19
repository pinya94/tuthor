// ── Botón de conexión MIDI compartido ────────────────────────────────────────
// Usa el hook useMidiPiano (src/lib/midiInput.js) pasado como prop `midi`,
// para que la conexión se establezca a nivel de página (normalmente en la
// pantalla de inicio, antes de empezar a jugar) y siga viva durante la
// partida sin volver a pedir permiso.

import { useLang } from '../context/LangContext'

export default function MidiConnectButton({ midi, className = '' }) {
  const { tr } = useLang()

  async function handle() {
    const res = await midi.conectar()
    if (!res.ok) {
      alert(res.reason === 'unsupported'
        ? tr({
            es: 'La entrada MIDI solo funciona en Chrome o Edge — este navegador no la soporta.',
            en: 'MIDI input only works in Chrome or Edge — this browser does not support it.',
            ca: 'L\'entrada MIDI només funciona a Chrome o Edge — aquest navegador no la suporta.',
          })
        : tr({
            es: 'No se pudo conectar con el piano MIDI. Revisa que esté enchufado y que hayas dado permiso al navegador.',
            en: 'Could not connect to the MIDI piano. Check it\'s plugged in and that you granted the browser permission.',
            ca: 'No s\'ha pogut connectar amb el piano MIDI. Comprova que estigui endollat i que hagis donat permís al navegador.',
          }))
    }
  }

  return (
    <button onClick={handle} disabled={midi.estado !== 'desconectado'}
      className={`w-full flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl border transition-colors ${
        midi.estado === 'conectado' ? 'text-green-400 border-green-400/30 bg-green-400/10'
        : 'text-white/50 border-white/10 bg-white/5 hover:text-white/80 hover:border-white/20'
      } ${className}`}>
      {midi.estado === 'conectado'
        ? tr({ es: '🎹 Piano MIDI conectado', en: '🎹 MIDI piano connected', ca: '🎹 Piano MIDI connectat' })
        : midi.estado === 'conectando'
          ? tr({ es: 'Conectando…', en: 'Connecting…', ca: 'Connectant…' })
          : tr({ es: '🎹 Conectar piano MIDI (opcional, solo Chrome/Edge)', en: '🎹 Connect MIDI piano (optional, Chrome/Edge only)', ca: '🎹 Connectar piano MIDI (opcional, només Chrome/Edge)' })}
    </button>
  )
}
