import React from 'react';
import { Compass, Calendar, MapPin, Users, CheckCircle2, ExternalLink, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { generateQuotationBreakdown } from '../data/quotations';
import { DESTINATIONS } from '../data/destinations';
import { CONFIG } from '../config';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';

export default function PDFDocumentTemplate({ planState, selectedEvents = [] }) {
  // Find destination details for photo and metadata
  const destObj = DESTINATIONS.find(d => 
    d.name.toLowerCase().includes(planState.destination?.toLowerCase()) ||
    planState.destination?.toLowerCase().includes(d.name.toLowerCase())
  ) || DESTINATIONS[1]; // fallback to Gramado

  // Quotations breakdown
  const quotations = generateQuotationBreakdown({
    destination: destObj,
    days: planState.days,
    travelers: planState.travelers,
    profile: planState.profile
  });

  const itinerary = planState.customItinerary || [];

  return (
    <div id="pdf-printable-document" className="bg-[#FAF9F6] text-navy-900 p-6 sm:p-12 max-w-[920px] mx-auto font-sans leading-relaxed selection:bg-emerald-500 selection:text-white">
      
      {/* 1. CAPA ESTILIZADA DE LUXO */}
      <div className="relative rounded-3xl overflow-hidden bg-navy-900 text-white mb-10 shadow-luxury">
        <div className="relative h-96 w-full overflow-hidden">
          <img
            src={getAssetUrl(destObj.image)}
            alt={planState.destination}
            className="w-full h-full object-cover filter brightness-[0.70]"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
          
          {/* Header Brand & Patent Credit */}
          <div className="absolute top-6 sm:top-8 left-6 sm:left-8 right-6 sm:right-8 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-serif text-lg tracking-widest font-bold block leading-none">VOYAGER AI</span>
                <span className="text-[9px] text-sand-300 font-medium">Patente: {CONFIG.DEVELOPER_NAME}</span>
              </div>
            </div>

            <div className="px-3.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-[10px] font-bold tracking-widest uppercase">
              Curadoria Bespoke
            </div>
          </div>

          {/* Cover Titles */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
            <span className="text-sand-300 text-xs uppercase tracking-widest font-semibold block mb-2">
              Dossiê de Viagem & Cotações Executivas
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white mb-4">
              {planState.destination}
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{planState.days} Dias • {planState.dates}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>{planState.travelersLabel || `${planState.travelers} viajantes`}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Estilo: {planState.profile}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. RESUMO EXECUTIVO & LOGÍSTICA DE TRANSPORTE */}
      <section className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <h2 className="font-serif text-xl sm:text-2xl text-navy-900 font-bold">1. Resumo Executivo & Logística</h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          Este itinerário sob medida foi estruturado para proporcionar uma experiência imersiva e sem fricções em <strong>{planState.destination}</strong>. 
          A logística contempla deslocamentos prioritários, balanceando manhãs culturais, almoços com foco na gastronomia de terroir e noites intimistas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-sand-50/80 border border-sand-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Logística de Transporte</span>
            <div className="text-xs font-bold text-navy-900">{planState.transport}</div>
            <div className="text-[11px] text-slate-500 mt-1">Transfers privativos pontuais entre aeroporto e hotel</div>
          </div>

          <div className="p-4 rounded-2xl bg-sand-50/80 border border-sand-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Clima & Época Ideal</span>
            <div className="text-xs font-bold text-navy-900">{destObj.bestSeason}</div>
            <div className="text-[11px] text-slate-500 mt-1">{destObj.vibe}</div>
          </div>

          <div className="p-4 rounded-2xl bg-sand-50/80 border border-sand-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Teto Orçamentário Alvo</span>
            <div className="text-xs font-bold text-emerald-700">R$ {planState.budget.toLocaleString('pt-BR')}</div>
            <div className="text-[11px] text-slate-500 mt-1">Estimativa balanceada para o grupo</div>
          </div>
        </div>
      </section>

      {/* 3. TABELA COMPARATIVA DE COTAÇÕES */}
      <section className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <h2 className="font-serif text-xl sm:text-2xl text-navy-900 font-bold">2. Comparativo de Cotações nas Plataformas</h2>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest font-bold">
            Base {planState.travelers} Pax • {planState.days} Diárias
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3 px-3">Categoria & Experiência</th>
                <th className="py-3 px-3">Parceiro / Canal</th>
                <th className="py-3 px-3">Diária Média Hotel</th>
                <th className="py-3 px-3">Total Estimado</th>
                <th className="py-3 px-3">Por Pessoa</th>
                <th className="py-3 px-3 text-right">Reserva Direta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotations.categories.map((tier, idx) => (
                <tr key={idx} className={tier.isRecommended ? 'bg-emerald-50/40 font-medium' : ''}>
                  <td className="py-4 px-3">
                    <div className="font-bold text-navy-900 flex items-center gap-1.5">
                      <span>{tier.tier}</span>
                      {tier.isRecommended && (
                        <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                          Recomendado
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{tier.description}</div>
                  </td>
                  <td className="py-4 px-3 text-slate-700 font-semibold">{tier.partner}</td>
                  <td className="py-4 px-3 text-navy-900 font-semibold">R$ {tier.hotelNight.toLocaleString('pt-BR')}</td>
                  <td className="py-4 px-3 font-bold text-navy-900">R$ {tier.totalEstimated.toLocaleString('pt-BR')}</td>
                  <td className="py-4 px-3 text-emerald-700 font-bold">R$ {tier.perPersonEstimated.toLocaleString('pt-BR')}</td>
                  <td className="py-4 px-3 text-right">
                    <a
                      href={tier.partnerId === 'booking' ? 'https://www.booking.com' : 'https://www.decolar.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 hover:text-emerald-600 underline"
                    >
                      <span>Acessar</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. ITINERÁRIO DIA A DIA DETALHADO */}
      <section className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <h2 className="font-serif text-xl sm:text-2xl text-navy-900 font-bold">3. Itinerário Dia a Dia Detalhado</h2>
        </div>

        <div className="space-y-6">
          {itinerary.map((dayItem) => (
            <div key={dayItem.day} className="border border-slate-200/90 rounded-2xl p-4 sm:p-5 bg-sand-50/30">
              
              {/* Day Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    D{dayItem.day}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-navy-900">
                    {dayItem.theme}
                  </h3>
                </div>
              </div>

              {/* Day Shift Blocks (Manhã, Tarde, Noite) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                {/* Morning */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider block mb-1">
                      ☀️ Manhã
                    </span>
                    <h4 className="font-bold text-navy-900 mb-1">{dayItem.morning.title}</h4>
                    <p className="text-slate-600 text-[11px] leading-relaxed mb-2">{dayItem.morning.activity}</p>
                  </div>
                  <div className="text-[10px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                    💡 <strong>Dica:</strong> {dayItem.morning.tip}
                  </div>
                </div>

                {/* Afternoon */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider block mb-1">
                      🌤️ Tarde
                    </span>
                    <h4 className="font-bold text-navy-900 mb-1">{dayItem.afternoon.title}</h4>
                    <p className="text-slate-600 text-[11px] leading-relaxed mb-2">{dayItem.afternoon.activity}</p>
                  </div>
                  <div className="text-[10px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                    💡 <strong>Dica:</strong> {dayItem.afternoon.tip}
                  </div>
                </div>

                {/* Evening */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider block mb-1">
                      🌙 Noite
                    </span>
                    <h4 className="font-bold text-navy-900 mb-1">{dayItem.evening.title}</h4>
                    <p className="text-slate-600 text-[11px] leading-relaxed mb-2">{dayItem.evening.activity}</p>
                  </div>
                  <div className="text-[10px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                    💡 <strong>Dica:</strong> {dayItem.evening.tip}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 5. ORÇAMENTO CONSOLIDADO POR PESSOA & GRUPO */}
      <section className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <h2 className="font-serif text-xl sm:text-2xl text-navy-900 font-bold">4. Orçamento Consolidado</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <span className="text-xs text-slate-500 font-medium block mb-2">Composição dos Custos Médios:</span>
            <div className="space-y-2.5 text-xs">
              {quotations.budgetItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <div>
                    <span className="font-bold text-navy-900">{item.category}</span>
                    <span className="text-[10px] text-slate-400 block">{item.note}</span>
                  </div>
                  <span className="font-bold text-navy-900">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-navy-900 text-white rounded-2xl p-6 text-center">
            <span className="text-[10px] uppercase tracking-widest text-sand-300 font-bold block mb-1">
              Investimento Total Médio Sugerido
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-normal text-white mb-2">
              R$ {quotations.categories[1].totalEstimated.toLocaleString('pt-BR')}
            </div>
            <div className="text-xs text-emerald-400 font-semibold mb-4">
              Aproximadamente R$ {quotations.categories[1].perPersonEstimated.toLocaleString('pt-BR')} por pessoa
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cálculo com margem de segurança de 10% para imprevistos</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER DO PDF COM PATENTE */}
      <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-navy-900" />
          <span>VOYAGER AI • Emitido em {new Date().toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="font-semibold text-navy-900">
          Tecnologia & Patente: {CONFIG.DEVELOPER_NAME}
        </div>
      </footer>

    </div>
  );
}
