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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with App Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-18 h-18 rounded-2xl bg-slate-800 border border-slate-700 p-2 shadow-xs flex items-center justify-center">
              <img 
                src="/icons/icon-192x192.png" 
                alt="VOYAGER AI Ícone" 
                className="w-14 h-14 rounded-xl object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <Compass className="w-9 h-9 text-emerald-400 hidden" />
            </div>
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5" /> Aplicativo Instalável (PWA)
          </span>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
            Instalar o <span className="text-emerald-400">VOYAGER AI</span> no Celular
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-light">
            Acesse seus roteiros de viagem, cotações em tempo real e calculadora de custos diretamente da tela inicial do seu celular, com abertura rápida e navegação nativa.
          </p>
        </div>

        {/* Content Body depending on Platform */}
        {isInstalled ? (
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 text-center mb-6">
            <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-emerald-300">
              O aplicativo já está instalado no seu dispositivo!
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Procure pelo ícone do VOYAGER AI na sua lista de apps ou tela inicial.
            </p>
          </div>
        ) : isIOS ? (
          <div className="bg-slate-850 border border-slate-700/60 rounded-xl p-4 space-y-3 mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span>Como instalar no iPhone / iPad (Safari):</span>
            </p>
            
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                1
              </div>
              <div>
                Toque no botão de <strong>Compartilhar</strong> <Share2 className="inline w-3.5 h-3.5 mx-1 text-sky-400" /> na barra inferior do Safari.
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                2
              </div>
              <div>
                Role a tela para baixo e selecione <strong className="text-white">"Adicionar à Tela de Início"</strong> <PlusSquare className="inline w-3.5 h-3.5 mx-1 text-emerald-400" />.
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <div className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
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
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Instalar Aplicativo Agora
            </button>
            <p className="text-[11px] text-center text-slate-500">
              Compatível com Android, Google Chrome, Edge e navegadores modernos.
            </p>
          </div>
        ) : (
          <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2 mb-6 font-light">
            <p className="font-semibold text-slate-200">
              Dica de instalação para outros dispositivos:
            </p>
            <p>
              No computador ou celular, você pode clicar no ícone de <strong>instalação (⊕)</strong> localizado na barra de endereço do seu navegador (Chrome ou Edge) para instalar o VOYAGER AI diretamente.
            </p>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
          <span className="text-[10px] text-slate-500">
            Idealizado por Victor Ricardo de Carvalho Moreira
          </span>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
