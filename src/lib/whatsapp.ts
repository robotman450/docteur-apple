export const WHATSAPP_NUMBER =
  (import.meta.env.VITE_WHATSAPP_NUMBER as string) || "221774709382";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function fmtPrice(n: number): string {
  return n.toLocaleString("fr-FR").replace(/,/g, " ") + " FCFA";
}
