import React from 'react';
import { X, FileDown, Printer, Share2 } from 'lucide-react';
import PDFDocumentTemplate from './PDFDocumentTemplate';

export default function PDFPreviewModal({ 
  isOpen, 
  onClose, 
  planState, 
  selectedEvents, 
  onDownloadAgain 
}) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-navy-900/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-modal border border-slate-200/90 overflow-hidden my-auto">
        
        {/* Modal Controls Header */}
        <div className="px-6 py-4 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest block">
              Pré-visualização Editorial
            </span>
            <h3 className="font-serif text-lg font-normal text-white">
              {planState.destination} — Roteiro & Cotação
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Imprimir"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              type="button"
              onClick={onDownloadAgain}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Baixar PDF Novamente"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Baixar PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Fechar pré-visualização"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#F4F2EC]">
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
            <PDFDocumentTemplate planState={planState} selectedEvents={selectedEvents} />
          </div>
        </div>

      </div>
    </div>
  );
}
