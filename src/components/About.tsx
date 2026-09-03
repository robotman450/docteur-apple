import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="apropos" className="px-5 py-16 max-w-4xl mx-auto text-center">
      <Reveal>
        <h2 className="font-display text-brand-white text-[26px] font-bold">
          DOCTEUR <span className="text-brand-gold">APPLE</span>
        </h2>
        <p className="text-brand-gray text-[15px] mt-3.5 leading-relaxed">
          Passionnés par la technologie, nous accompagnons nos clients dans la réparation,
          l'achat et l'entretien de leurs appareils mobiles.
        </p>
        <div className="text-brand-blueLight text-[13px] mt-3.5 tracking-widest">
          RÉPARATION · VENTE · CONSEILS
        </div>
      </Reveal>
    </section>
  );
}
