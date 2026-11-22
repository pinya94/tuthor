// Cómo se pone un acorde en el instrumento con el que la clase toca la voz de
// acordes: trastes del ukelele (Sol Do Mi La) o de la guitarra (Mi La Re Sol
// Si Mi), o las teclas del piano. Cifrado americano (G, D7…) con el nombre
// latino al lado.

// Traste de cada cuerda, de la más grave a la más aguda (0 = al aire, -1 = no se toca)
const POSICIONES = {
  ukelele: { G: [0, 2, 3, 2], D7: [2, 0, 2, 0], F: [2, 0, 1, 0], C7: [0, 0, 0, 1], C: [0, 0, 0, 3] },
  guitarra: { G: [3, 2, 0, 0, 0, 3], D7: [-1, -1, 0, 2, 1, 2], F: [1, 3, 3, 2, 1, 1], C7: [-1, 3, 2, 3, 1, 0], C: [-1, 3, 2, 0, 1, 0] },
}
// Notas (clase de altura, 0 = Do) de cada acorde, para el piano
const NOTAS = { G: [7, 11, 2], D7: [2, 6, 9, 0], F: [5, 9, 0], C7: [0, 4, 7, 10], C: [0, 4, 7] }
const LATINO = { G: 'Sol', D7: 'Re7', F: 'Fa', C7: 'Do7', C: 'Do' }
const NOMBRE_NOTA = { es: ['Do', 'Do♯', 'Re', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'Si♭', 'Si'], en: ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'B♭', 'B'] }

export const INSTRUMENTOS_ACORDES = ['ukelele', 'guitarra', 'piano']

function Mastil({ trastes }) {
  const cuerdas = trastes.length
  const ancho = (cuerdas - 1) * 14
  const x = i => 12 + i * 14, y = f => 18 + f * 16
  return (
    <svg viewBox={`0 0 ${ancho + 24} 90`} className="h-28 mx-auto" aria-hidden="true">
      <rect x="10" y="16" width={ancho + 4} height="4" fill="#E2E8F0" />
      {[1, 2, 3, 4].map(f => <line key={f} x1="12" x2={12 + ancho} y1={y(f)} y2={y(f)} stroke="#94A3B8" strokeWidth="1.5" />)}
      {trastes.map((_, i) => <line key={i} x1={x(i)} x2={x(i)} y1="18" y2={y(4)} stroke="#CBD5E1" strokeWidth="1.5" />)}
      {trastes.map((f, i) => (f < 0
        ? <text key={i} x={x(i)} y="12" textAnchor="middle" fontSize="10" fill="#F87171" fontWeight="900">×</text>
        : f === 0
          ? <circle key={i} cx={x(i)} cy="9" r="3.5" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          : <circle key={i} cx={x(i)} cy={y(f) - 8} r="5" fill="#EDAE49" />))}
    </svg>
  )
}

function Teclado({ notas }) {
  const blancas = [0, 2, 4, 5, 7, 9, 11]
  const negras = [[1, 0], [3, 1], [6, 3], [8, 4], [10, 5]] // [nota, tras la blanca nº]
  const on = pc => notas.includes(pc)
  return (
    <svg viewBox="0 0 120 64" className="h-20 mx-auto" aria-hidden="true">
      {blancas.map((pc, i) => <rect key={pc} x={2 + i * 16.5} y="2" width="16" height="58" rx="2" fill={on(pc) ? '#EDAE49' : '#F8FAFC'} stroke="#475569" />)}
      {negras.map(([pc, i]) => <rect key={pc} x={2 + (i + 1) * 16.5 - 5} y="2" width="10" height="36" rx="1.5" fill={on(pc) ? '#B45309' : '#0F172A'} />)}
    </svg>
  )
}

export default function DiagramaAcorde({ instrumento, cifra, l = 'es' }) {
  const nombre = l === 'en' ? cifra : `${LATINO[cifra] ?? cifra} (${cifra})`
  const notas = NOTAS[cifra] ?? []
  const nn = NOMBRE_NOTA[l === 'en' ? 'en' : 'es']
  return (
    <figure className="text-center">
      {instrumento === 'piano'
        ? <Teclado notas={notas} />
        : POSICIONES[instrumento]?.[cifra] ? <Mastil trastes={POSICIONES[instrumento][cifra]} /> : null}
      <figcaption className="text-white font-black text-sm">{nombre}</figcaption>
      <p className="text-white/45 text-[11px]">{notas.map(pc => nn[pc]).join(' · ')}</p>
    </figure>
  )
}
