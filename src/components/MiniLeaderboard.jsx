import { useEffect, useState } from 'react'
import { getLeaderboard } from '../lib/activity'

const MEDAL = ['🥇', '🥈', '🥉']

export default function MiniLeaderboard({ game, currentScore, currentUid, lang }) {
  const [top, setTop]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLeaderboard(game).then(data => { setTop(data); setLoading(false) })
  }, [game])

  const label = lang === 'en' ? 'Ranking' : lang === 'ca' ? 'Rànquing' : 'Ranking'
  const empty = lang === 'en' ? 'No scores yet — be the first!' : lang === 'ca' ? 'Sense puntuacions — sigues el primer!' : '¡Sin puntuaciones aún — sé el primero!'
  const youLabel = lang === 'en' ? 'You' : lang === 'ca' ? 'Tu' : 'Tú'

  // Find where current score would rank
  const rank = currentScore > 0 ? top.findIndex(e => currentScore > e.score) + 1 : null
  const isTop = rank === 1 || (rank === 0 && top.length === 0)

  if (loading) return null

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-4">
      <p className="text-white/30 text-xs uppercase tracking-widest mb-3">🏆 {label}</p>

      {top.length === 0 ? (
        <p className="text-white/40 text-sm text-center py-2">{empty}</p>
      ) : (
        <div className="space-y-2">
          {top.slice(0, 5).map((entry, i) => {
            const isMe = entry.uid === currentUid
            return (
              <div key={entry.uid}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${isMe ? 'bg-violet-500/20 border border-violet-500/30' : 'bg-white/5'}`}>
                <span className="w-5 text-center shrink-0">
                  {MEDAL[i] ?? <span className="text-white/30 font-bold">{i + 1}</span>}
                </span>
                {entry.photoURL
                  ? <img src={entry.photoURL} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                  : <div className="w-6 h-6 rounded-full bg-violet-600 shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
                      {(entry.name || '?')[0].toUpperCase()}
                    </div>}
                <span className={`flex-1 truncate font-medium ${isMe ? 'text-violet-300' : 'text-white/70'}`}>
                  {isMe ? `${entry.name} (${youLabel})` : entry.name}
                </span>
                <span className="text-white font-black tabular-nums">{entry.score.toLocaleString()}</span>
              </div>
            )
          })}
        </div>
      )}

      {currentScore > 0 && isTop && (
        <p className="text-amber-400 text-xs text-center mt-3 font-bold">
          {lang === 'en' ? '✨ New record!' : lang === 'ca' ? '✨ Nou rècord!' : '✨ ¡Nuevo récord!'}
        </p>
      )}
    </div>
  )
}
