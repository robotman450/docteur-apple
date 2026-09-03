import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import ProductGrid from "./components/ProductGrid";
import RepairServices from "./components/RepairServices";
import RepairQuoteForm from "./components/RepairQuoteForm";
import Cart from "./components/Cart";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CallButtonMobile from "./components/CallButtonMobile";
import { supabase } from "./lib/supabaseClient";
import { Product, CartLine } from "./types";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Chargé une fois ici pour que le panier connaisse les produits (prix, nom...)
  // ProductGrid recharge aussi sa propre liste filtrable ; les deux restent en phase
  // car ils lisent la même table Supabase.
  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .then(({ data }) => {
        if (data) setProducts(data as Product[]);
      });
  }, []);

  const addToCart = (p: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === p.id);
      if (existing) return prev.map((it) => (it.id === p.id ? { ...it, qty: it.qty + 1 } : it));
      return [...prev, { id: p.id, qty: 1 }];
    });
    setCartOpen(true);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const cartCount = cartItems.reduce((s, it) => s + it.qty, 0);

  return (
    <div className="min-h-screen bg-brand-bg font-body">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} onMenuLink={scrollTo} />
      <Hero onCta={scrollTo} />
      <WhyUs />
      <ProductGrid onAdd={addToCart} />
      <RepairServices onQuote={() => scrollTo("#devis")} />
      <RepairQuoteForm />
      <About />
      <Contact />
      <Footer />

      <Cart open={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} setItems={setCartItems} products={products} />
      <WhatsAppButton />
      <CallButtonMobile />
    </div>
  );
}
