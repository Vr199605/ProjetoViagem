import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Calendar, BookOpen, Layers, Menu, X, ShieldCheck, Smartphone, ArrowRight } from 'lucide-react';
import { CONFIG } from '../config';

export default function Header({ plannedItemsCount = 0, onOpenPlanner, onBackToLanding, onOpenInstallModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/95 border-b border-slate-800 text-slate-100 shadow-sm transition-all duration-200">
      
      {/* Top Patent & Technology Ribbon - Clean & Authoritative */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 text-slate-300 text-[10px] sm:text-xs py-1.5 px-3 text-center font-medium tracking-wide flex flex-wrap items-center justify-center gap-1.5 overflow-hidden w-full max-w-full">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="text-center leading-tight">
          Tecnologia & Patente: <strong className="text-white font-semibold underline decoration-emerald-500/60">{CONFIG.PATENT_CREDIT}</strong>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group shrink-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 border border-slate-700/80 text-emerald-400 flex items-center justify-center shadow-xs shrink-0 group-hover:border-emerald-500/50 transition-colors">
            <Compass className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="shrink-0">
            <div className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white flex items-center leading-tight shrink-0">
              VOYAGER <span className="font-sans text-[10px] tracking-wider uppercase font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded ml-1.5 shrink-0">AI</span>
            </div>
            <span className="text-[10px] tracking-wide text-slate-400 uppercase font-medium hidden sm:block truncate">
              Metabusca Universal & Roteiros
            </span>
          </div>
        </div>

        {/* Desktop Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-300">
          {onBackToLanding && (
            <button 
              onClick={onBackToLanding}
              className="hover:text-white text-slate-200 transition-colors py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1.5"
              title="Voltar para a página de apresentação do VOYAGER AI"
            >
              <span>Apresentação</span>
            </button>
          )}
          <button 
            onClick={() => scrollTo('destinos-brasil')}
            className="hover:text-white transition-colors py-1 cursor-pointer"
          >
            <span>Destinos Brasil</span>
          </button>
          <button 
            onClick={() => scrollTo('destinos-globais')}
            className="hover:text-white transition-colors py-1 cursor-pointer"
          >
            <span>Destinos Globais</span>
          </button>
          <button 
            onClick={() => scrollTo('eventos-festivais')}
            className="hover:text-white transition-colors py-1 cursor-pointer"
          >
            <span>Eventos & Cultura</span>
          </button>
          <button 
            onClick={() => scrollTo('assistente-ia')}
            className="hover:text-emerald-300 text-emerald-400 font-semibold transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Montar Roteiro</span>
          </button>
        </nav>

        {/* Action Controls & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* PWA Install Button (Desktop & Tablet) */}
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="Instalar VOYAGER AI no Celular ou Computador"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instalar App</span>
            </button>
          )}

          {/* Roteiro Badge Counter if items added */}
          {plannedItemsCount > 0 && (
            <button
              onClick={onOpenPlanner}
              className="relative p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Itens no seu roteiro"
            >
              <Layers className="w-5 h-5 text-amber-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                {plannedItemsCount}
              </span>
            </button>
          )}

          {/* Primary CTA (Desktop & Tablet) */}
          <button
            onClick={() => scrollTo('assistente-ia')}
            className="hidden sm:flex px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide transition-all duration-150 shadow-sm items-center gap-1.5 cursor-pointer"
          >
            <span>Planejar Viagem</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer border border-slate-800"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-slate-200" /> : <Menu className="w-5 h-5 text-slate-200" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu - Clean Slate Surface */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 p-4 space-y-3 animate-fade-in shadow-xl text-slate-100 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            {onBackToLanding && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBackToLanding();
                }}
                className="text-left py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-white font-semibold transition-colors flex items-center justify-between border border-slate-800"
              >
                <span>Apresentação da Plataforma</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">Início</span>
              </button>
            )}

            <button
              onClick={() => scrollTo('destinos-brasil')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Destinos Brasil</span>
              <span className="text-xs text-slate-500">Capitais & Litoral</span>
            </button>

            <button
              onClick={() => scrollTo('destinos-globais')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Destinos Globais</span>
              <span className="text-xs text-slate-500">Europa, Ásia, Américas</span>
            </button>

            <button
              onClick={() => scrollTo('eventos-festivais')}
              className="text-left py-2 px-3 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Eventos & Cultura</span>
              <span className="text-xs text-slate-500">Festivais & Shows</span>
            </button>

            <button
              onClick={() => scrollTo('assistente-ia')}
              className="text-left py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-between transition-colors shadow-xs"
            >
              <span>Montar Roteiro Personalizado</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {onOpenInstallModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInstallModal();
                }}
                className="text-left py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 font-semibold flex items-center justify-between border border-slate-800 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Instalar Aplicativo no Celular</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">PWA</span>
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-normal">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Patente: {CONFIG.DEVELOPER_NAME}</span>
            </span>
          </div>
        </div>
      )}

    </header>
  );
}
