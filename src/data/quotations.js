// Realistic quotation benchmarks, official airlines, OTAs and travel packages
import { 
  buildGoogleFlightsUrl, 
  buildSkyscannerUrl, 
  buildDecolarUrl, 
  build123MilhasUrl, 
  buildMaxMilhasUrl, 
  buildKayakUrl,
  buildAirlineUrl,
  buildPackageUrl
} from '../utils/deeplinkBuilder';

// -------------------------------------------------------------
// 1. COMPARATORS & METASEARCH PLATFORMS
// -------------------------------------------------------------
export const QUOTATION_PLATFORMS = [
  {
    id: 'google-flights',
    name: 'Google Flights',
    type: 'Metabusca Global & Calendário',
    logo: '✈️',
    badge: 'Melhor Calendário Tarifário',
    color: '#4285F4',
    highlight: 'Rastreamento de Menor Preço'
  },
  {
    id: 'skyscanner',
    name: 'Skyscanner',
    type: 'Metabusca & Conexões',
    logo: '🌐',
    badge: 'Mais Companhias Aéreas',
    color: '#0770E3',
    highlight: 'Combinações Inteligentes'
  },
  {
    id: 'decolar',
    name: 'Decolar.com',
    type: 'Agência Online & Parcelamento',
    logo: '🎫',
    badge: 'Parcelamento até 12x',
    color: '#E0232E',
    highlight: 'Desconto com Pacotes'
  },
  {
    id: 'kayak',
    name: 'Kayak',
    type: 'Radar Tarifário Global',
    logo: '🧭',
    badge: 'Previsão de Preço',
    color: '#FF690F',
    highlight: 'Alertas de Variação de Tarifa'
  },
  {
    id: '123milhas',
    name: '123 Milhas',
    type: 'Emissão Promo & Milhas',
    logo: '🏷️',
    badge: 'Tarifas Promocionais',
    color: '#2E7D32',
    highlight: 'Banco de Tarifas Consolidadas'
  },
  {
    id: 'maxmilhas',
    name: 'MaxMilhas',
    type: 'Intermediação de Milhas',
    logo: '⭐',
    badge: 'Economia com Milhas',
    color: '#FF6F00',
    highlight: 'Emissão Combinada Ida e Volta'
  }
];

// -------------------------------------------------------------
// 2. OFFICIAL AIRLINES DIRECT DIRECTORY (Todas as Cias)
// -------------------------------------------------------------
export const OFFICIAL_AIRLINES = [
  // --- NACIONAIS (BRASIL) ---
  {
    id: 'latam',
    name: 'LATAM Airlines',
    code: 'LA / JJ',
    country: 'Brasil / América Latina',
    isDomestic: true,
    logo: '🔴',
    color: '#E8112D',
    badge: 'Maior Malha Nacional & Sul-Americana',
    hub: 'GRU / BSB / GIG',
    baggagePolicy: '10kg de mão inclusa • Despachada 23kg opcional',
    perk: 'Pontos LATAM Pass e voos diretos entre capitais'
  },
  {
    id: 'gol',
    name: 'GOL Linhas Aéreas',
    code: 'G3',
    country: 'Brasil',
    isDomestic: true,
    logo: '🟠',
    color: '#FF6600',
    badge: 'Conectividade Ágil & Smiles',
    hub: 'CGH / GIG / BSB / SSA',
    baggagePolicy: '10kg de mão inclusa • Despachada 23kg opcional',
    perk: 'Acúmulo de milhas Smiles e ponte aérea frequente'
  },
  {
    id: 'azul',
    name: 'Azul Linhas Aéreas',
    code: 'AD',
    country: 'Brasil',
    isDomestic: true,
    logo: '🔵',
    color: '#003399',
    badge: 'Maior Número de Cidades no Brasil',
    hub: 'VCP (Campinas) / CNF / REC',
    baggagePolicy: '10kg de mão inclusa • Espaço Azul disponível',
    perk: 'Wi-Fi grátis a bordo, snacks ilimitados e TV ao vivo'
  },
  {
    id: 'voepass',
    name: 'Voepass Linhas Aéreas',
    code: '2Z',
    country: 'Brasil',
    isDomestic: true,
    logo: '🟡',
    color: '#D4AF37',
    badge: 'Especialista em Rotas Regionais',
    hub: 'RAO / CGH / MAO',
    baggagePolicy: '10kg de mão inclusa em turboélices ATR',
    perk: 'Acesso a destinos ecológicos e cidades do interior'
  },
  // --- INTERNACIONAIS (AMÉRICAS, EUROPA, ORIENTE MÉDIO) ---
  {
    id: 'tap',
    name: 'TAP Air Portugal',
    code: 'TP',
    country: 'Portugal',
    isDomestic: false,
    logo: '🟢',
    color: '#008542',
    badge: 'Líder em Voos Brasil ➔ Europa',
    hub: 'LIS (Lisboa) / OPO (Porto)',
    baggagePolicy: 'Mão 10kg + Item pessoal • Stopover gratuito em Portugal',
    perk: 'Voos diretos saindo de 11 capitais brasileiras'
  },
  {
    id: 'airfrance',
    name: 'Air France',
    code: 'AF',
    country: 'França',
    isDomestic: false,
    logo: '🔷',
    color: '#002157',
    badge: 'Elegância & Conexão Paris CDG',
    hub: 'CDG (Paris Charles de Gaulle)',
    baggagePolicy: 'Mão 12kg inclusa • Champanhe cortesia a bordo',
    perk: 'Gastronomia francesa assinada por chefs estrelados'
  },
  {
    id: 'american',
    name: 'American Airlines',
    code: 'AA',
    country: 'Estados Unidos',
    isDomestic: false,
    logo: '🦅',
    color: '#0078D2',
    badge: 'Maior Conexão para os EUA',
    hub: 'MIA / JFK / DFW',
    baggagePolicy: 'Mão inclusa • Conexões para 200+ cidades americanas',
    perk: 'Voos diários diretos para Miami e Nova York'
  },
  {
    id: 'united',
    name: 'United Airlines',
    code: 'UA',
    country: 'Estados Unidos',
    isDomestic: false,
    logo: '🌐',
    color: '#002244',
    badge: 'Hubs em Houston, Chicago e Newark',
    hub: 'IAH / EWR / ORD',
    baggagePolicy: 'Mão inclusa • United Polaris em classe executiva',
    perk: 'Membro Star Alliance com milhas MileagePlus'
  },
  {
    id: 'delta',
    name: 'Delta Air Lines',
    code: 'DL',
    country: 'Estados Unidos',
    isDomestic: false,
    logo: '🔺',
    color: '#E01933',
    badge: 'Pontualidade Global & SkyMiles',
    hub: 'ATL (Atlanta) / JFK',
    baggagePolicy: 'Mão inclusa • Parceria estratégica com LATAM',
    perk: 'Suítes Delta One privativas em voos noturnos'
  },
  {
    id: 'emirates',
    name: 'Emirates',
    code: 'EK',
    country: 'Emirados Árabes Unidos',
    isDomestic: false,
    logo: '👑',
    color: '#D71921',
    badge: 'Luxo 5 Estrelas & Conexão Dubai',
    hub: 'DXB (Dubai)',
    baggagePolicy: 'Bagagem despachada inclusa na maioria das tarifas',
    perk: 'Entretenimento ice premiado e aeronaves A380'
  },
  {
    id: 'qatar',
    name: 'Qatar Airways',
    code: 'QR',
    country: 'Catar',
    isDomestic: false,
    logo: '🍷',
    color: '#5C0632',
    badge: 'Melhor Companhia Aérea do Mundo (Skytrax)',
    hub: 'DOH (Doha)',
    baggagePolicy: 'Qsuite premiada e franquia generosa de bagagem',
    perk: 'Serviço de bordo impecável e conexões para a Ásia'
  },
  {
    id: 'lufthansa',
    name: 'Lufthansa',
    code: 'LH',
    country: 'Alemanha',
    isDomestic: false,
    logo: '🦅',
    color: '#05164D',
    badge: 'Tradição & Hubs na Alemanha',
    hub: 'FRA (Frankfurt) / MUC (Munique)',
    baggagePolicy: 'Mão 8kg inclusa • Conexões para toda a Europa',
    perk: 'Conforto alemão e moderna frota Boeing 747-8 e A350'
  },
  {
    id: 'iberia',
    name: 'Iberia',
    code: 'IB',
    country: 'Espanha',
    isDomestic: false,
    logo: '🇪🇸',
    color: '#D81E05',
    badge: 'Porta de Entrada na Espanha & Madri',
    hub: 'MAD (Madrid Barajas)',
    baggagePolicy: 'Mão 10kg inclusa • Stopover Madrid',
    perk: 'Conexão mais rápida para Ilhas Baleares e Europa'
  },
  {
    id: 'british',
    name: 'British Airways',
    code: 'BA',
    country: 'Reino Unido',
    isDomestic: false,
    logo: '🇬🇧',
    color: '#075AAA',
    badge: 'Conexão Direta para Londres',
    hub: 'LHR (London Heathrow)',
    baggagePolicy: '2 volumes de mão inclusos • Club Suite',
    perk: 'Chegada direta ao aeroporto central de Londres'
  },
  {
    id: 'klm',
    name: 'KLM Royal Dutch Airlines',
    code: 'KL',
    country: 'Holanda',
    isDomestic: false,
    logo: '👑',
    color: '#00A1DE',
    badge: 'A Companhia Mais Antiga do Mundo',
    hub: 'AMS (Amsterdam Schiphol)',
    baggagePolicy: 'Mão 12kg inclusa • Casinhas de Delft colecionáveis',
    perk: 'Sustentabilidade e conexões perfeitas em Amsterdã'
  },
  {
    id: 'copa',
    name: 'Copa Airlines',
    code: 'CM',
    country: 'Panamá',
    isDomestic: false,
    logo: '🇵🇦',
    color: '#0D3182',
    badge: 'Hub das Américas para o Caribe & EUA',
    hub: 'PTY (Cidade do Panamá)',
    baggagePolicy: 'Mão 10kg • Conexão rápida sem alfândega no Panamá',
    perk: 'Melhor rota para Cancún, Punta Cana, Aruba e Flórida'
  },
  {
    id: 'aerolineas',
    name: 'Aerolíneas Argentinas',
    code: 'AR',
    country: 'Argentina',
    isDomestic: false,
    logo: '🇦🇷',
    color: '#0080C8',
    badge: 'Especialista em Buenos Aires & Bariloche',
    hub: 'AEP / EZE (Buenos Aires)',
    baggagePolicy: 'Mão inclusa • Voos diretos para estações de esqui',
    perk: 'Rotas diretas para Patagônia, Mendoza e Bariloche no inverno'
  },
  {
    id: 'swiss',
    name: 'Swiss International Air Lines',
    code: 'LX',
    country: 'Suíça',
    isDomestic: false,
    logo: '🇨🇭',
    color: '#D50000',
    badge: 'Hospitalidade Suíça & Alpes',
    hub: 'ZRH (Zurique) / GVA (Genebra)',
    baggagePolicy: 'Chocolates suíços a bordo • Mão 8kg inclusa',
    perk: 'Pontualidade de precisão e conexão nos Alpes'
  },
  {
    id: 'turkish',
    name: 'Turkish Airlines',
    code: 'TK',
    country: 'Turquia',
    isDomestic: false,
    logo: '🇹🇷',
    color: '#C8102E',
    badge: 'Voa para Mais Países que Qualquer Outra',
    hub: 'IST (Novo Aeroporto de Istambul)',
    baggagePolicy: '2 malas de 23kg na maioria dos voos transcontinentais',
    perk: 'Tour gratuito em Istambul durante conexões longas'
  },
  {
    id: 'aireuropa',
    name: 'Air Europa',
    code: 'UX',
    country: 'Espanha',
    isDomestic: false,
    logo: '✈️',
    color: '#0072CE',
    badge: 'Tarifas Competitivas para a Europa',
    hub: 'MAD (Madrid)',
    baggagePolicy: 'Frota moderna Boeing 787 Dreamliner',
    perk: 'Voos saindo de São Paulo e Salvador para a Europa'
  }
];

// -------------------------------------------------------------
// 3. TRAVEL PACKAGES PROVIDERS (Pacotes de Viagem)
// -------------------------------------------------------------
export const PACKAGE_PROVIDERS = [
  {
    id: 'decolar-pacotes',
    name: 'Decolar Pacotes',
    logo: '🎫',
    color: '#E0232E',
    badge: 'Voo + Hotel até 35% OFF',
    perk: 'Parcelamento em até 12x sem juros e desconto progressivo combinando hospedagem',
    includes: ['Voo Ida e Volta', 'Hospedagem Selecionada', 'Traslado Opcional', 'Pontos Passaporte']
  },
  {
    id: 'cvc-pacotes',
    name: 'CVC Viagens',
    logo: '🟡',
    color: '#FED100',
    badge: 'Assistência & Guia Local',
    perk: 'Maior operadora de turismo do Brasil com suporte presencial no destino e passeios inclusos',
    includes: ['Voo Ida e Volta', 'Hotel com Café da Manhã', 'Transfer Aeroporto/Hotel', 'Passeio Turístico']
  },
  {
    id: 'azul-viagens',
    name: 'Azul Viagens',
    logo: '🔵',
    color: '#003399',
    badge: 'Voos Diretos Azul + Resorts',
    perk: 'Pacotes exclusivos com voos diretos da Azul, resorts conveniados e bônus de pontos TudoAzul',
    includes: ['Voo Azul', 'Resort / Pousada Premium', 'Traslado Privativo', 'Pontos TudoAzul Turbinados']
  },
  {
    id: 'zarpo-resorts',
    name: 'Zarpo Viagens',
    logo: '💎',
    color: '#1A365D',
    badge: 'Curadoria de Luxo 5 Estrelas',
    perk: 'Seleção dos hotéis mais bem avaliados do Brasil e do mundo com tarifas negociadas exclusivas',
    includes: ['Hotel Boutique / Resort 5★', 'Regime All-Inclusive ou Meia Pensão', 'Upgrade Mediante Disp.', 'Crédito no Spa']
  },
  {
    id: 'booking-pacotes',
    name: 'Booking.com Voo + Hotel',
    logo: '🏨',
    color: '#003580',
    badge: 'Cancelamento Grátis na Hospedagem',
    perk: 'Maior inventário de hotéis do planeta com descontos do programa Genius nível 3',
    includes: ['Voo Flexível', 'Hotel Verificado Genius', 'Cancelamento sem Multa', 'Atendimento 24/7']
  },
  {
    id: 'kayak-pacotes',
    name: 'Kayak Pacotes',
    logo: '🧭',
    color: '#FF690F',
    badge: 'Metabusca de Múltiplas Agências',
    perk: 'Compara os pacotes de todas as agências do mercado em uma única tela para achar a melhor oferta',
    includes: ['Varredura de Agências', 'Combinação Voo + Hotel', 'Filtro por Avaliação', 'Garantia de Menor Preço']
  },
  {
    id: 'submarino-pacotes',
    name: 'Submarino Viagens',
    logo: '⚓',
    color: '#0086FF',
    badge: 'Cashback & Cartões Parceiros',
    perk: 'Condições especiais com cartões de crédito e promoções relâmpago de final de semana',
    includes: ['Voo Ida e Volta', 'Hospedagem Central', 'Opção Seguro Viagem', 'Pontos Santander / Esfera']
  }
];

// Helper: checks if destination is outside Brazil
export function isInternationalDestination(destination = '') {
  const lower = destination.toLowerCase();
  const globalTerms = [
    'paris', 'frança', 'lisboa', 'porto', 'portugal', 'roma', 'itália', 'madri', 'espanha',
    'barcelona', 'londres', 'inglaterra', 'amsterdã', 'holanda', 'tóquio', 'toquio', 'quioto',
    'kyoto', 'japão', 'japao', 'nova york', 'new york', 'eua', 'estados unidos', 'miami',
    'orlando', 'amalfi', 'bariloche', 'argentina', 'buenos aires', 'chile', 'santiago',
    'dubai', 'doha', 'cancún', 'cancun', 'caribe', 'panamá', 'alemanha', 'suíça', 'turquia'
  ];
  return globalTerms.some(term => lower.includes(term));
}

/**
 * Enhanced flight comparison across OTAs and Official Airlines
 * with real-time baggage calculation and non-stop flight adjustments
 */
export function calculateFlightComparison({
  origin = 'São Paulo (GRU)',
  destination = 'Gramado (POA)',
  departDate = '',
  returnDate = '',
  roundTrip = true,
  adults = 1,
  seatClass = 'Econômica',
  checkedBaggage = false,
  directOnly = false
}) {
  const isIntl = isInternationalDestination(destination);

  // Base flight price benchmark per person
  let basePrice = isIntl ? 4350 : 790;
  if (!roundTrip) {
    basePrice = Math.round(basePrice * 0.58);
  }

  // Seat class multiplier
  const classMultiplier = seatClass === 'Executiva' ? 2.85 : seatClass === 'Premium Economy' ? 1.45 : 1.0;
  let unitPrice = Math.round(basePrice * classMultiplier);

  // Non-stop flight surcharge (direct flights are typically 15-25% more premium)
  if (directOnly) {
    unitPrice = Math.round(unitPrice * 1.18);
  }

  // Checked baggage fee (23kg): R$ 140 per stretch domestic, R$ 380 international
  const baggageFeePerStretch = isIntl ? 380 : 140;
  const baggageFeeTotalPerPerson = checkedBaggage ? (roundTrip ? baggageFeePerStretch * 2 : baggageFeePerStretch) : 0;
  const unitPriceWithBaggage = unitPrice + baggageFeeTotalPerPerson;

  // 1. COMPARATORS & OTAs
  const otas = [
    {
      id: 'google-flights',
      name: 'Google Flights',
      logo: '✈️',
      badge: 'Menor Tarifa Estimada',
      isBestDeal: true,
      pricePerAdult: Math.round(unitPriceWithBaggage * 0.94),
      totalPrice: Math.round(unitPriceWithBaggage * 0.94 * adults),
      perk: 'Rastreamento oficial de preços, histórico de tarifas e calendário flexível',
      baggageIncluded: checkedBaggage,
      directOnly,
      url: buildGoogleFlightsUrl({ origin, destination, departDate, returnDate, roundTrip, adults, seatClass, directOnly })
    },
    {
      id: 'skyscanner',
      name: 'Skyscanner',
      logo: '🌐',
      badge: 'Mais Companhias Aéreas',
      pricePerAdult: Math.round(unitPriceWithBaggage * 0.96),
      totalPrice: Math.round(unitPriceWithBaggage * 0.96 * adults),
      perk: 'Varre todas as cias aéreas do mundo e combina conexões inteligentes',
      baggageIncluded: checkedBaggage,
      directOnly,
      url: buildSkyscannerUrl({ origin, destination, departDate, returnDate, roundTrip, adults, seatClass, directOnly })
    },
    {
      id: 'decolar',
      name: 'Decolar.com',
      logo: '🎫',
      badge: 'Parcelamento até 12x',
      pricePerAdult: Math.round(unitPriceWithBaggage * 1.01),
      totalPrice: Math.round(unitPriceWithBaggage * 1.01 * adults),
      perk: 'Opção de parcelamento sem juros no cartão e desconto combo com hotel',
      baggageIncluded: checkedBaggage,
      directOnly,
      url: buildDecolarUrl({ origin, destination, departDate, returnDate, roundTrip, adults })
    },
    {
      id: 'kayak',
      name: 'Kayak',
      logo: '🧭',
      badge: 'Previsão de Preço',
      pricePerAdult: Math.round(unitPriceWithBaggage * 0.98),
      totalPrice: Math.round(unitPriceWithBaggage * 0.98 * adults),
      perk: 'Alerta preditivo se a tarifa tende a subir ou baixar nos próximos dias',
      baggageIncluded: checkedBaggage,
      directOnly,
      url: buildKayakUrl({ origin, destination, departDate, returnDate, roundTrip, adults, seatClass, directOnly })
    },
    {
      id: '123milhas',
      name: '123 Milhas',
      logo: '🏷️',
      badge: 'Tarifas Promocionais',
      pricePerAdult: Math.round(unitPriceWithBaggage * 0.93),
      totalPrice: Math.round(unitPriceWithBaggage * 0.93 * adults),
      perk: 'Busca emissão com tarifas consolidadas de milhagem de bancos parceiros',
      baggageIncluded: checkedBaggage,
      directOnly,
      url: build123MilhasUrl({ origin, destination, departDate, returnDate, roundTrip, adults })
    },
    {
      id: 'maxmilhas',
      name: 'MaxMilhas',
      logo: '⭐',
      badge: 'Economia com Milhas',
      pricePerAdult: Math.round(unitPriceWithBaggage * 0.95),
      totalPrice: Math.round(unitPriceWithBaggage * 0.95 * adults),
      perk: 'Combinação inteligente de voos de ida por uma companhia e volta por outra',
      baggageIncluded: checkedBaggage,
      directOnly,
      url: buildMaxMilhasUrl({ origin, destination, departDate, returnDate, roundTrip, adults })
    }
  ];

  // 2. OFFICIAL AIRLINES (Filter according to domestic vs international destination)
  let relevantAirlines = OFFICIAL_AIRLINES;
  if (!isIntl) {
    // Domestic: Prioritize LATAM, GOL, Azul, Voepass + major carriers
    relevantAirlines = OFFICIAL_AIRLINES.filter(a => a.isDomestic || ['tap', 'aerolineas', 'copa'].includes(a.id));
  } else {
    // International: All carriers
    relevantAirlines = OFFICIAL_AIRLINES;
  }

  const airlines = relevantAirlines.map(airline => {
    // Variance spread by airline tier
    let airlineSpread = 1.0;
    if (airline.id === 'latam') airlineSpread = 0.99;
    if (airline.id === 'gol') airlineSpread = 0.98;
    if (airline.id === 'azul') airlineSpread = 1.03;
    if (airline.id === 'voepass') airlineSpread = 0.94;
    if (airline.id === 'emirates' || airline.id === 'qatar') airlineSpread = 1.15;
    if (airline.id === 'tap') airlineSpread = 1.02;
    if (airline.id === 'airfrance' || airline.id === 'lufthansa') airlineSpread = 1.08;

    const airlineUnitPrice = Math.round(unitPriceWithBaggage * airlineSpread);

    return {
      id: airline.id,
      name: airline.name,
      code: airline.code,
      country: airline.country,
      isDomestic: airline.isDomestic,
      logo: airline.logo,
      color: airline.color,
      badge: airline.badge,
      hub: airline.hub,
      baggagePolicy: checkedBaggage ? 'Mala 23kg inclusa no cálculo' : airline.baggagePolicy,
      perk: airline.perk,
      pricePerAdult: airlineUnitPrice,
      totalPrice: airlineUnitPrice * adults,
      url: buildAirlineUrl(airline.id, { origin, destination, departDate, returnDate, roundTrip, adults, seatClass, directOnly })
    };
  });

  return {
    otas,
    airlines,
    meta: {
      origin,
      destination,
      isIntl,
      roundTrip,
      adults,
      seatClass,
      checkedBaggage,
      directOnly,
      baggageFeePerPerson: baggageFeeTotalPerPerson,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  };
}

/**
 * Package comparison across Decolar, CVC, Azul Viagens, Zarpo, Booking, Kayak
 */
export function calculatePackageComparison({
  origin = 'São Paulo (GRU)',
  destination = 'Gramado',
  checkIn = '',
  checkOut = '',
  adults = 2,
  rooms = 1,
  days = 5
}) {
  const isIntl = isInternationalDestination(destination);

  // Benchmark package calculation
  const flightPart = isIntl ? 4300 : 780;
  const hotelPerNight = isIntl ? 750 : 380;
  const durationDays = days || 5;

  const basePackagePerPerson = Math.round(flightPart + (hotelPerNight * durationDays * rooms / adults));

  return PACKAGE_PROVIDERS.map((provider, index) => {
    const spreads = [0.94, 0.97, 1.02, 1.35, 1.0, 0.96, 0.98];
    const spread = spreads[index] || 1.0;
    const pricePerPerson = Math.round(basePackagePerPerson * spread);
    const totalPrice = pricePerPerson * adults;

    return {
      id: provider.id,
      name: provider.name,
      logo: provider.logo,
      color: provider.color,
      badge: provider.badge,
      perk: provider.perk,
      includes: provider.includes,
      durationNights: durationDays,
      rooms,
      adults,
      pricePerPerson,
      totalPrice,
      isBestDeal: index === 0,
      isLuxury: provider.id === 'zarpo-resorts',
      url: buildPackageUrl(provider.id, { origin, destination, checkIn, checkOut, adults, rooms })
    };
  });
}

// Helper to calculate realistic quote tiers based on destination, days and budget profile
export function generateQuotationBreakdown({ destination, days = 5, travelers = 2, profile = 'Conforto' }) {
  const dailyBase = destination?.dailyBudget || 650;
  
  const profileMultipliers = {
    'Econômico': 0.75,
    'Conforto': 1.0,
    'Luxo': 2.1,
    'Romântico': 1.35,
    'Família': 1.15,
    'Gastronômico': 1.45,
    'Ecoturismo': 1.1
  };
  
  const mult = profileMultipliers[profile] || 1.0;
  const isInternational = destination?.country !== 'Brasil';
  
  // Flight estimate
  const flightBase = isInternational ? 4200 : 850;
  const flightEconomic = Math.round(flightBase * (travelers || 2));
  const flightComfort = Math.round(flightBase * 1.3 * (travelers || 2));
  const flightLuxury = Math.round(flightBase * 2.8 * (travelers || 2));

  // Hotel estimate
  const rooms = Math.ceil(travelers / 2);
  const hotelPerNightEconomic = Math.round(dailyBase * 0.55 * mult);
  const hotelPerNightComfort = Math.round(dailyBase * 0.95 * mult);
  const hotelPerNightLuxury = Math.round(dailyBase * 2.3 * mult);

  const totalHotelEconomic = hotelPerNightEconomic * days * rooms;
  const totalHotelComfort = hotelPerNightComfort * days * rooms;
  const totalHotelLuxury = hotelPerNightLuxury * days * rooms;

  // Daily experiences & dining per person
  const dailyExpPerPerson = Math.round(dailyBase * 0.45 * mult);
  const totalExp = dailyExpPerPerson * days * travelers;

  return {
    categories: [
      {
        tier: 'Econômico Selecionado',
        description: 'Pousadas de charme bem localizadas, voos com conexão rápida e passeios em pequenos grupos.',
        partner: 'Decolar.com / 123 Milhas',
        partnerId: 'decolar',
        avgFlightPerPerson: Math.round(flightEconomic / travelers),
        hotelNight: hotelPerNightEconomic,
        totalEstimated: flightEconomic + totalHotelEconomic + Math.round(totalExp * 0.8),
        perPersonEstimated: Math.round((flightEconomic + totalHotelEconomic + Math.round(totalExp * 0.8)) / travelers),
        rating: '8.7 / 10'
      },
      {
        tier: 'Conforto & Sofisticação (Recomendado)',
        description: 'Hotéis boutique 4 estrelas com café artesanal, voos diretos e experiências gastronômicas reservadas.',
        partner: 'Booking.com / Google Flights / Skyscanner',
        partnerId: 'booking',
        isRecommended: true,
        avgFlightPerPerson: Math.round(flightComfort / travelers),
        hotelNight: hotelPerNightComfort,
        totalEstimated: flightComfort + totalHotelComfort + totalExp,
        perPersonEstimated: Math.round((flightComfort + totalHotelComfort + totalExp) / travelers),
        rating: '9.3 / 10'
      },
      {
        tier: 'Luxo & Exclusividade',
        description: 'Resorts de categoria ouro ou vilas privativas, transfers executivos VIP e menu degustação.',
        partner: 'Airbnb Luxe / Agência Concierge',
        partnerId: 'airbnb',
        avgFlightPerPerson: Math.round(flightLuxury / travelers),
        hotelNight: hotelPerNightLuxury,
        totalEstimated: flightLuxury + totalHotelLuxury + Math.round(totalExp * 2.0),
        perPersonEstimated: Math.round((flightLuxury + totalHotelLuxury + Math.round(totalExp * 2.0)) / travelers),
        rating: '9.8 / 10'
      }
    ],
    budgetItems: [
      { category: 'Aéreo / Deslocamento Principal', pct: 35, note: 'Voos de ida e volta para todos os passageiros' },
      { category: 'Hospedagem de Alto Padrão', pct: 35, note: 'Diárias selecionadas com café da manhã incluso' },
      { category: 'Alta Gastronomia & Vinhos', pct: 20, note: 'Restaurantes de curadoria, jantares e degustações' },
      { category: 'Passeios & Experiências Guiadas', pct: 10, note: 'Ingressos, transfers locais e taxas ambientais' }
    ]
  };
}

/**
 * Calculadora Detalhada de Custo Total por Pessoa
 * Desmembra o orçamento estimado nas 5 categorias essenciais:
 * 1. Aéreo
 * 2. Hospedagem
 * 3. Alimentação Diária
 * 4. Ingressos de Atrações
 * 5. Reserva para Compras / Imprevistos
 */
export function calculateDetailedCostBreakdown({
  destination,
  days = 5,
  travelers = 2,
  tier = 'conforto' // 'economico' | 'conforto' | 'luxo'
}) {
  const destName = typeof destination === 'string' ? destination : (destination?.name || 'Gramado');
  const isIntl = isInternationalDestination(destName) || (destination?.country && destination.country !== 'Brasil');
  const isThemeParkHub = destName.toLowerCase().includes('orlando') || destName.toLowerCase().includes('carrero');
  
  const validDays = Math.max(1, parseInt(days, 10) || 5);
  const validTravelers = Math.max(1, parseInt(travelers, 10) || 2);
  const rooms = Math.ceil(validTravelers / 2);

  // 1. Aéreo por Pessoa (Ida e Volta)
  let flightPerPerson = 0;
  if (!isIntl) {
    flightPerPerson = tier === 'economico' ? 680 : tier === 'luxo' ? 1950 : 890;
  } else {
    flightPerPerson = tier === 'economico' ? 3850 : tier === 'luxo' ? 11200 : 4750;
  }
  const totalFlight = flightPerPerson * validTravelers;

  // 2. Hospedagem (Diária x Quartos x Noites)
  const dailyBase = destination?.dailyBudget || (isIntl ? 1400 : 650);
  let hotelNightRate = 0;
  if (tier === 'economico') {
    hotelNightRate = Math.max(isIntl ? 550 : 220, Math.round(dailyBase * 0.45));
  } else if (tier === 'luxo') {
    hotelNightRate = Math.max(isIntl ? 2600 : 1100, Math.round(dailyBase * 2.2));
  } else {
    // Conforto
    hotelNightRate = Math.max(isIntl ? 980 : 420, Math.round(dailyBase * 0.90));
  }
  const totalHotel = hotelNightRate * validDays * rooms;
  const hotelPerPerson = Math.round(totalHotel / validTravelers);

  // 3. Alimentação Diária por Pessoa
  let foodPerDay = 0;
  if (tier === 'economico') {
    foodPerDay = isIntl ? 190 : 110;
  } else if (tier === 'luxo') {
    foodPerDay = isIntl ? 850 : 460;
  } else {
    // Conforto
    foodPerDay = isIntl ? 360 : 210;
  }
  const foodPerPerson = foodPerDay * validDays;
  const totalFood = foodPerPerson * validTravelers;

  // 4. Ingressos de Atrações & Parques por Pessoa
  let ticketsPerPerson = 0;
  if (isThemeParkHub) {
    if (tier === 'economico') ticketsPerPerson = isIntl ? 1600 : 450;
    else if (tier === 'luxo') ticketsPerPerson = isIntl ? 4500 : 1400;
    else ticketsPerPerson = isIntl ? 2400 : 750;
  } else {
    let ticketsPerDay = 0;
    if (tier === 'economico') ticketsPerDay = isIntl ? 90 : 50;
    else if (tier === 'luxo') ticketsPerDay = isIntl ? 420 : 260;
    else ticketsPerDay = isIntl ? 180 : 110;
    ticketsPerPerson = ticketsPerDay * validDays;
  }
  const totalTickets = ticketsPerPerson * validTravelers;

  // 5. Reserva para Compras / Souvenirs / Extras
  let shoppingPerPerson = 0;
  if (tier === 'economico') {
    shoppingPerPerson = isIntl ? 800 : 350;
  } else if (tier === 'luxo') {
    shoppingPerPerson = isIntl ? 5000 : 2200;
  } else {
    shoppingPerPerson = isIntl ? 1800 : 750;
  }
  const totalShopping = shoppingPerPerson * validTravelers;

  // Custo Consolidado
  const totalGroup = totalFlight + totalHotel + totalFood + totalTickets + totalShopping;
  const totalPerPerson = Math.round(totalGroup / validTravelers);
  const dailyAveragePerPerson = Math.round(totalPerPerson / validDays);

  const categories = [
    {
      id: 'aereo',
      name: 'Aéreo (Passagens)',
      icon: '✈️',
      color: '#3B82F6', // Blue
      bgClass: 'from-blue-500/15 to-blue-600/5 border-blue-500/30 text-blue-300',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
      description: 'Ida e volta para todos os passageiros nas datas selecionadas',
      costPerPerson: flightPerPerson,
      costTotal: totalFlight,
      percentage: Math.round((totalFlight / totalGroup) * 100)
    },
    {
      id: 'hospedagem',
      name: 'Hospedagem',
      icon: '🏨',
      color: '#10B981', // Emerald
      bgClass: 'from-emerald-500/15 to-emerald-600/5 border-emerald-500/30 text-emerald-300',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      description: `${rooms} ${rooms === 1 ? 'quarto' : 'quartos'} • R$ ${hotelNightRate.toLocaleString('pt-BR')}/noite para ${validDays} noites`,
      costPerPerson: hotelPerPerson,
      costTotal: totalHotel,
      percentage: Math.round((totalHotel / totalGroup) * 100)
    },
    {
      id: 'alimentacao',
      name: 'Alimentação Diária',
      icon: '🍽️',
      color: '#F59E0B', // Amber
      bgClass: 'from-amber-500/15 to-amber-600/5 border-amber-500/30 text-amber-300',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      description: `R$ ${foodPerDay.toLocaleString('pt-BR')}/dia por pessoa (café, almoço, jantar e cafés locais)`,
      costPerPerson: foodPerPerson,
      costTotal: totalFood,
      percentage: Math.round((totalFood / totalGroup) * 100)
    },
    {
      id: 'ingressos',
      name: 'Ingressos de Atrações',
      icon: '🎟️',
      color: '#8B5CF6', // Purple
      bgClass: 'from-purple-500/15 to-purple-600/5 border-purple-500/30 text-purple-300',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
      description: 'Acesso a parques, museus, passeios ecológicos e experiências culturais',
      costPerPerson: ticketsPerPerson,
      costTotal: totalTickets,
      percentage: Math.round((totalTickets / totalGroup) * 100)
    },
    {
      id: 'compras',
      name: 'Reserva para Compras & Extras',
      icon: '🛍️',
      color: '#EC4899', // Pink
      bgClass: 'from-pink-500/15 to-pink-600/5 border-pink-500/30 text-pink-300',
      tagColor: 'bg-pink-500/20 text-pink-300 border-pink-400/40',
      description: 'Souvenirs, compras em shoppings/outlets e reserva de segurança para imprevistos',
      costPerPerson: shoppingPerPerson,
      costTotal: totalShopping,
      percentage: Math.round((totalShopping / totalGroup) * 100)
    }
  ];

  return {
    destinationName: destName,
    isIntl,
    days: validDays,
    travelers: validTravelers,
    rooms,
    tier,
    categories,
    totalGroup,
    totalPerPerson,
    dailyAveragePerPerson
  };
}

