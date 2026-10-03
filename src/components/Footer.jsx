import React from 'react';
import { Compass, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                VOYAGER <span className="font-sans text-xs tracking-widest text-emerald-400 font-extrabold uppercase bg-emerald-950/60 px-2 py-0.5 rounded-full ml-1">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-300 font-light leading-relaxed max-w-md mb-4">
              Portal editorial de curadoria e planejamento de viagens de alto padrão. Inspirado na sofisticação atemporal dos grandes roteiros globais, integrando inteligência artificial e geração instantânea de documentos 100% no cliente.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacidade Total • Zero rastreamento invasivo • Sem anúncios</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-sand-300 uppercase tracking-wider mb-4">
              Destinos em Destaque
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#destinos-brasil" className="hover:text-white transition-colors">Fernando de Noronha, PE</a></li>
              <li><a href="#destinos-brasil" className="hover:text-white transition-colors">Gramado & Vale dos Vinhedos, RS</a></li>
              <li><a href="#destinos-brasil" className="hover:text-white transition-colors">Lençóis Maranhenses, MA</a></li>
              <li><a href="#destinos-globais" className="hover:text-white transition-colors">Paris & Costa Amalfitana</a></li>
              <li><a href="#destinos-globais" className="hover:text-white transition-colors">Quioto & Tóquio Clássico</a></li>
            </ul>
          </div>

          {/* Partner ecosystems */}
          <div>
            <h4 className="font-serif text-sm font-bold text-sand-300 uppercase tracking-wider mb-4">
              Parceiros & Ecossistema
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><span>Booking.com (Hospedagem)</span></li>
              <li><span>Skyscanner (Malha Aérea)</span></li>
              <li><span>Decolar.com (Pacotes)</span></li>
              <li><span>Airbnb Luxe (Vilas)</span></li>
              <li><span>Sympla & Eventbrite (Ingressos)</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} VOYAGER AI. Todos os direitos reservados. Plataforma de turismo editorial.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Desenvolvido para viajantes exigentes com</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>e Inteligência Artificial</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
