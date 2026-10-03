import type { Metadata, Viewport } from "next";
import { Figtree, Kaushan_Script } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollEffects from "@/components/ScrollEffects";
import Tunnel from "@/components/Tunnel";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const figtree = Figtree({
  variable: "--font-ui-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const kaushan = Kaushan_Script({
  variable: "--font-script-next",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Aplica o tema salvo antes da primeira pintura, para a página não piscar.
const themeInit = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

// Cor da barra do navegador no celular, acompanhando o tema do sistema.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F2EC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1013" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "pt" ? "/" : "/en",
      languages: { "pt-BR": "/", en: "/en", "x-default": "/" },
    },
    // Cartão de pré-visualização ao compartilhar o link (WhatsApp, LinkedIn etc.).
    openGraph: {
      type: "website",
      siteName: "Rafael Silva",
      title: t("title"),
      description: t("description"),
      url: locale === "pt" ? "/" : "/en",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      alternateLocale: locale === "pt" ? ["en_US"] : ["pt_BR"],
      images: [
        {
          url: `/og-${locale}.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`/og-${locale}.png`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "a11y" });

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      className={`${figtree.variable} ${kaushan.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <NextIntlClientProvider>
          <a href="#main" className="skip">
            {t("skip")}
          </a>
          <Tunnel />
          <Header />
          {children}
          <Footer />
          <ScrollEffects />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
