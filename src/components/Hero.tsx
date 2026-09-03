import { Sparkles, Headphones, BatteryCharging, Camera, Wrench } from "lucide-react";
import Reveal from "./Reveal";
import logo from "../assets/logo.jpg";

interface HeroProps {
  onCta: (href: string) => void;
}

export default function Hero({ onCta }: HeroProps) {
  return (
    <section id="accueil" className="relative overflow-hidden px-5 pt-14 pb-20 md:pt-24 md:pb-28">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none blur-sm bg-[radial-gradient(circle,rgba(47,111,237,0.2),transparent_70%)]" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none blur-sm bg-[radial-gradient(circle,rgba(201,162,39,0.13),transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border border-brand-borderGold text-brand-goldLight text-xs">
            <Sparkles size={13} /> Spécialiste smartphones & réparation
          </div>
          <h1 className="font-display text-brand-white font-bold leading-[1.08] text-[clamp(2.2rem,5vw,3.2rem)]">
            Votre smartphone
            <br />
            mérite le <span className="text-brand-gold">meilleur</span>.
          </h1>
          <p className="text-brand-blueLight text-[15px] mt-[18px] tracking-wide">
            Vente · Réparation · Accessoires · Conseils
          </p>
          <p className="text-brand-gray text-[15px] mt-3 max-w-[440px] leading-relaxed">
            Nous réparons vos smartphones et vous proposons des téléphones, accessoires et
            solutions technologiques adaptés à vos besoins.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => onCta("#produits")}
              className="px-6 py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-br from-brand-blue to-brand-blueLight"
            >
              Voir nos produits
            </button>
            <button
              onClick={() => onCta("#devis")}
              className="px-6 py-3 rounded-lg font-semibold text-sm text-brand-goldLight border border-brand-borderGold"
            >
              Demander une réparation
            </button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative flex items-center justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center border border-brand-border bg-[radial-gradient(circle,#0D1420_40%,transparent_70%)]">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden flex items-center justify-center border border-brand-borderGold shadow-[0_0_60px_rgba(47,111,237,0.2)]">
                <img src={logo} alt="Docteur Apple" className="w-full h-full object-cover" />
              </div>
            </div>
            {[
              { Icon: Headphones, pos: "top-2 left-2" },
              { Icon: BatteryCharging, pos: "bottom-4 left-0" },
              { Icon: Camera, pos: "top-6 right-0" },
              { Icon: Wrench, pos: "bottom-2 right-6" },
            ].map(({ Icon, pos }, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-11 h-11 rounded-xl flex items-center justify-center bg-brand-panel border border-brand-border`}
              >
                <Icon size={18} color="#5B8DFF" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
