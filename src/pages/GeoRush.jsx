import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAISES, NOMBRES_PAISES } from '../data/paises'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import GameEndScreen from '../components/GameEndScreen'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import SEOHead from '../components/SEOHead'

const DIFS = {
  facil:   { label: 'Fácil', labelEn: 'Easy', labelCa: 'Fàcil',   emoji: '🟢', tiempoInicio: 120, obligatorio: false },
  medio:   { label: 'Medio', labelEn: 'Medium', labelCa: 'Mitjà', emoji: '🟡', tiempoInicio: 90,  obligatorio: true },
  dificil: { label: 'Difícil', labelEn: 'Hard', labelCa: 'Difícil', emoji: '🔴', tiempoInicio: 60,  obligatorio: true },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generarPistasObligatorias(pais, lang) {
  const en = lang === 'en'
  const ca = lang === 'ca'
  const todas = []

  const continentes = pais.continente.split('/')
  const continenteTexto = continentes.length > 1 ? continentes.join(ca ? ' i ' : en ? ' and ' : ' y ') : pais.continente
  todas.push({ texto: ca ? `Està a ${continenteTexto}` : en ? `Located in ${continenteTexto}` : `Está en ${continenteTexto}`, validar: r => {
    const p = PAISES.find(p => p.nombre === r)
    if (!p) return false
    const rConts = p.continente.split('/')
    return continentes.some(c => rConts.includes(c))
  }})

  const hemiTexto = pais.hemisferio === 'ambos'
    ? (ca ? 'nord i sud (creua l\'equador)' : en ? 'northern and southern (crosses the equator)' : 'norte y sur (cruza el ecuador)')
    : (ca ? ({ norte: 'nord', sur: 'sud' }[pais.hemisferio] || pais.hemisferio) : en ? ({ norte: 'northern', sur: 'southern' }[pais.hemisferio] || pais.hemisferio) : pais.hemisferio)
  todas.push({ texto: ca ? `Està a l'hemisferi ${hemiTexto}` : en ? `${hemiTexto} hemisphere` : `Está en el hemisferio ${hemiTexto}`, validar: r => {
    const p = PAISES.find(p => p.nombre === r)
    if (!p) return false
    if (pais.hemisferio === 'ambos') return true
    return p.hemisferio === pais.hemisferio || p.hemisferio === 'ambos'
  }})

  const areaRef = pais.area > 500000 ? 500000 : pais.area > 100000 ? 100000 : 50000
  const masOMenos = pais.area >= areaRef
  todas.push({
    texto: ca
      ? `Té ${masOMenos ? 'més' : 'menys'} de ${areaRef.toLocaleString()} km²`
      : en
      ? `${masOMenos ? 'More' : 'Less'} than ${areaRef.toLocaleString()} km²`
      : `Tiene ${masOMenos ? 'más' : 'menos'} de ${areaRef.toLocaleString()} km²`,
    validar: r => {
      const p = PAISES.find(p => p.nombre === r)
      return p && (masOMenos ? p.area >= areaRef : p.area < areaRef)
    }
  })

  const pobRef = pais.poblacion > 100000000 ? 100000000 : pais.poblacion > 50000000 ? 50000000 : 20000000
  const masPob = pais.poblacion >= pobRef
  todas.push({
    texto: ca
      ? `Té ${masPob ? 'més' : 'menys'} de ${(pobRef / 1000000).toFixed(0)} milions d'habitants`
      : en
      ? `${masPob ? 'More' : 'Less'} than ${(pobRef / 1000000).toFixed(0)}M inhabitants`
      : `Tiene ${masPob ? 'más' : 'menos'} de ${(pobRef / 1000000).toFixed(0)} millones de habitantes`,
    validar: r => {
      const p = PAISES.find(p => p.nombre === r)
      return p && (masPob ? p.poblacion >= pobRef : p.poblacion < pobRef)
    }
  })

  const guerraTexto = ca
    ? (pais.guerras === 'ambas' ? 'Va participar en la I i II Guerra Mundial'
      : pais.guerras === 'I' ? 'Va participar en la I Guerra Mundial (però no en la II)'
      : pais.guerras === 'II' ? 'Va participar en la II Guerra Mundial (però no en la I)'
      : 'No va participar en cap guerra mundial')
    : en
    ? (pais.guerras === 'ambas' ? 'Fought in both World Wars'
      : pais.guerras === 'I' ? 'Fought in World War I (but not II)'
      : pais.guerras === 'II' ? 'Fought in World War II (but not I)'
      : 'Did not fight in any World War')
    : (pais.guerras === 'ambas' ? 'Participó en la I y II Guerra Mundial'
      : pais.guerras === 'I' ? 'Participó en la I Guerra Mundial (pero no en la II)'
      : pais.guerras === 'II' ? 'Participó en la II Guerra Mundial (pero no en la I)'
      : 'No participó en ninguna guerra mundial')
  todas.push({ texto: guerraTexto, validar: r => PAISES.find(p => p.nombre === r)?.guerras === pais.guerras })

  return shuffle(todas).slice(0, 3)
}

function generarPistasRegalo(pais, extra, lang) {
  const en = lang === 'en'
  const ca = lang === 'ca'
  const todas = [
    { texto: ca ? `La seva muntanya més alta és ${pais.montana}` : en ? `Highest mountain: ${pais.montana}` : `Su montaña más alta es ${pais.montana}` },
    { texto: ca ? `El seu riu més llarg és ${pais.rio}` : en ? `Longest river: ${pais.rio}` : `Su río más largo es ${pais.rio}` },
    { texto: ca ? `S'hi parla ${pais.idioma}` : en ? `Language: ${pais.idioma}` : `Se habla ${pais.idioma}` },
    { texto: ca ? `Un famós d'allà: ${pais.famoso}` : en ? `Famous person: ${pais.famoso}` : `Un famoso de allí: ${pais.famoso}` },
  ]
  return shuffle(todas).slice(0, extra ? 3 : 2)
}

function mezclarPistas(obligatorias, regalos) {
  const oblig = obligatorias.map(p => ({ ...p, tipo: 'obligatoria' }))
  const reg   = regalos.map(p => ({ ...p, tipo: 'regalo', validar: () => true }))

  const result = [oblig[0]]
  const resto  = shuffle([...oblig.slice(1), ...reg])
  result.push(...resto)
  return result
}

function normalize(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

function AutocompleteInput({ value, onChange, onSubmit, paises, disabled, focusKey }) {
  const { lang } = useLang()
  const [focused, setFocused] = useState(false)
  const [highlightIdx, setHighlightIdx] = useState(-1)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [focusKey, disabled])

  const filtered = useMemo(() => {
    if (!value || value.length < 1) return []
    const norm = normalize(value)
    return paises.filter(n => normalize(n).includes(norm)).slice(0, 6)
  }, [value, paises])

  function select(name) {
    onChange(name)
    setFocused(false)
    setHighlightIdx(-1)
    setTimeout(() => onSubmit(name), 50)
  }

  function handleKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlightIdx(i => Math.min(i + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlightIdx(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightIdx >= 0 && filtered[highlightIdx]) select(filtered[highlightIdx])
      else if (filtered.length === 1) select(filtered[0])
      else onSubmit(value)
    }
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => { onChange(e.target.value); setHighlightIdx(-1) }}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        onKeyDown={handleKey}
        disabled={disabled}
        placeholder={lang === 'ca' ? 'Escriu un país…' : lang === 'en' ? 'Type a country…' : 'Escribe un país…'}
        className="w-full bg-white/10 border-2 border-white/20 focus:border-[#EDAE49] rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/25 outline-none transition-colors disabled:opacity-40"
        autoComplete="off"
      />
      {focused && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[#1a1a2e] border border-white/20 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto">
          {filtered.map((name, i) => (
            <button key={name} onMouseDown={() => select(name)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                i === highlightIdx ? 'bg-[#EDAE49]/20 text-[#EDAE49]' : 'text-white/70 hover:bg-white/10'
              }`}>
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const UI = {
  es: {
    titulo: 'GeoRush', desc: 'Descubre el país misterioso a partir de pistas geográficas',
    volver: '← Volver', salir: '← Salir', empezar: '¡Empezar! →',
    reglas: 'Reglas', recompensas: 'Recompensas', comoFunciona: 'Cómo funciona',
    tiempo: 'Tiempo', pistas: '5 por país (3🔒 + 2🎁)', alAcertar: 'Al acertar', acertar: '+20s + recompensa',
    noAdivinar: 'No adivinar', saltar: 'Saltar',
    tiempoExtra: '+15s extra', pistaExtra: 'Pista 🎁 extra', saltarGratis: 'Saltar gratis',
    bonusPts: '+150 pts', ademasDe: 'Además de los +20s por acertar',
    pistaExtraDesc: 'El siguiente país tiene 3 pistas regalo en vez de 2',
    saltarGratisDesc: 'Acumulas un saltar sin penalización',
    bonusDesc: 'Bonus de puntos directo',
    paso1: 'Pistas obligatorias: responde con un país que cumpla', paso2: 'Pistas regalo: responde lo que quieras, se revelan',
    paso3: 'Adivina el país en cualquier momento para ganar', paso4: 'Menos pistas usadas = más puntos',
    paisMisterioso: 'País misterioso', pistaOculta: 'Pista oculta',
    obligatoria: 'Escribe un país que cumpla', regalo: 'Pista regalo — responde lo que quieras',
    intentaResponder: 'Intenta responder (si fallas, avanzamos):',
    noReconocido: 'País no reconocido', noCumple: 'no cumple esta pista', noCumpleAvanzamos: 'no cumple, pero avanzamos',
    cumple: 'cumple', siguientePista: 'No es', escribePais: 'Escribe un país…',
    saltarPais: 'Saltar país (−10s)', eligeRecompensa: 'Elige recompensa',
    tiempoAgotado: '¡Tiempo agotado!', puntuacion: 'Puntuación', paises: 'Países', mejorRacha: 'Mejor racha',
    compartir: '🔗 Compartir resultado', reintentar: 'Intentarlo de nuevo', cambiarDif: 'Cambiar dificultad',
    ultimoPais: 'Último país', tienes: 'tienes',
  },
  en: {
    titulo: 'GeoRush', desc: 'Discover the mystery country from geographical clues',
    volver: '← Back', salir: '← Exit', empezar: 'Start! →',
    reglas: 'Rules', recompensas: 'Rewards', comoFunciona: 'How it works',
    tiempo: 'Time', pistas: '5 per country (3🔒 + 2🎁)', alAcertar: 'On correct', acertar: '+20s + reward',
    noAdivinar: "Didn't guess", saltar: 'Skip',
    tiempoExtra: '+15s extra', pistaExtra: '🎁 Extra clue', saltarGratis: 'Free skip',
    bonusPts: '+150 pts', ademasDe: 'On top of the +20s for guessing',
    pistaExtraDesc: 'Next country starts with 3 gift clues instead of 2',
    saltarGratisDesc: 'Stack a skip with no penalty',
    bonusDesc: 'Direct points bonus',
    paso1: 'Locked clues: answer with a country that matches', paso2: 'Gift clues: answer anything, they reveal',
    paso3: 'Guess the country at any time to win', paso4: 'Fewer clues used = more points',
    paisMisterioso: 'Mystery country', pistaOculta: 'Hidden clue',
    obligatoria: 'Type a country that matches', regalo: 'Gift clue — type anything',
    intentaResponder: 'Try to answer (if wrong, we move on):',
    noReconocido: 'Country not recognised', noCumple: "doesn't match this clue", noCumpleAvanzamos: "doesn't match, but we move on",
    cumple: 'matches', siguientePista: "It's not", escribePais: 'Type a country…',
    saltarPais: 'Skip country (−10s)', eligeRecompensa: 'Choose reward',
    tiempoAgotado: 'Time is up!', puntuacion: 'Score', paises: 'Countries', mejorRacha: 'Best streak',
    compartir: '🔗 Share result', reintentar: 'Try again', cambiarDif: 'Change difficulty',
    ultimoPais: 'Last country', tienes: 'you have',
  },
  ca: {
    titulo: 'GeoRush', desc: 'Descobreix el país misteriós a partir de pistes geogràfiques',
    volver: '← Tornar', salir: '← Sortir', empezar: 'Començar! →',
    reglas: 'Regles', recompensas: 'Recompenses', comoFunciona: 'Com funciona',
    tiempo: 'Temps', pistas: '5 per país (3🔒 + 2🎁)', alAcertar: 'En encertar', acertar: '+20s + recompensa',
    noAdivinar: 'Sense encert', saltar: 'Saltar',
    tiempoExtra: '+15s extra', pistaExtra: '🎁 Pista extra', saltarGratis: 'Salt gratuït',
    bonusPts: '+150 pts', ademasDe: 'A més dels +20s per encertar',
    pistaExtraDesc: 'El següent país té 3 pistes regal en lloc de 2',
    saltarGratisDesc: 'Acumules un salt sense penalització',
    bonusDesc: 'Bonus de punts directe',
    paso1: 'Pistes obligatòries: respon amb un país que compleixi', paso2: 'Pistes regal: respon el que vulguis, es revelen',
    paso3: 'Endevina el país en qualsevol moment per guanyar', paso4: 'Menys pistes usades = més punts',
    paisMisterioso: 'País misteriós', pistaOculta: 'Pista oculta',
    obligatoria: 'Escriu un país que compleixi', regalo: 'Pista regal — respon el que vulguis',
    intentaResponder: 'Intenta respondre (si falles, avancem):',
    noReconocido: 'País no reconegut', noCumple: 'no compleix aquesta pista', noCumpleAvanzamos: 'no compleix, però avancem',
    cumple: 'compleix', siguientePista: 'No és', escribePais: 'Escriu un país…',
    saltarPais: 'Saltar país (−10s)', eligeRecompensa: 'Tria la recompensa',
    tiempoAgotado: 'S\'ha acabat el temps!', puntuacion: 'Puntuació', paises: 'Països', mejorRacha: 'Millor ratxa',
    compartir: '🔗 Compartir resultat', reintentar: 'Tornar-ho a provar', cambiarDif: 'Canviar dificultat',
    ultimoPais: 'Últim país', tienes: 'tens',
  },
}

export default function GeoRush() {
  const navigate = useNavigate()
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const u = UI[lang] || UI.es
  const difLabel = d => lang === 'en' ? (d.labelEn || d.label) : lang === 'ca' ? (d.labelCa || d.label) : d.label
  const [fase, setFase]         = useState('intro')
  const [difId, setDifId]       = useState('medio')
  const [timeLeft, setTimeLeft] = useState(60)
  const [puntos, setPuntos]     = useState(0)
  const [paisesAcertados, setPaisesAcertados] = useState(0)
  const [levelKey, setLevelKey] = useState(0)
  const [saved, setSaved]       = useState(false)

  const [paisActual, setPaisActual]       = useState(null)
  const [pistas, setPistas]               = useState([])
  const [pistaIdx, setPistaIdx]           = useState(0)
  const [pistaExtraActiva, setPistaExtraActiva] = useState(false)
  const [saltarGratis, setSaltarGratis]   = useState(0)
  const [inputVal, setInputVal]           = useState('')
  const [feedback, setFeedback]           = useState(null)
  const [faseRonda, setFaseRonda]         = useState('pista') // 'pista' | 'recompensa'
  const [paisesUsados, setPaisesUsados]   = useState([])
  const [combo, setCombo]                 = useState(0)
  const [maxCombo, setMaxCombo]           = useState(0)

  const timerRef  = useRef(null)
  const startRef  = useRef(null)
  const tiempoRef = useRef(60)

  const dif = DIFS[difId]

  useEffect(() => {
    if (fase !== 'fin' || puntos <= 0 || saved || !user) return
    setSaved(true)
    const timeSpent = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
    saveActivity(user.uid, {
      type: 'juego', game: 'georush', category: difId,
      score: puntos, passed: paisesAcertados >= 3, timeSpent,
      coinsEarned: computeCoins('georush', { score: puntos }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase])

  useEffect(() => {
    if (fase !== 'jugando') return
    if (faseRonda === 'recompensa') return

    timerRef.current = setInterval(() => {
      tiempoRef.current -= 1
      setTimeLeft(tiempoRef.current)
      if (tiempoRef.current <= 0) {
        clearInterval(timerRef.current)
        setFase('fin')
      }
    }, 1000)
    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase, levelKey, faseRonda])

  function iniciar(selectedDif) {
    const d = DIFS[selectedDif]
    setDifId(selectedDif)
    setTimeLeft(d.tiempoInicio)
    tiempoRef.current = d.tiempoInicio
    setPuntos(0)
    setPaisesAcertados(0)
    setPaisesUsados([])
    setCombo(0)
    setMaxCombo(0)
    setPistaExtraActiva(false)
    setSaltarGratis(0)
    setSaved(false)
    startRef.current = Date.now()
    setFase('jugando')
    siguientePais([])
  }

  function siguientePais(usados) {
    const disponibles = PAISES.filter(p => !usados.includes(p.nombre))
    if (disponibles.length === 0) { setFase('fin'); return }
    const pais = disponibles[Math.floor(Math.random() * disponibles.length)]

    const obligatorias = generarPistasObligatorias(pais, lang)
    const regalos      = generarPistasRegalo(pais, pistaExtraActiva, lang)
    const mezcladas    = mezclarPistas(obligatorias, regalos)

    setPaisActual(pais)
    setPistas(mezcladas)
    setPistaIdx(0)
    setInputVal('')
    setFeedback(null)
    setFaseRonda('pista')
    setPaisesUsados(u => [...u, pais.nombre])
    setLevelKey(k => k + 1)
  }

  function handleRespuesta(val) {
    const nombreInput = val || inputVal
    const paisResp = PAISES.find(p => p.nombre === nombreInput)
    if (!paisResp) {
      setFeedback({ ok: false, msg: u.noReconocido })
      setTimeout(() => setFeedback(null), 1200)
      return
    }

    if (nombreInput === paisActual.nombre) {
      acertarPais()
      return
    }

    const pista = pistas[pistaIdx]
    if (!pista) return

    if (pista.tipo === 'regalo' || pista.validar(nombreInput)) {
      const msg = pista.tipo === 'regalo'
        ? `→ ${u.siguientePista}`
        : `✓ ${nombreInput} ${u.cumple}`
      setFeedback({ ok: true, msg })
      setInputVal('')
      setTimeout(() => { setFeedback(null); avanzar() }, 700)
    } else if (!dif.obligatorio) {
      setFeedback({ ok: 'neutral', msg: `${nombreInput} ${u.noCumpleAvanzamos}` })
      setInputVal('')
      setTimeout(() => { setFeedback(null); avanzar() }, 1000)
    } else {
      setFeedback({ ok: false, msg: `✗ ${nombreInput} ${u.noCumple}` })
      setInputVal('')
      setTimeout(() => setFeedback(null), 1200)
    }
  }

  function avanzar() {
    if (pistaIdx + 1 < pistas.length) {
      setPistaIdx(i => i + 1)
    } else {
      setCombo(0)
      tiempoRef.current = Math.max(0, tiempoRef.current - 5)
      setTimeLeft(tiempoRef.current)
      setFeedback({ ok: false, msg: `❌ Era ${paisActual.nombre} · −5s` })
      if (tiempoRef.current <= 0) { setFase('fin'); return }
      setTimeout(() => { setFeedback(null); siguientePais(paisesUsados) }, 2000)
      return
}
  }

  function acertarPais() {
    clearInterval(timerRef.current)
    tiempoRef.current += 20
    setTimeLeft(tiempoRef.current)
    const nuevoCombo = combo + 1
    setMaxCombo(m => Math.max(m, nuevoCombo))
    const basePts = Math.max(50, 200 - pistaIdx * 25)
    const mult = difId === 'dificil' ? 1.5 : difId === 'medio' ? 1.2 : 1
    const pts = Math.round((basePts + nuevoCombo * 25) * mult)
    setPuntos(p => p + pts)
    setPaisesAcertados(n => n + 1)
    setCombo(nuevoCombo)
    setFeedback({ ok: true, msg: `🎉 ${paisActual.nombre}! +${pts} pts · +20s` })
    setFaseRonda('recompensa')
  }

  function elegirRecompensa(tipo) {
    if (tipo === 'tiempo') {
      tiempoRef.current += 15
      setTimeLeft(tiempoRef.current)
    } else if (tipo === 'pistaExtra') {
      setPistaExtraActiva(true)
    } else if (tipo === 'saltar') {
      setSaltarGratis(n => n + 1)
    } else if (tipo === 'bonus') {
      setPuntos(p => p + 150)
    }
    setFeedback(null)
    siguientePais(paisesUsados)
  }

  function usarSaltarGratis() {
    setSaltarGratis(n => n - 1)
    setCombo(0)
    siguientePais(paisesUsados)
  }

  function saltarPais() {
    setCombo(0)
    tiempoRef.current = Math.max(0, tiempoRef.current - 10)
    setTimeLeft(tiempoRef.current)
    if (tiempoRef.current <= 0) { setFase('fin'); return }
    siguientePais(paisesUsados)
  }



  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    const d = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={lang==='en'?'GeoRush — Guess the Country':'GeoRush — Adivina el País'} description={lang==='en'?'Guess the mystery country from geographical, demographic and historical clues. Beat the clock in this free geography game.':lang==='ca'?'Endevina el país misteriós a partir de pistes geogràfiques, demogràfiques i històriques.':'Descubre el país misterioso a partir de pistas geográficas, demográficas e históricas. Contra el reloj.'} path={lang==='en'?'/en/juegos/georush':lang==='ca'?'/ca/juegos/georush':'/juegos/georush'} lang={lang} />
        <div className="max-w-xl w-full">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {u.volver}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🌍</span>
            <h1 className="text-4xl font-black text-white mb-2">{u.titulo}</h1>
            <p className="text-white/40">{u.desc}</p>
          </div>

          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-6 w-fit mx-auto">
            {Object.entries(DIFS).map(([id, dd]) => (
              <button key={id} onClick={() => setDifId(id)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  difId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {dd.emoji} {difLabel(dd)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-sm">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{u.reglas}</p>
              {[
                ['⏱️', u.tiempo, `${d.tiempoInicio}s`],
                ['🔍', lang === 'en' ? 'Clues' : 'Pistas', u.pistas],
                ['✅', u.alAcertar, u.acertar],
                ['❌', u.noAdivinar, '−5s'],
                ['⏭️', u.saltar, '−10s'],
              ].map(([e, k, v]) => (
                <div key={k} className="flex items-start justify-between gap-2">
                  <span className="text-white/40 shrink-0">{e} {k}</span>
                  <span className="text-white font-semibold text-right">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-sm">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{u.recompensas}</p>
              {(difId === 'dificil'
                ? [['⏱️', u.tiempoExtra], ['💡', u.pistaExtra], ['✨', u.bonusPts]]
                : [['⏱️', u.tiempoExtra], ['💡', u.pistaExtra], ['⏭️', u.saltarGratis]]
              ).map(([e, t]) => (
                <div key={t} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-7">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{u.comoFunciona}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['🔒', u.paso1],
                ['🎁', u.paso2],
                ['🎯', u.paso3],
                ['🏆', u.paso4],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => iniciar(difId)}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            {u.empezar}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ───────────────────────────────────────────────────────────────────
  const ultimoPais = paisActual?.nombre
  if (fase === 'fin') {
    const shareText = `He acertado ${paisesAcertados} países y conseguido ${puntos.toLocaleString()} pts en GeoRush 🌍 — ¿puedes superarme? https://tuthor.es/juegos/georush`
    return (
      <GameEndScreen
        game="georush"
        emoji="🌍"
        title={`${u.tiempoAgotado} · ${dif.emoji} ${difLabel(dif)}`}
        score={puntos}
        stats={[
          { label: u.paises, value: paisesAcertados },
          { label: u.mejorRacha, value: maxCombo },
        ]}
        shareText={shareText}
        onPlayAgain={() => iniciar(difId)}
        playAgainLabel={u.reintentar}
        secondaryActions={[{ label: u.cambiarDif, onClick: () => setFase('intro') }]}
        user={user} lang={lang}
      >
        {ultimoPais && (
          <div className="bg-white/5 rounded-xl p-3 mt-4">
            <p className="text-white/30 text-xs mb-0.5">{u.ultimoPais}</p>
            <p className="text-white font-bold">{ultimoPais}</p>
          </div>
        )}
      </GameEndScreen>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  if (!paisActual) return null

  const timerPct   = Math.min(100, (timeLeft / dif.tiempoInicio) * 100)
  const timerColor = timeLeft > 20 ? 'bg-green-400' : timeLeft > 10 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'

  const recompensaOpciones = difId === 'dificil'
    ? [
        { id: 'tiempo', emoji: '⏱️', label: u.tiempoExtra, desc: u.ademasDe },
        { id: 'pistaExtra', emoji: '💡', label: u.pistaExtra, desc: u.pistaExtraDesc },
        { id: 'bonus', emoji: '✨', label: u.bonusPts, desc: u.bonusDesc },
      ]
    : [
        { id: 'tiempo', emoji: '⏱️', label: u.tiempoExtra, desc: u.ademasDe },
        { id: 'pistaExtra', emoji: '💡', label: u.pistaExtra, desc: u.pistaExtraDesc },
        { id: 'saltar', emoji: '⏭️', label: u.saltarGratis, desc: `${u.saltarGratisDesc}${saltarGratis > 0 ? ` (${u.tienes} ${saltarGratis})` : ''}` },
      ]

  const pistaActual = pistas[pistaIdx]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-3xl mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {u.salir}
        </button>
        <div className="flex items-center gap-4 text-sm text-white/50">
          {saltarGratis > 0 && <span className="text-emerald-400 font-bold">⏭️ {saltarGratis}</span>}
          {combo >= 2 && <span className="text-amber-400 font-bold">🔥 ×{combo}</span>}
          <span className="text-white font-bold tabular-nums">{puntos.toLocaleString()} pts</span>
          <span className="text-white/30">🌍 {paisesAcertados}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-white/40 mb-1.5">
          <span>{u.tiempo}</span>
          <span className={`font-bold tabular-nums text-sm ${timeLeft <= 10 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
        </div>
        <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
            style={{ width: `${timerPct}%` }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_320px] md:gap-8 md:items-start">

        {/* Panel de pistas */}
        <div className="mb-5 md:mb-0">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white/30 text-xs font-semibold uppercase tracking-widest">{u.paisMisterioso}</h2>
              <span className="text-white/20 text-xs">{pistaIdx + 1} / {pistas.length}</span>
            </div>

            <div className="space-y-2">
              {pistas.map((p, i) => {
                const revelada = i < pistaIdx
                const activa   = i === pistaIdx && faseRonda === 'pista'
                const bloqueada = i > pistaIdx
                const icono = p.tipo === 'regalo' ? '🎁' : '🔒'

                if (bloqueada) return (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm bg-white/3 border border-white/5 text-white/15">
                    <span className="text-base opacity-40">{icono}</span>
                    <span>{u.pistaOculta}</span>
                  </div>
                )

                return (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    activa
                      ? 'bg-[#EDAE49]/15 border border-[#EDAE49]/40 text-white'
                      : 'bg-white/5 border border-white/10 text-white/50'
                  }`}>
                    <span className="text-base">{revelada ? '✅' : icono}</span>
                    <span>{p.texto}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Panel de acción */}
        <div className="flex flex-col gap-4">

          {faseRonda === 'pista' && pistaActual && (
            <>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{pistaActual.tipo === 'regalo' ? '🎁' : '🔒'}</span>
                  <p className="text-white/30 text-xs uppercase tracking-widest">
                    {pistaActual.tipo === 'regalo' ? u.regalo : (dif.obligatorio ? u.obligatoria : u.intentaResponder)}
                  </p>
                </div>
                <p className="text-white font-bold text-sm">{pistaActual.texto}</p>
              </div>
              <AutocompleteInput value={inputVal} onChange={setInputVal} onSubmit={handleRespuesta}
                paises={NOMBRES_PAISES} disabled={!!feedback} focusKey={pistaIdx} />
              {feedback && (
                <div className={`text-center py-2 rounded-xl font-bold text-sm ${
                  feedback.ok === true ? 'bg-green-500/20 text-green-400'
                    : feedback.ok === 'neutral' ? 'bg-white/10 text-white/60'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {feedback.msg}
                </div>
              )}
              <div className="flex gap-2">
                {saltarGratis > 0 && (
                  <button onClick={usarSaltarGratis}
                    className="flex-1 py-2.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-sm font-bold rounded-xl transition-colors">
                    ⏭️ {u.saltarGratis} ({saltarGratis})
                  </button>
                )}
                <button onClick={saltarPais}
                  className={`${saltarGratis > 0 ? 'flex-1' : 'w-full'} py-2 text-white/30 hover:text-white/50 text-sm transition-colors`}>
                  {u.saltarPais}
                </button>
              </div>
            </>
          )}

          {faseRonda === 'recompensa' && (
            <>
              <div className="bg-green-900/30 border border-green-500/30 rounded-2xl p-4 text-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-green-400 font-black text-xl">{feedback?.msg}</p>
              </div>
              <p className="text-white/30 text-xs uppercase tracking-widest text-center font-semibold">{u.eligeRecompensa}</p>
              {recompensaOpciones.map(r => (
                <button key={r.id} onClick={() => elegirRecompensa(r.id)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-2xl p-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.emoji}</span>
                    <div>
                      <p className="font-bold text-white">{r.label}</p>
                      <p className="text-white/40 text-xs">{r.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}

        </div>
      </div>
    </div>
  )
}
