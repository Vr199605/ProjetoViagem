import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, Plane, Package, Ticket, Calendar, Users, 
  Search, ArrowRight, MapPin, ChevronDown, Check, ExternalLink, 
  Sparkles, ArrowLeftRight, TrendingDown, ShieldCheck, Award
} from 'lucide-react';
import { SEARCH_AUTOCOMPLETE } from '../data/destinations';
import { calculateFlightComparison } from '../data/quotations';
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

  // Partner deeplink / flight comparison results
  const [lastSearchedDeeplinks, setLastSearchedDeeplinks] = useState(null);
  const [flightComparisonResults, setFlightComparisonResults] = useState(null);

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
        seatClass: flightClass
      });

      setFlightComparisonResults(comparison);

      onNotify?.({
        type: 'success',
        title: 'Cotação Multiplataforma Pronta',
        message: `Comparamos voos entre ${cleanOrig} e ${cleanDest} (${isRoundTrip ? 'Ida e Volta' : 'Somente Ida'}) em 6 plataformas parceiras.`
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
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    activeTab === 'pacotes'
                      ? 'bg-navy-900 text-white shadow-soft'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Pacotes</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('eventos');
                    setFlightComparisonResults(null);
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

              {/* Flight Round-Trip / Class Controls (Visible on Voos tab) */}
              {activeTab === 'voos' && (
                <div className="flex items-center justify-between sm:justify-end gap-2">
                  <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl text-[11px] sm:text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setIsRoundTrip(true)}
                      className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all ${
                        isRoundTrip ? 'bg-white text-navy-900 shadow-2xs' : 'text-slate-500 hover:text-navy-900'
                      }`}
                    >
                      Ida e Volta
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRoundTrip(false)}
                      className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all ${
                        !isRoundTrip ? 'bg-white text-navy-900 shadow-2xs' : 'text-slate-500 hover:text-navy-900'
                      }`}
                    >
                      Somente Ida
                    </button>
                  </div>

                  <select
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                    className="text-[11px] sm:text-xs font-medium text-slate-700 bg-slate-100 py-1.5 px-2 rounded-xl border-none focus:outline-none cursor-pointer"
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
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-navy-900 flex flex-wrap items-center gap-2">
                      <span>Cotações em Tempo Real</span>
                      <span className="text-[11px] font-sans font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full">
                        {isRoundTrip ? 'Ida e Volta' : 'Somente Ida'} • {adults} {adults === 1 ? 'Passageiro' : 'Passageiros'}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Rota: <strong>{originQuery.split('(')[0]}</strong> ➔ <strong>{destinationQuery.split('(')[0]}</strong> ({flightClass})
                    </p>
                  </div>

                  <span className="text-[10px] sm:text-[11px] text-slate-400">
                    Clique para abrir na plataforma desejada com trechos e datas pré-preenchidos:
                  </span>
                </div>

                {/* 6 Cards Grid: Google Flights, Skyscanner, Decolar, 123Milhas, MaxMilhas, Kayak */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {flightComparisonResults.map((item) => (
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
                        <span>Abrir cotação no {item.name}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* Standard Partner Deeplinks Bar (for other tabs) */}
            {lastSearchedDeeplinks && activeTab !== 'voos' && (
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
