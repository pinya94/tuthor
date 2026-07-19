// ── Pentagrama Path: fases y melodías ────────────────────────────────────────
// Cada fase define QUÉ se entrena y CÓMO se evalúa:
//   - modo 'A': sin presión de tiempo — el cursor espera al acierto (fases 1-2).
//   - modo 'B': playhead a tempo real con ventana de tolerancia en ms (fases 3-4).
// `octavaBase` es la octava del DO grave del piano virtual (4 en clave de sol,
// 3 en clave de fa: el teclado representa DO3-DO4 y suena en esa octava).
//
// Notas: { pitch: 'C4' | 'F#3' | null (silencio), beats: duración en pulsos }.
// `cum` (pulso de ataque acumulado) se precalcula aquí — es lo que usan el
// playhead y las ventanas de tolerancia.

export const COUNT_IN_BEATS = 4

export const FASES = {
  1: {
    modo: 'A', clave: 'sol', octavaBase: 4, ventanaMs: null,
    label: { es: 'Fase 1 · Primeras notas', en: 'Phase 1 · First notes', ca: 'Fase 1 · Primeres notes' },
    desc: {
      es: 'DO-SOL en negras, sin prisa: el cursor te espera',
      en: 'C-G in quarter notes, no rush: the cursor waits for you',
      ca: 'DO-SOL en negres, sense pressa: el cursor t\'espera',
    },
    emoji: '🌱',
  },
  2: {
    modo: 'A', clave: 'sol', octavaBase: 4, ventanaMs: null,
    label: { es: 'Fase 2 · La octava completa', en: 'Phase 2 · The full octave', ca: 'Fase 2 · L\'octava completa' },
    desc: {
      es: 'DO-DO agudo con blancas y negras, sin presión de tiempo',
      en: 'C to high C with half and quarter notes, no time pressure',
      ca: 'DO-DO agut amb blanques i negres, sense pressió de temps',
    },
    emoji: '🎹',
  },
  3: {
    modo: 'B', clave: 'sol', octavaBase: 4, ventanaMs: 250,
    label: { es: 'Fase 3 · A tempo', en: 'Phase 3 · In tempo', ca: 'Fase 3 · A tempo' },
    desc: {
      es: 'El playhead no espera: toca cada nota en su momento (±250 ms)',
      en: 'The playhead won\'t wait: hit each note on time (±250 ms)',
      ca: 'El playhead no espera: toca cada nota al seu moment (±250 ms)',
    },
    emoji: '⏱️',
  },
  4: {
    modo: 'B', clave: 'fa', octavaBase: 3, ventanaMs: 150,
    label: { es: 'Fase 4 · Clave de fa', en: 'Phase 4 · Bass clef', ca: 'Fase 4 · Clau de fa' },
    desc: {
      es: 'Clave de fa, alteraciones y ventana estrecha (±150 ms)',
      en: 'Bass clef, accidentals and a tight window (±150 ms)',
      ca: 'Clau de fa, alteracions i finestra estreta (±150 ms)',
    },
    emoji: '🎼',
  },
}

const N = (pitch, beats = 1) => ({ pitch, beats })
const S = (beats = 1) => ({ pitch: null, beats }) // silencio

function conCum(notas) {
  let cum = 0
  return notas.map(n => {
    const out = { ...n, cum }
    cum += n.beats
    return out
  })
}

export const MELODIAS = [
  // ── Fase 1: DO4-SOL4, solo negras ─────────────────────────────────────────
  {
    id: 'f1-escalera', fase: 1, tempoBPM: 80,
    titulo: { es: 'La escalerita', en: 'Little ladder', ca: 'L\'escaleta' },
    notas: conCum([N('C4'), N('D4'), N('E4'), N('F4'), N('G4'), N('F4'), N('E4'), N('D4'), N('C4')]),
  },
  {
    id: 'f1-alegria', fase: 1, tempoBPM: 80,
    titulo: { es: 'Himno de la Alegría', en: 'Ode to Joy', ca: 'Himne de l\'Alegria' },
    notas: conCum([
      N('E4'), N('E4'), N('F4'), N('G4'), N('G4'), N('F4'), N('E4'), N('D4'),
      N('C4'), N('C4'), N('D4'), N('E4'), N('E4'), N('D4'), N('D4'),
    ]),
  },
  {
    id: 'f1-saltos', fase: 1, tempoBPM: 80,
    titulo: { es: 'Saltos', en: 'Leaps', ca: 'Salts' },
    notas: conCum([
      N('C4'), N('E4'), N('D4'), N('F4'), N('E4'), N('G4'),
      N('E4'), N('C4'), N('G4'), N('E4'), N('F4'), N('D4'), N('C4'),
    ]),
  },

  // ── Fase 2: DO4-DO5, negras y blancas ─────────────────────────────────────
  {
    id: 'f2-estrellita', fase: 2, tempoBPM: 84,
    titulo: { es: 'Estrellita', en: 'Twinkle Twinkle', ca: 'Estrelleta' },
    notas: conCum([
      N('C4'), N('C4'), N('G4'), N('G4'), N('A4'), N('A4'), N('G4', 2),
      N('F4'), N('F4'), N('E4'), N('E4'), N('D4'), N('D4'), N('C4', 2),
    ]),
  },
  {
    id: 'f2-campanas', fase: 2, tempoBPM: 84,
    titulo: { es: 'Campanas', en: 'Bells', ca: 'Campanes' },
    notas: conCum([
      N('E4'), N('D4'), N('C4', 2), N('E4'), N('D4'), N('C4', 2),
      N('C4'), N('C4'), N('C4'), N('C4'), N('D4'), N('D4'), N('D4'), N('D4'),
      N('E4'), N('D4'), N('C4', 2),
    ]),
  },
  {
    id: 'f2-octava', fase: 2, tempoBPM: 88,
    titulo: { es: 'La gran escalera', en: 'The grand staircase', ca: 'La gran escala' },
    notas: conCum([
      N('C4'), N('D4'), N('E4'), N('F4'), N('G4'), N('A4'), N('B4'), N('C5', 2),
      N('C5'), N('B4'), N('A4'), N('G4'), N('F4'), N('E4'), N('D4'), N('C4', 2),
    ]),
  },

  // ── Fase 3: a tempo, corcheas y silencios ─────────────────────────────────
  {
    id: 'f3-pulso', fase: 3, tempoBPM: 72,
    titulo: { es: 'Primer pulso', en: 'First pulse', ca: 'Primer pols' },
    notas: conCum([
      N('C4'), N('D4'), N('E4'), S(),
      N('E4', 0.5), N('F4', 0.5), N('G4'), S(),
      N('G4', 0.5), N('F4', 0.5), N('E4', 0.5), N('D4', 0.5), N('C4', 2),
    ]),
  },
  {
    id: 'f3-estrella-ritmica', fase: 3, tempoBPM: 76,
    titulo: { es: 'Estrellita rítmica', en: 'Rhythmic Twinkle', ca: 'Estrelleta rítmica' },
    notas: conCum([
      N('C4', 0.5), N('C4', 0.5), N('G4', 0.5), N('G4', 0.5), N('A4', 0.5), N('A4', 0.5), N('G4'),
      S(),
      N('F4', 0.5), N('F4', 0.5), N('E4', 0.5), N('E4', 0.5), N('D4', 0.5), N('D4', 0.5), N('C4'),
      S(),
    ]),
  },
  {
    id: 'f3-sincopa', fase: 3, tempoBPM: 80,
    titulo: { es: 'Contratiempos', en: 'Off-beats', ca: 'Contratemps' },
    notas: conCum([
      N('E4'), S(), N('G4'), S(),
      N('C5', 0.5), N('B4', 0.5), N('A4', 0.5), N('G4', 0.5), N('F4'), N('E4'),
      N('D4', 0.5), N('E4', 0.5), N('D4'), N('C4', 2),
    ]),
  },

  // ── Fase 4: clave de fa (DO3-DO4), alteraciones ───────────────────────────
  {
    id: 'f4-graves', fase: 4, tempoBPM: 80,
    titulo: { es: 'Territorio grave', en: 'Low territory', ca: 'Territori greu' },
    notas: conCum([
      N('C3'), N('E3'), N('G3'), N('C4', 2),
      N('B3'), N('A3'), N('G3'), N('F3'), N('E3'), N('D3'), N('C3', 2),
    ]),
  },
  {
    id: 'f4-sostenidos', fase: 4, tempoBPM: 84,
    titulo: { es: 'Sostenidos', en: 'Sharps', ca: 'Sostinguts' },
    notas: conCum([
      N('C3'), N('D3'), N('F#3'), N('G3', 2),
      N('G3'), N('G#3'), N('A3'), S(),
      N('A3'), N('F#3'), N('G3'), N('C4', 2),
    ]),
  },
  {
    id: 'f4-final', fase: 4, tempoBPM: 88,
    titulo: { es: 'Examen final', en: 'Final exam', ca: 'Examen final' },
    notas: conCum([
      N('G3', 0.5), N('A3', 0.5), N('B3'), N('C4'), S(),
      N('C#3'), N('D3'), N('F#3', 0.5), N('G3', 0.5), N('A3'),
      N('G3', 0.5), N('F3', 0.5), N('E3', 0.5), N('D3', 0.5), N('C3', 2),
    ]),
  },
]

export function melodiasDeFase(faseId) {
  return MELODIAS.filter(m => m.fase === faseId)
}

export function totalBeats(melodia) {
  const last = melodia.notas[melodia.notas.length - 1]
  return last.cum + last.beats
}
