import React, { useState } from 'react';
import { DESTINATIONS, CATEGORIES } from '../data/destinations';
import { MapPin, Sun, Calendar, Plus, Check, ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

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
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Coleção VOYAGER • Destinos Selecionados</span>
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
          Destinos Selecionados & Cenários Singulares
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
          Curadoria criteriosa de recantos preservados, capitais mundiais e refúgios enogastronômicos com infraestrutura de alto padrão.
        </p>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mt-7 overflow-x-auto no-scrollbar pb-2 w-full max-w-full px-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: DESTINOS BRASIL */}
      <div id="destinos-brasil" className="scroll-mt-28 mb-14">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">Destinos Brasil</h3>
            <p className="text-xs text-slate-400 mt-0.5">O melhor do litoral, serra e ecoturismo nacional</p>
          </div>
          <span className="text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
            {brasilDestinations.length} {brasilDestinations.length === 1 ? 'destino' : 'destinos'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">Destinos Globais</h3>
            <p className="text-xs text-slate-400 mt-0.5">Grandes capitais culturais, arte e vilas históricas internacionais</p>
          </div>
          <span className="text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
            {globalDestinations.length} {globalDestinations.length === 1 ? 'destino' : 'destinos'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className={`rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 ${
      isSelected 
        ? 'bg-slate-900 border-2 border-emerald-500 shadow-md ring-1 ring-emerald-500/30' 
        : 'bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-sm'
    }`}>
      
      {/* 16:10 HD Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={getAssetUrl(destination.image)}
          alt={destination.name}
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={handleImageError}
        />
        
        {/* Category Pill Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-200 text-[10px] font-semibold tracking-wider uppercase border border-slate-800">
            {destination.category}
          </span>
        </div>

        {/* Airport / State Code */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-300 text-[10px] font-medium uppercase border border-slate-800">
            {destination.airportCode}
          </span>
        </div>

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-2.5 left-3.5 right-3.5 text-white">
          <span className="text-xs font-medium tracking-wide text-slate-200 line-clamp-1">
            {destination.vibe}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                {destination.name}
              </h4>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{destination.state ? `${destination.state}, ` : ''}{destination.country}</span>
              </p>
            </div>
            
            {/* Daily Estimate Badge */}
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block whitespace-nowrap">Média Diária</span>
              <span className="text-sm sm:text-base font-bold text-white whitespace-nowrap">
                R$ {destination.dailyBudget.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {destination.description}
          </p>

          {/* Highlights & Best Season */}
          <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <Sun className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{destination.bestSeason}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Sugerido: {destination.recommendedDays} dias</span>
            </div>
          </div>
        </div>

        {/* Action Button: Incluir no Roteiro */}
        <div className="mt-4">
          <button
            type="button"
            onClick={onInclude}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
              isSelected
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Destino Ativo no Roteiro</span>
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

