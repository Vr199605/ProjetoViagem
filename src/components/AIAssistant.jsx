import React, { useState } from 'react';
import { 
  Sparkles, Send, MapPin, Calendar, DollarSign, Heart, 
  Car, Users, Edit3, ArrowRight, Loader2, Check, FileDown, Eye, AlertCircle, ShieldCheck
} from 'lucide-react';
import { askGeminiTravelPlanner } from '../services/geminiService';
import { CONFIG } from '../config';

const SAMPLE_PROMPTS = [
  "Quero viajar por 5 dias para Gramado com minha parceira em novembro, orçamento de até R$ 6.000, com foco em vinícolas e restaurantes intimistas.",
  "7 dias de ecoturismo e praias paradisíacas em Fernando de Noronha, orçamento de R$ 12.000 para casal.",
  "6 dias culturais e alta gastronomia em Paris com jantares refinados e museus, perfil luxo.",
  "4 dias de aventura e relax nos Lençóis Maranhenses com lagoas exclusivas e transfer privativo."
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

  const handleSendPrompt = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    setIsProcessingAI(true);
    try {
      const result = await askGeminiTravelPlanner({ prompt: query });
      if (result.success && result.parsed) {
        setPlanState(prev => ({
          ...prev,
          destination: result.parsed.destination,
          days: result.parsed.days,
          dates: result.parsed.dates,
          budget: result.parsed.budget,
          profile: result.parsed.profile,
          travelers: result.parsed.travelers,
          travelersLabel: result.parsed.travelersLabel,
          transport: result.parsed.transport,
          tags: result.parsed.tags,
          aiNotes: result.aiNotes,
          customItinerary: result.customItinerary
        }));

        onNotify?.({
          type: 'success',
          title: 'Parâmetros Extraídos com Inteligência',
          message: `Roteiro configurado para ${result.parsed.destination} (${result.parsed.days} dias). Você pode editar qualquer chip abaixo.`
        });
      }
    } catch (err) {
      console.error(err);
      onNotify?.({
        type: 'error',
        title: 'Erro de Processamento',
        message: 'Não foi possível interpretar o texto. Tente novamente ou ajuste os chips manualmente.'
      });
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleSampleClick = (prompt) => {
    setInputText(prompt);
    handleSendPrompt(prompt);
  };

  return (
    <section id="assistente-ia" className="py-12 sm:py-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Container with luxury border and background */}
      <div className="rounded-3xl sm:rounded-4xl bg-gradient-to-br from-white via-sand-50/40 to-slate-50 border border-slate-200/90 shadow-luxury p-5 sm:p-10 lg:p-12">
        
        {/* Header Badge & Title */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Assistente IA & Concierge Voyager</span>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-navy-900 font-normal tracking-tight leading-snug">
            Descreva seu plano de viagem em linguagem natural.
          </h2>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-slate-500 font-light leading-relaxed">
            Nossa inteligência artificial identifica destino, duração, orçamento e estilo da viagem, permitindo refinamento manual imediato em chips interativos.
          </p>
        </div>

        {/* Conversational Textarea Input */}
        <div className="relative mb-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-soft focus-within:border-navy-900 focus-within:ring-2 focus-within:ring-navy-900/10 transition-all p-3 sm:p-4">
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ex: Quero viajar por 5 dias para Gramado com minha parceira em novembro, orçamento de até R$ 6.000, com foco em vinícolas e restaurantes intimistas..."
              className="w-full bg-transparent text-xs sm:text-sm lg:text-base font-normal text-navy-900 placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
              disabled={isProcessingAI || isGenerating}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <span className="text-[10px] sm:text-[11px] text-slate-400">
                Pressione enviar para sintetizar parâmetros e gerar a matriz de cotação
              </span>

              <button
                type="button"
                onClick={() => handleSendPrompt()}
                disabled={isProcessingAI || !inputText.trim() || isGenerating}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-2xl bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white text-xs font-semibold tracking-wide transition-all shadow-soft flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Processando via IA...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Processar Plano</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div className="mb-8 sm:mb-10">
          <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
            Sugestões Rápidas de Inspiração:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROMPTS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSampleClick(sample)}
                disabled={isProcessingAI || isGenerating}
                className="text-left text-[11px] sm:text-xs bg-white hover:bg-slate-50 text-slate-600 hover:text-navy-900 border border-slate-200/80 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-all shadow-2xs hover:border-slate-300"
              >
                "{sample.slice(0, 68)}..."
              </button>
            ))}
          </div>
        </div>

        {/* INTERACTIVE & EDITABLE CHIPS PANEL */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-soft mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-navy-900">
                Parâmetros Detectados do seu Roteiro
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Clique em qualquer chip para ajustar valores antes de gerar o documento final.
              </p>
            </div>
            
            {planState.aiNotes && (
              <span className="text-[10px] sm:text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
                {planState.aiNotes}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            
            {/* CHIP 1: Destino */}
            <div className="relative group">
              <div 
                onClick={() => setEditingField(editingField === 'destination' ? null : 'destination')}
                className="cursor-pointer p-3 rounded-2xl bg-sand-50/70 hover:bg-sand-100 border border-sand-200/80 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    Destino
                  </span>
                  <Edit3 className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                  {planState.destination}
                </div>
              </div>

              {editingField === 'destination' && (
                <div className="absolute left-0 right-0 sm:right-auto sm:w-64 bg-white rounded-2xl shadow-modal border border-slate-200 p-3 z-30">
                  <div className="text-[11px] font-bold text-navy-900 mb-2">Alterar Destino:</div>
                  <input
                    type="text"
                    value={planState.destination}
                    onChange={(e) => setPlanState(prev => ({ ...prev, destination: e.target.value }))}
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 border border-slate-200 mb-2 focus:outline-none"
                    placeholder="Digite o destino"
                  />
                  <button
                    onClick={() => setEditingField(null)}
                    className="w-full py-1.5 bg-navy-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Salvar
                  </button>
                </div>
              )}
            </div>

            {/* CHIP 2: Duração em Dias */}
            <div className="relative group">
              <div 
                onClick={() => setEditingField(editingField === 'days' ? null : 'days')}
                className="cursor-pointer p-3 rounded-2xl bg-sand-50/70 hover:bg-sand-100 border border-sand-200/80 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    Duração
                  </span>
                  <Edit3 className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                  {planState.days} dias inteiros
                </div>
              </div>

              {editingField === 'days' && (
                <div className="absolute left-0 right-0 sm:right-auto sm:w-56 bg-white rounded-2xl shadow-modal border border-slate-200 p-3 z-30">
                  <div className="text-[11px] font-bold text-navy-900 mb-2">Selecione a Duração:</div>
                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    {[3, 4, 5, 6, 7, 8, 10, 12].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setPlanState(prev => ({ ...prev, days: d }));
                          setEditingField(null);
                        }}
                        className={`py-1 rounded-lg text-xs font-bold cursor-pointer ${
                          planState.days === d ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-navy-900'
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CHIP 3: Época / Mês */}
            <div className="relative group">
              <div 
                onClick={() => setEditingField(editingField === 'dates' ? null : 'dates')}
                className="cursor-pointer p-3 rounded-2xl bg-sand-50/70 hover:bg-sand-100 border border-sand-200/80 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    Período
                  </span>
                  <Edit3 className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                  {planState.dates}
                </div>
              </div>

              {editingField === 'dates' && (
                <div className="absolute left-0 right-0 sm:right-auto sm:w-60 bg-white rounded-2xl shadow-modal border border-slate-200 p-3 z-30">
                  <div className="text-[11px] font-bold text-navy-900 mb-2">Período Previsto:</div>
                  <input
                    type="text"
                    value={planState.dates}
                    onChange={(e) => setPlanState(prev => ({ ...prev, dates: e.target.value }))}
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 border border-slate-200 mb-2 focus:outline-none"
                    placeholder="Ex: Novembro / Inverno"
                  />
                  <button
                    onClick={() => setEditingField(null)}
                    className="w-full py-1.5 bg-navy-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Salvar
                  </button>
                </div>
              )}
            </div>

            {/* CHIP 4: Orçamento */}
            <div className="relative group">
              <div 
                onClick={() => setEditingField(editingField === 'budget' ? null : 'budget')}
                className="cursor-pointer p-3 rounded-2xl bg-sand-50/70 hover:bg-sand-100 border border-sand-200/80 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-emerald-600" />
                    Orçamento
                  </span>
                  <Edit3 className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                  R$ {planState.budget.toLocaleString('pt-BR')}
                </div>
              </div>

              {editingField === 'budget' && (
                <div className="absolute left-0 right-0 sm:right-auto sm:w-64 bg-white rounded-2xl shadow-modal border border-slate-200 p-3 z-30">
                  <div className="text-[11px] font-bold text-navy-900 mb-2">Teto de Orçamento (R$):</div>
                  <input
                    type="number"
                    step="500"
                    value={planState.budget}
                    onChange={(e) => setPlanState(prev => ({ ...prev, budget: Number(e.target.value) || 0 }))}
                    className="w-full text-xs p-2 rounded-xl bg-slate-50 border border-slate-200 mb-2 focus:outline-none"
                  />
                  <button
                    onClick={() => setEditingField(null)}
                    className="w-full py-1.5 bg-navy-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Salvar
                  </button>
                </div>
              )}
            </div>

            {/* CHIP 5: Perfil / Estilo */}
            <div className="relative group">
              <div 
                onClick={() => setEditingField(editingField === 'profile' ? null : 'profile')}
                className="cursor-pointer p-3 rounded-2xl bg-sand-50/70 hover:bg-sand-100 border border-sand-200/80 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-emerald-600" />
                    Perfil
                  </span>
                  <Edit3 className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                  {planState.profile}
                </div>
              </div>

              {editingField === 'profile' && (
                <div className="absolute left-0 right-0 sm:right-0 sm:left-auto sm:w-56 bg-white rounded-2xl shadow-modal border border-slate-200 p-2 z-30">
                  <div className="text-[11px] font-bold text-navy-900 mb-2 px-2">Escolha o Perfil:</div>
                  {[
                    'Romântico & Intimista',
                    'Gastronômico & Vinhos',
                    'Luxo & Exclusividade',
                    'Família & Conforto',
                    'Ecoturismo & Natureza'
                  ].map(p => (
                    <button
                      key={p}
                      onClick={() => {
                        setPlanState(prev => ({ ...prev, profile: p }));
                        setEditingField(null);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium hover:bg-slate-50 cursor-pointer ${
                        planState.profile === p ? 'text-emerald-600 font-bold bg-emerald-50' : 'text-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CHIP 6: Viajantes */}
            <div className="relative group">
              <div 
                onClick={() => setEditingField(editingField === 'travelers' ? null : 'travelers')}
                className="cursor-pointer p-3 rounded-2xl bg-sand-50/70 hover:bg-sand-100 border border-sand-200/80 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-emerald-600" />
                    Passageiros
                  </span>
                  <Edit3 className="w-3 h-3 text-slate-400 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                  {planState.travelersLabel || `${planState.travelers} pessoas`}
                </div>
              </div>

              {editingField === 'travelers' && (
                <div className="absolute left-0 right-0 sm:right-0 sm:left-auto sm:w-60 bg-white rounded-2xl shadow-modal border border-slate-200 p-3 z-30">
                  <div className="text-[11px] font-bold text-navy-900 mb-2">Quantidade de Viajantes:</div>
                  <div className="flex items-center justify-between gap-1.5 mb-3">
                    {[1, 2, 3, 4, 6].map(num => (
                      <button
                        key={num}
                        onClick={() => {
                          setPlanState(prev => ({ 
                            ...prev, 
                            travelers: num, 
                            travelersLabel: num === 1 ? 'Viajante Solo' : num === 2 ? 'Casal (2 viajantes)' : `Grupo (${num} viajantes)`
                          }));
                          setEditingField(null);
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                          planState.travelers === num ? 'bg-navy-900 text-white' : 'bg-slate-100 text-navy-900'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* PRIMARY GENERATION ACTION BAR */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-navy-900 text-white shadow-soft">
          <div>
            <h4 className="font-serif text-base sm:text-lg font-normal">
              Pronto para materializar seu roteiro com cotações?
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-300 font-light mt-0.5">
              Gera documento PDF de alta fidelidade editorial diretamente no navegador (100% Client-Side).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            {hasGeneratedPDF && (
              <button
                type="button"
                onClick={onOpenPreview}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
              >
                <Eye className="w-4 h-4" />
                <span>Pré-visualizar na Tela</span>
              </button>
            )}

            <button
              type="button"
              onClick={onGeneratePDF}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-navy-900 text-xs sm:text-sm font-bold tracking-wide transition-all shadow-luxury flex items-center justify-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-navy-900" />
                  <span>Gerando Cotação em PDF...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-navy-900" />
                  <span>Gerar Roteiro e Cotação em PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
