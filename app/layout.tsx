import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const FALLBACK_SITE_URL = 'https://buildwithmico.vercel.app';

const getSiteUrl = () => {
  const configuredUrl =
    process.env.SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    FALLBACK_SITE_URL;

  try {
    const url = new URL(configuredUrl);
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url
      : new URL(FALLBACK_SITE_URL);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
};

const siteUrl = getSiteUrl();
const title = 'BuildWithMico | Connected Lead Systems';
const description =
  'Mico builds connected GoHighLevel websites, funnels, CRM workflows, automations, and booking systems for service businesses.';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'BuildWithMico',
    title,
    description,
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
