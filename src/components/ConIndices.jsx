// Texto con superíndices/subíndices Unicode → JSX con <sup>/<sub>.
// Los Unicode ⁴-⁹ y ₀-₉ salen con otra fuente («2p⁶» se lee «2pᶜ»).
const SUPS = '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻', SUBS = '₀₁₂₃₄₅₆₇₈₉'
const PLANO = '0123456789+−'
export default function ConIndices({ texto }) {
  const trozos = texto.split(/([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+|[₀₁₂₃₄₅₆₇₈₉]+)/)
  return trozos.map((t, i) => {
    if (!t) return null
    if (SUPS.includes(t[0])) return <sup key={i} className="text-[0.68em]">{[...t].map(c => PLANO[SUPS.indexOf(c)]).join('')}</sup>
    if (SUBS.includes(t[0])) return <sub key={i} className="text-[0.68em]">{[...t].map(c => PLANO[SUBS.indexOf(c)]).join('')}</sub>
    return t
  })
}
