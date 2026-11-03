// Una ronda de Escalas y Acordes (ver lib/escalasAcordes):
//   intervalo  tocar una tecla (otra la cambia) y comprobar
//   escala / acorde  marcar y desmarcar teclas y comprobar
//   clasifica  tocar un intervalo escrito y luego su caja
// Teclado de dos octavas (Do4–Si5): suena al tocar y, al corregir, toca la
// respuesta buena.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { playNote } from '../../lib/pentagramaAudio'
import { objetivo, dadas, mismasAlturas, altura, nombre, nombreIntervalo, enunciado, explicacion, tono } from '../../lib/escalasAcordes'

const BLANCAS = [0, 2, 4, 5, 7, 9, 11] // semitonos de las teclas blancas dentro de la octava
const NEGRAS = [[1, 0], [3, 1], [6, 3], [8, 4], [10, 5]] // semitono y blanca a su izquierda
const LETRAS = { es: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], ca: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], en: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] }
const ANCHO = 30, ALTO = 150

function toca(h) { try { playNote(tono(h), 0.5) } catch { /* sin audio */ } }
function suena(alturas) {
  alturas.forEach((h, i) => setTimeout(() => toca(h), i * 260))
  if (alturas.length > 2) setTimeout(() => alturas.forEach(toca), alturas.length * 260 + 150)
}

function Teclado({ marcadas, fijas, revelado, buenas, onToca, l, nombres }) {
  const color = (h, negra) => {
    if (fijas.includes(h)) return '#F59E0B'
    if (revelado) {
      if (buenas.includes(h)) return marcadas.includes(h) ? '#22C55E' : '#86EFAC'
      if (marcadas.includes(h)) return '#EF4444'
    }
    if (marcadas.includes(h)) return '#38BDF8'
    return negra ? '#111827' : '#F8FAFC'
  }
  const blancas = [], negras = []
  for (let o = 0; o < 2; o++) {
    BLANCAS.forEach((st, i) => {
      const h = o * 12 + st, x = (o * 7 + i) * ANCHO
      blancas.push(
        <g key={h} onClick={() => onToca(h)} className={revelado ? '' : 'cursor-pointer'}>
          <rect x={x + 0.5} y="0.5" width={ANCHO - 1} height={ALTO} rx="3" fill={color(h, false)} stroke="#334155" />
          {(nombres || st === 0) && <text x={x + ANCHO / 2} y={ALTO - 8} textAnchor="middle" fontSize="11" fontWeight="800" fill="#475569" className="pointer-events-none">{LETRAS[l][i]}</text>}
          {revelado && buenas.includes(h) && !marcadas.includes(h) && <circle cx={x + ANCHO / 2} cy={ALTO - 28} r="4" fill="#15803D" className="pointer-events-none" />}
        </g>,
      )
    })
    NEGRAS.forEach(([st, izq]) => {
      const h = o * 12 + st, x = (o * 7 + izq + 1) * ANCHO - 9
      negras.push(
        <g key={h} onClick={() => onToca(h)} className={revelado ? '' : 'cursor-pointer'}>
          <rect x={x} y="0.5" width="18" height={ALTO * 0.62} rx="2" fill={color(h, true)} stroke="#0F172A" />
          {revelado && buenas.includes(h) && !marcadas.includes(h) && <circle cx={x + 9} cy={ALTO * 0.5} r="3.5" fill="#15803D" className="pointer-events-none" />}
        </g>,
      )
    })
  }
  return (
    <svg viewBox={`0 0 ${14 * ANCHO + 1} ${ALTO + 1}`} className="w-full block select-none touch-manipulation">
      {blancas}{negras}
    </svg>
  )
}

function EnTeclado({ r, revelado, onResponder, l, tr }) {
  const [marcadas, setMarcadas] = useState([])
  const fijas = dadas(r), buenas = objetivo(r)
  const uno = r.tipo === 'intervalo'
  const pulsa = h => {
    if (revelado) return
    toca(h)
    if (fijas.includes(h)) return
    setMarcadas(m => (uno ? [h] : m.includes(h) ? m.filter(x => x !== h) : [...m, h]))
  }
  const envia = () => {
    if (revelado || !marcadas.length) return
    const ok = mismasAlturas(marcadas, buenas)
    onResponder(`${r.tipo}:${ok ? 'ok' : 'mal'}`)
    setTimeout(() => suena([...fijas, ...buenas].sort((a, b) => a - b)), 250)
  }
  const faltan = buenas.length - marcadas.length
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <Teclado marcadas={marcadas} fijas={fijas} revelado={revelado} buenas={buenas} onToca={pulsa} l={l} nombres={r.nombres} />
        <p className="text-center text-[11px] text-white/45 mt-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-500 align-middle mr-1" />{tr({ es: 'dada', en: 'given', ca: 'donada' })}
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-sky-400 align-middle ml-3 mr-1" />{tr({ es: 'la tuya', en: 'yours', ca: 'la teva' })}
        </p>
      </div>
      {!revelado && (
        <>
          <button type="button" disabled={!marcadas.length} onClick={envia} className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
          <p className="text-center text-xs text-white/40 mt-2">
            {uno
              ? tr({ es: 'Toca la tecla; si te equivocas, toca otra', en: 'Tap the key; tap another to change it', ca: 'Toca la tecla; si t’equivoques, toca’n una altra' })
              : faltan > 0
                ? tr({ es: `Toca las teclas que faltan (quedan ${faltan}); otra vez para quitarla`, en: `Tap the missing keys (${faltan} to go); tap again to remove`, ca: `Toca les tecles que falten (en queden ${faltan}); un altre cop per treure-la` })
                : tr({ es: 'Toca una tecla marcada para quitarla', en: 'Tap a marked key to remove it', ca: 'Toca una tecla marcada per treure-la' })}
          </p>
        </>
      )}
      {revelado && (
        <button type="button" onClick={() => suena([...fijas, ...buenas].sort((a, b) => a - b))} className="w-full rounded-xl bg-white/10 hover:bg-white/15 py-2 text-white text-sm font-bold">
          🔊 {tr({ es: 'Escuchar otra vez', en: 'Listen again', ca: 'Escoltar un altre cop' })}
        </button>
      )}
    </>
  )
}

function Clasifica({ r, revelado, onResponder, l, tr }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(0)
  const coloca = c => {
    if (revelado || activo === null) return
    const n = { ...puestas, [activo]: c }
    setPuestas(n)
    const sig = r.items.findIndex((_, i) => n[i] === undefined)
    setActivo(sig >= 0 ? sig : null)
    if (sig < 0) onResponder(`clasifica:${r.items.filter((x, i) => n[i] !== x.intervalo).length}`)
  }
  const ficha = x => `${nombre(x.raiz, l)} – ${nombre(x.meta, l)}`
  const elige = i => { setActivo(i); const x = r.items[i]; suena([altura(x.raiz), altura(x.meta)]) }
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-3 min-h-[2.75rem]">
        {r.items.map((x, i) => puestas[i] === undefined && (
          <button key={i} type="button" onClick={() => elige(i)} className={`rounded-xl px-3 py-2 text-white font-black ${activo === i ? 'bg-sky-500 ring-2 ring-amber-300' : 'bg-white/10'}`}>{ficha(x)}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {r.cajas.map(c => (
          <button key={c} type="button" disabled={revelado || activo === null} onClick={() => coloca(c)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[4.2rem] text-left">
            <span className="block text-white text-[13px] font-black">{nombreIntervalo(c, l)}</span>
            <span className="flex flex-wrap gap-1 mt-1">
              {r.items.map((x, i) => puestas[i] === c && (
                <span key={i} className={`rounded-md px-1.5 py-0.5 text-[12px] font-black text-white bg-white/10 ${revelado ? (x.intervalo === c ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>{ficha(x)}</span>
              ))}
            </span>
          </button>
        ))}
      </div>
      {!revelado && <p className="text-center text-xs text-white/40 mt-3">{tr({ es: 'Toca un intervalo (suena) y luego su caja', en: 'Tap an interval (it plays) and then its box', ca: 'Toca un interval (sona) i després la seva caixa' })}</p>}
    </>
  )
}

export default function PreguntaEscalas({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, onResponder, tr, l }
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      {ronda.tipo === 'clasifica' ? <Clasifica {...props} /> : <EnTeclado {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
