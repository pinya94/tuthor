// Helper puro de autenticación. Vive fuera de AuthContext.jsx porque un
// fichero que exporta componentes/hooks y además funciones sueltas rompe el
// fast refresh de Vite (react-refresh/only-export-components).

// Traduce los códigos de error de Firebase y de nuestros endpoints a una clave
// estable que la UI sabe pintar en los 3 idiomas (ver ERRORS en AuthModal.jsx).
//
// Solo cubre los dos carriles que existen: Google y código de hijo. Si algún
// día vuelve el email+contraseña, aquí van sus códigos.
export function authErrorKey(err) {
  switch (err?.code) {
    case 'auth/too-many-requests':      return 'too_many'
    case 'auth/network-request-failed': return 'network'

    // Los que devuelve /api/child-login (ver loginWithChildCode)
    case 'not_found':                   return 'bad_code'
    case 'too_many':                    return 'too_many'

    default: return 'unknown'
  }
}
