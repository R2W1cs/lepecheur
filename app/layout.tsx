import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Restaurant Le Pêcheur — La Marée Fraîche, 24h/24",
  description: "Dégustez la marée la plus fraîche à Ezzahra, Tunis. Restaurant de fruits de mer ouvert 24h/24, 7j/7. Fraîcheur méditerranéenne garantie.",
  keywords: ["restaurant", "poisson", "seafood", "ezzahra", "tunis", "24/7", "fruits de mer", "le pecheur"],
};

import PageTransition from "@/components/ui/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable} ${playfair.variable}`}>
      <body className="overflow-x-hidden font-body">
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
