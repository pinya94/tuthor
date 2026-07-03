import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Particles from './components/Particles'
import Navbar from './components/Navbar'
import CookieBanner, { useCookieConsent } from './components/CookieBanner'
import ErrorBoundary from './components/ErrorBoundary'
import { LangProvider } from './context/LangContext'

// Lazy-loaded pages — only downloaded when the user navigates to them
const Home               = lazy(() => import('./pages/Home'))
const Estudiar           = lazy(() => import('./pages/Estudiar'))
const HistoriaIndex      = lazy(() => import('./pages/HistoriaIndex'))
const HistoriaTema       = lazy(() => import('./pages/HistoriaTema'))
const MatematicasIndex   = lazy(() => import('./pages/MatematicasIndex'))
const MatematicasTema    = lazy(() => import('./pages/MatematicasTema'))
const MatematicasPractica= lazy(() => import('./pages/MatematicasPractica'))
const ExamenMatematicas  = lazy(() => import('./pages/ExamenMatematicas'))
const Juegos             = lazy(() => import('./pages/Juegos'))
const PreguntaDiaria     = lazy(() => import('./pages/PreguntaDiaria'))
const Progreso           = lazy(() => import('./pages/Progreso'))
const ExamenJuego        = lazy(() => import('./pages/ExamenJuego'))
const TuthorTime         = lazy(() => import('./pages/TuthorTime'))
const TuthorTimeRoguelike= lazy(() => import('./pages/TuthorTimeRoguelike'))
const OrdenTemporal      = lazy(() => import('./pages/OrdenTemporal'))
const ExamenLineaTemporal= lazy(() => import('./pages/ExamenLineaTemporal'))
const Perfil             = lazy(() => import('./pages/Perfil'))
const QuienEsQuien       = lazy(() => import('./pages/QuienEsQuien'))
const Acercate           = lazy(() => import('./pages/Acercate'))
const AcercateRoguelike  = lazy(() => import('./pages/AcercateRoguelike'))
const Portadas           = lazy(() => import('./pages/Portadas'))
const PortadasExamen     = lazy(() => import('./pages/PortadasExamen'))
const GeoRush            = lazy(() => import('./pages/GeoRush'))
const GeoMapa            = lazy(() => import('./pages/GeoMapa'))
const NumPath            = lazy(() => import('./pages/NumPath'))
const Trayectoria        = lazy(() => import('./pages/Trayectoria'))
const TrayectoriaExamen  = lazy(() => import('./pages/TrayectoriaExamen'))
const InfoJuegosHub      = lazy(() => import('./pages/InfoJuegosHub'))
const InfoJuegoFicha     = lazy(() => import('./pages/InfoJuegoFicha'))
const GeografiaIndex     = lazy(() => import('./pages/GeografiaIndex'))
const GeografiaTema      = lazy(() => import('./pages/GeografiaTema'))
const GeoRushExamen      = lazy(() => import('./pages/GeoRushExamen'))
const GeoMapaExamen      = lazy(() => import('./pages/GeoMapaExamen'))
const InfoEstudiar       = lazy(() => import('./pages/InfoEstudiar'))
const InfoEstudiarFicha  = lazy(() => import('./pages/InfoEstudiarFicha'))
const InfoDiaria         = lazy(() => import('./pages/InfoDiaria'))
const Privacidad         = lazy(() => import('./pages/Privacidad'))
const Comunidad          = lazy(() => import('./pages/Comunidad'))
const Admin              = lazy(() => import('./pages/Admin'))
const FuncionesTema       = lazy(() => import('./pages/FuncionesTema'))
const GeoMapaEspanaExamen  = lazy(() => import('./pages/GeoMapaEspanaExamen'))
const GeoMapaEEUUExamen    = lazy(() => import('./pages/GeoMapaEEUUExamen'))
const QuimicaIndex           = lazy(() => import('./pages/QuimicaIndex'))
const QuimicaTema            = lazy(() => import('./pages/QuimicaTema'))
const TablaPeriodicaExamen   = lazy(() => import('./pages/TablaPeriodicaExamen'))
const EstadosMateriaExamen   = lazy(() => import('./pages/EstadosMateriaExamen'))
const MezclasExamen          = lazy(() => import('./pages/MezclasExamen'))
const AcidosBasesExamen      = lazy(() => import('./pages/AcidosBasesExamen'))
const AtomosMoleculasExamen  = lazy(() => import('./pages/AtomosMoleculasExamen'))
const SistemaSolarExamen     = lazy(() => import('./pages/SistemaSolarExamen'))
const LaCelulaExamen         = lazy(() => import('./pages/LaCelulaExamen'))
const GeometriaExamen        = lazy(() => import('./pages/GeometriaExamen'))
const GeometriaTema          = lazy(() => import('./pages/GeometriaTema'))
const FuncionesExamen        = lazy(() => import('./pages/FuncionesExamen'))
const CuerpoHumanoExamen     = lazy(() => import('./pages/CuerpoHumanoExamen'))
const SeresVivosExamen       = lazy(() => import('./pages/SeresVivosExamen'))
const EcosistemasExamen      = lazy(() => import('./pages/EcosistemasExamen'))
const GeneticaExamen         = lazy(() => import('./pages/GeneticaExamen'))
const NutricionExamen        = lazy(() => import('./pages/NutricionExamen'))
const FuerzasExamen          = lazy(() => import('./pages/FuerzasExamen'))
const EnergiaExamen          = lazy(() => import('./pages/EnergiaExamen'))
const ElectricidadExamen     = lazy(() => import('./pages/ElectricidadExamen'))
const OndasLuzExamen         = lazy(() => import('./pages/OndasLuzExamen'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-8 h-8 border-2 border-white/20 border-t-[#EDAE49] rounded-full animate-spin" />
    </div>
  )
}

function AppRoutes() {
  return (
    <>
      <Route index element={<Home />} />

      {/* ── ESTUDIAR ── */}
      <Route path="estudiar" element={<Estudiar />} />
      <Route path="estudiar/historia" element={<HistoriaIndex />} />
      <Route path="estudiar/historia/:categoria" element={<HistoriaTema />} />
      <Route path="estudiar/matematicas" element={<MatematicasIndex />} />
      <Route path="estudiar/matematicas/funciones" element={<FuncionesTema />} />
      <Route path="estudiar/matematicas/geometria" element={<GeometriaTema />} />
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

      {/* ── CIENCIAS ── */}
      <Route path="estudiar/quimica" element={<QuimicaIndex />} />
      <Route path="estudiar/quimica/:tema" element={<QuimicaTema />} />
      <Route path="examen/tabla-periodica"   element={<TablaPeriodicaExamen />} />
      <Route path="examen/estados-materia"  element={<EstadosMateriaExamen />} />
      <Route path="examen/mezclas-separacion" element={<MezclasExamen />} />
      <Route path="examen/acidos-bases"     element={<AcidosBasesExamen />} />
      <Route path="examen/atomos-moleculas" element={<AtomosMoleculasExamen />} />
      <Route path="examen/sistema-solar"   element={<SistemaSolarExamen />} />
      <Route path="examen/celula"          element={<LaCelulaExamen />} />
      <Route path="examen/geometria"       element={<GeometriaExamen />} />
      <Route path="examen/funciones"       element={<FuncionesExamen />} />
      <Route path="examen/cuerpo-humano"   element={<CuerpoHumanoExamen />} />
      <Route path="examen/seres-vivos"     element={<SeresVivosExamen />} />
      <Route path="examen/ecosistemas"     element={<EcosistemasExamen />} />
      <Route path="examen/genetica"        element={<GeneticaExamen />} />
      <Route path="examen/nutricion"       element={<NutricionExamen />} />
      <Route path="examen/fuerzas"         element={<FuerzasExamen />} />
      <Route path="examen/energia"         element={<EnergiaExamen />} />
      <Route path="examen/electricidad"    element={<ElectricidadExamen />} />
      <Route path="examen/ondas-luz"       element={<OndasLuzExamen />} />

      {/* ── GEOGRAFÍA ── */}
      <Route path="estudiar/geografia" element={<GeografiaIndex />} />
      <Route path="estudiar/geografia/:region" element={<GeografiaTema />} />
      <Route path="examen/geografia" element={<GeoRushExamen />} />
      <Route path="examen/geomapa" element={<GeoMapaExamen />} />
      <Route path="examen/geomapa-espana" element={<GeoMapaEspanaExamen />} />
      <Route path="examen/geomapa-eeuu"   element={<GeoMapaEEUUExamen />} />
      <Route path="juegos/georush" element={<GeoRush />} />
      <Route path="juegos/geomapa" element={<GeoMapa />} />
      <Route path="juegos/numpath" element={<NumPath />} />
      <Route path="juegos/trayectoria" element={<Trayectoria />} />
      <Route path="examen/trayectoria" element={<TrayectoriaExamen />} />

      {/* ── INFO / SEO ── */}
      <Route path="info/juegos" element={<InfoJuegosHub />} />
      <Route path="info/juegos/:slug" element={<InfoJuegoFicha />} />
      <Route path="info/estudiar" element={<InfoEstudiar />} />
      <Route path="info/estudiar/:slug" element={<InfoEstudiarFicha />} />
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
    <ErrorBoundary>
    <LangProvider>
      <div className="min-h-screen font-sans" style={{ position: 'relative' }}>
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(/fondo.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
          }}
        />
        <Particles />
        <div className="relative z-10">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Rutas en español (por defecto) */}
              <Route path="/">{AppRoutes()}</Route>
              {/* Rutas en inglés (prefijo /en) */}
              <Route path="/en">{AppRoutes()}</Route>
              {/* Catalán — rutas activas pero selector oculto hasta completar traducción */}
              <Route path="/ca">{AppRoutes()}</Route>
            </Routes>
          </Suspense>
        </div>
        <CookieBanner onConsent={onConsent} />
      </div>
    </LangProvider>
    </ErrorBoundary>
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
