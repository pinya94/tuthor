// «¿Qué tienes que estudiar?» — el buscador de la home.
//
// La forma más corta de decir «aquí tienes de todo» es dejar escribir el tema
// y llevar directo a él: trigonometría, la célula, los verbos, la Guerra
// Fría… Busca materias, temas y juegos en los registros (lib/descubre.js),
// sin nada escrito a mano. Intro abre el primer resultado.
import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { buscarEnTuthor } from '../lib/descubre'

const TIPO = {
  materia: { es: 'Materia', en: 'Subject', ca: 'Matèria' },
  tema: { es: 'Tema', en: 'Topic', ca: 'Tema' },
  juego: { es: 'Juego', en: 'Game', ca: 'Joc' },
}

export default function BuscadorTuthor({ className = '' }) {
  const { tr, lang, localPath } = useLang()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const resultados = useMemo(() => buscarEnTuthor(q, lang), [q, lang])
  const escrito = q.trim().length > 1

  return (
    <div className={className}>
      <form role="search" onSubmit={e => { e.preventDefault(); if (resultados[0]) navigate(localPath(resultados[0].ruta)) }}
        className="relative">
        <svg viewBox="0 0 24 24" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <input
          type="search" value={q} onChange={e => setQ(e.target.value)}
          aria-label={tr({ es: '¿Qué tienes que estudiar?', en: 'What do you need to study?', ca: 'Què has d’estudiar?' })}
          placeholder={tr({ es: '¿Qué tienes que estudiar? Ej.: fracciones, la célula…', en: 'What do you need to study? E.g. fractions, the cell…', ca: 'Què has d’estudiar? Ex.: fraccions, la cèl·lula…' })}
          className="w-full rounded-2xl bg-white/[0.07] border border-white/15 focus:border-violet-400/70 focus:bg-white/[0.1] outline-none pl-12 pr-4 py-3.5 text-white placeholder-white/40 text-[15px] transition-colors"
        />
      </form>

      {escrito && (
        <div className="mt-2 rounded-2xl border border-white/10 bg-[#141b2e] overflow-hidden text-left">
          {resultados.length > 0 ? resultados.map(r => (
            <Link key={r.ruta} to={localPath(r.ruta)}
              className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] last:border-0 hover:bg-white/[0.05] transition-colors">
              <span className="text-xl shrink-0" aria-hidden="true">{r.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-white font-bold text-sm truncate">{r.label}</span>
                <span className="block text-white/40 text-xs truncate">{r.tipo === 'tema' ? r.sub : tr(TIPO[r.tipo])}</span>
              </span>
              <span className="text-white/30 text-sm" aria-hidden="true">→</span>
            </Link>
          )) : (
            <Link to={localPath('/temario')} className="block px-4 py-3 text-sm text-white/60 hover:text-white">
              {tr({ es: 'No lo encuentro con ese nombre. Mira todo el temario →', en: 'Nothing under that name. Browse the whole syllabus →', ca: 'No ho trobo amb aquest nom. Mira tot el temari →' })}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
