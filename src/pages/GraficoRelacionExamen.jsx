import MechanicExam from '../components/MechanicExam'
import GraficoPregunta from '../components/GraficoPregunta'
import { rondaDeExamen } from '../lib/lecturaGraficos'

// Examen del tema "relacion" de Lee el Gráfico. Misma generación que el juego
// (lib/lecturaGraficos), así que una pregunta significa exactamente lo mismo en
// los dos sitios; lo que cambia es el formato: aquí son 10 preguntas sin reloj
// y con nota, para repasar UNA cosa sin la prisa del arcade.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: {es: "4 años: pérdidas, saldo y tendencia",en: "4 years: losses, balance and trend",ca: "4 anys: pèrdues, saldo i tendència"} },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: {es: "5 años, + desde cuándo cambió",en: "5 years, + since when it changed",ca: "5 anys, + des de quan va canviar"} },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: {es: "6 años, + el año de más beneficio",en: "6 years, + the best year",ca: "6 anys, + l'any de més benefici"} },
]

function genRound(difficulty) { return rondaDeExamen('relacion', difficulty) }
function isCorrect(round, answer) { return answer === round.correcta }

export default function GraficoRelacionExamen() {
  return (
    <MechanicExam
      gameId="lee-grafico-relacion"
      emoji="💶"
      badge={{ es: 'Examen · Lee el Gráfico', en: 'Exam · Read the Chart', ca: 'Examen · Llegeix el Gràfic' }}
      title={{es: "💶 Dos Series: Beneficio y Saldo",en: "💶 Two Series: Profit and Balance",ca: "💶 Dues Sèries: Benefici i Saldo"}}
      sub={{es: "Ingresos y gastos, nacimientos y defunciones: lo que sale de restarlos",en: "Revenue and costs, births and deaths: what you get by subtracting",ca: "Ingressos i despeses, naixements i defuncions: el que surt de restar-los"}}
      metaTitle={{es: "Dos Series: Beneficio y Saldo — Lee el Gráfico",en: "Two Series: Profit and Balance — Read the Chart",ca: "Dues Sèries: Benefici i Saldo — Llegeix el Gràfic"}}
      metaDesc={{es: "Examen de gráficos con dos series relacionadas: ingresos y gastos, nacimientos y defunciones, exportaciones e importaciones. Hay que restar las dos barras para decir en qué año hubo pérdidas o desde cuándo se pierde población.",en: "Chart exam with two related series: revenue and costs, births and deaths, exports and imports. Subtract the two bars to say which year made a loss.",ca: "Examen de gràfics amb dues sèries relacionades: ingressos i despeses, naixements i defuncions."}}
      metaPath="/examen/lee-grafico-relacion"
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
