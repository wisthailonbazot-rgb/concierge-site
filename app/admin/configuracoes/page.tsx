"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Save, CheckCircle, AlertCircle } from "lucide-react";

const fields = [
  { key: "phone", label: "Telefone (exibido no site)", placeholder: "(62) 9244-0750", type: "tel" },
  { key: "whatsapp", label: "WhatsApp (só números com DDI)", placeholder: "556292440750", type: "text" },
  { key: "email", label: "E-mail de contato", placeholder: "conciergeconservacao@gmail.com", type: "email" },
  { key: "instagram", label: "Instagram (sem @)", placeholder: "conciergeconservacao", type: "text" },
];

type Status = "idle" | "saving" | "saved" | "error";

export default function ConfigPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        const obj: Record<string, string> = {};
        data.forEach((row: { key: string; value: string }) => (obj[row.key] = row.value));
        setSettings(obj);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    setStatus("saving");
    const supabase = createClient();
    if (!supabase) { setStatus("error"); return; }

    try {
      for (const [key, value] of Object.entries(settings)) {
        await supabase
          .from("site_settings")
          .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
      }
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (loading) {
    return <div className="text-white/30 text-sm">Carregando...</div>;
  }

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display text-white tracking-wide">CONFIGURAÇÕES</h1>
        <p className="text-white/30 text-sm mt-1">Informações de contato exibidas no site</p>
      </div>

      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-white/60 text-xs tracking-wide mb-2 uppercase">
              {field.label}
            </label>
            <input
              type={field.type}
              value={settings[field.key] ?? ""}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              placeholder={field.placeholder}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 text-sm transition-colors"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={status === "saving"}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-900 font-bold px-6 py-3 rounded-xl transition-all text-sm"
        >
          <Save size={15} />
          {status === "saving" ? "Salvando..." : "Salvar alterações"}
        </button>

        {status === "saved" && (
          <div className="flex items-center gap-1.5 text-green-400 text-sm animate-in fade-in">
            <CheckCircle size={15} />
            Salvo com sucesso!
          </div>
        )}
        {status === "error" && (
          <div className="flex items-center gap-1.5 text-red-400 text-sm">
            <AlertCircle size={15} />
            Erro ao salvar. Verifique o Supabase.
          </div>
        )}
      </div>

      <p className="text-white/20 text-xs mt-6 leading-relaxed">
        * As alterações são refletidas no site assim que o usuário recarregar a página.
      </p>
    </div>
  );
}
