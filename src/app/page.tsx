import Image from "next/image";
import type { ReactNode } from "react";
import ModelExplorer, { type Sector } from "./model-explorer";
import { Check, ChevronsDown, Minus, Plus, Printer, Scissors, ShieldCheck, Shapes } from "lucide-react";

const IMG = "/assets";
// Preço e checkout desta página (cada página tem os seus). OLD_PRICE null = sem preço riscado.
const CURRENCY = "US$";
const PRICE = "10";
const OLD_PRICE: string | null = null;
const CHECKOUT = "https://pay.hotmart.com/R108359573H?checkoutMode=10";
const display = "font-display";

/** "97,00" e "37,00" → 62 */
function discountPercent(from: string, to: string) {
  const n = (v: string) => Number(v.replace(",", "."));
  return Math.round((1 - n(to) / n(from)) * 100);
}

/* ------------------------------------------------------------------ */
/* Conteúdo                                                            */
/* ------------------------------------------------------------------ */

const MAIN_PRODUCT = "Ciudad de Cartón";
const MAIN_PRODUCT_FULL = "Ciudad de Cartón: 35 moldes para imprimir y armar";
const MAIN_MOCKUP = { img: "mockup-principal.png", w: 1306, h: 1204 };

const HERO_BULLETS = ["35 moldes en PDF, listos para imprimir en A4", "Acceso inmediato por e-mail", "Garantía de 7 días"];

const INCLUDES = [
  "35 moldes: 23 de la ciudad y 12 de la zona rural",
  "378 piezas en tamaño real, en 205 páginas",
  "Cada pestaña probada en 3D antes de convertirse en PDF",
  "Con vecinos, autobús, señales y semáforo",
  "Página de montaje ilustrada para cada modelo",
  "Guía de 5 tamaños: del mini (50%, cabe en la mano) al extra (200%, el niño juega adentro)",
  "Impresión ilimitada, para casa o para el aula",
  "PDF en A4, para cualquier impresora común",
];

const TRUST_BADGES = [
  { label: "Garantía de 7 Días", icon: null },
  { label: "Acceso Inmediato", icon: "icone-acesso.png" },
  { label: "Soporte Dedicado", icon: "icone-suporte.png" },
  { label: "Satisfacción Garantizada", icon: "icone-satisfacao.png" },
  { label: "Compra 100% Segura", icon: "icone-compra-segura.png" },
];

// [imagem, etiqueta, nome, tamanho montado, peças, páginas] — dados de cada modelo da página de referência.
type ModelRow = [string, string, string, string, number, number];

const SECTOR_ROWS: { id: string; label: string; rows: ModelRow[] }[] = [
  {
    id: "centro",
    label: "Centro",
    rows: [
      ["cidade-escola", "CENTRO 1", "Escuela", "21 × 9,5 × 15,5 cm armada", 8, 4],
      ["cidade-prefeitura", "CENTRO 2", "Alcaldía con reloj", "16 × 10 × 20,5 cm armada", 9, 5],
      ["cidade-hospital", "CENTRO 3", "Hospital", "14 × 10 × 14 cm armada", 8, 5],
      ["cidade-bombeiros", "CENTRO 4", "Estación de Bomberos", "15 × 10 × 19,5 cm armada", 9, 5],
      ["cidade-delegacia", "CENTRO 5", "Estación de Policía", "13 × 9 × 9 cm armada", 9, 4],
      ["cidade-igreja", "CENTRO 6", "Iglesia con torre", "20 × 10,5 × 20 cm armada", 10, 6],
      ["cidade-praca", "CENTRO 7", "Plaza con glorieta", "25,5 × 17,5 × 10 cm armada", 10, 4],
      ["cidade-mercado", "CENTRO 8", "Mercado", "16 × 13 × 9 cm armada", 10, 4],
      ["padaria", "CENTRO 9", "Panadería de esquina", "20,5 × 17 × 12 cm armada", 9, 5],
      ["cidade-lojas", "CENTRO 10", "Tiendas de la calle", "14 × 8 × 8 cm armada", 8, 4],
      ["cidade-predio", "CENTRO 11", "Edificio de departamentos", "10 × 8 × 22 cm armada", 7, 6],
      ["cidade-posto", "CENTRO 12", "Gasolinera", "15,5 × 5 × 7 cm armada", 13, 4],
    ],
  },
  {
    id: "barrio",
    label: "Barrio",
    rows: [
      ["cidade-casa", "BARRIO 1", "Casa del barrio", "12 × 9,5 × 11,5 cm armada", 10, 5],
      ["casa-classica", "BARRIO 2", "Casa clásica", "43 × 34 × 36,5 cm armada", 28, 24],
      ["sobrado", "BARRIO 3", "Casa de dos pisos", "20 × 17 × 24 cm armada", 12, 7],
      ["colonial", "BARRIO 4", "Casa colonial", "30 × 20 × 17 cm armada", 21, 11],
      ["moderna-terraco", "BARRIO 5", "Moderna con terraza", "29 × 18 × 17 cm armada", 11, 10],
    ],
  },
  {
    id: "calles",
    label: "Calles y vida",
    rows: [
      ["cidade-ruas", "CALLES 1", "Calles y cruce", "36 × 18 cm armada", 2, 3],
      ["cidade-arvores", "CALLES 2", "Árboles, arbustos y postes", "27,5 × 7,5 × 10 cm armada", 8, 3],
      ["cidade-carro", "CALLES 3", "Auto y furgoneta escolar", "14 × 2,5 × 3,5 cm armada", 14, 2],
      ["cidade-onibus", "CALLES 4", "Autobús", "10 × 3 × 3,5 cm armada", 8, 2],
      ["cidade-sinalizacao", "CALLES 5", "Señales y semáforo", "15,5 × 3 × 10 cm armada", 8, 2],
      ["cidade-pessoas", "CALLES 6", "Vecinos y perro", "13 × 3 × 5 cm armada", 8, 2],
    ],
  },
  {
    id: "rural",
    label: "Zona rural",
    rows: [
      ["fazenda-casa", "RURAL 1", "Casa de campo con porche", "18 × 15 × 14,5 cm armada", 15, 6],
      ["fazenda-celeiro", "RURAL 2", "Granero", "32 × 18 × 20 cm armada", 15, 9],
      ["fazenda-estabulo", "RURAL 3", "Establo", "19 × 11 × 13 cm armada", 10, 5],
      ["fazenda-silo", "RURAL 4", "Silo", "11 × 11 × 19 cm armada", 5, 4],
      ["fazenda-chiqueiro", "RURAL 5", "Chiquero con corral", "14 × 15 × 6,5 cm armada", 9, 4],
      ["fazenda-caixa-dagua", "RURAL 6", "Tanque de agua", "10 × 10 × 19 cm armada", 8, 4],
      ["moinho", "RURAL 7", "Molino de viento", "23,5 × 14,5 × 33,5 cm armada", 14, 8],
      ["igrejinha", "RURAL 8", "Capilla de pueblo", "16 × 32,5 × 34 cm armada", 13, 11],
      ["chale-montanha", "RURAL 9", "Cabaña", "15 × 22 × 20 cm armada", 10, 8],
      ["casa-arvore", "RURAL 10", "Casa del árbol", "22 × 18 × 34 cm armada", 21, 9],
      ["fazenda-cenario", "RURAL 11", "Cercas y bebedero", "19 × 18 × 3 cm armada", 9, 3],
      ["fazenda-casinha-cachorro", "RURAL 12", "Casita del perro", "13 × 9,5 × 8 cm armada", 9, 4],
    ],
  },
];

const SECTORS: Sector[] = SECTOR_ROWS.map(({ id, label, rows }) => ({
  id,
  label,
  models: rows.map(([img, tag, name, size, pieces, pages]) => ({ img, tag, name, size, pieces, pages })),
}));

const MOLD_LEGEND = [
  { line: "", label: "Línea continua", action: "corta" },
  { line: "lg-line--dash", label: "Línea de rayas", action: "dobla" },
  { line: "lg-line--dot", label: "Línea de puntos", action: "pega encima" },
];

const STEPS = [
  {
    icon: Printer,
    title: "Imprime",
    text: "Hoja A4 común, escala 100%. Cada página tiene una regla de 5 cm al pie para comprobar.",
  },
  {
    icon: Scissors,
    title: "Pega y corta",
    text: "Pasa pegamento en barra, pega la hoja en una caja de cartón y corta por la línea continua con un cúter.",
  },
  {
    icon: Shapes,
    title: "Arma por las letras",
    text: "Sigue la página de montaje del modelo: piezas en orden, letra con letra. La casa queda de pie sola.",
  },
];

const OFFER_ITEMS = [
  "35 moldes de la Ciudad de Cartón, del centro a la zona rural",
  "378 piezas en tamaño real, en 205 páginas",
  "Página de montaje ilustrada para cada modelo",
  "Guía de 5 tamaños, del 50% al 200%",
  "Impresión ilimitada, para casa o para el aula",
  "PDF en A4, para ver, descargar o imprimir",
  "Acceso inmediato por e-mail",
];

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "¿Cómo recibo los moldes?",
    a: (
      <>
        Justo después de confirmar el pago, <strong>te llega al e-mail el enlace del PDF</strong>.
        <br />
        No necesitas enviar comprobante ni hacer nada más. Solo revisa que escribiste bien tu e-mail en el momento de
        la compra.
      </>
    ),
  },
  {
    q: "¿Necesito una impresora especial?",
    a: (
      <>
        No. <strong>Cualquier impresora con hoja A4 común</strong> sirve. Si no tienes impresora en casa, lleva el PDF
        a una papelería o imprímelo en la escuela.
      </>
    ),
  },
  {
    q: "¿Qué cartón uso?",
    a: (
      <>
        <strong>Caja de cartón común, de 2 a 3 mm</strong>, funciona en todos los modelos. Para el tamaño mini, usa
        cartulina gruesa o cartón fino.
      </>
    ),
  },
  {
    q: "¿Para qué edad es?",
    a: (
      <>
        <strong>A partir de 6 años</strong> para armar y pegar, con un adulto en el corte. Desde los 10 años el niño ya
        acompaña casi todo.
      </>
    ),
  },
  {
    q: "¿Cuánto tiempo lleva una casa?",
    a: (
      <>
        Los modelos más simples quedan listos <strong>en una tarde</strong>. Los más grandes, como el edificio y la
        escuela, rinden dos o tres encuentros.
      </>
    ),
  },
  {
    q: "¿Puedo imprimir para mi clase?",
    a: (
      <>
        Sí. <strong>La impresión es ilimitada</strong> para uso en casa y en el aula. Solo no se permite revender el
        archivo.
      </>
    ),
  },
  {
    q: "¿Se puede hacer más grande o más pequeña?",
    a: (
      <>
        Sí. La <strong>guía de tamaños</strong> muestra cómo imprimir del 50% al 200% sin rehacer nada, con la medida
        final de cada casa.
      </>
    ),
  },
  {
    q: "¿Tiene garantía?",
    a: (
      <>
        ¡Claro que sí!
        <br />
        Tienes <strong>garantía incondicional de 7 días</strong>.
        <br />
        Si por cualquier motivo no es lo que esperabas, solo pide el reembolso total. Sin burocracia y sin preguntas.
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Peças de clay                                                       */
/* ------------------------------------------------------------------ */

type SlabVariant = "hero" | "inside" | "guarantee";

/** Seção de identidade: topo branco que se abre em marrom (composição própria por variante). */
function Slab({
  id,
  variant,
  className = "",
  children,
}: {
  id?: string;
  variant: SlabVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`sp-slab sp-slab--${variant} relative w-full overflow-hidden py-14 text-white ${className}`}
    >
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/** Seção clara: equivale às seções de fundo branco da página original. */
function LightSection({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`relative w-full py-16 ${className}`}>
      {children}
    </section>
  );
}

function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[680px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

/**
 * Grifo das headlines: faixa sólida com letras pretas.
 * on="light" → faixa marrom (sobre branco); on="orange" → faixa branca (sobre o marrom).
 */
function Mark({ on, children }: { on: "light" | "orange"; children: ReactNode }) {
  return <span className={`sp-mark ${on === "orange" ? "sp-mark--on-orange" : ""}`}>{children}</span>;
}

/** Destaque dentro de parágrafos sobre o marrom: chip branco discreto. */
function SoftMark({ children }: { children: ReactNode }) {
  return <span className="sp-mark-soft">{children}</span>;
}

function CheckOrb({ size = "md" }: { size?: "sm" | "md" }) {
  const dims = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  return (
    <span
      className={`clay-orb inline-flex ${dims} shrink-0 items-center justify-center rounded-full bg-sp-go text-white`}
    >
      <Check className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} strokeWidth={3.5} />
    </span>
  );
}

function CheckList({ items, onRed = false, className = "" }: { items: string[]; onRed?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-col gap-3.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckOrb />
          <span
            className={`pt-0.5 text-base font-medium leading-relaxed ${onRed ? "text-white" : "text-ink"}`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CtaButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`clay-button ${display} inline-flex min-h-14 w-full items-center justify-center rounded-[6px] px-8 py-3 text-center text-lg font-extrabold sm:w-auto sm:text-xl ${className}`}
    >
      {children}
    </a>
  );
}

function IconOrb({ children, tone = "red" }: { children: ReactNode; tone?: "red" | "white" }) {
  const toneClass =
    tone === "red"
      ? "bg-gradient-to-br from-sp-400 to-sp-600 text-white"
      : "bg-gradient-to-br from-white to-sp-cream text-sp-600";
  return (
    <span className={`clay-orb inline-flex h-16 w-16 items-center justify-center rounded-full ${toneClass}`}>
      {children}
    </span>
  );
}

/** tone="dark" → preto profundo (fundo branco); tone="light" → branco (fundo marrom). */
function SectionTitle({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <h2
      className={`${display} text-center text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl ${
        tone === "light" ? "sp-title--light" : "sp-title--dark"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/** Mockup principal: PNG com fundo transparente, mostrado direto, sem caixa atrás. */
function MainMockup({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  return (
    <Image
      src={`${IMG}/${MAIN_MOCKUP.img}`}
      alt={MAIN_PRODUCT_FULL}
      width={MAIN_MOCKUP.w}
      height={MAIN_MOCKUP.h}
      priority={priority}
      className={`mx-auto w-full ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function CiudadPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Blobs de fundo (luz ambiente do canvas) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[60vh] w-[60vh] rounded-full bg-sp-500/10 blur-3xl" />
        <div className="absolute -right-[10%] top-[20%] h-[60vh] w-[60vh] rounded-full bg-sp-400/10 blur-3xl" />
      </div>

      {/* Barra promocional fixa */}
      <div className="fixed inset-x-0 top-0 z-50">
        <div
          className={`${display} flex h-11 w-full items-center justify-center gap-1.5 sp-topbar px-3 text-center text-[13px] font-extrabold text-white min-[400px]:text-[15px] sm:tracking-wide`}
        >
          {OLD_PRICE ? `¡${discountPercent(OLD_PRICE, PRICE)}% de descuento solo` : "¡Oferta especial solo"}
          <span className="animate-clay-blink rounded-full bg-white px-2.5 py-0.5 text-sp-600 underline underline-offset-2">
            HOY
          </span>
          en esta página!
        </div>
      </div>

      <main className="flex flex-col pt-11">
        {/* 1 · HERO */}
        <Slab variant="hero" className="pt-6! sm:pt-12!">
          <Container className="flex flex-col items-center text-center">
            <h1 className={`${display} sp-hero-title`}>
              <span className="sp-hero-lead">Arma una ciudad</span>
              <span className="sp-hero-lead sp-hero-lead--next">entera con tu hijo</span>
              <span className="sp-hero-lead sp-hero-lead--next">usando solo</span>
              <span className="sp-hero-word">
                <span aria-hidden className="sp-hero-word-ghost">
                  CARTÓN
                </span>
                CARTÓN
              </span>
              <span className="sp-voucher-wrap">
                <span className="sp-voucher">Tijeras y pegamento</span>
              </span>
            </h1>

            <MainMockup priority className="mt-6" />

            <p className="mt-8 text-lg font-medium leading-relaxed text-white/95 sm:text-xl">
              Imprime el molde en una hoja A4, pégalo en el cartón y corta por la línea. Cada pestaña ya dice dónde
              pegar: <span className="whitespace-nowrap"><SoftMark>pegar aquí · V → 04</SoftMark></span>. El niño encaja las piezas,{" "}
              <strong className="font-extrabold">tú solo sostienes el pegamento</strong>.
            </p>

            <CheckList items={HERO_BULLETS} onRed className="mt-8 w-full text-left" />

            <CtaButton href="#offer" className="mt-10">
              ¡Sí, quiero mi ciudad!
            </CtaButton>
          </Container>
        </Slab>

        {/* 2 · Tudo o que vem */}
        <LightSection>
          <Container>
            <h2 className={`${display} text-center text-3xl font-black leading-[1.1] tracking-tight sp-title--dark sm:text-4xl md:text-5xl`}>
              Mira todo lo que vas a <Mark on="light">recibir</Mark>
            </h2>
            <p className="mt-6 text-center text-lg font-medium leading-relaxed text-sp-ink-soft">
              Una ciudad entera de cartón, del centro a la granja. Sin medir y sin equivocarte en el corte.
            </p>

            <CheckList items={INCLUDES} className="mt-10" />
          </Container>
        </LightSection>

        {/* 3 · Selos de confiança */}
        <LightSection className="pt-0">
          <Container className="grid grid-cols-1 gap-5">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="clay-card flex flex-col items-center gap-3 rounded-[32px] px-6 py-6 text-center">
                {badge.icon ? (
                  <Image src={`${IMG}/${badge.icon}`} alt="" width={512} height={512} className="h-[84px] w-[84px]" />
                ) : (
                  <span className="clay-orb inline-flex h-[84px] w-[84px] items-center justify-center rounded-full bg-sp-go text-white">
                    <Check className="h-11 w-11" strokeWidth={3.5} />
                  </span>
                )}
                <span className={`${display} text-2xl font-extrabold text-ink`}>{badge.label}</span>
              </div>
            ))}
          </Container>
        </LightSection>

        {/* 4 · Modelos + 5 · Facilitamos + 6 · Três passos */}
        <Slab id="inside" variant="inside">
          {/* Bloco branco dos modelos; a onda marrom fica presa no fim dele. */}
          <div className="sp-inside-top -mt-14 pt-14">
            <Container>
              <SectionTitle tone="dark">
                Una ciudad en 4 sectores: <Mark on="light">35 modelos</Mark>, 378 piezas, 205 páginas
              </SectionTitle>
              <p className="mt-4 text-center text-lg font-bold text-sp-ink-soft">
                Mira el tamaño, las piezas y las páginas de cada modelo.
              </p>
              <div className="mt-8">
                <ModelExplorer sectors={SECTORS} imgBase={`${IMG}/modelos`} />
              </div>
              <p className="sp-note mx-auto mt-10 max-w-[560px]">
                Cada modelo viene con las páginas del molde en tamaño real y la página de montaje con el paso a paso.
              </p>
            </Container>
          </div>

          {/* 5 · Facilitamos todo o processo */}
          <Container className="mt-10 sm:mt-12">
            <SectionTitle tone="light">
              Facilitamos todo el proceso para que la diversión con tu hijo sea <Mark on="orange">completa</Mark>
            </SectionTitle>
            <div className="mt-8 flex flex-col gap-5 text-lg font-medium leading-relaxed text-white/95">
              <p>
                La mayoría de los moldes gratis es solo un dibujo bonito: no tiene pestaña para pegar, no dice qué pieza
                va dónde y nunca fue armado de verdad. Así, cualquier milímetro equivocado se convierte en una pared que
                no cierra.
              </p>
              <p>
                En la <SoftMark>Ciudad de Cartón</SoftMark>, cada pieza tiene número, cada pestaña tiene letra y cada
                letra tiene su par. Antes de convertirse en PDF, la casa entera fue doblada en 3D para comprobar que{" "}
                <strong className="font-extrabold">todas las pestañas encajan donde deben</strong>.
              </p>
            </div>

            <div className="clay-card mt-10 rounded-[32px] px-6 py-7 text-ink sm:px-8">
              <h3 className={`${display} text-center text-xl font-black tracking-wide text-sp-600`}>CÓMO LEER EL MOLDE</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {MOLD_LEGEND.map((l) => (
                  <li key={l.label} className="flex items-center gap-4">
                    <span aria-hidden className={`lg-line ${l.line}`} />
                    <span className="text-base font-medium">
                      {l.label} · <strong className="font-extrabold">{l.action}</strong>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-[16px] bg-sp-cream px-4 py-3 text-center text-base font-medium">
                La pestaña <strong className="font-extrabold">V → 04</strong> se pega en la marca V de la pieza{" "}
                <strong className="font-extrabold">04</strong>. Eso es todo.
              </p>
            </div>
          </Container>

          {/* 6 · Três passos */}
          <Container className="mt-16">
            <SectionTitle tone="light">
              Tres pasos. <Mark on="orange">Sin regla.</Mark>
            </SectionTitle>
            <ol className="mt-10 flex flex-col gap-6">
              {STEPS.map((step, i) => (
                <li key={step.title} className="clay-red-card flex items-start gap-4 rounded-[32px] p-6 sm:p-8">
                  <IconOrb tone="white">
                    <step.icon className="h-8 w-8" strokeWidth={2.5} />
                  </IconOrb>
                  <div className="flex-1">
                    <h3 className={`${display} text-2xl font-extrabold leading-tight text-white`}>
                      {i + 1}. {step.title}
                    </h3>
                    <p className="mt-2 text-base font-medium leading-relaxed text-white/90">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 flex justify-center">
              <CtaButton href="#offer">¡Quiero mi ciudad!</CtaButton>
            </div>
          </Container>
        </Slab>

        {/* 7 · Oferta */}
        <LightSection id="offer" className="scroll-mt-20">
          <Container>
            <SectionTitle>TENEMOS ALGO ESPECIAL PARA TI</SectionTitle>
            <div className="mt-8 flex justify-center">
              <IconOrb>
                <ChevronsDown className="h-8 w-8" strokeWidth={3} />
              </IconOrb>
            </div>

            <OfferCard
              badge="🌟 Más Vendido"
              tier="PAQUETE COMPLETO"
              items={OFFER_ITEMS}
              oldPrice={OLD_PRICE}
              price={PRICE}
              href={CHECKOUT}
              className="mt-14"
            />
          </Container>
        </LightSection>

        {/* 8 · Garantia */}
        <Slab variant="guarantee">
          <Container>
            <div className="clay-red-card flex flex-col items-center gap-6 rounded-[48px] px-6 py-10 text-center sm:px-10">
              <span className="clay-orb inline-flex h-[120px] w-[120px] items-center justify-center rounded-full bg-sp-go text-white">
                <ShieldCheck className="h-16 w-16" strokeWidth={2.25} />
              </span>
              <h2 className={`${display} text-3xl font-black tracking-tight sm:text-4xl sp-title--light`}>GARANTÍA DE 7 DÍAS</h2>
              <p className="text-lg font-medium leading-relaxed text-white/95">
                Compra con total tranquilidad. Después de confirmar la compra, tienes 7 días para ver los moldes, revisar
                cada detalle y, si sientes que no es lo que esperabas, pedir el reembolso total, sin burocracia.
              </p>
              <CtaButton href={CHECKOUT} className="sm:min-w-[320px]">
                Comprar ahora
              </CtaButton>
            </div>
          </Container>
        </Slab>

        {/* 9 · FAQ */}
        <LightSection>
          <Container>
            <div className="text-center">
              <p className={`${display} clay-text-gradient text-7xl font-black leading-none tracking-tight sm:text-8xl`}>FAQ</p>
              <h2 className={`${display} mt-3 text-2xl font-black tracking-wide sp-title--dark sm:text-3xl`}>
                PREGUNTAS FRECUENTES
              </h2>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              {FAQ.map((item, i) => (
                <details
                  key={item.q}
                  open={i === 0}
                  className="clay-faq clay-card group rounded-[24px] px-5 py-1 hover:-translate-y-1"
                >
                  <summary className="flex min-h-16 cursor-pointer items-center gap-4 py-3">
                    <span className="clay-orb inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sp-400 to-sp-600 text-white">
                      <Plus className="faq-icon-closed h-5 w-5" strokeWidth={3} />
                      <Minus className="faq-icon-open h-5 w-5" strokeWidth={3} />
                    </span>
                    <span className={`${display} text-left text-lg font-extrabold leading-snug text-ink`}>{item.q}</span>
                  </summary>
                  <div className="pb-5 pl-14 pr-1 text-base font-medium leading-relaxed text-muted [&_strong]:font-bold [&_strong]:text-ink">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <CtaButton href="#offer" className="sm:min-w-[320px]">
                Comprar ahora
              </CtaButton>
            </div>
          </Container>
        </LightSection>

        {/* 10 · Rodapé */}
        <footer className="pb-6 text-center text-[13px]">
          <div className="font-medium">
            <a href="link-para-politica.html" className="mx-2.5 text-sp-link hover:underline">
              Política de Privacidad
            </a>
            <span className="text-muted">|</span>
            <a href="link-para-termos.html" className="mx-2.5 text-sp-link hover:underline">
              Términos de Uso
            </a>
          </div>
          <p className="mt-4 text-muted">Producto digital · PDF A4 · entregado por e-mail</p>
          <p className="mt-2 text-muted">© 2026 Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  );
}

/** Card do plano. */
function OfferCard({
  badge,
  tier,
  items,
  oldPrice,
  price,
  href,
  className = "",
}: {
  badge?: string;
  tier: string;
  items: string[];
  oldPrice: string | null;
  price: string;
  href: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {badge && (
        <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2">
          <span
            className={`${display} clay-orb inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-br from-white to-sp-cream px-5 py-2.5 text-sm font-black tracking-wide text-sp-600`}
          >
            {badge}
          </span>
        </div>
      )}

      <div className="sp-slab sp-slab--offer relative overflow-hidden rounded-[48px] px-5 pb-10 pt-14 text-white sm:px-10">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className={`${display} text-3xl font-black leading-[1.15] tracking-tight sm:text-4xl sp-title--dark`}>
            {MAIN_PRODUCT.toUpperCase()}
            <br />
            <Mark on="light">{tier}</Mark>
          </h3>

          <MainMockup className="mt-8" />

          <div className="mt-8 w-full text-left">
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckOrb size="sm" />
                  <span className="pt-0.5 text-[15px] font-bold leading-snug text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {oldPrice && (
            <p className={`${display} mt-10 text-xl font-extrabold text-white/75 line-through decoration-2`}>
              DE {CURRENCY} {oldPrice}
            </p>
          )}
          <p className={`${display} ${oldPrice ? "mt-1" : "mt-10"} text-2xl font-black tracking-wide`}>SOLO HOY</p>
          <p className={`${display} mt-1 whitespace-nowrap text-7xl font-black leading-none tracking-tight sm:text-8xl`}>
            <span className="mr-1 align-top text-3xl sm:text-4xl">{CURRENCY}</span>
            {price}
          </p>
          <p className="mt-6 text-sm font-bold text-white/90">Pago único</p>

          <CtaButton href={href} className="mt-6 sm:min-w-[320px]">
            Comprar ahora
          </CtaButton>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-white/85">Pago 100% seguro</p>
        </div>
      </div>
    </div>
  );
}
