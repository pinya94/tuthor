import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStats, getCosmetics, buyFrame, buyBanner, equipFrame, equipBanner } from '../lib/activity'
import { FRAMES, FRAME_BY_ID, BANNERS, BANNER_BY_ID } from '../data/cosmetics'
import AvatarFrame from '../components/AvatarFrame'
import PageMeta from '../components/PageMeta'

// ── Frame card ───────────────────────────────────────────────────────────────
function FrameCard({ frame, lang, coins, owned, equipped, onBuy, onEquip, buying }) {
  const en = lang === 'en', ca = lang === 'ca'
  const name = frame.name[lang] ?? frame.name.es
  const canAfford = coins >= frame.price

  return (
    <div className={`bg-white/5 border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${equipped ? 'border-violet-500/60 ring-1 ring-violet-500/30' : 'border-white/10'}`}>
      {/* Preview */}
      <div
        className={frame.animated ? 'frame-animated' : ''}
        style={{ ...frame.style, padding: 4, borderRadius: '50%', width: 64, height: 64, flexShrink: 0 }}
      >
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1e1b4b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
          {frame.emoji}
        </div>
      </div>

      <p className="text-white font-bold text-sm text-center leading-tight">{name}</p>

      {frame.price === 0 || owned ? (
        <button
          onClick={() => !equipped && onEquip(frame.id)}
          disabled={equipped || buying}
          className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
            equipped
              ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300 cursor-default'
              : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
          }`}
        >
          {equipped ? (ca ? '✓ Equipat' : en ? '✓ Equipped' : '✓ Equipado') : (ca ? 'Equipar' : en ? 'Equip' : 'Equipar')}
        </button>
      ) : (
        <div className="w-full space-y-1.5">
          <p className="text-center font-black text-amber-400 text-xs">💰 {frame.price.toLocaleString()}</p>
          {!canAfford && (
            <p className="text-center text-white/30 text-[10px]">
              {ca ? `Falten ${(frame.price - coins).toLocaleString()}` : en ? `Need ${(frame.price - coins).toLocaleString()} more` : `Faltan ${(frame.price - coins).toLocaleString()}`}
            </p>
          )}
          <button
            onClick={() => canAfford && onBuy(frame.id, frame.price)}
            disabled={!canAfford || buying === frame.id}
            className={`w-full py-2 rounded-xl text-xs font-bold transition-all border ${
              canAfford
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                : 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'
            }`}
          >
            {buying === frame.id ? '...' : (ca ? 'Comprar' : en ? 'Buy' : 'Comprar')}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Banner card ───────────────────────────────────────────────────────────────
function BannerCard({ banner, lang, coins, owned, equipped, onBuy, onEquip, buying }) {
  const en = lang === 'en', ca = lang === 'ca'
  const name = banner.name[lang] ?? banner.name.es
  const canAfford = coins >= banner.price
  const hasBg = !!banner.bg

  return (
    <div className={`bg-white/5 border rounded-2xl p-4 flex flex-col gap-3 transition-all ${equipped ? 'border-violet-500/60 ring-1 ring-violet-500/30' : 'border-white/10'}`}>
      {/* Preview — simulates a leaderboard row */}
      <div className="rounded-xl overflow-hidden">
        <div
          className={banner.animated ? 'frame-animated' : ''}
          style={{
            background: hasBg ? banner.bg : 'rgba(255,255,255,0.04)',
            borderLeft: hasBg ? `3px solid ${banner.border}` : '3px solid rgba(255,255,255,0.1)',
            backgroundSize: banner.animated ? '300% 300%' : undefined,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span className="text-sm">🥇</span>
          <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-[9px] font-bold text-white shrink-0">T</div>
          <span className="text-white/70 text-xs font-medium flex-1">Tuthor</span>
          <span className="text-white font-black text-xs">9.999</span>
        </div>
      </div>

      <p className="text-white font-bold text-sm">{banner.emoji} {name}</p>

      {banner.price === 0 || owned ? (
        <button
          onClick={() => !equipped && onEquip(banner.id)}
          disabled={equipped || buying}
          className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
            equipped
              ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300 cursor-default'
              : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
          }`}
        >
          {equipped ? (ca ? '✓ Equipat' : en ? '✓ Equipped' : '✓ Equipado') : (ca ? 'Equipar' : en ? 'Equip' : 'Equipar')}
        </button>
      ) : (
        <div className="space-y-1.5">
          <p className="text-center font-black text-amber-400 text-xs">💰 {banner.price.toLocaleString()}</p>
          {!canAfford && (
            <p className="text-center text-white/30 text-[10px]">
              {ca ? `Falten ${(banner.price - coins).toLocaleString()}` : en ? `Need ${(banner.price - coins).toLocaleString()} more` : `Faltan ${(banner.price - coins).toLocaleString()}`}
            </p>
          )}
          <button
            onClick={() => canAfford && onBuy(banner.id, banner.price)}
            disabled={!canAfford || buying === banner.id}
            className={`w-full py-2 rounded-xl text-xs font-bold transition-all border ${
              canAfford
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                : 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'
            }`}
          >
            {buying === banner.id ? '...' : (ca ? 'Comprar' : en ? 'Buy' : 'Comprar')}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Tienda() {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const en = lang === 'en', ca = lang === 'ca'

  const [coins, setCoins]               = useState(0)
  const [ownedFrames, setOwnedFrames]   = useState(['default'])
  const [equippedFrame, setEquippedFrame] = useState('default')
  const [ownedBanners, setOwnedBanners] = useState(['banner_default'])
  const [equippedBanner, setEquippedBanner] = useState('banner_default')
  const [loading, setLoading]           = useState(true)
  const [buying, setBuying]             = useState(null)
  const [toast, setToast]               = useState(null)

  useEffect(() => {
    if (!user) { navigate(localPath('/perfil')); return }
    Promise.all([getStats(user.uid), getCosmetics(user.uid)]).then(([stats, cos]) => {
      setCoins(stats?.coins ?? 0)
      setOwnedFrames(cos.ownedFrames)
      setEquippedFrame(cos.equippedFrame)
      setOwnedBanners(cos.ownedBanners)
      setEquippedBanner(cos.equippedBanner)
      setLoading(false)
    })
  }, [user])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2500) }

  async function handleBuyFrame(frameId, price) {
    setBuying(frameId)
    const result = await buyFrame(user.uid, frameId, price)
    if (result.ok) {
      setCoins(c => c - price)
      setOwnedFrames(o => [...o, frameId])
      setEquippedFrame(frameId)
      await equipFrame(user.uid, frameId)
      showToast(ca ? 'Marc comprat i equipat! ✓' : en ? 'Frame bought & equipped! ✓' : '¡Marco comprado y equipado! ✓')
    } else if (result.reason === 'not_enough_coins') {
      showToast(ca ? 'No tens prou monedes' : en ? 'Not enough coins' : 'No tienes suficientes monedas')
    }
    setBuying(null)
  }

  async function handleEquipFrame(frameId) {
    setEquippedFrame(frameId)
    await equipFrame(user.uid, frameId)
    showToast(ca ? 'Marc equipat! ✓' : en ? 'Frame equipped! ✓' : '¡Marco equipado! ✓')
  }

  async function handleBuyBanner(bannerId, price) {
    setBuying(bannerId)
    const result = await buyBanner(user.uid, bannerId, price)
    if (result.ok) {
      setCoins(c => c - price)
      setOwnedBanners(o => [...o, bannerId])
      setEquippedBanner(bannerId)
      await equipBanner(user.uid, bannerId)
      showToast(ca ? 'Banner comprat i equipat! ✓' : en ? 'Banner bought & equipped! ✓' : '¡Banner comprado y equipado! ✓')
    } else if (result.reason === 'not_enough_coins') {
      showToast(ca ? 'No tens prou monedes' : en ? 'Not enough coins' : 'No tienes suficientes monedas')
    }
    setBuying(null)
  }

  async function handleEquipBanner(bannerId) {
    setEquippedBanner(bannerId)
    await equipBanner(user.uid, bannerId)
    showToast(ca ? 'Banner equipat! ✓' : en ? 'Banner equipped! ✓' : '¡Banner equipado! ✓')
  }

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-8">
      <PageMeta
        title={ca ? 'Botiga' : en ? 'Shop' : 'Tienda'}
        description={ca ? 'Personalitza el teu perfil amb marcs i banners exclusius.' : en ? 'Personalise your profile with exclusive frames and banners.' : 'Personaliza tu perfil con marcos y banners exclusivos.'}
        path="/tienda"
        lang={lang}
        noIndex
      />

      <div className="max-w-2xl mx-auto w-full">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(localPath('/perfil'))} className="text-white/40 hover:text-white/70 transition-colors text-sm">
            ← {ca ? 'Perfil' : en ? 'Profile' : 'Perfil'}
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black text-white">{ca ? '🛍 Botiga' : en ? '🛍 Shop' : '🛍 Tienda'}</h1>
          {!loading && user && (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2">
              <AvatarFrame user={user} frameId={equippedFrame} size="sm" />
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
            {/* Low coins reminder */}
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

            {/* ── Marcos ── */}
            <div className="mb-10">
              <h2 className="font-black text-white text-xl mb-1">
                {ca ? 'Marcos' : en ? 'Frames' : 'Marcos'}
              </h2>
              <p className="text-white/40 text-sm mb-5">
                {ca ? 'Apareix al voltant del teu avatar a tot arreu.' : en ? 'Shown around your avatar everywhere.' : 'Aparece alrededor de tu avatar en todas partes.'}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {FRAMES.map(frame => (
                  <FrameCard
                    key={frame.id}
                    frame={frame}
                    lang={lang}
                    coins={coins}
                    owned={ownedFrames.includes(frame.id)}
                    equipped={equippedFrame === frame.id}
                    onBuy={handleBuyFrame}
                    onEquip={handleEquipFrame}
                    buying={buying}
                  />
                ))}
              </div>
            </div>

            {/* ── Banners ── */}
            <div className="mb-10">
              <h2 className="font-black text-white text-xl mb-1">
                {ca ? 'Banners' : en ? 'Banners' : 'Banners'}
              </h2>
              <p className="text-white/40 text-sm mb-5">
                {ca ? 'Apareix de fons a la teva fila del rànquing.' : en ? 'Shown behind your row in the ranking.' : 'Aparece de fondo en tu fila del ranking.'}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BANNERS.map(banner => (
                  <BannerCard
                    key={banner.id}
                    banner={banner}
                    lang={lang}
                    coins={coins}
                    owned={ownedBanners.includes(banner.id)}
                    equipped={equippedBanner === banner.id}
                    onBuy={handleBuyBanner}
                    onEquip={handleEquipBanner}
                    buying={buying}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur border border-white/20 text-white font-semibold px-6 py-3 rounded-2xl text-sm shadow-xl z-50 pointer-events-none">
          {toast}
        </div>
      )}
    </div>
  )
}
