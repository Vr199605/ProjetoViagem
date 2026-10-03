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
    'nápoles': 'NAP'
  };

  for (const [key, code] of Object.entries(map)) {
    if (lower.includes(key)) return code;
  }
  return defaultCode;
}

// Format date helper: returns YYYY-MM-DD or default future date
function ensureDate(dateStr, offsetDays = 30) {
  if (dateStr && dateStr.length === 10) return dateStr;
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

// Format date for Skyscanner: YYMMDD
function formatSkyscannerDate(dateStr, offsetDays = 30) {
  const d = ensureDate(dateStr, offsetDays);
  return d.replace(/-/g, '').slice(2);
}

// -------------------------------------------------------------
// 1. COMPARATORS & OTAs (Direct Canonical Search Results URLs)
// -------------------------------------------------------------

export function buildGoogleFlightsUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1, seatClass = 'Econômica', directOnly = false }) {
  const origCode = extractAirportCode(origin, 'GRU');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = roundTrip ? ensureDate(returnDate, 37) : '';

  let query = `Voos de ${origCode} para ${destCode} saindo ${dDate}`;
  if (roundTrip && rDate) query += ` voltando ${rDate}`;
  query += ` ${adults} adultos`;
  if (seatClass === 'Executiva') query += ' executiva';
  if (seatClass === 'Premium Economy') query += ' premium economy';
  if (directOnly) query += ' voo direto sem escalas';

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
  const rDate = ensureDate(returnDate, 37);

  if (roundTrip) {
    return `https://www.decolar.com/shop/flights/results/roundtrip/${origCode}/${destCode}/${dDate}/${rDate}/${adults}/0/0/NA/NA/NA/NA/NA?from=SB&di=1-0`;
  }
  return `https://www.decolar.com/shop/flights/results/oneway/${origCode}/${destCode}/${dDate}/${adults}/0/0/NA/NA/NA/NA/NA?from=SB&di=1-0`;
}

export function buildKayakUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1, seatClass = 'Econômica', directOnly = false }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = ensureDate(returnDate, 37);
  const cabinParam = seatClass === 'Executiva' ? '/business' : '';
  const stopsParam = directOnly ? '&fs=stops=0' : '';

  if (roundTrip) {
    return `https://www.kayak.com.br/flights/${origCode}-${destCode}/${dDate}/${rDate}/${adults}adults${cabinParam}?sort=bestflight_a${stopsParam}`;
  }
  return `https://www.kayak.com.br/flights/${origCode}-${destCode}/${dDate}/${adults}adults${cabinParam}?sort=bestflight_a${stopsParam}`;
}

export function build123MilhasUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = ensureDate(returnDate, 37);
  return `https://123milhas.com/v2/busca?de=${origCode}&para=${destCode}&ida=${dDate}&volta=${roundTrip ? rDate : ''}&adultos=${adults}&tipo=${roundTrip ? 'RT' : 'OW'}`;
}

export function buildMaxMilhasUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = ensureDate(returnDate, 37);
  return `https://www.maxmilhas.com.br/passagens-aereas/busca?origem=${origCode}&destino=${destCode}&data_ida=${dDate}&data_volta=${roundTrip ? rDate : ''}&adultos=${adults}&tipo=${roundTrip ? 'ida-e-volta' : 'somente-ida'}`;
}

// -------------------------------------------------------------
// 2. OFFICIAL AIRLINES (Direct Booking Engines for all carriers)
// -------------------------------------------------------------

export function buildAirlineUrl(airlineId, { origin, destination, departDate, returnDate, roundTrip = true, adults = 1, seatClass = 'Econômica' }) {
  const origCode = extractAirportCode(origin, 'GRU');
  const destCode = extractAirportCode(destination, 'POA');
  const dDate = ensureDate(departDate, 30);
  const rDate = ensureDate(returnDate, 37);

  const cabin = seatClass === 'Executiva' ? 'Business' : 'Economy';

  switch (airlineId) {
    case 'latam':
      return `https://www.latamairlines.com/br/pt/ofertas-voos?origin=${origCode}&destination=${destCode}&outbound=${dDate}&inbound=${roundTrip ? rDate : ''}&adt=${adults}&cabin=${cabin}&trip=${roundTrip ? 'RT' : 'OW'}`;
    case 'gol':
      return `https://b2c.voegol.com.br/compra/busca-parceiros?pv=br&tipo=${roundTrip ? 'RT' : 'OW'}&de=${origCode}&para=${destCode}&ida=${dDate}&volta=${roundTrip ? rDate : ''}&adultos=${adults}`;
    case 'azul':
      return `https://www.voeazul.com.br/br/pt/home/selecao-voo?origin1=${origCode}&destination1=${destCode}&date1=${dDate}&date2=${roundTrip ? rDate : ''}&adults=${adults}&cabinClass=${cabin}`;
    case 'voepass':
      return `https://www.voepass.com.br/empresa/site/compra-passagem?origem=${origCode}&destino=${destCode}&dataIda=${dDate}&dataVolta=${roundTrip ? rDate : ''}&passageiros=${adults}`;
    case 'tap':
      return `https://www.flytap.com/pt-br/booking/flights?origin=${origCode}&destination=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&adults=${adults}`;
    case 'airfrance':
      return `https://www.airfrance.com.br/search/advanced?origin=${origCode}&destination=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&cabin=${cabin.toUpperCase()}&paxAdults=${adults}`;
    case 'american':
      return `https://www.aa.com.br/booking/find-flights?tripType=${roundTrip ? 'roundTrip' : 'oneWay'}&originAirport=${origCode}&destinationAirport=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&adultCount=${adults}`;
    case 'united':
      return `https://www.united.com/pt/br/flight-search/book-a-flight/results/rev?f=${origCode}&t=${destCode}&d=${dDate}&r=${roundTrip ? rDate : ''}&px=${adults}&taxng=1`;
    case 'delta':
      return `https://pt.delta.com/flight-search/book-a-flight?originCity=${origCode}&destinationCity=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&paxCount=${adults}`;
    case 'emirates':
      return `https://www.emirates.com/br/portuguese/book/?departureAirport=${origCode}&arrivalAirport=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&adults=${adults}`;
    case 'qatar':
      return `https://www.qatarairways.com/pt-br/homepage.html?tripType=${roundTrip ? 'R' : 'O'}&fromStation=${origCode}&toStation=${destCode}&departing=${dDate}&returning=${roundTrip ? rDate : ''}&adults=${adults}`;
    case 'lufthansa':
      return `https://www.lufthansa.com/br/pt/flight-search?origin=${origCode}&destination=${destCode}&outboundDate=${dDate}&inboundDate=${roundTrip ? rDate : ''}&adults=${adults}`;
    case 'iberia':
      return `https://www.iberia.com/br/voos/?origin=${origCode}&destination=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&adults=${adults}`;
    case 'british':
      return `https://www.britishairways.com/travel/fx/public/pt_br?dep_airport=${origCode}&arr_airport=${destCode}&dep_date=${dDate}&ret_date=${roundTrip ? rDate : ''}&ad=${adults}`;
    case 'klm':
      return `https://www.klm.com.br/search/advanced?origin=${origCode}&destination=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&paxAdults=${adults}`;
    case 'copa':
      return `https://www.copaair.com/pt-br/reserva-de-voos/?origin=${origCode}&destination=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&adults=${adults}`;
    case 'aerolineas':
      return `https://www.aerolineas.com.ar/voos?origem=${origCode}&destino=${destCode}&dataIda=${dDate}&dataVolta=${roundTrip ? rDate : ''}&adultos=${adults}`;
    case 'swiss':
      return `https://www.swiss.com/br/pt/book?origin=${origCode}&destination=${destCode}&outboundDate=${dDate}&inboundDate=${roundTrip ? rDate : ''}&adults=${adults}`;
    case 'turkish':
      return `https://www.turkishairlines.com/pt-br/flights/booking/?from=${origCode}&to=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&adults=${adults}`;
    case 'aireuropa':
      return `https://www.aireuropa.com/br/pt/reserve-voos?origin=${origCode}&destination=${destCode}&departureDate=${dDate}&returnDate=${roundTrip ? rDate : ''}&adults=${adults}`;
    default:
      return buildGoogleFlightsUrl({ origin, destination, departDate, returnDate, roundTrip, adults, seatClass });
  }
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
  return `https://www.sympla.com.br/busca/${encodeURIComponent(clean)}`;
}

export function buildEventbriteUrl(query = 'festivais e cultura') {
  const clean = query.split('(')[0].trim();
  return `https://www.eventbrite.com/d/brazil/${encodeURIComponent(clean)}/`;
}
