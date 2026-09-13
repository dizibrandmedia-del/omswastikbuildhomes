import type { Metadata } from 'next';
import './globals.css';
import GlobalLeadModals from '@/components/GlobalLeadModals';
import WelcomeMasterPlanModal from '@/components/WelcomeMasterPlanModal';

export const metadata: Metadata = {
  title: 'Om Swastik Buildhomes | Riddhi Premium Plots Dholera SIR',
  description:
    'Om Swastik Buildhomes Pvt. Ltd. presents Om Swastik Riddhi: Premium Plots & Prime Plots in Kamiyala, Dholera SIR, Gujarat. Prime investment near 250m expressway, airport, and DMIC.',
  keywords: [
    'Om Swastik Buildhomes',
    'Om Swastik Riddhi',
    'Riddhi Premium Plots',
    'Dholera SIR',
    'Dholera Smart City',
    'Dholera plots',
    'Dholera residential plots',
    'Dholera investment',
    'Dholera SIR plots',
    'Dholera investment plots',
    'Dholera SIR Gujarat',
    'Dholera DMIC'
  ],
  authors: [{ name: 'Om Swastik Buildhomes Pvt. Ltd.' }],
  metadataBase: new URL('https://omswastikbuildhomes.com'),
  alternates: {
    canonical: 'https://omswastikbuildhomes.com',
  },
  openGraph: {
    title: 'Om Swastik Riddhi | Premium Plots in Dholera SIR | Om Swastik Buildhomes',
    description:
      'Digital version of the official Om Swastik Riddhi brochure. Clear-title plots at Kamiyala, Dholera SIR near 250m Expressway, Dholera International Airport, and DMIC corridor.',
    url: 'https://omswastikbuildhomes.com',
    siteName: 'Om Swastik Buildhomes',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/brochure/hero-gate.jpg',
        width: 1054,
        height: 1271,
        alt: 'Om Swastik Riddhi Entrance Gate Kamiyala Dholera SIR',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Om Swastik Riddhi | Premium Plots in Dholera SIR',
    description:
      'Digital version of the official Om Swastik Riddhi brochure. Clear-title plots at Kamiyala, Dholera SIR near 250m Expressway and International Airport.',
    images: ['/images/brochure/hero-gate.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Om Swastik Buildhomes Pvt. Ltd.',
    description:
      'Official developers of Om Swastik Riddhi: Premium Plots in Kamiyala, Dholera SIR, Gujarat.',
    url: 'https://omswastikbuildhomes.com',
    logo: 'https://omswastikbuildhomes.com/images/logo.png',
    telephone: '+919599213531',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gaur World Smart Street, ASF-151, 2nd Floor, Sector 16B',
      addressLocality: 'Greater Noida West',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201318',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.2587',
      longitude: '72.1947',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '20:00',
    },
    sameAs: [
      'https://www.omswastikbuildhomes.com',
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/brochure/hero-gate.webp" type="image/webp" fetchPriority="high" />
        <meta name="theme-color" content="#00464a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <GlobalLeadModals />
        <WelcomeMasterPlanModal />
      </body>
    </html>
  );
}
