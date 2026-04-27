import type { Metadata } from "next";
import { Roboto, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import { headers } from "next/headers";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import { normalizeLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-roboto",
});

const playfair = Playfair_Display({
  weight: ["900"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Ведущий на азербайджанский праздник — Кямран Гаджиев",
  description: "Профессиональный ведущий мероприятий",
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
    verification: {
    yandex: "d838f0f5d2823930",
    google: "4XJvA1swF3669esWMUFu6RsQW4JcTVMfBOKeQ_2cA-M",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = normalizeLocale(requestHeaders.get("x-locale"));

  return (
    <html
      lang={locale}
      className={`${roboto.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        {children}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
