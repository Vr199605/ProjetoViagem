import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, Plane, Package, Ticket, Calendar, Users, 
  Search, ArrowRight, MapPin, ChevronDown, Check, ExternalLink, Sparkles 
} from 'lucide-react';
import { SEARCH_AUTOCOMPLETE } from '../data/destinations';
import { 
  buildBookingUrl, buildSkyscannerUrl, buildDecolarUrl, 
  buildAirbnbUrl, buildSymplaUrl, buildEventbriteUrl 
} from '../utils/deeplinkBuilder';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1920&q=85',
    title: 'Fernando de Noronha',
    subtitle: 'Santuário de águas anil e vida marinha pura no Atlântico Sul'
  },
  {
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1920&q=85',
    title: 'Lençóis Maranhenses',
    subtitle: 'Dunas esculpidas pelo vento e oásis de água doce cristalina'
  },
  {
    image: 'https://images.unsplash.com/photo-1548625361-16eb72f384a5?auto=format&fit=crop&w=1920&q=85',
    title: 'Gramado & Serra Gaúcha',
    subtitle: 'Clima europeu, alta gastronomia e vinhedos premiados'
  },
  {
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=85',
    title: 'Paris & Vale do Loire',
    subtitle: 'O berço da elegância, alta costura e gastronomia estrelada'
  }
];

export default function HeroSearch({ onSelectDestinationForPlan, onNotify }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('hospedagens'); // 'hospedagens', 'voos', 'pacotes', 'eventos'
  
  // Search parameters
  const [destinationQuery, setDestinationQuery] = useState('Gramado & Serra Gaúcha, RS');
  const [originQuery, setOriginQuery] = useState('São Paulo (GRU), SP');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  // Travelers modal/popover
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [rooms, setRooms] = useState(1);

  // Autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Partner deeplink modal or direct triggers
  const [lastSearchedDeeplinks, setLastSearchedDeeplinks] = useState(null);

  const autocompleteRef = useRef(null);

  // Auto slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Today's date in YYYY-MM-DD format for min-date
  const todayStr = new Date().toISOString().split('T')[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter autocomplete
  const handleDestinationInput = (e) => {
    const val = e.target.value;
    setDestinationQuery(val);
    if (val.trim().length > 0) {
      const filtered = SEARCH_AUTOCOMPLETE.filter(item => 
        item.label.toLowerCase().includes(val.toLowerCase()) ||
        item.country.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions(SEARCH_AUTOCOMPLETE.slice(0, 6));
      setShowSuggestions(true);
    }
  };

  // Date validation: Check-Out cannot be before or equal to Check-In
  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    if (checkOut && newCheckIn >= checkOut) {
      // Automatically advance check-out by 3 days
      const d = new Date(newCheckIn);
      d.setDate(d.getDate() + 3);
      setCheckOut(d.toISOString().split('T')[0]);
      onNotify?.({
        type: 'info',
        title: 'Datas ajustadas',
        message: 'A data de check-out foi atualizada automaticamente para após o check-in.'
      });
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    if (checkIn && newCheckOut <= checkIn) {
      onNotify?.({
        type: 'error',
        title: 'Data Inválida',
        message: 'A data de check-out deve ser posterior ao check-in.'
      });
      return;
    }
    setCheckOut(newCheckOut);
  };

  // Handle Search Submission & Partner Deeplink Creation
  const handleExecuteSearch = (e) => {
    e.preventDefault();

    if (!destinationQuery) {
      onNotify?.({
        type: 'error',
        title: 'Destino Obrigatório',
        message: 'Por favor, selecione ou digite um destino para pesquisar.'
      });
      return;
    }

    const cleanDest = destinationQuery.split(',')[0].trim();

    // Prepare partner links
    const bookingUrl = buildBookingUrl({ 
      destination: cleanDest, 
      checkIn, 
      checkOut, 
      adults, 
      rooms 
    });

    const skyscannerUrl = buildSkyscannerUrl({ 
      origin: 'SAO', 
      destination: cleanDest, 
      checkIn, 
      checkOut, 
      adults 
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
      skyscannerUrl,
      decolarUrl,
      airbnbUrl,
      symplaUrl,
      eventbriteUrl
    });

    onNotify?.({
      type: 'success',
      title: 'Busca Universal Pronta',
      message: `Links gerados com sucesso para ${cleanDest} com cotações em tempo real nas principais plataformas parceiras.`
    });
  };

  return (
    <div className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden pb-16">
      
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
          {/* Subtle gradient overlay for readability and luxury mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-black/30" />
        </div>
      ))}

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide 
                ? 'w-8 h-1.5 bg-emerald-400' 
                : 'w-2 h-1.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 text-center">
        
        {/* Editorial Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs uppercase tracking-widest font-semibold mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Curadoria Exclusiva & Roteiros Inteligentes</span>
        </div>

        {/* Editorial High-Impact Title */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.15] max-w-4xl mx-auto drop-shadow-md">
          Descubra o Brasil e o Mundo com inteligência e sofisticação.
        </h1>
        
        <p className="mt-4 text-base sm:text-lg text-slate-200/90 max-w-2xl mx-auto font-light leading-relaxed">
          Experiências autênticas, gastronomia de autor e itinerários dia a dia gerados sob medida com cotações imediatas em PDF.
        </p>

        {/* Floating Universal Search Box */}
        <div className="mt-10 max-w-5xl mx-auto text-left">
          <div className="glass-dropdown bg-white/95 rounded-3xl p-3 sm:p-5 shadow-modal border border-white/80">
            
            {/* Search Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 border-b border-slate-100 pb-3 mb-4 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab('hospedagens')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  activeTab === 'hospedagens'
                    ? 'bg-navy-900 text-white shadow-soft'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Hospedagens</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('voos')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  activeTab === 'voos'
                    ? 'bg-navy-900 text-white shadow-soft'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span>Voos</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('pacotes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  activeTab === 'pacotes'
                    ? 'bg-navy-900 text-white shadow-soft'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Pacotes</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('eventos')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                  activeTab === 'eventos'
                    ? 'bg-navy-900 text-white shadow-soft'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>Eventos Culturais</span>
              </button>
            </div>

            {/* Inputs Grid */}
            <form onSubmit={handleExecuteSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Destination Autocomplete (col-span-4) */}
              <div className="md:col-span-4 relative" ref={autocompleteRef}>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {activeTab === 'voos' ? 'Destino Final' : 'Para onde você deseja ir?'}
                </label>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={destinationQuery}
                    onChange={handleDestinationInput}
                    onFocus={() => {
                      setSuggestions(SEARCH_AUTOCOMPLETE.slice(0, 6));
                      setShowSuggestions(true);
                    }}
                    placeholder="Ex: Fernando de Noronha, Paris..."
                    className="w-full bg-transparent text-sm font-medium text-navy-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Autocomplete Dropdown */}
                {showSuggestions && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-modal border border-slate-200/90 py-2 z-50 max-h-64 overflow-y-auto">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                      Destinos Populares & Hubs
                    </div>
                    {suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setDestinationQuery(item.label);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                          <span className="font-medium text-navy-900">{item.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {item.airport}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Check-in & Check-out Dates (col-span-4) */}
              <div className="md:col-span-4 grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Check-in
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={handleCheckInChange}
                      className="w-full bg-transparent text-xs sm:text-sm font-medium text-navy-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Check-out
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <input
                      type="date"
                      min={checkIn || todayStr}
                      value={checkOut}
                      onChange={handleCheckOutChange}
                      className="w-full bg-transparent text-xs sm:text-sm font-medium text-navy-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Travelers Dropdown (col-span-2) */}
              <div className="md:col-span-2 relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Viajantes
                </label>
                <button
                  type="button"
                  onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 text-left transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Users className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-navy-900 truncate">
                      {adults + childrenCount} {adults + childrenCount === 1 ? 'Viajante' : 'Viajantes'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Travelers Popover */}
                {showTravelersDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-modal border border-slate-200 p-4 z-50">
                    
                    {/* Adults */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-bold text-navy-900">Adultos</div>
                        <div className="text-[10px] text-slate-400">12 anos ou mais</div>
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

                    {/* Children */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-bold text-navy-900">Crianças</div>
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

                    {/* Rooms */}
                    <div className="flex items-center justify-between py-2 mb-3">
                      <div>
                        <div className="text-xs font-bold text-navy-900">Quartos</div>
                        <div className="text-[10px] text-slate-400">Suítes / Apartamentos</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-navy-900 w-4 text-center">{rooms}</span>
                        <button
                          type="button"
                          onClick={() => setRooms(Math.min(5, rooms + 1))}
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

              {/* Submit CTA (col-span-2) */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-transparent mb-1 select-none">
                  Ação
                </label>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-soft flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Buscar</span>
                </button>
              </div>

            </form>

            {/* Generated Partner Deeplinks Bar (when search is run) */}
            {lastSearchedDeeplinks && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-600">
                    Cotações diretas para <strong className="text-navy-900">{lastSearchedDeeplinks.destination}</strong>:
                  </span>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={lastSearchedDeeplinks.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-100 text-xs font-semibold transition-colors"
                    >
                      <span>Booking.com</span>
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </a>

                    <a
                      href={lastSearchedDeeplinks.skyscannerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 text-sky-800 hover:bg-sky-100 text-xs font-semibold transition-colors"
                    >
                      <span>Skyscanner</span>
                      <ExternalLink className="w-3 h-3 text-sky-600" />
                    </a>

                    <a
                      href={lastSearchedDeeplinks.decolarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-800 hover:bg-rose-100 text-xs font-semibold transition-colors"
                    >
                      <span>Decolar</span>
                      <ExternalLink className="w-3 h-3 text-rose-600" />
                    </a>

                    <a
                      href={lastSearchedDeeplinks.airbnbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-800 hover:bg-pink-100 text-xs font-semibold transition-colors"
                    >
                      <span>Airbnb</span>
                      <ExternalLink className="w-3 h-3 text-pink-600" />
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
