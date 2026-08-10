# Añadir contenido nuevo (juegos y exámenes) — guía operativa

Lectura obligatoria ANTES de crear un juego, un examen o cualquier combinación.
Los registros centrales hacen casi todo el trabajo: si un paso no está aquí,
probablemente no hay que hacerlo (perfil, panel de profesor, "Por materia",
leaderboards, tareas asignables y meta del prerender se derivan SOLOS de los
registros). Los tests de invariantes (`npx vitest run`) fallan señalando el
paso olvidado.

## Árbol de decisión

| Quiero crear…                                            | Sigue                        |
|----------------------------------------------------------|------------------------------|
| Un juego arcade (partidas, puntos, monedas)               | §1                           |
| Un examen tipo test con nota                              | §2                           |
| Juego + su examen (patrón Fuerza Neta / Balanza)          | §1 + §2 + `backGamePath`     |
| Un examen por TEMA con varios formatos (patrón historia)  | §3                           |
| Contenido de una materia que aún no existe                | §4 primero, luego §1/§2      |
| Un reto diario del juego                                  | §5 (opcional, tras §1)       |

Convención de ids: kebab-case; el id ES el `game` de Firestore (stats y
leaderboards) — no se cambia nunca después de publicar. Si un examen acompaña
a un juego homónimo, su id lleva sufijo `-test` (`balanza` / `balanza-test`).

## §1 Juego nuevo (`mi-juego`)

1. **Página** `src/pages/MiJuego.jsx`: al terminar la partida →
   `computeCoins('mi-juego', result)` → `saveActivity({ game: 'mi-juego', type: 'juego', score, timeSpent, coinsEarned })`
   → `<GameEndScreen>` (nunca pantalla final a mano). La fórmula de monedas
   vive SOLO en games.js — la página no la duplica.
2. **Registro** `src/lib/games.js`: entrada con `label {es,en,ca}`, `emoji`
   (Win10-safe: nada de U+1FA70–1FAFF ni 🟰 — hay test), `subject` (id
   existente de SUBJECT_DEFS), `route: '/juegos/mi-juego'`, `coins(result)`.
3. **Ruta** `src/App.jsx`: lazy import + `<Route path="juegos/mi-juego" …>`
   (las rutas de juegos son manuales; las de exámenes no).
4. **Catálogo visual** `src/data/constants.js` → `GAMES` (¡OJO: array del
   catálogo /juegos, NO es el registro de lib/games.js pese al nombre!):
   título/subtítulos es-en-ca, emoji, gradient, `ready: true`, `path`.
5. **Sitemap** `public/sitemap.xml`: añadir `/juegos/mi-juego` (+ /en si se
   publica en inglés). El prerender resuelve la meta desde games.js.
6. **Ficha SEO** `src/data/infoJuegosFichas.js`: entrada `mi-juego` en
   FICHAS_ES/EN/CA + `/info/juegos/mi-juego` al sitemap. Muy recomendada
   (plan AdSense "contenido de poco valor"); pendientes conocidos:
   pentagrama-path, reaccion.
7. **Hub de materia** (si existe): enlazar donde encaje
   (MatematicasIndex, QuimicaIndex vía datos, HistoriaIndex…).

Gratis al registrar: perfil, "Por materia", panel del profesor (Asignar
tarea → Juego), leaderboard (`saveActivity` avisa en dev si el id no está
registrado), tareas clicables del alumno (usa `route`) y el aviso
"✅ Tarea de X completada" en GameEndScreen (evento de saveActivity —
ningún juego tiene que hacer nada).

## §2 Examen nuevo (`mi-examen` o `mi-juego-test`)

1. **Página** wrapper de `ExamenMC` (o base específica tipo
   `FrasesExamenBase`) que guarde
   `saveActivity({ type: 'examen', game: '<examId>', category: '<examId>', passed, … })`.
   Si acompaña a un juego: prop `backGamePath="/juegos/mi-juego"`.
2. **Registro** `src/lib/exams.js`: entrada con `label/emoji/subject` +
   `path: 'examen/mi-examen'` (relativo, sin `/` inicial) + `page: () => import(...)`.
   La `<Route>` se genera sola en App.jsx (`routableExams()`) y la meta del
   prerender sale de aquí. **Prohibido** añadir rutas hardcoded nuevas de
   exámenes en App.jsx: el campo `route` (absoluto) existe SOLO para las
   heredadas.
3. **Sitemap**: añadir `/examen/mi-examen`.
4. **Familia de exámenes** (varios del mismo bloque, p.ej. gramática): que
   compartan prefijo de id y añade el prefijo a `EXAM_GROUPS` (exams.js) —
   los desplegables largos los agrupan solos con `<optgroup>`.
5. **Retirar** un examen: quitar `path`/`page`, poner `retired: true` —
   conserva etiquetas de stats antiguas y deja de ofrecerse como tarea.
6. **Si el tema tiene ficha SEO** en `src/data/fichasEstudiar/mi-tema.js`
   (`/info/estudiar/mi-tema`): `InfoEstudiarFicha.jsx` la recoge sola por
   `import.meta.glob`, pero la meta del prerender NO — hay que registrarla
   además en `src/data/fichasEstudiarIndex.js` (import + entrada en el mapa
   por slug) o el test de sitemap↔meta falla señalando la URL.

Gratis al registrar: ruta, meta, perfil, aprobados/suspensos por materia,
desplegable de exámenes del profesor, tarea clicable del alumno.

## §3 Catálogo por tema — el modelo uniforme de la plataforma

```
Materia  →  Tema  →  Formato  →  Nivel
```

| Eje | Qué es | Ejemplos |
|-----|--------|----------|
| Materia | la asignatura | historia, matemáticas |
| Tema | el trozo del temario | Guerra Civil, Sumas |
| **Formato** | **la MECÁNICA con la que se hace** | Línea del Tiempo, Portadas, NumPath |
| Nivel | la dificultad (si el formato la usa) | Primaria, ESO, Bachillerato |

**`formato` es SIEMPRE la mecánica, nunca el nivel.** Eso es lo que hace que
la estructura sea idéntica en toda materia. El nivel es un cuarto eje aparte
y solo existe si el formato lo usa (¿Quién es quién? y Portadas no tienen).

Todo vive en **`src/lib/topicCatalog.js`**, que es la ÚNICA fuente de verdad
de qué combinaciones existen. Lo consumen por igual:
- las páginas del alumno (`HistoriaTema`, `MatematicasTema`) — deciden CÓMO
  se ve cada tarjeta, no CUÁL está disponible;
- el selector de tareas del profesor (cascada materia→tema→formato→nivel);
- el enrutado y etiquetado de tareas.

Cubre las **12 materias** (68 temas). Una materia con exámenes asignables
tiene que estar aquí — hay un test que lo exige.

Hay dos formas de declarar un tema, según de dónde salga el contenido:

- **Por mecánica** (historia, matemáticas): el formato define el `game`, y el
  tema es un filtro que la página aplica. `Guerra Civil` + `Línea del Tiempo`
  → game `linea-temporal`, category `gce`.
- **Por examen** (lengua, geografía, física, química): cada combinación
  tema+formato ES un examen distinto del registro, declarado en el mapa
  `formatos: { <formato>: <examId> }` del tema. `Sustantivos` + `Tipo test`
  → examen `espanol-gramatica-sustantivos-test`. Admite ids irregulares y no
  necesita ningún caso por materia en `ExamenTema.jsx` (se enruta con
  `examRoute`). Los exámenes cubiertos por un tema desaparecen de la lista
  plana "Examen general (sin tema)" para no ofrecerlos dos veces.
  Si varios temas comparten el mismo examen (los 5 continentes comparten el
  de GeoMapa y reciben la región por `location.state`), se declara con
  `compartido(examId)` + `stateKey` en la materia: la `category` de la tarea
  pasa a ser el tema (para etiquetar y enrutar) y el match cae a solo-juego,
  porque esa página no puede decir qué tema se jugó.

Una materia puede mezclar ambas: matemáticas usa mecánica para los 7 modos
de cálculo y examen para los 6 temas con página propia (Álgebra, Funciones…).
Los formatos por mecánica llevan `temas: [...]` para no colarse en los otros.

Cada formato declara:
- `game` — el id con el que la página guarda stats.
- `usesLevel` — si tiene dificultad.
- `tracksTopic` — si la página puede decir QUÉ tema se jugó. Los que guardan
  una `category` fija (Portadas, Examen de práctica, NumPath) van en `false`:
  su tarea se completa jugando ese formato, sin distinguir tema. Es honesto y
  evita romper el conteo de aprobados del perfil.
- `temas` / `niveles` — restricciones de disponibilidad (opcional).

Funciones: `topicFormats(materia, tema)`, `formatLevels(materia, tema, fmt)`,
`defaultLevel(...)`, `topicTask(...)` → `{gameId, category, level}`,
`findTopic(...)` (inversa), `taskMatchesPlay(task, play)`.

### Añadir un tema o formato

1. La página destino debe **filtrar por tema/nivel** vía `location.state` y,
   si el formato es `tracksTopic: true`, guardar `saveActivity({ category })`
   EXACTAMENTE igual que lo que devuelve `topicTask` (hay test de ida y
   vuelta que lo vigila).
2. Entrada en `TOPIC_CATALOG` (+ caso en `ExamenTema.jsx` si es una materia
   nueva, + su `<Route>` en App.jsx).
3. Etiqueta del tema en `SUBJECT_DEFS[materia].catLabels` — si se puede
   derivar de datos existentes (caso mates ← mathEngine), generarla.
4. Si el formato guarda stats con un id SIN entrada en games.js
   (p.ej. `juego-fechas`), añadir ese id a la lista manual `gameIds` de su
   materia en SUBJECT_DEFS (es el ÚNICO caso en que se toca esa lista).

Las listas de disponibilidad se escriben a mano en el catálogo (para no
cargar ~140 kB de datos en cada bundle), pero **un test las valida contra los
datos reales**: si añades eventos o portadas de un tema y no actualizas el
catálogo, falla.

## §4 Materia nueva

1. `SUBJECT_DEFS` en `src/lib/statsAggregation.js`: id/emoji/label
   (`gameIds: []` — se llena solo desde games.js).
2. Los juegos/exámenes usan `subject: '<id>'` — el test de invariantes falla
   si el subject no existe.
3. Hub `/estudiar/<materia>` + entrada en `STATIC_META`
   (scripts/seoMeta.mjs) + sitemap.

## §5 Reto diario (opcional)

`src/pages/PreguntaDiaria.jsx`: nuevo `tipo` de desafío con UI propia +
generador determinista por fecha (ver `funciones-grafica`,
`balanza-algebraica`, `analiza-frases` como referencia).

## Verificación (siempre, en este orden)

```bash
npx vitest run    # invariantes: registro↔sitemap↔meta, materias, rutas jugables, catálogo, emojis
npm run build     # prerender: falla si una URL del sitemap queda sin meta específica
```

Y en el preview: jugar una partida (monedas + stats en perfil) y, como
profesor, comprobar que aparece en "Asignar tarea".
