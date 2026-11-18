import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { ConsentManager } from "@/components/Consent";
import { EstimateProvider } from "@/components/Estimate";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_URL } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "New Look Homes | Home Remodeling in Dover, DE", template: "%s | New Look Homes" },
  description: "Home remodeling in Dover, DE and Kent County. Kitchens, bathrooms and whole-home renovation by New Look Homes.",
  openGraph: { type: "website", siteName: "New Look Homes", locale: "en_US" },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
};

// Runs before paint: marks JS as available so the no-JS fallbacks and reveal start-states are correct.
// Safety net: if the app hasn't hydrated within 3s (slow or failed JS), drop the hidden start state
// so section headers can never get stuck invisible.
const bootScript = `(function(d){d.classList.add('js','js-reveal');setTimeout(function(){if(!window.__nlhReady)d.classList.remove('js-reveal')},3000)})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <EstimateProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </EstimateProvider>
        <ConsentManager />
      </body>
    </html>
  );
}
