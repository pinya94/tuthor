import { useNavigate } from 'react-router-dom'

const SECTIONS = [
  {
    title: '1. Responsable del tratamiento',
    content: `El responsable del tratamiento de los datos personales recogidos a través de Tuthor es el equipo de Tuthor, contactable a través del correo electrónico de soporte de la aplicación.`,
  },
  {
    title: '2. Datos que recopilamos',
    content: `Recopilamos únicamente los datos necesarios para el funcionamiento del servicio:
• Cuenta de usuario: nombre y foto de perfil cuando te registras con Google (gestionado por Firebase Authentication).
• Datos de uso: progreso, rachas y resultados de exámenes, almacenados en Firestore asociados a tu cuenta.
• Analítica anónima: mediante Vercel Analytics y Google Analytics recopilamos métricas de uso agregadas (páginas visitadas, dispositivo, país) sin identificarte de forma personal.
• Publicidad: si aceptas la categoría "Publicidad", nuestros proveedores pueden tratar identificadores de tu navegador para mostrarte anuncios adaptados. Si no la aceptas, los anuncios se sirven sin personalizar.`,
  },
  {
    title: '3. Finalidad y base jurídica',
    content: `Tratamos tus datos para:
• Prestar el servicio educativo y personalizar tu experiencia (base: ejecución de contrato / interés legítimo).
• Mejorar la aplicación mediante analítica agregada, solo con tu consentimiento previo (base: consentimiento, art. 6.1.a RGPD).`,
  },
  {
    title: '4. Cookies y tecnologías similares',
    content: `Tuthor usa las siguientes categorías de cookies:
• Esenciales: necesarias para la sesión de usuario y el correcto funcionamiento de la app. No requieren consentimiento.
• Analítica: Vercel Analytics y Google Analytics utilizan cookies para medir el uso agregado de la aplicación. Solo se activan si das tu consentimiento en el banner de cookies.
• Publicidad: Google AdSense y sus proveedores asociados pueden usar cookies e identificadores similares para mostrar y medir anuncios. Solo se activa la personalización si aceptas expresamente la categoría "Publicidad"; en caso contrario los anuncios se sirven sin personalizar. Google utiliza la cookie DoubleClick con esta finalidad.
Puedes retirar o modificar tu consentimiento en cualquier momento desde el pie de página de la aplicación.`,
  },
  {
    title: '5. Publicidad y menores',
    content: `Tuthor se financia en parte con publicidad y con enlaces de afiliación (marcados como "Patrocinado"), lo que nos permite mantener el contenido educativo gratuito. La suscripción Pro elimina la publicidad.
Dado que parte de nuestro público es menor de edad, la publicidad se solicita SIN personalizar de forma predeterminada y nunca activamos la personalización sin un consentimiento expreso previo.
Puedes consultar cómo trata Google los datos de sus socios publicitarios en policies.google.com/technologies/partner-sites.`,
  },
  {
    title: '6. Conservación de datos',
    content: `Los datos de tu cuenta se conservan mientras mantengas una cuenta activa en Tuthor. Puedes solicitar la eliminación de tu cuenta y todos los datos asociados contactando con nosotros.`,
  },
  {
    title: '7. Tus derechos (RGPD)',
    content: `Tienes derecho a acceder, rectificar, suprimir, oponerte y solicitar la portabilidad de tus datos, así como a retirar el consentimiento en cualquier momento sin que ello afecte a la licitud del tratamiento previo. Para ejercer tus derechos, contáctanos por correo electrónico. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).`,
  },
  {
    title: '8. Transferencias internacionales',
    content: `Firebase, Vercel y Google pueden procesar datos en servidores fuera de la UE. Ambas plataformas cuentan con mecanismos de transferencia adecuados (cláusulas contractuales tipo aprobadas por la Comisión Europea).`,
  },
  {
    title: '9. Cambios en esta política',
    content: `Podemos actualizar esta política para reflejar cambios en la app o en la normativa. La fecha de última actualización aparece al final del documento. El uso continuado de Tuthor tras la actualización implica la aceptación de los cambios.`,
  },
]

export default function Privacidad() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen px-4 py-10 sm:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔒</span>
            <h1 className="text-white font-bold text-2xl">Política de privacidad y cookies</h1>
          </div>
          <p className="text-white/30 text-xs mb-8">Última actualización: agosto 2026</p>

          <p className="text-white/60 text-sm leading-relaxed mb-8">
            En Tuthor nos tomamos muy en serio la privacidad de nuestros usuarios. Este documento explica qué datos
            recopilamos, cómo los usamos y cuáles son tus derechos conforme al Reglamento General de Protección de
            Datos (RGPD) y la Ley de Servicios de la Sociedad de la Información (LSSI-CE).
          </p>

          <div className="flex flex-col gap-6">
            {SECTIONS.map(s => (
              <div key={s.title}>
                <h2 className="text-white font-semibold text-sm mb-2">{s.title}</h2>
                <p className="text-white/50 text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
