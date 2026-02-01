import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { LenisProvider } from '../components/LenisProvider';
import 'lenis/dist/lenis.css';

const inter = Inter({subsets:['latin'],variable:'--font-sans', display: 'swap'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1C1C1C',
};

export const metadata: Metadata = {
  title: {
    default: "Atelier Nexus | Aménagement Intérieur Haut de Gamme - Côte d'Azur",
    template: "%s | Atelier Nexus"
  },
  description: "Studio d'aménagement intérieur basé à Antibes. Transformation d'espaces professionnels, résidentiels et commerciaux avec expertise locale et design contemporain.",
  keywords: ["aménagement intérieur", "design intérieur", "Antibes", "Côte d'Azur", "bureau", "résidentiel", "commercial", "rénovation", "PACA"],
  authors: [{ name: "Atelier Nexus" }],
  creator: "Atelier Nexus",
  publisher: "Atelier Nexus",
  metadataBase: new URL('https://ateliernexus.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Atelier Nexus | Aménagement Intérieur Haut de Gamme",
    description: "Studio d'aménagement intérieur basé à Antibes. Transformation d'espaces professionnels, résidentiels et commerciaux.",
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Atelier Nexus',
    url: 'https://ateliernexus.fr',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Atelier Nexus | Aménagement Intérieur",
    description: "Studio d'aménagement intérieur haut de gamme sur la Côte d'Azur",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="staggered-menu-header-backdrop" aria-hidden="true" />
        <LenisProvider />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
