import MechanicExam from '../components/MechanicExam'
import PreguntaClave from '../components/claveDicotomica/PreguntaClave'
import { genRound, esCorrecta, schemaQuestion } from '../lib/claveDicotomica'

// Examen con la mecánica de la Clave dicotómica: los mismos seres vivos, sin
// reloj. Los pasos de la clave viven dentro de PreguntaClave (montada con key
// por pregunta), que al final responde 'ok' o el paso fallado.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Vertebrados: los cinco grupos', en: 'Vertebrates: the five groups', ca: 'Vertebrats: els cinc grups' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Vertebrados e invertebrados', en: 'Vertebrates and invertebrates', ca: 'Vertebrats i invertebrats' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Animales y plantas', en: 'Animals and plants', ca: 'Animals i plantes' } },
]


export default function ClaveDicotomicaExamen() {
  return (
    <MechanicExam
      gameId="clave-dicotomica-test"
      emoji="🔎"
      badge={{ es: 'Examen · Seres vivos', en: 'Exam · Living things', ca: 'Examen · Éssers vius' }}
      title={{ es: 'Examen de Clave dicotómica', en: 'Dichotomous Key Exam', ca: 'Examen de Clau dicotòmica' }}
      sub={{ es: 'Clasifica seres vivos siguiendo la clave', en: 'Classify living things by following the key', ca: 'Classifica éssers vius seguint la clau' }}
      metaTitle={{ es: 'Examen de clasificación de seres vivos con clave dicotómica', en: 'Classifying living things exam with a dichotomous key', ca: 'Examen de classificació d’éssers vius amb clau dicotòmica' }}
      metaDesc={{ es: 'Examen de clasificación de los seres vivos: sigue la clave dicotómica para llegar al grupo de cada animal o planta. Vertebrados, invertebrados y plantas. 10 preguntas, tres niveles.', en: 'Exam on classifying living things: follow the dichotomous key to reach each animal’s or plant’s group. Vertebrates, invertebrates and plants. 10 questions, three levels.', ca: 'Examen de classificació dels éssers vius: segueix la clau dicotòmica per arribar al grup de cada animal o planta. Vertebrats, invertebrats i plantes. 10 preguntes, tres nivells.' }}
      metaPath="/examen/clave-dicotomica-test"
      subjectSchema="Biología"
      backGamePath="/juegos/clave-dicotomica"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaClave key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
