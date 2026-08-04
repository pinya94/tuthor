# Tuthor — convenciones del proyecto

Plataforma educativa React 19 + Vite + Tailwind + Firebase (Firestore). Deploy en Vercel desde `main`.

## Contenido nuevo (juegos/exámenes): LEER `docs/nuevo-contenido.md` PRIMERO

Guía operativa con el árbol de decisión y el checklist exacto por escenario
(juego, examen, juego+examen, examen por tema, materia nueva, reto diario).
Los tests de invariantes fallan señalando el paso olvidado. Resumen:

- **`src/lib/games.js`** — registro de juegos (label {es,en,ca}, emoji, subject, route, fórmula de monedas). De aquí se derivan perfil, "Por materia", panel de profesor y tareas clicables. Ruta manual en App.jsx + catálogo visual en `src/data/constants.js` GAMES (¡otro GAMES, es el catálogo!) + sitemap + ficha en infoJuegosFichas.js.
- **`src/lib/exams.js`** — registro de exámenes (label, emoji, subject + `path`/`page` → ruta y meta automáticas). `route` solo para rutas hardcodeadas heredadas; `retired: true` para retirar sin perder etiquetas. No crear rutas hardcoded nuevas de exámenes.
- **`src/lib/statsAggregation.js`** — SUBJECT_DEFS: las materias. `gameIds` se deriva de games.js (la lista manual es SOLO para ids de stats sin juego propio, p.ej. juego-fechas). Materia nueva = entrada aquí + hub + STATIC_META.
- **`src/lib/examTopics.js`** — exámenes por tema (tema → formato, patrón historia): EXAM_TOPICS/EXAM_FORMATS + etiqueta en catLabels.

## Monedas

- `computeCoins(gameId, result)` es la ÚNICA fórmula: el mismo valor va a `saveActivity({ coinsEarned })` y a la UI. Nunca duplicar la fórmula en una página.
- `saveActivity` avisa en dev si el gameId no está registrado.

## Pantalla final de juego

- Todos los juegos terminan en `<GameEndScreen>` (src/components/GameEndScreen.jsx): puntos, monedas, mensaje, stats propias, ranking, compartir, jugar de nuevo. No montar pantallas finales a mano.

## i18n

- Idiomas: es (default, sin prefijo de ruta), en (/en), ca (/ca).
- Código nuevo: usar `tr({ es, en, ca })` de `useLang()`. **No escribir ternarios de idioma** (`lang === 'en' ? ... : ...`); los existentes se migran al tocar cada página.
- `lt(obj, field)` es legacy (sufijos titleEn/titleCa); no extender.

## Firestore

- Stats de usuario: `users/{uid}/stats/global` (un doc con coins, streak, statsByGame, statsByCategory, bestScores).
- Leaderboards: `leaderboards/{game}/entries/{uid}` — un doc por jugador. Top-N con orderBy+limit, posición con `getUserRank` (counts agregados). Los docs legacy `_stats/leaderboard_*` son solo lectura (fallback).
- Cambios en `firestore.rules` requieren `npx firebase-tools deploy --only firestore:rules` (Vercel no los despliega).

## SEO

- Meta única: `<SEOHead>` (src/components/SEOHead.jsx) — title, description, canonical y hreflang. `path` SIN prefijo de idioma; el idioma sale de LangContext. `PageMeta` es un wrapper legacy: no usarlo en código nuevo.
- `npm run build` = `vite build` + `scripts/prerender.mjs`: genera un index.html estático por cada URL del sitemap con la meta correcta (crawlers y scrapers de redes no ejecutan JS). URL nueva = añadirla a public/sitemap.xml; el prerender resuelve su meta desde los registros/fichas o STATIC_META (avisa si queda genérica).

## Verificación

- `npm run build` antes de commitear (incluye el prerender; falla si el sitemap y las fuentes de meta se desincronizan). El build NO detecta referencias runtime rotas (setters sin estado, etc.) — verificar en el preview.
- `npx vitest run` — tests de invariantes de los registros (games, exams, sitemap↔meta).
