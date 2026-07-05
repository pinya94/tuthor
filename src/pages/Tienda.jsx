import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStats, getCosmetics, buyFrame, equipFrame } from '../lib/activity'
import { FRAMES, TIER_LABELS } from '../data/cosmetics'
import AvatarFrame from '../components/AvatarFrame'
import PageMeta from '../components/PageMeta'

const TIER_ORDER = ['free', 'basic', 'color', 'holo']

function FrameCard({ frame, lang, coins, owned, equipped, onBuy, onEquip, buying }) {
  const en = lang === 'en', ca = lang === 'ca'
  const name = frame.name[lang] ?? frame.name.es
  const tierLabel = TIER_LABELS[frame.tier][lang] ?? TIER_LABELS[frame.tier].es
  const canAfford = coins >= frame.price

  const tierColor = {
    free:  'text-white/40 border-white/10',
    basic: 'text-slate-300 border-slate-500/30',
    color: 'text-violet-300 border-violet-500/30',
    holo:  'text-amber-300 border-amber-500/30',
  }[frame.tier]

  return (
    <div className={`bg-white/5 border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${equipped ? 'border-violet-500/60 ring-1 ring-violet-500/30' : 'border-white/10'}`}>
      {/* Preview */}
      <div className="py-2">
        <div
          className={frame.animated ? 'frame-animated' : ''}
          style={{ ...frame.style, padding: 4, borderRadius: '50%', width: 72, height: 72 }}
        >
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1e1b4b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
            {frame.emoji}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="text-white font-bold text-sm">{name}</p>
        <p className={`text-xs border px-2 py-0.5 rounded-full inline-block mt-1 ${tierColor}`}>{tierLabel}</p>
      </div>

      {/* Price / action */}
      {frame.price === 0 || owned ? (
        <button
          onClick={() => !equipped && onEquip(frame.id)}
          disabled={equipped || buying}
          className={`w-full py-2 rounded-xl text-sm font-bold transition-all ${
            equipped
              ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300 cursor-default'
              : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
          }`}
        >
          {equipped
            ? (ca ? '✓ Equipat' : en ? '✓ Equipped' : '✓ Equipado')
            : (ca ? 'Equipar' : en ? 'Equip' : 'Equipar')}
        </button>
      ) : (
        <div className="w-full space-y-2">
          <p className="text-center font-black text-amber-400 text-sm">💰 {frame.price.toLocaleString()}</p>
          {!canAfford && frame.price === 1000 && (
            <p className="text-center text-white/40 text-[11px]">
              {ca ? 'Fes el repte diari per aconseguir-les!' : en ? 'Do the daily challenge to earn them!' : '¡Haz el reto diario para conseguirlas!'}
            </p>
          )}
          {!canAfford && frame.price > 1000 && (
            <p className="text-center text-white/40 text-[11px]">
              {ca ? `Et falten ${(frame.price - coins).toLocaleString()} monedes` : en ? `You need ${(frame.price - coins).toLocaleString()} more coins` : `Te faltan ${(frame.price - coins).toLocaleString()} monedas`}
            </p>
          )}
          <button
            onClick={() => canAfford && onBuy(frame.id, frame.price)}
            disabled={!canAfford || buying === frame.id}
            className={`w-full py-2 rounded-xl text-sm font-bold transition-all border ${
              canAfford
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                : 'bg-white/5 border-white/10 text-white/25 cursor-not-allowed'
            }`}
          >
            {buying === frame.id
              ? '...'
              : (ca ? 'Comprar' : en ? 'Buy' : 'Comprar')}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Tienda() {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const en = lang === 'en', ca = lang === 'ca'

  const [coins, setCoins] = useState(0)
  const [owned, setOwned] = useState(['default'])
  const [equipped, setEquipped] = useState('default')
  const [loading, setLoading] = useState(true)
  const [buying, setBuying] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!user) { navigate(localPath('/perfil')); return }
    Promise.all([getStats(user.uid), getCosmetics(user.uid)]).then(([stats, cosmetics]) => {
      setCoins(stats?.coins ?? 0)
      setOwned(cosmetics.ownedFrames)
      setEquipped(cosmetics.equippedFrame)
      setLoading(false)
    })
  }, [user])

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  async function handleBuy(frameId, price) {
    setBuying(frameId)
    const result = await buyFrame(user.uid, frameId, price)
    if (result.ok) {
      setCoins(c => c - price)
      setOwned(o => [...o, frameId])
      setEquipped(frameId)
      await equipFrame(user.uid, frameId)
      showToast(ca ? 'Marc comprat i equipat! ✓' : en ? 'Frame bought and equipped! ✓' : '¡Marco comprado y equipado! ✓')
    } else if (result.reason === 'not_enough_coins') {
      showToast(ca ? 'No tens prou monedes' : en ? 'Not enough coins' : 'No tienes suficientes monedas')
    }
    setBuying(null)
  }

  async function handleEquip(frameId) {
    setEquipped(frameId)
    await equipFrame(user.uid, frameId)
    showToast(ca ? 'Marc equipat! ✓' : en ? 'Frame equipped! ✓' : '¡Marco equipado! ✓')
  }

  const groupedFrames = TIER_ORDER.map(tier => ({
    tier,
    frames: FRAMES.filter(f => f.tier === tier),
  })).filter(g => g.frames.length > 0)

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-8">
      <PageMeta
        title={ca ? 'Botiga' : en ? 'Shop' : 'Tienda'}
        description={ca ? 'Personalitza el teu perfil amb marcs exclusius.' : en ? 'Personalise your profile with exclusive frames.' : 'Personaliza tu perfil con marcos exclusivos.'}
        path="/tienda"
        lang={lang}
        noIndex
      />

      <div className="max-w-2xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(localPath('/perfil'))} className="text-white/40 hover:text-white/70 transition-colors text-sm">← {ca ? 'Perfil' : en ? 'Profile' : 'Perfil'}</button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-white">{ca ? '🛍 Botiga' : en ? '🛍 Shop' : '🛍 Tienda'}</h1>
          {!loading && user && (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2">
              <AvatarFrame user={user} frameId={equipped} size="sm" />
              <div className="text-right">
                <p className="text-amber-400 font-black text-lg tabular-nums">💰 {coins.toLocaleString()}</p>
                <p className="text-amber-400/50 text-xs">{ca ? 'monedes' : en ? 'coins' : 'monedas'}</p>
              </div>
            </div>
          )}
        </div>

        {!user ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔒</p>
            <p className="text-white/50 mb-4">{ca ? 'Inicia sessió per accedir a la botiga.' : en ? 'Sign in to access the shop.' : 'Inicia sesión para acceder a la tienda.'}</p>
            <button onClick={() => navigate(localPath('/perfil'))} className="bg-violet-500/20 border border-violet-500/40 text-violet-300 font-bold px-6 py-3 rounded-xl hover:bg-violet-500/30 transition-all">
              {ca ? 'Iniciar sessió' : en ? 'Sign in' : 'Iniciar sesión'}
            </button>
          </div>
        ) : loading ? (
          <div className="text-white/30 text-center py-12">{ca ? 'Carregant...' : en ? 'Loading...' : 'Cargando...'}</div>
        ) : (
          <>
            {/* Daily challenge reminder if not many coins */}
            {coins < 1000 && (
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div className="flex-1">
                  <p className="text-orange-300 font-bold text-sm">{ca ? 'Aconsegueix monedes!' : en ? 'Earn coins!' : '¡Consigue monedas!'}</p>
                  <p className="text-white/40 text-xs">{ca ? 'El repte diari et dona 1.000 monedes.' : en ? 'The daily challenge gives you 1,000 coins.' : 'El reto diario te da 1.000 monedas.'}</p>
                </div>
                <button onClick={() => navigate(localPath('/diaria'))} className="bg-orange-500/20 border border-orange-500/40 text-orange-300 font-bold text-sm px-4 py-2 rounded-xl hover:bg-orange-500/30 transition-all whitespace-nowrap">
                  {ca ? 'Fer repte →' : en ? 'Do challenge →' : 'Hacer reto →'}
                </button>
              </div>
            )}

            {/* Frames by tier */}
            {groupedFrames.map(({ tier, frames }) => (
              <div key={tier} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="font-black text-white text-lg">{TIER_LABELS[tier][lang] ?? TIER_LABELS[tier].es}</h2>
                  {tier !== 'free' && (
                    <span className="text-white/30 text-sm">
                      {tier === 'basic' && '💰 1.000'}
                      {tier === 'color' && '💰 7.500'}
                      {tier === 'holo' && '💰 35.000'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {frames.map(frame => (
                    <FrameCard
                      key={frame.id}
                      frame={frame}
                      lang={lang}
                      coins={coins}
                      owned={owned.includes(frame.id)}
                      equipped={equipped === frame.id}
                      onBuy={handleBuy}
                      onEquip={handleEquip}
                      buying={buying}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-6 py-3 rounded-2xl text-sm shadow-xl z-50 pointer-events-none">
          {toast}
        </div>
      )}
    </div>
  )
}
