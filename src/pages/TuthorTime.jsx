import { useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'

export default function TuthorTime() {
  const { user } = useAuth()
  const startRef = useRef(Date.now())

  useEffect(() => {
    startRef.current = Date.now()
    return () => {
      const timeSpent = Math.round((Date.now() - startRef.current) / 1000)
      if (user && timeSpent > 10) {
        saveActivity(user.uid, {
          type: 'juego',
          game: 'tuthor-time',
          timeSpent,
        }).catch(() => {})
      }
    }
  }, [user])

  return (
    <div className="fixed inset-0 top-16 z-20">
      <iframe
        src="/games/tuthor-time/index.html"
        className="w-full h-full border-0"
        title="Tuthor Time"
        allow="autoplay"
      />
    </div>
  )
}
