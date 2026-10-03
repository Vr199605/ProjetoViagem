import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Send, MapPin, Calendar, DollarSign, Heart, 
  Users, Edit3, ArrowRight, Loader2, Check, FileDown, Eye, AlertCircle, 
  ShieldCheck, Star, ExternalLink, Luggage, Compass, RefreshCw, X, ChevronRight, Award,
  Plane, Package
} from 'lucide-react';
import { getAiDestinationSuggestions } from '../services/aiSuggestionEngine';
import { calculateFlightComparison, calculatePackageComparison } from '../data/quotations';
import { buildCustomItinerary } from '../data/itineraries';
import { CONFIG } from '../config';

const SAMPLE_PROMPTS = [
  "🏰 Quero viajar por 5 dias com minha família e crianças para lugares mágicos com parques e diversão",
  "🍷 Romance a dois por 4 dias com lareira, vinhedos, clima de serra e alta gastronomia",
  "🐬 5 dias relaxando em praias paradisíacas com águas mornas e piscinas naturais cristalinas",
  "🗼 6 dias inesquecíveis na Europa com castelos de contos de fadas, arte e museus icônicos"
];

export default function AIAssistant({ 
  planState, 
  setPlanState, 
  onGeneratePDF, 
  isGenerating, 
  onOpenPreview,
  hasGeneratedPDF,
  onNotify
}) {
  const [inputText, setInputText] = useState('');
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [editingField, setEditingField] = useState(null);

  // Suggestions & Selection State
  const [suggestedDestinations, setSuggestedDestinations] = useState(null);
  const [selectedDestinationItem, setSelectedDestinationItem] = useState(null);

  // Flight & Package Quotation Filters
  const [hasCheckedBaggage, setHasCheckedBaggage] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [quoteTab, setQuoteTab] = useState('voos'); // 'voos', 'companhias', 'pacotes', 'roteiro'

  // Computed live quotes
  const [liveFlightQuotes, setLiveFlightQuotes] = useState(null);
  const [livePackageQuotes, setLivePackageQuotes] = useState(null);

  // Initialize with initial suggestions if none exist
  useEffect(() => {
    if (!suggestedDestinations) {
      const initial = getAiDestinationSuggestions("família romance serra praia");
      setSuggestedDestinations(initial);
      // Pre-select matching current planState
      const matching = initial.find(d => d.name.toLowerCase().includes(planState.destination.toLowerCase().slice(0, 5))) || initial[0];
      setSelectedDestinationItem(matching);
      recalculateQuotes(matching, hasCheckedBaggage, directOnly);
    }
  }, []);

  // Recalculate quotation matrix for a destination
  const recalculateQuotes = (destItem, baggage, nonstop) => {
    if (!destItem) return;
    const flights = calculateFlightComparison({
      origin: 'São Paulo (GRU / CGH / VCP)',
      destination: destItem.name,
      departDate: '',
      returnDate: '',
      roundTrip: true,
      adults: planState.travelers || 2,
      seatClass: 'Econômica',
      checkedBaggage: baggage,
      directOnly: nonstop
    });

    const packages = calculatePackageComparison({
      origin: 'São Paulo (GRU)',
      destination: destItem.name,
      adults: planState.travelers || 2,
      rooms: 1,
      days: destItem.recommendedDays || planState.days || 5
    });

    setLiveFlightQuotes(flights);
    setLivePackageQuotes(packages);
  };

  // Handle User Input Submission
  const handleSendPrompt = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    setIsProcessingAI(true);
    try {
      // Simulate real-time Disney AI Concierge analysis
      await new Promise(r => setTimeout(r, 650));
      const suggestions = getAiDestinationSuggestions(query);
      setSuggestedDestinations(suggestions);
      setSelectedDestinationItem(null); // Let the user choose!

      onNotify?.({
        type: 'success',
        title: '✨ Sugestões Mágicas Prontas!',
        message: `O Concierge VOYAGER AI selecionou ${suggestions.length} destinos perfeitos para o seu pedido. Escolha o seu favorito!`
      });

      // Smooth scroll down to suggestions
      const el = document.getElementById('sugestoes-ia');
      if (el) el.scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
      console.error(err);
      onNotify?.({
        type: 'error',
        title: 'Erro de Processamento',
        message: 'Ocorreu uma instabilidade ao gerar as sugestões. Tente novamente.'
      });
    } finally {
      setIsProcessingAI(false);
    }
  };

  // Handle User Selecting a Destination from Suggestions
  const handleChooseDestination = (dest) => {
    setSelectedDestinationItem(dest);

    // Update global planState
    setPlanState(prev => ({
      ...prev,
      destination: dest.name,
      days: dest.recommendedDays || prev.days,
      budget: dest.dailyBudget ? (dest.dailyBudget * (dest.recommendedDays || 5) * (prev.travelers || 2)) : prev.budget,
      profile: dest.profile || prev.profile,
      tags: dest.highlights || prev.tags,
      aiNotes: `Destino ${dest.name} selecionado com curadoria do Concierge Mágico VOYAGER AI.`,
      customItinerary: buildCustomItinerary(dest.name, dest.recommendedDays || prev.days, dest.profile || prev.profile)
    }));

    recalculateQuotes(dest, hasCheckedBaggage, directOnly);

    onNotify?.({
      type: 'success',
      title: '🏰 Destino Mágico Selecionado!',
      message: `Cotações completas e roteiro dia a dia gerados para ${dest.name}.`
    });

    // Smooth scroll to quotations
    const el = document.getElementById('cotacoes-ia-painel');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleBaggage = () => {
    const next = !hasCheckedBaggage;
    setHasCheckedBaggage(next);
    if (selectedDestinationItem) {
      recalculateQuotes(selectedDestinationItem, next, directOnly);
    }
  };

  const handleToggleDirect = () => {
    const next = !directOnly;
    setDirectOnly(next);
    if (selectedDestinationItem) {
      recalculateQuotes(selectedDestinationItem, hasCheckedBaggage, next);
    }
  };

  return (
    <section id="assistente-ia" className="py-14 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* DISNEY MAGIC CONTAINER - MIDNIGHT ROYAL NAVY & GOLD */}
      <div className="rounded-3xl sm:rounded-4xl bg-gradient-to-br from-[#040E24] via-[#081A3C] to-[#040C20] border-2 border-blue-500/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-4 sm:p-8 lg:p-10 text-white relative overflow-hidden">
        
        {/* Fairy Dust & Starlight Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

        {/* 1. HEADER: DISNEY CONCIERGE BRANDING */}
        <div className="relative z-10 max-w-3xl mb-7 sm:mb-9">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold tracking-wider mb-4 shadow-[0_0_15px_rgba(251,191,36,0.25)]">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Concierge Mágico VOYAGER AI • Experiência Disney</span>
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight leading-tight drop-shadow-md">
            Descreva seu sonho de viagem em linguagem natural.
          </h2>

          <p className="mt-3 text-xs sm:text-base text-slate-200 font-light leading-relaxed">
            Diga como você sonha viajar. Nossa IA analisa seu estilo, sugere <strong className="text-amber-300 font-semibold">múltiplos destinos mágicos</strong> para você escolher com 1 clique e gera na hora todas as cotações em tempo real com roteiro dia a dia.
          </p>

        </div>

        {/* 2. CONVERSATIONAL PROMPT BOX - ENCHANTED GOLDEN BORDER */}
        <div className="relative z-10 mb-7">
          <div className="bg-[#071530]/90 rounded-2xl sm:rounded-3xl border-2 border-amber-400/50 shadow-[0_0_30px_rgba(251,191,36,0.15)] focus-within:border-amber-300 focus-within:shadow-[0_0_40px_rgba(251,191,36,0.3)] transition-all p-3.5 sm:p-5 backdrop-blur-md">
            
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ex: Quero viajar por 5 dias com minha família e crianças para lugares com parques temáticos e diversão, orçamento em torno de R$ 6.000..."
              className="w-full bg-transparent text-sm sm:text-base font-normal text-white placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
              disabled={isProcessingAI || isGenerating}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-2 border-t border-blue-900/60">
              <span className="text-[11px] sm:text-xs text-slate-300 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
                <span>Clique em enviar para a IA sugerir os melhores destinos para você escolher</span>
              </span>

              <button
                type="button"
                onClick={() => handleSendPrompt()}
                disabled={isProcessingAI || !inputText.trim() || isGenerating}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white text-xs sm:text-sm font-extrabold tracking-wide transition-all shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 cursor-pointer border border-emerald-300/40 hover:scale-105"
              >
                {isProcessingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                    <span>Consultando Destinos Mágicos...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Pedir Sugestões à IA</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* 3. QUICK INSPIRATIONAL PROMPTS */}
        <div className="relative z-10 mb-9 sm:mb-11">
          <span className="block text-[11px] sm:text-xs uppercase tracking-wider font-bold text-amber-300 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sugestões Mágicas de Inspiração (Clique para testar):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_PROMPTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(sample);
                  handleSendPrompt(sample);
                }}
                disabled={isProcessingAI || isGenerating}
                className="text-left text-xs text-slate-200 bg-[#071736]/80 hover:bg-[#0C2454] border border-blue-500/30 hover:border-amber-400/60 p-3 rounded-2xl transition-all shadow-sm flex items-start gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{sample}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. MULTI-DESTINATION SUGGESTIONS SECTION (A IA SUGERE VÁRIOS LUGARES) */}
        {suggestedDestinations && (
          <div id="sugestoes-ia" className="relative z-10 mb-10 pt-6 border-t border-blue-900/60 animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>Destinos Mágicos Sugeridos pela IA</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Selecione o destino que mais encanta você para abrir a cotação completa e o roteiro dia a dia:
                </p>
              </div>

              {selectedDestinationItem && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold self-start sm:self-auto shrink-0">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Destino Selecionado: {selectedDestinationItem.name}</span>
                </div>
              )}
            </div>

            {/* Grid of Interactive Destination Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {suggestedDestinations.map((dest) => {
                const isCurrent = selectedDestinationItem?.id === dest.id;

                return (
                  <div
                    key={dest.id}
                    className={`rounded-3xl border-2 transition-all duration-300 overflow-hidden flex flex-col justify-between backdrop-blur-md ${
                      isCurrent
                        ? 'bg-gradient-to-b from-[#092B22] to-[#071C38] border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.4)] scale-[1.02] ring-2 ring-emerald-400/40'
                        : 'bg-[#071634]/90 border-blue-500/30 hover:border-amber-400/60 hover:shadow-xl'
                    }`}
                  >
                    <div>
                      {/* Image with Magic Badge */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040E24] via-transparent to-transparent opacity-80" />
                        
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1 z-10">
                          <span className="px-2.5 py-1 rounded-full bg-[#05112B]/90 backdrop-blur-md text-amber-300 text-[10px] font-extrabold uppercase border border-amber-400/40 shadow-sm truncate">
                            {dest.magicBadge}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-navy-950/80 text-white text-[10px] font-bold">
                            {dest.airportCode}
                          </span>
                        </div>

                        <div className="absolute bottom-2 left-3 right-3 text-xs font-semibold text-slate-200 truncate">
                          {dest.state ? `${dest.state}, ` : ''}{dest.country}
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="p-4 sm:p-5">
                        <h4 className="font-serif text-xl font-bold text-white mb-2 leading-tight">
                          {dest.name}
                        </h4>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 mb-3 text-xs text-slate-200">
                          <span className="text-[10px] uppercase font-bold text-amber-300 block mb-0.5">
                            Por que combina com você:
                          </span>
                          <p className="line-clamp-3 leading-snug font-light">
                            {dest.whyMatches}
                          </p>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-300 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-[11px]">Duração ideal:</span>
                            <span className="font-bold text-white">{dest.recommendedDays} dias</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-[11px]">Perfil sugerido:</span>
                            <span className="font-bold text-emerald-300">{dest.profile}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-[11px]">Orçamento médio:</span>
                            <span className="font-bold text-amber-300">{dest.estimatedBudget}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-4 pt-0">
                      <button
                        type="button"
                        onClick={() => handleChooseDestination(dest)}
                        className={`w-full py-3 px-4 rounded-2xl text-xs font-extrabold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-500 text-white shadow-soft font-black'
                            : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-navy-950 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:scale-[1.02]'
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>Destino Selecionado</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-navy-950" />
                            <span>Escolher Este Destino</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 5. SELECTED DESTINATION CELEBRATION & QUOTATION MATRIX */}
        {selectedDestinationItem && (
          <div id="cotacoes-ia-painel" className="relative z-10 pt-6 border-t-2 border-emerald-500/40 animate-fade-in">
            
            {/* Celebration Header */}
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-[#06241C] via-[#092244] to-[#06241C] border-2 border-emerald-400/60 shadow-[0_0_35px_rgba(16,185,129,0.3)] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-navy-950 flex items-center justify-center shrink-0 shadow-lg font-black text-xl">
                  🏰
                </div>
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Destino Confirmado no Concierge Mágico</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    {selectedDestinationItem.name} ({selectedDestinationItem.recommendedDays} dias)
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {selectedDestinationItem.vibe} • Orçamento estimado: {selectedDestinationItem.estimatedBudget}
                  </p>
                </div>
              </div>

              {/* Luggage & Direct Filters */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleToggleBaggage}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                    hasCheckedBaggage
                      ? 'bg-amber-400 text-navy-950 border-amber-300 shadow-md font-black'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                  title="Alternar mala de mão vs despachada"
                >
                  <Luggage className="w-3.5 h-3.5" />
                  <span>{hasCheckedBaggage ? 'Mala Despachada (23kg)' : 'Mala de Mão (10kg)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleDirect}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                    directOnly
                      ? 'bg-emerald-500 text-white border-emerald-400 shadow-md font-black'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                  title="Alternar voos diretos"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>{directOnly ? 'Apenas Voos Diretos' : 'Todos os Voos'}</span>
                </button>
              </div>
            </div>

            {/* QUOTATION SUB-TABS (VOOS / COMPANHIAS / PACOTES / ROTEIRO) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-blue-900/60">
              <button
                type="button"
                onClick={() => setQuoteTab('voos')}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  quoteTab === 'voos'
                    ? 'bg-emerald-500 text-navy-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-[#08183A] text-slate-300 hover:text-white border border-blue-500/30'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span>Comparadores de Voos ({liveFlightQuotes?.otas?.length || 6})</span>
              </button>

              <button
                type="button"
                onClick={() => setQuoteTab('companhias')}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  quoteTab === 'companhias'
                    ? 'bg-emerald-500 text-navy-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-[#08183A] text-slate-300 hover:text-white border border-blue-500/30'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>20 Companhias Aéreas Oficiais</span>
              </button>

              <button
                type="button"
                onClick={() => setQuoteTab('pacotes')}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  quoteTab === 'pacotes'
                    ? 'bg-emerald-500 text-navy-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-[#08183A] text-slate-300 hover:text-white border border-blue-500/30'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Pacotes de Viagem ({livePackageQuotes?.length || 7})</span>
              </button>

              <button
                type="button"
                onClick={() => setQuoteTab('roteiro')}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  quoteTab === 'roteiro'
                    ? 'bg-emerald-500 text-navy-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : 'bg-[#08183A] text-slate-300 hover:text-white border border-blue-500/30'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Roteiro Dia a Dia Completo</span>
              </button>
            </div>

            {/* TAB CONTENT 1: COMPARADORES DE VOOS */}
            {quoteTab === 'voos' && liveFlightQuotes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {liveFlightQuotes.otas?.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                      item.isBestDeal
                        ? 'bg-gradient-to-br from-[#07241A] to-[#0A1F3C] border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                        : 'bg-[#071736]/90 border-blue-500/30 hover:border-blue-400/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.logo}</span>
                          <span className="font-bold text-base text-white">{item.name}</span>
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                          item.isBestDeal ? 'bg-emerald-500 text-navy-950' : 'bg-white/10 text-slate-200'
                        }`}>
                          {item.badge}
                        </span>
                      </div>

                      <div className="mb-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarifa Estimada Total</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-amber-300">
                            R$ {item.totalPrice.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-xs text-slate-300">
                            (R$ {item.pricePerAdult.toLocaleString('pt-BR')} / pessoa)
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                        <span className="bg-white/10 text-slate-200 px-2.5 py-0.5 rounded-md font-semibold">
                          {hasCheckedBaggage ? '🧳 Mala 23kg inclusa' : '🎒 Apenas Mala de Mão 10kg'}
                        </span>
                        <span className="bg-white/10 text-slate-200 px-2.5 py-0.5 rounded-md font-semibold">
                          {directOnly ? '✈️ Voo Direto' : '✈️ Direto ou Conexão'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mb-4 leading-relaxed font-light">
                        {item.perk}
                      </p>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        item.isBestDeal
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-navy-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                          : 'bg-navy-950 hover:bg-navy-900 text-white border border-white/20'
                      }`}
                    >
                      <span>Ir para Passagem no {item.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 2: 20 COMPANHIAS AÉREAS OFICIAIS */}
            {quoteTab === 'companhias' && liveFlightQuotes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {liveFlightQuotes.airlines?.map((airline) => (
                  <div
                    key={airline.id}
                    className="p-5 rounded-3xl bg-[#071736]/90 border border-blue-500/30 hover:border-amber-400/50 shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{airline.logo}</span>
                          <div>
                            <div className="font-bold text-base text-white">{airline.name}</div>
                            <div className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">
                              IATA: {airline.code} • {airline.country}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-200 border border-blue-400/30">
                          {airline.badge}
                        </span>
                      </div>

                      <div className="mb-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarifa Direta da Companhia</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-white">
                            R$ {airline.totalPrice.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-xs text-slate-300">
                            (R$ {airline.pricePerAdult.toLocaleString('pt-BR')} / pessoa)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 mb-4 text-xs text-slate-300 font-light">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{airline.hub}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{airline.perk}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                          <Luggage className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          <span className="truncate">{airline.baggagePolicy}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={airline.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white shadow-sm"
                    >
                      <span>Comprar Direto na {airline.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 3: PACOTES DE VIAGEM COMPLETOS (7 OPERADORAS) */}
            {quoteTab === 'pacotes' && livePackageQuotes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {livePackageQuotes.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                      pkg.isBestDeal
                        ? 'bg-gradient-to-br from-[#07241A] to-[#0A1F3C] border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                        : pkg.isLuxury
                        ? 'bg-gradient-to-br from-[#241A07] to-[#0A1F3C] border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.3)]'
                        : 'bg-[#071736]/90 border-blue-500/30 hover:border-blue-400/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{pkg.logo}</span>
                          <span className="font-bold text-base text-white">{pkg.name}</span>
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                          pkg.isBestDeal 
                            ? 'bg-emerald-500 text-navy-950' 
                            : pkg.isLuxury 
                            ? 'bg-amber-400 text-navy-950' 
                            : 'bg-white/10 text-slate-200'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>

                      <div className="mb-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Pacote Completo ({pkg.durationNights} noites)
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-amber-300">
                            R$ {pkg.totalPrice.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-xs text-slate-300">
                            (R$ {pkg.pricePerPerson.toLocaleString('pt-BR')} / pessoa)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 mb-4 text-xs text-slate-200 font-light">
                        <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          <span>Passagem Aérea Ida e Volta Inclusa</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          <span>Hospedagem {pkg.isLuxury ? '5★ Resort Luxo' : '4★ Superior'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Check className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{pkg.includes}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={pkg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        pkg.isBestDeal
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-navy-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                          : pkg.isLuxury
                          ? 'bg-amber-400 hover:bg-amber-300 text-navy-950 shadow-[0_0_20px_rgba(251,191,36,0.4)]'
                          : 'bg-navy-950 hover:bg-navy-900 text-white border border-white/20'
                      }`}
                    >
                      <span>Ver Pacote no {pkg.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 4: ROTEIRO DIA A DIA COMPLETO COM IA */}
            {quoteTab === 'roteiro' && planState.customItinerary && (
              <div className="bg-[#071634]/95 rounded-3xl p-5 sm:p-7 border border-blue-500/30 mb-8 backdrop-blur-md">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-blue-900/60">
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-300" />
                      <span>Roteiro Cronológico para {planState.destination}</span>
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Programação estruturada para {planState.days} dias • Perfil {planState.profile}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/40">
                    IA Concierge
                  </span>
                </div>

                <div className="space-y-4">
                  {planState.customItinerary.map((day, idx) => (
                    <div key={idx} className="bg-[#0A1D44] p-4 sm:p-5 rounded-2xl border border-blue-400/20">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <span className="font-serif font-bold text-base text-amber-300">
                          Dia {day.day}: {day.title}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">
                          Orçamento médio diário: R$ {day.dailyCost || 600}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-200 mt-2 font-light">
                        <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                          <strong className="text-amber-200 block mb-1">Manhã:</strong>
                          <span>{day.morning}</span>
                        </div>
                        <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                          <strong className="text-amber-200 block mb-1">Tarde:</strong>
                          <span>{day.afternoon}</span>
                        </div>
                        <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                          <strong className="text-amber-200 block mb-1">Noite & Gastronomia:</strong>
                          <span>{day.night}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PRIMARY ACTION BAR: DOWNLOAD EDITORIAL PDF OFFLINE */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#071E3D] via-[#0B254E] to-[#071E3D] border-2 border-amber-400/50 shadow-[0_0_35px_rgba(251,191,36,0.25)] text-white">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold mb-2">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>Passaporte Mágico de Viagem</span>
                </div>
                <h4 className="font-serif text-lg sm:text-2xl font-bold text-white">
                  Baixe seu Dossiê Completo em PDF para usar offline
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 font-light mt-0.5">
                  Inclui fotos reais dos pontos turísticos, roteiro dia a dia, comparativo de passagens e pacotes no seu celular.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                {hasGeneratedPDF && (
                  <button
                    type="button"
                    onClick={onOpenPreview}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                  >
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>Pré-visualizar PDF</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onGeneratePDF}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-white text-xs sm:text-sm font-black tracking-wide transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 cursor-pointer border border-emerald-300/40 hover:scale-105"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                      <span>Gerando Documento Mágico...</span>
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4" />
                      <span>Gerar Roteiro e Cotação em PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </section>
  );
}
