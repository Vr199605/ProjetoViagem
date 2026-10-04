// Intelligent Multi-Destination AI Concierge Engine for VOYAGER AI (Disney Experience)
// Analyzes ALL of Brazil and ALL of the World dynamically based on user prompt

import { parseTravelPrompt } from '../utils/nlpParser.js';

// Comprehensive Global & Brazilian Destination Catalog (38 world-class destinations)
export const DESTINATION_DATABASE = [
  // --- BRASIL ---
  {
    id: 'gramado',
    name: 'Gramado & Canela',
    state: 'Rio Grande do Sul',
    country: 'Brasil',
    airportCode: 'POA',
    image: '/images/destinations/gramado.jpg',
    magicBadge: '🏰 Magia da Serra & Conto de Fadas',
    vibe: 'Chalés Alpinos, Neve no Snowland & Vinhedos Premiados',
    keywords: ['gramado', 'canela', 'serra gaucha', 'snowland', 'mini mundo', 'fondue', 'frio', 'neve', 'lareira', 'vinhedo', 'sul', 'chocolate', 'natal luz', 'romantico', 'casal', 'familia', 'criancas', 'inverno', 'chale'],
    highlights: ['Lago Negro com pedalinhos de cisne', 'Parque Snowland com neve de verdade', 'Sequência de fondue suíço artesanal', 'Vale dos Vinhedos e vinícolas nobres'],
    defaultDays: 5,
    dailyBudget: 620,
    profile: 'Família & Romance',
    foodSpecialty: 'Galeto al primo canto, fondue de queijos nobres e chocolates artesanais',
    isDomestic: true,
    category: 'Serra & Vinho'
  },
  {
    id: 'noronha',
    name: 'Fernando de Noronha',
    state: 'Pernambuco',
    country: 'Brasil',
    airportCode: 'FEN',
    image: '/images/destinations/noronha.jpg',
    magicBadge: '🐬 Santuário Marinho dos Sonhos',
    vibe: 'Baía do Sancho, Águas Cristalinas & Golfinhos Livres',
    keywords: ['noronha', 'fernando de noronha', 'sancho', 'baia do sancho', 'golfinho', 'tartaruga', 'mergulho', 'mar', 'praia paradisiaca', 'nordeste', 'ilha', 'aguas cristalinas', 'turquesa', 'natureza', 'ecoturismo', 'exclusivo', 'lua de mel'],
    highlights: ['Baía do Sancho (eleita a praia mais bela do mundo)', 'Mirante dos Dois Irmãos e Baía dos Porcos', 'Passeio de barco ao amanhecer com golfinhos', 'Pôr do sol com música no Mirante do Boldró'],
    defaultDays: 5,
    dailyBudget: 1250,
    profile: 'Praias Paradisíacas',
    foodSpecialty: 'Peixes frescos na folha de bananeira e carpaccio de polvo com ervas',
    isDomestic: true,
    category: 'Praias Paradisíacas'
  },
  {
    id: 'maragogi',
    name: 'Maragogi & Costa dos Corais',
    state: 'Alagoas',
    country: 'Brasil',
    airportCode: 'MCZ',
    image: '/images/destinations/maragogi.jpg',
    magicBadge: '🌊 O Caribe Brasileiro de Águas Mornas',
    vibe: 'Galés com Piscinas Naturais & Areia Branca com Coqueirais',
    keywords: ['maragogi', 'alagoas', 'costa dos corais', 'gales', 'piscinas naturais', 'aguas mornas', 'antunes', 'caribe brasileiro', 'mar calmo', 'nordeste', 'praia', 'sol', 'calor', 'verao', 'mergulho', 'resort', 'familia', 'criancas'],
    highlights: ['Mergulho com snorkel nas Galés de Maragogi', 'Caminhada pelo banco de areia da Praia de Antunes', 'Passeio de buggy pelas falésias e coqueirais', 'Piscinas naturais de Taoca e Barra Grande'],
    defaultDays: 5,
    dailyBudget: 560,
    profile: 'Praias Paradisíacas',
    foodSpecialty: 'Moqueca alagoana de lagosta fresca ao leite de coco e bolo de goma',
    isDomestic: true,
    category: 'Praias Paradisíacas'
  },
  {
    id: 'lencois',
    name: 'Lençóis Maranhenses & Atins',
    state: 'Maranhão',
    country: 'Brasil',
    airportCode: 'SLZ',
    image: '/images/destinations/lencois.jpg',
    magicBadge: '✨ Oásis Sagrado de Dunas & Lagoas',
    vibe: 'Dunas de Areia Branca & Lagoas de Água Doce Turquesa',
    keywords: ['lencois', 'lençois', 'lencois maranhenses', 'maranhao', 'atins', 'barreirinhas', 'dunas', 'lagoas', 'ecoturismo', '4x4', 'rio preguicas', 'natureza', 'aventura', 'sol', 'deserto com agua'],
    highlights: ['Circuito da Lagoa Bonita com subida panorâmica', 'Lagoa Azul de águas mornas e puras', 'Povoado praiano e rústico de Atins', 'Passeio de voadeira rápida pelo Rio Preguiças'],
    defaultDays: 4,
    dailyBudget: 750,
    profile: 'Ecoturismo & Natureza',
    foodSpecialty: 'Camarão grelhado na brasa de Atins e arroz de cuxá tradicional',
    isDomestic: true,
    category: 'Ecoturismo'
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    country: 'Brasil',
    airportCode: 'GIG',
    image: '/images/destinations/rio.jpg',
    magicBadge: '🏖️ A Cidade Maravilhosa & Bossa Nova',
    vibe: 'Cristo Redentor, Copacabana, Ipanema & Pão de Açúcar',
    keywords: ['rio de janeiro', 'rio', 'rj', 'copacabana', 'ipanema', 'leblon', 'cristo redentor', 'pao de acucar', 'arpoador', 'bossa nova', 'carnaval', 'cidade maravilhosa', 'praia', 'cultura', 'shows', 'botecos'],
    highlights: ['Cristo Redentor no Corcovado com vista de 360°', 'Pôr do sol dourado aplaudido no Arpoador', 'Passeio no Bondinho do Pão de Açúcar', 'Café da manhã histórico no Forte de Copacabana'],
    defaultDays: 5,
    dailyBudget: 580,
    profile: 'Nacionais em Alta',
    foodSpecialty: 'Feijoada carioca tradicional e caipirinha no Bar do Mineiro',
    isDomestic: true,
    category: 'Nacionais em Alta'
  },
  {
    id: 'salvador',
    name: 'Salvador & Morro de São Paulo',
    state: 'Bahia',
    country: 'Brasil',
    airportCode: 'SSA',
    image: '/images/destinations/salvador.jpg',
    magicBadge: '🥁 Raízes da Bahia, Cores & Axé',
    vibe: 'Pelourinho Histórico, Farol da Barra & Praias Baianas',
    keywords: ['salvador', 'bahia', 'pelourinho', 'morro de sao paulo', 'axe', 'farol da barra', 'acaraje', 'carnaval bahia', 'cultura afro', 'igreja de sao francisco', 'olodum', 'nordeste', 'historia'],
    highlights: ['Caminhada pelos casarões coloniais do Pelourinho', 'Pôr do sol memorável no Farol da Barra', 'Travessia de catamarã para as praias de Morro de São Paulo', 'Missa com batuque na Igreja de Nossa Senhora do Rosário dos Pretos'],
    defaultDays: 6,
    dailyBudget: 540,
    profile: 'Cultura & Festivais',
    foodSpecialty: 'Moqueca baiana tradicional com azeite de dendê e acarajé crocante',
    isDomestic: true,
    category: 'Grandes Festivais'
  },
  {
    id: 'trancoso',
    name: 'Trancoso & Arraial d\'Ajuda',
    state: 'Bahia',
    country: 'Brasil',
    airportCode: 'BPS',
    image: '/images/destinations/salvador.jpg',
    magicBadge: '🌴 Sofisticação Rústica & Falésias Douradas',
    vibe: 'Quadrado Histórico, Praia do Espelho & Pousadas de Charme',
    keywords: ['trancoso', 'arraial dajuda', 'arraial d ajuda', 'porto seguro', 'quadrado', 'praia do espelho', 'falesias', 'bahia charme', 'pousadas boutique', 'praia luxo', 'romantico', 'casal'],
    highlights: ['Passeio pelo Quadrado iluminado por lanternas nas árvores', 'Piscinas naturais da Praia do Espelho', 'Falésias multicoloridas da Praia da Pitinga', 'Beach clubs sofisticados na Praia dos Coqueiros'],
    defaultDays: 5,
    dailyBudget: 920,
    profile: 'Luxo & Charme',
    foodSpecialty: 'Bobó de camarão fresco servido no coco e peixes da costa baiana',
    isDomestic: true,
    category: 'Praias Paradisíacas'
  },
  {
    id: 'foz',
    name: 'Foz do Iguaçu',
    state: 'Paraná',
    country: 'Brasil',
    airportCode: 'IGU',
    image: '/images/destinations/foz.jpg',
    magicBadge: '⚡ A Força Brutal da Natureza Mundial',
    vibe: 'Cataratas do Iguaçu, Macuco Safari & Tríplice Fronteira',
    keywords: ['foz do iguacu', 'foz', 'cataratas', 'parque das aves', 'macuco safari', 'triplice fronteira', 'itaipu', 'maravilha natural', 'parana', 'sul', 'aventura', 'familia', 'argentina fronteira', 'paraguai compras'],
    highlights: ['Garganta do Diabo com passarela sobre o abismo', 'Passeio de barco inflável Macuco Safari sob as quedas', 'Imersão no viveiro gigante do Parque das Aves', 'Jantar de carnes na fronteira em Puerto Iguazú'],
    defaultDays: 4,
    dailyBudget: 520,
    profile: 'Ecoturismo & Aventura',
    foodSpecialty: 'Parrillada argentina na fronteira e peixes nobres do Rio Paraná',
    isDomestic: true,
    category: 'Ecoturismo'
  },
  {
    id: 'bonito',
    name: 'Bonito & Pantanal',
    state: 'Mato Grosso do Sul',
    country: 'Brasil',
    airportCode: 'BYO',
    image: '/images/destinations/bonito.jpg',
    magicBadge: '💎 Aquário Cristalino da Terra',
    vibe: 'Flutuação em Rios Transparentes & Gruta do Lago Azul',
    keywords: ['bonito', 'pantanal', 'rio da prata', 'sucuri', 'flutuacao', 'gruta do lago azul', 'abismo anhumas', 'boca da onca', 'mato grosso do sul', 'ecoturismo', 'peixes', 'mergulho', 'natureza pura', 'cachoeiras'],
    highlights: ['Flutuação transparente no Rio da Prata com piraputangas', 'Visita contemplativa à Gruta do Lago Azul', 'Circuito de cachoeiras da Boca da Onça', 'Safári fotográfico com animais silvestres no Pantanal'],
    defaultDays: 6,
    dailyBudget: 850,
    profile: 'Ecoturismo & Natureza',
    foodSpecialty: 'Pintado a urucum no barro e carne de jacaré grelhada',
    isDomestic: true,
    category: 'Ecoturismo'
  },
  {
    id: 'jalapao',
    name: 'Jalapão & Serras Gerais',
    state: 'Tocantins',
    country: 'Brasil',
    airportCode: 'PMW',
    image: '/images/destinations/jalapao.jpg',
    magicBadge: '🏜️ Fervedouros Mágicos & Dunas do Cerrado',
    vibe: 'Águas Onde é Impossível Afundar & Expedição 4x4',
    keywords: ['jalapao', 'jalapão', 'tocantins', 'fervedouros', 'dunas douradas', 'cachoeira da formiga', 'cerrado', 'expedicao 4x4', 'ecoturismo', 'palmas', 'natureza intocada', 'aventura'],
    highlights: ['Banho relaxante nos fervedouros de água cristalina', 'Pôr do sol cinematográfico nas Dunas do Jalapão', 'Mergulho na piscina verde-esmeralda da Cachoeira da Formiga', 'Artesanato em capim dourado com comunidades locais'],
    defaultDays: 5,
    dailyBudget: 680,
    profile: 'Ecoturismo & Aventura',
    foodSpecialty: 'Comida caseira tocantinense com frango caipira e peixes do cerrado',
    isDomestic: true,
    category: 'Ecoturismo'
  },
  {
    id: 'jericoacoara',
    name: 'Jericoacoara',
    state: 'Ceará',
    country: 'Brasil',
    airportCode: 'JJD',
    image: '/images/destinations/jericoacoara.jpg',
    magicBadge: '🏖️ Vila de Pescadores & Redes na Água Doce',
    vibe: 'Lagoa do Paraíso, Pedra Furada & Dunas Douradas',
    keywords: ['jericoacoara', 'jeri', 'ceara', 'ceará', 'lagoa do paraiso', 'pedra furada', 'duna do por do sol', 'kite surf', 'redes na agua', 'buraco azul', 'nordeste', 'praia', 'dunas'],
    highlights: ['Relaxar em redes dentro d\'água na Lagoa do Paraíso', 'Assistir ao sol mergulhar no oceano da Duna do Pôr do Sol', 'Caminhada matinal até a escultura natural da Pedra Furada', 'Passeio de buggy pelas lagoas do litoral leste e oeste'],
    defaultDays: 5,
    dailyBudget: 720,
    profile: 'Praias Paradisíacas',
    foodSpecialty: 'Camarão no abacaxi e peixe pargo fresco assado na brasa',
    isDomestic: true,
    category: 'Praias Paradisíacas'
  },
  {
    id: 'balneariocamboriu',
    name: 'Balneário Camboriú & Beto Carrero',
    state: 'Santa Catarina',
    country: 'Brasil',
    airportCode: 'NVT',
    image: '/images/destinations/florianopolis.jpg',
    magicBadge: '🎢 Capital dos Parques Temáticos & Diversão',
    vibe: 'Beto Carrero World, Teleférico & Arranha-céus à Beira-Mar',
    keywords: ['balneario camboriu', 'balneário', 'beto carrero', 'beto carrero world', 'parque de diversoes', 'parques', 'montanha russa', 'santa catarina', 'roda gigante', 'teleferico', 'criancas', 'filhos', 'familia', 'praia'],
    highlights: ['2 dias de diversão completa no Beto Carrero World', 'Passeio de teleférico panorâmico no Parque Unipraias', 'Passeio na roda-gigante FG Big Wheel com vista da baía', 'Praia de Laranjeiras com águas calmas e restaurantes'],
    defaultDays: 5,
    dailyBudget: 650,
    profile: 'Família & Diversão',
    foodSpecialty: 'Sequência de frutos do mar frescos e mariscos ao vinagrete',
    isDomestic: true,
    category: 'Nacionais em Alta'
  },
  {
    id: 'florianopolis',
    name: 'Florianópolis & Ilha da Magia',
    state: 'Santa Catarina',
    country: 'Brasil',
    airportCode: 'FLN',
    image: '/images/destinations/florianopolis.jpg',
    magicBadge: '🌊 Praias Encantadas, Dunas & Ostras Frescas',
    vibe: 'Jurerê Internacional, Lagoa da Conceição & Ilha do Campeche',
    keywords: ['florianopolis', 'florianópolis', 'floripa', 'ilha da magia', 'jurere', 'campeche', 'joaquina', 'lagoa da conceicao', 'surfe', 'ostras', 'santa catarina', 'praias sul'],
    highlights: ['Passeio de barco até a paradisíaca Ilha do Campeche', 'Sandboard nas dunas da Praia da Joaquina', 'Alta gastronomia e beach clubs em Jurerê Internacional', 'Degustação de ostras frescas na beira da Lagoa da Conceição'],
    defaultDays: 6,
    dailyBudget: 680,
    profile: 'Praias & Sofisticação',
    foodSpecialty: 'Ostras gratinadas e sequência de camarão na moranga',
    isDomestic: true,
    category: 'Praias Paradisíacas'
  },
  {
    id: 'camposdojordao',
    name: 'Campos do Jordão',
    state: 'São Paulo',
    country: 'Brasil',
    airportCode: 'GRU',
    image: '/images/destinations/camposdojordao.jpg',
    magicBadge: '🌲 A Suíça Brasileira & Clima de Montanha',
    vibe: 'Vila Capivari, Fondues na Lareira & Cervejarias Artesanais',
    keywords: ['campos do jordao', 'campos do jordão', 'suica brasileira', 'serra da mantiqueira', 'frio', 'fondue', 'inverno', 'lareira', 'chale', 'sao paulo', 'romantico', 'vinho', 'araucarias'],
    highlights: ['Passeio charmoso pela Vila Capivari com arquitetura europeia', 'Visita ao Parque Amantikir com jardins de vários países', 'Degustação na Cervejaria Baden Baden', 'Pôr do sol espetacular no Morro do Elefante'],
    defaultDays: 4,
    dailyBudget: 690,
    profile: 'Romântico & Charme',
    foodSpecialty: 'Fondue de queijos artesanais da serra, truta com pinhão e strudel de maçã',
    isDomestic: true,
    category: 'Gastronomia & Vinhos'
  },
  {
    id: 'manaus',
    name: 'Manaus & Floresta Amazônica',
    state: 'Amazonas',
    country: 'Brasil',
    airportCode: 'MAO',
    image: '/images/destinations/manaus.jpg',
    magicBadge: '🌿 O Pulmão do Planeta & Encontro das Águas',
    vibe: 'Selva Amazônica, Botos Cor-de-Rosa & Teatro Amazonas',
    keywords: ['manaus', 'amazonia', 'amazônia', 'floresta amazonica', 'encontro das aguas', 'teatro amazonas', 'botos', 'selva', 'indigenas', 'rio negro', 'rio solimoes', 'ecoturismo', 'natureza selvagem'],
    highlights: ['Navegação pelo espetacular Encontro das Águas dos Rios Negro e Solimões', 'Interação responsável com botos cor-de-rosa na natureza', 'Hospedagem em hotel de selva (jungle lodge) com focagem noturna', 'Visita guiada ao suntuoso Teatro Amazonas da Belle Époque'],
    defaultDays: 5,
    dailyBudget: 780,
    profile: 'Ecoturismo & Natureza',
    foodSpecialty: 'Tambaqui assado na brasa com pirão, tacacá tradicional e açaí puro',
    isDomestic: true,
    category: 'Ecoturismo'
  },
  {
    id: 'caldasnovas',
    name: 'Caldas Novas & Rio Quente',
    state: 'Goiás',
    country: 'Brasil',
    airportCode: 'CLV',
    image: '/images/destinations/caldasnovas.jpg',
    magicBadge: '♨️ Maior Estância Hidrotermal do Planeta',
    vibe: 'Piscinas de Águas Quentes Naturais & Hot Park',
    keywords: ['caldas novas', 'rio quente', 'hot park', 'aguas termais', 'piscinas quentes', 'estancia hidrotermal', 'familia', 'criancas', 'resort', 'relaxamento', 'goias'],
    highlights: ['Dias de relaxamento em piscinas hidrotermais aquecidas pela natureza', 'Praia do Cerrado com ondas e tobogãs no Hot Park', 'Mergulho ecológico no Parque Estadual da Serra de Caldas', 'Resorts com hidromassagem e entretenimento para todas as idades'],
    defaultDays: 5,
    dailyBudget: 490,
    profile: 'Família & Bem-Estar',
    foodSpecialty: 'Arroz com pequi tradicional goiano e peixes de água doce',
    isDomestic: true,
    category: 'Nacionais em Alta'
  },
  {
    id: 'chapadadiamantina',
    name: 'Chapada Diamantina',
    state: 'Bahia',
    country: 'Brasil',
    airportCode: 'SSA',
    image: '/images/destinations/jalapao.jpg',
    magicBadge: '⛰️ Cânions Sagrados, Grutas Azuis & Cachoeiras',
    vibe: 'Morro do Pai Inácio, Poço Azul & Cachoeira da Fumaça',
    keywords: ['chapada diamantina', 'poco azul', 'poço azul', 'morro do pai inacio', 'cachoeira da fumaca', 'lencois ba', 'trekking', 'cavernas', 'grutas', 'trilha', 'aventura', 'bahia interior'],
    highlights: ['Pôr do sol lendário no topo do Morro do Pai Inácio', 'Flutuação na água cristalina e azul do Poço Azul e Poço Encantado', 'Trilha até a monumental Cachoeira da Fumaça', 'Roteiro histórico pela cidadezinha colonial de Lençóis'],
    defaultDays: 6,
    dailyBudget: 620,
    profile: 'Ecoturismo & Aventura',
    foodSpecialty: 'Cortadinho de palma com carne de sol e doces caseiros da serra',
    isDomestic: true,
    category: 'Ecoturismo'
  },

  // --- MUNDO: AMÉRICA DO NORTE & CARIBE ---
  {
    id: 'orlando',
    name: 'Orlando & Parques Disney',
    state: 'Flórida',
    country: 'Estados Unidos',
    airportCode: 'MCO',
    image: '/images/destinations/orlando.jpg',
    magicBadge: '✨ O Reino Encantado da Disney & Aventura',
    vibe: 'Magic Kingdom, Epcot, Universal Studios & Harry Potter',
    keywords: ['orlando', 'disney', 'disney world', 'magic kingdom', 'epcot', 'universal', 'universal studios', 'harry potter', 'estados unidos', 'eua', 'florida', 'parques tematicos', 'criancas', 'personagens', 'familia', 'mickey', 'pateta', 'compras orlando', 'outlets'],
    highlights: ['Show de fogos no Castelo da Cinderela no Magic Kingdom', 'Mundo Mágico de Harry Potter e Beco Diagonal na Universal', 'Expedição espacial no Epcot e Hollywood Studios Star Wars', 'Compras nos maiores Premium Outlets dos Estados Unidos'],
    defaultDays: 8,
    dailyBudget: 1550,
    profile: 'Família & Diversão Máxima',
    foodSpecialty: 'Waffles temáticos do Mickey, carnes nobres americanas e guloseimas',
    isDomestic: false,
    category: 'Internacionais'
  },
  {
    id: 'cancun',
    name: 'Cancún & Riviera Maya',
    state: 'Quintana Roo',
    country: 'México',
    airportCode: 'CUN',
    image: '/images/destinations/cancun.jpg',
    magicBadge: '🌴 Mar do Caribe Turquesa & Civilização Maia',
    vibe: 'Resorts All-Inclusive, Cenotes Sagrados & Chichén Itzá',
    keywords: ['cancun', 'cancún', 'mexico', 'méxico', 'caribe', 'riviera maya', 'playa del carmen', 'chichen itza', 'cenotes', 'resort all inclusive', 'mar turquesa', 'ilha das mulheres', 'praia paradisiaca', 'mergulho caribe', 'lua de mel'],
    highlights: ['Relaxar nas praias de areia branca e mar azul-turquesa cristalino', 'Visita guiada à pirâmide maia de Chichén Itzá (Maravilha Mundial)', 'Mergulho refrescante nas águas sagradas dos Cenotes subterrâneos', 'Cruzeiro de catamarã com festa até Isla Mujeres'],
    defaultDays: 7,
    dailyBudget: 1350,
    profile: 'Praias & Resorts All-Inclusive',
    foodSpecialty: 'Tacos de peixe fresco na brasa, guacamole artesanal e margaritas',
    isDomestic: false,
    category: 'Internacionais'
  },
  {
    id: 'novayork',
    name: 'Nova York & Manhattan',
    state: 'Nova York',
    country: 'Estados Unidos',
    airportCode: 'JFK',
    image: '/images/destinations/novayork.jpg',
    magicBadge: '🗽 A Capital do Mundo, Broadway & Central Park',
    vibe: 'Times Square, Shows da Broadway, Museus & Compras',
    keywords: ['nova york', 'new york', 'manhattan', 'broadway', 'central park', 'times square', 'empire state', 'compras eua', 'musicais', 'soho', 'met', 'brooklyn', 'estatua da liberdade', 'alta gastronomia', 'metropole'],
    highlights: ['Assistir a um musical consagrado da Broadway à noite', 'Caminhada cênica pelo Central Park em qualquer estação', 'Vista cinematográfica no observatório de vidro The Edge ou Summit', 'Visita ao Metropolitan Museum of Art (Met) e Museu de História Natural'],
    defaultDays: 6,
    dailyBudget: 1850,
    profile: 'Metrópole & Cultura',
    foodSpecialty: 'Pastrami on rye tradicional, cheesecake nova-iorquino e steaks nobres',
    isDomestic: false,
    category: 'Internacionais'
  },

  // --- MUNDO: EUROPA ---
  {
    id: 'paris',
    name: 'Paris & Vale do Loire',
    state: 'Île-de-France',
    country: 'França',
    airportCode: 'CDG',
    image: '/images/destinations/paris.jpg',
    magicBadge: '🗼 A Cidade Luz, Castelos & Alta Gastronomia',
    vibe: 'Torre Eiffel, Museu do Louvre, Rio Sena & Disneyland Paris',
    keywords: ['paris', 'franca', 'frança', 'torre eiffel', 'louvre', 'rio sena', 'disneyland paris', 'castelos', 'vale do loire', 'gastronomia francesa', 'romance europa', 'bistros', 'versailles', 'museu', 'alta costura'],
    highlights: ['Subida ao topo da Torre Eiffel ao pôr do sol', 'Visita à Mona Lisa no Museu do Louvre e Jardins das Tulherias', 'Passeio de barco iluminado pelo Rio Sena com jantar gourmet', 'Magia com a família nos dois parques da Disneyland Paris'],
    defaultDays: 6,
    dailyBudget: 1400,
    profile: 'Romance & Cultura Clássica',
    foodSpecialty: 'Croissants de fermentação natural, confit de pato e vinhos de Bordeaux',
    isDomestic: false,
    category: 'Internacionais'
  },
  {
    id: 'londres',
    name: 'Londres & Reino Unido',
    state: 'Inglaterra',
    country: 'Reino Unido',
    airportCode: 'LHR',
    image: '/images/destinations/londres.jpg',
    magicBadge: '👑 Tradição Real, Big Ben & Museus Clássicos',
    vibe: 'London Eye, Palácio de Buckingham & Bairros Vibrantes',
    keywords: ['londres', 'london', 'inglaterra', 'reino unido', 'big ben', 'london eye', 'buckingham', 'palacio', 'museus', 'tamesis', 'cultura britanica', 'harry potter', 'pubs', 'europa'],
    highlights: ['Ver a troca da guarda no Palácio de Buckingham', 'Giro panorâmico na roda-gigante London Eye sobre o Rio Tâmisa', 'Museu Britânico e Museu de História Natural com entrada gratuita', 'Passeio pelos estúdios originais do Harry Potter'],
    defaultDays: 6,
    dailyBudget: 1600,
    profile: 'Cultura & História Real',
    foodSpecialty: 'Chá da tarde britânico tradicional com scones e fish and chips crocante',
    isDomestic: false,
    category: 'Internacionais'
  },
  {
    id: 'roma',
    name: 'Roma & Costa Amalfitana',
    state: 'Lácio & Campânia',
    country: 'Itália',
    airportCode: 'FCO',
    image: '/images/destinations/roma.jpg',
    magicBadge: '🍝 Doce Vida Italiana, Coliseu & Vilas Marítimas',
    vibe: 'Fontana di Trevi, Jantares em Trastevere & Penhascos de Positano',
    keywords: ['roma', 'italia', 'itália', 'coliseu', 'fontana di trevi', 'costa amalfitana', 'positano', 'amalfi', 'capri', 'massas', 'vinho italiano', 'dolce vita', 'vaticano', 'historia antiga', 'romantico'],
    highlights: ['Jogar uma moeda na Fontana di Trevi para selar o retorno', 'Caminhar dentro da grandiosidade milenar do Coliseu e Fórum Romano', 'Jantar romântico com massas artesanais nas ruelas de Trastevere', 'Passeio de barco contornando os penhascos coloridos de Positano e Capri'],
    defaultDays: 7,
    dailyBudget: 1450,
    profile: 'Romance & Gastronomia',
    foodSpecialty: 'Autêntica massa cacio e pepe, pizza napolitana e gelato de pistache',
    isDomestic: false,
    category: 'Internacionais'
  },
  {
    id: 'lisboa',
    name: 'Lisboa & Porto',
    state: 'Estremadura / Douro',
    country: 'Portugal',
    airportCode: 'LIS',
    image: '/images/destinations/lisboa.jpg',
    magicBadge: '🍷 Azulejos Dourados, Fado & Vinho do Porto',
    vibe: 'Pastéis de Belém, Elétrico de Alfama & Vale do Douro',
    keywords: ['lisboa', 'porto', 'portugal', 'pasteis de belem', 'alfama', 'eletrico', 'rio douro', 'vinho do porto', 'sintra', 'fado', 'bacalhau', 'europa acolhedora', 'castelos'],
    highlights: ['Degustar pastéis de nata quentinhos na histórica fábrica de Belém', 'Passeio no icônico Elétrico 28 pelas ladeiras de Alfama com fado', 'Navegação de barco rabelo entre as encostas de vinhedos do Rio Douro', 'Visita de conto de fadas ao Palácio da Pena no topo de Sintra'],
    defaultDays: 7,
    dailyBudget: 890,
    profile: 'Gastronomia & História',
    foodSpecialty: 'Bacalhau à lagareiro no azeite quente, pastéis de nata e vinho do Porto',
    isDomestic: false,
    category: 'Internacionais'
  },
  {
    id: 'santorini',
    name: 'Santorini & Atenas',
    state: 'Cíclades / Ática',
    country: 'Grécia',
    airportCode: 'JTR',
    image: '/images/destinations/santorini.jpg',
    magicBadge: '🇬🇷 Cúpulas Azuis, Mar Egeu & O Pôr do Sol de Oia',
    vibe: 'Casas Brancas na Caldeira Vulcânica & Berço da Filosofia',
    keywords: ['santorini', 'grecia', 'grécia', 'atenas', 'oia', 'cupulas azuis', 'casinhas brancas', 'ilhas gregas', 'mar egeu', 'acropole', 'por do sol romantico', 'lua de mel', 'praia europa'],
    highlights: ['Pôr do sol mais famoso do mundo visto dos terraços brancos de Oia', 'Cruzeiro de catamarã pela caldeira vulcânica com banho em fontes termais', 'Visita monumental à Acrópole e ao Partenon em Atenas', 'Praias vulcânicas de areia vermelha e preta'],
    defaultDays: 6,
    dailyBudget: 1550,
    profile: 'Romance & Cenários Cênicos',
    foodSpecialty: 'Salada grega com queijo feta fresco, souvlaki e frutos do mar grelhados',
    isDomestic: false,
    category: 'Internacionais'
  },

  // --- MUNDO: AMÉRICA DO SUL (NEVE, VINHO & AVENTURA) ---
  {
    id: 'bariloche',
    name: 'Bariloche & Patagônia',
    state: 'Río Negro',
    country: 'Argentina',
    airportCode: 'BRC',
    image: '/images/destinations/bariloche.jpg',
    magicBadge: '❄️ Cordilheira dos Andes, Neve & Chocolates',
    vibe: 'Esqui no Cerro Catedral, Lagos Glaciais & Lareiras',
    keywords: ['bariloche', 'patagonia', 'argentina', 'neve', 'esqui', 'esquiar', 'cerro catedral', 'chocolates', 'cordilheira', 'lagos andinos', 'inverno neve', 'frio andes', 'chale', 'fondue'],
    highlights: ['Aulas de esqui e snowboard nas pistas do Cerro Catedral', 'Passeio panorâmico pelo Circuito Chico e Cerro Campanario', 'Navegação pelas águas azuis do Lago Nahuel Huapi até Bosque de Arrayanes', 'Degustação das maiores chocolaterias artesanais da Rua Mitre'],
    defaultDays: 5,
    dailyBudget: 690,
    profile: 'Neve, Esqui & Inverno',
    foodSpecialty: 'Cordeiro patagônico assado na brasa, fondue e vinhos Malbec',
    isDomestic: false,
    category: 'Internacionais'
  },
  {
    id: 'santiago',
    name: 'Santiago & Vale Nevado',
    state: 'Região Metropolitana',
    country: 'Chile',
    airportCode: 'SCL',
    image: '/images/destinations/santiago.jpg',
    magicBadge: '🏔️ Neve nos Andes & Vinícolas de Renome',
    vibe: 'Estações de Esqui a 3.000m & Terroirs de Carménère',
    keywords: ['santiago', 'chile', 'vale nevado', 'esqui chile', 'cordilheira dos andes', 'atacama', 'deserto do atacama', 'vinicola concha y toro', 'colchagua', 'neve', 'esquiar', 'vinho chileno'],
    highlights: ['Bate-e-volta para esquiar no topo do Vale Nevado e Farellones', 'Degustação guiada na tradicional vinícola Concha y Toro e Santa Rita', 'Vista de 360° da cordilheira no mirante Sky Costanera', 'Passeio costeiro pelas charmosas Valparaíso e Viña del Mar'],
    defaultDays: 5,
    dailyBudget: 720,
    profile: 'Neve & Enoturismo',
    foodSpecialty: 'Empanadas de pino suculentas, centolla magalhânica e vinhos Carménère',
    isDomestic: false,
    category: 'Internacionais'
  },
  {
    id: 'cusco',
    name: 'Cusco & Machu Picchu',
    state: 'Cusco',
    country: 'Peru',
    airportCode: 'CUZ',
    image: '/images/destinations/cusco.jpg',
    magicBadge: '⛰️ Cidade Sagrada dos Incas & Mistérios Andinos',
    vibe: 'Machu Picchu nas Nuvens & Alta Gastronomia Peruana',
    keywords: ['cusco', 'machu picchu', 'peru', 'incas', 'vale sagrado', 'trilha inca', 'gastronomia peruana', 'lima', 'cordilheira', 'historia sagrada', 'maravilha do mundo'],
    highlights: ['Nascer do sol inesquecível sobre a cidadela de Machu Picchu', 'Viagem no trem panorâmico Vistadome margeando o Rio Urubamba', 'Exploração das muralhas de pedra ciclópicas de Sacsayhuamán', 'Degustação da mundialmente premiada culinária peruana'],
    defaultDays: 6,
    dailyBudget: 680,
    profile: 'História & Aventura Mística',
    foodSpecialty: 'Ceviche fresco com milho andino, lomo saltado e pisco sour clássico',
    isDomestic: false,
    category: 'Internacionais'
  },

  // --- MUNDO: ÁSIA & ORIENTE MÉDIO ---
  {
    id: 'kyoto',
    name: 'Quioto & Tóquio',
    state: 'Kansai / Kanto',
    country: 'Japão',
    airportCode: 'HND',
    image: '/images/destinations/kyoto.jpg',
    magicBadge: '🌸 Cerejeiras em Flor, Templos Zen & Futuro',
    vibe: 'Fushimi Inari, Floresta de Bambu, Shibuya & Trens-Bala',
    keywords: ['japao', 'japão', 'toquio', 'tóquio', 'quioto', 'kyoto', 'osaka', 'cerejeiras', 'sakura', 'shibuya', 'trem bala', 'templos budistas', 'anime', 'ramen', 'kaiseki', 'gueixas', 'asia'],
    highlights: ['Caminhar sob os milhares de toriis vermelhos de Fushimi Inari', 'Imersão zen na Floresta de Bambu de Arashiyama', 'Cruzar o cruzamento mais movimentado do planeta em Shibuya (Tóquio)', 'Piquenique tradicional de Hanami sob as cerejeiras floridas'],
    defaultDays: 8,
    dailyBudget: 1300,
    profile: 'Cultura Milenar & Tecnologia',
    foodSpecialty: 'Banquete kaiseki tradicional, ramen artesanal e carne de Wagyu A5',
    isDomestic: false,
    category: 'Internacionais'
  },
  {
    id: 'dubai',
    name: 'Dubai & Abu Dhabi',
    state: 'Emirados Árabes Unidos',
    country: 'Emirados Árabes',
    airportCode: 'DXB',
    image: '/images/destinations/dubai.jpg',
    magicBadge: '🏜️ Oásis Futurista, Burj Khalifa & Safári de Luxo',
    vibe: 'Maior Torre do Planeta, Safári nas Dunas & Ilhas Artificiais',
    keywords: ['dubai', 'abu dhabi', 'emirados arabes', 'burj khalifa', 'deserto', 'safari no deserto', 'luxo futurista', 'palma jumeirah', 'compras ouro', 'mesquita sheikh zayed', 'oriente medio'],
    highlights: ['Subida à torre mais alta do planeta no Burj Khalifa', 'Safári emocionante nas dunas vermelhas com jantar sob as estrelas', 'Visita à monumental Mesquita Sheikh Zayed em Abu Dhabi', 'Cruzeiro de iate particular pela marina de Dubai'],
    defaultDays: 6,
    dailyBudget: 1650,
    profile: 'Luxo & Modernidade',
    foodSpecialty: 'Cordeiro com especiarias árabes, mezze libanês e sobremesas folhadas de pistache',
    isDomestic: false,
    category: 'Internacionais'
  }
];

// Normalize accents, lowercase, clean punctuation
function normalizeStr(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Intelligent Dynamic AI Destination Suggestion Engine
 * Analyzes the user's freeform prompt across ALL of Brazil and ALL of the World.
 * Returns the Top 4 most relevant, diverse, non-repeating destination proposals.
 */
export function getAiDestinationSuggestions(prompt) {
  const normPrompt = normalizeStr(prompt || '');
  const parsed = parseTravelPrompt(prompt) || { days: 5, travelers: 2, profile: 'Conforto' };
  const requestedDays = parsed.days || 5;
  const requestedTravelers = parsed.travelers || 2;

  // Geographic preference filters
  const wantsOnlyBrazil = 
    normPrompt.includes('brasil') || 
    normPrompt.includes('nacional') || 
    normPrompt.includes('dentro do brasil') || 
    normPrompt.includes('sem passaporte') ||
    normPrompt.includes('nordeste') ||
    normPrompt.includes('minas') ||
    normPrompt.includes('sul do brasil');

  const wantsOnlyInternational = 
    normPrompt.includes('internacional') || 
    normPrompt.includes('exterior') || 
    normPrompt.includes('fora do brasil') || 
    normPrompt.includes('europa') || 
    normPrompt.includes('mundo') ||
    normPrompt.includes('asia') ||
    normPrompt.includes('america do norte') ||
    normPrompt.includes('eua');

  // Score each destination in the catalog
  const scoredDestinations = DESTINATION_DATABASE.map(dest => {
    let score = 0;
    const matchedTerms = [];

    const normName = normalizeStr(dest.name);
    const normCountry = normalizeStr(dest.country);
    const normState = normalizeStr(dest.state);

    // 1. Direct Destination / City / Country Mention (Massive Boost)
    if (normPrompt.includes(normName) || normName.includes(normPrompt)) {
      score += 1500;
      matchedTerms.push(dest.name);
    }
    if (normPrompt.includes(normCountry) && normCountry.length > 3) {
      score += 400;
      matchedTerms.push(dest.country);
    }
    if (normPrompt.includes(normState) && normState.length > 3) {
      score += 350;
      matchedTerms.push(dest.state);
    }

    // 2. Keyword Matching
    dest.keywords.forEach(kw => {
      const normKw = normalizeStr(kw);
      if (normPrompt.includes(normKw)) {
        score += 80;
        matchedTerms.push(kw);
      }
    });

    // 3. Category & Theme Intent Boosts
    // Theme: Snow & Winter
    const isSnowPrompt = normPrompt.includes('neve') || normPrompt.includes('esqui') || normPrompt.includes('frio') || normPrompt.includes('inverno') || normPrompt.includes('montanha');
    const isSnowDest = dest.keywords.includes('neve') || dest.keywords.includes('esqui');
    if (isSnowPrompt && isSnowDest) {
      score += 500;
    }

    // Theme: Theme Parks & Disney & Kids
    const isParkPrompt = normPrompt.includes('disney') || normPrompt.includes('parque') || normPrompt.includes('crianca') || normPrompt.includes('filho') || normPrompt.includes('diversao');
    const isParkDest = dest.keywords.includes('disney') || dest.keywords.includes('parques') || dest.keywords.includes('parque de diversoes');
    if (isParkPrompt && isParkDest) {
      score += 500;
    }

    // Theme: Tropical Beaches & Caribbean
    const isBeachPrompt = normPrompt.includes('praia') || normPrompt.includes('mar') || normPrompt.includes('sol') || normPrompt.includes('piscinas naturais') || normPrompt.includes('caribe') || normPrompt.includes('agua morna');
    const isBeachDest = dest.category === 'Praias Paradisíacas' || dest.keywords.includes('mar') || dest.keywords.includes('praia');
    if (isBeachPrompt && isBeachDest) {
      score += 450;
    }

    // Theme: Wine & Gastronomy
    const isWinePrompt = normPrompt.includes('vinho') || normPrompt.includes('vinicola') || normPrompt.includes('gastronomia') || normPrompt.includes('fondue') || normPrompt.includes('degustacao');
    const isWineDest = dest.keywords.includes('vinho') || dest.keywords.includes('vinhedo') || dest.keywords.includes('vinicola');
    if (isWinePrompt && isWineDest) {
      score += 400;
    }

    // Theme: Ecotourism & Nature
    const isEcoPrompt = normPrompt.includes('ecoturismo') || normPrompt.includes('trilha') || normPrompt.includes('cachoeira') || normPrompt.includes('natureza') || normPrompt.includes('flutuacao');
    const isEcoDest = dest.category === 'Ecoturismo' || dest.keywords.includes('ecoturismo') || dest.keywords.includes('flutuacao');
    if (isEcoPrompt && isEcoDest) {
      score += 450;
    }

    // Theme: Romance & Couple
    const isRomancePrompt = normPrompt.includes('romantico') || normPrompt.includes('casal') || normPrompt.includes('lua de mel') || normPrompt.includes('a dois') || normPrompt.includes('intimista');
    const isRomanceDest = dest.keywords.includes('romantico') || dest.keywords.includes('lua de mel');
    if (isRomancePrompt && isRomanceDest) {
      score += 350;
    }

    // Theme: History & Classic Culture
    const isHistoryPrompt = normPrompt.includes('historia') || normPrompt.includes('museu') || normPrompt.includes('templo') || normPrompt.includes('castelo') || normPrompt.includes('cultura');
    const isHistoryDest = dest.keywords.includes('museu') || dest.keywords.includes('templos budistas') || dest.keywords.includes('castelos');
    if (isHistoryPrompt && isHistoryDest) {
      score += 400;
    }

    // Theme: Shopping & Metropolis
    const isShoppingPrompt = normPrompt.includes('compras') || normPrompt.includes('shopping') || normPrompt.includes('broadway') || normPrompt.includes('metropole') || normPrompt.includes('outlets');
    const isShoppingDest = dest.keywords.includes('compras') || dest.keywords.includes('broadway') || dest.keywords.includes('metropole');
    if (isShoppingPrompt && isShoppingDest) {
      score += 400;
    }

    // 4. Geographic Filtering Penalties / Boosts
    if (wantsOnlyBrazil) {
      if (dest.isDomestic) score += 300;
      else score -= 800;
    }
    if (wantsOnlyInternational) {
      if (!dest.isDomestic) score += 300;
      else score -= 800;
    }

    return {
      ...dest,
      computedScore: score,
      matchedTerms: [...new Set(matchedTerms)]
    };
  });

  // Sort by score descending
  scoredDestinations.sort((a, b) => b.computedScore - a.computedScore);

  // Take top 4 distinct destinations
  let topPicks = scoredDestinations.slice(0, 4);

  // If score is zero for all (e.g. empty or unrecognized prompt), provide 4 balanced global & national gems
  if (topPicks[0].computedScore === 0) {
    topPicks = [
      DESTINATION_DATABASE.find(d => d.id === 'gramado'),
      DESTINATION_DATABASE.find(d => d.id === 'orlando'),
      DESTINATION_DATABASE.find(d => d.id === 'maragogi'),
      DESTINATION_DATABASE.find(d => d.id === 'paris')
    ];
  }

  // Format into final rich AI proposal cards
  return topPicks.map(dest => {
    // Dynamic budget calculation based on days & travelers
    const days = requestedDays || dest.defaultDays || 5;
    const travelers = requestedTravelers || 2;
    const minBudget = Math.round(dest.dailyBudget * days * travelers * 0.88);
    const maxBudget = Math.round(dest.dailyBudget * days * travelers * 1.28);

    // Dynamic contextual whyMatches text that refers back to what the user wrote
    let customWhy = '';
    if (dest.matchedTerms && dest.matchedTerms.length > 0) {
      const topTerms = dest.matchedTerms.slice(0, 3).join(', ');
      customWhy = `Selecionado sob medida para o seu pedido com foco em ${topTerms}! `;
    } else {
      customWhy = 'Uma recomendação encantadora com curadoria da nossa IA para o seu estilo de viagem! ';
    }

    // Append specific highlight explanation
    if (dest.id === 'orlando') {
      customWhy += 'O maior polo de entretenimento e parques mágicos do mundo para criar memórias inesquecíveis.';
    } else if (dest.id === 'bariloche') {
      customWhy += 'Cenário andino espetacular com neve, pistas de esqui no Cerro Catedral e gastronomia alpina aquecida por lareiras.';
    } else if (dest.id === 'santiago') {
      customWhy += 'Excelente combinação entre o esqui na Cordilheira dos Andes e as vinícolas premiadas do Chile.';
    } else if (dest.id === 'cancun') {
      customWhy += 'Águas caribenhas turquesa inigualáveis, resorts all-inclusive de alto padrão e a história fascinante dos maias.';
    } else if (dest.id === 'maragogi') {
      customWhy += 'Piscinas naturais de águas mornas e transparentes com segurança e calmaria total.';
    } else if (dest.id === 'noronha') {
      customWhy += 'Santuário marinho de preservação com as praias mais bem avaliadas do planeta e vida marinha pura.';
    } else if (dest.id === 'kyoto') {
      customWhy += 'A imersão mágica na cultura milenar japonesa, templos zen preservados e o espetáculo da florada das cerejeiras.';
    } else if (dest.id === 'bonito') {
      customWhy += 'Flutuação em rios com visibilidade perfeita de aquário e cachoeiras exuberantes no coração do ecoturismo.';
    } else if (dest.id === 'jalapao') {
      customWhy += 'Uma expedição 4x4 única pelos fervedouros de água cristalina e dunas douradas do cerrado.';
    } else if (dest.id === 'londres') {
      customWhy += 'O charme da realeza britânica, Big Ben, museus mundialmente famosos e rica cena cultural.';
    } else if (dest.id === 'novayork') {
      customWhy += 'A energia contagiante de Manhattan com musicais da Broadway, Central Park e restaurantes icônicos.';
    } else if (dest.id === 'dubai') {
      customWhy += 'O futuro no presente: arranha-céus arrojados, safáris privativos nas dunas e experiências de alto luxo.';
    } else if (dest.id === 'santorini') {
      customWhy += 'Cenário de conto de fadas no Mar Egeu com cúpulas azuis e o pôr do sol mais aplaudido da Europa.';
    } else if (dest.id === 'lisboa') {
      customWhy += 'Acolhimento caloroso, miradouros sobre o Tejo, fado nas vielas e degustação de vinhos nobres no Douro.';
    } else if (dest.id === 'paris') {
      customWhy += 'A quintessência do romance e da arte mundial, unindo a Torre Eiffel, museus imortais e castelos.';
    } else if (dest.id === 'gramado') {
      customWhy += 'O refúgio de serra mais charmoso do Brasil, com fondues premiados, parques temáticos e vinhedos.';
    } else {
      customWhy += dest.vibe + ' — perfeito para o seu período de ' + days + ' dias.';
    }

    return {
      id: dest.id,
      name: dest.name,
      state: dest.state,
      country: dest.country,
      airportCode: dest.airportCode,
      image: dest.image,
      magicBadge: dest.magicBadge,
      vibe: dest.vibe,
      whyMatches: customWhy,
      highlights: dest.highlights,
      recommendedDays: days,
      estimatedBudget: `R$ ${minBudget.toLocaleString('pt-BR')} - R$ ${maxBudget.toLocaleString('pt-BR')}`,
      dailyBudget: dest.dailyBudget,
      profile: dest.profile,
      foodSpecialty: dest.foodSpecialty
    };
  });
}
