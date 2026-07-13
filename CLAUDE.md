# Tuthor — convenciones del proyecto

Plataforma educativa React 19 + Vite + Tailwind + Firebase (Firestore). Deploy en Vercel desde `main`.

## Registros centrales (fuente única de verdad)

- **`src/lib/games.js`** — todo juego que guarda stats: label {es,en,ca}, emoji, materia, ruta y fórmula de monedas. Añadir un juego = una entrada aquí + `computeCoins` en su página. El perfil y la validación en dev salen gratis.
- **`src/lib/exams.js`** — exámenes tipo test: label, emoji, materia, ruta y loader lazy. Las rutas se generan en App.jsx desde `routableExams()`; el perfil deriva "Por materia" de `examsBySubject()`. Añadir un examen = crear el wrapper de ExamenMC + una entrada aquí.

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
