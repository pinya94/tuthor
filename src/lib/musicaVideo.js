// Musiquita del vídeo de los retos, compuesta aquí y sintetizada con Web Audio
// (sin ficheros ni derechos de nadie): 96 pulsos por minuto, la progresión
// Do – Sol – Lam – Fa con un colchón suave, un arpegio punteado y un bombo
// flojito. Se programa entera al darle a ▶ (hace falta un gesto del usuario
// para que el navegador deje sonar) y se apaga con un fundido al final.

const NOTA = n => 440 * 2 ** ((n - 69) / 12) // número MIDI → Hz
// Do mayor, Sol mayor, La menor, Fa mayor (en MIDI, octava 4)
const ACORDES = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]]
const PULSO = 60 / 96

export function creaMusica(duracion) {
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  const ctx = new AC()
  const master = ctx.createGain()
  master.gain.value = 0.9
  const filtro = ctx.createBiquadFilter()
  filtro.type = 'lowpass'
  filtro.frequency.value = 2600
  filtro.connect(master)
  master.connect(ctx.destination)

  const t0 = ctx.currentTime + 0.05
  const nota = (f, ini, dur, { tipo = 'triangle', vol = 0.05, ataque = 0.01, salida = dur } = {}) => {
    const o = ctx.createOscillator(), g = ctx.createGain()
    o.type = tipo
    o.frequency.value = f
    g.gain.setValueAtTime(0, ini)
    g.gain.linearRampToValueAtTime(vol, ini + ataque)
    g.gain.exponentialRampToValueAtTime(0.0001, ini + salida)
    o.connect(g).connect(filtro)
    o.start(ini)
    o.stop(ini + salida + 0.05)
  }

  const compases = Math.ceil(duracion / (4 * PULSO))
  for (let c = 0; c < compases; c++) {
    const ac = ACORDES[c % 4]
    const ini = t0 + c * 4 * PULSO
    // Colchón: el acorde entero, suave y largo
    for (const n of ac) nota(NOTA(n - 12), ini, 4 * PULSO, { tipo: 'sine', vol: 0.035, ataque: 0.4, salida: 4 * PULSO })
    // Bajo en la fundamental
    nota(NOTA(ac[0] - 24), ini, 2 * PULSO, { tipo: 'sine', vol: 0.09, ataque: 0.02, salida: 2 * PULSO })
    nota(NOTA(ac[0] - 24), ini + 2 * PULSO, 2 * PULSO, { tipo: 'sine', vol: 0.07, ataque: 0.02, salida: 2 * PULSO })
    // Arpegio en corcheas (desde el segundo compás, para que entre poco a poco)
    if (c > 0) {
      const arpa = [ac[0], ac[1], ac[2], ac[1] + 12, ac[2], ac[1], ac[0] + 12, ac[2]]
      arpa.forEach((n, k) => nota(NOTA(n), ini + k * PULSO / 2, PULSO / 2, { vol: 0.045, salida: 0.35 }))
    }
    // Bombo flojito en el 1 y el 3 (a partir del tercer compás)
    if (c > 1) {
      for (const b of [0, 2]) {
        const tb = ini + b * PULSO
        const o = ctx.createOscillator(), g = ctx.createGain()
        o.frequency.setValueAtTime(110, tb)
        o.frequency.exponentialRampToValueAtTime(45, tb + 0.12)
        g.gain.setValueAtTime(0.18, tb)
        g.gain.exponentialRampToValueAtTime(0.0001, tb + 0.18)
        o.connect(g).connect(master)
        o.start(tb)
        o.stop(tb + 0.2)
      }
    }
  }
  // Fundido final
  master.gain.setValueAtTime(0.9, t0 + duracion - 2.5)
  master.gain.linearRampToValueAtTime(0, t0 + duracion)

  return {
    pausa: () => ctx.suspend(),
    sigue: () => ctx.resume(),
    silencio: s => { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(s ? 0 : 0.9, ctx.currentTime) },
    cierra: () => ctx.close().catch(() => {}),
  }
}
