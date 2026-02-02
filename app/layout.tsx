import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { LenisProvider } from '../components/LenisProvider';
import 'lenis/dist/lenis.css';
import { siteConfig } from '../lib/config';

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

const { seo, identity, colors } = siteConfig;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: colors.background,
};

export const metadata: Metadata = {
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.defaultDescription,
  keywords: seo.keywords,
  authors: [{ name: identity.businessName }],
  creator: identity.businessName,
  publisher: identity.businessName,
  metadataBase: new URL(seo.siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: seo.og.title,
    description: seo.og.description,
    type: seo.og.type,
    locale: seo.og.locale,
    siteName: identity.businessName,
    url: seo.siteUrl,
  },
  twitter: {
    card: seo.twitter.card,
    title: seo.twitter.title,
    description: seo.twitter.description,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
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
