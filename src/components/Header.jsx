import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Calendar, BookOpen, Layers, Menu, X, ShieldCheck } from 'lucide-react';
import { CONFIG } from '../config';

export default function Header({ plannedItemsCount = 0, onOpenPlanner, onBackToLanding }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-slate-150 transition-all duration-300">
      
      {/* Patent & Creator Top Ribbon */}
      <div className="bg-navy-900 text-sand-200 text-[10px] sm:text-[11px] py-1 px-4 text-center font-medium tracking-wider border-b border-navy-800 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>Tecnologia & Patente: <strong>{CONFIG.PATENT_CREDIT}</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-navy-900 text-white flex items-center justify-center shadow-soft shrink-0">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-sand-200" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-navy-900 block leading-tight">
              VOYAGER <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase font-extrabold text-emerald-600 bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full ml-1">AI</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-500 uppercase font-medium line-clamp-1">
              Curadoria de Viagens • Victor R. C. Moreira
            </span>
          </div>
        </div>

        {/* Desktop Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {onBackToLanding && (
            <button 
              onClick={onBackToLanding}
              className="hover:text-emerald-700 text-navy-900 font-bold transition-all py-1 px-3 rounded-full bg-slate-100/90 hover:bg-emerald-50 flex items-center gap-1.5 text-xs border border-slate-200 cursor-pointer"
              title="Voltar para a página de apresentação do VOYAGER AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Apresentação & Diferenciais</span>
            </button>
          )}
          <button 
            onClick={() => scrollTo('destinos-brasil')}
            className="hover:text-navy-900 transition-colors py-1 cursor-pointer"
          >
            <span>Destinos Brasil</span>
          </button>
          <button 
            onClick={() => scrollTo('destinos-globais')}
            className="hover:text-navy-900 transition-colors py-1 cursor-pointer"
          >
            <span>Destinos Globais</span>
          </button>
          <button 
            onClick={() => scrollTo('eventos-festivais')}
            className="hover:text-navy-900 transition-colors py-1 cursor-pointer"
          >
            <span>Eventos & Festivais</span>
          </button>
          <button 
            onClick={() => scrollTo('assistente-ia')}
            className="hover:text-emerald-700 text-emerald-600 font-semibold transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Montar Roteiro</span>
          </button>
        </nav>

        {/* Action Controls & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Gemini AI Status Badge (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Gemini AI Integrado</span>
          </div>

          {/* Roteiro Badge Counter if items added */}
          {plannedItemsCount > 0 && (
            <button
              onClick={onOpenPlanner}
              className="relative p-2 text-navy-900 hover:text-emerald-600 transition-colors cursor-pointer"
              title="Itens no seu roteiro"
            >
              <Layers className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {plannedItemsCount}
              </span>
            </button>
          )}

          {/* Primary CTA (Desktop & Tablet) */}
          <button
            onClick={() => scrollTo('assistente-ia')}
            className="hidden sm:flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-navy-900 hover:bg-navy-800 text-white text-[11px] sm:text-xs font-semibold tracking-wide uppercase transition-all duration-200 shadow-soft hover:shadow-luxury items-center gap-2 group cursor-pointer"
          >
            <span>Planejar Viagem</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-navy-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 p-5 space-y-4 animate-fade-in shadow-modal">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-slate-700">
            {onBackToLanding && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBackToLanding();
                }}
                className="text-left py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 text-navy-900 font-bold transition-colors flex items-center justify-between border border-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Apresentação & Diferenciais</span>
                </div>
                <span className="text-[10px] bg-navy-900 text-white px-2 py-0.5 rounded-full">Início</span>
              </button>
            )}

            <button
              onClick={() => scrollTo('destinos-brasil')}
              className="text-left py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Destinos Brasil</span>
              <span className="text-xs text-slate-400">Capitais & Litoral</span>
            </button>

            <button
              onClick={() => scrollTo('destinos-globais')}
              className="text-left py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Destinos Globais</span>
              <span className="text-xs text-slate-400">Europa, Ásia, Américas</span>
            </button>

            <button
              onClick={() => scrollTo('eventos-festivais')}
              className="text-left py-2 px-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <span>Eventos & Festivais</span>
              <span className="text-xs text-slate-400">Festivais & Maratonas</span>
            </button>

            <button
              onClick={() => scrollTo('assistente-ia')}
              className="text-left py-2 px-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Montar Roteiro com IA</span>
              </div>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">Novo</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Patente: {CONFIG.DEVELOPER_NAME}</span>
            </span>
          </div>

          <button
            onClick={() => scrollTo('assistente-ia')}
            className="w-full py-3 bg-navy-900 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Planejar Viagem Agora</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      )}

    </header>
  );
}
