import { useState, useEffect } from 'react';

let deferredPrompt = null;
const listeners = new Set();

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default browser mini-infobar
    e.preventDefault();
    deferredPrompt = e;
    listeners.forEach((fn) => fn());
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    listeners.forEach((fn) => fn());
    console.log('[PWA] VOYAGER AI instalado com sucesso na tela inicial!');
  });
}

export function usePWAInstall() {
  const [isPromptAvailable, setIsPromptAvailable] = useState(!!deferredPrompt);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect if running as installed standalone app
    const standaloneCheck =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(standaloneCheck);
    setIsInstalled(standaloneCheck);

    // Detect iOS
    const userAgent = window.navigator.userAgent || '';
    const isAppleDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    setIsIOS(isAppleDevice);

    const updatePrompt = () => {
      setIsPromptAvailable(!!deferredPrompt);
    };

    listeners.add(updatePrompt);
    return () => {
      listeners.delete(updatePrompt);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          console.log('[PWA] Usuário aceitou a instalação do VOYAGER AI');
          deferredPrompt = null;
          setIsPromptAvailable(false);
          return { success: true, outcome: 'accepted' };
        } else {
          console.log('[PWA] Usuário recusou a instalação');
          return { success: false, outcome: 'dismissed' };
        }
      } catch (err) {
        console.error('[PWA] Erro ao disparar prompt de instalação:', err);
        return { success: false, error: err };
      }
    }
    return { success: false, reason: 'no-prompt' };
  };

  return {
    isInstallable: isPromptAvailable || isIOS,
    isPromptAvailable,
    isInstalled: isInstalled || isStandalone,
    isIOS,
    isStandalone,
    promptInstall
  };
}
