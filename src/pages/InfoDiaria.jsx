import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import AdSlot from '../components/AdSlot'

const DATA = {
  es: {
    h1: 'Reto Diario: El Hábito que Transforma el Estudio',
    intro: 'La ciencia es clara: estudiar poco cada día es mucho más efectivo que maratones de última hora. Un desafío nuevo cada mañana para mantener tu cerebro activo en solo 2 minutos.',
    porQue: '¿Por qué funciona el estudio diario?',
    beneficios: [
      { titulo: 'Efecto Espaciado (Spaced Repetition)', texto: 'Décadas de investigación demuestran que distribuir el estudio en sesiones cortas produce una retención hasta 3 veces superior a las sesiones intensivas. Cada reto diario refuerza conexiones neuronales justo antes de que se debiliten.' },
      { titulo: 'Formación de Hábitos (Habit Loop)', texto: 'El sistema de rachas funciona como un bucle de hábito: la señal (abrir Tuthor), la rutina (resolver el reto) y la recompensa (mantener la racha). Tras 21 días, el estudio diario se convierte en automático.' },
      { titulo: 'Recuperación Activa (Active Recall)', texto: 'A diferencia de releer apuntes, el reto diario obliga al cerebro a recuperar la información activamente. Cada intento de recuperación fortalece la memoria.' },
    ],
    tiposH2: '¿Qué tipo de retos te esperan?',
    tiposIntro: 'Cada día rota entre cuatro tipos de desafío para activar distintas áreas cognitivas:',
    tipos: [
      { emoji: '❓', titulo: 'Pregunta de cultura general', desc: 'Historia, geografía, ciencia — con 4 opciones y explicación detallada.' },
      { emoji: '🧮', titulo: 'Puzzle de cálculo mental', desc: 'Combina números con operaciones para alcanzar el objetivo.' },
      { emoji: '📰', titulo: 'Portada histórica', desc: 'Lee un titular de periódico real y decide si es verdad o mentira.' },
      { emoji: '🌍', titulo: 'Adivina el país', desc: 'Pistas geográficas progresivas para descubrir un país misterioso.' },
    ],
    rachaH2: '🔥 El poder de la racha',
    rachaTexto: 'Tu racha es el número de días consecutivos que has completado el reto. Perderla duele — y eso es exactamente lo que la hace funcionar. El compromiso emocional con la racha convierte el estudio en algo personal: no estudias porque toca, sino porque no quieres romper tu récord.',
    ctaTitulo: '¿Listo para empezar tu racha?',
    ctaSub: 'Solo necesitas 2 minutos al día. Sin excusas.',
    cta: 'Jugar al reto de hoy →',
  },
  en: {
    h1: 'Daily Challenge: The Habit that Transforms Studying',
    intro: 'The science is clear: studying a little every day is far more effective than last-minute cramming. A new challenge every morning to keep your brain active in just 2 minutes.',
    porQue: 'Why does daily study work?',
    beneficios: [
      { titulo: 'Spaced Repetition', texto: 'Decades of research show that spreading study across short sessions produces up to 3× better retention than intensive cramming. Each daily challenge reinforces neural connections just before they weaken.' },
      { titulo: 'Habit Loop', texto: 'The streak system works as a habit loop: the cue (opening Tuthor), the routine (solving the challenge) and the reward (keeping the streak). After 21 days, daily study becomes automatic.' },
      { titulo: 'Active Recall', texto: 'Unlike re-reading notes, the daily challenge forces the brain to actively retrieve information. Every retrieval attempt strengthens memory.' },
    ],
    tiposH2: 'What types of challenges await you?',
    tiposIntro: 'Every day rotates between four types of challenge to activate different cognitive areas:',
    tipos: [
      { emoji: '❓', titulo: 'General knowledge question', desc: 'History, geography, science — 4 options with a detailed explanation.' },
      { emoji: '🧮', titulo: 'Mental arithmetic puzzle', desc: 'Combine numbers with operations to reach the target.' },
      { emoji: '📰', titulo: 'Historical headline', desc: 'Read a real newspaper headline and decide if it is true or false.' },
      { emoji: '🌍', titulo: 'Guess the country', desc: 'Progressive geographical clues to discover a mystery country.' },
    ],
    rachaH2: '🔥 The power of the streak',
    rachaTexto: "Your streak is the number of consecutive days you have completed the challenge. Losing it hurts — and that is exactly what makes it work. The emotional commitment turns studying into something personal: you don't study because you have to, but because you don't want to break your record.",
    ctaTitulo: 'Ready to start your streak?',
    ctaSub: 'You only need 2 minutes a day. No excuses.',
    cta: "Play today's challenge →",
  },
  ca: {
    h1: 'Repte Diari: L\'Hàbit que Transforma l\'Estudi',
    intro: 'La ciència és clara: estudiar una mica cada dia és molt més efectiu que maratons d\'última hora. Un desafiament nou cada matí per mantenir el teu cervell actiu en només 2 minuts.',
    porQue: 'Per què funciona l\'estudi diari?',
    beneficios: [
      { titulo: 'Efecte Espaiat (Spaced Repetition)', texto: 'Dècades d\'investigació demostren que distribuir l\'estudi en sessions curtes produeix una retenció fins a 3 vegades superior a les sessions intensives. Cada repte diari reforça connexions neuronals just abans que s\'afebleixin.' },
      { titulo: 'Formació d\'Hàbits (Habit Loop)', texto: 'El sistema de ratxes funciona com un bucle d\'hàbit: el senyal (obrir Tuthor), la rutina (resoldre el repte) i la recompensa (mantenir la ratxa). Després de 21 dies, l\'estudi diari es torna automàtic.' },
      { titulo: 'Recuperació Activa (Active Recall)', texto: 'A diferència de rellegir apunts, el repte diari obliga el cervell a recuperar la informació activament. Cada intent de recuperació enforteix la memòria.' },
    ],
    tiposH2: 'Quins tipus de reptes t\'esperen?',
    tiposIntro: 'Cada dia rota entre quatre tipus de desafiament per activar diferents àrees cognitives:',
    tipos: [
      { emoji: '❓', titulo: 'Pregunta de cultura general', desc: 'Història, geografia, ciència — amb 4 opcions i explicació detallada.' },
      { emoji: '🧮', titulo: 'Puzzle de càlcul mental', desc: 'Combina números amb operacions per assolir l\'objectiu.' },
      { emoji: '📰', titulo: 'Portada històrica', desc: 'Llegeix un titular de diari real i decideix si és veritat o mentida.' },
      { emoji: '🌍', titulo: 'Endevina el país', desc: 'Pistes geogràfiques progressives per descobrir un país misteriós.' },
    ],
    rachaH2: '🔥 El poder de la ratxa',
    rachaTexto: 'La teva ratxa és el nombre de dies consecutius que has completat el repte. Perdre-la fa mal — i això és exactament el que la fa funcionar. El compromís emocional amb la ratxa converteix l\'estudi en quelcom personal: no estudies perquè toca, sinó perquè no vols trencar el teu rècord.',
    ctaTitulo: 'Preparat per començar la teva ratxa?',
    ctaSub: 'Només necessites 2 minuts al dia. Sense excuses.',
    cta: 'Jugar al repte d\'avui →',
  },
}

export default function InfoDiaria() {
  const { lang, localPath } = useLang()
  const d = DATA[lang] || DATA.es

  return (
    <div className="relative z-10">
      <div className="px-4 sm:px-8 py-10 max-w-3xl mx-auto">
        <Link to={localPath('/')} className="text-white/30 hover:text-white/60 text-sm mb-8 inline-flex items-center gap-1 transition-colors">
          ← {lang === 'en' ? 'Home' : lang === 'ca' ? 'Inici' : 'Inicio'}
        </Link>
        <header className="text-center mb-8">
          <span className="text-7xl block mb-4">⚡</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">{d.h1}</h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">{d.intro}</p>
        </header>
      </div>

      <div className="text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">

          <AdSlot placement="inArticle" className="mb-10" />

          <section className="mb-10">
            <h2 className="text-2xl font-black text-white mb-6">{d.porQue}</h2>
            <div className="space-y-5">
              {d.beneficios.map(b => (
                <div key={b.titulo} className="bg-[rgba(17,20,29,0.86)] rounded-2xl border border-white/10 p-6">
                  <h3 className="font-black text-white text-lg mb-2">{b.titulo}</h3>
                  <p className="text-white/60 leading-relaxed">{b.texto}</p>
                </div>
              ))}
            </div>
          </section>

          <AdSlot placement="inArticle" className="mb-10" />

          <section className="mb-10">
            <h2 className="text-2xl font-black text-white mb-6">{d.tiposH2}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {d.tipos.map(r => (
                <div key={r.titulo} className="bg-[rgba(17,20,29,0.86)] rounded-2xl border border-white/10 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{r.emoji}</span>
                    <h3 className="font-black text-white">{r.titulo}</h3>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10 bg-[rgba(17,20,29,0.86)] rounded-2xl border border-white/10 p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white mb-3">{d.rachaH2}</h2>
            <p className="text-white/60 leading-relaxed">{d.rachaTexto}</p>
          </section>

          <AdSlot placement="inArticle" className="mb-10" />

          <footer className="text-center pt-4">
            <h2 className="text-2xl font-black text-white mb-3">{d.ctaTitulo}</h2>
            <p className="text-white/55 mb-6">{d.ctaSub}</p>
            <Link to={localPath('/diaria')}
              className="inline-block py-4 px-10 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/30">
              {d.cta}
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}
