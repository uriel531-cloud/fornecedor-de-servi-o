import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { CommandPalette, FloatingActions, PlaceholderToggle, Preloader } from "@/components/layout/Globals";
import { Cursor } from "@/components/ui/Cursor";
import { ViewTransitionResolver } from "@/components/ui/TLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { disciplinas } from "@/content/disciplinas";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.fullName,
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0c",
  colorScheme: "dark",
};

/** Roda antes da pintura: marca JS, decide o preloader e o destaque de placeholders. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm&&location.pathname==='/'&&!sessionStorage.getItem('lastro-preloaded')){d.classList.add('is-preloading')}if(localStorage.getItem('lastro-show-ph')==='1'||/[?&]placeholders=1/.test(location.search)){d.classList.add('show-ph')}}catch(e){}})();`;

const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "GeneralContractor"],
  "@id": `${site.url}/#org`,
  name: site.fullName,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  slogan: site.tagline,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  taxID: site.cnpj,
  areaServed: site.offices.map((o) => ({ "@type": "City", name: o.city })),
  address: site.offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.address,
    addressLocality: o.city,
    addressRegion: o.uf,
    addressCountry: "BR",
  })),
  sameAs: site.social.map((s) => s.href),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Especialidades de obra",
    itemListElement: disciplinas.map((d) => ({
      "@type": "OfferCatalog",
      name: d.nome,
      itemListElement: d.servicos.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.nome } })),
    })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${instrument.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Preloader />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <FloatingActions />
        <CommandPalette />
        <CookieBanner />
        <Cursor />
        <SmoothScroll />
        <ViewTransitionResolver />
        <PlaceholderToggle />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
