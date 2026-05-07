"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Award, Users, Target } from "lucide-react";
import { getGallery } from "@/lib/api";

const FALLBACK_IMG = "/gallery/condo-aereo.jpeg";

const highlights = [
  "Equipe profissional treinada e uniformizada",
  "Gestão eficiente e relatórios periódicos",
  "Processos rigorosos de controle de qualidade",
  "Atendimento personalizado para cada condomínio",
  "Conformidade com normas trabalhistas vigentes",
  "Supervisão presencial e suporte remoto 24h",
];

const values = [
  { icon: Award, title: "Qualidade", text: "Padrão de excelência em cada serviço" },
  { icon: Users, title: "Equipe", text: "Profissionais capacitados e comprometidos" },
  { icon: Target, title: "Foco", text: "Soluções sob medida para cada cliente" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [photoSrc, setPhotoSrc] = useState(FALLBACK_IMG);
  const [photoAlt, setPhotoAlt] = useState("Condomínio atendido pela Concierge Brasil");

  useEffect(() => {
    getGallery("about")
      .then((data) => {
        if (data.length > 0) {
          setPhotoSrc(data[0].src);
          setPhotoAlt(data[0].alt);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="sobre" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-navy-900/3 to-transparent pointer-events-none" />

      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-premium">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoSrc}
                alt={photoAlt}
                className="w-full h-[300px] sm:h-[420px] lg:h-[500px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
              {/* Badge over image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award size={24} className="text-navy-900" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Empresa de Confiança</div>
                    <div className="text-white/60 text-xs">+4 anos no mercado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card — hidden on xs, visible sm+ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden sm:block absolute -top-6 -right-6 bg-navy-700 border border-gold-500/20 rounded-2xl p-5 shadow-gold w-48"
            >
              <div className="font-display text-4xl text-shimmer mb-1">+50</div>
              <div className="text-white/70 text-xs leading-tight">Contratos de serviço realizados</div>
            </motion.div>

            {/* Gold border decoration — hidden on xs */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-3/4 h-3/4 border-2 border-gold-500/20 rounded-2xl -z-10" />
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="section-badge">
              <span>Sobre Nós</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy-900 leading-tight mb-6">
              CUIDADO E PROFISSIONALISMO EM CADA{" "}
              <span className="text-shimmer">DETALHE</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              A <strong className="text-navy-700">Concierge Brasil Facilities Services</strong> é
              especializada em gestão de serviços para condomínios residenciais e comerciais. Nossa
              missão é oferecer soluções de portaria, limpeza e conservação com o mais alto padrão
              de qualidade e profissionalismo.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Com uma equipe treinada, uniformizada e supervisionada, garantimos que cada espaço
              do seu condomínio seja tratado com o máximo de cuidado, proporcionando segurança,
              conforto e bem-estar para todos os moradores.
            </p>

            {/* Highlights */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-2.5 text-sm text-gray-700"
                >
                  <CheckCircle2 size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4">
              {values.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="text-center p-4 rounded-xl bg-navy-900/4 border border-navy-900/8 hover:border-gold-500/30 transition-all"
                >
                  <Icon size={24} className="text-gold-500 mx-auto mb-2" />
                  <div className="font-bold text-navy-900 text-sm">{title}</div>
                  <div className="text-gray-500 text-xs mt-1">{text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
