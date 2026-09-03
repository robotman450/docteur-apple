import { Smartphone, Headphones, Zap, Cable, BatteryCharging, MessageCircle } from "lucide-react";
import { Product } from "../types";
import { fmtPrice, waLink } from "../lib/whatsapp";

interface ProductCardProps {
  product: Product;
  onAdd: (p: Product) => void;
}

// Icône générique selon la catégorie (à remplacer par de vraies photos via image_url plus tard)
function iconFor(product: Product) {
  const name = product.name.toLowerCase();
  if (name.includes("airpods") || name.includes("écouteur")) return Headphones;
  if (name.includes("chargeur") || name.includes("power")) return Zap;
  if (name.includes("câble") || name.includes("cable")) return Cable;
  if (name.includes("batterie") || name.includes("power bank")) return BatteryCharging;
  return Smartphone;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const Icon = iconFor(product);

  return (
    <div className="rounded-xl overflow-hidden flex flex-col border border-brand-border bg-brand-panel transition-transform hover:-translate-y-1">
      <div className="h-32 flex items-center justify-center relative bg-gradient-to-br from-brand-panel2 to-brand-bg">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Icon size={40} color="#5B8DFF" strokeWidth={1.3} />
        )}
        <span
          className={`absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full ${
            product.in_stock ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
          }`}
        >
          {product.in_stock ? "En stock" : "Rupture"}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="text-brand-white font-semibold text-sm">{product.name}</div>
        <div className="text-brand-gray text-xs leading-snug">{product.description}</div>
        <div className="text-brand-gold font-bold text-[15px] mt-1.5">{fmtPrice(product.price)}</div>
        <div className="flex gap-2 mt-3">
          <button
            disabled={!product.in_stock}
            onClick={() => onAdd(product)}
            className="flex-1 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blueLight disabled:opacity-40"
          >
            Commander
          </button>
          <a
            href={waLink(
              `Bonjour DOCTEUR APPLE,\nje souhaite commander :\n${product.name}\nPrix : ${fmtPrice(
                product.price
              )}\nQuantité : 1`
            )}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-lg text-xs flex items-center justify-center text-brand-goldLight border border-brand-borderGold"
          >
            <MessageCircle size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
