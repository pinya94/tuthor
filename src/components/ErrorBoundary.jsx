import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0a0a1a' }}>
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">😵</p>
          <h1 className="text-2xl font-black text-white mb-2">Algo ha ido mal</h1>
          <p className="text-white/40 text-sm mb-6">Ha ocurrido un error inesperado. Recarga la página para continuar.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Recargar página
          </button>
        </div>
      </div>
    )
  }
}
