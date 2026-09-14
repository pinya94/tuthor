import CorrigeElTextoExamenBase from './CorrigeElTextoExamenBase'

// Examen de Corrige el Texto con textos en castellano: tema "Corregir un
// texto" de Lengua. La versión inglesa es CorrigeElTextoExamenEn.jsx.
export default function CorrigeElTextoExamen() {
  return (
    <CorrigeElTextoExamenBase
      idioma="es"
      examId="corrige-el-texto-test"
      badge={{ es: 'Examen · Ortografía', en: 'Exam · Spanish spelling', ca: 'Examen · Ortografia castellana' }}
      title={{ es: '🔍 Corrige el texto', en: '🔍 Spot the Mistakes', ca: '🔍 Corregeix el text' }}
      sub={{ es: 'Encuentra las faltas escondidas en textos en castellano', en: 'Find the mistakes hidden in Spanish texts', ca: 'Troba les faltes amagades en textos en castellà' }}
      metaTitle={{ es: 'Examen de ortografía: corrige el texto', en: 'Spanish spelling exam: spot the mistakes', ca: "Examen d'ortografia castellana: corregeix el text" }}
      metaDesc={{
        es: 'Examen de ortografía sobre textos reales: encuentra las faltas de tildes, b/v, g/j, h y homófonos sin que nadie diga dónde están. Cuatro textos, sin reloj y con nota sobre 10.',
        en: 'Spanish spelling exam on real texts: find the mistakes in accents, b/v, g/j, silent h and homophones without being told where they are. Four texts, no timer, marked out of 10.',
        ca: "Examen d'ortografia castellana sobre textos reals: troba les faltes d'accents, b/v, g/j, h i homòfons sense que ningú digui on són. Quatre textos, sense rellotge i amb nota sobre 10.",
      }}
      subjectSchema="Lengua castellana"
    />
  )
}
