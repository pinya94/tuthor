// ── Diagnóstico ──────────────────────────────────────────────────────────────
// Herramienta de estudio de Ciencias (no un "juego" del catálogo: sin
// monedas de games.js, sin ranking). Mecánica tipo "¿Quién es Quién?": el
// alumno elige un tema, ve el tablero completo de candidatos desde el
// inicio y va descartando según pistas que se ACUMULAN (a diferencia de
// quien-es-quien, aquí no sustituyen a la anterior — se pueden repasar
// todas). Sin cronómetro: lo que importa es razonar bien, no la velocidad.
//
// Cada "partida" es una ronda (un candidato secreto dentro del tema
// elegido). El mazo de rondas de un tema se baraja sin repetición dentro
// de la sesión (mazoRef), igual que hace Reacción con sus escenarios.
//
// Registro de actividad: type 'examen' (como CicloOrdenExamen), no 'juego'
// — no necesita entrada en games.js. Las monedas son un premio modesto
// local, no la fórmula de computeCoins.
import { useState, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation, { CoinsEarnedBadge } from '../components/CoinsAnimation'
import SEOHead from '../components/SEOHead'
import { TEMAS_DIAGNOSTICO, getTemaDiagnostico } from '../data/diagnostico'
import { disciplinaDeTema } from '../data/ciencias'

function barajar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function puntosPorPistas(pistasReveladas, penalizaciones) {
  const base = pistasReveladas <= 1 ? 100 : pistasReveladas === 2 ? 70 : 40
  return Math.max(0, base - penalizaciones * 20)
}

// ── TARJETA DE CANDIDATO ─────────────────────────────────────────────────────
// Nota: el descarte se ve y se comporta IGUAL para todos los candidatos,
// incluida la respuesta correcta — cualquier pista visual distinta en el
// momento de descartar (popup, color, icono) delataría cuál es la buena.
// La penalización por haberla descartado se revela solo al final.
function Tarjeta({ c, nombre, tachado, modoConfirmar, resultado, onClick }) {
  let opacidad = 'opacity-100'
  let escala = 'scale-100'
  let anillo = ''
  let overlay = null

  if (resultado === 'correcto') { anillo = 'ring-2 ring-green-400'; escala = 'scale-110' }
  else if (resultado === 'incorrecto') { opacidad = 'opacity-40' }
  else if (resultado === 'revelado') { anillo = 'ring-2 ring-amber-400'; escala = 'scale-105' }
  else if (tachado) {
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

  return (
    <div
      className={`relative rounded-xl shadow transition-all duration-200 select-none cursor-pointer ${opacidad} ${escala} ${anillo}`}
      style={{ backgroundColor: c.color, width: '100%', paddingBottom: '100%' }}
      onClick={onClick}
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
            { icon: '⚠️', title: tr({ es: 'Ojo con descartar al correcto', en: 'Watch out for discarding the right one', ca: 'Vigila a l\'hora de descartar el correcte' }), desc: tr({ es: 'Si en algún momento descartas la opción correcta, lo pagarás en puntos — no lo sabrás hasta el final.', en: "If you discard the correct option at any point, it'll cost you points — you won't find out until the end.", ca: 'Si en algun moment descartes l\'opció correcta, ho pagaràs en punts — no ho sabràs fins al final.' }) },
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

// ── RESULTADO DE LA RONDA ────────────────────────────────────────────────────
function Resultado({ tema, ronda, acierto, penalizaciones, pistasUsadas, coins, onOtraRonda, onCambiarTema, onSalir, salirLabel, tr, lang }) {
  const respuesta = tema.candidatos.find(c => c.id === ronda.respuesta)
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-5">
          <div className="text-6xl mb-3">{acierto ? '🩺' : '🔍'}</div>
          <h1 className="text-2xl font-black text-white mb-1">
            {acierto
              ? tr({ es: '¡Diagnóstico correcto!', en: 'Correct diagnosis!', ca: 'Diagnòstic correcte!' })
              : tr({ es: 'No era esta vez', en: 'Not this time', ca: 'Aquesta vegada no' })}
          </h1>
          <p className="text-white/50 text-sm">
            {tr({ es: `Era: ${tr(respuesta.nombre)}.`, en: `It was: ${tr(respuesta.nombre)}.`, ca: `Era: ${tr(respuesta.nombre)}.` })}
          </p>
          {acierto && <CoinsEarnedBadge coins={coins} lang={lang} />}

          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-0.5">
                {tr({ es: 'Pistas usadas', en: 'Clues used', ca: 'Pistes usades' })}
              </p>
              <p className="text-white font-black text-2xl">{pistasUsadas}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-0.5">
                {tr({ es: 'Descartes erróneos', en: 'Wrong discards', ca: 'Descartaments erronis' })}
              </p>
              <p className="text-white font-black text-2xl">{penalizaciones}</p>
            </div>
          </div>

          {penalizaciones > 0 && (
            <p className="text-amber-400/80 text-xs mt-3">
              {tr({ es: '💡 En algún momento descartaste la opción correcta — repásala.', en: '💡 At some point you discarded the correct option — go over it again.', ca: '💡 En algun moment vas descartar l\'opció correcta — repassa-la.' })}
            </p>
          )}

          <div className="mt-4 pt-4 border-t border-white/10 text-left">
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-2">
              {tr({ es: 'Dato curioso', en: 'Fun fact', ca: 'Dada curiosa' })}
            </p>
            <p className="text-white/70 text-sm leading-relaxed">{tr(ronda.dato_extra)}</p>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={onOtraRonda} className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 text-lg rounded-xl transition">
            {tr({ es: '▶ Otra ronda', en: '▶ Another round', ca: '▶ Una altra ronda' })}
          </button>
          {onCambiarTema && (
            <button onClick={onCambiarTema} className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition">
              {tr({ es: 'Cambiar de tema', en: 'Change topic', ca: 'Canviar de tema' })}
            </button>
          )}
          <button onClick={onSalir} className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition">
            {salirLabel}
          </button>
        </div>
      </div>
      {acierto && coins > 0 && <CoinsAnimation coins={coins} />}
    </div>
  )
}

// ── HERRAMIENTA ───────────────────────────────────────────────────────────────
export default function Diagnostico() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()
  // Con :diagId en la ruta (/examen/diagnostico/:diagId) se juega ese
  // diagnóstico directamente, sin selector — es el acceso desde su tema de
  // Ciencias. Sin parámetro (/examen/diagnostico) se muestra el selector.
  const { diagId } = useParams()
  const directo = Boolean(diagId && getTemaDiagnostico(diagId))
  const backPath = location.state?.backPath
    ?? (directo ? `/estudiar/${disciplinaDeTema(getTemaDiagnostico(diagId).home)}/${getTemaDiagnostico(diagId).home}` : '/estudiar')

  // Semilla del modo directo: primera ronda + mazo restante barajado, calculada
  // una sola vez para inicializar el estado sin setState durante el render.
  const seedRef = useRef(null)
  if (directo && !seedRef.current) {
    const t = getTemaDiagnostico(diagId)
    const orden = barajar(t.rondas.map((_, i) => i))
    const primera = orden.shift()
    seedRef.current = { orden, ronda: t.rondas[primera] }
  }

  const [fase, setFase] = useState(directo ? 'jugando' : 'temaSelect') // temaSelect | jugando | fin
  const [temaId, setTemaId] = useState(directo ? diagId : null)
  const [ronda, setRonda] = useState(directo ? seedRef.current.ronda : null)
  const [pistaIdx, setPistaIdx] = useState(0)
  const [descartados, setDescartados] = useState(new Set())
  const [penalizaciones, setPenalizaciones] = useState(0)
  const [modoConfirmar, setModoConfirmar] = useState(false)
  const [resultados, setResultados] = useState({}) // id -> 'correcto' | 'incorrecto' | 'revelado'
  const [popupConfirm, setPopupConfirm] = useState(null) // candidato único restante a confirmar
  const [finalizado, setFinalizado] = useState(null) // { acierto, puntos }

  const savedRef = useRef(false)
  const mazoRef = useRef(directo ? { [diagId]: seedRef.current.orden } : {}) // temaId -> [índices de ronda pendientes]
  // Si en algún momento se descarta la respuesta correcta (aunque luego se
  // deshaga), queda marcado aquí para penalizar al confirmar — sin avisar
  // durante la partida, porque avisar delataría cuál es la correcta.
  const descartoCorrectaRef = useRef(false)

  const tema = temaId ? getTemaDiagnostico(temaId) : null

  function siguienteRonda(id) {
    const t = getTemaDiagnostico(id)
    if (!mazoRef.current[id] || mazoRef.current[id].length === 0) {
      mazoRef.current[id] = barajar(t.rondas.map((_, i) => i))
    }
    const idx = mazoRef.current[id].shift()
    savedRef.current = false
    descartoCorrectaRef.current = false
    setTemaId(id)
    setRonda(t.rondas[idx])
    setPistaIdx(0)
    setDescartados(new Set())
    setPenalizaciones(0)
    setModoConfirmar(false)
    setResultados({})
    setPopupConfirm(null)
    setFinalizado(null)
    setFase('jugando')
  }

  function toggleDescarte(c) {
    if (modoConfirmar || finalizado) return
    if (descartados.has(c.id)) {
      setDescartados(prev => { const n = new Set(prev); n.delete(c.id); return n })
      return
    }
    if (c.id === ronda.respuesta) descartoCorrectaRef.current = true
    setDescartados(prev => new Set(prev).add(c.id))
  }

  function resolverRonda(candidato) {
    const acierto = candidato.id === ronda.respuesta
    const penal = descartoCorrectaRef.current ? 1 : 0
    const pts = puntosPorPistas(pistaIdx + 1, penal)
    setPenalizaciones(penal)
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
    setPenalizaciones(descartoCorrectaRef.current ? 1 : 0)
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
          type: 'examen', game: 'diagnostico', category: temaId,
          score: pts, passed: acierto, timeSpent: 0,
          coinsEarned: pts,
          userName: user.displayName, userPhoto: user.photoURL,
        }).catch(() => {})
      }
      setTimeout(() => setFase('fin'), 1400)
    }, 700)
  }

  // Meta SEO del modo directo (/examen/diagnostico/:diagId): en ese modo no se
  // pasa por la pantalla de selección, así que la inyectamos aquí.
  const directoMeta = directo && tema ? (
    <SEOHead
      title={tr({ es: `Diagnóstico de ${tr(tema.titulo)}`, en: `${tr(tema.titulo)} Diagnosis`, ca: `Diagnòstic de ${tr(tema.titulo)}` })}
      description={tr({ es: `Repasa ${tr(tema.titulo)} por descarte: elimina candidatos con pistas científicas progresivas hasta dar con el correcto.`, en: `Revise ${tr(tema.titulo)} by elimination: rule out candidates with progressive science clues until you find the right one.`, ca: `Repassa ${tr(tema.titulo)} per descart: elimina candidats amb pistes científiques progressives fins a trobar el correcte.` })}
      path={`/examen/diagnostico/${temaId}`}
      lang={lang}
    />
  ) : null

  // ── SEO + selector de tema ──────────────────────────────────────────────
  if (fase === 'temaSelect') {
    return (
      <>
        <SEOHead
          title={tr({ es: 'Diagnóstico — Practica Ciencias por descarte', en: 'Diagnosis — Practise Science by elimination', ca: 'Diagnòstic — Practica Ciències per descart' })}
          description={tr({ es: 'Descarta candidatos con pistas científicas progresivas y confirma tu diagnóstico. Cuerpo humano, rocas, materia y tabla periódica.', en: 'Rule out candidates with progressive science clues and confirm your diagnosis. Human body, rocks, matter and the periodic table.', ca: 'Descarta candidats amb pistes científiques progressives i confirma el teu diagnòstic. Cos humà, roques, matèria i taula periòdica.' })}
          path="/examen/diagnostico"
          lang={lang}
        />
        <TemaSelect onElegir={siguienteRonda} lang={lang} tr={tr} />
      </>
    )
  }

  // ── Pantalla final ────────────────────────────────────────────────────────
  if (fase === 'fin') {
    return (
      <>
      {directoMeta}
      <Resultado
        tema={tema} ronda={ronda}
        acierto={finalizado.acierto} puntos={finalizado.puntos}
        penalizaciones={penalizaciones} pistasUsadas={pistaIdx + 1}
        coins={finalizado.puntos}
        onOtraRonda={() => siguienteRonda(temaId)}
        onCambiarTema={directo ? null : () => setFase('temaSelect')}
        onSalir={() => navigate(localPath(backPath))}
        salirLabel={directo
          ? tr({ es: `← Volver a ${tr(tema.titulo)}`, en: `← Back to ${tr(tema.titulo)}`, ca: `← Tornar a ${tr(tema.titulo)}` })
          : tr({ es: '← Volver a Ciencias', en: '← Back to Science', ca: '← Tornar a Ciències' })}
        tr={tr} lang={lang}
      />
      </>
    )
  }

  // ── Tablero de juego ──────────────────────────────────────────────────────
  const activos = tema.candidatos.filter(c => !descartados.has(c.id) && !resultados[c.id])
  const hayMasPistas = pistaIdx < ronda.pistas.length - 1
  const bloqueado = Boolean(finalizado)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-6 py-3">
      {directoMeta}
      <div className="max-w-3xl w-full flex flex-col flex-1">

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
        <button onClick={() => directo ? navigate(localPath(backPath)) : setFase('temaSelect')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
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

        <div className="px-1">
          <span className="text-white/40 text-xs">
            {tr({ es: `${activos.length} sin descartar`, en: `${activos.length} not ruled out`, ca: `${activos.length} sense descartar` })}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 justify-items-center">
          {tema.candidatos.map(c => (
            <Tarjeta
              key={c.id}
              c={c}
              nombre={tr(c.nombre)}
              tachado={descartados.has(c.id)}
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
    </div>
  )
}
