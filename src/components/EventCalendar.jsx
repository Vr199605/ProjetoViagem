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
    <section id="eventos-festivais" className="py-16 bg-[#040D22] border-y border-blue-900/60 scroll-mt-24 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Calendário Global & Grandes Experiências</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
              Eventos Culturais, Festivais & Maratonas
            </h2>
            <p className="mt-2 text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
              Planeje sua viagem sincronizada com os momentos mais marcantes do cinema, alta gastronomia, esportes e espetáculos pelo mundo.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full max-w-full">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setFilterType(opt)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
                  filterType === opt
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(251,191,36,0.35)]'
                    : 'bg-[#071736] text-slate-300 border border-blue-500/30 hover:border-amber-400/50 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((item) => {
            const isAdded = selectedEvents.some(e => e.id === item.id);

            return (
              <div
                key={item.id}
                className="bg-[#071736] rounded-3xl border border-blue-500/30 hover:border-amber-400/60 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between card-hover-effect"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={getAssetUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-navy-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[10px] font-bold tracking-wider uppercase">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date Badge */}
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.date}</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-blue-200 mt-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-blue-300" />
                      <span>{item.city}, {item.country}</span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4 font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-3 border-t border-blue-900/60">
                    <div className="flex items-center justify-between text-[11px] text-slate-300 mb-3">
                      <span>Ingressos médios:</span>
                      <strong className="text-amber-300 font-bold">{item.averageTicket}</strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Ticket deeplink */}
                      <a
                        href={item.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl border border-blue-400/30 hover:border-amber-400/60 bg-[#0A2248] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>Ingressos</span>
                        <ExternalLink className="w-3 h-3 text-slate-300" />
                      </a>

                      {/* Add to plan */}
                      <button
                        type="button"
                        onClick={() => handleAddEvent(item)}
                        className={`py-2.5 px-3 rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                            : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
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
