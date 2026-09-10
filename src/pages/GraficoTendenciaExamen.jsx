import MechanicExam from '../components/MechanicExam'
import GraficoPregunta from '../components/GraficoPregunta'
import { rondaDeExamen } from '../lib/lecturaGraficos'

// Examen del tema "tendencia" de Lee el Gráfico. Misma generación que el juego
// (lib/lecturaGraficos), así que una pregunta significa exactamente lo mismo en
// los dos sitios; lo que cambia es el formato: aquí son 10 preguntas sin reloj
// y con nota, para repasar UNA cosa sin la prisa del arcade.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: {es: "5 puntos, eje desde cero",en: "5 points, axis from zero",ca: "5 punts, eix des de zero"} },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: {es: "6 puntos y ejes que engañan",en: "6 points and misleading axes",ca: "6 punts i eixos que enganyen"} },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: {es: "8 puntos con altibajos, sin comparar dos",en: "8 bumpy points, no two-point compare",ca: "8 punts amb alts i baixos, sense comparar dos"} },
]

function genRound(difficulty) { return rondaDeExamen('tendencia', difficulty) }
function isCorrect(round, answer) { return answer === round.correcta }

export default function GraficoTendenciaExamen() {
  return (
    <MechanicExam
      gameId="lee-grafico-tendencia"
      emoji="📈"
      badge={{ es: 'Examen · Lee el Gráfico', en: 'Exam · Read the Chart', ca: 'Examen · Llegeix el Gràfic' }}
      title={{es: "📈 Tendencias y Extremos",en: "📈 Trends and Extremes",ca: "📈 Tendències i Extrems"}}
      sub={{es: "¿Sube o baja? ¿Cuándo fue el máximo? Solo lectura de la forma",en: "Up or down? When was the peak? Reading shape only",ca: "Puja o baixa? Quan va ser el màxim? Només lectura de la forma"}}
      metaTitle={{es: "Tendencias y Extremos — Lee el Gráfico",en: "Trends and Extremes — Read the Chart",ca: "Tendències i Extrems — Llegeix el Gràfic"}}
      metaDesc={{es: "Examen de lectura de gráficos: decir si una serie crece o decrece, cuándo alcanzó su máximo y su mínimo, y cuál de dos momentos fue mayor. 10 preguntas sin tiempo, con la respuesta explicada.",en: "Chart-reading exam: say whether a series grows or shrinks, when it peaked and bottomed, and which of two moments was higher. 10 questions, no timer.",ca: "Examen de lectura de gràfics: dir si una sèrie creix o decreix, quan va assolir el màxim i el mínim, i quin de dos moments va ser major."}}
      metaPath="/examen/lee-grafico-tendencia"
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
