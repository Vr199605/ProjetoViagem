import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-[9999] sm:max-w-md animate-bounce-in pointer-events-auto">
      <div className="glass-panel bg-white/98 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] p-3.5 sm:p-4 border border-slate-200 flex items-start gap-3 backdrop-blur-md">
        {icons[toast.type] || icons.info}
        <div className="flex-1">
          {toast.title && <h4 className="text-sm font-semibold text-navy-900">{toast.title}</h4>}
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-navy-900 transition-colors p-1"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
