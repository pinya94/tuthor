import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import AdSlot from '../components/AdSlot'
import SEOEstatico from '../components/SEOEstatico'

const DATA = {
  es: {
    h1: 'Reto Diario: El Hábito que Transforma el Estudio',
    intro: 'La ciencia es clara: estudiar poco cada día es mucho más efectivo que maratones de última hora. Un desafío nuevo cada mañana para mantener tu cerebro activo en pocos minutos.',
    porQue: '¿Por qué funciona el estudio diario?',
    beneficios: [
      { titulo: 'Efecto Espaciado (Spaced Repetition)', texto: 'Décadas de investigación demuestran que lo que se estudia en sesiones cortas y repartidas se recuerda mucho mejor, y durante más tiempo, que lo estudiado de un tirón. Cada reto diario refuerza conexiones neuronales justo antes de que se debiliten.' },
      { titulo: 'Formación de Hábitos (Habit Loop)', texto: 'El sistema de rachas funciona como un bucle de hábito: la señal (abrir Tuthor), la rutina (resolver el reto) y la recompensa (mantener la racha). Con la repetición, el gesto se vuelve automático: no son 21 días mágicos, sino unas semanas de constancia.' },
      { titulo: 'Recuperación Activa (Active Recall)', texto: 'A diferencia de releer apuntes, el reto diario obliga al cerebro a recuperar la información activamente. Cada intento de recuperación fortalece la memoria.' },
    ],
    tiposH2: '¿Qué te espera cada día?',
    tiposIntro: 'Dos cosas, y las dos cuentan para la misma racha:',
    tipos: [
      { emoji: '🎮', titulo: 'El juego del día', desc: 'Cada día, un juego distinto del catálogo, el mismo para todo el mundo: historia, ciencias, mates, lengua…' },
      { emoji: '❓', titulo: 'La pregunta de hoy', desc: 'Un mini-reto rápido que va rotando: cultura general, cálculo mental, portadas históricas o adivinar un país.' },
    ],
    rachaH2: '🔥 El poder de la racha',
    rachaTexto: 'Tu racha es el número de días consecutivos que has completado el reto. Perderla duele — y eso es exactamente lo que la hace funcionar. El compromiso emocional con la racha convierte el estudio en algo personal: no estudias porque toca, sino porque no quieres romper tu récord.',
    ctaTitulo: '¿Listo para empezar tu racha?',
    ctaSub: 'Solo necesitas unos minutos al día. Sin excusas.',
    cta: 'Jugar al reto de hoy →',
  },
  en: {
    h1: 'Daily Challenge: The Habit that Transforms Studying',
    intro: 'The science is clear: studying a little every day is far more effective than last-minute cramming. A new challenge every morning to keep your brain active in just a few minutes.',
    porQue: 'Why does daily study work?',
    beneficios: [
      { titulo: 'Spaced Repetition', texto: 'Decades of research show that material studied in short, spaced sessions is remembered far better, and for longer, than material crammed all at once. Each daily challenge reinforces neural connections just before they weaken.' },
      { titulo: 'Habit Loop', texto: 'The streak system works as a habit loop: the cue (opening Tuthor), the routine (solving the challenge) and the reward (keeping the streak). With repetition the habit becomes automatic: not a magic 21 days, but a few weeks of consistency.' },
      { titulo: 'Active Recall', texto: 'Unlike re-reading notes, the daily challenge forces the brain to actively retrieve information. Every retrieval attempt strengthens memory.' },
    ],
    tiposH2: 'What awaits you every day?',
    tiposIntro: 'Two things, and both count towards the same streak:',
    tipos: [
      { emoji: '🎮', titulo: 'Game of the day', desc: 'Every day, a different game from the catalogue, the same one for everybody: history, science, maths, languages…' },
      { emoji: '❓', titulo: 'Today\'s question', desc: 'A quick mini-challenge that rotates: general knowledge, mental arithmetic, historical headlines or guessing a country.' },
    ],
    rachaH2: '🔥 The power of the streak',
    rachaTexto: "Your streak is the number of consecutive days you have completed the challenge. Losing it hurts — and that is exactly what makes it work. The emotional commitment turns studying into something personal: you don't study because you have to, but because you don't want to break your record.",
    ctaTitulo: 'Ready to start your streak?',
    ctaSub: 'You only need a few minutes a day. No excuses.',
    cta: "Play today's challenge →",
  },
  ca: {
    h1: 'Repte Diari: L\'Hàbit que Transforma l\'Estudi',
    intro: 'La ciència és clara: estudiar una mica cada dia és molt més efectiu que maratons d\'última hora. Un desafiament nou cada matí per mantenir el teu cervell actiu en pocs minuts.',
    porQue: 'Per què funciona l\'estudi diari?',
    beneficios: [
      { titulo: 'Efecte Espaiat (Spaced Repetition)', texto: 'Dècades d\'investigació demostren que el que s\'estudia en sessions curtes i repartides es recorda molt millor, i durant més temps, que el que s\'estudia d\'una tirada. Cada repte diari reforça connexions neuronals just abans que s\'afebleixin.' },
      { titulo: 'Formació d\'Hàbits (Habit Loop)', texto: 'El sistema de ratxes funciona com un bucle d\'hàbit: el senyal (obrir Tuthor), la rutina (resoldre el repte) i la recompensa (mantenir la ratxa). Amb la repetició, el gest es torna automàtic: no són 21 dies màgics, sinó unes setmanes de constància.' },
      { titulo: 'Recuperació Activa (Active Recall)', texto: 'A diferència de rellegir apunts, el repte diari obliga el cervell a recuperar la informació activament. Cada intent de recuperació enforteix la memòria.' },
    ],
    tiposH2: 'Què t\'espera cada dia?',
    tiposIntro: 'Dues coses, i totes dues compten per a la mateixa ratxa:',
    tipos: [
      { emoji: '🎮', titulo: 'El joc del dia', desc: 'Cada dia, un joc diferent del catàleg, el mateix per a tothom: història, ciències, mates, llengua…' },
      { emoji: '❓', titulo: 'La pregunta d\'avui', desc: 'Un mini-repte ràpid que va rotant: cultura general, càlcul mental, portades històriques o endevinar un país.' },
    ],
    rachaH2: '🔥 El poder de la ratxa',
    rachaTexto: 'La teva ratxa és el nombre de dies consecutius que has completat el repte. Perdre-la fa mal — i això és exactament el que la fa funcionar. El compromís emocional amb la ratxa converteix l\'estudi en quelcom personal: no estudies perquè toca, sinó perquè no vols trencar el teu rècord.',
    ctaTitulo: 'Preparat per començar la teva ratxa?',
    ctaSub: 'Només necessites uns minuts al dia. Sense excuses.',
    cta: 'Jugar al repte d\'avui →',
  },
}

export default function InfoDiaria() {
  const { lang, localPath } = useLang()
  const d = DATA[lang] || DATA.es

  return (
    <div className="relative z-10">
      <SEOEstatico path="/info/diaria" />
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
