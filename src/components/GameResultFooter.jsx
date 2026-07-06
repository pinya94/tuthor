import { useState, useEffect } from 'react'
import MiniLeaderboard from './MiniLeaderboard'
import AuthModal from './AuthModal'
import { getStatsAndCosmetics } from '../lib/activity'

export default function GameResultFooter({ game, score, user, lang }) {
  const [showAuth, setShowAuth] = useState(false)
  const [equippedBanner, setEquippedBanner] = useState(null)
  const [equippedAvatar, setEquippedAvatar]  = useState(null)

  useEffect(() => {
    if (!user?.uid) return
    getStatsAndCosmetics(user.uid).then(c => {
      setEquippedBanner(c.equippedBanner ?? null)
      setEquippedAvatar(c.equippedAvatar ?? null)
    }).catch(() => {})
  }, [user?.uid])

  if (!score || score <= 0) return null

  return (
    <>
      {!user && (
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-2xl p-4 mt-4 text-center">
          <p className="text-violet-300 font-bold text-sm">
            💰 {lang === 'en' ? 'Save your coins!' : lang === 'ca' ? 'Guarda les teves monedes!' : '¡Guarda tus monedas!'}
          </p>
          <p className="text-white/40 text-xs mb-3">
            {lang === 'en' ? 'Sign up to save your score and spend coins on avatar frames.'
            : lang === 'ca' ? "Registra't per guardar la puntuació i gastar monedes en marcs."
            : 'Regístrate para guardar tu puntuación y gastar monedas en marcos exclusivos.'}
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-5 rounded-xl text-sm transition"
          >
            ✨ {lang === 'en' ? "Sign up — it's free" : lang === 'ca' ? "Registra't — és gratis" : 'Regístrate — es gratis'}
          </button>
        </div>
      )}

      <MiniLeaderboard
        game={game}
        currentScore={score}
        currentUid={user?.uid}
        currentName={user?.displayName}
        currentPhoto={user?.photoURL}
        currentBannerId={equippedBanner}
        currentAvatarEmoji={equippedAvatar}
        lang={lang}
      />

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
