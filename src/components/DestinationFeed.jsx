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
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Coleção Voyager
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-900 font-normal tracking-tight">
          Destinos Selecionados & Cenários Singulares
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-500 font-light leading-relaxed">
          Curadoria criteriosa de recantos preservados, capitais mundiais e refúgios enogastronômicos com infraestrutura de alto padrão.
        </p>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-navy-900 text-white shadow-soft'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 hover:text-navy-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: DESTINOS BRASIL */}
      <div id="destinos-brasil" className="scroll-mt-28 mb-16">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200/70">
          <div>
            <h3 className="font-serif text-2xl text-navy-900 font-normal">Destinos Brasil</h3>
            <p className="text-xs text-slate-500 mt-0.5">O melhor do litoral, serra e ecoturismo nacional</p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {brasilDestinations.length} {brasilDestinations.length === 1 ? 'destino' : 'destinos'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brasilDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSelected={plannedDestinationId === dest.id}
              onInclude={() => handleInclude(dest)}
            />
          ))}
        </div>
      </div>

      {/* SECTION 2: DESTINOS GLOBAIS */}
      <div id="destinos-globais" className="scroll-mt-28">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200/70">
          <div>
            <h3 className="font-serif text-2xl text-navy-900 font-normal">Destinos Globais</h3>
            <p className="text-xs text-slate-500 mt-0.5">Grandes capitais culturais, arte e vilas históricas internacionais</p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {globalDestinations.length} {globalDestinations.length === 1 ? 'destino' : 'destinos'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {globalDestinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              isSelected={plannedDestinationId === dest.id}
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
    <div className={`card-hover-effect group rounded-3xl bg-white border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
      isSelected 
        ? 'border-emerald-500 shadow-luxury ring-2 ring-emerald-500/20' 
        : 'border-slate-100/90 shadow-soft'
    }`}>
      
      {/* 16:9 HD Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Category Pill Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy-900 text-[11px] font-bold tracking-wider uppercase shadow-sm">
            {destination.category}
          </span>
        </div>

        {/* Airport / State Code */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 rounded-full bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase">
            {destination.airportCode}
          </span>
        </div>

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent opacity-60" />
        
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <span className="text-[11px] font-medium tracking-wide text-sand-200">
            {destination.vibe}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-serif text-2xl font-normal text-navy-900 group-hover:text-emerald-700 transition-colors">
                {destination.name}
              </h4>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{destination.state ? `${destination.state}, ` : ''}{destination.country}</span>
              </p>
            </div>
            
            {/* Daily Estimate Badge */}
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Média Diária</span>
              <span className="text-sm font-bold text-navy-900">
                R$ {destination.dailyBudget.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          {/* Highlights & Best Season */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>{destination.bestSeason}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sugerido: {destination.recommendedDays} dias</span>
            </div>
          </div>
        </div>

        {/* Action Button: Incluir no Roteiro */}
        <div className="mt-5">
          <button
            type="button"
            onClick={onInclude}
            className={`w-full py-2.5 px-4 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isSelected
                ? 'bg-emerald-600 text-white shadow-soft'
                : 'bg-slate-50 hover:bg-navy-900 hover:text-white text-navy-900 border border-slate-200/80 hover:border-navy-900'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Incluído no Roteiro Atual</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Incluir no Roteiro</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
