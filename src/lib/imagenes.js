// Comprimir una imagen en el navegador antes de guardarla en Firestore
// (imagenesExamen, ver examenesProfesor.js). Un documento admite 1 MB; se
// apunta a unos 300 KB para ir sobrados y que el examen cargue rápido en el
// móvil de un alumno.
//
// Las fotos se guardan en WebP (o JPEG si el navegador no sabe) bajando la
// calidad hasta caber; los dibujos de la pizarra, en PNG si sale más pequeño,
// porque las líneas finas con fondo liso comprimen mejor así y no se emborronan.

const LADO_MAX = 1200
const OBJETIVO = 300 * 1024

function aImagen(fuente) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(fuente)
    const img = new Image()
    img.onload = () => { URL.revokeObjectURL(url); res(img) }
    img.onerror = e => { URL.revokeObjectURL(url); rej(e) }
    img.src = url
  })
}

const bytes = dataUrl => Math.round((dataUrl.length - dataUrl.indexOf(',') - 1) * 0.75)

function lienzo(src, w, h, fondoBlanco) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')
  if (fondoBlanco) { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h) }
  ctx.drawImage(src, 0, 0, w, h)
  return c
}

// `fuente`: un File/Blob (foto subida) o un <canvas> (dibujo de la pizarra).
export async function comprimirImagen(fuente, { esDibujo = false } = {}) {
  const src = fuente instanceof HTMLCanvasElement ? fuente : await aImagen(fuente)
  const ow = src.width, oh = src.height
  let escala = Math.min(1, LADO_MAX / Math.max(ow, oh))
  for (let intento = 0; intento < 6; intento++) {
    const w = Math.max(1, Math.round(ow * escala)), h = Math.max(1, Math.round(oh * escala))
    const c = lienzo(src, w, h, true)
    const candidatas = []
    if (esDibujo) candidatas.push(c.toDataURL('image/png'))
    for (const q of [0.85, 0.75, 0.6, 0.5]) {
      let d = c.toDataURL('image/webp', q)
      if (!d.startsWith('data:image/webp')) d = c.toDataURL('image/jpeg', q)
      candidatas.push(d)
      if (bytes(d) <= OBJETIVO) break
    }
    const mejor = candidatas.sort((a, b) => bytes(a) - bytes(b))[0]
    if (bytes(mejor) <= OBJETIVO) return { data: mejor, w, h }
    escala *= 0.75
  }
  throw new Error('imagen demasiado grande')
}
