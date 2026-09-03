import { useState } from 'react'
import { formatTime } from '../lib/activity'

// Desglose por materia de un alumno: activo/expandido para ver examen a
// examen (aprobados/suspensos), igual que en el propio Perfil.jsx.
export default function StudentSubjects({ subjectEntries, lang, tr }) {
  const [expanded, setExpanded] = useState(null)

  if (subjectEntries.length === 0) {
    return <p className="text-white/30 text-xs">{tr({ es: 'Sin actividad todavía', en: 'No activity yet', ca: 'Sense activitat encara' })}</p>
  }

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
      {subjectEntries.map((subj, i) => {
        const subjLabel = subj.label[lang] || subj.label.es
        const isOpen = expanded === subj.id
        const failed = subj.totalExamPlays - subj.totalPassed
        return (
          <div key={subj.id} className={i < subjectEntries.length - 1 ? 'border-b border-white/10' : ''}>
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : subj.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-lg w-6 text-center shrink-0">{subj.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[13.5px] font-bold">{subjLabel}</p>
                <p className="text-white/45 text-[11.5px] mt-0.5 flex gap-2 flex-wrap items-center">
                  <span>{subj.totalPlays} {tr({ es: 'actividades', en: 'activities', ca: 'activitats' })}</span>
                  {subj.totalExamPlays > 0 && <span className="text-green-400 font-bold">{subj.totalPassed} ✅</span>}
                  {failed > 0 && <span className="text-red-400 font-bold">{failed} ❌</span>}
                </p>
              </div>
              {(subj.timeSpent || 0) > 0 && (
                <span className="text-white/60 text-[12px] font-semibold whitespace-nowrap">{formatTime(subj.timeSpent)}</span>
              )}
              <span className={`text-white/45 text-xs ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {isOpen && subj.examRows.length > 0 && (
              <div className="px-3 pb-2.5 pl-[42px]">
                {subj.examRows.map(row => {
                  const rowFailed = row.plays - row.passed
                  return (
                    <div key={row.id} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-0">
                      <span className="flex-1 text-white/60 text-[12px]">{row.label}</span>
                      <span className="text-white/45 text-[11.5px] font-semibold">{row.plays}×</span>
                      <span className="text-green-400 text-[11.5px] font-extrabold">{row.passed} ✅</span>
                      {rowFailed > 0 && <span className="text-red-400 text-[11.5px] font-extrabold">{rowFailed} ❌</span>}
                    </div>
                  )
                })}
              </div>
            )}
            {isOpen && subj.examRows.length === 0 && subj.gameStats.plays > 0 && (
              <p className="px-3 pb-2.5 pl-[42px] text-white/45 text-[12px]">
                {tr({ es: 'Sin exámenes realizados', en: 'No exams taken', ca: 'Sense exàmens fets' })}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
