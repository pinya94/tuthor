// Orden en que se enseñan las opciones de una pregunta tipo test.
//
// Los bancos de src/data escriben la respuesta correcta casi siempre la
// primera: en septiembre de 2026 lo estaba en 954 de 1.723 preguntas, y en
// 29 bancos en más de la mitad. ExamenMC las pintaba en ese orden, así que
// pulsar siempre el primer botón aprobaba medio temario (y con dos intentos
// por pregunta, más). El orden se decide aquí, al servir la pregunta, y no en
// los datos: así da igual cómo se escriba un banco nuevo.
//
// Devuelve una permutación de 0..n-1; la pregunta no se toca, de modo que una
// `correcta` dada como índice sigue apuntando a la opción original.
export function ordenOpciones(n, rand = Math.random) {
  const orden = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [orden[i], orden[j]] = [orden[j], orden[i]]
  }
  return orden
}
