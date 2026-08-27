# Publicidad y consentimiento

## Piezas

| Fichero | Qué hace |
|---|---|
| `index.html` | Carga AdSense y fija **Consent Mode v2 en "denegado"** antes de que se pida el primer anuncio. |
| `src/lib/consent.js` | Traduce el banner de cookies a la señal de Google (`gtag('consent','update')`). |
| `src/components/CookieBanner.jsx` | Las categorías: esenciales, analítica y **publicidad**. |
| `src/lib/ads.js` | Qué red se sirve en cada hueco y con qué formato. **Único sitio que hay que tocar para cambiar de red.** |
| `src/components/AdSlot.jsx` | El hueco. Pro → nada; bloque configurado → AdSense; si no → respaldo iGraal. |

## Poner un anuncio nuevo en una página

```jsx
import AdSlot from '../components/AdSlot'
…
<AdSlot placement="inArticle" className="my-6" />
```

`placement` tiene que existir en `PLACEMENTS` (`src/lib/ads.js`). La página
**no** decide qué red se sirve ni de qué tamaño: eso vive en el registro.

## Activar AdSense cuando lo aprueben

Los ids de bloque **no van en el código**: van en variables de entorno de
Vercel, porque cambian con la cuenta y no tiene sentido recompilar para
tocarlos. Mientras no existan, cada hueco cae al respaldo de iGraal.

1. En AdSense, crear un bloque por hueco y copiar su *data-ad-slot* (10 dígitos).
2. En Vercel → Settings → Environment Variables, añadir las que hagan falta:

| Variable | Hueco |
|---|---|
| `VITE_ADSENSE_SLOT_RAIL` | raíl lateral (pantallas anchas) |
| `VITE_ADSENSE_SLOT_GAMEEND` | pantalla final de juego |
| `VITE_ADSENSE_SLOT_ARTICLE` | dentro del contenido largo |

3. Redesplegar. Son `VITE_*`, así que se incrustan **en build**: sin
   redespliegue no aparecen.

## Cambiar de red (Ezoic, Media.net, lo que sea)

Tocar solo `AdSlot.jsx`: sustituir la rama que pinta `<ins class="adsbygoogle">`
por la de la red nueva. Las páginas no se enteran.

## Lo que NO está en el código y hay que hacer en el panel de Google

- **Mensaje de privacidad / CMP.** AdSense → Privacidad y mensajes. Google
  exige un CMP certificado para el tráfico del EEE. El Consent Mode de aquí
  manda la señal correcta, pero el mensaje al usuario lo sirve Google.
- **Tratamiento para contenido dirigido a niños.** Parte del público es
  menor. Hay que marcarlo en la configuración de la cuenta; el código ya pide
  anuncios **sin personalizar** por defecto, que es la parte que sí depende
  de nosotros.
- **ads.txt** ya está en `public/ads.txt` y se sirve en la raíz.
