import type { Metadata } from "next";
import { Inter, Felipa, Playfair_Display, Montserrat, Lora, Caveat } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/hooks/useLenis";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Providers } from "@/components/ui/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig, SITE_URL } from "@/lib/site";
import { organizationSchema, webSiteSchema } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const felipa = Felipa({
  weight: "400",
  variable: "--font-felipa",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora-next",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat-next",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const TITLE = "Purple Bags | Custom Wedding Bags Manufacturer in India";

export const metadata: Metadata = {
  // metadataBase makes every relative OG/canonical URL absolute — required for
  // valid social cards and for AI crawlers to resolve image/link references.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Purple Bags",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "custom wedding bags",
    "wedding bags manufacturer",
    "personalized wedding bags",
    "wedding return bags",
    "wedding gift bags",
    "jute wedding bags",
    "cotton wedding bags",
    "Puducherry",
  ],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  // NOTE: no root-level `alternates.canonical` — it would cascade to every
  // page. Each route sets its own canonical (see the per-page metadata).
  openGraph: {
    title: "Purple Bags | Custom Wedding Bags",
    description:
      "Create premium customized wedding bags with Purple Bags. Elegant designs, quality materials, personalized printing, and delivery across India.",
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Purple Bags — custom wedding bags",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Purple Bags | Custom Wedding Bags",
    description:
      "Premium customized wedding bags with name, logo, and wedding-date printing. Pan India delivery.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // favicon.ico is auto-detected from src/app/; add the PNG icon + apple-touch
  // icon so mobile home-screen bookmarks get a proper branded icon.
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${felipa.variable} ${lora.variable} ${caveat.variable} ${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* Sitewide business + website structured data for SEO / AI answer engines. */}
        <JsonLd schema={[organizationSchema(), webSiteSchema()]} />
        <LenisProvider>
          <Providers>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <FloatingActions />
          </Providers>
        </LenisProvider>
      </body>
    </html>
  );
}
