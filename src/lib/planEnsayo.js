// Plan de ensayo guiado del recurso «Ensayo con la orquesta» (22-nov-2026,
// a petición del usuario: que el profesor elija qué toca la clase y lo ensaye
// «por partes, luego conjuntos y finalmente todos, más o menos organizado»).
// Mismo orden que las fases de su app de estudio (cobla-estudio): escuchar,
// cada voz sola y despacio, juntar voces, todos, y al final a tempo.
//
// Cada paso: { id, fase, titulo, tocan (voces que toca la clase), suenan
// (voces que pone el altavoz), tempo (%), desde, hasta, bucle, metronomo, consejo }
import { OBRAS } from '../data/tocaOrquesta/obras'
import { numCompases } from './tocaOrquesta'

const T = (es, en, ca) => ({ es, en, ca })
const tx = (o, l) => o[l] ?? o.es

export function planEnsayo(obraId, vocesClase) {
  const o = OBRAS[obraId]
  const n = numCompases(obraId)
  const todas = Object.keys(o.voces)
  const clase = todas.filter(v => vocesClase.includes(v)) // en el orden de la partitura
  const g = (v, l) => tx(o.voces[v].grupo, l)
  const pasos = []
  const paso = p => pasos.push({ id: `${pasos.length + 1}`, desde: 1, hasta: n, bucle: false, metronomo: true, ...p })

  paso({
    fase: 'escuchar', titulo: T('Escuchar la obra entera', 'Listen to the whole piece', 'Escoltar l’obra sencera'),
    tocan: [], suenan: todas, tempo: 100, metronomo: false,
    consejo: T('Seguid la partitura con el dedo. ¿Dónde se repite la melodía? ¿Qué voz lleva el ritmo?', 'Follow the score with your finger. Where does the melody repeat? Which part keeps the rhythm?', 'Seguiu la partitura amb el dit. On es repeteix la melodia? Quina veu porta el ritme?'),
  })
  for (const v of clase) {
    for (const s of o.secciones) {
      paso({
        fase: 'voz', titulo: { es: `${g(v, 'es')} · ${tx(s.nombre, 'es')}`, en: `${g(v, 'en')} · ${tx(s.nombre, 'en')}`, ca: `${g(v, 'ca')} · ${tx(s.nombre, 'ca')}` },
        tocan: [v], suenan: [v], tempo: 60, desde: s.desde, hasta: s.hasta, bucle: true,
        consejo: T('Despacio y en bucle, con su voz de guía. Cuando salga limpio, al paso siguiente.', 'Slowly and in a loop, with their part as a guide. When it’s clean, move on.', 'A poc a poc i en bucle, amb la seva veu de guia. Quan surti net, al pas següent.'),
      })
    }
    paso({
      fase: 'voz', titulo: { es: `${g(v, 'es')} · obra entera`, en: `${g(v, 'en')} · whole piece`, ca: `${g(v, 'ca')} · obra sencera` },
      tocan: [v], suenan: [v], tempo: 80,
      consejo: T('De principio a fin, un poco más rápido. El resto de la clase escucha y sigue la partitura.', 'From start to finish, a little faster. The rest of the class listens and follows the score.', 'De principi a fi, una mica més ràpid. La resta de la classe escolta i segueix la partitura.'),
    })
  }
  for (const c of o.conjuntos) {
    const juntas = c.voces.filter(v => clase.includes(v))
    if (juntas.length < 2) continue
    paso({
      fase: 'conjunto', titulo: c.nombre,
      tocan: juntas, suenan: juntas, tempo: 80,
      consejo: T('Escuchaos entre vosotros: si no oís al otro grupo, vais demasiado fuerte.', 'Listen to each other: if you can’t hear the other group, you’re too loud.', 'Escolteu-vos entre vosaltres: si no sentiu l’altre grup, aneu massa fort.'),
    })
  }
  if (clase.length > 1) {
    paso({
      fase: 'todos', titulo: T('Todos juntos, con guía', 'Everyone together, with a guide', 'Tots junts, amb guia'),
      tocan: clase, suenan: todas, tempo: 80,
      consejo: T('Toda la clase a la vez. El altavoz toca todas las voces para que nadie se pierda.', 'The whole class at once. The speaker plays every part so nobody gets lost.', 'Tota la classe alhora. L’altaveu toca totes les veus perquè ningú no es perdi.'),
    })
  }
  const resto = todas.filter(v => !clase.includes(v))
  paso({
    fase: 'todos', titulo: T('Concierto: a tempo', 'Concert: full tempo', 'Concert: a tempo'),
    tocan: clase, suenan: resto, tempo: 100, metronomo: resto.length === 0,
    consejo: resto.length
      ? T('Ahora el altavoz solo pone lo que la clase no toca. ¡Sois la orquesta!', 'Now the speaker only plays what the class doesn’t. You are the orchestra!', 'Ara l’altaveu només posa el que la classe no toca. Sou l’orquestra!')
      : T('Sin guía: solo el metrónomo. ¡Sois la orquesta!', 'No guide: just the metronome. You are the orchestra!', 'Sense guia: només el metrònom. Sou l’orquestra!'),
  })
  return pasos
}
