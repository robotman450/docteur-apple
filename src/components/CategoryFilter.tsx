import { CATEGORIES } from "../data/repairServices";

interface CategoryFilterProps {
  active: string;
  setActive: (cat: string) => void;
}

export default function CategoryFilter({ active, setActive }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            active === cat
              ? "bg-gradient-to-br from-brand-blue to-brand-blueLight text-white border border-transparent"
              : "text-brand-gray border border-brand-border"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
