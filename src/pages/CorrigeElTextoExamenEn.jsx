import CorrigeElTextoExamenBase from './CorrigeElTextoExamenBase'

// Examen de Corrige el Texto con textos en inglés: tema "Spelling" de Inglés.
// La versión castellana es CorrigeElTextoExamen.jsx.
export default function CorrigeElTextoExamenEn() {
  return (
    <CorrigeElTextoExamenBase
      idioma="en"
      examId="corrige-el-texto-en-test"
      badge={{ es: 'Examen · Spelling', en: 'Exam · Spelling', ca: 'Examen · Spelling' }}
      title={{ es: '🔍 Spot the Mistakes', en: '🔍 Spot the Mistakes', ca: '🔍 Spot the Mistakes' }}
      sub={{ es: 'Encuentra las faltas escondidas en textos en inglés', en: 'Find the mistakes hidden in English texts', ca: 'Troba les faltes amagades en textos en anglès' }}
      metaTitle={{ es: 'Examen de ortografía inglesa: corrige el texto', en: 'English spelling exam: spot the mistakes', ca: "Examen d'ortografia anglesa: corregeix el text" }}
      metaDesc={{
        es: 'Examen de spelling en inglés sobre textos reales: dobles consonantes, letras mudas, ie/ei, apóstrofos y homófonos como their y there. Cuatro textos, sin reloj y con nota sobre 10.',
        en: 'English spelling exam on real texts: double letters, silent letters, ie/ei, apostrophes and homophones like their and there. Four texts, no timer, marked out of 10.',
        ca: "Examen d'spelling en anglès sobre textos reals: dobles consonants, lletres mudes, ie/ei, apòstrofs i homòfons com their i there. Quatre textos, sense rellotge i amb nota sobre 10.",
      }}
      subjectSchema="English language"
    />
  )
}
