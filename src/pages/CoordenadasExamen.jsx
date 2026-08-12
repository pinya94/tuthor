import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MechanicExam from '../components/MechanicExam'
import MapaCoordenadas, { FlagImg, fmtCoord } from '../components/MapaCoordenadas'
import { genRound, isCorrectGuess, distanciaKm } from '../lib/coordenadas'

// Examen con la mecánica del juego Coordenadas: mueves latitud y longitud
// hasta marcar el país en el mapa. 10 preguntas, sin tiempo. A diferencia
// del juego (puntos por precisión), aquí es acierto/fallo simple contra una
// tolerancia en km que se endurece por nivel — más nivel, más precisión.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Margen amplio: ±800 km', en: 'Wide margin: ±800 km', ca: 'Marge ampli: ±800 km' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Margen medio: ±500 km', en: 'Medium margin: ±500 km', ca: 'Marge mitjà: ±500 km' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Margen estrecho: ±250 km', en: 'Narrow margin: ±250 km', ca: 'Marge estret: ±250 km' } },
]

const T = {
  latitud: { es: 'Latitud', en: 'Latitude', ca: 'Latitud' },
  longitud: { es: 'Longitud', en: 'Longitude', ca: 'Longitud' },
  confirmar: { es: 'Confirmar posición', en: 'Confirm position', ca: 'Confirma la posició' },
  correcto: { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
  distancia: { es: 'Distancia', en: 'Distance', ca: 'Distància' },
  capital: { es: 'Capital', en: 'Capital', ca: 'Capital' },
}

function Question({ round, phase, onAnswer, l }) {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const reveal = phase === 'result'
  const km = reveal ? Math.round(distanciaKm(lat, lon, round.pais.lat, round.pais.lon)) : null
  const ok = reveal && isCorrectGuess(round, { lat, lon })
  const { pais } = round

  return (
    <>
      <p className="text-center text-lg font-black text-white mb-3">
        <FlagImg bandera={pais.bandera} size={22} /> {l === 'en' && pais.nombreEn ? pais.nombreEn : pais.nombre}
      </p>

      <MapaCoordenadas guessLat={lat} guessLon={lon}
        real={reveal ? { ...pais, resultado: ok ? 'perfecto' : 'fallo' } : null} revelado={reveal} />

      <div className="mt-3">
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>{T.latitud[l] ?? T.latitud.es}</span>
          <span className="font-mono text-white">{fmtCoord(lat, 'N', 'S')}</span>
        </div>
        <input type="range" min={-90} max={90} value={lat} disabled={reveal}
          onChange={e => setLat(Number(e.target.value))} className="w-full accent-[#EDAE49]" />
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>{T.longitud[l] ?? T.longitud.es}</span>
          <span className="font-mono text-white">{fmtCoord(lon, 'E', l === 'es' || l === 'ca' ? 'O' : 'W')}</span>
        </div>
        <input type="range" min={-180} max={180} value={lon} disabled={reveal}
          onChange={e => setLon(Number(e.target.value))} className="w-full accent-[#EDAE49]" />
      </div>

      {reveal ? (
        <div className={`mt-3 rounded-xl px-3 py-2 text-center ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? T.correcto[l] ?? T.correcto.es : T.incorrecto[l] ?? T.incorrecto.es} · {T.distancia[l] ?? T.distancia.es}: {km.toLocaleString()} km
          </p>
          <p className="text-white/60 text-xs mt-0.5">{T.capital[l] ?? T.capital.es}: {pais.capital}{pais.famoso ? ` · ${pais.famoso}` : ''}</p>
        </div>
      ) : (
        <button onClick={() => onAnswer({ lat, lon })}
          className="mt-3 w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
          {T.confirmar[l] ?? T.confirmar.es}
        </button>
      )}
    </>
  )
}

export default function CoordenadasExamen() {
  // Cuando se llega desde una región de /estudiar/geografia (europa, asia…)
  // location.state trae `region` + `titulo` + `backPath` — mismo contrato
  // que geografia-examen/geomapa-examen (ver GeografiaTema.jsx). Sin state
  // (llegando desde el juego o directamente), examina el pool completo.
  const location = useLocation()
  const { region, titulo, backPath } = location.state || {}
  const subT = titulo
    ? { es: `Mueve la latitud y la longitud hasta marcar cada país de ${titulo}`, en: `Move latitude and longitude to mark each country in ${titulo}`, ca: `Mou la latitud i la longitud fins a marcar cada país de ${titulo}` }
    : { es: 'Mueve la latitud y la longitud hasta marcar cada país', en: 'Move latitude and longitude to mark each country', ca: 'Mou la latitud i la longitud fins a marcar cada país' }
  const backLbl = titulo
    ? { es: `← Volver a ${titulo}`, en: `← Back to ${titulo}`, ca: `← Torna a ${titulo}` }
    : undefined

  return (
    <MechanicExam
      gameId="coordenadas-test"
      emoji="🌐"
      badge={{ es: 'Examen · Geografía', en: 'Exam · Geography', ca: 'Examen · Geografia' }}
      title={{ es: '🌐 Examen Coordenadas', en: '🌐 Coordinates Exam', ca: '🌐 Examen Coordenades' }}
      sub={subT}
      metaTitle={{ es: 'Examen de Coordenadas — Latitud y Longitud', en: 'Coordinates Exam — Latitude and Longitude', ca: 'Examen de Coordenades — Latitud i Longitud' }}
      metaDesc={{ es: 'Examen para practicar latitud y longitud con la mecánica del juego: sitúa cada país en el mapa moviendo dos sliders. 10 preguntas, sin tiempo, con la distancia real en km.', en: 'Exam to practise latitude and longitude with the game mechanic: place each country on the map by moving two sliders. 10 questions, no timer, with the real distance in km.', ca: 'Examen per practicar latitud i longitud amb la mecànica del joc: situa cada país al mapa movent dos sliders. 10 preguntes, sense temps, amb la distància real en km.' }}
      metaPath="/examen/coordenadas-test"
      subjectSchema="Geografía"
      backGamePath={backPath || '/juegos/coordenadas'}
      backLabel={backLbl}
      playLabel={backPath ? { es: '← Volver', en: '← Back', ca: '← Enrere' } : { es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={LEVELS}
      genRound={difficulty => genRound(difficulty, region)}
      isCorrect={(round, ans) => isCorrectGuess(round, ans)}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
