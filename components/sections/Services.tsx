"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  DoorOpen, UserCheck, Shield, Wrench, Sparkles, Waves, Leaf,
  Building2, Users, Key, Truck, Clock, Zap, Droplets, Star, Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getServices, type Service } from "@/lib/api";

// ─── Icon map ───────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  DoorOpen, UserCheck, Shield, Wrench, Sparkles, Waves, Leaf,
  Building2, Users, Key, Truck, Clock, Zap, Droplets, Star, Package,
};

// ─── Static fallback ────────────────────────────────────────────────────────
const FALLBACK: Service[] = [
  { id: "1", icon_name: "DoorOpen",  title: "Portaria 24h",            description: "Controle rigoroso de acesso, monitoramento de visitantes e registro de ocorrências. Segurança ininterrupta para o seu condomínio.", tag: "Segurança",   active: true, display_order: 1 },
  { id: "2", icon_name: "UserCheck", title: "Recepção",                description: "Atendimento profissional e cordial na recepção, gerenciando correspondências, encomendas e orientação de visitantes.", tag: "Atendimento", active: true, display_order: 2 },
  { id: "3", icon_name: "Shield",    title: "Vigia",                   description: "Vigilância patrimonial com rondas periódicas, garantindo a integridade e segurança de todas as áreas do condomínio.", tag: "Vigilância",  active: true, display_order: 3 },
  { id: "4", icon_name: "Wrench",    title: "Zeladoria",               description: "Inspeção e manutenção preventiva das instalações, identificando e corrigindo problemas antes que se tornem maiores.", tag: "Manutenção",  active: true, display_order: 4 },
  { id: "5", icon_name: "Sparkles",  title: "Limpeza e Conservação",   description: "Higienização completa das áreas comuns com produtos de qualidade e equipamentos modernos, mantendo ambientes impecáveis.", tag: "Higiene",     active: true, display_order: 5 },
  { id: "6", icon_name: "Waves",     title: "Limpeza de Piscina",      description: "Tratamento completo da água, limpeza de bordas, filtros e equipamentos. Piscina sempre cristalina e segura.", tag: "Aquático",    active: true, display_order: 6 },
  { id: "7", icon_name: "Leaf",      title: "Manutenção em Jardinagem",description: "Cuidado especializado com jardins, podas, adubação e paisagismo. Áreas verdes sempre bonitas e bem cuidadas.", tag: "Paisagismo",  active: true, display_order: 7 },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [services, setServices] = useState<Service[]>(FALLBACK);

  useEffect(() => {
    getServices()
      .then((data) => { if (data.length > 0) setServices(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="servicos" className="py-20 md:py-28 bg-navy-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 geo-pattern opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-badge justify-center">
            <span>Nossos Serviços</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            SOLUÇÕES COMPLETAS PARA SEU{" "}
            <span className="text-shimmer">CONDOMÍNIO</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            Oferecemos uma gama completa de serviços especializados, garantindo qualidade,
            segurança e bem-estar para todos os moradores.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon_name] || Wrench;
            const isLast = i === services.length - 1;
            const isOdd = services.length % 3 !== 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`service-card group ${
                  isLast && isOdd
                    ? "sm:col-span-2 sm:max-w-sm sm:w-full sm:mx-auto lg:max-w-none lg:col-span-1 lg:col-start-2"
                    : ""
                }`}
              >
                {/* Tag */}
                <div className="inline-flex items-center text-gold-500/70 text-xs font-bold tracking-widest uppercase mb-6">
                  {service.tag}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-navy-700/60 border border-gold-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold-500/10 group-hover:border-gold-500/40 transition-all duration-500">
                  <Icon size={26} className="text-gold-500" />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl text-white mb-3 tracking-wide">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/55 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-14"
        >
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-gold inline-block"
          >
            Solicitar Orçamento para Todos os Serviços
          </a>
        </motion.div>
      </div>
    </section>
  );
}
