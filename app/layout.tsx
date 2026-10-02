import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

import { Footer, Header } from "@/components/Chrome";
import { QuoteProvider } from "@/components/QuoteDialog";
import { SITE } from "@/lib/site";

const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-name", display: "swap" });

// Google Tag Manager runs on the live site only, so test (preview) visits are not counted.
const GTM = process.env.VERCEL_ENV === "production";

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
      <head>
        {GTM && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.gtmId}');`,
            }}
          />
        )}
      </head>
      <body>
        {GTM && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        )}
        <QuoteProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  );
}
