import { FormEvent, useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { waLink } from "../lib/whatsapp";

const inputClass =
  "px-4 py-3 rounded-lg text-sm outline-none bg-brand-panel border border-brand-border text-brand-white";

export default function RepairQuoteForm() {
  const [form, setForm] = useState({ name: "", phone: "", model: "", issue: "", description: "" });
  const [photo, setPhoto] = useState<File | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    let photo_url: string | null = null;

    try {
      if (photo) {
        const path = `${Date.now()}-${photo.name}`;
        const { error: uploadError } = await supabase.storage
          .from("repair-photos")
          .upload(path, photo);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("repair-photos").getPublicUrl(path);
        photo_url = data.publicUrl;
      }

      const { error: insertError } = await supabase.from("repair_requests").insert({
        name: form.name,
        phone: form.phone,
        model: form.model,
        issue: form.issue,
        description: form.description,
        photo_url,
      });
      if (insertError) throw insertError;

      setSent(true);
    } catch (err: any) {
      setError(err.message ?? "Une erreur est survenue, réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <section id="devis" className="px-5 py-16 max-w-xl mx-auto text-center">
        <CheckCircle2 size={42} color="#C9A227" className="mx-auto" />
        <h3 className="text-brand-white text-xl font-bold mt-3.5">Demande envoyée !</h3>
        <p className="text-brand-gray text-sm mt-2">
          Merci {form.name}, nous revenons vers vous rapidement avec un devis pour votre {form.model}.
        </p>
        <a
          href={waLink(
            `Bonjour DOCTEUR APPLE,\nDemande de devis :\nNom: ${form.name}\nModèle: ${form.model}\nProblème: ${form.issue}\nDétails: ${form.description}`
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-br from-brand-blue to-brand-blueLight"
        >
          <MessageCircle size={15} /> Confirmer sur WhatsApp
        </a>
      </section>
    );
  }

  return (
    <section id="devis" className="px-5 py-16 max-w-xl mx-auto">
      <h2 className="font-display text-brand-white text-2xl font-bold text-center">
        Demander mon devis
      </h2>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          required
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
        />
        <input
          required
          placeholder="Téléphone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
        />
        <input
          required
          placeholder="Modèle du téléphone"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          className={inputClass}
        />
        <input
          required
          placeholder="Type de problème (ex: écran cassé)"
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })}
          className={inputClass}
        />
        <textarea
          placeholder="Description du problème"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={`${inputClass} resize-none`}
        />
        <label className="text-xs text-brand-gray">
          Photo du téléphone (optionnelle)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
            className="block mt-2 text-xs text-brand-gray"
          />
        </label>

        {error && <div className="text-red-400 text-xs">{error}</div>}

        <button
          type="submit"
          disabled={submitting}
          className="py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mt-2 text-brand-bg bg-gradient-to-br from-brand-gold to-brand-goldLight disabled:opacity-50"
        >
          <Send size={15} /> {submitting ? "Envoi en cours..." : "Demander mon devis"}
        </button>
      </form>
    </section>
  );
}
