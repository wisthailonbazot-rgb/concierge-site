"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 4, suffix: "+", label: "Anos de Experiência", description: "Fundada em 2021" },
  { value: 50, suffix: "+", label: "Contratos Realizados", description: "Condomínios atendidos" },
  { value: 24, suffix: "h", label: "Atendimento Disponível", description: "Todos os dias" },
  { value: 7, suffix: "", label: "Serviços Especializados", description: "Soluções completas" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-navy-900 py-16 md:py-20 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative text-center px-4">
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 stat-divider" />
              )}
              <div className="font-display text-5xl md:text-6xl lg:text-7xl text-shimmer leading-none mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} active={active} />
              </div>
              <div className="text-white font-bold text-sm md:text-base mb-1">{stat.label}</div>
              <div className="text-white/40 text-xs">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
