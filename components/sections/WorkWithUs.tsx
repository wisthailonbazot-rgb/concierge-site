"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, MessageCircle, CheckCircle2 } from "lucide-react";
import { getJobs } from "@/lib/api";

type JobOpening = {
  id: string;
  title: string;
  description: string;
  active: boolean;
};

const defaultPositions: JobOpening[] = [
  { id: "1", title: "Porteiro 24h", description: "Controle de acesso e segurança em condomínios", active: true },
  { id: "2", title: "Zelador(a)", description: "Manutenção e conservação das áreas comuns", active: true },
  { id: "3", title: "Auxiliar de Limpeza", description: "Limpeza e higienização de ambientes", active: true },
  { id: "4", title: "Recepcionista", description: "Atendimento e controle de visitantes", active: true },
  { id: "5", title: "Vigia Noturno", description: "Vigilância e rondas noturnas", active: true },
];

const benefits = [
  "Registro em carteira",
  "Vale transporte",
  "Uniforme fornecido",
  "Treinamento completo",
  "Ambiente profissional",
  "Crescimento na empresa",
];

const WHATSAPP_NUMBER = "556292440750";

export default function WorkWithUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [positions, setPositions] = useState<JobOpening[]>(defaultPositions);

  useEffect(() => {
    getJobs()
      .then((data) => { if (data.length > 0) setPositions(data); })
      .catch(() => {}); // usa defaults se a API falhar
  }, []);

  const handleSendResume = () => {
    const message = `Olá! Tenho interesse em fazer parte da equipe da Concierge Brasil. Gostaria de enviar meu currículo para uma das vagas disponíveis.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="trabalhe-conosco" className="py-20 md:py-28 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 geo-pattern opacity-10" />
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
            <span>Carreiras</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            TRABALHE{" "}
            <span className="text-shimmer">CONOSCO</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
            Faça parte de uma equipe comprometida com a excelência. Buscamos profissionais
            dedicados e com vontade de crescer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Vagas */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl text-gold-500 mb-6 tracking-wide">VAGAS DISPONÍVEIS</h3>
            <div className="space-y-3">
              {positions.map((pos, i) => (
                <motion.div
                  key={pos.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-4 bg-white/5 border border-white/10 hover:border-gold-500/30 rounded-xl p-4 transition-all group cursor-pointer"
                  onClick={handleSendResume}
                >
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors mt-0.5">
                    <Briefcase size={17} className="text-gold-500" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{pos.title}</div>
                    {pos.description && (
                      <div className="text-white/50 text-xs mt-0.5">{pos.description}</div>
                    )}
                  </div>
                  <div className="ml-auto text-gold-500/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity self-center">
                    Candidatar →
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefícios + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl text-gold-500 mb-6 tracking-wide">BENEFÍCIOS</h3>
            <ul className="grid grid-cols-2 gap-3 mb-10">
              {benefits.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.07 }}
                  className="flex items-center gap-2.5 text-white/70 text-sm"
                >
                  <CheckCircle2 size={16} className="text-gold-500 flex-shrink-0" />
                  {b}
                </motion.li>
              ))}
            </ul>

            <div className="bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-gold-500/10 border border-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={26} className="text-gold-500" />
              </div>
              <h4 className="font-display text-2xl text-white mb-2 tracking-wide">ENVIE SEU CURRÍCULO</h4>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">
                Mande uma mensagem pelo WhatsApp com seu currículo em anexo.
                Nossa equipe entrará em contato em breve.
              </p>
              <button
                onClick={handleSendResume}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <MessageCircle size={20} />
                Enviar Currículo pelo WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
