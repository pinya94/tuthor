import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { captureReferralFromUrl } from './lib/referral.js'

// Antes de renderizar nada: si alguien llega con ?ref=<uid> en la URL (un
// enlace de invitación), se guarda para cuando —si algún día— se registre.
// No depende del ciclo de vida de React porque no necesita re-renderizar
// nada al hacerlo, solo dejar constancia antes de que el router toque la URL.
captureReferralFromUrl()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
