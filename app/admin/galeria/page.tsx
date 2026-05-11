"use client";

import { useEffect, useState, useRef } from "react";
import {
  getGalleryAll, uploadImages, updateImage, deleteImage,
  type GalleryImage, type GallerySection,
} from "@/lib/api";
import { Trash2, Upload, Eye, EyeOff, Loader, ImageOff, RefreshCw } from "lucide-react";

// ─── Section definitions ────────────────────────────────────────────────────
const SECTIONS: { key: GallerySection; label: string; description: string; single: boolean }[] = [
  {
    key: "gallery",
    label: "Galeria Pública",
    description: "Fotos exibidas na seção Galeria do site. Você pode ter várias fotos ativas.",
    single: false,
  },
  {
    key: "about",
    label: "Sobre Nós",
    description: "Foto principal da seção Sobre Nós. Apenas uma foto ativa por vez.",
    single: true,
  },
  {
    key: "differentials",
    label: "Diferenciais",
    description: "Foto de fundo da seção Por Que Nos Escolher. Apenas uma foto ativa.",
    single: true,
  },
];

// ─── Position selector ──────────────────────────────────────────────────────
const POSITION_OPTIONS = [
  { value: "center",        label: "Centro" },
  { value: "top",           label: "Topo" },
  { value: "bottom",        label: "Base" },
  { value: "left",          label: "Esquerda" },
  { value: "right",         label: "Direita" },
  { value: "top center",    label: "Centro alto" },
  { value: "bottom center", label: "Centro baixo" },
];

function PositionSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value || "center"}
      onChange={(e) => onChange(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      title="Ajustar enquadramento da foto"
      className="w-full bg-navy-950 border border-white/10 rounded-lg px-2 py-1.5 text-white/50 text-[11px] focus:outline-none focus:border-gold-500/40 focus:text-white transition-colors cursor-pointer"
    >
      {POSITION_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

// ─── Single image slot component ───────────────────────────────────────────
function SingleImageSlot({
  image,
  onReplace,
  onDelete,
  onPositionChange,
  uploading,
}: {
  image: GalleryImage | null;
  onReplace: (file: File) => void;
  onDelete: (id: string) => void;
  onPositionChange: (id: string, pos: string) => void;
  uploading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-md">
      {image ? (
        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          <div className="aspect-video bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{ objectPosition: image.object_position || "center" }}
            />
          </div>
          <div className="p-3 bg-navy-900/95 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-white/60 text-xs truncate">{image.alt || "Sem descrição"}</p>
              <div className="flex gap-2 flex-shrink-0">
                <input ref={inputRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) onReplace(f); e.target.value = ""; }} />
                <button
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-1.5 bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/25 text-gold-500 text-xs font-bold px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                >
                  {uploading ? <Loader size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                  Substituir
                </button>
                <button
                  onClick={() => onDelete(image.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs px-3 py-1.5 rounded-lg transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            {/* Position selector */}
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-[11px] whitespace-nowrap flex-shrink-0">Enquadramento:</span>
              <PositionSelect
                value={image.object_position || "center"}
                onChange={(pos) => onPositionChange(image.id, pos)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-white/15 rounded-xl p-12 flex flex-col items-center justify-center gap-3 text-white/30">
          <ImageOff size={40} className="opacity-40" />
          <p className="text-sm">Nenhuma foto definida</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onReplace(f); e.target.value = ""; }} />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50"
          >
            {uploading ? <Loader size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? "Enviando..." : "Adicionar foto"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Multi image grid ──────────────────────────────────────────────────────
function MultiImageGrid({
  images,
  onToggle,
  onDelete,
  onAltChange,
  onPositionChange,
  onUpload,
  uploading,
}: {
  images: GalleryImage[];
  onToggle: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
  onAltChange: (id: string, alt: string) => void;
  onPositionChange: (id: string, pos: string) => void;
  onUpload: (files: File[]) => void;
  uploading: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/40 text-sm">
          {images.length} foto{images.length !== 1 ? "s" : ""} cadastrada{images.length !== 1 ? "s" : ""}
          {" · "}{images.filter(i => i.active).length} ativa{images.filter(i => i.active).length !== 1 ? "s" : ""}
        </p>
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => { if (e.target.files?.length) onUpload(Array.from(e.target.files)); e.target.value = ""; }} />
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

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/20">
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
              <div className="aspect-square bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: img.object_position || "center" }}
                  loading="lazy"
                />
              </div>
              <div className="p-2 bg-navy-900/95 space-y-1.5">
                <input
                  defaultValue={img.alt}
                  onBlur={(e) => onAltChange(img.id, e.target.value)}
                  className="w-full text-white/50 text-xs bg-transparent focus:outline-none focus:text-white truncate"
                  placeholder="Descrição da foto..."
                />
                {/* Position selector */}
                <PositionSelect
                  value={img.object_position || "center"}
                  onChange={(pos) => onPositionChange(img.id, pos)}
                />
              </div>

              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onToggle(img.id, img.active)}
                  title={img.active ? "Ocultar" : "Exibir"}
                  className="w-7 h-7 bg-navy-900/90 backdrop-blur rounded-lg flex items-center justify-center text-white hover:text-gold-500 transition-colors"
                >
                  {img.active ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
                <button
                  onClick={() => onDelete(img.id)}
                  title="Remover"
                  className="w-7 h-7 bg-navy-900/90 backdrop-blur rounded-lg flex items-center justify-center text-white hover:text-red-400 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              {!img.active && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-navy-900/80 rounded text-white/40 text-[10px]">
                  Oculto
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────
export default function GaleriaAdmin() {
  const [activeTab, setActiveTab] = useState<GallerySection>("gallery");
  const [imagesBySection, setImagesBySection] = useState<Record<GallerySection, GalleryImage[]>>({
    gallery: [], about: [], differentials: [], hero: [],
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadAll = async () => {
    try {
      const all = await getGalleryAll();
      const grouped: Record<GallerySection, GalleryImage[]> = { gallery: [], about: [], differentials: [], hero: [] };
      all.forEach((img) => {
        const s = (img.section as GallerySection) || "gallery";
        if (grouped[s]) grouped[s].push(img);
        else grouped.gallery.push(img);
      });
      setImagesBySection(grouped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const handleUpload = async (files: File[], section: GallerySection) => {
    setUploading(true);
    try {
      const newImages = await uploadImages(files, section);
      setImagesBySection((prev) => ({
        ...prev,
        [section]: [...prev[section], ...newImages],
      }));
    } catch (err) { console.error(err); }
    finally { setUploading(false); }
  };

  const handleReplace = async (file: File, section: GallerySection) => {
    setUploading(true);
    try {
      await uploadImages([file], section);
      await loadAll();
    } catch (err) { console.error(err); }
    finally { setUploading(false); }
  };

  const handleToggle = async (id: string, active: boolean, section: GallerySection) => {
    try {
      await updateImage(id, { active: !active });
      setImagesBySection((prev) => ({
        ...prev,
        [section]: prev[section].map((img) => img.id === id ? { ...img, active: !active } : img),
      }));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: string, section: GallerySection) => {
    if (!confirm("Remover esta foto?")) return;
    try {
      await deleteImage(id);
      setImagesBySection((prev) => ({
        ...prev,
        [section]: prev[section].filter((img) => img.id !== id),
      }));
    } catch (err) { console.error(err); }
  };

  const handleAltChange = async (id: string, alt: string) => {
    try { await updateImage(id, { alt }); } catch (err) { console.error(err); }
  };

  const handlePositionChange = async (id: string, object_position: string, section: GallerySection) => {
    try {
      await updateImage(id, { object_position });
      setImagesBySection((prev) => ({
        ...prev,
        [section]: prev[section].map((img) =>
          img.id === id ? { ...img, object_position } : img
        ),
      }));
    } catch (err) { console.error(err); }
  };

  const currentSection = SECTIONS.find((s) => s.key === activeTab)!;
  const currentImages = imagesBySection[activeTab];
  const singleImage = currentSection.single
    ? (currentImages.find((i) => i.active) || currentImages[0] || null)
    : null;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display text-white tracking-wide">GALERIA</h1>
        <p className="text-white/30 text-sm mt-1">Gerencie todas as fotos do site por seção</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-white/5 border border-white/8 rounded-xl p-1 w-fit">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveTab(s.key)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === s.key
                ? "bg-gold-500 text-navy-900"
                : "text-white/50 hover:text-white"
            }`}
          >
            {s.label}
            {s.key !== "gallery" && (
              <span className="ml-1.5 text-[10px] opacity-60 font-normal">
                {imagesBySection[s.key].find(i => i.active) ? "✓" : "—"}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Section description */}
      <p className="text-white/40 text-sm mb-6 bg-white/3 border border-white/8 rounded-xl px-4 py-3">
        {currentSection.description}
      </p>

      {loading ? (
        <div className="text-white/30 text-sm">Carregando...</div>
      ) : currentSection.single ? (
        <SingleImageSlot
          image={singleImage}
          onReplace={(f) => handleReplace(f, activeTab)}
          onDelete={(id) => handleDelete(id, activeTab)}
          onPositionChange={(id, pos) => handlePositionChange(id, pos, activeTab)}
          uploading={uploading}
        />
      ) : (
        <MultiImageGrid
          images={currentImages}
          onToggle={(id, active) => handleToggle(id, active, activeTab)}
          onDelete={(id) => handleDelete(id, activeTab)}
          onAltChange={handleAltChange}
          onPositionChange={(id, pos) => handlePositionChange(id, pos, activeTab)}
          onUpload={(files) => handleUpload(files, activeTab)}
          uploading={uploading}
        />
      )}

      <p className="text-white/15 text-xs mt-8">
        Use &quot;Enquadramento&quot; para ajustar o recorte: Topo, Base, Centro etc.
        Nas seções únicas, a nova foto substitui automaticamente a anterior.
      </p>
    </div>
  );
}
