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
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-7 shadow-lg text-slate-100 relative overflow-hidden">
      
      {/* 1. Header with Title & View Mode Toggle */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-2">
            <PieChart className="w-3.5 h-3.5 text-emerald-400" />
            <span>Planejamento Orçamentário Estruturado</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
            Calculadora de Custo Total por Pessoa
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-normal">
            Desmembramento do orçamento em <strong className="text-slate-200 font-semibold">5 categorias essenciais</strong> para {breakdown.destinationName} ({activeDays} dias e {activeTravelers} {activeTravelers === 1 ? 'viajante' : 'viajantes'}).
          </p>
        </div>

        {/* View Mode Toggle (Por Pessoa vs Total do Grupo) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={() => setViewMode('perPerson')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'perPerson'
                ? 'bg-slate-800 text-white font-semibold shadow-2xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👤 Por Pessoa
          </button>
          <button
            type="button"
            onClick={() => setViewMode('totalGroup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'totalGroup'
                ? 'bg-slate-800 text-white font-semibold shadow-2xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👥 Total do Grupo ({activeTravelers}x)
          </button>
        </div>
      </div>

      {/* 2. Controls: Tier Selector & Parameters (Days & Travelers) */}
      <div className="relative z-10 py-5 border-b border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        
        {/* Tier Selector */}
        <div className="lg:col-span-8">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Padrão de Viagem & Hospedagem:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  tier === t.id
                    ? 'bg-slate-800 border-emerald-500/80 text-white shadow-2xs ring-1 ring-emerald-500/40'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-base">{t.icon}</span>
                  {tier === t.id && (
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-white leading-tight mb-1">{t.label}</div>
                <div className="text-[10px] text-slate-400 line-clamp-2 leading-tight">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Days & Travelers Quick Adjusters */}
        <div className="lg:col-span-4 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Duração:</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveDays(Math.max(2, activeDays - 1))}
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold hover:bg-slate-800 cursor-pointer flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="font-semibold text-white text-xs w-12 text-center">{activeDays} dias</span>
              <button
                type="button"
                onClick={() => setActiveDays(Math.min(30, activeDays + 1))}
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold hover:bg-slate-800 cursor-pointer flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Viajantes:</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTravelers(Math.max(1, activeTravelers - 1))}
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold hover:bg-slate-800 cursor-pointer flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="font-semibold text-white text-xs w-12 text-center">{activeTravelers} {activeTravelers === 1 ? 'pax' : 'pax'}</span>
              <button
                type="button"
                onClick={() => setActiveTravelers(Math.min(10, activeTravelers + 1))}
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-bold hover:bg-slate-800 cursor-pointer flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Big Numbers Summary Cards */}
      <div className="relative z-10 py-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
            {viewMode === 'perPerson' ? 'Custo Total Por Pessoa' : 'Total Consolidado da Viagem'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-serif">
            R$ {(viewMode === 'perPerson' ? breakdown.totalPerPerson : breakdown.totalGroup).toLocaleString('pt-BR')}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {viewMode === 'perPerson' 
              ? `Base ${activeDays} dias • 5 categorias cobertas` 
              : `Total para o grupo de ${activeTravelers} pessoas`}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
            Média Diária Por Pessoa
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-serif">
            R$ {breakdown.dailyAveragePerPerson.toLocaleString('pt-BR')}
            <span className="text-xs font-normal text-slate-400 ml-1">/ dia</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Aéreo rateado, hospedagem, alimentação e passeios
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
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
              className="mt-2 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Aplicar ao Roteiro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. Proportional Budget Visual Bar */}
      <div className="relative z-10 mb-5">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
          <span className="font-semibold uppercase tracking-wider text-slate-400">Distribuição Percentual do Orçamento</span>
          <span className="text-slate-300 font-medium">100% Coberto</span>
        </div>
        
        <div className="h-3 w-full rounded-full bg-slate-950 overflow-hidden flex border border-slate-800">
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
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="font-medium text-slate-200">{cat.name}:</span>
              <span className="text-slate-400">{cat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. The 5 Detailed Category Cards */}
      <div className="relative z-10 space-y-2.5">
        {breakdown.categories.map((cat) => {
          const displayCost = viewMode === 'perPerson' ? cat.costPerPerson : cat.costTotal;

          return (
            <div
              key={cat.id}
              className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-950/90 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                  {cat.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-sm text-white">{cat.name}</h4>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-700 bg-slate-900 text-slate-300">
                      {cat.percentage}% do total
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug font-normal">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="text-base sm:text-lg font-bold text-white font-serif">
                  R$ {displayCost.toLocaleString('pt-BR')}
                </div>
                <div className="text-[10px] text-slate-400">
                  {viewMode === 'perPerson' ? 'estimado por pessoa' : `total grupo (${activeTravelers}x)`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Footer Payment & Planning Advice */}
      <div className="relative z-10 mt-5 pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-normal">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Passagens e hotéis podem ser parcelados em até 10x ou 12x sem juros pelas plataformas.</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Estimativas com base em tarifas de mercado</span>
        </div>
      </div>

    </div>
  );
}
