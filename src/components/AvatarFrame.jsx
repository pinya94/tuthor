import { FRAME_BY_ID, DEFAULT_AVATAR_EMOJI } from '../data/cosmetics'
import AvatarDibujo from './avatares/AvatarDibujo'

/**
 * Avatar circular con el marco equipado.
 * size: 'sm' (40px) | 'md' (56px) | 'lg' (72px)
 */
export default function AvatarFrame({ user, frameId = 'default', avatarEmoji = null, size = 'lg', hidePhoto = false }) {
  const frame = FRAME_BY_ID[frameId] ?? FRAME_BY_ID['default']
  const px = size === 'sm' ? 40 : size === 'md' ? 56 : 72
  const pad = 3
  const inner = px - pad * 2
  const showPhoto = !hidePhoto && user?.photoURL

  return (
    <div
      className={frame.animated ? 'frame-animated' : ''}
      style={{ ...frame.style, padding: pad, borderRadius: '50%', width: px, height: px, flexShrink: 0 }}
    >
      {showPhoto
        ? <img
            src={user.photoURL}
            alt=""
            style={{ width: inner, height: inner, borderRadius: '50%', display: 'block', objectFit: 'cover' }}
          />
        : <div
            style={{ width: inner, height: inner, borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#7c3aed' }}
          >
            <AvatarDibujo emoji={avatarEmoji ?? DEFAULT_AVATAR_EMOJI} fallbackSize={inner / 1.8} />
          </div>
      }
    </div>
  )
}
