// Generates pre-filled partner & airline search deeplinks for Brasil & Global
// All URLs link directly into the active search/booking engine with pre-loaded parameters.

// Extract or deduce IATA airport code from label or city name
export function extractAirportCode(text, defaultCode = 'GRU') {
  if (!text) return defaultCode;
  
  // 1. Explicit 3-letter IATA code inside parentheses or uppercase word
  const match = text.match(/\b([A-Z]{3})\b/);
  if (match) return match[1];

  // 2. City name matching
  const lower = text.toLowerCase();
  const map = {
    'são paulo': 'GRU',
    'sao paulo': 'GRU',
    'congonhas': 'CGH',
    'guarulhos': 'GRU',
    'viracopos': 'VCP',
    'maragogi': 'MCZ',
    'porto de galinhas': 'REC',
    'alter do chão': 'STM',
    'alter do chao': 'STM',
    'santarém': 'STM',
    'santarem': 'STM',
    'ouro preto': 'CNF',
    'tiradentes': 'CNF',
    'balneário camboriú': 'NVT',
    'balneario camboriu': 'NVT',
    'navegantes': 'NVT',
    'ilhéus': 'IOS',
    'ilheus': 'IOS',
    'itacaré': 'IOS',
    'itacare': 'IOS',
    'morro de são paulo': 'SSA',
    'morro de sao paulo': 'SSA',
    'caldas novas': 'CLV',
    'rio': 'GIG',
    'rio de janeiro': 'GIG',
    'galeão': 'GIG',
    'santos dumont': 'SDU',
    'brasília': 'BSB',
    'brasilia': 'BSB',
    'salvador': 'SSA',
    'fortaleza': 'FOR',
    'belo horizonte': 'CNF',
    'confins': 'CNF',
    'curitiba': 'CWB',
    'recife': 'REC',
    'porto alegre': 'POA',
    'gramado': 'POA',
    'canela': 'POA',
    'serra gaúcha': 'POA',
    'florianópolis': 'FLN',
    'florianopolis': 'FLN',
    'vitória': 'VIX',
    'vitoria': 'VIX',
    'goiânia': 'GYN',
    'goiania': 'GYN',
    'natal': 'NAT',
    'maceió': 'MCZ',
    'maceio': 'MCZ',
    'joão pessoa': 'JPA',
    'aracaju': 'AJU',
    'teresina': 'THE',
    'são luís': 'SLZ',
    'sao luis': 'SLZ',
    'lençóis': 'SLZ',
    'lencois': 'SLZ',
    'foz do iguaçu': 'IGU',
    'foz': 'IGU',
    'manaus': 'MAO',
    'belém': 'BEL',
    'belem': 'BEL',
    'campo grande': 'CGR',
    'bonito': 'BYO',
    'cuiabá': 'CGB',
    'cuiaba': 'CGB',
    'palmas': 'PMW',
    'jalapão': 'PMW',
    'jalapao': 'PMW',
    'porto seguro': 'BPS',
    'trancoso': 'BPS',
    'jericoacoara': 'JJD',
    'jeri': 'JJD',
    'noronha': 'FEN',
    'fernando de noronha': 'FEN',
    'macapá': 'MCP',
    'boa vista': 'BVB',
    'rio branco': 'RBR',
    'porto velho': 'PVH',
    // --- GLOBAL ---
    'paris': 'CDG',
    'lisboa': 'LIS',
    'porto': 'OPO',
    'madri': 'MAD',
    'madrid': 'MAD',
    'barcelona': 'BCN',
    'roma': 'FCO',
    'milão': 'MXP',
    'londres': 'LHR',
    'amsterdã': 'AMS',
    'amsterdam': 'AMS',
    'frankfurt': 'FRA',
    'berlim': 'BER',
    'zurique': 'ZRH',
    'genebra': 'GVA',
    'istambul': 'IST',
    'tóquio': 'HND',
    'toquio': 'HND',
    'quioto': 'KIX',
    'kyoto': 'KIX',
    'osaka': 'KIX',
    'dubai': 'DXB',
    'doha': 'DOH',
    'nova york': 'JFK',
    'new york': 'JFK',
    'manhattan': 'JFK',
    'miami': 'MIA',
    'orlando': 'MCO',
    'los angeles': 'LAX',
    'chicago': 'ORD',
    'atlanta': 'ATL',
    'houston': 'IAH',
    'buenos aires': 'EZE',
    'bariloche': 'BRC',
    'mendoza': 'MDZ',
    'santiago': 'SCL',
    'lima': 'LIM',
    'bogotá': 'BOG',
    'panamá': 'PTY',
    'cancún': 'CUN',
    'cancun': 'CUN',
    'punta cana': 'PUJ',
    'amalfi': 'FCO',
    'positano': 'NAP',
    'nápoles': 'NAP',
    'santorini': 'JTR',
    'cusco': 'CUZ',
    'machu picchu': 'CUZ',
    'campos do jordão': 'GRU',
    'campos do jordao': 'GRU'
  };

  for (const [key, code] of Object.entries(map)) {
    if (lower.includes(key)) return code;
  }
  return defaultCode;
}

// Safe date helpers without timezone offset bugs
export function parseDateParts(str) {
  if (!str) return null;
  const parts = str.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return { year: parts[0], month: parts[1], day: parts[2] };
}

export function addDaysToDateStr(str, daysToAdd) {
  const p = parseDateParts(str);
  if (!p) return '';
  const d = new Date(Date.UTC(p.year, p.month - 1, p.day + daysToAdd));
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format date helper: returns YYYY-MM-DD or default future date
function ensureDate(dateStr, offsetDays = 30) {
  if (dateStr && dateStr.length === 10) return dateStr;
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return addDaysToDateStr(todayStr, offsetDays);
}

// Format date for Skyscanner: YYMMDD
function formatSkyscannerDate(dateStr, offsetDays = 30) {
  const d = ensureDate(dateStr, offsetDays);
  return d.replace(/-/g, '').slice(2);
}

// -------------------------------------------------------------
// 1. COMPARATORS & OTAs (Direct Canonical Search Results URLs)
// -------------------------------------------------------------

export function buildGoogleFlightsUrl({ 
  origin, 
  destination, 
  departDate, 
  returnDate, 
  roundTrip = true, 
  adults = 1, 
  seatClass = 'Econômica', 
  directOnly = false,
  airlineName = null 
}) {
  const origCode = extractAirportCode(origin, 'GRU');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = roundTrip ? ensureDate(returnDate, 37) : '';

  // Canonical Google Flights search grammar:
  // "Flights to {destCode} from {origCode} on {dDate} through {rDate} with {airline} nonstop"
  // For one-way: "Flights to {destCode} from {origCode} on {dDate} one way with {airline}"
  let query = `Flights to ${destCode} from ${origCode} on ${dDate}`;
  if (roundTrip && rDate) {
    query += ` through ${rDate}`;
  } else {
    query += ` one way`;
  }
  if (airlineName) {
    query += ` with ${airlineName}`;
  }
  if (directOnly) {
    query += ` nonstop`;
  }
  if (seatClass === 'Executiva') {
    query += ` business class`;
  } else if (seatClass === 'Premium Economy') {
    query += ` premium economy`;
  }

  return `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR`;
}

export function buildSkyscannerUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1, seatClass = 'Econômica', directOnly = false }) {
  const origCode = extractAirportCode(origin, 'sao').toLowerCase();
  const destCode = extractAirportCode(destination, 'poa').toLowerCase();
  const dDate = formatSkyscannerDate(departDate, 30);
  const rDate = roundTrip ? formatSkyscannerDate(returnDate, 37) : '';

  const cabinParam = seatClass === 'Executiva' ? 'business' : seatClass === 'Premium Economy' ? 'premiumeconomy' : 'economy';
  const stopsParam = directOnly ? '&stops=direct' : '';

  if (roundTrip && rDate) {
    return `https://www.skyscanner.com.br/transporte/passagens-aereas/${origCode}/${destCode}/${dDate}/${rDate}/?adultsv2=${adults}&cabinclass=${cabinParam}${stopsParam}`;
  }
  return `https://www.skyscanner.com.br/transporte/passagens-aereas/${origCode}/${destCode}/${dDate}/?adultsv2=${adults}&cabinclass=${cabinParam}${stopsParam}`;
}

export function buildDecolarUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = roundTrip ? ensureDate(returnDate, 37) : '';

  if (roundTrip && rDate) {
    return `https://www.decolar.com/shop/flights/results/roundtrip/${origCode}/${destCode}/${dDate}/${rDate}/${adults}/0/0/NA/NA/NA/NA/NA?from=SB&di=1-0`;
  }
  return `https://www.decolar.com/shop/flights/results/oneway/${origCode}/${destCode}/${dDate}/${adults}/0/0/NA/NA/NA/NA/NA?from=SB&di=1-0`;
}

export function buildKayakUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1, seatClass = 'Econômica', directOnly = false }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = roundTrip ? ensureDate(returnDate, 37) : '';
  const cabinParam = seatClass === 'Executiva' ? '/business' : '';
  const stopsParam = directOnly ? '&fs=stops=0' : '';

  if (roundTrip && rDate) {
    return `https://www.kayak.com.br/flights/${origCode}-${destCode}/${dDate}/${rDate}/${adults}adults${cabinParam}?sort=bestflight_a${stopsParam}`;
  }
  return `https://www.kayak.com.br/flights/${origCode}-${destCode}/${dDate}/${adults}adults${cabinParam}?sort=bestflight_a${stopsParam}`;
}

export function build123MilhasUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = roundTrip ? ensureDate(returnDate, 37) : '';

  if (roundTrip && rDate) {
    return `https://123milhas.com/v2/busca?de=${origCode}&para=${destCode}&ida=${dDate}&volta=${rDate}&adultos=${adults}&tipo=RT`;
  }
  return `https://123milhas.com/v2/busca?de=${origCode}&para=${destCode}&ida=${dDate}&adultos=${adults}&tipo=OW`;
}

export function buildMaxMilhasUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = roundTrip ? ensureDate(returnDate, 37) : '';

  if (roundTrip && rDate) {
    return `https://www.maxmilhas.com.br/passagens-aereas/busca?origem=${origCode}&destino=${destCode}&data_ida=${dDate}&data_volta=${rDate}&adultos=${adults}&tipo=ida-e-volta`;
  }
  return `https://www.maxmilhas.com.br/passagens-aereas/busca?origem=${origCode}&destino=${destCode}&data_ida=${dDate}&adultos=${adults}&tipo=somente-ida`;
}

// -------------------------------------------------------------
// 2. OFFICIAL AIRLINES (Direct Booking Engines for all 20 carriers)
// -------------------------------------------------------------

export const AIRLINE_SEARCH_NAMES = {
  latam: 'LATAM',
  gol: 'GOL',
  azul: 'Azul',
  voepass: 'Voepass',
  tap: 'TAP Air Portugal',
  airfrance: 'Air France',
  american: 'American Airlines',
  united: 'United',
  delta: 'Delta',
  emirates: 'Emirates',
  qatar: 'Qatar Airways',
  lufthansa: 'Lufthansa',
  iberia: 'Iberia',
  british: 'British Airways',
  klm: 'KLM',
  copa: 'Copa Airlines',
  aerolineas: 'Aerolíneas Argentinas',
  swiss: 'Swiss',
  turkish: 'Turkish Airlines',
  aireuropa: 'Air Europa'
};

export const AIRLINE_DOMAINS = {
  latam: 'latamairlines.com',
  gol: 'voegol.com.br',
  azul: 'voeazul.com.br',
  voepass: 'voepass.com.br',
  tap: 'flytap.com',
  airfrance: 'airfrance.com.br',
  american: 'aa.com.br',
  united: 'united.com',
  delta: 'delta.com',
  emirates: 'emirates.com',
  qatar: 'qatarairways.com',
  lufthansa: 'lufthansa.com',
  iberia: 'iberia.com',
  british: 'britishairways.com',
  klm: 'klm.com.br',
  copa: 'copaair.com',
  aerolineas: 'aerolineas.com.ar',
  swiss: 'swiss.com',
  turkish: 'turkishairlines.com',
  aireuropa: 'aireuropa.com'
};

/**
 * Builds direct booking engine URL for official airline website
 * preloaded with origin, destination, depart date, return date (if roundTrip),
 * adults count, seat class, and trip type (OW/RT).
 */
export function buildAirlineUrl(airlineId, { 
  origin, 
  destination, 
  departDate, 
  returnDate, 
  roundTrip = true, 
  adults = 1, 
  seatClass = 'Econômica',
  directOnly = false 
}) {
  const origCode = extractAirportCode(origin, 'GRU');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = roundTrip ? ensureDate(returnDate, 37) : '';

  switch (airlineId) {
    case 'latam': {
      const cabin = seatClass === 'Executiva' ? 'Business' : 'Economy';
      const trip = roundTrip ? 'RT' : 'OW';
      return `https://www.latamairlines.com/br/pt/ofertas-voos?origin=${origCode}&destination=${destCode}&outbound=${dDate}${roundTrip && rDate ? `&inbound=${rDate}` : ''}&adt=${adults}&chd=0&inf=0&cabin=${cabin}&trip=${trip}`;
    }
    case 'gol': {
      const tripType = roundTrip ? 'roundTrip' : 'oneWay';
      return `https://b2c.voegol.com.br/compra/busca-de-voos?from=${origCode}&to=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&adults=${adults}&tripType=${tripType}`;
    }
    case 'azul': {
      const tipoTrajeto = roundTrip ? 'IDA_VOLTA' : 'SOMENTE_IDA';
      return `https://www.voeazul.com.br/br/pt/home/selecao-voo?origem=${origCode}&destino=${destCode}&dataIda=${dDate}${roundTrip && rDate ? `&dataVolta=${rDate}` : ''}&tipoTrajeto=${tipoTrajeto}&adultos=${adults}`;
    }
    case 'voepass': {
      const tipo = roundTrip ? 'RT' : 'OW';
      return `https://www.voepass.com.br/passagens-aereas/busca?origem=${origCode}&destino=${destCode}&data_ida=${dDate}${roundTrip && rDate ? `&data_volta=${rDate}` : ''}&adultos=${adults}&tipo=${tipo}`;
    }
    case 'tap': {
      const flightType = roundTrip ? 'R' : 'O';
      return `https://www.flytap.com/pt-br/reserva/voos?origin=${origCode}&destination=${destCode}&flightType=${flightType}&depDate=${dDate}${roundTrip && rDate ? `&retDate=${rDate}` : ''}&adults=${adults}`;
    }
    case 'airfrance': {
      const cabin = seatClass === 'Executiva' ? 'BUSINESS' : 'ECONOMY';
      const tripType = roundTrip ? 'RETURN' : 'ONE_WAY';
      return `https://wwws.airfrance.com.br/search/advanced?origin=${origCode}&destination=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&passengers=${adults}&cabinClass=${cabin}&tripType=${tripType}`;
    }
    case 'american': {
      const tripType = roundTrip ? 'roundTrip' : 'oneWay';
      return `https://www.aa.com.br/booking/find-flights?tripType=${tripType}&origin=${origCode}&destination=${destCode}&departDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&adultCount=${adults}`;
    }
    case 'united': {
      const tt = roundTrip ? '1' : '2';
      return `https://www.united.com/pt/br/flight-search/book-a-flight/results/rev?f=${origCode}&t=${destCode}&d=${dDate}${roundTrip && rDate ? `&r=${rDate}` : ''}&tt=${tt}&px=${adults}&taxng=1&cpx=1`;
    }
    case 'delta': {
      const tripType = roundTrip ? 'ROUND_TRIP' : 'ONE_WAY';
      return `https://pt.delta.com/flight-search/search-results?tripType=${tripType}&origin=${origCode}&destination=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&passengerCount=${adults}`;
    }
    case 'emirates': {
      const cabin = seatClass === 'Executiva' ? 'b' : 'e';
      return `https://www.emirates.com/br/portuguese/book/?departureCity=${origCode}&arrivalCity=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&adults=${adults}&cabinClass=${cabin}`;
    }
    case 'qatar': {
      const tripType = roundTrip ? 'R' : 'O';
      return `https://www.qatarairways.com/pt-br/booking.html?widget=QR&fromStation=${origCode}&toStation=${destCode}&departing=${dDate}${roundTrip && rDate ? `&returning=${rDate}` : ''}&tripType=${tripType}&adults=${adults}`;
    }
    case 'lufthansa': {
      const tripType = roundTrip ? 'roundTrip' : 'oneWay';
      return `https://www.lufthansa.com/br/pt/pesquisa-de-voos?origin=${origCode}&destination=${destCode}&outboundDate=${dDate}${roundTrip && rDate ? `&inboundDate=${rDate}` : ''}&tripType=${tripType}&adults=${adults}`;
    }
    case 'iberia': {
      const tripType = roundTrip ? 'RT' : 'OW';
      return `https://www.iberia.com/br/voos/?market=BR&language=pt&tripType=${tripType}&origin=${origCode}&destination=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&adults=${adults}`;
    }
    case 'british': {
      const journeyType = roundTrip ? 'RT' : 'OW';
      return `https://www.britishairways.com/travel/fx/public/pt_br?eId=111011&journeyType=${journeyType}&departurePoint=${origCode}&destinationPoint=${destCode}&departDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&numAdults=${adults}`;
    }
    case 'klm': {
      const tripType = roundTrip ? 'RETURN' : 'ONE_WAY';
      return `https://www.klm.com.br/search/advanced?origin=${origCode}&destination=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&passengers=${adults}&tripType=${tripType}`;
    }
    case 'copa': {
      const tripType = roundTrip ? 'roundTrip' : 'oneWay';
      return `https://www.copaair.com/pt-br/reserva-de-voos/?origin=${origCode}&destination=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&tripType=${tripType}&adults=${adults}`;
    }
    case 'aerolineas': {
      const tripType = roundTrip ? 'roundTrip' : 'oneWay';
      return `https://www.aerolineas.com.ar/pt-br/booking?origin=${origCode}&destination=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&tripType=${tripType}&adults=${adults}`;
    }
    case 'swiss': {
      const tripType = roundTrip ? 'roundTrip' : 'oneWay';
      return `https://www.swiss.com/br/pt/book?origin=${origCode}&destination=${destCode}&outboundDate=${dDate}${roundTrip && rDate ? `&inboundDate=${rDate}` : ''}&tripType=${tripType}&adults=${adults}`;
    }
    case 'turkish': {
      const tripType = roundTrip ? 'roundTrip' : 'oneWay';
      return `https://www.turkishairlines.com/pt-br/flights/booking/?origin=${origCode}&destination=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&tripType=${tripType}&adultCount=${adults}`;
    }
    case 'aireuropa': {
      const tripType = roundTrip ? 'RT' : 'OW';
      return `https://www.aireuropa.com/br/pt/reserva-voos?from=${origCode}&to=${destCode}&departureDate=${dDate}${roundTrip && rDate ? `&returnDate=${rDate}` : ''}&tripType=${tripType}&adults=${adults}`;
    }
    default: {
      const airlineName = AIRLINE_SEARCH_NAMES[airlineId] || airlineId;
      return buildGoogleFlightsUrl({
        origin,
        destination,
        departDate,
        returnDate,
        roundTrip,
        adults,
        seatClass,
        directOnly,
        airlineName
      });
    }
  }
}

/**
 * Returns Google Flights URL specifically filtered with this airline
 */
export function buildAirlineGoogleFlightsUrl(airlineId, options) {
  const airlineName = AIRLINE_SEARCH_NAMES[airlineId] || airlineId;
  return buildGoogleFlightsUrl({
    ...options,
    airlineName
  });
}

// -------------------------------------------------------------
// 3. TRAVEL PACKAGES (Voo + Hotel + Traslado)
// -------------------------------------------------------------

export function buildPackageUrl(providerId, { origin, destination, checkIn, checkOut, adults = 2, rooms = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(checkIn, 30);
  const rDate = ensureDate(checkOut, 37);
  const cleanDest = destination ? destination.split('(')[0].trim() : 'Gramado';

  switch (providerId) {
    case 'decolar-pacotes':
      return `https://www.decolar.com/shop/packages/results/roundtrip/${origCode}/${destCode}/${dDate}/${rDate}/${rooms}/${adults}/0/0/NA/NA/NA/NA/NA?from=SB&di=1-0`;
    case 'cvc-pacotes':
      return `https://www.cvc.com.br/busca/pacotes?origem=${origCode}&destino=${destCode}&dataIda=${dDate}&dataVolta=${rDate}&adultos=${adults}&quartos=${rooms}`;
    case 'azul-viagens':
      return `https://www.azulviagens.com.br/busca-pacotes?origem=${origCode}&destino=${destCode}&ida=${dDate}&volta=${rDate}&adultos=${adults}&quartos=${rooms}`;
    case 'zarpo-resorts':
      return `https://www.zarpo.com.br/busca?destino=${encodeURIComponent(cleanDest)}&checkin=${dDate}&checkout=${rDate}&hospedes=${adults}`;
    case 'booking-pacotes':
      return `https://www.booking.com/packages/searchresults.pt-br.html?origin=${origCode}&destination=${destCode}&checkin=${dDate}&checkout=${rDate}&group_adults=${adults}&no_rooms=${rooms}`;
    case 'kayak-pacotes':
      return `https://www.kayak.com.br/packages/${origCode}-${destCode}/${dDate}/${rDate}/${adults}adults`;
    case 'submarino-pacotes':
      return `https://www.submarinoviagens.com.br/pacotes/buscar?origem=${origCode}&destino=${destCode}&ida=${dDate}&volta=${rDate}&adultos=${adults}`;
    default:
      return `https://www.decolar.com/shop/packages/results/roundtrip/${origCode}/${destCode}/${dDate}/${rDate}/${rooms}/${adults}/0/0/NA/NA/NA/NA/NA?from=SB&di=1-0`;
  }
}

// -------------------------------------------------------------
// 4. ACCOMMODATIONS & EVENTS
// -------------------------------------------------------------

export function buildBookingUrl({ destination = 'Gramado', checkIn, checkOut, adults = 2, rooms = 1 }) {
  const dDate = ensureDate(checkIn, 30);
  const rDate = ensureDate(checkOut, 37);
  const cleanDest = destination.split('(')[0].trim();

  const params = new URLSearchParams({
    ss: cleanDest,
    group_adults: adults.toString(),
    no_rooms: rooms.toString(),
    group_children: '0',
    checkin: dDate,
    checkout: rDate
  });

  return `https://www.booking.com/searchresults.pt-br.html?${params.toString()}`;
}

export function buildAirbnbUrl({ destination = 'Gramado', checkIn, checkOut, adults = 2 }) {
  const dDate = ensureDate(checkIn, 30);
  const rDate = ensureDate(checkOut, 37);
  const cleanDest = destination.split('(')[0].trim();

  const params = new URLSearchParams({
    query: cleanDest,
    adults: adults.toString(),
    checkin: dDate,
    checkout: rDate
  });

  return `https://www.airbnb.com.br/s/${encodeURIComponent(cleanDest)}/homes?${params.toString()}`;
}

export function buildSymplaUrl(query = 'festivais') {
  const clean = query.split('(')[0].trim();
  return `https://www.sympla.com.br/eventos?s=${encodeURIComponent(clean)}`;
}

export function buildEventbriteUrl(query = 'festivais e cultura') {
  const clean = query.split('(')[0].trim();
  return `https://www.eventbrite.com/d/brazil/${encodeURIComponent(clean)}/`;
}
