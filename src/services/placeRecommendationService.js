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
  },

  // 5. SÃO PAULO
  'saopaulo': {
    destinationName: 'São Paulo',
    state: 'São Paulo',
    country: 'Brasil',
    airportCode: 'GRU',
    intents: {
      casamento: {
        title: 'Locais Românticos e Exclusivos para Pedido de Casamento em São Paulo',
        overview: 'A maior metrópole da América Latina reserva refúgios sofisticados, palacetes escondidos, alta gastronomia estrelada e vistas panorâmicas de tirar o fôlego:',
        places: [
          {
            id: 'sp-prop-1',
            name: 'Terraço Itália (Restaurante e Piano Bar)',
            neighborhood: 'República / Centro Histórico',
            category: 'Ícone Panorâmico & Tradição',
            icon: '🏙️',
            whyIdeal: 'No 41º e 42º andares do Edifício Itália, com vista de 360 graus para o mar de luzes de São Paulo, acompanhado por iluminação intimista de velas e música clássica ao vivo.',
            goldenTip: 'Reserve a Mesa dos Namorados na Sala Nobre ou no Piano Bar com antecedência, solicitando serviço de espumante e sobremesa personalizada para a aliança.',
            searchQuery: 'pedido de casamento Terraco Italia Sao Paulo',
            mapsQuery: 'Terraco Italia Sao Paulo'
          },
          {
            id: 'sp-prop-2',
            name: 'Palácio Tangará (Oetker Collection)',
            neighborhood: 'Panamby / Parque Burle Marx',
            category: 'Luxo 5★ & Oásis Verde Urbano',
            icon: '🏰',
            whyIdeal: 'Um hotel palaciano cercado pela Mata Atlântica nativa do Parque Burle Marx. Oferece jantares ao ar livre com vista para as piscinas de mármore e alta gastronomia do chef Jean-Georges Vongerichten.',
            goldenTip: 'Agende um jantar privativo em uma das cabanas do jardim à luz de tochas ou no terraço da suíte executiva.',
            searchQuery: 'pedido de casamento Palacio Tangara Sao Paulo',
            mapsQuery: 'Palacio Tangara Sao Paulo'
          },
          {
            id: 'sp-prop-3',
            name: 'Skye Restaurante & Rooftop Bar (Hotel Unique)',
            neighborhood: 'Jardins',
            category: 'Design Contemporâneo & Piscina Vermelha',
            icon: '🍸',
            whyIdeal: 'Rooftop icônico no topo do Hotel Unique com vista panorâmica aberta para o Parque Ibirapuera e o horizonte de arranha-céus da Avenida Paulista.',
            goldenTip: 'Vá no início da noite (19h30) para pegar a transição do crepúsculo. Peça uma mesa rente ao parapeito de vidro de frente para o skyline.',
            searchQuery: 'pedido de casamento Skye Hotel Unique Sao Paulo',
            mapsQuery: 'Skye Bar Hotel Unique Sao Paulo'
          }
        ]
      }
    }
  },

  // 6. SALVADOR & TRANCOSO
  'salvador': {
    destinationName: 'Salvador & Trancoso',
    state: 'Bahia',
    country: 'Brasil',
    airportCode: 'SSA',
    intents: {
      casamento: {
        title: 'Cenários Encantadores para Pedido de Casamento na Bahia',
        overview: 'A Bahia une o misticismo colonial, falésias coloridas, praias virgens e pores do sol dourados que criam memórias para a vida inteira:',
        places: [
          {
            id: 'ssa-prop-1',
            name: 'Igrejinha de São João Batista no Quadrado de Trancoso',
            neighborhood: 'Trancoso, Porto Seguro',
            category: 'Vila Histórica & Vista para o Mar',
            icon: '⛪',
            whyIdeal: 'Atrás da capela caiada de branco do século XVII há um mirante natural com vista aberta para o mar esmeralda e coqueirais. À noite, o Quadrado é iluminado apenas por luminárias artesanais nas árvores.',
            goldenTip: 'Faça o pedido no final da tarde no gramado atrás da igrejinha, seguido de um jantar à luz de velas no Restaurante Capim Santo ou Jacaré do Brasil.',
            searchQuery: 'pedido de casamento Quadrado Trancoso mirante igrejinha',
            mapsQuery: 'Igreja Sao Joao Batista Quadrado Trancoso'
          },
          {
            id: 'ssa-prop-2',
            name: 'Ponta de Humaitá & Forte de Monte Serrat',
            neighborhood: 'Cidade Baixa, Salvador',
            category: 'Pôr do Sol Mágico na Baía de Todos-os-Santos',
            icon: '🌅',
            whyIdeal: 'Um pequeno promontório com um farol rústico e um mosteiro colonial debruçados sobre as águas calmas da Baía de Todos-os-Santos. É o pôr do sol mais sereno de Salvador.',
            goldenTip: 'Aproveite o horário entre 17h10 e 17h40. O reflexo do sol na água com os barcos de pescadores ao fundo cria o enquadramento perfeito.',
            searchQuery: 'pedido de casamento Ponta de Humaita Salvador',
            mapsQuery: 'Ponta de Humaita Salvador'
          },
          {
            id: 'ssa-prop-3',
            name: 'Praia do Espelho (Curuípe)',
            neighborhood: 'Litoral Sul da Bahia',
            category: 'Piscinas Naturais & Falésias Brancas',
            icon: '🏝️',
            whyIdeal: 'Eleita uma das praias mais bonitas do mundo. Na maré baixa, a água cristalina forma espelhos d’água perfeitos refletindo as falésias brancas e os coqueirais.',
            goldenTip: 'Consulte a tábua de marés para ir em dia de maré baixa (0.0 a 0.3) e reserve uma esteira balinesa privativa na Pousada do Outeiro.',
            searchQuery: 'pedido de casamento Praia do Espelho Bahia',
            mapsQuery: 'Praia do Espelho Bahia'
          }
        ]
      }
    }
  },

  // 7. MARAGOGI & ROTA DOS MILAGRES
  'maragogi': {
    destinationName: 'Maragogi & Rota dos Milagres',
    state: 'Alagoas',
    country: 'Brasil',
    airportCode: 'MCZ',
    intents: {
      casamento: {
        title: 'Paraísos de Águas Turquesa para Pedido de Casamento em Alagoas',
        overview: 'Conhecido como o Caribe Brasileiro, Alagoas oferece as piscinas naturais mais cristalinas do país, praias desertas e a icônica Capela dos Milagres:',
        places: [
          {
            id: 'mcz-prop-1',
            name: 'Capela dos Milagres (Praia do Marceneiro)',
            neighborhood: 'São Miguel dos Milagres',
            category: 'Arquitetura Rústica Chic & Praia Deserta',
            icon: '💍',
            whyIdeal: 'Construída na areia da praia cercada por coqueiros e brisa morna. É o cenário de casamentos mais sonhado do Brasil.',
            goldenTip: 'Vá ao amanhecer ou no final da tarde quando o acesso externo pela praia está completamente vazio e com iluminação dourada suave.',
            searchQuery: 'pedido de casamento Capela dos Milagres Alagoas',
            mapsQuery: 'Capela dos Milagres Sao Miguel dos Milagres'
          },
          {
            id: 'mcz-prop-2',
            name: 'Piscinas Naturais de Maragogi (Galés) em Barco Privativo',
            neighborhood: 'Maragogi',
            category: 'Caribe Brasileiro & Vida Marinha',
            icon: '🤿',
            whyIdeal: 'Bancos de corais a 6 km da costa com água tão transparente quanto uma piscina aquecida. Peixes coloridos nadando ao redor criam uma atmosfera paradisíaca.',
            goldenTip: 'Contrate uma lancha privativa antes dos catamarãs comerciais (saia às 7h30 da manhã em maré baixa) para ter a piscina só para vocês.',
            searchQuery: 'pedido de casamento piscinas naturais lancha privativa Maragogi',
            mapsQuery: 'Gales de Maragogi Alagoas'
          },
          {
            id: 'mcz-prop-3',
            name: 'Praia de Antunes ao Pôr do Sol',
            neighborhood: 'Maragogi',
            category: 'Coqueiro Inclinado & Mar Calmo',
            icon: '🌴',
            whyIdeal: 'Areia fina branca, mar calmo sem ondas de tom azul bebê e os famosos coqueiros inclinados para o mar.',
            goldenTip: 'Caminhe no final da tarde em direção à ponta deserta da enseada, longe das barracas centrais.',
            searchQuery: 'pedido de casamento Praia de Antunes Maragogi',
            mapsQuery: 'Praia de Antunes Maragogi'
          }
        ]
      }
    }
  },

  // 8. LENÇÓIS MARANHENSES
  'lencois': {
    destinationName: 'Lençóis Maranhenses',
    state: 'Maranhão',
    country: 'Brasil',
    airportCode: 'SLZ',
    intents: {
      casamento: {
        title: 'Cenários Monumentais para Pedido de Casamento nos Lençóis Maranhenses',
        overview: 'O único deserto com milhares de lagoas cristalinas do mundo. Um cenário surreal de dunas brancas ondulantes que parece outro planeta:',
        places: [
          {
            id: 'slz-prop-1',
            name: 'Lagoa Bonita no Alto das Grandes Dunas',
            neighborhood: 'Barreirinhas',
            category: 'Dunas Monumentais & Pôr do Sol Dourado',
            icon: '🏜️',
            whyIdeal: 'Subir a duna de 30 metros e contemplar o infinito mar de areia branca pontilhado por lagoas azul-turquesa até o horizonte.',
            goldenTip: 'Fique até o pôr do sol, quando o vento sopra suavemente e as dunas ganham tonalidades douradas e lilases. É um dos momentos mais poéticos da Terra.',
            searchQuery: 'pedido de casamento Lagoa Bonita Lencois Maranhenses',
            mapsQuery: 'Lagoa Bonita Lencois Maranhenses'
          },
          {
            id: 'slz-prop-2',
            name: 'Povoado de Atins & Foz do Rio Preguiças',
            neighborhood: 'Atins',
            category: 'Charme Rústico & Encontro do Rio com o Mar',
            icon: '🌊',
            whyIdeal: 'Ruas de areia fofa, pousadas de charme com redes na varanda e o encontro das águas doces do rio com o oceano Atlântico.',
            goldenTip: 'Agende um passeio de quadriciclo privativo até as lagoas remotas da época e jante no famoso Restaurante do Sr. Antônio ou da Dona Luzia.',
            searchQuery: 'pedido de casamento Atins Lencois Maranhenses',
            mapsQuery: 'Atins Maranhao'
          }
        ]
      }
    }
  },

  // 9. ROMA
  'roma': {
    destinationName: 'Roma',
    state: 'Lazio',
    country: 'Itália',
    airportCode: 'FCO',
    intents: {
      casamento: {
        title: 'Locais Históricos e Apaixonantes para Pedido de Casamento em Roma',
        overview: 'A Cidade Eterna respira romantismo clássico em cada esquina, com fontes barrocas, ruínas milenares e terraços com vista para cúpulas históricas:',
        places: [
          {
            id: 'fco-prop-1',
            name: 'Giardino degli Aranci (Jardim das Laranjeiras no Monte Aventino)',
            neighborhood: 'Aventino',
            category: 'Mirante dos Apaixonados & Cúpula de São Pedro',
            icon: '🍊',
            whyIdeal: 'Jardim perfumado de laranjeiras com uma vista panorâmica arrebatadora de Roma, emoldurando a silhueta da Basílica de São Pedro no horizonte ao entardecer.',
            goldenTip: 'Vá às 17h e, após o pedido, caminhe 100 metros até o famoso "Buraco da Fechadura" da Ordem de Malta para ver a cúpula emoldurada.',
            searchQuery: 'pedido de casamento Giardino degli Aranci Roma',
            mapsQuery: 'Giardino degli Aranci Roma'
          },
          {
            id: 'fco-prop-2',
            name: 'Ponte Sant’Angelo com Vista para o Castelo',
            neighborhood: 'Ponte / Vaticano',
            category: 'Esculturas de Bernini & Rio Tibre',
            icon: '🏰',
            whyIdeal: 'Ponte de pedestres ladeada por anjos de mármore esculpidos por Bernini, com o imponente Castel Sant’Angelo iluminado ao fundo refletindo no rio.',
            goldenTip: 'Caminhe na ponte no final da noite (após as 22h), quando os turistas se dispersam e a iluminação amarelada dá um ar de filme renascentista.',
            searchQuery: 'pedido de casamento Ponte Sant Angelo Roma',
            mapsQuery: 'Ponte Sant Angelo Roma'
          },
          {
            id: 'fco-prop-3',
            name: 'Fontana di Trevi ao Amanhecer',
            neighborhood: 'Trevi',
            category: 'A Fonte Mais Lendária do Mundo',
            icon: '⛲',
            whyIdeal: 'A lenda diz que jogar uma moeda garante o retorno a Roma, mas se ajoelhar com a aliança diante das águas azuis da obra-prima barroca é inigualável.',
            goldenTip: 'Chegue entre 6h30 e 7h da manhã. A praça estará completamente deserta, permitindo um momento silencioso e íntimo sem multidões.',
            searchQuery: 'pedido de casamento Fontana di Trevi amanhecer Roma',
            mapsQuery: 'Fontana di Trevi Roma'
          }
        ]
      }
    }
  },

  // 10. QUIOTO & TÓQUIO
  'kyoto': {
    destinationName: 'Quioto & Tóquio',
    state: 'Kansai / Kanto',
    country: 'Japão',
    airportCode: 'HND',
    intents: {
      casamento: {
        title: 'Locais Mágicos e Poéticos para Pedido de Casamento no Japão',
        overview: 'O Japão combina a serenidade de templos milenares, jardins zen e bosques de bambu com a modernidade reluzente de rooftops futuristas:',
        places: [
          {
            id: 'tyo-prop-1',
            name: 'Floresta de Bambu de Arashiyama ao Amanhecer',
            neighborhood: 'Quioto',
            category: 'Natureza Zen & Tradição Milenar',
            icon: '🎋',
            whyIdeal: 'Caminhar entre os colossos de bambu verde que estalam suavemente ao vento, criando uma trilha sonora natural de tranquilidade e reverência.',
            goldenTip: 'Vá às 7h da manhã antes da chegada dos grupos turísticos. A luz da manhã cortando as copas de bambu cria feixes de luz cinematográficos.',
            searchQuery: 'pedido de casamento Arashiyama Bamboo Forest Kyoto',
            mapsQuery: 'Arashiyama Bamboo Grove Kyoto'
          },
          {
            id: 'tyo-prop-2',
            name: 'Shibuya Sky Rooftop Observation Deck',
            neighborhood: 'Shibuya, Tóquio',
            category: 'Futurismo & Horizonte 360° com Monte Fuji',
            icon: '✨',
            whyIdeal: 'Um terraço ao ar livre a 229 metros de altura debruçado sobre o cruzamento mais famoso do mundo, com vista do Monte Fuji no crepúsculo.',
            goldenTip: 'Compre o ingresso do horário do pôr do sol (sunset slot) com 4 semanas de antecedência e vá ao corner de vidro no canto noroeste.',
            searchQuery: 'pedido de casamento Shibuya Sky rooftop Tokyo',
            mapsQuery: 'SHIBUYA SKY Tokyo'
          }
        ]
      }
    }
  },

  // 11. NOVA YORK
  'novayork': {
    destinationName: 'Nova York',
    state: 'Nova York',
    country: 'Estados Unidos',
    airportCode: 'JFK',
    intents: {
      casamento: {
        title: 'Locais Cinematográficos para Pedido de Casamento em Nova York',
        overview: 'A capital do mundo é o cenário de centenas de histórias de amor. Para um pedido clássico ou nas alturas, aqui estão os pontos perfeitos:',
        places: [
          {
            id: 'nyc-prop-1',
            name: 'Bow Bridge & Bethesda Terrace no Central Park',
            neighborhood: 'Central Park / Manhattan',
            category: 'Romance Clássico no Coração do Parque',
            icon: '🍂',
            whyIdeal: 'A graciosa ponte de ferro fundido do século XIX curvando-se sobre o lago calmo, cercada por árvores frondosas e barcos a remo.',
            goldenTip: 'Alugue um barquinho no Loeb Boathouse e faça o pedido no centro do lago com a ponte ao fundo, ou caminhe pela ponte no início da manhã.',
            searchQuery: 'pedido de casamento Bow Bridge Central Park New York',
            mapsQuery: 'Bow Bridge Central Park NYC'
          },
          {
            id: 'nyc-prop-2',
            name: 'The Edge NYC (Hudson Yards)',
            neighborhood: 'Hudson Yards, Manhattan',
            category: 'O Deck Suspenso Mais Alto do Hemisfério Ocidental',
            icon: '🏙️',
            whyIdeal: 'Plataforma ao ar livre a 335 metros de altura com piso de vidro transparente e paredes inclinadas projetando-se sobre Manhattan.',
            goldenTip: 'Reserve o pacote sunset com taça de champanhe no bar de vidro e posicione-se na ponta oriental (The Eastern Point).',
            searchQuery: 'pedido de casamento The Edge Hudson Yards New York',
            mapsQuery: 'Edge NYC Hudson Yards'
          }
        ]
      }
    }
  },

  // 12. LISBOA & SINTRA
  'lisboa': {
    destinationName: 'Lisboa & Sintra',
    state: 'Distrito de Lisboa',
    country: 'Portugal',
    airportCode: 'LIS',
    intents: {
      casamento: {
        title: 'Castelos e Miradouros Mágicos para Pedido de Casamento em Portugal',
        overview: 'A luz única de Lisboa, as colinas históricas com azulejos e os palácios de contos de fadas de Sintra criam uma atmosfera romântica sem igual:',
        places: [
          {
            id: 'lis-prop-1',
            name: 'Palácio Nacional da Pena & Jardins de Sintra',
            neighborhood: 'Sintra (a 30 min de Lisboa)',
            category: 'Conto de Fadas Romântico no Topo da Serra',
            icon: '🏰',
            whyIdeal: 'Um castelo de cores vibrantes (amarelo e vermelho) erguido sobre a rocha em meio a uma floresta mística envolta em névoa. Parece saído de um livro de princesas.',
            goldenTip: 'Suba até o mirante da Cruz Alta nos jardins do palácio para ver o castelo por inteiro entre os pinheiros e o oceano ao fundo.',
            searchQuery: 'pedido de casamento Palacio da Pena Sintra Portugal',
            mapsQuery: 'Palacio Nacional da Pena Sintra'
          },
          {
            id: 'lis-prop-2',
            name: 'Miradouro de Santa Luzia & Miradouro das Portas do Sol',
            neighborhood: 'Alfama, Lisboa',
            category: 'Azulejos Portugueses & Vista para o Rio Tejo',
            icon: '⛵',
            whyIdeal: 'Pérgula florida coberta por buganvílias roxas, painéis de azulejos azuis e vista deslumbrante para o casario branco de Alfama e o Tejo.',
            goldenTip: 'Vá na primeira hora da manhã (8h) para desfrutar da pérgula sem movimento antes da passagem dos bondes elétricos.',
            searchQuery: 'pedido de casamento Miradouro de Santa Luzia Alfama Lisboa',
            mapsQuery: 'Miradouro de Santa Luzia Lisboa'
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

  // 4. Detect General Travel Logistics / Advice Intent
  let isLogistics = false;
  let logisticsTopic = null;

  if (clean.includes('época') || clean.includes('epoca') || clean.includes('quando ir') || clean.includes('melhor mes') || clean.includes('melhor mês') || clean.includes('clima')) {
    isLogistics = true;
    logisticsTopic = 'melhor_epoca';
  } else if (clean.includes('bagagem') || clean.includes('mala de mão') || clean.includes('mala de mao') || clean.includes('10kg') || clean.includes('23kg') || clean.includes('despachada') || clean.includes('franquia')) {
    isLogistics = true;
    logisticsTopic = 'bagagem';
  } else if (clean.includes('visto') || clean.includes('passaporte') || clean.includes('vacina') || clean.includes('documento') || clean.includes('rg') || clean.includes('fronteira')) {
    isLogistics = true;
    logisticsTopic = 'documentos';
  } else if (clean.includes('economizar') || clean.includes('mais barato') || clean.includes('desconto em passagem') || clean.includes('comprar passagem') || clean.includes('menor preço')) {
    isLogistics = true;
    logisticsTopic = 'economia';
  }

  return {
    isQuestion,
    intent,
    isLogistics,
    logisticsTopic,
    destinationKey,
    detectedCity,
    rawPrompt: prompt
  };
}

// CURATED FACTUAL LOGISTICS ANSWERS FOR GENERAL TRAVEL INQUIRIES
const LOGISTICS_KNOWLEDGE = {
  melhor_epoca: {
    title: 'Guia Factual: Melhores Épocas para Viajar por Região',
    overview: 'Escolher a época certa faz toda a diferença para evitar chuvas, temporadas de tempestades ou superlotação. Apresentamos o calendário factual por região:',
    places: [
      {
        id: 'log-epoca-1',
        name: 'Litoral Nordestino (Alagoas, Bahia, Ceará, Pernambuco, RN)',
        neighborhood: 'Nordeste do Brasil',
        category: 'Sol Garantido & Mar Cristalino',
        icon: '☀️',
        whyIdeal: 'Entre setembro e março o Nordeste registra os menores índices pluviométricos e águas calmas e translúcidas, ideais para piscinas naturais.',
        goldenTip: 'Evite os meses de abril a julho em Alagoas, Pernambuco e Salvador, que correspondem à quadra chuvosa do litoral oriental.'
      },
      {
        id: 'log-epoca-2',
        name: 'Serra Gaúcha (Gramado, Canela e Vale dos Vinhedos)',
        neighborhood: 'Rio Grande do Sul',
        category: 'Frio Acolhedor & Alta Temporada',
        icon: '🍷',
        whyIdeal: 'Para curtir frio, lareira, fondue e vinhedos, de maio a agosto. Para o espetáculo do Natal Luz, de novembro a meados de janeiro.',
        goldenTip: 'Entre março e abril as temperaturas são amenas e a serra fica com belíssimas cores de outono com preços mais em conta.'
      },
      {
        id: 'log-epoca-3',
        name: 'Europa Ocidental (França, Itália, Portugal, Espanha)',
        neighborhood: 'Europa',
        category: 'Primavera e Outono Perfeitos',
        icon: '🏰',
        whyIdeal: 'Maio a junho e setembro a outubro oferecem temperaturas agradáveis (18°C a 24°C), dias longos de sol e cidades sem o calor sufocante e filas de julho/agosto.',
        goldenTip: 'Em julho e agosto as capitais europeias ficam lotadas e muitos comércios locais fecham para férias de verão.'
      },
      {
        id: 'log-epoca-4',
        name: 'Caribe e América do Norte (Cancún, Miami, Orlando)',
        neighborhood: 'Caribe & Estados Unidos',
        category: 'Fora da Temporada de Furacões',
        icon: '🏖️',
        whyIdeal: 'De dezembro a abril o clima é seco, estável e com brisa perfeita. Em Orlando, o outono (outubro/novembro) tem parques com filas reduzidas.',
        goldenTip: 'A temporada oficial de furacões no Caribe e Flórida ocorre de junho a novembro, com pico em agosto e setembro.'
      }
    ]
  },
  bagagem: {
    title: 'Regras Oficiais de Bagagem: Mala de Mão (10kg) e Despachada (23kg)',
    overview: 'De acordo com a Resolução nº 400 da ANAC e normas internacionais da IATA, aqui estão as regras factuais vigentes para voos nacionais e internacionais:',
    places: [
      {
        id: 'log-bag-1',
        name: 'Mala de Bordo / Mala de Mão (10kg Gratuita)',
        neighborhood: 'Cabine da Aeronave',
        category: 'Direito Regulamentado por Lei',
        icon: '🎒',
        whyIdeal: 'No Brasil, todos os passageiros têm direito a 1 mala de mão de até 10kg sem cobrança adicional, mais 1 item pessoal (mochila ou bolsa que caiba sob o assento dianteiro).',
        goldenTip: 'As dimensões máximas oficiais são 55 cm de altura x 35 cm de largura x 25 cm de profundidade (incluindo rodinhas e alças).'
      },
      {
        id: 'log-bag-2',
        name: 'Mala Despachada (23kg em Voos Nacionais e Internacionais)',
        neighborhood: 'Porão da Aeronave',
        category: 'Franquia Adquirida ou Tarifa Top',
        icon: '🧳',
        whyIdeal: 'Cada peça despachada deve ter até 23kg e soma máxima de dimensões (altura + largura + comprimento) de até 158 cm.',
        goldenTip: 'Comprar a franquia de bagagem com antecedência pelo app ou site oficial da companhia aérea custa cerca de 50% menos do que pagar no balcão do aeroporto.'
      },
      {
        id: 'log-bag-3',
        name: 'Líquidos e Itens Proibidos em Voos Internacionais',
        neighborhood: 'Segurança Aeroportuária',
        category: 'Norma Internacional IATA',
        icon: '🧴',
        whyIdeal: 'Em voos internacionais, líquidos na bagagem de mão devem estar em frascos individuais de no máximo 100ml cada, dentro de um saco plástico transparente selável de até 1 litro.',
        goldenTip: 'Eletrônicos com baterias de lítio (laptops, powerbanks) DEVEM ir obrigatoriamente na mala de mão, nunca no porão despachado.'
      }
    ]
  },
  documentos: {
    title: 'Documentação Oficial Exigida para Viagens Nacionais e Internacionais',
    overview: 'Para garantir um embarque sem contratempos, confira as regras oficiais de identificação e vistos para viajantes brasileiros:',
    places: [
      {
        id: 'log-doc-1',
        name: 'Voos Nacionais e Países do Mercosul',
        neighborhood: 'Brasil, Argentina, Chile, Uruguai, Paraguai, Peru',
        category: 'Dispensa de Passaporte',
        icon: '🪪',
        whyIdeal: 'Brasileiros podem viajar para países do Mercosul portando apenas a Carteira de Identidade (RG) original em bom estado emitida há menos de 10 anos.',
        goldenTip: 'Atenção: A CNH (Carteira Nacional de Habilitação) é aceita para voos dentro do Brasil, mas NÃO é aceita para cruzar fronteiras internacionais do Mercosul.'
      },
      {
        id: 'log-doc-2',
        name: 'Europa (Espaço Schengen: França, Itália, Portugal, etc.)',
        neighborhood: '27 Países Europeus',
        category: 'Passaporte Válido + Seguro Obrigatório',
        icon: '🇪🇺',
        whyIdeal: 'Brasileiros não precisam de visto para turismo de até 90 dias. É obrigatório passaporte com validade mínima de 3 meses além da estadia e seguro viagem com cobertura de € 30.000.',
        goldenTip: 'Tenha em mãos no desembarque a passagem de retorno emitida e o comprovante de hospedagem ou carta-convite.'
      },
      {
        id: 'log-doc-3',
        name: 'Estados Unidos & Japão',
        neighborhood: 'América do Norte e Ásia',
        category: 'Visto Americano e Isenção Japonesa',
        icon: '🇺🇸',
        whyIdeal: 'Para os EUA é obrigatório visto B1/B2 válido e passaporte válido. Para o Japão, brasileiros portadores de passaporte comum estão ISENTOS de visto desde outubro de 2023 para estadias de até 90 dias.',
        goldenTip: 'Preencha o formulário Visit Japan Web antes de embarcar para o Japão para agilizar imigração e alfândega por QR Code.'
      }
    ]
  },
  economia: {
    title: 'Estratégias Comprovadas para Economizar na Compra de Passagens Aéreas',
    overview: 'Comprar passagens pelo melhor preço exige técnica e uso inteligente dos comparadores oficiais. Confira as melhores práticas:',
    places: [
      {
        id: 'log-eco-1',
        name: 'Janela Ideal de Compra de Passagens',
        neighborhood: 'Timing Tarifário',
        category: 'Menor Preço Médio',
        icon: '📅',
        whyIdeal: 'Para voos nacionais: entre 30 e 60 dias de antecedência (alta temporada: 60 a 90 dias). Para voos internacionais: entre 60 e 120 dias antes do embarque.',
        goldenTip: 'Comprar com mais de 6 meses de antecedência ou em cima da hora quase sempre resulta em tarifas inflacionadas pelas tabelas das companhias.'
      },
      {
        id: 'log-eco-2',
        name: 'Voos às Terças, Quartas e Sábados',
        neighborhood: 'Dias Estratégicos da Semana',
        category: 'Menor Demanda Corporativa',
        icon: '✈️',
        whyIdeal: 'Sextas e domingos são os dias mais concorridos e caros devido a viajantes executivos e viagens de fim de semana.',
        goldenTip: 'Utilize o calendário flexível do Google Flights ou Skyscanner para visualizar os dias com menores tarifas no mês inteiro.'
      },
      {
        id: 'log-eco-3',
        name: 'Compare Sempre o Site Oficial da Companhia',
        neighborhood: 'LATAM, GOL, Azul, TAP, Air France',
        category: 'Sem Taxas Ocultas de Intermediação',
        icon: '💳',
        whyIdeal: 'Agências online terceirizadas costumam cobrar taxas extras de remarcação e bagagem. Comprar direto no site oficial da cia garante pontuação integral de milhas e suporte direto.',
        goldenTip: 'Nosso comparador disponibiliza o link direto do motor oficial da cia com os parâmetros já preenchidos.'
      }
    ]
  }
};

/**
 * Main Answer Engine: Answers ANY question with rich places, web search links, maps & tips
 * @param {string} prompt 
 * @returns {Promise<Object>}
 */
export async function getAiQuestionAnswer(prompt) {
  const analysis = analyzeUserQuery(prompt);
  const { destinationKey, detectedCity, intent, isLogistics, logisticsTopic } = analysis;

  // 1. Check if user asked a general travel logistics / planning question
  if (isLogistics && logisticsTopic && LOGISTICS_KNOWLEDGE[logisticsTopic]) {
    const logData = LOGISTICS_KNOWLEDGE[logisticsTopic];
    const enrichedPlaces = logData.places.map(place => ({
      ...place,
      googleSearchUrl: buildGoogleSearchUrl(place.name, '', prompt),
      googleMapsUrl: buildGoogleMapsUrl(place.name, '')
    }));

    const wikiArticles = await searchWikipediaLive(`${prompt} viagem`, 3);

    return {
      success: true,
      isSpecificQuestion: true,
      destinationName: 'Dicas Gerais de Viagem',
      country: 'Brasil e Mundo',
      title: logData.title,
      overview: logData.overview,
      places: enrichedPlaces,
      wikiArticles,
      matchedDestObj: DESTINATION_DATABASE[0],
      rawPrompt: prompt
    };
  }

  // 2. Check if we have pre-curated deep knowledge for specific destination
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

  // 3. Dynamic Place Synthesis for ANY city/topic in Brazil or the World!
  // Uses real-time Wikipedia search to find iconic landmarks & spots of that city
  const wikiResults = await searchWikipediaLive(`${detectedCity} turismo pontos turisticos`, 6);

  // Generate custom recommendations based on Wikipedia extracts & city knowledge
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
