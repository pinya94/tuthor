import SEOHead from './SEOHead'
import { STATIC_META } from '../lib/staticMeta'
import { useLang } from '../context/LangContext'

// SEOHead para las páginas cuya meta ya está escrita en STATIC_META: los hubs
// de materia, las portadas de sección y las páginas sueltas.
//
// POR QUÉ EXISTE. Quince componentes no montaban SEOHead, porque su título y
// su descripción los ponía el prerender al final, leyendo STATIC_META. Parecía
// que daba igual —la meta acababa en el HTML— pero no daba igual: el prerender
// espera a ver un <link rel="canonical"> antes de capturar la página, y esa
// etiqueta la emite SEOHead. En estas quince no llegaba nunca, así que agotaba
// los tres segundos de espera, se pasaba del presupuesto de doce, y guardaba
// el cascarón vacío con la meta pegada encima.
//
// El resultado en producción: diecinueve URLs sirviendo <div id="root"></div>
// a Google, y entre ellas /estudiar/historia, /estudiar/matematicas y todo
// /estudiar/idiomas. Las páginas por las que se busca "estudiar historia" y el
// nudo del que cuelga el enlazado interno del sitio.
//
// Se pasa solo el path porque el texto ya existe en un sitio: duplicarlo aquí
// sería que el <title> del navegador y el del HTML servido pudieran decir
// cosas distintas sin que nadie se enterara.
export default function SEOEstatico({ path, image, type }) {
  const { lang } = useLang()
  const entrada = STATIC_META[path]
  // Sin entrada no se pinta nada en vez de inventar un título: el test de
  // invariantes del sitemap ya obliga a que toda URL publicada tenga la suya,
  // así que llegar aquí sin ella significa que el path está mal escrito.
  if (!entrada) return null
  const meta = entrada[lang] ?? entrada.es
  return (
    <SEOHead title={meta.title} description={meta.desc} path={path} image={image} type={type} />
  )
}
