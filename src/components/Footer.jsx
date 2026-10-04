import React from 'react';
import { Compass, ShieldCheck, Heart, Award } from 'lucide-react';
import { CONFIG } from '../config';

export default function Footer() {
  return (
    <footer className="bg-[#020611] text-white pt-14 sm:pt-16 pb-12 border-t border-blue-900/60 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
          
          {/* Brand info & Patent */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                VOYAGER <span className="font-sans text-xs tracking-widest text-emerald-400 font-extrabold uppercase bg-emerald-950/60 px-2 py-0.5 rounded-full ml-1">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 font-light leading-relaxed max-w-md mb-4">
              Portal editorial de curadoria e planejamento de viagens de alto padrão. Inspirado na sofisticação atemporal dos grandes roteiros globais, integrando inteligência artificial e geração instantânea de documentos 100% no cliente.
            </p>

            <div className="space-y-1.5 text-xs text-emerald-400 font-medium">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Desenvolvido por:</strong> {CONFIG.DEVELOPER_NAME}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Patente, arquitetura e direitos autorais protegidos</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-sand-300 uppercase tracking-wider mb-3 sm:mb-4">
              Destinos em Destaque
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#destinos-brasil" className="hover:text-white transition-colors">Fernando de Noronha, PE</a></li>
              <li><a href="#destinos-brasil" className="hover:text-white transition-colors">Gramado & Serra Gaúcha, RS</a></li>
              <li><a href="#destinos-brasil" className="hover:text-white transition-colors">Lençóis Maranhenses, MA</a></li>
              <li><a href="#destinos-globais" className="hover:text-white transition-colors">Paris & Costa Amalfitana</a></li>
              <li><a href="#destinos-globais" className="hover:text-white transition-colors">Quioto & Tóquio Clássico</a></li>
            </ul>
          </div>

          {/* Partner ecosystems */}
          <div>
            <h4 className="font-serif text-sm font-bold text-sand-300 uppercase tracking-wider mb-3 sm:mb-4">
              Parceiros Integrados
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><span>Google Flights (Malha Global)</span></li>
              <li><span>Skyscanner & Kayak</span></li>
              <li><span>Decolar.com (Voos & Hotéis)</span></li>
              <li><span>123 Milhas & MaxMilhas</span></li>
              <li><span>Booking.com & Airbnb Luxe</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Patent credits */}
        <div className="pt-8 border-t border-navy-800 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-3 text-center md:text-left">
          <div>
            <p>© {new Date().getFullYear()} VOYAGER AI. Todos os direitos reservados.</p>
            <p className="text-emerald-400 font-semibold mt-0.5">
              Idealizado e Desenvolvido por Victor Ricardo de Carvalho Moreira
            </p>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Tecnologia proprietária com</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>e Inteligência Artificial</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
