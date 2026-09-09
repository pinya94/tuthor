import MechanicExam from '../components/MechanicExam'
import GraficoPregunta from '../components/GraficoPregunta'
import { rondaDeExamen } from '../lib/lecturaGraficos'

// Examen del tema "tabla" de Lee el Gráfico. Misma generación que el juego
// (lib/lecturaGraficos), así que una pregunta significa exactamente lo mismo en
// los dos sitios; lo que cambia es el formato: aquí son 10 preguntas sin reloj
// y con nota, para repasar UNA cosa sin la prisa del arcade.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: {es: "3 filas, solo diferencias",en: "3 rows, differences only",ca: "3 files, només diferències"} },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: {es: "4 filas, + el desempate",en: "4 rows, + the tiebreaker",ca: "4 files, + el desempat"} },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: {es: "5 filas",en: "5 rows",ca: "5 files"} },
]

function genRound(difficulty) { return rondaDeExamen('tabla', difficulty) }
function isCorrect(round, answer) { return answer === round.correcta }

export default function GraficoTablaExamen() {
  return (
    <MechanicExam
      gameId="lee-grafico-tabla"
      emoji="🏆"
      badge={{ es: 'Examen · Lee el Gráfico', en: 'Exam · Read the Chart', ca: 'Examen · Llegeix el Gràfic' }}
      title={{es: "🏆 Clasificaciones y Desempates",en: "🏆 Tables and Tiebreakers",ca: "🏆 Classificacions i Desempats"}}
      sub={{es: "Leer una tabla y aplicar el criterio de desempate que se te da",en: "Read a table and apply the tiebreaker rule you are given",ca: "Llegir una taula i aplicar el criteri de desempat que se’t dona"}}
      metaTitle={{es: "Clasificaciones y Desempates — Lee el Gráfico",en: "Tables and Tiebreakers — Read the Chart",ca: "Classificacions i Desempats — Llegeix el Gràfic"}}
      metaDesc={{es: "Examen de lectura de tablas: una clasificación con puntos, a favor y en contra, dos equipos empatados y un criterio de desempate escrito en el enunciado. Hay que restar dos columnas para resolverlo.",en: "Table-reading exam: a league table with points, for and against, two sides level on points and a tiebreaker rule stated in the question. You subtract two columns to solve it.",ca: "Examen de lectura de taules: una classificació amb punts, a favor i en contra, i un criteri de desempat escrit a l’enunciat."}}
      metaPath="/examen/lee-grafico-tabla"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/lee-el-grafico"
      backLabel={{ es: '← Volver al juego', en: '← Back to the game', ca: '← Tornar al joc' }}
      playLabel={{ es: '🎮 Jugar a Lee el Gráfico', en: '🎮 Play Read the Chart', ca: '🎮 Jugar a Llegeix el Gràfic' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={isCorrect}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <GraficoPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
