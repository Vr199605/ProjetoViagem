// Realistic quotation benchmarks and partner platform data
import { 
  buildGoogleFlightsUrl, 
  buildSkyscannerUrl, 
  buildDecolarUrl, 
  build123MilhasUrl, 
  buildMaxMilhasUrl, 
  buildKayakUrl 
} from '../utils/deeplinkBuilder';

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
    type: 'Metabusca & Todas as Cias',
    logo: '🌐',
    badge: 'Melhores Combinações',
    color: '#0770E3',
    highlight: 'Multi-companhias Aéreas'
  },
  {
    id: 'decolar',
    name: 'Decolar.com',
    type: 'Agência Online & Pacotes',
    logo: '🎫',
    badge: 'Parcelamento até 12x',
    color: '#E0232E',
    highlight: 'Voos + Hotel com Desconto'
  },
  {
    id: '123milhas',
    name: '123 Milhas',
    type: 'Emissão Promo & Milhas',
    logo: '🏷️',
    badge: 'Tarifas Flexíveis & Promo',
    color: '#2E7D32',
    highlight: 'Passagens Promocionais'
  },
  {
    id: 'maxmilhas',
    name: 'MaxMilhas',
    type: 'Intermediação de Milhas',
    logo: '⭐',
    badge: 'Economia com Milhas',
    color: '#FF6F00',
    highlight: 'Banco de Milhas Integrado'
  },
  {
    id: 'kayak',
    name: 'Kayak',
    type: 'Radar Tarifário Global',
    logo: '🧭',
    badge: 'Previsão de Preço',
    color: '#FF690F',
    highlight: 'Alertas de Variação de Tarifa'
  }
];

/**
 * Calculates comparative flight benchmarks across Google Flights, Skyscanner, Decolar, 123Milhas, MaxMilhas, Kayak
 */
export function calculateFlightComparison({
  origin = 'São Paulo (GRU)',
  destination = 'Gramado (POA)',
  departDate = '',
  returnDate = '',
  roundTrip = true,
  adults = 1,
  seatClass = 'Econômica'
}) {
  const isInternational = destination.toLowerCase().includes('paris') ||
                          destination.toLowerCase().includes('lisboa') ||
                          destination.toLowerCase().includes('roma') ||
                          destination.toLowerCase().includes('nova york') ||
                          destination.toLowerCase().includes('tóquio') ||
                          destination.toLowerCase().includes('kyoto') ||
                          destination.toLowerCase().includes('miami') ||
                          destination.toLowerCase().includes('orlando') ||
                          destination.toLowerCase().includes('amalfi') ||
                          destination.toLowerCase().includes('bariloche') ||
                          destination.toLowerCase().includes('chile') ||
                          destination.toLowerCase().includes('estados unidos') ||
                          destination.toLowerCase().includes('europa');

  // Base price per person (round trip vs one way)
  let basePrice = isInternational ? 4200 : 780;
  if (!roundTrip) {
    basePrice = Math.round(basePrice * 0.58);
  }

  // Seat class multiplier
  const classMultiplier = seatClass === 'Executiva' ? 2.8 : seatClass === 'Premium Economy' ? 1.45 : 1.0;
  const unitPrice = Math.round(basePrice * classMultiplier);

  // Flight platform benchmarks with realistic market spreads
  return [
    {
      id: 'google-flights',
      name: 'Google Flights',
      logo: '✈️',
      badge: 'Menor Tarifa Estimada',
      isBestDeal: true,
      pricePerAdult: Math.round(unitPrice * 0.94),
      totalPrice: Math.round(unitPrice * 0.94 * adults),
      perk: 'Rastreamento oficial de preços e histórico de tarifas',
      url: buildGoogleFlightsUrl({ origin, destination, departDate, returnDate, roundTrip, adults, seatClass })
    },
    {
      id: 'skyscanner',
      name: 'Skyscanner',
      logo: '🌐',
      badge: 'Mais Companhias Aéreas',
      pricePerAdult: Math.round(unitPrice * 0.96),
      totalPrice: Math.round(unitPrice * 0.96 * adults),
      perk: 'Compara conexões inteligentes e cias low-cost',
      url: buildSkyscannerUrl({ origin, destination, departDate, returnDate, roundTrip, adults })
    },
    {
      id: 'decolar',
      name: 'Decolar.com',
      logo: '🎫',
      badge: 'Melhor Parcelamento (12x)',
      pricePerAdult: Math.round(unitPrice * 1.02),
      totalPrice: Math.round(unitPrice * 1.02 * adults),
      perk: 'Opção de parcelamento sem juros e desconto com hotel',
      url: buildDecolarUrl({ origin, destination, checkIn: departDate, checkOut: returnDate, roundTrip, adults })
    },
    {
      id: '123milhas',
      name: '123 Milhas',
      logo: '🏷️',
      badge: 'Tarifas Promocionais',
      pricePerAdult: Math.round(unitPrice * 0.93),
      totalPrice: Math.round(unitPrice * 0.93 * adults),
      perk: 'Busca emissão com tarifas de milhas consolidadas',
      url: build123MilhasUrl({ origin, destination, departDate, returnDate, roundTrip, adults })
    },
    {
      id: 'maxmilhas',
      name: 'MaxMilhas',
      logo: '⭐',
      badge: 'Economia com Milhas',
      pricePerAdult: Math.round(unitPrice * 0.95),
      totalPrice: Math.round(unitPrice * 0.95 * adults),
      perk: 'Emissão combinada de voos de ida e volta',
      url: buildMaxMilhasUrl({ origin, destination, departDate, returnDate, roundTrip, adults })
    },
    {
      id: 'kayak',
      name: 'Kayak',
      logo: '🧭',
      badge: 'Radar de Preços',
      pricePerAdult: Math.round(unitPrice * 0.98),
      totalPrice: Math.round(unitPrice * 0.98 * adults),
      perk: 'Alerta se vale a pena comprar agora ou aguardar',
      url: buildKayakUrl({ origin, destination, departDate, returnDate, roundTrip, adults })
    }
  ];
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
