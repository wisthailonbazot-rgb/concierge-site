"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/api";
import { Settings, Images, Briefcase, Home, LogOut, ExternalLink } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
  { label: "Galeria", href: "/admin/galeria", icon: Images },
  { label: "Vagas", href: "/admin/vagas", icon: Briefcase },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    clearToken();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-60 bg-navy-950 border-r border-white/8 flex flex-col flex-shrink-0 min-h-screen">
      {/* Logo */}
      <div className="p-5 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
            <Image src="/logo.jpeg" alt="Concierge Brasil" width={36} height={36} className="object-cover w-full h-full" />
          </div>
          <div>
            <div className="font-display text-white text-xs tracking-widest">PAINEL ADMIN</div>
            <div className="text-gold-500 text-[9px] tracking-[0.2em] uppercase opacity-70">Concierge Brasil</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-gold-500/10 text-gold-500 border border-gold-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/8 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/30 hover:text-white/60 text-sm transition-all"
        >
          <ExternalLink size={14} />
          Ver site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-400/5 text-sm transition-all"
        >
          <LogOut size={14} />
          Sair
        </button>
      </div>
    </aside>
  );
}
