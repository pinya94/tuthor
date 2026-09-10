// Selector del idioma del CONTENIDO, que no es el mismo que el de la interfaz.
//
// Analiza la Frase y El Intruso tienen bolsas de palabras y plantillas propias
// en castellano, inglés y catalán — no son traducciones, son tres idiomas
// analizados por separado. Hasta ahora se cogía el de la interfaz y punto, así
// que un alumno con Tuthor en castellano no podía practicar sintaxis inglesa
// sin cambiar toda la web de idioma, y uno con la web en catalán no podía
// hacer la de castellano, que es la que le van a preguntar en clase.
//
// El valor por defecto sigue siendo el idioma de la interfaz: quien no toque
// nada se encuentra lo de siempre.
//
// Sin banderas: 🇪🇸 y 🇬🇧 salen como dos letras sueltas en Windows 10 (ver el
// test de emojis). El nombre del idioma en su propio idioma se entiende igual
// y no depende de la fuente.
const IDIOMAS = [
  { id: 'es', nombre: 'Castellano' },
  { id: 'en', nombre: 'English' },
  { id: 'ca', nombre: 'Català' },
]

const ETIQUETA = { es: 'Idioma de las frases', en: 'Language of the sentences', ca: 'Idioma de les frases' }

export default function SelectorIdioma({ valor, onCambio, l = 'es', etiqueta = ETIQUETA }) {
  return (
    <>
      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2 text-center">
        {etiqueta[l] ?? etiqueta.es}
      </p>
      <div className="grid grid-cols-3 gap-1.5 mb-4">
        {IDIOMAS.map(i => (
          <button
            key={i.id}
            type="button"
            onClick={() => onCambio(i.id)}
            aria-pressed={valor === i.id}
            className={`px-2 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              valor === i.id
                ? 'bg-white/15 border-white/20 text-white'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}
          >
            {i.nombre}
          </button>
        ))}
      </div>
    </>
  )
}
