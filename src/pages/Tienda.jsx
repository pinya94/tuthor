import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getStatsAndCosmetics, buyFrame, buyBanner, equipFrame, equipBanner, buyAvatar, equipAvatar } from '../lib/activity'
import { FRAMES, FRAME_BY_ID, BANNERS, BANNER_BY_ID, AVATARS, DEFAULT_AVATAR_EMOJI } from '../data/cosmetics'
import AvatarFrame from '../components/AvatarFrame'
import AvatarDibujo from '../components/avatares/AvatarDibujo'
import SEOHead from '../components/SEOHead'
import { Moneda, Tienda as IconoTienda, Rayo, Medalla, Acierto } from '../components/Iconos'

// La tienda funciona como un probador: tocar un objeto lo prueba arriba, sobre
// tu propio avatar y tu fila del ranking, y el botón de allí lo compra o lo
// equipa. Así se ve cómo queda antes de gastar monedas.

const TIERS = [
  { max: 3000, nombre: { es: 'Básicos', en: 'Basic', ca: 'Bàsics' }, color: 'text-sky-300' },
  { max: 7500, nombre: { es: 'Raros', en: 'Rare', ca: 'Rars' }, color: 'text-violet-300' },
  { max: Infinity, nombre: { es: 'Legendarios', en: 'Legendary', ca: 'Llegendaris' }, color: 'text-amber-300' },
]

function porTiers(items) {
  return TIERS.map((t, i) => ({
    ...t,
    items: items.filter(it => it.price <= t.max && (i === 0 || it.price > TIERS[i - 1].max)),
  })).filter(t => t.items.length)
}

const fmt = n => n.toLocaleString('es-ES')

// Una fila del ranking con el banner, como se verá en los juegos.
function FilaRanking({ banner, emoji, frameColor, nombre }) {
  const hasBg = !!banner?.bg
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl ${banner?.animated ? 'frame-animated' : ''}`}
      style={{
        background: hasBg ? banner.bg : 'rgba(255,255,255,0.04)',
        borderLeft: `3px solid ${hasBg ? banner.border : 'rgba(255,255,255,0.1)'}`,
        backgroundSize: banner?.animated ? '300% 300%' : undefined,
      }}
    >
      <Medalla puesto={1} className="w-5 h-5 shrink-0" />
      <span className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-violet-600" style={frameColor ? { outline: `2px solid ${frameColor}`, outlineOffset: 1 } : undefined}>
        <AvatarDibujo emoji={emoji} />
      </span>
      <span className="text-white/80 text-xs font-semibold flex-1 truncate">{nombre}</span>
      <span className="text-white font-black text-xs tabular-nums">9.999</span>
    </div>
  )
}

// Casilla de la rejilla: el dibujo del objeto, su nombre y su estado.
function Casilla({ seleccionada, equipada, propia, precio, puedePagar, nombre, onClick, children }) {
  const { tr } = useLang()
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1.5 p-2 pt-3 rounded-2xl border transition-all ${
        seleccionada ? 'bg-violet-500/15 border-violet-400/70 ring-2 ring-violet-400/30' : 'bg-[#141b2e] border-white/[0.08] hover:border-white/20'
      }`}
    >
      {equipada && (
        <span className="absolute top-1.5 right-1.5"><Acierto className="w-4 h-4" /></span>
      )}
      {children}
      <span className="text-white text-[11px] font-bold leading-tight text-center line-clamp-1">{nombre}</span>
      {propia ? (
        <span className="text-[10px] font-bold text-emerald-300/80">{equipada ? tr({ es: 'Puesto', en: 'On', ca: 'Posat' }) : tr({ es: 'Tuyo', en: 'Yours', ca: 'Teu' })}</span>
      ) : (
        <span className={`flex items-center gap-0.5 text-[10px] font-black tabular-nums ${puedePagar ? 'text-amber-300' : 'text-white/30'}`}>
          <Moneda className={`w-3 h-3 ${puedePagar ? '' : 'opacity-40'}`} />{fmt(precio)}
        </span>
      )}
    </button>
  )
}

export default function Tienda() {
  const { user } = useAuth()
  const { tr, localPath } = useLang()
  const navigate = useNavigate()

  const [coins, setCoins]                   = useState(0)
  const [ownedFrames, setOwnedFrames]       = useState(['default'])
  const [equippedFrame, setEquippedFrame]   = useState('default')
  const [ownedBanners, setOwnedBanners]     = useState(['banner_default'])
  const [equippedBanner, setEquippedBanner] = useState('banner_default')
  const [ownedAvatars, setOwnedAvatars]     = useState([])
  const [equippedAvatar, setEquippedAvatar] = useState(null)
  const [loading, setLoading]               = useState(true)
  const [buying, setBuying]                 = useState(false)
  const [toast, setToast]                   = useState(null)

  const [tab, setTab] = useState('avatares')
  // Lo que se está probando en cada categoría (null = lo equipado).
  const [probando, setProbando] = useState({ avatares: null, marcos: null, banners: null })

  useEffect(() => {
    if (!user) { navigate(localPath('/perfil')); return }
    getStatsAndCosmetics(user.uid).then(d => {
      setCoins(d.coins)
      setOwnedFrames(d.ownedFrames)
      setEquippedFrame(d.equippedFrame)
      setOwnedBanners(d.ownedBanners)
      setEquippedBanner(d.equippedBanner)
      setOwnedAvatars(d.ownedAvatars)
      setEquippedAvatar(d.equippedAvatar)
      setLoading(false)
    })
  }, [user])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const avatarEquipado = AVATARS.find(a => a.emoji === (equippedAvatar ?? DEFAULT_AVATAR_EMOJI)) ?? AVATARS[0]

  // Estado de cada objeto, por categoría.
  const CATS = {
    avatares: {
      items: AVATARS,
      propio: a => a.price === 0 || ownedAvatars.includes(a.id),
      equipado: a => a.id === avatarEquipado.id,
    },
    marcos: {
      items: FRAMES,
      propio: f => f.price === 0 || ownedFrames.includes(f.id),
      equipado: f => f.id === equippedFrame,
    },
    banners: {
      items: BANNERS,
      propio: b => b.price === 0 || ownedBanners.includes(b.id),
      equipado: b => b.id === equippedBanner,
    },
  }

  const prAvatar = probando.avatares ?? avatarEquipado
  const prFrame  = probando.marcos ?? FRAME_BY_ID[equippedFrame] ?? FRAMES[0]
  const prBanner = probando.banners ?? BANNER_BY_ID[equippedBanner] ?? BANNERS[0]
  const actual   = { avatares: prAvatar, marcos: prFrame, banners: prBanner }[tab]
  const cat      = CATS[tab]
  const esPropio = cat.propio(actual)
  const esEquip  = cat.equipado(actual)
  const faltan   = actual.price - coins

  async function equipar(item) {
    if (tab === 'avatares') { setEquippedAvatar(item.emoji); await equipAvatar(user.uid, item.emoji) }
    else if (tab === 'marcos') { setEquippedFrame(item.id); await equipFrame(user.uid, item.id) }
    else { setEquippedBanner(item.id); await equipBanner(user.uid, item.id) }
  }

  async function comprar(item) {
    setBuying(true)
    const fn = tab === 'avatares' ? buyAvatar : tab === 'marcos' ? buyFrame : buyBanner
    const result = await fn(user.uid, item.id, item.price)
    if (result.ok) {
      setCoins(c => c - item.price)
      if (tab === 'avatares') setOwnedAvatars(o => [...o, item.id])
      else if (tab === 'marcos') setOwnedFrames(o => [...o, item.id])
      else setOwnedBanners(o => [...o, item.id])
      await equipar(item)
      showToast(tr({ es: '¡Comprado y equipado!', en: 'Bought and equipped!', ca: 'Comprat i equipat!' }))
    } else if (result.reason === 'not_enough_coins') {
      showToast(tr({ es: 'No tienes suficientes monedas', en: 'Not enough coins', ca: 'No tens prou monedes' }))
    }
    setBuying(false)
  }

  async function onAccion() {
    if (esEquip || buying) return
    if (esPropio) {
      await equipar(actual)
      showToast(tr({ es: '¡Equipado!', en: 'Equipped!', ca: 'Equipat!' }))
    } else if (faltan <= 0) {
      await comprar(actual)
    }
  }

  // Al cambiar de pestaña se quita lo que se probaba y no es tuyo, para que
  // el probador no enseñe como puesto algo que aún no tienes.
  function cambiarTab(id) {
    setProbando(p => Object.fromEntries(Object.entries(p).map(([k, it]) => [k, it && CATS[k].propio(it) ? it : null])))
    setTab(id)
  }

  const nombreDe = it => tr(it.name)
  const pestañas = [
    { id: 'avatares', label: tr({ es: 'Avatares', en: 'Avatars', ca: 'Avatars' }) },
    { id: 'marcos', label: tr({ es: 'Marcos', en: 'Frames', ca: 'Marcs' }) },
    { id: 'banners', label: tr({ es: 'Banners', en: 'Banners', ca: 'Banners' }) },
  ]

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-4 sm:px-8 pt-5 pb-10">
      <SEOHead
        title={tr({ es: 'Tienda', en: 'Shop', ca: 'Botiga' })}
        description={tr({ es: 'Personaliza tu perfil con avatares, marcos y banners.', en: 'Personalise your profile with avatars, frames and banners.', ca: 'Personalitza el teu perfil amb avatars, marcs i banners.' })}
        path="/tienda"
        noindex
      />

      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link to={localPath('/perfil')} className="text-white/40 hover:text-white/70 transition-colors text-sm shrink-0">←</Link>
            <IconoTienda className="w-7 h-7 shrink-0" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">{tr({ es: 'Tienda', en: 'Shop', ca: 'Botiga' })}</h1>
          </div>
          {!loading && user && (
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full pl-1.5 pr-3 py-1">
              <Moneda className="w-6 h-6" />
              <span className="text-amber-300 font-black tabular-nums">{fmt(coins)}</span>
            </div>
          )}
        </div>

        {!user ? null : loading ? (
          <div className="text-white/30 text-center py-12">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</div>
        ) : (
          <>
            {/* ── Probador ── */}
            <div className="sticky top-0 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 pt-2 pb-3 bg-[#0b1020]/95 backdrop-blur">
              <div className="bg-[#141b2e] border border-white/[0.08] rounded-3xl p-4">
                <div className="flex items-center gap-4">
                  <AvatarFrame user={user} frameId={prFrame.id} avatarEmoji={prAvatar.emoji} size="lg" hidePhoto />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">
                      {esEquip ? tr({ es: 'Equipado', en: 'Equipped', ca: 'Equipat' }) : tr({ es: 'Probando', en: 'Trying on', ca: 'Provant' })}
                    </p>
                    <p className="text-white font-black text-lg leading-tight truncate">{nombreDe(actual)}</p>
                    <button
                      type="button"
                      onClick={onAccion}
                      disabled={esEquip || buying || (!esPropio && faltan > 0)}
                      className={`mt-2 w-full py-2.5 rounded-xl text-sm font-black transition-colors flex items-center justify-center gap-1.5 ${
                        esEquip ? 'bg-emerald-500/15 text-emerald-300 cursor-default'
                          : esPropio ? 'bg-violet-600 hover:bg-violet-500 text-white'
                          : faltan > 0 ? 'bg-white/[0.05] text-white/40 cursor-not-allowed'
                          : 'bg-[#EDAE49] hover:bg-amber-400 text-black'
                      }`}
                    >
                      {esEquip ? <>✓ {tr({ es: 'Lo llevas puesto', en: 'You’re wearing it', ca: 'Ja el portes' })}</>
                        : esPropio ? tr({ es: 'Equipar', en: 'Equip', ca: 'Equipar' })
                        : buying ? '…'
                        : faltan > 0 ? <><Moneda className="w-4 h-4 opacity-50" />{tr({ es: `Te faltan ${fmt(faltan)}`, en: `${fmt(faltan)} more needed`, ca: `Et falten ${fmt(faltan)}` })}</>
                        : <>{tr({ es: 'Comprar', en: 'Buy', ca: 'Comprar' })} · <Moneda className="w-4 h-4" />{fmt(actual.price)}</>}
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <FilaRanking banner={prBanner} emoji={prAvatar.emoji} frameColor={prFrame.color} nombre={user.displayName?.split(' ')[0] || 'Tú'} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 mt-3 p-1 bg-[#141b2e] border border-white/[0.08] rounded-2xl">
                {pestañas.map(p => {
                  const c = CATS[p.id]
                  const n = c.items.filter(c.propio).length
                  return (
                    <button key={p.id} type="button" onClick={() => cambiarTab(p.id)}
                      className={`py-2 rounded-xl text-sm font-black transition-colors ${tab === p.id ? 'bg-violet-600 text-white' : 'text-white/50 hover:text-white/80'}`}>
                      {p.label} <span className="text-[10px] font-bold opacity-60 tabular-nums">{n}/{c.items.length}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {coins < 1000 && (
              <Link to={localPath('/diaria')} className="flex items-center gap-3 bg-[#141b2e] border border-orange-500/30 rounded-2xl p-3 mb-5 hover:border-orange-400/60 transition-colors">
                <Rayo className="w-7 h-7 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-orange-300 font-bold text-sm">{tr({ es: '¡Consigue monedas!', en: 'Earn coins!', ca: 'Aconsegueix monedes!' })}</p>
                  <p className="text-white/40 text-xs">{tr({ es: 'El reto diario te da 1.000 monedas.', en: 'The daily challenge gives you 1,000 coins.', ca: 'El repte diari et dona 1.000 monedes.' })}</p>
                </div>
                <span className="text-orange-300 font-black text-sm">→</span>
              </Link>
            )}

            {porTiers(cat.items).map(t => (
              <section key={t.max} className="mb-6">
                <h2 className={`text-[11px] font-black uppercase tracking-widest mb-2 ${t.color}`}>{tr(t.nombre)}</h2>
                <div className={`grid gap-2 ${tab === 'banners' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-4 sm:grid-cols-6'}`}>
                  {t.items.map(it => (
                    <Casilla
                      key={it.id}
                      seleccionada={actual.id === it.id}
                      equipada={cat.equipado(it)}
                      propia={cat.propio(it)}
                      precio={it.price}
                      puedePagar={coins >= it.price}
                      nombre={nombreDe(it)}
                      onClick={() => setProbando(p => ({ ...p, [tab]: it }))}
                    >
                      {tab === 'avatares' && (
                        <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden block"><AvatarDibujo emoji={it.emoji} /></span>
                      )}
                      {tab === 'marcos' && (
                        <span className={`block rounded-full ${it.animated ? 'frame-animated' : ''}`} style={{ ...it.style, padding: 3, width: 52, height: 52 }}>
                          <span className="block w-full h-full rounded-full overflow-hidden"><AvatarDibujo emoji={prAvatar.emoji} /></span>
                        </span>
                      )}
                      {tab === 'banners' && (
                        <span className="w-full"><FilaRanking banner={it} emoji={prAvatar.emoji} frameColor={prFrame.color} nombre="Tuthor" /></span>
                      )}
                    </Casilla>
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#141b2e] border border-white/20 text-white font-semibold px-6 py-3 rounded-2xl text-sm shadow-xl z-50 pointer-events-none">
          {toast}
        </div>
      )}
    </div>
  )
}
