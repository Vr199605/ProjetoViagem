import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Send, MapPin, Calendar, DollarSign, Heart, 
  Users, Edit3, ArrowRight, Loader2, Check, FileDown, Eye, AlertCircle, 
  ShieldCheck, Star, ExternalLink, Luggage, Compass, RefreshCw, X, ChevronRight, Award,
  Plane, Package, PieChart, Search, Globe, Lightbulb, FileText
} from 'lucide-react';
import { getAiDestinationSuggestions, DESTINATION_DATABASE } from '../services/aiSuggestionEngine';
import { getAiQuestionAnswer, analyzeUserQuery } from '../services/placeRecommendationService';
import { askGeminiQuestion } from '../services/geminiService';
import { searchWikipediaLive, buildGoogleSearchUrl, buildGoogleMapsUrl } from '../services/webSearchService';
import { calculateFlightComparison, calculatePackageComparison } from '../data/quotations';
import { buildCustomItinerary } from '../data/itineraries';
import { CONFIG } from '../config';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';
import { addDaysToDateStr } from '../utils/deeplinkBuilder';
import TripCostCalculator from './TripCostCalculator';

const SAMPLE_PROMPTS = [
  "💍 Eu gostaria de pedir minha namorada em casamento no Rio de Janeiro, quais lugares você me sugere?",
  "🍷 Quais os melhores bistrôs e restaurantes românticos com lareira em Gramado e Canela?",
  "🌅 Onde ver o pôr do sol mais espetacular e reservado em Fernando de Noronha?",
  "🏰 Quais castelos e cidades de conto de fadas conhecer em uma viagem à Europa?"
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

  // Suggestions & Question Answering State
  const [suggestedDestinations, setSuggestedDestinations] = useState(null);
  const [selectedDestinationItem, setSelectedDestinationItem] = useState(null);
  const [aiQuestionAnswer, setAiQuestionAnswer] = useState(null);

  // In-page live Web Search State
  const [webSearchQuery, setWebSearchQuery] = useState('');
  const [isSearchingWeb, setIsSearchingWeb] = useState(false);
  const [customWebResults, setCustomWebResults] = useState([]);

  // Flight & Package Quotation Filters
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [hasCheckedBaggage, setHasCheckedBaggage] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [quoteTab, setQuoteTab] = useState('voos'); // 'voos', 'companhias', 'pacotes', 'roteiro', 'calculadora'

  // Computed live quotes
  const [liveFlightQuotes, setLiveFlightQuotes] = useState(null);
  const [livePackageQuotes, setLivePackageQuotes] = useState(null);

  // Real-time Live Flight Radar Ticker State
  const [radarTick, setRadarTick] = useState(0);
  const [countdown, setCountdown] = useState(25);
  const [isRefreshingRadar, setIsRefreshingRadar] = useState(false);
  const [lastRadarSync, setLastRadarSync] = useState(() => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

  // Auto-tick countdown every second; when reaching 1, triggers live rate re-sync
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setRadarTick((t) => t + 1);
          setLastRadarSync(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          return 25;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize with initial suggestions if none exist
  useEffect(() => {
    if (!suggestedDestinations) {
      const initial = getAiDestinationSuggestions("família romance serra praia");
      setSuggestedDestinations(initial);
      // Pre-select matching current planState
      const matching = initial.find(d => d.name.toLowerCase().includes(planState.destination.toLowerCase().slice(0, 5))) || initial[0];
      setSelectedDestinationItem(matching);
      recalculateQuotes(matching, hasCheckedBaggage, directOnly, isRoundTrip, radarTick);
    }
  }, []);

  // Update quotes continuously when radarTick changes (real-time live market updates)
  useEffect(() => {
    if (selectedDestinationItem) {
      recalculateQuotes(selectedDestinationItem, hasCheckedBaggage, directOnly, isRoundTrip, radarTick);
    }
  }, [radarTick]);

  // Recalculate quotation matrix for a destination
  const recalculateQuotes = (destItem, baggage = hasCheckedBaggage, nonstop = directOnly, roundTrip = isRoundTrip, seed = radarTick) => {
    if (!destItem) return;
    const todayStr = new Date().toISOString().split('T')[0];
    const defaultDepart = addDaysToDateStr(todayStr, 30);
    const defaultReturn = addDaysToDateStr(defaultDepart, destItem.recommendedDays || planState.days || 5);

    const activeDepart = planState.departDate || defaultDepart;
    const activeReturn = planState.returnDate || defaultReturn;

    const flights = calculateFlightComparison({
      origin: planState.origin || 'São Paulo (GRU / CGH / VCP)',
      destination: destItem.name,
      departDate: activeDepart,
      returnDate: roundTrip ? activeReturn : '',
      roundTrip: roundTrip,
      adults: planState.travelers || 2,
      seatClass: 'Econômica',
      checkedBaggage: baggage,
      directOnly: nonstop,
      liveSeed: seed
    });

    const packages = calculatePackageComparison({
      origin: planState.origin || 'São Paulo (GRU)',
      destination: destItem.name,
      checkIn: activeDepart,
      checkOut: activeReturn,
      adults: planState.travelers || 2,
      rooms: 1,
      days: destItem.recommendedDays || planState.days || 5
    });

    setLiveFlightQuotes(flights);
    setLivePackageQuotes(packages);
  };

  const handleManualRadarSync = () => {
    setIsRefreshingRadar(true);
    setRadarTick((t) => t + 1);
    setLastRadarSync(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setCountdown(25);
    setTimeout(() => {
      setIsRefreshingRadar(false);
      onNotify?.({
        type: 'success',
        title: 'Malha Aérea Sincronizada',
        message: 'Tarifas das companhias e comparadores atualizadas em tempo real!'
      });
    }, 450);
  };

  // Handle User Input Submission (Questions, Place Recommendations, or Dream Trips)
  const handleSendPrompt = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    setIsProcessingAI(true);
    try {
      // 1. Check if Gemini AI responds live with API key
      let geminiAnswer = null;
      try {
        geminiAnswer = await askGeminiQuestion({ prompt: query });
      } catch (e) {
        console.warn('Gemini question call skipped/failed:', e);
      }

      let answer = null;
      if (geminiAnswer && geminiAnswer.places && geminiAnswer.places.length > 0) {
        const destName = geminiAnswer.destinationName || 'Destino Sugerido';
        const matched = DESTINATION_DATABASE.find(d => 
          d.name.toLowerCase().includes(destName.toLowerCase()) ||
          destName.toLowerCase().includes(d.name.toLowerCase())
        ) || DESTINATION_DATABASE[0];

        const enrichedPlaces = geminiAnswer.places.map((p, idx) => ({
          id: `gemini-place-${idx}`,
          name: p.name,
          neighborhood: p.neighborhood || destName,
          category: p.category || 'Destaque Selecionado',
          icon: p.icon || '✨',
          whyIdeal: p.whyIdeal,
          goldenTip: p.goldenTip,
          googleSearchUrl: buildGoogleSearchUrl(p.name, destName, query),
          googleMapsUrl: buildGoogleMapsUrl(p.name, destName)
        }));

        // Search live Wikipedia for extra web grounding
        const wikiArticles = await searchWikipediaLive(`${destName} turismo`, 3);

        answer = {
          success: true,
          isSpecificQuestion: true,
          destinationName: destName,
          title: geminiAnswer.title || `Sugestões Especializadas para: "${query}"`,
          overview: geminiAnswer.overview,
          places: enrichedPlaces,
          wikiArticles,
          matchedDestObj: matched,
          isGeminiLive: true,
          rawPrompt: query
        };
      } else {
        // 2. Use our high-precision Place & Web Search Engine
        answer = await getAiQuestionAnswer(query);
      }

      setAiQuestionAnswer(answer);

      // 3. Also generate destination cards to provide broader alternatives
      const suggestions = getAiDestinationSuggestions(query);
      setSuggestedDestinations(suggestions);

      // Clear any previous custom web search
      setCustomWebResults([]);
      setWebSearchQuery('');

      onNotify?.({
        type: 'success',
        title: 'Sugestões de Roteiro Prontas',
        message: answer?.title || `O Concierge VOYAGER preparou recomendações personalizadas para sua consulta.`
      });

      // Smooth scroll down to answers
      setTimeout(() => {
        const el = document.getElementById('resposta-ia-pergunta') || document.getElementById('sugestoes-ia');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);

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

  // Quick In-Page Web Search Handler
  const handleQuickWebSearch = async (e) => {
    if (e) e.preventDefault();
    if (!webSearchQuery.trim()) return;

    setIsSearchingWeb(true);
    try {
      const results = await searchWikipediaLive(webSearchQuery.trim(), 4);
      setCustomWebResults(results);
      onNotify?.({
        type: 'success',
        title: '🌐 Pesquisa Concluída',
        message: `Encontramos ${results.length} resultados na web para "${webSearchQuery}".`
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearchingWeb(false);
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
      aiNotes: `Destino ${dest.name} selecionado com curadoria do Concierge Inteligente VOYAGER.`,
      customItinerary: buildCustomItinerary(dest.name, dest.recommendedDays || prev.days, dest.profile || prev.profile)
    }));

    recalculateQuotes(dest, hasCheckedBaggage, directOnly);

    onNotify?.({
      type: 'success',
      title: 'Destino Selecionado',
      message: `Cotações completas e roteiro estruturado gerados para ${dest.name}.`
    });

    // Smooth scroll to quotations
    const el = document.getElementById('cotacoes-ia-painel');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleBaggage = () => {
    const next = !hasCheckedBaggage;
    setHasCheckedBaggage(next);
    if (selectedDestinationItem) {
      recalculateQuotes(selectedDestinationItem, next, directOnly, isRoundTrip);
    }
  };

  const handleToggleDirect = () => {
    const next = !directOnly;
    setDirectOnly(next);
    if (selectedDestinationItem) {
      recalculateQuotes(selectedDestinationItem, hasCheckedBaggage, next, isRoundTrip);
    }
  };

  const handleToggleRoundTrip = (val) => {
    setIsRoundTrip(val);
    if (selectedDestinationItem) {
      recalculateQuotes(selectedDestinationItem, hasCheckedBaggage, directOnly, val);
    }
  };

  return (
    <section id="assistente-ia" className="py-14 sm:py-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-24 w-full max-w-full overflow-hidden">
      
      {/* REALISTIC EXECUTIVE CONCIERGE CONTAINER */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl p-5 sm:p-8 lg:p-10 text-slate-100 relative overflow-hidden">

        {/* 1. HEADER: EXECUTIVE CONCIERGE BRANDING */}
        <div className="relative z-10 max-w-3xl mb-7 sm:mb-9">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700/80 text-emerald-400 text-xs font-semibold tracking-wide mb-4">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Concierge Inteligente VOYAGER • Consultoria & Roteiros Oficiais</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight leading-tight">
            Consulte qualquer informação sobre lugares, roteiros ou destinos.
          </h2>

          <p className="mt-3 text-xs sm:text-base text-slate-300 font-normal leading-relaxed">
            Diga o que você procura: sugestões de lugares para pedir em casamento, restaurantes românticos, mirantes ao pôr do sol ou roteiros pelo Brasil e pelo mundo. Nossa IA analisa suas preferências, recomenda pontos reais com dados verificados e pesquisa na web.
          </p>

        </div>

        {/* 2. CONVERSATIONAL PROMPT BOX - REALISTIC EXECUTIVE CONTAINER */}
        <div className="relative z-10 mb-7">
          <div className="bg-slate-950 rounded-2xl border border-slate-700/80 focus-within:border-emerald-500 transition-all p-4 sm:p-5 shadow-inner">
            
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Faça qualquer pergunta sobre lugares... Ex: Eu gostaria de pedir minha namorada em casamento no Rio de Janeiro, quais lugares você me sugere?"
              className="w-full bg-transparent text-sm sm:text-base font-normal text-white placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
              disabled={isProcessingAI || isGenerating}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 mt-2 border-t border-slate-800">
              <span className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Respostas com precisão factual, dicas práticas e validação na web</span>
              </span>

              <button
                type="button"
                onClick={() => handleSendPrompt()}
                disabled={isProcessingAI || !inputText.trim() || isGenerating}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Consultando & Pesquisando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Pergunta</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* 3. QUICK INSPIRATIONAL PROMPTS */}
        <div className="relative z-10 mb-9 sm:mb-11">
          <span className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Exemplos de consultas frequentes:</span>
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
                className="text-left text-xs text-slate-300 bg-slate-950/70 hover:bg-slate-800 hover:text-white border border-slate-800 p-3 rounded-xl transition-all flex items-start gap-2 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{sample}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. AI QUESTION ANSWER & SPECIFIC PLACE RECOMMENDATIONS */}
        {aiQuestionAnswer && (
          <div id="resposta-ia-pergunta" className="relative z-10 mb-10 pt-6 border-t border-slate-800 animate-fade-in">
            
            {/* Header Badge & Title */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium mb-3">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resposta do Concierge VOYAGER • Informações Fatuais & Web</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {aiQuestionAnswer.title}
              </h3>

              {/* Conversational Overview Callout */}
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed">
                <p className="font-normal text-slate-200">
                  {aiQuestionAnswer.overview}
                </p>
              </div>
            </div>

            {/* Grid of Recommended Places */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
              {aiQuestionAnswer.places.map((place) => (
                <div
                  key={place.id}
                  className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xs flex flex-col justify-between transition-all"
                >
                  <div>
                    {/* Top Row: Icon & Category */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl p-2 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                          {place.icon}
                        </span>
                        <div>
                          <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                            {place.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="truncate">{place.neighborhood}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 mb-3">
                      {place.category}
                    </span>

                    {/* Why Ideal Description */}
                    <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4">
                      {place.whyIdeal}
                    </p>

                    {/* Golden Tip Callout */}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 mb-4">
                      <strong className="text-amber-300 font-semibold block mb-1 flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        Dica Prática do Concierge:
                      </strong>
                      <span>{place.goldenTip}</span>
                    </div>
                  </div>

                  {/* Web Search & Maps Action Buttons */}
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
                    <a
                      href={place.googleSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
                      title="Buscar avaliações, fotos e detalhes recentes no Google"
                    >
                      <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Buscar no Google</span>
                      <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                    </a>

                    <a
                      href={place.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-emerald-400 hover:text-emerald-300 text-xs font-medium flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
                      title="Ver localização, fotos 360° e rotas no Google Maps"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">Ver no Maps</span>
                      <ExternalLink className="w-3 h-3 text-emerald-500/70 shrink-0" />
                    </a>
                  </div>

                </div>
              ))}
            </div>

            {/* Bridge CTA: Escolher Este Destino para Cotação de Voos e Roteiro */}
            {aiQuestionAnswer.matchedDestObj && (
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-100 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold mb-2">
                    <Plane className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Conectar Destino ao Painel de Cotação</span>
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                    Deseja planejar sua viagem para {aiQuestionAnswer.destinationName}?
                  </h4>
                  <p className="text-xs text-slate-400 font-normal mt-0.5">
                    Selecione para carregar voos em tempo real, 20 companhias aéreas, pacotes e roteiro dia a dia.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleChooseDestination(aiQuestionAnswer.matchedDestObj)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Cotar Viagem para {aiQuestionAnswer.destinationName}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Live Web Intelligence Drawer (Wikipedia & Real-time Web Search) */}
            <div className="bg-slate-950/70 rounded-2xl p-5 sm:p-6 border border-slate-800 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Artigos e Fontes Verificadas na Web</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-normal mt-0.5">
                    Informações e dados históricos verificados sobre os locais recomendados:
                  </p>
                </div>

                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(aiQuestionAnswer.rawPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors self-start sm:self-auto border border-slate-700/80"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ver Todos os Resultados no Google</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

              {/* Wikipedia Articles List */}
              {aiQuestionAnswer.wikiArticles && aiQuestionAnswer.wikiArticles.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {aiQuestionAnswer.wikiArticles.map((art, idx) => (
                    <a
                      key={idx}
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all block group"
                    >
                      <div className="font-semibold text-xs text-slate-200 group-hover:text-emerald-400 flex items-center justify-between gap-1 mb-1">
                        <span className="truncate">{art.title}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 font-normal">
                        {art.snippet}
                      </p>
                    </a>
                  ))}
                </div>
              )}

              {/* In-page live Web Search Input */}
              <form onSubmit={handleQuickWebSearch} className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={webSearchQuery}
                    onChange={(e) => setWebSearchQuery(e.target.value)}
                    placeholder={`Pesquisar mais sobre ${aiQuestionAnswer.destinationName} ou qualquer outro ponto turístico na web...`}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearchingWeb || !webSearchQuery.trim()}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {isSearchingWeb ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Buscando...</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-3.5 h-3.5" />
                      <span>Buscar na Web</span>
                    </>
                  )}
                </button>
              </form>

              {/* Custom Web Search Results */}
              {customWebResults && customWebResults.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 animate-fade-in">
                  <span className="text-[11px] font-semibold text-emerald-400 block">
                    Resultados ao vivo para "{webSearchQuery}":
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {customWebResults.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex items-start justify-between gap-2"
                      >
                        <div>
                          <strong className="text-xs text-white block">{res.title}</strong>
                          <p className="text-[11px] text-slate-400 line-clamp-2">{res.snippet}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* 4. MULTI-DESTINATION SUGGESTIONS SECTION */}
        {suggestedDestinations && (
          <div id="sugestoes-ia" className="relative z-10 mb-8 pt-6 border-t border-slate-800 animate-fade-in">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Destinos Recomendados para Sua Viagem</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Selecione uma opção para carregar cotações de passagens em tempo real e o roteiro dia a dia:
                </p>
              </div>

              {selectedDestinationItem && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium self-start sm:self-auto shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Destino Ativo: {selectedDestinationItem.name}</span>
                </div>
              )}
            </div>

            {/* Grid of Interactive Destination Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {suggestedDestinations.map((dest) => {
                const isCurrent = selectedDestinationItem?.id === dest.id;

                return (
                  <div
                    key={dest.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-slate-850 border-emerald-500 shadow-sm ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img
                          src={getAssetUrl(dest.image)}
                          alt={dest.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                        
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10">
                          <span className="px-2 py-0.5 rounded bg-slate-950/80 text-emerald-400 text-[10px] font-semibold uppercase border border-slate-800 truncate">
                            {dest.magicBadge}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 text-[10px] font-medium border border-slate-800">
                            {dest.airportCode}
                          </span>
                        </div>

                        <div className="absolute bottom-2 left-3 right-3 text-xs font-medium text-slate-200 truncate">
                          {dest.state ? `${dest.state}, ` : ''}{dest.country}
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="p-4">
                        <h4 className="font-serif text-lg font-bold text-white mb-2 leading-tight">
                          {dest.name}
                        </h4>

                        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-2.5 mb-3 text-xs text-slate-300">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                            Destaque da Localidade:
                          </span>
                          <p className="line-clamp-2 leading-snug font-normal text-slate-300">
                            {dest.whyMatches}
                          </p>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-300 mb-2">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-[11px]">Duração sugerida:</span>
                            <span className="font-semibold text-white">{dest.recommendedDays} dias</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-[11px]">Perfil:</span>
                            <span className="font-semibold text-emerald-400">{dest.profile}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-[11px]">Orçamento médio:</span>
                            <span className="font-semibold text-slate-200">{dest.estimatedBudget}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="p-4 pt-0">
                      <button
                        type="button"
                        onClick={() => handleChooseDestination(dest)}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isCurrent
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {isCurrent ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Destino Selecionado</span>
                          </>
                        ) : (
                          <span>Escolher Este Destino</span>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 5. SELECTED DESTINATION SUMMARY & QUOTATION MATRIX */}
        {selectedDestinationItem && (
          <div id="cotacoes-ia-painel" className="relative z-10 pt-6 border-t border-slate-800 animate-fade-in">
            
            {/* Active Destination Bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-850 border border-slate-800 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
                    <span>Destino em Cotação Ativa</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                    {selectedDestinationItem.name} ({selectedDestinationItem.recommendedDays} dias)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedDestinationItem.vibe} • Orçamento estimado: {selectedDestinationItem.estimatedBudget}
                  </p>
                </div>
              </div>

              {/* Trip Type, Luggage & Direct Filters */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {/* Round Trip vs One Way Toggle */}
                <div className="inline-flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-medium shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleRoundTrip(true)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      isRoundTrip ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Ida e Volta
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleRoundTrip(false)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      !isRoundTrip ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Somente Ida
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleToggleBaggage}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
                    hasCheckedBaggage
                      ? 'bg-slate-800 text-white border-slate-700 font-semibold'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                  }`}
                  title="Alternar mala de mão vs despachada"
                >
                  <Luggage className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{hasCheckedBaggage ? 'Mala 23kg' : 'Mala 10kg'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleDirect}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer flex items-center justify-center gap-1.5 shrink-0 ${
                    directOnly
                      ? 'bg-emerald-600 text-white border-emerald-500 font-semibold'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
                  }`}
                  title="Alternar voos diretos"
                >
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span>{directOnly ? 'Voos Diretos' : 'Todos'}</span>
                </button>
              </div>
            </div>

            {/* QUOTATION SUB-TABS (VOOS / COMPANHIAS / PACOTES / ROTEIRO) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-slate-800 w-full max-w-full -mx-1 px-1">
              <button
                type="button"
                onClick={() => setQuoteTab('voos')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  quoteTab === 'voos'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-850 hover:bg-slate-900'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span>Comparadores de Voos ({liveFlightQuotes?.otas?.length || 6})</span>
              </button>

              <button
                type="button"
                onClick={() => setQuoteTab('companhias')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  quoteTab === 'companhias'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-850 hover:bg-slate-900'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>20 Companhias Aéreas Oficiais</span>
              </button>

              <button
                type="button"
                onClick={() => setQuoteTab('pacotes')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  quoteTab === 'pacotes'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-850 hover:bg-slate-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Pacotes de Viagem ({livePackageQuotes?.length || 7})</span>
              </button>

              <button
                type="button"
                onClick={() => setQuoteTab('roteiro')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  quoteTab === 'roteiro'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-850 hover:bg-slate-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Roteiro Estruturado</span>
              </button>

              <button
                type="button"
                onClick={() => setQuoteTab('calculadora')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  quoteTab === 'calculadora'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-850 hover:bg-slate-900'
                }`}
              >
                <PieChart className="w-4 h-4" />
                <span>Calculadora de Custos</span>
              </button>
            </div>

            {/* TAB CONTENT: CALCULADORA DE CUSTO TOTAL POR PESSOA */}
            {quoteTab === 'calculadora' && (
              <div className="mb-8 animate-fade-in">
                <TripCostCalculator
                  destination={selectedDestinationItem || planState.destination}
                  days={selectedDestinationItem?.recommendedDays || planState.days || 5}
                  travelers={planState.travelers || 2}
                  onUpdatePlan={(updated) => {
                    setPlanState(prev => ({
                      ...prev,
                      budget: updated.budget,
                      days: updated.days,
                      travelers: updated.travelers
                    }));
                  }}
                  onNotify={onNotify}
                />
              </div>
            )}

            {/* RADAR DE TARIFAS EM TEMPO REAL - CONTINUOUS LIVE TICKER BAR */}
            {(quoteTab === 'voos' || quoteTab === 'companhias') && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6 shadow-xs animate-fade-in">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">
                        Radar de Tarifas em Tempo Real Ativo
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700/60">
                        Sincronizado às {lastRadarSync}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                      Monitorando inventário oficial de assentos da LATAM, GOL, Azul e comparadores. Próxima varredura automática em <strong className="text-white font-mono">{countdown}s</strong>.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleManualRadarSync}
                  disabled={isRefreshingRadar}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                  title="Atualizar cotações imediatamente"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshingRadar ? 'animate-spin' : ''}`} />
                  <span>{isRefreshingRadar ? 'Sincronizando...' : 'Atualizar Cotações Agora'}</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT 1: COMPARADORES DE VOOS */}
            {quoteTab === 'voos' && liveFlightQuotes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {liveFlightQuotes.otas?.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      item.isBestDeal
                        ? 'bg-slate-900 border-emerald-500/70 shadow-sm'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{item.logo}</span>
                          <span className="font-bold text-base text-white">{item.name}</span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          item.isBestDeal ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {item.badge}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Tarifa Oficial em Tempo Real</span>
                          <span className="text-[10px] text-emerald-400 font-mono font-medium">Ao Vivo • {item.lastUpdated || lastRadarSync}</span>
                        </div>
                        <div className="flex flex-col mb-1.5">
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-xs font-medium text-slate-400">A partir de</span>
                            <span className="text-xl sm:text-2xl font-black text-white">
                              R$ {item.pricePerAdult.toLocaleString('pt-BR')}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">/ pessoa</span>
                          </div>
                          {(planState.travelers || 2) > 1 && (
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Total ({(planState.travelers || 2)} passageiros): <strong className="text-white font-semibold">R$ {item.totalPrice.toLocaleString('pt-BR')}</strong>
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            Taxas de embarque ANAC inclusas (R$ {item.airportTaxPerPerson || 44} / pessoa)
                          </div>
                        </div>

                        {/* Google Flights Price Gauge / Termômetro */}
                        {item.typicalMin && item.typicalMax && (
                          <div className="my-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="flex items-center justify-between text-[10px] mb-1.5">
                              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Faixa Típica Google Flights:
                              </span>
                              <span className="font-mono text-white font-bold">
                                R$ {item.typicalMin.toLocaleString('pt-BR')} – R$ {item.typicalMax.toLocaleString('pt-BR')}
                              </span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  item.marketStatus === 'low'
                                    ? 'bg-emerald-500 w-1/3'
                                    : item.marketStatus === 'high'
                                    ? 'bg-amber-500 w-full'
                                    : 'bg-blue-500 w-2/3'
                                }`}
                              />
                            </div>
                            <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-medium">
                              <span className={item.marketStatus === 'low' ? 'font-bold text-emerald-400' : ''}>Baixo</span>
                              <span className={item.marketStatus === 'typical' ? 'font-bold text-blue-400' : ''}>Típico</span>
                              <span className={item.marketStatus === 'high' ? 'font-bold text-amber-400' : ''}>Alto</span>
                            </div>
                          </div>
                        )}

                        {/* Real-time Fluctuation Tag */}
                        <div className="mt-1.5">
                          {item.trend === 'down' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              ↓ Queda de R$ {Math.abs(item.delta)} identificada
                            </span>
                          )}
                          {item.trend === 'up' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              ↑ Alta de R$ {item.delta} • Últimos assentos
                            </span>
                          )}
                          {item.trend === 'stable' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              ● Tarifa estável no metabuscador
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                        <span className="bg-slate-900 text-slate-300 border border-slate-800 px-2.5 py-0.5 rounded-md font-medium">
                          {hasCheckedBaggage ? '🧳 Mala 23kg inclusa' : '🎒 Apenas Mala de Mão 10kg'}
                        </span>
                        <span className="bg-slate-900 text-slate-300 border border-slate-800 px-2.5 py-0.5 rounded-md font-medium">
                          {directOnly ? '✈️ Voo Direto' : '✈️ Direto ou Conexão'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-4 leading-relaxed font-normal">
                        {item.perk}
                      </p>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        item.isBestDeal
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xs'
                          : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate">Ir para Passagem no {item.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 2: COMPANHIAS AÉREAS OFICIAIS COM TARIFA EM TEMPO REAL */}
            {quoteTab === 'companhias' && liveFlightQuotes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {liveFlightQuotes.airlines?.map((airline) => (
                  <div
                    key={airline.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 shadow-2xs transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{airline.logo}</span>
                          <div>
                            <div className="font-bold text-base text-white">{airline.name}</div>
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                              IATA: {airline.code} • {airline.country}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {airline.badge}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Tarifa Oficial em Tempo Real</span>
                          <span className="text-[10px] text-emerald-400 font-mono font-medium">Ao Vivo • {airline.lastUpdated || lastRadarSync}</span>
                        </div>
                        <div className="flex flex-col mb-1.5">
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-xs font-medium text-slate-400">A partir de</span>
                            <span className="text-xl sm:text-2xl font-black text-white">
                              R$ {airline.pricePerAdult.toLocaleString('pt-BR')}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">/ pessoa</span>
                          </div>
                          {(planState.travelers || 2) > 1 && (
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Total ({(planState.travelers || 2)} passageiros): <strong className="text-white font-semibold">R$ {airline.totalPrice.toLocaleString('pt-BR')}</strong>
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            Taxas de embarque ANAC inclusas (R$ {airline.airportTaxPerPerson || 44} / pessoa)
                          </div>
                        </div>

                        {/* Google Flights Price Gauge / Termômetro */}
                        {airline.typicalMin && airline.typicalMax && (
                          <div className="my-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                            <div className="flex items-center justify-between text-[10px] mb-1.5">
                              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Faixa Típica Google Flights:
                              </span>
                              <span className="font-mono text-white font-bold">
                                R$ {airline.typicalMin.toLocaleString('pt-BR')} – R$ {airline.typicalMax.toLocaleString('pt-BR')}
                              </span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  airline.marketStatus === 'low'
                                    ? 'bg-emerald-500 w-1/3'
                                    : airline.marketStatus === 'high'
                                    ? 'bg-amber-500 w-full'
                                    : 'bg-blue-500 w-2/3'
                                }`}
                              />
                            </div>
                            <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-medium">
                              <span className={airline.marketStatus === 'low' ? 'font-bold text-emerald-400' : ''}>Baixo</span>
                              <span className={airline.marketStatus === 'typical' ? 'font-bold text-blue-400' : ''}>Típico</span>
                              <span className={airline.marketStatus === 'high' ? 'font-bold text-amber-400' : ''}>Alto</span>
                            </div>
                          </div>
                        )}

                        {/* Real-time Fluctuation Tag */}
                        <div className="mt-1.5">
                          {airline.trend === 'down' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              ↓ Queda de R$ {Math.abs(airline.delta)} identificada na classe
                            </span>
                          )}
                          {airline.trend === 'up' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              ↑ Alta de R$ {airline.delta} • Demanda em alta
                            </span>
                          )}
                          {airline.trend === 'stable' && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                              ● Tarifa confirmada no inventário da {airline.name}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1 mb-4 text-xs text-slate-400 font-normal">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{airline.hub}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{airline.perk}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                          <Luggage className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{airline.baggagePolicy}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-medium text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Rota e datas pré-preenchidas</span>
                        </span>
                        <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded font-medium text-slate-400 shrink-0">
                          {isRoundTrip ? 'Ida e Volta' : 'Somente Ida'}
                        </span>
                      </div>

                      <a
                        href={airline.officialBookingUrl || airline.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 hover:border-slate-700 shadow-2xs"
                        title={`Emitir voos da ${airline.name} com rota, datas e passageiros preenchidos no motor oficial`}
                      >
                        <span className="truncate">Emitir Passagem da {airline.name} (Tarifa Ao Vivo)</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>

                      <a
                        href={airline.portalUrl || `https://${airline.officialWebsite}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 px-2.5 rounded-lg text-[10px] font-medium flex items-center justify-center gap-1 transition-all text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-900 border border-slate-850"
                        title={`Acessar página inicial da ${airline.name}`}
                      >
                        <span className="truncate">Acessar Portal Oficial ({airline.name})</span>
                        <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
                      </a>

                      <p className="text-[10px] text-slate-500 text-center leading-tight pt-0.5">
                        Abre o motor oficial da {airline.name} com rota, datas e passageiros transmitidos.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 3: PACOTES DE VIAGEM COMPLETOS */}
            {quoteTab === 'pacotes' && livePackageQuotes && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {livePackageQuotes.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      pkg.isBestDeal
                        ? 'bg-slate-900 border-emerald-500/70 shadow-sm'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{pkg.logo}</span>
                          <span className="font-bold text-base text-white">{pkg.name}</span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          pkg.isBestDeal 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {pkg.badge}
                        </span>
                      </div>

                      <div className="mb-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Pacote Completo ({pkg.durationNights} noites)
                        </span>
                        <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                          <span className="text-xl sm:text-2xl font-black text-white">
                            R$ {pkg.totalPrice.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-[11px] sm:text-xs text-slate-400">
                            (R$ {pkg.pricePerPerson.toLocaleString('pt-BR')} / pessoa)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 mb-4 text-xs text-slate-300 font-normal">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          <span>Passagem Aérea Ida e Volta Inclusa</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          <span>Hospedagem {pkg.isLuxury ? '5★ Resort Luxo' : '4★ Superior'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Check className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{pkg.includes}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={pkg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        pkg.isBestDeal
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className="truncate">Ver Pacote no {pkg.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 4: ROTEIRO DIA A DIA COMPLETO */}
            {quoteTab === 'roteiro' && planState.customItinerary && (
              <div className="bg-slate-950/70 rounded-2xl p-5 sm:p-7 border border-slate-800 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b border-slate-800/80">
                  <div className="min-w-0">
                    <h4 className="font-serif text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="truncate">Roteiro para {planState.destination}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      Programação estruturada para {planState.days} dias • Perfil {planState.profile}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 self-start sm:self-auto shrink-0">
                    Curadoria Executiva
                  </span>
                </div>

                <div className="space-y-3.5">
                  {planState.customItinerary.map((day, idx) => (
                    <div key={idx} className="bg-slate-900/90 p-4 sm:p-5 rounded-xl border border-slate-800/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <span className="font-serif font-bold text-base text-white">
                          Dia {day.day}: {day.title}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400">
                          Orçamento médio diário: R$ {day.dailyCost || 600}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 mt-2 font-normal">
                        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                          <strong className="text-emerald-400 block mb-1">Manhã:</strong>
                          <span className="text-slate-300">{day.morning}</span>
                        </div>
                        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                          <strong className="text-emerald-400 block mb-1">Tarde:</strong>
                          <span className="text-slate-300">{day.afternoon}</span>
                        </div>
                        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                          <strong className="text-emerald-400 block mb-1">Noite & Gastronomia:</strong>
                          <span className="text-slate-300">{day.night}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PRIMARY ACTION BAR: DOWNLOAD EDITORIAL PDF OFFLINE */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-slate-850 border border-slate-800 shadow-md text-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Dossiê Executivo de Viagem</span>
                </div>
                <h4 className="font-serif text-lg sm:text-2xl font-bold text-white">
                  Baixe seu Dossiê Completo em PDF para usar offline
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5">
                  Inclui fotografias autênticas dos pontos turísticos, roteiro dia a dia e comparativo de passagens no seu celular.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                {hasGeneratedPDF && (
                  <button
                    type="button"
                    onClick={onOpenPreview}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                  >
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>Visualizar PDF</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onGeneratePDF}
                  disabled={isGenerating}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Gerando Documento em PDF...</span>
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
