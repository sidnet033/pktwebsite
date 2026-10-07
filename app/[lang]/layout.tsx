import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "../globals.css";

import { Footer, Header } from "@/components/Chrome";
import { I18nProvider } from "@/components/I18n";
import { CookieConsent } from "@/components/CookieConsent";
import { QuoteProvider } from "@/components/QuoteDialog";
import { Reveal } from "@/components/Reveal";
import { CONSENT_DAYS, CONSENT_KEY } from "@/lib/consent";
import { SITE } from "@/lib/site";
import { HTML_LANG, LANGS } from "@/lib/i18n";
import { getDict } from "@/lib/i18n/dict";
import { getLang } from "@/lib/i18n/server";

const font = Inter_Tight({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-name", display: "swap" });

// Google Tag Manager runs on the live site only, so test (preview) visits are not counted.
const GTM = process.env.VERCEL_ENV === "production";

// Only /en and /pt exist under this folder; anything else is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  const m = getDict(lang).pages.meta;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: `${SITE.name} | ${m.siteTitle}`, template: `%s | ${SITE.name}` },
    description: m.siteDescription,
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const { ui } = getDict(lang);
  return (
    <html lang={HTML_LANG[lang]} className={font.variable} suppressHydrationWarning>
      <head>
        {/* Fade-in (components/Reveal.tsx): keep page content hidden until it starts, except on the home page.
            Safety net: shown after 2.5 s even if scripts fail. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `var p=location.pathname.replace(/^\\/pt(?=\\/|$)/,'')||'/';if(p!=='/'){var h=document.documentElement;h.classList.add('rv-wait');setTimeout(function(){h.classList.remove('rv-wait')},2500)}`,
          }}
        />
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
        <I18nProvider lang={lang} ui={ui}>
          <QuoteProvider>
            <Header lang={lang} />
            <main>{children}</main>
            <Footer lang={lang} />
            <CookieConsent />
            <Reveal />
          </QuoteProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
