import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import JsonLd from '@/components/JsonLd';
import { event } from '@/lib/content';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(event.siteUrl),
  title: {
    default: `${event.title} | ${event.dateLabel} | ${event.venue.name}, ${event.city}`,
    template: `%s | ${event.title}`,
  },
  description: `Official website of the ${event.title}, hosted by HISP Asia and the HISP Centre at the University of Oslo. ${event.dateLabel} at the ${event.venue.name}, ${event.city}, ${event.country}. Programme, speakers, registration, venue and travel information.`,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: event.title,
    title: event.title,
    description: `${event.tagline}. ${event.dateLabel} at the ${event.venue.name}, ${event.city}, ${event.country}. The regional gathering of the DHIS2 community in Asia and the Pacific.`,
    images: [{ url: '/images/gallery/conf-past-1.jpg', width: 2048, height: 944 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: event.title,
    description: `${event.tagline}. ${event.dateLabel}, ${event.venue.name}, ${event.city}, ${event.country}.`,
  },
  robots: { index: true, follow: true },
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HISP Asia',
  url: 'https://hispasia.org/',
  email: event.contactEmail,
  description:
    'HISP Asia is a partnership of HISP groups in the Asia-Pacific region providing coordinated DHIS2 implementation support, together with the HISP Centre at the University of Oslo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">
        {/* Marks that JS is available so scroll-reveal styles can safely hide content. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a
          href="#main"
          className="absolute -left-[999px] top-0 z-[100] rounded-br-lg bg-ink px-4 py-3 font-semibold text-white focus:left-0"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
