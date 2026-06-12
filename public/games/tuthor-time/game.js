const VIDA_BIXO = 120;

function calcularVidaGastada(añoEnvio, añoEvento) {
  const espera = añoEvento - añoEnvio;
  if (añoEnvio > añoEvento) {
    return { resultado: "FALLIDO", mensaje: "Llegaste después del evento." };
  }
  if (espera > VIDA_BIXO) {
    return { resultado: "FALLIDO", mensaje: `El Bixo murió esperando ${espera} años.` };
  }
  return {
    resultado: "ÉXITO",
    vidaGastada: espera,
    vidaRestante: VIDA_BIXO - espera,
    mensaje: espera === 0 ? "¡Llegada perfecta!" : `Gastaste ${espera} años de vida.`
  };
}