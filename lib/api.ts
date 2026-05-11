/**
 * VPS API client — replaces Supabase
 * API URL configured via NEXT_PUBLIC_API_URL env var
 */

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://concierge-api.209.50.229.119.sslip.io").replace(/\/$/, "");

const TOKEN_KEY = "concierge_admin_token";

// ─── Token helpers ─────────────────────────────────────────────────────────
export const saveToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// ─── Base fetch ────────────────────────────────────────────────────────────
async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.body && !(options.body instanceof FormData)
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string> || {}),
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Erro desconhecido" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Auth ──────────────────────────────────────────────────────────────────
export async function login(email: string, password: string): Promise<{ token: string; email: string }> {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getMe(): Promise<{ email: string }> {
  return apiFetch("/auth/me");
}

// ─── Settings ──────────────────────────────────────────────────────────────
export type Settings = {
  phones?: string[];    // lista de telefones exibidos no site
  phone?: string;       // legado — mantido para compatibilidade
  whatsapp: string;
  email: string;
  instagram: string;
  hero_title?: string;    // título principal do Hero
  hero_subtitle?: string; // subtítulo do Hero
};

/** Retorna a lista de telefones para exibição */
export function getPhonesList(s: Settings): string[] {
  if (s.phones && s.phones.length > 0) return s.phones;
  if (s.phone) return [s.phone];
  return [];
}

export async function getSettings(): Promise<Settings> {
  return apiFetch("/settings");
}

export async function updateSettings(data: Partial<Settings>): Promise<Settings> {
  return apiFetch("/settings", { method: "PUT", body: JSON.stringify(data) });
}

// ─── Gallery ───────────────────────────────────────────────────────────────
export type GallerySection = "gallery" | "about" | "differentials" | "hero";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  active: boolean;
  display_order: number;
  section?: GallerySection;
  object_position?: string;   // "center" | "top" | "bottom" | "left" | "right"
  created_at?: string;
};

export async function getGallery(section?: GallerySection): Promise<GalleryImage[]> {
  const qs = section ? `?section=${section}` : "";
  return apiFetch(`/gallery${qs}`);
}

export async function getGalleryAll(section?: GallerySection): Promise<GalleryImage[]> {
  const qs = section ? `?section=${section}` : "";
  return apiFetch(`/gallery/all${qs}`);
}

export async function uploadImages(files: File[], section: GallerySection = "gallery", alt?: string): Promise<GalleryImage[]> {
  const form = new FormData();
  files.forEach((f) => form.append("images", f));
  form.append("section", section);
  if (alt) form.append("alt", alt);
  return apiFetch("/gallery", { method: "POST", body: form });
}

export async function updateImage(id: string, data: Partial<GalleryImage>): Promise<GalleryImage> {
  return apiFetch(`/gallery/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export async function deleteImage(id: string): Promise<void> {
  return apiFetch(`/gallery/${id}`, { method: "DELETE" });
}

// ─── Services ──────────────────────────────────────────────────────────────
export type Service = {
  id: string;
  icon_name: string;
  title: string;
  description: string;
  tag: string;
  active: boolean;
  display_order: number;
  created_at?: string;
};

export async function getServices(): Promise<Service[]> {
  return apiFetch("/services");
}

export async function getServicesAll(): Promise<Service[]> {
  return apiFetch("/services/all");
}

export async function createService(data: Partial<Service>): Promise<Service> {
  return apiFetch("/services", { method: "POST", body: JSON.stringify(data) });
}

export async function updateService(id: string, data: Partial<Service>): Promise<Service> {
  return apiFetch(`/services/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export async function deleteService(id: string): Promise<void> {
  return apiFetch(`/services/${id}`, { method: "DELETE" });
}

// ─── Jobs ──────────────────────────────────────────────────────────────────
export type Job = {
  id: string;
  title: string;
  description: string;
  active: boolean;
  display_order: number;
  created_at?: string;
};

export async function getJobs(): Promise<Job[]> {
  return apiFetch("/jobs");
}

export async function getJobsAll(): Promise<Job[]> {
  return apiFetch("/jobs/all");
}

export async function createJob(data: { title: string; description?: string }): Promise<Job> {
  return apiFetch("/jobs", { method: "POST", body: JSON.stringify(data) });
}

export async function updateJob(id: string, data: Partial<Job>): Promise<Job> {
  return apiFetch(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export async function deleteJob(id: string): Promise<void> {
  return apiFetch(`/jobs/${id}`, { method: "DELETE" });
}
