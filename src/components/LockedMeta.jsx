import SEOHead from './SEOHead'
import QuizSchema from './QuizSchema'
import { normalizePath } from '../lib/paidRoutes'
// resolveMeta vive en scripts/ porque lo usa el prerender (Node) y los tests
// de invariantes, pero es un módulo puro (sin I/O). Es la MISMA fuente que usa
// el prerender para title/desc, así que no hay dos ideas distintas de la meta
// de una URL.
//
// Este componente va en su propio fichero y AccessGate lo carga con lazy():
// seoMeta importa TODAS las fichas, resúmenes y registros (≈2 MB), y cuando
// estaba importado en AccessGate —que se monta en todas las páginas— ese peso
// iba en el bundle principal de cada visita. Solo hace falta en la pantalla
// del muro de pago.
import { resolveMeta } from '../../scripts/seoMeta.mjs'

// Meta SEO + JSON-LD para la pantalla de muro (Locked). Ver AccessGate.
export default function LockedMeta({ pathname, lang }) {
  const neutral = normalizePath(pathname)
  const meta = resolveMeta(neutral, lang)
  if (!meta) return null
  const kind = neutral === '/examen' || neutral.startsWith('/examen/') ? 'Quiz' : 'LearningResource'
  return (
    <>
      <SEOHead title={meta.title} description={meta.desc} path={neutral} lang={lang} />
      <QuizSchema name={meta.title} description={meta.desc} path={neutral} lang={lang} kind={kind} isAccessibleForFree={false} />
    </>
  )
}
