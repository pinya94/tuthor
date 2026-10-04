import MechanicExam from '../components/MechanicExam'
import CuerpoSVG, { ALTO } from '../components/rayosX/CuerpoSVG'
import { genRound, isCorrect, enunciado } from '../lib/rayosX'

// Examen con la mecánica del juego Rayos X: el cuerpo dibujado, con la capa
// de órganos o la del esqueleto según lo que se pregunte, y se toca la parte.
// 10 preguntas, sin tiempo. Mismos niveles que el juego (lib/rayosX.js).
const LEVELS = [
  { key: 'primaria', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Los órganos, huesos y músculos más conocidos, por su nombre', en: 'The best-known organs, bones and muscles, by name', ca: 'Els òrgans, ossos i músculs més coneguts, pel nom' } },
  { key: 'eso', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Todos los órganos, huesos y músculos, por su nombre', en: 'Every organ, bone and muscle, by name', ca: 'Tots els òrgans, ossos i músculs, pel nom' } },
  { key: 'bachillerato', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Por lo que hacen: te dan la función, no el nombre', en: 'By what they do: you get the function, not the name', ca: 'Pel que fan: et donen la funció, no el nom' } },
]

const T = {
  busca: { es: 'Toca', en: 'Tap', ca: 'Toca' },
  elQue: { es: 'Toca el que…', en: 'Tap the one that…', ca: 'Toca el que…' },
  era: { es: 'Era', en: 'It was', ca: 'Era' },
}
const t = (k, l) => T[k][l] ?? T[k].es

// Sin estado propio: el toque ES la respuesta (onAnswer con el id).
function renderQuestion({ round, phase, onAnswer, answer, l }) {
  const revelado = phase === 'result'
  const ok = revelado && answer === round.parte.id
  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-1">
        {round.preguntaPor === 'funcion' ? t('elQue', l) : t('busca', l)}
      </p>
      <p className="text-center text-lg font-black text-white mb-3 leading-snug px-2">{enunciado(round, l)}</p>
      {round.capa === 'espalda' && (
        <p className="text-center text-xs font-bold text-white/50 -mt-2 mb-2">{{ es: 'Vista de espalda', en: 'Back view', ca: 'Vista d’esquena' }[l] ?? 'Vista de espalda'}</p>
      )}
      <div className="mx-auto rounded-2xl overflow-hidden border border-white/[0.08]"
        style={{ maxWidth: `min(${round.capa === 'organos' ? 360 : 300}px, calc((100dvh - 20rem) * ${200 / ALTO[round.capa]}))` }}>
        <CuerpoSVG capa={round.capa} onPick={revelado ? null : onAnswer}
          elegido={answer} correcto={revelado ? round.parte.id : null} revelado={revelado} />
      </div>
      {revelado && (
        <div className={`mt-3 rounded-xl px-3 py-2 text-center ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? '✓' : '✗'} {t('era', l)}: {round.parte.nombre[l] ?? round.parte.nombre.es}
          </p>
          <p className="text-white/60 text-xs mt-0.5">{round.parte.dato[l] ?? round.parte.dato.es}</p>
        </div>
      )}
    </>
  )
}

export default function RayosXExamen() {
  return (
    <MechanicExam
      gameId="rayos-x-test"
      emoji="🧠"
      badge={{ es: 'Examen · Cuerpo Humano', en: 'Exam · Human Body', ca: 'Examen · Cos Humà' }}
      title={{ es: 'Examen Rayos X', en: 'X-Ray Exam', ca: 'Examen Raigs X' }}
      sub={{ es: 'Toca cada órgano o hueso en el cuerpo dibujado', en: 'Tap each organ or bone on the drawn body', ca: 'Toca cada òrgan o os al cos dibuixat' }}
      metaTitle={{ es: 'Examen de Rayos X — Órganos, huesos y músculos', en: 'X-Ray Exam — Organs, bones and muscles', ca: 'Examen de Raigs X — Òrgans, ossos i músculs' }}
      metaDesc={{ es: 'Examen del cuerpo humano con la mecánica del juego Rayos X: toca cada órgano o hueso en el cuerpo dibujado. Tres niveles, 10 preguntas, sin tiempo.', en: 'Human body exam using the X-Ray game mechanic: tap each organ or bone on the drawn body. Three levels, 10 questions, no timer.', ca: 'Examen del cos humà amb la mecànica del joc Raigs X: toca cada òrgan o os al cos dibuixat. Tres nivells, 10 preguntes, sense temps.' }}
      metaPath="/examen/rayos-x-test"
      subjectSchema="Biología"
      backGamePath="/juegos/rayos-x"
      playLabel={{ es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={isCorrect}
      renderQuestion={renderQuestion}
    />
  )
}
