import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Om Swastik Buildhomes | Riddhi Premium Plots Dholera SIR',
  description:
    'Om Swastik Buildhomes Pvt. Ltd. (CIN: U41000UW2026PTC256814) presents Riddhi Premium Plots in Dholera Special Investment Region (SIR), Gujarat. Strategic connectivity to airport, expressway, and DMIC.',
  keywords: [
    'Om Swastik Buildhomes',
    'Riddhi Premium Plots',
    'Dholera SIR Plots',
    'Dholera Real Estate',
    'Ahmedabad Dholera Expressway Plots',
    'DMIC Investment',
    'Gujarat Smart City Plots'
  ],
  authors: [{ name: 'Om Swastik Buildhomes Pvt. Ltd.' }],
  metadataBase: new URL('https://omswastikbuildhomes.com'),
  alternates: {
    canonical: 'https://omswastikbuildhomes.com',
  },
  openGraph: {
    title: 'Riddhi Premium Plots | Dholera | Om Swastik Buildhomes',
    description:
      'Explore Riddhi Premium Plots by Om Swastik Buildhomes Pvt. Ltd. in Dholera, Gujarat, positioned within the growth story of Dholera SIR.',
    url: 'https://omswastikbuildhomes.com',
    siteName: 'Om Swastik Buildhomes',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/hero-dholera.jpg',
        width: 1200,
        height: 630,
        alt: 'Om Swastik Buildhomes Dholera SIR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riddhi Premium Plots | Dholera | Om Swastik Buildhomes',
    description:
      'Explore Riddhi Premium Plots by Om Swastik Buildhomes Pvt. Ltd. in Dholera, Gujarat, positioned within the growth story of Dholera SIR.',
    images: ['/images/hero-dholera.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#00464a" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
