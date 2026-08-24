import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import SEOHead from '../components/SEOHead'

// ── Examen: Punto de Equilibrio ──────────────────────────────────────────────
// Umbral de rentabilidad (Economía de la Empresa, 2º Bach): Q = CF / (P − CVu).
//
// No usa el componente genérico ExamenMC porque la pregunta central pide
// CALCULAR y escribir el número (como en un examen real), no elegir entre
// opciones — perdía el sentido si se convertía en test de 4 respuestas.
//
// Los números se generan al revés (se fija primero Q y el margen unitario, y
// de ahí se derivan CF/P/CVu) para que la respuesta sea siempre un entero
// exacto — con fórmulas económicas, redondear "a ojo" genera discusiones
// sobre si tocaba redondear hacia arriba, y eso no es lo que se examina aquí.
//
// Tres tipos de pregunta para no ser un simple "aplica la fórmula":
//  - calcula-q: la pregunta clásica — dados CF/P/CVu, escribe las unidades de
//    equilibrio.
//  - beneficio: dado un nº de unidades vendidas, ¿la empresa gana, pierde o
//    ni gana ni pierde? Refuerza qué significa estar por encima/debajo de Q.
//  - conceptual: preguntas de sensibilidad sin calculadora (si sube CF, ¿sube
//    o baja el punto de equilibrio?) — lo que de verdad se pregunta en
//    examen además del cálculo puro.

const EXAM_TOTAL = 10

const RANGOS = {
  facil:   { margenRango: [5, 20], qRango: [10, 60], qPaso: 10, tipos: ['calcula-q'] },
  medio:   { margenRango: [3, 40], qRango: [20, 300], qPaso: 5, tipos: ['calcula-q', 'calcula-q', 'beneficio'] },
  dificil: { margenRango: [2, 60], qRango: [50, 900], qPaso: 1, tipos: ['calcula-q', 'beneficio', 'conceptual'] },
}

const NIVEL_LABEL = {
  facil:   { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
  medio:   { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
  dificil: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
}

const CONCEPTUALES = [
  {
    pregunta: { es: 'Suben los costes fijos (CF) y todo lo demás no cambia. El punto de equilibrio…', en: 'Fixed costs (FC) go up and everything else stays the same. The break-even point…', ca: 'Pugen els costos fixos (CF) i tota la resta no canvia. El punt d\'equilibri…' },
    opciones: { es: ['Sube', 'Baja', 'No cambia'], en: ['Goes up', 'Goes down', 'Stays the same'], ca: ['Puja', 'Baixa', 'No canvia'] },
    correcta: 0,
    explicacion: { es: 'Q = CF / margen: si CF aumenta y el margen no cambia, Q aumenta.', en: 'Q = FC / margin: if FC increases and the margin stays the same, Q increases.', ca: 'Q = CF / marge: si CF augmenta i el marge no canvia, Q augmenta.' },
  },
  {
    pregunta: { es: 'Sube el precio de venta (P) y todo lo demás no cambia. El punto de equilibrio…', en: 'The selling price (P) goes up and everything else stays the same. The break-even point…', ca: 'Puja el preu de venda (P) i tota la resta no canvia. El punt d\'equilibri…' },
    opciones: { es: ['Sube', 'Baja', 'No cambia'], en: ['Goes up', 'Goes down', 'Stays the same'], ca: ['Puja', 'Baixa', 'No canvia'] },
    correcta: 1,
    explicacion: { es: 'Un precio mayor ensancha el margen (P − CVu), y Q = CF / margen baja.', en: 'A higher price widens the margin (P − VCu), so Q = FC / margin goes down.', ca: 'Un preu més alt eixampla el marge (P − CVu), i Q = CF / marge baixa.' },
  },
  {
    pregunta: { es: 'Sube el coste variable unitario (CVu) y todo lo demás no cambia. El punto de equilibrio…', en: 'The unit variable cost (VCu) goes up and everything else stays the same. The break-even point…', ca: 'Puja el cost variable unitari (CVu) i tota la resta no canvia. El punt d\'equilibri…' },
    opciones: { es: ['Sube', 'Baja', 'No cambia'], en: ['Goes up', 'Goes down', 'Stays the same'], ca: ['Puja', 'Baixa', 'No canvia'] },
    correcta: 0,
    explicacion: { es: 'Un CVu mayor estrecha el margen (P − CVu), y Q = CF / margen sube.', en: 'A higher VCu narrows the margin (P − VCu), so Q = FC / margin goes up.', ca: 'Un CVu més alt estreny el marge (P − CVu), i Q = CF / marge puja.' },
  },
  {
    pregunta: { es: 'Vender por debajo del punto de equilibrio significa que la empresa…', en: 'Selling below the break-even point means the company…', ca: 'Vendre per sota del punt d\'equilibri vol dir que l\'empresa…' },
    opciones: { es: ['Pierde dinero', 'Gana dinero', 'Ni gana ni pierde'], en: ['Loses money', 'Makes money', 'Breaks even'], ca: ['Perd diners', 'Guanya diners', 'Ni guanya ni perd'] },
    correcta: 0,
    explicacion: { es: 'Por debajo de Q, los ingresos no llegan a cubrir los costes fijos y variables: hay pérdidas.', en: 'Below Q, revenue does not cover fixed and variable costs: there is a loss.', ca: 'Per sota de Q, els ingressos no arriben a cobrir els costos fixos i variables: hi ha pèrdues.' },
  },
  {
    pregunta: { es: 'Vender exactamente en el punto de equilibrio significa que el beneficio es…', en: 'Selling exactly at the break-even point means profit is…', ca: 'Vendre exactament al punt d\'equilibri vol dir que el benefici és…' },
    opciones: { es: ['Cero', 'Máximo', 'Negativo'], en: ['Zero', 'Maximum', 'Negative'], ca: ['Zero', 'Màxim', 'Negatiu'] },
    correcta: 0,
    explicacion: { es: 'Por definición, en Q los ingresos igualan exactamente a los costes totales: beneficio = 0.', en: 'By definition, at Q revenue exactly equals total costs: profit = 0.', ca: 'Per definició, a Q els ingressos igualen exactament els costos totals: benefici = 0.' },
  },
  {
    pregunta: { es: 'El margen de contribución unitario es…', en: 'The unit contribution margin is…', ca: 'El marge de contribució unitari és…' },
    opciones: {
      es: ['Precio de venta − coste variable unitario', 'Precio de venta − costes fijos', 'Costes fijos ÷ unidades vendidas'],
      en: ['Selling price − unit variable cost', 'Selling price − fixed costs', 'Fixed costs ÷ units sold'],
      ca: ['Preu de venda − cost variable unitari', 'Preu de venda − costos fixos', 'Costos fixos ÷ unitats venudes'],
    },
    correcta: 0,
    explicacion: { es: 'Es lo que aporta cada unidad vendida para cubrir los costes fijos, una vez pagado su propio coste variable.', en: 'It is what each unit sold contributes to covering fixed costs, once its own variable cost is paid.', ca: 'És el que aporta cada unitat venuda per cobrir els costos fixos, un cop pagat el seu propi cost variable.' },
  },
]

function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function generarEscenario(rangos) {
  const margen = rng(...rangos.margenRango)
  const pasos = Math.max(1, Math.floor((rangos.qRango[1] - rangos.qRango[0]) / rangos.qPaso))
  const q = rangos.qRango[0] + rng(0, pasos) * rangos.qPaso
  const cf = q * margen
  const cvu = rng(2, 40)
  const p = cvu + margen
  return { cf, p, cvu, margen, q }
}

function generarCalculaQ(rangos) {
  const { cf, p, cvu, margen, q } = generarEscenario(rangos)
  return {
    tipo: 'calcula-q', cf, p, cvu, margen, respuesta: q,
    explicacion: {
      es: `Q = CF / (P − CVu) = ${cf} / (${p} − ${cvu}) = ${cf} / ${margen} = ${q} unidades.`,
      en: `Q = FC / (P − VCu) = ${cf} / (${p} − ${cvu}) = ${cf} / ${margen} = ${q} units.`,
      ca: `Q = CF / (P − CVu) = ${cf} / (${p} − ${cvu}) = ${cf} / ${margen} = ${q} unitats.`,
    },
  }
}

function generarBeneficio(rangos) {
  const { cf, p, cvu, margen, q } = generarEscenario(rangos)
  const modo = pick(['bajo', 'igual', 'alto'])
  const variacion = Math.max(1, Math.floor(q * 0.4))
  const vendidas = modo === 'igual' ? q : modo === 'bajo' ? Math.max(1, q - rng(1, variacion)) : q + rng(1, variacion)
  const beneficio = vendidas * margen - cf
  const respuesta = beneficio > 0 ? 'gana' : beneficio < 0 ? 'pierde' : 'ninguno'
  return {
    tipo: 'beneficio', cf, p, cvu, margen, vendidas, beneficio, respuesta,
    explicacion: {
      es: `Beneficio = unidades × (P − CVu) − CF = ${vendidas} × ${margen} − ${cf} = ${beneficio} €. El punto de equilibrio son ${q} unidades.`,
      en: `Profit = units × (P − VCu) − FC = ${vendidas} × ${margen} − ${cf} = €${beneficio}. The break-even point is ${q} units.`,
      ca: `Benefici = unitats × (P − CVu) − CF = ${vendidas} × ${margen} − ${cf} = ${beneficio} €. El punt d'equilibri són ${q} unitats.`,
    },
  }
}

function generarConceptual() {
  const c = pick(CONCEPTUALES)
  return { tipo: 'conceptual', ...c }
}

function generarPregunta(rangos) {
  const tipo = pick(rangos.tipos)
  if (tipo === 'calcula-q') return generarCalculaQ(rangos)
  if (tipo === 'beneficio') return generarBeneficio(rangos)
  return generarConceptual()
}

function calificacion(aciertos, lang) {
  const en = lang === 'en', ca = lang === 'ca'
  if (aciertos >= 9)  return { label: en ? 'Outstanding' : ca ? 'Excel·lent'  : 'Sobresaliente', color: 'text-green-400'  }
  if (aciertos >= 7)  return { label: en ? 'Good'        : ca ? 'Notable'     : 'Notable',       color: 'text-blue-400'   }
  if (aciertos === 6) return { label: en ? 'Fair'        : ca ? 'Bé'          : 'Bien',          color: 'text-yellow-300' }
  if (aciertos === 5) return { label: en ? 'Pass'        : ca ? 'Suficient'   : 'Suficiente',    color: 'text-orange-400' }
  return                     { label: en ? 'Fail'        : ca ? 'Insuficient' : 'Insuficiente',  color: 'text-red-400'    }
}

export default function PuntoEquilibrioExamen() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const backPath = location.state?.backPath

  const [nivelSel, setNivelSel] = useState(null)
  const [idx, setIdx] = useState(0)
  const [pregunta, setPregunta] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const [seleccion, setSeleccion] = useState(null)
  const [resuelto, setResuelto] = useState(false)
  const [acierto, setAcierto] = useState(false)
  const [aciertos, setAciertos] = useState(0)
  const [historial, setHistorial] = useState([])
  const [fase, setFase] = useState('nivel') // nivel | jugando | resultado
  const savedRef = useRef(false)

  function empezar(nivel) {
    setNivelSel(nivel)
    setIdx(0); setAciertos(0); setHistorial([])
    setPregunta(generarPregunta(RANGOS[nivel]))
    setInputVal(''); setSeleccion(null); setResuelto(false); setAcierto(false)
    setFase('jugando')
    savedRef.current = false
  }

  function responderCalculaQ() {
    if (resuelto || inputVal === '') return
    const ok = Number(inputVal) === pregunta.respuesta
    resolver(ok)
  }

  function resolver(ok) {
    if (resuelto) return
    setAcierto(ok)
    setResuelto(true)
    if (ok) setAciertos(a => a + 1)
    setHistorial(h => [...h, { passed: ok }])
  }

  function siguiente() {
    if (idx + 1 >= EXAM_TOTAL) {
      guardarResultado()
      setFase('resultado')
    } else {
      setIdx(i => i + 1)
      setPregunta(generarPregunta(RANGOS[nivelSel]))
      setInputVal(''); setSeleccion(null); setResuelto(false); setAcierto(false)
    }
  }

  function guardarResultado() {
    if (!user || savedRef.current) return
    savedRef.current = true
    const score = aciertos * 100
    const passed = aciertos >= 5
    saveActivity(user.uid, {
      type: 'examen', game: 'punto-equilibrio', category: 'punto-equilibrio',
      score, passed, timeSpent: 0, coinsEarned: Math.min(aciertos * 20, 200),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }

  const seoTitle = tr({ es: 'Examen: Punto de Equilibrio', en: 'Break-Even Point Exam', ca: 'Examen: Punt d\'Equilibri' })
  const seoDesc = tr({
    es: 'Calcula el punto de equilibrio (Q = CF / (P − CVu)): unidades de equilibrio, beneficio o pérdida y preguntas de sensibilidad. Economía de la Empresa, 2º Bachillerato.',
    en: 'Calculate the break-even point (Q = FC / (P − VCu)): break-even units, profit or loss, and sensitivity questions. Business Economics.',
    ca: 'Calcula el punt d\'equilibri (Q = CF / (P − CVu)): unitats d\'equilibri, benefici o pèrdua i preguntes de sensibilitat. Economia de l\'Empresa, 2n Batxillerat.',
  })
  const backTo = backPath ? localPath(backPath) : localPath('/estudiar/economia')

  // ── SELECTOR DE NIVEL ─────────────────────────────────────────────────────
  if (fase === 'nivel') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seoTitle} description={seoDesc} path="/examen/punto-equilibrio" lang={lang} />
        <div className="max-w-sm w-full text-center">
          <div className="text-5xl mb-4">🏭</div>
          <h1 className="text-white font-black text-2xl mb-2">{tr({ es: 'Punto de Equilibrio', en: 'Break-Even Point', ca: 'Punt d\'Equilibri' })}</h1>
          <p className="text-white/40 text-sm mb-2">{tr({ es: 'Selecciona un nivel para empezar', en: 'Select a level to start', ca: 'Selecciona un nivell per començar' })}</p>
          <p className="text-emerald-400 font-black text-lg mb-6 tracking-tight">Q = CF / (P − CVu)</p>
          <div className="flex flex-col gap-3">
            {Object.keys(RANGOS).map(nivel => (
              <button key={nivel} onClick={() => empezar(nivel)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl px-6 py-4 text-left transition-all flex items-center justify-between group">
                <p className="text-white font-bold">{tr(NIVEL_LABEL[nivel])}</p>
                <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
          <button onClick={() => navigate(backTo)} className="mt-6 text-white/30 hover:text-white/60 text-sm transition-colors">
            {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
          </button>
        </div>
      </div>
    )
  }

  // ── RESULTADO ─────────────────────────────────────────────────────────────
  if (fase === 'resultado') {
    const aprobado = aciertos >= 5
    const cal = calificacion(aciertos, lang)
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="text-5xl mb-3">{aprobado ? '🎉' : '😬'}</div>
            <div className={`text-xs uppercase tracking-widest font-semibold mb-1 ${aprobado ? 'text-green-400' : 'text-red-400'}`}>
              {aprobado ? tr({ es: 'Aprobado', en: 'Passed', ca: 'Aprovat' }) : tr({ es: 'Suspenso', en: 'Failed', ca: 'Suspès' })}
            </div>
            <h2 className="text-2xl font-black text-white mb-1">{cal.label}</h2>
            <p className={`text-5xl font-black mb-1 ${cal.color}`}>{aciertos}/{EXAM_TOTAL}</p>
            <p className="text-white/40 text-sm mb-3">{tr({ es: 'Punto de Equilibrio', en: 'Break-Even Point', ca: 'Punt d\'Equilibri' })} · {tr(NIVEL_LABEL[nivelSel])}</p>
            <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/30 rounded-full px-3 py-1">
              <span className="text-amber-400 text-sm">💰</span>
              <span className="text-amber-400 font-black text-sm">+{Math.min(aciertos * 20, 200)}</span>
              <span className="text-amber-400/60 text-xs">{tr({ es: 'monedas', en: 'coins', ca: 'monedes' })}</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">{tr({ es: 'Detalle', en: 'Detail', ca: 'Detall' })}</p>
            <div className="flex gap-2 flex-wrap">
              {historial.map((h, i) => (
                <div key={i} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold ${
                  h.passed ? 'bg-green-400/20 border-green-400 text-green-400' : 'bg-red-400/20 border-red-400 text-red-400'
                }`}>{i + 1}</div>
              ))}
            </div>
          </div>

          <button onClick={() => empezar(nivelSel)}
            className="w-full py-3 bg-[#EDAE49] hover:bg-amber-400 text-black font-black rounded-2xl transition-all mb-2">
            {tr({ es: 'Repetir examen', en: 'Retake exam', ca: 'Repetir examen' })}
          </button>
          <button onClick={() => setFase('nivel')} className="w-full py-3 text-white/40 hover:text-white/70 text-sm transition-colors">
            {tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' })}
          </button>
          <button onClick={() => navigate(backTo)} className="w-full py-2 text-white/30 hover:text-white/60 text-sm transition-colors">
            {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
          </button>
        </div>
      </div>
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  if (!pregunta) return null

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 md:px-8 py-5 max-w-lg mx-auto w-full">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => navigate(backTo)} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {tr({ es: '← Salir', en: '← Exit', ca: '← Sortir' })}
        </button>
        <span className="text-white/40 text-sm font-bold">🏭 {idx + 1}/{EXAM_TOTAL}</span>
      </div>

      <div className="mb-4">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#EDAE49] rounded-full transition-all duration-300" style={{ width: `${(idx / EXAM_TOTAL) * 100}%` }} />
        </div>
        <div className="flex gap-1.5 mt-2">
          {historial.map((h, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${h.passed ? 'bg-green-400' : 'bg-red-400'}`} />
          ))}
          <div className="h-1.5 flex-1 rounded-full bg-white/30" />
          {Array.from({ length: EXAM_TOTAL - historial.length - 1 }).map((_, i) => (
            <div key={`p-${i}`} className="h-1.5 flex-1 rounded-full bg-white/10" />
          ))}
        </div>
      </div>

      <div className={`flex-1 flex flex-col justify-center rounded-2xl border-2 p-5 transition-all duration-200 ${
        resuelto ? (acierto ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10') : 'border-white/10 bg-white/5'
      }`}>
        {pregunta.tipo === 'calcula-q' && (
          <>
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest text-center mb-3">{tr({ es: 'Calcula Q', en: 'Calculate Q', ca: 'Calcula Q' })}</p>
            <p className="text-white/70 text-center text-sm leading-relaxed mb-5">
              {tr({
                es: `Una empresa tiene unos costes fijos de ${pregunta.cf} €. Cada unidad se vende a ${pregunta.p} € y cuesta ${pregunta.cvu} € producirla.`,
                en: `A company has fixed costs of €${pregunta.cf}. Each unit sells for €${pregunta.p} and costs €${pregunta.cvu} to produce.`,
                ca: `Una empresa té uns costos fixos de ${pregunta.cf} €. Cada unitat es ven a ${pregunta.p} € i costa ${pregunta.cvu} € produir-la.`,
              })}
            </p>
            <p className="text-white font-bold text-center mb-4">{tr({ es: '¿Cuántas unidades debe vender para cubrir costes?', en: 'How many units must it sell to break even?', ca: 'Quantes unitats ha de vendre per cobrir costos?' })}</p>
            <div className="flex gap-2 max-w-xs mx-auto w-full">
              <input
                type="number"
                inputMode="numeric"
                autoFocus
                value={inputVal}
                disabled={resuelto}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && responderCalculaQ()}
                placeholder={tr({ es: 'Unidades', en: 'Units', ca: 'Unitats' })}
                className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center font-black text-xl tabular-nums focus:outline-none focus:border-emerald-400"
              />
              {!resuelto && (
                <button onClick={responderCalculaQ} disabled={inputVal === ''}
                  className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-black font-black rounded-xl transition-all">
                  ✓
                </button>
              )}
            </div>
          </>
        )}

        {pregunta.tipo === 'beneficio' && (
          <>
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest text-center mb-3">{tr({ es: 'Beneficio o pérdida', en: 'Profit or loss', ca: 'Benefici o pèrdua' })}</p>
            <p className="text-white/70 text-center text-sm leading-relaxed mb-5">
              {tr({
                es: `Costes fijos: ${pregunta.cf} €. Precio: ${pregunta.p} €/ud. Coste variable: ${pregunta.cvu} €/ud. Este mes ha vendido ${pregunta.vendidas} unidades.`,
                en: `Fixed costs: €${pregunta.cf}. Price: €${pregunta.p}/unit. Variable cost: €${pregunta.cvu}/unit. This month it sold ${pregunta.vendidas} units.`,
                ca: `Costos fixos: ${pregunta.cf} €. Preu: ${pregunta.p} €/ut. Cost variable: ${pregunta.cvu} €/ut. Aquest mes ha venut ${pregunta.vendidas} unitats.`,
              })}
            </p>
            <p className="text-white font-bold text-center mb-4">{tr({ es: '¿Gana, pierde o ni gana ni pierde?', en: 'Profit, loss, or break-even?', ca: 'Guanya, perd o ni guanya ni perd?' })}</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'gana', label: tr({ es: 'Gana', en: 'Profit', ca: 'Guanya' }) },
                { id: 'pierde', label: tr({ es: 'Pierde', en: 'Loss', ca: 'Perd' }) },
                { id: 'ninguno', label: tr({ es: 'Ni gana ni pierde', en: 'Break-even', ca: 'Ni guanya ni perd' }) },
              ].map(op => (
                <button key={op.id} disabled={resuelto} onClick={() => { setSeleccion(op.id); resolver(op.id === pregunta.respuesta) }}
                  className={`py-3 px-2 border text-sm font-bold rounded-xl transition-all ${
                    resuelto
                      ? op.id === pregunta.respuesta ? 'bg-green-500/20 border-green-400 text-green-400'
                      : op.id === seleccion ? 'bg-red-500/20 border-red-400 text-red-400'
                      : 'bg-white/5 border-white/10 text-white/30'
                      : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                  }`}>
                  {op.label}
                </button>
              ))}
            </div>
          </>
        )}

        {pregunta.tipo === 'conceptual' && (
          <>
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest text-center mb-3">{tr({ es: 'Sensibilidad', en: 'Sensitivity', ca: 'Sensibilitat' })}</p>
            <p className="text-white font-bold text-center mb-5">{tr(pregunta.pregunta)}</p>
            <div className="flex flex-col gap-2">
              {tr(pregunta.opciones).map((op, i) => (
                <button key={i} disabled={resuelto} onClick={() => { setSeleccion(i); resolver(i === pregunta.correcta) }}
                  className={`py-3 px-4 border text-sm font-bold rounded-xl transition-all text-left ${
                    resuelto
                      ? i === pregunta.correcta ? 'bg-green-500/20 border-green-400 text-green-400'
                      : i === seleccion ? 'bg-red-500/20 border-red-400 text-red-400'
                      : 'bg-white/5 border-white/10 text-white/30'
                      : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                  }`}>
                  {op}
                </button>
              ))}
            </div>
          </>
        )}

        {resuelto && pregunta.explicacion && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mt-4">
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">{tr({ es: 'Explicación', en: 'Explanation', ca: 'Explicació' })}</p>
            <p className="text-white/70 text-sm leading-relaxed">{tr(pregunta.explicacion)}</p>
          </div>
        )}
      </div>

      {resuelto && (
        <button onClick={siguiente}
          className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black rounded-2xl transition-all">
          {idx + 1 >= EXAM_TOTAL
            ? tr({ es: 'Terminar y ver monedas →', en: 'Finish & see coins →', ca: 'Acabar i veure monedes →' })
            : tr({ es: 'Siguiente pregunta →', en: 'Next question →', ca: 'Següent pregunta →' })}
        </button>
      )}
    </div>
  )
}
