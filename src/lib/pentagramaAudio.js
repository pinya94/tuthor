// ── Pentagrama Path: motor de audio ──────────────────────────────────────────
// Web Audio API con osciladores sintetizados: sin samples ni librerías.
// El contexto se crea perezosamente en el primer gesto del usuario
// (los navegadores bloquean AudioContext antes de una interacción).

let ctx = null

export function ensureAudio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

const SEMITONES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }

// 'F#3' → Hz (A4 = 440)
export function noteToFreq(pitch) {
  const m = /^([A-G])(#?)(\d)$/.exec(pitch)
  if (!m) return 440
  const midi = (Number(m[3]) + 1) * 12 + SEMITONES[m[1]] + (m[2] ? 1 : 0)
  return 440 * Math.pow(2, (midi - 69) / 12)
}

// Nota de piano sintetizada: triángulo + armónico suave y envolvente corta.
export function playNote(pitch, dur = 0.4) {
  const ac = ensureAudio()
  if (!ac) return
  const t0 = ac.currentTime
  const freq = noteToFreq(pitch)

  const gain = ac.createGain()
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(0.22, t0 + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  gain.connect(ac.destination)

  const osc = ac.createOscillator()
  osc.type = 'triangle'
  osc.frequency.value = freq
  osc.connect(gain)

  const osc2 = ac.createOscillator()
  osc2.type = 'sine'
  osc2.frequency.value = freq * 2
  const g2 = ac.createGain()
  g2.gain.value = 0.25
  osc2.connect(g2)
  g2.connect(gain)

  osc.start(t0)
  osc2.start(t0)
  osc.stop(t0 + dur + 0.05)
  osc2.stop(t0 + dur + 0.05)
}

// Click de metrónomo: blip corto, más agudo en el acento (primer pulso).
export function playClick(accent = false) {
  const ac = ensureAudio()
  if (!ac) return
  const t0 = ac.currentTime
  const gain = ac.createGain()
  gain.gain.setValueAtTime(accent ? 0.16 : 0.09, t0)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.06)
  gain.connect(ac.destination)
  const osc = ac.createOscillator()
  osc.type = 'square'
  osc.frequency.value = accent ? 1500 : 1000
  osc.connect(gain)
  osc.start(t0)
  osc.stop(t0 + 0.07)
}
