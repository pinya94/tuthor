import { useEffect, useState } from 'react'
import { getLeaderboard } from '../lib/activity'
import { BANNER_BY_ID } from '../data/cosmetics'

const MEDAL = ['🥇', '🥈', '🥉']

const _cache = {}
async function getCachedLeaderboard(game) {
  const now = Date.now()
  if (_cache[game] && now - _cache[game].ts < 60_000) return _cache[game].data
  const data = await getLeaderboard(game)
  _cache[game] = { data, ts: now }
  return data
}

function LeaderboardRow({ entry, i, currentUid, youLabel }) {
  const isMe = entry.uid === currentUid
  const banner = entry.bannerId ? BANNER_BY_ID[entry.bannerId] : null
  const hasBanner = banner && banner.bg
  return (
    <div
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
        : <div className="w-6 h-6 rounded-full bg-violet-600 shrink-0 flex items-center justify-center font-bold text-white" style={{ fontSize: entry.avatarEmoji ? 14 : 10 }}>
            {entry.avatarEmoji ?? (entry.name || '?')[0].toUpperCase()}
          </div>}
      <span className={`flex-1 truncate font-medium ${isMe ? 'text-violet-200' : 'text-white/70'}`}>
        {isMe ? `${entry.name} (${youLabel})` : entry.name}
      </span>
      <span className="text-white font-black tabular-nums text-xs">{entry.score.toLocaleString()}</span>
    </div>
  )
}

export default function MiniLeaderboard({ game, currentScore, currentUid, currentName, currentPhoto, lang }) {
  const [top, setTop]       = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    getCachedLeaderboard(game).then(data => { setTop(data); setLoading(false) })
  }, [game])

  const label    = lang === 'en' ? 'Ranking' : lang === 'ca' ? 'Rànquing' : 'Ranking'
  const youLabel = lang === 'en' ? 'You' : lang === 'ca' ? 'Tu' : 'Tú'
  const seeAll   = lang === 'en' ? 'See full ranking →' : lang === 'ca' ? 'Veure ranking complet →' : 'Ver ranking completo →'
  const close    = lang === 'en' ? 'Close' : lang === 'ca' ? 'Tancar' : 'Cerrar'

  const displayTop = (() => {
    if (!currentUid || !currentScore || currentScore <= 0) return top
    const withoutMe = top.filter(e => e.uid !== currentUid)
    const myEntry = { uid: currentUid, name: currentName || '?', photoURL: currentPhoto || null, score: currentScore }
    return [...withoutMe, myEntry].sort((a, b) => b.score - a.score).slice(0, 10)
  })()

  const isNewRecord = currentScore > 0 && top.length > 0 && currentScore > (top[0]?.score ?? 0)

  if (loading) return null

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-4">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-3">🏆 {label}</p>

        {displayTop.length === 0 ? (
          <p className="text-white/40 text-sm text-center py-2">
            {lang === 'en' ? 'No scores yet.' : lang === 'ca' ? 'Sense puntuacions encara.' : 'Sin puntuaciones aún.'}
          </p>
        ) : (
          <>
            <div className="space-y-1.5">
              {displayTop.slice(0, 5).map((entry, i) => (
                <LeaderboardRow key={entry.uid} entry={entry} i={i} currentUid={currentUid} youLabel={youLabel} />
              ))}
            </div>
            {displayTop.length > 0 && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full text-center text-white/30 hover:text-white/60 text-xs mt-3 py-1 transition-colors"
              >
                {seeAll}
              </button>
            )}
          </>
        )}

        {isNewRecord && (
          <p className="text-amber-400 text-xs text-center mt-3 font-bold">
            {lang === 'en' ? '✨ New record!' : lang === 'ca' ? '✨ Nou rècord!' : '✨ ¡Nuevo récord!'}
          </p>
        )}
      </div>

      {showAll && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAll(false)}>
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-white font-black text-lg">🏆 {label}</p>
              <button onClick={() => setShowAll(false)} className="text-white/40 hover:text-white transition-colors text-sm">{close}</button>
            </div>
            <div className="space-y-1.5">
              {displayTop.map((entry, i) => (
                <LeaderboardRow key={entry.uid} entry={entry} i={i} currentUid={currentUid} youLabel={youLabel} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
