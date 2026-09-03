import { MessageCircle } from "lucide-react";
import { waLink } from "../lib/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={waLink("Bonjour DOCTEUR APPLE, j'aimerais avoir plus d'informations.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full flex items-center justify-center bg-[#25D366] shadow-[0_6px_20px_rgba(37,211,102,0.4)]"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle size={24} color="#fff" />
    </a>
  );
}
