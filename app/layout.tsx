import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Script from "next/script";
import AnalyticsTracker from "./components/AnalyticsTracker";
import CookieBanner from "./components/CookieBanner";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
});
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Site Local — Vezi site-ul afacerii tale înainte să plătești",
  description:
    "Demo gratuit în 24h, site gata în 48h, 700 lei preț fix. Plătești doar dacă îți place demo-ul.",
};

// Fallback hardcodat: Pixel ID e o valoare publică (apare oricum în HTML-ul livrat
// către browser), deci nu e nevoie de secret pentru el — dar poate fi suprascris
// din variabilele de mediu dacă schimbați contul de Ads.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1983304235646415";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <head>
        {/* Meta Pixel */}
        {PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              window.slLoadPixel = function(){
                if (window.fbq) return;
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${PIXEL_ID}');
                fbq('track', 'PageView');
              };
              try { if (localStorage.getItem('sl_consent') === 'all') window.slLoadPixel(); } catch(e) {}
            `}
          </Script>
        )}
      </head>
      <body
        className={`${jakarta.variable} ${inter.variable} font-body bg-bg text-text antialiased`}
      >
        <AnalyticsTracker />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
