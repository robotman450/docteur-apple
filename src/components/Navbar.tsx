import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "../assets/logo.jpg";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onMenuLink: (href: string) => void;
}

const LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Produits", href: "#produits" },
  { label: "Réparation", href: "#reparation" },
  { label: "À propos", href: "#apropos" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ cartCount, onCartClick, onMenuLink }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-bg/85 backdrop-blur border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <button onClick={() => onMenuLink("#accueil")} className="flex items-center gap-2">
          <img
            src={logo}
            alt="Docteur Apple"
            className="w-10 h-10 rounded-full object-cover border border-brand-borderGold"
          />
          <div className="text-left leading-none">
            <div className="font-display text-brand-white font-bold text-[15px] tracking-wide">
              DOCTEUR <span className="text-brand-gold">APPLE</span>
            </div>
            <div className="text-brand-gray text-[10px]">Vente · Réparation · Conseils</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => onMenuLink(l.href)}
              className="text-brand-gray text-sm hover:text-brand-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-lg border border-brand-border"
            aria-label="Panier"
          >
            <ShoppingCart size={18} color="#F5F6F8" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold bg-brand-gold text-brand-bg">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} color="#F5F6F8" /> : <Menu size={20} color="#F5F6F8" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3 border-t border-brand-border">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => {
                onMenuLink(l.href);
                setOpen(false);
              }}
              className="text-left py-2 text-brand-white text-[15px]"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
