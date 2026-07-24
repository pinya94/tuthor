// Puentes — configuración de niveles (modelo determinista, sin motor físico).
//
// Idea: el esqueleto del puente YA está dibujado. El jugador solo decide, para
// cada TRAMO marcado, qué pieza pone: viga o cable. Cada tramo tiene una fuerza
// definida por el nivel (tensión = tira / compresión = empuja). La regla es
// simple y siempre coherente:
//    · Viga  → aguanta tensión Y compresión (cara).
//    · Cable → solo aguanta tensión (barato). En compresión, falla.
// Así se enseña tensión vs compresión sin física impredecible.
//
// Coordenadas en un lienzo SVG virtual de 800×460 (y hacia abajo).

export const FIELD = { W: 800, H: 460 }

export const PIECES = {
  beam:  { id: 'beam',  cost: 12, label: { es: 'Viga',  en: 'Beam',  ca: 'Biga'  }, color: '#94a3b8', emoji: '🟫' },
  cable: { id: 'cable', cost: 6,  label: { es: 'Cable', en: 'Cable', ca: 'Cable' }, color: '#f59e0b', emoji: '➖' },
}

export function pieceCost(type) {
  return PIECES[type]?.cost ?? 0
}

// ¿La pieza elegida encaja con la fuerza del tramo?
export function pieceHolds(type, force) {
  if (!type) return false
  if (type === 'beam') return true            // la viga vale para todo
  return force === 'tension'                  // el cable solo a tensión
}

// ── Niveles ───────────────────────────────────────────────────────────────────
// nodes: posiciones con nombre. supports: nodos anclados al terreno/muro.
// fixed: tramos ya construidos (tablero), no editables. members: tramos que el
// jugador rellena, con su fuerza. loadAt: nodo donde se posa la carga.
export const LEVELS = [
  {
    id: 'l1',
    name: { es: 'El puente colgante', en: 'The suspension bridge', ca: 'El pont penjant' },
    nodes: { LA: { x: 150, y: 160 }, RA: { x: 650, y: 160 }, M: { x: 400, y: 300 } },
    supports: ['LA', 'RA'],
    fixed: [],
    members: [
      { id: 'm1', a: 'LA', b: 'M', force: 'tension' },
      { id: 'm2', a: 'M', b: 'RA', force: 'tension' },
    ],
    loadAt: 'M',
    budget: 14,
    showForces: true,
    hint: {
      es: 'La carga cuelga en el centro: los dos tramos la sujetan TIRANDO (tensión). Un cable tira de maravilla y es más barato — llénalos con cables.',
      en: 'The load hangs in the middle: both members hold it by PULLING (tension). A cable pulls perfectly and is cheaper — fill them with cables.',
      ca: 'La càrrega penja al centre: els dos trams la subjecten ESTIRANT (tensió). Un cable estira de meravella i és més barat — omple’ls amb cables.',
    },
    principle: {
      es: 'Cuando algo cuelga, sus soportes trabajan a tensión (tirando). Ahí el cable es la pieza ideal: barata y perfecta para tirar.',
      en: 'When something hangs, its supports work in tension (pulling). There the cable is ideal: cheap and perfect for pulling.',
      ca: 'Quan alguna cosa penja, els seus suports treballen a tensió (estirant). Allà el cable és la peça ideal: barata i perfecta per estirar.',
    },
  },
  {
    id: 'l2',
    name: { es: 'El arco', en: 'The arch', ca: "L'arc" },
    nodes: { LA: { x: 150, y: 330 }, RA: { x: 650, y: 330 }, M: { x: 400, y: 180 } },
    supports: ['LA', 'RA'],
    fixed: [],
    members: [
      { id: 'm1', a: 'LA', b: 'M', force: 'compression' },
      { id: 'm2', a: 'M', b: 'RA', force: 'compression' },
    ],
    loadAt: 'M',
    budget: 26,
    showForces: true,
    hint: {
      es: 'Ahora la carga se apoya arriba y EMPUJA los dos tramos hacia abajo (compresión). Un cable no puede empujar: aquí necesitas vigas.',
      en: 'Now the load rests on top and PUSHES both members down (compression). A cable cannot push: here you need beams.',
      ca: 'Ara la càrrega es recolza a dalt i EMPENY els dos trams cap avall (compressió). Un cable no pot empènyer: aquí necessites bigues.',
    },
    principle: {
      es: 'Cuando algo se apoya encima, sus soportes trabajan a compresión (empujando). El cable se afloja: solo la viga aguanta el empuje.',
      en: 'When something rests on top, its supports work in compression (pushing). A cable goes slack: only the beam takes the push.',
      ca: 'Quan alguna cosa es recolza a sobre, els suports treballen a compressió (empenyent). El cable s’afluixa: només la biga aguanta l’empenta.',
    },
  },
  {
    id: 'l3',
    name: { es: 'Mástil y tirantes', en: 'Mast and stays', ca: 'Pal i tirants' },
    nodes: { B: { x: 400, y: 330 }, T: { x: 400, y: 150 }, L: { x: 160, y: 330 }, R: { x: 640, y: 330 } },
    supports: ['B', 'L', 'R'],
    fixed: [],
    members: [
      { id: 'm1', a: 'B', b: 'T', force: 'compression' },
      { id: 'm2', a: 'T', b: 'L', force: 'tension' },
      { id: 'm3', a: 'T', b: 'R', force: 'tension' },
    ],
    loadAt: 'T',
    budget: 26,
    showForces: true,
    hint: {
      es: 'El mástil central sostiene la carga empujando hacia arriba (compresión → viga). Los dos tirantes laterales evitan que se caiga tirando (tensión → cable). Mezcla para gastar menos.',
      en: 'The central mast holds the load by pushing up (compression → beam). The two side stays keep it from falling by pulling (tension → cable). Mix them to spend less.',
      ca: 'El pal central sosté la càrrega empenyent cap amunt (compressió → biga). Els dos tirants laterals eviten que caigui estirant (tensió → cable). Barreja per gastar menys.',
    },
    principle: {
      es: 'Un buen diseño combina las dos: vigas donde algo empuja y cables (más baratos) donde algo tira.',
      en: 'A good design combines both: beams where something pushes and cables (cheaper) where something pulls.',
      ca: 'Un bon disseny combina totes dues: bigues on alguna cosa empeny i cables (més barats) on alguna cosa estira.',
    },
  },
  {
    id: 'l4',
    name: { es: 'Puente atirantado', en: 'Cable-stayed bridge', ca: 'Pont atirantat' },
    nodes: {
      LA: { x: 150, y: 300 }, RA: { x: 650, y: 300 },
      LD: { x: 275, y: 300 }, MD: { x: 400, y: 300 }, RD: { x: 525, y: 300 },
      TT: { x: 400, y: 120 },
    },
    supports: ['LA', 'RA'],
    fixed: [
      ['LA', 'LD'], ['LD', 'MD'], ['MD', 'RD'], ['RD', 'RA'], // tablero (dado)
    ],
    members: [
      { id: 'm1', a: 'MD', b: 'TT', force: 'compression' }, // torre
      { id: 'm2', a: 'TT', b: 'LD', force: 'tension' },      // tirantes
      { id: 'm3', a: 'TT', b: 'RD', force: 'tension' },
      { id: 'm4', a: 'TT', b: 'LA', force: 'tension' },      // atirantados de anclaje
      { id: 'm5', a: 'TT', b: 'RA', force: 'tension' },
    ],
    loadAt: 'MD',
    budget: 40,
    showForces: true,
    hint: {
      es: 'La torre central sostiene todo empujando hacia arriba (compresión → viga). Los tirantes que bajan al tablero lo cuelgan tirando (tensión → cable). Presupuesto justo: cables en todos los tirantes.',
      en: 'The central tower holds everything by pushing up (compression → beam). The stays down to the deck hang it by pulling (tension → cable). Tight budget: cables on every stay.',
      ca: 'La torre central ho sosté empenyent cap amunt (compressió → biga). Els tirants que baixen al tauler el pengen estirant (tensió → cable). Pressupost just: cables a tots els tirants.',
    },
    principle: {
      es: 'En un puente atirantado la torre va a compresión y todos los tirantes a tensión: por eso los tirantes reales son cables de acero.',
      en: 'In a cable-stayed bridge the tower is in compression and all stays in tension: that’s why real stays are steel cables.',
      ca: 'En un pont atirantat la torre va a compressió i tots els tirants a tensió: per això els tirants reals són cables d’acer.',
    },
  },
  {
    id: 'l5',
    name: { es: 'Arco atado (sin pistas)', en: 'Tied arch (no hints)', ca: 'Arc lligat (sense pistes)' },
    nodes: { LA: { x: 150, y: 330 }, RA: { x: 650, y: 330 }, TOP: { x: 400, y: 165 } },
    supports: ['LA', 'RA'],
    fixed: [],
    members: [
      { id: 'm1', a: 'LA', b: 'TOP', force: 'compression' },
      { id: 'm2', a: 'TOP', b: 'RA', force: 'compression' },
      { id: 'm3', a: 'LA', b: 'RA', force: 'tension' },
    ],
    loadAt: 'TOP',
    budget: 30,
    showForces: false,
    hint: {
      es: 'Sin pistas: tú decides. El arco de arriba, ¿empuja o tira? ¿Y el tirante de abajo que une los dos apoyos? Piensa qué pieza va en cada uno.',
      en: 'No hints: you decide. The arch on top — does it push or pull? And the bottom tie joining the two supports? Think which piece goes where.',
      ca: 'Sense pistes: tu decideixes. L’arc de dalt, empeny o estira? I el tirant de baix que uneix els dos suports? Pensa quina peça va a cada lloc.',
    },
    principle: {
      es: 'Arco atado: el arco empuja (compresión, vigas) y el tirante inferior tira para que los pies no se abran (tensión, cable). ¡Lo dedujiste!',
      en: 'Tied arch: the arch pushes (compression, beams) and the bottom tie pulls so the feet don’t spread (tension, cable). You worked it out!',
      ca: 'Arc lligat: l’arc empeny (compressió, bigues) i el tirant inferior estira perquè els peus no s’obrin (tensió, cable). Ho has deduït!',
    },
  },
]
