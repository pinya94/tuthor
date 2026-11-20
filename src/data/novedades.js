// Novedades de Tuthor (página /novedades, «✨ Novedades» en la barra lateral y
// «Lo último» en la portada). Idea de Manel (20-nov-2026): que la gente vea
// que la web mejora.
//
// Más recientes ARRIBA. Dos tipos:
//   { fecha, juego: '<slug>' }  → juego nuevo: nombre, dibujo y descripción
//                                 salen del catálogo (data/constants.js)
//   { fecha, para, emoji, titulo, texto, enlace?, enPortada? } → una mejora; `para` es
//                                 'todos' o 'profes'
// Solo lo que nota quien usa Tuthor (nada de SEO, admin ni cambios internos).
// El test novedades.test.js comprueba fechas, idiomas y que los juegos existen.
export const NOVEDADES = [
  { fecha: '2026-11-20', para: 'todos', emoji: '🔴', enlace: '/clase', enPortada: false,
    titulo: { es: 'Avisos de tu clase al momento', en: 'Class alerts in real time', ca: 'Avisos de la teva classe al moment' },
    texto: { es: 'Si tu profe abre un reto en directo, te sale un aviso en cualquier página para entrar. Y las tareas nuevas aparecen sin recargar.', en: 'If your teacher starts a live challenge, you get an alert on any page to join. New tasks show up without reloading.', ca: 'Si el teu profe obre un repte en directe, et surt un avís a qualsevol pàgina per entrar-hi. I les tasques noves apareixen sense recarregar.' } },
  { fecha: '2026-11-20', para: 'profes', emoji: '📺', enlace: '/profesor?tab=retos',
    titulo: { es: '«Jugar con la clase» a un clic', en: '«Play with the class» in one click', ca: '«Jugar amb la classe» a un clic' },
    texto: { es: 'En la barra lateral: Mis clases, Jugar con la clase (retos en directo y deberes) y Mis exámenes. Y un número con las entregas nuevas de tus alumnos.', en: 'In the side bar: My classes, Play with the class (live challenges and homework) and My exams, plus a counter of new submissions.', ca: 'A la barra lateral: Les meves classes, Jugar amb la classe (reptes en directe i deures) i Els meus exàmens, amb un número de lliuraments nous.' } },
  { fecha: '2026-11-20', para: 'todos', emoji: '🏆', enlace: '/top',
    titulo: { es: 'Ranking de hoy y del mes', en: 'Today’s and this month’s leaderboard', ca: 'Rànquing d’avui i del mes' },
    texto: { es: 'Cada partida suma puntos. Con tu cuenta sales con tu nombre; sin cuenta, con un apodo. Al acabar ves en qué puesto vas.', en: 'Every game adds points. With an account you appear with your name; without one, with a nickname. At the end you see your position.', ca: 'Cada partida suma punts. Amb el teu compte surts amb el teu nom; sense compte, amb un àlies. En acabar veus en quin lloc vas.' } },
  { fecha: '2026-11-19', para: 'todos', emoji: '🎮', enlace: '/',
    titulo: { es: 'Portada nueva: entras y juegas', en: 'New home page: open it and play', ca: 'Portada nova: entres i jugues' },
    texto: { es: 'Los juegos primero, con un juego destacado y todos los demás por materia. Desde la portada, el juego empieza con un toque.', en: 'Games first, with a featured game and all the others by subject. From the home page, a game starts in one tap.', ca: 'Els jocs primer, amb un joc destacat i tots els altres per matèria. Des de la portada, el joc comença amb un toc.' } },
  { fecha: '2026-11-19', para: 'todos', emoji: '🎯', enlace: '/estudiar/idiomas/espanol/gramatica/pronombres',
    titulo: { es: '«Pruébalo ahora» en gramática', en: '«Try it now» in grammar', ca: '«Prova-ho ara» a gramàtica' },
    texto: { es: 'En cada tema de gramática (pronombres, adverbios, sustantivos…) puedes practicar con frases nuevas sin salir de la página.', en: 'In every grammar topic you can practise with fresh sentences without leaving the page.', ca: 'A cada tema de gramàtica pots practicar amb frases noves sense sortir de la pàgina.' } },
  { fecha: '2026-11-19', juego: 'monta-el-verbo' },
  { fecha: '2026-11-19', juego: 'construye-figura' },
  { fecha: '2026-11-19', para: 'todos', emoji: '📝', enlace: '/examen/el-gancho-tags-test',
    titulo: { es: 'Exámenes de question tags y relative pronouns', en: 'Question tags and relative pronouns quizzes', ca: 'Exàmens de question tags i relative pronouns' },
    texto: { es: 'Dos temas de inglés de 3.º y 4.º de ESO, con la explicación de cada respuesta.', en: 'Two English topics for Year 10-11, with every answer explained.', ca: 'Dos temes d’anglès de 3r i 4t d’ESO, amb l’explicació de cada resposta.' } },
  { fecha: '2026-11-18', juego: 'por-que-paso' },
  { fecha: '2026-11-17', juego: 'mas-o-menos' },
  { fecha: '2026-11-17', juego: 'cuanto-cabe' },
  { fecha: '2026-11-17', juego: 'que-ves' },
  { fecha: '2026-11-16', juego: 'mas-lejos' },
  { fecha: '2026-11-16', juego: 'ojo-y-oido' },
  { fecha: '2026-11-16', juego: 'el-mensajero' },
  { fecha: '2026-11-16', juego: 'caza-la-raiz' },
  { fecha: '2026-11-10', juego: 'fabrica-palabras' },
  { fecha: '2026-11-05', juego: 'bajo-presion' },
  { fecha: '2026-11-05', juego: 'construye-atomo' },
]

export const ULTIMA_FECHA = NOVEDADES[0].fecha
const CLAVE = 'tuthor_novedades_vistas'
export function hayNovedadesSinVer() {
  try { return (localStorage.getItem(CLAVE) || '') < ULTIMA_FECHA } catch { return false }
}
export function marcarNovedadesVistas() {
  try { localStorage.setItem(CLAVE, ULTIMA_FECHA) } catch { /* sin almacenamiento */ }
}
