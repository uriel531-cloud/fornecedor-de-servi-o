/**
 * Dados institucionais. Tudo aqui é PLACEHOLDER até confirmação (ver /PLACEHOLDERS.md).
 */
export const site = {
  name: "LASTRO",
  fullName: "LASTRO Engenharia Integrada",
  legalName: "LASTRO Engenharia Integrada Ltda.",
  cnpj: "00.000.000/0001-00",
  crea: "CREA-SP 0000000000",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lastro.example",
  phone: "+55 11 4000-0000",
  phoneHref: "tel:+551140000000",
  whatsapp: "5511900000000",
  email: "contato@lastro.example",
  emailRi: "ri@lastro.example",
  emailDpo: "privacidade@lastro.example",
  tagline: "Do alicerce ao acabamento. Um só contrato.",
  description:
    "Construtora de alto padrão com mais de 40 especialidades sob um único contrato: estrutura, solda, elétrica, hidráulica, acabamentos, pintura, marcenaria e engenharia. Preço fechado, prazo em contrato e garantia por escrito.",
  offices: [
    { city: "São Paulo", uf: "SP", address: "Av. Brigadeiro Faria Lima, 0000 — Itaim Bibi", lat: -23.5874, lng: -46.6826 },
    { city: "Rio de Janeiro", uf: "RJ", address: "Av. Ataulfo de Paiva, 0000 — Leblon", lat: -22.9844, lng: -43.2238 },
    { city: "Belo Horizonte", uf: "MG", address: "Rua Antônio de Albuquerque, 0000 — Savassi", lat: -19.9367, lng: -43.9378 },
    { city: "Curitiba", uf: "PR", address: "Av. do Batel, 0000 — Batel", lat: -25.4421, lng: -49.2867 },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
  /** UFs onde há atendimento (checagem do CEP no configurador). */
  servedUfs: ["SP", "RJ", "MG", "PR", "SC", "DF"],
  premiumThreshold: 1_000_000,
} as const;

export const stats = [
  { value: "1.200+", label: "obras entregues" },
  { value: "380 mil", label: "m² construídos e reformados" },
  { value: "40+", label: "especialidades" },
  { value: "97%", label: "das obras entregues no prazo" },
  { value: "0", label: "acidentes com afastamento em 2026" },
] as const;

export const esgStats = [
  { value: "1.430", label: "dias sem acidente com afastamento" },
  { value: "12 mil", label: "horas de treinamento por ano" },
  { value: "92%", label: "dos resíduos destinados conforme a CONAMA 307" },
] as const;

export const seals = [
  { name: "ISO 9001", desc: "Gestão da qualidade", status: "em certificação" },
  { name: "ISO 14001", desc: "Gestão ambiental", status: "em certificação" },
  { name: "ISO 45001", desc: "Saúde e segurança ocupacional", status: "em certificação" },
  { name: "PBQP-H", desc: "SiAC — Nível A", status: "em certificação" },
] as const;

export const clientLogos = [
  "Velatto Incorporações",
  "Grupo Ardósia",
  "Monteverde Varejo",
  "Quadra Nove Capital",
  "Fábrica Tríade",
  "Ipê Logística",
  "Atlas & Cedro",
  "Condomínio Solar Alto",
] as const;
