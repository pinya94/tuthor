import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Particles from './components/Particles'
import Navbar from './components/Navbar'
import CookieBanner, { useCookieConsent } from './components/CookieBanner'
import ErrorBoundary from './components/ErrorBoundary'
import { LangProvider, useLang } from './context/LangContext'
import { routableExams } from './lib/exams'

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
const ExamenTema         = lazy(() => import('./pages/ExamenTema'))
const CicloOrdenExamen   = lazy(() => import('./pages/CicloOrdenExamen'))
const Perfil             = lazy(() => import('./pages/Perfil'))
const Tienda             = lazy(() => import('./pages/Tienda'))
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
const Portero            = lazy(() => import('./pages/Portero'))
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
const Contacto           = lazy(() => import('./pages/Contacto'))
const Colaborar          = lazy(() => import('./pages/Colaborar'))
const Profesores         = lazy(() => import('./pages/Profesores'))
const ProfesorPanel      = lazy(() => import('./pages/ProfesorPanel'))
const ProfesorClase      = lazy(() => import('./pages/ProfesorClase'))
const Clase              = lazy(() => import('./pages/Clase'))
const ReportarBug        = lazy(() => import('./pages/ReportarBug'))
const PorteroExamen      = lazy(() => import('./pages/PorteroExamen'))
const FuncionesTema       = lazy(() => import('./pages/FuncionesTema'))
const GeoMapaEspanaExamen  = lazy(() => import('./pages/GeoMapaEspanaExamen'))
const GeoMapaEEUUExamen    = lazy(() => import('./pages/GeoMapaEEUUExamen'))
const QuimicaIndex           = lazy(() => import('./pages/QuimicaIndex'))
const EconomiaIndex          = lazy(() => import('./pages/EconomiaIndex'))
const MusicaIndex            = lazy(() => import('./pages/MusicaIndex'))
const VidaPracticaIndex      = lazy(() => import('./pages/VidaPracticaIndex'))
const PrimerosAuxiliosEscenario = lazy(() => import('./pages/PrimerosAuxiliosEscenario'))
const QuimicaTema            = lazy(() => import('./pages/QuimicaTema'))
const GeometriaTema          = lazy(() => import('./pages/GeometriaTema'))
const ElIntruso              = lazy(() => import('./pages/ElIntruso'))
const Spicy                  = lazy(() => import('./pages/Spicy'))
const PentagramaPath         = lazy(() => import('./pages/PentagramaPath'))
const Reaccion               = lazy(() => import('./pages/Reaccion'))
const FuerzaNeta             = lazy(() => import('./pages/FuerzaNeta'))
const Balanza                = lazy(() => import('./pages/Balanza'))
const BalanzaEcuaciones      = lazy(() => import('./pages/BalanzaEcuaciones'))
const FuncionesGrafica       = lazy(() => import('./pages/FuncionesGrafica'))
const BalanzaAlgebraica      = lazy(() => import('./pages/BalanzaAlgebraica'))
const AnalizaFrases          = lazy(() => import('./pages/AnalizaFrases'))
const Diagnostico            = lazy(() => import('./pages/Diagnostico'))
const FraccionesTema         = lazy(() => import('./pages/FraccionesTema'))
const EstadisticaTema        = lazy(() => import('./pages/EstadisticaTema'))
const EnterosRacionalesTema  = lazy(() => import('./pages/EnterosRacionalesTema'))
const AlgebraTema            = lazy(() => import('./pages/AlgebraTema'))
const IdiomasIndex           = lazy(() => import('./pages/IdiomasIndex'))
const EspanolIndex           = lazy(() => import('./pages/EspanolIndex'))
const EspanolGramaticaIndex  = lazy(() => import('./pages/EspanolGramaticaIndex'))
const EspanolGramaticaTema   = lazy(() => import('./pages/EspanolGramaticaTema'))
const EspanolOrtografiaIndex = lazy(() => import('./pages/EspanolOrtografiaIndex'))
const InglesIndex            = lazy(() => import('./pages/InglesIndex'))
const InglesGrammarIndex     = lazy(() => import('./pages/InglesGrammarIndex'))

// Rutas de exámenes generadas desde el registro central (src/lib/exams.js).
// Añadir un examen allí crea su ruta automáticamente.
const EXAM_ROUTES = routableExams().map(e => ({ ...e, Component: lazy(e.page) }))

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
      <Route path="estudiar/economia" element={<EconomiaIndex />} />
      <Route path="estudiar/musica" element={<MusicaIndex />} />
      <Route path="estudiar/vida-practica" element={<VidaPracticaIndex />} />
      <Route path="estudiar/vida-practica/:tema" element={<PrimerosAuxiliosEscenario />} />
      <Route path="estudiar/matematicas" element={<MatematicasIndex />} />
      <Route path="estudiar/matematicas/funciones" element={<FuncionesTema />} />
      <Route path="estudiar/matematicas/geometria" element={<GeometriaTema />} />
      <Route path="estudiar/matematicas/fracciones" element={<FraccionesTema />} />
      <Route path="estudiar/matematicas/estadistica" element={<EstadisticaTema />} />
      <Route path="estudiar/matematicas/enteros-racionales" element={<EnterosRacionalesTema />} />
      <Route path="estudiar/matematicas/algebra" element={<AlgebraTema />} />
      <Route path="estudiar/matematicas/:modo" element={<MatematicasTema />} />
      <Route path="estudiar/matematicas/:modo/jugar" element={<MatematicasPractica />} />
      <Route path="estudiar/matematicas/:modo/examen" element={<ExamenMatematicas />} />

      {/* Exámenes */}
      <Route path="examen/historia" element={<ExamenJuego />} />
      <Route path="examen/linea-temporal" element={<ExamenLineaTemporal />} />
      <Route path="examen/ciclo/:categoria" element={<CicloOrdenExamen />} />
      <Route path="examen/diagnostico" element={<Diagnostico />} />
      <Route path="examen/diagnostico/:diagId" element={<Diagnostico />} />
      {/* Catálogo por tema (src/lib/topicCatalog.js): una ruta por materia */}
      <Route path="examen/historia/:tema/:formato" element={<ExamenTema materia="historia" />} />
      <Route path="examen/matematicas/:tema/:formato" element={<ExamenTema materia="matematicas" />} />
      <Route path="examen/lengua/:tema/:formato" element={<ExamenTema materia="lengua" />} />
      <Route path="examen/geografia/:tema/:formato" element={<ExamenTema materia="geografia" />} />
      <Route path="examen/fisica/:tema/:formato" element={<ExamenTema materia="fisica" />} />
      <Route path="examen/quimica/:tema/:formato" element={<ExamenTema materia="quimica" />} />

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

      {/* ── EXÁMENES (generados desde src/lib/exams.js) ── */}
      {EXAM_ROUTES.map(e => <Route key={e.id} path={e.path} element={<e.Component />} />)}

      {/* ── CIENCIAS (cuatro asignaturas: química, física, biología, geología) ── */}
      <Route path="estudiar/quimica" element={<QuimicaIndex disciplina="quimica" />} />
      <Route path="estudiar/quimica/:tema" element={<QuimicaTema />} />
      <Route path="estudiar/fisica" element={<QuimicaIndex disciplina="fisica" />} />
      <Route path="estudiar/fisica/:tema" element={<QuimicaTema />} />
      <Route path="estudiar/biologia" element={<QuimicaIndex disciplina="biologia" />} />
      <Route path="estudiar/biologia/:tema" element={<QuimicaTema />} />
      <Route path="estudiar/geologia" element={<QuimicaIndex disciplina="geologia" />} />
      <Route path="estudiar/geologia/:tema" element={<QuimicaTema />} />

      {/* ── IDIOMAS ── */}
      <Route path="estudiar/idiomas"                          element={<IdiomasIndex />} />
      <Route path="estudiar/idiomas/espanol"                  element={<EspanolIndex />} />
      <Route path="estudiar/idiomas/espanol/gramatica"        element={<EspanolGramaticaIndex />} />
      <Route path="estudiar/idiomas/espanol/gramatica/:tema"  element={<EspanolGramaticaTema />} />
      <Route path="estudiar/idiomas/espanol/ortografia"       element={<EspanolOrtografiaIndex />} />
      <Route path="estudiar/idiomas/ingles"                   element={<InglesIndex />} />
      <Route path="estudiar/idiomas/ingles/grammar"           element={<InglesGrammarIndex />} />

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
      <Route path="juegos/portero" element={<Portero />} />
      <Route path="juegos/intruso" element={<ElIntruso />} />
      <Route path="juegos/spicy" element={<Spicy />} />
      <Route path="juegos/pentagrama-path" element={<PentagramaPath />} />
      <Route path="juegos/reaccion" element={<Reaccion />} />
      <Route path="juegos/fuerza-neta" element={<FuerzaNeta />} />
      <Route path="juegos/balanza" element={<Balanza />} />
      <Route path="juegos/balanza-ecuaciones" element={<BalanzaEcuaciones />} />
      <Route path="juegos/funciones-grafica" element={<FuncionesGrafica />} />
      <Route path="juegos/balanza-algebraica" element={<BalanzaAlgebraica />} />
      <Route path="juegos/analiza-frases" element={<AnalizaFrases />} />
      <Route path="examen/portero" element={<PorteroExamen />} />
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
      <Route path="tienda" element={<Tienda />} />
      <Route path="privacidad" element={<Privacidad />} />
      <Route path="comunidad" element={<Comunidad />} />
      <Route path="admin" element={<Admin />} />
      <Route path="contacto" element={<Contacto />} />
      <Route path="colaborar" element={<Colaborar />} />
      <Route path="reportar-bug" element={<ReportarBug />} />
      <Route path="profesores" element={<Profesores />} />
      <Route path="profesor" element={<ProfesorPanel />} />
      <Route path="profesor/clase/:classId" element={<ProfesorClase />} />
      <Route path="clase" element={<Clase />} />
    </>
  )
}

function NotFound() {
  const { tr, localPath } = useLang()
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-black text-white mb-2">
        {tr({ es: 'Página no encontrada', en: 'Page not found', ca: 'Pàgina no trobada' })}
      </h1>
      <p className="text-white/40 mb-6 text-sm">
        {tr({ es: 'Esta página no existe o fue eliminada.', en: 'This page does not exist or was removed.', ca: 'Aquesta pàgina no existeix o ha estat eliminada.' })}
      </p>
      <a href={localPath('/')} className="bg-[#EDAE49] text-black font-black px-6 py-3 rounded-2xl hover:bg-amber-400 transition-colors">
        {tr({ es: '← Volver al inicio', en: '← Back to home', ca: "← Tornar a l'inici" })}
      </a>
    </div>
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
              <Route path="*" element={<NotFound />} />
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
