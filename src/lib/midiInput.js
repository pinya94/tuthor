// ── Entrada MIDI opcional ────────────────────────────────────────────────────
// Conecta un piano/teclado MIDI real (USB o Bluetooth) y traduce sus notas a
// la octava que el piano virtual espera (octavaBase..octavaBase+1),
// transportando cualquier octava física que se toque. Solo Chrome/Edge
// soportan Web MIDI en el navegador — Safari y Firefox no lo implementan.

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

// Escucha todos los dispositivos MIDI conectados y llama a onNote(pitch) en
// cada pulsación (nota con velocity > 0; nota-off suele llegar como
// note-on con velocity 0, se ignora igual que un note-off real).
// `octavaBaseRef` es un ref para no tener que reconectar si la octava
// cambia a mitad de partida (p.ej. al pasar a clave de fa).
// Devuelve una función de limpieza, o lanza si el usuario deniega el permiso.
export async function connectMidi(octavaBaseRef, onNote) {
  const access = await navigator.requestMIDIAccess()
  function handleMessage(e) {
    const [status, note, velocity] = e.data
    const isNoteOn = (status & 0xf0) === 0x90 && velocity > 0
    if (isNoteOn) onNote(transponer(note, octavaBaseRef.current))
  }
  const inputs = [...access.inputs.values()]
  inputs.forEach(input => input.addEventListener('midimessage', handleMessage))
  return () => inputs.forEach(input => input.removeEventListener('midimessage', handleMessage))
}
