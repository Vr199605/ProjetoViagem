import React from 'react';
import { Compass, Sparkles, MapPin, Calendar, BookOpen, Layers } from 'lucide-react';

export default function Header({ plannedItemsCount = 0, onOpenPlanner }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 border-b border-slate-100/90 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center shadow-soft">
            <Compass className="w-5 h-5 text-sand-200 animate-spin-slow" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-wider text-navy-900 block leading-tight">
              VOYAGER <span className="font-sans text-xs tracking-widest uppercase font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-1">AI</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-500 uppercase font-medium">
              Curadoria de Viagens & Roteiros
            </span>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button 
            onClick={() => scrollTo('destinos-brasil')}
            className="hover:text-navy-900 transition-colors py-1 flex items-center gap-1.5"
          >
            <span>Destinos Brasil</span>
          </button>
          <button 
            onClick={() => scrollTo('destinos-globais')}
            className="hover:text-navy-900 transition-colors py-1 flex items-center gap-1.5"
          >
            <span>Destinos Globais</span>
          </button>
          <button 
            onClick={() => scrollTo('eventos-festivais')}
            className="hover:text-navy-900 transition-colors py-1 flex items-center gap-1.5"
          >
            <span>Eventos & Festivais</span>
          </button>
          <button 
            onClick={() => scrollTo('assistente-ia')}
            className="hover:text-emerald-700 text-emerald-600 font-semibold transition-colors py-1 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Montar Roteiro</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          
          {/* Gemini AI Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Gemini AI Integrado</span>
          </div>

          {/* Roteiro Badge Counter if items added */}
          {plannedItemsCount > 0 && (
            <button
              onClick={onOpenPlanner}
              className="relative p-2 text-navy-900 hover:text-emerald-600 transition-colors"
              title="Itens no seu roteiro"
            >
              <Layers className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {plannedItemsCount}
              </span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => scrollTo('assistente-ia')}
            className="px-5 py-2.5 rounded-full bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold tracking-wide uppercase transition-all duration-200 shadow-soft hover:shadow-luxury flex items-center gap-2 group"
          >
            <span>Planejar Viagem Agora</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
          </button>
        </div>

      </div>
    </header>
  );
}
