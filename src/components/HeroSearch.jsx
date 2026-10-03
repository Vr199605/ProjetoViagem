import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, Plane, Package, Ticket, Calendar, Users, 
  Search, ArrowRight, MapPin, ChevronDown, Check, ExternalLink, 
  Sparkles, ArrowLeftRight, TrendingDown, ShieldCheck, Award,
  Luggage, Compass, Filter
} from 'lucide-react';
import { SEARCH_AUTOCOMPLETE } from '../data/destinations';
import { calculateFlightComparison, calculatePackageComparison } from '../data/quotations';
import { CONFIG } from '../config';
import { 
  buildBookingUrl, 
  buildSkyscannerUrl, 
  buildDecolarUrl, 
  buildAirbnbUrl, 
  buildSymplaUrl, 
  buildEventbriteUrl 
} from '../utils/deeplinkBuilder';

const HERO_SLIDES = [
  {
    image: '/images/destinations/noronha.jpg',
    title: 'Fernando de Noronha',
    subtitle: 'Santuário de águas anil e vida marinha pura no Atlântico Sul'
  },
  {
    image: '/images/destinations/lencois.jpg',
    title: 'Lençóis Maranhenses',
    subtitle: 'Dunas esculpidas pelo vento e oásis de água doce cristalina'
  },
  {
    image: '/images/destinations/gramado.jpg',
    title: 'Gramado & Serra Gaúcha',
    subtitle: 'Clima europeu, chalés alpinos e vinhedos premiados'
  },
  {
    image: '/images/destinations/paris.jpg',
    title: 'Paris & Vale do Loire',
    subtitle: 'O berço da elegância, alta costura e gastronomia estrelada'
  }
];

export default function HeroSearch({ onSelectDestinationForPlan, onNotify }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('voos');
  
  // Flight Specific Modes
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [flightClass, setFlightClass] = useState('Econômica');
  const [hasCheckedBaggage, setHasCheckedBaggage] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [flightSubTab, setFlightSubTab] = useState('todas'); // 'todas' | 'comparadores' | 'companhias'

  // Search parameters
  const [originQuery, setOriginQuery] = useState('São Paulo, SP (GRU / CGH / VCP)');
  const [destinationQuery, setDestinationQuery] = useState('Gramado & Canela, RS (POA)');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  // Travelers modal/popover
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [rooms, setRooms] = useState(1);

  // Autocomplete suggestions
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);

  const [destSuggestions, setDestSuggestions] = useState([]);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  // Partner deeplink / flight comparison / packages results
  const [lastSearchedDeeplinks, setLastSearchedDeeplinks] = useState(null);
  const [flightComparisonResults, setFlightComparisonResults] = useState(null);
  const [packageComparisonResults, setPackageComparisonResults] = useState(null);

  const originRef = useRef(null);
  const destRef = useRef(null);

  // Auto slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Today's date in YYYY-MM-DD format for min-date
  const todayStr = new Date().toISOString().split('T')[0];

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (originRef.current && !originRef.current.contains(event.target)) {
        setShowOriginSuggestions(false);
      }
      if (destRef.current && !destRef.current.contains(event.target)) {
        setShowDestSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Origin autocomplete
  const handleOriginInput = (e) => {
    const val = e.target.value;
    setOriginQuery(val);
    if (val.trim().length > 0) {
      const filtered = SEARCH_AUTOCOMPLETE.filter(item => 
        item.label.toLowerCase().includes(val.toLowerCase()) ||
        item.country.toLowerCase().includes(val.toLowerCase()) ||
        (item.airport && item.airport.toLowerCase().includes(val.toLowerCase()))
      );
      setOriginSuggestions(filtered);
      setShowOriginSuggestions(true);
    } else {
      setOriginSuggestions(SEARCH_AUTOCOMPLETE.slice(0, 8));
      setShowOriginSuggestions(true);
    }
  };

  // Destination autocomplete
  const handleDestinationInput = (e) => {
    const val = e.target.value;
    setDestinationQuery(val);
    if (val.trim().length > 0) {
      const filtered = SEARCH_AUTOCOMPLETE.filter(item => 
        item.label.toLowerCase().includes(val.toLowerCase()) ||
        item.country.toLowerCase().includes(val.toLowerCase()) ||
        (item.airport && item.airport.toLowerCase().includes(val.toLowerCase()))
      );
      setDestSuggestions(filtered);
      setShowDestSuggestions(true);
    } else {
      setDestSuggestions(SEARCH_AUTOCOMPLETE.slice(0, 8));
      setShowDestSuggestions(true);
    }
  };

  // Date validation: Return Date cannot be before Depart Date
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    if (checkOut && newCheckIn >= checkOut) {
      const d = new Date(newCheckIn);
      d.setDate(d.getDate() + 5);
      setCheckOut(d.toISOString().split('T')[0]);
      onNotify?.({
        type: 'info',
        title: 'Datas Ajustadas',
        message: 'A data de volta foi ajustada para após a data de partida.'
      });
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    if (checkIn && newCheckOut <= checkIn) {
      onNotify?.({
        type: 'error',
        title: 'Data Inválida',
        message: 'A data de retorno deve ser posterior à data de ida.'
      });
      return;
    }
    setCheckOut(newCheckOut);
  };

  // Swap Origin and Destination
  const handleSwapLocations = () => {
    const temp = originQuery;
    setOriginQuery(destinationQuery);
    setDestinationQuery(temp);
  };

  // Execute Search & Comparative Engine
  const handleExecuteSearch = (e) => {
    e.preventDefault();

    if (!destinationQuery) {
      onNotify?.({
        type: 'error',
        title: 'Destino Obrigatório',
        message: 'Por favor, informe a cidade ou aeroporto de destino.'
      });
      return;
    }

    const cleanDest = destinationQuery.split('(')[0].trim();
    const cleanOrig = originQuery.split('(')[0].trim();

    if (activeTab === 'voos') {
      const comparison = calculateFlightComparison({
        origin: originQuery,
        destination: destinationQuery,
        departDate: checkIn,
        returnDate: checkOut,
        roundTrip: isRoundTrip,
        adults,
        seatClass: flightClass,
        checkedBaggage: hasCheckedBaggage,
        directOnly: directOnly
      });

      setFlightComparisonResults(comparison);
      setPackageComparisonResults(null);

      const totalCount = (comparison.otas?.length || 0) + (comparison.airlines?.length || 0);
      onNotify?.({
        type: 'success',
        title: 'Cotação Multiplataforma Pronta',
        message: `Comparamos ${comparison.otas?.length || 6} comparadores e ${comparison.airlines?.length || 20} companhias aéreas entre ${cleanOrig} e ${cleanDest} (${isRoundTrip ? 'Ida e Volta' : 'Somente Ida'}).`
      });
    } else if (activeTab === 'pacotes') {
      let durationDays = 5;
      if (checkIn && checkOut) {
        const dIn = new Date(checkIn);
        const dOut = new Date(checkOut);
        const diffTime = Math.abs(dOut - dIn);
        const computedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (computedDays > 0) durationDays = computedDays;
      }

      const packageComparison = calculatePackageComparison({
        origin: originQuery,
        destination: destinationQuery,
        checkIn,
        checkOut,
        adults,
        rooms,
        days: durationDays
      });

      setPackageComparisonResults(packageComparison);
      setFlightComparisonResults(null);

      onNotify?.({
        type: 'success',
        title: 'Cotação de Pacotes Pronta',
        message: `Calculamos os melhores pacotes de viagem em ${packageComparison.length} operadoras líderes para ${cleanDest}.`
      });
    } else {
      const bookingUrl = buildBookingUrl({ 
        destination: cleanDest, 
        checkIn, 
        checkOut, 
        adults, 
        rooms 
      });

      const decolarUrl = buildDecolarUrl({ 
        destination: cleanDest, 
        checkIn, 
        checkOut 
      });

      const airbnbUrl = buildAirbnbUrl({ 
        destination: cleanDest, 
        checkIn, 
        checkOut, 
        adults 
      });

      const symplaUrl = buildSymplaUrl(cleanDest);
      const eventbriteUrl = buildEventbriteUrl(cleanDest);

      setLastSearchedDeeplinks({
        destination: cleanDest,
        bookingUrl,
        decolarUrl,
        airbnbUrl,
        symplaUrl,
        eventbriteUrl
      });
      setFlightComparisonResults(null);
      setPackageComparisonResults(null);

      onNotify?.({
        type: 'success',
        title: 'Busca Concluída',
        message: `Cotações disponíveis em tempo real para ${cleanDest}.`
      });
    }
  };

  return (
    <div className="relative min-h-[640px] sm:min-h-[700px] lg:min-h-[760px] flex items-center justify-center overflow-hidden pb-12 sm:pb-16">
      
      {/* Background Rotating Imagery */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/40 to-black/35" />
        </div>
      ))}

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide 
                ? 'w-7 sm:w-8 h-1.5 bg-emerald-400' 
                : 'w-2 h-1.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full pt-6 sm:pt-10 text-center">
        
        {/* Editorial Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-[10px] sm:text-xs uppercase tracking-widest font-semibold mb-4 sm:mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Cobertura Universal: Todo o Brasil e o Mundo</span>
        </div>

        {/* Editorial Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.18] sm:leading-[1.15] max-w-4xl mx-auto drop-shadow-md">
          Descubra o Brasil e o Mundo com inteligência e sofisticação.
        </h1>
        
        <p className="mt-3 sm:mt-4 text-xs sm:text-base lg:text-lg text-slate-200/90 max-w-2xl mx-auto font-light leading-relaxed px-2">
          Comparamos os melhores preços de voos e hotéis em Google Flights, Skyscanner, Decolar, 123 Milhas, MaxMilhas e Booking.
        </p>

        {/* Universal Search Container */}
        <div className="mt-6 sm:mt-8 max-w-5xl mx-auto text-left">
          <div className="glass-dropdown bg-white/95 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-modal border border-white/80">
            
            {/* Search Tabs & Flight Mode Selector */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
              
              {/* Category Tabs (Horizontal Scroll on Mobile) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('voos');
                    setFlightComparisonResults(null);
                    setPackageComparisonResults(null);
                    setLastSearchedDeeplinks(null);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeTab === 'voos'
                      ? 'bg-navy-900 text-white shadow-soft'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Voos & Cotação</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('hospedagens');
                    setFlightComparisonResults(null);
                    setPackageComparisonResults(null);
                    setLastSearchedDeeplinks(null);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeTab === 'hospedagens'
                      ? 'bg-navy-900 text-white shadow-soft'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Hospedagens</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('pacotes');
                    setFlightComparisonResults(null);
                    setPackageComparisonResults(null);
                    setLastSearchedDeeplinks(null);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeTab === 'pacotes'
                      ? 'bg-navy-900 text-white shadow-soft'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Pacotes de Viagem</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('eventos');
                    setFlightComparisonResults(null);
                    setPackageComparisonResults(null);
                    setLastSearchedDeeplinks(null);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeTab === 'eventos'
                      ? 'bg-navy-900 text-white shadow-soft'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Ticket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Eventos</span>
                </button>
              </div>

              {/* Flight Round-Trip / Class / Baggage / Stops Controls (Visible on Voos tab) */}
              {activeTab === 'voos' && (
                <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2">
                  
                  {/* Round-trip / One-way */}
                  <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl text-[11px] sm:text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setIsRoundTrip(true)}
                      className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all ${
                        isRoundTrip ? 'bg-white text-navy-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-navy-900'
                      }`}
                    >
                      Ida e Volta
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRoundTrip(false)}
                      className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all ${
                        !isRoundTrip ? 'bg-white text-navy-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-navy-900'
                      }`}
                    >
                      Somente Ida
                    </button>
                  </div>

                  {/* Baggage Toggle */}
                  <button
                    type="button"
                    onClick={() => setHasCheckedBaggage(!hasCheckedBaggage)}
                    className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all border cursor-pointer ${
                      hasCheckedBaggage
                        ? 'bg-amber-500/15 border-amber-400 text-amber-900 shadow-2xs font-bold'
                        : 'bg-slate-100/80 border-transparent text-slate-600 hover:text-navy-900'
                    }`}
                    title="Alternar entre mala de mão (10kg) e mala despachada (23kg)"
                  >
                    <Luggage className={`w-3.5 h-3.5 ${hasCheckedBaggage ? 'text-amber-700' : 'text-slate-400'}`} />
                    <span>{hasCheckedBaggage ? 'Com Mala Despachada (23kg)' : 'Mala de Mão (10kg)'}</span>
                    {hasCheckedBaggage && <Check className="w-3 h-3 text-amber-700 ml-0.5" />}
                  </button>

                  {/* Direct Flights Only Toggle */}
                  <button
                    type="button"
                    onClick={() => setDirectOnly(!directOnly)}
                    className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all border cursor-pointer ${
                      directOnly
                        ? 'bg-emerald-500/15 border-emerald-400 text-emerald-900 shadow-2xs font-bold'
                        : 'bg-slate-100/80 border-transparent text-slate-600 hover:text-navy-900'
                    }`}
                    title="Filtrar apenas voos diretos sem escalas"
                  >
                    <Compass className={`w-3.5 h-3.5 ${directOnly ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span>{directOnly ? 'Apenas Voos Diretos' : 'Todos os Voos'}</span>
                    {directOnly && <Check className="w-3 h-3 text-emerald-700 ml-0.5" />}
                  </button>

                  {/* Cabin Class */}
                  <select
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                    className="text-[11px] sm:text-xs font-medium text-slate-700 bg-slate-100 py-1.5 px-2.5 rounded-xl border border-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="Econômica">Econômica</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Executiva">Classe Executiva</option>
                  </select>
                </div>
              )}

            </div>

            {/* Inputs Form */}
            <form onSubmit={handleExecuteSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Voos: Origem e Destino */}
              {activeTab === 'voos' ? (
                <>
                  {/* Origem */}
                  <div className="md:col-span-3 relative" ref={originRef}>
                    <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Origem
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                      <Plane className="w-4 h-4 text-slate-400 rotate-45 shrink-0" />
                      <input
                        type="text"
                        value={originQuery}
                        onChange={handleOriginInput}
                        onFocus={() => {
                          setOriginSuggestions(SEARCH_AUTOCOMPLETE.slice(0, 8));
                          setShowOriginSuggestions(true);
                        }}
                        placeholder="Origem: Ex: São Paulo, Paris..."
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-navy-900 placeholder-slate-400 focus:outline-none"
                      />
                    </div>

                    {showOriginSuggestions && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-modal border border-slate-200/90 py-2 z-50 max-h-60 overflow-y-auto">
                        <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                          Origens Sugeridas
                        </div>
                        {originSuggestions.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setOriginQuery(item.label);
                              setShowOriginSuggestions(false);
                            }}
                            className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors"
                          >
                            <span className="font-medium text-navy-900 truncate mr-2">{item.label}</span>
                            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold shrink-0">
                              {item.airport}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Destino */}
                  <div className="md:col-span-3 relative" ref={destRef}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Destino Final
                      </label>
                      <button
                        type="button"
                        onClick={handleSwapLocations}
                        className="text-[10px] text-slate-400 hover:text-navy-900 flex items-center gap-1 cursor-pointer"
                        title="Inverter origem e destino"
                      >
                        <ArrowLeftRight className="w-3 h-3" />
                        <span>Inverter</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <input
                        type="text"
                        value={destinationQuery}
                        onChange={handleDestinationInput}
                        onFocus={() => {
                          setDestSuggestions(SEARCH_AUTOCOMPLETE.slice(0, 8));
                          setShowDestSuggestions(true);
                        }}
                        placeholder="Destino: Ex: Gramado, Roma..."
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-navy-900 placeholder-slate-400 focus:outline-none"
                      />
                    </div>

                    {showDestSuggestions && (
                      <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-modal border border-slate-200/90 py-2 z-50 max-h-60 overflow-y-auto">
                        <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                          Destinos no Brasil e Mundo
                        </div>
                        {destSuggestions.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setDestinationQuery(item.label);
                              setShowDestSuggestions(false);
                            }}
                            className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors"
                          >
                            <span className="font-medium text-navy-900 truncate mr-2">{item.label}</span>
                            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold shrink-0">
                              {item.airport}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Destination Input for Hospedagens/Pacotes/Eventos */
                <div className="md:col-span-4 relative" ref={destRef}>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Qual destino no Brasil ou no Mundo?
                  </label>
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <input
                      type="text"
                      value={destinationQuery}
                      onChange={handleDestinationInput}
                      onFocus={() => {
                        setDestSuggestions(SEARCH_AUTOCOMPLETE.slice(0, 8));
                        setShowDestSuggestions(true);
                      }}
                      placeholder="Qualquer cidade do Brasil ou Mundo..."
                      className="w-full bg-transparent text-xs sm:text-sm font-medium text-navy-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>

                  {showDestSuggestions && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-modal border border-slate-200/90 py-2 z-50 max-h-60 overflow-y-auto">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                        Capitais & Cidades Turísticas
                      </div>
                      {destSuggestions.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setDestinationQuery(item.label);
                            setShowDestSuggestions(false);
                          }}
                          className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors"
                        >
                          <span className="font-medium text-navy-900 truncate mr-2">{item.label}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-bold shrink-0">
                            {item.airport}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Dates (Ida & Volta) */}
              <div className={`${activeTab === 'voos' ? 'md:col-span-3' : 'md:col-span-4'} grid grid-cols-2 gap-2`}>
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {activeTab === 'voos' ? 'Ida' : 'Check-in'}
                  </label>
                  <div className="flex items-center gap-1 px-2.5 sm:px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={handleCheckInChange}
                      className="w-full bg-transparent text-[11px] sm:text-xs font-medium text-navy-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {activeTab === 'voos' ? 'Volta' : 'Check-out'}
                  </label>
                  <div className={`flex items-center gap-1 px-2.5 sm:px-3 py-2.5 rounded-2xl border ${
                    !isRoundTrip && activeTab === 'voos' 
                      ? 'bg-slate-100/50 border-slate-200 opacity-50 cursor-not-allowed' 
                      : 'bg-slate-50 border-slate-200/80'
                  }`}>
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="date"
                      min={checkIn || todayStr}
                      value={checkOut}
                      disabled={!isRoundTrip && activeTab === 'voos'}
                      onChange={handleCheckOutChange}
                      className="w-full bg-transparent text-[11px] sm:text-xs font-medium text-navy-900 focus:outline-none disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div className={`${activeTab === 'voos' ? 'md:col-span-2' : 'md:col-span-2'} relative`}>
                <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Passageiros
                </label>
                <button
                  type="button"
                  onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 text-left transition-colors"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Users className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-navy-900 truncate">
                      {adults + childrenCount} {adults + childrenCount === 1 ? 'Pessoa' : 'Pessoas'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showTravelersDropdown && (
                  <div className="absolute left-0 sm:left-auto right-0 top-full mt-2 w-72 max-w-[92vw] bg-white rounded-2xl shadow-modal border border-slate-200 p-4 z-50">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-bold text-navy-900">Adultos</div>
                        <div className="text-[10px] text-slate-400">12+ anos</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-navy-900 w-4 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(10, adults + 1))}
                          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2 mb-3">
                      <div>
                        <div className="text-xs font-bold text-navy-900">Crianças / Bebês</div>
                        <div className="text-[10px] text-slate-400">0 a 11 anos</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-navy-900 w-4 text-center">{childrenCount}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.min(6, childrenCount + 1))}
                          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowTravelersDropdown(false)}
                      className="w-full py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold hover:bg-navy-800"
                    >
                      Concluído
                    </button>
                  </div>
                )}
              </div>

              {/* Submit CTA Button */}
              <div className={`${activeTab === 'voos' ? 'md:col-span-1' : 'md:col-span-2'}`}>
                <label className="hidden md:block text-[11px] font-bold uppercase tracking-wider text-transparent mb-1 select-none">
                  Buscar
                </label>
                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-soft flex items-center justify-center gap-1.5 group cursor-pointer"
                  title="Pesquisar melhores preços"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{activeTab === 'voos' ? 'Buscar Voos' : 'Pesquisar'}</span>
                </button>
              </div>

            </form>

            {/* MULTI-PLATFORM FLIGHT COMPARISON RESULTS MATRIX */}
            {flightComparisonResults && (
              <div className="mt-6 pt-5 border-t border-slate-100 animate-fade-in">
                
                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-navy-900 flex flex-wrap items-center gap-2">
                      <span>Cotações em Tempo Real Multiplataforma</span>
                      <span className="text-[11px] font-sans font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full">
                        {isRoundTrip ? 'Ida e Volta' : 'Somente Ida'} • {adults} {adults === 1 ? 'Passageiro' : 'Passageiros'}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                      <span>Rota: <strong>{originQuery.split('(')[0]}</strong> ➔ <strong>{destinationQuery.split('(')[0]}</strong></span>
                      <span className="text-slate-300">•</span>
                      <span>Classe: <strong>{flightClass}</strong></span>
                      <span className="text-slate-300">•</span>
                      <span className={hasCheckedBaggage ? 'text-amber-800 font-semibold' : 'text-slate-600'}>
                        {hasCheckedBaggage ? '🧳 Com Mala Despachada (23kg)' : '🎒 Apenas Mala de Mão (10kg)'}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className={directOnly ? 'text-emerald-800 font-semibold' : 'text-slate-600'}>
                        {directOnly ? '✈️ Apenas Voos Diretos' : '✈️ Todos os Voos'}
                      </span>
                    </p>
                  </div>

                  <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl px-3 py-2 text-[11px] text-emerald-800 flex items-center gap-2 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Links diretos: abrem a busca com passageiros, datas e rotas já preenchidos.</span>
                  </div>
                </div>

                {/* Sub-Tabs: Todas as Ofertas / Comparadores / Companhias Aéreas */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setFlightSubTab('todas')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      flightSubTab === 'todas'
                        ? 'bg-navy-900 text-white shadow-soft'
                        : 'bg-slate-100 text-slate-600 hover:text-navy-900 hover:bg-slate-200'
                    }`}
                  >
                    Todas as Opções ({(flightComparisonResults.otas?.length || 0) + (flightComparisonResults.airlines?.length || 0)})
                  </button>

                  <button
                    type="button"
                    onClick={() => setFlightSubTab('comparadores')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      flightSubTab === 'comparadores'
                        ? 'bg-navy-900 text-white shadow-soft'
                        : 'bg-slate-100 text-slate-600 hover:text-navy-900 hover:bg-slate-200'
                    }`}
                  >
                    <span>Comparadores & Metabuscas</span>
                    <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {flightComparisonResults.otas?.length || 0}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFlightSubTab('companhias')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      flightSubTab === 'companhias'
                        ? 'bg-navy-900 text-white shadow-soft'
                        : 'bg-slate-100 text-slate-600 hover:text-navy-900 hover:bg-slate-200'
                    }`}
                  >
                    <span>Companhias Aéreas Oficiais</span>
                    <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {flightComparisonResults.airlines?.length || 0}
                    </span>
                  </button>
                </div>

                {/* 1. COMPARADORES & METABUSCAS SECTION */}
                {(flightSubTab === 'todas' || flightSubTab === 'comparadores') && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs sm:text-sm font-bold text-navy-900 flex items-center gap-1.5 uppercase tracking-wider">
                        <span>Comparadores & Plataformas Consolidadoras</span>
                        <span className="text-[11px] font-normal text-slate-500 normal-case">(Google Flights, Skyscanner, Decolar, 123 Milhas, MaxMilhas, Kayak)</span>
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {flightComparisonResults.otas?.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                            item.isBestDeal
                              ? 'bg-gradient-to-br from-emerald-50/50 to-white border-emerald-300 shadow-soft ring-1 ring-emerald-400/30'
                              : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{item.logo}</span>
                                <span className="font-bold text-sm text-navy-900">{item.name}</span>
                              </div>
                              <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                item.isBestDeal ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {item.badge}
                              </span>
                            </div>

                            <div className="mt-2 mb-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarifa Estimada Total</span>
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span className="text-lg sm:text-xl font-extrabold text-navy-900">
                                  R$ {item.totalPrice.toLocaleString('pt-BR')}
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-slate-500">
                                  (R$ {item.pricePerAdult.toLocaleString('pt-BR')} / pessoa)
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-2">
                              <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                                hasCheckedBaggage ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {hasCheckedBaggage ? '🧳 23kg inclusa no cálculo' : '🎒 Apenas Mala de Mão 10kg'}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                                directOnly ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {directOnly ? '✈️ Voo Direto' : '✈️ Direto ou Conexão'}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 mb-3 leading-snug">
                              {item.perk}
                            </p>
                          </div>

                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              item.isBestDeal
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft'
                                : 'bg-navy-900 hover:bg-navy-800 text-white'
                            }`}
                          >
                            <span>Ir para a passagem no {item.name}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. OFFICIAL AIRLINES DIRECT BOOKING SECTION */}
                {(flightSubTab === 'todas' || flightSubTab === 'companhias') && (
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                      <h4 className="text-xs sm:text-sm font-bold text-navy-900 flex items-center gap-1.5 uppercase tracking-wider">
                        <span>Companhias Aéreas Oficiais (Compre Direto na Companhia)</span>
                        <span className="text-[11px] font-normal text-slate-500 normal-case">(Sem taxas de intermediários e com milhas oficiais)</span>
                      </h4>
                      <span className="text-[10px] text-slate-400">Total: {flightComparisonResults.airlines?.length || 0} companhias mapeadas</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {flightComparisonResults.airlines?.map((airline) => (
                        <div
                          key={airline.id}
                          className="p-4 rounded-2xl border border-slate-200/80 hover:border-slate-300 bg-white hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{airline.logo}</span>
                                <div>
                                  <div className="font-bold text-sm text-navy-900 leading-tight">{airline.name}</div>
                                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    IATA: {airline.code} • {airline.country}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 shrink-0">
                                {airline.badge}
                              </span>
                            </div>

                            <div className="mt-2 mb-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Tarifa Direta da Companhia</span>
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span className="text-lg sm:text-xl font-extrabold text-navy-900">
                                  R$ {airline.totalPrice.toLocaleString('pt-BR')}
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-slate-500">
                                  (R$ {airline.pricePerAdult.toLocaleString('pt-BR')} / pessoa)
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1 mb-3 text-[11px] text-slate-600">
                              <div className="flex items-center gap-1.5 text-slate-500">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                <span className="truncate">{airline.hub}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>{airline.perk}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-500">
                                <Luggage className="w-3 h-3 text-amber-600 shrink-0" />
                                <span className="truncate">{airline.baggagePolicy}</span>
                              </div>
                            </div>
                          </div>

                          <a
                            href={airline.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-slate-900 hover:bg-slate-800 text-white shadow-2xs"
                          >
                            <span>Comprar Direto na {airline.name}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* MULTI-PLATFORM TRAVEL PACKAGES MATRIX */}
            {packageComparisonResults && activeTab === 'pacotes' && (
              <div className="mt-6 pt-5 border-t border-slate-100 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-navy-900 flex flex-wrap items-center gap-2">
                      <span>Cotações de Pacotes Completos (Voo + Hospedagem)</span>
                      <span className="text-[11px] font-sans font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full">
                        {adults} {adults === 1 ? 'Viajante' : 'Viajantes'} • {rooms} {rooms === 1 ? 'Quarto' : 'Quartos'}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Destino: <strong>{destinationQuery.split('(')[0]}</strong> • Saindo de <strong>{originQuery.split('(')[0]}</strong> • 7 Operadoras Líderes
                    </p>
                  </div>

                  <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl px-3 py-2 text-[11px] text-blue-900 flex items-center gap-2 shrink-0">
                    <Award className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Inclui aéreo ida e volta + hotel selecionado + café da manhã</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {packageComparisonResults.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                        pkg.isBestDeal
                          ? 'bg-gradient-to-br from-emerald-50/50 to-white border-emerald-300 shadow-soft ring-1 ring-emerald-400/30'
                          : pkg.isLuxury
                          ? 'bg-gradient-to-br from-amber-50/50 to-white border-amber-300 shadow-soft ring-1 ring-amber-400/30'
                          : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{pkg.logo}</span>
                            <span className="font-bold text-sm text-navy-900">{pkg.name}</span>
                          </div>
                          <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            pkg.isBestDeal 
                              ? 'bg-emerald-600 text-white' 
                              : pkg.isLuxury 
                              ? 'bg-amber-600 text-white' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {pkg.badge}
                          </span>
                        </div>

                        <div className="mt-2 mb-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Pacote Completo ({pkg.durationNights} noites)</span>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-lg sm:text-xl font-extrabold text-navy-900">
                              R$ {pkg.totalPrice.toLocaleString('pt-BR')}
                            </span>
                            <span className="text-[10px] sm:text-[11px] text-slate-500">
                              (R$ {pkg.pricePerPerson.toLocaleString('pt-BR')} / pessoa)
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1 mb-3 text-[11px] text-slate-600">
                          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                            <Check className="w-3.5 h-3.5 shrink-0" />
                            <span>Passagem Aérea Ida e Volta inclusa</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                            <Check className="w-3.5 h-3.5 shrink-0" />
                            <span>Hospedagem {pkg.isLuxury ? '5★ Resort' : '4★ Superior'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Check className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{pkg.includes}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 pt-1 leading-snug">
                            {pkg.perk}
                          </p>
                        </div>
                      </div>

                      <a
                        href={pkg.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          pkg.isBestDeal
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-soft'
                            : pkg.isLuxury
                            ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-soft'
                            : 'bg-navy-900 hover:bg-navy-800 text-white'
                        }`}
                      >
                        <span>Ver Pacote no {pkg.name}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* Standard Partner Deeplinks Bar (for other tabs) */}
            {lastSearchedDeeplinks && activeTab !== 'voos' && activeTab !== 'pacotes' && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-600">
                    Cotações diretas para <strong className="text-navy-900">{lastSearchedDeeplinks.destination}</strong>:
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={lastSearchedDeeplinks.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-100 text-xs font-semibold transition-colors"
                    >
                      <span>Booking.com</span>
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </a>

                    <a
                      href={lastSearchedDeeplinks.decolarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 text-rose-800 hover:bg-rose-100 text-xs font-semibold transition-colors"
                    >
                      <span>Decolar</span>
                      <ExternalLink className="w-3 h-3 text-rose-600" />
                    </a>

                    <a
                      href={lastSearchedDeeplinks.airbnbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-pink-50 text-pink-800 hover:bg-pink-100 text-xs font-semibold transition-colors"
                    >
                      <span>Airbnb</span>
                      <ExternalLink className="w-3 h-3 text-pink-600" />
                    </a>

                    <a
                      href={lastSearchedDeeplinks.symplaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-800 hover:bg-indigo-100 text-xs font-semibold transition-colors"
                    >
                      <span>Sympla</span>
                      <ExternalLink className="w-3 h-3 text-indigo-600" />
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
