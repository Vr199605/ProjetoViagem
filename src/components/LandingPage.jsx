import React, { useState } from 'react';
import { 
  Compass, Sparkles, Plane, Building2, Package, ShieldCheck, Check, X, 
  ChevronDown, ArrowRight, ExternalLink, Award, TrendingDown, Layers, 
  Globe, Users, Calendar, Search, HelpCircle, FileText, Zap, Luggage, Star
} from 'lucide-react';
import { CONFIG } from '../config';

export default function LandingPage({ onEnterPlatform }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const FAQ_ITEMS = [
    {
      q: 'O que é o VOYAGER AI e por que ele é diferente de outros buscadores?',
      a: 'O VOYAGER AI é o primeiro ecossistema universal que unifica, em uma única tela, a comparação em tempo real dos maiores metabuscadores (Google Flights, Skyscanner, Decolar, 123 Milhas, MaxMilhas, Kayak) com 20 companhias aéreas oficiais e 7 operadoras de pacotes turísticos. Além disso, conta com um motor de Inteligência Artificial generativa que monta o roteiro dia a dia sob medida e exporta um guia completo em PDF para uso offline.'
    },
    {
      q: 'Como funciona o redirecionamento direto sem precisar redigitar as informações?',
      a: 'Em sites convencionais, ao clicar em um link parceiro, você frequentemente cai em uma página genérica e precisa digitar novamente sua origem, destino, datas e quantidade de adultos. No VOYAGER AI, nossos links utilizam deep links diretos avançados. Ao clicar no botão de qualquer companhia ou plataforma, você é encaminhado diretamente para a tela de resultados com a rota, datas e passageiros já preenchidos.'
    },
    {
      q: 'Por que o VOYAGER AI exibe 20 companhias aéreas oficiais além dos comparadores?',
      a: 'Muitas vezes, comprar direto na companhia aérea oficial garante vantagens exclusivas como acúmulo integral de milhas no programa de fidelidade, franquia de bagagem garantida, ausência de taxas de intermediação de agências e suporte prioritário em caso de alteração de voo. O VOYAGER AI dá liberdade total para você escolher se prefere a agência consolidadora ou a companhia oficial (como LATAM, GOL, Azul, TAP, Air France, Emirates e outras).'
    },
    {
      q: 'Como funciona o filtro de mala despachada (23kg)?',
      a: 'Com a mudança das regras tarifárias, a maioria das passagens exibidas na internet inclui apenas mala de mão (10kg). No VOYAGER AI, você pode ativar a opção "Com Mala Despachada (23kg)" com um único clique. O sistema recalcula realisticamente o acréscimo médio de despacho de bagagem para voos nacionais (+ R$ 140/trecho) e internacionais (+ R$ 380/trecho), evitando surpresas desagradáveis na hora de pagar.'
    },
    {
      q: 'Como a Inteligência Artificial monta o meu roteiro de viagem personalizado?',
      a: 'Você informa o seu destino, a quantidade de dias, o perfil de viagem (Romântico, Luxo, Econômico, Família, Gastronômico, etc.) e o orçamento estimado. A IA analisa o banco de dados curado do destino e gera uma programação cronológica diária detalhada com pontos turísticos, melhores horários de visitação, restaurantes recomendados e dicas exclusivas.'
    },
    {
      q: 'Posso baixar o roteiro em PDF para consultar durante a viagem sem internet?',
      a: 'Sim! O VOYAGER AI conta com um módulo de exportação para PDF de alta resolução com design editorial de luxo. Todas as imagens e dados são renderizados diretamente no seu dispositivo, gerando um documento portátil que você pode salvar no smartphone ou imprimir para levar na viagem, sem depender de internet.'
    },
    {
      q: 'A plataforma é 100% gratuita para o viajante?',
      a: 'Sim, o viajante tem acesso irrestrito e gratuito a todas as cotações, comparadores, filtros de companhias aéreas e gerador de roteiros por IA. Não cobramos nenhuma taxa de intermediação nem adicionamos sobrepreço nas passagens ou hospedagens.'
    },
    {
      q: 'Quem desenvolveu a tecnologia e a patente do VOYAGER AI?',
      a: 'O projeto, a arquitetura de deep linking universal e a tecnologia de curadoria por IA foram integralmente idealizados e patenteados por Victor Ricardo de Carvalho Moreira.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#030814] text-slate-100 selection:bg-emerald-500 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* 1. TOP STICKY NAVBAR - DISNEY ROYAL NAVY & GOLD */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#040C1E]/95 border-b border-blue-900/60 shadow-xl transition-all">
        
        {/* Top Patent Golden Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white text-[10px] sm:text-xs py-1.5 px-4 text-center font-bold tracking-wider flex items-center justify-center gap-2 shadow-inner">
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>Tecnologia & Patente Desenvolvida por: <strong className="text-amber-200 underline decoration-amber-400">{CONFIG.PATENT_CREDIT}</strong></span>
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with Golden & Emerald Glow */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-navy-950 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] shrink-0 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-navy-950" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wider text-white block leading-tight drop-shadow-md">
                VOYAGER <span className="font-sans text-xs sm:text-sm tracking-widest uppercase font-black text-amber-300 bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 rounded-full ml-1">AI</span>
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest text-blue-200 uppercase font-semibold">
                A Magia do Turismo Inteligente & Global
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-semibold text-slate-200">
            <button onClick={() => scrollTo('problema-solucao')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
              Por que o Voyager?
            </button>
            <button onClick={() => scrollTo('comparativo')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
              Diferenciais vs Concorrentes
            </button>
            <button onClick={() => scrollTo('recursos')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
              Recursos Exclusivos
            </button>
            <button onClick={() => scrollTo('investidores')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
              Visão de Mercado & Patente
            </button>
            <button onClick={() => scrollTo('faq')} className="hover:text-amber-300 transition-colors cursor-pointer py-1">
              FAQ
            </button>
          </nav>

          {/* Primary Action Button (Glowing Disney-like CTA) */}
          <button
            onClick={onEnterPlatform}
            className="flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-105 border border-emerald-300/40 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Acessar Plataforma</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </header>

      {/* 2. HERO SECTION - ENCHANTED DISNEY TWILIGHT NIGHT */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#030814] via-[#081838] to-[#040E24] text-white pt-14 sm:pt-24 pb-24 sm:pb-32 border-b border-blue-900/40">
        
        {/* Starlight Ambient Glows (Disney Fairy-tale Lights) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-blue-600/25 via-emerald-500/20 to-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          
          {/* Magic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-900/60 via-emerald-950/60 to-blue-900/60 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-bold mb-7 shadow-[0_0_25px_rgba(16,185,129,0.3)] animate-fade-in backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>A Magia da Metabusca Universal & Turismo com Inteligência Artificial</span>
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          </div>

          {/* Main Title - Crystal-clear White with Golden Highlights */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.18] sm:leading-[1.14] max-w-5xl mx-auto text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            O Primeiro Ecossistema Global que Unifica Metabusca em Tempo Real, 
            <span className="block mt-2 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(251,191,36,0.4)]">
              20 Companhias Aéreas e Roteiros por IA em um Só Lugar.
            </span>
          </h1>

          {/* Subtitle - High Contrast, Easy to Read */}
          <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-sm">
            Pare de perder horas abrindo 15 abas e redigitando origem, destino e datas. O <strong className="text-white font-bold underline decoration-emerald-400">VOYAGER AI</strong> compara simultaneamente Google Flights, Skyscanner, Decolar, 123 Milhas, Kayak e 20 companhias oficiais, enviando você direto para a compra com trechos e malas pré-selecionados — além de criar roteiros dia a dia completos com IA e exportação em PDF.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={onEnterPlatform}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-base sm:text-lg transition-all duration-300 shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:scale-105 flex items-center justify-center gap-3 border border-emerald-300/50 cursor-pointer group"
            >
              <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>Acessar Plataforma VOYAGER AI</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('comparativo')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-950/80 to-navy-900/80 hover:bg-blue-900/80 border-2 border-amber-400/60 text-amber-200 hover:text-white font-bold text-base transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.2)] flex items-center justify-center gap-2 cursor-pointer hover:border-amber-300"
            >
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Ver Comparativo com Concorrentes</span>
              <ChevronDown className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          {/* Key Trust Stats Bar - Dark Royal Cards with Golden Accents */}
          <div className="mt-14 sm:mt-18 pt-8 border-t border-blue-900/60 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-[#091C3E]/90 border border-blue-500/30 shadow-lg backdrop-blur-md">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 font-serif drop-shadow-sm">20+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Companhias Aéreas Oficiais</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#091C3E]/90 border border-blue-500/30 shadow-lg backdrop-blur-md">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-serif drop-shadow-sm">6 Líderes</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Metabuscadores Integrados</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#091C3E]/90 border border-blue-500/30 shadow-lg backdrop-blur-md">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 font-serif drop-shadow-sm">7 Operadoras</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Matriz de Pacotes Completos</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#091C3E]/90 border border-blue-500/30 shadow-lg backdrop-blur-md">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-serif drop-shadow-sm">Zero</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Taxas Ocultas ou Redigitação</div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. O PROBLEMA VS A SOLUÇÃO - HIGH CONTRAST */}
      <section id="problema-solucao" className="py-18 sm:py-26 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 border border-amber-400/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>A Dor do Mercado vs A Solução VOYAGER AI</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-4 font-bold tracking-tight">
            Planejar uma viagem hoje é exaustivo. <br />
            <span className="text-emerald-400">O VOYAGER AI transforma tudo em encanto e agilidade.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Veja a comparação entre a experiência cansativa dos sites convencionais e a magia integrada da nossa plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
          
          {/* Card: O Jeito Antigo */}
          <div className="bg-[#1A0B14]/90 rounded-3xl p-7 sm:p-9 border-2 border-rose-500/40 shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 bg-rose-600 text-white text-[11px] font-extrabold uppercase px-4 py-1.5 rounded-bl-xl shadow-md">
              Como as pessoas sofrem hoje
            </div>
            
            <div className="w-13 h-13 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mb-5 text-xl font-bold">
              ✕
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span>O Jeito Antigo: Lento, Cansativo e Caro</span>
            </h3>

            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/50 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span><strong className="text-white">15 abas abertas no navegador:</strong> Você passa horas navegando entre buscadores diferentes tentando adivinhar qual tem o menor preço.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/50 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span><strong className="text-white">Redigitação cansativa:</strong> Cada site em que você clica pede novamente cidade de origem, destino, datas e quantidade de adultos.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/50 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span><strong className="text-white">Taxas surpresa na hora de pagar:</strong> A passagem parecia barata, mas no último passo cobram valores abusivos por mala despachada.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/50 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span><strong className="text-white">Sem roteiro planejado:</strong> Você compra a passagem mas não sabe o que fazer a cada dia, perdendo passeios imperdíveis.</span>
              </li>
            </ul>
          </div>

          {/* Card: O Jeito VOYAGER AI */}
          <div className="bg-gradient-to-br from-[#06241E]/95 via-[#0A1F3E]/95 to-[#081836]/95 rounded-3xl p-7 sm:p-9 border-2 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)] relative overflow-hidden backdrop-blur-md ring-2 ring-emerald-400/40">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-black uppercase px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>A Magia VOYAGER AI</span>
            </div>
            
            <div className="w-13 h-13 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center justify-center mb-5 text-xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              ✓
            </div>

            <h3 className="font-serif text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span>Com o VOYAGER AI: Tudo Pronto em 1 Clique</span>
            </h3>

            <ul className="space-y-4 text-sm text-slate-100">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs shadow-sm">✓</span>
                <span><strong className="text-emerald-300">1 Busca Universal:</strong> Compara simultaneamente Google Flights, Skyscanner, Decolar, 123 Milhas, Kayak e 20 companhias oficiais.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs shadow-sm">✓</span>
                <span><strong className="text-emerald-300">Deep Links Diretos (Zero Redigitação):</strong> Ao clicar no buscador ou na companhia aérea, cai diretamente na tela final de compra com datas e rotas já preenchidas.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs shadow-sm">✓</span>
                <span><strong className="text-emerald-300">Transparência de Mala Despachada (23kg):</strong> Escolha entre mala de mão ou despachada na barra de busca com cálculo de tarifa em tempo real.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center shrink-0 mt-0.5 font-black text-xs shadow-sm">✓</span>
                <span><strong className="text-emerald-300">Roteiro Personalizado com IA + PDF Offline:</strong> A IA cria seu itinerário dia a dia sob medida, calcula o orçamento diário e permite baixar no celular.</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 4. QUADRO COMPARATIVO: VOYAGER AI VS CONCORRENTES - VIBRANT DISNEY CONTRAST */}
      <section id="comparativo" className="py-18 sm:py-26 bg-[#040C1E] border-y border-blue-900/60 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 border border-amber-400/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Diferenciais Competitivos Incomparáveis</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-4 font-bold tracking-tight">
              Por que o VOYAGER AI supera os gigantes do mercado?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3">
              Confira ponto a ponto as funcionalidades exclusivas que você só encontra reunidas aqui.
            </p>
          </div>

          {/* Responsive Comparison Table - Deep Royal Midnight */}
          <div className="overflow-x-auto rounded-3xl border-2 border-blue-500/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] bg-[#071329]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              
              {/* Header */}
              <thead>
                <tr className="bg-[#020713] text-white border-b-2 border-blue-600/40">
                  <th className="py-5 px-5 sm:px-6 font-bold uppercase tracking-wider text-xs text-slate-300">
                    Funcionalidade / Diferencial
                  </th>
                  <th className="py-5 px-5 sm:px-6 font-black text-center bg-gradient-to-b from-emerald-600 to-teal-700 text-white uppercase tracking-wider text-xs border-x-2 border-emerald-400 shadow-md">
                    <div className="flex items-center justify-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>VOYAGER AI</span>
                    </div>
                  </th>
                  <th className="py-5 px-4 font-semibold text-center text-slate-300 text-xs">
                    Google Flights / Skyscanner
                  </th>
                  <th className="py-5 px-4 font-semibold text-center text-slate-300 text-xs">
                    Decolar / CVC
                  </th>
                  <th className="py-5 px-4 font-semibold text-center text-slate-300 text-xs">
                    Agências Tradicionais
                  </th>
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-blue-900/40">
                
                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-bold text-white">
                    Comparação Multiplataforma Simultânea
                  </td>
                  <td className="py-4 px-5 text-center bg-emerald-950/70 border-x-2 border-emerald-500/50 font-black text-emerald-300">
                    ✓ Sim (6 Buscadores Líderes)
                  </td>
                  <td className="py-4 px-4 text-center text-slate-300">
                    Apenas parceiros deles
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Apenas estoque próprio
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Não
                  </td>
                </tr>

                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-bold text-white">
                    Catálogo de 20 Companhias com Compra Direta
                  </td>
                  <td className="py-4 px-5 text-center bg-emerald-950/70 border-x-2 border-emerald-500/50 font-black text-emerald-300">
                    ✓ Sim (20 Cias Oficiais)
                  </td>
                  <td className="py-4 px-4 text-center text-slate-300">
                    Parcial
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Cobra comissão de agência
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Taxa de emissão alta
                  </td>
                </tr>

                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-bold text-white">
                    Redirecionamento Direto sem Redigitar Dados
                  </td>
                  <td className="py-4 px-5 text-center bg-emerald-950/70 border-x-2 border-emerald-500/50 font-black text-emerald-300">
                    ✓ Sim (Deep Link Ativo)
                  </td>
                  <td className="py-4 px-4 text-center text-slate-300">
                    Frequentemente perde parâmetros
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Não se aplica
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Não
                  </td>
                </tr>

                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-bold text-white">
                    Filtro Dinâmico de Mala Despachada (23kg)
                  </td>
                  <td className="py-4 px-5 text-center bg-emerald-950/70 border-x-2 border-emerald-500/50 font-black text-emerald-300">
                    ✓ Sim (Cálculo Transparente)
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400">
                    Complexo de configurar
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400">
                    Cobrado no checkout
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400">
                    Manual
                  </td>
                </tr>

                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-bold text-white">
                    Matriz de Pacotes Completos em 7 Operadoras
                  </td>
                  <td className="py-4 px-5 text-center bg-emerald-950/70 border-x-2 border-emerald-500/50 font-black text-emerald-300">
                    ✓ Sim (Decolar, CVC, Azul, Zarpo...)
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Não compara pacotes
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Apenas pacote próprio
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400">
                    Limitado a 1 ou 2 operadoras
                  </td>
                </tr>

                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-bold text-white">
                    Gerador de Roteiro Dia a Dia com Inteligência Artificial
                  </td>
                  <td className="py-4 px-5 text-center bg-emerald-950/70 border-x-2 border-emerald-500/50 font-black text-emerald-300">
                    ✓ Sim (Customizado por Perfil)
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Não possui
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Não possui
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400">
                    Roteiro genérico e engessado
                  </td>
                </tr>

                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-bold text-white">
                    Exportação em PDF de Luxo para Celular Offline
                  </td>
                  <td className="py-4 px-5 text-center bg-emerald-950/70 border-x-2 border-emerald-500/50 font-black text-emerald-300">
                    ✓ Sim (Funciona Sem Internet)
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Não possui
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    ✕ Apenas comprovante
                  </td>
                  <td className="py-4 px-4 text-center text-slate-400">
                    Papel impresso
                  </td>
                </tr>

                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-4 px-5 sm:px-6 font-bold text-white">
                    Custo de Uso para o Usuário
                  </td>
                  <td className="py-4 px-5 text-center bg-emerald-950/70 border-x-2 border-emerald-500/50 font-black text-amber-300">
                    ✓ 100% Gratuito
                  </td>
                  <td className="py-4 px-4 text-center text-emerald-400 font-semibold">
                    Gratuito
                  </td>
                  <td className="py-4 px-4 text-center text-slate-300">
                    Embutido no valor final
                  </td>
                  <td className="py-4 px-4 text-center text-rose-400 font-semibold">
                    Comissão de 10% a 25%
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onEnterPlatform}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 border border-emerald-300/40 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Experimentar Todos os Recursos na Prática</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. OS 4 PILARES TECNOLÓGICOS DO VOYAGER AI */}
      <section id="recursos" className="py-18 sm:py-26 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 border border-amber-400/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tecnologia Proprietária & Padrão Internacional</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-4 font-bold tracking-tight">
            Os 4 Pilares que tornam o VOYAGER AI uma experiência mágica
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pilar 1 */}
          <div className="bg-[#091B3A]/90 rounded-3xl p-6 sm:p-7 border border-blue-400/30 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:border-blue-400/60 transition-all duration-300 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center mb-5 shadow-sm">
                <Plane className="w-7 h-7 text-blue-300" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2.5">
                1. Metabusca & 20 Cias Oficiais
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Varredura instantânea em Google Flights, Decolar, Skyscanner, Kayak, 123 Milhas, MaxMilhas e compra direta em LATAM, GOL, Azul, TAP, Emirates, Air France e outras 14 cias globais.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-blue-900/60 text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Deep Linking Ativo</span>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-[#091B3A]/90 rounded-3xl p-6 sm:p-7 border border-emerald-400/30 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.25)] hover:border-emerald-400/60 transition-all duration-300 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mb-5 shadow-sm">
                <Sparkles className="w-7 h-7 text-emerald-300" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2.5">
                2. Inteligência Artificial de Roteiros
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Monta programações completas dia a dia adequadas ao perfil do viajante (Romântico, Luxo, Família, Aventura, Gastronômico) com cálculo de orçamento diário e dicas locais.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-blue-900/60 text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Gemini AI Integrado</span>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-[#091B3A]/90 rounded-3xl p-6 sm:p-7 border border-amber-400/30 shadow-xl hover:shadow-[0_0_30px_rgba(251,191,36,0.25)] hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mb-5 shadow-sm">
                <Package className="w-7 h-7 text-amber-300" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2.5">
                3. Matriz de Pacotes & Eventos
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Cotação simultânea de pacotes de viagem em 7 operadoras líderes (Decolar, CVC, Azul Viagens, Zarpo, Booking) com integração direta de festivais e eventos culturais mundiais.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-blue-900/60 text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-amber-300" />
              <span>7 Operadoras Conectadas</span>
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="bg-[#091B3A]/90 rounded-3xl p-6 sm:p-7 border border-purple-400/30 shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:border-purple-400/60 transition-all duration-300 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center mb-5 shadow-sm">
                <FileText className="w-7 h-7 text-purple-300" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2.5">
                4. Guia em PDF Offline de Luxo
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Gere e baixe no seu celular um dossiê diagramado com todas as fotos autênticas, itinerário diário, passagens e atrações para consultar durante o voo sem gastar plano de dados.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-blue-900/60 text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-purple-300" />
              <span>Exportação Vetorial Offline</span>
            </div>
          </div>

        </div>

      </section>

      {/* 6. VISÃO DE MERCADO, INVESTIDORES E PATENTE */}
      <section id="investidores" className="py-18 sm:py-26 bg-[#030917] text-white border-t border-blue-900/60 relative overflow-hidden">
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 border border-amber-400/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Oportunidade Comercial de Classe Mundial</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-4 font-bold tracking-tight">
              Por que o VOYAGER AI é um projeto de altíssimo valor de mercado?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3">
              Um modelo de negócios inteligente, escalável e protegido por patente.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8">
            
            <div className="p-7 sm:p-8 rounded-3xl bg-[#081836]/90 border border-blue-400/30 shadow-xl backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center mb-5 font-bold text-xl shadow-sm">
                📈
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Escalabilidade Sem Ativos Físicos
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Diferente de agências tradicionais, o VOYAGER AI não possui custos com estoque de passagens ou quartos. O modelo opera com tecnologia pura de afiliação e deep linking, gerando receita a cada reserva efetuada nos parceiros globais.
              </p>
            </div>

            <div className="p-7 sm:p-8 rounded-3xl bg-[#081836]/90 border border-blue-400/30 shadow-xl backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center mb-5 font-bold text-xl shadow-sm">
                🎯
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Taxa de Conversão Superior
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Ao encaminhar o usuário diretamente para o motor de busca com origem, destino, datas e passageiros já preenchidos, o abandono de carrinho é reduzido drasticamente em relação aos links publicitários estáticos convencionais.
              </p>
            </div>

            <div className="p-7 sm:p-8 rounded-3xl bg-[#081836]/90 border border-blue-400/30 shadow-xl backdrop-blur-md">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-400/40 flex items-center justify-center mb-5 font-bold text-xl shadow-sm">
                🛡️
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-3">
                Patente & Autoria Registrada
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                A unificação da arquitetura de inteligência artificial generativa com metabusca universal e parâmetros de bagagem e escalas dinâmicas é de autoria e patente registradas por <strong className="text-amber-200">Victor Ricardo de Carvalho Moreira</strong>.
              </p>
            </div>

          </div>

          {/* Patent Highlight Banner - Royal Golden Frame */}
          <div className="mt-12 p-7 rounded-3xl bg-gradient-to-r from-[#071E3D] via-[#0B254E] to-[#071E3D] border-2 border-amber-400/50 shadow-[0_0_35px_rgba(251,191,36,0.25)] flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-navy-950 flex items-center justify-center shrink-0 shadow-lg font-black text-2xl">
                ★
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <span>Tecnologia Patenteada & Propriedade Intelectual</span>
                </div>
                <div className="text-sm text-amber-200 mt-0.5">
                  Idealizado, Desenvolvido e Patenteado por: <strong className="text-white underline decoration-amber-400">{CONFIG.PATENT_CREDIT}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={onEnterPlatform}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.5)] shrink-0 cursor-pointer hover:scale-105"
            >
              Acessar a Plataforma
            </button>
          </div>

        </div>

      </section>

      {/* 7. PERGUNTAS FREQUENTES (FAQ) - CRYSTAL CLEAR */}
      <section id="faq" className="py-18 sm:py-26 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 border border-amber-400/40 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-4 font-bold tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Tudo o que você precisa saber sobre o funcionamento e diferenciais do VOYAGER AI.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#091C3E]/95 rounded-2xl border border-blue-400/30 shadow-lg overflow-hidden transition-all duration-300 hover:border-amber-400/50 backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-blue-900/30 transition-colors"
              >
                <span className="font-serif font-bold text-base sm:text-lg text-white pr-2">
                  {item.q}
                </span>
                <span className={`w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center shrink-0 border border-blue-500/40 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 bg-amber-400 text-navy-950 border-amber-300 font-bold' : 'text-slate-300'}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {openFaq === idx && (
                <div className="px-5 sm:px-6 pb-6 pt-2 text-sm text-slate-200 leading-relaxed border-t border-blue-900/60 animate-fade-in font-light">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* 8. CALL TO ACTION FINAL - DISNEY CASTLE MAGIC VIBES */}
      <section className="bg-gradient-to-b from-[#07193C] via-[#0A2658] to-[#040F26] text-white py-20 sm:py-28 text-center px-4 relative overflow-hidden border-t border-blue-900/60">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/20 via-blue-500/25 to-amber-500/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold mb-7 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            <Sparkles className="w-4 h-4" />
            <span>Sua Próxima Viagem Inesquecível Começa Agora</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
            Pronto para viver a verdadeira magia de viajar sem estresse?
          </h2>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
            Acesse a plataforma gratuitamente, compare as 20 companhias e metabuscadores em tempo real e deixe a Inteligência Artificial montar seu roteiro completo.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnterPlatform}
              className="w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-lg transition-all duration-300 shadow-[0_0_40px_rgba(16,185,129,0.6)] hover:scale-105 flex items-center justify-center gap-3 border border-emerald-300/50 cursor-pointer group"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Entrar na Plataforma VOYAGER AI</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-5">
            Acesso imediato • 100% gratuito para o viajante • Sem necessidade de cadastro prévio
          </p>

        </div>

      </section>

      {/* 9. FOOTER DA LANDING PAGE */}
      <footer className="bg-[#020610] border-t border-blue-950 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-navy-950 flex items-center justify-center font-black text-xs shadow-md">
              V
            </div>
            <span className="font-serif text-white font-bold tracking-wider text-sm">
              VOYAGER AI
            </span>
            <span className="text-slate-500">• Todos os direitos reservados</span>
          </div>

          <div className="text-xs text-slate-300 font-medium">
            Tecnologia, Arquitetura e Patente desenvolvidos por: <strong className="text-amber-300 underline decoration-amber-400">{CONFIG.PATENT_CREDIT}</strong>
          </div>

          <div className="flex items-center gap-5 text-slate-300 font-semibold text-xs">
            <button onClick={onEnterPlatform} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Plataforma
            </button>
            <button onClick={() => scrollTo('comparativo')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Diferenciais
            </button>
            <button onClick={() => scrollTo('faq')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              FAQ
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
