import MechanicExam from '../components/MechanicExam'
import PreguntaCuantoCabe from '../components/cuantoCabe/PreguntaCuantoCabe'
import { genRound, esCorrecta, schemaQuestion } from '../lib/cuantoCabe'

// Examen con la mecánica de ¿Cuánto Cabe?: diez cuerpos, sin cuenta atrás.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Cajas de cubitos', en: 'Boxes of cubes', ca: 'Caixes de cubets' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Volúmenes', en: 'Volumes', ca: 'Volums' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Áreas y la esfera', en: 'Surface areas and the sphere', ca: 'Àrees i l’esfera' } },
]

export default function CuantoCabeExamen() {
  return (
    <MechanicExam
      gameId="cuanto-cabe-test"
      emoji="📦"
      badge={{ es: 'Examen · Matemáticas', en: 'Exam · Maths', ca: 'Examen · Matemàtiques' }}
      title={{ es: 'Áreas y volúmenes', en: 'Surface Area and Volume', ca: 'Àrees i volums' }}
      sub={{ es: 'Cuerpos geométricos con sus medidas', en: 'Solid shapes with their measurements', ca: 'Cossos geomètrics amb les mesures' }}
      metaTitle={{ es: 'Examen de áreas y volúmenes de cuerpos geométricos (con el juego ¿Cuánto Cabe?)', en: 'Surface area and volume exam (with the How Much Fits? game)', ca: 'Examen d’àrees i volums de cossos geomètrics (amb el joc Quant Hi Cap?)' }}
      metaDesc={{ es: 'Examen de cuerpos geométricos: calcula el volumen y el área de cajas, prismas, cilindros, pirámides, conos y esferas dibujados con sus medidas. 10 preguntas en tres niveles, con la fórmula y la cuenta.', en: 'Solid shapes exam: work out the volume and surface area of boxes, prisms, cylinders, pyramids, cones and spheres drawn with their measurements. 10 questions on three levels, with the formula and working.', ca: 'Examen de cossos geomètrics: calcula el volum i l’àrea de caixes, prismes, cilindres, piràmides, cons i esferes dibuixats amb les mesures. 10 preguntes en tres nivells, amb la fórmula i el càlcul.' }}
      metaPath="/examen/cuanto-cabe-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/cuanto-cabe"
      playLabel={{ es: 'Modo arcade (con reloj)', en: 'Arcade mode (timed)', ca: 'Mode arcade (amb rellotge)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaCuantoCabe key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
