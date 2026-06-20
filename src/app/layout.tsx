import type { Metadata } from "next";
import { Inter, Felipa } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const felipa = Felipa({
  weight: "400",
  variable: "--font-felipa",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Purple Bags",
  description: "A beautifully crafted website for Purple Bags.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${felipa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
