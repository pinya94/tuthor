// Escape room «El Códice Robado» (Historia de España · ESO).
// Para jugar con toda la clase en el proyector: el guía (Fray Anselmo) cuenta
// la historia, el plano deja elegir sala, cada sala da una página (una cifra +
// una pista del ladrón) y al final se acusa y se abre el cofre.
//
// La partida se guarda en el navegador: si se recarga a media clase, sigue
// donde estaba (el reloj cuenta desde la hora de inicio).
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { useLang } from '../context/LangContext'
import { trackEvent } from '../lib/analytics'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import { Dialogo, Barra, Cuaderno, Sospechosos, Pistas, Aviso, PERGAMINO, BOTON, BOTON_SEC, mmss, caraUrl } from '../components/escape/Comun'
import { SALA_COMPONENTE } from '../components/escape/SalasCodice'
import {
  imgSospechoso, GUIA, MINUTOS, PENALIZACION, PENALIZACION_ACUSAR, CARAS, SOSPECHOSOS, CULPABLE, PISTAS_ORDEN,
  INTRO, SALAS, FINAL_ACUSAR, ACUSACION_MAL, FINAL_COFRE, COFRE_MAL, FINAL, SIN_TIEMPO,
} from '../data/escape/codiceRobado'

const CLAVE = 'tuthor_escape_codice'
const leer = () => { try { return JSON.parse(localStorage.getItem(CLAVE)) } catch { return null } }
const guardar = e => { try { if (e) localStorage.setItem(CLAVE, JSON.stringify(e)); else localStorage.removeItem(CLAVE) } catch { /* sin almacenamiento */ } }

function nuevaPartida() {
  const cifras = {}
  for (const s of SALAS) cifras[s.id] = Math.floor(Math.random() * 10)
  return {
    fase: 'plano', sala: null, cola: { lineas: INTRO, luego: null },
    cifras, resueltas: [], tachados: [], pistas: {}, fallos: 0, penal: 0,
    inicio: Date.now(), sinReloj: false, fin: null, pagina: null,
  }
}

export default function EscapeCodice() {
  const { localPath } = useLang()
  const { user } = useAuth()
  const [e, setE] = useState(null)          // la partida (null = portada)
  const [guardada, setGuardada] = useState(leer)
  const [ahora, setAhora] = useState(() => Date.now())
  const [cuaderno, setCuaderno] = useState(false)
  const [aviso, setAviso] = useState(null)  // { texto, seg } tras un fallo
  const [solucionario, setSolucionario] = useState(false)

  // Precarga las caras del guía para que no parpadeen al cambiar de expresión
  useEffect(() => {
    CARAS.forEach(c => { const i = new Image(); i.src = caraUrl(c) })
    SOSPECHOSOS.forEach(s => { const i = new Image(); i.src = imgSospechoso(s.id) })
  }, [])
  useEffect(() => { if (e) guardar(e) }, [e])
  useEffect(() => {
    if (!e || e.fin) return
    const id = setInterval(() => setAhora(Date.now()), 500)
    return () => clearInterval(id)
  }, [e])

  const restante = e ? MINUTOS * 60 - Math.floor(((e.fin ?? ahora) - e.inicio) / 1000) - e.penal : MINUTOS * 60
  // Se acabó el tiempo: el guía lo dice una vez y se sigue sin reloj
  useEffect(() => {
    if (!e || e.sinReloj || e.fin || restante > 0) return
    const id = setTimeout(() => setE(p => ({ ...p, sinReloj: true, cola: { lineas: [SIN_TIEMPO], luego: null } })), 0)
    return () => clearTimeout(id)
  }, [e, restante])

  const empezar = () => { const p = nuevaPartida(); setE(p); trackEvent('escape_inicio', { item_id: 'codice-robado' }) }
  const continuar = () => setE({ ...guardada, cola: null })

  const finCola = useCallback(() => setE(p => {
    const luego = p.cola?.luego
    if (luego === 'acusar') return { ...p, cola: null, fase: 'acusar' }
    if (luego === 'cofre') return { ...p, cola: null, fase: 'cofre' }
    if (luego === 'resumen') return { ...p, cola: null, fase: 'resumen' }
    return { ...p, cola: null }
  }), [])

  const fallo = useCallback((texto, seg = PENALIZACION) => {
    setE(p => ({ ...p, fallos: p.fallos + 1, penal: p.penal + (p.sinReloj ? 0 : seg) }))
    setAviso({ texto: `${texto}${e?.sinReloj ? '' : ` (−${seg} s)`}`, seg: e?.sinReloj ? 0 : seg, t: Date.now() })
  }, [e?.sinReloj])

  const abrirSala = id => {
    const s = SALAS.find(x => x.id === id)
    setAviso(null)
    setE(p => ({ ...p, fase: 'sala', sala: id, cola: { lineas: s.antes, luego: null } }))
    trackEvent('escape_sala', { item_id: id })
  }
  const resuelta = extra => setE(p => ({ ...p, fase: 'pagina', resueltas: [...p.resueltas, p.sala], pagina: extra ?? null }))
  const trasPagina = () => setE(p => {
    const s = SALAS.find(x => x.id === p.sala)
    const todas = p.resueltas.length === SALAS.length
    const lineas = [...s.despues, ['susurra', PISTAS_ORDEN[p.resueltas.length - 1].texto]]
    return { ...p, fase: 'plano', sala: null, pagina: null, cola: { lineas: todas ? [...lineas, ...FINAL_ACUSAR] : lineas, luego: todas ? 'acusar' : null } }
  })
  const tacha = id => setE(p => ({ ...p, tachados: p.tachados.includes(id) ? p.tachados.filter(x => x !== id) : [...p.tachados, id] }))
  const acusa = id => {
    if (id === CULPABLE) setE(p => ({ ...p, cola: { lineas: FINAL_COFRE, luego: 'cofre' } }))
    else setE(p => ({ ...p, fallos: p.fallos + 1, penal: p.penal + (p.sinReloj ? 0 : PENALIZACION_ACUSAR), tachados: [...new Set([...p.tachados, id])], cola: { lineas: [ACUSACION_MAL], luego: null } }))
  }
  const codigo = useMemo(() => (e ? [...SALAS].sort((a, b) => a.orden - b.orden).map(s => e.cifras[s.id]).join('') : ''), [e])
  const abreCofre = intento => {
    if (intento === codigo) {
      // Puntos: 600 por recuperarlo + los segundos que sobran del reloj
      const fin = Date.now()
      const segundos = Math.floor((fin - e.inicio) / 1000)
      const puntos = 600 + (e.sinReloj ? 0 : Math.max(0, MINUTOS * 60 - segundos - e.penal))
      setE(p => ({ ...p, fin, puntos, fase: 'final', cola: { lineas: FINAL, luego: 'resumen' } }))
      trackEvent('escape_fin', { item_id: 'codice-robado' })
      if (user) {
        saveActivity(user.uid, {
          type: 'juego', game: 'codice-robado', category: 'historia-espana', score: puntos, timeSpent: segundos,
          coinsEarned: computeCoins('codice-robado', { score: puntos }), userName: user.displayName, userPhoto: user.photoURL,
        }).catch(() => {})
      }
    } else setE(p => ({ ...p, fallos: p.fallos + 1, penal: p.penal + (p.sinReloj ? 0 : PENALIZACION), cola: { lineas: [COFRE_MAL], luego: null } }))
  }
  const reiniciar = () => { guardar(null); setGuardada(null); setE(null) }

  const sala = e?.sala ? SALAS.find(s => s.id === e.sala) : null
  const SalaActual = sala ? SALA_COMPONENTE[sala.id] : null
  const paginas = e ? e.resueltas.map(id => ({ id, cifra: e.cifras[id], epoca: SALAS.find(s => s.id === id).epoca })) : []
  const pistasLadron = e ? e.resueltas.map((_, i) => PISTAS_ORDEN[i].texto) : []
  const meta = (
    <SEOHead path="/juegos/codice-robado"
      title="Escape room de Historia de España: El Códice Robado"
      description="Escape room de Historia de España para jugar con la clase en el proyector: seis salas, de la Prehistoria a la Transición, y un ladrón que descubrir." />
  )

  // ── Portada ──
  if (!e) return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] bg-[#14100c] px-4 py-8 sm:py-14">
      {meta}
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-6 items-end">
        <div className={`${PERGAMINO} rounded-3xl p-6 sm:p-10 shadow-2xl relative`}>
          <span className="absolute top-4 right-4 sm:top-6 sm:right-6 rotate-6 border-4 border-red-700 text-red-700 font-black text-sm sm:text-lg px-2 py-0.5 rounded">URGENTE</span>
          <p className="text-sm sm:text-base font-bold opacity-70">Escape room · Historia de España · ESO · {MINUTOS} minutos</p>
          <h1 className="text-4xl sm:text-6xl font-black mt-2 mb-4 font-serif">El Códice Robado</h1>
          <p className="text-lg sm:text-xl leading-relaxed mb-3">Esta noche alguien ha robado las seis páginas de la Gran Crónica de Hispania, y la historia de España se está borrando. {GUIA} necesita a toda la clase para recuperarlas antes de que toquen a vísperas.</p>
          <p className="text-base sm:text-lg leading-relaxed mb-6 opacity-85">Seis salas, de la Prehistoria a la Transición. Para jugar en el proyector: uno maneja el ordenador y el resto de la clase piensa en voz alta.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" className={BOTON} onClick={empezar}>🔑 Empezar la partida</button>
            {guardada && !guardada.fin && <button type="button" className="rounded-xl border-2 border-[#3b2a1a] font-bold px-4 py-2.5" onClick={continuar}>Continuar la partida guardada</button>}
          </div>
          <button type="button" onClick={() => setSolucionario(v => !v)} className="mt-6 text-sm font-bold underline opacity-70">{solucionario ? 'Ocultar' : 'Ver'} el solucionario (para el profe)</button>
          {solucionario && (
            <ol className="mt-3 space-y-2 text-sm sm:text-base list-decimal pl-5">
              {SALAS.map(s => <li key={s.id}><b>{s.nombre} ({s.epoca}):</b> {s.solucion ?? s.pistas[s.pistas.length - 1]}</li>)}
              <li><b>El ladrón:</b> el Hermano Íñigo. La primera página no descarta a nadie y cada una de las siguientes descarta a uno (gafas, pelirrojo, rubio, el hortelano y el más anciano), así que solo queda claro con la sexta.</li>
              <li><b>El cofre:</b> las seis cifras de las páginas (cambian en cada partida) ordenadas de la Prehistoria al siglo XX.</li>
            </ol>
          )}
        </div>
        <img src={caraUrl('senala')} alt={GUIA} className="hidden md:block w-72 lg:w-80 drop-shadow-2xl" />
      </div>
    </div>
  )

  // ── Partida ──
  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] bg-[#14100c] pb-16">
      {meta}
      <Barra restante={restante} sinReloj={e.sinReloj} epocas={SALAS} recuperadas={e.fase === 'resumen' || e.fase === 'final' ? SALAS.map(s => s.id) : e.resueltas}
        onCuaderno={() => setCuaderno(true)} aviso={aviso?.seg && ahora - aviso.t < 2500 ? `−${aviso.seg} s` : null} />

      <div className="max-w-6xl mx-auto px-3 sm:px-5 pt-5">
        {e.fase === 'plano' && (
          <>
            <h2 className="text-amber-200 font-black text-2xl sm:text-4xl mb-1 font-serif">Plano del monasterio</h2>
            <p className="text-white/60 text-base sm:text-lg mb-4">Elegid una sala. Cada una esconde una página de la Crónica.</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[...SALAS].sort((a, b) => a.orden - b.orden).map(s => {
                const hecha = e.resueltas.includes(s.id)
                return (
                  <button key={s.id} type="button" disabled={hecha} onClick={() => abrirSala(s.id)}
                    className={`rounded-2xl p-4 sm:p-6 text-left border-2 transition-all ${hecha ? 'border-amber-500/40 bg-amber-500/10' : 'border-amber-900/60 bg-[#241a12] hover:border-amber-400 hover:-translate-y-0.5'}`}>
                    <span className="text-4xl sm:text-5xl">{hecha ? '📜' : s.emoji}</span>
                    <p className="text-[#f6ecd2] font-black text-lg sm:text-2xl mt-2">{s.nombre}</p>
                    <p className="text-white/50 text-sm sm:text-base">{s.epoca}</p>
                    {hecha && <p className="text-amber-300 font-bold text-sm mt-1">Página recuperada: {e.cifras[s.id]}</p>}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {e.fase === 'sala' && sala && (
          <>
            <div className="flex items-center gap-3 mb-3">
              <button type="button" className={BOTON_SEC} onClick={() => setE(p => ({ ...p, fase: 'plano', sala: null }))}>← Plano</button>
              <h2 className="text-amber-200 font-black text-2xl sm:text-4xl font-serif">{sala.emoji} {sala.nombre}</h2>
              <span className="hidden sm:inline text-white/50 text-lg">· {sala.epoca}</span>
            </div>
            <SalaActual key={sala.id} onResuelta={resuelta} onFallo={fallo} />
            <Aviso texto={aviso?.texto} />
            <Pistas pistas={sala.pistas} usadas={e.pistas[sala.id] ?? 0} onUsa={() => setE(p => ({ ...p, pistas: { ...p.pistas, [sala.id]: (p.pistas[sala.id] ?? 0) + 1 } }))} />
          </>
        )}

        {e.fase === 'pagina' && sala && (
          <div className="max-w-2xl mx-auto mt-4">
            <div className={`${PERGAMINO} rounded-3xl p-6 sm:p-10 shadow-2xl text-center`}>
              <p className="font-bold opacity-70 text-base sm:text-lg">Página recuperada · {sala.epoca}</p>
              <div className="mx-auto my-4 w-28 h-36 sm:w-36 sm:h-44 rounded-lg bg-[#e6d3a3] border-4 border-[#8a6424] flex items-center justify-center shadow-inner">
                <span className="font-serif font-black text-7xl sm:text-8xl">{e.cifras[sala.id]}</span>
              </div>
              <p className="text-lg sm:text-xl"><b>🔎 Pista:</b> {PISTAS_ORDEN[e.resueltas.length - 1].texto}</p>
              {e.pagina?.aprendido && (
                <ul className="text-left mt-4 space-y-1.5 text-base sm:text-lg">{e.pagina.aprendido.map((t, i) => <li key={i}>• {t}</li>)}</ul>
              )}
              <button type="button" className={`${BOTON} mt-6`} onClick={trasPagina}>Guardar en el Cuaderno ▸</button>
            </div>
          </div>
        )}

        {e.fase === 'acusar' && (
          <div className={`${PERGAMINO} rounded-3xl p-4 sm:p-8 mt-2`}>
            <h2 className="text-2xl sm:text-4xl font-black font-serif mb-1">¿Quién es el ladrón?</h2>
            <p className="text-base sm:text-lg mb-4 opacity-80">Repasad las pistas y tocad al culpable. Acusar a un inocente cuesta {PENALIZACION_ACUSAR / 60} minutos.</p>
            <ul className="mb-4 space-y-1 text-base sm:text-lg">{pistasLadron.map((p, i) => <li key={i}>• {p}</li>)}</ul>
            <Sospechosos sospechosos={SOSPECHOSOS} tachados={e.tachados} onElige={acusa} grande />
          </div>
        )}

        {e.fase === 'cofre' && <Cofre paginas={paginas} onAbre={abreCofre} />}

        {e.fase === 'resumen' && (
          <GameEndScreen game="codice-robado" emoji="📖" title="¡Códice recuperado!" score={e.puntos ?? 600}
            message="El ladrón era el Hermano Íñigo. ¡La historia de España vuelve a tener color!"
            stats={[
              { label: 'tiempo', value: mmss(Math.floor((e.fin - e.inicio) / 1000)), emoji: '⏱️' },
              { label: 'pistas', value: Object.values(e.pistas).reduce((a, b) => a + b, 0), emoji: '💡' },
              { label: 'fallos', value: e.fallos, emoji: '❌' },
            ]}
            shareText="¡Hemos recuperado El Códice Robado! Escape room de Historia de España en Tuthor."
            user={user} lang="es" onPlayAgain={reiniciar} playAgainLabel="Jugar otra vez" />
        )}
        {e.fase === 'final' && (
          <div className={`${PERGAMINO} max-w-2xl mx-auto rounded-3xl p-6 sm:p-10 mt-4 text-center shadow-2xl`}>
            <p className="text-6xl mb-2">📖</p>
            <h2 className="text-3xl sm:text-5xl font-black font-serif mb-3">¡Códice recuperado!</h2>
            <p className="text-lg sm:text-xl mb-5">El ladrón era el Hermano Íñigo.</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Dato v={mmss(Math.floor(((e.fin ?? ahora) - e.inicio) / 1000))} t="tiempo" />
              <Dato v={Object.values(e.pistas).reduce((a, b) => a + b, 0)} t="pistas" />
              <Dato v={e.fallos} t="fallos" />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" className={BOTON} onClick={reiniciar}>Jugar otra vez</button>
              <Link to={localPath('/juegos')} className="rounded-xl border-2 border-[#3b2a1a] font-bold px-4 py-2.5">Ver más juegos</Link>
            </div>
          </div>
        )}
      </div>

      {cuaderno && (
        <Cuaderno sospechosos={SOSPECHOSOS} tachados={e.tachados} onTacha={tacha} pistas={pistasLadron} paginas={paginas} onCerrar={() => setCuaderno(false)} />
      )}
      {e.cola && <Dialogo key={e.cola.lineas[0][1]} lineas={e.cola.lineas} nombre={GUIA} onFin={finCola} />}
    </div>
  )
}

function Dato({ v, t }) {
  return (
    <div className="rounded-xl bg-[#3b2a1a] text-[#f1e2bd] py-3">
      <p className="font-black text-2xl sm:text-3xl tabular-nums">{v}</p>
      <p className="text-sm opacity-75">{t}</p>
    </div>
  )
}

function Cofre({ paginas, onAbre }) {
  const [d, setD] = useState(['', '', '', '', '', ''])
  const pon = (i, v) => {
    const c = v.replace(/\D/g, '').slice(-1)
    setD(x => { const n = [...x]; n[i] = c; return n })
    if (c && i < 5) document.getElementById(`cofre-${i + 1}`)?.focus()
  }
  return (
    <div className="max-w-3xl mx-auto mt-4 text-center">
      <h2 className="text-amber-200 font-black text-2xl sm:text-4xl font-serif mb-2">🔒 El cofre del establo</h2>
      <p className="text-white/70 text-base sm:text-xl mb-4">Las seis cifras, de la época más antigua a la más moderna.</p>
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {paginas.map(p => <span key={p.id} className={`${PERGAMINO} rounded-lg px-3 py-1.5 font-bold text-sm sm:text-base`}>{p.epoca}: <b className="text-xl">{p.cifra}</b></span>)}
      </div>
      <form onSubmit={ev => { ev.preventDefault(); onAbre(d.join('')) }}>
        <div className="flex justify-center gap-2 sm:gap-3 mb-5">
          {d.map((v, i) => (
            <input key={i} id={`cofre-${i}`} value={v} onChange={ev => pon(i, ev.target.value)} inputMode="numeric" maxLength={2} aria-label={`Cifra ${i + 1}`}
              className="w-12 h-16 sm:w-16 sm:h-20 rounded-xl bg-[#2a1f16] border-2 border-amber-600 text-amber-200 text-center font-black text-3xl sm:text-4xl focus:outline-none focus:border-amber-300" />
          ))}
        </div>
        <button type="submit" className={BOTON} disabled={d.some(x => x === '')}>🔓 Abrir el cofre</button>
      </form>
    </div>
  )
}
