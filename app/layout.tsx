import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

import { Footer, Header } from "@/components/Chrome";
import { CookieConsent } from "@/components/CookieConsent";
import { QuoteProvider } from "@/components/QuoteDialog";
import { Reveal } from "@/components/Reveal";
import { CONSENT_DAYS, CONSENT_KEY } from "@/lib/consent";
import { SITE } from "@/lib/site";

const font = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-name", display: "swap" });

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
    <html lang="en" className={font.variable}>
      <head>
        {/* Google Consent Mode: analytics storage is OFF until the visitor accepts (or accepted before). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}var c=null;try{c=JSON.parse(localStorage.getItem('${CONSENT_KEY}'))}catch(e){}var a=c&&c.v==='granted'&&Date.now()-c.t<${CONSENT_DAYS * 864e5}?'granted':'denied';gtag('consent','default',{analytics_storage:a,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`,
          }}
        />
        {GTM && (
          <script
            dangerouslySetInnerHTML={{
              // Google tag (gtag.js), loaded after the consent default above so consent is respected.
              __html: `var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}';document.head.appendChild(g);gtag('js',new Date());gtag('config','${SITE.gaId}');`,
            }}
          />
        )}
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
          <CookieConsent />
          <Reveal />
        </QuoteProvider>
      </body>
    </html>
  );
}
