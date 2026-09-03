import { useState } from "react";
import { Minus, Plus, Trash2, X, MessageCircle } from "lucide-react";
import { Product, CartLine } from "../types";
import { fmtPrice, waLink } from "../lib/whatsapp";
import { supabase } from "../lib/supabaseClient";

interface CartProps {
  open: boolean;
  onClose: () => void;
  items: CartLine[];
  setItems: React.Dispatch<React.SetStateAction<CartLine[]>>;
  products: Product[];
}

export default function Cart({ open, onClose, items, setItems, products }: CartProps) {
  const [placing, setPlacing] = useState(false);

  const lines = items
    .map((it) => ({ ...it, product: products.find((p) => p.id === it.id) }))
    .filter((l) => l.product) as { id: string; qty: number; product: Product }[];

  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
        .filter((it) => it.qty > 0)
    );
  };
  const remove = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));

  const waMessage = () => {
    const list = lines.map((l) => `${l.product.name} x${l.qty} — ${fmtPrice(l.product.price * l.qty)}`).join("\n");
    return `Bonjour DOCTEUR APPLE,\nje souhaite commander :\n${list}\n\nTotal : ${fmtPrice(total)}`;
  };

  async function placeOrder() {
    setPlacing(true);
    try {
      await supabase.from("orders").insert({
        items: lines.map((l) => ({ product_id: l.product.id, name: l.product.name, price: l.product.price, qty: l.qty })),
        total,
      });
    } catch {
      // On n'empêche pas la commande WhatsApp si l'enregistrement échoue
    } finally {
      setPlacing(false);
      window.open(waLink(waMessage()), "_blank");
    }
  }

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />}
      <div
        className="fixed top-0 right-0 h-full w-full sm:w-96 z-50 flex flex-col transition-transform duration-300 bg-brand-bgAlt border-l border-brand-border"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between p-5 border-b border-brand-border">
          <div className="text-brand-white font-bold text-base">Panier</div>
          <button onClick={onClose} aria-label="Fermer">
            <X size={18} color="#8891A0" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {lines.length === 0 && <div className="text-brand-gray text-sm">Votre panier est vide.</div>}
          {lines.map((l) => (
            <div key={l.id} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-brand-panel text-brand-gray text-[10px] text-center">
                {l.product.name.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-brand-white text-[13px] font-semibold truncate">{l.product.name}</div>
                <div className="text-brand-gold text-xs">{fmtPrice(l.product.price)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(l.id, -1)} className="text-brand-gray">
                  <Minus size={14} />
                </button>
                <span className="text-brand-white text-[13px]">{l.qty}</span>
                <button onClick={() => updateQty(l.id, 1)} className="text-brand-gray">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={() => remove(l.id)} aria-label="Supprimer">
                <Trash2 size={14} color="#F87171" />
              </button>
            </div>
          ))}
        </div>

        {lines.length > 0 && (
          <div className="p-5 border-t border-brand-border">
            <div className="flex justify-between mb-4 text-brand-white text-[15px] font-bold">
              <span>Total</span>
              <span className="text-brand-gold">{fmtPrice(total)}</span>
            </div>
            <button
              onClick={placeOrder}
              disabled={placing}
              className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white text-sm bg-gradient-to-br from-brand-blue to-brand-blueLight disabled:opacity-60"
            >
              <MessageCircle size={15} /> {placing ? "Enregistrement..." : "Commander via WhatsApp"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
