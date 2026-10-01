import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/Chrome";
import { QuoteProvider } from "@/components/QuoteDialog";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${SITE.name} | Power equipment, engineered to your specification`, template: `%s | ${SITE.name}` },
  description: "Oil cooled transformers, compact substations, LV switchboards and voltage regulators, made in Goa by the Pai Kane Group.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
