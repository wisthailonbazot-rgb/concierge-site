import { Mail, Phone } from "lucide-react";

function InstagramIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
import Link from "next/link";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

const services = [
  "Portaria 24h",
  "Recepção",
  "Vigia",
  "Zeladoria",
  "Limpeza e Conservação",
  "Limpeza de Piscina",
  "Manutenção em Jardinagem",
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 geo-pattern opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <path
                    d="M20 6c-1.1 0-2 .9-2 2v1.1A8.9 8.9 0 0012.1 11L11 10.3c-.95-.55-2.17-.22-2.72.73l-2 3.46c-.55.95-.22 2.17.73 2.72l1.1.64A9 9 0 008 20c0 .7.08 1.38.2 2.04l-1.1.64c-.95.55-1.28 1.77-.73 2.72l2 3.46c.55.95 1.77 1.28 2.72.73l1.1-.64A8.9 8.9 0 0018 30.9V32c0 1.1.9 2 2 2s2-.9 2-2v-1.1a8.9 8.9 0 005.9-2.9l1.1.64c.95.55 2.17.22 2.72-.73l2-3.46c.55-.95.22-2.17-.73-2.72l-1.1-.64c.12-.66.2-1.34.2-2.04 0-.7-.08-1.38-.2-2.04l1.1-.64c.95-.55 1.28-1.77.73-2.72l-2-3.46c-.55-.95-1.77-1.28-2.72-.73l-1.1.64A8.9 8.9 0 0022 9.1V8c0-1.1-.9-2-2-2zm0 7a7 7 0 110 14A7 7 0 0120 13z"
                    fill="#F5A800"
                  />
                </svg>
              </div>
              <div>
                <div className="font-display text-white text-lg leading-tight">CONCIERGE BRASIL</div>
                <div className="text-gold-500 text-[9px] tracking-[0.25em] uppercase">Facilities Services</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Excelência em portaria, limpeza e conservação para condomínios. Sua segurança e
              bem-estar são nossa prioridade.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/conciergeconservacao"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-gold-500/10 hover:border-gold-500/30 hover:text-gold-500 transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="mailto:conciergeconservacao@gmail.com"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-gold-500/10 hover:border-gold-500/30 hover:text-gold-500 transition-all"
                aria-label="E-mail"
              >
                <Mail size={18} />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-gold-500/10 hover:border-gold-500/30 hover:text-gold-500 transition-all"
                aria-label="WhatsApp"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg text-white tracking-wide mb-5">NAVEGAÇÃO</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-gold-500 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold-500 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg text-white tracking-wide mb-5">SERVIÇOS</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#servicos"
                    className="text-white/50 text-sm hover:text-gold-500 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold-500 transition-all duration-300" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-white tracking-wide mb-5">CONTATO</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={15} className="text-gold-500 mt-1 flex-shrink-0" />
                <a
                  href="mailto:conciergeconservacao@gmail.com"
                  className="text-white/50 text-sm hover:text-gold-500 transition-colors break-all"
                >
                  conciergeconservacao@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={15} className="text-gold-500 mt-1 flex-shrink-0" />
                <a
                  href="https://wa.me/5500000000000"
                  className="text-white/50 text-sm hover:text-gold-500 transition-colors"
                >
                  (00) 00000-0000
                </a>
              </div>
              <div className="flex items-start gap-3">
                <InstagramIcon size={15} className="text-gold-500 mt-1 flex-shrink-0" />
                <a
                  href="https://www.instagram.com/conciergeconservacao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 text-sm hover:text-gold-500 transition-colors"
                >
                  @conciergeconservacao
                </a>
              </div>
              <div className="mt-4 p-3 bg-gold-500/5 border border-gold-500/10 rounded-lg">
                <p className="text-gold-500 text-xs font-bold">Atendimento 24h</p>
                <p className="text-white/40 text-xs mt-0.5">Todos os dias da semana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Concierge Brasil Facilities Services. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacidade"
              className="text-white/30 text-xs hover:text-gold-500 transition-colors"
            >
              Política de Privacidade
            </Link>
            <span className="text-white/20 text-xs">CNPJ: 00.000.000/0001-00</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
