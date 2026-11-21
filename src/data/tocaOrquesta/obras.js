// Obras de «Toca con la Orquesta». Arreglos PROPIOS de Tuthor a partir de la
// obra original (dominio público): no se ha copiado ningún MIDI, partitura ni
// grabación. Cada voz es una lista de compases; cada compás, notas
// [midi | null (silencio), duración en negras]. Las alturas son de sonido
// real (de concierto); la parte de cada instrumento se transporta al vuelo.
//
// Himno de la alegría (Beethoven, 9.ª sinfonía, 4.º mov., 1824): el tema en
// Fa mayor, que cae cómodo a todos los instrumentos (Si♭ → Sol mayor, Mi♭ →
// Re mayor, trompa en Fa → Do mayor). Armonía de libro: Fa (I) y Do7 (V7).

const T = (es, en, ca) => ({ es, en, ca })

// Grados de Fa mayor
const F3 = 53, E3 = 52, A3 = 57, Bb3 = 58
const C4 = 60, F4 = 65, G4 = 67, A4 = 69, Bb4 = 70, C5 = 72
const F2 = 41, C3 = 48, C2 = 36, G2 = 43

const q = m => [m, 1]
const MELODIA = [
  [q(A4), q(A4), q(Bb4), q(C5)],
  [q(C5), q(Bb4), q(A4), q(G4)],
  [q(F4), q(F4), q(G4), q(A4)],
  [[A4, 1.5], [G4, 0.5], [G4, 2]],
  [q(A4), q(A4), q(Bb4), q(C5)],
  [q(C5), q(Bb4), q(A4), q(G4)],
  [q(F4), q(F4), q(G4), q(A4)],
  [[G4, 1.5], [F4, 0.5], [F4, 2]],
  [q(G4), q(G4), q(A4), q(F4)],
  [q(G4), [A4, 0.5], [Bb4, 0.5], q(A4), q(F4)],
  [q(G4), [A4, 0.5], [Bb4, 0.5], q(A4), q(G4)],
  [q(F4), q(G4), [C4, 2]],
  [q(A4), q(A4), q(Bb4), q(C5)],
  [q(C5), q(Bb4), q(A4), q(G4)],
  [q(F4), q(F4), q(G4), q(A4)],
  [[G4, 1.5], [F4, 0.5], [F4, 2]],
]
// Acorde de cada medio compás: F = Fa mayor, C = Do7
const ACORDES = ['FF', 'CC', 'FF', 'FC', 'FF', 'CC', 'FF', 'CF', 'CF', 'CF', 'CC', 'FC', 'FF', 'CC', 'FF', 'CF']
const VOZ = {
  armonia: { F: A3, C: Bb3 },        // la séptima (Si♭) resuelve en La
  acompanamiento: { F: F3, C: E3 },  // la sensible (Mi) resuelve en Fa
}
const BAJO = { F: [F2, C3], C: [C2, G2] } // fundamental y quinta, en negras

const blancas = voz => ACORDES.map(par => [...par].map(a => [VOZ[voz][a], 2]))
const bajo = () => ACORDES.map(par => [...par].flatMap(a => BAJO[a].map(m => [m, 1])))

export const OBRAS = {
  'himno-alegria': {
    titulo: T('Himno de la alegría', 'Ode to Joy', 'Himne de l’alegria'),
    autor: 'Ludwig van Beethoven',
    origen: T('9.ª sinfonía, 4.º movimiento (1824)', 'Symphony No. 9, 4th movement (1824)', '9a simfonia, 4t moviment (1824)'),
    tonalidad: -1, // armadura de concierto en quintas (Fa mayor: un bemol)
    compas: [4, 4],
    tempo: 100,    // negras por minuto en el nivel difícil
    voces: {
      melodia: { nombre: T('Melodía', 'Melody', 'Melodia'), compases: MELODIA, timbre: 'violin' },
      armonia: { nombre: T('Armonía (2.ª voz)', 'Harmony (2nd part)', 'Harmonia (2a veu)'), compases: blancas('armonia'), timbre: 'viola' },
      acompanamiento: { nombre: T('Acompañamiento (3.ª voz)', 'Accompaniment (3rd part)', 'Acompanyament (3a veu)'), compases: blancas('acompanamiento'), timbre: 'cello' },
      bajo: { nombre: T('Bajo', 'Bass', 'Baix'), compases: bajo(), timbre: 'contrabass' },
    },
  },
}
export const OBRA_POR_DEFECTO = 'himno-alegria'
