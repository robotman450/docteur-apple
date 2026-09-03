import { ShieldCheck, Star, MessageCircle, Zap } from "lucide-react";
import Reveal from "./Reveal";

const ITEMS = [
  { icon: ShieldCheck, title: "Réparation professionnelle", desc: "Micro-soudure & diagnostics précis" },
  { icon: Star, title: "Produits de qualité", desc: "Appareils vérifiés, garantie incluse" },
  { icon: MessageCircle, title: "Conseils personnalisés", desc: "On vous oriente selon votre besoin" },
  { icon: Zap, title: "Service rapide", desc: "La plupart des réparations sous 24h" },
];

export default function WhyUs() {
  return (
    <section className="px-5 py-16 max-w-6xl mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {ITEMS.map((it, i) => (
          <Reveal key={it.title} delay={i * 80}>
            <div className="p-5 rounded-xl h-full border border-brand-border bg-brand-panel transition-transform hover:-translate-y-1">
              <it.icon size={20} color="#C9A227" />
              <div className="text-brand-white font-semibold text-sm mt-3">{it.title}</div>
              <div className="text-brand-gray text-[13px] mt-1.5 leading-relaxed">{it.desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
