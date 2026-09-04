import { Phone, MessageCircle, MapPin, Clock, Mail, Instagram, Youtube } from "lucide-react";
import Reveal from "./Reveal";
import { WHATSAPP_NUMBER } from "../lib/whatsapp";

// À personnaliser : adresse, réseaux sociaux, coordonnées de la boutique
const PHONE_DISPLAY = "77 470 93 82";
const ADDRESS = "Adresse à configurer — ex : Dakar, Sénégal";
const SOCIALS = {
  instagram: "https://instagram.com/docteurapple",
  youtube: "https://youtube.com/@docteurapple",
  tiktok: "https://tiktok.com/@docteurapple",
};

export default function Contact() {
  const rows = [
    { icon: Phone, label: PHONE_DISPLAY },
    { icon: MessageCircle, label: `WhatsApp : ${PHONE_DISPLAY}` },
    { icon: MapPin, label: ADDRESS },
    { icon: Clock, label: "Lun–Sam · 9h–19h" },
    { icon: Mail, label: "contact@docteurapple.com" },
  ];

  return (
    <section id="contact" className="px-5 py-16 bg-brand-bgAlt">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <Reveal>
          <h2 className="font-display text-brand-white text-[26px] font-bold">Contact</h2>
          <div className="flex flex-col gap-4 mt-6">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-brand-panel">
                  <r.icon size={16} color="#C9A227" />
                </div>
                <span className="text-brand-gray text-sm">{r.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center border border-brand-border">
              <Instagram size={16} color="#8891A0" />
            </a>
            <a href={SOCIALS.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center border border-brand-border">
              <Youtube size={16} color="#8891A0" />
            </a>
            <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center border border-brand-border text-brand-gray text-[10px] font-bold">
              TT
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="w-full h-64 rounded-xl overflow-hidden border border-brand-border">
            <iframe
              title="Localisation"
              className="w-full h-full grayscale contrast-90"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-17.48%2C14.66%2C-17.40%2C14.72&layer=mapnik"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
