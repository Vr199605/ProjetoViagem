// Realistic quotation benchmarks and partner platform data
export const QUOTATION_PLATFORMS = [
  {
    id: 'booking',
    name: 'Booking.com',
    type: 'Hospedagem & Hotéis Boutique',
    logo: '🏨',
    baseUrl: 'https://www.booking.com/searchresults.pt-br.html',
    badge: 'Confirmação Imediata',
    color: '#003580'
  },
  {
    id: 'decolar',
    name: 'Decolar.com',
    type: 'Pacotes Completos & Voos',
    logo: '✈️',
    baseUrl: 'https://www.decolar.com/pacotes/',
    badge: 'Melhor Custo-Benefício',
    color: '#E0232E'
  },
  {
    id: 'airbnb',
    name: 'Airbnb Luxe & Vilas',
    type: 'Casas & Vilas Exclusivas',
    logo: '🏡',
    baseUrl: 'https://www.airbnb.com.br/s/',
    badge: 'Privacidade & Charme',
    color: '#FF5A5F'
  },
  {
    id: 'skyscanner',
    name: 'Skyscanner',
    type: 'Metabusca de Voos Globais',
    logo: '🌐',
    baseUrl: 'https://www.skyscanner.com.br/transport/flights/',
    badge: 'Tarifas Aéreas em Tempo Real',
    color: '#0770E3'
  }
];

// Helper to calculate realistic quote tiers based on destination, days and budget profile
export function generateQuotationBreakdown({ destination, days = 5, travelers = 2, profile = 'Conforto' }) {
  const dailyBase = destination?.dailyBudget || 650;
  
  // Multipliers based on profile
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

  // Hotel estimate (per night, assuming 1 room for 2 people)
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
        partner: 'Decolar.com / Booking.com',
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
        partner: 'Booking.com / Skyscanner',
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
