# Ilustraciones de la célula — procedencia y licencias

Las dos células de «Bajo el Microscopio» (modo «Célula dibujada» y su examen)
son ilustraciones de **LadyofHats (Mariana Ruiz Villarreal)** publicadas en
Wikimedia Commons en el **dominio público**. Son las de los artículos de
Wikipedia sobre la célula: vectoriales, sin IA, revisadas por la comunidad.
Aunque la licencia no lo exige, se acredita a la autora.

| Fichero | Qué es | Licencia | Autor | Ficha en Commons |
|---|---|---|---|---|
| `animal.svg` | Célula animal en corte | Dominio público (PD-user) | LadyofHats | [Animal cell structure en.svg](https://commons.wikimedia.org/wiki/File:Animal_cell_structure_en.svg) |
| `vegetal.svg` | Célula vegetal en corte | Dominio público (PD-self) | LadyofHats; derivado de Dhatfield | [Plant cell structure svg 2.svg](https://commons.wikimedia.org/wiki/File:Plant_cell_structure_svg_2.svg) |

El detalle (URL del original, SHA-1, qué orgánulos se preguntan sobre cada
una, modificaciones, fecha y estado de validación) está en `creditos.json`,
que un test exige que cubra todos los ficheros de esta carpeta.

## Modificaciones

- **Ambas**: sin rótulos ni líneas (el juego consiste en reconocer sin
  etiqueta), lienzo recortado a la célula y SVG limpiado.
- **Animal**: sin flagelo (no es lo típico y despistaba); el lisosoma original
  —una mancha medio tapada por una mitocondria— se sustituye por tres
  lisosomas esféricos con enzimas dentro: dos son vesículas del propio dibujo
  con puntitos añadidos y uno es nuevo, en el mismo estilo, junto al Golgi.
- **Vegetal**: sin las siluetas de las células vecinas del fondo.

## Regenerar

    node scripts/celula-arte.mjs [--depurar carpeta]

Descarga los originales a una caché fuera del repo, comprueba su SHA-1 (los
índices de formas del script valen solo para esa versión) y reescribe estos
SVG y `src/data/celulaZonas.js`. Toda forma del original tiene que estar
clasificada en el script (orgánulo, «pasa», «otro» o «nada»): si Commons
cambia el fichero o falta una, el script falla en vez de inventar.
