// AI Destination Suggestion Engine for VOYAGER AI (Disney Experience)
import { DESTINATIONS } from '../data/destinations';
import { parseTravelPrompt } from '../utils/nlpParser';

export function getAiDestinationSuggestions(prompt) {
  const lower = (prompt || '').toLowerCase();
  const parsed = parseTravelPrompt(prompt);

  // 1. FAMILY & PARKS & KIDS
  if (
    lower.includes('família') || 
    lower.includes('familia') || 
    lower.includes('criança') || 
    lower.includes('crianca') || 
    lower.includes('parque') || 
    lower.includes('disney') || 
    lower.includes('diversão') ||
    lower.includes('diversao') ||
    lower.includes('brinquedo')
  ) {
    return [
      {
        id: 'gramado',
        name: 'Gramado & Canela',
        state: 'Rio Grande do Sul',
        country: 'Brasil',
        airportCode: 'POA',
        image: '/images/destinations/gramado.jpg',
        magicBadge: '🏰 Reino da Fantasia & Parques',
        vibe: 'Mini Mundo, Snowland, Reino do Chocolate & Vila da Mônica',
        whyMatches: 'O destino brasileiro mais mágico para famílias! Conta com parques temáticos indoor, neve de verdade no Snowland, fábricas de chocolate artesanal e o encantador Mini Mundo.',
        highlights: ['Parque Snowland (Neve real)', 'Mini Mundo com miniaturas vivas', 'Vila da Mônica Gramado', 'Catedral de Pedra de Canela'],
        recommendedDays: parsed.days || 5,
        estimatedBudget: 'R$ 5.200 - R$ 6.800',
        dailyBudget: 620,
        profile: 'Família & Conforto',
        foodSpecialty: 'Rodízio de fondue suíço e café colonial farto'
      },
      {
        id: 'foz',
        name: 'Foz do Iguaçu',
        state: 'Paraná',
        country: 'Brasil',
        airportCode: 'IGU',
        image: '/images/destinations/foz.jpg',
        magicBadge: '🦜 Aventura Selvagem & Maravilha Mundial',
        vibe: 'Cataratas do Iguaçu, Parque das Aves & Safari de Barco',
        whyMatches: 'Uma das 7 Maravilhas Naturais do Planeta! Perfeito para encantar crianças e adultos com o imenso viveiro de aves tropicais, safáris de barco pelo rio e o Parque dos Dinossauros.',
        highlights: ['Passarelas das Cataratas do Iguaçu', 'Parque das Aves (Imersão com araras)', 'Macuco Safari no Rio Iguaçu', 'Vale dos Dinossauros'],
        recommendedDays: parsed.days || 4,
        estimatedBudget: 'R$ 4.200 - R$ 5.600',
        dailyBudget: 520,
        profile: 'Família & Conforto',
        foodSpecialty: 'Parrillada argentina na fronteira e peixes do Rio Paraná'
      },
      {
        id: 'paris',
        name: 'Paris & Vale do Loire',
        state: 'Île-de-France',
        country: 'França',
        airportCode: 'CDG',
        image: '/images/destinations/paris.jpg',
        magicBadge: '🎠 Castelos Reais & Magia da Disneyland Paris',
        vibe: 'Disneyland Paris, Torre Eiffel Iluminada & Castelo de Cinderela',
        whyMatches: 'O sonho de viver a magia da Disneyland Paris combinada com a vista deslumbrante do alto da Torre Eiffel, cruzeiros de barco no Rio Sena e castelos de contos de fadas.',
        highlights: ['Disneyland Paris (2 parques temáticos)', 'Torre Eiffel com subida ao topo', 'Cruzeiro com almoço no Rio Sena', 'Castelo de Chambord no Vale do Loire'],
        recommendedDays: parsed.days || 7,
        estimatedBudget: 'R$ 16.000 - R$ 22.000',
        dailyBudget: 1100,
        profile: 'Família & Conforto',
        foodSpecialty: 'Crepes franceses tradicionais, croissants e patisserie artesanal'
      },
      {
        id: 'maragogi',
        name: 'Maragogi & Costa dos Corais',
        state: 'Alagoas',
        country: 'Brasil',
        airportCode: 'MCZ',
        image: '/images/destinations/maragogi.jpg',
        magicBadge: '🐠 Aquário Natural de Águas Cristalinas',
        vibe: 'Piscinas Naturais Mornas, Galés & Passeios de Catamarã',
        whyMatches: 'Mar calmo como uma piscina sem ondas e com águas mornas cristalinas. As crianças nadam com peixinhos coloridos nos arrecifes de corais com segurança total.',
        highlights: ['Galés de Maragogi em maré baixa', 'Passeio de Catamarã até as piscinas', 'Praia de Antunes com coqueiros', 'Mergulho com snorkel e peixes'],
        recommendedDays: parsed.days || 5,
        estimatedBudget: 'R$ 4.800 - R$ 6.200',
        dailyBudget: 560,
        profile: 'Família & Conforto',
        foodSpecialty: 'Peixada alagoana ao leite de coco e bolo de goma de Maragogi'
      }
    ];
  }

  // 2. ROMANTIC, COUPLE, WINE, COLD, SERRA
  if (
    lower.includes('romântico') || 
    lower.includes('romantico') || 
    lower.includes('casal') || 
    lower.includes('vinho') || 
    lower.includes('vinhos') || 
    lower.includes('frio') || 
    lower.includes('serra') || 
    lower.includes('neve') || 
    lower.includes('chalé') ||
    lower.includes('chale') ||
    lower.includes('fondue')
  ) {
    return [
      {
        id: 'gramado',
        name: 'Gramado & Canela',
        state: 'Rio Grande do Sul',
        country: 'Brasil',
        airportCode: 'POA',
        image: '/images/destinations/gramado.jpg',
        magicBadge: '🏰 Conto de Fadas da Serra & Lareiras',
        vibe: 'Chalés Alpinos, Degustação de Vinhos & Jantares Intimistas',
        whyMatches: 'O destino romântico número 1 do Brasil! Ruas arborizadas com hortênsias, bistrôs à luz de velas na Rua Coberta, fondues premiados e passeios apaixonantes pelo Lago Negro.',
        highlights: ['Passeio de pedalinho no Lago Negro', 'Degustação no Vale dos Vinhedos', 'Jantar romântico com fondue suíço', 'Catedral de Pedra iluminada'],
        recommendedDays: parsed.days || 4,
        estimatedBudget: 'R$ 4.500 - R$ 6.000',
        dailyBudget: 620,
        profile: 'Romântico & Intimista',
        foodSpecialty: 'Sequência de fondue de queijos nobres e chocolate artesanal'
      },
      {
        id: 'paris',
        name: 'Paris & Vale do Loire',
        state: 'Île-de-France',
        country: 'França',
        airportCode: 'CDG',
        image: '/images/destinations/paris.jpg',
        magicBadge: '🗼 A Capital Mundial do Romance',
        vibe: 'Cruzeiro no Sena, Museus Icônicos & Jantares Estrelados',
        whyMatches: 'A quintessência do romance mundial. Caminhar de mãos dadas pelas margens do Sena, brindar com champanhe com vista para a Torre Eiffel e explorar os castelos do Vale do Loire.',
        highlights: ['Jantar iluminado no Rio Sena', 'Piquenique aos pés da Torre Eiffel', 'Degustação de queijos e vinhos em Montmartre', 'Palácio de Versalhes'],
        recommendedDays: parsed.days || 6,
        estimatedBudget: 'R$ 15.000 - R$ 20.000',
        dailyBudget: 1100,
        profile: 'Romântico & Intimista',
        foodSpecialty: 'Magret de canard, tábua de queijos AOC e vinhos de Bordeaux'
      },
      {
        id: 'noronha',
        name: 'Fernando de Noronha',
        state: 'Pernambuco',
        country: 'Brasil',
        airportCode: 'FEN',
        image: '/images/destinations/noronha.jpg',
        magicBadge: '🐬 Santuário Afrodisíaco & Pôr do Sol no Mar',
        vibe: 'Pousadas de Charme, Praias Exclusivas & Golfinhos Livres',
        whyMatches: 'Para casais que buscam natureza intocada e praias eleitas entre as mais bonitas do mundo. Pousadas intimistas exclusivas, pôr do sol inesquecível no Boldró e águas azuis cristalinas.',
        highlights: ['Pôr do sol com música no Mirante do Boldró', 'Mergulho guiado na Baía do Sancho', 'Passeio de barco privativo com golfinhos', 'Jantar à luz de velas pé na areia'],
        recommendedDays: parsed.days || 5,
        estimatedBudget: 'R$ 11.000 - R$ 14.500',
        dailyBudget: 1250,
        profile: 'Romântico & Intimista',
        foodSpecialty: 'Peixe na folha de bananeira e carpaccio de polvo fresco'
      },
      {
        id: 'roma',
        name: 'Roma & Costa Amalfitana',
        state: 'Lazio & Campânia',
        country: 'Itália',
        airportCode: 'FCO',
        image: '/images/destinations/roma.jpg',
        magicBadge: '🍝 Doce Vida Italiana & Vilas à Beira-Mar',
        vibe: 'Fontana di Trevi, Jantares em Trastevere & Penhascos de Positano',
        whyMatches: 'Jogar uma moeda juntos na Fontana di Trevi para selar o amor, saborear massas artesanais com vinho toscano e desfrutar do cenário cinematográfico da Costa Amalfitana.',
        highlights: ['Noite mágica na Fontana di Trevi', 'Jantar artesanal em Trastevere', 'Passeio de barco em Positano e Amalfi', 'Coliseu iluminado'],
        recommendedDays: parsed.days || 6,
        estimatedBudget: 'R$ 14.000 - R$ 18.500',
        dailyBudget: 980,
        profile: 'Romântico & Intimista',
        foodSpecialty: 'Massa cacio e pepe tradicional e gelato artesanal de pistache'
      }
    ];
  }

  // 3. BEACHES, SUN, CARIBBEAN, NORDESTE
  if (
    lower.includes('praia') || 
    lower.includes('mar') || 
    lower.includes('sol') || 
    lower.includes('nordeste') || 
    lower.includes('verão') || 
    lower.includes('verao') || 
    lower.includes('mergulho') ||
    lower.includes('ilha') ||
    lower.includes('litoral')
  ) {
    return [
      {
        id: 'noronha',
        name: 'Fernando de Noronha',
        state: 'Pernambuco',
        country: 'Brasil',
        airportCode: 'FEN',
        image: '/images/destinations/noronha.jpg',
        magicBadge: '🐬 Paraíso Mundial das Águas Turquesa',
        vibe: 'Baía do Sancho, Morro Dois Irmãos & Vida Marinha Intocada',
        whyMatches: 'Eleita repetidas vezes a praia mais bonita do mundo! Águas cristalinas com mais de 40 metros de visibilidade para nadar com tartarugas, raias e golfinhos.',
        highlights: ['Baía do Sancho (Praia nº 1 do Mundo)', 'Baía dos Porcos com o Morro Dois Irmãos', 'Snorkel na Praia do Porto', 'Pôr do Sol no Mirante do Boldró'],
        recommendedDays: parsed.days || 5,
        estimatedBudget: 'R$ 9.800 - R$ 13.500',
        dailyBudget: 1250,
        profile: 'Praias Paradisíacas',
        foodSpecialty: 'Tartar de atum fresco e polvo grelhado com ervas'
      },
      {
        id: 'lencois',
        name: 'Lençóis Maranhenses',
        state: 'Maranhão',
        country: 'Brasil',
        airportCode: 'SLZ',
        image: '/images/destinations/lencois.jpg',
        magicBadge: '✨ Oásis Sagrado no Meio das Dunas Brancas',
        vibe: 'Lagoas Cristalinas de Água Doce & Dunas Ondulantes',
        whyMatches: 'Um dos cenários mais espetaculares e surreais da Terra! Quilômetros de dunas brancas imaculadas intercaladas por lagoas de água doce azul e verde esmeralda.',
        highlights: ['Circuito da Lagoa Bonita', 'Lagoa Azul com águas calmas', 'Povoado rústico e praiano de Atins', 'Passeio de voadeira pelo Rio Preguiças'],
        recommendedDays: parsed.days || 4,
        estimatedBudget: 'R$ 4.200 - R$ 5.800',
        dailyBudget: 750,
        profile: 'Ecoturismo & Natureza',
        foodSpecialty: 'Camarão grelhado de água doce com arroz de cuxá'
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
        whyMatches: 'Águas rasas cristalinas e calmas no maior trecho de barreiras de corais da América do Sul. Perfeito para relaxar com bebidas tropicais e passear de catamarã.',
        highlights: ['Mergulho nas Galés de Maragogi', 'Praia de Antunes com banco de areia', 'Passeio de buggy pelas falésias', 'Piscinas de Taoca'],
        recommendedDays: parsed.days || 5,
        estimatedBudget: 'R$ 4.100 - R$ 5.500',
        dailyBudget: 560,
        profile: 'Praias Paradisíacas',
        foodSpecialty: 'Moqueca alagoana de lagosta e água de coco fresca'
      },
      {
        id: 'rio',
        name: 'Rio de Janeiro',
        state: 'Rio de Janeiro',
        country: 'Brasil',
        airportCode: 'GIG',
        image: '/images/destinations/rio.jpg',
        magicBadge: '🏖️ A Cidade Maravilhosa & Bossa Nova',
        vibe: 'Copacabana, Ipanema, Cristo Redentor & Pão de Açúcar',
        whyMatches: 'A fusão inigualável entre praias de fama planetária e montanhas cobertas por floresta tropical. Aprecie o visual do Arpoador e a efervescência carioca.',
        highlights: ['Pôr do sol cinematográfico no Arpoador', 'Praias de Ipanema e Leblon', 'Cristo Redentor no Corcovado', 'Bondinho do Pão de Açúcar'],
        recommendedDays: parsed.days || 5,
        estimatedBudget: 'R$ 4.200 - R$ 5.900',
        dailyBudget: 580,
        profile: 'Nacionais em Alta',
        foodSpecialty: 'Feijoada carioca tradicional e caipirinha de limão galego'
      }
    ];
  }

  // 4. ADVENTURE & ECOTOURISM
  if (
    lower.includes('aventura') || 
    lower.includes('ecoturismo') || 
    lower.includes('trilha') || 
    lower.includes('natureza') || 
    lower.includes('cachoeira') || 
    lower.includes('jalapão') ||
    lower.includes('jalapao')
  ) {
    return [
      {
        id: 'lencois',
        name: 'Lençóis Maranhenses',
        state: 'Maranhão',
        country: 'Brasil',
        airportCode: 'SLZ',
        image: '/images/destinations/lencois.jpg',
        magicBadge: '🏜️ Aventura Mágica em Dunas e Lagoas',
        vibe: 'Travessia de 4x4, Lagoas Naturais & Pôr do Sol nas Alturas',
        whyMatches: 'Uma expedição inesquecível pelo maior campo de dunas da América do Sul com banhos revigorantes em lagoas puríssimas.',
        highlights: ['Expedição de 4x4 pelas dunas', 'Lagoa da Esperança', 'Kitesurf em Atins', 'Descida de boia no Rio Formiga'],
        recommendedDays: parsed.days || 5,
        estimatedBudget: 'R$ 4.500 - R$ 6.200',
        dailyBudget: 750,
        profile: 'Ecoturismo & Natureza',
        foodSpecialty: 'Peixada maranhense com pirão e camarão seco'
      },
      {
        id: 'foz',
        name: 'Foz do Iguaçu',
        state: 'Paraná',
        country: 'Brasil',
        airportCode: 'IGU',
        image: '/images/destinations/foz.jpg',
        magicBadge: '⚡ A Força Brutal da Natureza',
        vibe: 'Cataratas do Iguaçu, Macuco Safari & Trilha do Poço Preto',
        whyMatches: 'Sinta a vibração e o estrondo das quedas d’água mais impressionantes da Terra, com banho de barco embaixo das cataratas e trilhas ecológicas.',
        highlights: ['Passeio de barco Macuco Safari sob as quedas', 'Trilha das Cataratas lado brasileiro e argentino', 'Voo de helicóptero sobre o cânion', 'Parque das Aves'],
        recommendedDays: parsed.days || 4,
        estimatedBudget: 'R$ 3.800 - R$ 5.200',
        dailyBudget: 520,
        profile: 'Ecoturismo & Natureza',
        foodSpecialty: 'Dourado assado no espeto de bambu'
      },
      {
        id: 'noronha',
        name: 'Fernando de Noronha',
        state: 'Pernambuco',
        country: 'Brasil',
        airportCode: 'FEN',
        image: '/images/destinations/noronha.jpg',
        magicBadge: '🐬 Paraíso dos Mergulhadores',
        vibe: 'Trilhas do Parque Nacional, Snorkel & Morro do Pico',
        whyMatches: 'O melhor ponto de mergulho autônomo e snorkel do Atlântico Sul, com piscinas naturais de maré repletas de tubarões-lixa dóceis e corais vivos.',
        highlights: ['Trilha da Atalaia com piscina natural', 'Mergulho de cilindro no naufrágio do Porto', 'Caminhada histórica pela Vila dos Remédios', 'Mirante da Baía dos Porcos'],
        recommendedDays: parsed.days || 5,
        estimatedBudget: 'R$ 9.800 - R$ 13.000',
        dailyBudget: 1250,
        profile: 'Ecoturismo & Natureza',
        foodSpecialty: 'Moqueca de peixe com farofa de banana da terra'
      }
    ];
  }

  // 5. DEFAULT BALANCED PICKS (DISNEY STYLE CURATED SELECTION)
  return [
    {
      id: 'gramado',
      name: 'Gramado & Canela',
      state: 'Rio Grande do Sul',
      country: 'Brasil',
      airportCode: 'POA',
      image: '/images/destinations/gramado.jpg',
      magicBadge: '🏰 Magia da Serra & Conto de Fadas',
      vibe: 'Chalés Alpinos, Neve no Snowland & Vinhedos Premiados',
      whyMatches: 'Um verdadeiro parque de encantos europeus no sul do Brasil. Clima aconchegante, gastronomia farta, bistrôs iluminados e passeios inesquecíveis.',
      highlights: ['Lago Negro com pedalinhos de cisne', 'Snowland com neve real e patinação', 'Sequência de fondue suíço', 'Vale dos Vinhedos'],
      recommendedDays: parsed.days || 5,
      estimatedBudget: 'R$ 4.600 - R$ 6.200',
      dailyBudget: 620,
      profile: parsed.profile || 'Gastronômico & Charme',
      foodSpecialty: 'Galeto al primo canto e fondue artesanal'
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
      whyMatches: 'Uma das maiores joias ecológicas do planeta Terra. Águas azul-turquesa cristalinas, mergulho paradisíaco e contato direto com a vida marinha pura.',
      highlights: ['Baía do Sancho com areias douradas', 'Morro Dois Irmãos e Baía dos Porcos', 'Passeio de barco ao nascer do sol', 'Pôr do Sol no Boldró'],
      recommendedDays: parsed.days || 5,
      estimatedBudget: 'R$ 10.500 - R$ 14.000',
      dailyBudget: 1250,
      profile: 'Praias Paradisíacas',
      foodSpecialty: 'Frutos do mar frescos na folha de bananeira'
    },
    {
      id: 'paris',
      name: 'Paris & Vale do Loire',
      state: 'Île-de-France',
      country: 'França',
      airportCode: 'CDG',
      image: '/images/destinations/paris.jpg',
      magicBadge: '🗼 Cidade Luz & Castelos Encantados',
      vibe: 'Disneyland Paris, Torre Eiffel & Museus Mundiais',
      whyMatches: 'A experiência internacional mais mágica que existe. Combine as atrações imortais de Paris com os castelos do Vale do Loire ou a Disneyland.',
      highlights: ['Torre Eiffel cintilante à noite', 'Museu do Louvre e Jardim das Tulherias', 'Disneyland Paris temática', 'Passeio no Rio Sena'],
      recommendedDays: parsed.days || 6,
      estimatedBudget: 'R$ 14.500 - R$ 19.500',
      dailyBudget: 1100,
      profile: 'Luxo & Exclusividade',
      foodSpecialty: 'Croissants amanteigados, queijos e alta gastronomia'
    },
    {
      id: 'lencois',
      name: 'Lençóis Maranhenses',
      state: 'Maranhão',
      country: 'Brasil',
      airportCode: 'SLZ',
      image: '/images/destinations/lencois.jpg',
      magicBadge: '✨ Oásis Sagrado de Dunas & Lagoas',
      vibe: 'Dunas de Areia Branca & Lagoas de Água Doce Turquesa',
      whyMatches: 'Um espetáculo visual que parece saído de um filme de fantasia. Dunas infinitas e banhos revigorantes em lagoas calmas de água doce.',
      highlights: ['Circuito Lagoa Bonita ao entardecer', 'Passeio de 4x4 pelas dunas', 'Povoado charmoso de Atins', 'Lagoa Azul'],
      recommendedDays: parsed.days || 4,
      estimatedBudget: 'R$ 4.200 - R$ 5.800',
      dailyBudget: 750,
      profile: 'Ecoturismo & Natureza',
      foodSpecialty: 'Camarão grelhado na brasa e arroz de cuxá'
    }
  ];
}
