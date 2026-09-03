import { Phone } from "lucide-react";
import { WHATSAPP_NUMBER } from "../lib/whatsapp";

export default function CallButtonMobile() {
  return (
    <a
      href={`tel:+${WHATSAPP_NUMBER}`}
      className="md:hidden fixed bottom-5 left-5 z-30 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-brand-blue to-brand-blueLight shadow-[0_6px_20px_rgba(47,111,237,0.4)]"
      aria-label="Appeler maintenant"
    >
      <Phone size={22} color="#fff" />
    </a>
  );
}
