# Docteur Apple — Site web

Site vitrine et boutique en ligne pour Docteur Apple (vente de smartphones, accessoires,
réparation). React + TypeScript + Tailwind CSS + Supabase.

## 📁 Structure du projet

```
src/
  components/       → Navbar, Hero, ProductCard, ProductGrid, CategoryFilter,
                       RepairServices, RepairQuoteForm, Cart, About, Contact,
                       Footer, WhatsAppButton, CallButtonMobile
  data/             → services de réparation, liste des catégories
  lib/              → connexion Supabase, utilitaires WhatsApp / prix
  types.ts          → types TypeScript (Product, CartLine)
  App.tsx           → assemble tous les composants
  main.tsx          → point d'entrée
```

## 🚀 Démarrer en local (pour un développeur)

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Copier `.env.example` en `.env.local` et renseigner vos identifiants Supabase
   (voir le guide `guide-supabase-et-deploiement.md`) :
   ```bash
   cp .env.example .env.local
   ```
3. Lancer le site en local :
   ```bash
   npm run dev
   ```
4. Ouvrir l'adresse affichée dans le terminal (en général `http://localhost:5173`).

## 🏗️ Construire pour la mise en ligne

```bash
npm run build
```
Cela crée un dossier `dist/` prêt à être déployé (Vercel s'en charge automatiquement).

## ⚙️ Personnalisation rapide

- **Numéro WhatsApp** : dans `.env.local`, variable `VITE_WHATSAPP_NUMBER`.
- **Produits, prix, stock** : directement dans Supabase (Table Editor → `products`), pas dans le code.
- **Adresse / réseaux sociaux** : `src/components/Contact.tsx`.
- **Services de réparation proposés** : `src/data/repairServices.ts`.
- **Couleurs de la charte (noir / bleu électrique / or)** : `tailwind.config.js`.

## 🗄️ Base de données

Le schéma complet (tables + sécurité + données de départ) se trouve dans
`supabase-schema.sql`, à exécuter une seule fois dans Supabase → SQL Editor.

## 🌐 Mise en ligne

Voir `guide-supabase-et-deploiement.md` pour la procédure complète (GitHub + Vercel,
gratuite, avec sous-domaine au choix).
