import InglesPiezasExamenBase from './InglesPiezasExamenBase'

// Examen con la mecánica de La Pieza que Falta, fijado a este tema.
// Toda la lógica está en la base; aquí solo vive la pareja tema ↔ id de stats.
export default function InglesPiezasConditionalsExamen() {
  return <InglesPiezasExamenBase tema="conditionals" gameId="ingles-piezas-conditionals-test" />
}
