import { ChevronRight } from "lucide-react";
import { repairServices } from "../data/repairServices";
import Reveal from "./Reveal";

interface RepairServicesProps {
  onQuote: () => void;
}

export default function RepairServices({ onQuote }: RepairServicesProps) {
  return (
    <section id="reparation" className="px-5 py-16 bg-brand-bgAlt">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="font-display text-brand-white text-[28px] font-bold text-center">
            Votre téléphone a un problème ?
            <br />
            <span className="text-brand-gold">Nous avons la solution.</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {repairServices.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 70}>
              <div className="p-5 rounded-xl flex items-start gap-3 border border-brand-border bg-brand-panel transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-brand-blue/15">
                  <s.icon size={18} color="#5B8DFF" />
                </div>
                <div>
                  <div className="text-brand-white font-semibold text-sm">{s.label}</div>
                  <div className="text-brand-gray text-xs mt-1">{s.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={onQuote}
            className="px-7 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 text-brand-bg bg-gradient-to-br from-brand-gold to-brand-goldLight"
          >
            Obtenir un devis <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
