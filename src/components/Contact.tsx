import { Phone, MessageCircle, MapPin, Clock, Mail, Instagram, Youtube } from "lucide-react";
import Reveal from "./Reveal";
import { WHATSAPP_NUMBER } from "../lib/whatsapp";

// À personnaliser : adresse, réseaux sociaux, coordonnées de la boutique
const PHONE_DISPLAY = "77 570 93 82";
const ADDRESS = "Boune Marché Serigne Fallou";
const SOCIALS = {
  instagram: "https://instagram.com/docteurapple",
  tiktok: "https://www.tiktok.com/@idymoykaysha?_r=1&_d=f06je3if2b5jle&sec_uid=MS4wLjABAAAArYPqRmRcC1PoWP4joMp-Z2mK6OOnfX0y9Kpsz9168bvv1ZEAGyCv7cUB2t1TpnzY&share_author_id=6942069403715519494&sharer_language=fr&source=h5_m&u_code=dhhkc24k8a5k2i&item_author_type=1&utm_source=whatsapp&share_enter_from=&tt_from=whatsapp&enable_checksum=1&utm_medium=ios&share_link_id=0D51E6CD-41CE-4A7C-9F0E-BE79CF2BEB7F&user_id=6942069403715519494&sec_user_id=MS4wLjABAAAArYPqRmRcC1PoWP4joMp-Z2mK6OOnfX0y9Kpsz9168bvv1ZEAGyCv7cUB2t1TpnzY&utm_campaign=client_share&panel_source_v2=qrcode_panel&ug_btm=b0,b0&social_share_type=5&share_app_id=1233",
};

export default function Contact() {
  const rows = [
    { icon: Phone, label: PHONE_DISPLAY },
    { icon: MessageCircle, label: `WhatsApp : ${PHONE_DISPLAY}` },
    { icon: MapPin, label: ADDRESS },
    { icon: Clock, label: "Lundi–Dimanch · 9h–21h" },
    { icon: Mail, label: "idydocteurapple@gmail.com" },
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
