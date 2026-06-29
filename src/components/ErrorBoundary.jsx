import { Component } from 'react'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const UI = {
  es: {
    titulo: '¡Ups! Algo ha ido mal',
    desc: 'Ha ocurrido un error inesperado. Puedes volver al menú principal o probar otro juego.',
    inicio: 'Ir al inicio',
    recargar: 'Recargar esta página',
  },
  en: {
    titulo: 'Oops! Something went wrong',
    desc: 'An unexpected error occurred. You can go back to the main menu or try another game.',
    inicio: 'Go to home',
    recargar: 'Reload this page',
  },
  ca: {
    titulo: 'Ups! Alguna cosa ha anat malament',
    desc: 'S\'ha produït un error inesperat. Pots tornar al menú principal o provar un altre joc.',
    inicio: 'Anar a l\'inici',
    recargar: 'Recarregar aquesta pàgina',
  },
}

function detectLang() {
  const path = window.location.pathname
  if (path.startsWith('/ca')) return 'ca'
  if (path.startsWith('/en')) return 'en'
  return 'es'
}

function getHomePath(lang) {
  if (lang === 'en') return '/en'
  if (lang === 'ca') return '/ca'
  return '/'
}

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    try {
      addDoc(collection(db, 'errors'), {
        message: error?.message || 'Unknown error',
        stack: error?.stack?.slice(0, 1000) || '',
        component: info?.componentStack?.slice(0, 500) || '',
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: serverTimestamp(),
      }).catch(() => {})
    } catch (_) {}
  }

  render() {
    if (!this.state.hasError) return this.props.children

    const lang = detectLang()
    const u = UI[lang] || UI.es
    const home = getHomePath(lang)

    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0a0a1a' }}>
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">😵</p>
          <h1 className="text-2xl font-black text-white mb-2">{u.titulo}</h1>
          <p className="text-white/40 text-sm mb-8">{u.desc}</p>
          <div className="flex flex-col gap-3">
            <a href={home}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-colors text-center">
              {u.inicio}
            </a>
            <button onClick={() => window.location.reload()}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 font-medium py-3 rounded-xl transition-colors">
              {u.recargar}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
