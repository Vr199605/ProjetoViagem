import React, { useState, useRef } from 'react';
import Header from './components/Header';
import HeroSearch from './components/HeroSearch';
import DestinationFeed from './components/DestinationFeed';
import EventCalendar from './components/EventCalendar';
import AIAssistant from './components/AIAssistant';
import PDFProgressModal from './components/PDFProgressModal';
import PDFPreviewModal from './components/PDFPreviewModal';
import PDFDocumentTemplate from './components/PDFDocumentTemplate';
import ToastNotification from './components/ToastNotification';
import PWAInstallModal from './components/PWAInstallModal';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

import { buildCustomItinerary } from './data/itineraries';
import { generateEditorialPDF } from './utils/pdfGenerator';

export default function App() {
  // Master Trip Planner State
  const [planState, setPlanState] = useState({
    destination: 'Gramado & Canela',
    days: 5,
    dates: 'Novembro',
    budget: 6000,
    profile: 'Romântico & Intimista',
    travelers: 2,
    travelersLabel: 'Casal (2 viajantes)',
    transport: 'Aéreo + Transfer Executivo',
    tags: ['Gastronomia & Vinhos', 'Romântico'],
    aiNotes: 'Curadoria sob medida com foco em vinícolas e restaurantes intimistas na Serra Gaúcha.',
    customItinerary: buildCustomItinerary('Gramado & Canela', 5, 'Romântico & Intimista')
  });

  // Selected events
  const [selectedEvents, setSelectedEvents] = useState([]);

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Active View State ('landing' | 'platform')
  const [currentView, setCurrentView] = useState('landing');

  // Modals & Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [hasGeneratedPDF, setHasGeneratedPDF] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Hidden print container ref for html2canvas / jsPDF
  const printableRef = useRef(null);

  // Notify helper
  const notify = (data) => {
    setToast(data);
  };

  // Add/Select Destination into Master Plan
  const handleIncludeDestination = (dest) => {
    setPlanState((prev) => ({
      ...prev,
      destination: dest.name,
      days: dest.recommendedDays || prev.days,
      tags: dest.tags || prev.tags,
      customItinerary: buildCustomItinerary(dest.name, dest.recommendedDays || prev.days, prev.profile),
      aiNotes: `Destino ${dest.name} selecionado a partir da Coleção Voyager com base em ${dest.vibe}.`
    }));

    // Smooth scroll down to AI assistant
    const el = document.getElementById('assistente-ia');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add/Remove Event from Trip
  const handleToggleEvent = (event) => {
    setSelectedEvents((prev) => {
      const exists = prev.some((e) => e.id === event.id);
      if (exists) {
        return prev.filter((e) => e.id !== event.id);
      } else {
        return [...prev, event];
      }
    });
  };

  // Trigger PDF Generation Flow
  const handleStartPDFGeneration = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setShowProgressModal(true);
  };

  // Actual Download Action (called by Progress Modal or User CTA)
  const handleDownloadPDF = async () => {
    try {
      const element = printableRef.current;
      if (!element) {
        throw new Error('Elemento de impressão não encontrado');
      }

      const cleanName = planState.destination.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `VoyagerAI_Roteiro_${cleanName}_${planState.days}Dias.pdf`;

      await generateEditorialPDF(element, filename);
      setHasGeneratedPDF(true);

      notify({
        type: 'success',
        title: 'Download Concluído',
        message: `O arquivo ${filename} foi baixado diretamente na sua tela!`
      });
    } catch (err) {
      console.error(err);
      notify({
        type: 'error',
        title: 'Aviso de Geração',
        message: 'Ocorreu uma instabilidade ao compilar o PDF. Você pode pré-visualizar na tela e imprimir.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-[#030814] text-slate-100">
        <LandingPage 
          onEnterPlatform={() => {
            setCurrentView('platform');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          onOpenInstallModal={() => setShowInstallModal(true)}
        />
        <PWAInstallModal 
          isOpen={showInstallModal} 
          onClose={() => setShowInstallModal(false)} 
        />
        <ToastNotification toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030814] text-slate-100 selection:bg-amber-400 selection:text-slate-950 w-full max-w-full overflow-x-hidden">
      
      {/* 1. Header with Glassmorphism & Navigation */}
      <Header 
        plannedItemsCount={selectedEvents.length + (planState.destination ? 1 : 0)}
        onOpenPlanner={() => {
          const el = document.getElementById('assistente-ia');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onBackToLanding={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenInstallModal={() => setShowInstallModal(true)}
      />

      {/* 2. Hero Section with Rotating Imagery & Universal Search Box */}
      <HeroSearch
        onSelectDestinationForPlan={handleIncludeDestination}
        onNotify={notify}
      />

      {/* 3. Feed de Destinos (Brasil & Globais) */}
      <DestinationFeed
        onIncludeInPlan={handleIncludeDestination}
        plannedDestinationId={planState.destination}
        onNotify={notify}
      />

      {/* 4. Global Event Calendar */}
      <EventCalendar
        onAddEventToPlan={handleToggleEvent}
        selectedEvents={selectedEvents}
        onNotify={notify}
      />

      {/* 5. AI Itinerary & Quotation Assistant (Conversational + Interactive Chips) */}
      <AIAssistant
        planState={planState}
        setPlanState={setPlanState}
        onGeneratePDF={handleStartPDFGeneration}
        isGenerating={isGenerating}
        onOpenPreview={() => setShowPreviewModal(true)}
        hasGeneratedPDF={hasGeneratedPDF}
        onNotify={notify}
      />

      {/* 6. Footer */}
      <Footer />

      {/* Animated 4-step Progress Modal */}
      <PDFProgressModal
        isOpen={showProgressModal}
        onClose={() => {
          setShowProgressModal(false);
          setIsGenerating(false);
        }}
        onTriggerDownload={handleDownloadPDF}
        onOpenPreview={() => setShowPreviewModal(true)}
        destinationName={planState.destination}
      />

      {/* On-Screen Luxury PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        planState={planState}
        selectedEvents={selectedEvents}
        onDownloadAgain={handleDownloadPDF}
      />

      {/* PWA Installation Modal */}
      <PWAInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />

      {/* Toast Notification Container */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Hidden Offscreen Container for Client-Side High-Res PDF Capture */}
      <div 
        style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none', zIndex: -9999 }} 
        aria-hidden="true"
      >
        <div ref={printableRef} className="bg-[#FAF9F6] w-[900px]">
          <PDFDocumentTemplate planState={planState} selectedEvents={selectedEvents} />
        </div>
      </div>

    </div>
  );
}
