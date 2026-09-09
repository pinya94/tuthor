import MechanicExam from '../components/MechanicExam'
import GraficoPregunta from '../components/GraficoPregunta'
import { rondaDeExamen } from '../lib/lecturaGraficos'

// Examen del tema "variacion" de Lee el Gráfico. Misma generación que el juego
// (lib/lecturaGraficos), así que una pregunta significa exactamente lo mismo en
// los dos sitios; lo que cambia es el formato: aquí son 10 preguntas sin reloj
// y con nota, para repasar UNA cosa sin la prisa del arcade.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: {es: "Solo cuánto cambió",en: "How much it changed only",ca: "Només quant va canviar"} },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: {es: "+ en qué tramo creció más",en: "+ where it grew most",ca: "+ en quin tram va créixer més"} },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: {es: "+ porcentajes de variación",en: "+ percentage change",ca: "+ percentatges de variació"} },
]

function genRound(difficulty) { return rondaDeExamen('variacion', difficulty) }
function isCorrect(round, answer) { return answer === round.correcta }

export default function GraficoVariacionExamen() {
  return (
    <MechanicExam
      gameId="lee-grafico-variacion"
      emoji="📊"
      badge={{ es: 'Examen · Lee el Gráfico', en: 'Exam · Read the Chart', ca: 'Examen · Llegeix el Gràfic' }}
      title={{es: "📊 Variaciones y Porcentajes",en: "📊 Changes and Percentages",ca: "📊 Variacions i Percentatges"}}
      sub={{es: "Cuánto cambió entre dos puntos y en qué tramo creció más",en: "How much it changed between two points and where it grew most",ca: "Quant va canviar entre dos punts i en quin tram va créixer més"}}
      metaTitle={{es: "Variaciones y Porcentajes — Lee el Gráfico",en: "Changes and Percentages — Read the Chart",ca: "Variacions i Percentatges — Llegeix el Gràfic"}}
      metaDesc={{es: "Examen de lectura de gráficos centrado en las variaciones: cuánto cambió una serie entre dos años, en qué tramo creció más y qué porcentaje varió en total. 10 preguntas sin tiempo.",en: "Chart-reading exam focused on change: how much a series moved between two years, where it grew fastest and the overall percentage change. 10 questions, no timer.",ca: "Examen de lectura de gràfics centrat en les variacions: quant va canviar una sèrie entre dos anys i en quin tram va créixer més."}}
      metaPath="/examen/lee-grafico-variacion"
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
