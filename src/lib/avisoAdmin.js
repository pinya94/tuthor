// Pide al servidor que avise por correo al administrador de algo nuevo (un
// mensaje de contacto, un bug, una colaboración o un alta de profe). Solo se
// manda el tipo y el id: el servidor (api/aviso.js) lee el documento él mismo,
// así que desde aquí no se puede hacer que mande un texto inventado. Si falla
// o el correo no está configurado, no pasa nada: el mensaje ya está guardado.
export function avisarAdmin(tipo, id) {
  fetch('/api/aviso', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tipo, id }),
    keepalive: true,
  }).catch(() => {})
}
