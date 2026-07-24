// Puentes — configuración declarativa de niveles y piezas.
// Fuente única de verdad del juego de física estructural. Añadir un nivel
// nuevo = añadir un objeto a LEVELS, sin tocar la lógica del motor ni la página.
//
// Sistema de coordenadas: campo virtual en píxeles, y hacia abajo (igual que el
// canvas y que Matter.js). Los anclajes y cargas se dan en estas coordenadas.

export const FIELD = { W: 800, H: 460 }

// Rejilla de colocación (los nodos se ajustan a múltiplos de GRID).
export const GRID = 20

// Suelo visual (los nodos no pueden colocarse por debajo).
export const GROUND_Y = 430

// ── Parámetros de simulación (aproximados, no ingenieriles) ───────────────────
// Se ajustan para que estructuras bien trianguladas queden en verde y las
// endebles alcancen el punto de ruptura. No representan unidades físicas reales.
export const SIM = {
  gravity: 1,          // Matter world gravity.y
  nodeMass: 0.04,      // masa de cada nodo (self-weight de la estructura)
  loadForceK: 0.003,   // fuerza descendente por unidad de "masa" de la carga
  settleTicks: 150,    // ticks estables para dar por superada una carga fija
  sagLimit: 90,        // px que un nodo puede caer respecto a su origen antes de "colapso"
  movingSpeed: 1.6,    // px/tick de avance de la carga móvil
  supportDx: 78,       // margen horizontal en el que la carga necesita un nodo de apoyo
}

// ── Tipos de pieza ────────────────────────────────────────────────────────────
// breakStrain = deformación relativa (|ΔL|/L) a la que la pieza rompe.
// El cable solo trabaja a tensión (estiramiento); a compresión queda flojo.
export const PIECE_TYPES = {
  beam: {
    id: 'beam',
    cost: 12,
    breakStrain: 0.11,   // rompe por tensión o por compresión (pandeo)
    stiffness: 0.9,
    tensionOnly: false,
    color: '#94a3b8',    // slate-400
    label: { es: 'Viga', en: 'Beam', ca: 'Biga' },
    emoji: '🟫',
  },
  cable: {
    id: 'cable',
    cost: 6,
    breakStrain: 0.14,   // solo cuenta a tensión; resistente si trabaja tirando
    stiffness: 0.85,     // rígido axialmente (acero): a tensión apenas se estira
    tensionOnly: true,
    color: '#f59e0b',    // amber-500
    label: { es: 'Cable', en: 'Cable', ca: 'Cable' },
    emoji: '➖',
  },
}

export function pieceCost(type) {
  return PIECE_TYPES[type]?.cost ?? 0
}

// ── Niveles ───────────────────────────────────────────────────────────────────
// load.type: 'fixed' (cae y se posa en un punto) | 'moving' (recorre el vano).
export const LEVELS = [
  {
    id: 'l1',
    name: { es: 'Primer apoyo', en: 'First support', ca: 'Primer suport' },
    anchors: [{ x: 200, y: 210 }, { x: 600, y: 210 }],
    budget: 96,
    allowed: ['beam'],
    load: { type: 'fixed', x: 400, y: 190, mass: 10 },
    hint: {
      es: 'Solo tienes vigas. Coloca un nodo en el centro y sujétalo con un apoyo por debajo: un triángulo no se deforma.',
      en: 'You only have beams. Place a node in the middle and brace it from below: a triangle does not deform.',
      ca: 'Només tens bigues. Posa un node al centre i subjecta’l amb un suport per sota: un triangle no es deforma.',
    },
    principle: {
      es: 'Los triángulos son la forma más estable: reparten la carga a lo largo de sus lados en vez de doblarse.',
      en: 'Triangles are the most stable shape: they spread the load along their sides instead of bending.',
      ca: 'Els triangles són la forma més estable: reparteixen la càrrega pels seus costats en lloc de doblegar-se.',
    },
  },
  {
    id: 'l2',
    name: { es: 'Tira, no empujes', en: 'Pull, don’t push', ca: 'Estira, no empenyis' },
    anchors: [{ x: 180, y: 200 }, { x: 620, y: 200 }],
    budget: 108,
    allowed: ['beam', 'cable'],
    load: { type: 'fixed', x: 400, y: 180, mass: 12 },
    hint: {
      es: 'Ahora tienes cables. Un cable solo aguanta tirando (tensión): úsalo para colgar el centro desde arriba, y vigas para lo que empuja.',
      en: 'Now you have cables. A cable only holds by pulling (tension): use it to hang the centre from above, and beams for what pushes.',
      ca: 'Ara tens cables. Un cable només aguanta estirant (tensió): fes-lo servir per penjar el centre des de dalt, i bigues per al que empeny.',
    },
    principle: {
      es: 'Cables a tensión, vigas a compresión: cada pieza trabaja mejor con el tipo de fuerza para el que sirve.',
      en: 'Cables in tension, beams in compression: each part works best with the force it is meant for.',
      ca: 'Cables a tensió, bigues a compressió: cada peça treballa millor amb la força per a la qual serveix.',
    },
  },
  {
    id: 'l3',
    name: { es: 'Vano largo', en: 'Long span', ca: 'Vano llarg' },
    anchors: [{ x: 140, y: 210 }, { x: 660, y: 210 }],
    budget: 120,
    allowed: ['beam', 'cable'],
    // Carga repartida en dos puntos: obliga a un tablero continuo y triangulado.
    load: { type: 'fixed', y: 190, mass: 9, points: [{ x: 300 }, { x: 500 }] },
    hint: {
      es: 'El vano es más largo y el presupuesto justo. Triangula: varios triángulos pequeños gastan menos que uno enorme y aguantan más.',
      en: 'The span is longer and the budget tight. Triangulate: several small triangles cost less than one huge one and hold more.',
      ca: 'El vano és més llarg i el pressupost just. Triangula: diversos triangles petits gasten menys que un d’enorme i aguanten més.',
    },
    principle: {
      es: 'Triangular un vano largo con módulos pequeños reparte la carga y usa mucho menos material.',
      en: 'Triangulating a long span with small modules spreads the load and uses far less material.',
      ca: 'Triangular un vano llarg amb mòduls petits reparteix la càrrega i fa servir molt menys material.',
    },
  },
  {
    id: 'l4',
    name: { es: 'Cruza el coche', en: 'Drive it across', ca: 'Creua el cotxe' },
    anchors: [{ x: 160, y: 210 }, { x: 640, y: 210 }],
    budget: 132,
    allowed: ['beam', 'cable'],
    load: { type: 'moving', fromX: 180, toX: 620, y: 205, mass: 10 },
    hint: {
      es: 'La carga se mueve: un coche cruza el puente. Tu estructura debe aguantar en CADA punto del recorrido, no solo en el centro.',
      en: 'The load moves: a car crosses the bridge. Your structure must hold at EVERY point of the path, not just the centre.',
      ca: 'La càrrega es mou: un cotxe creua el pont. La teva estructura ha d’aguantar a CADA punt del recorregut, no només al centre.',
    },
    principle: {
      es: 'Una carga móvil estresa cada barra por turnos: un buen puente reparte el esfuerzo por todo el tablero.',
      en: 'A moving load stresses each member in turn: a good bridge spreads the effort across the whole deck.',
      ca: 'Una càrrega mòbil estressa cada barra per torns: un bon pont reparteix l’esforç per tot el tauler.',
    },
  },
  {
    id: 'l5',
    name: { es: 'Materiales mixtos', en: 'Mixed materials', ca: 'Materials mixtos' },
    anchors: [{ x: 150, y: 210 }, { x: 650, y: 210 }],
    budget: 120,
    allowed: ['beam', 'cable'],
    load: { type: 'moving', fromX: 170, toX: 630, y: 205, mass: 13 },
    hint: {
      es: 'Vigas caras y fuertes, cables baratos que solo tiran. Combínalos: usa cables donde algo cuelga y vigas donde algo empuja para gastar menos.',
      en: 'Beams are pricey and strong, cables are cheap but only pull. Combine them: cables where things hang, beams where things push, to spend less.',
      ca: 'Bigues cares i fortes, cables barats que només estiren. Combina’ls: cables on penja alguna cosa i bigues on empeny, per gastar menys.',
    },
    principle: {
      es: 'No hay una sola solución: mezclar cables baratos a tensión con vigas a compresión optimiza coste y resistencia.',
      en: 'There is no single solution: mixing cheap cables in tension with beams in compression optimises cost and strength.',
      ca: 'No hi ha una sola solució: barrejar cables barats a tensió amb bigues a compressió optimitza cost i resistència.',
    },
  },
]

export function levelById(id) {
  return LEVELS.find(l => l.id === id) ?? null
}
