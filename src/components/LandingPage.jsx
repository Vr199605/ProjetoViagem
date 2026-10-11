import React, { useState } from 'react';
import { 
  Compass, Sparkles, Plane, Building2, Package, ShieldCheck, Check, X, 
  ChevronDown, ArrowRight, ExternalLink, Award, TrendingDown, Layers, 
  Globe, Users, Calendar, Search, HelpCircle, FileText, Zap, Luggage, Star,
  Smartphone, Calculator
} from 'lucide-react';
import { CONFIG } from '../config';

export default function LandingPage({ onEnterPlatform, onOpenInstallModal }) {
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
      q: 'Como instalo o aplicativo do VOYAGER AI diretamente na tela do meu celular?',
      a: 'É imediato e não consome memória da sua loja de apps! Basta tocar no botão "Instalar App" no topo do site. No iPhone/iPad (Safari), toque no ícone de Compartilhar e selecione "Adicionar à Tela de Início". No Android ou PC (Google Chrome/Edge), um único clique abre o instalador nativo. O ícone oficial do VOYAGER AI ficará salvo na sua tela com abertura ultra-rápida e tela cheia.'
    },
    {
      q: 'Como funciona a Calculadora de Custo Total por Pessoa em 5 categorias?',
      a: 'Nossa calculadora inteligente desmembra qualquer orçamento em 5 fatias essenciais da viagem: Aéreo, Hospedagem, Alimentação Diária, Ingressos de Atrações e Reserva para Compras/Imprevistos. Você pode alternar em tempo real entre visualização "Por Pessoa" ou "Total do Grupo", ajustar o padrão (Econômico, Conforto, Luxo) e exportar tudo perfeitamente diagramado no PDF oficial.'
    },
    {
      q: 'Quem desenvolveu a tecnologia e a patente do VOYAGER AI?',
      a: 'O projeto, a arquitetura de deep linking universal e a tecnologia de curadoria por IA foram integralmente idealizados e patenteados por Victor Ricardo de Carvalho Moreira.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* 1. TOP STICKY NAVBAR - CLEAN OBSIDIAN SLATE */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/95 border-b border-slate-800 shadow-sm transition-all">
        
        {/* Top Patent Ribbon */}
        <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-[10px] sm:text-xs py-1.5 px-3 text-center font-medium tracking-wide flex flex-wrap items-center justify-center gap-1.5 overflow-hidden w-full max-w-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-center leading-tight">
            Tecnologia & Patente: <strong className="text-slate-100 font-semibold">{CONFIG.PATENT_CREDIT}</strong>
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-emerald-500 transition-colors">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="shrink-0">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-white flex items-center leading-tight shrink-0">
                VOYAGER <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded ml-1.5 shrink-0">AI</span>
              </span>
              <span className="text-[9px] sm:text-[11px] tracking-widest text-slate-400 uppercase font-medium hidden sm:block truncate">
                Metabusca & Inteligência Operacional
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-300">
            <button onClick={() => scrollTo('problema-solucao')} className="hover:text-white transition-colors cursor-pointer py-1">
              Por que o Voyager?
            </button>
            <button onClick={() => scrollTo('comparativo')} className="hover:text-white transition-colors cursor-pointer py-1">
              Diferenciais vs Concorrentes
            </button>
            <button onClick={() => scrollTo('recursos')} className="hover:text-white transition-colors cursor-pointer py-1">
              Recursos Operacionais
            </button>
            <button onClick={() => scrollTo('investidores')} className="hover:text-white transition-colors cursor-pointer py-1">
              Visão de Mercado & Patente
            </button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors cursor-pointer py-1">
              FAQ
            </button>
          </nav>

          {/* Action Buttons: PWA Install & Access Platform */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onOpenInstallModal && (
              <button
                onClick={onOpenInstallModal}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                title="Instalar VOYAGER AI na Tela Inicial"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Instalar App</span>
              </button>
            )}

            <button
              onClick={onEnterPlatform}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-colors shadow-2xs cursor-pointer shrink-0"
            >
              <span>Acessar Plataforma</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-800 w-full max-w-full">
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold mb-5 sm:mb-6 animate-fade-in">
            <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Metabusca Universal em Tempo Real & Concierge por IA</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-tight sm:leading-snug max-w-5xl mx-auto text-white">
            O Primeiro Ecossistema Global que Unifica Metabusca em Tempo Real, 
            <span className="block mt-2 text-emerald-400">
              20 Companhias Aéreas e Roteiros por IA em um Só Lugar.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed px-1">
            Pare de perder horas abrindo 15 abas e redigitando origem, destino e datas. O <strong className="text-white font-semibold">VOYAGER AI</strong> compara simultaneamente Google Flights, Skyscanner, Decolar, 123 Milhas, Kayak e 20 companhias oficiais, enviando você direto para a compra com trechos e malas pré-selecionados — além de criar roteiros dia a dia completos com IA e exportação em PDF.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onEnterPlatform}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-colors shadow-sm flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Acessar Plataforma VOYAGER AI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>

            {onOpenInstallModal && (
              <button
                onClick={onOpenInstallModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instalar App no Celular</span>
              </button>
            )}

            <button
              onClick={() => scrollTo('comparativo')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Ver Comparativo</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>
          </div>

          {/* Key Trust Stats Bar */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 text-center">
            
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-bold text-white font-serif">20+</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Companhias Oficiais</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-serif">6 Líderes</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Metabuscadores</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-bold text-white font-serif">7 Operadoras</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Pacotes Completos</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-2xs">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-serif">Zero</div>
              <div className="text-xs font-medium text-slate-400 mt-1">Taxas Ocultas</div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. O PROBLEMA VS A SOLUÇÃO */}
      <section id="problema-solucao" className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Desafios do Mercado vs Solução VOYAGER</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-2 font-bold tracking-tight">
            Planejar uma viagem não precisa ser exaustivo. <br />
            <span className="text-emerald-400">O VOYAGER AI traz eficiência operacional e transparência total.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-normal">
            Veja a comparação entre a experiência cansativa dos sites convencionais e a integração ágil da nossa plataforma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: O Jeito Convencional */}
          <div className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-rose-900/30 relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 bg-rose-950 text-rose-300 border-l border-b border-rose-900/50 text-[11px] font-semibold uppercase px-3 py-1 rounded-bl-lg">
              Fluxo Convencional
            </div>
            
            <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-900/50 text-rose-400 flex items-center justify-center mb-5 text-base font-bold">
              ✕
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4">
              O Jeito Antigo: Lento e Fragmentado
            </h3>

            <ul className="space-y-3.5 text-sm text-slate-300 font-normal">
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-rose-950 text-rose-400 border border-rose-900/50 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong className="text-white font-medium">Dezenas de abas abertas:</strong> Você gasta horas navegando entre buscadores diferentes tentando deduzir qual tem o menor preço real.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-rose-950 text-rose-400 border border-rose-900/50 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong className="text-white font-medium">Redigitação contínua:</strong> Cada site exige novamente origem, destino, datas e número de passageiros.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-rose-950 text-rose-400 border border-rose-900/50 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong className="text-white font-medium">Taxas de bagagem ocultas:</strong> A tarifa inicial parece barata, mas no checkout são cobrados acréscimos abusivos de despacho.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-rose-950 text-rose-400 border border-rose-900/50 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</span>
                <span><strong className="text-white font-medium">Ausência de roteiro:</strong> Compra-se a passagem sem um planejamento cronológico do destino, gerando tempo ocioso e estresse.</span>
              </li>
            </ul>
          </div>

          {/* Card: O Jeito VOYAGER AI */}
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-emerald-600/50 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 bg-emerald-950/80 text-emerald-400 border-l border-b border-emerald-700/40 text-[11px] font-semibold uppercase px-3 py-1 rounded-bl-lg">
              VOYAGER AI
            </div>
            
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 flex items-center justify-center mb-5 text-base font-bold">
              ✓
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4">
              Com o VOYAGER AI: Eficiência em 1 Clique
            </h3>

            <ul className="space-y-3.5 text-sm text-slate-200 font-normal">
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                <span><strong className="text-emerald-400 font-semibold">1 Busca Integrada:</strong> Compara simultaneamente Google Flights, Skyscanner, Decolar, 123 Milhas, Kayak e 20 companhias oficiais.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                <span><strong className="text-emerald-400 font-semibold">Deep Links Pré-preenchidos:</strong> Ao clicar, você é direcionado diretamente para a tela final de compra com rota e datas já configuradas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                <span><strong className="text-emerald-400 font-semibold">Transparência de Bagagem (23kg):</strong> Filtro em tempo real para visualizar o custo total com mala despachada sem surpresas no checkout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                <span><strong className="text-emerald-400 font-semibold">Roteiro Estruturado + PDF Offline:</strong> Programação dia a dia calculada com base no seu perfil e disponível para download gratuito no smartphone.</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 4. QUADRO COMPARATIVO: VOYAGER AI VS CONCORRENTES */}
      <section id="comparativo" className="py-14 sm:py-20 bg-slate-950 border-y border-slate-800 relative w-full max-w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Diferenciais Competitivos</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
              Comparativo de Recursos e Plataforma
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Confira os recursos integrados que você encontra reunidos no VOYAGER AI.
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="w-full max-w-full overflow-x-auto rounded-2xl border border-slate-800 shadow-sm bg-slate-900">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[680px]">
              
              {/* Header */}
              <thead>
                <tr className="bg-slate-950 text-white border-b border-slate-800">
                  <th className="py-4 px-5 sm:px-6 font-semibold uppercase tracking-wider text-xs text-slate-300">
                    Funcionalidade / Diferencial
                  </th>
                  <th className="py-4 px-5 sm:px-6 font-bold text-center bg-slate-850 text-emerald-400 uppercase tracking-wider text-xs border-x border-slate-800">
                    VOYAGER AI
                  </th>
                  <th className="py-4 px-4 font-medium text-center text-slate-400 text-xs">
                    Google Flights / Skyscanner
                  </th>
                  <th className="py-4 px-4 font-medium text-center text-slate-400 text-xs">
                    Decolar / CVC
                  </th>
                  <th className="py-4 px-4 font-medium text-center text-slate-400 text-xs">
                    Agências Tradicionais
                  </th>
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-slate-800 text-slate-300">
                
                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Comparação Multiplataforma Simultânea
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ Sim (6 Buscadores Líderes)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Apenas parceiros deles
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Apenas estoque próprio
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Não
                  </td>
                </tr>

                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Catálogo de 20 Companhias com Compra Direta
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ Sim (20 Cias Oficiais)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Parcial
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Cobra comissão de agência
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Taxa de emissão alta
                  </td>
                </tr>

                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Redirecionamento Direto sem Redigitar Dados
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ Sim (Deep Link Ativo)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Frequentemente perde parâmetros
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Não se aplica
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Não
                  </td>
                </tr>

                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Filtro Dinâmico de Mala Despachada (23kg)
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ Sim (Cálculo Transparente)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Complexo de configurar
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Cobrado no checkout
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Manual
                  </td>
                </tr>

                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Matriz de Pacotes Completos em 7 Operadoras
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ Sim (Decolar, CVC, Azul, Zarpo...)
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Não compara pacotes
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Apenas pacote próprio
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Limitado a 1 ou 2 operadoras
                  </td>
                </tr>

                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Gerador de Roteiro Dia a Dia com IA
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ Sim (Customizado por Perfil)
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Não possui
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Não possui
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Roteiro genérico
                  </td>
                </tr>

                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Exportação em PDF de Alta Resolução Offline
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ Sim (Funciona Sem Internet)
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Não possui
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Apenas comprovante
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Papel impresso
                  </td>
                </tr>

                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Calculadora de Custo Total por Pessoa (5 Categorias)
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ Sim (Aéreo + Hotel + Alimentação + Ingressos + Extras)
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Apenas passagem
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Apenas pacote bruto
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Estimativa manual vaga
                  </td>
                </tr>

                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Aplicativo Instalável (PWA no Celular)
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ Sim (iOS Safari & Android Chrome em 1 Clique)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Requer download em lojas
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    App pesado de loja
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    ✕ Não possui
                  </td>
                </tr>

                <tr className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3.5 px-5 sm:px-6 font-medium text-white">
                    Custo de Acesso para o Usuário
                  </td>
                  <td className="py-3.5 px-5 text-center bg-slate-850/60 border-x border-slate-800 font-semibold text-emerald-400">
                    ✓ 100% Gratuito
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-300 font-medium">
                    Gratuito
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-300">
                    Embutido no valor final
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-400 font-medium">
                    Comissão de 10% a 25%
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onEnterPlatform}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-2xs cursor-pointer"
            >
              <span>Experimentar Todos os Recursos na Prática</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. OS 5 PILARES TECNOLÓGICOS DO VOYAGER AI */}
      <section id="recursos" className="py-18 sm:py-26 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tecnologia Proprietária & Padrão Global</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-4 font-bold tracking-tight">
            Os 5 Pilares Tecnológicos do VOYAGER AI
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto font-light">
            Engenharia de dados em tempo real, inteligência artificial contextual e conexões diretas sem intermediários ocultos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Pilar 1 */}
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-sm hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 text-slate-300 flex items-center justify-center mb-5">
                <Plane className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2.5">
                1. Metabusca & 20 Cias Oficiais
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Varredura instantânea em Google Flights, Decolar, Skyscanner, Kayak, 123 Milhas, MaxMilhas e compra direta em LATAM, GOL, Azul, TAP, Emirates, Air France e outras 14 cias globais.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-800 text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Deep Linking Ativo</span>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-sm hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 text-emerald-400 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2.5">
                2. Curadoria & Inteligência Contextual
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Monta programações completas dia a dia adequadas ao perfil do viajante (Romântico, Luxo, Família, Aventura, Gastronômico) com cálculo de orçamento diário e dicas locais.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400" />
              <span>Gemini AI Integrado</span>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-sm hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 text-amber-400 flex items-center justify-center mb-5">
                <Package className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2.5">
                3. Matriz de Pacotes & Eventos
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Cotação simultânea de pacotes de viagem em 7 operadoras líderes (Decolar, CVC, Azul Viagens, Zarpo, Booking) com integração direta de festivais e eventos culturais mundiais.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>7 Operadoras Conectadas</span>
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-sm hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 text-sky-400 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2.5">
                4. Dossiê Executivo em PDF Offline
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Gere e baixe no seu celular um dossiê diagramado com fotos editoriais, itinerário diário, passagens e atrações para consultar durante o voo sem consumir dados móveis.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Exportação Vetorial Offline</span>
            </div>
          </div>

          {/* Pilar 5: Aplicativo Instalável (PWA) & Calculadora */}
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-sm hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 text-emerald-400 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 text-amber-400 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2.5">
                5. App Instalável (PWA) & Calculadora de Custos por Pessoa
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                Instalação direta no celular sem depender de lojas de aplicativos (iOS Safari & Android Chrome), abrindo em tela cheia com visual nativo. Além de uma calculadora financeira que desmembra o orçamento em 5 categorias essenciais: Aéreo, Hospedagem, Alimentação, Ingressos e Reserva para Compras.
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>PWA Nativo & Cálculo 5 Categorias</span>
              </div>
              {onOpenInstallModal && (
                <button
                  onClick={onOpenInstallModal}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-white font-medium text-xs transition-colors border border-slate-700 cursor-pointer shadow-2xs"
                >
                  Instalar App Agora
                </button>
              )}
            </div>
          </div>

        </div>

      </section>

      {/* 6. VISÃO DE MERCADO, INVESTIDORES E PATENTE */}
      <section id="investidores" className="py-18 sm:py-26 bg-slate-950 text-white border-t border-slate-800/80 relative overflow-hidden w-full max-w-full">
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-800/50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Oportunidade Comercial de Classe Mundial</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-4 font-bold tracking-tight">
              Por que o VOYAGER AI é um projeto de altíssimo valor de mercado?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3">
              Um modelo de negócios inteligente, escalável e com autoria intelectual registrada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
            
            <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700/60 flex items-center justify-center mb-5 font-bold text-lg">
                📈
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                Escalabilidade Sem Ativos Físicos
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Diferente de agências tradicionais, o VOYAGER AI não possui custos com estoque de passagens ou quartos. O modelo opera com tecnologia de metasearch e deep linking, gerando receita a cada reserva efetuada nos parceiros globais.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-slate-800 text-amber-400 border border-slate-700/60 flex items-center justify-center mb-5 font-bold text-lg">
                🎯
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                Taxa de Conversão Superior
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Ao encaminhar o usuário diretamente para o motor de busca com origem, destino, datas e passageiros já preenchidos, o abandono de carrinho é reduzido drasticamente em relação aos links publicitários estáticos convencionais.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-slate-800 text-sky-400 border border-slate-700/60 flex items-center justify-center mb-5 font-bold text-lg">
                🛡️
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3">
                Patente & Autoria Registrada
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                A unificação da arquitetura de inteligência artificial generativa com metabusca universal e parâmetros de bagagem e escalas dinâmicas é de autoria e patente registradas por <strong className="text-slate-200">Victor Ricardo de Carvalho Moreira</strong>.
              </p>
            </div>

          </div>

          {/* Patent Highlight Banner */}
          <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 font-black text-xl">
                ★
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>Tecnologia Patenteada & Propriedade Intelectual</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Idealizado, Desenvolvido e Patenteado por: <strong className="text-slate-200">{CONFIG.PATENT_CREDIT}</strong>
                </div>
              </div>
            </div>

            <button
              onClick={onEnterPlatform}
              className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Acessar a Plataforma
            </button>
          </div>

        </div>

      </section>

      {/* 7. PERGUNTAS FREQUENTES (FAQ) */}
      <section id="faq" className="py-18 sm:py-26 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mt-4 font-bold tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Tudo o que você precisa saber sobre o funcionamento e diferenciais do VOYAGER AI.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden transition-all duration-200 hover:border-slate-700"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-850/60 transition-colors"
              >
                <span className="font-serif font-bold text-base sm:text-lg text-white pr-2">
                  {item.q}
                </span>
                <span className={`w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 bg-slate-700 text-white' : 'text-slate-400'}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {openFaq === idx && (
                <div className="px-5 sm:px-6 pb-6 pt-2 text-sm text-slate-300 leading-relaxed border-t border-slate-800 font-light">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* 8. CALL TO ACTION FINAL */}
      <section className="bg-slate-900 border-t border-slate-800 text-white py-18 sm:py-24 text-center px-4 relative overflow-hidden w-full max-w-full">
        
        <div className="relative max-w-4xl mx-auto z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Planejamento Inteligente de Ponta a Ponta</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
            Pronto para planejar sua viagem com precisão e elegância?
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Acesse a plataforma gratuitamente, compare as 20 companhias e metabuscadores em tempo real e conte com inteligência contextual para estruturar seu itinerário.
          </p>

          <div className="mt-8 flex flex-col sm:row items-center justify-center gap-4">
            <button
              onClick={onEnterPlatform}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-colors shadow-sm flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Entrar na Plataforma VOYAGER AI</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-5">
            Acesso imediato • 100% gratuito para o viajante • Sem necessidade de cadastro prévio
          </p>

        </div>

      </section>

      {/* 9. FOOTER DA LANDING PAGE */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              V
            </div>
            <span className="font-serif text-white font-bold tracking-wider text-sm">
              VOYAGER AI
            </span>
            <span className="text-slate-500">• Todos os direitos reservados</span>
          </div>

          <div className="text-xs text-slate-400 font-normal">
            Tecnologia, Arquitetura e Patente desenvolvidos por: <strong className="text-slate-200">{CONFIG.PATENT_CREDIT}</strong>
          </div>

          <div className="flex items-center gap-5 text-slate-400 font-medium text-xs">
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
