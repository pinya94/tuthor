// Helpers puros de autenticación. Viven fuera de AuthContext.jsx porque un
// fichero que exporta componentes/hooks y además funciones sueltas rompe el
// fast refresh de Vite (react-refresh/only-export-components).

// Una cuenta de username tiene un email de mentira (@tuthor.app). Distinguirlo
// importa antes de cobrar y antes de ofrecer "recuperar contraseña": esas
// cuentas no pueden recibir ni una factura ni un enlace de recuperación.
export function hasRealEmail(user) {
  return !!user?.email && !user.email.endsWith('@tuthor.app')
}

// Firebase devuelve códigos poco amistosos y distintos según la versión, y
// nuestros endpoints devuelven los suyos. Los traducimos a una clave estable
// que la UI sabe pintar en los 3 idiomas (ver ERRORS en AuthModal.jsx).
export function authErrorKey(err) {
  switch (err?.code) {
    case 'auth/email-already-in-use':   return 'email_taken'
    case 'auth/invalid-email':          return 'invalid_email'
    case 'auth/weak-password':          return 'weak_password'

    // Con "email enumeration protection" activado (por defecto en proyectos
    // nuevos) Firebase devuelve invalid-credential en vez de distinguir
    // usuario de contraseña, precisamente para no confirmar qué emails
    // existen. Los tres caen en el mismo mensaje ambiguo a propósito.
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':     return 'bad_credentials'

    case 'auth/too-many-requests':      return 'too_many'
    case 'auth/network-request-failed': return 'network'

    // Los que devuelve /api/child-login (ver loginWithChildCode)
    case 'not_found':                   return 'bad_code'
    case 'too_many':                    return 'too_many'

    default: return 'unknown'
  }
}
