export default function Footer() {
  return (
    <footer className="px-5 py-10 border-t border-brand-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-brand-gray text-xs">
          © {new Date().getFullYear()} Docteur Apple — Tous droits réservés.
        </div>
        <div className="flex gap-5 text-brand-gray text-xs">
          <span>Vente</span>
          <span>Réparation</span>
          <span>Accessoires</span>
          <span>Conseils</span>
        </div>
      </div>
    </footer>
  );
}
