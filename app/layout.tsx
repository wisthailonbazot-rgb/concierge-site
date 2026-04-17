import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Concierge Brasil | Portaria 24h, Limpeza e Conservação para Condomínios",
  description:
    "Serviços profissionais de portaria 24h, recepção, vigia, zeladoria, limpeza e conservação, limpeza de piscina e manutenção em jardinagem para condomínios. Solicite seu orçamento.",
  keywords: [
    "portaria 24h",
    "limpeza condomínio",
    "conservação predial",
    "zeladoria",
    "vigia",
    "facilities services",
    "limpeza de piscina",
    "jardinagem condomínio",
    "concierge brasil",
  ],
  authors: [{ name: "Concierge Brasil Facilities Services" }],
  openGraph: {
    title: "Concierge Brasil | Portaria 24h e Conservação para Condomínios",
    description:
      "Serviços profissionais de portaria 24h, recepção, vigia, zeladoria, limpeza e conservação para condomínios.",
    type: "website",
    locale: "pt_BR",
    siteName: "Concierge Brasil",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concierge Brasil | Portaria 24h e Conservação",
    description: "Serviços profissionais para condomínios.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${bebasNeue.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Concierge Brasil Facilities Services",
              description:
                "Serviços de portaria 24h, limpeza e conservação para condomínios",
              email: "conciergeconservacao@gmail.com",
              serviceType: [
                "Portaria 24h",
                "Recepção",
                "Vigia",
                "Zeladoria",
                "Limpeza e Conservação",
                "Limpeza de Piscina",
                "Manutenção em Jardinagem",
              ],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
