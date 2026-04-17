"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) setTimeout(() => setVisible(true), 1500);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookies-accepted", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
          role="region"
          aria-label="Aviso de cookies"
        >
          <div className="max-w-4xl mx-auto bg-navy-900/95 backdrop-blur-lg border border-gold-500/20 rounded-2xl p-5 shadow-premium flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Cookie size={28} className="text-gold-500 flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1">
              <p className="text-white text-sm font-semibold mb-1">
                Utilizamos cookies para melhorar sua experiência
              </p>
              <p className="text-white/50 text-xs leading-relaxed">
                Usamos cookies essenciais para o funcionamento do site. Ao aceitar, você concorda
                com nossa{" "}
                <Link href="/privacidade" className="text-gold-500 hover:underline">
                  Política de Privacidade
                </Link>{" "}
                em conformidade com a LGPD (Lei 13.709/2018).
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto flex-shrink-0">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none border border-white/20 text-white/70 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:border-white/40"
              >
                Recusar
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold"
              >
                Aceitar Cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
