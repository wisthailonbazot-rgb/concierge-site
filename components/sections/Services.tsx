"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  DoorOpen, UserCheck, Shield, Wrench, Sparkles, Waves, Leaf
} from "lucide-react";

const services = [
  {
    icon: DoorOpen,
    title: "Portaria 24h",
    description:
      "Controle rigoroso de acesso, monitoramento de visitantes e registro de ocorrências. Segurança ininterrupta para o seu condomínio.",
    tag: "Segurança",
  },
  {
    icon: UserCheck,
    title: "Recepção",
    description:
      "Atendimento profissional e cordial na recepção, gerenciando correspondências, encomendas e orientação de visitantes.",
    tag: "Atendimento",
  },
  {
    icon: Shield,
    title: "Vigia",
    description:
      "Vigilância patrimonial com rondas periódicas, garantindo a integridade e segurança de todas as áreas do condomínio.",
    tag: "Vigilância",
  },
  {
    icon: Wrench,
    title: "Zeladoria",
    description:
      "Inspeção e manutenção preventiva das instalações, identificando e corrigindo problemas antes que se tornem maiores.",
    tag: "Manutenção",
  },
  {
    icon: Sparkles,
    title: "Limpeza e Conservação",
    description:
      "Higienização completa das áreas comuns com produtos de qualidade e equipamentos modernos, mantendo ambientes impecáveis.",
    tag: "Higiene",
  },
  {
    icon: Waves,
    title: "Limpeza de Piscina",
    description:
      "Tratamento completo da água, limpeza de bordas, filtros e equipamentos. Piscina sempre cristalina e segura.",
    tag: "Aquático",
  },
  {
    icon: Leaf,
    title: "Manutenção em Jardinagem",
    description:
      "Cuidado especializado com jardins, podas, adubação e paisagismo. Áreas verdes sempre bonitas e bem cuidadas.",
    tag: "Paisagismo",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
            const Icon = service.icon;
            const isLast = i === services.length - 1;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`service-card group ${isLast ? "sm:col-start-1 lg:col-start-2" : ""}`}
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
