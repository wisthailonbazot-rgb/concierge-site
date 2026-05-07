"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Plus, Trash2, Briefcase } from "lucide-react";

type Job = {
  id: string;
  title: string;
  description: string;
  active: boolean;
  display_order: number;
};

export default function VagasAdmin() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [adding, setAdding] = useState(false);

  const load = async () => {
    const supabase = createClient();
    if (!supabase) { setLoading(false); return; }
    const { data } = await supabase
      .from("job_openings")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setJobs(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setAdding(true);
    const supabase = createClient();
    if (!supabase) { setAdding(false); return; }
    const { data } = await supabase
      .from("job_openings")
      .insert({ title: newTitle, description: newDesc, active: true, display_order: jobs.length + 1 })
      .select()
      .single();
    if (data) setJobs((prev) => [...prev, data]);
    setNewTitle("");
    setNewDesc("");
    setAdding(false);
  };

  const handleToggle = async (id: string, active: boolean) => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("job_openings").update({ active: !active }).eq("id", id);
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, active: !active } : j)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover esta vaga?")) return;
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("job_openings").delete().eq("id", id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const handleUpdate = async (id: string, field: keyof Job, value: string) => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("job_openings").update({ [field]: value }).eq("id", id);
  };

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display text-white tracking-wide">VAGAS</h1>
        <p className="text-white/30 text-sm mt-1">Posições exibidas na seção &quot;Trabalhe Conosco&quot;</p>
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
        <h3 className="text-white/70 text-xs tracking-widest uppercase mb-4">Nova Vaga</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Título da vaga (ex: Porteiro 24h)"
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 text-sm"
          />
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Descrição curta (opcional)"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold-500/50 text-sm"
          />
          <button
            type="submit"
            disabled={adding || !newTitle.trim()}
            className="flex items-center gap-2 bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/25 text-gold-500 font-bold px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-50"
          >
            <Plus size={14} />
            {adding ? "Adicionando..." : "Adicionar"}
          </button>
        </div>
      </form>

      {/* Job list */}
      {loading ? (
        <div className="text-white/30 text-sm">Carregando...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 text-white/20">
          <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Nenhuma vaga cadastrada.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`flex items-start gap-3 bg-white/5 border rounded-xl p-4 transition-all ${
                job.active ? "border-white/10" : "border-white/5 opacity-50"
              }`}
            >
              <div className="w-8 h-8 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Briefcase size={14} className="text-gold-500" />
              </div>
              <div className="flex-1 min-w-0">
                <input
                  defaultValue={job.title}
                  onBlur={(e) => handleUpdate(job.id, "title", e.target.value)}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none border-b border-transparent focus:border-white/20 pb-0.5 transition-colors"
                />
                <input
                  defaultValue={job.description}
                  onBlur={(e) => handleUpdate(job.id, "description", e.target.value)}
                  placeholder="Descrição..."
                  className="w-full bg-transparent text-white/40 text-xs mt-1 focus:outline-none border-b border-transparent focus:border-white/10 pb-0.5 transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggle(job.id, job.active)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    job.active
                      ? "bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400/20"
                      : "bg-white/5 text-white/30 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {job.active ? "Ativa" : "Inativa"}
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-white/20 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
