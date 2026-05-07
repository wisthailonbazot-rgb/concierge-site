"use client";

import { useEffect, useState, useRef } from "react";
import { getGalleryAll, uploadImages, updateImage, deleteImage, type GalleryImage } from "@/lib/api";
import { Trash2, Upload, Eye, EyeOff, Loader, ImageOff } from "lucide-react";

export default function GaleriaAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const data = await getGalleryAll();
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      const newImages = await uploadImages(Array.from(files));
      setImages((prev) => [...prev, ...newImages]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await updateImage(id, { active: !current });
      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, active: !current } : img)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remover esta foto da galeria?")) return;
    try {
      await deleteImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAltChange = async (id: string, alt: string) => {
    try {
      await updateImage(id, { alt });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-white tracking-wide">GALERIA</h1>
          <p className="text-white/30 text-sm mt-1">
            {images.length} foto{images.length !== 1 ? "s" : ""} cadastrada{images.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-navy-900 font-bold px-5 py-2.5 rounded-xl transition-all text-sm"
          >
            {uploading ? <Loader size={15} className="animate-spin" /> : <Upload size={15} />}
            {uploading ? "Enviando..." : "Adicionar fotos"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-white/30 text-sm">Carregando...</div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-white/20">
          <ImageOff size={48} className="mb-4 opacity-30" />
          <p className="text-sm">Nenhuma foto cadastrada.</p>
          <p className="text-xs mt-1">Clique em &quot;Adicionar fotos&quot; para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className={`relative group rounded-xl overflow-hidden border transition-opacity ${
                img.active ? "border-white/10" : "border-white/5 opacity-40"
              }`}
            >
              {/* Image */}
              <div className="aspect-square bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Alt text */}
              <div className="p-2 bg-navy-900/95">
                <input
                  defaultValue={img.alt}
                  onBlur={(e) => handleAltChange(img.id, e.target.value)}
                  className="w-full text-white/50 text-xs bg-transparent focus:outline-none focus:text-white truncate"
                  placeholder="Descrição da foto..."
                />
              </div>

              {/* Actions */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleActive(img.id, img.active)}
                  title={img.active ? "Ocultar" : "Exibir"}
                  className="w-7 h-7 bg-navy-900/90 backdrop-blur rounded-lg flex items-center justify-center text-white hover:text-gold-500 transition-colors"
                >
                  {img.active ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
                <button
                  onClick={() => handleDelete(img.id)}
                  title="Remover"
                  className="w-7 h-7 bg-navy-900/90 backdrop-blur rounded-lg flex items-center justify-center text-white hover:text-red-400 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Status badge */}
              {!img.active && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-navy-900/80 rounded text-white/40 text-[10px]">
                  Oculto
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-white/15 text-xs mt-8">
        Fotos com o ícone de olho fechado não são exibidas no site. Máximo recomendado: 12 fotos ativas.
      </p>
    </div>
  );
}
