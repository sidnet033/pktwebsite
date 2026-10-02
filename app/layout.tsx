import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

import { Footer, Header } from "@/components/Chrome";
import { QuoteProvider } from "@/components/QuoteDialog";
import { SITE } from "@/lib/site";

const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-name", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "./" },
  openGraph: { siteName: SITE.name, type: "website", images: ["/logo.png"] },
  title: { default: `${SITE.name} | Power equipment, engineered to your specification`, template: `%s | ${SITE.name}` },
  description: "Oil cooled transformers, compact substations, LV switchboards and voltage regulators, made in Goa by the Pai Kane Group.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hanken.variable}>
      <body>
        <QuoteProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  );
}
