// Generates partner search deeplinks with pre-filled parameters for Brasil & Global

// Extract or deduce IATA airport code from string
export function extractAirportCode(text, defaultCode = 'GRU') {
  if (!text) return defaultCode;
  const match = text.match(/\b([A-Z]{3})\b/);
  if (match) return match[1];

  const lower = text.toLowerCase();
  const map = {
    'são paulo': 'GRU',
    'sao paulo': 'GRU',
    'rio': 'GIG',
    'rio de janeiro': 'GIG',
    'brasília': 'BSB',
    'brasilia': 'BSB',
    'salvador': 'SSA',
    'fortaleza': 'FOR',
    'belo horizonte': 'CNF',
    'curitiba': 'CWB',
    'recife': 'REC',
    'porto alegre': 'POA',
    'gramado': 'POA',
    'canela': 'POA',
    'florianópolis': 'FLN',
    'florianopolis': 'FLN',
    'noronha': 'FEN',
    'fernando de noronha': 'FEN',
    'lençóis': 'SLZ',
    'lencois': 'SLZ',
    'são luís': 'SLZ',
    'natal': 'NAT',
    'maceió': 'MCZ',
    'maceio': 'MCZ',
    'foz do iguaçu': 'IGU',
    'foz': 'IGU',
    'manaus': 'MAO',
    'belém': 'BEL',
    'belem': 'BEL',
    'goiânia': 'GYN',
    'goiania': 'GYN',
    'porto seguro': 'BPS',
    'trancoso': 'BPS',
    'jericoacoara': 'JJD',
    'bonito': 'BYO',
    'jalapão': 'PMW',
    'palmas': 'PMW',
    'paris': 'CDG',
    'lisboa': 'LIS',
    'porto': 'OPO',
    'roma': 'FCO',
    'madri': 'MAD',
    'madrid': 'MAD',
    'barcelona': 'BCN',
    'londres': 'LHR',
    'amsterdã': 'AMS',
    'amsterdam': 'AMS',
    'tóquio': 'HND',
    'toquio': 'HND',
    'quioto': 'KIX',
    'kyoto': 'KIX',
    'nova york': 'JFK',
    'new york': 'JFK',
    'miami': 'MIA',
    'orlando': 'MCO',
    'buenos aires': 'EZE',
    'bariloche': 'BRC',
    'santiago': 'SCL',
    'dubai': 'DXB',
    'cancún': 'CUN',
    'cancun': 'CUN'
  };

  for (const [key, code] of Object.entries(map)) {
    if (lower.includes(key)) return code;
  }
  return defaultCode;
}

/**
 * 1. Google Flights Deeplink Generator
 */
export function buildGoogleFlightsUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1, seatClass = 'economy' }) {
  const origCode = extractAirportCode(origin, 'GRU');
  const destCode = extractAirportCode(destination, 'POA');

  // Format search query string for Google Flights
  let query = `flights from ${origCode} to ${destCode}`;
  if (departDate) query += ` on ${departDate}`;
  if (roundTrip && returnDate) query += ` through ${returnDate}`;

  return `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}`;
}

/**
 * 2. Skyscanner Deeplink Generator
 */
export function buildSkyscannerUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'sao').toLowerCase();
  const destCode = extractAirportCode(destination, 'poa').toLowerCase();

  const dDate = departDate ? departDate.replace(/-/g, '').slice(2) : '';
  const rDate = (roundTrip && returnDate) ? returnDate.replace(/-/g, '').slice(2) : '';

  if (dDate && roundTrip && rDate) {
    return `https://www.skyscanner.com.br/transport/flights/${origCode}/${destCode}/${dDate}/${rDate}/?adultsv2=${adults}`;
  } else if (dDate) {
    return `https://www.skyscanner.com.br/transport/flights/${origCode}/${destCode}/${dDate}/?adultsv2=${adults}`;
  }
  return `https://www.skyscanner.com.br/transport/flights/?query=${encodeURIComponent(destination || '')}`;
}

/**
 * 3. Decolar Voos & Pacotes Deeplink Generator
 */
export function buildDecolarUrl({ origin, destination, checkIn, checkOut, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');

  if (checkIn && checkOut && roundTrip) {
    return `https://www.decolar.com/passagens-aereas/${origCode}/${destCode}?from=${checkIn}&to=${checkOut}&adults=${adults}`;
  } else if (checkIn) {
    return `https://www.decolar.com/passagens-aereas/${origCode}/${destCode}?from=${checkIn}&adults=${adults}`;
  }
  return `https://www.decolar.com/passagens-aereas/search/${encodeURIComponent(destCode || destination)}`;
}

/**
 * 4. 123 Milhas Deeplink Generator
 */
export function build123MilhasUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const tripType = roundTrip ? 'RT' : 'OW';

  // 123Milhas search portal
  return `https://123milhas.com/v2/busca?de=${origCode}&para=${destCode}&ida=${departDate || ''}&volta=${returnDate || ''}&adultos=${adults}&tipo=${tripType}`;
}

/**
 * 5. MaxMilhas Deeplink Generator
 */
export function buildMaxMilhasUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');
  const tripParam = roundTrip ? 'ida-e-volta' : 'somente-ida';

  return `https://www.maxmilhas.com.br/passagens-aereas/busca?origem=${origCode}&destino=${destCode}&data_ida=${departDate || ''}&data_volta=${returnDate || ''}&adultos=${adults}&tipo=${tripParam}`;
}

/**
 * 6. Kayak Deeplink Generator
 */
export function buildKayakUrl({ origin, destination, departDate, returnDate, roundTrip = true, adults = 1 }) {
  const origCode = extractAirportCode(origin, 'SAO');
  const destCode = extractAirportCode(destination, 'POA');

  if (departDate && returnDate && roundTrip) {
    return `https://www.kayak.com.br/flights/${origCode}-${destCode}/${departDate}/${returnDate}/${adults}adults`;
  } else if (departDate) {
    return `https://www.kayak.com.br/flights/${origCode}-${destCode}/${departDate}/${adults}adults`;
  }
  return `https://www.kayak.com.br/flights/${origCode}-${destCode}`;
}

/**
 * 7. Booking.com Accommodations Generator
 */
export function buildBookingUrl({ destination = 'Gramado', checkIn, checkOut, adults = 2, rooms = 1 }) {
  const params = new URLSearchParams({
    ss: destination,
    group_adults: adults.toString(),
    no_rooms: rooms.toString(),
    group_children: '0'
  });

  if (checkIn) params.set('checkin', checkIn);
  if (checkOut) params.set('checkout', checkOut);

  return `https://www.booking.com/searchresults.pt-br.html?${params.toString()}`;
}

/**
 * 8. Airbnb Accommodations Generator
 */
export function buildAirbnbUrl({ destination = 'Gramado', checkIn, checkOut, adults = 2 }) {
  const params = new URLSearchParams({
    query: destination,
    adults: adults.toString()
  });
  if (checkIn) params.set('checkin', checkIn);
  if (checkOut) params.set('checkout', checkOut);

  return `https://www.airbnb.com.br/s/${encodeURIComponent(destination)}/homes?${params.toString()}`;
}

/**
 * 9. Sympla & Eventbrite Cultural Events Generator
 */
export function buildSymplaUrl(query = 'festivais') {
  return `https://www.sympla.com.br/busca/${encodeURIComponent(query)}`;
}

export function buildEventbriteUrl(query = 'festivais e cultura') {
  return `https://www.eventbrite.com/d/brazil/${encodeURIComponent(query)}/`;
}
