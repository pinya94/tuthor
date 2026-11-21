// Ilustración sintética de una muestra de mano.
export default function MuestraRoca({ roca, aria, ronda }) {
  const variante = ronda % 2 === 1 ? '-2' : ''
  return (
    <img src={`/ciclo-rocas/${roca}${variante}.webp`} alt={aria}
      className="block w-full h-auto max-h-[150px] object-contain rounded-md" draggable={false} />
  )
}
