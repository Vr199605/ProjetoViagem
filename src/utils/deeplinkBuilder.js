// Generates partner search deeplinks with pre-filled parameters

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

export function buildSkyscannerUrl({ origin = 'SAO', destination = 'POA', checkIn, checkOut, adults = 2 }) {
  // If dates are provided, format them YYYY-MM-DD
  const departDate = checkIn ? checkIn.replace(/-/g, '').slice(2) : '';
  const returnDate = checkOut ? checkOut.replace(/-/g, '').slice(2) : '';
  
  if (departDate && returnDate) {
    return `https://www.skyscanner.com.br/transport/flights/${origin.toLowerCase()}/${destination.toLowerCase()}/${departDate}/${returnDate}/?adultsv2=${adults}`;
  }
  return `https://www.skyscanner.com.br/transport/flights/?query=${encodeURIComponent(destination)}`;
}

export function buildDecolarUrl({ destination = 'Gramado', checkIn, checkOut }) {
  const query = encodeURIComponent(destination);
  return `https://www.decolar.com/pacotes/search/${query}?from=${checkIn || ''}&to=${checkOut || ''}`;
}

export function buildAirbnbUrl({ destination = 'Gramado', checkIn, checkOut, adults = 2 }) {
  const params = new URLSearchParams({
    query: destination,
    adults: adults.toString()
  });
  if (checkIn) params.set('checkin', checkIn);
  if (checkOut) params.set('checkout', checkOut);

  return `https://www.airbnb.com.br/s/${encodeURIComponent(destination)}/homes?${params.toString()}`;
}

export function buildSymplaUrl(query = 'festivais') {
  return `https://www.sympla.com.br/busca/${encodeURIComponent(query)}`;
}

export function buildEventbriteUrl(query = 'festivais e cultura') {
  return `https://www.eventbrite.com/d/brazil/${encodeURIComponent(query)}/`;
}
