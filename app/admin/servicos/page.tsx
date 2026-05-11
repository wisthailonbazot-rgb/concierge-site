"use client";

import { useEffect, useState } from "react";
import {
  getServicesAll, createService, updateService, deleteService, type Service,
} from "@/lib/api";
import {
  DoorOpen, UserCheck, Shield, Wrench, Sparkles, Waves, Leaf,
  Building2, Users, Key, Truck, Clock, Zap, Droplets, Star, Package,
  Plus, Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Available icons ────────────────────────────────────────────────────────
export const ICON_MAP: Record<string, LucideIcon> = {
  DoorOpen, UserCheck, Shield, Wrench, Sparkles, Waves, Leaf,
  Building2, Users, Key, Truck, Clock, Zap, Droplets, Star, Package,
};

const ICON_OPTIONS = [
  { name: "DoorOpen",  label: "Portaria" },
  { name: "UserCheck", label: "Recepção" },
  { name: "Shield",    label: "Segurança" },
  { name: "Wrench",    label: "Manutenção" },
  { name: "Sparkles",  label: "Limpeza" },
  { name: "Waves",     label: "Piscina" },
  { name: "Leaf",      label: "Jardinagem" },
  { name: "Building2", label: "Condomínio" },
  { name: "Users",     label: "Equipe" },
  { name: "Key",       label: "Acesso" },
  { name: "Truck",     label: "Transporte" },
  { name: "Clock",     label: "24 Horas" },
  { name: "Zap",       label: "Elétrica" },
  { name: "Droplets",  label: "Hidráulica" },
  { name: "Star",      label: "Premium" },
  { name: "Package",   label: "Logística" },
];

function ServiceIcon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  const Icon = ICON_MAP[name] || Wrench;
  return <Icon size={size} className={className} />;
}

export default function ServicosAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // New service form state
  const [form, setForm] = useState({
    icon_name: "DoorOpen",
    title: "",
    description: "",
    tag: "",
  });

  const load = async () => {
    try {
      setServices(await getServicesAll());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setAdding(true);
    try {
      const s = await createService(form);
      setServices((prev) => [...prev, s]);
      setForm({ icon_name: "DoorOpen", title: "", description: "", tag: "" });
    } catch (err) { console.error(err); }
    finally { setAdding(false); }
  };

  const handleToggle = async (id: string, active: boolean) => {
    try {
      await updateService(id, { active: !active });
      setServices((prev) => prev.map((s) => (s.id === id ? { ...s, active: !active } : s)));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover este serviço?")) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async (id: string, data: Partial<Service>) => {
    try {
      await updateService(id, data);
      setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    } catch (err) { console.error(err); }
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 text-sm transition-colors";
  const selectCls = "bg-navy-950 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-gold-500/50 transition-colors";

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display text-white tracking-wide">SERVIÇOS</h1>
        <p className="text-white/30 text-sm mt-1">
          Gerencie os serviços exibidos na seção &quot;Nossos Serviços&quot; do site
        </p>
      </div>

      {/* ── Add form ────────────────────────────────────────────────────── */}
      <form onSubmit={handleAdd} className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
        <h3 className="text-white/70 text-xs tracking-widest uppercase mb-4">Novo Serviço</h3>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          {/* Icon picker */}
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wide block mb-1.5">Ícone</label>
            <div className="flex gap-2 flex-wrap">
              {ICON_OPTIONS.map((opt) => {
                const Icon = ICON_MAP[opt.name];
                const selected = form.icon_name === opt.name;
                return (
                  <button
                    key={opt.name}
                    type="button"
                    title={opt.label}
                    onClick={() => setForm((f) => ({ ...f, icon_name: opt.name }))}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all border ${
                      selected
                        ? "bg-gold-500/20 border-gold-500/50 text-gold-500"
                        : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wide block mb-1.5">Tag (categoria)</label>
            <input
              type="text"
              value={form.tag}
              onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
              placeholder="Ex: Segurança, Higiene..."
              className={inputCls}
            />
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Título do serviço (ex: Portaria 24h)"
            required
            className={inputCls}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Descrição completa do serviço..."
            rows={2}
            className={`${inputCls} resize-none`}
          />
          <button
            type="submit"
            disabled={adding || !form.title.trim()}
            className="flex items-center gap-2 bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/25 text-gold-500 font-bold px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-50"
          >
            <Plus size={14} />
            {adding ? "Adicionando..." : "Adicionar serviço"}
          </button>
        </div>
      </form>

      {/* ── Services list ───────────────────────────────────────────────── */}
      {loading ? (
        <div className="text-white/30 text-sm">Carregando...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 text-white/20">
          <Wrench size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Nenhum serviço cadastrado.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((svc) => (
            <div
              key={svc.id}
              className={`bg-white/5 border rounded-xl p-4 transition-all ${
                svc.active ? "border-white/10" : "border-white/5 opacity-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Icon selector */}
                <div className="flex-shrink-0 mt-0.5">
                  <select
                    value={svc.icon_name}
                    onChange={(e) => handleUpdate(svc.id, { icon_name: e.target.value })}
                    className={`${selectCls} appearance-none cursor-pointer`}
                    title="Trocar ícone"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.name} value={opt.name}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Preview icon */}
                <div className="w-8 h-8 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ServiceIcon name={svc.icon_name} size={14} className="text-gold-500" />
                </div>

                {/* Fields */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      defaultValue={svc.title}
                      onBlur={(e) => handleUpdate(svc.id, { title: e.target.value })}
                      className="flex-1 bg-transparent text-white font-bold text-sm focus:outline-none border-b border-transparent focus:border-white/20 pb-0.5 transition-colors"
                      placeholder="Título"
                    />
                    <input
                      defaultValue={svc.tag}
                      onBlur={(e) => handleUpdate(svc.id, { tag: e.target.value })}
                      className="w-28 bg-transparent text-gold-500/60 text-xs focus:outline-none border-b border-transparent focus:border-gold-500/20 pb-0.5 transition-colors text-right"
                      placeholder="Tag..."
                    />
                  </div>
                  <textarea
                    defaultValue={svc.description}
                    onBlur={(e) => handleUpdate(svc.id, { description: e.target.value })}
                    rows={2}
                    className="w-full bg-transparent text-white/40 text-xs focus:outline-none focus:text-white/70 resize-none transition-colors"
                    placeholder="Descrição do serviço..."
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(svc.id, svc.active)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      svc.active
                        ? "bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400/20"
                        : "bg-white/5 text-white/30 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {svc.active ? "Ativo" : "Inativo"}
                  </button>
                  <button
                    onClick={() => handleDelete(svc.id)}
                    className="text-white/20 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-white/15 text-xs mt-8">
        Clique nos campos de texto para editar. Alterações são salvas automaticamente ao sair do campo.
        Serviços inativos não aparecem no site.
      </p>
    </div>
  );
}
