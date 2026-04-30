"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Shield, Clock, Star } from "lucide-react";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}));

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const text = el.getAttribute("data-text") || "";
    let charIndex = 0;

    // Wrap each WORD in inline-block to prevent mid-word line breaks,
    // then animate each character inside.
    el.innerHTML = text
      .split(" ")
      .map((word) => {
        const chars = word
          .split("")
          .map((char) => {
            const delay = charIndex * 30;
            charIndex++;
            return `<span class="char inline-block opacity-0 translate-y-8 transition-all duration-500" style="transition-delay:${delay}ms">${char}</span>`;
          })
          .join("");
        return `<span class="inline-block">${chars}</span>`;
      })
      .join(" ");

    const timeout = setTimeout(() => {
      el.querySelectorAll(".char").forEach((span) => {
        span.classList.remove("opacity-0", "translate-y-8");
      });
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToServices = () => {
    document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Grid pattern */}
      <div className="absolute inset-0 geo-pattern opacity-60" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-navy-700/30 blur-[120px]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold-500/5 blur-[80px]" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle bg-gold-500/30"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              "--duration": `${p.duration}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Decorative rings — hidden on mobile to avoid visual clutter */}
      <div className="pointer-events-none hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-500/5 animate-spin-slow" />
      <div className="pointer-events-none hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold-500/8" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
            Atendimento 24h · 7 dias por semana
          </motion.div>

          {/* Main title */}
          <h1
            ref={titleRef}
            data-text="SEGURANÇA E EXCELÊNCIA PARA SEU CONDOMÍNIO"
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-tight sm:leading-none tracking-wide mb-6"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Portaria 24h, zeladoria, limpeza e conservação profissional.
            Mais de uma década cuidando dos melhores condomínios com dedicação e excelência.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a
              href="#contato"
              onClick={(e) => { e.preventDefault(); document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-gold text-base"
            >
              Solicitar Orçamento Gratuito
            </a>
            <a
              href="#servicos"
              onClick={(e) => { e.preventDefault(); document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-outline text-base"
            >
              Conheça Nossos Serviços
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
          >
            {[
              { icon: Shield, text: "Equipe Treinada" },
              { icon: Clock, text: "Atendimento 24h" },
              { icon: Star, text: "+4 Anos de Experiência" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
                <Icon size={16} className="text-gold-500" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-500/60 hover:text-gold-500 transition-colors"
        aria-label="Rolar para baixo"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
}
