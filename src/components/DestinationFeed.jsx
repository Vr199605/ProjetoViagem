import React, { useState } from 'react';
import { DESTINATIONS, CATEGORIES } from '../data/destinations';
import { MapPin, Sun, Calendar, Plus, Check, ArrowUpRight, Sparkles } from 'lucide-react';

export default function DestinationFeed({ onIncludeInPlan, plannedDestinationId, onNotify }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredDestinations = DESTINATIONS.filter(item => {
    if (selectedCategory === 'Todos') return true;
    return item.tags.includes(selectedCategory) || item.category === selectedCategory;
  });

  const brasilDestinations = filteredDestinations.filter(d => d.country === 'Brasil');
  const globalDestinations = filteredDestinations.filter(d => d.country !== 'Brasil');

  const handleInclude = (dest) => {
    onIncludeInPlan(dest);
    onNotify?.({
      type: 'success',
      title: 'Destino Selecionado',
      message: `${dest.name} foi adicionado como destino principal no Assistente de Roteiro.`
    });
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 border border-amber-400/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Coleção Voyager • Destinos Mágicos</span>
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
          Destinos Selecionados & Cenários Singulares
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Curadoria criteriosa de recantos preservados, capitais mundiais e refúgios enogastronômicos com infraestrutura de alto padrão.
        </p>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-[#08183A] text-slate-300 border border-blue-500/30 hover:border-amber-400/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: DESTINOS BRASIL */}
      <div id="destinos-brasil" className="scroll-mt-28 mb-16">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-blue-900/60">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">Destinos Brasil</h3>
            <p className="text-xs text-slate-300 mt-0.5">O melhor do litoral, serra e ecoturismo nacional</p>
          </div>
          <span className="text-xs font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full">
            {brasilDestinations.length} {brasilDestinations.length === 1 ? 'destino' : 'destinos'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {brasilDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSelected={plannedDestinationId === dest.name}
              onInclude={() => handleInclude(dest)}
            />
          ))}
        </div>
      </div>

      {/* SECTION 2: DESTINOS GLOBAIS */}
      <div id="destinos-globais" className="scroll-mt-28">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-blue-900/60">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">Destinos Globais</h3>
            <p className="text-xs text-slate-300 mt-0.5">Grandes capitais culturais, arte e vilas históricas internacionais</p>
          </div>
          <span className="text-xs font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full">
            {globalDestinations.length} {globalDestinations.length === 1 ? 'destino' : 'destinos'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {globalDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSelected={plannedDestinationId === dest.name}
              onInclude={() => handleInclude(dest)}
            />
          ))}
        </div>
      </div>

    </section>
  );
}

function DestinationCard({ destination, isSelected, onInclude }) {
  return (
    <div className={`card-hover-effect group rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
      isSelected 
        ? 'bg-[#092B22] border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)] ring-2 ring-emerald-400/30' 
        : 'bg-[#071736]/90 border border-blue-500/30 hover:border-amber-400/60 shadow-xl'
    }`}>
      
      {/* 16:9 HD Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Category Pill Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-[#05112B]/90 backdrop-blur-md text-amber-300 text-[11px] font-black tracking-wider uppercase border border-amber-400/40 shadow-sm">
            {destination.category}
          </span>
        </div>

        {/* Airport / State Code */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 rounded-full bg-navy-950/90 backdrop-blur-md text-white text-[10px] font-black uppercase">
            {destination.airportCode}
          </span>
        </div>

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040C1E] via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-xs font-semibold tracking-wide text-amber-200">
            {destination.vibe}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {destination.name}
              </h4>
              <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{destination.state ? `${destination.state}, ` : ''}{destination.country}</span>
              </p>
            </div>
            
            {/* Daily Estimate Badge */}
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Média Diária</span>
              <span className="text-sm sm:text-base font-black text-amber-300">
                R$ {destination.dailyBudget.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-light">
            {destination.description}
          </p>

          {/* Highlights & Best Season */}
          <div className="mt-4 pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{destination.bestSeason}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sugerido: {destination.recommendedDays} dias</span>
            </div>
          </div>
        </div>

        {/* Action Button: Incluir no Roteiro */}
        <div className="mt-5">
          <button
            type="button"
            onClick={onInclude}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-black tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isSelected
                ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                : 'bg-[#0A2248] hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-white border border-blue-400/40 hover:border-transparent'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Destino Atual no Roteiro</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Escolher para meu Roteiro</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

