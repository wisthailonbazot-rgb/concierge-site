"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    const tooltipTimer = setTimeout(() => setTooltipOpen(true), 4000);
    const tooltipClose = setTimeout(() => setTooltipOpen(false), 9000);
    return () => { clearTimeout(timer); clearTimeout(tooltipTimer); clearTimeout(tooltipClose); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltipOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                className="relative bg-white rounded-2xl shadow-premium px-4 py-3 max-w-[200px] border border-gray-100"
              >
                <button
                  onClick={() => setTooltipOpen(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <X size={10} className="text-gray-600" />
                </button>
                <p className="text-navy-900 text-xs font-bold mb-0.5">Atendimento 24h!</p>
                <p className="text-gray-500 text-xs">Clique para falar com nossa equipe agora.</p>
                {/* Arrow */}
                <div className="absolute bottom-3 -right-1.5 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-[-45deg]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href="https://wa.me/556292440750?text=Olá! Gostaria de solicitar um orçamento para meu condomínio."
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#20BA5A] hover:scale-110 transition-all duration-300"
            aria-label="Fale conosco no WhatsApp"
            onClick={() => setTooltipOpen(false)}
          >
            <MessageCircle size={30} className="text-white" fill="white" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
