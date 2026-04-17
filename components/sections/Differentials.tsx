"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, TrendingUp, Clock4, Heart } from "lucide-react";
import Image from "next/image";

const differentials = [
  {
    icon: Users,
    title: "Equipe Treinada e Uniformizada",
    text: "Todos os nossos colaboradores passam por treinamento rigoroso e usam uniformes identificados, transmitindo profissionalismo e confiança.",
  },
  {
    icon: TrendingUp,
    title: "Gestão Profissional e Transparente",
    text: "Relatórios periódicos, supervisão constante e comunicação eficiente com a administração do condomínio.",
  },
  {
    icon: Clock4,
    title: "Pontualidade e Confiabilidade",
    text: "Cumprimos rigorosamente os horários e contratos, garantindo continuidade nos serviços sem interrupções.",
  },
  {
    icon: Heart,
    title: "Atendimento Personalizado 24h",
    text: "Cada condomínio tem necessidades únicas. Oferecemos atendimento personalizado e suporte disponível a qualquer hora.",
  },
];

export default function Differentials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="diferenciais" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background parallax image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop&q=80"
          alt="Condomínio profissional"
          fill
          className="object-cover object-center"
          style={{ transform: "scale(1.1)" }}
        />
        <div className="absolute inset-0 overlay-navy" />
      </div>

      {/* Top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-badge justify-center">
            <span>Nossos Diferenciais</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            POR QUE ESCOLHER A{" "}
            <span className="text-shimmer">CONCIERGE BRASIL</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
            Mais do que serviços, entregamos tranquilidade e a certeza de que seu condomínio
            está em boas mãos.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/40 backdrop-blur-sm rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 text-center"
              >
                {/* Number */}
                <div className="font-display text-6xl text-gold-500/10 group-hover:text-gold-500/20 absolute top-4 right-5 transition-colors leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-gold-500/10 border border-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gold-500/20 group-hover:border-gold-500/40 transition-all duration-500">
                  <Icon size={26} className="text-gold-500" />
                </div>

                <h3 className="font-display text-xl text-white mb-3 tracking-wide leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
