import React from 'react';
import { Smartphone, Download, Share2, PlusSquare, CheckCircle2, X, Sparkles, Compass } from 'lucide-react';
import { usePWAInstall } from '../utils/pwaManager';

export default function PWAInstallModal({ isOpen, onClose }) {
  const { isPromptAvailable, isIOS, isInstalled, promptInstall } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isPromptAvailable) {
      const res = await promptInstall();
      if (res.success) {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#05132D] border border-amber-400/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(251,191,36,0.25)] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/50 hover:bg-slate-800 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#020712] via-[#040E24] to-[#0B2554] border-2 border-amber-400/60 p-2 shadow-[0_0_25px_rgba(251,191,36,0.35)] flex items-center justify-center">
              <img 
                src="/icons/icon-192x192.png" 
                alt="VOYAGER AI Ícone" 
                className="w-16 h-16 rounded-xl object-contain drop-shadow"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <Compass className="w-10 h-10 text-amber-400 hidden" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full border-2 border-[#05132D]">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400/90 mb-1 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5" /> Aplicativo Instalável (PWA)
          </span>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
            Instalar o <span className="text-amber-400">VOYAGER AI</span> no Celular
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Acesse seus roteiros encantados, cotações com 1 clique e calculadora de custos diretamente da tela inicial do seu celular, com abertura rápida e navegação nativa.
          </p>
        </div>

        {/* Content Body depending on Platform */}
        {isInstalled ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 text-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-emerald-200">
              O aplicativo já está instalado no seu dispositivo!
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Procure pelo ícone do VOYAGER AI na sua lista de apps ou tela inicial.
            </p>
          </div>
        ) : isIOS ? (
          <div className="bg-slate-900/80 border border-slate-700/60 rounded-2xl p-4 space-y-3 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>Como instalar no iPhone / iPad (Safari):</span>
            </p>
            
            <div className="flex items-start gap-3 text-xs text-slate-200">
              <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </div>
              <div>
                Toque no botão de <strong>Compartilhar</strong> <Share2 className="inline w-3.5 h-3.5 mx-1 text-sky-400" /> na barra inferior do Safari.
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-200">
              <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </div>
              <div>
                Role a tela para baixo e selecione <strong className="text-amber-300">"Adicionar à Tela de Início"</strong> <PlusSquare className="inline w-3.5 h-3.5 mx-1 text-emerald-400" />.
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-200">
              <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                3
              </div>
              <div>
                Toque em <strong>"Adicionar"</strong> no canto superior direito para confirmar. O ícone aparecerá instantaneamente!
              </div>
            </div>
          </div>
        ) : isPromptAvailable ? (
          <div className="space-y-4 mb-6">
            <button
              onClick={handleInstallClick}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(251,191,36,0.4)] flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              <Download className="w-4 h-4" />
              Instalar Aplicativo Agora
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Compatível com Android, Google Chrome, Edge e navegadores modernos.
            </p>
          </div>
        ) : (
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 space-y-2 mb-6">
            <p className="font-semibold text-amber-300">
              Dica de instalação para outros dispositivos:
            </p>
            <p>
              No computador ou celular, você pode clicar no ícone de <strong>instalação (⊕)</strong> localizado na barra de endereço do seu navegador (Chrome ou Edge) para instalar o VOYAGER AI diretamente.
            </p>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-[10px] text-slate-400 italic">
            Idealizado por Victor Ricardo de Carvalho Moreira
          </span>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
