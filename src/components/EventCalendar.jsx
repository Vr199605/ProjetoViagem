import React, { useState } from 'react';
import { EVENTS } from '../data/events';
import { Calendar, MapPin, Ticket, ExternalLink, Plus, Check, Sparkles } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

export default function EventCalendar({ onAddEventToPlan, selectedEvents = [], onNotify }) {
  const [filterType, setFilterType] = useState('Todos');

  const filterOptions = ['Todos', 'Brasil', 'Internacional', 'Cultura & Luxo', 'Esporte & Saúde'];

  const filteredEvents = EVENTS.filter(ev => {
    if (filterType === 'Todos') return true;
    if (filterType === 'Brasil') return ev.country === 'Brasil';
    if (filterType === 'Internacional') return ev.country !== 'Brasil';
    if (filterType === 'Cultura & Luxo') return ev.category.includes('Cultura') || ev.tag.includes('Cultura');
    if (filterType === 'Esporte & Saúde') return ev.category.includes('Esporte');
    return true;
  });

  const handleAddEvent = (event) => {
    onAddEventToPlan(event);
    onNotify?.({
      type: 'success',
      title: 'Evento Adicionado',
      message: `"${event.title}" em ${event.city} foi vinculado ao seu itinerário de viagem.`
    });
  };

  return (
    <section id="eventos-festivais" className="py-14 sm:py-20 bg-slate-950 border-y border-slate-800 scroll-mt-24 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Calendário Global & Grandes Experiências</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
              Eventos Culturais, Festivais & Maratonas
            </h2>
            <p className="mt-2 text-sm text-slate-400 font-normal max-w-2xl leading-relaxed">
              Planeje sua viagem sincronizada com os momentos mais marcantes do cinema, alta gastronomia, esportes e espetáculos pelo mundo.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full max-w-full">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterType(opt)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer ${
                  filterType === opt
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredEvents.map((item) => {
            const isAdded = selectedEvents.some(e => e.id === item.id);

            return (
              <div
                key={item.id}
                className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                  <img
                    src={getAssetUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-800 text-[10px] font-medium tracking-wider uppercase">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date Badge */}
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.date}</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-2.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.city}, {item.country}</span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4 font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                      <span>Ingressos médios:</span>
                      <strong className="text-slate-200 font-semibold">{item.averageTicket}</strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Ticket deeplink */}
                      <a
                        href={item.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Ingressos</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>

                      {/* Add to plan */}
                      <button
                        type="button"
                        onClick={() => handleAddEvent(item)}
                        className={`py-2 px-3 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Adicionado</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
