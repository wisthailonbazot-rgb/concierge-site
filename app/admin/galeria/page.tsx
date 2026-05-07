"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { Trash2, Upload, Eye, EyeOff, Loader, ImageOff } from "lucide-react";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  active: boolean;
  display_order: number;
};

export default function GaleriaAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const supabase = createClient();
    if (!supabase) { setLoading(false); return; }
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true });
    if (data) setImages(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const supabase = createClient();
    if (!supabase) { setUploading(false); return; }

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (uploadError) { console.error(uploadError); continue; }

      const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);

      await supabase.from("gallery_images").insert({
        src: publicUrl,
        alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        active: true,
        display_order: images.length + 1,
      });
    }

    await load();
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleActive = async (id: string, current: boolean) => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("gallery_images").update({ active: !current }).eq("id", id);
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, active: !current } : img)));
  };

  const handleDelete = async (id: string, src: string) => {
    if (!confirm("Remover esta foto da galeria?")) return;
    const supabase = createClient();
    if (!supabase) return;

    // Delete from storage if Supabase URL
    if (src.includes("/storage/v1/object/public/gallery/")) {
      const path = src.split("/gallery/")[1];
      await supabase.storage.from("gallery").remove([path]);
    }

    await supabase.from("gallery_images").delete().eq("id", id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAltChange = async (id: string, alt: string) => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("gallery_images").update({ alt }).eq("id", id);
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
                  onClick={() => handleDelete(img.id, img.src)}
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
