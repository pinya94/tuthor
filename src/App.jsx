import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Particles from './components/Particles'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Estudiar from './pages/Estudiar'
import HistoriaIndex from './pages/HistoriaIndex'
import HistoriaTema from './pages/HistoriaTema'
import Juegos from './pages/Juegos'
import PreguntaDiaria from './pages/PreguntaDiaria'
import Progreso from './pages/Progreso'
import ExamenJuego from './pages/ExamenJuego'
import TuthorTime from './pages/TuthorTime'
import OrdenTemporal from './pages/OrdenTemporal'
import ExamenLineaTemporal from './pages/ExamenLineaTemporal'
import Perfil from './pages/Perfil'

function Layout() {
  return (
    <div className="min-h-screen font-sans" style={{ position: 'relative' }}>
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/fondo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
        }}
      />
      <Particles />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ── ESTUDIAR ── */}
          <Route path="/estudiar" element={<Estudiar />} />
          <Route path="/estudiar/historia" element={<HistoriaIndex />} />
          <Route path="/estudiar/historia/:categoria" element={<HistoriaTema />} />

          {/* Exámenes */}
          <Route path="/examen/historia" element={<ExamenJuego />} />
          <Route path="/examen/linea-temporal" element={<ExamenLineaTemporal />} />

          {/* ── JUEGOS ── */}
          <Route path="/juegos" element={<Juegos />} />
          <Route path="/juegos/tuthor-time" element={<TuthorTime />} />
          <Route path="/juegos/linea-temporal" element={<OrdenTemporal />} />

          {/* ── OTRAS ── */}
          <Route path="/diaria" element={<PreguntaDiaria />} />
          <Route path="/progreso" element={<Progreso />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Analytics />
    </BrowserRouter>
  )
}
