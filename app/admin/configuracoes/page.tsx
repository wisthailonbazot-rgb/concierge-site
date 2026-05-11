"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings, type Settings } from "@/lib/api";
import { Save, CheckCircle, AlertCircle, Plus, Trash2, Phone } from "lucide-react";

type Status = "idle" | "saving" | "saved" | "error";

export default function ConfigPage() {
  const [settings, setSettings] = useState<Settings>({
    phones: [""],
    whatsapp: "",
    email: "",
    instagram: "",
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    getSettings()
      .then((s) => {
        // Garantir que phones seja um array
        if (!s.phones || s.phones.length === 0) {
          s.phones = s.phone ? [s.phone] : [""];
        }
        setSettings(s);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setStatus("saving");
    try {
      // Remove phones vazios antes de salvar
      const toSave = {
        ...settings,
        phones: (settings.phones || []).filter((p) => p.trim() !== ""),
      };
      await updateSettings(toSave);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const addPhone = () =>
    setSettings((prev) => ({ ...prev, phones: [...(prev.phones || []), ""] }));

  const removePhone = (i: number) =>
    setSettings((prev) => ({
      ...prev,
      phones: (prev.phones || []).filter((_, idx) => idx !== i),
    }));

  const updatePhone = (i: number, val: string) =>
    setSettings((prev) => {
      const phones = [...(prev.phones || [])];
      phones[i] = val;
      return { ...prev, phones };
    });

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 text-sm transition-colors";

  if (loading) return <div className="text-white/30 text-sm">Carregando...</div>;

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display text-white tracking-wide">CONFIGURAÇÕES</h1>
        <p className="text-white/30 text-sm mt-1">Informações de contato exibidas no site</p>
      </div>

      <div className="space-y-6">

        {/* ── Telefones ─────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white/60 text-xs tracking-wide uppercase">
              Telefones (exibidos no site)
            </label>
            <button
              type="button"
              onClick={addPhone}
              className="flex items-center gap-1 text-gold-500/70 hover:text-gold-500 text-xs transition-colors"
            >
              <Plus size={12} />
              Adicionar
            </button>
          </div>
          <div className="space-y-2">
            {(settings.phones || []).map((phone, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <Phone
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => updatePhone(i, e.target.value)}
                    placeholder="(62) 9244-0750"
                    className={`${inputCls} pl-9`}
                  />
                </div>
                {(settings.phones || []).length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhone(i)}
                    className="text-white/20 hover:text-red-400 transition-colors p-2 flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-white/20 text-xs mt-1.5">
            O primeiro número também é usado como link de ligação rápida.
          </p>
        </div>

        {/* ── WhatsApp ──────────────────────────────────────────────────── */}
        <div>
          <label className="block text-white/60 text-xs tracking-wide mb-2 uppercase">
            WhatsApp (somente números com DDI)
          </label>
          <input
            type="text"
            value={settings.whatsapp ?? ""}
            onChange={(e) => setSettings((prev) => ({ ...prev, whatsapp: e.target.value }))}
            placeholder="556292440750"
            className={inputCls}
          />
          <p className="text-white/20 text-xs mt-1.5">
            Usado no botão flutuante e no formulário de orçamento.
          </p>
        </div>

        {/* ── E-mail ────────────────────────────────────────────────────── */}
        <div>
          <label className="block text-white/60 text-xs tracking-wide mb-2 uppercase">
            E-mail de contato
          </label>
          <input
            type="email"
            value={settings.email ?? ""}
            onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="conciergeconservacao@gmail.com"
            className={inputCls}
          />
        </div>

        {/* ── Instagram ─────────────────────────────────────────────────── */}
        <div>
          <label className="block text-white/60 text-xs tracking-wide mb-2 uppercase">
            Instagram (sem @)
          </label>
          <input
            type="text"
            value={settings.instagram ?? ""}
            onChange={(e) => setSettings((prev) => ({ ...prev, instagram: e.target.value }))}
            placeholder="conciergeconservacao"
            className={inputCls}
          />
        </div>
      </div>

      {/* ── Save button ───────────────────────────────────────────────────── */}
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
            Erro ao salvar. Verifique a conexão.
          </div>
        )}
      </div>

      <p className="text-white/20 text-xs mt-6 leading-relaxed">
        * As alterações são refletidas no site assim que o usuário recarregar a página.
      </p>
    </div>
  );
}
