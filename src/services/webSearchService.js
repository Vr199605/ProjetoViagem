// Web Search Service for VOYAGER AI (Client-side live web intelligence)
// Queries public real-time sources (Wikipedia API with CORS support) and generates rich Google Web Search & Google Maps deep links

/**
 * Search Wikipedia in real-time for places, attractions, or destinations
 * @param {string} query 
 * @param {number} limit 
 * @returns {Promise<Array>}
 */
export async function searchWikipediaLive(query, limit = 5) {
  if (!query || typeof query !== 'string') return [];
  try {
    const cleanQuery = encodeURIComponent(query.trim());
    const url = `https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${cleanQuery}&srlimit=${limit}&format=json&origin=*`;
    
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!response.ok) return [];
    
    const data = await response.json();
    const items = data?.query?.search || [];

    return items.map(item => {
      // Strip HTML tags from snippet
      const cleanSnippet = item.snippet.replace(/<[^>]+>/g, '');
      return {
        title: item.title,
        snippet: cleanSnippet,
        pageId: item.pageid,
        url: `https://pt.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/\s+/g, '_'))}`,
        timestamp: item.timestamp
      };
    });
  } catch (error) {
    console.warn('Wikipedia live search error:', error.message);
    return [];
  }
}

/**
 * Generate high-precision Google Search URL for places, proposals, restaurants, etc.
 * @param {string} placeName 
 * @param {string} cityOrRegion 
 * @param {string} context 
 * @returns {string}
 */
export function buildGoogleSearchUrl(placeName, cityOrRegion = '', context = '') {
  const parts = [placeName, cityOrRegion, context].filter(Boolean);
  const q = encodeURIComponent(parts.join(' '));
  return `https://www.google.com/search?q=${q}`;
}

/**
 * Generate Google Maps search URL with exact coordinates or place name
 * @param {string} placeName 
 * @param {string} cityOrRegion 
 * @returns {string}
 */
export function buildGoogleMapsUrl(placeName, cityOrRegion = '') {
  const query = encodeURIComponent(`${placeName} ${cityOrRegion}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Generate TripAdvisor Search URL
 * @param {string} placeName 
 * @param {string} cityOrRegion 
 * @returns {string}
 */
export function buildTripadvisorSearchUrl(placeName, cityOrRegion = '') {
  const q = encodeURIComponent(`${placeName} ${cityOrRegion}`);
  return `https://www.tripadvisor.com.br/Search?q=${q}`;
}
