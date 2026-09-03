import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Variables Supabase manquantes. Vérifiez votre fichier .env.local (voir .env.example)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
