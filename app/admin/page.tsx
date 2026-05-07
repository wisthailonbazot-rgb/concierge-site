"use client";

import Link from "next/link";
import { Settings, Images, Briefcase, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

const cards = [
  {
    title: "Configurações",
    description: "Editar telefone, WhatsApp, email e Instagram da empresa",
    href: "/admin/configuracoes",
    icon: Settings,
    color: "text-blue-400",
    bg: "bg-blue-400/5 border-blue-400/15 hover:border-blue-400/40",
  },
  {
    title: "Galeria de Fotos",
    description: "Adicionar, remover e gerenciar fotos exibidas no site",
    href: "/admin/galeria",
    icon: Images,
    color: "text-gold-500",
    bg: "bg-gold-500/5 border-gold-500/15 hover:border-gold-500/40",
  },
  {
    title: "Vagas",
    description: "Gerenciar posições abertas na seção Trabalhe Conosco",
    href: "/admin/vagas",
    icon: Briefcase,
    color: "text-green-400",
    bg: "bg-green-400/5 border-green-400/15 hover:border-green-400/40",
  },
];

export default function AdminDashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setEmail(user.email);
    };
    getUser();
  }, []);

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-display text-white tracking-wide">DASHBOARD</h1>
        <p className="text-white/30 text-sm mt-1">
          {email ? `Conectado como ${email}` : "Bem-vindo ao painel"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map(({ title, description, href, icon: Icon, color, bg }) => (
          <Link
            key={href}
            href={href}
            className={`group block p-6 rounded-2xl border bg-white/3 ${bg} transition-all hover:-translate-y-1`}
          >
            <Icon size={22} className={`${color} mb-4`} />
            <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
            <p className="text-white/40 text-xs leading-relaxed mb-4">{description}</p>
            <div className={`flex items-center gap-1 text-xs ${color} opacity-0 group-hover:opacity-100 transition-opacity`}>
              Acessar <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick info */}
      <div className="mt-8 p-5 bg-white/3 border border-white/8 rounded-2xl">
        <p className="text-white/40 text-xs leading-relaxed">
          <span className="text-gold-500 font-bold">Dica:</span> Alterações feitas nas configurações e vagas são refletidas no site imediatamente.
          Para a galeria, fotos adicionadas aqui aparecem no site na próxima visita do usuário.
        </p>
      </div>
    </div>
  );
}
