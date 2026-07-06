import { useEffect, useState } from 'react'
import { getLeaderboard } from '../lib/activity'
import { BANNER_BY_ID } from '../data/cosmetics'

const MEDAL = ['🥇', '🥈', '🥉']

export default function MiniLeaderboard({ game, currentScore, currentUid, lang }) {
  const [top, setTop]         = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLeaderboard(game).then(data => { setTop(data); setLoading(false) })
  }, [game])

  const label = lang === 'en' ? 'Ranking' : lang === 'ca' ? 'Rànquing' : 'Ranking'
  const empty = lang === 'en' ? 'No scores yet — be the first!' : lang === 'ca' ? 'Sense puntuacions — sigues el primer!' : '¡Sin puntuaciones aún — sé el primero!'
  const youLabel = lang === 'en' ? 'You' : lang === 'ca' ? 'Tu' : 'Tú'

  const topScore = top[0]?.score ?? 0
  const isNewRecord = currentScore > 0 && currentScore > topScore

  if (loading) return null

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-4">
      <p className="text-white/30 text-xs uppercase tracking-widest mb-3">🏆 {label}</p>

      {top.length === 0 ? (
        <p className="text-white/40 text-sm text-center py-2">{empty}</p>
      ) : (
        <div className="space-y-1.5">
          {top.slice(0, 5).map((entry, i) => {
            const isMe = entry.uid === currentUid
            const banner = entry.bannerId ? BANNER_BY_ID[entry.bannerId] : null
            const hasBanner = banner && banner.bg

            return (
              <div key={entry.uid}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm overflow-hidden ${isMe ? 'ring-1 ring-violet-500/40' : ''}`}
                style={{
                  background: hasBanner ? banner.bg : isMe ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
                  borderLeft: hasBanner ? `3px solid ${banner.border}` : isMe ? '3px solid rgba(139,92,246,0.5)' : '3px solid transparent',
                  backgroundSize: banner?.animated ? '300% 300%' : undefined,
                  animation: banner?.animated ? 'frameRotate 3s ease infinite' : undefined,
                }}
              >
                <span className="w-5 text-center shrink-0 text-base leading-none">
                  {i < 3 ? MEDAL[i] : <span className="text-white/30 font-bold text-xs">{i + 1}</span>}
                </span>
                {entry.photoURL
                  ? <img src={entry.photoURL} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                  : <div className="w-6 h-6 rounded-full bg-violet-600 shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
                      {(entry.name || '?')[0].toUpperCase()}
                    </div>}
                <span className={`flex-1 truncate font-medium ${isMe ? 'text-violet-200' : 'text-white/70'}`}>
                  {isMe ? `${entry.name} (${youLabel})` : entry.name}
                </span>
                <span className="text-white font-black tabular-nums text-xs">{entry.score.toLocaleString()}</span>
              </div>
            )
          })}
        </div>
      )}

      {isNewRecord && (
        <p className="text-amber-400 text-xs text-center mt-3 font-bold">
          {lang === 'en' ? '✨ New record!' : lang === 'ca' ? '✨ Nou rècord!' : '✨ ¡Nuevo récord!'}
        </p>
      )}
    </div>
  )
}
