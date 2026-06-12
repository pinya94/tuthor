import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Particles from './components/Particles'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Estudiar from './pages/Estudiar'
import Nivel from './pages/Nivel'
import Juegos from './pages/Juegos'
import PreguntaDiaria from './pages/PreguntaDiaria'
import Progreso from './pages/Progreso'
import HistoriaLanding from './pages/HistoriaLanding'
import ExamenHistoria from './pages/ExamenHistoria'
import ExamenJuego from './pages/ExamenJuego'
import TuthorTime from './pages/TuthorTime'
import OrdenTemporal from './pages/OrdenTemporal'
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
          <Route path="/estudiar" element={<Estudiar />} />

          {/* Primaria */}
          <Route path="/estudiar/primaria" element={<Nivel title="Primaria" nivel="primaria" />} />
          <Route path="/estudiar/primaria/historia" element={<HistoriaLanding nivel="primaria" title="Primaria" />} />
          <Route path="/estudiar/primaria/historia/fechas" element={<ExamenHistoria nivel="primaria" />} />

          {/* ESO */}
          <Route path="/estudiar/eso" element={<Nivel title="ESO" nivel="eso" />} />
          <Route path="/estudiar/eso/historia" element={<HistoriaLanding nivel="eso" title="ESO" />} />
          <Route path="/estudiar/eso/historia/fechas" element={<ExamenHistoria nivel="eso" />} />

          {/* Bachillerato */}
          <Route path="/estudiar/bachillerato" element={<Nivel title="Bachillerato" nivel="bachillerato" />} />
          <Route path="/estudiar/bachillerato/historia" element={<HistoriaLanding nivel="bachillerato" title="Bachillerato" />} />
          <Route path="/estudiar/bachillerato/historia/fechas" element={<ExamenHistoria nivel="bachillerato" />} />

          {/* Examen */}
          <Route path="/examen/historia" element={<ExamenJuego />} />

          <Route path="/juegos" element={<Juegos />} />
          <Route path="/juegos/tuthor-time" element={<TuthorTime />} />
          <Route path="/juegos/linea-temporal" element={<OrdenTemporal />} />
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
    </BrowserRouter>
  )
}
