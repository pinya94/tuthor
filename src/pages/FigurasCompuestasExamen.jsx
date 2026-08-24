import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'

// ── Examen: Figuras Compuestas ───────────────────────────────────────────
// "Área de figuras compuestas" (Primaria/ESO): dada una figura rara (5 o 6
// lados), tocar 2 de los puntos marcados para trazar el corte que la parte
// en las dos figuras que se piden. Sin dibujo libre — más fiable en móvil,
// mismo aprendizaje.
//
// Las tres familias son "correctas por construcción" — no hay coordenadas
// sueltas escritas a mano que puedan formar una figura rota:
//
//  - L (rectilínea): un rectángulo W×H al que se le quita un mordisco w×h de
//    una esquina. El vértice reflejo que queda tiene SIEMPRE 2 cortes rectos
//    válidos (uno vertical, uno horizontal) → dos rectángulos. Solo esos 2
//    cortes dan rectángulos de verdad (ángulos rectos), así que están fijos
//    a mano.
//  - Cometa y Hexágono: un triángulo+trapecio o dos trapecios pegados por un
//    lado compartido. IMPORTANTE: no se acepta solo la costura original —
//    se generan con parámetros que garantizan un polígono CONVEXO (todos los
//    productos cruzados de aristas consecutivas salen positivos — ver los
//    generadores), así que CUALQUIER diagonal entre dos vértices es un corte
//    válido sin autointersección. "Correcto" se define contando vértices a
//    cada lado del corte (nº de lados de cada trozo), no comparando contra
//    una única costura — si alguien traza otra diagonal que reparte bien los
//    lados, también vale (ver diagonalesPorReparto).
//  - Chevron: rectángulo con una muesca en V — un único vértice cóncavo de
//    verdad. Aquí NO se acepta cualquier diagonal (con concavidad, algunas se
//    saldrían de la figura), así que solo van los 2 cortes verificados a
//    mano, igual de estrictos que la L.
//  - Estrella: mezcla picos convexos y muescas cóncavas (hasta 10 vértices).
//    Con tantas combinaciones ya no es viable verificar a mano qué corte vale
//    — así que aquí "correcto" lo decide geometría real: corteValido()
//    comprueba que el segmento no cruce ningún lado y que su punto medio
//    caiga dentro, para CADA par de vértices, y solo se registran como
//    correctos los que pasan esa prueba (ver generarEstrella).
//
// El nivel no es solo "números más grandes": cambia qué familias entran en
// juego. Fácil se queda en rectángulos (el caso más intuitivo); difícil mete
// las figuras con más lados, que piden imaginar mejor dónde cortar.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Solo figuras en L → dos rectángulos', en: 'Only L-shapes → two rectangles', ca: 'Només figures en L → dos rectangles' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Añade la cometa y el pliegue en V', en: 'Adds the kite and the V-fold', ca: 'Afegeix la cometa i el plec en V' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Añade el hexágono y la estrella (picos y muescas)', en: 'Adds the hexagon and the star (spikes and notches)', ca: 'Afegeix l\'hexàgon i l\'estrella (pics i osques)' } },
]

const VBOX = 340, MARGIN = 28

function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// Para un polígono CONVEXO de n vértices en orden cíclico (0..n-1), cualquier
// diagonal (par de vértices no consecutivos) es un corte válido. Esta función
// no elige "la" costura original — devuelve TODOS los pares [i,j] cuyo corte
// reparte el polígono en piezas de sizeA y (n-sizeA+2) vértices, sea cual sea
// el par que se haya tocado. Así "correcto" = contar lados de cada trozo, no
// memorizar un único corte.
function diagonalesPorReparto(n, sizeA) {
  const pares = []
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const gap = j - i
      if (gap === 1 || gap === n - 1) continue // lado ya existente, no es un corte
      const piezaA = gap + 1
      if (piezaA === sizeA || piezaA === n - sizeA + 2) pares.push([i, j])
    }
  }
  return pares
}

// ── Geometría general: ¿el segmento (i,j) es un corte interno válido? ────
// Para polígonos con vértices cóncavos Y convexos mezclados ya no vale
// contar índices — hay que comprobar la geometría de verdad: (1) el segmento
// no cruza NINGÚN lado del polígono, y (2) su punto medio cae dentro. Son
// los dos chequeos estándar de "diagonal interna de un polígono simple";
// aquí explícitos como código, no como razonamiento a mano — así no hay
// margen para el tipo de error que se coló en la familia cometa antes de
// tener diagonalesPorReparto.
function cruzan(o, a, b) { return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]) }
function enSegmento(p, q, r) {
  return Math.min(p[0], r[0]) <= q[0] && q[0] <= Math.max(p[0], r[0]) &&
    Math.min(p[1], r[1]) <= q[1] && q[1] <= Math.max(p[1], r[1])
}
function segmentosSeCruzan(p1, p2, p3, p4) {
  const d1 = cruzan(p3, p4, p1), d2 = cruzan(p3, p4, p2), d3 = cruzan(p1, p2, p3), d4 = cruzan(p1, p2, p4)
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return true
  if (d1 === 0 && enSegmento(p3, p1, p4)) return true
  if (d2 === 0 && enSegmento(p3, p2, p4)) return true
  if (d3 === 0 && enSegmento(p1, p3, p2)) return true
  if (d4 === 0 && enSegmento(p1, p4, p2)) return true
  return false
}
function puntoDentro(pt, poly) {
  let dentro = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    const cruza = (yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi
    if (cruza) dentro = !dentro
  }
  return dentro
}
function corteValido(poly, i, j) {
  const n = poly.length
  for (let k = 0; k < n; k++) {
    const k2 = (k + 1) % n
    if (k === i || k === j || k2 === i || k2 === j) continue // lado que ya toca uno de los 2 puntos
    if (segmentosSeCruzan(poly[i], poly[j], poly[k], poly[k2])) return false
  }
  const medio = [(poly[i][0] + poly[j][0]) / 2, (poly[i][1] + poly[j][1]) / 2]
  return puntoDentro(medio, poly)
}

// ── Familia 5: Estrella → mezcla vértices cóncavos y convexos ────────────
// Vértices a ángulos estrictamente crecientes alrededor de un centro →
// SIEMPRE un polígono simple ("estrellado" desde el centro: nunca se
// autointerseca, dé igual cuánto varíen radio o separación angular de cada
// vértice). Radio y hueco angular independientes por vértice (no alternos
// fijos) → cada figura sale con un perfil de picos y muescas distinto, más
// irregular que un patrón repetido. Aquí no se calculan los cortes válidos a
// mano — se recorren TODOS los pares de vértices y se filtran con
// corteValido(), así que "correcto" viene de la geometría real de esta
// figura en concreto, no de una fórmula genérica que pueda no encajar en un
// caso con más picos.
function generarEstrella() {
  for (let intento = 0; intento < 8; intento++) {
    const n = rng(6, 11)
    // Huecos angulares aleatorios que suman 360° → ángulos acumulados
    // estrictamente crecientes, sea cual sea el reparto.
    const huecos = Array.from({ length: n }, () => rng(20, 100))
    const total = huecos.reduce((a, b) => a + b, 0)
    const puntos = []
    let acumulado = -90
    for (let i = 0; i < n; i++) {
      acumulado += (huecos[i] / total) * 360
      const ang = acumulado * Math.PI / 180
      const r = rng(20, 50) / 10 // radio independiente por vértice: 2.0–5.0
      puntos.push([5 + r * Math.cos(ang), 5 + r * Math.sin(ang)])
    }
    const grupos = {}
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const gap = j - i
        if (gap === 1 || gap === n - 1) continue
        if (!corteValido(puntos, i, j)) continue
        const piezaChica = Math.min(gap + 1, n - gap + 1)
        ;(grupos[piezaChica] ||= []).push([i, j])
      }
    }
    const keys = Object.keys(grupos)
    if (keys.length === 0) continue // no debería pasar, pero por si acaso: otro intento
    const key = keys.sort((a, b) => grupos[b].length - grupos[a].length)[0]
    const correctCuts = grupos[key]
    const piezaChica = Number(key), piezaGrande = n - piezaChica + 2
    return {
      puntos, polyCount: n,
      correctCuts,
      objetivo: {
        es: `un trozo de ${piezaChica} lados y otro de ${piezaGrande}`,
        en: `a ${piezaChica}-sided piece and one of ${piezaGrande}`,
        ca: `un tros de ${piezaChica} costats i un altre de ${piezaGrande}`,
      },
      explicacion: {
        es: `Esta figura tiene ${correctCuts.length} corte${correctCuts.length === 1 ? '' : 's'} que vale${correctCuts.length === 1 ? '' : 'n'} para ese reparto — cualquiera de ellos es correcto, el resto se saldría de la figura o dejaría un reparto distinto.`,
        en: `This shape has ${correctCuts.length} cut${correctCuts.length === 1 ? '' : 's'} that work${correctCuts.length === 1 ? 's' : ''} for that split — any of them is correct; the rest would exit the shape or give a different split.`,
        ca: `Aquesta figura té ${correctCuts.length} tall${correctCuts.length === 1 ? '' : 's'} que val${correctCuts.length === 1 ? '' : 'en'} per a aquest repartiment — qualsevol és correcte; la resta es sortirien de la figura o donarien un repartiment diferent.`,
      },
    }
  }
  return generarChevron() // red de seguridad, nunca debería alcanzarse
}

// ── Familia 1: L rectilínea → dos rectángulos ────────────────────────────
const CORNERS = ['tr', 'tl', 'br', 'bl']

function generarL() {
  const W = rng(4, 9), H = rng(4, 9)
  const w = rng(1, Math.min(3, W - 1)), h = rng(1, Math.min(3, H - 1))
  const corner = pick(CORNERS)

  const base = [[0, 0], [W - w, 0], [W - w, h], [W, h], [W, H], [0, H]]
  const reflex = [W - w, h], cutV = [W - w, H], cutH = [0, h]
  const t = ([x, y]) => {
    if (corner === 'tr') return [x, y]
    if (corner === 'tl') return [W - x, y]
    if (corner === 'br') return [x, H - y]
    return [W - x, H - y] // 'bl'
  }
  const verts = base.map(t)
  const pReflex = t(reflex), pCutV = t(cutV), pCutH = t(cutH)
  const puntos = [...verts, pCutV, pCutH]
  const idxReflex = verts.findIndex(p => p[0] === pReflex[0] && p[1] === pReflex[1])
  const idxCutV = puntos.length - 2, idxCutH = puntos.length - 1

  const vA = `${W - w}×${H}`, vB = `${w}×${H - h}`, hA = `${W - w}×${h}`, hB = `${W}×${H - h}`
  return {
    puntos, polyCount: 6,
    correctCuts: [[idxReflex, idxCutV], [idxReflex, idxCutH]],
    objetivo: { es: 'dos rectángulos', en: 'two rectangles', ca: 'dos rectangles' },
    explicacion: {
      es: `Corte vertical → rectángulos de ${vA} y ${vB}. Corte horizontal → rectángulos de ${hA} y ${hB}. Los dos valen.`,
      en: `Vertical cut → rectangles of ${vA} and ${vB}. Horizontal cut → rectangles of ${hA} and ${hB}. Either works.`,
      ca: `Tall vertical → rectangles de ${vA} i ${vB}. Tall horitzontal → rectangles de ${hA} i ${hB}. Els dos valen.`,
    },
  }
}

// ── Familia 2: Cometa → un triángulo y un trapecio ───────────────────────
// Un triángulo (apunta a la izquierda) y un trapecio (a la derecha) pegados
// por el lado vertical (0,0)-(0,H). Pentágono de 5 lados.
function generarCometa() {
  const H = rng(5, 9)
  const p = rng(2, 4), q = rng(2, 4)
  const h2 = rng(1, Math.max(1, Math.floor(H / 2) - 1))
  // h2 < H/2 siempre (por el rango de arriba) → el pentágono sale convexo:
  // cualquier diagonal es un corte válido. Ver diagonalesPorReparto.
  const puntos = [[0, 0], [q, h2], [q, H - h2], [0, H], [-p, H / 2]]
  return {
    puntos, polyCount: 5,
    correctCuts: diagonalesPorReparto(5, 3), // cualquier diagonal: pentágono → triángulo + cuadrilátero
    objetivo: { es: 'un triángulo y un cuadrilátero', en: 'a triangle and a quadrilateral', ca: 'un triangle i un quadrilàter' },
    explicacion: {
      es: 'Vale cualquier corte que deje un triángulo a un lado y un cuadrilátero al otro — por ejemplo, el segmento central, donde se pegan las dos piezas.',
      en: 'Any cut that leaves a triangle on one side and a quadrilateral on the other works — for example, the middle segment, where the two pieces meet.',
      ca: 'Val qualsevol tall que deixi un triangle a un costat i un quadrilàter a l\'altre — per exemple, el segment central, on s\'ajunten les dues peces.',
    },
  }
}

// ── Familia 3: Hexágono alargado → dos trapecios ─────────────────────────
function generarHexagono() {
  const H = rng(5, 9)
  const qR = rng(2, 4), qL = rng(2, 4)
  const h2R = rng(1, Math.max(1, Math.floor(H / 2) - 1))
  const h2L = rng(1, Math.max(1, Math.floor(H / 2) - 1))
  // h2R,h2L < H/2 siempre → hexágono convexo, cualquier diagonal es válida.
  const puntos = [[0, 0], [qR, h2R], [qR, H - h2R], [0, H], [-qL, H - h2L], [-qL, h2L]]
  return {
    puntos, polyCount: 6,
    correctCuts: diagonalesPorReparto(6, 4), // solo las 3 diagonales "opuestas": hexágono → 4+4 vértices
    objetivo: { es: 'dos cuadriláteros', en: 'two quadrilaterals', ca: 'dos quadrilàters' },
    explicacion: {
      es: 'Vale cualquier corte que reparta la figura en dos cuadriláteros — por ejemplo, el segmento central, donde se pegan las dos piezas.',
      en: 'Any cut that splits the shape into two quadrilaterals works — for example, the middle segment, where the two pieces meet.',
      ca: 'Val qualsevol tall que reparteixi la figura en dos quadrilàters — per exemple, el segment central, on s\'ajunten les dues peces.',
    },
  }
}

// ── Familia 4: Chevron → un triángulo y un cuadrilátero ──────────────────
// Un rectángulo con una muesca en V en el borde superior: el vértice del
// centro se "pliega hacia dentro" (es cóncavo de verdad, no como la costura
// recta de cometa/hexágono). A diferencia de esas dos familias, aquí NO se
// acepta cualquier diagonal — con un vértice cóncavo, no todas las diagonales
// se quedan dentro de la figura (algunas se saldrían por la muesca), y
// comprobar eso en general pide geometría de visibilidad de verdad. Para no
// arriesgar un falso "correcto" en una figura que se sale de sí misma, aquí
// se registran solo los 2 cortes que se pueden verificar a mano sin dudas:
// del vértice cóncavo a cada esquina de abajo — igual de estricto que la L,
// pero con una silueta bien distinta (más "acotado" y más irregular).
function generarChevron() {
  const W = rng(6, 10), H = rng(5, 8)
  const H2 = rng(1, H - 2) // profundidad del pliegue; H2 < H siempre
  const puntos = [[0, 0], [W, 0], [W, H], [W / 2, H2], [0, H]]
  return {
    puntos, polyCount: 5,
    correctCuts: [[3, 0], [3, 1]], // del vértice cóncavo a cada esquina de abajo
    objetivo: { es: 'un triángulo y un cuadrilátero', en: 'a triangle and a quadrilateral', ca: 'un triangle i un quadrilàter' },
    explicacion: {
      es: 'Desde el pliegue solo hay 2 cortes que no se salen de la figura: hacia cada esquina de abajo. Cualquiera de los dos separa un triángulo de un cuadrilátero.',
      en: 'From the fold there are only 2 cuts that stay inside the shape: to each bottom corner. Either one separates a triangle from a quadrilateral.',
      ca: 'Des del plec només hi ha 2 talls que no es surten de la figura: cap a cada cantonada de baix. Qualsevol dels dos separa un triangle d\'un quadrilàter.',
    },
  }
}

const FAMILIAS = {
  facil: [generarL],
  medio: [generarL, generarCometa, generarChevron],
  dificil: [generarL, generarCometa, generarHexagono, generarChevron, generarEstrella],
}

function genRound(difficulty) {
  return pick(FAMILIAS[difficulty] || FAMILIAS.facil)()
}

function isCorrect(round, answer) {
  if (!answer) return false
  const [a, b] = answer
  return round.correctCuts.some(([x, y]) => (x === a && y === b) || (x === b && y === a))
}

function bounds(puntos) {
  const xs = puntos.map(p => p[0]), ys = puntos.map(p => p[1])
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) }
}

function toPx(pt, b) {
  const w = b.maxX - b.minX, h = b.maxY - b.minY
  const scale = Math.min((VBOX - 2 * MARGIN) / w, (VBOX - 2 * MARGIN) / h)
  return [MARGIN + (pt[0] - b.minX) * scale, MARGIN + (pt[1] - b.minY) * scale]
}

function Question({ round, phase, onAnswer, l }) {
  const [selected, setSelected] = useState([])
  const resuelto = phase === 'result'
  const { puntos, polyCount } = round
  const b = bounds(puntos)
  const px = puntos.map(p => toPx(p, b))
  const polyPoints = px.slice(0, polyCount).map(p => p.join(',')).join(' ')

  function tap(idx) {
    if (resuelto) return
    if (selected.includes(idx)) { setSelected(selected.filter(i => i !== idx)); return }
    const next = [...selected, idx]
    setSelected(next)
    if (next.length === 2) onAnswer(next)
  }

  const acierto = resuelto && isCorrect(round, selected)
  const correctaMostrar = resuelto && !acierto ? round.correctCuts[0] : null

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-pink-400 text-xs font-black uppercase tracking-widest text-center mb-3">
        {{ es: `Corta la figura: ${round.objetivo.es}`, en: `Cut the shape: ${round.objetivo.en}`, ca: `Talla la figura: ${round.objetivo.ca}` }[l]}
      </p>
      <svg viewBox={`0 0 ${VBOX} ${VBOX}`} className="w-full max-w-[280px] mx-auto">
        <polygon points={polyPoints} fill="#2d2a45" stroke="#0d0d1a" strokeWidth="3" />
        {selected.length === 2 && (
          <line x1={px[selected[0]][0]} y1={px[selected[0]][1]} x2={px[selected[1]][0]} y2={px[selected[1]][1]}
            stroke={resuelto ? (acierto ? '#4ade80' : '#f87171') : '#ec4899'} strokeWidth="4" strokeDasharray={resuelto ? '0' : '6 4'} />
        )}
        {correctaMostrar && (
          <line x1={px[correctaMostrar[0]][0]} y1={px[correctaMostrar[0]][1]} x2={px[correctaMostrar[1]][0]} y2={px[correctaMostrar[1]][1]}
            stroke="#4ade80" strokeWidth="3" strokeDasharray="6 4" />
        )}
        {px.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={selected.includes(i) ? 9 : 7}
            fill={selected.includes(i) ? '#ec4899' : '#f5f5f5'} stroke="#0d0d1a" strokeWidth="2"
            onClick={() => tap(i)} className={resuelto ? '' : 'cursor-pointer'} />
        ))}
      </svg>
      <p className="text-white/40 text-xs text-center mt-3">
        {{ es: 'Toca 2 puntos para trazar el corte', en: 'Tap 2 points to draw the cut', ca: 'Toca 2 punts per traçar el tall' }[l]}
      </p>
      {resuelto && <p className="text-white/50 text-sm text-center mt-3">{round.explicacion[l]}</p>}
    </div>
  )
}

export default function FigurasCompuestasExamen() {
  return (
    <MechanicExam
      gameId="figuras-compuestas"
      emoji="📐"
      badge={{ es: 'Examen · Geometría', en: 'Exam · Geometry', ca: 'Examen · Geometria' }}
      title={{ es: '📐 Examen Figuras Compuestas', en: '📐 Composite Shapes Exam', ca: '📐 Examen Figures Compostes' }}
      sub={{ es: 'Toca el corte que parte la figura en las piezas pedidas', en: 'Tap the cut that splits the shape into the pieces asked for', ca: 'Toca el tall que parteix la figura en les peces demanades' }}
      metaTitle={{ es: 'Examen de Figuras Compuestas — Área por Descomposición', en: 'Composite Shapes Exam — Area by Decomposition', ca: 'Examen de Figures Compostes — Àrea per Descomposició' }}
      metaDesc={{ es: 'Examen de geometría: divide figuras irregulares en triángulos, trapecios y rectángulos tocando el corte correcto. 10 preguntas, sin tiempo.', en: 'Geometry exam: split irregular shapes into triangles, trapezoids and rectangles by tapping the correct cut. 10 questions, no timer.', ca: 'Examen de geometria: divideix figures irregulars en triangles, trapezis i rectangles tocant el tall correcte. 10 preguntes, sense temps.' }}
      metaPath="/examen/figuras-compuestas"
      subjectSchema="Matemáticas"
      backGamePath="/estudiar/matematicas/geometria"
      backLabel={{ es: '← Volver a Geometría', en: '← Back to Geometry', ca: '← Tornar a Geometria' }}
      playLabel={{ es: '← Volver a Geometría', en: '← Back to Geometry', ca: '← Tornar a Geometria' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={isCorrect}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
