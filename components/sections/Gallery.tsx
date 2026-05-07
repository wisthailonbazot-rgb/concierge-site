"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { getGallery, type GalleryImage } from "@/lib/api";

// Static fallback images (shown while API loads or if API has no images)
const FALLBACK: GalleryImage[] = [
  { id: "1", src: "/gallery/condo-aereo.jpeg", alt: "Condomínio atendido pela Concierge Brasil", active: true, display_order: 1 },
  { id: "2", src: "/gallery/condo-white.jpeg", alt: "Condomínio residencial", active: true, display_order: 2 },
  { id: "3", src: "/gallery/limpeza.jpeg", alt: "Limpeza e conservação", active: true, display_order: 3 },
  { id: "4", src: "/gallery/condo-predio.jpeg", alt: "Gestão de condomínio", active: true, display_order: 4 },
  { id: "5", src: "/gallery/worker-gas.jpeg", alt: "Zeladoria e manutenção", active: true, display_order: 5 },
  { id: "6", src: "/gallery/carro.jpeg", alt: "Frota Concierge Brasil", active: true, display_order: 6 },
];

// Layout spans for masonry effect (cycles through pattern)
const SPANS = ["sm:col-span-2", "", "sm:row-span-2", "", "", "sm:col-span-2", "", ""];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [images, setImages] = useState<GalleryImage[]>(FALLBACK);
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    getGallery("gallery")
      .then((data) => { if (data.length > 0) setImages(data); })
      .catch(() => {}); // usa fallback se API falhar
  }, []);

  return (
    <section id="galeria" className="py-20 md:py-28 bg-[#F8F9FD] relative overflow-hidden">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="section-badge justify-center">
            <span>Galeria</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy-900 leading-tight">
            NOSSO TRABALHO{" "}
            <span className="text-shimmer">EM AÇÃO</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Veja de perto a qualidade dos nossos serviços e a dedicação da nossa equipe
            em cada detalhe.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${SPANS[i % SPANS.length]}`}
              onClick={() => setSelected(img)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/50 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center shadow-gold">
                    <ZoomIn size={22} className="text-navy-900" />
                  </div>
                  <span className="text-white text-sm font-semibold">{img.alt}</span>
                </div>
              </div>
              {/* Bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy-900/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-sm font-semibold">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/conciergeconservacao"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-navy-700 hover:text-gold-500 font-semibold transition-colors border-b-2 border-current pb-0.5"
          >
            Ver mais no Instagram @conciergeconservacao →
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 lightbox-overlay bg-navy-950/90"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-premium"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full h-auto max-h-[80vh] object-contain bg-navy-900"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center hover:bg-gold-400 transition-colors"
              >
                <X size={20} className="text-navy-900" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-navy-900/90 px-6 py-4">
                <p className="text-white font-semibold">{selected.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
