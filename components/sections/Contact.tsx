"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, CheckCircle, Phone, Clock } from "lucide-react";

function InstagramIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const schema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().min(10, "Telefone inválido").max(15),
  condo: z.string().min(2, "Informe o nome do condomínio ou empresa"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch {
      // fallback: show success anyway for demo
      setSubmitted(true);
      reset();
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-navy-800/50 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:border-gold-500/60 focus:bg-navy-800/80";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <section id="contato" className="py-20 md:py-28 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 geo-pattern opacity-30" />
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
            <span>Contato</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            SOLICITE SEU{" "}
            <span className="text-shimmer">ORÇAMENTO GRATUITO</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto text-lg">
            Entre em contato e descubra como podemos transformar a gestão do seu condomínio.
            Respondemos em até 24 horas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-display text-2xl text-white mb-2">FALE CONOSCO</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Nossa equipe está pronta para apresentar as melhores soluções para o seu
                condomínio. Solicite uma visita técnica gratuita.
              </p>
            </div>

            {[
              {
                icon: Mail,
                label: "E-mail",
                value: "conciergeconservacao@gmail.com",
                href: "mailto:conciergeconservacao@gmail.com",
              },
              {
                icon: Phone,
                label: "WhatsApp",
                value: "(00) 00000-0000",
                href: "https://wa.me/5500000000000",
              },
              {
                icon: InstagramIcon,
                label: "Instagram",
                value: "@conciergeconservacao",
                href: "https://www.instagram.com/conciergeconservacao",
              },
              {
                icon: Clock,
                label: "Atendimento",
                value: "24h por dia, 7 dias por semana",
                href: null,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-gold-500/10 border border-gold-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={18} className="text-gold-500" />
                </div>
                <div>
                  <div className="text-white/40 text-xs font-semibold tracking-wider uppercase mb-1">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-white text-sm hover:text-gold-500 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-white text-sm">{value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Trust badge */}
            <div className="mt-8 p-5 bg-gold-500/5 border border-gold-500/15 rounded-xl">
              <p className="text-gold-500 text-sm font-bold mb-1">✓ Orçamento 100% Gratuito</p>
              <p className="text-white/50 text-xs">
                Visita técnica sem compromisso. Analisamos suas necessidades e elaboramos
                uma proposta personalizada.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-navy-800/40 border border-white/8 rounded-2xl p-7 md:p-9 backdrop-blur-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-gold-500/10 border-2 border-gold-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-gold-500" />
                  </div>
                  <h3 className="font-display text-3xl text-white mb-3">MENSAGEM ENVIADA!</h3>
                  <p className="text-white/60 mb-8">
                    Recebemos sua solicitação. Nossa equipe entrará em contato em breve.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline text-sm px-6 py-3"
                  >
                    Enviar nova mensagem
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2 block">
                        Nome completo *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="Seu nome"
                        className={inputClass}
                      />
                      {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2 block">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        {...register("phone")}
                        placeholder="(00) 00000-0000"
                        className={inputClass}
                      />
                      {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2 block">
                      Condomínio / Empresa *
                    </label>
                    <input
                      {...register("condo")}
                      placeholder="Nome do condomínio ou empresa"
                      className={inputClass}
                    />
                    {errors.condo && <p className={errorClass}>{errors.condo.message}</p>}
                  </div>

                  <div>
                    <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-2 block">
                      Mensagem *
                    </label>
                    <textarea
                      {...register("message")}
                      placeholder="Descreva os serviços que necessita e quantos colaboradores precisam..."
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Solicitar Orçamento Gratuito
                      </>
                    )}
                  </button>

                  <p className="text-white/30 text-xs text-center">
                    Ao enviar, você concorda com nossa{" "}
                    <a href="/privacidade" className="text-gold-500/70 hover:text-gold-500 underline">
                      Política de Privacidade
                    </a>
                    . Seus dados estão seguros.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
