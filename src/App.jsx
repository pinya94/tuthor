import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Particles from './components/Particles'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Estudiar from './pages/Estudiar'
import HistoriaIndex from './pages/HistoriaIndex'
import HistoriaTema from './pages/HistoriaTema'
import MatematicasIndex from './pages/MatematicasIndex'
import MatematicasTema from './pages/MatematicasTema'
import MatematicasPractica from './pages/MatematicasPractica'
import Juegos from './pages/Juegos'
import PreguntaDiaria from './pages/PreguntaDiaria'
import Progreso from './pages/Progreso'
import ExamenJuego from './pages/ExamenJuego'
import TuthorTime from './pages/TuthorTime'
import TuthorTimeRoguelike from './pages/TuthorTimeRoguelike'
import OrdenTemporal from './pages/OrdenTemporal'
import ExamenLineaTemporal from './pages/ExamenLineaTemporal'
import Perfil from './pages/Perfil'
import QuienEsQuien from './pages/QuienEsQuien'
import Acercate from './pages/Acercate'
import ExamenMatematicas from './pages/ExamenMatematicas'
import AcercateRoguelike from './pages/AcercateRoguelike'
import Portadas from './pages/Portadas'
import PortadasExamen from './pages/PortadasExamen'
import GeoRush from './pages/GeoRush'
import NumPath from './pages/NumPath'
import InfoJuegosHub from './pages/InfoJuegosHub'
import InfoJuegoFicha from './pages/InfoJuegoFicha'
import GeografiaIndex from './pages/GeografiaIndex'
import GeografiaTema from './pages/GeografiaTema'
import GeoRushExamen from './pages/GeoRushExamen'
import InfoEstudiar from './pages/InfoEstudiar'
import InfoDiaria from './pages/InfoDiaria'
import Privacidad from './pages/Privacidad'
import Comunidad from './pages/Comunidad'
import Admin from './pages/Admin'
import CookieBanner, { useCookieConsent } from './components/CookieBanner'
import { LangProvider } from './context/LangContext'

function AppRoutes() {
  return (
    <>
      <Route index element={<Home />} />

      {/* ── ESTUDIAR ── */}
      <Route path="estudiar" element={<Estudiar />} />
      <Route path="estudiar/historia" element={<HistoriaIndex />} />
      <Route path="estudiar/historia/:categoria" element={<HistoriaTema />} />
      <Route path="estudiar/matematicas" element={<MatematicasIndex />} />
      <Route path="estudiar/matematicas/:modo" element={<MatematicasTema />} />
      <Route path="estudiar/matematicas/:modo/jugar" element={<MatematicasPractica />} />
      <Route path="estudiar/matematicas/:modo/examen" element={<ExamenMatematicas />} />

      {/* Exámenes */}
      <Route path="examen/historia" element={<ExamenJuego />} />
      <Route path="examen/linea-temporal" element={<ExamenLineaTemporal />} />

      {/* ── JUEGOS ── */}
      <Route path="juegos" element={<Juegos />} />
      <Route path="juegos/tuthor-time" element={<TuthorTimeRoguelike />} />
      <Route path="juegos/tuthor-time/clasico" element={<TuthorTime />} />
      <Route path="juegos/linea-temporal" element={<OrdenTemporal />} />
      <Route path="juegos/quien-es-quien" element={<QuienEsQuien />} />
      <Route path="juegos/acercate" element={<AcercateRoguelike />} />
      <Route path="juegos/acercate/clasico" element={<Acercate />} />
      <Route path="juegos/portadas" element={<Portadas />} />
      <Route path="examen/portadas" element={<PortadasExamen />} />

      {/* ── GEOGRAFÍA ── */}
      <Route path="estudiar/geografia" element={<GeografiaIndex />} />
      <Route path="estudiar/geografia/:region" element={<GeografiaTema />} />
      <Route path="examen/geografia" element={<GeoRushExamen />} />
      <Route path="juegos/georush" element={<GeoRush />} />
      <Route path="juegos/numpath" element={<NumPath />} />

      {/* ── INFO / SEO ── */}
      <Route path="info/juegos" element={<InfoJuegosHub />} />
      <Route path="info/juegos/:slug" element={<InfoJuegoFicha />} />
      <Route path="info/estudiar" element={<InfoEstudiar />} />
      <Route path="info/diaria" element={<InfoDiaria />} />

      {/* ── OTRAS ── */}
      <Route path="diaria" element={<PreguntaDiaria />} />
      <Route path="progreso" element={<Progreso />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="privacidad" element={<Privacidad />} />
      <Route path="comunidad" element={<Comunidad />} />
      <Route path="admin" element={<Admin />} />
    </>
  )
}

function Layout({ onConsent }) {
  return (
    <LangProvider>
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
            {/* Rutas en español (por defecto) */}
            <Route path="/">{AppRoutes()}</Route>
            {/* Rutas en inglés (prefijo /en) */}
            <Route path="/en">{AppRoutes()}</Route>
          </Routes>
        </div>
        <CookieBanner onConsent={onConsent} />
      </div>
    </LangProvider>
  )
}

export default function App() {
  const saved = useCookieConsent()
  const [consent, setConsent] = useState(saved)
  const analyticsEnabled = consent?.analytics !== false

  return (
    <BrowserRouter>
      <Layout onConsent={setConsent} />
      <Analytics disabled={!analyticsEnabled} />
    </BrowserRouter>
  )
}
