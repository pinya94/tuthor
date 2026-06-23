import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { generarPuzzle, aplicar, OP_STYLE } from '../lib/mathEngine'
import { useLang } from '../context/LangContext'

const ALL_OPS = ['+', '-', '×', '÷']

const DIFS = {
  facil:   { label: 'Fácil', labelEn: 'Easy',   emoji: '🟢', vidasIni: 3, tiempoBase: 90, objMin: 10, objMax: 50,  countIni: 5, numMax: 10, ops: ['+', '-'] },
  medio:   { label: 'Medio', labelEn: 'Medium', emoji: '🟡', vidasIni: 0, tiempoBase: 60, objMin: 15, objMax: 99,  countIni: 5, numMax: 10, ops: ['+', '-', '×'] },
  dificil: { label: 'Difícil', labelEn: 'Hard', emoji: '🔴', vidasIni: 0, tiempoBase: 45, objMin: 20, objMax: 250, countIni: 4, numMax: 15, ops: ['+', '-', '×', '÷'] },
}

const MEJORAS_POOL = {
  es: [
    { id: 'tiempo', emoji: '⏱️', titulo: '+4 segundos',         desc: 'Añade 4s al tiempo de todos los niveles siguientes' },
    { id: 'numero', emoji: '🔢', titulo: '+1 número',           desc: 'Un número extra disponible para combinar en cada puzzle' },
    { id: 'escudo', emoji: '🛡️', titulo: 'Segunda oportunidad', desc: 'Absorbe el próximo fallo y continúas la run', soloFacil: true },
    { id: 'bonus',  emoji: '✨', titulo: '×1.1 puntos',         desc: 'Multiplica todos los puntos futuros por 1.1', soloMedioPlus: true },
  ],
  en: [
    { id: 'tiempo', emoji: '⏱️', titulo: '+4 seconds',         desc: 'Adds 4s to the timer for all following levels' },
    { id: 'numero', emoji: '🔢', titulo: '+1 number',           desc: 'An extra number available to combine in each puzzle' },
    { id: 'escudo', emoji: '🛡️', titulo: 'Second chance',       desc: 'Absorbs the next failure and you continue the run', soloFacil: true },
    { id: 'bonus',  emoji: '✨', titulo: '×1.1 points',         desc: 'Multiplies all future points by 1.1', soloMedioPlus: true },
  ],
}

const AUI = {
  es: {
    titulo: 'Modo Roguelike', desc: 'Supera niveles, elige mejoras, llega lo más lejos posible',
    volver: '← Volver', empezar: '¡Empezar run!', clasico: '¿Prefieres entrenar sin presión? → Modo clásico',
    vidas: 'Vidas', sinVidas: 'Sin vidas — un fallo y termina', tiempo: 'Tiempo', objetivo: 'Objetivo',
    numeros: 'Números', cartas: 'cartas para combinar', operaciones: 'Operaciones', puntos: 'Puntos',
    puntosDesc: 'Tiempo sobrante × 10 por nivel acertado', mejoras: 'Mejoras', mejorasDesc: 'Cada 3 niveles elige una mejora permanente',
    comoFunciona: 'Cómo funciona', paso1: 'Llega exactamente al objetivo combinando números',
    paso2: 'Si aciertas, sumas los segundos que sobraban × 10', paso3: 'Cada 3 niveles elige una mejora permanente',
    paso4: 'Si fallas o se acaba el tiempo, la run termina',
    nivel: 'Nivel', mejoraEn: 'Mejora en', niveles: 'nivel', nivelesP: 'niveles',
    mejoraAlSuperar: '🎁 ¡Mejora al superar este nivel!', nivelSuperado: 'superado',
    eligeMejora: 'Elige una mejora permanente para el resto de la run', ptsAcumulados: 'pts acumulados',
    escudoActivado: '🛡️ ¡Escudo activado! Intento de nuevo...', fallo: '💔 ¡Fallo!', teQuedan: 'Te quedan',
    vida: 'vida', vidasP: 'vidas', tiempoAgotado: '⏱️ ¡Tiempo agotado!', continuando: 'Continuando...',
    fin: 'Fin de la run', nuevaRun: 'Nueva run', menu: 'Menú', compartir: '📤 Compartir resultado',
    copiar: '📋 Copiar texto', copiado: '✅ ¡Copiado!', cerrar: '✕',
    compartirTitulo: 'Compartir resultado', compartirSub: 'Copia el texto y compártelo donde quieras',
    selecciona: 'Selecciona un número para empezar', disponibles: 'Números disponibles', sinNumeros: 'Sin números — reinicia o termina',
    operacion: 'Operación', deshacer: '↩ Deshacer', reiniciar: '🔄 Reiniciar', divNoExacta: 'División no exacta',
    escudo: 'Escudo', esteNivel: 'pts este nivel',
  },
  en: {
    titulo: 'Roguelike Mode', desc: 'Beat levels, pick upgrades, go as far as you can',
    volver: '← Back', empezar: 'Start run!', clasico: 'Prefer stress-free practice? → Classic mode',
    vidas: 'Lives', sinVidas: 'No lives — one miss and it is over', tiempo: 'Time', objetivo: 'Target',
    numeros: 'Numbers', cartas: 'cards to combine', operaciones: 'Operations', puntos: 'Points',
    puntosDesc: 'Remaining time × 10 per correct level', mejoras: 'Upgrades', mejorasDesc: 'Every 3 levels pick a permanent upgrade',
    comoFunciona: 'How it works', paso1: 'Reach the target exactly by combining numbers',
    paso2: 'If correct, remaining seconds × 10 = your score', paso3: 'Every 3 levels pick a permanent upgrade',
    paso4: 'If you miss or time runs out, the run ends',
    nivel: 'Level', mejoraEn: 'Upgrade in', niveles: 'level', nivelesP: 'levels',
    mejoraAlSuperar: '🎁 Upgrade on beating this level!', nivelSuperado: 'cleared',
    eligeMejora: 'Pick a permanent upgrade for the rest of the run', ptsAcumulados: 'pts accumulated',
    escudoActivado: '🛡️ Shield activated! Trying again...', fallo: '💔 Miss!', teQuedan: 'You have',
    vida: 'life', vidasP: 'lives', tiempoAgotado: '⏱️ Time is up!', continuando: 'Continuing...',
    fin: 'Run over', nuevaRun: 'New run', menu: 'Menu', compartir: '📤 Share result',
    copiar: '📋 Copy text', copiado: '✅ Copied!', cerrar: '✕',
    compartirTitulo: 'Share result', compartirSub: 'Copy the text and share it wherever you like',
    selecciona: 'Select a number to start', disponibles: 'Available numbers', sinNumeros: 'No numbers — reset or finish',
    operacion: 'Operation', deshacer: '↩ Undo', reiniciar: '🔄 Reset', divNoExacta: 'Non-exact division',
    escudo: 'Shield', esteNivel: 'pts this level',
  },
}

function getMejorasDisponibles(difId, rd, lang) {
  const pool = MEJORAS_POOL[lang] || MEJORAS_POOL.es
  return pool.filter(m => {
    if (m.soloFacil && difId !== 'facil') return false
    if (m.soloMedioPlus && difId === 'facil') return false
    if (m.id === 'escudo' && rd.escudo) return false
    return true
  })
}

function calcTiempo(dif, nivel, bonusTiempo) {
  return Math.max(10, dif.tiempoBase - (nivel - 1) * 2 + bonusTiempo)
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

let _uid = 1
const uid = () => _uid++

function Confetti() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    canvas.width = window.innerWidth; canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    const COLORS = ['#EDAE49', '#a78bfa', '#34d399', '#f87171', '#60a5fa', '#fb923c']
    const ps = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width, y: -Math.random() * 200,
      vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 4,
      size: 5 + Math.random() * 8, color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2, rs: (Math.random() - .5) * .15, rect: Math.random() > .5,
    }))
    let alive = true
    function draw() {
      if (!alive) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let any = false
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.rot += p.rs
        if (p.y < canvas.height + 20) any = true
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color
        if (p.rect) ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill() }
        ctx.restore()
      }
      if (any) requestAnimationFrame(draw)
    }
    draw()
    return () => { alive = false }
  }, [])
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-50" />
}

export default function AcercateRoguelike() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const au = AUI[lang] || AUI.es
  const dl = d => lang === 'en' ? (d.labelEn || d.label) : d.label

  // ── UI ───────────────────────────────────────────────────────────────────
  const [fase, setFase] = useState('intro')
  const [difId, setDifId] = useState('medio')

  // ── Run data ─────────────────────────────────────────────────────────────
  const [rd, setRd] = useState(null)
  const [score, setScore] = useState(0)
  const [levelKey, setLevelKey] = useState(0)

  // ── Puzzle state ─────────────────────────────────────────────────────────
  const [objetivo, setObjetivo] = useState(null)
  const [numeros, setNumeros] = useState([])
  const [sel1, setSel1] = useState(null)
  const [opSel, setOpSel] = useState(null)
  const [previousSel, setPreviousSel] = useState(null)
  const [historial, setHistorial] = useState([])
  const [tiempo, setTiempo] = useState(60)
  const [tiempoTotal, setTiempoTotal] = useState(60)
  const [flashId, setFlashId] = useState(null)
  const [errorFlash, setErrorFlash] = useState(false)
  const [victoria, setVictoria] = useState(false)
  const [opciones, setOpciones] = useState([])
  const [falloMsg, setFalloMsg] = useState('')
  const [levelScore, setLevelScore] = useState(null)

  // ── Share modal ──────────────────────────────────────────────────────────
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)

  const timerRef = useRef(null)
  const tiempoRef = useRef(60)
  const numerosRef = useRef(numeros)
  const objetivoRef = useRef(objetivo)
  const rdRef = useRef(rd)
  numerosRef.current = numeros
  objetivoRef.current = objetivo
  rdRef.current = rd

  // ── Timer — levelKey fuerza reinicio aunque fase no cambie ───────────────
  useEffect(() => {
    if (fase !== 'jugando') return
    timerRef.current = setInterval(() => {
      tiempoRef.current -= 1
      setTiempo(tiempoRef.current)
      if (tiempoRef.current <= 0) {
        clearInterval(timerRef.current)
        acabar(true)
      }
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [fase, levelKey]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Iniciar nivel ────────────────────────────────────────────────────────
  function iniciarNivel(runData, resetScore = false) {
    const dif = DIFS[runData.difId]
    const t = calcTiempo(dif, runData.nivel, runData.bonusTiempo)
    const objMax = Math.min(dif.objMax, dif.objMin + 30 + runData.nivel * 10)
    const cfg = {
      objMin: dif.objMin, objMax: objMax,
      count: dif.countIni + runData.bonusCount,
      numMax: dif.numMax,
      tiempo: t,
    }
    const { vals, objetivo: obj } = generarPuzzle(cfg, dif.ops)
    const nums = vals.map(v => ({ id: uid(), valor: v }))
    tiempoRef.current = t
    setObjetivo(obj)
    setNumeros(nums)
    setSel1(null); setOpSel(null); setPreviousSel(null); setHistorial([])
    setTiempo(t); setTiempoTotal(t)
    setVictoria(false); setFlashId(null); setLevelScore(null)
    setRd(runData)
    if (resetScore) setScore(0)
    setLevelKey(k => k + 1)
    setFase('jugando')
  }

  function startRun() {
    const dif = DIFS[difId]
    iniciarNivel({
      nivel: 1, vidas: dif.vidasIni,
      bonusTiempo: 0, bonusCount: 0,
      escudo: false, mejoras: [],
      multiplicador: 1.0,
      difId,
    }, true)
  }

  // ── Fin de nivel ─────────────────────────────────────────────────────────
  function acabar(porTiempo = false, numerosAct, objetivoAct) {
    clearInterval(timerRef.current)
    const cur = rdRef.current
    const nums = numerosAct ?? numerosRef.current
    const obj  = objetivoAct ?? objetivoRef.current

    let diff = obj
    if (nums.length > 0) {
      const mejor = nums.map(n => n.valor).reduce((a, b) =>
        Math.abs(a - obj) < Math.abs(b - obj) ? a : b)
      diff = Math.abs(mejor - obj)
    }
    const exact = diff === 0

    if (exact) {
      const mult = cur.multiplicador || 1.0
      const pts = Math.round(tiempoRef.current * 10 * mult)
      setScore(s => s + pts)
      setLevelScore(pts)
      setVictoria(true)
      const nextNivel = cur.nivel + 1
      if (cur.nivel % 3 === 0) {
        setTimeout(() => {
          const pool = getMejorasDisponibles(cur.difId, cur, lang)
          setOpciones(shuffle(pool).slice(0, 3))
          setRd({ ...cur, nivel: nextNivel })
          setFase('mejora')
        }, 1400)
      } else {
        setTimeout(() => iniciarNivel({ ...cur, nivel: nextNivel }), 1200)
      }
    } else {
      if (cur.escudo) {
        setFalloMsg('🛡️ ¡Escudo activado! Intento de nuevo...')
        const newRd = { ...cur, escudo: false }
        setRd(newRd)
        setFase('fallo')
        setTimeout(() => iniciarNivel(newRd), 2000)
      } else {
        const newVidas = cur.vidas - 1
        const newRd = { ...cur, vidas: Math.max(newVidas, 0) }
        setRd(newRd)
        if (cur.vidas > 0) {
          setFalloMsg(`💔 ¡Fallo! Te quedan ${newVidas} vida${newVidas !== 1 ? 's' : ''}`)
          setFase('fallo')
          if (newVidas === 0) {
            setTimeout(() => setFase('resultado'), 2000)
          } else {
            setTimeout(() => iniciarNivel(newRd), 2000)
          }
        } else {
          setFalloMsg(porTiempo ? '⏱️ ¡Tiempo agotado!' : '💔 ¡Fallo!')
          setFase('fallo')
          setTimeout(() => setFase('resultado'), 2000)
        }
      }
    }
  }

  function elegirMejora(mejora) {
    const cur = rdRef.current
    const newRd = { ...cur, mejoras: [...cur.mejoras, mejora.id] }
    if (mejora.id === 'tiempo') newRd.bonusTiempo += 4
    if (mejora.id === 'numero') newRd.bonusCount += 1
    if (mejora.id === 'escudo') newRd.escudo = true
    if (mejora.id === 'bonus')  newRd.multiplicador = Math.round(((cur.multiplicador || 1.0) + 0.1) * 10) / 10
    iniciarNivel(newRd)
  }

  // ── Share ────────────────────────────────────────────────────────────────
  function getShareTexto() {
    const dif = DIFS[rd?.difId || difId]
    const mult = (rd?.multiplicador || 1) > 1 ? ` · ×${(rd.multiplicador).toFixed(1)}` : ''
    return `⚔️ He llegado al nivel ${rd?.nivel} con ${score.toLocaleString()} pts en Acércate al Número${mult}\n${dif.emoji} Modo ${dif.label} — parece fácil, pero no lo es. ¿Puedes superarme?\n🎮 https://www.tuthor.es/juegos/acercate`
  }

  function copiarTexto() {
    navigator.clipboard.writeText(getShareTexto()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  function compartirEn(red) {
    const texto = encodeURIComponent(getShareTexto())
    const urls = {
      twitter:  `https://twitter.com/intent/tweet?text=${texto}`,
      whatsapp: `https://wa.me/?text=${texto}`,
      telegram: `https://t.me/share/url?url=https%3A%2F%2Ftuthor.app%2Fjuegos%2Facercate&text=${texto}`,
    }
    window.open(urls[red], '_blank', 'noopener')
  }

  // ── Puzzle interactions ──────────────────────────────────────────────────
  function clickNumero(n) {
    if(previousSel) { setPreviousSel(null); }
    if (!sel1) { setSel1(n); return }
    if (n.id === sel1.id) { setSel1(null); setOpSel(null); return }
    if (!opSel) { setSel1(n); return }

    const res = aplicar(sel1.valor, opSel, n.valor)
    if (res === null) {
      setErrorFlash(true)
      setTimeout(() => setErrorFlash(false), 500)
      return
    }
    setHistorial(h => [...h, numeros])
    const newId = uid()
    const nuevos = numeros.filter(x => x.id !== sel1.id && x.id !== n.id).concat([{ id: newId, valor: res }])
    setNumeros(nuevos)
    setFlashId(newId)
    setTimeout(() => setFlashId(null), 700)
    setSel1(null); setOpSel(null)
    setPreviousSel({ id: newId, valor: res })

    const hayVictoria = nuevos.some(x => x.valor === objetivo)
    if (hayVictoria || nuevos.length === 1) {
      setPreviousSel(null)
      clearInterval(timerRef.current)
      setTimeout(() => acabar(false, nuevos, objetivo), 600)
    }
  }

  function clickOp(op) {
    if (!sel1 && previousSel) { setSel1(previousSel) }
    else if(!sel1) return
    setOpSel(prev => prev === op ? null : op)
  }

  function undo() {
    if (historial.length === 0) return
    setNumeros(historial[historial.length - 1])
    setHistorial(h => h.slice(0, -1))
    setSel1(null); setOpSel(null); setPreviousSel(null)
  }

  function resetear() {
    if (historial.length === 0) return
    setNumeros(historial[0])
    setHistorial([]); setSel1(null); setOpSel(null); setPreviousSel(null)
  }

  // ═══════════════════════════════════════════════════════════════════════
  // INTRO
  if (fase === 'intro') {
    const dif = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {au.volver}
          </button>
          <div className="text-center mb-6">
            <span className="text-6xl block mb-3">⚔️</span>
            <h1 className="text-3xl font-black text-white mb-1">{au.titulo}</h1>
            <p className="text-white/40 text-sm">{au.desc}</p>
          </div>
          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-5 w-fit mx-auto">
            {Object.entries(DIFS).map(([id, d]) => (
              <button key={id} onClick={() => setDifId(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  difId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {d.emoji} {d.label}
              </button>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-2.5 text-sm">
            {[
              ['❤️', 'Vidas',    dif.vidasIni > 0 ? `${dif.vidasIni} vidas` : 'Sin vidas — un fallo y termina'],
              ['⏱️', 'Tiempo',   `${dif.tiempoBase}s (−2s por nivel, sin límite)`],
              ['🎯', 'Objetivo', `${dif.objMin}–${dif.objMax}`],
              ['🃏', 'Números',  `${dif.countIni} cartas para combinar`],
              ['➕', 'Operaciones', dif.ops.join('  ')],
              ['⭐', 'Puntos',   'Tiempo sobrante × 10 por nivel acertado'],
              ['🎁', 'Mejoras',  'Cada 3 niveles elige una mejora permanente'],
            ].map(([e, k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4">
                <span className="text-white/40 shrink-0">{e} {k}</span>
                <span className="text-white font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Cómo funciona</p>
            <div className="space-y-2">
              {[
                ['🎯', 'Llega exactamente al objetivo combinando números'],
                ['✅', 'Si aciertas, sumas los segundos que sobraban × 10'],
                ['⬆️', 'Cada 3 niveles elige una mejora permanente'],
                ['💥', 'Si fallas o se acaba el tiempo, la run termina'],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={startRun}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            {au.empezar}
          </button>
          <button onClick={() => navigate(localPath('/juegos/acercate/clasico'))}
            className="w-full py-3 mt-3 text-white/30 hover:text-white/60 text-sm transition-colors">
            {au.clasico}
          </button>
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  // MEJORA
  if (fase === 'mejora') return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-3">🎁</div>
        <h2 className="text-2xl font-black text-white mb-1">¡Nivel {(rd?.nivel || 1) - 1} superado!</h2>
        <p className="text-white/40 text-sm mb-2">Elige una mejora permanente para el resto de la run</p>
        <p className="text-amber-400 font-bold text-sm mb-8">⭐ {score.toLocaleString()} pts acumulados</p>
        <div className="space-y-3">
          {opciones.map(m => (
            <button key={m.id} onClick={() => elegirMejora(m)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-2xl p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.98] group">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{m.emoji}</span>
                <div>
                  <p className="font-black text-white text-lg group-hover:text-amber-300 transition-colors">{m.titulo}</p>
                  <p className="text-white/45 text-sm mt-0.5">{m.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // ═══════════════════════════════════════════════════════════════════════
  // FALLO
  if (fase === 'fallo') return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full text-center">
        <div className="text-7xl mb-5 animate-bounce">
          {falloMsg.startsWith('🛡️') ? '🛡️' : '💥'}
        </div>
        <h2 className="text-2xl font-black text-white mb-3">{falloMsg}</h2>
        {rd?.vidas > 0 && (
          <div className="flex gap-1.5 justify-center mt-4">
            {Array.from({ length: DIFS[rd.difId].vidasIni }).map((_, i) => (
              <span key={i} className={`text-2xl ${i < rd.vidas ? '' : 'opacity-20'}`}>❤️</span>
            ))}
          </div>
        )}
        <p className="text-white/30 text-sm mt-4">Continuando...</p>
      </div>
    </div>
  )

  // ═══════════════════════════════════════════════════════════════════════
  // RESULTADO
  if (fase === 'resultado') {
    const nivelAlcanzado = rd?.nivel || 1
    const difLabel = DIFS[rd?.difId || difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
          <div className="max-w-md w-full text-center">
            <div className="text-7xl mb-4">🏁</div>
            <h2 className="text-3xl font-black text-white mb-1">{au.fin}</h2>
            <p className="text-white/40 text-sm mb-6">{difLabel.emoji} {difLabel.label}</p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-1">{au.nivel}</p>
                <p className="text-4xl font-black text-white">{nivelAlcanzado}</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                <p className="text-amber-400/70 text-xs uppercase tracking-widest font-semibold mb-1">{au.puntos}</p>
                <p className="text-4xl font-black text-amber-400">{score.toLocaleString()}</p>
              </div>
            </div>

            {rd?.mejoras?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
                <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">{au.mejoras}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {rd.mejoras.map((id, i) => {
                    const m = MEJORAS_POOL.find(x => x.id === id)
                    return (
                      <span key={i} className="bg-white/10 rounded-xl px-3 py-1.5 text-sm font-semibold text-white flex items-center gap-1.5">
                        <span>{m?.emoji}</span> {m?.titulo}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-center mb-3">
              <button onClick={startRun}
                className="px-8 py-3 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all hover:scale-[1.02]">
                {au.nuevaRun}
              </button>
              <button onClick={() => setFase('intro')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all">
                {au.menu}
              </button>
            </div>

            <button onClick={() => setShowShare(true)}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/60 hover:text-white font-semibold rounded-2xl transition-all text-sm flex items-center justify-center gap-2">
              <span>📤</span> {au.compartir}
            </button>
          </div>

        {/* Modal compartir */}
        {showShare && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowShare(false)} />
            <div className="relative bg-[#1a1a2e] border border-white/15 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
              <button onClick={() => setShowShare(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors text-xl leading-none">
                ✕
              </button>
              <h3 className="text-lg font-black text-white mb-1">Compartir resultado</h3>
              <p className="text-white/40 text-sm mb-4">Copia el texto y compártelo donde quieras</p>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 text-sm text-white/70 whitespace-pre-line leading-relaxed font-mono select-all">
                {getShareTexto()}
              </div>

              <button onClick={copiarTexto}
                className={`w-full py-3 rounded-2xl border font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                  copied
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60 hover:text-white'
                }`}>
                {copied ? '✅ ¡Copiado!' : '📋 Copiar texto'}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  // JUGANDO
  const tiempoRatio = tiempo / tiempoTotal
  const tiempoColor = tiempoRatio > 0.5 ? 'text-green-400' : tiempoRatio > 0.2 ? 'text-amber-400' : 'text-red-400 animate-pulse'
  const nivelEnBloque = rd ? ((rd.nivel - 1) % 3) + 1 : 1
  const progreso = nivelEnBloque / 3
  const esMejora = nivelEnBloque === 3
  const dif = DIFS[rd?.difId || difId]
  const mostrarVidasOEscudo = dif.vidasIni > 0 || rd?.escudo

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 sm:px-6 py-4 max-w-lg mx-auto w-full select-none">
      {victoria && <Confetti />}

      {/* Barra de progreso */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1.5">
          <span>Nivel {rd?.nivel}</span>
          <span className={esMejora ? 'text-amber-400 animate-pulse' : ''}>
            {esMejora ? '🎁 ¡Mejora al superar este nivel!' : `Mejora en ${3 - nivelEnBloque} nivel${3 - nivelEnBloque !== 1 ? 'es' : ''}`}
          </span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${esMejora ? 'bg-amber-400' : 'bg-violet-500'}`}
            style={{ width: `${progreso * 100}%` }}
          />
        </div>
      </div>

      {/* HUD */}
      <div className={`grid gap-2 mb-3 ${mostrarVidasOEscudo ? 'grid-cols-4' : 'grid-cols-3'}`}>
        <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-2 px-1">
          <span className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">Nivel</span>
          <span className="text-white font-bold text-sm mt-0.5">{dif.emoji} {rd?.nivel}</span>
        </div>
        <div className="flex flex-col items-center bg-amber-500/15 border-2 border-amber-500/50 rounded-2xl py-2 px-1">
          <span className="text-amber-400/70 text-[9px] uppercase tracking-widest font-semibold">Objetivo</span>
          <span className="text-amber-300 font-black text-3xl leading-none">{objetivo}</span>
        </div>
        <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-2 px-1">
          <span className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">Tiempo</span>
          <span className={`font-black text-xl leading-none mt-0.5 ${tiempoColor}`}>{tiempo}s</span>
        </div>
        {mostrarVidasOEscudo && (
          <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl py-2 px-1">
            <span className="text-white/30 text-[9px] uppercase tracking-wider font-semibold">
              {rd?.escudo ? 'Escudo' : 'Vidas'}
            </span>
            <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
              {rd?.escudo
                ? <span className="text-lg">🛡️</span>
                : Array.from({ length: dif.vidasIni }).map((_, i) => (
                    <span key={i} className={`text-sm ${i < (rd?.vidas || 0) ? '' : 'opacity-20'}`}>❤️</span>
                  ))
              }
            </div>
          </div>
        )}
      </div>

      {/* Puntos */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-white/25 text-xs font-semibold">
          ⭐ {score.toLocaleString()} pts
          {rd?.multiplicador > 1 && (
            <span className="text-violet-400 ml-1.5">×{rd.multiplicador.toFixed(1)}</span>
          )}
        </span>
        {levelScore !== null && (
          <span className="text-amber-400 text-xs font-black animate-pulse">+{levelScore} pts este nivel</span>
        )}
      </div>

      {/* Fórmula */}
      <div className={`rounded-2xl border-2 p-3 mb-3 min-h-[56px] flex items-center justify-center gap-4 transition-all ${
        errorFlash ? 'border-red-500/70 bg-red-900/20'
          : sel1    ? 'border-violet-500/40 bg-violet-900/10'
          :            'border-white/10 bg-white/3'
      }`}>
        {!sel1 ? (
          <p className="text-white/20 text-sm">Selecciona un número para empezar</p>
        ) : (
          <>
            <span className="text-white font-black text-3xl">{sel1.valor}</span>
            {opSel
              ? <><span className="text-amber-400 font-black text-3xl">{opSel}</span><span className="text-white/30 font-black text-3xl">?</span></>
              : <span className="text-white/20 font-black text-3xl">?</span>
            }
          </>
        )}
        {errorFlash && <span className="text-red-400 text-sm font-bold absolute">División no exacta</span>}
      </div>

      {/* Números */}
      <div className="mb-3">
        <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2 font-semibold text-center">Números disponibles</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {numeros.map(n => {
            const isSelected = sel1?.id === n.id
            const isFlash = flashId === n.id
            return (
              <button key={n.id} onClick={() => clickNumero(n)}
                className={`w-16 h-16 rounded-2xl font-black text-xl border-2 transition-all duration-150 ${
                  isFlash    ? 'bg-[#EDAE49] border-amber-300 text-black scale-125 shadow-xl shadow-amber-500/50 z-10'
                  : isSelected ? 'bg-violet-600 border-violet-400 text-white scale-110 shadow-lg shadow-violet-500/40'
                  :               'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95'
                }`}>
                {n.valor}
              </button>
            )
          })}
        </div>
      </div>

      {/* Operadores */}
      <div className="mb-3">
        <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2 font-semibold text-center">Operación</p>
        <div className="grid grid-cols-4 gap-2">
          {(DIFS[rd?.difId || difId].ops).map(op => {
            const style = OP_STYLE[op]
            const active = opSel === op
            const disabled = !sel1 && !previousSel
            return (
              <button key={op} onClick={() => clickOp(op)} disabled={disabled}
                className={`h-14 rounded-2xl font-black text-2xl border-2 transition-all duration-150 ${
                  active   ? `${style.activeClass} scale-105 shadow-lg`
                  : disabled ? 'bg-white/3 border-white/8 text-white/15 cursor-not-allowed'
                  :             'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95'
                }`}>
                {style.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Controles */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={undo} disabled={!historial.length}
          className="py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white font-bold rounded-2xl transition-all text-sm">
          ↩ Deshacer
        </button>
        <button onClick={resetear} disabled={historial.length === 0}
          className="py-3 bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white/60 hover:text-white font-bold rounded-2xl transition-all text-sm">
          🔄 Reiniciar
        </button>
      </div>
    </div>
  )
}
