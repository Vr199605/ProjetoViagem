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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#040C1E]/95 border-b border-blue-900/60 text-white shadow-xl transition-all duration-300">
      
      {/* Patent & Creator Top Ribbon - Golden Disney Starlight */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white text-[10px] sm:text-xs py-1.5 px-4 text-center font-bold tracking-wider border-b border-blue-900/50 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Tecnologia & Patente Desenvolvida por: <strong className="text-amber-200 underline decoration-amber-400">{CONFIG.PATENT_CREDIT}</strong></span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-navy-950 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] shrink-0 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-navy-950" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-black tracking-wider text-white block leading-tight drop-shadow-sm">
              VOYAGER <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase font-black text-amber-300 bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 rounded-full ml-1">AI</span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-blue-200 uppercase font-medium line-clamp-1">
              Curadoria de Viagens • Victor R. C. Moreira
            </span>
          </div>
        </div>

        {/* Desktop Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-200">
          {onBackToLanding && (
            <button 
              onClick={onBackToLanding}
              className="hover:text-amber-300 text-white font-bold transition-all py-1.5 px-3.5 rounded-full bg-blue-950/80 hover:bg-blue-900 flex items-center gap-1.5 text-xs border border-blue-400/40 cursor-pointer shadow-sm"
              title="Voltar para a página de apresentação do VOYAGER AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Apresentação & Diferenciais</span>
            </button>
          )}
          <button 
            onClick={() => scrollTo('destinos-brasil')}
            className="hover:text-amber-300 transition-colors py-1 cursor-pointer"
          >
            <span>Destinos Brasil</span>
          </button>
          <button 
            onClick={() => scrollTo('destinos-globais')}
            className="hover:text-amber-300 transition-colors py-1 cursor-pointer"
          >
            <span>Destinos Globais</span>
          </button>
          <button 
            onClick={() => scrollTo('eventos-festivais')}
            className="hover:text-amber-300 transition-colors py-1 cursor-pointer"
          >
            <span>Eventos & Festivais</span>
          </button>
          <button 
            onClick={() => scrollTo('assistente-ia')}
            className="hover:text-emerald-300 text-emerald-400 font-bold transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Montar Roteiro</span>
          </button>
        </nav>

        {/* Action Controls & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Gemini AI Status Badge (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/80 border border-blue-400/30 text-xs font-semibold text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Gemini AI Integrado</span>
          </div>

          {/* Roteiro Badge Counter if items added */}
          {plannedItemsCount > 0 && (
            <button
              onClick={onOpenPlanner}
              className="relative p-2 text-white hover:text-emerald-400 transition-colors cursor-pointer"
              title="Itens no seu roteiro"
            >
              <Layers className="w-5 h-5 text-amber-300" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-navy-950 text-[10px] font-black rounded-full flex items-center justify-center">
                {plannedItemsCount}
              </span>
            </button>
          )}

          {/* Primary CTA (Desktop & Tablet) */}
          <button
            onClick={() => scrollTo('assistente-ia')}
            className="hidden sm:flex px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-extrabold tracking-wide uppercase transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.4)] items-center gap-2 group cursor-pointer border border-emerald-300/40"
          >
            <span>Planejar Viagem</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-200 hover:text-white hover:bg-blue-900/40 transition-colors cursor-pointer border border-blue-500/30"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-300" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu - Dark Royal Blue with Zero Overlap */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#06122C]/98 backdrop-blur-2xl border-b-2 border-blue-700/60 p-5 space-y-4 animate-fade-in shadow-2xl text-white">
          <div className="flex flex-col space-y-2.5 text-sm font-semibold">
            {onBackToLanding && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBackToLanding();
                }}
                className="text-left py-3 px-3.5 rounded-2xl bg-[#091D42] hover:bg-[#0E2C64] text-white font-bold transition-colors flex items-center justify-between border border-blue-400/40"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Apresentação & Diferenciais</span>
                </div>
                <span className="text-[10px] bg-amber-400 text-navy-950 font-black px-2 py-0.5 rounded-full">Início</span>
              </button>
            )}

            <button
              onClick={() => scrollTo('destinos-brasil')}
              className="text-left py-2.5 px-3.5 rounded-xl hover:bg-blue-900/40 text-slate-200 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Destinos Brasil</span>
              <span className="text-xs text-blue-300">Capitais & Litoral</span>
            </button>

            <button
              onClick={() => scrollTo('destinos-globais')}
              className="text-left py-2.5 px-3.5 rounded-xl hover:bg-blue-900/40 text-slate-200 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Destinos Globais</span>
              <span className="text-xs text-blue-300">Europa, Ásia, Américas</span>
            </button>

            <button
              onClick={() => scrollTo('eventos-festivais')}
              className="text-left py-2.5 px-3.5 rounded-xl hover:bg-blue-900/40 text-slate-200 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Eventos & Festivais</span>
              <span className="text-xs text-blue-300">Festivais & Shows</span>
            </button>

            <button
              onClick={() => scrollTo('assistente-ia')}
              className="text-left py-3 px-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold flex items-center justify-between border border-emerald-400/40 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Montar Roteiro com IA</span>
              </div>
              <span className="text-[10px] bg-amber-400 text-navy-950 font-black px-2 py-0.5 rounded-full">Magia</span>
            </button>
          </div>

          <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Patente: {CONFIG.DEVELOPER_NAME}</span>
            </span>
          </div>

          <button
            onClick={() => scrollTo('assistente-ia')}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-navy-950 font-black rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            <span>Planejar Viagem Agora</span>
            <Sparkles className="w-4 h-4 text-navy-950" />
          </button>
        </div>
      )}

    </header>
  );
}
