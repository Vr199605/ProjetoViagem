// Intelligent Place & Question Recommendation Service for VOYAGER AI
// Capable of answering ANY question about places, proposals, romantic spots, dining, and landmarks
// across all of Brazil and the World with live web search links & Wikipedia intelligence

import { searchWikipediaLive, buildGoogleSearchUrl, buildGoogleMapsUrl } from './webSearchService.js';
import { DESTINATION_DATABASE } from './aiSuggestionEngine.js';

// CURATED PLACES KNOWLEDGE BASE FOR POPULAR QUESTIONS & DESTINATIONS
export const CURATED_PLACES_KNOWLEDGE = {
  // 1. RIO DE JANEIRO
  'rio': {
    destinationName: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    country: 'Brasil',
    airportCode: 'GIG',
    intents: {
      casamento: {
        title: 'Locais Mágicos para Pedido de Casamento no Rio de Janeiro',
        overview: 'O Rio de Janeiro é um dos cenários mais cinematográficos do mundo para um pedido de casamento. Para um momento inesquecível, selecionei locais que unem vistas deslumbrantes da Baía de Guanabara, privacidade e uma atmosfera romântica de tirar o fôlego:',
        places: [
          {
            id: 'rio-prop-1',
            name: 'Mirante Dona Marta',
            neighborhood: 'Santa Teresa / Cosme Velho',
            category: 'Mirante Panorâmico & Pôr do Sol',
            icon: '🌅',
            whyIdeal: 'Oferece a vista mais espetacular e aberta do Pão de Açúcar, Cristo Redentor e Enseada de Botafogo a 360 metros de altitude. Muito menos concorrido que o Corcovado, garante um momento íntimo sob a luz dourada do nascer ou pôr do sol.',
            goldenTip: 'Chegue cerca de 40 minutos antes do nascer do sol ou no final da tarde. Contrate um fotógrafo local disfarçado de turista para registrar a reação de surpresa dela no momento exato do anel.',
            searchQuery: 'pedido de casamento Mirante Dona Marta Rio de Janeiro',
            mapsQuery: 'Mirante Dona Marta Rio de Janeiro'
          },
          {
            id: 'rio-prop-2',
            name: 'Restaurante Aprazível',
            neighborhood: 'Santa Teresa',
            category: 'Alta Gastronomia & Clima de Conto de Fadas',
            icon: '🍷',
            whyIdeal: 'Famoso pelas mesas privativas erguidas em palafitas de madeira na copa das árvores ("mesas nas árvores"), iluminação acolhedora à luz de velas e vista panorâmica iluminada para a Baía de Guanabara.',
            goldenTip: 'Faça a reserva com pelo menos 2 a 3 semanas de antecedência solicitando a mesa mais alta na copa da árvore. Avise previamente o sommelier para servir champanhe assim que você fizer o pedido.',
            searchQuery: 'pedido de casamento Restaurante Aprazivel Santa Teresa Rio de Janeiro',
            mapsQuery: 'Restaurante Aprazivel Santa Teresa Rio de Janeiro'
          },
          {
            id: 'rio-prop-3',
            name: 'Parque da Cidade (Niterói / Mirante de São Francisco)',
            neighborhood: 'São Francisco, Niterói (acesso fácil pelo Rio)',
            category: 'O Pôr do Sol Mais Lindo da Baía',
            icon: '✨',
            whyIdeal: 'Fica exatamente de frente para as silhuetas do Pão de Açúcar, Morro Dois Irmãos e Cristo Redentor. Quando o sol se põe atrás das montanhas do Rio, o céu fica em tons de rosa e violeta, criando um cenário de filme.',
            goldenTip: 'A rampa de voo livre de madeira no topo oferece o enquadramento perfeito. Leve uma toalha charmosa e faça um piquenique com espumante antes de se ajoelhar.',
            searchQuery: 'pedido de casamento Parque da Cidade Niteroi vista Rio de Janeiro',
            mapsQuery: 'Parque da Cidade Niteroi RJ'
          },
          {
            id: 'rio-prop-4',
            name: 'Pista Cláudio Coutinho & Praia Vermelha',
            neighborhood: 'Urca',
            category: 'Natureza Preservada & Mar Calmo',
            icon: '🌊',
            whyIdeal: 'Localizada no pé do Pão de Açúcar, a Pista Cláudio Coutinho contorna o mar aberto com vegetação densa da Mata Atlântica e paredões de pedra imponentes. O clima bucólico e calmo da Urca traz paz e exclusividade.',
            goldenTip: 'Caminhe até o primeiro mirante sobre as rochas da enseada. O som das ondas quebrando nas pedras cria uma trilha sonora natural e emocionante.',
            searchQuery: 'pedido de casamento Pista Claudio Coutinho Praia Vermelha Urca Rio',
            mapsQuery: 'Pista Claudio Coutinho Urca Rio de Janeiro'
          },
          {
            id: 'rio-prop-5',
            name: 'Rooftop do Hotel Fasano ou Hotel Fairmont',
            neighborhood: 'Ipanema / Copacabana',
            category: 'Luxo 5★ & Sunset Lounge',
            icon: '🥂',
            whyIdeal: 'Para quem prefere um pedido sofisticado com alta coquetelaria, serviço impecável e uma piscina de borda infinita debruçada sobre o mar do Arpoador ou a curva de Copacabana.',
            goldenTip: 'Agende uma mesa na ponta do deck no fim da tarde. O hotel pode providenciar arranjos de flores, velas personalizadas e uma garrafa de Veuve Clicquot reservada.',
            searchQuery: 'pedido de casamento rooftop Hotel Fasano Fairmont Rio de Janeiro',
            mapsQuery: 'Hotel Fasano Rio de Janeiro Ipanema'
          },
          {
            id: 'rio-prop-6',
            name: 'Palacete do Parque Lage',
            neighborhood: 'Jardim Botânico',
            category: 'Arquitetura Histórica & Conto de Fadas',
            icon: '🏰',
            whyIdeal: 'Um casarão neoclássico do início do século XX com uma piscina central refletindo a montanha do Corcovado e a imagem do Cristo Redentor bem acima. O pátio de arcadas italianas é pura poesia.',
            goldenTip: 'Opte pelas primeiras horas da manhã (às 9h), quando os portões abrem e o pátio ainda está vazio e sereno. A luz suave da manhã entre as arcadas garante memórias eternas.',
            searchQuery: 'pedido de casamento Parque Lage Jardim Botanico Rio de Janeiro',
            mapsQuery: 'Parque Lage Jardim Botanico Rio de Janeiro'
          }
        ]
      },
      gastronomia: {
        title: 'Melhores Restaurantes & Experiências Gastronômicas no Rio de Janeiro',
        overview: 'A gastronomia carioca vai de botecos históricos e rodas de samba a restaurantes estrelados com vistas majestosas da orla e da montanha:',
        places: [
          {
            id: 'rio-gast-1',
            name: 'Restaurante Oteque (2 Estrelas Michelin)',
            neighborhood: 'Botafogo',
            category: 'Alta Gastronomia & Frutos do Mar',
            icon: '⭐',
            whyIdeal: 'Comandado pelo chef Alberto Landgraf, é referência mundial em peixes frescos sustentáveis, vegetais orgânicos e harmonização impecável de vinhos.',
            goldenTip: 'Reserve o menu degustação com pelo menos 30 dias de antecedência no balcão da cozinha aberta.',
            searchQuery: 'Restaurante Oteque Michelin Botafogo Rio de Janeiro',
            mapsQuery: 'Restaurante Oteque Botafogo Rio de Janeiro'
          },
          {
            id: 'rio-gast-2',
            name: 'Confeitaria Colombo no Forte de Copacabana',
            neighborhood: 'Copacabana',
            category: 'Café Histórico & Brisa Marítima',
            icon: '☕',
            whyIdeal: 'Desfrutar de um brunch colonial servido em louças finas bem na beirada da mureta do Forte, contemplando toda a praia de Copacabana até o Leme.',
            goldenTip: 'Chegue por volta das 9h30 para pegar uma das mesas rentes à mureta antes de formar fila.',
            searchQuery: 'Confeitaria Colombo Forte de Copacabana cafe da manha',
            mapsQuery: 'Confeitaria Colombo Forte de Copacabana'
          },
          {
            id: 'rio-gast-3',
            name: 'Bar Urca & Mureta da Urca',
            neighborhood: 'Urca',
            category: 'Tradição Carioca & Pôr do Sol',
            icon: '🍺',
            whyIdeal: 'O programa mais clássico da cidade: comprar pastéis de camarão quentinhos e uma cerveja artesanal para sentar na mureta de pedra com vista para a Enseada de Botafogo.',
            goldenTip: 'Peça os pastéis de siri e queijo coalho e chegue às 17h para ver as luzes dos barcos acenderem.',
            searchQuery: 'Bar Urca mureta pasteis por do sol',
            mapsQuery: 'Bar Urca Rio de Janeiro'
          },
          {
            id: 'rio-gast-4',
            name: 'Marius Degustare',
            neighborhood: 'Leme',
            category: 'Carnes Nobres & Frutos do Mar',
            icon: '🦞',
            whyIdeal: 'Decoração temática impressionante que lembra um navio pirata com conchas e artefatos marítimos, acompanhada por um rodízio lendário de lagosta, cavaquinha e cortes nobres.',
            goldenTip: 'Vá com calma para aproveitar a adega climatizada premiada e o buffet de ostras frescas.',
            searchQuery: 'Restaurante Marius Degustare Leme Rio de Janeiro',
            mapsQuery: 'Marius Degustare Leme Rio de Janeiro'
          }
        ]
      }
    }
  },

  // 2. GRAMADO & CANELA
  'gramado': {
    destinationName: 'Gramado & Canela',
    state: 'Rio Grande do Sul',
    country: 'Brasil',
    airportCode: 'POA',
    intents: {
      casamento: {
        title: 'Locais Românticos para Pedido de Casamento em Gramado e Canela',
        overview: 'Gramado e Canela são o destino mais acolhedor do Brasil para casais, combinando arquitetura alpina, lareiras acesas, vinhedos e cenários bucólicos de serra:',
        places: [
          {
            id: 'gra-prop-1',
            name: 'Lago Negro ao Amanhecer',
            neighborhood: 'Gramado',
            category: 'Natureza & Pinheiros da Floresta Negra',
            icon: '🌲',
            whyIdeal: 'Águas escuras e serenas ladeadas por pinheiros trazidos da Floresta Negra da Alemanha e azaléias coloridas. O passeio de pedalinho de cisne no lago vazio é um clássico romântico.',
            goldenTip: 'Faça o pedido nas margens arborizadas perto da pontezinha rústica ou alugue um pedalinho privativo bem no meio do lago.',
            searchQuery: 'pedido de casamento Lago Negro Gramado',
            mapsQuery: 'Lago Negro Gramado RS'
          },
          {
            id: 'gra-prop-2',
            name: 'Castelo Saint Andrews (Relais & Châteaux)',
            neighborhood: 'Vale do Quilombo, Gramado',
            category: 'Luxo 6★ & Exclusividade Total',
            icon: '🏰',
            whyIdeal: 'O único hotel Relais & Châteaux do Brasil. Com arquitetura inspirada nos castelos escoceses, jardins europeus impecáveis e uma vista panorâmica para o Vale do Quilombo.',
            goldenTip: 'Reserve um jantar no jardim de inverno com menu degustação harmonizado e solicite violino ao vivo no momento da aliança.',
            searchQuery: 'pedido de casamento Castelo Saint Andrews Gramado',
            mapsQuery: 'Castelo Saint Andrews Gramado'
          },
          {
            id: 'gra-prop-3',
            name: 'Mirante do Vale do Quilombo',
            neighborhood: 'Gramado',
            category: 'Mirante Panorâmico & Névoa da Serra',
            icon: '🌄',
            whyIdeal: 'Uma vista monumental com 850 metros de altitude sobre montanhas cobertas por araucárias, frequentemente envoltas pela névoa mística da serra.',
            goldenTip: 'O pôr do sol no mirante na estrada que liga Gramado a Canela oferece uma luz alaranjada espetacular.',
            searchQuery: 'pedido de casamento Vale do Quilombo Gramado',
            mapsQuery: 'Mirante Vale do Quilombo Gramado'
          },
          {
            id: 'gra-prop-4',
            name: 'Passeio Privativo de Maria Fumaça & Vinícola no Vale dos Vinhedos',
            neighborhood: 'Bento Gonçalves / Vale dos Vinhedos',
            category: 'Tradição & Brinde com Espumante',
            icon: '🍷',
            whyIdeal: 'Um passeio romântico pelo trem a vapor histórico seguido por visita guiada a caves subterrâneas de vinícolas como Miolo ou Casa Valduga.',
            goldenTip: 'Agende uma degustação às cegas exclusiva na cave de barricas de carvalho e surpreenda sua parceira entre os tonéis de vinho.',
            searchQuery: 'pedido de casamento Vale dos Vinhedos vinicola Casa Valduga',
            mapsQuery: 'Casa Valduga Vale dos Vinhedos'
          }
        ]
      }
    }
  },

  // 3. FERNANDO DE NORONHA
  'noronha': {
    destinationName: 'Fernando de Noronha',
    state: 'Pernambuco',
    country: 'Brasil',
    airportCode: 'FEN',
    intents: {
      casamento: {
        title: 'Cenários Paradisíacos para Pedido de Casamento em Fernando de Noronha',
        overview: 'Noronha é o santuário marinho mais exclusivo do país. Suas águas turquesa, falésias vulcânicas e vida marinha pura transformam qualquer pedido em um momento inigualável:',
        places: [
          {
            id: 'nor-prop-1',
            name: 'Mirante da Baía dos Porcos & Morro Dois Irmãos',
            neighborhood: 'Fernando de Noronha',
            category: 'Cartão Postal dos Sonhos',
            icon: '🏝️',
            whyIdeal: 'A vista icônica dos Dois Irmãos refletidos nas águas verde-esmeralda da Baía dos Porcos. O visual é simplesmente o mais deslumbrante do litoral brasileiro.',
            goldenTip: 'Vá na maré baixa para ter acesso fácil às piscinas naturais entre as pedras. O final da tarde proporciona sombras longas e luz dourada espetacular.',
            searchQuery: 'pedido de casamento Baia dos Porcos Morro Dois Irmãos Noronha',
            mapsQuery: 'Mirante da Baia dos Porcos Fernando de Noronha'
          },
          {
            id: 'nor-prop-2',
            name: 'Passeio de Barco Privativo ao Entardecer',
            neighborhood: 'Porto de Santo Antônio',
            category: 'Navegação Exclusiva & Golfinhos',
            icon: '⛵',
            whyIdeal: 'Alugar uma lancha ou catamarã privativo para navegar ao lado de golfinhos rotadores enquanto o sol se põe atrás das formações rochosas.',
            goldenTip: 'Combine com a tripulação uma tábua de peixes grelhados frescos na folha de bananeira e abra o espumante com a proa voltada para os Dois Irmãos.',
            searchQuery: 'pedido de casamento barco privativo por do sol Fernando de Noronha',
            mapsQuery: 'Porto de Santo Antonio Fernando de Noronha'
          },
          {
            id: 'nor-prop-3',
            name: 'Mirante do Boldró ao Som de Saxofone',
            neighborhood: 'Praia do Boldró',
            category: 'Sunset Tradicional & Pôr do Sol',
            icon: '🎷',
            whyIdeal: 'O ponto de encontro mais mágico da ilha para saudar o pôr do sol sobre as ruínas do antigo forte militar.',
            goldenTip: 'Caminhe alguns metros além das ruínas para um ponto mais reservado na encosta onde vocês terão privacidade total.',
            searchQuery: 'pedido de casamento Mirante do Boldro Noronha',
            mapsQuery: 'Forte de Sao Pedro do Boldro Noronha'
          }
        ]
      }
    }
  },

  // 4. PARIS
  'paris': {
    destinationName: 'Paris',
    state: 'Île-de-France',
    country: 'França',
    airportCode: 'CDG',
    intents: {
      casamento: {
        title: 'Locais Mágicos e Românticos para Pedido de Casamento em Paris',
        overview: 'A Cidade Luz é o berço do romantismo mundial. Para fugir dos locais com excesso de turistas e viver um conto de fadas íntimo, aqui estão os recantos mais apaixonantes:',
        places: [
          {
            id: 'par-prop-1',
            name: 'Pont de Bir-Hakeim com Vista para a Torre Eiffel',
            neighborhood: '15º e 16º Arrondissement',
            category: 'Arquitetura Monumental & Ícone Mundial',
            icon: '🗼',
            whyIdeal: 'Ponte de ferro e arcos com vista desimpedida para a Torre Eiffel e o Rio Sena, imortalizada no cinema e muito mais elegante que o Champ de Mars.',
            goldenTip: 'Programe o pedido para os primeiros 5 minutos de uma hora cheia à noite, quando as 20.000 lâmpadas da Torre Eiffel começam a piscar douradas.',
            searchQuery: 'pedido de casamento Pont de Bir Hakeim Torre Eiffel Paris',
            mapsQuery: 'Pont de Bir-Hakeim Paris'
          },
          {
            id: 'par-prop-2',
            name: 'Barco Privativo pelo Rio Sena ao Entardecer',
            neighborhood: 'Rio Sena, Paris',
            category: 'Exclusividade & Charme Fluvial',
            icon: '🛥️',
            whyIdeal: 'Navegar sob as pontes históricas (Pont Neuf, Pont Alexandre III) enquanto o sol doura os palácios e a Catedral de Notre-Dame.',
            goldenTip: 'Alugue um barco vintage de madeira com capitão privativo para ter champanhe francês e privacidade absoluta.',
            searchQuery: 'pedido de casamento barco privativo Rio Sena Paris',
            mapsQuery: 'Pont Alexandre III Paris'
          },
          {
            id: 'par-prop-3',
            name: 'Place Dauphine & Pont Neuf',
            neighborhood: 'Île de la Cité',
            category: 'Praça Histórica & Café Parisiense',
            icon: '🍂',
            whyIdeal: 'Uma praça triangular escondida atrás do Pont Neuf, cercada por árvores e bistrôs charmosos. É um oásis de tranquilidade no coração da capital.',
            goldenTip: 'Aproveite a luz suave do outono ou primavera no centro da praça sob as árvores antes de jantar no Restaurant Paul.',
            searchQuery: 'pedido de casamento Place Dauphine Ile de la Cite Paris',
            mapsQuery: 'Place Dauphine Paris'
          }
        ]
      }
    }
  }
};

/**
 * Intelligent Query Classifier & Location/Intent Detector
 * @param {string} prompt 
 * @returns {Object}
 */
export function analyzeUserQuery(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return { isQuestion: false, destinationKey: 'rio', intent: 'geral', raw: '' };
  }

  const clean = prompt.toLowerCase();

  // 1. Detect if it's a question or a general prompt
  const isQuestion = 
    clean.includes('?') ||
    clean.includes('quais') ||
    clean.includes('qual') ||
    clean.includes('onde') ||
    clean.includes('como') ||
    clean.includes('o que') ||
    clean.includes('sugere') ||
    clean.includes('sugest') ||
    clean.includes('lugares') ||
    clean.includes('dicas') ||
    clean.includes('recomenda') ||
    clean.includes('restaurante') ||
    clean.includes('casamento') ||
    clean.includes('pedir em casamento');

  // 2. Detect Intent
  let intent = 'geral';
  if (clean.includes('casamento') || clean.includes('pedir') || clean.includes('noivado') || clean.includes('namorada') || clean.includes('romântic') || clean.includes('romantico') || clean.includes('lua de mel')) {
    intent = 'casamento';
  } else if (clean.includes('restaurante') || clean.includes('jantar') || clean.includes('almoço') || clean.includes('comer') || clean.includes('gastronom') || clean.includes('bistrô')) {
    intent = 'gastronomia';
  } else if (clean.includes('pôr do sol') || clean.includes('por do sol') || clean.includes('sunset') || clean.includes('mirante') || clean.includes('vista')) {
    intent = 'mirantes';
  } else if (clean.includes('praia') || clean.includes('mar') || clean.includes('mergulho') || clean.includes('piscinas naturais')) {
    intent = 'praias';
  } else if (clean.includes('criança') || clean.includes('filho') || clean.includes('família') || clean.includes('parque')) {
    intent = 'familia';
  }

  // 3. Detect Destination
  let destinationKey = null;
  let detectedCity = 'Rio de Janeiro';

  if (clean.includes('rio de janeiro') || clean.includes(' rio ') || clean.includes('rio,') || clean.includes('copacabana') || clean.includes('ipanema') || clean.includes('corcovado') || clean.includes('pão de açúcar') || clean.includes('pao de acucar') || clean.includes('urca')) {
    destinationKey = 'rio';
    detectedCity = 'Rio de Janeiro';
  } else if (clean.includes('gramado') || clean.includes('canela') || clean.includes('serra gaúcha') || clean.includes('serra gaucha')) {
    destinationKey = 'gramado';
    detectedCity = 'Gramado & Canela';
  } else if (clean.includes('noronha') || clean.includes('fernando de noronha')) {
    destinationKey = 'noronha';
    detectedCity = 'Fernando de Noronha';
  } else if (clean.includes('maragogi') || clean.includes('alagoas') || clean.includes('costa dos corais')) {
    destinationKey = 'maragogi';
    detectedCity = 'Maragogi';
  } else if (clean.includes('paris') || clean.includes('frança') || clean.includes('franca')) {
    destinationKey = 'paris';
    detectedCity = 'Paris';
  } else if (clean.includes('são paulo') || clean.includes('sao paulo') || clean.includes(' sp ') || clean.includes('paulista')) {
    destinationKey = 'saopaulo';
    detectedCity = 'São Paulo';
  } else if (clean.includes('salvador') || clean.includes('trancoso') || clean.includes('bahia') || clean.includes('porto seguro')) {
    destinationKey = 'salvador';
    detectedCity = 'Salvador & Trancoso';
  } else if (clean.includes('florianópolis') || clean.includes('florianopolis') || clean.includes('floripa') || clean.includes('santa catarina')) {
    destinationKey = 'florianopolis';
    detectedCity = 'Florianópolis';
  } else if (clean.includes('lençóis') || clean.includes('lencois') || clean.includes('maranhão') || clean.includes('maranhao') || clean.includes('atins')) {
    destinationKey = 'lencois';
    detectedCity = 'Lençóis Maranhenses';
  } else if (clean.includes('roma') || clean.includes('itália') || clean.includes('italia')) {
    destinationKey = 'roma';
    detectedCity = 'Roma';
  } else if (clean.includes('tóquio') || clean.includes('toquio') || clean.includes('quioto') || clean.includes('kyoto') || clean.includes('japão') || clean.includes('japao')) {
    destinationKey = 'kyoto';
    detectedCity = 'Quioto & Tóquio';
  } else if (clean.includes('nova york') || clean.includes('new york') || clean.includes('manhattan')) {
    destinationKey = 'novayork';
    detectedCity = 'Nova York';
  } else if (clean.includes('lisboa') || clean.includes('porto') || clean.includes('portugal') || clean.includes('sintra')) {
    destinationKey = 'lisboa';
    detectedCity = 'Lisboa & Sintra';
  } else if (clean.includes('bariloche') || clean.includes('patagônia') || clean.includes('patagonia') || clean.includes('argentina') || clean.includes('buenos aires')) {
    destinationKey = 'bariloche';
    detectedCity = 'Bariloche';
  } else if (clean.includes('santorini') || clean.includes('grécia') || clean.includes('grecia')) {
    destinationKey = 'santorini';
    detectedCity = 'Santorini';
  } else if (clean.includes('cancún') || clean.includes('cancun') || clean.includes('tulum') || clean.includes('méxico') || clean.includes('mexico')) {
    destinationKey = 'cancun';
    detectedCity = 'Cancún';
  } else if (clean.includes('dubai') || clean.includes('emirados')) {
    destinationKey = 'dubai';
    detectedCity = 'Dubai';
  } else {
    // Try to extract city name from regex like "em [Cidade]" or "no [Lugar]"
    const cityMatch = clean.match(/(?:em|no|na|para|de)\s+([a-zà-ú\s]{3,25}?)(?:\?|,|\.|$|\s+quais|\s+onde|\s+como)/);
    if (cityMatch && cityMatch[1]) {
      const extracted = cityMatch[1].trim();
      if (extracted.length > 2 && !['qualquer', 'uma', 'um', 'viagem', 'casamento'].includes(extracted)) {
        detectedCity = extracted.charAt(0).toUpperCase() + extracted.slice(1);
      }
    }
  }

  return {
    isQuestion,
    intent,
    destinationKey,
    detectedCity,
    rawPrompt: prompt
  };
}

/**
 * Main Answer Engine: Answers ANY question with rich places, web search links, maps & tips
 * @param {string} prompt 
 * @returns {Promise<Object>}
 */
export async function getAiQuestionAnswer(prompt) {
  const analysis = analyzeUserQuery(prompt);
  const { destinationKey, detectedCity, intent } = analysis;

  // 1. Check if we have pre-curated deep knowledge
  if (destinationKey && CURATED_PLACES_KNOWLEDGE[destinationKey]) {
    const destData = CURATED_PLACES_KNOWLEDGE[destinationKey];
    const intentData = destData.intents[intent] || destData.intents['casamento'] || Object.values(destData.intents)[0];

    // Find matching destination in DESTINATION_DATABASE to allow 1-click quotation
    const matchedDestObj = DESTINATION_DATABASE.find(d => 
      d.name.toLowerCase().includes(destData.destinationName.toLowerCase()) ||
      destData.destinationName.toLowerCase().includes(d.name.toLowerCase())
    ) || DESTINATION_DATABASE.find(d => d.id === destinationKey);

    // Build enriched places with web search & maps links
    const enrichedPlaces = intentData.places.map(place => ({
      ...place,
      city: destData.destinationName,
      googleSearchUrl: buildGoogleSearchUrl(place.name, destData.destinationName, intentData.title),
      googleMapsUrl: buildGoogleMapsUrl(place.name, destData.destinationName),
      webSearchQuery: `${place.name} ${destData.destinationName}`
    }));

    // Trigger live Wikipedia search for context
    const wikiArticles = await searchWikipediaLive(`${destData.destinationName} ${intentData.places[0]?.name || ''}`, 3);

    return {
      success: true,
      isSpecificQuestion: true,
      destinationName: destData.destinationName,
      country: destData.country,
      state: destData.state,
      title: intentData.title,
      overview: intentData.overview,
      places: enrichedPlaces,
      wikiArticles,
      matchedDestObj,
      rawPrompt: prompt
    };
  }

  // 2. Dynamic Place Synthesis for ANY city/topic in Brazil or the World!
  // Uses real-time Wikipedia search to find iconic landmarks & spots of that city
  const wikiResults = await searchWikipediaLive(`${detectedCity} turismo pontos turisticos`, 6);

  // Generate 4 to 6 custom recommendations based on Wikipedia extracts & city knowledge
  const dynamicPlaces = [];

  if (wikiResults.length > 0) {
    wikiResults.slice(0, 4).forEach((item, idx) => {
      dynamicPlaces.push({
        id: `dyn-place-${idx}`,
        name: item.title,
        neighborhood: detectedCity,
        category: 'Ponto Turístico & Cultural Selecionado',
        icon: idx === 0 ? '🌟' : idx === 1 ? '🌅' : idx === 2 ? '🏰' : '✨',
        whyIdeal: item.snippet ? `${item.snippet.slice(0, 180)}... Local de destaque e renome na região.` : `Um dos pontos mais visitados e elogiados de ${detectedCity}.`,
        goldenTip: `Ideal para visitar no início da manhã ou entardecer para fotos com iluminação perfeita. Verifique horários de funcionamento online.`,
        googleSearchUrl: buildGoogleSearchUrl(item.title, detectedCity, prompt),
        googleMapsUrl: buildGoogleMapsUrl(item.title, detectedCity),
        wikiUrl: item.url
      });
    });
  }

  // Fallback default spots if wiki returned few items
  if (dynamicPlaces.length < 3) {
    dynamicPlaces.push(
      {
        id: 'dyn-fallback-1',
        name: `Centro Histórico & Arquitetura de ${detectedCity}`,
        neighborhood: detectedCity,
        category: 'Patrimônio & Passeio a Pé',
        icon: '🏛️',
        whyIdeal: `Ideal para caminhadas românticas, contemplação da arquitetura e paradas em charmosos bistrôs e cafés locais.`,
        goldenTip: `Explore a pé sem pressa, parando nos mirantes e praças arborizadas.`,
        googleSearchUrl: buildGoogleSearchUrl(`Centro Historico e pontos turisticos`, detectedCity),
        googleMapsUrl: buildGoogleMapsUrl(`Centro Historico`, detectedCity)
      },
      {
        id: 'dyn-fallback-2',
        name: `Mirante & Ponto Panorâmico de ${detectedCity}`,
        neighborhood: detectedCity,
        category: 'Pôr do Sol & Vista Panorâmica',
        icon: '🌅',
        whyIdeal: `Oferece a melhor vista panorâmica da cidade, perfeito para pedidos de casamento, brindes e fotos memoráveis.`,
        goldenTip: `Chegue 30 minutos antes do pôr do sol para acompanhar a transição de cores no céu.`,
        googleSearchUrl: buildGoogleSearchUrl(`melhor mirante por do sol`, detectedCity),
        googleMapsUrl: buildGoogleMapsUrl(`mirante`, detectedCity)
      },
      {
        id: 'dyn-fallback-3',
        name: `Melhores Restaurantes & Rooftops de ${detectedCity}`,
        neighborhood: detectedCity,
        category: 'Gastronomia & Experiência Exclusiva',
        icon: '🍷',
        whyIdeal: `Ambiente intimista para celebrações a dois ou refeições inesquecíveis com culinária autêntica.`,
        goldenTip: `Faça reservas antecipadas especialmente em fins de semana e feriados.`,
        googleSearchUrl: buildGoogleSearchUrl(`melhores restaurantes romanticos`, detectedCity),
        googleMapsUrl: buildGoogleMapsUrl(`restaurante`, detectedCity)
      }
    );
  }

  // Find any close match in DESTINATION_DATABASE
  const matchedDestObj = DESTINATION_DATABASE.find(d => 
    d.name.toLowerCase().includes(detectedCity.toLowerCase()) ||
    detectedCity.toLowerCase().includes(d.name.toLowerCase())
  ) || DESTINATION_DATABASE[0];

  return {
    success: true,
    isSpecificQuestion: true,
    destinationName: detectedCity,
    country: 'Brasil ou Internacional',
    title: `Sugestões Especializadas para: "${prompt}"`,
    overview: `Analisamos sua dúvida sobre ${detectedCity} através da nossa inteligência de viagens e curadoria na web. Aqui estão as recomendações mais exclusivas, com links de pesquisa em tempo real e rotas:`,
    places: dynamicPlaces,
    wikiArticles: wikiResults,
    matchedDestObj,
    rawPrompt: prompt
  };
}
