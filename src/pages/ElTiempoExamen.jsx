import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaTiempo from '../components/elTiempo/PreguntaTiempo'
import { genRonda, esCorrecta, schemaQuestion } from '../lib/elTiempo'

// Examen con la mecánica de El Tiempo: las mismas previsiones, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Temperatura y lluvia: qué ropa y si hace falta paraguas', en: 'Temperature and rain: what to wear and whether you need an umbrella', ca: 'Temperatura i pluja: quina roba i si cal paraigua' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Viento, previsión por horas y radar de lluvia', en: 'Wind, hourly forecast and rain radar', ca: 'Vent, previsió per hores i radar de pluja' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Además índice UV y radar a dos horas vista', en: 'Plus UV index and radar two hours ahead', ca: 'A més índex UV i radar a dues hores vista' } },
]

// Formatos alternos dentro del examen, para que no salgan diez radares.
let ultimo = null
function genRoundAlterno(difficulty) {
  const r = genRonda(difficulty)
  if (r.tipo === ultimo && difficulty !== 'facil') return genRoundAlterno(difficulty)
  ultimo = r.tipo
  return r
}

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaTiempo ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function ElTiempoExamen() {
  return (
    <MechanicExam
      gameId="el-tiempo-test"
      emoji="🌦️"
      badge={{ es: 'Examen · El tiempo atmosférico', en: 'Exam · The weather', ca: 'Examen · El temps atmosfèric' }}
      title={{ es: 'Examen de El Tiempo', en: 'The Weather Exam', ca: 'Examen de El Temps' }}
      sub={{ es: 'Lee cada previsión y decide qué llevar', en: 'Read each forecast and decide what to take', ca: 'Llegeix cada previsió i decideix què t’emportes' }}
      metaTitle={{ es: 'Examen: leer la previsión del tiempo', en: 'Exam: reading the weather forecast', ca: 'Examen: llegir la previsió del temps' }}
      metaDesc={{ es: 'Examen de leer la previsión meteorológica: temperatura, probabilidad de lluvia, viento, UV, gráfica por horas y radar. 10 preguntas, tres niveles, sin reloj.', en: 'Weather forecast reading exam: temperature, chance of rain, wind, UV, hourly chart and radar. 10 questions, three levels, no timer.', ca: 'Examen de llegir la previsió meteorològica: temperatura, probabilitat de pluja, vent, UV, gràfica per hores i radar. 10 preguntes, tres nivells, sense rellotge.' }}
      metaPath="/examen/el-tiempo-test"
      subjectSchema="Ciencias"
      backGamePath="/juegos/el-tiempo"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRoundAlterno}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
