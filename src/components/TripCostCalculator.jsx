import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Users, Calendar, Sparkles, PieChart, 
  ArrowRight, ShieldCheck, Check, Info, TrendingUp,
  CreditCard, Wallet, Plane, Hotel, Utensils, Ticket, ShoppingBag
} from 'lucide-react';
import { calculateDetailedCostBreakdown } from '../data/quotations';

export default function TripCostCalculator({ 
  destination, 
  days = 5, 
  travelers = 2,
  onUpdatePlan,
  onNotify
}) {
  const [viewMode, setViewMode] = useState('perPerson'); // 'perPerson' | 'totalGroup'
  const [tier, setTier] = useState('conforto'); // 'economico' | 'conforto' | 'luxo'
  const [activeDays, setActiveDays] = useState(days || 5);
  const [activeTravelers, setActiveTravelers] = useState(travelers || 2);

  // Sync if parent props change
  React.useEffect(() => {
    if (days) setActiveDays(days);
    if (travelers) setActiveTravelers(travelers);
  }, [days, travelers]);

  // Compute live breakdown
  const breakdown = useMemo(() => {
    return calculateDetailedCostBreakdown({
      destination,
      days: activeDays,
      travelers: activeTravelers,
      tier
    });
  }, [destination, activeDays, activeTravelers, tier]);

  const handleApplyToPlan = () => {
    if (onUpdatePlan) {
      onUpdatePlan({
        budget: breakdown.totalGroup,
        days: activeDays,
        travelers: activeTravelers
      });
      onNotify?.({
        type: 'success',
        title: 'Orçamento Atualizado',
        message: `O teto orçamentário do roteiro foi atualizado para R$ ${breakdown.totalGroup.toLocaleString('pt-BR')}.`
      });
    }
  };

  const TIERS = [
    {
      id: 'economico',
      label: 'Econômico',
      icon: '🎒',
      desc: 'Pousadas e hotéis funcionais, voos com conexão e passeios autônomos'
    },
    {
      id: 'conforto',
      label: 'Conforto (Recomendado)',
      icon: '🌟',
      desc: 'Hotéis 3-4★ bem avaliados, voos diretos e gastronomia selecionada'
    },
    {
      id: 'luxo',
      label: 'Luxo & Exclusividade',
      icon: '💎',
      desc: 'Resorts 5★, classe executiva, transfers VIP e jantares de gala'
    }
  ];

  return (
    <div className="bg-[#05132D] rounded-3xl border-2 border-emerald-500/40 p-4 sm:p-7 shadow-[0_0_40px_rgba(0,0,0,0.8)] text-white relative overflow-hidden backdrop-blur-md">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* 1. Header with Title & View Mode Toggle */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-blue-900/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
            <PieChart className="w-3.5 h-3.5 text-emerald-300" />
            <span>Planejamento Financeiro da Viagem</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
            Calculadora de Custo Total por Pessoa
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light">
            Desmembramento do orçamento em <strong className="text-amber-300 font-semibold">5 categorias essenciais</strong> para {breakdown.destinationName} ({activeDays} dias e {activeTravelers} {activeTravelers === 1 ? 'viajante' : 'viajantes'}).
          </p>
        </div>

        {/* View Mode Toggle (Por Pessoa vs Total do Grupo) */}
        <div className="flex items-center bg-[#07193C] p-1.5 rounded-2xl border border-blue-500/30 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={() => setViewMode('perPerson')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'perPerson'
                ? 'bg-emerald-500 text-navy-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            👤 Por Pessoa
          </button>
          <button
            type="button"
            onClick={() => setViewMode('totalGroup')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'totalGroup'
                ? 'bg-emerald-500 text-navy-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            👥 Total do Grupo ({activeTravelers}x)
          </button>
        </div>
      </div>

      {/* 2. Controls: Tier Selector & Parameters (Days & Travelers) */}
      <div className="relative z-10 py-6 border-b border-blue-900/60 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* Tier Selector */}
        <div className="lg:col-span-8">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Padrão de Viagem & Hospedagem:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  tier === t.id
                    ? 'bg-gradient-to-br from-[#0B2E24] to-[#0A2244] border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/50'
                    : 'bg-[#071838] border-blue-900/60 hover:border-slate-500 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-base">{t.icon}</span>
                  {tier === t.id && (
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center text-[10px] font-black">
                      ✓
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs text-white leading-tight mb-1">{t.label}</div>
                <div className="text-[10px] text-slate-400 line-clamp-2 leading-tight">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Days & Travelers Quick Adjusters */}
        <div className="lg:col-span-4 bg-[#07193C] p-3.5 rounded-2xl border border-blue-500/30 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Duração:</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveDays(Math.max(2, activeDays - 1))}
                className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-500/40 text-white font-bold hover:bg-blue-900 cursor-pointer flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="font-bold text-white text-xs w-12 text-center">{activeDays} dias</span>
              <button
                type="button"
                onClick={() => setActiveDays(Math.min(30, activeDays + 1))}
                className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-500/40 text-white font-bold hover:bg-blue-900 cursor-pointer flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>Viajantes:</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTravelers(Math.max(1, activeTravelers - 1))}
                className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-500/40 text-white font-bold hover:bg-blue-900 cursor-pointer flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="font-bold text-white text-xs w-12 text-center">{activeTravelers} {activeTravelers === 1 ? 'pax' : 'pax'}</span>
              <button
                type="button"
                onClick={() => setActiveTravelers(Math.min(10, activeTravelers + 1))}
                className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-500/40 text-white font-bold hover:bg-blue-900 cursor-pointer flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Big Numbers Summary Cards */}
      <div className="relative z-10 py-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#07193C] border border-blue-500/30">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            {viewMode === 'perPerson' ? 'Custo Total Por Pessoa' : 'Total Consolidado da Viagem'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-serif">
            R$ {(viewMode === 'perPerson' ? breakdown.totalPerPerson : breakdown.totalGroup).toLocaleString('pt-BR')}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {viewMode === 'perPerson' 
              ? `Base ${activeDays} dias • todas as 5 categorias` 
              : `Total para o grupo de ${activeTravelers} pessoas`}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#07193C] border border-blue-500/30">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Média Diária Por Pessoa
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-serif">
            R$ {breakdown.dailyAveragePerPerson.toLocaleString('pt-BR')}
            <span className="text-xs font-normal text-slate-300 ml-1">/ dia</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Incluindo aéreo rateado, hotel, refeições e passeios
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#07193C] border border-blue-500/30 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              {viewMode === 'perPerson' ? 'Total do Grupo Completo' : 'Custo Individual'}
            </span>
            <div className="text-xl sm:text-2xl font-bold text-white font-serif">
              R$ {(viewMode === 'perPerson' ? breakdown.totalGroup : breakdown.totalPerPerson).toLocaleString('pt-BR')}
            </div>
          </div>
          {onUpdatePlan && (
            <button
              type="button"
              onClick={handleApplyToPlan}
              className="mt-2 py-1.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-navy-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Aplicar ao Roteiro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Proportional Budget Visual Bar */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2">
          <span className="font-bold uppercase tracking-wider text-slate-400">Distribuição Percentual do Orçamento</span>
          <span>100% Coberto</span>
        </div>
        
        <div className="h-3.5 w-full rounded-full bg-slate-900 overflow-hidden flex shadow-inner">
          {breakdown.categories.map((cat) => (
            <div
              key={cat.id}
              style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
              className="h-full transition-all duration-500 hover:opacity-90 relative group"
              title={`${cat.name}: ${cat.percentage}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2.5 text-[11px] text-slate-300">
          {breakdown.categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="font-medium text-white">{cat.name}:</span>
              <span className="text-slate-400">{cat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. The 5 Detailed Category Cards (Desmembramento Exato) */}
      <div className="relative z-10 space-y-3">
        {breakdown.categories.map((cat) => {
          const displayCost = viewMode === 'perPerson' ? cat.costPerPerson : cat.costTotal;

          return (
            <div
              key={cat.id}
              className={`p-4 rounded-2xl border bg-gradient-to-r ${cat.bgClass} flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl p-2 rounded-xl bg-black/30 shrink-0">
                  {cat.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm text-white">{cat.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cat.tagColor}`}>
                      {cat.percentage}% do total
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-snug font-light">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <div className="text-lg sm:text-xl font-black text-white font-serif">
                  R$ {displayCost.toLocaleString('pt-BR')}
                </div>
                <div className="text-[10px] text-slate-400">
                  {viewMode === 'perPerson' ? 'estimado por pessoa' : `total para o grupo (${activeTravelers}x)`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Footer Payment & Planning Advice */}
      <div className="relative z-10 mt-6 pt-4 border-t border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-light">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Passagens e hotéis podem ser parcelados em até 10x ou 12x sem juros pelas plataformas.</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-300 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Estimativas com base em tarifas reais de mercado</span>
        </div>
      </div>

    </div>
  );
}
