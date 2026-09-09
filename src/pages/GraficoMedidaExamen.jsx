import MechanicExam from '../components/MechanicExam'
import GraficoPregunta from '../components/GraficoPregunta'
import { rondaDeExamen } from '../lib/lecturaGraficos'

// Examen del tema "medida" de Lee el Gráfico. Misma generación que el juego
// (lib/lecturaGraficos), así que una pregunta significa exactamente lo mismo en
// los dos sitios; lo que cambia es el formato: aquí son 10 preguntas sin reloj
// y con nota, para repasar UNA cosa sin la prisa del arcade.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: {es: "Solo la media, 5 barras",en: "Mean only, 5 bars",ca: "Només la mitjana, 5 barres"} },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: {es: "+ mediana y duelos",en: "+ median and head-to-heads",ca: "+ mediana i duels"} },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: {es: "7 barras y la media de uno",en: "7 bars and one average",ca: "7 barres i la mitjana d'un"} },
]

function genRound(difficulty) { return rondaDeExamen('medida', difficulty) }
function isCorrect(round, answer) { return answer === round.correcta }

export default function GraficoMedidaExamen() {
  return (
    <MechanicExam
      gameId="lee-grafico-medida"
      emoji="🧮"
      badge={{ es: 'Examen · Lee el Gráfico', en: 'Exam · Read the Chart', ca: 'Examen · Llegeix el Gràfic' }}
      title={{es: "🧮 Media y Mediana en Gráficos",en: "🧮 Mean and Median from Charts",ca: "🧮 Mitjana i Mediana en Gràfics"}}
      sub={{es: "Sacar la media de unas barras y comparar a dos protagonistas",en: "Get the mean from bars and compare two contenders",ca: "Treure la mitjana d'unes barres i comparar dos protagonistes"}}
      metaTitle={{es: "Media y Mediana en Gráficos — Lee el Gráfico",en: "Mean and Median from Charts — Read the Chart",ca: "Mitjana i Mediana en Gràfics — Llegeix el Gràfic"}}
      metaDesc={{es: "Examen de media y mediana leídas de un gráfico: primero hay que sacar los números de las barras y luego calcular. Incluye comparar la media de dos alumnos o dos equipos y decir quién ha sido más regular.",en: "Exam on mean and median read from a chart: first get the numbers off the bars, then calculate. Includes comparing two students or teams and saying who was more consistent.",ca: "Examen de mitjana i mediana llegides d'un gràfic: primer cal treure els números de les barres i després calcular."}}
      metaPath="/examen/lee-grafico-medida"
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
