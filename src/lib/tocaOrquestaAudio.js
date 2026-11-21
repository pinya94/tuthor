// Audio de «Toca con la Orquesta» (solo navegador): la orquesta de fondo con
// muestras reales (FluidR3 GM, CC BY 3.0, en public/toca-orquesta/sf/), un
// sintetizador de reserva si no cargan, el metrónomo y el micro.
// El micro se procesa aquí mismo: no se graba ni se envía nada.
import { detectaNota, hzAMidi, midiAHz } from './tocaOrquesta'

const NOMBRE = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const archivo = m => `${NOMBRE[m % 12]}${Math.floor(m / 12) - 1}`

// Reserva sintetizada (los timbres de la app de estudio)
const SINTE = {
  violin: { type: 'sawtooth', f: 1800, q: 0.8, g: 0.09, att: 0.03 },
  viola: { type: 'sawtooth', f: 1500, q: 0.8, g: 0.09, att: 0.03 },
  cello: { type: 'sawtooth', f: 1100, q: 0.8, g: 0.1, att: 0.03 },
  contrabass: { type: 'triangle', f: 700, q: 1, g: 0.22, att: 0.01 },
  piano: { type: 'triangle', f: 3000, q: 0.7, g: 0.2, att: 0.005 },
}

export function creaMotor() {
  const AC = window.AudioContext || window.webkitAudioContext
  const ctx = new AC()
  const master = ctx.createGain()
  master.gain.value = 0.7
  master.connect(ctx.destination)
  const muestras = {} // `${timbre}/${midi}` → AudioBuffer
  const fuentes = new Set()
  let micro = null // { stream, analyser, buf }

  async function carga(timbre, midis) {
    await Promise.all([...new Set(midis)].map(async m => {
      const k = `${timbre}/${m}`
      if (muestras[k]) return
      try {
        const r = await fetch(`/toca-orquesta/sf/${timbre}/${archivo(m)}.mp3`)
        if (!r.ok || !(r.headers.get('content-type') || '').includes('audio')) return
        muestras[k] = await ctx.decodeAudioData(await r.arrayBuffer())
      } catch { /* se usará el sintetizador */ }
    }))
  }

  function nota(timbre, m, t, d, vol = 1) {
    const buf = muestras[`${timbre}/${m}`]
    const g = ctx.createGain()
    g.connect(master)
    const fin = t + Math.max(0.08, d * 0.95)
    if (buf) {
      const s = ctx.createBufferSource()
      s.buffer = buf
      s.connect(g)
      g.gain.setValueAtTime(0.0001, t)
      g.gain.linearRampToValueAtTime(0.8 * vol, t + 0.02)
      g.gain.setValueAtTime(0.8 * vol, fin - 0.06)
      g.gain.linearRampToValueAtTime(0.0001, fin + 0.08)
      s.start(t)
      s.stop(fin + 0.1)
      fuentes.add(s)
      s.onended = () => fuentes.delete(s)
      return
    }
    const tb = SINTE[timbre] ?? SINTE.violin
    const o = ctx.createOscillator(), fl = ctx.createBiquadFilter()
    o.type = tb.type
    o.frequency.value = midiAHz(m)
    fl.type = 'lowpass'; fl.frequency.value = tb.f; fl.Q.value = tb.q
    const pico = tb.g * vol
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(pico, t + tb.att)
    g.gain.setValueAtTime(pico * 0.85, Math.max(t + tb.att, fin - 0.04))
    g.gain.linearRampToValueAtTime(0, fin)
    o.connect(fl); fl.connect(g)
    o.start(t); o.stop(fin + 0.02)
    fuentes.add(o)
    o.onended = () => fuentes.delete(o)
  }

  function click(t, acento, vol = 1) {
    const o = ctx.createOscillator(), g = ctx.createGain()
    o.frequency.value = acento ? 1600 : 1100
    g.gain.setValueAtTime(0.35 * vol, t)
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.05)
    o.connect(g); g.connect(master)
    o.start(t); o.stop(t + 0.06)
    fuentes.add(o)
    o.onended = () => fuentes.delete(o)
  }

  function para() {
    for (const s of fuentes) { try { s.stop() } catch { /* ya parada */ } }
    fuentes.clear()
  }

  async function abreMicro() {
    if (micro) return true
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } })
      const src = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 2048
      src.connect(analyser)
      micro = { stream, analyser, buf: new Float32Array(analyser.fftSize) }
      return true
    } catch {
      return false
    }
  }
  // Una muestra del micro: { t (reloj de audio, centrado en la ventana), rms, m }
  function escucha(minHz) {
    if (!micro) return null
    micro.analyser.getFloatTimeDomainData(micro.buf)
    const { rms, f } = detectaNota(micro.buf, ctx.sampleRate, minHz)
    return { t: ctx.currentTime - micro.analyser.fftSize / ctx.sampleRate / 2, rms, m: hzAMidi(f) }
  }
  function cierraMicro() {
    if (!micro) return
    micro.stream.getTracks().forEach(tr => tr.stop())
    micro = null
  }

  // Retardo del micro (como la app de estudio): 6 golpes, tocas con cada uno
  async function calibra() {
    if (!(await abreMicro())) return { error: 'micro' }
    const n = 6, gap = 0.8, t0 = ctx.currentTime + 0.6
    for (let k = 0; k < n; k++) click(t0 + k * gap, true)
    const frames = []
    const end = t0 + n * gap + 0.5
    await new Promise(res => {
      const id = setInterval(() => { frames.push(escucha(110)); if (ctx.currentTime >= end) { clearInterval(id); res() } }, 16)
    })
    const suelo = frames.slice(0, 10).reduce((s, f) => s + f.rms, 0) / 10
    const umbral = Math.max(0.02, suelo * 4)
    const offs = []
    for (let k = 0; k < n; k++) {
      const c = t0 + k * gap
      const on = frames.find(f => f.t > c - 0.15 && f.t < c + 0.5 && f.rms > umbral)
      if (on) offs.push(on.t - c)
    }
    if (offs.length < 3) return { error: 'pocas' }
    offs.sort((a, b) => a - b)
    return { ms: Math.max(0, Math.min(400, Math.round((offs[Math.floor(offs.length / 2)] * 1000) / 10) * 10)) }
  }

  function cierra() { para(); cierraMicro(); ctx.close().catch(() => {}) }

  return { ctx, carga, nota, click, para, abreMicro, escucha, cierraMicro, calibra, cierra, tieneMicro: () => !!micro }
}
