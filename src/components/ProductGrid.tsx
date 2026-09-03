import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { Product } from "../types";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

interface ProductGridProps {
  onAdd: (p: Product) => void;
}

export default function ProductGrid({ onAdd }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Tous");

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });
      if (!active) return;
      if (error) {
        setError(error.message);
      } else {
        setProducts(data as Product[]);
      }
      setLoading(false);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = cat === "Tous" || p.category === cat;
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [products, query, cat]);

  return (
    <section id="produits" className="px-5 py-16 max-w-6xl mx-auto">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-display text-brand-white text-[28px] font-bold">Nos produits</h2>
            <p className="text-brand-gray text-sm mt-1.5">
              Smartphones et accessoires sélectionnés avec soin.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search size={15} color="#8891A0" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="pl-9 pr-4 py-2 rounded-lg text-sm outline-none w-full md:w-64 bg-brand-panel border border-brand-border text-brand-white"
              />
            </div>
            <CategoryFilter active={cat} setActive={setCat} />
          </div>
        </div>
      </Reveal>

      {error && (
        <div className="text-red-400 text-sm mb-6">
          Impossible de charger les produits ({error}). Vérifiez la connexion Supabase (fichier .env.local).
        </div>
      )}

      {loading ? (
        <div className="text-brand-gray text-sm">Chargement des produits…</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 60}>
              <ProductCard product={p} onAdd={onAdd} />
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-10 text-brand-gray text-sm">
              Aucun produit ne correspond à votre recherche.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
