// ── Diagnóstico ──────────────────────────────────────────────────────────────
// Mecánica tipo "¿Quién es Quién?" para Ciencias: el jugador elige un tema,
// ve el tablero completo de candidatos desde el inicio y va descartando según
// pistas que se ACUMULAN (a diferencia de quien-es-quien, aquí no sustituyen
// a la anterior — el jugador puede repasar todas). Sin cronómetro: lo que
// puntúa es cuántas pistas hicieron falta, no la velocidad.
//
// Cada "partida" es una ronda (un candidato secreto dentro del tema elegido).
// El mazo de rondas de un tema se baraja sin repetición dentro de la sesión
// (mazoRef), igual que hace Reacción con sus escenarios.
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { TEMAS_DIAGNOSTICO, getTemaDiagnostico } from '../data/diagnostico'

function barajar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function puntosPorPistas(pistasReveladas, penalizaciones) {
  const base = pistasReveladas <= 2 ? 100 : pistasReveladas === 3 ? 70 : 40
  return Math.max(0, base - penalizaciones * 20)
}

// ── TARJETA DE CANDIDATO ─────────────────────────────────────────────────────
function Tarjeta({ c, nombre, tachado, bloqueado, modoConfirmar, resultado, onClick }) {
  let opacidad = 'opacity-100'
  let escala = 'scale-100'
  let anillo = ''
  let overlay = null

  if (resultado === 'correcto') { anillo = 'ring-2 ring-green-400'; escala = 'scale-110' }
  else if (resultado === 'incorrecto') { opacidad = 'opacity-40' }
  else if (resultado === 'revelado') { anillo = 'ring-2 ring-amber-400'; escala = 'scale-105' }
  else if (bloqueado) {
    opacidad = 'opacity-15'
    overlay = (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-xl">🔒</span>
      </div>
    )
  } else if (tachado) {
    opacidad = 'opacity-25'
    overlay = (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-8 h-8 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <line x1="4" y1="4" x2="20" y2="20" /><line x1="20" y1="4" x2="4" y2="20" />
        </svg>
      </div>
    )
  } else if (modoConfirmar) {
    anillo = 'ring-2 ring-violet-400/60 hover:ring-violet-400'; escala = 'hover:scale-105'
  } else {
    escala = 'hover:scale-105'; opacidad = 'hover:opacity-90'
  }

  const cursor = bloqueado ? 'cursor-not-allowed' : 'cursor-pointer'

  return (
    <div
      className={`relative rounded-xl shadow transition-all duration-200 select-none ${cursor} ${opacidad} ${escala} ${anillo}`}
      style={{ backgroundColor: c.color, width: '100%', paddingBottom: '100%' }}
      onClick={bloqueado ? undefined : onClick}
    >
      <div style={{ position: 'absolute', inset: 0 }} className="flex flex-col items-center justify-center p-2 sm:p-3 overflow-hidden">
        {resultado === 'correcto' && <span className="text-2xl">✓</span>}
        {resultado === 'revelado' && <span className="text-2xl">★</span>}
        {resultado !== 'correcto' && resultado !== 'revelado' && (
          <p className="text-white font-bold text-center leading-tight" style={{ fontSize: 'clamp(7px, 1.1vw, 13px)', wordBreak: 'break-word' }}>
            {nombre}
          </p>
        )}
      </div>
      {overlay}
    </div>
  )
}

// ── SELECTOR DE TEMA ─────────────────────────────────────────────────────────
function TemaSelect({ onElegir, lang, tr }) {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-6">
          <span className="text-6xl mb-4 block">🩺</span>
          <h1 className="text-3xl font-black text-white mb-2">{tr({ es: 'Diagnóstico', en: 'Diagnosis', ca: 'Diagnòstic' })}</h1>
          <p className="text-white/50 text-sm">
            {tr({ es: 'Descarta candidatos con cada pista hasta confirmar tu diagnóstico', en: 'Rule out candidates with every clue until you confirm your diagnosis', ca: 'Descarta candidats amb cada pista fins a confirmar el teu diagnòstic' })}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-3">
          {[
            { icon: '🎴', title: tr({ es: 'Tablero completo desde el inicio', en: 'Full board from the start', ca: 'Tauler complet des de l\'inici' }), desc: tr({ es: 'Todos los candidatos están visibles desde el primer momento.', en: 'Every candidate is visible right from the start.', ca: 'Tots els candidats són visibles des del primer moment.' }) },
            { icon: '💡', title: tr({ es: 'Las pistas se acumulan', en: 'Clues stack up', ca: 'Les pistes s\'acumulen' }), desc: tr({ es: 'Cada pista nueva se suma a las anteriores: puedes repasarlas todas.', en: 'Every new clue is added to the previous ones: you can review them all.', ca: 'Cada pista nova se suma a les anteriors: pots repassar-les totes.' }) },
            { icon: '⚠️', title: tr({ es: 'Ojo con descartar al correcto', en: 'Watch out for discarding the right one', ca: 'Vigila a l\'hora de descartar el correcte' }), desc: tr({ es: 'Si descartas la opción correcta pierdes puntos y no hay marcha atrás.', en: "If you discard the correct option you lose points, and there's no undo.", ca: 'Si descartes l\'opció correcta perds punts i no hi ha marxa enrere.' }) },
          ].map(r => (
            <div key={r.title} className="flex items-start gap-4">
              <span className="text-2xl">{r.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm">{r.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3 text-center">
          {tr({ es: 'Elige un tema', en: 'Choose a topic', ca: 'Tria un tema' })}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {TEMAS_DIAGNOSTICO.map(t => (
            <button
              key={t.id}
              onClick={() => onElegir(t.id)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-400/50 rounded-2xl p-4 text-center transition-all"
            >
              <span className="text-4xl block mb-2">{t.emoji}</span>
              <span className="text-white font-bold text-sm">{tr(t.titulo)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── JUEGO ─────────────────────────────────────────────────────────────────────
export default function Diagnostico() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [fase, setFase] = useState('temaSelect') // temaSelect | jugando | fin
  const [temaId, setTemaId] = useState(null)
  const [ronda, setRonda] = useState(null)
  const [pistaIdx, setPistaIdx] = useState(0)
  const [descartados, setDescartados] = useState(new Set())
  const [bloqueados, setBloqueados] = useState(new Set())
  const [penalizaciones, setPenalizaciones] = useState(0)
  const [modoConfirmar, setModoConfirmar] = useState(false)
  const [resultados, setResultados] = useState({}) // id -> 'correcto' | 'incorrecto' | 'revelado'
  const [popupDescarte, setPopupDescarte] = useState(null) // candidato a punto de descartarse (es el correcto)
  const [popupConfirm, setPopupConfirm] = useState(null) // candidato único restante a confirmar
  const [finalizado, setFinalizado] = useState(null) // { acierto, puntos }

  const savedRef = useRef(false)
  const mazoRef = useRef({}) // temaId -> [índices de ronda pendientes]

  const tema = temaId ? getTemaDiagnostico(temaId) : null

  function siguienteRonda(id) {
    const t = getTemaDiagnostico(id)
    if (!mazoRef.current[id] || mazoRef.current[id].length === 0) {
      mazoRef.current[id] = barajar(t.rondas.map((_, i) => i))
    }
    const idx = mazoRef.current[id].shift()
    savedRef.current = false
    setTemaId(id)
    setRonda(t.rondas[idx])
    setPistaIdx(0)
    setDescartados(new Set())
    setBloqueados(new Set())
    setPenalizaciones(0)
    setModoConfirmar(false)
    setResultados({})
    setPopupDescarte(null)
    setPopupConfirm(null)
    setFinalizado(null)
    setFase('jugando')
  }

  function toggleDescarte(c) {
    if (modoConfirmar || bloqueados.has(c.id) || finalizado) return
    if (descartados.has(c.id)) {
      setDescartados(prev => { const n = new Set(prev); n.delete(c.id); return n })
      return
    }
    if (c.id === ronda.respuesta) {
      setPopupDescarte(c)
      return
    }
    setDescartados(prev => new Set(prev).add(c.id))
  }

  function confirmarDescarteCorrecto() {
    const c = popupDescarte
    setPopupDescarte(null)
    setDescartados(prev => new Set(prev).add(c.id))
    setBloqueados(prev => new Set(prev).add(c.id))
    setPenalizaciones(p => p + 1)
  }

  function resolverRonda(candidato) {
    const acierto = candidato.id === ronda.respuesta
    const pts = puntosPorPistas(pistaIdx + 1, penalizaciones)
    setModoConfirmar(false)
    setPopupConfirm(null)
    if (acierto) {
      setResultados({ [candidato.id]: 'correcto' })
    } else {
      setResultados({ [candidato.id]: 'incorrecto', [ronda.respuesta]: 'revelado' })
    }
    guardarYFinalizar(acierto, acierto ? pts : 0)
  }

  function rendirse() {
    setModoConfirmar(false)
    setResultados({ [ronda.respuesta]: 'revelado' })
    guardarYFinalizar(false, 0)
  }

  function guardarYFinalizar(acierto, pts) {
    setTimeout(() => {
      setFinalizado({ acierto, puntos: pts })
      if (user && !savedRef.current) {
        savedRef.current = true
        saveActivity(user.uid, {
          type: 'juego', game: 'diagnostico', category: temaId,
          score: pts, passed: acierto, timeSpent: 0,
          coinsEarned: computeCoins('diagnostico', { score: pts }),
          userName: user.displayName, userPhoto: user.photoURL,
        }).catch(() => {})
      }
      setTimeout(() => setFase('fin'), 1400)
    }, 700)
  }

  // ── SEO + selector de tema ──────────────────────────────────────────────
  if (fase === 'temaSelect') {
    return (
      <>
        <SEOHead
          title={tr({ es: 'Diagnóstico — Juego de deducción científica', en: 'Diagnosis — Science deduction game', ca: 'Diagnòstic — Joc de deducció científica' })}
          description={tr({ es: 'Descarta candidatos con pistas científicas progresivas y confirma tu diagnóstico. Cuerpo humano, rocas, materia y tabla periódica.', en: 'Rule out candidates with progressive science clues and confirm your diagnosis. Human body, rocks, matter and the periodic table.', ca: 'Descarta candidats amb pistes científiques progressives i confirma el teu diagnòstic. Cos humà, roques, matèria i taula periòdica.' })}
          path="/juegos/diagnostico"
          lang={lang}
        />
        <TemaSelect onElegir={siguienteRonda} lang={lang} tr={tr} />
      </>
    )
  }

  // ── Pantalla final ────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const shareText = tr({
      es: `He conseguido ${finalizado.puntos} pts en Diagnóstico 🩺 — ¿puedes superarme? https://tuthor.es/juegos/diagnostico`,
      en: `I scored ${finalizado.puntos} pts in Diagnosis 🩺 — can you beat me? https://tuthor.es/juegos/diagnostico`,
      ca: `He aconseguit ${finalizado.puntos} pts a Diagnòstic 🩺 — em pots superar? https://tuthor.es/juegos/diagnostico`,
    })
    const respuesta = tema.candidatos.find(c => c.id === ronda.respuesta)
    return (
      <GameEndScreen
        game="diagnostico"
        emoji={finalizado.acierto ? '🩺' : '🔍'}
        title={tr(tema.titulo)}
        score={finalizado.puntos}
        message={
          finalizado.acierto
            ? tr({ es: `¡Diagnóstico correcto! Era ${tr(respuesta.nombre)}.`, en: `Correct diagnosis! It was ${tr(respuesta.nombre)}.`, ca: `Diagnòstic correcte! Era ${tr(respuesta.nombre)}.` })
            : tr({ es: `No era esta vez. Era ${tr(respuesta.nombre)}.`, en: `Not this time. It was ${tr(respuesta.nombre)}.`, ca: `Aquesta vegada no. Era ${tr(respuesta.nombre)}.` })
        }
        stats={[
          { label: tr({ es: 'Pistas usadas', en: 'Clues used', ca: 'Pistes usades' }), value: pistaIdx + 1 },
          { label: tr({ es: 'Descartes erróneos', en: 'Wrong discards', ca: 'Descartaments erronis' }), value: penalizaciones },
        ]}
        shareText={shareText}
        onPlayAgain={() => siguienteRonda(temaId)}
        playAgainLabel={tr({ es: '▶ Otra ronda', en: '▶ Another round', ca: '▶ Una altra ronda' })}
        secondaryActions={[
          { label: tr({ es: 'Cambiar de tema', en: 'Change topic', ca: 'Canviar de tema' }), onClick: () => setFase('temaSelect') },
          { label: tr({ es: '← Volver a juegos', en: '← Back to games', ca: '← Tornar a jocs' }), onClick: () => navigate(localPath('/juegos')) },
        ]}
        user={user} lang={lang}
      >
        <div className="mt-4 pt-4 border-t border-white/10 text-left">
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-2">
            {tr({ es: 'Dato curioso', en: 'Fun fact', ca: 'Dada curiosa' })}
          </p>
          <p className="text-white/70 text-sm leading-relaxed">{tr(ronda.dato_extra)}</p>
        </div>
      </GameEndScreen>
    )
  }

  // ── Tablero de juego ──────────────────────────────────────────────────────
  const activos = tema.candidatos.filter(c => !descartados.has(c.id) && !resultados[c.id])
  const hayMasPistas = pistaIdx < ronda.pistas.length - 1
  const bloqueado = Boolean(finalizado)

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-2 sm:px-6 py-3">

      {/* Popup: a punto de descartar al correcto */}
      {popupDescarte && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <span className="text-5xl block mb-3">⚠️</span>
            <h3 className="text-white font-black text-xl mb-2">{tr({ es: '¡Cuidado!', en: 'Careful!', ca: 'Compte!' })}</h3>
            <p className="text-white/50 text-sm mb-5">
              {tr({ es: 'Vas a descartar la opción correcta. Perderás puntos y no podrás recuperarla. ¿Seguro?', en: "You're about to discard the correct option. You'll lose points and won't be able to bring it back. Are you sure?", ca: 'Descartaràs l\'opció correcta. Perdràs punts i no la podràs recuperar. Segur?' })}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setPopupDescarte(null)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 font-bold py-3 rounded-xl transition-all">
                {tr({ es: 'Cancelar', en: 'Cancel', ca: 'Cancel·lar' })}
              </button>
              <button onClick={confirmarDescarteCorrecto} className="flex-1 font-black py-3 rounded-xl text-black" style={{ backgroundColor: '#EDAE49' }}>
                {tr({ es: 'Sí, descartar', en: 'Yes, discard', ca: 'Sí, descartar' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup: confirmar único restante */}
      {popupConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <span className="text-5xl block mb-3">🤔</span>
            <h3 className="text-white font-black text-xl mb-1">{tr({ es: 'Parece que tu diagnóstico es…', en: 'Looks like your diagnosis is…', ca: 'Sembla que el teu diagnòstic és…' })}</h3>
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-black text-lg mx-auto my-3 shadow-lg" style={{ backgroundColor: popupConfirm.color }}>
              {popupConfirm.iniciales}
            </div>
            <p className="text-white font-bold text-lg mb-5">{tr(popupConfirm.nombre)}</p>
            <div className="flex gap-3">
              <button onClick={() => setPopupConfirm(null)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 font-bold py-3 rounded-xl transition-all">
                {tr({ es: 'Cancelar', en: 'Cancel', ca: 'Cancel·lar' })}
              </button>
              <button onClick={() => resolverRonda(popupConfirm)} className="flex-1 font-black py-3 rounded-xl text-black" style={{ backgroundColor: '#EDAE49' }}>
                {tr({ es: 'Confirmar', en: 'Confirm', ca: 'Confirmar' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <button onClick={() => setFase('temaSelect')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {tr({ es: '← Salir', en: '← Exit', ca: '← Sortir' })}
        </button>
        <div className="flex items-center gap-2 text-sm text-white/50">
          <span>{tema.emoji}</span>
          <span className="text-white font-bold">{tr(tema.titulo)}</span>
        </div>
      </div>

      {/* Tablero */}
      <div className={`border rounded-2xl p-3 sm:p-4 transition-all flex-1 flex flex-col gap-3 ${modoConfirmar ? 'border-violet-500/50 bg-violet-900/10' : 'border-white/10 bg-white/5'}`}>

        {modoConfirmar && (
          <p className="text-violet-300 text-xs text-center font-semibold">
            {tr({ es: '👆 Toca el candidato que crees correcto', en: '👆 Tap the candidate you think is correct', ca: '👆 Toca el candidat que creus correcte' })}
          </p>
        )}

        <div className="flex items-center justify-between px-1">
          <span className="text-white/40 text-xs">
            {tr({ es: `${activos.length} sin descartar`, en: `${activos.length} not ruled out`, ca: `${activos.length} sense descartar` })}
          </span>
          {penalizaciones > 0 && <span className="text-red-400 text-xs font-semibold">-{penalizaciones * 20} pts</span>}
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-5 justify-items-center">
          {tema.candidatos.map(c => (
            <Tarjeta
              key={c.id}
              c={c}
              nombre={tr(c.nombre)}
              tachado={descartados.has(c.id)}
              bloqueado={bloqueados.has(c.id)}
              modoConfirmar={modoConfirmar && !descartados.has(c.id) && !resultados[c.id]}
              resultado={resultados[c.id] ?? null}
              onClick={() => {
                if (bloqueado) return
                if (modoConfirmar) {
                  if (descartados.has(c.id) || resultados[c.id]) return
                  resolverRonda(c)
                } else {
                  toggleDescarte(c)
                }
              }}
            />
          ))}
        </div>

        {/* Pistas acumuladas */}
        <div className="space-y-2">
          {ronda.pistas.slice(0, pistaIdx + 1).map((p, i) => (
            <div key={i} className={`flex items-start gap-3 rounded-xl px-4 py-3 border text-white text-sm sm:text-base ${i === pistaIdx ? 'border-violet-500/40 bg-violet-600/20' : 'border-white/10 bg-white/5 opacity-60'}`}>
              <span className="font-black shrink-0 text-xs mt-0.5 text-violet-400">#{i + 1}</span>
              <span className="leading-relaxed">{tr(p)}</span>
            </div>
          ))}
        </div>

        {/* Acciones */}
        {!bloqueado && (
          <div className="flex gap-2">
            {(() => {
              if (modoConfirmar) return (
                <button onClick={() => setModoConfirmar(false)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 font-medium py-3 rounded-xl transition-all text-sm">
                  {tr({ es: 'Cancelar', en: 'Cancel', ca: 'Cancel·lar' })}
                </button>
              )

              if (activos.length === 1) return (
                <button onClick={() => setPopupConfirm(activos[0])} className="flex-1 font-black py-3 sm:py-4 rounded-xl transition-all text-black text-base" style={{ backgroundColor: '#EDAE49' }}>
                  {tr({ es: `¿Es ${tr(activos[0].nombre)}?`, en: `Is it ${tr(activos[0].nombre)}?`, ca: `És ${tr(activos[0].nombre)}?` })}
                </button>
              )

              return (
                <>
                  {hayMasPistas && (
                    <button onClick={() => setPistaIdx(i => i + 1)} className="flex-1 font-black py-3 sm:py-4 rounded-xl transition-all text-black text-base" style={{ backgroundColor: '#EDAE49' }}>
                      💡 {tr({ es: 'Siguiente pista', en: 'Next clue', ca: 'Pista següent' })}
                    </button>
                  )}
                  <button onClick={() => setModoConfirmar(true)} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white font-medium px-5 py-3 rounded-xl transition-all whitespace-nowrap">
                    🎯 {tr({ es: 'Confirmar', en: 'Confirm', ca: 'Confirmar' })}
                  </button>
                </>
              )
            })()}
          </div>
        )}

        {!bloqueado && !modoConfirmar && activos.length > 1 && (
          <button onClick={rendirse} className="text-white/25 hover:text-white/50 text-xs text-center transition-colors">
            {tr({ es: 'Rendirse y ver la respuesta', en: 'Give up and see the answer', ca: 'Rendir-se i veure la resposta' })}
          </button>
        )}
      </div>
    </div>
  )
}
