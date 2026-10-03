// Client-side NLP heuristic parser for travel queries in Portuguese

export function parseTravelPrompt(text) {
  if (!text || typeof text !== 'string') {
    return null;
  }

  const clean = text.toLowerCase();

  // 1. Destination Extraction
  let destination = 'Gramado & Canela';
  if (clean.includes('noronha')) destination = 'Fernando de Noronha';
  else if (clean.includes('gramado') || clean.includes('canela')) destination = 'Gramado & Canela';
  else if (clean.includes('lençóis') || clean.includes('lencois') || clean.includes('atins')) destination = 'Lençóis Maranhenses';
  else if (clean.includes('rio') || clean.includes('ipanema') || clean.includes('copacabana')) destination = 'Rio de Janeiro';
  else if (clean.includes('salvador') || clean.includes('trancoso') || clean.includes('bahia')) destination = 'Salvador & Trancoso';
  else if (clean.includes('jalapão') || clean.includes('jalapao')) destination = 'Jalapão';
  else if (clean.includes('paris') || clean.includes('frança') || clean.includes('franca')) destination = 'Paris';
  else if (clean.includes('kyoto') || clean.includes('quioto') || clean.includes('tóquio') || clean.includes('toquio') || clean.includes('japão')) destination = 'Quioto & Tóquio';
  else if (clean.includes('lisboa') || clean.includes('porto') || clean.includes('portugal')) destination = 'Lisboa & Porto';
  else if (clean.includes('bariloche') || clean.includes('patagônia') || clean.includes('patagonia') || clean.includes('argentina')) destination = 'Bariloche & Patagônia';
  else if (clean.includes('amalfi') || clean.includes('itália') || clean.includes('italia') || clean.includes('roma') || clean.includes('capri')) destination = 'Costa Amalfitana & Capri';
  else if (clean.includes('florianópolis') || clean.includes('florianopolis') || clean.includes('floripa')) destination = 'Florianópolis & Silveira';

  // 2. Duration Extraction
  let days = 5;
  const daysMatch = clean.match(/(\d+)\s*(dias|dia|noites|noite)/);
  if (daysMatch) {
    days = parseInt(daysMatch[1], 10);
  } else if (clean.includes('uma semana') || clean.includes('1 semana')) {
    days = 7;
  } else if (clean.includes('fim de semana') || clean.includes('final de semana')) {
    days = 3;
  } else if (clean.includes('duas semanas') || clean.includes('2 semanas')) {
    days = 14;
  }
  // Clamp between 2 and 15 days
  days = Math.max(2, Math.min(days, 15));

  // 3. Month / Time of Year Extraction
  const months = ['janeiro', 'fevereiro', 'março', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  let month = 'Próxima Temporada';
  for (const m of months) {
    if (clean.includes(m)) {
      month = m.charAt(0).toUpperCase() + m.slice(1);
      break;
    }
  }
  if (clean.includes('natal') || clean.includes('reveillon') || clean.includes('ano novo')) month = 'Dezembro / Réveillon';
  if (clean.includes('carnaval')) month = 'Fevereiro / Carnaval';

  // 4. Budget Extraction
  let budget = 6000;
  // Match "r$ 6.000", "6000", "6 mil", "10k"
  const milMatch = clean.match(/(\d+[\.,]?\d*)\s*(mil|k)/);
  const directMatch = clean.match(/(?:r\$|orçamento|limite|ate|até)\s*(\d{1,3}(?:\.\d{3})*|\d+)/);
  
  if (milMatch) {
    budget = parseFloat(milMatch[1].replace(',', '.')) * 1000;
  } else if (directMatch) {
    budget = parseInt(directMatch[1].replace(/\./g, ''), 10);
  } else if (destination === 'Paris' || destination === 'Quioto & Tóquio' || destination === 'Costa Amalfitana & Capri') {
    budget = 18000;
  } else if (destination === 'Fernando de Noronha') {
    budget = 12000;
  }

  // 5. Profile & Style
  let profile = 'Conforto & Sofisticação';
  const tags = [];
  
  if (clean.includes('vinho') || clean.includes('vinícola') || clean.includes('gastronom') || clean.includes('restaurante') || clean.includes('bistrô')) {
    tags.push('Gastronomia & Vinhos');
  }
  if (clean.includes('parceira') || clean.includes('parceiro') || clean.includes('namorad') || clean.includes('esposa') || clean.includes('marido') || clean.includes('romântic') || clean.includes('romantico') || clean.includes('casal') || clean.includes('lua de mel')) {
    tags.push('Romântico');
    profile = 'Romântico & Intimista';
  }
  if (clean.includes('luxo') || clean.includes('vip') || clean.includes('5 estrelas') || clean.includes('exclusiv')) {
    profile = 'Luxo & Exclusividade';
    tags.push('Luxo');
  }
  if (clean.includes('filho') || clean.includes('criança') || clean.includes('familia') || clean.includes('família')) {
    profile = 'Família & Conforto';
    tags.push('Família');
  }
  if (clean.includes('trilha') || clean.includes('mergulho') || clean.includes('aventura') || clean.includes('natureza') || clean.includes('ecoturismo')) {
    tags.push('Ecoturismo & Aventura');
    if (!tags.includes('Romântico')) profile = 'Ecoturismo & Natureza';
  }

  if (tags.length === 0) {
    tags.push('Cultura Local', 'Passeios Cênicos');
  }

  // 6. Travelers count
  let travelers = 2;
  let travelersLabel = 'Casal (2 viajantes)';
  if (clean.includes('sozinho') || clean.includes('solo')) {
    travelers = 1;
    travelersLabel = 'Viajante Solo (1 pessoa)';
  } else if (clean.includes('família') || clean.includes('amigos') || clean.includes('4 pessoas')) {
    travelers = 4;
    travelersLabel = 'Família / Grupo (4 viajantes)';
  } else if (clean.includes('3 pessoas')) {
    travelers = 3;
    travelersLabel = 'Grupo (3 viajantes)';
  }

  // 7. Transport Preference
  let transport = 'Aéreo + Transfer Executivo';
  if (clean.includes('carro') || clean.includes('alugar') || clean.includes('roadtrip')) {
    transport = 'Aéreo + Carro Alugado (SUV)';
  } else if (clean.includes('ônibus') || clean.includes('onibus')) {
    transport = 'Transporte Rodoviário Leito';
  }

  return {
    rawPrompt: text,
    destination,
    days,
    dates: month,
    budget,
    profile,
    travelers,
    travelersLabel,
    transport,
    tags
  };
}
