import React, { useEffect, useState } from 'react';
import { Plane, Building2, MapPin, CheckCircle2, FileDown, Eye, X, Loader2 } from 'lucide-react';

const STAGES = [
  {
    id: 1,
    title: 'Analisando malha aérea e opções de voos...',
    icon: Plane,
    duration: 1200
  },
  {
    id: 2,
    title: 'Comparando médias tarifárias em Booking, Decolar e Airbnb...',
    icon: Building2,
    duration: 1400
  },
  {
    id: 3,
    title: 'Montando roteiro inteligente dia a dia...',
    icon: MapPin,
    duration: 1500
  },
  {
    id: 4,
    title: 'Pronto! O download iniciará automaticamente.',
    icon: CheckCircle2,
    duration: 1000
  }
];

export default function PDFProgressModal({ 
  isOpen, 
  onClose, 
  onTriggerDownload, 
  onOpenPreview,
  destinationName 
}) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStageIdx(0);
      setIsCompleted(false);
      return;
    }

    let timeoutId;
    
    // Step-by-step progress animation
    const runStages = (idx) => {
      if (idx < STAGES.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentStageIdx(idx + 1);
          runStages(idx + 1);
        }, STAGES[idx].duration);
      } else {
        // Last step: trigger download automatically
        timeoutId = setTimeout(() => {
          setIsCompleted(true);
          onTriggerDownload();
        }, STAGES[STAGES.length - 1].duration);
      }
    };

    runStages(0);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStage = STAGES[currentStageIdx];
  const progressPercent = Math.round(((currentStageIdx + 1) / STAGES.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-4xl max-w-lg w-full p-8 shadow-modal border border-slate-200/90 relative animate-scale-up">
        
        {/* Close Button when completed */}
        {isCompleted && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-navy-900 transition-colors p-1"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-soft">
            {isCompleted ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce-short" />
            ) : (
              <currentStage.icon className="w-7 h-7 text-emerald-600 animate-pulse" />
            )}
          </div>

          <h3 className="font-serif text-2xl font-normal text-navy-900">
            {isCompleted ? 'Roteiro & Cotação Prontos!' : 'Curadoria Voyager AI em Andamento'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Destino: <strong>{destinationName}</strong>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
            <span>Progresso da Compilação</span>
            <span className="text-navy-900">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stages List */}
        <div className="space-y-3 mb-8">
          {STAGES.map((stage, idx) => {
            const isDone = idx < currentStageIdx || isCompleted;
            const isCurrent = idx === currentStageIdx && !isCompleted;

            return (
              <div
                key={stage.id}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-emerald-50/80 border border-emerald-200' 
                    : isDone 
                    ? 'bg-slate-50/70 opacity-90' 
                    : 'opacity-40'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isDone 
                    ? 'bg-emerald-600 text-white' 
                    : isCurrent 
                    ? 'bg-emerald-200 text-emerald-900 animate-spin-slow' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {isDone ? '✓' : idx + 1}
                </div>

                <span className={`text-xs ${
                  isCurrent ? 'font-bold text-emerald-900' : isDone ? 'text-navy-900 font-medium' : 'text-slate-500'
                }`}>
                  {stage.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Actions when completed */}
        {isCompleted ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onTriggerDownload}
              className="py-3 px-4 rounded-2xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold tracking-wide transition-all shadow-soft flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-emerald-400" />
              <span>Baixar Novamente</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenPreview();
              }}
              className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide transition-all shadow-soft flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Pré-visualizar na Tela</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Processando via Voyager AI Client Engine...</span>
          </div>
        )}

      </div>
    </div>
  );
}
