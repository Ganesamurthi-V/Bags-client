import type { Metadata } from "next";
import { Inter, Felipa, Playfair_Display, Montserrat, Lora, Caveat } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/hooks/useLenis";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Providers } from "@/components/ui/Providers";

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

export const metadata: Metadata = {
  title: "Purple Bags | Custom Wedding Bags Manufacturer in India",
  description:
    "Premium customized wedding bags with name printing, logo printing, wedding date printing. Jute, cotton, and luxury fabric bags with Pan India delivery. MOQ 100 bags.",
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
  openGraph: {
    title: "Purple Bags | Custom Wedding Bags",
    description:
      "Create premium customized wedding bags with Purple Bags. Elegant designs, quality materials, personalized printing, and delivery across India.",
    type: "website",
    locale: "en_IN",
    siteName: "Purple Bags",
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
