import React, { useState } from 'react';
import { 
  Compass, Sparkles, Plane, Building2, Package, ShieldCheck, Check, X, 
  ChevronDown, ArrowRight, ExternalLink, Award, TrendingDown, Layers, 
  Globe, Users, Calendar, Search, HelpCircle, FileText, Zap, Luggage
} from 'lucide-react';
import { CONFIG } from '../config';

export default function LandingPage({ onEnterPlatform }) {
  // FAQ accordion active state
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
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 selection:bg-emerald-500 selection:text-white font-sans">
      
      {/* 1. TOP STICKY NAVBAR */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-navy-950/95 border-b border-navy-800 text-white transition-all shadow-md">
        
        {/* Top Patent Ribbon */}
        <div className="bg-emerald-600 text-white text-[10px] sm:text-[11px] py-1 px-4 text-center font-semibold tracking-wider flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tecnologia & Patente Desenvolvida por: <strong>{CONFIG.PATENT_CREDIT}</strong></span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center shadow-soft shrink-0">
              <Compass className="w-5 h-5 text-navy-950" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white block leading-tight">
                VOYAGER <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase font-extrabold text-emerald-400 bg-white/10 px-2 py-0.5 rounded-full ml-1">AI</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-slate-400 uppercase font-medium">
                Ecossistema Global de Turismo Inteligente
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <button onClick={() => scrollTo('problema-solucao')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Por que o Voyager?
            </button>
            <button onClick={() => scrollTo('comparativo')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Diferenciais vs Concorrentes
            </button>
            <button onClick={() => scrollTo('recursos')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Recursos Exclusivos
            </button>
            <button onClick={() => scrollTo('investidores')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Visão de Mercado & Patente
            </button>
            <button onClick={() => scrollTo('faq')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              FAQ
            </button>
          </nav>

          {/* Primary Action Button */}
          <button
            onClick={onEnterPlatform}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-navy-950 text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-soft hover:shadow-emerald-500/25 hover:scale-[1.02] cursor-pointer"
          >
            <span>Acessar Plataforma</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white pt-12 sm:pt-20 pb-20 sm:pb-28">
        
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>A Nova Era da Metabusca & Turismo com Inteligência Artificial</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.18] sm:leading-[1.12] max-w-5xl mx-auto drop-shadow-md">
            O Primeiro Ecossistema Global que Unifica Metabusca em Tempo Real, 20 Companhias Aéreas e Roteiros por IA em um Só Lugar.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-lg lg:text-xl text-slate-300/90 max-w-3xl mx-auto font-light leading-relaxed">
            Pare de perder horas abrindo 15 abas e redigitando origem, destino e datas. O <strong>VOYAGER AI</strong> compara simultaneamente Google Flights, Skyscanner, Decolar, 123 Milhas, Kayak e 20 companhias oficiais, enviando você direto para a compra com trechos e malas pré-selecionados — além de criar roteiros dia a dia completos com IA e exportação em PDF.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              onClick={onEnterPlatform}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-sm sm:text-base transition-all duration-200 shadow-soft hover:shadow-emerald-500/30 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Acessar Plataforma VOYAGER AI</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('comparativo')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver Comparativo com Concorrentes</span>
              <ChevronDown className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          {/* Key Trust Stats Bar */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif">20+</div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Companhias Aéreas Oficiais</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif">6 Líderes</div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Metabuscadores Integrados</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif">7 Operadoras</div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Matriz de Pacotes Completos</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-serif">Zero</div>
              <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Taxas Ocultas ou Redigitação</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. O PROBLEMA VS A SOLUÇÃO */}
      <section id="problema-solucao" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            A Dor do Mercado
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-navy-900 mt-3 font-normal">
            Planejar uma viagem hoje é exaustivo. O VOYAGER AI resolve isso em 3 segundos.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Veja a comparação entre a experiência frustrante dos sites convencionais e a revolução integrada do VOYAGER AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card: O Jeito Antigo */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200/80 shadow-soft relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl">
              Como as pessoas viajam hoje
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
              <X className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mb-4">
              O Jeito Antigo: Lento, Cansativo e Caro
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span><strong>15 abas abertas no navegador:</strong> Você passa horas pulando de site em site tentando encontrar o melhor preço.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span><strong>Redigitação cansativa:</strong> Cada link que você clica exige preencher origem, destino, datas e pessoas tudo de novo.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span><strong>Taxas surpresa na hora de pagar:</strong> Tarifas que pareciam baratas disparam ao adicionar mala despachada.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✕</span>
                <span><strong>Sem roteiro planejado:</strong> Você compra a passagem mas não sabe o que fazer no destino, perdendo tempo e dinheiro em atrações desorganizadas.</span>
              </li>
            </ul>
          </div>

          {/* Card: O Jeito VOYAGER AI */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-white to-white rounded-3xl p-6 sm:p-8 border border-emerald-300 shadow-modal relative overflow-hidden ring-1 ring-emerald-400/30">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>A Revolução VOYAGER AI</span>
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-navy-950 flex items-center justify-center mb-4">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900 mb-4">
              Com o VOYAGER AI: Tudo em 1 Clique
            </h3>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>1 Busca Universal:</strong> Compara simultaneamente Google Flights, Skyscanner, Decolar, 123 Milhas, Kayak e 20 companhias aéreas oficiais.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>Deep Links Diretos (Zero Redigitação):</strong> Ao clicar para comprar, você cai na página final com rota, datas e passageiros já preenchidos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>Transparência de Mala Despachada (23kg):</strong> Filtre se deseja mala despachada ou somente de mão com cálculo em tempo real.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">✓</span>
                <span><strong>Roteiro Sob Medida com IA + PDF Offline:</strong> Roteiro cronológico dia a dia com orçamento calculado e download para celular sem internet.</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 4. QUADRO COMPARATIVO: VOYAGER AI VS CONCORRENTES */}
      <section id="comparativo" className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Diferenciais Competitivos
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-navy-900 mt-3 font-normal">
              Por que o VOYAGER AI supera os gigantes do mercado?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Confira ponto a ponto as funcionalidades exclusivas que você só encontra aqui.
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-modal">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[680px]">
              
              {/* Header */}
              <thead>
                <tr className="bg-navy-950 text-white border-b border-navy-800">
                  <th className="py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
                    Funcionalidade / Diferencial
                  </th>
                  <th className="py-4 px-4 sm:px-6 font-bold text-center bg-emerald-600 text-white uppercase tracking-wider text-[11px] sm:text-xs">
                    VOYAGER AI 🚀
                  </th>
                  <th className="py-4 px-4 font-semibold text-center text-slate-300 text-[11px] sm:text-xs">
                    Google Flights / Skyscanner
                  </th>
                  <th className="py-4 px-4 font-semibold text-center text-slate-300 text-[11px] sm:text-xs">
                    Decolar / CVC
                  </th>
                  <th className="py-4 px-4 font-semibold text-center text-slate-300 text-[11px] sm:text-xs">
                    Agências Tradicionais
                  </th>
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-slate-100 bg-white">
                
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-navy-900">
                    Comparação Multiplataforma Simultânea
                  </td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/50 font-bold text-emerald-700">
                    ✓ Sim (6 Buscadores)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500">
                    Apenas os parceiros deles
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Apenas inventário próprio
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Não
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-navy-900">
                    Catálogo de 20 Companhias Aéreas com Compra Direta
                  </td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/50 font-bold text-emerald-700">
                    ✓ Sim (20 Cias Oficiais)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500">
                    Parcial
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Cobra taxa de agência
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Taxa de comissão alta
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-navy-900">
                    Redirecionamento Direto sem Redigitar Datas e Rota
                  </td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/50 font-bold text-emerald-700">
                    ✓ Sim (Deep Link Ativo)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500">
                    Às vezes falha em parceiros
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Não se aplica
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Não
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-navy-900">
                    Filtro Dinâmico de Mala Despachada (23kg)
                  </td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/50 font-bold text-emerald-700">
                    ✓ Sim (Cálculo Direto)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Escondido nos filtros
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Aparece só no checkout
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Manual
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-navy-900">
                    Matriz de Pacotes Completos em 7 Operadoras
                  </td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/50 font-bold text-emerald-700">
                    ✓ Sim (Decolar, CVC, Azul, Zarpo...)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Não compara pacotes
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Apenas pacote próprio
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Limitado
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-navy-900">
                    Gerador de Roteiro Dia a Dia com Inteligência Artificial
                  </td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/50 font-bold text-emerald-700">
                    ✓ Sim (Customizado por Perfil)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Não possui
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Não possui
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Roteiro engessado/genérico
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-navy-900">
                    Exportação em PDF de Luxo para Leitura Offline
                  </td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/50 font-bold text-emerald-700">
                    ✓ Sim (100% Offline no Celular)
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Não possui
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    ✕ Apenas voucher de compra
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-400">
                    Folheto impresso padrão
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-navy-900">
                    Custo de Uso para o Usuário
                  </td>
                  <td className="py-3.5 px-4 text-center bg-emerald-50/50 font-bold text-emerald-700">
                    ✓ 100% Gratuito
                  </td>
                  <td className="py-3.5 px-4 text-center text-emerald-600">
                    Gratuito
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500">
                    Embutido no valor da compra
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-600 font-semibold">
                    Comissões de 10% a 25%
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onEnterPlatform}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm transition-all duration-200 shadow-soft cursor-pointer"
            >
              <span>Experimentar Todos os Recursos na Prática</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. OS 4 PILARES TECNOLÓGICOS DO VOYAGER AI */}
      <section id="recursos" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Tecnologia Proprietária
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-navy-900 mt-3 font-normal">
            Os 4 Pilares que tornam o VOYAGER AI uma solução de classe mundial
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pilar 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                1. Metabusca & 20 Cias Oficiais
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Varredura instantânea em Google Flights, Decolar, Skyscanner, Kayak, 123 Milhas, MaxMilhas e compra direta em LATAM, GOL, Azul, TAP, Emirates, Air France e outras 14 cias globais.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              Deep Linking Ativo
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                2. Inteligência Artificial de Roteiros
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Monta programações completas dia a dia adequadas ao perfil do viajante (Romântico, Luxo, Família, Aventura, Gastronômico) com cálculo de orçamento diário e dicas locais.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Gemini AI Integrado
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                3. Matriz de Pacotes & Eventos
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Cotação simultânea de pacotes de viagem em 7 operadoras líderes (Decolar, CVC, Azul Viagens, Zarpo, Booking) com integração direta de festivais e eventos culturais mundiais.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              7 Operadoras Conectadas
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                4. Guia em PDF Offline de Luxo
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Gere e baixe no seu celular um dossiê diagramado com todas as fotos autênticas, itinerário diário, passagens e atrações para consultar durante o voo sem gastar plano de dados.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-purple-700 uppercase tracking-wider">
              Exportação Vetorial Offline
            </div>
          </div>

        </div>

      </section>

      {/* 6. VISÃO DE MERCADO, INVESTIDORES E PATENTE */}
      <section id="investidores" className="py-16 sm:py-24 bg-navy-950 text-white relative overflow-hidden">
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-white/10 px-3 py-1 rounded-full">
              Oportunidade Comercial & Patente
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white mt-3 font-normal">
              Por que o VOYAGER AI é um projeto de altíssimo valor de mercado?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Um modelo de negócios inteligente, escalável e protegido por patente.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 font-bold text-lg">
                📈
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Escalabilidade Sem Ativos Físicos
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Diferente de agências tradicionais, o VOYAGER AI não possui custos com estoque de passagens ou quartos. O modelo opera com tecnologia pura de afiliação e deep linking, gerando comissões a cada clique e reserva efetuada nos parceiros globais.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 font-bold text-lg">
                🎯
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Taxa de Conversão Superior
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ao encaminhar o usuário diretamente para o motor de busca com origem, destino, datas e passageiros já preenchidos, o abandono de carrinho é reduzido em até 65% em comparação com links genéricos de publicidade.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 font-bold text-lg">
                🛡️
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Patente & Autoria Registrada
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A unificação da arquitetura de inteligência artificial generativa com metabusca universal e parâmetros de bagagem e escalas dinâmicas é de autoria e patente registradas por <strong>Victor Ricardo de Carvalho Moreira</strong>.
              </p>
            </div>

          </div>

          {/* Patent Highlight Banner */}
          <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-navy-900 to-navy-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-navy-950 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="font-serif text-lg font-bold text-white">Tecnologia Patenteada & Propriedade Intelectual</div>
                <div className="text-xs text-slate-300">Desenvolvido e Patenteado por: <strong>{CONFIG.PATENT_CREDIT}</strong></div>
              </div>
            </div>

            <button
              onClick={onEnterPlatform}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
            >
              Acessar a Plataforma
            </button>
          </div>

        </div>

      </section>

      {/* 7. PERGUNTAS FREQUENTES (FAQ) */}
      <section id="faq" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-navy-900 mt-3 font-normal">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Tudo o que você precisa saber sobre o funcionamento do VOYAGER AI.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="font-serif font-bold text-sm sm:text-base text-navy-900 pr-2">
                  {item.q}
                </span>
                <span className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 bg-emerald-100 text-emerald-700' : 'text-slate-500'}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* 8. CALL TO ACTION FINAL */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-emerald-950 text-white py-16 sm:py-24 text-center px-4 relative overflow-hidden">
        
        <div className="relative max-w-4xl mx-auto z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comece Agora Mesmo</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight leading-tight">
            Pronto para transformar a maneira como você viaja e planeja?
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Acesse a plataforma gratuitamente, compare as 20 companhias e metabuscadores em tempo real e deixe a Inteligência Artificial montar seu roteiro completo.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnterPlatform}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-base transition-all duration-200 shadow-soft hover:shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Entrar na Plataforma VOYAGER AI</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mt-4">
            Acesso imediato • 100% gratuito para o viajante • Sem necessidade de cadastro prévio
          </p>

        </div>

      </section>

      {/* 9. FOOTER DA LANDING PAGE */}
      <footer className="bg-navy-950 border-t border-navy-800 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center font-bold text-xs">
              V
            </div>
            <span className="font-serif text-white font-bold tracking-wider">
              VOYAGER AI
            </span>
            <span className="text-slate-500">• Todos os direitos reservados</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Tecnologia, Arquitetura e Patente desenvolvidos por: <strong className="text-white">{CONFIG.PATENT_CREDIT}</strong>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
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
